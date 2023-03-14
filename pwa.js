//registering the service worker for PWA functionality
//SERVICE WORKERS MUST BE ACCESSED VIA HTTPS

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      console.log("Service worker registered", reg);
    })
    .catch((err) => {
      console.log("Service worker nor registered", err);
    });
}
