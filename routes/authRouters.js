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
router.get('/activitydetails/:title', authController.activityDetails_get)
//router.post('/news', upload.single('image'), authController.news_post)
router.get('/activity', authController.activity_get)
router.get('/activitydisplay', authController.activityDisplay_get)
router.get('/activitydisplayjson', authController.activityDisplayJson_get)
router.post('/activity', upload.array('images'), authController.activity_post)
router.get('/singleactivitydisplay/:title', authController.singleActivityDisplay_get)
router.get('/', authController.main_page)

module.exports = router;