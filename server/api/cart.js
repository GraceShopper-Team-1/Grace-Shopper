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
      
      next(error);
    }
  }
});

// isAdminOrUser
router.put("/edit/", async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await User.findByToken(token);
  if (user) {
    try {
      let currentOrder = await Order.findOrCreate({
        where: { userId: user.id, status: "unfulfilled" },
        include: { model: Product, as: OrderProduct },
      });
      currentOrder = currentOrder[0];
      const orderProduct = await OrderProduct.findOrCreate({
        where: { orderId: currentOrder.id, productId: req.body.productId },
      });
      res.json(orderProduct[0]);
    } catch (error) {
     
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

// checkout cart
router.put("/success", async (req, res, next) => {
  const token = req.headers.authorization;

  const user = await User.findByToken(token);
  if (user) {
    try {
      const currentOrder = await Order.findOne({
        where: {
          userId: user.id || null, // guest checkout is null?
          status: "unfulfilled",
        },
        include: { model: Product, as: OrderProduct },
      });
      const updatedOrder = await currentOrder.update({
        status: "fulfilled",
      });
      res.json(updatedOrder);
    } catch (error) {
     
      next(error);
    }
  }
});
