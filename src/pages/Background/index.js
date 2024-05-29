chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get_tabs_info') {
    chrome.windows.getLastFocused((currentWindow) => {
      chrome.tabs.query({ windowId: currentWindow.id }, (tabs) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError.message });
        } else {
          const tabsInfo = tabs.map((tab) => ({
            id: tab.id,
            title: tab.title,
            url: tab.url,
            windowId: tab.windowId,
          }));

          sendResponse({ tabs: tabsInfo });
        }
      });
    });
    return true;
  }
});
