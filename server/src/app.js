import express from "express";
import cors from "cors";

const app = express()

app.use(cors(({
    origin:["http://localhost:5173"],
    credentials:true
})))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.get("/healthcheck",(_,res)=>{
    return res.send("Hello from server")
})

// routes --------------------------------------
import userRouter from "./routes/user.routes.js";
import teamRouter from "./routes/team.routes.js";

app.use("/api/users",userRouter)
app.use("/api/team",teamRouter)


export default app;

