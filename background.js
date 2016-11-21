var stateHandler = (function() {
    var whitelistInitialized = false;
});

var whitelistHandler = (function() {
    var whiteListURL = '';

    var getWhiteListCallback = function(result) {
        whiteListURL = result.url;
    };

    chrome.storage.local.get('url', getWhiteListCallback);
    return {
        contains: function(newURL, origin, referer) {
            if (whiteListURL && typeof whiteListURL != 'undefined' ) {
                //check referer
                var isExtenstion = origin && origin.indexOf('chrome-extension://') != -1 || false;
                var containsWhiteListUrl = (newURL.length > whiteListURL.length) ? newURL.indexOf(whiteListURL) != -1 : whiteListURL.indexOf(newURL) != -1;
                var refererIsWhiteListed = referer && (referer.length > whiteListURL.length) ? referer.indexOf(whiteListURL) != -1 : whiteListURL.indexOf(referer) != -1;
                //|| refererIsWhiteListed
                if ((containsWhiteListUrl && !isExtenstion) ) {
                    return true;
                }
            } else {
                return true;
            }
            return false;
        }
    };

}());
/*
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
*/
chrome.browserAction.onClicked.addListener(function(tab) {
    var url = new URL(tab.url),
        domain = url.hostname;
    chrome.storage.local.set({
        'url': domain
    }, function() {
        if (chrome.extension.lastError) {
            console.log('An error occurred: ' + chrome.extension.lastError.message);
        }
        console.log('success! ' + domain);
    });

});


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var headers = details.requestHeaders,
            referer;
            //alert(headers);

        if (typeof headers != 'undefined'){
          for (var i = 0, l = headers.length; i < l; ++i) {
              if (headers[i].name == 'Referer') {

                  referer = headers[i].value;
                  alert(referer);
              }
          }
        }
        //alert('navigating to:' + details.url + chrome.browserAction.onClicked.hasListener());
        if (typeof details.url != 'undefined') {
            var onWhiteList = whitelistHandler.contains(details.url, details.originUrl, referer);
            if (!onWhiteList) {
                return {
                    cancel: true
                };
            }
        }
    }, {
        urls: ["<all_urls>"]
    }, ["blocking"]
);

/*chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    chrome.extension.getBackgroundPage().console.log('Storage key "%s" in namespace "%s" changed. ' +
      'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue);
  }
});
*
/*chrome.management.onDisabled.addListener(function(ExtensionInfo) {
  console.log(JSON.stringify(ExtensionInfo));
});
*/