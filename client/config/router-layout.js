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
