// service-worker.js
self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;

    if (action === 'close') {
        notification.close();
    } else {
        event.waitUntil(
            clients.matchAll().then(clientsArr => {
                const hasClient = clientsArr.some(client => client.visibilityState === 'visible');
                if (hasClient) {
                    clientsArr[0].focus();
                } else {
                    clients.openWindow('/');
                }
            })
        );
    }
});


self.addEventListener('periodicsync', event => {
    if (event.tag === 'send-notification') {
        event.waitUntil(
            // Logic to send a notification
            self.registration.showNotification('Scheduled Notification', {
                body: 'This is a message from the periodic sync!',
                icon: '/path/to/your/icon.png'
            })
        );
    }
});
