const express = require('express');
const router = express.Router();
const userService = require('../service/userService')

// user sign up controller
router.post('/signup', async(req, res, next)  => {
    const [error,errorMsg, result] = await userService.userRegistration(req.body);
    if (error) {
        return res.status(500).json({
            message: errorMsg
        })
    } else {
        res.status(200).json({
            response: result
        })
    }
});

// user login controller
router.post('/login', async(req, res, next)  => {
    const [error,errorMsg, result] = await userService.userLogin(req.body);
    if (error) {
        return res.status(500).json({
            message: errorMsg
        })
    } else {
        res.status(200).json({
            response: result
        })
    }
});

module.exports = router
