chrome.contextMenus.create({
    id: "1",
    title : "Open File in New Tab",
    contexts : ["link"],
})
var docurl;

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        console.log("request"+request.greeting);
        if(request.greeting){
            console.log("message equals greeting")
            docurl = request.greeting;
            console.log(docurl);
        }
        
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    
    if (info.linkUrl.endsWith("/download?download_frd=1")) {
        var url = tab.url;
        var arr = url.split(".com");
        console.log(arr);
        arr.pop();
        var final = arr[0]+".com"+docurl;
        console.log("Var2 :"+docurl);

        
        chrome.tabs.create({
            url: final
        });
    } else {
        chrome.tabs.create({
            url: "https://www.google.com"
        });
    }
    
    
})



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "toggleDarkMode") {
        chrome.tabs.query({url: "https://*.instructure.com/*"}, function(tabs) {
            tabs.forEach(function(tab) {
                chrome.scripting.insertCSS({target: {tabId: tab.id}, files: ["style.css"]});
                chrome.tabs.sendMessage(tab.id, {action: "toggleDarkMode"});
            });
        });
    }
});