const express = require('express');
const router = express.Router();
const project = require('../controllers/project');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/add', auth(), project.addProject);
router.get('/getProject/:projectName', project.getProject);
router.get('/getProjectByIdUser/:id', project.getProjectByIdStudent);
router.get('/getProjects/', project.getProjects);
router.put('/update/:projectName', project.updateProject);
// router.put('/change/:name', project.changeTeam);
router.delete('/delete/:projectName', project.deleteTeam);
router.post('/joinAsTester', auth(), project.joinAsTester)

module.exports = router;