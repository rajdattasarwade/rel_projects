const express = require('express')
const router = express.Router()
const config = require('../config/config')

const subordinateList = require('../controller/subordinateList');
const projectLanding = require('../controller/projectsLanding');

console.log('helloooo'); 
/* GET home page. */
router.get('/ping', (req, res) => {
  res.status(200).send('pong')
});

router.post('/perf/proj/count', (req, res) => {
  projectLanding.ProjectCountAndFeedback(req, res);
});

router.post('/perf/proj/todo/count', (req, res) => {
  projectLanding.PerformanceDisAndToDoCount(req, res);
});

router.post('/perf/proj/ongoing', (req, res) => {
  projectLanding.OngoingProjects(req, res);
});

router.post('/perf/proj/completed', (req, res) => {
  projectLanding.CompletedProjects(req, res);
});

router.get('/perf/proj/dropdown', (req, res) => {
  projectLanding.DropdownFilter(req, res);
});

router.post('/perf/proj/dropdown', (req, res) => {
  projectLanding.DropdownFilter(req, res);
});

module.exports = router
