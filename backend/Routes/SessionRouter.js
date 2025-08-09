
const{mysessions,sessionpublish,sessionview,draft,publish}=require('../Controllers/SessionController')
const router=require('express').Router();
const sessionAuth=require('../Middlewares/SessionValidation')
const auth=require('../Middlewares/authvalidation')



router.get('/sessions',auth,mysessions)
router.get('/my-sessions',auth,sessionpublish)
router.get('/my-sessions/:id',auth,sessionview)
router.post('/my-sessions/save-draft',auth,draft)
router.post('/my-sessions/publish',auth,publish)




module.exports=router;