define([ 'jquery', 'underscore', 'backbone',
         'text!templates/admin/base/headerTemplate.html' ], function($, _, Backbone,
                 headerTemplate) {

    var HeaderView = Backbone.View.extend({

        initialize : function() {
            this.render();
        },
        events:{
            'click #admin-logout' : 'logoutClick'
        },
        logoutClick : function(e) {
            e.preventDefault();
            this.logout();
        },

        logout: function() {
            $.removeCookie("login");
            Backbone.history.navigate('login', {trigger:true,replace: true});
        },

        render : function() {
            this.$el.html(headerTemplate);
        }

    });

    return HeaderView;

});
