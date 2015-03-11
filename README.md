This module (`fidoconfig`) is a reader of fidoconfig (Fidonet configuration) files. These files are mostly [used](http://husky.sourceforge.net/fidoconf.html) by Husky Portable Fidonet project.

The application is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing the fidoconfig module

[![(npm package version)](https://nodei.co/npm/fidoconfig.png?downloads=true&downloadRank=true)](https://npmjs.org/package/fidoconfig)

* Latest packaged version: `npm install fidoconfig`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-fidoconfig/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/node-fidoconfig#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using the fidoconfig module

When you `require()` the installed module, you get an object with the following method:

### areas(areaFilePath, options)

This method reads echomail area configuration file (fidoconfig-compatible) and returns an object that describes echomail areas.

The encoding of the configuration file is not autodetected; the optional `options.encoding` value (by default, `'utf8'`) is used. You may use any encoding provided by the [`iconv-lite`](https://github.com/ashtuchkin/iconv-lite) module.

Examples of such area configuration files are available in its own CVS repository on SourceForge [in English](http://husky.cvs.sf.net/viewvc/husky/hpt/config/areas) and [in Russian](http://husky.cvs.sf.net/viewvc/husky/hpt/config/areas.ru). Text lines of these examples are commented out (by `#` characters in the lines' beginnings) but your real configuration lines must be uncommented.

The configuration lines for echomail are expected to start with `EchoArea` (literally), then a whitespace-separated echotag (such as `Ru.FTN.Develop` for example), then a whitespace-separated full path (without the extensions) to the echomail files of the area, in that order. (A sequence of several whitespaces is also a supported separator.) The rest of the configuration line is also whitespace-separated from the path.

If the `-d "some description"` is found on the same line, it is used as the echomail area's description.

Properties of the returned object have names equal to lowercase echotags of the echomail areas (as returned by [`String.prototype.toLowerCase`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method). Values of these properties are also objects that describe individual echomail areas; these objects have the following properties:

* `configName` — area name (echotag) as given in the configuration file (might be not lowercase);

* `passthrough` — `true` if the echomail area works in the passthrough mode, `false` otherwise;

* `path` — the path to the message base of the echomail area (or the word `'passthrough'` if the area works in the passthrough mode and thus there is no message base);

* `description` — the echomail area's description (or `null` if the description was not given).

This method currently has the following limitations:

* Echomail area defaults, even if given in the configuration file, are not taken into account.

* An area configuration file is treated as if it were isolated (though it actually is a part of fidoconfig and may be affected by settings in some global configuration files where it is included).

* Variables that were set in fidoconfig files or in the environment are not substituted.

* Settings are read only for echomail areas; other types of areas (badmail areas, dupemail areas, local areas, netmail areas) are ignored.

* Message base types are not detected.

## Testing the fidoconfig module

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of the fidoconfig module).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the fidoconfig module).

After that you may run `npm test` (in the directory of the fidoconfig module).

## License

MIT license (see the `LICENSE` file).
