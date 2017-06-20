var CartLinkView = Backbone.View.extend({
  el: $('.cart')[0],
  template: App.templates.cart_link,
  render: function() {
    this.$el.html(this.template({ quantity: this.quantity }));
  },
  initialize: function(quantity) {
    this.setQuantity(quantity);
    this.render();
  },
  setQuantity: function(quantity) {
    this.quantity = quantity || 0;
    this.render();
  }
});