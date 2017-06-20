var ItemView = Backbone.View.extend({
  el: $('#content')[0],
  width: 1000,
  template: App.templates.item,
  events: {
    'click .nav.prev': 'previous',
    'click .nav.next': 'next',
    'click a.add_cart': 'clickAdd'
  },
  previous: function(e) {
    var id = this.model.id - 1;
    if (!this.isValid(id)) { return }
    this.resetContents();
    var model = App.dishes.get(id).toJSON();
    this.panel2 = new ItemPanelView({model: model});
    this.renderPanel(this.panel2, false);

    this.getPanel(id+1)
      .animate({
      left: this.width
      }, 300, function() {
        this.removePanel(id+1);
      }.bind(this));
    this.model = model;
    this.panel = this.panel2;
    router.navigate('/menu/' + id);
  },
  next: function(e) {
    var id = this.model.id + 1;
    if (!this.isValid(id)) { return }
    this.resetContents();
    var model = App.dishes.get(id).toJSON();
    this.panel2 = new ItemPanelView({model: model});
    this.renderPanel(this.panel2, true);

    this.getPanel(id)
      .css('left', this.width).animate({
      left: '0px'
      }, 300, function() {
        this.removePanel(id-1);
      }.bind(this));
    this.model = model;
    this.panel = this.panel2;
    router.navigate('/menu/' + id);
  },
  clickAdd: function(e) {
    e.preventDefault();
    this.trigger('add_to_cart', this.model.id);
  },
  render: function() {
    this.$el.html(this.template());
    this.renderPanel(this.panel);
  },
  renderPanel: function(panel, placeAbove) {
    $('#item_details')[placeAbove ? 'append' : 'prepend'](panel.$el[0].innerHTML);
  },
  getPanel: function(id) {
    return $(".panel[data-id="+ id + "]");
  },
  removePanel: function(id) {
    this.getPanel(id).remove();
  },
  isValid(id) {
    return !!App.dishes.get(id);
  },
  resetContents: function() {
    $('#item_details').html('');
    this.initialize();
  },
  initialize: function() { 
    this.panel = new ItemPanelView({model: this.model});
    this.render();
  }
});