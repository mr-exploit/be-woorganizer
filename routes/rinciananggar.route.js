import express from 'express'
import { adminRole, authenticateToken, } from '../middleware/validate.middleware.js'
import { DeleteRincianAnggaran, GetRincian, GetRincianId, insertRincianAnggaran, TotalRincianAnggaran, UpdateRincianAnggaran } from '../controller/rinciananggar.controllers.js'

const router = express.Router()

router.get('/api/rincian',authenticateToken, adminRole, GetRincian)
router.get('/api/rincian/:id',authenticateToken, adminRole, GetRincianId)
router.get('/api/totalrincian',authenticateToken, adminRole, TotalRincianAnggaran)
router.post('/api/rincian',authenticateToken, adminRole, insertRincianAnggaran)
router.put('/api/rincian/:id', authenticateToken, adminRole, UpdateRincianAnggaran)
router.delete('/api/rincian/:id', authenticateToken, adminRole, DeleteRincianAnggaran)

export default router