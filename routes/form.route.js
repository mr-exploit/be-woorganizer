import express from 'express'
import { adminRole, authenticateToken, userRole } from '../middleware/validate.middleware.js'
import { DeleteForm, GetForm, GetFormId, PostForm, UpdateForm } from '../controller/form.controllers.js'

const router = express.Router()

router.get('/api/form',authenticateToken, adminRole, GetForm)
router.get('/api/form/:id',authenticateToken, GetFormId)
router.post('/api/form',authenticateToken, userRole,  PostForm)
router.put('/api/form/:id', authenticateToken, userRole, UpdateForm)
router.delete('/api/form/:id', authenticateToken, DeleteForm)

export default router