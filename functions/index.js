/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://musicapp-f7c73-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const express = require("express");
const cors = require("cors");
const { response } = require("express");

// Main API 
const app = express();
app.use(cors({origin: true}));

// Database 
const db = admin.firestore();

// Routes
app.get("/",(reg, res)=>{
  return res.status(200).send("Hello firebase API");
});

// create -> post()
app.post("/api/create",(reg, res)=>{
  (async () => {
    try {
      await db.collection("userDetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        id: doc.data().id,
        name: reg.body.name,
        mobile: reg.body.mobile,
        address: reg.body.address,
      });
      return res.status(200).send({ status:"sucess", msg:"Data Saved" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status:"False", msg:error });
    }
  })();
});
// get -> get()
app.get("/api/get/:id",(reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      let userDetail = await reqDoc.get();
      let response = userDetail.data();
      return res.status(200).send({ status:"sucess", data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status:"False", msg:error });
    }
  })();
});

app.get("/api/getALL",(reg, res)=>{
  (async () => {
    try {
      const query = db.collection("userDetails");
      let response = [];
      await query.get().then((data)=>{
        let docs = data.docs;
        docs.map(doc => {
          const selectionItem ={
            id: doc.data().id,
            name: doc.data().name,
            mobile: doc.data().mobile,
            address: doc.data().address,
          };

          response.push(selectionItem);
        });
        return response;
     });
      return res.status(200).send({ status:"sucess", data: response });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status:"False", msg:error });
    }
  })();
});
//update -> put()
app.put("/api/update/:id",(reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      await reqDoc.update({
        name: reg.body.name,
        mobile: reg.body.mobile,
        address: reg.body.address,
      });
      return res.status(200).send({ status:"sucess", msg:"Data Update" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status:"False", msg:error });
    }
  })();
});
//delete -> delete()
app.delete("/api/delete/:id",(reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({ status:"sucess", msg:"Data Delete" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ status:"False", msg:error });
    }
  })();
});
//export data the api to firebase cloud functions

exports.app  = functions.https.onRequest(app); 