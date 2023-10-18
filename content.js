var docvar2;
window.onload = function() {
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
};

chrome.runtime.sendMessage({greeting: docvar2}, function(response) {
    console.log(response.farewell);
  });


