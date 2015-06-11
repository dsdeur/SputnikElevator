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
		var getUserMedia = navigator.getUserMedia ? function(a, b, c) { navigator.getUserMedia(a, b, c); } : (navigator.webkitGetUserMedia ? function(a, b, c) { navigator.webkitGetUserMedia(a, b, c); } : null);
		if (getUserMedia != null) {
			MediaStreamTrack.getSources(function(sourceInfos) {
				var videoSource = null;
				// Select the rear camera. We are assuming it is the last one.
				// TODO: assumption is the mother of all...
				for (var i = 0; i < sourceInfos.length; i++) {
					var sourceInfo = sourceInfos[i];
					//console.log('source: ', sourceInfo);
					if (sourceInfo.kind === 'video') {
						//console.log(sourceInfo.id, sourceInfo.label || 'camera');
						videoSource = sourceInfo.id;
						//break; // uncomment for selecting the first one.
					}
				}

				if (videoSource != null) {
					getUserMedia.call(this, {
							video: {
								optional: [
								{ sourceId: videoSource },
								{ minWidth: 640 },
								{ maxWidth: 640 },
								{ minHeight: 480 },
								{ maxHeight: 480 }
								]
							},
							//video: true,
							audio: false
						},
						function(stream){
							this.webcam.src = window.webkitURL.createObjectURL(stream);
							this.webcam.play();
						},
						function(error) {
							console.log("Video capture disabled");
						});
				} else {
					console.log("Video capture not available");
				}
			});
		} else {
			console.log("HTML5 video not supported");
		}
	};

	this.render = function() {
		this.webcamImageContext.drawImage(this.webcam, 0, 0, this.webcam.videoWidth, this.webcam.videoHeight, 0, 0, this.webcamImage.width, this.webcamImage.height);
        this.leftCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
        this.rightCamContext.drawImage(this.webcamImage, 0, 0, this.webcamImage.width, this.webcamImage.height, 0, 0, this.leftcam.width, this.leftcam.height);
	};
}
