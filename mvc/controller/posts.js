module.exports = function(app) {
app.get('/create-post', function (req, res) {


    req.model = {
        viewName: 'posts',
        master: 'public/templates/master',
        data: {
            title: 'home page'
        }

    };

    res.render(req.model.master, req.model);

});

app.get('/usermanager', function (req, res) {


    req.model = {
        viewName: 'usermanager',
        master: 'public/templates/master',
        data: {
            title: 'user manager'
        }

    };

    res.render(req.model.master, req.model);

});


app.get('/users', function (req, res) {


    req.model = [{
        firstname:"Balu",
            lastname:"Loganathan",
            age:"30"

        },{
            firstname:"Monika",
            lastname:"Jeyakumar",
            age:"28"
       
       }];

    res.send(req.model);

});



}