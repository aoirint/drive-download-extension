
chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    type: 'normal',
    id: 'download',
    title: '(Google Drive) Download Current Video',
    documentUrlPatterns: ['https://drive.google.com/*']
  })
})

chrome.contextMenus.onClicked.addListener(function(item){
  if (item.menuItemId === 'download') {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, ([activeTab]) => {
      chrome.tabs.sendMessage(activeTab.id, {
        method: 'downloadDriveVideo'
      })
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { method } = message
  console.log(`received message ${method} in background`)

  if (method === 'download') {
    const { url, filename } = message
    const filename_ = filename.replace('/', '_')
    chrome.downloads.download({
      url: url,
      filename: filename_,
    })
  }

  return true
})
