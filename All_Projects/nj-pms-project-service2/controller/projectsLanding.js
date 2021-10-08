const request = require('request');

async function ProjectCountAndFeedback(req, res){
    try{
        let empid  = req.headers.userid; 
        let jsonArr = {
            "ongoingProjects": 4,
            "feedbackReceived": 3,
          };
        
          jsonArr.then(result => {
            httpResponseDetailsHandler(res, msgCodeJson.ERR004.code, "Success", result);
          }).catch(err=>{
            //console.log(err);
            httpResponseHandler(res,MsgCode.ERR009.code, "Failure",MsgCode.ERR009.msg)
          })

    } catch(error){
        console.log(error);
    }
}

async function PerformanceDisAndToDoCount(req, res){
    try{
        let empid  = req.headers.userid; 
        let jsonArr = {
            "performanceDiscussion": {
                "overdue": 3,
                "pending": 4
              },
              "todo": 4
            };
        
        jsonArr.then(result => {
            httpResponseDetailsHandler(res, msgCodeJson.ERR004.code, "Success", result);
        }).catch(err=>{
            //console.log(err);
            httpResponseHandler(res,MsgCode.ERR009.code, "Failure",MsgCode.ERR009.msg)
        })
        
    } catch(error){
        console.log(error);
    }
}

async function OngoingProjects(req, res){
    try{
        let empid  = req.headers.userid; 
        let jsonArr = [
            {
              "projectOwnerId": "10059404",
              "projectOwnerName": "Mr. XYZ",
              "projectId": "01",
              "projectTitle": "Project title",
              "goalStatus": "25%",
              "startDate": 1586889000000,
              "endDate": 1592159400000
            },
            {
              "projectOwnerId": "19507440",
              "projectOwnerName": "Mr. ABC",
              "projectId": "02",
              "projectTitle": "Project title 2",
              "goalStatus": "50%",
              "startDate": 1586889000000,
              "endDate": 1592159400000
            }
          ];
        
        jsonArr.then(result => {
            httpResponseDetailsHandler(res, msgCodeJson.ERR004.code, "Success", result);
        }).catch(err=>{
            //console.log(err);
            httpResponseHandler(res,MsgCode.ERR009.code, "Failure",MsgCode.ERR009.msg)
        })
    } catch(error){
        console.log(error);
    }
}

async function CompletedProjects(req, res){
    try{
        let empid  = req.headers.userid; 
        let jsonArr = [
            {
              "projectOwnerId": "10059404",
              "projectOwnerName": "Mr. XYZ",
              "projectId": "02",
              "projectTitle": "Project title",
              "completedOn": 1592159400000,
              "startDate": 1586889000000,
              "endDate": 1592159400000
            },
            {
              "projectOwnerId": "19507440",
              "projectOwnerName": "Mr. ABC",
              "projectId": "05",
              "projectTitle": "Project title 2",
              "completedOn": 1592159400000,
              "startDate": 1586889000000,
              "endDate": 1592159400000
            }
          ];
        
        jsonArr.then(result => {
            httpResponseDetailsHandler(res, msgCodeJson.ERR004.code, "Success", result);
        }).catch(err=>{
            //console.log(err);
            httpResponseHandler(res,MsgCode.ERR009.code, "Failure",MsgCode.ERR009.msg)
        })
    } catch(error){
        console.log(error);
    }
}

async function DropdownFilter(req, res){
    try {
        let empid  = req.headers.userid;
        connectDatabase(dbQuery.GET.getDropdownFilters).then((rows) => {
            console.log(rows.dbData)
            let details = [];
            if (rows.dbData.length > 0) {
                rows.dbData.forEach(dropdownFilters => {
                    if (dropdownFilters.length != 0) {
                        details.push({
                            "filterCode": dropdownFilters.value1,
                            "filterType": dropdownFilters.value2
                        });
                    }
                });
            }
            console.log(details);
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

module.exports.ProjectCountAndFeedback = ProjectCountAndFeedback;
module.exports.PerformanceDisAndToDoCount = PerformanceDisAndToDoCount;
module.exports.OngoingProjects = OngoingProjects;
module.exports.CompletedProjects = CompletedProjects;
module.exports.DropdownFilter = DropdownFilter;

