/* global CollectionBehaviours Session _ Images*/
/* global Avatarable  */
Avatarable = function(doc) {
  _.extend(this, doc);
};

CollectionBehaviours.defineBehaviour('avatarable', function(getTransform, args) {
  var self = this;
  _.extend(Avatarable.prototype, {
    //add functions to document collection
    avatarFileUrl: function() {
      var url = "/img/character/empty.gif";
      if (this.avatarfile_id) {
        var avatarFiles = Images.find({
          _id: this.avatarfile_id
        });
        if (avatarFiles) {
          avatarFiles.forEach(function (file) {
            url = file.url();
          });
        }
      }
      return url;
    }
  });
  if (_.isFunction(self._transform)) {
    self.prevTransformA = self._transform;
  } else {
    self.prevTransformA = function(doc) { return doc; };
  }
  self._transform = function(doc) {
    return new Avatarable(self.prevTransformA(doc));
  };
});