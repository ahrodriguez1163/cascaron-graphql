import glob from "glob";

export async function getResolvers(folder) {
  let schema = {
    Query: {},
    Mutation: {},
  };

  let querys = await recopilerQuerys(folder);
  schema.Query = {
    ...querys,
    ...schema.Query,
  };

  let mutations = await recopilerMutations(folder);
  schema.Mutation = {
    ...mutations,
    ...schema.Mutation,
  };

  if (Object.keys(schema.Mutation).length == 0) {
    if (Object.keys(schema.Query).length == 0) {
      return {};
    } else {
      return { Query: schema.Query };
    }
  } else if (Object.keys(schema.Query).length == 0) {
    return { Mutation: schema.Mutation };
  } else {
    return schema;
  }
}

async function recopilerQuerys(ruta) {
  let options = {};
  let el = {};
  let files = await glob.sync(`./src/${ruta}/**/*Query.js`, options);
  for await (let file of files) {
    let arrruta = file.split("/");
    let trozosRuta = ruta.split("/");
    let pos = arrruta.indexOf(trozosRuta[0]);
    if (pos > -1) {
      arrruta.splice(0, pos);
    }
    let filename = arrruta.join("/");
    let Mo = null;
    try {
      Mo = await import(`../../${filename}`);
      if (!Mo.default.Query) {
        throw new Error();
      }
    } catch (error) {
      console.log(
        `error en: ${filename}, no exporta correctamente el objeto Query`
      );
      Mo.default.Query = {};
    }

    el = {
      ...el,
      ...Mo.default.Query,
    };
  }
  return el;
}

async function recopilerMutations(ruta) {
  let options = {};
  let el = {};
  let files = await glob.sync(`./src/${ruta}/**/*Mutation.js`, options);

  for await (let file of files) {
    let arrruta = file.split("/");
    let trozosRuta = ruta.split("/");
    let pos = arrruta.indexOf(trozosRuta[0]);
    if (pos > -1) {
      arrruta.splice(0, pos);
    }
    let filename = arrruta.join("/");

    let Mo = null;
    try {
      Mo = await import(`../../${filename}`);
      if (!Mo.default.Mutation) {
        throw new Error();
      }
    } catch (error) {
      console.log(
        `error en: ${filename}, no exporta correctamente el objeto Mutation`
      );
      Mo.default.Mutation = {};
    }

    el = {
      ...el,
      ...Mo.default.Mutation,
    };
  }
  return el;
}
