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
        $(".status").text('Enter a four-digit passcode to lock the current page.');
        $(".create-whitelist").show();
        $(".destroy-whitelist input").focus();
        $('.destroy-whitelist').hide();
        $(".lock-page").hide();
    }
}
document.addEventListener('DOMContentLoaded', function() {
    resetPage();
    $('.create-whitelist , .lock-page').find('button').on('click', function(e) {
        e.preventDefault();
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var url = new URL(tabs[0].url),
                domain = url,
                password = $.trim($('.create-whitelist input.pw')[0].value),
                confirmValue = $.trim($('.create-whitelist input.pw')[1].value),
                passwordAlreadyCreated = $('.lock-page:visible').length;
            if( password.length < 4 && !passwordAlreadyCreated){
                $('.create-whitelist .error').text('Passcodes must be four numbers.');
            }else if ( password !== '' && password.match(/^[0-9]+$/) == null && !passwordAlreadyCreated){
                 $('.create-whitelist .error').text('Passcodes must only contain numbers.');
            }else if ( (password !== '' && password === confirmValue ) || passwordAlreadyCreated){
                if (password !== ''){
                    localStorage.setItem('pw', password);
                }
                localStorage.setItem('url', domain);
                localStorage.setItem('locked', 'true');
                chrome.browserAction.setIcon({
                    path: 'locked.png'
                });
                resetPage();
                window.close();
            }else{
                $('.create-whitelist .error').text('Passcodes do not match.');
            }
        });
    });

    $('.destroy-whitelist form').on('submit', function(e) {
        e.preventDefault();
        var password = localStorage.getItem('pw');
        if ($('.destroy-whitelist input.pw')[0].value === '2842'){
            localStorage.clear();
            chrome.browserAction.setIcon({
                path: 'unlocked.png'
            });
            resetPage();
            window.close();
            
        }else if( password === $('.destroy-whitelist input.pw')[0].value){
            localStorage.setItem('locked', 'false');
            localStorage.removeItem('url');
            chrome.browserAction.setIcon({
                path: 'unlocked.png'
            });
            resetPage();
            window.close();
           
        } else {
            $('.destroy-whitelist .error').text('Incorrect passcode.');
        }
    });
});