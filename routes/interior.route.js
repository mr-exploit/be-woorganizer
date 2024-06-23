import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js';
import { DeleteInterior, GetInteriorAll, GetInteriorId, insertInterior, UpdateInterior } from '../controller/interior.controllers.js';
import upload from '../middleware/multerconfig.middleware.js'

const router = express.Router()

router.get('/api/interior', authenticateToken, GetInteriorAll)
router.get('/api/interior/:id',authenticateToken, adminRole, GetInteriorId)
router.post('/api/interior',authenticateToken, adminRole, upload.single('image'), insertInterior)
router.put('/api/interior/:id', authenticateToken, adminRole, upload.single('image'), UpdateInterior)
router.delete('/api/interior/:id', authenticateToken, adminRole, DeleteInterior)

export default router