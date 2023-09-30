chrome.contextMenus.create({
    id: "ViewPDF",
    title: "View PDF in new tab",
    contexts: ["link"],
    //documentUrlPatterns: ["*://*/*.pdf"],
    

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "ViewPDF") {
        
        chrome.tabs.create({ url: info.linkUrl });
        
    }
}
);


