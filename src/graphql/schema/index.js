import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { getResolvers } from "../utilities/builderSchema";

const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), {
  all: true,
});

export async function getSchema() {
  const resolvers = await getResolvers("graphql/schema/resolvers");
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
}
