import express from 'express'

import { verifyToken } from '../Helper/MiddleWare.js'
import { authorizeRoles } from '../Helper/Authorization.js'

import * as UserCtrl from '../Controller/userController.js'
import * as ProductCtrl from '../Controller/productContoller.js'

const AdminRouter = express(); 

//View the List 
AdminRouter.route("/users").get(verifyToken, authorizeRoles("Admin"),UserCtrl.userall)

AdminRouter.route("/vendors").get(verifyToken, authorizeRoles("Admin"),UserCtrl.vendorall)

AdminRouter.route("/staffs").get(verifyToken, authorizeRoles("Admin"),UserCtrl.staffall)

//Create a Product
AdminRouter.route("/products").post(verifyToken, authorizeRoles("Admin"), ProductCtrl.createProduct);



export default AdminRouter
