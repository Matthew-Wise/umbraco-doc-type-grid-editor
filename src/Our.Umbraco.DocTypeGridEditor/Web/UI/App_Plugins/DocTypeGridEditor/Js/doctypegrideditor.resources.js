angular.module('umbraco.resources').factory('Our.Umbraco.DocTypeGridEditor.Resources.DocTypeGridEditorResources',
    function ($q, $http, umbRequestHelper) {
        return {
            getContentTypeAliasByGuid: function (guid) {
                var url = Umbraco.Sys.ServerVariables.umbracoSettings.umbracoPath + "/backoffice/DocTypeGridEditorApi/DocTypeGridEditorApi/GetContentTypeAliasByGuid?guid=" + guid;
                return umbRequestHelper.resourcePromise(
                    $http.get(url),
                    'Failed to retrieve content type alias by guid'
                );
            },
            getContentTypes: function (allowedContentTypes) {
                var url = Umbraco.Sys.ServerVariables.umbracoSettings.umbracoPath + "/backoffice/DocTypeGridEditorApi/DocTypeGridEditorApi/GetContentTypes";
                if (allowedContentTypes) {
                    for (var i = 0; i < allowedContentTypes.length; i++) {
                        url += (i == 0 ? "?" : "&") + "allowedContentTypes=" + allowedContentTypes[i];
                    }
                }
                return umbRequestHelper.resourcePromise(
                    $http.get(url),
                    'Failed to retrieve content types'
                );
            },
            getContentType: function (contentTypeAlias) {
                var url = Umbraco.Sys.ServerVariables.umbracoSettings.umbracoPath + "/backoffice/DocTypeGridEditorApi/DocTypeGridEditorApi/GetContentType?contentTypeAlias=" + contentTypeAlias;
                return umbRequestHelper.resourcePromise(
                    $http.get(url),
                    'Failed to retrieve content type icon'
                );
            },
            getDataTypePreValues: function (dtdId) {
                var url = Umbraco.Sys.ServerVariables.umbracoSettings.umbracoPath + "/backoffice/DocTypeGridEditorApi/DocTypeGridEditorApi/GetDataTypePreValues?dtdid=" + dtdId;
                return umbRequestHelper.resourcePromise(
                    $http.get(url),
                    'Failed to retrieve datatypes'
                );
            },
            getEditorMarkupForDocTypePartial: function (pageId, id, editorAlias, contentTypeAlias, value, viewPath, previewViewPath, published, culture) {
                var url = Umbraco.Sys.ServerVariables.umbracoSettings.umbracoPath + "/backoffice/DocTypeGridEditorApi/DocTypeGridEditorApi/GetPreviewMarkup?dtgePreview=1&pageId=" + pageId;
                var data = [
                    { 'key': 'id', 'value': id },
                    { 'key': 'editorAlias', 'value': editorAlias },
                    { 'key': 'contentTypeAlias', 'value': contentTypeAlias },
                    { 'key': 'value', 'value': JSON.stringify(value) },
                    { 'key': 'viewPath', 'value': viewPath },
                    { 'key': 'previewViewPath', 'value': previewViewPath }
                ];
                if (culture) {
                    data.push({ 'key': 'culture', 'value': culture });
                }
                return umbRequestHelper.postMultiPartRequest(url, data);
            }
        };
    });