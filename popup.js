

var newIsToggled;

window.onload = function() {
    

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

