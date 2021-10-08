function projComplete(req, res) {
    try {
        connectDatabase(dbQuery.SP.getProjectCompletedDetails, [req.headers.userid, 'X']).then((rowsat) => {
            const projCompletedDetails = rowsat.dbData[0];
            let arrCompletedProj = [];
            if (projCompletedDetails.length > 0) {
                projCompletedDetails.forEach(project => {
                    arrCompletedProj.push({
                        "projectOwnerId": project.employee_id,
                        "projectOwnerName": project.project_owner,
                        "projectId": project.project_id,
                        "projectTitle": project.project_name,
                        "completedOn": new Date(project.completed_date).getTime(),
                        "startDate": new Date(project.start_date).getTime(),
                        "endDate": new Date(project.end_date).getTime()
                    });
                });
            }
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "completedProjects": arrCompletedProj
            });

        }).catch((err) => {
            console.log(err);
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        });

    } catch (err) {
        console.log(err);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

module.exports.projComplete = projComplete