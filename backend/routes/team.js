const express = require('express');
const router = express.Router();
const team = require('../controllers/team');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/add', auth(),team.get);
router.post('/getTeam/:name',auth(), team.addTeam);
router.get('/getStudent/:name', auth(), team.getTeam);
router.put('/update/:name',auth(), team.updateTeam);
router.delete('/delete/:name',auth(), team.deleteTeam);

module.exports = router;