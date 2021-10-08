const request = require('request');

function getYearWiseRatings(req, res) {
    try {
        const options = {
            'method': 'GET',
            'url': "http://10.128.79.196/sap/opu/odata/sap/ZHR_OS_SEC_SRV/GetNPPMSRatingsSet",
            'headers': {
                'Accept': 'application/json',
                'cookie': req.headers.cookie
            },
            json: true
        };
        request(options, function (err, response, parsedJsonData) {
            if (!err && response.statusCode == 200) {
                const ratingsOData = parsedJsonData.d.results;
                let arrRating = [];
                if (ratingsOData && ratingsOData.length > 0) {
                    ratingsOData.forEach(ratings => {
                        arrRating.push({ "year": ratings.Year, "grade": ratings.Rating });
                    });
                }
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                    "status": 'Success',
                    "rating": arrRating
                });
            } else {
                console.log(err);
                httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                    "status": 'Failure',
                    "message": "Request Failed"
                })
            }
        });
    } catch (error) {
        console.log(error);
        return httpResponseHandlerError(resat, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

module.exports.getYearWiseRatings = getYearWiseRatings