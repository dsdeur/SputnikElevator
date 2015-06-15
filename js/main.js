var sceneLeftContainer = document.getElementById('sceneLeft');
var sceneRightContainer = document.getElementById('sceneRight');

var videoLeft = document.getElementById('videoLeft');
var videoRight = document.getElementById('videoRight');


window.alphaOffset = 0;
window.betaOffset = 0;
window.gammaOffset = 0;

// Init webcams
var webcams = new Webcams();
webcams.init();

var socket = new DSocket('ws://145.93.36.186:7894', {
    'start': function() {
        videoLeft.play();
        videoRight.play();
    },
    'new_orientation': function(data) {
        window.alphaOffset = data['orientation']
    }
});


// Init Scene
var sceneLeft = new Scene();
var sceneRight = new Scene();

//
// window.onresize = function() {
//     console.log("RESIZE");
//     sceneLeft.onWindowResize();
//     sceneRight.onWindowResize();
// }

// Render
function render() {
    requestAnimationFrame(render);
    webcams.render();
    sceneLeft.render();
    sceneRight.render();
}

document.body.addEventListener('click', play, false);

function play() {
    videoLeft.setAttribute('crossorigin', 'anonymous');
    videoRight.setAttribute('crossorigin', 'anonymous');

    videoLeft.play();
    videoRight.play();
    videoLeft.pause();
    videoRight.pause();

    setTimeout(function(){
        sceneLeft.init(sceneLeftContainer, videoLeft);
        sceneRight.init(sceneRightContainer, videoRight);
        render();
    }, 100);
    document.body.removeEventListener('click', play);
}
