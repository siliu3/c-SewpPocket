define([ 'jquery', 'underscore', 'backbone',
         'text!templates/base/sidebarTemplate.html' ], function($, _, Backbone,
                 sidebarTemplate) {

    var SidebarView = Backbone.View.extend({

        initialize : function() {
            this.render();
        },
        events : {
            'click li a[data-toggle="page"]'         : "navigate",
        },

        navigate : function(e){
            e.preventDefault();
            Backbone.history.navigate(e.currentTarget.getAttribute('href'), {trigger:true});
        },

        render : function() {
            this.$el.html(sidebarTemplate);
            this.$('#side-menu').metisMenu();
            var url = Backbone.history.fragment;
            this.$('.nav li').removeClass('active');
            this.$('.nav li a[href="'+url+'"][data-toggle="page"]').addClass('active');

            this.$('.nav li ul li a[class="active"]').parent().parent().addClass('in');
        }

    });

    return SidebarView;

});
