define(function(require,exports,module){

	 require("angular");
     require('angular-route');
     app.config(['$routeProvider','$controllerProvider',function($routeProvider,$controllerProvider){
     	$routeProvider
     		.when('/start', {
		        templateUrl: '../demo/start.html',
		        controller: 'start',

		        resolve: {

		          keyName: function($q) {

		            var deferred = $q.defer();
		            require.async("./start.js",function(controller){
		              $controllerProvider.register('start', ['$scope', '$http', '$window', '$timeout',controller]);
		              deferred.resolve();
		            });
		            return deferred.promise;
		          }
		        }
		     })

     }])
}) 