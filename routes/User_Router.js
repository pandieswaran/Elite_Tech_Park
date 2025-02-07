import express from 'express'

import { verifyToken } from '../Helper/MiddleWare.js'
import { authorizeRoles } from '../Helper/Authorization.js'

import * as UserCtrl from '../Controller/userController.js'
import * as UserValid from '../Helper/Validation.js'

const UserRouter = express(); 

//Register the User
UserRouter.route('/signup').post(UserValid.User_Register_Validation, UserCtrl.registerUser)

UserRouter.route('/vendor-signup').post(UserValid.User_Register_Validation, UserCtrl.registerUser)

UserRouter.route('/staff-signup').post(UserValid.User_Register_Validation, UserCtrl.registerUser)

//Login
UserRouter.route('/login').post(UserValid.Userlogin_Validation, UserCtrl.loginUser)

//View All the Products
UserRouter.route("/products").get(verifyToken, authorizeRoles("User"),UserCtrl.getAllProducts);

//Search the product and Pagination
UserRouter.route("/search").get(UserCtrl.searchProductsByName)



export default UserRouter
