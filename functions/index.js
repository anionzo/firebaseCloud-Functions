/* eslint-disable max-len */
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

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://musicapp-f7c73-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const express = require("express");
const cors = require("cors");

// Main API
const app = express();
app.use(cors({origin: true}));

// Database
const db = admin.firestore();

// Routes
app.get("/", (reg, res)=>{
  return res.status(200).send("Hello firebase API");
});

// user-------------------------------------------------------------- --------------------
// create -> post()
app.post("/api/create", (reg, res)=>{
  (async () => {
    try {
      await db.collection("userDetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: reg.body.name,
        mobile: reg.body.mobile,
        address: reg.body.address,
        email: reg.body.email,
        bio: reg.body.bio,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// get -> get()
app.get("/api/get/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/getALL", (reg, res)=>{
  (async () => {
    try {
      const query = db.collection("userDetails");
      const response = [];
      await query.get().then((data)=>{
        const docs = data.docs;
        docs.map( (doc) => {
          const selectionItem ={
            id: doc.data().id,
            name: doc.data().name,
            mobile: doc.data().mobile,
            address: doc.data().address,
            email: doc.data().email,
            bio: doc.data().bio,
          };

          response.push(selectionItem);
        });
        return response;
      });
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// update -> put()
app.put("/api/update/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      await reqDoc.update({
        name: reg.body.name,
        mobile: reg.body.mobile,
        address: reg.body.address,
        email: reg.body.email,
        bio: reg.body.bio,
      });
      return res.status(200).send({status: "sucess", msg: "Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/delete/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});


// Music -> Music
app.get("/music", (reg, res)=>{
  return res.status(200).send("Hello Music");
});
app.post("/api/music/create", (reg, res)=>{
  (async () => {
    try {
      await db.collection("music").doc(`/${Date.now()}/`).create({
        idSong: Date.now(),
        idCategory: reg.body.idCategory,
        idAlbum: reg.body.idAlbum,
        nameSong: reg.body.nameSong,
        linkImg: reg.body.linkImg,
        idSinger: reg.body.idSinger,
        linkSong: reg.body.linkSong,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved Music"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/music/get/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("music").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/music/getALL", (reg, res)=>{
  (async () => {
    try {
      const query = db.collection("music");
      const response = [];
      await query.get().then((data)=>{
        const docs = data.docs;
        docs.map( (doc) => {
          const selectionItem ={
            idSong: doc.data().idSong,
            idCategory: doc.data().idCategory,
            idAlbum: doc.data().idAlbum,
            nameSong: doc.data().nameSong,
            linkImg: doc.data().linkImg,
            idSinger: doc.data().idSinger,
            linkSong: doc.data().linkSong,
          };

          response.push(selectionItem);
        });
        return response;
      });
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// update -> put()
app.put("/api/music/update/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("music").doc(reg.params.id);
      await reqDoc.update({
        idCategory: reg.body.idCategory,
        idAlbum: reg.body.idAlbum,
        nameSong: reg.body.nameSong,
        linkImg: reg.body.linkImg,
        idSinger: reg.body.idSinger,
        linkSong: reg.body.linkSong,
      });
      return res.status(200).send({status: "sucess", msg: "Music Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/music/delete/:id", (reg, res)=>{
  (async () => {
    try {
      const reqDoc = db.collection("music").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// export data the api to firebase cloud functions
exports.app = functions.https.onRequest(app);
