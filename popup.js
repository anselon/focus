function whiteListCurrentTabUrl() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    chrome.storage.local.set({'url': 'facebook.com'});
    renderStatus('White Listed' + url);
  });

}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function(){
        whiteListCurrentTabUrl();

});