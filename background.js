  if (localStorage.getItem('pw')) {
      chrome.browserAction.setIcon({
        path: 'locked.png'
      });
  }

  function checkURL(whiteListURL, newURL) {

      if (whiteListURL != undefined) {
          //check referer
          var isExtenstion = newURL.indexOf('chrome-extension://') != -1;
          //var containsWhiteListUrl = (newURL.length > whiteListURL.length) ? (newURL.indexOf(whiteListURL) != -1) : (whiteListURL.indexOf(newURL) != -1);
          if (isExtenstion) {
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
          
          var urlIsPermitted = checkURL(whiteListURL, details.url);
          if (!urlIsPermitted) {
              return {
                redirectUrl: whiteListURL
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
