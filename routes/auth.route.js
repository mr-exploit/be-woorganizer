import express from 'express'
import { login, register, checkUser } from '../controller/auth.controllers.js'
import { authenticateToken } from '../middleware/validate.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user/:id', authenticateToken, checkUser)

export default router