const User = require('../model/user');
const bcrypt = require('bcrypt-nodejs');

function addUser(req, res){
    try {
        let userhashpwd = "";
        if(req.body.userpass){
            userhashpwd = bcrypt.hashSync(req.body.userpass);
        }

        const user = new User({
            user_name: req.body.username,
            user_email: req.body.useremail,
            user_pass: userhashpwd,
            user_status: req.body.userstatus,
            user_registered: req.body.userregistered,
            user_role:req.body.userrole
        });
        user.save()
            .then(result => {
              console.log('Created User');
              return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "response": []
                });
            })
            .catch(err => {
                console.log(err);
                return httpResponseHandlerError(res, msgCodeJson.ERR003.code, {
                "status": 'Failure',
                "message": err._message
                })
            });
    } catch (err) {
        console.log(err);
        return httpResponseHandlerError(res, msgCodeJson.ERR009.code, {
            "status": 'Failure',
            "message": 'Request failed'
        })
    }
}

function listUsers(req, res){
    try {
        User.find().then(result=>{
            //console.log(result)
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, {
                "status": 'Success',
                "response": result
            });
        }).catch(err=>{
            return httpResponseHandlerError(res, msgCodeJson.ERR001.code, {
                "status": 'Failure',
                "message": msgCodeJson.ERR001.message
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

module.exports.addUser = addUser;
module.exports.listUsers = listUsers;

