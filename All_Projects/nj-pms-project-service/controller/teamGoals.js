function teamGoals(req, res) {
    try {
        if (!req.body || !req.body.projectId) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                "status": 'Failure',
                "message": 'Please send a valid request'
            });
        }
        connectDatabase(dbQuery.GET.teamGoals, [req.body.projectId]).then((rows) => {
            let goalDetails = rows.dbData.map((goal) => {
                return {
                    goalId: goal.goal_id,
                    goalDescription: goal.goal_desc,
                    goalStatusCode: goal.goal_status,
                    goalStatusText: goal.goal_status_text,
                    employeeId: goal.employee_id,
                    employeeName: goal.ename,
                    dueDate: new Date(goal.due_date).getTime()
                }
            });
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "teamMembers": goalDetails
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

module.exports.teamGoals = teamGoals;