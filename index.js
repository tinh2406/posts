const express = require('express')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const posts = require('./routes/posts')

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
app.get('/',(req,res)=>res.render('index'))

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))