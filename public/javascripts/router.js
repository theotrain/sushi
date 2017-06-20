var router = new (Backbone.Router.extend({
  routes: {
    'menu'      : 'index',
    ''         : 'index',
    'menu/:id'  : 'item',
    'checkout'  : 'checkout'
  },
  index: function() {
    App.indexView();
  },
  checkout: function() {
    App.checkoutView();
  },
  item: function(id) {
    App.itemView(+id);
  },
  initialize: function() {
    Backbone.history.start({
      pushState: true
    });
    this.route(/^\/?$/, 'index', this.index);
  }
}))();

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});