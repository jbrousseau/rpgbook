/**
 * Provides the model for RPG Character 
 * 
 * @module model
 * @submodule characters
 */
/* global Characters Meteor */
Characters = new Meteor.Collection("characters");

Characters.selectable();
Characters.avatarable();
Characters.ownerable();
Characters.timestampable();