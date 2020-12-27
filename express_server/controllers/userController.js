var User = require('../models/user');
var SeniorSurvey = require('../models/senior_survey');
let IpAddress = require('../models/ip_addresses');
let ArchiveResult = require('../models/archive_results');
let async = require('async');

var path = require('path');

const jwt = require('jsonwebtoken');

const signToken = userId => {
    return jwt.sign({
        iss: "highbornsky",
        sub: userId
    }, "donate_blood_secret_key", { expiresIn: '1h'});
}

// /users
//--------------------- ADMIN URL CONTROLLERS ----------------------------
exports.index = function (req, res, next) {
    // res.sendFile(path.join(__dirname, '../build/index.html'));
    res.status(200).json({ message: { msgBody: "Login to manage Surveys.", msgError: false } });
}

exports.authenticate = function (req, res) {
    // console.log("checked auth");
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: {username} });
    }
};

exports.logout = function(req, res) {
    res.clearCookie('access_token');
    res.json({ user: {username: ""}, success: true });
}

exports.authenticated = function (req, res) {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: {username} });
}