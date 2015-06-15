var socket = new DSocket('ws://localhost:7894', {});

function startClick() {
    socket.sendMessage('start', {});
}

function orientationUpdate(e) {
    var orientation = orientationSlider.value;

    console.log(orientation);

    self.socket.sendMessage('new_orientation_input', {
        "orientation": orientation,
    });
}

var startBtn = document.getElementById('start');
startBtn.addEventListener('click', startClick);

var orientationSlider = document.getElementById('orientationSlider');
orientationSlider.addEventListener('input', orientationUpdate);
