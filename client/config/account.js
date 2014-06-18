Meteor.startup(function() {
  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/characters',
    passwordSignupFields: 'EMAIL_ONLY',
    language: 'en',
    sendVerificationEmail:true,
    showSignupCode: false,
    wrapLinks: true
  });
});
