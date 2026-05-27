const prisma = require("../config/db");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await prisma.cartItem.create({
      data: {
        quantity,

        user: {
          connect: {
            id: req.user.id,
          },
        },

        product: {
          connect: {
            id: productId,
          },
        },
      },

      include: {
        product: true,
      },
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await prisma.cartItem.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        product: true,
      },
    });

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Item removed successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};