const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const projectsMid = require('../middlewares/projects.mid');

const todo = (req, res, next) => {
  res.send("TODO")
}


router.get('/projects', projects.list);
router.post('/projects', projects.create);
router.get('/projects/:id', projectsMid.exists, projects.detail);
router.delete('/projects/:id', projectsMid.exists, projects.delete);
router.patch('/projects/:id', projectsMid.exists, projects.update);

router.get('/projects/:id/like', projectsMid.exists, todo);

router.post('/projects/:id/comment', projectsMid.exists, todo);
router.patch('/projects/:id/comment/:commentId', projectsMid.exists, todo);
router.delete('/projects/:id/comment/:commentId', projectsMid.exists, todo);


router.get('/students', todo);
router.post('/students', todo);
router.get('/students/:id', todo);
router.patch('/students/:id', todo);
router.delete('/students/:id', todo);


router.get('/cohorts', todo);
router.get('/cohorts/:id', todo);

module.exports = router