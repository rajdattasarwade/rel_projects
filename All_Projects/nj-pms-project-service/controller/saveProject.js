//const moment = require('moment');

function saveProject(req, res) {
    try {
        if (!req.body.projectOwner || !req.body.projectTitle || !req.body.projectDescription || !req.body.startDate || !req.body.endDate || !req.body.frequencyCode || !req.body.childFrequency || !req.body.vbCodes) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, { status: "Failure", message: 'Please send a valid request' })
        }

        if (req.body.projectTitle.length >= 100) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, { status: "Failure", message: 'Please enter maximum 100 characters' })
        }

        if (req.body.startDate < new Date().getTime()) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, { status: "Failure", message: 'Start date cannot be past dated' })
        }

        if (req.body.endDate < req.body.startDate) {
            return httpResponseHandlerError(res, msgCodeJson.ERR004.code, { status: "Failure", message: 'Start date cannot be greater than end date ' })
        }

        let elementsArr1 = req.body.childFrequency;
        let childDetails = '';
        elementsArr1.forEach((elementText, index) => {
            index = index + 1;
            if (elementsArr1.length == index) {
                childDetails += '(' + index + ',$' + elementText + '$)';
            } else {
                childDetails += '(' + index + ',$' + elementText + '$), ';
            }
        });

        let elementsArr2 = req.body.vbCodes;
        let vbDetails = '';
        elementsArr2.forEach((elementText, index) => {
            index = index + 1;
            if (elementsArr2.length == index) {
                vbDetails += '(' + index + ',$' + elementText + '$)';
            } else {
                vbDetails += '(' + index + ',$' + elementText + '$), ';
            }

        });

        req.body.startDate = req.body.startDate
        req.body.endDate = req.body.endDate
        connectDatabase(dbQuery.SP.saveProject, [req.body.projectId, req.body.projectTitle, '', req.body.projectOwner, req.body.startDate, req.body.endDate, req.body.frequencyCode, childDetails, vbDetails, parseInt(req.headers.userid)]).then((rowsat) => {
            if (rowsat.dbData[0].length > 0 || rowsat.dbData[0][1].code == 'S') {
                httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": "Success",
                    "message": "project Performance Management created successfully"
                })
            } else {
                httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                    "status": 'failure',
                    "message": "project Performance Management (1905) created unsuccessfully"
                })
            }

        }).catch((err) => {
            console.log("err ", err)
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        });


    } catch (error) {
        console.log(error)
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'

        })


    }
}

module.exports.saveProject = saveProject