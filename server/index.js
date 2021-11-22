const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

const profileRouter = require('./routes/Profile');
app.use('/profile', profileRouter);

const port = 3001;

db.sequelize.sync().then(() => {
    app.listen(port, () =>{
        console.log('server running on port %d', port)
    });
});