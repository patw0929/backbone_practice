var Users = Backbone.Collection.extend({

    url: 'api_users'

});

var UserList = Backbone.View.extend({

    el: $('.page'),
    render: function () {
        var that = this;
        var users = new Users();
        users.fetch({
            success: function () {
                var template = _.template($("#user-list-template").html(), { users: users.models });
                that.$el.html(template);
            }
        });  
    }

});

var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    }
});

var userList = new UserList();

var router = new Router();
router.on('route:home', function () {
    userList.render();
});

Backbone.history.start();