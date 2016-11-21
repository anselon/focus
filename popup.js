/*function whiteListCurrentTabUrl() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    chrome.storage.local.set({'url': url.toString()});
    renderStatus('White Listed' + url);
    chrome.extension.getBackgroundPage().console.log('foo');
  });


}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function(){
        whiteListCurrentTabUrl();
         chrome.extension.getBackgroundPage().console.log('foo');


});
*/
alert('thest');
chrome.browserAction.onClicked.addListener(function(tab) {
    
    browser.browserAction.disable(tab.id);
    var url = new URL(tab.url),
        domain = url.hostname;
  chrome.storage.local.set({
    'url': domain
  },function() {
        if (chrome.extension.lastError) {
          console.log('An error occurred: ' + chrome.extension.lastError.message);
        }
        console.log('success?');
    }
  );
  //renderStatus('White Listed' + domain);
});
/*


chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
});*/

// enable/disable browser action: chrome.browserAction.enable(integer tabId)