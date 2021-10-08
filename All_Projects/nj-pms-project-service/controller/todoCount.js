async function todoCount(req, res) {
    try {
        let employee_id = req.headers.userid;
        connectDatabase(dbQuery.GET.todoCountList, [employee_id]).then((rows) => {
            let result = rows.dbData;
            let todaysDate = new Date().getTime();
            let overdue = 0;
            let pending = 0;
            let todo = 0;
            let payload = {
                "performanceDiscussion": {
                    "overdue": overdue,
                    "pending": pending,
                },
                "todo": todo
            }
            result.forEach(element => {
                if (new Date(element.start_date).getTime() < todaysDate) {
                    overdue = overdue + 1;
                }
                if (new Date(element.start_date).getTime() > todaysDate && !new Date(element.end_date).getTime()) {
                    pending = pending + 1;
                }
            })
            payload['performanceDiscussion']['overdue'] = overdue;
            payload['performanceDiscussion']['pending'] = pending;
            httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, payload);

        }).catch((err) => {
            console.log("err ", err)
            return res.json({
                "status": "failure",
                "message": "request failed"
            });
        })

    }
    catch (err) {
        httpResponseHandlerError(res, msgCodeJson.ERR009.code, msgCodeJson.ERR009.msg)
    }
}


module.exports.todoCount = todoCount;