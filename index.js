const express = require('express');
require('dotenv').config()
const app = express(); // instantiate express app

app.listen(process.env.PORT || 3000, console.log(`Connected to the server on PORT: ${process.env.PORT}`));