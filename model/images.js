var imageStore = new FS.Store.GridFS("images", {
  maxTries: 1,
  chunkSize: 1024*1024
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});