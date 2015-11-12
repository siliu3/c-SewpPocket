define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var AccountModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/account',
		defaults : {
			username 		: null
		}

	});


	return AccountModel;

});
