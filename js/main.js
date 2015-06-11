var sceneContainer = document.getElementById('scene');


// Init webcams
var webcams = new Webcams();
webcams.init();


// Init Scene
var scene = new Scene();


// Render
function render() {
    requestAnimationFrame(render);
    webcams.render();
    scene.render();
}

var videoYeah = document.getElementById('videoYeah');
document.body.addEventListener('click', play, false);

function play() {
    videoYeah.src = 'http://broken-links.com/tests/media/BigBuck.m4v';
    videoYeah.setAttribute('crossorigin', 'anonymous');
    videoYeah.load();
    videoYeah.play();
    scene.init(sceneContainer);
    render();
}
