  if (localStorage.getItem('pw')) {
      chrome.browserAction.setIcon({
          path: 'locked.png'
      })
  }

  function checkURL(whiteListURL, newURL, origin, referer) {

      if (whiteListURL != undefined) {
          //check referer
          var isExtenstion = origin && origin.indexOf('chrome-extension://') != -1 || false;
          var containsWhiteListUrl = (newURL.length > whiteListURL.length) ? (newURL.indexOf(whiteListURL) != -1) : (whiteListURL.indexOf(newURL) != -1);
          var refererIsWhiteListed = referer && (referer.length > whiteListURL.length) ? referer.indexOf(whiteListURL) != -1 : whiteListURL.indexOf(referer) != -1;
          //|| refererIsWhiteListed
          if (containsWhiteListUrl && !isExtenstion) {
              return true;
          } else {
              return false;
          }
      }
      return true;
  }


  var onBeforeRequestHandler = {
      func: function(details) {
          var headers = details.requestHeaders,
              referer;
          var whiteListURL = localStorage.getItem("url");
          
          var onWhiteList = checkURL(whiteListURL, details.url, details.originUrl, referer);
          if (!onWhiteList) {
              return {
                redirectUrl: "http://"+whiteListURL
              };
          }

      },
      filter: {
          urls: ["<all_urls>"],
          types: ['main_frame']
      },
      extra: ["blocking"]
  };
  chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler.func,
      onBeforeRequestHandler.filter,
      onBeforeRequestHandler.extra);
