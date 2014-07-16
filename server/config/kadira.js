var kadiraConfig = Meteor.settings.kadira;
if(kadiraConfig) {
   Kadira.connect(kadira.appId, kadira.appSecret);
}