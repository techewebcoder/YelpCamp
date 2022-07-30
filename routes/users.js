const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { checkReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(checkReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

//router.get('/logout', users.logout)
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    })
})


router.get('/forgot', (req, res) => {
    res.render('users/forgot');
})

router.get('/reset', (req, res)=> {
    res.render('users/reset')
})

module.exports = router;
