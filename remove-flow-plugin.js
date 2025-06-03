import babel from "@babel/core";

export default function stripFlowTypesPlugin() {
  return {
    name: "strip-flow-types",
    transform(code, id) {
      if (!id.endsWith(".js") && !id.endsWith(".jsx") && !id.endsWith(".mjs"))
        return null;
      const result = babel.transformSync(code, {
        plugins: ["@babel/plugin-transform-flow-strip-types"],
      });
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}
