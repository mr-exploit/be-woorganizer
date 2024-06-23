import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js'
import { DeleteDress, GetDressAll, GetDressId, insertDress, UpdateDress } from '../controller/dress.controllers.js'
import upload from '../middleware/multerconfig.middleware.js'


const router = express.Router()

router.get('/api/dress',authenticateToken, userRole, GetDressAll)
router.get('/api/dress/:id',authenticateToken, adminRole, GetDressId)
router.post('/api/dress',authenticateToken, adminRole, upload.single('image'), insertDress)
router.put('/api/dress/:id', authenticateToken, adminRole, upload.single('image'), UpdateDress)
router.delete('/api/dress/:id', authenticateToken, adminRole, DeleteDress)

export default router