define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

    var TokenModel = Backbone.Model.extend({
        idAttribute: "id",
        urlRoot:'/api/token',
        defaults : {
            access_token : '',
            refresh_token : '',
            token_type    : '',
            expires_in : 0
        }

    });


    return TokenModel;

});
