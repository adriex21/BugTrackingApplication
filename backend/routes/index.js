const express = require('express');
const router = express.Router();
const studentRouter = require('./student');

router.use("/student", studentRouter);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/students/login');
});
module.exports = router;