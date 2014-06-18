Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('characters', {
    path: '/characters',
    onBeforeAction: function() {
      return AccountsEntry.signInRequired(this);
    }
  });
  this.route('about');
});