const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate total
    let total = 0;

    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        total,
      },
    });

    // Create order items
    for (const item of cartItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        },
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
};