

var newIsToggled;
var accessToken;
let loggedIn = false;
const clientId = "597848685780-divq9uoe4foo81lvt6bv7ifgeo1kashi.apps.googleusercontent.com"
window.onload = function() {
    var googleButton = document.getElementById('googleOauth');
    if(googleButton){
        
        googleButton.addEventListener('click', function() {
            if(loggedIn){
                loggedIn = false;
                chrome.storage.local.set({loggedIn: loggedIn}, function() {
                    //change button text
                    googleButton.innerHTML = "Log In";
                    //remove cachedAuthToken
                    chrome.identity.removeCachedAuthToken({token: accessToken}, function() {
                        console.log("removed cached auth token");
                        window.location.reload();
                        
                    });
                });
                return;
            }
            else{
            var redirectUri = chrome.identity.getRedirectURL();
            var scope = 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar';
            var authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?'+'client_id='+encodeURIComponent(clientId)+'&response_type=code'+'&redirect_uri='+encodeURIComponent(redirectUri)+'&scope='+encodeURIComponent(scope);
            //log all three
            console.log("redirct uri : "+redirectUri);
            console.log("scope : "+scope);
            console.log("auth url : "+authUrl);

            chrome.identity.launchWebAuthFlow({url: authUrl, interactive: true}, function(redirectUrl) {
                var url = new URL(redirectUrl);
                var code = url.searchParams.get('code');
                console.log("Authorization code: " + code);

                // Send the authorization code to your server
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:3000/exchange', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function() {
                    var response = JSON.parse(xhr.responseText);
                    accessToken = response.access_token;
                    console.log("access token : "+accessToken);
                    loggedIn = true;
                    chrome.storage.local.set({loggedIn: loggedIn}, function() {
                        //change button text
                        googleButton.innerHTML = "Log Out?";
                    });
                };
                var params = 'code=' + encodeURIComponent(code);
                xhr.send(params);
            });
        }
        });
    
    }




    

    var toggleDarkModeButton = document.getElementById('toggleDarkMode');
   
    if (toggleDarkModeButton) {
        toggleDarkModeButton.addEventListener('click', function() {
            chrome.storage.local.get('isToggled', function(data) {
                newIsToggled = !data.isToggled;
                chrome.storage.local.set({isToggled: newIsToggled}, function() {
                    console.log('isToggled is set to ' + newIsToggled);
                    if(newIsToggled){
                        console.log("if new is Toggled True");
                        toggleDarkModeButton.innerHTML = "Dark Mode ON";
                        chrome.tabs.query({url: "https://*.instructure.com/*"}, function(tabs) {
                            tabs.forEach(function(tab) {
                                chrome.scripting.insertCSS({target: {tabId: tab.id}, files: ["style.css"]});
                            });
                        });
                    }
                    else{
                        toggleDarkModeButton.innerHTML = "Dark Mode OFF";
                        chrome.tabs.query({url: "https://*.instructure.com/*"}, function(tabs) {
                            tabs.forEach(function(tab) {
                                chrome.scripting.removeCSS({target: {tabId: tab.id}, files: ["style.css"]});
                            });
                        });
                    }
                });
            });
            
            
        });
        if(!newIsToggled){
            toggleDarkModeButton.innerHTML = "Dark Mode OFF";
        }
    }
};





