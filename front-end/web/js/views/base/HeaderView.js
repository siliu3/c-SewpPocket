define([ 'jquery', 'underscore', 'backbone',
         'text!templates/base/headerTemplate.html' ], function($, _, Backbone,
                 headerTemplate) {

    var HeaderView = Backbone.View.extend({

        initialize : function() {
            this.render();
        },
        events : {
            'click #logout' : 'logoutClick',
            'click li a[data-toggle="page"]'         : "navigate",
        },

        navigate : function(e){
            e.preventDefault();
            Backbone.history.navigate(e.currentTarget.getAttribute('href'), {trigger:true});
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
