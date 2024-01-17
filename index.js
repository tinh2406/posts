const express = require('express')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const posts = require('./routes/posts')
const Post = require('./models/Post')

const app = express()
app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())

app.use(methodOverride('_method'))

connectDB()

app.use('/posts',posts)
app.get('/about',(req,res)=>res.render('about'))

app.get('/',async (req,res)=>{
    const posts = await Post.find().lean().sort({date:-1})
    res.render('index',{posts})
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))