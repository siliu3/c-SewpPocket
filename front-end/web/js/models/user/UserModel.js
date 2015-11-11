define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var UserModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/user',
		defaults : {
			nickname 		: null,
			email 		: null,
			phone 	: null,
			name 		: null,
			eid 	: null,

			is_regulator 	: null
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
		}

	});


	return UserModel;

});
