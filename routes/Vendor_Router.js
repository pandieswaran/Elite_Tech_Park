import express from 'express'

import { verifyToken } from '../Helper/MiddleWare.js'
import { authorizeRoles } from '../Helper/Authorization.js'

import * as VendorCtrl from '../Controller/vendorController.js'

const VendorRouter = express(); 

VendorRouter.route("/products").post(verifyToken, authorizeRoles("Vendor"), VendorCtrl.addVendorProduct);

VendorRouter.route("/products").get(verifyToken, authorizeRoles("Vendor"), VendorCtrl.getProductsForVendor);

export default VendorRouter
