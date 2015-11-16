define(['jquery', 'underscore', 'backbone',
    'models/user/UserModel',
    'text!templates/base/sidebarTemplate.html'], function ($, _, Backbone,
        UserModel,
        sidebarTemplate) {

        var SidebarView = Backbone.View.extend({

            initialize: function () {
                
                
                this.user = new UserModel();
                this.user.fetch({async:false});
                this.is_regulator = this.user.get('is_regulator');
                
                this.render();
            },
            events: {
                'click li a[data-toggle="page"]': "navigate",
                'click .post_category': "select_category",
            },
            
            select_category: function (e) {
                
                console.log($(e.currentTarget).attr('value'));
                $(".post_category_name").parent().hide();
			    $(".post_category_name:contains("+$(e.currentTarget).attr('value')+")").parent().show();
            },
            
            navigate: function (e) {
                e.preventDefault();
                Backbone.history.navigate(e.currentTarget.getAttribute('href'), { trigger: true });
            },

            render: function () {
                
                var templateObject = _.template(sidebarTemplate); 
                this.$el.html(templateObject(
                {
                _:_,
                is_regulator: this.is_regulator
                }
                ));
                
                
                this.$('#side-menu').metisMenu();
                var url = Backbone.history.fragment;
                this.$('.nav li').removeClass('active');
                this.$('.nav li a[href="' + url + '"][data-toggle="page"]').addClass('active');

                this.$('.nav li ul li a[class="active"]').parent().parent().addClass('in');
            }

        });

        return SidebarView;

    });
