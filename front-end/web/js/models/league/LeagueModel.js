define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

    var LeagueModel = Backbone.Model.extend({
        idAttribute: "id",
        urlRoot:'/api/admin/league',
        defaults : {
            uname       : null,
            mobile      : null,
            corpname    : null,
            addr        : null,
            district    : null,

        }

    });


    return LeagueModel;

});
