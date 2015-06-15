


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var sceneLeftContainer = document.getElementById('sceneLeft');
        var sceneRightContainer = document.getElementById('sceneRight');

        var videoLeft = document.getElementById('videoLeft');
        var videoRight = document.getElementById('videoRight');

        var webcamLeft

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
    },
};

app.initialize();
