const express = require('express');
const router = express.Router();
const team = require('../controllers/team');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/add', auth(), team.addTeam);
router.get('/getTeam', auth(), team.getTeam);
router.put('/update',auth(), team.updateTeam);
router.delete('/deleteTeam',auth(), team.deleteTeam);
router.post('/getTeamProjects',auth(), team.getProjects);

module.exports = router;