import mongoose from "mongoose";

const atlasUrl = `mongodb+srv://sebastian_arevalo:FrU2aQSTKxWNlS0O@cluster0.gfb66.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(atlasUrl, {useNewUrlParser: true, dbName: "Games-DB"})
    .then((db) => console.log(`DB connection succesfully :)`))
    .catch((err) => console.log(err))
  
 export default mongoose


 

