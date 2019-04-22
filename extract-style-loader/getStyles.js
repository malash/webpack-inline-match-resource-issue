const STYLES_REGEXP = /\/\* STYLE: (.*) \*\//;

module.exports = function(source) {
  console.log('extra-style-loader/getStyles');
  console.log(source);
  const match = source.match(STYLES_REGEXP);
  return match[1];
};
