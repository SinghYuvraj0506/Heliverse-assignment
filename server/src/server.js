import app from "./app.js";
import connectToDB from "./db.js";

connectToDB()
.then((e)=>{
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server running at port", port);
    });

    app.on("error",()=>{
        console.log("Error occured in running the express server")
    })
})
.catch((error)=>{
    console.log("Database connection failed",error)
})

