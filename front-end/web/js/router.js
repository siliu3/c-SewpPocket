// Filename: router.js
define([ 'jquery', 'backbone',
        //  'views/base/MainView',

         'views/main/HomeView',
		 'views/main/UserInfoView',
        //  'views/main/DeviceView',
        //  'views/main/DeviceDetailView',
        //  'views/main/DevicePriceView',
		//  'views/main/DictionaryView',
		//  'views/main/SubleagueView',
		 'views/main/LoginView',
		 'views/main/RegistView',
		 'views/main/RequestView',
		 'views/main/PostView',
		 
         'views/main/NofoundView'
         
         ], function($, Backbone, 
        		HomeView,
				UserInfoView,
				//  DeviceView,DeviceDetailView,DevicePriceView,
        		//  DictionaryView,SubleagueView,
				LoginView,
				RegistView,
				RequestView,
				PostView,
				
				NofoundView
		) {
	


	var AppRouter = Backbone.Router.extend({
		routes : {
			// Define some URL routes
			''							: 'homePage',
			'/'							: 'homePage',
			'login'						: 'loginPage',
			'regist'					: 'registPage',

			'userinfo'					: 'userInfoPage',
			'consumer/requests'			: 'requestPage',
			'contributor/posts'			: 'postPage',

			// Default
			'*action' 					: 'nofoundPage'
		},
		homePage : function(){
			this.loadView(new HomeView());
		},

		userInfoPage : function() {
			this.loadView(new UserInfoView());
		},

		// deviceDetailPage : function(deviceID) {
		// 	this.loadView(new DeviceDetailView({
		// 		deviceID : deviceID
		// 	}));
		// },
		
		// devicePricePage : function() {
		// 	this.loadView(new DevicePriceView());
		// },
		
		// dictionaryPage : function() {
		// 	this.loadView(new DictionaryView());
		// },
		
		

		// testPage :function() {
		// 	this.loadView(new TestDeviceView());
		// },

		loginPage : function() {
			this.loadView(new LoginView());
		},
		registPage : function() {
			this.loadView(new RegistView());
		},
			
		requestPage : function(){
			this.loadView(new RequestView());
		},
		postPage : function(){
			this.loadView(new PostView());
		},

		
		nofoundPage : function(){
			this.loadView(new NofoundView());
		},

		loadView : function(view) {
			this.view && (this.view.close ? this.view.close() : this.view.remove());
			this.view = view;
		}
	});

	$.ajaxSetup({
		statusCode: {
			401: function(e){

				Backbone.history.navigate('login', {trigger:true,replace: true});
				throw new Error("401"); 

			},
		}
	});
	
	$.cookie.defaults = { path: '/', expires: 365 };

	return AppRouter;
});
