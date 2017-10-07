/**
* Function that sends a notification to the user with the given title and options
* @param {string} title
* @param {string} body
* @returns {boolean} By default it always returns true.
**/
function sendNotification(title, body){
    var options = {
        body: body
    };
    new Notification(title, options);
    return true;
}
/**
* When a message from he client is received,
* process it depending on the action given.
* @param {object} message Message object which contains the required data.
**/
onmessage = function(message){
    var action = message.data[0];
    console.log(message);
    switch (action) {
        case "send":
                postMessage(["send", sendNotification(message.data[1], message.data[2])]);
            break;
    }
}
