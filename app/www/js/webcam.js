var Webcams = function() {
	this.leftcam = document.getElementById('leftcam');
	this.leftCamContext = leftcam.getContext("2d");
	this.rightcam = document.getElementById('rightcam');
	this.rightCamContext = rightcam.getContext("2d");
	this.webcam = document.getElementById("webcam");

	this.webcamImage = document.createElement('canvas');
	this.webcamImage.setAttribute("width", "640");
	this.webcamImage.setAttribute("height", "480");
	this.webcamImage.width = 640;
	this.webcamImage.height = 480;
	this.webcamImageContext = this.webcamImage.getContext("2d");


	this.init = function() {
		// have to call initialize function with canvas object
		cordova.plugins.CanvasCamera.initialize(webcamImage);
		var options = {
	        quality: 75,
	        destinationType: CanvasCamera.DestinationType.DATA_URL,
	        encodingType: CanvasCamera.EncodingType.JPEG,
	        width: 640,
	        height: 480
	    };

		cordova.plugins.CanvasCamera.start(options);
	};

	this.render = function() {
		this.webcamImageContext.drawImage(this.webcam, 0, 0, this.webcam.videoWidth, this.webcam.videoHeight, 0, 0, this.webcamImage.width, this.webcamImage.height);
        this.leftCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
        this.rightCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
	};
}
