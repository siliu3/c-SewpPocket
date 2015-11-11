define([ 'jquery', 
         'underscore', 
         'backbone', 
         'models/dictionary/DictionaryModel' 
],function($, _, Backbone, DictionaryModel) {
	var DictionaryCollection = Backbone.Collection.extend({
		model : DictionaryModel,
	
		initialize : function(models, options) {},		
		url: '/api/dictionarys',
	    
		gettoken:function(){
			var json_token=JSON.parse($.cookie('login'));
			var access_token=json_token.token.access_token;
			var bearer_token_str="Bearer "+access_token;
			return bearer_token_str;
		},
		fetch: function(options) {
			options = options ? _.clone(options) : {};
			var bearer_token_str=this.gettoken();
			options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
			return Backbone.Collection.prototype.fetch.call(this,options);
		},
	});

	return DictionaryCollection;
});