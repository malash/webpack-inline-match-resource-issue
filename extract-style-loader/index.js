const stringifyRequest = require('loader-utils').stringifyRequest;
const getRemainingRequest = require('loader-utils').getRemainingRequest;
const getStylesLoader = require.resolve('./getStyles');

const STYLES_REGEXP = /\/\* STYLE: (.*) \*\//;

module.exports = function (source) {
  if (STYLES_REGEXP.test(source)) {
    source = source.replace(STYLES_REGEXP, '');
    const remReq = getRemainingRequest(this);
    const output = `import ${stringifyRequest(this, `${this.resource}.css!=!${getStylesLoader}!${remReq}`)};${source}`;
    console.log('extra-style-loader/index');
    console.log(output);
    return output;
  }
  return source;
};
