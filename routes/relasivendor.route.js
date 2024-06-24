import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js'
import { DeleteRelasiVendor, GetRelasi_VendorId, insertRelasiVendor } from '../controller/relasivendor.controllers.js'


const router = express.Router()
router.get('/api/relasivendor/:id',authenticateToken, userRole, GetRelasi_VendorId)
router.post('/api/relasivendor',authenticateToken, adminRole, insertRelasiVendor)

router.delete('/api/relasivendor/:id', authenticateToken, adminRole, DeleteRelasiVendor)

export default router