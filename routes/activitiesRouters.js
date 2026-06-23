const { Router } = require('express')
const authController = require('../controllers/authController')
const upload = require('../config/multerConfig')
const uploadController = require('../controllers/uploadController')

const router = Router(); 

router.get('/activitydetails/:title', authController.activityDetails_get)

router.get('/activity', authController.activity_get)
router.get('/activitydisplay', authController.activityDisplay_get)
router.get('/activitydisplayjson', authController.activityDisplayJson_get)
router.post('/activity', upload.array('images'), authController.activity_post)
router.get('/singleactivitydisplay/:title', authController.singleActivityDisplay_get)

module.exports = router;