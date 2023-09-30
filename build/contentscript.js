(function() {
    // Add a new context menu item to open PDFs in a new tab.
    chrome.contextMenus.create({
      title: "View PDF in new tab",
      contexts: ["link"],
      documentUrlPatterns: ["*://*/*.pdf"],
      onclick: function(info) {
        // Prevent the default behavior of downloading the PDF.
        info.preventDefault();
  
        // Open the PDF in a new tab.
        chrome.tabs.create({url: info.linkUrl});
      }
    });
  })();