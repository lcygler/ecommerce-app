const { User, Purchase, PurchaseDetail } = require('../db.js');

const getSalesPerMonth = async () => {
  try {
    const startDate = new Date();
    startDate.setDate(1);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    const salesPerMonth = await PurchaseDetail.findAll({
      attributes: [
        [PurchaseDetail.sequelize.literal('EXTRACT(MONTH FROM "Purchase"."createdAt")'), 'month'],
        [PurchaseDetail.sequelize.fn('SUM', PurchaseDetail.sequelize.col('quantity')), 'count'],
      ],
      include: [
        {
          model: Purchase,
          as: 'Purchase',
          attributes: [],
        },
      ],
      group: ['month'],
      order: ['month'],
    });

    const monthlySales = Array(12).fill(0);
    salesPerMonth.forEach((sale) => {
      const month = sale.getDataValue('month') - 1;
      const count = parseInt(sale.getDataValue('count'), 10);
      monthlySales[month] = count;
    });
    return monthlySales;
  } catch (error) {
    console.error('Failed to get sales per month', error);
    throw error;
  }
};

const getMonthlyUserRegistration = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const userCounts = await User.findAll({
      attributes: [
        [User.sequelize.literal('EXTRACT(\'MONTH\' FROM "User"."createdAt")'), 'month'],
        [User.sequelize.fn('COUNT', User.sequelize.col('id')), 'count'],
      ],
      where: User.sequelize.literal(`EXTRACT('YEAR' FROM "User"."createdAt") = ${currentYear}`),
      group: User.sequelize.literal('EXTRACT(\'MONTH\' FROM "User"."createdAt")'),
    });

    const monthlyUserRegistration = Array(12).fill(0);
    userCounts.forEach((userCount) => {
      const month = userCount.getDataValue('month');
      const count = userCount.getDataValue('count');
      monthlyUserRegistration[month - 1] = count;
    });

    return monthlyUserRegistration;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get monthly user registration');
  }
};

const getChartData = async (req, res) => {
  try {
    // Valores de muestra
    // Dejo estos valores para que se pueda apreciar el grafico, pero para que funcione realmente hay que descomentar la linea de abajo

    // const sales = [72, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60];
    // const UserRegistration = [12, 36, 220, 56, 20, 70, 30, 80, 65, 90, 72, 199];

    const sales = await getSalesPerMonth();
    const UserRegistration = await getMonthlyUserRegistration();

    const dataCharts = {
      salesPerMonth: sales,
      monthlyUserRegistration: UserRegistration,
    };

    res.json(dataCharts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getChartData,
};
