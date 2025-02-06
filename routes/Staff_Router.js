import express from 'express'

import { verifyToken } from '../Helper/MiddleWare.js'
import { authorizeRoles } from '../Helper/Authorization.js'

import * as StaffCtrl from '../Controller/staffController.js' 

const StaffRouter = express(); 

//Create a Product
StaffRouter.route("/products").post(verifyToken, authorizeRoles("Staff"), StaffCtrl.addProductForVendor);

//Seacrh the product using Vendor id:
StaffRouter.route("/products/vendor/:vendorId").get(verifyToken, authorizeRoles("Staff"), StaffCtrl.getProductsForVendor);

export default StaffRouter
