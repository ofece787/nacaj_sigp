const express = require('express')
const authRoutes = require('./routes/authRouters')
const newsRoutes = require('./routes/newsRouters.js')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const morgan = require('morgan')
const path = require('path')
const {readdir} = require('node:fs/promises')
const mongoose = require('mongoose')
const cors = require('cors')
const {Client} = require('pg')
const dotenv = require('dotenv')
const pool = require('./config/db.js')


dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}))

app.use(express.static('public'));

app.use(express.json())

app.use(morgan('dev'))

app.use(cookieParser())
app.use(cors())


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
});

//register view engine
app.set('view engine', 'ejs');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/imagens')
  },
  filename: (req, file, cb) => {
    const {titulo, description} = req.body
    cb(null, titulo + description + Date.now() + path.extname(file.originalname))
  }
  
})

const upload = multer({ 
  storage: fileStorageEngine,
  limits: {
    fileSize: 1024 * 1024 * 50
  }
})

app.use(authRoutes)
app.use(newsRoutes)
app.get('/db', async(req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is: ${result.rows[0].current_database}`)
})