// Require
const express=require("express")
const engine = require('ejs-mate')
const app=express()
const mongoose=require("mongoose")
const methodOverride=require("method-override")
const path=require("path")
const session=require("express-session")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const flash=require("connect-flash")
if (process.env.NODE_ENV !="production") {
   require('dotenv').config()
}

let run=async ()=>{
   await mongoose.connect("mongodb://localhost:27017/RealEstate")
}

run().then(()=>console.log("connected"))
.catch(e=>console.log(e))

// Routes
const index=require("./routes/index")
const create=require("./routes/create")
const show=require("./routes/show")
const update=require("./routes/update")
const err=require("./routes/errorHandling")
const singup=require("./routes/singup")
const login=require("./routes/login")
const logout=require("./routes/logout")
const search=require("./routes/search")

// models
const User=require("./models/user")

app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/public')))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.engine('ejs', engine)
app.use(express.json());

app.use(session({
   secret:"secret",
   resave:false,
   saveUninitialized:false,
}))
// Initialize Passport and its session handling
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

// app.use(require('body-parser').urlencoded({ extended: true }));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
   res.locals.success=req.flash("success")
   res.locals.error=req.flash("error")
   res.locals.error2=req.flash("error2")
   res.locals.user=req.user;
   next()
})
app.use("/index", index)
app.use("/create", create)
app.use("/show", show)
app.use("/update", update)
app.use("/singup", singup)
app.use("/login", login)
app.use("/logout", logout)
// feature option
app.use("/search", search)
app.use("*", err)

.listen(8080,()=>{})