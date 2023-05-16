const getGendersController = async () => {
  return [
    { id: 1, name: 'Hombre' },
    { id: 2, name: 'Mujer' },
    { id: 3, name: 'Otros' },
  ];
};

module.exports = getGendersController;
