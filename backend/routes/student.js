const express = require('express');
const router = express.Router();
const student = require('../controllers/student');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/register/', student.register);
router.post('/login/', student.login);
router.get('/getStudent/:name', auth(), student.getStudent);
router.put('/update/:name', student.updateStudent);
router.delete('/delete/:name', student.deleteStudent);
router.get('/getMyTeams', auth(), student.getMyTeams)

module.exports = router;