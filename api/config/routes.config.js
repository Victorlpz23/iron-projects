const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects.controllers')


router.get('/projects', projects.list)

module.exports = router