// Remove when https://github.com/BuilderIO/mitosis/issues/1179 is fixed
const regex =
  /forwardRef\<Props\["([A-Za-z]+)"\]>\(function\s+([A-Za-z]+)\(\s+props:\s+Props/;

/** @type {import('@builder.io/mitosis').Plugin} */
module.exports = () => ({
  code: {
    post(code) {
      const match = regex.exec(code);
      if (!match) return code;
      return code.replace(
        regex,
        `forwardRef<Props["${match[1]}"]>(function ${match[2]}(props: Omit<Props, "${match[1]}">`
      );
    },
  },
});
