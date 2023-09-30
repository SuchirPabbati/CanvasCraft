// (function() {
//     // Add a new context menu item to open PDFs in a new tab.
//     chrome.contextMenus.create({
//         title: "View PDF in new tab",
//         contexts: ["link"],
//         documentUrlPatterns: ["*://*/*.pdf"],
//         onclick: function(info) {
//             // Prevent the default behavior of downloading the PDF.
//             info.preventDefault();

//             // Send a message to the background script to open the PDF in a new tab.
//             chrome.runtime.sendMessage({action: "openPdfInNewTab", linkUrl: info.linkUrl});
//         }
//     });
// })();


// if (typeof chrome !== "undefined" && chrome.runtime) {
//     chrome.runtime.onInstalled.addListener(function() {
//         var a = chrome.contextMenus,
//             b = a.create;
//         b.call(a, {
//             id: "ViewPDF",
//             title: "View PDF in new tab",
//             contexts: ["link"],
//             documentUrlPatterns: ["*://*/*.pdf"],
//             onclick: function(a) {
//                 a.preventDefault(), chrome.runtime.sendMessage({
//                     action: "openPdfInNewTab",
//                     linkUrl: a.linkUrl
    
//                 })
//             }
    
//         })
//     });
//   } else {
//     console.warn("chrome.runtime is not available.");
//   }
