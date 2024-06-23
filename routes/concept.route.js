import express from 'express'
import { adminRole, authenticateToken } from '../middleware/validate.middleware.js'
import { GetConcept, getConceptIdForm, insertConcept } from '../controller/concept.controllers.js'

const router = express.Router()
router.get("/api/concept", authenticateToken,  GetConcept)
router.get("/api/admin/concept", authenticateToken, adminRole,  getConceptIdForm)
router.post("/api/concept", authenticateToken, adminRole,  insertConcept)
export default router