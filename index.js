const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const app = express(); // instantiate express app
app.use(express.json({ limit: '50mb', extended: true}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(process.env.PORT || 3000, console.log(`Connected to database and server on PORT: ${process.env.PORT}`)))
    .catch(error => console.log(error));

app.get('/user', async (req, res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
});

app.post('/user', async (req, res) => {
    
    try {
        const user = await User(req.body)
        await user.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
});