/**
 * Provides the model for RPG Book 
 *
 * @module model
 * @submodule groups
 */
 /* global Groups Meteor */
Groups = new Meteor.Collection("groups");

Groups.selectable();
Groups.ownerable();
Groups.timestampable();