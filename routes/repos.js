/* -------------------- Open the user dashboard ------------------- */

exports.dashboard = function (req, res) {
  var orgName = req.param('orgName');
  console.log(orgName);
  res.render('dashboard',{orgName : orgName});
}

/*------------- Redirecting user to the main page -------------*/

exports.redirectToMain = function(req, res){
  res.render('index');
}

/* ------- This will fetch the list of repositories that the org has ----------- */

var request = require('request');
exports.listOfRepos = function(req, res){

  var orgName = req.param('orgName');
  console.log(orgName);
  var options = {
    url: 'https://api.github.com/orgs/'+orgName+'/repos',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var json = {"info" : info, "status" : 200}; //Successful
      res.send(json);
    }
    else{
      var info = {"status" : "400"}; //error or no-data
      res.send(info);

    }
  }
  request(options, callback);
};

/* -------------- Get the number of commits -------------------- */
exports.commits = function(req, res){

  var name = req.param('repoName');
  var orgName = req.param('orgName');
  console.log("info "+name+" "+orgName);

 res.render('getCommits',{name : name, orgName : orgName});

}

exports.getCommits = function(req, res){

  var repoName = req.param('name');
  var orgName = req.param('orgName');
  var options = {
    url: 'https://api.github.com/repos/'+orgName+'/'+repoName+'/commits',
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var json = {"info" : info, "status" : 200}; //Successful
      res.send(json);
    }
    else {
      var json = {"status" : 400} //Error
      res.send(json);
    }
  }
  request(options, callback);

}

/* -------- The function which would pass the username and then we can get the user profile ------ */

exports.userInformation = function(req, res){

  var user = req.param('user');

  res.render('getUserInformation',{user : user});

}

/* ----------- Here is the function which takes username and fetches data related to him (Display pic, github link, followers, etc...) ------ */
exports.getUserInformation = function(req, res) {

  var user = req.param('user');
  var options = {
    url: 'https://api.github.com/users/'+user,
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      if(info.login==null){
        var json = {"status" : 300}
        res.send(json);
      }
      else {
        var json = {"info": info, "status": 200};
        res.send(json);
      }
    }
    else{
      var json = {"status" : 400};
      res.send(json);
    }
  }

  request(options, callback);

}