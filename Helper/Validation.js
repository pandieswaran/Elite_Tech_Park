import isEmpty from '../Helper/isEmpty.js'
import User from '../Model/User_Model.js'

export const User_Register_Validation = async (req, res, next) => {

    try {
        console.log(req.body, 'req.body')

        const { Email, Password, UserName } = req.body



        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

        if (isEmpty(UserName)) {
            return res.status(400).json({ message: { UserName: 'Username is required' }, success: false })
        }
        if (isEmpty(Email)) {
            return res.status(400).json({ message: { Email: 'Email is required' }, success: false })
        }
        if (isEmpty(Password)) {
            return res.status(400).json({ message: { Password: 'Password is required' }, success: false })
        }
        if (password_regex.test(Password)) {
            next()
        }
        else {
            return res.status(400).json({ message: { password: 'Password must be of a valid type' }, success: false })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server Error', success: false })
    }
}

export const Userlogin_Validation = async (req, res, next) => {

    try {
        const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        if (isEmpty(req.body.Email)) {
            return res.status(400).json({ message: { Email: 'Email is required' }, success: false })
        }
        if (isEmpty(req.body.Password)) {
            return res.status(400).json({ message: { Password: 'Password is required' }, success: false })
        }
        if (await User.exists({ Email: req.body.Email })) {

            if (password_regex.test(req.body.Password)) {

                next()
            } else {
                return res.status(400).json({ message: { Password: 'Please enter the valid password' }, success: false })
            }
        } else {
            return res.status(400).json({ message: { Email: 'Email not found' }, success: false })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Server Error', success: false })
    }
}