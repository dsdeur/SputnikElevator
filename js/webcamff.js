var Webcams = function() {
	var self = this;
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
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

		if (navigator.getUserMedia != null) {
			navigator.getUserMedia({
					video: true,
				},
				function(stream){
					self.webcam.src = URL.createObjectURL(stream);
					self.webcam.play();
				},
				function(error) {
					console.log("Video capture disabled");
				});
		} else {
			console.log("Video capture not available");
		}
	};

	this.render = function() {
		this.webcamImageContext.drawImage(this.webcam, 0, 0, this.webcam.videoWidth, this.webcam.videoHeight, 0, 0, this.webcamImage.width, this.webcamImage.height);
        this.leftCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
        this.rightCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
	};
}
