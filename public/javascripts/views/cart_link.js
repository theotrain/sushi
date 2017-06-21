var CartLinkView = Backbone.View.extend({
  el: $('.cart')[0],
  template: App.templates.cart_link,
  render: function() {
    this.$el.html(this.template({ quantity: this.quantity }));
  },
  initialize: function() {
    this.updateQuantity();
    this.render();
    this.listenTo(this.collection, "add remove reset", this.updateQuantity);
  },
  updateQuantity: function() {
    this.quantity = this.collection.length;
    this.render();
  }
});