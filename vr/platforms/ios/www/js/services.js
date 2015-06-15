angular.module('starter.services', [])

.factory("Simulator",function(){

  var imgLeftUrl = "img/scene2_view1_left.jpg";
  var imgRightUrl = "img/scene2_view1_right.jpg";

  var video;
 
  return{

    start:function(){

      //Scenes
      var sceneRTTLeft = new THREE.Scene();
      var sceneRTTRight = new THREE.Scene();

      var scene = new THREE.Scene();


      //Cameras
      var cameraRTTLeft  = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);
      var cameraRTTRight = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);

      var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

      //Renderer
      var renderer = new THREE.WebGLRenderer({clearColor:0x888888,antialias:true});
      renderer.setSize( window.innerWidth, window.innerHeight );
     
      document.querySelector(".simulator").appendChild( renderer.domElement );


    //Geometry
      var sphereGeometry = new THREE.SphereGeometry( 20, 32, 32 );
      var planeGeometry = new THREE.PlaneGeometry( window.innerWidth / 2, window.innerHeight );

      

      //Textures
      var textureRTTLeft = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
      var textureRTTRight = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

      var video = document.querySelector(".video");


      video.addEventListener("contextmenu", function (e) { e.preventDefault(); e.stopPropagation(); }, false);

      // hide the controls if they're visible
      if (video.hasAttribute("controls")) {
          myVideo.removeAttribute("controls")   
      }

      video.play();

      var textureLeft = new THREE.Texture(video);

      textureLeft.minFilter = THREE.NearestFilter;
      textureLeft.magFilter = THREE.NearestFilter;
      textureLeft.format = THREE.RGBFormat;
      textureLeft.wrapS = THREE.ClampToEdgeWrapping;
      textureLeft.wrapT = THREE.ClampToEdgeWrapping;

      var textureRight = new THREE.Texture(video);

      textureRight.minFilter = THREE.NearestFilter;
      textureRight.magFilter = THREE.NearestFilter;
      textureRight.format = THREE.RGBFormat;
      textureRight.wrapS = THREE.ClampToEdgeWrapping;
      textureRight.wrapT = THREE.ClampToEdgeWrapping;

      //Materials
      var materialRTTLeft = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: textureLeft,
        overdraw:true
      });

      var materialRTTRight = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: textureRight,
        overdraw:true
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


      planeLeft.position.z = -1000;
      planeRight.position.z = -1000;


      planeLeft.position.x = -window.innerWidth / 4;
      planeRight.position.x = -window.innerWidth / -4;

      sphereLeft.scale.x = -1;
      sphereRight.scale.x = -1;


      controlsLeft = new DeviceOrientationController( cameraRTTLeft, renderer.domElement );
      controlsLeft.connect();  

      controlsLeft.enableManualZoom = false;     

      controlsRight = new DeviceOrientationController( cameraRTTRight, renderer.domElement );
      controlsRight.connect();     

      controlsRight.enableManualZoom = false;



      var render = function () {
        requestAnimationFrame( render );

         if(video.readyState === video.HAVE_ENOUGH_DATA) {
            if(textureLeft) textureLeft.needsUpdate = true;
            if(textureRight) textureRight.needsUpdate = true;
        }

        controlsLeft.update();
        controlsRight.update();

        renderer.setClearColor(0xf0000FF)

        renderer.render(sceneRTTLeft, cameraRTTLeft,textureRTTLeft,true);

        renderer.setClearColor(0xf00FFFF)

        renderer.render(sceneRTTRight, cameraRTTRight,textureRTTRight,true);

        renderer.setClearColor(0xf00FF00)

        renderer.render(scene,camera);
      };

      render();
     
    }


  }




})