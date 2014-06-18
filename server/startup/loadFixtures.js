/**
 * Insert in database some data when you first startup the server
 *
 * @module server
 * @submodule startup
 */
 
 /**
 * insert in DB a collection
 *
 * @method loadFixture
 * @param {array} fixtures list of fixtures to insert.
 * @param {Meteor.Collection} collection the collection in database
 * @return {Boolean} true
 */
 function loadFixture(fixtures, collection) {
    var i;

    for (i = 0; i < fixtures.length; i+= 1) {
        //collection.remove({ });
        collection.insert(fixtures[i]);
    }
    return true;
}

Meteor.startup(function () {
    //loadFixture(Fixtures['dummyFixture'], DummyCollection);
});