var tabUrlHandler = (function() {
  var whiteList = '';
  var queryTabsCallback = function(result){
      whiteList = result.url;
  };

  chrome.storage.local.get('url', queryTabsCallback);
  return {
    contains: function(newURL, origin, referer) {
          var url = whiteList;
        //check referer
        //check 

           var isExtenstion = origin && origin.indexOf('chrome-extension://') != -1 || false;
           var containsWhiteListUrl = (newURL.length > url.length) ? newURL.indexOf(url) != -1 : url.indexOf(newURL) != -1;
           var referIsWhiteListed = false;
           if ((containsWhiteListUrl) && !isExtenstion) {
              return true;
           }
        return false;
    }
  };

}());

  chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
         if (typeof details.url !=  'undefined' ){
            var onWhiteList = tabUrlHandler.contains(details.url, details.originUrl,'fd');
            if (!onWhiteList) {
              return { cancel: true };
            }
          }
         },
        {urls: ["<all_urls>"]},
        ["blocking"]
  );


  chrome.management.onDisabled.addListener(function(ExtensionInfo) {
    console.log(JSON.stringify(ExtensionInfo));
  });