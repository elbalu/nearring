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


}