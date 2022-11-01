const router = require("express").Router();
const {
  models: { Order, OrderProduct, Product, User },
} = require("../db");
module.exports = router;

// GET api/cart -- get all items in cart, should be /:userId, status: "unfulfilled"
router.get("/", async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  if (user) {
    try {
      let cart = await Order.findOrCreate({
        where: { userId: user.id, status: "unfulfilled" },
        include: Product,
      });
      cart = cart[0].products;
      res.json(cart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    try {
      let cart = await Order.findOrCreate({
        where: { status: "unfulfilled" },
        include: Product,
      });
      cart = cart[0].products;
      res.json(cart);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

// old GET
// router.get("/", async (req, res, next) => {
// 	try {
// 		const cart= await OrderProduct.findAll();
// 		const cartItemIds = cart.map((item) => item.productId);
// 		const books = await Product.findAll({
// 			where: {
// 				id: cartItemIds.map((bookId) => bookId),
// 			},
// 		});
// 		res.json(books);
// 	} catch (error) {
// 		console.log(error);
// 		next(error);
// 	}
// });

// POST api/cart -- add new item to cart, maybe should be put findOrCreate, or cart/:userId (no single GET)
// router.post("/", async (req, res, next) => {
// 	try {
// 		const cartItem = await OrderProduct.create(req.body);
// 		res.status(201).json(cartItem);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// isAdminOrUser
router.put("/", async (req, res, next) => {
  console.log(req.body);
  const token = req.body.headers.authorization;

  const user = await User.findByToken(token);

  if (user) {
    try {
      const currentOrder = await Order.findOne({
        where: { userId: user.id, status: "unfulfilled" },
        include: { model: Product, as: OrderProduct },
      });
      // { productId } = req.body; // purchaseQuantity?
      const orderProduct = await OrderProduct.findOrCreate({
        where: { orderId: currentOrder.id, productId: req.body.productId },
        // include: { model: Product }, // need to do new association for this
      });
      // await currentOrder.update(quantity);
      // await orderProduct.save();
      res.json(orderProduct[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    try {
      const currentOrder = await Order.findOne({
        where: { status: "unfulfilled" },
        include: { model: Product, as: OrderProduct },
      });
      // { productId } = req.body; // purchaseQuantity?
      const orderProduct = await OrderProduct.findOrCreate({
        where: { orderId: currentOrder.id, productId: req.body.productId },
        // include: { model: Product }, // need to do new association for this
      });
      // await currentOrder.update(quantity);
      // await orderProduct.save();
      res.json(orderProduct[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

// DELETE /api/cart/:cartId -- remove item from cart
router.delete("/:cartItemId", async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.findByPk(req.params.cartItemId);
    await cartItem.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
