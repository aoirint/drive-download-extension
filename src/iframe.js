
console.log(`iframe content script loaded: ${location.href}`)

chrome.runtime.onMessage.addListener(({method}, sender, sendResponse) => {
  console.log(`received message ${method} in iframe`)

  if (method === 'getVideoSrc') {
    const videoContainer = document.querySelector('.html5-video-container')
    const videoElement = videoContainer.querySelector('video')
    const videoSrc = videoElement.src

    sendResponse({
      'method': 'response',
      videoSrc: videoSrc
    })
  }

  return true
})
