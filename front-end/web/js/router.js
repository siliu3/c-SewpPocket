// Filename: router.js
define([ 'jquery', 'backbone',
         'views/main/HomeView',
		 'views/main/UserInfoView',
		 'views/main/LoginView',
		 'views/main/RegistView',
		 'views/main/RequestView',
		 'views/main/PostView',
		 'views/main/ConsumerCommentView',
		 'views/main/ContributorCommentView',
		 'views/main/RegulatorPostView',
		 'views/main/RegulatorCommentView',
		 
         'views/main/NofoundView'
         
         ], function($, Backbone, 
        		HomeView,
				UserInfoView,
				LoginView,
				RegistView,
				RequestView,
				PostView,
				ConsumerCommentView,
				ContributorCommentView,
				RegulatorPostView,
				RegulatorCommentView,
				
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
			
			'consumer/request/:request_id/comments'			: 'consumerCommentPage',
			'contributor/post/:post_id/deal_request/comments'			: 'contributorCommentPage',
			
			'regulator/comments'			: 'regularCommentPage',
			'regulator/posts'			: 'regularPostPage',

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
		
		consumerCommentPage : function(request_id){
			this.loadView(new ConsumerCommentView({request_id:request_id}));
		},
		
		contributorCommentPage : function(post_id){
			this.loadView(new ContributorCommentView({post_id:post_id}));
		},
		
		regularCommentPage : function(){
			this.loadView(new RegulatorCommentView());
		},
		regularPostPage : function(){
			this.loadView(new RegulatorPostView());
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
