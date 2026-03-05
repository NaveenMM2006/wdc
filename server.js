import dotenv from "dotenv";
import app from "./src/app.js";
import testDB from "./src/utils/dbTest.js";


dotenv.config();

const PORT= process.env.PORT || 5000;

app.listen(PORT,async ()=>{
    console.log(`serve running on the Port ${PORT}`);
    await testDB();
})
