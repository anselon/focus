function resetPage() {
    if (localStorage.getItem('pw')) {
        chrome.browserAction.setIcon({
            path: 'locked.png'
        })
        $('.status').text('Page locked to: ' + localStorage.getItem('url'));
        $(".create-whitelist").hide();
        $(".create-whitelist input").focus();
        $('.destroy-whitelist').show();
    } else {
        chrome.browserAction.setIcon({
            path: 'unlocked.png'
        })
        $(".status").text('Enter password to lock current page');
        $(".create-whitelist").show();
        $(".destroy-whitelist input").focus();
        $('.destroy-whitelist').hide();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    resetPage();
    $('.create-whitelist').find('button').on('click', function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var url = new URL(tabs[0].url),
                domain = url.hostname;
            localStorage.setItem('pw', $('.create-whitelist input.pw')[0].value);
            localStorage.setItem('url', domain);
            $('.status').text('Page Locked to: ' + domain);
            chrome.browserAction.setIcon({
                path: 'locked.png'
            });
            window.close();
        });
    });

    $('.destroy-whitelist form').on('submit', function(e) {
        var password = localStorage.getItem("pw");
        if (password != undefined && password == $('.destroy-whitelist input.pw')[0].value) {
            localStorage.clear();
            window.close();
        } else {
            e.preventDefault();
            $('.destroy-whitelist .error').text('incorrect password');
        }
    });
});