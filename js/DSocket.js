DSocket = function(url, messageHandlers) {
    var self = this;
    this.url = url;
    this.socket = null;
    this.isopen = null;
    this.messageHandlers = messageHandlers;

    // Connects te socket
    this.connect = function() {
        log('Trying to connect socket on: ' + this.url);

        this.socket = new WebSocket(this.url);
        this.socket.binary = 'arraybuffer';

        this.socket.onopen = this.onOpen;
        this.socket.onclose = this.onClose;
        this.socket.onmessage = this.onMessage;
    };

    this.onOpen = function() {
        log('Socket connection established');

        this.isopen = true;
    };

    // Try reconnecting the socket if connection is closed
    this.onClose = function(e) {
        log('Socket connection closed');

        // Poll for socket connection
        setTimeout(function() {
            self.connect();
        }, 3*1000);
    };

    // Processes incoming messages and call message handler
    this.onMessage = function(data) {
        // Parse the incoming message
        var json = JSON.parse(data.data);
        var message = json.message;
        var data = json.data;

        if(!self.messageHandlers || !self.messageHandlers.hasOwnProperty(message)) {
            return;
        }

        console.log(message, data);
        // Call the message handler and pass the data
        self.messageHandlers[message](data);
    }

    // Sends messages to server
    this.sendMessage = function(message, data) {
        console.log(message, data);
        // Create JSON string from message and data
        this.socket.send(JSON.stringify({
            'message': message,
            'data': data
        }));
    }

    function log(message) {
        console.log('%c ' + message, 'background: #222; color: #bada55');
    }

    this.connect();
}
