const { Router } = require('express')
const authController = require('../controllers/authController')
const upload = require('../config/multerConfig')
const uploadController = require('../controllers/uploadController')

const router = Router(); 

router.post('/upload', upload.single('image'))
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/news', authController.news_get)
router.get('/', authController.newsDisplay_get)
router.get('/newsdetails/:title', authController.newsDetails_get)
router.get('/newsdisplayjson', authController.newsDisplayJson_get)
router.get('/singlenewsdisplay/:title', authController.singleNewsDisplay_get)
router.post('/news', upload.single('image'), authController.news_post)
router.get('/activity', authController.activity_get)
router.get('/activitydisplay', authController.activityDisplay_get)
router.post('/activity', upload.array('images'), authController.activity_post)
router.get('/singleactivitydisplay/:title', authController.singleActivityDisplay_get)
router.delete('/delete/:title', authController.newsDelete_delete)

module.exports = router;