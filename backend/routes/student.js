const express = require('express');
const router = express.Router();
const student = require('../controllers/student');
const passport = require('passport');

router.post('/register/', student.register);
router.post('/login/', student.login);
router.get('/getStudent/:name', student.getStudent);
router.put('/update/:name', student.updateStudent);
router.delete('/delete/:name', student.deleteStudent);

module.exports = router;