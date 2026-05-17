const News = require("../models/News")
const Activity = require("../models/Activity")


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

module.exports.news_get = (req, res) => {
  res.render('news')
}
module.exports.news_post = async (req, res) => {
  const { title, description } = req.body

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
module.exports.activity_get = async (req, res) => {
  res.render('activity')
}
module.exports.activity_post = (req, res) => {
  res.send('user login')
}