const express = require('express');
const { createRegistrationForm, bootstrapField, createLoginForm } = require('../forms');
const { User } = require('../models');
const router = express.Router();
const crypto = require('crypto');

const getHashedPassword = function(plainPassword){
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(plainPassword).digest('base64');
    return hash;
}



router.get('/register', function(req,res){
    const userForm = createRegistrationForm();
    res.render('users/register',{
        userForm: userForm.toHTML(bootstrapField)
    })
})

router.post('/register', (req, res) => {
    const userForm = createRegistrationForm();
    userForm.handle(req, {
        success: async (form) => {
            const user = new User({
                'username': form.data.username,
                'password': getHashedPassword(form.data.password),
                'email': form.data.email
            });
            await user.save();
            req.flash("success_messages", "Your account has been signed up successfully!");
            res.redirect('/users/login');
        },
        'empty': function(form){
            res.render('users/register',{
                userForm:form.toHTML(bootstrapField)
            })

        },
        'error': (form) => {
            res.render('users/register', {
                userForm: form.toHTML(bootstrapField)
            })

        }
    })
})

router.get('/login', (req,res)=>{
    const loginForm = createLoginForm();
    res.render('users/login',{
        loginForm : loginForm.toHTML(bootstrapField)
    })
})
    




module.exports = router;


