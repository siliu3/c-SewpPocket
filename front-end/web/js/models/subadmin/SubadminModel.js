define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

    var SubadminModel = Backbone.Model.extend({
        idAttribute: "id",
        urlRoot:'/api/admin/subadmin',
        defaults : {
            aname       : null,
            account     : {},
        },

        gettoken:function(){
            var json_token=JSON.parse($.cookie('login'));
            var access_token=json_token.token.access_token;
            var bearer_token_str="Bearer "+access_token;
            return bearer_token_str;
        },
        
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var bearer_token_str=this.gettoken();
            options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
            return Backbone.Model.prototype.destroy.call(this,options);
        },
        save: function(attributes, options) {
            options = options ? _.clone(options) : {};
            var bearer_token_str=this.gettoken();
            options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
            return Backbone.Model.prototype.save.call(this,attributes,options);
        }

    });


    return SubadminModel;

});
