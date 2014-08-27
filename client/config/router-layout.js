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
    $(window).scrollTop(0);
    return $('meta[name^="description"]').remove();
  }
  
});

animateContentOut = function() {
    $('#content-layout').removeClass("animated fadeIn");
    return $('footer').addClass("hide");
}
animateContentIn = function() {
    $('#content-layout').addClass("animated fadeIn");
    return $('footer').removeClass("hide");
}

//Router.onBeforeAction('loading');
// define this as a global onAfterAction so it happens all the time
Router.onAfterAction(animateContentIn);
// define this as a global onBeforeAction so it happens all the time
Router.onBeforeAction(animateContentOut);
