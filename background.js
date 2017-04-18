function setIcon(tabId) {
    var canvas = document.createElement('canvas');
    canvas.width = 19;
    canvas.height = 19;

    var context = canvas.getContext('2d');
    context.fillStyle = '#e74c3c';
    context.fillRect(0, 0, 19, 19);

    context.fillStyle = '#FFFFFF';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = 'bold 16px Arial';
    context.fillText('!', 10, 10);

    chrome.pageAction.setIcon({
      tabId: tabId,
      imageData: context.getImageData(0, 0, 19, 19)
    });
    chrome.pageAction.show(tabId);
}

function checkForIDN(tabId, url) {
    if (url !== punycode.toUnicode(url)) {
        setIcon(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    checkForIDN(tabId, tab.url);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (tab && tab.url) {
            checkForIDN(activeInfo.tabId, tab.url);
        }
    });
});
