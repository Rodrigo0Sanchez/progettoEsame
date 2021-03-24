var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = '';

/* POST */
router.post('/', function(req, res) {
    var username = req.body.username;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("").collection("");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            res.send(result);
        });
    });
    
});

module.exports = router;
