const request = require('request');

class Profile {
    constructor(employeeId, name, imageUrl, isSaved = false, attention = false, riskOfLoss = '', rolRemark = '', potential = '',
        potentialRemark = '', developmentAction = '') {
        this.employeeId = employeeId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.isSaved = isSaved;
        this.attention = attention;
        this.riskOfLoss = riskOfLoss;
        this.rolRemark = rolRemark;
        this.potential = potential;
        this.potentialRemark = potentialRemark;
        this.developmentAction = developmentAction;
    }
}

async function getSubordinateList(req, res) {
    try {
        let subordinateList = await odataRequest(req, res);
        arr = [];
        subordinateIds = [];
        subordinateList.forEach(subordinate => {
            subordinateIds.push(subordinate.Pernr);
            arr.push(new Profile(subordinate.Pernr, subordinate.Subordinate, `https://mobcontent.ril.com/picture/${subordinate.Pernr}.jpg`));
        });
        connectDatabase(dbQuery.GET.getSubordinateList, [subordinateIds]).then((rows) => {
            if (rows.dbData.length == 0) {
                return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": arr });
            } else {
                rows.dbData.forEach(data => {
                    arr.forEach(subordinate => {
                        if (data.employee_id == subordinate.employeeId) {
                            if (data.riskofloss == 'Y' || (data.potential == 'H' || data.potential == 'M')) {
                                subordinate.attention = true;
                            }
                            subordinate.isSaved = true;
                            subordinate.riskOfLoss = data.riskofloss;
                            subordinate.rolRemark = data.riskofloss_remarks;
                            subordinate.potential = data.potential;
                            subordinate.potentialRemark = data.potential_remarks;
                            subordinate.developmentAction = data.dev_action_summary;
                        }
                    });
                });
                return httpResponseSuccessHandler(res, 200, { "status": "Success", "response": arr });
            }
        }).catch((err) => {
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
                "status": 'Failure',
                "message": 'Request failed'
            })
        })
    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }

}

function odataRequest(req, res) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `http://10.128.79.196/sap/opu/odata/sap/Zhr_os_sec_srv/GetNPSPSubordinateSet?$filter=ImPernr eq '${req.headers.userid}'`,
            'headers': { 'Accept': 'application/json', 'cookie': req.headers.cookie }
        };
        request(options, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                parsedJsonData = JSON.parse(body);
                resolve(parsedJsonData.d.results);
            } else {
                reject();
            }
        });
    });
}

module.exports.getSubordinateList = getSubordinateList;