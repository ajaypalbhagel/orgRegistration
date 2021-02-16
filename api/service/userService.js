const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../model/userModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
var randtoken = require('rand-token')
const userLoginSession = require("../model/userLoginSession")
const tokenExpireTime = { expiresIn: "30m" }
const tokenSecretKey = 'secret!@#$!@!@'

// user signup api service

async function userRegistration(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // converting hash format password
    let hash = await bcrypt.hash(request.password, 10)
    // checking email already exits or not
    await User.find({ email: request.email })
        .exec()
        .then(async userResult => {
            if (userResult.length >= 1) {
                error = true;
                errorMsg = 'email already registered'
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: request.email,
                    password: hash,
                    contactNo: request.contactNo,
                    location: request.location,
                    name: request.name,
                })
                // inserting user data
                await user.save().then(result => {
                    responseData = 'user successfully registered'
                })
            }
        })
    return [error, errorMsg, responseData];
}

// user login api service
async function userLogin(request) {
    let error = false
    var responseData = {}
    let errorMsg = ''
    const uuidv1 = require('uuid/v1');
    const serverUniqueId = uuidv1()
    const clientId = request.client_id

    // feching user data corresponding to user email
    await User.find({ email: request.email })
        .exec()
        .then(async user => {
            if (user.length < 1) {
                error = true
                errorMsg = 'username password incorrect'
            } else {
                // compare user password
                let result = await bcrypt.compare(request.password, user[0].password)
                if (!result) {
                    error = true
                    errorMsg = 'username password incorrect'
                }
                else {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                        tokenSecretKey,
                        tokenExpireTime

                    )
                    var refreshToken = randtoken.uid(256)
                    const UserLoginSession = new userLoginSession({
                        _id: new mongoose.Types.ObjectId(),
                        user_id: user[0]._id,
                        client_id: clientId,
                        server_unique_id: serverUniqueId,
                        refresh_token: refreshToken
                    })
                    // inserting user login session data in db
                    await UserLoginSession.save().then(async result => { })
                    responseData = {
                        message: 'Auth Succesfull',
                        token: token,
                        refresh_token: refreshToken,
                        user_id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name,
                        client_id: clientId,
                        server_unique_id: serverUniqueId
                    }
                }
            }
        })
    return [error, errorMsg, responseData];
}



module.exports = { userRegistration, userLogin }
