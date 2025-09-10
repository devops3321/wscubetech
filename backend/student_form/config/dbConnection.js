// server connection + db create

let mongodb = require("mongodb");
require("dotenv").config();
let dbClient = new mongodb.MongoClient(process.env.DB_URL);
let dbConnect = async()=>{
   await dbClient.connect();
   console.log("Database connected");
   let db = dbClient.db(process.env.DB_NAME);
   return db;
}

module.exports = {dbConnect};