function projectCountAndFeedback(req, res) {
    try {
        let empid = req.headers.userid;
        projectInsert = [empid, empid];
        let details = { ongoingProjects: 0, feedbackReceived: 0 };
        connectDatabase(dbQuery.GET.counts, projectInsert).then((rows) => {
            if (rows.dbData[0].length > 0) {
                details['ongoingProjects'] = rows.dbData[0].length;
            }
            if (rows.dbData[1].length > 0) {
                details['feedbackReceived'] = rows.dbData[1][0].feedbackreceivedcount;
            }
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "response": details
            });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (err) {
        console.log(err);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

function onGoingProjects(req, res) {
    try {
        let empid = req.headers.userid;
        projectInsert = [empid, empid, empid];
        let query = dbQuery.GET.getOngoingProjDtls + dbQuery.GET.getCompletedProjGoalCount + dbQuery.GET.getTotalProjGoalCount;
        connectDatabase(query, projectInsert).then((rows) => {
            let details = [];
            if (rows.dbData[0].length > 0) {
                rows.dbData[0].forEach(results => {

                    let compCount = rows.dbData[1].find(function (item) {
                        if (item.project_id == results.project_id) {
                            return item;
                        }
                    });

                    let totCount = rows.dbData[2].find(function (item) {
                        if (item.project_id == results.project_id) {
                            return item;
                        }
                    });

                    let goalStatus = 0;
                    if (totCount && compCount) {
                        goalStatus = (parseInt(compCount.completedprojgoalcnt) / parseInt(totCount.totalprojgoalcnt)) * 100;
                    }

                    if (results.length != 0) {
                        details.push({
                            "projectOwnerId": results.project_owner,
                            "projectOwnerName": null,
                            "projectId": results.project_id,
                            "projectTitle": results.project_name,
                            "goalStatus": goalStatus.toFixed(2),
                            "startDate": new Date(results.start_date).getTime(),
                            "endDate": new Date(results.end_date).getTime()
                        });
                    }
                });
            }
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "response": details
            });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (err) {
        console.log(err);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

async function teamDetails(req, res) {
    try {
        let empid = req.headers.userid;
        let projid = req.body.projectid;

        projectInsert = [projid];
        connectDatabase(dbQuery.SP.getTeamDetails, projectInsert).then((rows) => {
            let details = [];
            if (rows.dbData[0].length > 0) {
                rows.dbData[0].forEach(teamMembers => {
                    if (teamMembers.length != 0) {
                        let projRatingArr = rows.dbData[1].map((results) => {
                            if (results.employee_id == teamMembers.employee_id) {
                                return results;
                            }
                        })
                        details.push({
                            "employeeId": teamMembers.employee_id,
                            "employeeName": teamMembers.ename,
                            "jobTitle": teamMembers.jobtitle,
                            "imageUrl": "",
                            "projectRating": projRatingArr
                        });
                    }
                });
            }

            return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": details });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (error) {
        console.log(error);
    }
}

async function dropdownFilter(req, res) {
    try {
        connectDatabase(dbQuery.GET.getDropdownFilters).then((rows) => {
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(dropdownFilters => {
                    details.push({
                        "filterCode": dropdownFilters.value1,
                        "filterType": dropdownFilters.value2
                    });
                });
            }
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "response": details
            });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (err) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

function projectGoalCounts(req, res) {
    try {
        connectDatabase(dbQuery.GET.getProjGoalCounts, [req.headers.userid]).then((rows) => {
            let details = {};
            details['primaryGoals'] = {
                "competed": 0,
                "partiallyCompleted": 0,
                "notStarted": 0
            };
            details['projectGoals'] = {
                "competed": 0,
                "partiallyCompleted": 0,
                "notStarted": 0
            };
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(goalsCount => {
                    if (goalsCount.length != 0) {
                        if (goalsCount.goal_type == '01') {
                            if (goalsCount.goal_status == '03') {
                                details['primaryGoals']["notStarted"] = goalsCount.cnt;
                            } else if (goalsCount.goal_status == '05') {
                                details['primaryGoals']["partiallyCompleted"] = goalsCount.cnt;
                            } else if (goalsCount.goal_status == '06') {
                                details['primaryGoals']["competed"] = goalsCount.cnt;
                            }
                        } else if (goalsCount.goal_type == '02') {
                            if (goalsCount.goal_status == '03') {
                                details['projectGoals']["notStarted"] = goalsCount.cnt;
                            } else if (goalsCount.goal_status == '05') {
                                details['projectGoals']["partiallyCompleted"] = goalsCount.cnt;
                            } else if (goalsCount.goal_status == '06') {
                                details['projectGoals']["competed"] = goalsCount.cnt;
                            }
                        }
                    }
                });
            }
            return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": details });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (err) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

function avgFeedbackRating(req, res){
    try {
        let empid = req.headers.userid;
        let projid = req.body.projectid;

        projectInsert = [empid, projid];
        let details = {};
        details['managerRating'] = 0;
        details['teammateRating'] = 0;
        details['peerRating'] = 0;
        details['otherRating'] = 0;
        details['self'] = 0;
        details['workDeliverable'] = 0;
        details['vb'] = 0;
        details['domainSkills'] = 0;
        details['socialInfluence'] = 0;
        connectDatabase(dbQuery.SP.getAvgFeedbackRatings, projectInsert).then((rows) => {
            
            //console.log(rows.dbData);
            if (rows.dbData[0].length > 0) {
                rows.dbData[0].forEach(avgRatingOne => {
                    if(avgRatingOne['relationship'] == "Manager"){
                        details['managerRating'] = avgRatingOne['overall_score'];
                    }
                    if(avgRatingOne['relationship'] == "Teammate"){
                        details['teammateRating'] = avgRatingOne['overall_score'];
                    }
                    if(avgRatingOne['relationship'] == "Peers"){
                        details['peerRating'] = avgRatingOne['overall_score'];
                    }
                    if(avgRatingOne['relationship'] == "Others"){
                        details['otherRating'] = avgRatingOne['overall_score'];
                    }
                    if(avgRatingOne['relationship'] == "Self"){
                        details['self'] = avgRatingOne['overall_score'];
                    }
                })
                rows.dbData[1].forEach(avgRatingTwo => {
                    if(avgRatingTwo['value1'] == "01"){
                        details['workDeliverable'] = avgRatingTwo['ratings'];
                    }
                    if(avgRatingTwo['value1'] == "02"){
                        details['vb'] = avgRatingTwo['ratings'];
                    }
                    if(avgRatingTwo['value1'] == "03"){
                        details['domainSkills'] = avgRatingTwo['ratings'];
                    }
                    if(avgRatingTwo['value1'] == "04"){
                        details['socialInfluence'] = avgRatingTwo['ratings'];
                    }
                })
            }

            return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": details });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.projectCountAndFeedback = projectCountAndFeedback;
module.exports.onGoingProjects = onGoingProjects;
module.exports.dropdownFilter = dropdownFilter;
module.exports.projectGoalCounts = projectGoalCounts;
module.exports.teamDetails = teamDetails;
module.exports.avgFeedbackRating = avgFeedbackRating;
