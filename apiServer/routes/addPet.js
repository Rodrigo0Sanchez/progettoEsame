var express = require('express');
var cors = require('cors');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ProcioneOuO:enoicorp13@cluster0.4jsac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
router.use(cors());

/* POST */
router.post('/', function(req, res) {
    var username = req.body.username;
    var petName = req.body.name;
    var race = req.body.race;
    var weight = req.body.weight;
    var color = req.body.color;
    var eyesColor = req.body.eyesColor;
    var age = req.body.age;
    var pic = req.body.pic;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("pets").collection(username);
        collection.find({ 'name': `${petName}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len == 1) {
                    client.close();
                    res.send({ status: "existing" });
                }
            }
        });

        if (len != 1) {
            var myobj = { name: `${petName}`, race: `${race}`, weight: `${weight}`, color: `${color}`, eyesColor: `${eyesColor}`, age: `${age}`, pic: `${pic}` };
            collection.insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(`Pet ${petName} registered`);
            });
            
            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 1000);
        }
    });
    
});

module.exports = router;
