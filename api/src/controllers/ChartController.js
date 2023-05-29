const { User } = require('../db.js');

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
    const salesPerMonth = [72, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60]; // Valores de muestra
    // const monthlyUserRegistration = [12, 36, 220, 56, 20, 70, 30, 80, 65, 90, 72, 199]; // Dejo estos valores para que se pueda apreciar el grafico, pero para que funcione realmente hay que descomentar la linea de abajo
    const monthlyUserRegistration = await getMonthlyUserRegistration();

    const dataCharts = {
      salesPerMonth,
      monthlyUserRegistration,
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
