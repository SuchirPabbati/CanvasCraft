chrome.contextMenus.create({
    id: "1",
    title : "Open File in New Tab",
    contexts : ["link"],
})
var docurl;
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        if(request.greeting){
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
        console.log(final);

        
        chrome.tabs.create({
            url: final
        });
    } else {
        chrome.tabs.create({
            url: "https://www.google.com"
        });
    }
    
    
})


