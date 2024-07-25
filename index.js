const express = require('express');
const app = express();
const dotenv = require('dotenv');
const taskRoutes = require('./router/taskRoutes');
const userRoutes = require('./router/userRoutes');

dotenv.config();
const PORT = 3000 || 5000;

app.use('/api/task', taskRoutes);
app.use('/api/user', userRoutes);

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})
const database = require("./config/dbConnection");
database.connect();

app.use(express.json());










