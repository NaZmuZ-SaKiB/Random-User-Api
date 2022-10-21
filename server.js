const express = require('express');
const cors = require('cors');
const fs = require('fs');
const router = require('./routes/user.route');

const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/user', router)

app.get("/", (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    res.json(users)
})


const port = process.env.port || 5050

app.listen(port, ()=> {console.log(`Server running on port: ${port}`)})