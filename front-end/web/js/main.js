// Filename: main.js

require.config({
  //  baseUrl: "/js/",
  urlArgs: "version=0.1.1",
  paths: {
    text                  : 'libs/text/text',
    jquery                : 'libs/jquery/dist/jquery.min',  
    underscore            : 'libs/underscore/underscore-min',
    backbone              : 'libs/backbone/backbone',
    
    bootstrap             : 'libs/bootstrap/dist/js/bootstrap.min',
    jquery_cookie         : 'libs/jquery.cookie/jquery.cookie',
    
    metisMenu             : 'libs/metisMenu/dist/metisMenu',
    sb_admin_2            : 'libs/startbootstrap-sb-admin-2/dist/js/sb-admin-2',
    
    templates             : '../templates',
    data                  : '../data',
  },
  shim: {
    'backbone_paginator'      :{deps: ['backbone']},
    'jquery_cookie'           :{deps: ['jquery']},
    'bootstrap'               :{deps: ['jquery']},
    
    'metisMenu'               :{deps: ['bootstrap']},
    'sb_admin_2'               :{deps: ['metisMenu']},
  }

});

require([
  'jquery',  
  'bootstrap',
  'jquery_cookie',
  'metisMenu',
  'sb_admin_2',
// Load our app module and pass it to our definition function
  'app'
], 
function($,Bootstrap,Jquery_cookie,MetisMenu,SB_Admin_2,App){
  var app = new App();
  app.initialize();
});


