var App = {
  templates: JST,
  $el: $('main'),
  initHelpers: function() {
    Handlebars.registerHelper('format_price', function(price) {
      return Number(price).toFixed(2);
    });
    Handlebars.registerHelper('format_quantity', function(quantity, word) {
      return quantity === 1 ? word : word + 's';
    });
    Handlebars.registerHelper('kj_to_kcal', function(kj) {
      return (kj * 0.239006).toFixed(4);
    });
  },
  initCart: function() {
    this.cart = new CartItemsCollection();
    this.cart_view = new CartView({ collection: this.cart });
    this.cart_link_view = new CartLinkView({ collection: this.cart });
    window.addEventListener('unload', function() {
      localStorage.setItem('sushiCart', JSON.stringify(this.cart.toJSON()));
    }.bind(this));
  },
  indexView: function() {
    this.stopListening(this.index);
    this.index = new IndexView();
    this.listenTo(this.index, "open_item", this.openMenuItem);
    this.listenTo(this.index, "add_to_cart", this.addToCart);
    if (this.cart.length > 0) {
      this.cart_view.show();
    }
  },
  itemView: function(id) {
    this.stopListening(this.item);
    this.item = new ItemView({model: this.itemFromId(id)});
    this.listenTo(this.item, 'add_to_cart', this.addToCart);
    if (this.cart.length > 0) {
      this.cart_view.show();
    }
  },
  navigateItems: function(id) {
    if (this.dishes.hasItem(id)) {
      this.openMenuItem(id);
    }
  },
  checkoutView: function() {
    this.stopListening(this.checkout);
    this.checkout = new CheckoutView({
      collection: this.cart,
      total: this.cart.totalCost()
    });
    this.cart_view.hide();
    this.listenTo(this.checkout, 'increment_item', this.incrementItem);
    this.listenTo(this.checkout, 'decrement_item', this.decrementItem);
  },
  incrementItem: function(id) {
    this.cart.addItem(this.itemFromId(id));
    this.checkout.initialize({
      collection: this.cart,
      total: this.cart.totalCost()
    });
  },
  decrementItem: function(id) {
    this.cart.addItem(this.itemFromId(id), -1);
    this.checkout.initialize({
      collection: this.cart,
      total: this.cart.totalCost()
    });
  },
  openMenuItem: function(id) {
    router.navigate('/menu/' + id, { trigger: true });
  },
  addToCart: function(id) {
    this.cart.addItem(this.itemFromId(id));
  },
  itemFromId: function(id) {
    return this.dishes.findWhere({ id: id }).toJSON();
  },
  getLength: function() {
    return this.dishes.length;
  },
  init: function(dishes) {
    this.dishes = new DishesCollection(dishes);
    this.initHelpers();
    _.extend(this, Backbone.Events);
    this.initCart();
  }
};
