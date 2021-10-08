function delimit(req, res) {
    try {
        if (!req.body || !req.body.projectId) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                "status": 'Failure',
                "message": 'Please send a valid request'
            });
        }

        connectDatabase(dbQuery.SP.delimitProject, [req.body.projectId, req.headers.userid]).then((rows) => {
            if (rows.dbData[0][0].code == 'E') {
                return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                    "status": 'Failure',
                    "message": rows.dbData[0][0].message
                });
            } else {
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": 'Success',
                    "message": "Project Delimited Successfully"
                });
            }
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

module.exports.delimit = delimit;