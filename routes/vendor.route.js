import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js'
import { DeleteVendor, GetVendorAll, GetVendorId, insertVendor, UpdateVendor } from '../controller/vendor.controllers.js'


const router = express.Router()
router.get('/api/vendor',authenticateToken, GetVendorAll)
router.get('/api/vendor/:id',authenticateToken, adminRole, GetVendorId)
router.post('/api/vendor',authenticateToken, adminRole, insertVendor)
router.put('/api/vendor/:id', authenticateToken, adminRole, UpdateVendor)
router.delete('/api/vendor/:id', authenticateToken, adminRole, DeleteVendor)

export default router