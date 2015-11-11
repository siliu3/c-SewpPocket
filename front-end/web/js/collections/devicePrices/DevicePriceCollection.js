define([ 'jquery', 
	     'underscore', 
	     'backbone', 
	     'models/devicePrices/DevicePriceModel' 
    ],function($, _, Backbone, DevicePriceModel) {
		var DevicePriceCollection = Backbone.Collection.extend({
            model : DevicePriceModel,
            initialize : function(models, options) {},
            url: '/api/deviceprices',
            
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
			
			save: function(attributes, options) {
			    options = options ? _.clone(options) : {};
				var bearer_token_str=this.gettoken();
				options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
				return Backbone.Collection.prototype.save.call(this,attributes,options);
			}
        });
		
        return DevicePriceCollection;
    });
