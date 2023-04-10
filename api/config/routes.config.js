const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers');
const students = require('../controllers/students.controller');
const projectsMid = require('../middlewares/projects.mid');
const studentsMid = require('../middlewares/students.mid');


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


router.get('/students', students.list);
router.post('/students', students.create);
router.get('/students/:id', studentsMid.exists, students.detail);
router.patch('/students/:id', studentsMid.exists, students.update);
router.delete('/students/:id', studentsMid.exists, students.delete);


router.get('/cohorts', todo);
router.get('/cohorts/:id', todo);

module.exports = router