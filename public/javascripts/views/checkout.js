var CheckoutView = Backbone.View.extend({
  el: $('#content')[0],
  template: App.templates.checkout,
  events: {
    'click .fa-minus': 'minus',
    'click .fa-plus': 'plus',
    'click form input': 'order'
  },
  plus: function(e) {
    var id = this.getIdFromEvent(e);
    this.trigger('increment_item', id);
  },
  minus: function(e) {
    var id = this.getIdFromEvent(e);
    this.trigger('decrement_item', id);
  },
  order: function(e) {
    e.preventDefault();
    router.navigate('/', { trigger: true });
  },
  getIdFromEvent: function(e) {
    return +$(e.currentTarget).closest('tr').attr('data-id');
  },
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.total
    }))
  },
  initialize: function(options) {
    this.total = options.total;
    this.render();
  }
});