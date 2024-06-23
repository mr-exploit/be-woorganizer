import express from 'express'
import { adminRole, authenticateToken, userRole } from '../middleware/validate.middleware.js'
import { GetConcept, getConceptEmailForm, getConceptId, getConceptIdForm, insertConcept } from '../controller/concept.controllers.js'

const router = express.Router()
router.get("/api/concept", authenticateToken,  GetConcept)
router.get("/api/concept/:id", authenticateToken,  getConceptId)
router.get("/api/admin/concept", authenticateToken, adminRole,  getConceptIdForm)
router.get("/api/admin/concept/:id", authenticateToken,  
    adminRole, getConceptEmailForm)
router.post("/api/concept", authenticateToken, adminRole,  insertConcept)
export default router