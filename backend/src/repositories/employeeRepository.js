const prisma = require('../utils/prisma');

const getAll = async () => {
  return await prisma.employee.findMany();
};

const getById = async (id) => {
  return await prisma.employee.findUnique({
    where: { id: parseInt(id) }
  });
};

const count = async () => {
  return await prisma.employee.count();
};

module.exports = {
  getAll,
  getById,
  count
};
