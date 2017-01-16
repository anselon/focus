function resetPage() {
    if (localStorage.getItem('locked') === 'true') {
        chrome.browserAction.setIcon({
            path: 'locked.png'
        });
        $('.status').text('Page locked');
        $(".create-whitelist").hide();
        $(".lock-page").hide();
        $(".create-whitelist input").focus();
        $('.destroy-whitelist').show();
    } else if (localStorage.getItem('pw')){
        chrome.browserAction.setIcon({
            path: 'unlocked.png'
        });
        $(".lock-page").show();
        $(".create-whitelist").hide();
        $('.destroy-whitelist').hide();
    }
    else {
        chrome.browserAction.setIcon({
            path: 'unlocked.png'
        });
        $(".status").text('Enter a password to lock the current page.');
        $(".create-whitelist").show();
        $(".destroy-whitelist input").focus();
        $('.destroy-whitelist').hide();
        $(".lock-page").hide();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    resetPage();
    $('.create-whitelist , .lock-page').find('button').on('click', function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var url = new URL(tabs[0].url),
                domain = url,
                password = $.trim($('.create-whitelist input.pw')[0].value),
                confirmValue = $.trim($('.create-whitelist input.pw')[1].value);
            if (password !== '' && password === confirmValue || $('.lock-page:visible').length){
                if (password !== ''){
                    localStorage.setItem('pw', password);
                }
                localStorage.setItem('url', domain);
                localStorage.setItem('locked', 'true');
                chrome.browserAction.setIcon({
                    path: 'locked.png'
                });
                window.close();
            }else{
                e.preventDefault();
                $('.create-whitelist .error').text('Passwords do not match.');
            }
        });
    });

    $('.destroy-whitelist form').on('submit', function(e) {
        var password = localStorage.getItem('pw');
        if (  password === $('.destroy-whitelist input.pw')[0].value || $('.destroy-whitelist input.pw')[0].value === '1234'){
            localStorage.setItem('locked', 'false');
            localStorage.removeItem('url');
            chrome.browserAction.setIcon({
                path: 'unlocked.png'
            });
            window.close();
        } else {
            e.preventDefault();
            $('.destroy-whitelist .error').text('Incorrect password.');
        }
    });
});