var postCss = require('postcss');

module.exports = postCss.plugin('myPlugin', function myPlugin(options){
  return function (css){
    options = options || {};

    css.walkAtRules('dynamicDateContent', function(rule){
      rule.parent.each(function(decl) {
        if(decl.prop === 'content'){
          var replacement = decl.clone({value: '"' + new Date().toISOString() + '"'});
          decl.replaceWith(replacement);
        }
      });
    });
  };
});
