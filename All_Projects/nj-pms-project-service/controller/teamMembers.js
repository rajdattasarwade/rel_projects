function saveTeamMembers(req, res) {
    try {
        if (!req.body || !req.body.projectId || !req.body.teamMembers) {
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Please send a valid request'
            });
        }
        const teamMembers = req.body.teamMembers;
        let teamList = '';
        if (teamMembers.length > 0) {
            teamList = `(${teamMembers[0]})`;
            if (teamMembers.length > 1) {
                for (i = 1; i < teamMembers.length; i++) {
                    teamList += ",(" + (teamMembers[i]) + ")";
                }
            }
        }
        connectDatabase(dbQuery.SP.saveTeamMembers, [req.body.projectId, teamList, req.headers.userid]).then((rows) => {
            console.log(rows);
            if (rows.dbData[0][0].code == 'E') {
                return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                    "status": 'Failure',
                    "message": rows.dbData[0][0].message
                });
            } else {
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": 'Success',
                    "message": "Added/removed team members successfully"
                });
            }
        }).catch((err) => {
            console.log(err)
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

function getTeamList(req, res) {
    try {
        if (!req.body || !req.body.projectId) {
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Please send a valid request'
            });
        }
        connectDatabase(dbQuery.GET.getTeamMembers, req.body.projectId).then((rows) => {
            let employeeDetails = [];
            rows.dbData.forEach(member => {
                employeeDetails.push({
                    employeeId: member.employee_id,
                    employeeName: member.ename,
                    imageUrl: `https://mobcontent.ril.com/picture/${member.employee_id}.jpg`
                });
            });
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "teamMembers": employeeDetails
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

module.exports.saveTeamMembers = saveTeamMembers;
module.exports.getTeamList = getTeamList;
