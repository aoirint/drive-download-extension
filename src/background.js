
chrome.runtime.onInstalled.addListener(function(){
  chrome.contextMenus.create({
    type: 'normal',
    id: 'download',
    title: 'Download Current Video'
  })
})

chrome.contextMenus.onClicked.addListener(function(item){
  if (item.menuItemId === 'download') {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, ([activeTab]) => {
      chrome.tabs.sendMessage(activeTab.id, {
        method: 'getVideoSrc'
      }, ({videoSrc}) => {
        chrome.tabs.sendMessage(activeTab.id, {
          method: 'downloadVideoSrc',
          videoSrc: videoSrc
        })
      })
    })
  }
})
