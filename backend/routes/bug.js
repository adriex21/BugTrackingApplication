const express = require('express');
const router = express.Router();
const bug = require('../controllers/bug');
const passport = require('passport');
const auth = require('../middlewares/auth')

router.post('/add', auth(), bug.addBug);
router.post('/getBug', auth(),  bug.getBug);
router.get('/getBugUser', bug.getBugUser);
router.get('/getBugProject', auth(), bug.getBugProject);
router.post('/getBugsProject', auth(), bug.getBugsProject);
router.put('/updateBug', bug.updateBug);
router.delete('/delete', bug.deleteBug);

module.exports = router;