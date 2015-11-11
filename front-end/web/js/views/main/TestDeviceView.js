define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/devices/DeviceModel',
  'collections/devices/TestDeviceCollection',
  'text!templates/main/testDeviceTemplate.html',  
], function($, _, Backbone, MainView,
        DeviceModel,DeviceCollection,
        deviceTemplate){

  var TestDeviceView = Backbone.View.extend({
    title: $("title"),
    
    initialize : function() {
        this.page = 1;
        this.collection = new DeviceCollection([]);
        this.collection.bind('reset', this.addAllSuccess,this);

        this.render();
        this.baseView = new MainView({pageView:this});

        this.collection.fetch();
    },
    
    events:{
        },
    
    addAllSuccess : function(){
      this.renderTable();
      this.renderPagine();
    },

    renderTable: function(){
      var tableDom = $("<div></div").html(deviceTemplate);
      var devicesTableTemplateObject = _.template(tableDom.find("#devices_table_tmpl").html());   
      this.$('tbody').html(
        devicesTableTemplateObject({
              devices : this.collection.models,
                  _ : _,
              }
        ) 
      );
    },

    renderPagine : function() {
      this.$('#page-selection').bootpag({
            total: this.collection.state.totalPages,
            page: this.page
      });
    },

    render: function(){
        var that = this;
        $(document).attr("title","设备管理");

        $('.nav li').removeClass('active');
        $('.nav li a[href="device"]').addClass('active');

        var devicesTemplateObject = _.template(deviceTemplate); 
        this.$el.html(devicesTemplateObject(
          {
            _:_,
            devices: []
          }
        ));

        this.$('#page-selection').bootpag({
          total: 5
        }).on("page", function(event, num){
          that.collection.getPage(num);
          that.page = num;
        });
    },



  });

  return TestDeviceView;
  });