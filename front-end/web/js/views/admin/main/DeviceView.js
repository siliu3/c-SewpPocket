define([
  'jquery',
  'underscore',
  'backbone',
  'models/devices/DeviceModel',
  'collections/devices/DeviceCollection',
  'text!templates/admin/main/deviceTemplate.html',
  
], function($, _, Backbone, 
        DeviceModel,DeviceCollection,
        deviceTemplate){

  var HomeView = Backbone.View.extend({
    el: 'body',
    title: $("title"),
    
    initialize : function() {

    },
    
    events:{

        },
    

    render: function(){
        $(document).attr("title","设备管理");
        
        $('.nav li').removeClass('active');
        $('.nav li a[href="admin/device"]').addClass('active');

        $('#page-wrapper').html(deviceTemplate);      
    }

  });

  return HomeView;
  
});
