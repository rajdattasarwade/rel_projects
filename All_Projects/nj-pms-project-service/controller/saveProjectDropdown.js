function feedbackFrequency(req, res) {
    try {
        connectDatabase(dbQuery.GET.getFeedBackFrequency).then((rows) => {
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(feedbackFrequnecy => {
                    details.push({
                        "frequencyCode": feedbackFrequnecy.value1,
                        "frequencyName": feedbackFrequnecy.value2
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
        })
    } catch (err) {
        console.log(err);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}


function childFrequency(req, res) {
    try {
        if (!req.body.frequencyCode) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, {
                "status": 'Failure',
                "message": 'Please send valid frequency code'
            })
        }

        connectDatabase(dbQuery.GET.getChildFrequency, [req.body.frequencyCode]).then((rows) => {
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(childFrequnecy => {
                    details.push({
                        "code": childFrequnecy.value1,
                        "name": childFrequnecy.value2
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
        })
    } catch (err) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}


function valuesAndBehavior(req, res) {
    try {
        connectDatabase(dbQuery.GET.getValuesAndBehavior).then((rows) => {
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(valueandbehavior => {
                    details.push({
                        "vbCode": valueandbehavior.vb_code,
                        "vbText": valueandbehavior.vb_name
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
        })
    } catch (err) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }


}



module.exports.feedbackFrequency = feedbackFrequency
module.exports.childFrequency = childFrequency
module.exports.valuesAndBehavior = valuesAndBehavior