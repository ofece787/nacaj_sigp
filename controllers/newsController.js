const { createNews, getAllNews, getNewsById, updateNews, updateNewsImage, deleteNews } = require("../models/newsModel");
const fs = require('fs').promises;

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data
  })
}

module.exports.createNews = async (req, res, next) => {
  const { title, description } = req.body;
  const fileInfo = req.file;

  try {
    const newNews = await createNews(title, description, fileInfo.filename)
    res.json({
      message: `Dados e ficheiro recebidos com sucesso e todo o resto`
    })
  } catch (error) {
    next(error)
  }
}
module.exports.getAllNews = async (req, res, next) => {
  try {
    const news = await getAllNews();
    res.render('newstest', {result: news})
  } catch (error) {
    next(error)
  }
}
module.exports.createNewsGet = async (req, res, next) => {
  try {
    res.render('news')
  } catch (error) {
    next(error)
  }
}
module.exports.getAllNewsJson = async (req, res, next) => {
  try {
    const news = await getAllNews();
    res.json(news)
  } catch (error) {
    next(error)
  }
}
module.exports.getNewsById = async (req, res, next) => {
  const id = req.params.id
  try {
    const news = await getNewsById(id);
    res.render('newsdetails', {result: news})
  } catch (error) {
    next(error)
  }
}
module.exports.getNewsByIdJson = async (req, res, next) => {
  const id = req.params.id
  try {
    const news = await getNewsById(id);
    res.json(news)
  } catch (error) {
    next(error)
  }
}
module.exports.updateNewsGet = async (req, res, next) => {
  const id = req.params.id;
  try {
    const news = await getNewsById(id)
    res.render('newsupdate', {result: news})
  } catch (error) {
    next(error)
  }
}
module.exports.updateNewsPost = async (req, res, next) => {
  const { id, title, description } = req.body;
  
  try {
    const news = await updateNews(id, title, description)
  } catch (error) {
    next(error)
  }
}
module.exports.deleteNews = async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await getNewsById(id);
    const deleteFile = await fs.unlink(`./public/imagens/${data.url}`)
    .then(async () => {
      const news = await deleteNews(id)
    })
    const news = await deleteNews(id)
  } catch (error) {
    next(error)
  }
}
