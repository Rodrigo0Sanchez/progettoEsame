var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ProcioneOuO:enoicorp13@cluster0.4jsac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

/* POST */
router.post('/', function(req, res) {
    var username = req.body.username;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("pets").collection(username);
        collection.find().toArray((err, result) => {
            if (err) console.log(err.message);
            res.send(result);
        });
    });
    
});

module.exports = router;
