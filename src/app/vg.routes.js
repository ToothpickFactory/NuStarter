.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/state1');

	$stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "state1/state1.html"
    })
		.state('state2', {
      url: "/state2",
      templateUrl: "state2/state2.html"
    })

})
