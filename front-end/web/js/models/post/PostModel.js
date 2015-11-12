define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var PostModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/contributor/post',
		defaults : {
			id			: null,
			name   	: null,
			category   	: null,
			price   	: null,
			description   	: null,
		}
	});

	return PostModel;

});
