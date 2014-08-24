/* global CollectionBehaviours */
CollectionBehaviours.defineBehaviour('ownerable', function(getTransform, args){
  var self = this;

  self.before.insert(function (userId, doc) {
    doc.owner_id = userId;
  });
});
  
