define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var DeviceModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/device',
		defaults : {
			devccode   		: '',
			hwversion   	: '',
			swversion   	: '',
			signal   		: 0,
			vol   			: 0,
			status   		: 0,
			lid				: null,
			cnsntype		: 0,
			frbdads			: 0,
			crettime		: null,
			section			: '',
			location		: '',
			excncorps		: [],
			restfloor		: 1,
			nomaskfloor		: []
		},
		
		gettoken:function(){
			var json_token=JSON.parse($.cookie('login'));
			var access_token=json_token.token.access_token;
			var bearer_token_str="Bearer "+access_token;
			return bearer_token_str;
		},
		
		save: function(attributes, options) {
		    options = options ? _.clone(options) : {};
			var bearer_token_str=this.gettoken();
			options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
			return Backbone.Model.prototype.save.call(this,attributes,options);
		},
		fetch: function(options) {
				options = options ? _.clone(options) : {};
				var bearer_token_str=this.gettoken();
				options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
				return Backbone.Model.prototype.fetch.call(this,options);
		},
	});


	return DeviceModel;

});
