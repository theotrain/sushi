var ItemPanelView = Backbone.View.extend({
  el: $('#item_details')[0],
  // id: 'item_details',
  template: App.templates.item_panel,
  render: function() {
    console.log('we in render');
    this.$el.append(this.template(this.model));
    // this.$el.html('hi there');
    return this;
  },
  initialize: function() {
    this.render();
    // console.dir(this.model);
    // console.log($('#item_details')[0]);
    // console.log(typeof this.template(this.model));
    // console.log(this.$el);
    // this.$el.html(this.template(this.model))
  }
});