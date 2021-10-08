const express = require('express')
const router = express.Router()
const config = require('../config/config')

const teamMembers = require('../controller/teamMembers');
const delimitProject = require('../controller/projectDelimit');
const projectDetails = require('../controller/projectDetails');
const projectLandingController = require('../controller/projectLanding');
const feedbackFrequnecy = require('../controller/saveProjectDropdown');
const childFrequnecy = require('../controller/saveProjectDropdown');
const vb = require('../controller/saveProjectDropdown');
const saveProject = require('../controller/saveProject');
const setGoalStatus = require('../controller/setGoalStatus');
const projComplete = require('../controller/projComplete');
const getYearWiseRatings = require('../controller/getYearWiseRatings');
const todoCount = require('../controller/todoCount')
const searchProject = require('../controller/searchProject');
const teamGoals = require('../controller/teamGoals');
/* GET home page. */
router.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

router.post('/perf/proj/save/team', (req, res) => {
  teamMembers.saveTeamMembers(req, res);
});

router.post('/perf/proj/team/members', (req, res) => {
  teamMembers.getTeamList(req, res);
});

router.post('/perf/proj/delimit', (req, res) => {
  delimitProject.delimit(req, res);
});

router.post('/perf/proj/details', (req, res) => {
  projectDetails.projectDetails(req, res);
});

router.post('/perf/proj/todo/count', (req, res) => {
  todoCount.todoCount(req, res);
});

router.post('/perf/proj/count', (req, res) => {
  projectLandingController.projectCountAndFeedback(req, res);
});

router.post('/perf/proj/ongoing', (req, res) => {
  projectLandingController.onGoingProjects(req, res);
});

router.post('/perf/proj/dropdown', (req, res) => {
  projectLandingController.dropdownFilter(req, res);
});

router.post('/perf/proj/goals/count', (req, res) => {
  projectLandingController.projectGoalCounts(req, res);
});

router.post('/perf/proj/team/details', (req, res) => {
  projectLandingController.teamDetails(req, res);
});

router.post('/perf/proj/feedback/frequency', (req, res) => {
  feedbackFrequnecy.feedbackFrequency(req, res)
});

router.post('/perf/proj/child/frequency', (req, res) => {
  childFrequnecy.childFrequency(req, res)
});

router.post('/perf/proj/vb', (req, res) => {
  vb.valuesAndBehavior(req, res)
});

router.post('/perf/proj/add/project', (req, res) => {
  saveProject.saveProject(req, res)
});

router.post('/perf/proj/save/goal/status', (req, res) => {
  setGoalStatus.setGoalStatus(req, res)
});

router.post('/perf/proj/completed', (req, res) => {
  projComplete.projComplete(req, res)
});

router.post('/perf/proj/rating', (req, res) => {
  getYearWiseRatings.getYearWiseRatings(req, res)
});

router.post('/perf/proj/search', (req, res) => {
  searchProject.searchProject(req, res)
});

router.post('/perf/proj/team/goals', (req, res) => {
  teamGoals.teamGoals(req, res)
});

router.post('/perf/proj/goals/status', (req, res) => {
  setGoalStatus.goalStatus(req, res)
});

router.post('/perf/proj/avg/feedback', (req, res) => {
  projectLandingController.avgFeedbackRating(req, res)
});

module.exports = router
