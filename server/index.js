const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const profileRouter = require('./routes/Profile');
app.use('/profile', profileRouter);
const messageRouter = require('./routes/Message');
app.use('/message', messageRouter);
const imageRouter = require('./routes/Image');
app.use('/image', imageRouter);
const buddypreferenceRouter = require('./routes/BuddyPreference');
app.use('/buddypreference', buddypreferenceRouter);
const buddylistRouter = require('./routes/BuddyList');
app.use('/buddylist', buddylistRouter);
const userRouter = require('./routes/User');
app.use('/auth', userRouter);



const port = 3001;

db.sequelize.sync().then(() => {
    app.listen(port, () =>{
        console.log('server running on port %d', port);
    });
});