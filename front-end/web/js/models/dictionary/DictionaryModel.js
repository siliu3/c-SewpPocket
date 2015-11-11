define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var DictionaryModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/dictionary',
		defaults : {
			pid   			: 0,
			code	   		: 0,
			dname		   	: '',
			dsort   		: 0,
			dtype   		: 0
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
		
		add: function(attributes, options) {
		    options = options ? _.clone(options) : {};
			var bearer_token_str=this.gettoken();
			options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
			return Backbone.Model.prototype.add.call(this,attributes,options);
		},
		
		destroy: function(options) {
            options = options ? _.clone(options) : {};
            var bearer_token_str=this.gettoken();
            options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
            return Backbone.Model.prototype.destroy.call(this,options);
        }
	});


	return DictionaryModel;

});
