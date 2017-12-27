define(function(require, exports, module){
	// var changeText= require('changeText');
	// var $=require('jquery');
	// // var title=document.getElementById('title');
	// // title.innerHTML=changeText.tan();
	// var showText=function(){
	// 	$('#title').text(changeText.tan());
	// }
	// // $('#title').html(changeText.tan());

	// exports.showText=showText;
	require("angular");
    require('angular-route');
    require('moment');
    $=require('jquery');
    // require('bootstrap-switch');
	app=angular.module('hd',['ngRoute']);
	require('./route.js');
	app.controller('demoCtrl',['$scope','$location',function($scope,$location){
		$scope.title='sea.js例子';
		// $scope.chan=function(){
		// 	if($scope.title=='ken'){
		// 		$scope.title='sea.js例子'
		// 	}else if($scope.title=='sea.js例子'){
		// 		$scope.title='ken'
		// 	}
		// }
		$scope.jump = function(arg,obj) {
        	$location.url(arg,obj);
   //      	var unixtime=1513838843;
			// var unixTimestamp = new Date(unixtime* 1000); 
			// commonTime = unixTimestamp.toLocaleString();
			// alert("普通时间为："+commonTime);
			var d=moment(new Date()).unix();
			alert(d);
      	}
	}]);

	return {
        init: function() {
            angular.bootstrap($("#demo"), ["hd"]);
            $('[ng-controller]').show();
        }
    };

	
});  