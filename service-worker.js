// service-worker.js
self.addEventListener('notificationclick', event => {
    event.waitUntil(
        clients.matchAll().then(clients => {
            if (clients.length) {
                clients[0].focus();
            } else {
                clients.openWindow('/');
            }
        })
    );
});
