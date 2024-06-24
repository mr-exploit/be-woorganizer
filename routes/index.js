import express from 'express'
import authRoute from '../routes/auth.route.js'
import conceptRoute from '../routes/concept.route.js'
import formRoute from '../routes/form.route.js'
import userRoute from '../routes/user.route.js'
import rincianAnggaran  from '../routes/rinciananggar.route.js'
import vendorRoute from '../routes/vendor.route.js'
import dressRoute from '../routes/dress.route.js'
import scheduleRoute from '../routes/schedule.route.js'
import interiorRoute from '../routes/interior.route.js'
import historyRoute from '../routes/history.route.js'
import relasivendor from '../routes/relasivendor.route.js'
import relasiMWD from '../routes/relasimwd.route.js'

const router = express()

router.use(authRoute, conceptRoute, formRoute, userRoute, rincianAnggaran, vendorRoute, relasivendor, dressRoute, scheduleRoute, interiorRoute, historyRoute,relasiMWD)


export default router