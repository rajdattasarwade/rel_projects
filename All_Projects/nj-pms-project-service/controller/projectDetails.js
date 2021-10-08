function projectDetails(req, res) {
    try {
        if (!req.body || !req.body.projectId) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                "status": 'Failure',
                "message": 'Please send a valid request'
            });
        }

        connectDatabase(dbQuery.SP.getProjectDetails, [req.body.projectId, req.headers.userid]).then((rows) => {
            const [projectDetails, teamCount, goalDetails, feedback, childFrequency, valuesAndBehaviour] = rows.dbData;
            let projectData = {}
            if (projectDetails.length == 0) {
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": 'Success',
                    "projectDetails": projectData
                });
            }
            projectData["projectId"] = projectDetails[0].project_id;
            projectData["projectName"] = projectDetails[0].project_name;
            projectData["projectOwnerId"] = projectDetails[0].project_owner;
            projectData["projectOwnerName"] = projectDetails[0].project_owner_name;
            projectData["startDate"] = new Date(projectDetails[0].start_date).getTime();
            projectData["endDate"] = new Date(projectDetails[0].end_date).getTime();
            projectData["teamMembersCount"] = teamCount[0].team_count;
            projectData["frequencyId"] = projectDetails[0].feedback_freq_id;
            projectData["frequencyText"] = projectDetails[0].feedback_freq_text;
            projectData["childFrequency"] = [];
            projectData["vb"] = [];
            projectData["goals"] = []
            goalDetails.forEach(goal => {
                projectData["goals"].push({
                    "goalId": goal.goal_id,
                    "goalDescription": goal.goal_desc,
                    "goalStatusId": goal.goal_status,
                    "goalStatusText": goal.goal_status_text,
                    "deadline": goal.due_date
                })
            });
            childFrequency.forEach(freq => {
                projectData["childFrequency"].push({
                    "childFrequencyCode": freq.feedback_value_id,
                    "childFrequencyText": freq.feedback_value_text
                });
            });
            valuesAndBehaviour.forEach(vb => {
                projectData["vb"].push({
                    "vbCode": vb.vb_code,
                    "vbText": vb.vb_name
                });
            });

            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "projectDetails": projectData
            });

        }).catch((err) => {
            console.log(err);
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            });
        });
    } catch (error) {
        console.log(error);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        });
    }
}

module.exports.projectDetails = projectDetails