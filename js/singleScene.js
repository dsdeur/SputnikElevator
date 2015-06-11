var Scene = function() {
    var self = this;

    this.init = function(element) {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100000);
        this.camera.position.z = 2000;

        this.scene = new THREE.Scene();

        // Init video
        this.video = document.getElementById('videoYeah');

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
            overdraw: true
        });

        // Plane
        var plane = new THREE.PlaneGeometry(800, 600, 4, 4);
        var mesh = new THREE.Mesh(plane, this.material);
        this.scene.add(mesh);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var rendererElement = this.renderer.domElement;
        element.appendChild(rendererElement);

        // Orbit controls
        var controls = new THREE.OrbitControls(this.camera, rendererElement);

        controls.target.set(
          this.camera.position.x + 0.15,
          this.camera.position.y,
          this.camera.position.z
        );

        controls.noPan = true;
        controls.noZoom = true;


        function setOrientationControls(e) {
            if (!e.alpha) {
                return;
            }

            controls = new THREE.DeviceOrientationControls(self.camera, true);
            controls.connect();
            controls.update();

            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }

        window.addEventListener('deviceorientation', setOrientationControls, true);

    };

    this.onWindowResize = function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    this.render = function() {
        if(self.video.readyState === self.video.HAVE_ENOUGH_DATA) {
            if(self.texture) self.texture.needsUpdate = true;
        }

        self.renderer.render(self.scene, self.camera);
    };
}
