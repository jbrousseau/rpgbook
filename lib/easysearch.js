
 // Searching
 Meteor.startup(function() {
   // on Client and Server
   EasySearch.createSearchIndex('characters-search-invite', {
     'collection': Characters, // instanceof Meteor.Collection
     'field': 'name', // can also be an array of fields
     'limit': 10, // default: 10
     'use': 'mongo-db'
   });
 });