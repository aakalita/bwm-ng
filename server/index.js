const express = require('express');
const mongooose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');

mongooose.connect(config.DB_URI).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
})
.catch((ex) => {console.log(ex)});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log(`started listening on port ${PORT}`);
})

