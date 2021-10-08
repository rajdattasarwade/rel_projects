function searchProject(req, res) {
    try {
        const employeeId = req.headers.userid
        connectDatabase(dbQuery.GET.searchProject, [employeeId, employeeId, employeeId, employeeId, employeeId]).then((rows) => {
            let projectDetails = rows.dbData.map((project) => {
                return {
                    projectId: project.project_id,
                    projectName: project.project_name,
                    projectOwnedId: project.project_owner,
                    projectOwnerName: project.ename
                }
            });
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "teamMembers": projectDetails
            });
        }).catch((err) => {
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            });
        });
    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        });
    }
}

module.exports.searchProject = searchProject;