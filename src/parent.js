
console.log(`parent content script loaded: ${location.href}`)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('received message in parent')

  if (message.method == 'downloadVideoSrc') {
    const { videoSrc } = message

    // not working (cross origin download cannot specify filename)
    // only opens the video as a new tab
    // https://qiita.com/Y-dash/items/e0fdc108347cae2d7560#%E6%89%8B%E6%B3%951-a%E8%A6%81%E7%B4%A0%E3%82%92%E7%94%9F%E6%88%90%E3%81%97%E3%81%A6%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%82%92%E7%99%BA%E7%81%AB
    const anchor = document.createElement('a')
    anchor.href = videoSrc
    anchor.download = 'download.mp4'

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  return true
})
