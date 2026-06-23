const { Router } = require('express')
const newsController = require('../controllers/newsController')
const authController = require('../controllers/authController')
const upload = require('../config/multerConfig')
const uploadController = require('../controllers/uploadController')

const router = Router(); 

router.get('/', newsController.getAllNews)
router.get('/newsupdate/:id', newsController.updateNewsGet)
router.get('/newsdetails/:id', newsController.getNewsByIdJson)
router.get('/newsdisplayjson', newsController.getAllNewsJson)
router.get('/newsbyid/:id', newsController.getNewsById)
router.get('/newscreate', newsController.createNewsGet)
router.post('/newscreate', upload.single('image'), newsController.createNews)
router.patch('/newsupdate', upload.single('image'), newsController.updateNewsPost)
router.delete('/delete/:id', newsController.deleteNews)

module.exports = router;