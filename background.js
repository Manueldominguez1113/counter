let lastnotifID = null;

chrome.commands.onCommand.addListener(async (command) => {

    let data = await chrome.storage.local.get("counter");
    let counter = data.counter || 0;
    switch (command) {
        case "increment_counter":
            counter++;
            break;
        case "decrement_counter":
            counter--;
            break;
        case "reset_counter":
            counter = 0;
            break;
    }

    await chrome.storage.local.set({counter});
    showNotification();
    console.log(`Counter updated (${command}):`, counter);


    function showNotification() {
        // If there's an existing notification, clear it first
        if (lastnotifID) {
            chrome.notifications.clear(lastnotifID);
        }

        // Create a new notification
        chrome.notifications.create(
            {
                type: "basic",
                iconUrl: "icon.png",
                title: "Counter Updated",
                message: `Current count: ${counter}`
            },
            (notificationId) => {
                lastnotifID = notificationId; // Store new notification ID
                setTimeout(()=> chrome.notifications.clear(lastnotifID), 6000)
            }
        );
    }

})
