var CartItemsCollection = Backbone.Collection.extend({
  addItem: function(item, change) {
    var changeAmt = change || 1;
    var quantity = this.hasItem(item.id) ? this.getItem(item.id).get('quantity') : 0;
    var total = quantity + changeAmt;

    if (total < 1) {
      this.remove(item);
    } else {
      this.add(_.extend(item, {quantity: total}), { merge: true });
    }
  },
  hasItem: function(id) {
    return !!this.get(id);
  },
  getItem: function(id) {
    return this.findWhere({id: id});
  },
  totalCost: function() {
    return this.models.reduce(function(acc, item) {
      return acc + (item.get('quantity') * item.get('price'));
    }, 0);
  },
  initialize: function() {
    var cart = localStorage.getItem('sushiCart');
    if (cart) {
      this.reset(JSON.parse(cart));
    }
  }
});