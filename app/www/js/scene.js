

//Scenes
var sceneRTTLeft = new THREE.Scene();
var sceneRTTRight = new THREE.Scene();

var scene = new THREE.Scene();


//Cameras
var cameraRTTLeft = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);
var cameraRTTRight = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);

var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );

//Renderer
var renderer = new THREE.WebGLRenderer({clearColor:0x888888,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

document.querySelector(".simulator").appendChild( renderer.domElement );



//Geometry
var sphereGeometry = new THREE.PlaneGeometry( window.innerWidth/2, window.innerHeight );
var planeGeometry = new THREE.PlaneGeometry( window.innerWidth / 2, window.innerHeight );



//Textures
var textureRTTLeft = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
var textureRTTRight = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

// Video texture
var video = document.getElementById( 'monitor' );


videoImage = document.getElementById( 'videoImage' );
videoImageContext = videoImage.getContext( '2d' );
// background color if no video present
videoImageContext.fillStyle = '#000000';
videoImageContext.fillRect( 0, 0, videoImageContext.width, videoImageContext.height );

videoTexture = new THREE.Texture( videoImageContext );
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;


//Materials
var materialRTTLeft = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: videoTexture,
    overdraw: true
});

var materialRTTRight = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: videoTexture,
    overdraw: true
});

var materialLeft =  new THREE.MeshBasicMaterial({map:textureRTTLeft} );
var materialRight = new THREE.MeshBasicMaterial({map:textureRTTRight} );



//Meshes
var sphereLeft  = new THREE.Mesh( sphereGeometry, materialRTTLeft );
var sphereRight = new THREE.Mesh( sphereGeometry, materialRTTRight );

var planeLeft  = new THREE.Mesh( planeGeometry, materialLeft );
var planeRight = new THREE.Mesh( planeGeometry, materialRight );


sceneRTTLeft.add(  sphereLeft );
sceneRTTRight.add( sphereRight );

scene.add(planeLeft);
scene.add(planeRight);


camera.position.z = 5;


planeLeft.position.x = -window.innerWidth / 4;
planeRight.position.x = -window.innerWidth / -4;


controlsLeft = new DeviceOrientationController( cameraRTTLeft, renderer.domElement );
controlsLeft.connect();

controlsLeft.enableManualZoom = false;

controlsRight = new DeviceOrientationController( cameraRTTRight, renderer.domElement );
controlsRight.connect();

controlsRight.enableManualZoom = false;



var render = function () {
    requestAnimationFrame( render );
    if ( video.readyState === video.HAVE_ENOUGH_DATA )
	{
		videoImageContext.drawImage( video, 0, 0 );
		if ( videoTexture )
			videoTexture.needsUpdate = true;
	}

    controlsLeft.update();
    controlsRight.update();

    renderer.render(sceneRTTLeft, cameraRTTLeft,textureRTTLeft,true);

    renderer.render(sceneRTTRight, cameraRTTRight,textureRTTRight,true);

    renderer.render(scene,camera);
};

render();
