const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


const createOrder = async (req, res) => {
  try {
    const { totalPrice, items } = req.body;

    const order = await prisma.order.create({
      data: {
        totalPrice: parseFloat(totalPrice),

        user: {
          connect: {
            id: req.user.id,
          },
        },

        orderItems: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,

            product: {
              connect: {
                id: item.productId,
              },
            },
          })),
        },
      },

      include: {
        orderItems: true,
      },
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },

      include: {
        orderItems: true,
      },
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
            select: {
                id:true,
                name:true,
                email:true,
                role:true,
            },
        },
        orderItems: true,
      },
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
};