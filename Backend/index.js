import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; 
import userRoute from "./Routes/user.routes.js";
import companyRoute from "./Routes/company.routes.js"
import jobRoute from "./Routes/job.routes.js";
import applicationRoute from "./Routes/application.routes.js"
import { fileURLToPath } from 'url';
import path from "path"
dotenv.config({});

const app = express();




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
//mioddleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials:true
// }

app.use(cors({ credentials: true, origin: true }));

const PORT = process.env.PORT || 3000;

//api's
app.use("/api/v1/user" , userRoute);
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(__dirname , "/Frontend/dist")));
// app.get('*' , (req, res) =>{
//     res.sendFile(path.resolve(__dirname ,"Frontend" , "dist" , "index.html"));
// })

// console.log("Serving static files from:", path.join(__dirname, "../Frontend/dist"));
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get(/^(?!\/api).*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
});


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})