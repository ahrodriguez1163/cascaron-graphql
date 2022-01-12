import {
  registerExecute,
  loginExecute,
} from "../../../../controller/usuarioController";

export default {
  Mutation: {
    register: async (_, args, ctx) => {
      return await registerExecute(args, ctx);
    },
    login: async (_, args, ctx) => {
      return await loginExecute(args, ctx);
    },
  },
};
