var docvar2;
window.onload = function() {
    //log window loaded
    console.log("window loaded");
    
};

if (window.location.href.includes('?module_item_id')) {
    var docvar = document.getElementById("doc_preview");
    if (docvar) {
        docvar2 = docvar.getAttribute("data-canvadoc_session_url");
        console.log("testing "+docvar2);
    } else {
        console.log("Element with ID 'doc_preview' not found");
    }
}
else {
    console.log("Not on a Canvas page");
}

chrome.runtime.sendMessage({greeting: docvar2}, function(response) {
    console.log(response.farewell);
  });

  let isstoggled = false;

var togggle;
chrome.storage.local.get('isToggled', function(data) {
    togggle = data.isToggled;
    console.log("isToggled data: "+data.isToggled);
    console.log("togggle data: "+togggle);

    if(togggle) {
        console.log("enable dark mode");
        chrome.runtime.sendMessage({type: "toggleDarkMode", data: "toggleDarkMode"});
    
    
    }
    
});

if(togggle) {
    console.log("enable dark mode");
    
}

