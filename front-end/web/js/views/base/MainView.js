define([ 'jquery', 'underscore', 'backbone',
		'views/base/SidebarView',
		'views/base/HeaderView',
         'text!templates/base/mainTemplate.html' ], function($, _, Backbone,
         	SidebarView,HeaderView,
        		 mainTemplate) {

	var MainView = Backbone.View.extend({
		tagName: "div",
		id: "main-view",

		initialize : function(options) {
			this.checkLogin();

			$("body").html(this.el);
			this.pageView = options.pageView;
			this.render();


			this.sidebarView = new SidebarView( { el:this.$('#sidebar-wrapper')} );
			this.headerView  = new HeaderView(  { el:this.$('#header-wrapper')}  );
			
		},

		render : function() {
			this.$el.html(mainTemplate);
			this.$('#page-wrapper').append(this.pageView.$el);
		},


		checkLogin : function(){
			if(!this.hasLogined()){
				Backbone.history.navigate('login', {trigger:true,replace: true});
				throw new Error("401");
			}
		},
        
        
        hasLogined : function(){
            return !(typeof($.cookie('login')) === 'undefined') ;
			// && JSON.parse($.cookie('login')).loginType==='league';
        },

	});

	return MainView;

});
