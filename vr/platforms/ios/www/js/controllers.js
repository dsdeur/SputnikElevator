angular.module('starter.controllers', [])

.controller('VRViewerCtrl', function($scope, $stateParams,Simulator) {


	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		Simulator.start();

		window.plugins.insomnia.keepAwake()

    });


})











