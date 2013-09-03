$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

var Users = Backbone.Collection.extend({

    url: 'api_users'

});

var User = Backbone.Model.extend({

    urlRoot: 'api_users'

});

var EditUser = Backbone.View.extend({

    el: $('.page'),
    render: function () {
        var template = _.template($("#edit-user-template").html(), {});
        this.$el.html(template);
    },
    events: {
        'submit .edit-user-form': 'saveUser'
    },
    saveUser: function (e) {
        var userDetails = $(e.currentTarget).serializeObject();
        var user = new User();
        user.save(userDetails, {
            success: function (user) {
                router.navigate('', {trigger: true});
            }
        });
        return false;
    }

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
        '': 'home',
        'new': 'editUser'
    }
});

var userList = new UserList();
var editUser = new EditUser();

var router = new Router();
router.on('route:editUser', function () {
    editUser.render();
});

router.on('route:home', function () {
    userList.render();
});

Backbone.history.start();