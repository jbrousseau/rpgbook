/* global Meteor FS Images gm*/
var imageStore = new FS.Store.GridFS("images", {
  maxTries: 1,
  chunkSize: 1024 * 1024,
  transformWrite: function(fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('110', '110').stream().pipe(writeStream);
  }
});

Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    maxSize: 1048576, //in bytes
    allow: {
      contentTypes: ['image/*']
    },
    deny: {
      extensions: ['bmp']
    },
    onInvalid: function(message) {
      if (Meteor.isClient) {
        alert(message);
      }
      else {
        console.log(message);
      }
    }
  }
});