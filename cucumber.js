module.exports = {
  default: {
    requireModule: ["tsx/cjs"],
    require: ["features/step_definitions/*.ts"],
    paths: ["features/*.feature"],
  },
};
