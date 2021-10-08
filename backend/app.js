const express = require('express');
const cors = require('cors');

const corsOption={
    origin:"http://localhost:3000"
}


const app = express();

app.use(cors(corsOption));

const errorMiddleware = require("./middleware/error");
app.use(express.json());


//routes imports
const user=require("./routes/userRoute");

app.use("/api/v1",user);

//middleware for error
app.use(errorMiddleware);

module.exports=app;