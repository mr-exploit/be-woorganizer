import express from 'express'
import { adminRole, authenticateToken, userRole, } from '../middleware/validate.middleware.js';
import { DeleteSchedule, GetScheduleAll, GetScheduleFormId, GetScheduleFormUser, GetScheduleId, insertSchedule, UpdateSchedule } from '../controller/schedule.controllers.js';

const router = express.Router()

router.get('/api/schedule',   GetScheduleAll)
router.get('/api/admin/schedule',  GetScheduleFormUser)

router.get('/api/admin/schedule/:id', GetScheduleFormId)

router.get('/api/schedule/:id',authenticateToken,  GetScheduleId)

router.post('/api/schedule',authenticateToken, adminRole, insertSchedule)
router.put('/api/schedule/:id', authenticateToken, adminRole, UpdateSchedule)
router.delete('/api/schedule/:id', authenticateToken, adminRole, DeleteSchedule)

export default router