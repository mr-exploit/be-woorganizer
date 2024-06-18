import express from 'express'
import { adminRole, authenticateToken, userRole } from '../middleware/validate.middleware.js'
import { deleteAkun, GetUser, UpdateProfile, updateUserRole, userResetPassword } from '../controller/user.controllers.js'
import upload from '../middleware/multerconfig.middleware.js'

const router = express.Router()

router.get('/api/user', authenticateToken, userRole, GetUser)
router.put('/api/user/profile/:id', authenticateToken, userRole, upload.single('image'), UpdateProfile)

router.put('/api/user/reset-password/:id', authenticateToken, userRole, userResetPassword)
router.put('/api/user/updaterole/:id', authenticateToken, adminRole, updateUserRole)

router.delete('/api/user/delete', authenticateToken, userRole, deleteAkun);




export default router