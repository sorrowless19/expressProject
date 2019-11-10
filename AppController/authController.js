const connection = require('../DatabaseConnection/dbConnection');
var bcrypt = require('bcrypt');
var jwtDecode = require('jwt-decode');
const jwtExpirySeconds = 300 
const saltRounds = 10;
var jwt = require('jsonwebtoken');
//register Logic
module.exports.register=function(req,res){
      // console.log("req",req.body);
  var today = new Date();
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    var users={
        username:req.body.username,
        password:hash,
        email:req.body.email,
        created:today,
      }
    connection.query('INSERT INTO accounts SET ?',users, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          console.log('The solution is: ', results);
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
        }
        });
  });
}
//Login Logic
module.exports.login=function(req,res){
    let username=req.body.username;
    let password = req.body.password;
    var secret = 'configSecret';
    connection.query('SELECT * FROM accounts WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            
          bcrypt.compare(password, results[0].password, function (err, result) {
            if (result == true) {
             
                const token = jwt.sign({ ID:results[0].id}, secret, {
                    algorithm: 'HS256',
                  })
                  
                
                  // set the cookie as the token string, with a similar max age as the token
                  // here, the max age is in milliseconds, so we multiply by 1000
                  res.cookie('token', token)
                //  console.log(req.cookies.token)
                //  var decoded = jwtDecode(req.cookies.token);
                //  console.log(decoded);
                  res.json({
                    token:token,
                  })
                  res.end()
            } else {
              res.json({
                      status:false,
                      message:"username and password does not match",
                    
                     });
            }
          });
        }
        else{
          res.json({
              status:false,    
            message:"username does not exits"
          });
        }
      }
    });
}