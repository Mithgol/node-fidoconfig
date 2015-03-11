/* global describe, it */
var areas;
var assert = require('assert');
var path = require('path');

describe('Echomail area configuration parser', function(){
   it('can run a fidoconfig echomail area configuration parser', function(){
      assert.doesNotThrow(function(){
         areas = require('../').areas(
            path.join(__dirname, 'areas.cfg')
         );
      });
   });
   it('reads the correct echomail area configuration', function(){
      assert.deepEqual(areas, {
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
      });
   });
});
