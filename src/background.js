
chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    type: 'normal',
    id: 'download',
    title: '(Google Drive) Download Current Video'
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
    chrome.downloads.download({
      url: url,
      filename: filename,
    })
  }

  return true
})
