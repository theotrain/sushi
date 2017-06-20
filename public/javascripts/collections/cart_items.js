var CartItemsCollection = Backbone.Collection.extend({
  addItem: function(item, change) {
    // this.add(item);
    // console.log(item);
    // console.log(this);
    var changeAmt = change || 1;
    var quantity = this.hasItem(item.id) ? this.hasItem(item.id).get('quantity') : 0;
    var total = quantity + changeAmt;
    // console.log('qunatity: ' + quantity);
    // console.log('changeAmt: ' + changeAmt);
    // console.log('total: ' + total);
    if (total < 1) {
      this.remove(item);
    } else {
      this.add(_.extend(item, {quantity: total}), { merge: true });
    }
    // }
    // var quantity = _.findWhere(this, {id: item.id}).quantity || 0;
    // this.changeQuantity(item, quantity);
  },
  hasItem: function(id) {
    return this.findWhere({id: id});
  },
  // totalQuantity: function() {
  //   return this.models.reduce(function(acc, item) {
  //     return acc + item.get('quantity');
  //   }, 0);
  // },
  // changeQuantity: function(item, change) {
  //   this.add(_.extend(item, {quantity: quantity + change}), { merge: true });
  // },
  totalCost: function() {
    return this.models.reduce(function(acc, item) {
      return acc + (item.get('quantity') * item.get('price'));
    }, 0);
  },
  initialize: function() {
    //grab cart from localStorage if exists
    var cart = localStorage.getItem('sushiCart');
    if (cart) {
      this.reset(JSON.parse(cart));
    }
  }
});