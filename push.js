'use strict';
    function SendPushMe() {
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
            navigator.serviceWorker.register('/js/push-service-worker.js').then(function() {
                return navigator.serviceWorker.ready;
            }).then(function(reg) {
                console.log('Service Worker is ready :^)', reg);
                reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
                    console.log('endpoint:', sub.endpoint);
                    $.get( "https://mydutyfree.net/create-push-subscriber?adresat=" + sub.endpoint, function( data ) {});
                });
            }).catch(function(error) {
                console.log('Service Worker error :^(', error);
            });
        }
    }
