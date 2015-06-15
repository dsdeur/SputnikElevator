var Scene = function() {
    var self = this;

    this.init = function(element, video) {
        this.camera = new THREE.PerspectiveCamera(45, (window.innerWidth/2)/this.calculateHeight(window.innerWidth/2), 1, 100000);
        this.cameraRTT = new THREE.PerspectiveCamera(45, (window.innerWidth/2)/this.calculateHeight(window.innerWidth/2), 1, 100000);


        this.sceneRTT = new THREE.Scene();
        this.scene = new THREE.Scene();

        // Init video
        this.video = video;

        // Canvas
        this.image = document.createElement('canvas');
        this.image.width = 1920;
        this.image.height = 1080;

        // Context
        this.imageContext = this.image.getContext('2d');
        this.imageContext.fillStyle = '#000000';
        this.imageContext.fillRect(0, 0, 1920, 1080);

        // Texture
        this.texture = new THREE.Texture(this.video);
        this.texture.minFilter = THREE.NearestFilter;
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.format = THREE.RGBFormat;
        this.texture.wrapS = THREE.ClampToEdgeWrapping;
        this.texture.wrapT = THREE.ClampToEdgeWrapping;

        // Material
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            overdraw: true,
            side: THREE.BackSide
        });


        // Plane
        this.sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
        this.sphere = new THREE.Mesh(this.sphereGeometry, this.material);
        this.sceneRTT.add(this.sphere);

        this.textureRTT = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
        this.materialRTT =  new THREE.MeshBasicMaterial({map:this.textureRTT} );


        this.planeGeometry =  new THREE.PlaneBufferGeometry( window.innerWidth / 2, window.innerHeight );

        this.plane  = new THREE.Mesh( this.planeGeometry, this.materialRTT );
        this.scene.add(this.plane);

        this.plane.position.z = -500;




        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth/2, this.calculateHeight(window.innerWidth/2));
        var rendererElement = this.renderer.domElement;
        element.appendChild(rendererElement);



        // // Orbit controls
        this.controls = new THREE.OrbitControls(this.camera, document.body);
        
        this.controls.target.set(
          this.camera.position.x + 0.15,
          this.camera.position.y,
          this.camera.position.z
        );
        
        this.controls.noPan = true;
        this.controls.noZoom = true;
        
        
        function setOrientationControls(e) {
            if (!e.alpha) {
                return;
            }
            console.log("YOYO", e, self.camera);

            this.controls = new THREE.DeviceOrientationControls(self.camera, true);
            this.controls.connect();
            this.controls.update();

            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }
        
        window.addEventListener('deviceorientation', setOrientationControls, true);

        this.clock = new THREE.Clock();
    };

    this.onWindowResize = function() {
        self.camera.aspect = (window.innerWidth/2)/ self.calculateHeight(window.innerWidth/2);
        self.camera.updateProjectionMatrix();

        self.renderer.setSize((window.innerWidth/2), self.calculateHeight(window.innerWidth/2));
    };

    this.render = function() {
        if(self.video.readyState === self.video.HAVE_ENOUGH_DATA) {
            if(self.texture) self.texture.needsUpdate = true;
        }

        self.camera.updateProjectionMatrix();
        self.controls.update(self.clock.getDelta());



        self.renderer.render(self.sceneRTT, self.cameraRTT,self.textureRTT,true);
        
        self.renderer.render(self.scene, self.camera);
    };

    this.calculateHeight = function(width) {
        var height = (width * 600) / 800;
        return height;
    }
}
