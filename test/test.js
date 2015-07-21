/* global describe, it */
var areas, areasNoFunction;
var assert = require('assert');
var path = require('path');

var pathCFG = path.join(__dirname, 'areas.cfg');

var testData = {
   'ganjanet.local': {
      configName: 'GanjaNet.Local',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\GanjaLoc',
      description: 'Local ganja of FGHI gate author'
   },
   'ru.blog.mithgol': {
      configName: 'Ru.Blog.Mithgol',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\BLOG-MTW',
      description: 'Фидонетовский блог Мицгола-вебмастера' 
   },
   'sunny.night': { 
      configName: 'Sunny.Night',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\SunNight',
      description: 'Солнечная ночь'
   },
   'ru.ftn.develop': { 
      configName: 'Ru.FTN.Develop',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\FTNDevel',
      description: 'Создание и поддержка фидонетовского софта'
   },
   'ru.ftn.winsoft': { 
      configName: 'Ru.FTN.WinSoft',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\FTNWinSo',
      description: 'Эха о фидософте, GUI имеющем'
   },
   'su.fidotech': { 
      configName: 'SU.FidoTech',
      passthrough: false,
      path: '\\FIDO\\MAIL\\JAM\\Fidotech',
      description: 'Фидонетовские технологии'
   },
   'synchronet': { 
      configName: 'SynchroNet',
      passthrough: false,
      path: '\\Fido\\Mail\\JAM\\Synchro',
      description: null
   }
};

describe('Echomail area configuration parser', function(){
   it('can run a fidoconfig echomail area configuration parser', function(){
      assert.doesNotThrow(function(){
         var fidoconfig = require('../');
         areas = fidoconfig.areas(pathCFG);
         areasNoFunction = fidoconfig.areas(pathCFG);
         delete areasNoFunction.area;
         delete areasNoFunction.getAreaNames;
      });
   });
   it('reads the correct echomail area configuration', function(){
      assert.deepEqual(areasNoFunction, testData);
   });
   it('can use `area` method to read individual echomail area configuration',
   function(done){
      var fields = [];
      for( var field in testData ){
         if( testData.hasOwnProperty(field) ) fields.push(field);
      }

      var fieldProcessor = function(){
         var nextField = fields.pop();
         if( typeof nextField === 'undefined') return done();

         areas.area(nextField, function(err, data){
            assert.ok(!err);
            assert.deepEqual(data, testData[nextField]);
            fieldProcessor();
         });
      };
      fieldProcessor();
   });
   it('can use `getAreaNames` method to read names of echomail areas',
   function(){
      assert.deepEqual(
         areas.getAreaNames(),
         [         
            'ganjanet.local',
            'ru.blog.mithgol',
            'sunny.night',
            'ru.ftn.develop',
            'ru.ftn.winsoft',
            'su.fidotech',
            'synchronet'
         ]
      );
   });
});
