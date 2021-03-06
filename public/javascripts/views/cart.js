var CartView = Backbone.View.extend({
  el: $('#cart')[0],
  template: App.templates.cart_items,
  events: {
    'click .empty_cart': 'emptyCart'
  },
  emptyCart: function(e) {
    e.preventDefault();
    this.collection.reset();
  },
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.collection.totalCost()
    }));
  },
  addItem: function() {
    this.render();
    if (this.collection.length === 1) this.$el.slideDown();
  },
  removeItem: function() {
    this.render();
    if (this.collection.length === 0) this.$el.slideUp();
  },
  show: function() {
    this.$el.show();
    this.render();
  },
  hide: function() {
    this.$el.hide();
    this.render();
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add change', this.addItem);
    this.listenTo(this.collection, 'remove reset', this.removeItem);
  }
});