const db = require('../parkModel.js');

module.exports = function (app) {
    app.post('/api/parks', async ({ body }, res) => {

        try {
            console.log(body);

            //create the records in database if doesn't exist
            await db.Parks.create(body);

        } catch (err) {
            console.log(err);
            res.status(500);
        }

    });

    app.get('/parks', async ({ body }, res) => {

        try {
            console.log(body);

            //get records from database if exists
            await db.Parks.find({});

        } catch (err) {
            console.log(err);
            res.json(err);
        }

    });

};