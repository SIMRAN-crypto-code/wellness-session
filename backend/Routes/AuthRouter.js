const router=require('express').Router()
const {register,login}=require('../Controllers/AuthController')
//const auth=require('../Middlewares/authvalidation')

router.post('/register',register)
router.post('/login',login)

module.exports=router;