var ItemPanelView = Backbone.View.extend({
  el: $('#item_details')[0],
  template: App.templates.item_panel,
  render: function() {
    console.log('we in render');
    this.$el.append(this.template(this.model));
    return this;
  },
  initialize: function() {
    this.render();
  }
});