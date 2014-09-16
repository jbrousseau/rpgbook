/* global Router */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  },
  onBeforeAction: function() {
   // $('#content-layout').addClass("animated fadeIn");
   // $('footer').removeClass("hide");
    $(window).scrollTop(0);
    return $('meta[name^="description"]').remove();
  },
  onAfterAction: function() {
    //$('#content-layout').addClass("animated fadeIn");
    //return $('footer').removeClass("hide");
  }
  
});

Router.onBeforeAction('loading');

