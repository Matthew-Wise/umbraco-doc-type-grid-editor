using Newtonsoft.Json;
using Our.Umbraco.DocTypeGridEditor.Web;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Umbraco.Core.IO;

namespace Our.Umbraco.DocTypeGridEditor.Formatters
{
    public class GetPreviewMarkupPreviewDataMediaFormatter : MediaTypeFormatter
    {
        public GetPreviewMarkupPreviewDataMediaFormatter()
        {
            SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("multipart/form-data"));
        }

        public override bool CanReadType(Type type)
        {
            if (type == null) throw new ArgumentNullException(nameof(type));
            return type == typeof(PreviewData);
        }

        public override bool CanWriteType(Type type)
        {
            if (type == null) throw new ArgumentNullException(nameof(type));
            return false;
        }

        public override async Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
        {
            if (type == null) throw new ArgumentNullException(nameof(type));
            if (readStream == null) throw new ArgumentNullException(nameof(readStream));

            try
            {
                var root = IOHelper.MapPath(SystemDirectories.TempFileUploads);
                Directory.CreateDirectory(root);

                var provider = new MultipartFormDataStreamProvider(root);
                var multiPartProvider = await content.ReadAsMultipartAsync(provider);

                var formData = multiPartProvider.FormData;

                var jsonValue = JsonConvert.SerializeObject(formData.AllKeys.ToDictionary(k => k, k => formData[k]));
                return JsonConvert.DeserializeObject<PreviewData>(jsonValue);
            }
            catch (Exception ex)
            {
                if (formatterLogger == null)
                {
                    throw;
                }

                formatterLogger.LogError(string.Empty, ex);
                return GetDefaultValueForType(type);
            }
        }
    }
}
