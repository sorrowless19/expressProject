var jwt = require('jsonwebtoken');
const connection = require('../DatabaseConnection/dbConnection');
//ShowGames Logic
module.exports.showGamesIdea=function(req,res){
    jwt.verify(req.token, 'configSecret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        connection.query('SELECT * FROM gamesidea', function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
            console.log(error)
          }else{
              res.json({
                status:true,
                data:results,
                message:'Games Idea has been shown succesfully'
            })
          }
        });
      }
    });
}
module.exports.AddGamesIdea=function(req,res){
    jwt.verify(req.token, 'configSecret', (err, authData) => {
      const gamesidea = {
        Title : req.body.Title,
        Description :req.body.Description,
        IdUser:authData.ID
      }
if(err) {
    res.sendStatus(403);
  } else {
    connection.query('INSERT INTO gamesidea SET ?',[gamesidea], function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
        console.log(error)
      }else{
          res.json({
            status:true,
            data:results,
            message:'Post has been added succesfully'
        })
        
      }
    });
  }
      
      });
}
module.exports.AddGamesIdea=function(req,res){
  jwt.verify(req.token, 'configSecret', (err, authData) => {
    const gamesidea = {
      Title : req.body.Title,
      Description :req.body.Description,
      IdUser:authData.ID
    }
if(err) {
  res.sendStatus(403);
} else {
  connection.query('INSERT INTO gamesidea SET ?',[gamesidea], function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
      console.log(error)
    }else{
        res.json({
          status:true,
          data:results,
          message:'Post has been added succesfully'
      })
      
    }
  });
}
    
    });
}

module.exports.UpdateBookIdea=function(req,res){
  const gamesidea = {
    Title : req.body.Title,
    Description :req.body.Description,
   
  }
  jwt.verify(req.token, 'configSecret', (err, authData) => {
    // console.log(authData)
    if(err) {
      res.sendStatus(403);
    } else {
      var query = "UPDATE gamesidea SET Title = ?, Description = ? WHERE ID=?";
      connection.query(query,[gamesidea.Title,gamesidea.Description,req.params.id], function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
          console.log(error)
        }else{
            res.json({
              status:true,
              data:results,
              message:'Post has been updated succesfully'
          })
        }
      });
    }
  });
}




module.exports.DeleteBookIdea=function(req,res){

  jwt.verify(req.token, 'configSecret', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      var query = "DELETE FROM gamesidea WHERE id=?";
      connection.query(query,[req.params.id], function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
          console.log(error)
        }else{
            res.json({
              status:true,
              data:results,
              message:'Post has been delete succesfully'
          })
        }
      });
    }
  });
}
