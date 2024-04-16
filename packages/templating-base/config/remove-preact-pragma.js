// Remove when https://github.com/BuilderIO/mitosis/issues/1158 is fixed
/** @type {import('@builder.io/mitosis').Plugin} */
module.exports = () => ({
  code: {
    post(code) {
      return code.replaceAll("/** @jsx h */", "");
    },
  },
});
