
console.log(`iframe content script loaded: ${location.href}`)

chrome.runtime.onMessage.addListener(({method}, sender, sendResponse) => {
  console.log(`received message ${method} in iframe`)

  if (method === 'downloadDriveVideo') {
    const videoContainer = document.querySelector('.html5-video-container')
    const videoElement = videoContainer.querySelector('video')
    const videoSrc = videoElement.src

    const videoTitleAnchor = document.querySelector('.ytp-title-link')
    const videoTitle = videoTitleAnchor.innerText

    chrome.runtime.sendMessage({
      method: 'download',
      url: videoSrc,
      filename: videoTitle
    })
  }

  return true
})
