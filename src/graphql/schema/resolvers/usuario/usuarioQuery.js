export default {
  Query: {
    verifyToken: (_, args, ctx) => {
      return "hola a todos";
    },
    verifyExistUser: (_, args, ctx) => {
      return true;
    },
  },
};
