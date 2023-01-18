const express = require('express');
const router = express.Router();
const project = require('../controllers/project');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/add', auth(), project.addProject);
router.get('/getProject/', project.getProject);
router.get('/getProjectByIdUser/', project.getProjectByIdStudent);
router.get('/getProjects/', project.getProjects);
router.put('/update/', project.updateProject);
router.delete('/delete/', project.deleteTeam);
router.post('/joinAsTester', auth(), project.joinAsTester)

module.exports = router;