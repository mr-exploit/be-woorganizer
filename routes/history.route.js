import express from 'express'
import { adminRole, authenticateToken, userRole } from '../middleware/validate.middleware.js'
import { DeleteHistory, GetHistory, GetHistoryIdUser, PostHistory, UpdateHistory } from '../controller/historyperubahan.controllers.js'


const router = express.Router()

router.get('/api/history',authenticateToken, adminRole, GetHistory)
router.get('/api/history/:id',authenticateToken, GetHistoryIdUser)
router.post('/api/history',authenticateToken,  PostHistory)
router.put('/api/history/:id', authenticateToken, userRole, UpdateHistory)
router.delete('/api/history/:id', authenticateToken, DeleteHistory)

export default router