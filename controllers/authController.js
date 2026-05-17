const User = require("../models/User")
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
  console.log(err.message, err.code)
  let error =  { email: '', password: ''};

  // duplicate error code

  if(err.code === 11000) {
    errors.email = "That email is already registered"
    return errors;
  }

  //validate errors
  if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      error[properties.path] = properties.message;
    })
  }

  return error;
}
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  })
}

module.exports.signup_get = (req, res) => {
  res.render('signup')
}
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: user._id})
  } catch (error) {
    const err = handleErrors(error)
    res.status(400).json({ err })
  }

}
module.exports.login_get = async (req, res) => {
  res.render('login')
}
module.exports.login_post = (req, res) => {
  res.send('user login')
}
module.exports.news_get = async (req, res) => {
  res.render('news')
}

let news = []
module.exports.newsDisplay_get = async (req, res) => {
  news.forEach(element => {
    console.log(element)
  })
  res.render('newsdisplay', {title: news})
}
module.exports.newsDetails_get = async (req, res) => {
  const title = req.params.title
  const dado = news.find(u => u.title === title)

  res.json(dado)
}
module.exports.newsDisplayJson_get = async (req, res) => {
  news.forEach(element => {
    console.log(element)
  })
  res.json(news)
}
module.exports.news_post = (req, res) => {
  const newsData = req.body;
  const fileInfo = req.file;
  let newsObject = {
    title: newsData.title,
    description: newsData.description,
    url: fileInfo.filename
  }

  news.push(newsObject)

  console.log(newsObject)
  res.json({
    message: "Dados e ficheiro recebidos com sucesso"
  })
  try {
    console.log(news, description, file)
  } catch (error) {
    
  }
}
module.exports.activity_get = async (req, res) => {
  res.render('activity')
}
module.exports.activityDisplay_get = async (req, res) => {
  const { title, description } = 
  res.render('activitydisplay', {title})
}
module.exports.activity_post = (req, res) => {
  const activityData = req.body;
  const files = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path
  }))
  console.log(activityData.title)
  res.json({
    message: "Dados e ficheiro recebidos com sucesso"
  })
  try {
    console.log(activity, description)
  } catch (error) {
    
  }
}