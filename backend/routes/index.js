const express = require('express');
const router = express.Router();
const studentRouter = require('./student');
const teamRouter = require('./team');
const projectRouter = require("./project")
const bugRouter = require("./bug")

router.use("/student", studentRouter);
router.use("/team", teamRouter);
router.use("/project", projectRouter);
router.use("/bug", bugRouter);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/students/login');
});
module.exports = router;