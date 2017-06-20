var IndexView = Backbone.View.extend({
  el: $('#content')[0],
  tagName: 'ul',
  template: App.templates.dishes,
  events: {
    'click article footer a': 'clickAdd',
    'click header': 'clickItem',
  },
  clickItem: function(e) {
    e.preventDefault();
    var id = +$(e.currentTarget).closest('li').attr('data-id');
    console.log('click item: ' + id);
    this.trigger('open_item', id);
  },
  clickAdd: function(e) {
    e.preventDefault();

    var id = +$(e.currentTarget).closest('li').attr('data-id');
    console.log('click add to cart: ' + id);
    this.trigger('add_to_cart', id);
  },
  render: function() {
    this.$el.html(this.template({ items: App.dishes.toJSON() }));
    // console.log($el);
  },
  initialize: function() {
    // this.collection = DishesCollection
    this.render();
  }
});