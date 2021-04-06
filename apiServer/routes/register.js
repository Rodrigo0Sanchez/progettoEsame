var express = require('express');
var cors = require('cors');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ProcioneOuO:enoicorp13@cluster0.4jsac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
router.use(cors());

/* POST */
router.post('/', function(req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("usersData").collection("users");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len == 1) {
                    client.close();
                    res.send({ status: "existing_user" });
                }
            }
        });

        if (len != 1) {
            var myobj = { username: `${username}`, password: `${pwd}` };
            collection.insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(`Utente ${username} registrato`);
            });
            
            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 500);
        }
    });
    
});

module.exports = router;
