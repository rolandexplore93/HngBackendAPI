const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const app = express(); // instantiate express app
app.use(express.json({ limit: '50mb', extended: true}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(process.env.PORT || 3000, console.log(`Connected to database and server on PORT: ${process.env.PORT}`)))
    .catch(error => console.log(error));

app.get('/', (req, res) => {
    const data = {
        slackUsername: "rollyJS",
        backend: true,
        age: 29,
        bio: "I'm a software developer with core interest in building web applications for businesses",
      };
      res.json(data);
});

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

// Javascript enum
const OPERATION_TYPE = Object.freeze({
    ADDITION: 'addition',
    SUBTRACTION: 'subtraction',
    MULTIPLICATION: 'multiplication'
})

const addInput = (x, y) => {
    return x + y
}

const subtractInput = (x, y) => {
    return x - y
}

const multiplyInput = (x, y) => {
    return x * y
}

let operationType = OPERATION_TYPE.ADDITION;
operationType = OPERATION_TYPE.SUBTRACTION;
operationType = OPERATION_TYPE.MULTIPLICATION;

app.post('/solve-math', async (req, res) => {
    const { operation_type, x, y } =  req.body;

    if (operation_type === OPERATION_TYPE.ADDITION) result = addInput(x,y)
    else if (operation_type === OPERATION_TYPE.SUBTRACTION) result = subtractInput(x,y)
    else if (operation_type === OPERATION_TYPE.MULTIPLICATION) result = multiplyInput(x,y) 
    else return res.status(400).json({result: 'Incorrect operation type field. Operation Type can only be addition, subtraction or multiplication'})

    const data = {
        slackUsername: 'rollyJS',
        operation_type: operation_type,
        result: result
    }
    // console.log(data)
    res.json(data);
})

