var DishesCollection = Backbone.Collection.extend({
  model: DishModel,
  hasItem: function(id) {
    return !!this.get(id);
  }
});
