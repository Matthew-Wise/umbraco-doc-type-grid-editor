using Our.Umbraco.DocTypeGridEditor.Formatters;
using System.Web.Http;
using Umbraco.Core.Composing;

namespace Our.Umbraco.DocTypeGridEditor.Composing
{
    internal class DocTypeGridEditorComponent : IComponent
    {
        public void Initialize()
        {
            GlobalConfiguration.Configuration.Formatters.Add(new GetPreviewMarkupPreviewDataMediaFormatter());
        }

        public void Terminate()
        {
        }
    }
}