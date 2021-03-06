var extend = require('extend');
var simteconf = require('simteconf');

var beforeSpace = inString => {
   var spaceIDX = inString.indexOf(' ');
   if( spaceIDX < 0 ) return inString;
   return inString.slice(0, spaceIDX);
};

module.exports.areas = (areaFilePath, givenOptions) => {
   var defaultSettings = {
      encoding: 'utf8'
   };
   var options = extend({}, defaultSettings, givenOptions);

   var configLines = simteconf(areaFilePath, {
      encoding: options.encoding,
      skipNames: ['#'],
      lowercase: false,
      prefixGroups: [
         'NetmailArea',
         'BadArea',
         'DupeArea',
         'LocalArea',
         'EchoArea'
      ]
   });
   var echoArea = configLines.group('EchoArea');

   var echomailAreas = {};
   echoArea.names().forEach(echoAreaName => {
      var lcEchoAreaName = echoAreaName.toLowerCase();
      var echoAreaLine = echoArea.first(echoAreaName);
      var echoPath = beforeSpace(echoAreaLine);
      var passthrough = ( echoPath.toLowerCase() === 'passthrough' );

      if( passthrough ) echoPath = 'passthrough';

      var echoDesc = /-d "([^"]+?)"/.exec(echoAreaLine);
      if( echoDesc !== null ) echoDesc = echoDesc[1];

      echomailAreas[lcEchoAreaName] = {
         configName: echoAreaName,
         passthrough: passthrough,
         path: echoPath,
         description: echoDesc
      };
   });

   echomailAreas.area = function(areaName, callback){
      var lcAreaName = areaName.toLowerCase();
      if( typeof this[lcAreaName] === 'undefined' ){
         return callback({ notFound: true });
      }
      if( this[lcAreaName].passthrough ){
         return callback({ passthrough: true });
      }
      callback(
         null,
         extend({}, this[lcAreaName])
      );
   };

   echomailAreas.getAreaNames = function(){
      return Object.getOwnPropertyNames(this).filter(propertyName => {
         if( propertyName === 'area' ) return false;
         if( propertyName === 'getAreaNames' ) return false;
         return true;
      });
   };

   return echomailAreas;
};