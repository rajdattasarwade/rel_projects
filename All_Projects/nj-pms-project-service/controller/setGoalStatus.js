function setGoalStatus(req, res) {
    try {
        if (!req.body || !req.body.goalId || !req.body.goalStatus) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                "status": 'Failure',
                "message": 'Please send valid request'
            })
        }

        connectDatabase(dbQuery.SP.changeGoalStatus, [req.body.goalId, req.body.goalStatus, req.headers.userid]).then((rowsat) => {
            if (rowsat.dbData[0].length > 0 && rowsat.dbData[0][0].code == 'S') {
                httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": "Success",
                    "message": "Goal Status changed successfully"
                })
            } else {
                httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                    "status": 'Failure',
                    "message": rowsat.dbData[0][0].message
                })
            }

        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        });
    } catch (err) {
        console.log("err ", err)
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

function goalStatus(req, res) {
    try {
        connectDatabase(dbQuery.GET.goalStatus).then((rows) => {
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(goals => {
                    details.push({
                        "goalCode": goals.value1,
                        "goalStatus": goals.value2
                    });
                });
            }
            return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": details });
        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        });
    } catch (err) {
        console.log("err ", err)
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

module.exports.setGoalStatus = setGoalStatus
module.exports.goalStatus = goalStatus