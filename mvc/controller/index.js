/*
 * GET home page.
 */
module.exports = function (app) {


    var User = require('../model/user.js');
    var Groups = require('../model/groups.js');


    app.get('/logout', function (req, res) {
        var session = req.session,
            user = session.user;
        req.logOut();
        delete session.user;
        res.redirect('/');
    });


    function processHello(req, res) {
        var session = req.session;

        return ({
            viewName: "hello",
            baseTemplate: 'master',
            data: {
                title: 'hello Sai'
            }

        });
    }


    app.get('/app', function (req, res) {
        var json = processHello(req, res);
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(json));
            res.end();
        } else {
            res.render("public/templates/" + json.baseTemplate, json);
        }



    });

    function processSignup(req, res) {
        var session = req.session;

        return ({
            viewName: "validateSignup",
            baseTemplate: 'master',
            data: {
                title: 'hello Sai',
                registerEmail: req.body
            }

        });
    }


    app.post('/signup', function (req, res) {

        var json = processSignup(req, res);
        if (req.header('X-Requested-With') == 'XMLHttpRequest') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(json));
            res.end();
        } else {
            res.render("public/templates/" + json.baseTemplate, json);
        }
    });
    app.post('/personalProfile', function (req, res) {
        var session = req.session;
        var updateObject = {
            emailId: req.body.personalEmail,
            phone: req.body.personalPhone,
            profileSetup: 'personal'
        };
            var session = req.session;
        User.findByIdAndUpdate(req.body.id, updateObject, function (err, user) {
            if (err) {
                req.model = {
                    viewName: "hello",
                    baseTemplate: 'master',
                    message:{
                    type:'error',
                    message:'Error in Saving Profile. Please try again later'
                }
                }
                res.json(req.model);

            } else {
                req.model = {
                    data:{
                        viewName: "signup",
                        subView:"signup",
                        baseTemplate: 'master',
                        user: user,
                        message:{
                            type:'success',
                            message:'Profile Saved Successfully. Continue to next step.'
                        }
                    }
                }
                res.json(req.model);
            }
        });


    });


    app.post('/store_group', function (req, res) {
        var session = req.session;
        


        var workQuery = Groups.findOne({
            'guid': req.body.workGroup.guid
        });
        workQuery.exec(function (err, oldGroup) {

            if (oldGroup) {
                console.log('Existing work Group: ' + oldGroup.group_name + ' found!');
                //done(null, oldGroup);
            } else {
                var newGroup = new Groups();
                newGroup.guid = req.body.workGroup.guid,
                newGroup.group_name = req.body.workGroup.group_name,
                newGroup.location = req.body.workGroup.location,
                newGroup.group_owner_uid.push(req.body.FBId),
                newGroup.type = 'work'

                newGroup.save(function (err) {
                    if (err) throw err;
                    console.log('New work Group: ' + newGroup.group_name + ' added!');
                    //done(null, newGroup);
                });
            }


        });
        var liveQuery = Groups.findOne({
            'guid': req.body.workGroup.guid
        });
        liveQuery.exec(function (err, oldGroup) {

            if (oldGroup) {
                console.log('Existing live Group: ' + oldGroup.group_name + ' found!');
                //done(null, oldGroup);
            } else {
                var newGroup = new Groups();
                newGroup.guid = req.body.liveGroup.guid,
                newGroup.group_name = req.body.liveGroup.group_name,
                newGroup.location = req.body.liveGroup.location,
                newGroup.group_owner_uid.push(req.body.FBId),
                newGroup.type = 'live'

                newGroup.save(function (err) {
                    if (err) throw err;
                    console.log('New live Group: ' + newGroup.group_name + ' added!');
                    //done(null, newGroup);
                });
            }


        });
        var updateObject = {
            profileSetup: 'group'
        };
         User.findByIdAndUpdate(req.body.FBId, updateObject, function (err, user) {
            if (err) {
                req.model = {
                    viewName: "hello",
                    baseTemplate: 'master',
                    message:{
                    type:'error',
                    message:'Error in Saving Groups. Please try again later'
                }
                }
                res.json(req.model);

            } else {
                req.model = {
                    data:{
                        viewName: "signup",
                        subView:"signup",
                        baseTemplate: 'master',
                        user: user,
                        message:{
                            type:'success',
                            message:'Groups Saved Successfully !'
                        }
                    }
                }
                res.json(req.model);
            }
        });

    });


}