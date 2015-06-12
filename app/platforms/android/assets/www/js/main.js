var sceneLeftContainer = document.getElementById('sceneLeft');
var sceneRightContainer = document.getElementById('sceneRight');

var videoLeft = document.getElementById('videoLeft');
var videoRight = document.getElementById('videoRight');


// Init webcams
var webcams = new Webcams();
webcams.init();


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

    setTimeout(function(){
        sceneLeft.init(sceneLeftContainer, videoLeft);
        sceneRight.init(sceneRightContainer, videoRight);
        render();
    }, 100);
    document.body.removeEventListener('click', play);
}
