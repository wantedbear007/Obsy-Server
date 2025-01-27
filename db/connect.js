const mongoose = require("mongoose");
const { collection } = require("../models/user");
const { ObsyTaskSchema } = require("../models/task");
const {cronStarter}  = require('../utils/cronutil')

const AllTaskCollection = mongoose.model("Task", ObsyTaskSchema);
const AllUserCollection = mongoose.model("User");
const changeStream = AllTaskCollection.watch();

mongoose.set("strictQuery", true);
const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })

    .then(() => {
      console.log("connected to db");
      console.log("starting scan of all tasks")
        cronStarter(AllTaskCollection)
    

    // changeStream.on('change', (change) => {
    //   console.log('Change event:', change);
    //     cronStarter(AllTaskCollection)
    // });

    console.log('Listening for changes...');
    
      // mongoose.connection.db.listCollections().toArray((err, collections) => {
      //   collections.forEach((collection) => {
      //     console.log(collection.name);

      //     if(collection.name == 'tasks'){
      //       console.log("entering asks collection")
      //     //  cronStarter(collection)
      //     }


      //   });
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

//console.log(connectDB.getCollectionNames())

module.exports = {
  connectDB,
};
