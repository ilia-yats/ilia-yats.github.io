'use strict';

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('push', function (event) {
    event.waitUntil(
        fetch('/push-notification.json').then(function (response) {
            if (response.status !== 200) {
                console.log('push-notification.json request error: ' + response.status);
                throw new Error();
            }

            return response.json().then(function (data) {
                if (data.error || !data.notification) {
                    console.error('push-notification.json Format Error.', data.error);
                    throw new Error();
                }

                var title = data.notification.title;
                var body = data.notification.body;
                var icon = 'https://mydutyfree.net/images/logo.png';

                return self.registration.showNotification(title, {
                    body: body,
                    icon: icon,
                    data: {
                        url: data.notification.url
                    }
                });
            }).catch(function (err) {
                console.error('Retrieve data Error', err);
            });
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    var url = event.notification.data.url;
    event.waitUntil(clients.openWindow(url));
});