const express = require('express')
const app = express()

const db = require('./models')

const port = 3001

db.sequelize.sync().then(() => {
    app.listen(port, () =>{
        console.log('server running on port %d', port)
    })
})