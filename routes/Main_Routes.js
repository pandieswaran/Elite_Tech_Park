import express from 'express'

import AdminRouter from './Admin_Router.js'
import UserRouter from './User_Router.js'
import VendorRouter from './Vendor_Router.js'
import StaffRouter from './Staff_Router.js'
import ProductRouter from './Product_Router.js'

const MainRouter = express();

MainRouter.use('/admin', AdminRouter)
MainRouter.use('/user', UserRouter)
MainRouter.use('/vendor', VendorRouter)
MainRouter.use('/staff', StaffRouter)
MainRouter.use('/product', ProductRouter)

export default MainRouter;