angular.module('flishup')
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "js/app.html",
        controller: 'AppCtrl'
    })

    .state('app.origDest',{
        url: "/origDest",
        cache: false,
        views: {
            'mainContent': {
                templateUrl: "js/views/route_selection/main.html",
                controller: 'origDest'
            }
        }
    })

    .state('app.datePicker',{
        url: "/datePicker",
        cache: false,
        views: {
            'mainContent': {
                templateUrl: "js/views/date_selection/main.html",
                controller: 'datePicker'
            }
        }
    })

    .state('app.searchingFlights', {
        url: "/searchingFlights",
        cache: false,
        views: {
            'mainContent': {
                templateUrl: "js/views/flight_search/main.html",
                controller: 'searchingFlights'
            }
        }
    })

    .state('app.flightsList', {
        url: "/flightsList",
        cache: false,
        views: {
            'mainContent': {
                templateUrl: "js/views/flights_list/main.html",
                controller: 'flightsListCtrl'
            }
        }
    })

    .state('app.singleFlight', {
        url: "/flight/:flightId",
        views: {
            'mainContent': {
                templateUrl: "js/views/single_flight/main.html",
                controller: 'singleFlightCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/origDest');
});