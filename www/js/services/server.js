angular.module( 'flishup' )
.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.post['Content-Type'];
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.service( 'server', [ 'APP_CONFIG', '$q', '$http', function( config, $q, $http ){
	/**
	* loads flights from server for a date, origin and destination given by parameter.
	*/
	this.loadData = function( date, orig, dest ){
		var params = {
			url: config.flightSourceUrl + date + '/' + orig + '/' + dest + '/',
			method: 'GET',
			headers: { 'Content-Type': "application/json" }
		};
		//return this.requestServer( params );
		return this._fakeFlightData();
	};
	/**
	* loads crew from server for a flight and date given by parameter.
	*/
	this.getCrew = function( flight, date ){
		var params = {
			url: config.crewSourceUrl + flight + '/' + date + '/',
			method: 'GET',
			headers: { 'Content-Type': "application/json" }
		};
		//return this.requestServer( params );
		return this._fakeCrewData();
	};
	/**
	* performs the server request using given parameters
	*/
	this.requestServer = function( queryParams ){
		var deferred = $q.defer();
		$http.get(queryParams.url)
		//$http( queryParams )
		.success( function( response, status ){
			if( response.success ){
				deferred.resolve( response.data );
			}else{
				deferred.reject( response );
			}
		}).error( function(data, status, headers, config){
			deferred.resolve( { success: false, why: 'unexpected server error.' } );
		});

		return deferred.promise;
	};

	this._fakeFlightData = function(){
		var deferred = $q.defer();
		setTimeout(function(){
			var data = [];
			var today = new Date();
			for( var i = 0; i < 12; i++ ){
				data.push({
					airlineConfirmed: ~~(Math.random() * 1) == 0,
					airportFrom: 'AEP',
					airportTo: 'COR',
					date: today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
					departure: '07:00',
					destination: "Córdoba",
					estim: '06:50',
					flight: 'AR ' + (1000 + ~~(Math.random()*2000)),
					health: ['ok','error','unknown','warning','Cancelled'].splice(~~(Math.random()*4),1)[0],
					id: String( Math.random() ),
					pic: 'img/flights/none.jpg',
					position: '',
					registration: 'LV'+String.fromCharCode(65+(~~(Math.random()*25)))+String.fromCharCode(65+(~~(Math.random()*25)))+String.fromCharCode(65+(~~(Math.random()*25))),
					status: 'Took off',
					terminal: 'AA',
					time: '06:05'
				});
			}
			deferred.resolve( data );

		},(1000 + ~~(Math.random() * 2000)));//wait from 1 to 3 seconds
		return deferred.promise;
	};

	this._fakeCrewData = function(){
		var deferred = $q.defer();
		var data = { crew: [] };
		var names = ['Moe','Homer','Marge','Selma','Patty', 'Carl', 'Kent', 'Manjula','Martin','Troy'];
		var lastNames = ['Simpson', 'Bouvier', 'Brockman', 'Carlson', 'Szyslak', 'Van Houten', 'Skinner', 'Smithers','Riviera','Quimby','Prince','Nahasapeemapetilon','McClure'];
		setTimeout(function(){
			for( var i = 0; i < 6; i ++ ){
				data.crew.push({
					name: names[ ~~(Math.random()*(names.length-1)) ] + ' ' + lastNames[ ~~(Math.random()*(lastNames.length-1)) ] + ', ' + (20000 + ~~(Math.random()*20000)),
					position: ['CP','FO','CM','AX','AX','AX'][i]
				});
			}
			deferred.resolve( data );

		},(1000 + ~~(Math.random() * 2000)));//wait from 1 to 3 seconds
		return deferred.promise;
	}

	return this;
}]);