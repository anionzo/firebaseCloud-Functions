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
app.get("/", (reg, res) => {
  return res.status(200).send("Hello firebase API");
});

// user-------------------------------------------------------------- --------------------
// create -> post()
app.post("/api/create", (reg, res) => {
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
app.get("/api/get/:id", (reg, res) => {
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

app.get("/api/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("userDetails");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
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
app.put("/api/update/:id", (reg, res) => {
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
app.delete("/api/delete/:id", (reg, res) => {
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
app.get("/music", (reg, res) => {
  return res.status(200).send("Hello Music");
});
app.post("/api/music/create", (reg, res) => {
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
app.get("/api/music/get/:id", (reg, res) => {
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

app.get("/api/music/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("music");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
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
app.put("/api/music/update/:id", (reg, res) => {
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
app.delete("/api/music/delete/:id", (reg, res) => {
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

// ----------------------------------------------------------------
// Alunm
app.get("/album", (reg, res) => {
  return res.status(200).send("Hello Album");
});
app.post("/api/album/create", (reg, res) => {
  (async () => {
    try {
      await db.collection("album").doc(`/${Date.now()}/`).create({
        idAlbum: Date.now(),
        nameAlbum: reg.body.nameAlbum,
        ImgAlbum: reg.body.ImgAlbum,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved Album"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/album/get/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("album").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/album/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("album");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
            idAlbum: doc.data().idAlbum,
            nameAlbum: doc.data().nameAlbum,
            ImgAlbum: doc.data().ImgAlbum,
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
app.put("/api/album/update/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("album").doc(reg.params.id);
      await reqDoc.update({
        nameAlbum: reg.body.nameAlbum,
        ImgAlbum: reg.body.ImgAlbum,
      });
      return res.status(200).send({status: "sucess", msg: "Album Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/album/delete/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("album").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// ----------------------------------------------------------------
// Thể loại categrỏy


app.get("/category", (reg, res) => {
  return res.status(200).send("Hello Category");
});
app.post("/api/category/create", (reg, res) => {
  (async () => {
    try {
      await db.collection("category").doc(`/${Date.now()}/`).create({
        idCategory: Date.now(),
        idTopic: reg.body.idTopic,
        nameCategory: reg.body.nameCategory,
        imgCategory: reg.body.imgCategory,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved Category"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/category/get/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("category").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/category/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("category");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
            idCategory: doc.data().idCategory,
            idTopic: doc.data().idTopic,
            nameCategory: doc.data().nameCategory,
            imgCategory: doc.data().imgCategory,
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
app.put("/api/category/update/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("category").doc(reg.params.id);
      await reqDoc.update({
        idTopic: reg.body.idTopic,
        nameCategory: reg.body.nameCategory,
        imgCategory: reg.body.imgCategory,
      });
      return res.status(200).send({status: "sucess", msg: "Category Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/category/delete/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("category").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// ----------------------------------------------------------------
// Topic

app.get("/topic", (reg, res) => {
  return res.status(200).send("Hello Topic");
});

app.post("/api/topic/create", (reg, res) => {
  (async () => {
    try {
      await db.collection("topic").doc(`/${Date.now()}/`).create({
        idTopic: Date.now(),
        nameTopic: reg.body.nameTopic,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved Topic"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/topic/get/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("topic").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/topic/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("topic");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
            idTopic: doc.data().idTopic,
            nameTopic: doc.data().nameTopic,
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
app.put("/api/topic/update/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("topic").doc(reg.params.id);
      await reqDoc.update({
        nameTopic: reg.body.nameTopic,
      });
      return res.status(200).send({status: "sucess", msg: "Topic Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/topic/delete/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("topic").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// ----------------------------------------------------------------
// Singer

app.get("/singer", (reg, res) => {
  return res.status(200).send("Hello Singers");
});
app.post("/api/singer/create", (reg, res) => {
  (async () => {
    try {
      await db.collection("singer").doc(`/${Date.now()}/`).create({
        idSinger: Date.now(),
        nameSinger: reg.body.nameSinger,
        imgSinger: reg.body.imgSinger,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved Category"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/singer/get/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("singer").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/singer/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("singer");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
            idSinger: doc.data().idSinger,
            nameSinger: doc.data().nameSinger,
            imgSinger: doc.data().imgSinger,
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
app.put("/api/singer/update/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("singer").doc(reg.params.id);
      await reqDoc.update({
        idSinger: reg.body.idSinger,
        nameSinger: reg.body.nameSinger,
        imgSinger: reg.body.imgSinger,
      });
      return res.status(200).send({status: "sucess", msg: "Singer Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/singer/delete/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("singer").doc(reg.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "sucess", msg: "Data Delete"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// ----------------------------------------------------------------
// love song
app.get("/lovesong", (reg, res) => {
  return res.status(200).send("Bài Hát yêu Thích!");
});
app.post("/api/lovesong/create", (reg, res) => {
  (async () => {
    try {
      await db.collection("lovesong").doc(`/${Date.now()}/`).create({
        idUser: reg.body.idUser,
        idSinger: reg.body.idSinger,
      });
      return res.status(200).send({status: "sucess", msg: "Data Saved lovesong"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

// get -> get()
app.get("/api/lovesong/get/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("lovesong").doc(reg.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();
      return res.status(200).send({status: "sucess", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});

app.get("/api/lovesong/getALL", (reg, res) => {
  (async () => {
    try {
      const query = db.collection("lovesong");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.map((doc) => {
          const selectionItem = {
            idUser: doc.data().idUser,
            idSong: doc.data().idSong,
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
app.put("/api/lovesong/update/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("lovesong").doc(reg.params.id);
      await reqDoc.update({
        idUser: reg.body.idUser,
        idSong: reg.body.idSong,
      });
      return res.status(200).send({status: "sucess", msg: "Singer Data Update"});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "False", msg: error});
    }
  })();
});
// delete -> delete()
app.delete("/api/lovesong/delete/:id", (reg, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("lovesong").doc(reg.params.id);
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
