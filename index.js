const path=require("path");
const express=require("express");
const multer=require(`multer`);
//means uploaded image will be go inside uploads folder of project
// const upload=multer({dest:"uploads/"});

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback) {
      console.log(file)
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage});
const app=express();
const PORT=8000;
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json());
// This line will help in parse form data 
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    return res.render("homepage");
});
app.post("/upload",upload.single("profileImage"),(req,res)=>{
console.log(req.body);
console.log(req.file);
return res.redirect("/");
});
app.listen(PORT,()=>console.log(`Server Started at PORT :8000`));