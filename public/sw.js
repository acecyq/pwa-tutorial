self.addEventListener('install', (e) => {
    console.log('[SW] install');
    self.skipWaiting();            // activate immediately
});

self.addEventListener('activate', (e) => {
    console.log('[SW] activate');
    e.waitUntil(self.clients.claim()); // start controlling open pages
});

self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: data.icon || '/globe.svg',
            badge: '/globe.svg',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        }
        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})

self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow('http://localhost:3000'))
})