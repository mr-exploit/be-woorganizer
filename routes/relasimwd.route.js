import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js'
import { DeleteRelasiMWD, GetRelasi_MWDId, insertRelasiMWD } from '../controller/relasimwd.controllers.js'



const router = express.Router()
router.get('/api/relasimwd/:id',authenticateToken, userRole, GetRelasi_MWDId)
router.post('/api/relasimwd',authenticateToken, adminRole, insertRelasiMWD)

router.delete('/api/relasimwd/:id', authenticateToken, adminRole, DeleteRelasiMWD)

export default router