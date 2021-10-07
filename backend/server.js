const app=require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database'); 
const PORT=4000;


//.Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception.`);
    process.exit(1);
})


//config
dotenv.config({path:"backend/config/config.env"})

//Connecting to database
connectDatabase();

const server =app.listen(PORT,()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})


//.unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise rejection.`);
    server.close(()=>{
        process.exit(1);
    })
})