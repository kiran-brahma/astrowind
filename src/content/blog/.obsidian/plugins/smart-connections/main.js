var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/smart-embed-model/node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/smart-embed-model/node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// ejs.min.cjs
var require_ejs_min = __commonJS({
  "ejs.min.cjs"(exports2, module2) {
    (function(f) {
      if (typeof exports2 === "object" && typeof module2 !== "undefined") {
        module2.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.ejs = f();
      }
    })(function() {
      var define2, module3, exports3;
      return (/* @__PURE__ */ function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i2, true);
                if (u) return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
          return o;
        }
        return r;
      }())({ 1: [function(require2, module4, exports4) {
        "use strict";
        var fs = require2("fs");
        var path = require2("path");
        var utils = require2("./utils");
        var scopeOptionWarned = false;
        var _VERSION_STRING = require2("../package.json").version;
        var _DEFAULT_OPEN_DELIMITER = "<";
        var _DEFAULT_CLOSE_DELIMITER = ">";
        var _DEFAULT_DELIMITER = "%";
        var _DEFAULT_LOCALS_NAME = "locals";
        var _NAME = "ejs";
        var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
        var _OPTS_PASSABLE_WITH_DATA = ["delimiter", "scope", "context", "debug", "compileDebug", "client", "_with", "rmWhitespace", "strict", "filename", "async"];
        var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
        var _BOM = /^\uFEFF/;
        var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
        exports4.cache = utils.cache;
        exports4.fileLoader = fs.readFileSync;
        exports4.localsName = _DEFAULT_LOCALS_NAME;
        exports4.promiseImpl = new Function("return this;")().Promise;
        exports4.resolveInclude = function(name, filename, isDir) {
          var dirname = path.dirname;
          var extname = path.extname;
          var resolve = path.resolve;
          var includePath = resolve(isDir ? filename : dirname(filename), name);
          var ext = extname(name);
          if (!ext) {
            includePath += ".ejs";
          }
          return includePath;
        };
        function resolvePaths(name, paths) {
          var filePath;
          if (paths.some(function(v) {
            filePath = exports4.resolveInclude(name, v, true);
            return fs.existsSync(filePath);
          })) {
            return filePath;
          }
        }
        function getIncludePath(path2, options) {
          var includePath;
          var filePath;
          var views = options.views;
          var match = /^[A-Za-z]+:\\|^\//.exec(path2);
          if (match && match.length) {
            path2 = path2.replace(/^\/*/, "");
            if (Array.isArray(options.root)) {
              includePath = resolvePaths(path2, options.root);
            } else {
              includePath = exports4.resolveInclude(path2, options.root || "/", true);
            }
          } else {
            if (options.filename) {
              filePath = exports4.resolveInclude(path2, options.filename);
              if (fs.existsSync(filePath)) {
                includePath = filePath;
              }
            }
            if (!includePath && Array.isArray(views)) {
              includePath = resolvePaths(path2, views);
            }
            if (!includePath && typeof options.includer !== "function") {
              throw new Error('Could not find the include file "' + options.escapeFunction(path2) + '"');
            }
          }
          return includePath;
        }
        function handleCache(options, template) {
          var func;
          var filename = options.filename;
          var hasTemplate = arguments.length > 1;
          if (options.cache) {
            if (!filename) {
              throw new Error("cache option requires a filename");
            }
            func = exports4.cache.get(filename);
            if (func) {
              return func;
            }
            if (!hasTemplate) {
              template = fileLoader(filename).toString().replace(_BOM, "");
            }
          } else if (!hasTemplate) {
            if (!filename) {
              throw new Error("Internal EJS error: no file name or template provided");
            }
            template = fileLoader(filename).toString().replace(_BOM, "");
          }
          func = exports4.compile(template, options);
          if (options.cache) {
            exports4.cache.set(filename, func);
          }
          return func;
        }
        function tryHandleCache(options, data, cb) {
          var result;
          if (!cb) {
            if (typeof exports4.promiseImpl == "function") {
              return new exports4.promiseImpl(function(resolve, reject) {
                try {
                  result = handleCache(options)(data);
                  resolve(result);
                } catch (err) {
                  reject(err);
                }
              });
            } else {
              throw new Error("Please provide a callback function");
            }
          } else {
            try {
              result = handleCache(options)(data);
            } catch (err) {
              return cb(err);
            }
            cb(null, result);
          }
        }
        function fileLoader(filePath) {
          return exports4.fileLoader(filePath);
        }
        function includeFile(path2, options) {
          var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
          opts.filename = getIncludePath(path2, opts);
          if (typeof options.includer === "function") {
            var includerResult = options.includer(path2, opts.filename);
            if (includerResult) {
              if (includerResult.filename) {
                opts.filename = includerResult.filename;
              }
              if (includerResult.template) {
                return handleCache(opts, includerResult.template);
              }
            }
          }
          return handleCache(opts);
        }
        function rethrow(err, str, flnm, lineno, esc) {
          var lines = str.split("\n");
          var start = Math.max(lineno - 3, 0);
          var end = Math.min(lines.length, lineno + 3);
          var filename = esc(flnm);
          var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
          }).join("\n");
          err.path = filename;
          err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
          throw err;
        }
        function stripSemi(str) {
          return str.replace(/;(\s*$)/, "$1");
        }
        exports4.compile = function compile(template, opts) {
          var templ;
          if (opts && opts.scope) {
            if (!scopeOptionWarned) {
              console.warn("`scope` option is deprecated and will be removed in EJS 3");
              scopeOptionWarned = true;
            }
            if (!opts.context) {
              opts.context = opts.scope;
            }
            delete opts.scope;
          }
          templ = new Template(template, opts);
          return templ.compile();
        };
        exports4.render = function(template, d, o) {
          var data = d || utils.createNullProtoObjWherePossible();
          var opts = o || utils.createNullProtoObjWherePossible();
          if (arguments.length == 2) {
            utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
          }
          return handleCache(opts, template)(data);
        };
        exports4.renderFile = function() {
          var args = Array.prototype.slice.call(arguments);
          var filename = args.shift();
          var cb;
          var opts = { filename };
          var data;
          var viewOpts;
          if (typeof arguments[arguments.length - 1] == "function") {
            cb = args.pop();
          }
          if (args.length) {
            data = args.shift();
            if (args.length) {
              utils.shallowCopy(opts, args.pop());
            } else {
              if (data.settings) {
                if (data.settings.views) {
                  opts.views = data.settings.views;
                }
                if (data.settings["view cache"]) {
                  opts.cache = true;
                }
                viewOpts = data.settings["view options"];
                if (viewOpts) {
                  utils.shallowCopy(opts, viewOpts);
                }
              }
              utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
            }
            opts.filename = filename;
          } else {
            data = utils.createNullProtoObjWherePossible();
          }
          return tryHandleCache(opts, data, cb);
        };
        exports4.Template = Template;
        exports4.clearCache = function() {
          exports4.cache.reset();
        };
        function Template(text, opts) {
          opts = opts || utils.createNullProtoObjWherePossible();
          var options = utils.createNullProtoObjWherePossible();
          this.templateText = text;
          this.mode = null;
          this.truncate = false;
          this.currentLine = 1;
          this.source = "";
          options.client = opts.client || false;
          options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
          options.compileDebug = opts.compileDebug !== false;
          options.debug = !!opts.debug;
          options.filename = opts.filename;
          options.openDelimiter = opts.openDelimiter || exports4.openDelimiter || _DEFAULT_OPEN_DELIMITER;
          options.closeDelimiter = opts.closeDelimiter || exports4.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
          options.delimiter = opts.delimiter || exports4.delimiter || _DEFAULT_DELIMITER;
          options.strict = opts.strict || false;
          options.context = opts.context;
          options.cache = opts.cache || false;
          options.rmWhitespace = opts.rmWhitespace;
          options.root = opts.root;
          options.includer = opts.includer;
          options.outputFunctionName = opts.outputFunctionName;
          options.localsName = opts.localsName || exports4.localsName || _DEFAULT_LOCALS_NAME;
          options.views = opts.views;
          options.async = opts.async;
          options.destructuredLocals = opts.destructuredLocals;
          options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
          if (options.strict) {
            options._with = false;
          } else {
            options._with = typeof opts._with != "undefined" ? opts._with : true;
          }
          this.opts = options;
          this.regex = this.createRegex();
        }
        Template.modes = { EVAL: "eval", ESCAPED: "escaped", RAW: "raw", COMMENT: "comment", LITERAL: "literal" };
        Template.prototype = { createRegex: function() {
          var str = _REGEX_STRING;
          var delim = utils.escapeRegExpChars(this.opts.delimiter);
          var open = utils.escapeRegExpChars(this.opts.openDelimiter);
          var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
          str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
          return new RegExp(str);
        }, compile: function() {
          var src;
          var fn;
          var opts = this.opts;
          var prepended = "";
          var appended = "";
          var escapeFn = opts.escapeFunction;
          var ctor;
          var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
          if (!this.source) {
            this.generateSource();
            prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
            if (opts.outputFunctionName) {
              if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
                throw new Error("outputFunctionName is not a valid JS identifier.");
              }
              prepended += "  var " + opts.outputFunctionName + " = __append;\n";
            }
            if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
              throw new Error("localsName is not a valid JS identifier.");
            }
            if (opts.destructuredLocals && opts.destructuredLocals.length) {
              var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
              for (var i = 0; i < opts.destructuredLocals.length; i++) {
                var name = opts.destructuredLocals[i];
                if (!_JS_IDENTIFIER.test(name)) {
                  throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
                }
                if (i > 0) {
                  destructuring += ",\n  ";
                }
                destructuring += name + " = __locals." + name;
              }
              prepended += destructuring + ";\n";
            }
            if (opts._with !== false) {
              prepended += "  with (" + opts.localsName + " || {}) {\n";
              appended += "  }\n";
            }
            appended += "  return __output;\n";
            this.source = prepended + this.source + appended;
          }
          if (opts.compileDebug) {
            src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
          } else {
            src = this.source;
          }
          if (opts.client) {
            src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
            if (opts.compileDebug) {
              src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
            }
          }
          if (opts.strict) {
            src = '"use strict";\n' + src;
          }
          if (opts.debug) {
            console.log(src);
          }
          if (opts.compileDebug && opts.filename) {
            src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
          }
          try {
            if (opts.async) {
              try {
                ctor = new Function("return (async function(){}).constructor;")();
              } catch (e) {
                if (e instanceof SyntaxError) {
                  throw new Error("This environment does not support async/await");
                } else {
                  throw e;
                }
              }
            } else {
              ctor = Function;
            }
            fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
          } catch (e) {
            if (e instanceof SyntaxError) {
              if (opts.filename) {
                e.message += " in " + opts.filename;
              }
              e.message += " while compiling ejs\n\n";
              e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
              e.message += "https://github.com/RyanZim/EJS-Lint";
              if (!opts.async) {
                e.message += "\n";
                e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
              }
            }
            throw e;
          }
          var returnedFn = opts.client ? fn : function anonymous(data) {
            var include = function(path2, includeData) {
              var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
              if (includeData) {
                d = utils.shallowCopy(d, includeData);
              }
              return includeFile(path2, opts)(d);
            };
            return fn.apply(opts.context, [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]);
          };
          if (opts.filename && typeof Object.defineProperty === "function") {
            var filename = opts.filename;
            var basename = path.basename(filename, path.extname(filename));
            try {
              Object.defineProperty(returnedFn, "name", { value: basename, writable: false, enumerable: false, configurable: true });
            } catch (e) {
            }
          }
          return returnedFn;
        }, generateSource: function() {
          var opts = this.opts;
          if (opts.rmWhitespace) {
            this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
          }
          this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
          var self2 = this;
          var matches = this.parseTemplateText();
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          if (matches && matches.length) {
            matches.forEach(function(line, index) {
              var closing;
              if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
                closing = matches[index + 2];
                if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                  throw new Error('Could not find matching close tag for "' + line + '".');
                }
              }
              self2.scanLine(line);
            });
          }
        }, parseTemplateText: function() {
          var str = this.templateText;
          var pat = this.regex;
          var result = pat.exec(str);
          var arr = [];
          var firstPos;
          while (result) {
            firstPos = result.index;
            if (firstPos !== 0) {
              arr.push(str.substring(0, firstPos));
              str = str.slice(firstPos);
            }
            arr.push(result[0]);
            str = str.slice(result[0].length);
            result = pat.exec(str);
          }
          if (str) {
            arr.push(str);
          }
          return arr;
        }, _addOutput: function(line) {
          if (this.truncate) {
            line = line.replace(/^(?:\r\n|\r|\n)/, "");
            this.truncate = false;
          }
          if (!line) {
            return line;
          }
          line = line.replace(/\\/g, "\\\\");
          line = line.replace(/\n/g, "\\n");
          line = line.replace(/\r/g, "\\r");
          line = line.replace(/"/g, '\\"');
          this.source += '    ; __append("' + line + '")\n';
        }, scanLine: function(line) {
          var self2 = this;
          var d = this.opts.delimiter;
          var o = this.opts.openDelimiter;
          var c = this.opts.closeDelimiter;
          var newLineCount = 0;
          newLineCount = line.split("\n").length - 1;
          switch (line) {
            case o + d:
            case o + d + "_":
              this.mode = Template.modes.EVAL;
              break;
            case o + d + "=":
              this.mode = Template.modes.ESCAPED;
              break;
            case o + d + "-":
              this.mode = Template.modes.RAW;
              break;
            case o + d + "#":
              this.mode = Template.modes.COMMENT;
              break;
            case o + d + d:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
              break;
            case d + d + c:
              this.mode = Template.modes.LITERAL;
              this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
              break;
            case d + c:
            case "-" + d + c:
            case "_" + d + c:
              if (this.mode == Template.modes.LITERAL) {
                this._addOutput(line);
              }
              this.mode = null;
              this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
              break;
            default:
              if (this.mode) {
                switch (this.mode) {
                  case Template.modes.EVAL:
                  case Template.modes.ESCAPED:
                  case Template.modes.RAW:
                    if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                      line += "\n";
                    }
                }
                switch (this.mode) {
                  case Template.modes.EVAL:
                    this.source += "    ; " + line + "\n";
                    break;
                  case Template.modes.ESCAPED:
                    this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                    break;
                  case Template.modes.RAW:
                    this.source += "    ; __append(" + stripSemi(line) + ")\n";
                    break;
                  case Template.modes.COMMENT:
                    break;
                  case Template.modes.LITERAL:
                    this._addOutput(line);
                    break;
                }
              } else {
                this._addOutput(line);
              }
          }
          if (self2.opts.compileDebug && newLineCount) {
            this.currentLine += newLineCount;
            this.source += "    ; __line = " + this.currentLine + "\n";
          }
        } };
        exports4.escapeXML = utils.escapeXML;
        exports4.__express = exports4.renderFile;
        exports4.VERSION = _VERSION_STRING;
        exports4.name = _NAME;
        if (typeof window != "undefined") {
          window.ejs = exports4;
        }
      }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function(require2, module4, exports4) {
        "use strict";
        var regExpChars = /[|\\{}()[\]^$+*?.]/g;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var hasOwn = function(obj, key) {
          return hasOwnProperty.apply(obj, [key]);
        };
        exports4.escapeRegExpChars = function(string) {
          if (!string) {
            return "";
          }
          return String(string).replace(regExpChars, "\\$&");
        };
        var _ENCODE_HTML_RULES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#34;", "'": "&#39;" };
        var _MATCH_HTML = /[&<>'"]/g;
        function encode_char(c) {
          return _ENCODE_HTML_RULES[c] || c;
        }
        var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
        exports4.escapeXML = function(markup) {
          return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
        };
        function escapeXMLToString() {
          return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
        }
        try {
          if (typeof Object.defineProperty === "function") {
            Object.defineProperty(exports4.escapeXML, "toString", { value: escapeXMLToString });
          } else {
            exports4.escapeXML.toString = escapeXMLToString;
          }
        } catch (err) {
          console.warn("Unable to set escapeXML.toString (is the Function prototype frozen?)");
        }
        exports4.shallowCopy = function(to, from) {
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var p in from) {
              if (!hasOwn(from, p)) {
                continue;
              }
              if (p === "__proto__" || p === "constructor") {
                continue;
              }
              to[p] = from[p];
            }
          }
          return to;
        };
        exports4.shallowCopyFromList = function(to, from, list) {
          list = list || [];
          from = from || {};
          if (to !== null && to !== void 0) {
            for (var i = 0; i < list.length; i++) {
              var p = list[i];
              if (typeof from[p] != "undefined") {
                if (!hasOwn(from, p)) {
                  continue;
                }
                if (p === "__proto__" || p === "constructor") {
                  continue;
                }
                to[p] = from[p];
              }
            }
          }
          return to;
        };
        exports4.cache = { _data: {}, set: function(key, val) {
          this._data[key] = val;
        }, get: function(key) {
          return this._data[key];
        }, remove: function(key) {
          delete this._data[key];
        }, reset: function() {
          this._data = {};
        } };
        exports4.hyphenToCamel = function(str) {
          return str.replace(/-[a-z]/g, function(match) {
            return match[1].toUpperCase();
          });
        };
        exports4.createNullProtoObjWherePossible = function() {
          if (typeof Object.create == "function") {
            return function() {
              return /* @__PURE__ */ Object.create(null);
            };
          }
          if (!({ __proto__: null } instanceof Object)) {
            return function() {
              return { __proto__: null };
            };
          }
          return function() {
            return {};
          };
        }();
      }, {}], 3: [function(require2, module4, exports4) {
      }, {}], 4: [function(require2, module4, exports4) {
        (function(process2) {
          function normalizeArray(parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else if (up) {
                parts.splice(i, 1);
                up--;
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          }
          exports4.resolve = function() {
            var resolvedPath = "", resolvedAbsolute = false;
            for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
              var path = i >= 0 ? arguments[i] : process2.cwd();
              if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
              } else if (!path) {
                continue;
              }
              resolvedPath = path + "/" + resolvedPath;
              resolvedAbsolute = path.charAt(0) === "/";
            }
            resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
              return !!p;
            }), !resolvedAbsolute).join("/");
            return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
          };
          exports4.normalize = function(path) {
            var isAbsolute = exports4.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
            path = normalizeArray(filter(path.split("/"), function(p) {
              return !!p;
            }), !isAbsolute).join("/");
            if (!path && !isAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += "/";
            }
            return (isAbsolute ? "/" : "") + path;
          };
          exports4.isAbsolute = function(path) {
            return path.charAt(0) === "/";
          };
          exports4.join = function() {
            var paths = Array.prototype.slice.call(arguments, 0);
            return exports4.normalize(filter(paths, function(p, index) {
              if (typeof p !== "string") {
                throw new TypeError("Arguments to path.join must be strings");
              }
              return p;
            }).join("/"));
          };
          exports4.relative = function(from, to) {
            from = exports4.resolve(from).substr(1);
            to = exports4.resolve(to).substr(1);
            function trim(arr) {
              var start = 0;
              for (; start < arr.length; start++) {
                if (arr[start] !== "") break;
              }
              var end = arr.length - 1;
              for (; end >= 0; end--) {
                if (arr[end] !== "") break;
              }
              if (start > end) return [];
              return arr.slice(start, end - start + 1);
            }
            var fromParts = trim(from.split("/"));
            var toParts = trim(to.split("/"));
            var length = Math.min(fromParts.length, toParts.length);
            var samePartsLength = length;
            for (var i = 0; i < length; i++) {
              if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
              }
            }
            var outputParts = [];
            for (var i = samePartsLength; i < fromParts.length; i++) {
              outputParts.push("..");
            }
            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            return outputParts.join("/");
          };
          exports4.sep = "/";
          exports4.delimiter = ":";
          exports4.dirname = function(path) {
            if (typeof path !== "string") path = path + "";
            if (path.length === 0) return ".";
            var code = path.charCodeAt(0);
            var hasRoot = code === 47;
            var end = -1;
            var matchedSlash = true;
            for (var i = path.length - 1; i >= 1; --i) {
              code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  end = i;
                  break;
                }
              } else {
                matchedSlash = false;
              }
            }
            if (end === -1) return hasRoot ? "/" : ".";
            if (hasRoot && end === 1) {
              return "/";
            }
            return path.slice(0, end);
          };
          function basename(path) {
            if (typeof path !== "string") path = path + "";
            var start = 0;
            var end = -1;
            var matchedSlash = true;
            var i;
            for (i = path.length - 1; i >= 0; --i) {
              if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                  start = i + 1;
                  break;
                }
              } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
            }
            if (end === -1) return "";
            return path.slice(start, end);
          }
          exports4.basename = function(path, ext) {
            var f = basename(path);
            if (ext && f.substr(-1 * ext.length) === ext) {
              f = f.substr(0, f.length - ext.length);
            }
            return f;
          };
          exports4.extname = function(path) {
            if (typeof path !== "string") path = path + "";
            var startDot = -1;
            var startPart = 0;
            var end = -1;
            var matchedSlash = true;
            var preDotState = 0;
            for (var i = path.length - 1; i >= 0; --i) {
              var code = path.charCodeAt(i);
              if (code === 47) {
                if (!matchedSlash) {
                  startPart = i + 1;
                  break;
                }
                continue;
              }
              if (end === -1) {
                matchedSlash = false;
                end = i + 1;
              }
              if (code === 46) {
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
              } else if (startDot !== -1) {
                preDotState = -1;
              }
            }
            if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
              return "";
            }
            return path.slice(startDot, end);
          };
          function filter(xs, f) {
            if (xs.filter) return xs.filter(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
              if (f(xs[i], i, xs)) res.push(xs[i]);
            }
            return res;
          }
          var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
            return str.substr(start, len);
          } : function(str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
          };
        }).call(this, require2("_process"));
      }, { _process: 5 }], 5: [function(require2, module4, exports4) {
        var process2 = module4.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        process2.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array) {
          this.fun = fun;
          this.array = array;
        }
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process2.title = "browser";
        process2.browser = true;
        process2.env = {};
        process2.argv = [];
        process2.version = "";
        process2.versions = {};
        function noop() {
        }
        process2.on = noop;
        process2.addListener = noop;
        process2.once = noop;
        process2.off = noop;
        process2.removeListener = noop;
        process2.removeAllListeners = noop;
        process2.emit = noop;
        process2.prependListener = noop;
        process2.prependOnceListener = noop;
        process2.listeners = function(name) {
          return [];
        };
        process2.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process2.cwd = function() {
          return "/";
        };
        process2.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process2.umask = function() {
          return 0;
        };
      }, {}], 6: [function(require2, module4, exports4) {
        module4.exports = { name: "ejs", description: "Embedded JavaScript templates", keywords: ["template", "engine", "ejs"], version: "3.1.9", author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)", license: "Apache-2.0", bin: { ejs: "./bin/cli.js" }, main: "./lib/ejs.js", jsdelivr: "ejs.min.js", unpkg: "ejs.min.js", repository: { type: "git", url: "git://github.com/mde/ejs.git" }, bugs: "https://github.com/mde/ejs/issues", homepage: "https://github.com/mde/ejs", dependencies: { jake: "^10.8.5" }, devDependencies: { browserify: "^16.5.1", eslint: "^6.8.0", "git-directory-deploy": "^1.5.1", jsdoc: "^4.0.2", "lru-cache": "^4.0.1", mocha: "^10.2.0", "uglify-js": "^3.3.16" }, engines: { node: ">=0.10.0" }, scripts: { test: "mocha -u tdd" } };
      }, {}] }, {}, [1])(1);
    });
  }
});

// src/index.js
var src_exports = {};
__export(src_exports, {
  default: () => SmartConnectionsPlugin
});
module.exports = __toCommonJS(src_exports);
var import_obsidian16 = __toESM(require("obsidian"), 1);

// node_modules/smart-environment/components/settings.js
async function build_html(scope, opts = {}) {
  const env_settings_html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const env_collections_containers_html = Object.entries(scope.collections).map(([collection_key, collection]) => {
    return `<div data-smart-settings="${collection_key}"></div>`;
  }).join("\n");
  const html = `
    <div class="">
      ${env_settings_html}
      ${env_collections_containers_html}
    </div>
  `;
  return html;
}
async function render(scope, opts = {}) {
  const html = await build_html.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process.call(this, scope, frag, opts);
}
async function post_process(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  const env_collections_containers = frag.querySelectorAll("[data-smart-settings]");
  for (const env_collections_container of env_collections_containers) {
    const collection_key = env_collections_container.dataset.smartSettings;
    const collection = scope[collection_key];
    await collection.render_settings(env_collections_container);
  }
  return frag;
}

// node_modules/smart-environment/smart_env.js
var SmartEnv = class _SmartEnv {
  scope_name = "smart_env";
  constructor(opts = {}) {
    this.opts = opts;
    this.global_ref = this;
    this.loading_collections = false;
    this.collections_loaded = false;
    this.smart_embed_active_models = {};
    this._excluded_headings = null;
    this.collections = {};
    this.is_init = true;
    this.mains = [];
    this._components = {};
    this.main_opts = {};
  }
  /**
   * Creates or updates a SmartEnv instance.
   * @param {Object} main - The main object to be added to the SmartEnv instance.
   * @param {Object} [main_env_opts={}] - Options for configuring the SmartEnv instance.
   * @returns {SmartEnv} The SmartEnv instance.
   * @throws {TypeError} If an invalid main object is provided.
   * @throws {Error} If there's an error creating or updating the SmartEnv instance.
   */
  static async create(main, main_env_opts = {}) {
    if (!main || typeof main !== "object") {
      throw new TypeError("SmartEnv: Invalid main object provided");
    }
    main_env_opts = normalize_opts(main_env_opts);
    let existing_env = main_env_opts.global_ref instanceof _SmartEnv ? main_env_opts.global_ref : null;
    let main_key = null;
    if (!existing_env) {
      main.env = new this(main_env_opts);
      main_key = await main.env.init(main, main_env_opts);
    } else {
      main.env = existing_env;
      main_key = main.env.init_main(main, main_env_opts);
      await main.env.load_main(main_key);
    }
    return main.env;
  }
  async init(main, main_env_opts = {}) {
    this.is_init = true;
    const main_key = this.init_main(main, main_env_opts);
    await this.fs.load_files();
    await this.opts.modules.smart_settings.class.create(this);
    await this.load_main(main_key);
    this.is_init = false;
    return main_key;
  }
  get main_env_config() {
    return this.mains.reduce((acc, key) => {
      acc[key] = this[key].smart_env_config;
      return acc;
    }, {});
  }
  /**
   * Adds a new main object to the SmartEnv instance.
   * @param {Object} main - The main object to be added.
   * @param {Object} [main_env_opts={}] - Options to be merged into the SmartEnv instance.
   */
  init_main(main, main_env_opts = {}) {
    const main_key = camel_case_to_snake_case(main.constructor.name);
    this[main_key] = main;
    this.mains.push(main_key);
    this.main_opts[main_key] = main_env_opts;
    this.merge_options(main_env_opts);
    return main_key;
  }
  async load_main(main_key) {
    const main_env_opts = this.main_opts[main_key];
    const main = this[main_key];
    await this.init_collections(main_env_opts);
    await this.ready_to_load_collections(main);
    const main_collections = Object.keys(main_env_opts.collections).reduce((acc, key) => {
      if (!this.collections[key]) return acc;
      acc[key] = this[key];
      return acc;
    }, {});
    await this.load_collections(main_collections);
  }
  async init_collections(config = this.opts) {
    for (const key of Object.keys(config.collections)) {
      const _class = config.collections[key]?.class;
      if (typeof _class?.init !== "function") continue;
      await _class.init(this, { ...config.collections[key] });
    }
  }
  async load_collections(collections = this.collections) {
    this.loading_collections = true;
    for (const key of Object.keys(collections)) {
      if (this.is_init && (this.opts.prevent_load_on_init || collections[key].opts.prevent_load_on_init)) continue;
      if (typeof collections[key]?.process_load_queue === "function") {
        await collections[key].process_load_queue();
      }
    }
    this.loading_collections = false;
    this.collections_loaded = true;
  }
  /**
   * Merges provided options into the SmartEnv instance, performing a deep merge for objects.
   * @param {Object} opts - Options to be merged.
   */
  merge_options(opts) {
    for (const [key, value] of Object.entries(opts)) {
      if (key === "global_ref") continue;
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          this.opts[key] = [...this.opts[key] || [], ...value];
        } else {
          if (!this.opts[key]) this.opts[key] = {};
          deep_merge_no_overwrite(this.opts[key], value);
        }
      } else {
        if (this.opts[key] !== void 0) {
        }
        this.opts[key] = value;
      }
    }
  }
  async ready_to_load_collections(main) {
    if (typeof main?.ready_to_load_collections === "function") await main.ready_to_load_collections();
    return true;
  }
  // override in subclasses with env-specific logic
  unload_main(main_key) {
    this.unload_collections(main_key);
    this.unload_opts(main_key);
    this[main_key] = null;
    this.mains = this.mains.filter((key) => key !== main_key);
    if (this.mains.length === 0) this.global_ref = null;
  }
  unload_collections(main_key) {
    for (const key of Object.keys(this.collections)) {
      if (!this[main_key]?.smart_env_config?.collections[key]) continue;
      this[key]?.unload();
      this[key] = null;
    }
  }
  unload_opts(main_key) {
    for (const opts_key of Object.keys(this.opts)) {
      if (!this[main_key]?.smart_env_config?.[opts_key]) continue;
      if (this.mains.filter((m) => m !== main_key).some((m) => this[m]?.smart_env_config?.[opts_key])) continue;
      this.opts[opts_key] = null;
    }
  }
  save() {
    for (const key of Object.keys(this.collections)) {
      this[key].process_save_queue();
    }
  }
  init_module(module_key, opts = {}) {
    const module_config = this.opts.modules[module_key];
    if (!module_config) return console.warn(`SmartEnv: module ${module_key} not found`);
    opts = {
      ...{ ...module_config, class: null },
      ...opts
    };
    return new module_config.class(opts);
  }
  get settings_template() {
    return this.opts.components?.smart_env?.settings || render;
  }
  async render_settings(container = this.settings_container) {
    if (!this.settings_container || container !== this.settings_container) this.settings_container = container;
    if (!container) throw new Error("Container is required");
    const frag = await this.render_component("settings", this, {});
    container.innerHTML = "";
    container.appendChild(frag);
    return frag;
  }
  /**
   * Render settings.
   * @param {HTMLElement} [container] - Container element
   * @param {Object} [opts] - Render options
   * @returns {Promise<HTMLElement>} Container element
   */
  async render_component(component_key, scope, opts = {}) {
    const template = this.get_component(component_key, scope);
    const frag = await template(scope, opts);
    return frag;
  }
  get_component(component_key, scope) {
    const scope_name = scope.collection_key ?? scope.scope_name;
    if (!this._components[scope_name]?.[component_key]) {
      try {
        if (!this._components[scope_name]) this._components[scope_name] = {};
        this._components[scope_name][component_key] = this.opts.components[scope_name][component_key].bind(this.init_module("smart_view"));
      } catch (e) {
        console.error("Error getting component", e);
        console.log(`scope_name: ${scope_name}; component_key: ${component_key}; this.opts.components: ${Object.keys(this.opts.components || {}).join(", ")}; this.opts.components[scope_name]: ${Object.keys(this.opts.components[scope_name] || {}).join(", ")}`);
      }
    }
    return this._components[scope_name][component_key];
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.init_module("smart_view");
    return this._smart_view;
  }
  get settings_config() {
    return {
      "is_obsidian_vault": {
        name: "Obsidian Vault",
        description: "Toggle on if this is an Obsidian vault.",
        type: "toggle",
        default: false
      },
      "file_exclusions": {
        name: "File Exclusions",
        description: "Comma-separated list of files to exclude.",
        type: "text",
        default: "",
        callback: "update_exclusions"
      },
      "folder_exclusions": {
        name: "Folder Exclusions",
        description: "Comma-separated list of folders to exclude.",
        type: "text",
        default: "",
        callback: "update_exclusions"
      },
      "excluded_headings": {
        name: "Excluded Headings",
        description: "Comma-separated list of headings to exclude.",
        type: "text",
        default: ""
      }
    };
  }
  get global_prop() {
    return this.opts.global_prop ?? "smart_env";
  }
  get global_ref() {
    return this.opts.global_ref ?? (typeof window !== "undefined" ? window : global) ?? {};
  }
  set global_ref(env) {
    this.global_ref[this.global_prop] = env;
  }
  get item_types() {
    return this.opts.item_types;
  }
  /**
   * @deprecated use component pattern instead
   */
  get ejs() {
    return this.opts.ejs;
  }
  /**
   * @deprecated use component pattern instead
   */
  get templates() {
    return this.opts.templates;
  }
  /**
   * @deprecated use component pattern instead
   */
  get views() {
    return this.opts.views;
  }
  get fs_module_config() {
    return this.opts.modules.smart_fs;
  }
  get fs() {
    if (!this.smart_fs) {
      this.smart_fs = new this.fs_module_config.class(this, {
        adapter: this.fs_module_config.adapter,
        fs_path: this.opts.env_path || ""
      });
    }
    return this.smart_fs;
  }
  get env_data_dir() {
    const env_settings_files = this.fs.file_paths?.filter((path) => path.endsWith("smart_env.json")) || [];
    let env_data_dir = ".smart-env";
    if (env_settings_files.length > 0) {
      if (env_settings_files.length > 1) {
        const env_data_dir_counts = env_settings_files.map((path) => {
          const dir = path.split("/").slice(-2, -1)[0];
          return {
            dir,
            count: this.fs.file_paths.filter((path2) => path2.includes(dir)).length
          };
        });
        env_data_dir = env_data_dir_counts.reduce((max, dir) => dir.count > max.count ? dir : max, env_data_dir_counts[0]).dir;
      } else {
        env_data_dir = env_settings_files[0].split("/").slice(-2, -1)[0];
      }
    }
    return env_data_dir;
  }
  get data_fs() {
    if (!this._fs) {
      this._fs = new this.fs_module_config.class(this, {
        adapter: this.fs_module_config.adapter,
        fs_path: this.data_fs_path
      });
    }
    return this._fs;
  }
  get data_fs_path() {
    return this.opts.env_path + (this.opts.env_path ? this.opts.env_path.includes("\\") ? "\\" : "/" : "") + this.env_data_dir;
  }
  /**
   * Saves the current settings to the file system.
   * @param {Object|null} [settings=null] - Optional settings to override the current settings before saving.
   * @returns {Promise<void>} A promise that resolves when the settings have been saved.
   */
  async save_settings(settings) {
    this._saved = false;
    if (!await this.data_fs.exists("")) await this.data_fs.mkdir("");
    await this.data_fs.write(
      "smart_env.json",
      JSON.stringify(settings, null, 2)
    );
    this._saved = true;
  }
  /**
   * Loads the settings from the file system.
   * @returns {Promise<void>} A promise that resolves when the settings have been loaded.
   */
  async load_settings() {
    if (!await this.data_fs.exists("smart_env.json")) await this.save_settings({});
    let settings = JSON.parse(JSON.stringify(this.opts.default_settings || {}));
    deep_merge(settings, JSON.parse(await this.data_fs.read("smart_env.json")));
    deep_merge(settings, this.opts?.smart_env_settings || {});
    this._saved = true;
    return settings;
  }
  async update_exclusions() {
    this.smart_sources._fs = null;
    await this.smart_sources.fs.init();
    this.smart_sources.render_settings();
  }
  // DEPRECATED
  /**
   * @deprecated Use this.main_class_name instead of this.plugin
   */
  get main() {
    return this[this.mains[this.mains.length - 1]];
  }
  /**
   * @deprecated Use this.main_class_name instead of this.plugin
   */
  get plugin() {
    return this.main;
  }
};
function normalize_opts(opts) {
  Object.entries(opts.collections).forEach(([key, value]) => {
    if (typeof value === "function") opts.collections[key] = { class: value };
    if (key[0] === key[0].toUpperCase()) {
      opts.collections[camel_case_to_snake_case(key)] = { ...opts.collections[key] };
      delete opts.collections[key];
    }
  });
  Object.entries(opts.modules).forEach(([key, value]) => {
    if (typeof value === "function") opts.modules[key] = { class: value };
    if (key[0] === key[0].toUpperCase()) {
      opts.modules[camel_case_to_snake_case(key)] = { ...opts.modules[key] };
      delete opts.modules[key];
    }
  });
  return opts;
}
function camel_case_to_snake_case(str) {
  const result = str.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`).replace(/^_/, "").replace(/2$/, "");
  return result;
}
function deep_merge_no_overwrite(target, source) {
  for (const key in source) {
    try {
      if (source.hasOwnProperty(key)) {
        if (is_obj(source[key])) {
          if (!target.hasOwnProperty(key) || !is_obj(target[key])) {
            target[key] = {};
          }
          deep_merge_no_overwrite(target[key], source[key]);
        } else if (!target.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    } catch (e) {
      console.warn(`deep_merge_no_overwrite error (${key}): ${e.message}`);
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}
function deep_merge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (is_obj(source[key]) && is_obj(target[key])) deep_merge(target[key], source[key]);
      else target[key] = source[key];
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}

// node_modules/smart-collections/utils/collection_instance_name_from.js
function collection_instance_name_from(class_name) {
  if (class_name.endsWith("Item")) {
    return class_name.replace(/Item$/, "").toLowerCase();
  }
  return class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/y$/, "ie") + "s";
}

// node_modules/smart-collections/helpers.js
function create_uid(data) {
  const str = JSON.stringify(data);
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
    if (hash < 0) hash = hash * -1;
  }
  return hash.toString() + str.length;
}
function deep_merge2(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (is_obj(source[key]) && is_obj(target[key])) deep_merge2(target[key], source[key]);
      else target[key] = source[key];
    }
  }
  return target;
  function is_obj(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
}

// node_modules/smart-collections/utils/deep_equal.js
function deep_equal(obj1, obj2, visited = /* @__PURE__ */ new WeakMap()) {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null || obj1 === void 0 || obj2 === void 0) return false;
  if (typeof obj1 !== typeof obj2 || Array.isArray(obj1) !== Array.isArray(obj2)) return false;
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deep_equal(item, obj2[index], visited));
  }
  if (typeof obj1 === "object") {
    if (visited.has(obj1)) return visited.get(obj1) === obj2;
    visited.set(obj1, obj2);
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => deep_equal(obj1[key], obj2[key], visited));
  }
  return obj1 === obj2;
}

// node_modules/smart-collections/collection_item.js
var CollectionItem = class _CollectionItem {
  /**
   * Default properties for an instance of CollectionItem.
   * @returns {Object} Default data configuration.
   */
  static get defaults() {
    return {
      data: {}
    };
  }
  /**
   * Creates an instance of CollectionItem.
   * @param {Object} env - The central storage or context.
   * @param {Object|null} [data=null] - Initial data for the item.
   */
  constructor(env, data = null) {
    this.env = env;
    this.config = this.env?.config;
    this.merge_defaults();
    if (data) deep_merge2(this.data, data);
    if (!this.data.class_name) this.data.class_name = this.constructor.name;
  }
  /**
   * Creates and initializes a new CollectionItem instance.
   * @param {Object} env - The environment context.
   * @param {Object} data - Initial data for the item.
   * @returns {CollectionItem} The initialized item.
   */
  static load(env, data) {
    const item = new this(env, data);
    item.init();
    return item;
  }
  /**
   * Merges default properties from all classes in the inheritance chain.
   */
  merge_defaults() {
    let current_class = this.constructor;
    while (current_class) {
      for (let key in current_class.defaults) {
        if (typeof current_class.defaults[key] === "object") this[key] = { ...current_class.defaults[key], ...this[key] };
        else this[key] = current_class.defaults[key];
      }
      current_class = Object.getPrototypeOf(current_class);
    }
  }
  /**
   * Generates or retrieves a unique key for the item.
   * Key syntax supports:
   * - `[i]` for sequences
   * - `/` for super-sources (groups, directories, clusters)
   * - `#` for sub-sources (blocks)
   * @returns {string} The unique key
   */
  get_key() {
    return create_uid(this.data);
  }
  /**
   * Ensures the item is loaded, implementing lazy loading pattern.
   * @returns {Promise<void>}
   */
  async ensure_loaded() {
    if (this._queue_load) {
      await this.load();
    }
  }
  /**
   * Updates the data of this item with new data.
   * @param {Object} data - The new data for the item.
   * @returns {boolean} True if data was successfully updated.
   */
  update_data(data) {
    const sanitized_data = this.sanitize_data(data);
    const changed = !deep_equal(this.data, sanitized_data);
    if (!changed) return false;
    deep_merge2(this.data, sanitized_data);
    return true;
  }
  /**
   * Sanitizes the data of an item to ensure it can be safely saved.
   * Handles CollectionItem references, arrays, and nested objects.
   * @param {*} data - The data to sanitize.
   * @returns {*} The sanitized data.
   */
  sanitize_data(data) {
    if (data instanceof _CollectionItem) return data.ref;
    if (Array.isArray(data)) return data.map((val) => this.sanitize_data(val));
    if (typeof data === "object" && data !== null) {
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = this.sanitize_data(data[key]);
        return acc;
      }, {});
    }
    return data;
  }
  /**
   * Initializes the item with input_data, potentially asynchronously.
   * Handles interactions with other collection items.
   */
  init() {
  }
  queue_save() {
    this._queue_save = true;
  }
  async save(ajson = this.ajson) {
    try {
      await this.data_adapter.save(this, ajson);
      this.init();
    } catch (err) {
      this._queue_save = true;
      console.error(err, err.stack);
    }
  }
  queue_load() {
    this._queue_load = true;
  }
  async load() {
    try {
      await this.data_adapter.load(this);
      this.init();
    } catch (err) {
      this._load_error = err;
      this.on_load_error(err);
    }
  }
  on_load_error(err) {
    this.queue_load();
  }
  /**
   * Validates the item's data before saving.
   * Ensures key meets requirements:
   * - Key exists and is not empty
   * - Key is not 'undefined'
   * - Key follows correct syntax for item type
   * @returns {boolean} True if the data is valid for saving
   */
  validate_save() {
    if (!this.key) return false;
    if (this.key.trim() === "") return false;
    if (this.key === "undefined") return false;
    return true;
  }
  /**
   * Deletes the item from its collection.
   */
  delete() {
    this.deleted = true;
    this.queue_save();
  }
  /**
   * Filters items in the collection based on provided options.
   * functional filter (returns true or false) for filtering items in collection; called by collection class
   * @param {Object} filter_opts - Filtering options.
   * @param {string} [filter_opts.exclude_key] - A single key to exclude.
   * @param {string[]} [filter_opts.exclude_keys] - An array of keys to exclude. If exclude_key is provided, it's added to this array.
   * @param {string} [filter_opts.exclude_key_starts_with] - Exclude keys starting with this string.
   * @param {string[]} [filter_opts.exclude_key_starts_with_any] - Exclude keys starting with any of these strings.
   * @param {string} [filter_opts.exclude_key_includes] - Exclude keys that include this string.
   * @param {string} [filter_opts.key_ends_with] - Include only keys ending with this string.
   * @param {string} [filter_opts.key_starts_with] - Include only keys starting with this string.
   * @param {string[]} [filter_opts.key_starts_with_any] - Include only keys starting with any of these strings.
   * @param {string} [filter_opts.key_includes] - Include only keys that include this string.
   * @returns {boolean} True if the item passes the filter, false otherwise.
   */
  filter(filter_opts = {}) {
    const {
      exclude_key,
      exclude_keys = exclude_key ? [exclude_key] : [],
      exclude_key_starts_with,
      exclude_key_starts_with_any,
      exclude_key_includes,
      key_ends_with,
      key_starts_with,
      key_starts_with_any,
      key_includes
    } = filter_opts;
    if (exclude_keys?.includes(this.key)) return false;
    if (exclude_key_starts_with && this.key.startsWith(exclude_key_starts_with)) return false;
    if (exclude_key_starts_with_any && exclude_key_starts_with_any.some((prefix) => this.key.startsWith(prefix))) return false;
    if (exclude_key_includes && this.key.includes(exclude_key_includes)) return false;
    if (key_ends_with && !this.key.endsWith(key_ends_with)) return false;
    if (key_starts_with && !this.key.startsWith(key_starts_with)) return false;
    if (key_starts_with_any && !key_starts_with_any.some((prefix) => this.key.startsWith(prefix))) return false;
    if (key_includes && !this.key.includes(key_includes)) return false;
    return true;
  }
  /**
   * Parses the item's data for any necessary processing or transformation. Placeholder for override in child classes.
   */
  parse() {
  }
  /**
   * Retrieves the collection name derived from the class name.
   * @returns {string} The collection name.
   */
  static get collection_key() {
    return collection_instance_name_from(this.name);
  }
  /**
   * Retrieves the collection name for the instance, either from data or the class method.
   * @returns {string} The collection name.
   */
  get collection_key() {
    return collection_instance_name_from(this.constructor.name);
  }
  /**
   * Retrieves the collection this item belongs to.
   * @returns {Object} The collection object.
   */
  get collection() {
    return this.env[this.collection_key];
  }
  /**
   * Retrieves or generates the key for this item.
   * @returns {string} The item's key.
   */
  get key() {
    return this.data?.key || this.get_key();
  }
  /**
   * Provides a reference object for this item, containing the collection name and key.
   * @returns {Object} The reference object.
   */
  get ref() {
    return { collection_key: this.collection_key, key: this.key };
  }
  /**
   * Retrieves string representation of the item, including its key and data.
   * @returns {string} A string representing the item.
   */
  get ajson() {
    return `${JSON.stringify(this.ajson_key)}: ${this.deleted ? "null" : JSON.stringify(this.data)}`;
  }
  get ajson_key() {
    return this.constructor.name + ":" + this.key;
  }
  get data_adapter() {
    return this.collection.data_adapter;
  }
  get multi_ajson_file_name() {
    return this.key.replace(/[\s\/\.]/g, "_").replace(".md", "");
  }
  get data_fs() {
    return this.collection.data_fs;
  }
  get data_path() {
    return this.collection.data_dir + (this.data_fs?.sep || "/") + this.multi_ajson_file_name + ".ajson";
  }
  // settings convenience methods
  get settings() {
    if (!this.env.settings[this.collection_key]) this.env.settings[this.collection_key] = {};
    return this.env.settings[this.collection_key];
  }
  set settings(settings) {
    this.env.settings[this.collection_key] = settings;
    this.env.smart_settings.save();
  }
  // COMPONENTS
  async render_item(container, opts = {}) {
    const frag = await this.component.call(this.smart_view, this, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return container;
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  /**
   * Override in child classes to set the component for this item
   * @deprecated 2024-12-02
   * @returns {Function} The render function for this component
   */
  get component() {
    return item_component;
  }
};

// node_modules/smart-collections/components/settings.js
async function render2(scope, opts = {}) {
  const html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const heading_html = `<h2>${scope.collection_key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} Settings</h2>`;
  const frag = this.create_doc_fragment(heading_html + html);
  return await post_process2.call(this, scope, frag, opts);
}
async function post_process2(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  return frag;
}

// node_modules/smart-collections/collection.js
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var Collection = class {
  /**
   * Constructs a new Collection instance.
   * @param {Object} env - The environment context containing configurations and adapters
   * @param {Object} [opts={}] - Optional configuration settings
   * @param {string} [opts.custom_collection_key] - Custom key to override default collection name
   * @param {string} [opts.data_dir] - Custom data directory path
   * @param {boolean} [opts.prevent_load_on_init] - Whether to prevent loading items during initialization
   */
  constructor(env, opts = {}) {
    this.env = env;
    this.opts = opts;
    if (opts.custom_collection_key) this.collection_key = opts.custom_collection_key;
    this.env[this.collection_key] = this;
    this.config = this.env.config;
    this.items = {};
    this.merge_defaults();
    this.loaded = null;
    this._loading = false;
    this.load_time_ms = null;
    this.settings_container = null;
  }
  /**
   * Initializes a new collection in the environment.
   * @param {Object} env - The environment context
   * @param {Object} [opts={}] - Optional configuration settings
   * @returns {Promise<void>}
   */
  static async init(env, opts = {}) {
    env[this.collection_key] = new this(env, opts);
    await env[this.collection_key].init();
    env.collections[this.collection_key] = "init";
  }
  /**
   * Gets the collection name derived from the class name.
   * Converts camelCase to snake_case.
   * @return {string} The collection name
   */
  static get collection_key() {
    return this.name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }
  // INSTANCE METHODS
  async init() {
  }
  /**
   * Creates or updates an item in the collection based on the provided data.
   * If an existing item is found, it updates it; otherwise, creates a new item.
   * @param {Object} [data={}] - The data to create or update an item with
   * @returns {Promise<CollectionItem>|CollectionItem} The created or updated item
   */
  create_or_update(data = {}) {
    const existing = this.find_by(data);
    const item = existing ? existing : new this.item_type(this.env);
    item._queue_save = !!!existing;
    const changed = item.update_data(data);
    if (!existing) {
      if (item.validate_save()) this.set(item);
      else {
        console.warn("Invalid item, skipping adding to collection: ", item);
        return item;
      }
    }
    if (existing && !changed) return existing;
    if (item.init instanceof AsyncFunction) return new Promise((resolve, reject) => {
      item.init(data).then(() => resolve(item));
    });
    item.init(data);
    return item;
  }
  /**
   * Finds an item in the collection that matches the given data.
   * First checks for a key match, then creates a temporary item to find matches.
   * @param {Object} data - The data to match against
   * @returns {CollectionItem|null} The matching item or null if not found
   */
  find_by(data) {
    if (data.key) return this.get(data.key);
    const temp = new this.item_type(this.env);
    const temp_data = JSON.parse(JSON.stringify(data, temp.sanitize_data(data)));
    deep_merge2(temp.data, temp_data);
    return temp.key ? this.get(temp.key) : null;
  }
  // READ
  /**
   * Filters items in the collection based on provided options.
   * @param {Object|Function} [filter_opts={}] - Filter options to apply
   * @param {number} [filter_opts.limit] - Maximum number of items to return
   * @returns {CollectionItem[]} Array of filtered items
   */
  filter(filter_opts = {}) {
    if (typeof filter_opts === "function") {
      return Object.values(this.items).filter(filter_opts);
    }
    this.filter_opts = this.prepare_filter(filter_opts);
    const results = [];
    const { limit } = this.filter_opts;
    for (const item of Object.values(this.items)) {
      if (limit && results.length >= limit) break;
      if (item.filter(filter_opts)) {
        results.push(item);
      }
    }
    return results;
  }
  // alias for filter
  list(filter_opts) {
    return this.filter(filter_opts);
  }
  /**
   * Prepares filter options for use in the filter implementation.
   * Used by sub-classes to convert simplified filter options into filter_opts compatible with the filter implementation.
   * @param {Object} filter_opts - The original filter options provided.
   * @returns {Object} The prepared filter options compatible with the filter implementation.
   */
  prepare_filter(filter_opts) {
    return filter_opts;
  }
  /**
   * Retrieves a single item from the collection based on the provided strategy and options.
   * @param {String} key - The key of the item to retrieve.
   * @return {CollectionItem} The retrieved item.
   */
  get(key) {
    return this.items[key];
  }
  /**
   * Retrieves multiple items from the collection based on the provided keys.
   * @param {String[]} keys - The keys of the items to retrieve.
   * @return {CollectionItem[]} The retrieved items.
   */
  get_many(keys = []) {
    if (Array.isArray(keys)) return keys.map((key) => this.get(key)).filter(Boolean);
    console.error("get_many called with non-array keys: ", keys);
  }
  /**
   * Retrieves a random item from the collection based on the provided options.
   * @param {Object} opts - The options used to retrieve the item.
   * @return {CollectionItem} The retrieved item.
   */
  get_rand(opts = null) {
    if (opts) {
      const filtered = this.filter(opts);
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    return this.items[this.keys[Math.floor(Math.random() * this.keys.length)]];
  }
  // UPDATE
  /**
   * Adds or updates an item in the collection.
   * @param {CollectionItem} item - The item to add or update.
   */
  set(item) {
    if (!item.key) throw new Error("Item must have key property");
    this.items[item.key] = item;
  }
  /**
   * Updates multiple items in the collection based on the provided keys and data.
   * @param {String[]} keys - The keys of the items to update.
   * @param {Object} data - The data to update the items with.
   */
  update_many(keys = [], data = {}) {
    this.get_many(keys).forEach((item) => item.update_data(data));
  }
  // DESTROY
  /**
   * Clears all items from the collection.
   */
  clear() {
    this.items = {};
  }
  /**
   * Deletes an item from the collection based on its key.
   * Does not trigger save or delete from adapter data.
   * @param {String} key - The key of the item to delete.
   */
  delete_item(key) {
    delete this.items[key];
  }
  /**
   * Deletes multiple items from the collection based on their keys.
   * @param {String[]} keys - The keys of the items to delete.
   */
  delete_many(keys = []) {
    keys.forEach((key) => {
      this.items[key].delete();
    });
  }
  // CONVENIENCE METHODS (namespace getters)
  /**
   * Gets or sets the collection name. If a name is set, it overrides the default name.
   * @param {String} name - The new collection name.
   */
  get collection_key() {
    return this._collection_key ? this._collection_key : this.constructor.collection_key;
  }
  set collection_key(name) {
    this._collection_key = name;
  }
  // DATA ADAPTER
  /**
   * Gets the data adapter instance for this collection.
   * Lazily initializes the adapter based on configuration.
   * @returns {DataAdapter} The data adapter instance for this collection
   * @throws {Error} If no data adapter class is found in configuration
   */
  get data_adapter() {
    if (!this._data_adapter) {
      const config = this.env.opts.collections?.[this.collection_key];
      const data_adapter_class = config?.data_adapter ?? this.env.opts.collections?.smart_collections?.data_adapter;
      if (!data_adapter_class) throw new Error("No data adapter class found for " + this.collection_key + " or smart_collections");
      this._data_adapter = new data_adapter_class(this);
    }
    return this._data_adapter;
  }
  /**
   * Gets the data directory strategy for this collection.
   * Default is 'multi' for multi-file storage.
   * @returns {string} The data directory strategy
   */
  get data_dir() {
    return "multi";
  }
  /**
   * Gets the filesystem adapter from the environment.
   * @returns {FileSystem} The filesystem adapter
   */
  get data_fs() {
    return this.env.data_fs;
  }
  /**
   * Gets the class name of the item type the collection manages.
   * @return {String} The item class name.
   */
  get item_class_name() {
    const name = this.constructor.name;
    if (name.endsWith("ies")) return name.slice(0, -3) + "y";
    else if (name.endsWith("s")) return name.slice(0, -1);
    else return name + "Item";
  }
  /**
   * Gets the name of the item type the collection manages, derived from the class name.
   * @return {String} The item name.
   */
  get item_name() {
    return this.item_class_name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }
  /**
   * Gets the constructor of the item type the collection manages.
   * @return {Function} The item type constructor.
   */
  get item_type() {
    return this.env.item_types[this.item_class_name];
  }
  /**
   * Gets the keys of the items in the collection.
   * @return {String[]} The keys of the items.
   */
  get keys() {
    return Object.keys(this.items);
  }
  /**
   * @deprecated use data_adapter instead (2024-09-14)
   */
  get adapter() {
    return this.data_adapter;
  }
  /**
   * Gets the data path from the environment.
   * @deprecated use env.env_data_dir
   * @returns {string} The data path.
   */
  get data_path() {
    return this.env.data_path;
  }
  // DEPRECATED
  // ADAPTER METHODS
  /**
   * Saves the current state of the collection.
   */
  async save() {
    await this.data_adapter.save();
  }
  async save_queue() {
    await this.process_save_queue();
  }
  // UTILITY METHODS
  /**
   * Merges default configurations from all classes in the inheritance chain for Collection types; 
   * e.g. EntityCollection, NoteCollection, etc.
   */
  merge_defaults() {
    let current_class = this.constructor;
    while (current_class) {
      const col_conf = this.config?.collections?.[current_class.collection_key];
      Object.entries(typeof col_conf === "object" ? col_conf : {}).forEach(([key, value]) => this[key] = value);
      current_class = Object.getPrototypeOf(current_class);
    }
  }
  /**
   * Processes the save queue for all items marked for saving.
   * Shows a notification during the save process.
   * @returns {Promise<void>}
   */
  async process_save_queue() {
    this.notices?.show("saving", "Saving " + this.collection_key + "...", { timeout: 0 });
    if (this._saving) return console.log("Already saving");
    this._saving = true;
    setTimeout(() => {
      this._saving = false;
    }, 1e4);
    const save_queue = Object.values(this.items).filter((item) => item._queue_save);
    console.log("Saving " + this.collection_key + ": ", save_queue.length + " items");
    const time_start = Date.now();
    await Promise.all(save_queue.map((item) => item.save()));
    console.log("Saved " + this.collection_key + " in " + (Date.now() - time_start) + "ms");
    this._saving = false;
    this.notices?.remove("saving");
  }
  /**
   * Processes the load queue for all items marked for loading.
   * Loads items in batches for better performance.
   * Shows a notification during the load process.
   * @returns {Promise<void>}
   */
  async process_load_queue() {
    this.notices?.show("loading", "Loading " + this.collection_key + "...", { timeout: 0 });
    if (this._loading) return console.log("Already loading");
    this._loading = true;
    setTimeout(() => {
      this._loading = false;
    }, 1e4);
    const load_queue = Object.values(this.items).filter((item) => item._queue_load);
    console.log("Loading " + this.collection_key + ": ", load_queue.length + " items");
    const time_start = Date.now();
    const batch_size = 100;
    for (let i = 0; i < load_queue.length; i += batch_size) {
      const batch = load_queue.slice(i, i + batch_size);
      await Promise.all(batch.map((item) => item.load()));
    }
    this.env.collections[this.collection_key] = "loaded";
    this.load_time_ms = Date.now() - time_start;
    console.log("Loaded " + this.collection_key + " in " + this.load_time_ms + "ms");
    this._loading = false;
    this.loaded = load_queue.length;
    this.notices?.remove("loading");
  }
  get settings_config() {
    return this.process_settings_config({});
  }
  process_settings_config(_settings_config, prefix = "") {
    const add_prefix = (key) => prefix && !key.includes(`${prefix}.`) ? `${prefix}.${key}` : key;
    return Object.entries(_settings_config).reduce((acc, [key, val]) => {
      let new_val = { ...val };
      if (new_val.conditional) {
        if (!new_val.conditional(this)) return acc;
        delete new_val.conditional;
      }
      if (new_val.callback) {
        new_val.callback = add_prefix(new_val.callback);
      }
      if (new_val.btn_callback) {
        new_val.btn_callback = add_prefix(new_val.btn_callback);
      }
      if (new_val.options_callback) {
        new_val.options_callback = add_prefix(new_val.options_callback);
      }
      const new_key = add_prefix(this.process_setting_key(key));
      acc[new_key] = new_val;
      return acc;
    }, {});
  }
  process_setting_key(key) {
    return key;
  }
  // override in sub-class if needed for prefixes and variable replacements
  /**
   * Gets the default settings for this collection.
   * Override in subclasses to provide collection-specific defaults.
   * @returns {Object} The default settings object
   */
  get default_settings() {
    return {};
  }
  /**
   * Gets the current settings for this collection.
   * Initializes with default settings if none exist.
   * @returns {Object} The current settings object
   */
  get settings() {
    if (!this.env.settings[this.collection_key]) {
      this.env.settings[this.collection_key] = this.default_settings;
    }
    return this.env.settings[this.collection_key];
  }
  /**
   * Gets the smart view instance from the environment.
   * Lazily initializes if not already created.
   * @deprecated use env.smart_view instead
   * @returns {SmartView} The smart view instance
   */
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  /**
   * Renders the settings for the collection.
   * @param {HTMLElement} container - The container element to render the settings into.
   * @param {Object} opts - Additional options for rendering.
   * @param {Object} opts.settings_keys - An array of keys to render.
   */
  async render_settings(container = this.settings_container, opts = {}) {
    return await this.render_collection_settings(container, opts);
  }
  async render_collection_settings(container = this.settings_container, opts = {}) {
    if (container && (!this.settings_container || this.settings_container !== container)) this.settings_container = container;
    else if (!container) {
      console.log("no container, creating frag");
      container = this.env.smart_view.create_doc_dragment("<div></div>");
    }
    container.innerHTML = `<div class="sc-loading">Loading ${this.collection_key} settings...</div>`;
    const frag = await this.env.render_component("settings", this, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return container;
  }
  unload() {
    this.clear();
  }
  async run_load() {
    this.loaded = null;
    this.load_time_ms = null;
    Object.values(this.items).forEach((item) => item.queue_load());
    this.notices?.show(`loading ${this.collection_key}`, `Loading ${this.collection_key}...`, { timeout: 0 });
    await this.process_load_queue();
    this.notices?.remove(`loading ${this.collection_key}`);
    this.notices?.show("done loading", `${this.collection_key} loaded`, { timeout: 3e3 });
    this.render_settings();
  }
};

// node_modules/smart-sources/node_modules/smart-entities/utils/sort_by_score.js
function sort_by_score(a, b) {
  const epsilon = 1e-9;
  const score_diff = a.score - b.score;
  if (Math.abs(score_diff) < epsilon) return 0;
  return score_diff > 0 ? -1 : 1;
}

// node_modules/smart-sources/node_modules/smart-entities/adapters/_adapter.js
var EntityAdapter = class {
  /**
   * Creates an instance of EntityAdapter.
   * @constructor
   * @param {Object} smart_entity - The SmartEntity instance that this adapter is wrapping.
   */
  constructor(smart_entity) {
    this.smart_entity = smart_entity;
  }
  /**
   * Retrieves the data object of the smart entity.
   * @readonly
   * @returns {Object} The data object containing embeddings and other entity data.
   */
  get data() {
    return this.smart_entity.data;
  }
  /**
   * Retrieves the embedding model key used for this entity.
   * @readonly
   * @returns {string} The key for the embedding model.
   */
  get embed_model_key() {
    return this.smart_entity.embed_model_key;
  }
  /**
   * Retrieves the vector representation for this entity's embedding.
   * @readonly
   * @returns {Array<number>|undefined} The vector array if available, or undefined if not set.
   */
  get vec() {
    return this.data?.embeddings?.[this.embed_model_key]?.vec;
  }
  /**
   * Sets the vector representation for this entity's embedding.
   * Initializes the embeddings data structure if not already present.
   * @param {Array<number>} vec - The vector array to set for this embedding.
   */
  set vec(vec) {
    if (!this.data.embeddings) {
      this.data.embeddings = {};
    }
    if (!this.data.embeddings[this.embed_model_key]) {
      this.data.embeddings[this.embed_model_key] = {};
    }
    this.data.embeddings[this.embed_model_key].vec = vec;
  }
};

// node_modules/smart-sources/node_modules/smart-entities/components/entity.js
async function render3(scope, opts = {}) {
  const markdown = await get_markdown(scope);
  const frag = await this.render_markdown(markdown, scope);
  return await post_process3.call(this, scope, frag, opts);
}
async function get_markdown(scope) {
  return should_render_embed(scope) ? scope.embed_link : (await scope.get_content())?.replace(/```dataview/g, "```\\dataview");
}
async function post_process3(scope, frag, opts = {}) {
  return frag;
}
function should_render_embed(entity) {
  if (!entity) return false;
  if (entity.is_canvas) return true;
  if (entity.is_excalidraw) return true;
  if (entity.source?.is_canvas) return true;
  if (entity.source?.is_excalidraw) return true;
  return false;
}

// node_modules/smart-sources/node_modules/smart-entities/smart_entity.js
var SmartEntity = class extends CollectionItem {
  /**
   * Creates an instance of SmartEntity.
   * @constructor
   * @param {Object} env - The environment instance.
   * @param {Object} [opts={}] - Configuration options.
   */
  constructor(env, opts = {}) {
    super(env, opts);
    this.entity_adapter = new EntityAdapter(this);
  }
  /**
   * Provides default values for a SmartEntity instance.
   * @static
   * @readonly
   * @returns {Object} The default values.
   */
  static get defaults() {
    return {
      data: {
        path: null,
        embeddings: {},
        // contains keys per model
        embedding: {}
        // DEPRECATED
      }
    };
  }
  /**
   * Initializes the SmartEntity instance.
   * @returns {void}
   */
  init() {
    super.init();
    if (!this.vec) this.queue_embed();
    Object.entries(this.data.embeddings || {}).forEach(([model, embedding]) => {
      if (model !== this.embed_model_key) {
        this.data.embeddings[model] = null;
        delete this.data.embeddings[model];
      }
    });
  }
  /**
   * Queues the entity for embedding.
   * @returns {void}
   */
  queue_embed() {
    this._queue_embed = true;
  }
  /**
   * Finds the nearest entities to this entity.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest(filter = {}) {
    return this.collection.nearest_to(this, filter);
  }
  /**
   * Generates the context string for the entity.
   * @async
   * @param {Object} [params={}] - Parameters for context generation.
   * @param {number} [params.i] - Optional index for note numbering.
   * @returns {Promise<string>} The context string.
   */
  async get_as_context(params = {}) {
    return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${await this.get_content()}
---END NOTE${params.i ? " " + params.i : ""}---`;
  }
  /**
   * Prepares the input for embedding.
   * @async
   * @returns {Promise<void>} Should be overridden in child classes.
   */
  async get_embed_input() {
  }
  // override in child class
  /**
   * Prepares filter options for finding connections based on parameters.
   * @param {Object} [params={}] - Parameters for finding connections.
   * @returns {Object} The prepared filter options.
   */
  prepare_find_connections_filter_opts(params = {}) {
    const opts = {
      ...this.env.settings.smart_view_filter || {},
      ...params,
      entity: this
    };
    if (opts.filter?.limit) delete opts.filter.limit;
    if (opts.limit) delete opts.limit;
    return opts;
  }
  /**
   * Finds connections relevant to this entity based on provided parameters.
   * @param {Object} [params={}] - Parameters for finding connections.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  find_connections(params = {}) {
    const filter_opts = this.prepare_find_connections_filter_opts(params);
    const limit = params.filter?.limit || params.limit || this.env.settings.smart_view_filter?.results_limit || 10;
    const cache_key = this.key + JSON.stringify(params);
    if (!this.env.connections_cache) this.env.connections_cache = {};
    if (!this.env.connections_cache[cache_key]) {
      const connections = this.nearest(filter_opts).sort(sort_by_score).slice(0, limit);
      this.connections_to_cache(cache_key, connections);
    }
    return this.connections_from_cache(cache_key);
  }
  /**
   * Retrieves connections from the cache based on the cache key.
   * @param {string} cache_key - The cache key.
   * @returns {Array<Result>} The cached connections.
   */
  connections_from_cache(cache_key) {
    return this.env.connections_cache[cache_key];
  }
  /**
   * Stores connections in the cache with the provided cache key.
   * @param {string} cache_key - The cache key.
   * @param {Array<Result>} connections - The connections to cache.
   * @returns {void}
   */
  connections_to_cache(cache_key, connections) {
    this.env.connections_cache[cache_key] = connections;
  }
  /**
   * Gets the embed link for the entity.
   * @readonly
   * @returns {string} The embed link.
   */
  get embed_link() {
    return `![[${this.path}]]`;
  }
  /**
   * Gets the key of the embedding model.
   * @readonly
   * @returns {string} The embedding model key.
   */
  get embed_model_key() {
    return this.collection.embed_model_key;
  }
  /**
   * Gets the name of the entity, formatted based on settings.
   * @readonly
   * @returns {string} The entity name.
   */
  get name() {
    return (!this.should_show_full_path ? this.path.split("/").pop() : this.path.split("/").join(" > ")).split("#").join(" > ").replace(".md", "");
  }
  /**
   * Determines whether to show the full path of the entity.
   * @readonly
   * @returns {boolean} True if the full path should be shown, false otherwise.
   */
  get should_show_full_path() {
    return this.env.settings.smart_view_filter?.show_full_path;
  }
  /**
   * @deprecated Use embed_model instead.
   * @readonly
   * @returns {Object} The smart embedding model.
   */
  get smart_embed() {
    return this.embed_model;
  }
  /**
   * Gets the embedding model instance from the collection.
   * @readonly
   * @returns {Object} The embedding model instance.
   */
  get embed_model() {
    return this.collection.embed_model;
  }
  /**
   * Gets the number of tokens associated with the entity's embedding.
   * @readonly
   * @returns {number|undefined} The number of tokens, or undefined if not set.
   */
  get tokens() {
    return this.data.embeddings[this.embed_model_key]?.tokens;
  }
  /**
   * Determines if the entity is unembedded based on vector presence and size.
   * @readonly
   * @returns {boolean} True if unembedded, false otherwise.
   */
  get is_unembedded() {
    if (this.vec) return false;
    if (this.size < (this.settings?.min_chars || 300)) return false;
    return true;
  }
  /**
   * Determines if the entity should be embedded.
   * @readonly
   * @returns {boolean} Always returns true. Can be overridden in child classes.
   */
  get should_embed() {
    return true;
  }
  // may override in child class
  /**
   * Sets the error for the embedding model.
   * @param {string} error - The error message.
   */
  set error(error) {
    this.data.embeddings[this.embed_model_key].error = error;
  }
  /**
   * Sets the number of tokens for the embedding.
   * @param {number} tokens - The number of tokens.
   */
  set tokens(tokens) {
    if (!this.data.embeddings) this.data.embeddings = {};
    if (!this.data.embeddings[this.embed_model_key]) this.data.embeddings[this.embed_model_key] = {};
    this.data.embeddings[this.embed_model_key].tokens = tokens;
  }
  /**
   * Gets the vector representation from the entity adapter.
   * @readonly
   * @returns {Array<number>|undefined} The vector or undefined if not set.
   */
  get vec() {
    return this.entity_adapter.vec;
  }
  /**
   * Sets the vector representation in the entity adapter.
   * @param {Array<number>} vec - The vector to set.
   */
  set vec(vec) {
    this.entity_adapter.vec = vec;
    this._queue_embed = false;
    this._embed_input = null;
    this.queue_save();
  }
  /**
   * Removes all embeddings from the entity.
   * @returns {void}
   */
  remove_embeddings() {
    this.data.embeddings = null;
    this.queue_save();
  }
  /**
   * Retrieves the key of the entity.
   * @returns {string} The entity key.
   */
  get_key() {
    return this.data.key || this.data.path;
  }
  /**
   * Retrieves the path of the entity.
   * @readonly
   * @returns {string|null} The entity path.
   */
  get path() {
    return this.data.path;
  }
  /**
   * Gets the component responsible for rendering the entity.
   * @readonly
   * @returns {Function} The render function for the entity component.
   */
  get component() {
    return render3;
  }
  // COMPONENTS 2024-11-27
  get connections_component() {
    if (!this._connections_component) this._connections_component = this.components?.connections?.bind(this.smart_view);
    return this._connections_component;
  }
  async render_connections(container, opts = {}) {
    if (container) container.innerHTML = "Loading connections...";
    const frag = await this.env.render_component("connections", this, opts);
    if (container) {
      container.innerHTML = "";
      container.appendChild(frag);
    }
    return frag;
  }
};

// node_modules/smart-sources/node_modules/smart-entities/top_acc.js
function results_acc(_acc, result, ct = 10) {
  if (_acc.results.size < ct) {
    _acc.results.add(result);
  } else if (result.score > _acc.min) {
    _acc.results.add(result);
    _acc.results.delete(_acc.minResult);
    _acc.minResult = Array.from(_acc.results).reduce((min, curr) => curr.score < min.score ? curr : min);
    _acc.min = _acc.minResult.score;
  }
}
function furthest_acc(_acc, result, ct = 10) {
  if (_acc.results.size < ct) {
    _acc.results.add(result);
  } else if (result.score < _acc.max) {
    _acc.results.add(result);
    _acc.results.delete(_acc.maxResult);
    _acc.maxResult = Array.from(_acc.results).reduce((max, curr) => curr.score > max.score ? curr : max);
    _acc.max = _acc.maxResult.score;
  }
}

// node_modules/smart-sources/node_modules/smart-entities/cos_sim.js
function cos_sim(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error("Vectors must have the same length");
  }
  let dot_product = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  const epsilon = 1e-8;
  for (let i = 0; i < vector1.length; i++) {
    dot_product += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  if (magnitude1 < epsilon || magnitude2 < epsilon) {
    return 0;
  }
  return dot_product / (magnitude1 * magnitude2);
}

// node_modules/smart-sources/node_modules/smart-entities/smart_entities.js
var SmartEntities = class extends Collection {
  /**
   * Creates an instance of SmartEntities.
   * @constructor
   * @param {Object} env - The environment instance.
   * @param {Object} opts - Configuration options.
   */
  constructor(env, opts) {
    super(env, opts);
    this.model_instance_id = null;
    this.is_processing_queue = false;
    this.queue_total = 0;
    this.embedded_total = 0;
    this.is_queue_halted = false;
    this.total_tokens = 0;
    this.total_time = 0;
  }
  /**
   * Initializes the SmartEntities instance by loading embeddings.
   * @async
   * @returns {Promise<void>}
   */
  async init() {
    await super.init();
    await this.load_smart_embed();
    if (!this.embed_model) {
      console.log(`SmartEmbed not loaded for ${this.collection_key}. Continuing without embedding capabilities.`);
    }
  }
  /**
   * Loads the smart embedding model.
   * @async
   * @returns {Promise<void>}
   */
  async load_smart_embed() {
    if (this.embed_model_key === "None") return;
    if (!this.embed_model) return;
    if (this.embed_model.is_loading) return console.log(`SmartEmbedModel already loading for ${this.embed_model_key}`);
    if (this.embed_model.is_loaded) return console.log(`SmartEmbedModel already loaded for ${this.embed_model_key}`);
    try {
      console.log(`Loading SmartEmbedModel in ${this.collection_key}, current state: ${this.embed_model.state}`);
      await this.embed_model.load();
    } catch (e) {
      console.error(`Error loading SmartEmbedModel for ${this.embed_model_key}`);
      console.error(e);
      if (this.env.smart_connections_plugin?.settings?.legacy_transformers) {
        console.log("Switching to legacy transformers");
        this.settings.embed_model[this.embed_model_key] = this.env.smart_connections_plugin.settings.legacy_transformers;
        this.env.smart_connections_plugin.settings.legacy_transformers = null;
        delete this.env.smart_connections_plugin.settings.legacy_transformers;
        await this.embed_model_changed();
      }
    }
  }
  /**
   * Unloads the smart embedding model.
   * @async
   * @returns {Promise<void>}
   */
  async unload() {
    if (typeof this.embed_model?.unload === "function") {
      await this.embed_model.unload();
      this.embed_model = null;
    }
    super.unload();
  }
  /**
   * Gets the key of the embedding model.
   * @readonly
   * @returns {string} The embedding model key.
   */
  get embed_model_key() {
    return this.settings?.embed_model?.model_key || "TaylorAI/bge-micro-v2";
  }
  /**
   * Gets the settings for the embedding model.
   * @readonly
   * @returns {Object} The embedding model settings.
   */
  get embed_model_settings() {
    if (!this.settings.embed_model) this.settings.embed_model = {};
    if (!this.settings.embed_model?.[this.embed_model_key]) this.settings.embed_model[this.embed_model_key] = {};
    return this.settings.embed_model[this.embed_model_key];
  }
  /**
   * Gets or creates the container for smart embeddings in the DOM.
   * @readonly
   * @returns {HTMLElement|undefined} The container element or undefined if not available.
   */
  get smart_embed_container() {
    if (!this.model_instance_id) return console.log("model_key not set");
    const id = this.model_instance_id.replace(/[^a-zA-Z0-9]/g, "_");
    if (!window.document) return console.log("window.document not available");
    if (window.document.querySelector(`#${id}`)) return window.document.querySelector(`#${id}`);
    const container = window.document.createElement("div");
    container.id = id;
    window.document.body.appendChild(container);
    return container;
  }
  /**
   * @deprecated Use embed_model instead.
   * @readonly
   * @returns {Object} The smart embedding model.
   */
  get smart_embed() {
    return this.embed_model;
  }
  /**
   * Gets the embedding model instance.
   * @readonly
   * @returns {Object|null} The embedding model instance or null if none.
   */
  get embed_model() {
    if (this.embed_model_key === "None") return null;
    if (!this.env._embed_model && this.env.opts.modules.smart_embed_model?.class) this.env._embed_model = new this.env.opts.modules.smart_embed_model.class({
      settings: this.settings.embed_model,
      adapters: this.env.opts.modules.smart_embed_model?.adapters,
      re_render_settings: this.re_render_settings.bind(this),
      reload_model: this.reload_embed_model.bind(this)
    });
    return this.env._embed_model;
  }
  set embed_model(embed_model) {
    this.env._embed_model = embed_model;
  }
  reload_embed_model() {
    console.log("reload_embed_model");
    this.embed_model.unload();
    this.env._embed_model = null;
  }
  re_render_settings() {
    this.settings_container.innerHTML = "";
    this.render_settings();
  }
  /**
   * Finds the nearest entities to a given entity.
   * @param {Object} entity - The reference entity.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest_to(entity, filter = {}) {
    return this.nearest(entity.vec, filter);
  }
  /**
   * Finds the nearest entities to a vector based on cosine similarity.
   * @param {Array<number>} vec - The vector to compare against.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @param {number} [filter.limit=50] - The maximum number of results to return.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest(vec, filter = {}) {
    if (!vec) return console.log("no vec");
    const {
      limit = 50
      // TODO: default configured in settings
    } = filter;
    const nearest = this.filter(filter).reduce((acc, item) => {
      if (!item.vec) return acc;
      const result = { item, score: cos_sim(vec, item.vec) };
      results_acc(acc, result, limit);
      return acc;
    }, { min: 0, results: /* @__PURE__ */ new Set() });
    return Array.from(nearest.results);
  }
  furthest(vec, filter = {}) {
    if (!vec) return console.log("no vec");
    const {
      limit = 50
      // TODO: default configured in settings
    } = filter;
    const furthest = this.filter(filter).reduce((acc, item) => {
      if (!item.vec) return acc;
      const result = { item, score: cos_sim(vec, item.vec) };
      furthest_acc(acc, result, limit);
      return acc;
    }, { max: 0, results: /* @__PURE__ */ new Set() });
    return Array.from(furthest.results);
  }
  /**
   * Gets the file name based on collection key and embedding model key.
   * @readonly
   * @returns {string} The constructed file name.
   */
  get file_name() {
    return this.collection_key + "-" + this.embed_model_key.split("/").pop();
  }
  // Uncomment and implement if needed
  // get data_dir() { return this.env.env_data_dir + "/" + this.embed_model_key.replace("/", "_"); }
  /**
   * Calculates the relevance of an item based on the search filter.
   * @param {Object} item - The item to calculate relevance for.
   * @param {Object} search_filter - The search filter containing keywords.
   * @returns {number} The relevance score:
   *                   1 if any keyword is found in the item's path,
   *                   0 otherwise (default relevance for keyword in content).
   */
  calculate_relevance(item, search_filter) {
    if (search_filter.keywords.some((keyword) => item.path?.includes(keyword))) return 1;
    return 0;
  }
  /**
   * Prepares the filter options by incorporating entity-based filters.
   * @param {Object} [opts={}] - The filter options.
   * @param {Object} [opts.entity] - The entity to base the filters on.
   * @param {string|string[]} [opts.exclude_filter] - Keys or prefixes to exclude.
   * @param {string|string[]} [opts.include_filter] - Keys or prefixes to include.
   * @param {boolean} [opts.exclude_inlinks] - Whether to exclude inlinks of the entity.
   * @param {boolean} [opts.exclude_outlinks] - Whether to exclude outlinks of the entity.
   * @returns {Object} The modified filter options.
   */
  prepare_filter(opts = {}) {
    const {
      entity,
      exclude_filter,
      include_filter,
      exclude_inlinks,
      exclude_outlinks
    } = opts;
    if (entity) {
      if (typeof opts.exclude_key_starts_with_any === "undefined") opts.exclude_key_starts_with_any = [];
      if (opts.exclude_key_starts_with) {
        opts.exclude_key_starts_with_any = [
          opts.exclude_key_starts_with
        ];
        delete opts.exclude_key_starts_with;
      }
      opts.exclude_key_starts_with_any.push(entity.source_key || entity.key);
      if (exclude_filter) {
        if (typeof exclude_filter === "string") opts.exclude_key_starts_with_any.push(exclude_filter);
        else if (Array.isArray(exclude_filter)) opts.exclude_key_starts_with_any.push(...exclude_filter);
      }
      if (include_filter) {
        if (!Array.isArray(opts.key_starts_with_any)) opts.key_starts_with_any = [];
        if (typeof include_filter === "string") opts.key_starts_with_any.push(include_filter);
        else if (Array.isArray(include_filter)) opts.key_starts_with_any.push(...include_filter);
      }
      if (exclude_inlinks && this.env.links[entity.path]) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...Object.keys(this.env.links[entity.path] || {}));
      }
      if (exclude_outlinks) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...entity.outlink_paths);
      }
    }
    return opts;
  }
  /**
   * Looks up entities based on hypothetical content.
   * @async
   * @param {Object} [params={}] - The parameters for the lookup.
   * @param {Array<string>} [params.hypotheticals=[]] - The hypothetical content to lookup.
   * @param {Object} [params.filter] - The filter to use for the lookup.
   * @param {number} [params.k] - Deprecated: Use `filter.limit` instead.
   * @returns {Promise<Array<Result>|Object>} The lookup results or an error object.
   */
  async lookup(params = {}) {
    const { hypotheticals = [] } = params;
    if (!hypotheticals?.length) return { error: "hypotheticals is required" };
    if (!this.smart_embed) return { error: "Embedding search is not enabled." };
    const hyp_vecs = await this.smart_embed.embed_batch(hypotheticals.map((h) => ({ embed_input: h })));
    const limit = params.filter?.limit || params.k || this.env.settings.lookup_k || 10;
    if (params.filter?.limit) delete params.filter.limit;
    const filter = {
      ...this.env.chats?.current?.scope || {},
      ...params.filter || {}
    };
    const results = hyp_vecs.reduce((acc, embedding, i) => {
      const results2 = this.nearest(embedding.vec, filter);
      results2.forEach((result) => {
        if (!acc[result.item.path] || result.score > acc[result.item.path].score) {
          acc[result.item.path] = {
            key: result.item.key,
            score: result.score,
            item: result.item,
            entity: result.item,
            // DEPRECATED: use item instead
            hypothetical_i: i
          };
        } else {
          result.score = acc[result.item.path].score;
        }
      });
      return acc;
    }, {});
    const top_k = Object.values(results).sort(sort_by_score).slice(0, limit);
    console.log(`Found and returned ${top_k.length} ${this.collection_key}.`);
    return top_k;
  }
  /**
   * Gets the configuration for settings.
   * @readonly
   * @returns {Object} The settings configuration.
   */
  get settings_config() {
    return settings_config;
  }
  async render_settings(container = this.settings_container, opts = {}) {
    container = await this.render_collection_settings(container, opts);
    const embed_model_settings_frag = await this.env.render_component("settings", this.embed_model, opts);
    container.appendChild(embed_model_settings_frag);
    return container;
  }
  /**
   * Gets the notices from the environment.
   * @readonly
   * @returns {Object} The notices object.
   */
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  /**
   * Gets the embed queue containing items to be embedded.
   * @readonly
   * @returns {Array<Object>} The embed queue.
   */
  get embed_queue() {
    return Object.values(this.items).filter((item) => item._queue_embed && item.should_embed);
  }
  /**
   * Processes the embed queue by batching and embedding items.
   * @async
   * @returns {Promise<void>}
   */
  async process_embed_queue() {
    try {
      if (this.embed_model_key === "None") return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (!this.embed_model) return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (this.is_queue_halted || this.is_processing_queue) return console.log(`Smart Connections: Embed queue processing already in progress for ${this.collection_key}`);
      this.is_processing_queue = true;
      const datetime_start = /* @__PURE__ */ new Date();
      const queue = this.embed_queue;
      const datetime_end = /* @__PURE__ */ new Date();
      console.log(`Time spent getting embed queue: ${datetime_end.getTime() - datetime_start.getTime()}ms`);
      this.queue_total = queue.length;
      if (!this.queue_total) {
        this.is_processing_queue = false;
        return console.log(`Smart Connections: No items in ${this.collection_key} embed queue`);
      }
      console.log(`Processing ${this.collection_key} embed queue: ${this.queue_total} items`);
      for (let i = this.embedded_total; i < this.queue_total; i += this.embed_model.batch_size) {
        if (this.is_queue_halted) break;
        const batch = queue.slice(i, i + this.embed_model.batch_size);
        await Promise.all(batch.map((item) => item.get_embed_input()));
        const start_time = Date.now();
        await this.embed_model.embed_batch(batch);
        this.total_time += Date.now() - start_time;
        this.embedded_total += batch.length;
        this.total_tokens += batch.reduce((acc, item) => acc + (item.tokens || 0), 0);
        this._show_embed_progress_notice();
      }
      this.is_processing_queue = false;
      if (!this.is_queue_halted) this._embed_queue_complete();
    } catch (e) {
      if (e.message.includes("API key not set")) {
        this.halt_embed_queue_processing(`API key not set for ${this.embed_model_key}
Please set the API key in the settings.`);
      }
      this.is_processing_queue = false;
      console.error(`Error processing ${this.collection_key} embed queue: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  /**
   * Displays the embedding progress notice.
   * @private
   * @returns {void}
   */
  _show_embed_progress_notice() {
    if (this.is_queue_halted) return;
    if (this.embedded_total - this.last_notice_embedded_total < 100) return;
    this.last_notice_embedded_total = this.embedded_total;
    const pause_btn = { text: "Pause", callback: this.halt_embed_queue_processing.bind(this), stay_open: true };
    this.notices?.show(
      "embedding_progress",
      [
        `Making Smart Connections...`,
        `Embedding progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
      ],
      {
        timeout: 0,
        button: pause_btn
      }
    );
  }
  /**
   * Displays the embedding completion notice.
   * @private
   * @returns {void}
   */
  _show_embed_completion_notice() {
    this.notices?.remove("embedding_progress");
    this.notices?.show("embedding_complete", [
      `Embedding complete.`,
      `${this.embedded_total} entities embedded.`,
      `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
    ], { timeout: 1e4 });
  }
  /**
   * Calculates the number of tokens processed per second.
   * @private
   * @returns {number} Tokens per second.
   */
  _calculate_embed_tokens_per_second() {
    const elapsed_time = this.total_time / 1e3;
    return Math.round(this.total_tokens / elapsed_time);
  }
  /**
   * Handles the completion of the embed queue processing.
   * @private
   * @returns {void}
   */
  _embed_queue_complete() {
    this.is_processing_queue = false;
    if (this.completed_embed_queue_timeout) clearTimeout(this.completed_embed_queue_timeout);
    this.completed_embed_queue_timeout = setTimeout(() => {
      this._show_embed_completion_notice();
      this._reset_embed_queue_stats();
      this.env.save();
    }, 3e3);
  }
  /**
   * Resets the statistics related to embed queue processing.
   * @private
   * @returns {void}
   */
  _reset_embed_queue_stats() {
    this.embedded_total = 0;
    this.queue_total = 0;
    this.total_tokens = 0;
    this.total_time = 0;
    this.last_notice_embedded_total = 0;
    this.is_processing_queue = false;
    this.is_queue_halted = false;
  }
  /**
   * Halts the embed queue processing.
   * @returns {void}
   */
  halt_embed_queue_processing(msg = null) {
    this.is_queue_halted = true;
    console.log("Embed queue processing halted");
    this.notices?.remove("embedding_progress");
    this.notices?.show(
      "embedding_paused",
      [
        msg || `Embedding paused.`,
        `Progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
      ],
      {
        timeout: 0,
        button: { text: "Resume", callback: () => this.resume_embed_queue_processing(100) }
      }
    );
    this.env.save();
  }
  /**
   * Resumes the embed queue processing after a delay.
   * @param {number} [delay=0] - The delay in milliseconds before resuming.
   * @returns {void}
   */
  resume_embed_queue_processing(delay = 0) {
    console.log("resume_embed_queue_processing");
    this.is_queue_halted = false;
    this.notices?.remove("embedding_paused");
    setTimeout(() => {
      this.embedded_total = 0;
      this.process_embed_queue();
    }, delay);
  }
  /**
   * Handles changes to the embedding model by reinitializing and processing the load queue.
   * @async
   * @returns {Promise<void>}
   */
  async embed_model_changed() {
    await this.unload();
    await this.init();
    this.render_settings();
    await this.process_load_queue();
  }
  async render_lookup(container, opts = {}) {
    if (container) container.innerHTML = "Loading lookup...";
    const frag = await this.env.render_component("lookup", this, opts);
    if (container) {
      container.innerHTML = "";
      container.appendChild(frag);
    }
    return frag;
  }
  get connections_filter_config() {
    return connections_filter_config;
  }
};
var settings_config = {
  "min_chars": {
    name: "Minimum length of entity to embed",
    type: "number",
    description: "Minimum length of entity to embed.",
    placeholder: "Enter number ex. 300",
    default: 300
  }
};
var connections_filter_config = {
  "smart_view_filter.show_full_path": {
    "name": "Show Full Path",
    "type": "toggle",
    "description": "Show full path in view.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.render_markdown": {
    "name": "Render Markdown",
    "type": "toggle",
    "description": "Render markdown in results.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.results_limit": {
    "name": "Results Limit",
    "type": "number",
    "description": "Limit the number of results.",
    "default": 20,
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.exclude_inlinks": {
    "name": "Exclude Inlinks",
    "type": "toggle",
    "description": "Exclude inlinks.",
    "callback": "refresh_smart_view_filter"
  },
  "smart_view_filter.exclude_outlinks": {
    "name": "Exclude Outlinks",
    "type": "toggle",
    "description": "Exclude outlinks.",
    "callback": "refresh_smart_view_filter"
  },
  "smart_view_filter.include_filter": {
    "name": "Include Filter",
    "type": "text",
    "description": "Require that results match this value.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.exclude_filter": {
    "name": "Exclude Filter",
    "type": "text",
    "description": "Exclude results that match this value.",
    "callback": "refresh_smart_view"
  }
};

// node_modules/smart-sources/components/source.js
async function render4(scope, opts = {}) {
  const markdown = await get_markdown2(scope);
  let frag;
  if (scope.env.settings.smart_view_filter.render_markdown) frag = await this.render_markdown(markdown, scope);
  else frag = this.create_doc_fragment(`<span>${markdown}</span>`);
  return await post_process4.call(this, scope, frag, opts);
}
async function get_markdown2(scope) {
  return should_render_embed2(scope) ? scope.embed_link : (await scope.get_content())?.replace(/```dataview/g, "```\\dataview");
}
async function post_process4(scope, frag, opts = {}) {
  return frag;
}
function should_render_embed2(entity) {
  if (!entity) return false;
  if (entity.is_canvas || entity?.source?.is_canvas) return true;
  if (entity.is_excalidraw || entity?.source?.is_excalidraw) return true;
  if (entity.file_type !== "md") return true;
  return false;
}

// node_modules/smart-sources/utils/create_hash.js
async function create_hash(text) {
  if (text.length > 1e5) text = text.substring(0, 1e5);
  const msgUint8 = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// node_modules/smart-sources/smart_source.js
var SmartSource = class extends SmartEntity {
  /**
   * Provides default values for a SmartSource instance.
   * @static
   * @readonly
   * @returns {Object} The default values.
   */
  static get defaults() {
    return {
      data: {
        history: []
        // Array of { mtime, hash, length, blocks[] }
      },
      _embed_input: null,
      // Stored temporarily
      _queue_load: true
    };
  }
  /**
   * Initializes the SmartSource instance by queuing an import if blocks are missing.
   * @returns {void}
   */
  init() {
    super.init();
    if (!this.data.blocks) this.queue_import();
  }
  /**
   * Queues the SmartSource for import.
   * @returns {void}
   */
  queue_import() {
    this._queue_import = true;
  }
  /**
   * Imports the SmartSource by checking for updates and parsing content.
   * @async
   * @returns {Promise<void>}
   */
  async import() {
    this._queue_import = false;
    try {
      const stat = this.file.stat;
      if (stat.error) throw stat.error;
      if (this.file_type === "md" && stat.size > 1e6) {
        console.log(`Smart Connections: Skipping large file: ${this.path}`);
        return;
      }
      if (await this.data_fs.exists(this.data_path)) {
        if (this.loaded_at && (this.env.fs.files[this.data_path] && this.env.fs.files[this.data_path].mtime > this.loaded_at + 1 * 60 * 1e3)) {
          console.log(`Smart Connections: Re-loading data source for ${this.path} because it has been updated on disk`);
          return await this.load();
        }
      }
      if (this.meta_changed) {
        this.data.blocks = null;
        await this.save(super.ajson);
        this.data.mtime = stat.mtime;
        this.data.size = stat.size;
        await this.source_adapter.import();
        this.loaded_at = Date.now();
        this.queue_embed();
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log(`Smart Connections: Deleting ${this.path} data because it no longer exists on disk`);
        this.delete();
      } else {
        console.warn("Smart Connections: Error during import: re-queueing import", err);
        this.queue_import();
      }
    }
  }
  /**
   * Finds connections relevant to this SmartSource based on provided parameters.
   * @param {Object} [params={}] - Parameters for finding connections.
   * @param {boolean} [params.exclude_source_connections=false] - Whether to exclude source connections.
   * @param {boolean} [params.exclude_blocks_from_source_connections=false] - Whether to exclude block connections from source connections.
   * @returns {Array<SmartSource>} An array of relevant SmartSource entities.
   */
  find_connections(params = {}) {
    let connections;
    if (this.block_collection.settings.embed_blocks && params.exclude_source_connections) connections = [];
    else connections = super.find_connections(params);
    const filter_opts = this.prepare_find_connections_filter_opts(params);
    const limit = params.filter?.limit || params.limit || this.env.settings.smart_view_filter?.results_limit || 20;
    if (params.filter?.limit) delete params.filter.limit;
    if (params.limit) delete params.limit;
    if (!params.exclude_blocks_from_source_connections) {
      const cache_key = this.key + JSON.stringify(params) + "_blocks";
      if (!this.env.connections_cache) this.env.connections_cache = {};
      if (!this.env.connections_cache[cache_key]) {
        const nearest = this.env.smart_blocks.nearest(this.vec, filter_opts).sort(sort_by_score).slice(0, limit);
        this.connections_to_cache(cache_key, nearest);
      }
      connections = [
        ...connections,
        ...this.connections_from_cache(cache_key)
      ].sort(sort_by_score).slice(0, limit);
    }
    return connections;
  }
  /**
   * Prepares the embed input for the SmartSource by reading content and applying exclusions.
   * @async
   * @returns {Promise<string|false>} The embed input string or `false` if already embedded.
   */
  async get_embed_input() {
    if (typeof this._embed_input === "string" && this._embed_input.length) return this._embed_input;
    let content = await this.read();
    if (this.excluded_lines.length) {
      const content_lines = content.split("\n");
      this.excluded_lines.forEach((lines) => {
        const { start, end } = lines;
        for (let i = start; i <= end; i++) {
          content_lines[i] = "";
        }
      });
      content = content_lines.filter((line) => line.length).join("\n");
    }
    const breadcrumbs = this.path.split("/").join(" > ").replace(".md", "");
    const max_tokens = this.collection.embed_model.model_config.max_tokens || 500;
    this._embed_input = `${breadcrumbs}:
${content}`.substring(0, max_tokens * 4);
    return this._embed_input;
  }
  /**
   * Opens the SmartSource note in the SmartConnections plugin.
   * @returns {void}
   */
  open() {
    this.env.smart_connections_plugin.open_note(this.path);
  }
  /**
   * Retrieves the block associated with a specific line number.
   * @param {number} line - The line number to search for.
   * @returns {SmartBlock|null} The corresponding SmartBlock or `null` if not found.
   */
  get_block_by_line(line) {
    return Object.entries(this.data.blocks || {}).reduce((acc, [sub_key, range]) => {
      if (acc) return acc;
      if (range[0] <= line && range[1] >= line) {
        const block = this.block_collection.get(this.key + sub_key);
        if (block?.vec) return block;
      }
      return acc;
    }, null);
  }
  /**
   * Checks if the source file exists in the file system.
   * @async
   * @returns {Promise<boolean>} A promise that resolves to `true` if the file exists, `false` otherwise.
   */
  async has_source_file() {
    return await this.fs.exists(this.path);
  }
  // CRUD
  /**
   * FILTER/SEARCH METHODS
   */
  /**
   * Searches for keywords within the entity's data and content.
   * @async
   * @param {Object} search_filter - The search filter object.
   * @param {string[]} search_filter.keywords - An array of keywords to search for.
   * @param {string} [search_filter.type='any'] - The type of search to perform. 'any' counts all matching keywords, 'all' counts only if all keywords match.
   * @returns {Promise<number>} A promise that resolves to the number of matching keywords.
   */
  async search(search_filter = {}) {
    const { keywords, type = "any", limit } = search_filter;
    if (!keywords || !Array.isArray(keywords)) {
      console.warn("Entity.search: keywords not set or is not an array");
      return 0;
    }
    if (limit && this.collection.search_results_ct >= limit) return 0;
    const lowercased_keywords = keywords.map((keyword) => keyword.toLowerCase());
    const content = await this.read();
    const lowercased_content = content.toLowerCase();
    const lowercased_path = this.path.toLowerCase();
    const matching_keywords = lowercased_keywords.filter(
      (keyword) => lowercased_path.includes(keyword) || lowercased_content.includes(keyword)
    );
    if (type === "all") {
      return matching_keywords.length === lowercased_keywords.length ? matching_keywords.length : 0;
    } else {
      return matching_keywords.length;
    }
  }
  /**
   * ADAPTER METHODS
   */
  /**
   * Appends content to the end of the source file.
   * @async
   * @param {string} content - The content to append to the file.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async append(content) {
    await this.source_adapter.append(content);
    await this.import();
  }
  /**
   * Updates the entire content of the source file.
   * @async
   * @param {string} full_content - The new content to write to the file.
   * @param {Object} [opts={}] - Additional options for the update.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async update(full_content, opts = {}) {
    try {
      await this.source_adapter.update(full_content, opts);
      await this.import();
    } catch (error) {
      console.error("Error during update:", error);
      throw error;
    }
  }
  /**
   * @async
   * @deprecated Use `update` instead.
   * @param {string} content - The content to update.
   * @returns {Promise<void>}
   */
  async _update(content) {
    await this.source_adapter._update(content);
  }
  /**
   * Reads the entire content of the source file.
   * @async
   * @param {Object} [opts={}] - Additional options for reading.
   * @returns {Promise<string>} A promise that resolves with the content of the file.
   */
  async read(opts = {}) {
    try {
      const content = await this.source_adapter.read(opts);
      return content;
    } catch (error) {
      console.error("Error during read:", error);
      throw error;
    }
  }
  /**
   * @async
   * @deprecated Use `read` instead.
   * @returns {Promise<string>} A promise that resolves with the content of the file.
   */
  async _read() {
    return await this.source_adapter._read();
  }
  /**
   * Removes the source file from the file system and deletes the entity.
   * This is different from `delete()` because it also removes the source file.
   * @async
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async remove() {
    try {
      await this.source_adapter.remove();
    } catch (error) {
      console.error("Error during remove:", error);
      throw error;
    }
  }
  /**
   * @async
   * @deprecated Use `remove` instead.
   * @returns {Promise<void>} A promise that resolves when the entity is destroyed.
   */
  async destroy() {
    await this.remove();
  }
  /**
   * Moves the current source to a new location.
   * Handles the destination as a string (new path) or entity (block or source).
   * 
   * @async
   * @param {string|Object|SmartEntity} entity_ref - The destination path or entity to move to.
   * @throws {Error} If the entity reference is invalid.
   * @returns {Promise<void>} A promise that resolves when the move operation is complete.
   */
  async move_to(entity_ref) {
    try {
      await this.source_adapter.move_to(entity_ref);
    } catch (error) {
      console.error("error_during_move:", error);
      throw error;
    }
  }
  /**
   * Merges the given content into the current source.
   * Parses the content into blocks and either appends to existing blocks, replaces blocks, or replaces all content.
   * 
   * @async
   * @param {string} content - The content to merge into the current source.
   * @param {Object} [opts={}] - Options object.
   * @param {string} [opts.mode='append'] - The merge mode: 'append', 'replace_blocks', or 'replace_all'.
   * @returns {Promise<void>}
   */
  async merge(content, opts = {}) {
    try {
      await this.source_adapter.merge(content, opts);
      await this.import();
    } catch (error) {
      console.error("Error during merge:", error);
      throw error;
    }
  }
  /**
   * Saves the SmartSource and its blocks by processing the save queue.
   * @async
   * @returns {Promise<void>}
   */
  async save() {
    if (this.deleted) return await super.save(super.ajson);
    const blocks_to_save = this.blocks.filter((block) => block._queue_save);
    const ajson = [
      super.ajson,
      ...blocks_to_save.map((block) => block.ajson).filter((ajson2) => ajson2)
    ].join("\n");
    await super.save(ajson);
    blocks_to_save.forEach((block) => {
      block._queue_save = false;
      if (block.deleted && this.block_collection.items[block.key]) {
        this.block_collection.delete_item(block.key);
      }
    });
  }
  /**
   * Handles errors during the load process.
   * @param {Error} err - The error encountered during load.
   * @returns {void}
   */
  on_load_error(err) {
    super.on_load_error(err);
    if (err.code === "ENOENT") {
      this._queue_load = false;
      this.queue_import();
    }
  }
  // GETTERS
  /**
   * Retrieves the block collection associated with SmartSources.
   * @readonly
   * @returns {SmartBlocks} The block collection instance.
   */
  get block_collection() {
    return this.env.smart_blocks;
  }
  /**
   * Retrieves the vector representations of all blocks within the SmartSource.
   * @readonly
   * @returns {Array<Array<number>>} An array of vectors.
   */
  get block_vecs() {
    return this.blocks.map((block) => block.vec).filter((vec) => vec);
  }
  // Filter out blocks without vec
  /**
   * Retrieves all blocks associated with the SmartSource.
   * @readonly
   * @returns {Array<SmartBlock>} An array of SmartBlock instances.
   */
  get blocks() {
    if (this.data.blocks) return this.block_collection.get_many(Object.keys(this.data.blocks).map((key) => this.key + key));
    else if (this.last_history) return this.block_collection.get_many(Object.keys(this.last_history.blocks));
    return [];
  }
  /**
   * @deprecated Only for backwards compatibility in `this.blocks` (2024-09-30).
   * @readonly
   * @returns {Object|null} The last history entry or null if none.
   */
  get last_history() {
    return this.data.history?.length ? this.data.history[this.data.history.length - 1] : null;
  }
  /**
   * Retrieves the data path for the SmartSource.
   * @readonly
   * @returns {string} The data path.
   */
  get data_path() {
    return this.collection.data_dir + "/" + this.multi_ajson_file_name + ".ajson";
  }
  /**
   * Retrieves the data file associated with the SmartSource.
   * @readonly
   * @returns {Object} The data file object.
   */
  get data_file() {
    return this.data_fs.files[this.data_path];
  }
  /**
   * Retrieves the embed input, either from cache or by generating it.
   * @readonly
   * @returns {string|Promise<string>} The embed input string or a promise resolving to it.
   */
  get embed_input() {
    return this._embed_input ? this._embed_input : this.get_embed_input();
  }
  /**
   * Determines if the SmartSource is excluded from processing.
   * @readonly
   * @returns {boolean} `true` if excluded, `false` otherwise.
   */
  get excluded() {
    return this.fs.is_excluded(this.path);
  }
  /**
   * Retrieves the lines excluded from embedding.
   * @readonly
   * @returns {Array<Object>} An array of objects with `start` and `end` line numbers.
   */
  get excluded_lines() {
    return this.blocks.filter((block) => block.excluded).map((block) => block.lines);
  }
  /**
   * Retrieves the file object associated with the SmartSource.
   * @readonly
   * @returns {Object} The file object.
   */
  get file() {
    return this.fs.files[this.path];
  }
  /**
   * Retrieves the file name of the SmartSource.
   * @readonly
   * @returns {string} The file name.
   */
  get file_name() {
    return this.path.split("/").pop();
  }
  /**
   * Retrieves the file path of the SmartSource.
   * @readonly
   * @returns {string} The file path.
   */
  get file_path() {
    return this.path;
  }
  /**
   * Retrieves the file type based on the file extension.
   * @readonly
   * @returns {string} The file type in lowercase.
   */
  get file_type() {
    return this.data.path?.split(".").pop().toLowerCase() || this.source_adapters.default.extension;
  }
  /**
   * Retrieves the file system instance from the SmartSource's collection.
   * @readonly
   * @returns {SmartFS} The file system instance.
   */
  get fs() {
    return this.collection.fs;
  }
  /**
   * Retrieves the hash of the SmartSource.
   * @readonly
   * @returns {string|undefined} The hash value or `undefined` if not set.
   */
  get hash() {
    return this.data?.hash;
  }
  /**
   * Retrieves the paths of inlinks to this SmartSource.
   * @readonly
   * @returns {Array<string>} An array of inlink paths.
   */
  get inlinks() {
    return Object.keys(this.env.links?.[this.path] || {});
  }
  /**
   * Determines if the SmartSource is a canvas file.
   * @readonly
   * @returns {boolean} `true` if the file is a canvas, `false` otherwise.
   */
  get is_canvas() {
    return this.path.endsWith("canvas");
  }
  /**
   * Determines if the SmartSource is an Excalidraw file.
   * @readonly
   * @returns {boolean} `true` if the file is Excalidraw, `false` otherwise.
   */
  get is_excalidraw() {
    return this.path.endsWith("excalidraw.md");
  }
  /**
   * Determines if the SmartSource is gone (i.e., the file no longer exists).
   * @readonly
   * @returns {boolean} `true` if gone, `false` otherwise.
   */
  get is_gone() {
    return !this.file;
  }
  /**
   * Retrieves the last read hash of the SmartSource.
   * @readonly
   * @returns {string|undefined} The last read hash or `undefined` if not set.
   */
  get last_read_hash() {
    return this.data?.last_read_hash;
  }
  /**
   * Determines if the SmartSource has changed based on metadata.
   * @readonly
   * @returns {boolean} `true` if metadata has changed, `false` otherwise.
   */
  get meta_changed() {
    try {
      if (!this.file) return true;
      if (this.last_read_hash !== this.hash) return true;
      if (!this.mtime || this.mtime < this.file.stat.mtime) {
        if (!this.size) return true;
        const size_diff = Math.abs(this.size - this.file.stat.size);
        const size_diff_ratio = size_diff / (this.size || 1);
        if (size_diff_ratio > 0.01) return true;
      }
      return false;
    } catch (e) {
      console.warn("error getting meta changed for ", this.path, ": ", e);
      return true;
    }
  }
  /**
   * Retrieves the modification time of the SmartSource.
   * @readonly
   * @returns {number} The modification time.
   */
  get mtime() {
    return this.data.mtime || 0;
  }
  /**
   * Retrieves the multi AJSON file name derived from the path.
   * @readonly
   * @returns {string} The multi AJSON file name.
   */
  get multi_ajson_file_name() {
    return this.path.split("#").shift().replace(/[\s\/\.]/g, "_").replace(".md", "");
  }
  /**
   * Retrieves the display name of the SmartSource.
   * @readonly
   * @returns {string} The display name.
   */
  get name() {
    if (this.should_show_full_path) return this.path.split("/").join(" > ").replace(".md", "");
    return this.path.split("/").pop().replace(".md", "");
  }
  /**
   * Retrieves the outlink paths from the SmartSource.
   * @readonly
   * @returns {Array<string>} An array of outlink paths.
   */
  get outlink_paths() {
    return (this.data.outlinks || []).filter((link) => !link.target.startsWith("http")).map((link) => {
      const link_path = this.fs.get_link_target_path(link.target, this.file_path);
      return link_path;
    }).filter((link_path) => link_path);
  }
  get path() {
    return this.data.path;
  }
  get size() {
    return this.data.size || 0;
  }
  get smart_change_adapter() {
    return this.env.settings.is_obsidian_vault ? "obsidian_markdown" : "markdown";
  }
  get source_adapters() {
    return this.collection.source_adapters;
  }
  get source_adapter() {
    if (this._source_adapter) return this._source_adapter;
    if (this.source_adapters[this.file_type]) this._source_adapter = new this.source_adapters[this.file_type](this);
    else this._source_adapter = new this.source_adapters["default"](this);
    return this._source_adapter;
  }
  // COMPONENTS
  /**
   * Retrieves the component responsible for rendering the SmartSource.
   * @readonly
   * @returns {Function} The render function for the source component.
   */
  get component() {
    return render4;
  }
  // Currently unused, but useful for later
  /**
   * Calculates the mean vector of all blocks within the SmartSource.
   * @readonly
   * @returns {Array<number>|null} The mean vector or `null` if no vectors are present.
   */
  get mean_block_vec() {
    return this._mean_block_vec ? this._mean_block_vec : this._mean_block_vec = this.block_vecs.reduce((acc, vec) => acc.map((val, i) => val + vec[i]), Array(384).fill(0)).map((val) => val / this.block_vecs.length);
  }
  /**
   * Calculates the median vector of all blocks within the SmartSource.
   * @readonly
   * @returns {Array<number>|null} The median vector or `null` if no vectors are present.
   */
  get median_block_vec() {
    if (this._median_block_vec) return this._median_block_vec;
    if (!this.block_vecs.length) return null;
    const vec_length = this.block_vecs[0].length;
    this._median_block_vec = new Array(vec_length);
    const mid = Math.floor(this.block_vecs.length / 2);
    for (let i = 0; i < vec_length; i++) {
      const values = this.block_vecs.map((vec) => vec[i]).sort((a, b) => a - b);
      this._median_block_vec[i] = this.block_vecs.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    }
    return this._median_block_vec;
  }
  // DEPRECATED methods
  /**
   * @async
   * @deprecated Use `read` instead.
   * @returns {Promise<string>} A promise that resolves with the content of the block or "BLOCK NOT FOUND".
   */
  async get_content() {
    return await this.read() || "BLOCK NOT FOUND";
  }
  /**
   * @deprecated Use `source` instead.
   * @readonly
   * @returns {SmartSource} The associated SmartSource instance.
   */
  get t_file() {
    return this.fs.files[this.path];
  }
};

// node_modules/smart-sources/smart_sources.js
var SmartSources = class extends SmartEntities {
  /**
   * Creates an instance of SmartSources.
   * @constructor
   * @param {Object} env - The environment instance.
   * @param {Object} [opts={}] - Configuration options.
   */
  constructor(env, opts = {}) {
    super(env, opts);
    this.search_results_ct = 0;
    this._excluded_headings = null;
  }
  /**
   * Initializes the SmartSources instance by performing an initial scan of sources.
   * @async
   * @returns {Promise<void>}
   */
  async init() {
    await super.init();
    this.notices?.show("initial scan", "Starting initial scan...", { timeout: 0 });
    await this.init_items();
    this.notices?.remove("initial scan");
    this.notices?.show("done initial scan", "Initial scan complete", { timeout: 3e3 });
  }
  /**
   * Initializes items by setting up the file system and loading sources.
   * @async
   * @returns {Promise<void>}
   */
  async init_items() {
    this._fs = null;
    await this.fs.init();
    Object.values(this.fs.files).filter((file) => this.source_adapters[file.extension]).forEach((file) => this.init_file_path(file.path));
    this.notices?.remove("initial scan");
    this.notices?.show("done initial scan", "Initial scan complete", { timeout: 3e3 });
  }
  /**
   * Initializes a file path by creating a new SmartSource instance.
   * @param {string} file_path - The path of the file to initialize.
   * @returns {SmartSource} The initialized SmartSource instance.
   */
  init_file_path(file_path) {
    return this.items[file_path] = new this.item_type(this.env, { path: file_path });
  }
  /**
   * Removes old data files by pruning sources and blocks.
   * @async
   * @returns {Promise<void>}
   */
  async prune() {
    await this.fs.refresh();
    this.notices?.show("pruning sources", "Pruning sources...", { timeout: 0 });
    const remove_sources = Object.values(this.items).filter((item) => item.is_gone || item.excluded || !item.should_embed || !item.data.blocks);
    for (let i = 0; i < remove_sources.length; i++) {
      const source = remove_sources[i];
      await this.data_fs.remove(source.data_path);
      source.delete();
    }
    await this.process_save_queue();
    Object.values(this.items).forEach((item) => {
      if (item.data?.history?.length) item.data.history = null;
      item.queue_save();
    });
    this.notices?.remove("pruning sources");
    this.notices?.show("pruned sources", `Pruned ${remove_sources.length} sources`, { timeout: 5e3 });
    this.notices?.show("pruning blocks", "Pruning blocks...", { timeout: 0 });
    const remove_smart_blocks = Object.values(this.block_collection.items).filter((item) => {
      if (!item.vec) return false;
      if (item.is_gone) {
        item.reason = "is_gone";
        return true;
      }
      if (!item.should_embed) {
        item.reason = "!should_embed";
        return true;
      }
      if (!item.data?.hash) {
        item.reason = "!data.hash";
        return true;
      }
      return false;
    });
    for (let i = 0; i < remove_smart_blocks.length; i++) {
      const item = remove_smart_blocks[i];
      if (item.is_gone) item.delete();
      else item.remove_embeddings();
    }
    this.notices?.remove("pruning blocks");
    this.notices?.show("pruned blocks", `Pruned ${remove_smart_blocks.length} blocks`, { timeout: 5e3 });
    console.log(`Pruned ${remove_smart_blocks.length} blocks:
${remove_smart_blocks.map((item) => `${item.reason} - ${item.key}`).join("\n")}`);
    await this.process_save_queue();
    const items_w_vec = Object.values(this.items).filter((item) => item.vec);
    for (const item of items_w_vec) {
      if (item.meta_changed) item.queue_import();
      else if (item.is_unembedded) item.queue_embed();
    }
  }
  /**
   * Builds a map of links between sources.
   * @returns {Object} An object mapping link paths to source keys.
   */
  build_links_map() {
    const links_map = {};
    for (const source of Object.values(this.items)) {
      for (const link of source.outlink_paths) {
        if (!links_map[link]) links_map[link] = {};
        links_map[link][source.key] = true;
      }
    }
    return links_map;
  }
  /**
   * Refreshes the SmartSources by pruning, importing, and processing embed queues.
   * @async
   * @returns {Promise<void>}
   */
  async refresh() {
    await this.prune();
    await this.process_import_queue();
    await this.env.smart_blocks.process_embed_queue();
    await this.process_embed_queue();
  }
  /**
   * Creates a new source with the given key and content.
   * @async
   * @param {string} key - The key (path) of the new source.
   * @param {string} content - The content to write to the new source.
   * @returns {Promise<SmartSource>} The created SmartSource instance.
   */
  async create(key, content) {
    await this.fs.write(key, content);
    await this.fs.refresh();
    const source = await this.create_or_update({ path: key });
    await source.import();
    return source;
  }
  /**
   * Performs a lexical search for matching SmartSource content.
   * @async
   * @param {Object} search_filter - The filter criteria for the search.
   * @param {string[]} search_filter.keywords - An array of keywords to search for.
   * @param {number} [search_filter.limit] - The maximum number of results to return.
   * @returns {Promise<Array<SmartSource>>} A promise that resolves to an array of matching SmartSource entities.
   */
  async search(search_filter = {}) {
    const {
      keywords,
      limit,
      ...filter_opts
    } = search_filter;
    if (!keywords) {
      console.warn("search_filter.keywords not set");
      return [];
    }
    this.search_results_ct = 0;
    const initial_results = this.filter(filter_opts);
    const search_results = [];
    for (let i = 0; i < initial_results.length; i += 10) {
      const batch = initial_results.slice(i, i + 10);
      const batch_results = await Promise.all(
        batch.map(async (item) => {
          try {
            const matches = await item.search(search_filter);
            if (matches) {
              this.search_results_ct++;
              return { item, score: matches };
            } else return null;
          } catch (error) {
            console.error(`Error searching item ${item.id || "unknown"}:`, error);
            return null;
          }
        })
      );
      search_results.push(...batch_results.filter(Boolean));
    }
    return search_results.sort((a, b) => b.score - a.score).map((result) => result.item);
  }
  /**
   * Looks up entities based on the provided parameters.
   * @async
   * @param {Object} [params={}] - Parameters for the lookup.
   * @param {Object} [params.filter] - Filter options.
   * @param {number} [params.k] - Deprecated. Use `params.filter.limit` instead.
   * @returns {Promise<Array<SmartSource>>} A promise that resolves to an array of matching SmartSource entities.
   */
  async lookup(params = {}) {
    const limit = params.filter?.limit || params.k || this.env.settings.lookup_k || 10;
    if (params.filter?.limit) delete params.filter.limit;
    let results = await super.lookup(params);
    if (this.env.smart_blocks?.settings?.embed_blocks) {
      results = [
        ...results,
        ...await this.block_collection.lookup(params)
      ].sort(sort_by_score);
    }
    return results.slice(0, limit);
  }
  /**
   * Imports a file by adding it to the file system and initializing the corresponding SmartSource.
   * @async
   * @param {Object} file - The file object to import.
   * @param {string} file.path - The path of the file.
   * @returns {Promise<void>}
   */
  async import_file(file) {
    this.fs.files[file.path] = file;
    this.fs.file_paths.push(file.path);
    const source = await this.create_or_update({ path: file.path });
    await source.import();
    await this.process_embed_queue();
    await this.process_save_queue();
  }
  /**
   * Processes the load queue by loading items and optionally importing them.
   * @async
   * @returns {Promise<void>}
   */
  async process_load_queue() {
    await super.process_load_queue();
    if (this.collection_key === "smart_sources") {
      Object.values(this.env.smart_blocks.items).forEach((item) => item.init());
    }
    this.block_collection.loaded = Object.keys(this.block_collection.items).length;
    if (!this.opts.prevent_import_on_load) {
      await this.process_import_queue();
    }
  }
  /**
   * Processes the import queue by importing queued items in batches.
   * @async
   * @returns {Promise<void>}
   */
  async process_import_queue() {
    const import_queue = Object.values(this.items).filter((item) => item._queue_import);
    console.log("import_queue " + import_queue.length);
    if (import_queue.length) {
      const time_start = Date.now();
      for (let i = 0; i < import_queue.length; i += 100) {
        this.notices?.show("import progress", [`Importing...`, `Progress: ${i} / ${import_queue.length} files`], { timeout: 0 });
        await Promise.all(import_queue.slice(i, i + 100).map((item) => item.import()));
      }
      this.notices?.remove("import progress");
      this.notices?.show("done import", [`Processed import queue in ${Date.now() - time_start}ms`], { timeout: 3e3 });
    } else {
      this.notices?.show("no import queue", ["No items in import queue"]);
    }
    const start_time = Date.now();
    this.env.links = this.build_links_map();
    const end_time = Date.now();
    console.log(`Time spent building links: ${end_time - start_time}ms`);
    await this.process_embed_queue();
    await this.process_save_queue();
  }
  /**
   * Retrieves the source adapters based on the collection configuration.
   * @readonly
   * @returns {Object} An object mapping file extensions to adapter constructors.
   */
  get source_adapters() {
    if (!this._source_adapters) {
      this._source_adapters = {
        ...this.env.opts.collections?.[this.collection_key]?.source_adapters || {}
      };
      if (!this.settings?.enable_image_adapter) {
        delete this._source_adapters.png;
        delete this._source_adapters.jpg;
        delete this._source_adapters.jpeg;
      }
      if (!this.settings?.enable_pdf_adapter) {
        delete this._source_adapters.pdf;
      }
    }
    return this._source_adapters;
  }
  reset_source_adapters() {
    this._source_adapters = null;
    this.render_settings();
  }
  /**
   * Retrieves the notices system from the environment.
   * @readonly
   * @returns {Object} The notices object.
   */
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  /**
   * Retrieves the currently active note.
   * @readonly
   * @returns {SmartSource|null} The current SmartSource instance or null if none.
   */
  get current_note() {
    return this.get(this.env.smart_connections_plugin.app.workspace.getActiveFile().path);
  }
  /**
   * Retrieves the file system instance, initializing it if necessary.
   * @readonly
   * @returns {SmartFS} The file system instance.
   */
  get fs() {
    if (!this._fs) {
      this._fs = new this.env.opts.modules.smart_fs.class(this.env, {
        adapter: this.env.opts.modules.smart_fs.adapter,
        fs_path: this.env.opts.env_path || "",
        exclude_patterns: this.excluded_patterns || []
      });
    }
    return this._fs;
  }
  /**
   * Retrieves the settings configuration by combining superclass settings and adapter-specific settings.
   * @readonly
   * @returns {Object} The settings configuration object.
   */
  get settings_config() {
    const _settings_config = {
      ...super.settings_config,
      "enable_image_adapter": {
        "name": "Image Adapter",
        "description": "Enable image processing.",
        "type": "toggle",
        "default": false,
        "callback": "reset_source_adapters"
      },
      "enable_pdf_adapter": {
        "name": "PDF Adapter",
        "description": "Enable PDF processing.",
        "type": "toggle",
        "default": false,
        "callback": "reset_source_adapters"
      },
      ...this.process_settings_config(settings_config2),
      ...Object.entries(this.source_adapters).reduce((acc, [file_extension, adapter_constructor]) => {
        if (acc[adapter_constructor]) return acc;
        const item = this.items[Object.keys(this.items).find((i) => i.endsWith(file_extension))];
        const adapter_instance = new adapter_constructor(item || new this.item_type(this.env, {}));
        if (adapter_instance.settings_config) {
          acc[adapter_constructor.name] = {
            type: "html",
            value: `<h4>${adapter_constructor.name} adapter</h4>`
          };
          acc = { ...acc, ...adapter_instance.settings_config };
        }
        return acc;
      }, {})
    };
    if (!["png", "jpg", "jpeg"].some((ext) => this.env.opts.collections?.[this.collection_key]?.source_adapters?.[ext])) delete _settings_config.enable_image_adapter;
    if (!this.env.opts.collections?.[this.collection_key]?.source_adapters?.["pdf"]) delete _settings_config.enable_pdf_adapter;
    return _settings_config;
  }
  /**
   * Retrieves the block collection associated with SmartSources.
   * @readonly
   * @returns {SmartBlocks} The block collection instance.
   */
  get block_collection() {
    return this.env.smart_blocks;
  }
  /**
   * Retrieves the embed queue containing items and their blocks to be embedded.
   * @readonly
   * @returns {Array<Object>} The embed queue.
   */
  get embed_queue() {
    try {
      const embed_blocks = this.block_collection.settings.embed_blocks;
      return Object.values(this.items).reduce((acc, item) => {
        if (item._queue_embed) acc.push(item);
        if (embed_blocks) item.blocks.forEach((block) => {
          if (block._queue_embed && block.should_embed) acc.push(block);
        });
        return acc;
      }, []);
    } catch (e) {
      console.error(`Error getting embed queue: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  /**
   * Retrieves the SmartChange instance if enabled and active.
   * @readonly
   * @returns {SmartChange|undefined} The SmartChange instance or undefined if not enabled.
   */
  get smart_change() {
    if (!this.opts.smart_change) return;
    if (typeof this.settings?.smart_change?.active !== "undefined" && !this.settings.smart_change.active) return console.warn("smart_change disabled by settings");
    if (!this._smart_change) {
      this._smart_change = new this.opts.smart_change.class(this.opts.smart_change);
    }
    return this._smart_change;
  }
  /**
   * Runs the load process by invoking superclass methods and rendering settings.
   * @async
   * @returns {Promise<void>}
   */
  async run_load() {
    await super.run_load();
    this.block_collection.render_settings();
    this.render_settings();
  }
  /**
   * Runs the import process by queuing imports for changed items and processing the import queue.
   * @async
   * @returns {Promise<void>}
   */
  async run_import() {
    const start_time = Date.now();
    Object.values(this.items).forEach((item) => {
      if (item.meta_changed) item.queue_import();
    });
    await this.process_import_queue();
    const end_time = Date.now();
    console.log(`Time spent importing: ${end_time - start_time}ms`);
    this.render_settings();
    this.block_collection.render_settings();
  }
  /**
   * Runs the prune process to clean up sources and blocks.
   * @async
   * @returns {Promise<void>}
   */
  async run_prune() {
    await this.prune();
    await this.process_save_queue();
    this.render_settings();
    this.block_collection.render_settings();
  }
  /**
   * Clears all data by removing sources and blocks, reinitializing the file system, and reimporting items.
   * @async
   * @returns {Promise<void>}
   */
  async run_clear_all() {
    this.notices?.show("clearing all", "Clearing all data...", { timeout: 0 });
    this.clear();
    this.block_collection.clear();
    this._fs = null;
    await this.fs.init();
    await this.init_items();
    this._excluded_headings = null;
    Object.values(this.items).forEach((item) => {
      item.queue_import();
      item.queue_embed();
      item.loaded_at = Date.now() + 9999999999;
    });
    await this.process_import_queue();
    this.notices?.remove("clearing all");
    this.notices?.show("cleared all", "All data cleared and reimported", { timeout: 3e3 });
  }
  /**
   * Retrieves the patterns used to exclude files and folders from processing.
   * @readonly
   * @returns {Array<string>} An array of exclusion patterns.
   */
  get excluded_patterns() {
    return [
      ...this.file_exclusions?.map((file) => `${file}**`) || [],
      ...(this.folder_exclusions || []).map((folder) => `${folder}**`),
      this.env.env_data_dir + "/**"
    ];
  }
  /**
   * Retrieves the file exclusion patterns from settings.
   * @readonly
   * @returns {Array<string>} An array of file exclusion patterns.
   */
  get file_exclusions() {
    return this.env.settings?.file_exclusions?.length ? this.env.settings.file_exclusions.split(",").map((file) => file.trim()) : [];
  }
  /**
   * Retrieves the folder exclusion patterns from settings.
   * @readonly
   * @returns {Array<string>} An array of folder exclusion patterns.
   */
  get folder_exclusions() {
    return this.env.settings?.folder_exclusions?.length ? this.env.settings.folder_exclusions.split(",").map((folder) => {
      folder = folder.trim();
      if (folder.slice(-1) !== "/") return folder + "/";
      return folder;
    }) : [];
  }
  /**
   * Retrieves the excluded headings from settings.
   * @readonly
   * @returns {Array<string>} An array of excluded headings.
   */
  get excluded_headings() {
    if (!this._excluded_headings) {
      this._excluded_headings = this.env.settings?.excluded_headings?.length ? this.env.settings.excluded_headings.split(",").map((heading) => heading.trim()) : [];
    }
    return this._excluded_headings;
  }
  /**
   * Retrieves the count of included files that are not excluded.
   * @readonly
   * @returns {number} The number of included files.
   */
  get included_files() {
    return this.fs.file_paths.filter((file) => file.endsWith(".md") || file.endsWith(".canvas")).filter((file) => !this.fs.is_excluded(file)).length;
  }
  /**
   * Retrieves the total number of files, regardless of exclusion.
   * @readonly
   * @returns {number} The total number of files.
   */
  get total_files() {
    return this.env.fs.file_paths.filter((file) => file.endsWith(".md") || file.endsWith(".canvas")).length;
  }
};
var settings_config2 = {
  "smart_change.active": {
    "name": "Smart Change (change safety)",
    "description": "Enable Smart Changes (prevents accidental deletions/overwrites).",
    "type": "toggle",
    "default": true
  }
};

// node_modules/smart-sources/smart_block.js
var SmartBlock = class extends SmartEntity {
  /**
   * Provides default values for a SmartBlock instance.
   * @static
   * @readonly
   * @returns {Object} The default values.
   */
  static get defaults() {
    return {
      data: {
        text: null,
        length: 0
      },
      _embed_input: ""
      // Stored temporarily
    };
  }
  /**
   * Initializes the SmartBlock instance by queuing an embed if embedding is enabled.
   * @returns {void}
   */
  init() {
    if (this.settings.embed_blocks) super.init();
  }
  /**
   * Queues the block for saving via the source.
   * @returns {void}
   */
  queue_save() {
    this._queue_save = true;
    this.source?.queue_save();
  }
  /**
   * Queues the block for import via the source.
   * @returns {void}
   */
  queue_import() {
    this.source?.queue_import();
  }
  /**
   * Updates the block's data, clearing embeddings if necessary and preparing embed input.
   * @param {Object} data - The new data to merge into the block.
   * @returns {boolean} `true` if data was updated successfully.
   */
  update_data(data) {
    if (this.should_clear_embeddings(data)) this.data.embeddings = {};
    if (!this.vec) this._embed_input += data.text;
    delete data.text;
    super.update_data(data);
    return true;
  }
  /**
   * Determines whether to clear embeddings based on the new data.
   * @param {Object} data - The new data to evaluate.
   * @returns {boolean} `true` if embeddings should be cleared, `false` otherwise.
   */
  should_clear_embeddings(data) {
    if (this.is_new) return true;
    if (this.embed_model && this.embed_model_key !== "None" && this.vec?.length !== this.embed_model.dims) return true;
    if (this.data.length !== data.length) return true;
    return false;
  }
  /**
   * Prepares the embed input for the SmartBlock by reading content and generating a hash.
   * @async
   * @returns {Promise<string|false>} The embed input string or `false` if already embedded.
   */
  async get_embed_input() {
    if (typeof this._embed_input !== "string" || !this._embed_input.length) {
      this._embed_input = this.breadcrumbs + "\n" + await this.read();
    }
    if (this.vec) {
      const hash = await create_hash(this._embed_input);
      if (hash === this.hash) return false;
    }
    return this._embed_input;
  }
  // CRUD
  /**
   * Reads the content of the block.
   * @async
   * @param {Object} [opts={}] - Additional options for reading.
   * @returns {Promise<string>} A promise that resolves with the content of the block.
   */
  async read(opts = {}) {
    return await this.source_adapter.block_read(opts);
  }
  /**
   * Appends content to the block.
   * @async
   * @param {string} append_content - The content to append to the block.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async append(append_content) {
    await this.source_adapter.block_append(append_content);
  }
  /**
   * Updates the block with new content.
   * @async
   * @param {string} new_block_content - The new content for the block.
   * @param {Object} [opts={}] - Additional options for the update.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async update(new_block_content, opts = {}) {
    await this.source_adapter.block_update(new_block_content, opts);
  }
  /**
   * Removes the block from the source.
   * @async
   * @returns {Promise<void>} A promise that resolves when the block is removed.
   */
  async remove() {
    await this.source_adapter.block_remove();
  }
  /**
   * Moves the block to a new location.
   * @async
   * @param {string} to_key - The destination key (path) to move the block to.
   * @returns {Promise<void>} A promise that resolves when the block is moved.
   */
  async move_to(to_key) {
    try {
      await this.source_adapter.block_move_to(to_key);
    } catch (error) {
      console.error("error_during_block_move:", error);
      throw error;
    }
  }
  // Getters
  /**
   * Retrieves the breadcrumbs representing the block's path within the source.
   * @readonly
   * @returns {string} The breadcrumbs string.
   */
  get breadcrumbs() {
    return this.key.split("/").join(" > ").split("#").slice(0, -1).join(" > ").replace(".md", "");
  }
  /**
   * Determines if the block is excluded from embedding based on headings.
   * @readonly
   * @returns {boolean} `true` if excluded, `false` otherwise.
   */
  get excluded() {
    const block_headings = this.path.split("#").slice(1);
    if (this.source_collection.excluded_headings.some((heading) => block_headings.includes(heading))) return true;
    return this.source.excluded;
  }
  /**
   * Retrieves the file path of the SmartSource associated with the block.
   * @readonly
   * @returns {string} The file path.
   */
  get file_path() {
    return this.source?.file_path;
  }
  /**
   * Retrieves the file type of the SmartSource associated with the block.
   * @readonly
   * @returns {string} The file type.
   */
  get file_type() {
    return this.source.file_type;
  }
  /**
   * Retrieves the folder path of the block.
   * @readonly
   * @returns {string} The folder path.
   */
  get folder() {
    return this.path.split("/").slice(0, -1).join("/");
  }
  /**
   * Retrieves the embed link for the block.
   * @readonly
   * @returns {string} The embed link.
   */
  get embed_link() {
    return `![[${this.link}]]`;
  }
  /**
   * Retrieves the embed input, either from cache or by generating it.
   * @readonly
   * @returns {string|Promise<string>} The embed input string or a promise resolving to it.
   */
  get embed_input() {
    return this._embed_input ? this._embed_input : this.get_embed_input();
  }
  /**
   * Determines if the block has valid line range information.
   * @readonly
   * @returns {boolean} `true` if the block has both start and end lines, `false` otherwise.
   */
  get has_lines() {
    return this.lines && this.lines.length === 2;
  }
  /**
   * Determines if the entity is a block based on its key.
   * @readonly
   * @returns {boolean} `true` if it's a block, `false` otherwise.
   */
  get is_block() {
    return this.key.includes("#");
  }
  /**
   * Determines if the block is gone (i.e., the source file or block data no longer exists).
   * @readonly
   * @returns {boolean} `true` if gone, `false` otherwise.
   */
  get is_gone() {
    if (!this.source?.file) return true;
    if (!this.source?.data?.blocks?.[this.sub_key]) return true;
    return false;
  }
  /**
   * Determines if the block is unembedded based on exclusion and embedding status.
   * @readonly
   * @returns {boolean} `true` if unembedded, `false` otherwise.
   */
  get is_unembedded() {
    if (this.excluded) return false;
    return super.is_unembedded;
  }
  /**
   * Retrieves the sub-key of the block.
   * @readonly
   * @returns {string} The sub-key.
   */
  get sub_key() {
    return "#" + this.key.split("#").slice(1).join("#");
  }
  /**
   * Retrieves the lines range of the block.
   * @readonly
   * @returns {Array<number>|undefined} An array containing the start and end lines or `undefined` if not set.
   */
  get lines() {
    return this.source?.data?.blocks?.[this.sub_key];
  }
  /**
   * Retrieves the starting line number of the block.
   * @readonly
   * @returns {number|undefined} The starting line number or `undefined` if not set.
   */
  get line_start() {
    return this.lines?.[0];
  }
  /**
   * Retrieves the ending line number of the block.
   * @readonly
   * @returns {number|undefined} The ending line number or `undefined` if not set.
   */
  get line_end() {
    return this.lines?.[1];
  }
  /**
   * Retrieves the link associated with the block, handling page numbers if present.
   * @readonly
   * @returns {string} The block link.
   */
  get link() {
    if (/^.*page\s*(\d+).*$/i.test(this.sub_key)) {
      const number = this.sub_key.match(/^.*page\s*(\d+).*$/i)[1];
      return `${this.source.path}#page=${number}`;
    } else {
      return this.source.path;
    }
  }
  /**
   * Retrieves the display name of the block.
   * @readonly
   * @returns {string} The display name.
   */
  get name() {
    const source_name = this.source.name;
    const block_path_parts = this.key.split("#").slice(1);
    if (this.should_show_full_path) return [source_name, ...block_path_parts].join(" > ");
    if (block_path_parts[block_path_parts.length - 1][0] === "{") block_path_parts.pop();
    return [source_name, block_path_parts.pop()].join(" > ");
  }
  // uses data.lines to get next block
  get next_block() {
    if (!this.data.lines) return null;
    const next_line = this.data.lines[1] + 1;
    return this.source.blocks?.find((block) => next_line === block.data?.lines?.[0]);
  }
  /**
   * Retrieves the paths of outlinks from the block.
   * @readonly
   * @returns {Array<string>} An array of outlink paths.
   */
  get outlink_paths() {
    return this.source.outlink_paths;
  }
  /**
   * Retrieves the path of the SmartBlock.
   * @readonly
   * @returns {string} The path of the SmartBlock.
   */
  get path() {
    return this.key;
  }
  /**
   * Determines if the block should be embedded based on its coverage and size.
   * @readonly
   * @returns {boolean} `true` if it should be embedded, `false` otherwise.
   */
  get should_embed() {
    try {
      if (this.settings?.min_chars && this.size < this.settings.min_chars) return false;
      const match_line_start = this.line_start + 1;
      const match_line_end = this.line_end;
      const { has_line_start, has_line_end } = Object.entries(this.source?.data?.blocks || {}).reduce((acc, [key, range]) => {
        if (!key.startsWith(this.sub_key + "#")) return acc;
        if (range[0] === match_line_start) acc.has_line_start = key;
        if (range[1] === match_line_end) acc.has_line_end = key;
        return acc;
      }, { has_line_start: null, has_line_end: null });
      if (has_line_start && has_line_end) {
        const start_block = this.collection.get(this.source_key + has_line_start);
        if (start_block?.should_embed) {
          const end_block = this.collection.get(this.source_key + has_line_end);
          if (end_block?.should_embed) return false;
        }
      }
      return true;
    } catch (e) {
      console.error(e, e.stack);
      console.error(`Error getting should_embed for ${this.key}: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  /**
   * Retrieves the size of the SmartBlock.
   * @readonly
   * @returns {number} The size of the SmartBlock.
   */
  get size() {
    return this.data.size;
  }
  /**
   * Retrieves the SmartSource associated with the block.
   * @readonly
   * @returns {SmartSource} The associated SmartSource instance.
   */
  get source() {
    return this.source_collection.get(this.source_key);
  }
  /**
   * Retrieves the source adapter based on the file type.
   * @readonly
   * @returns {Object} The source adapter instance.
   */
  get source_adapter() {
    if (this._source_adapter) return this._source_adapter;
    if (this.source_adapters[this.file_type]) this._source_adapter = new this.source_adapters[this.file_type](this);
    else this._source_adapter = new this.source_adapters["default"](this);
    return this._source_adapter;
  }
  /**
   * Retrieves the source adapters from the SmartSource.
   * @readonly
   * @returns {Object} An object mapping file extensions to adapter constructors.
   */
  get source_adapters() {
    return this.source.source_adapters;
  }
  /**
   * Retrieves the SmartSources collection instance.
   * @readonly
   * @returns {SmartSources} The SmartSources collection.
   */
  get source_collection() {
    return this.env.smart_sources;
  }
  get source_key() {
    return this.key.split("#")[0];
  }
  get sub_blocks() {
    return this.source?.blocks?.filter((block) => block.key.startsWith(this.key + "#") && block.line_start > this.line_start && block.line_end <= this.line_end) || [];
  }
  // source dependent
  get data_path() {
    return this.source.data_path;
  }
  get data_file() {
    return this.source.data_file;
  }
  get excluded_lines() {
    return this.source.excluded_lines;
  }
  get file() {
    return this.source.file;
  }
  get is_canvas() {
    return this.source.is_canvas;
  }
  get is_excalidraw() {
    return this.source.is_excalidraw;
  }
  get meta_changed() {
    return this.source.meta_changed;
  }
  get mtime() {
    return this.source.mtime;
  }
  get multi_ajson_file_name() {
    return this.source.multi_ajson_file_name;
  }
  get smart_change_adapter() {
    return this.source.smart_change_adapter;
  }
  // COMPONENTS
  /**
   * Retrieves the component responsible for rendering the SmartBlock.
   * @readonly
   * @returns {Function} The render function for the source component.
   */
  get component() {
    return render4;
  }
  // CURRENTLY UNUSED
  /**
   * Retrieves the next k-shot example content for the block.
   * @async
   * @param {number} i - The index for the k-shot example.
   * @returns {Promise<string|null>} A promise that resolves to the k-shot example string or `null` if not available.
   */
  async get_next_k_shot(i) {
    if (!this.next_block) return null;
    const current = await this.get_content();
    const next = await this.next_block.get_content();
    return `---BEGIN CURRENT ${i}---
${current}
---END CURRENT ${i}---
---BEGIN NEXT ${i}---
${next}
---END NEXT ${i}---
`;
  }
  // DEPRECATED
  /**
   * @async
   * @deprecated Use `read` instead.
   * @returns {Promise<string>} A promise that resolves with the content of the block or "BLOCK NOT FOUND".
   */
  async get_content() {
    return await this.read() || "BLOCK NOT FOUND";
  }
  /**
   * @deprecated Use `source` instead.
   * @readonly
   * @returns {SmartSource} The associated SmartSource instance.
   */
  get note() {
    return this.source;
  }
  /**
   * @deprecated Use `source.key` instead.
   * @readonly
   * @returns {string} The source key.
   */
  get note_key() {
    return this.key.split("#")[0];
  }
};

// node_modules/smart-sources/smart_blocks.js
var SmartBlocks = class extends SmartEntities {
  /**
   * Initializes the SmartBlocks instance. Currently muted as processing is handled by SmartSources.
   * @returns {void}
   */
  init() {
  }
  /**
   * Retrieves the embedding model associated with the SmartSources collection.
   * @readonly
   * @returns {Object|undefined} The embedding model instance or `undefined` if not set.
   */
  get embed_model() {
    return this.source_collection?.embed_model;
  }
  /**
   * Retrieves the embedding model key from the SmartSources collection.
   * @readonly
   * @returns {string|undefined} The embedding model key or `undefined` if not set.
   */
  get embed_model_key() {
    return this.source_collection?.embed_model_key;
  }
  /**
   * Calculates the expected number of blocks based on the SmartSources collection.
   * @readonly
   * @returns {number} The expected count of blocks.
   */
  get expected_blocks_ct() {
    return Object.values(this.source_collection.items).reduce((acc, item) => acc += Object.keys(item.data.blocks || {}).length, 0);
  }
  /**
   * Retrieves the notices system from the environment.
   * @readonly
   * @returns {Object} The notices object.
   */
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  /**
   * Retrieves the settings configuration for SmartBlocks.
   * @readonly
   * @returns {Object} The settings configuration object.
   */
  get settings_config() {
    return this.process_settings_config({
      "embed_blocks": {
        name: "Embed Blocks",
        type: "toggle",
        description: "Embed blocks using the embedding model.",
        default: true
      },
      ...super.settings_config
    });
  }
  render_settings(container, opts = {}) {
    return this.render_collection_settings(container, opts);
  }
  /**
   * Retrieves the SmartChange instance from SmartSources.
   * @readonly
   * @returns {SmartChange|undefined} The SmartChange instance or `undefined` if not enabled.
   */
  get smart_change() {
    return this.env.smart_sources.smart_change;
  }
  /**
   * Retrieves the SmartSources collection instance.
   * @readonly
   * @returns {SmartSources} The SmartSources collection.
   */
  get source_collection() {
    return this.env.smart_sources;
  }
  /**
   * Processes the save queue by delegating to the SmartSources collection.
   * @async
   * @returns {Promise<void>}
   */
  async process_save_queue() {
    await this.source_collection.process_save_queue();
  }
  /**
   * Processes the embed queue. Currently handled by SmartSources, so this method is muted.
   * @async
   * @returns {Promise<void>}
   */
  async process_embed_queue() {
  }
  /**
   * Processes the load queue. Currently muted as processing is handled by SmartSources.
   * @async
   * @returns {Promise<void>}
   */
  async process_load_queue() {
  }
  // TEMP: Methods in sources not implemented in blocks
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async prune() {
    throw "Not implemented: prune";
  }
  /**
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {void}
   */
  build_links_map() {
    throw "Not implemented: build_links_map";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async refresh() {
    throw "Not implemented: refresh";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async search() {
    throw "Not implemented: search";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async import_file() {
    throw "Not implemented: import_file";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async run_load() {
    throw "Not implemented: run_load";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async run_import() {
    throw "Not implemented: run_import";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async run_refresh() {
    throw "Not implemented: run_refresh";
  }
  /**
   * @async
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<void>}
   */
  async run_force_refresh() {
    throw "Not implemented: run_force_refresh";
  }
};

// src/render_dataview_codeblocks.js
async function render_dataview_codeblocks(file_content, note_path, opts = {}) {
  opts = {
    char_limit: null,
    ...opts
  };
  const dataview_api = window?.["DataviewAPI"];
  if (!dataview_api) return file_content;
  if (!file_content) return file_content;
  const dataview_code_blocks = file_content.match(/```dataview(.*?)```/gs);
  if (!dataview_code_blocks) return file_content;
  for (let i = 0; i < dataview_code_blocks.length; i++) {
    if (opts.char_limit && opts.char_limit < file_content.indexOf(dataview_code_blocks[i])) break;
    const dataview_code_block = dataview_code_blocks[i];
    const dataview_code_block_content = dataview_code_block.replace("```dataview", "").replace("```", "");
    const dataview_query_result = await dataview_api.queryMarkdown(dataview_code_block_content, note_path, null);
    if (dataview_query_result.successful) {
      file_content = file_content.replace(dataview_code_block, dataview_query_result.value);
    }
  }
  return file_content;
}

// src/sc_entities.js
SmartSource.prototype.get_as_context = async function(params = {}) {
  const content = await render_dataview_codeblocks(await this.get_content(), this.path);
  return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
};
SmartBlock.prototype.get_as_context = async function(params = {}) {
  const content = await render_dataview_codeblocks(await this.get_content(), this.path);
  return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${content}
---END NOTE${params.i ? " " + params.i : ""}---`;
};

// node_modules/smart-sources/adapters/_adapter.js
var SourceAdapter = class {
  constructor(item, opts = {}) {
    this.item = item;
    this.opts = opts;
  }
  get collection() {
    return this.item.collection;
  }
  get env() {
    return this.collection.env;
  }
  get smart_change() {
    return this.collection.smart_change;
  }
  get block_collection() {
    return this.env.smart_blocks;
  }
  get source_collection() {
    return this.env.smart_sources;
  }
  // override these methods in the adapter class
  throw_not_implemented(method_name) {
    throw new Error(`Method "${method_name}" is not implemented for file type "${this.item.file_type}" in "${this.constructor.name}".`);
  }
  // source methods
  async import() {
    this.throw_not_implemented("import");
  }
  async append(content) {
    this.throw_not_implemented("append");
  }
  async update(full_content, opts = {}) {
    this.throw_not_implemented("update");
  }
  // async _update(content) { this.throw_not_implemented('_update'); }
  async read(opts = {}) {
    this.throw_not_implemented("read");
  }
  // async _read() { this.throw_not_implemented('_read'); }
  async remove() {
    this.throw_not_implemented("remove");
  }
  async move_to(entity_ref) {
    this.throw_not_implemented("move_to");
  }
  async merge(content, opts = {}) {
    this.throw_not_implemented("merge");
  }
  // block methods
  async block_append(content) {
    this.throw_not_implemented("block_append");
  }
  async block_update(full_content, opts = {}) {
    this.throw_not_implemented("block_update");
  }
  async _block_update(content) {
    this.throw_not_implemented("_block_update");
  }
  async block_read(opts = {}) {
    this.throw_not_implemented("block_read");
  }
  async _block_read() {
    this.throw_not_implemented("_block_read");
  }
  async block_remove() {
    this.throw_not_implemented("block_remove");
  }
  async block_move_to(entity_ref) {
    this.throw_not_implemented("block_move_to");
  }
  async block_merge(content, opts = {}) {
    this.throw_not_implemented("block_merge");
  }
  // HELPER METHODS
  async create_hash(content) {
    return await create_hash(content);
  }
};

// node_modules/smart-sources/utils/increase_heading_depth.js
function increase_heading_depth(content, depth) {
  return content.replace(/^(#+)/gm, (match) => "#".repeat(match.length + depth));
}

// node_modules/smart-sources/adapters/file.js
var FileSourceAdapter = class extends SourceAdapter {
  async update(content) {
    await this.fs.write(this.file_path, content);
  }
  async read() {
    return await this.fs.read(this.file_path);
  }
  get file_path() {
    return this.item.file_path;
  }
};

// node_modules/smart-sources/blocks/markdown_to_blocks.js
function markdown_to_blocks(markdown) {
  const lines = markdown.split("\n");
  const result = {};
  const heading_stack = [];
  const heading_lines = {};
  const heading_counts = {};
  const sub_block_counts = {};
  const subheading_counts = {};
  let current_list_item = null;
  let current_content_block = null;
  let in_frontmatter = false;
  let frontmatter_started = false;
  let root_heading_key = "#";
  let in_code_block = false;
  sub_block_counts[root_heading_key] = 0;
  for (let i = 0; i < lines.length; i++) {
    const line_number = i + 1;
    const line = lines[i];
    const trimmed_line = line.trim();
    if (trimmed_line === "---") {
      if (!frontmatter_started) {
        frontmatter_started = true;
        in_frontmatter = true;
        heading_lines["#---frontmatter---"] = [line_number, null];
        continue;
      } else if (in_frontmatter) {
        in_frontmatter = false;
        heading_lines["#---frontmatter---"][1] = line_number;
        continue;
      }
    }
    if (in_frontmatter) {
      continue;
    }
    if (trimmed_line.startsWith("```")) {
      in_code_block = !in_code_block;
      if (!current_content_block) {
        let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
        if (parent_key === "#" && !heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (parent_key === "#") {
          current_content_block = { key: root_heading_key, start_line: line_number };
          if (heading_lines[root_heading_key][1] === null || heading_lines[root_heading_key][1] < line_number) {
            heading_lines[root_heading_key][1] = null;
          }
        } else {
          if (sub_block_counts[parent_key] === void 0) {
            sub_block_counts[parent_key] = 0;
          }
          sub_block_counts[parent_key] += 1;
          const n = sub_block_counts[parent_key];
          const key = `${parent_key}#{${n}}`;
          heading_lines[key] = [line_number, null];
          current_content_block = { key, start_line: line_number };
        }
      }
      continue;
    }
    const heading_match = trimmed_line.match(/^(#{1,6})\s*(.+)$/);
    if (heading_match && !in_code_block) {
      const level = heading_match[1].length;
      let title = heading_match[2].trim();
      while (heading_stack.length > 0 && heading_stack[heading_stack.length - 1].level >= level) {
        const finished_heading = heading_stack.pop();
        if (heading_lines[finished_heading.key][1] === null) {
          heading_lines[finished_heading.key][1] = line_number - 1;
        }
      }
      if (heading_stack.length === 0 && heading_lines[root_heading_key] && heading_lines[root_heading_key][1] === null) {
        heading_lines[root_heading_key][1] = line_number - 1;
      }
      if (current_content_block) {
        if (heading_lines[current_content_block.key][1] === null) {
          heading_lines[current_content_block.key][1] = line_number - 1;
        }
        current_content_block = null;
      }
      if (current_list_item) {
        if (heading_lines[current_list_item.key][1] === null) {
          heading_lines[current_list_item.key][1] = line_number - 1;
        }
        current_list_item = null;
      }
      let parent_key = "";
      let parent_level = 0;
      if (heading_stack.length > 0) {
        parent_key = heading_stack[heading_stack.length - 1].key;
        parent_level = heading_stack[heading_stack.length - 1].level;
      } else {
        parent_key = "";
        parent_level = 0;
      }
      if (heading_stack.length === 0) {
        heading_counts[title] = (heading_counts[title] || 0) + 1;
        if (heading_counts[title] > 1) {
          title += `[${heading_counts[title]}]`;
        }
      } else {
        if (!subheading_counts[parent_key]) {
          subheading_counts[parent_key] = {};
        }
        subheading_counts[parent_key][title] = (subheading_counts[parent_key][title] || 0) + 1;
        const count = subheading_counts[parent_key][title];
        if (count > 1) {
          title += `#{${count}}`;
        }
      }
      const level_diff = level - parent_level;
      const hashes = "#".repeat(level_diff);
      const key = parent_key + hashes + title;
      heading_lines[key] = [line_number, null];
      sub_block_counts[key] = 0;
      heading_stack.push({ level, title, key });
      continue;
    }
    const list_match = line.match(/^(\s*)- (.+)$/);
    if (list_match && !in_code_block) {
      const indentation = list_match[1].length;
      if (indentation === 0) {
        if (current_list_item) {
          if (heading_lines[current_list_item.key][1] === null) {
            heading_lines[current_list_item.key][1] = line_number - 1;
          }
          current_list_item = null;
        }
        if (current_content_block) {
          if (heading_lines[current_content_block.key][1] === null) {
            heading_lines[current_content_block.key][1] = line_number - 1;
          }
          current_content_block = null;
        }
        let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
        if (parent_key === "#" && !heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (sub_block_counts[parent_key] === void 0) {
          sub_block_counts[parent_key] = 0;
        }
        sub_block_counts[parent_key] += 1;
        const n = sub_block_counts[parent_key];
        const key = `${parent_key}#{${n}}`;
        heading_lines[key] = [line_number, null];
        current_list_item = { key, start_line: line_number };
        continue;
      }
      if (current_list_item) {
        continue;
      }
    }
    if (trimmed_line === "") {
      continue;
    }
    if (!current_content_block) {
      if (current_list_item) {
        if (heading_lines[current_list_item.key][1] === null) {
          heading_lines[current_list_item.key][1] = line_number - 1;
        }
        current_list_item = null;
      }
      let parent_key = heading_stack.length > 0 ? heading_stack[heading_stack.length - 1].key : "#";
      if (parent_key === "#") {
        if (!heading_lines[root_heading_key]) {
          heading_lines[root_heading_key] = [line_number, null];
        }
        if (heading_lines[root_heading_key][1] === null || heading_lines[root_heading_key][1] < line_number) {
          heading_lines[root_heading_key][1] = null;
        }
        current_content_block = { key: root_heading_key, start_line: line_number };
      } else {
        if (sub_block_counts[parent_key] === void 0) {
          sub_block_counts[parent_key] = 0;
        }
        sub_block_counts[parent_key] += 1;
        const n = sub_block_counts[parent_key];
        const key = `${parent_key}#{${n}}`;
        heading_lines[key] = [line_number, null];
        current_content_block = { key, start_line: line_number };
      }
    }
    continue;
  }
  const total_lines = lines.length;
  while (heading_stack.length > 0) {
    const finished_heading = heading_stack.pop();
    if (heading_lines[finished_heading.key][1] === null) {
      heading_lines[finished_heading.key][1] = total_lines;
    }
  }
  if (current_list_item) {
    if (heading_lines[current_list_item.key][1] === null) {
      heading_lines[current_list_item.key][1] = total_lines;
    }
    current_list_item = null;
  }
  if (current_content_block) {
    if (heading_lines[current_content_block.key][1] === null) {
      heading_lines[current_content_block.key][1] = total_lines;
    }
    current_content_block = null;
  }
  if (heading_lines[root_heading_key] && heading_lines[root_heading_key][1] === null) {
    heading_lines[root_heading_key][1] = total_lines;
  }
  for (const key in heading_lines) {
    result[key] = heading_lines[key];
  }
  return result;
}

// node_modules/smart-sources/utils/get_markdown_links.js
function get_markdown_links(content) {
  const markdown_link_pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const wikilink_pattern = /\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g;
  const result = [];
  const extract_links_from_pattern = (pattern, type) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const title = type === "markdown" ? match[1] : match[2] || match[1];
      const target = type === "markdown" ? match[2] : match[1];
      const line = content.substring(0, match.index).split("\n").length;
      result.push({ title, target, line });
    }
  };
  extract_links_from_pattern(markdown_link_pattern, "markdown");
  extract_links_from_pattern(wikilink_pattern, "wikilink");
  result.sort((a, b) => a.line - b.line || a.target.localeCompare(b.target));
  return result;
}

// node_modules/smart-sources/utils/get_line_range.js
function get_line_range(content, start_line, end_line) {
  const lines = content.split("\n");
  return lines.slice(start_line - 1, end_line).join("\n");
}

// node_modules/smart-sources/blocks/markdown_crud.js
function block_read(content, block_key) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const selected_lines = lines.slice(block_range[0] - 1, block_range[1]);
  const block_content = selected_lines.join("\n");
  return block_content;
}
function block_update(content, block_key, new_block_content) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const updated_lines = [
    ...lines.slice(0, block_range[0] - 1),
    new_block_content,
    ...lines.slice(block_range[1])
  ];
  const updated_content = updated_lines.join("\n");
  return updated_content;
}
function block_destroy(content, block_key) {
  const blocks = markdown_to_blocks(content);
  const block_range = blocks[block_key];
  if (!block_range) {
    throw new Error(`BLOCK NOT FOUND: No block found with key "${block_key}".`);
  }
  const lines = content.split("\n");
  const updated_lines = [
    ...lines.slice(0, block_range[0] - 1),
    ...lines.slice(block_range[1])
  ];
  const updated_content = updated_lines.join("\n");
  return updated_content;
}

// node_modules/smart-sources/adapters/markdown.js
var MarkdownSourceAdapter = class extends FileSourceAdapter {
  get fs() {
    return this.source_collection.fs;
  }
  get data() {
    return this.item.data;
  }
  get source() {
    return this.item.source ? this.item.source : this.item;
  }
  async import() {
    const content = await this._read();
    if (!content) return console.warn("No content to import for " + this.file_path);
    const hash = await this.create_hash(content);
    if (this.data.blocks && this.data.hash === hash) {
      console.log("File stats changed, but content is the same. Skipping import.");
      return;
    }
    this.data.hash = hash;
    this.data.last_read_hash = hash;
    const blocks_obj = markdown_to_blocks(content);
    this.data.blocks = blocks_obj;
    const outlinks = get_markdown_links(content);
    this.data.outlinks = outlinks;
    if (this.item.block_collection) {
      for (const [sub_key, line_range] of Object.entries(blocks_obj)) {
        const block_key = `${this.source.key}${sub_key}`;
        const block_content = get_line_range(content, line_range[0], line_range[1]);
        const block_outlinks = get_markdown_links(block_content);
        const block = await this.item.block_collection.create_or_update({
          key: block_key,
          outlinks: block_outlinks,
          size: block_content.length
        });
        block._embed_input = `${block.breadcrumbs}
${block_content}`;
        block.data.hash = await this.create_hash(block._embed_input);
      }
    }
  }
  async append(content) {
    if (this.smart_change) {
      content = this.smart_change.wrap("content", {
        before: "",
        after: content,
        adapter: this.item.smart_change_adapter
      });
    }
    const current_content = await this.read();
    const new_content = [
      current_content,
      "",
      content
    ].join("\n").trim();
    await this._update(new_content);
  }
  async update(full_content, opts = {}) {
    const { mode = "append_blocks" } = opts;
    if (mode === "replace_all") {
      await this._update(full_content);
    } else if (mode === "replace_blocks") {
      await this.merge(full_content, { mode: "replace_blocks" });
    } else if (mode === "append_blocks") {
      await this.merge(full_content, { mode: "append_blocks" });
    }
  }
  async _update(content) {
    await super.update(content);
  }
  async read(opts = {}) {
    let content = await this._read();
    this.source.data.last_read_hash = await this.create_hash(content);
    if (this.source.last_read_hash !== this.source.hash) {
      this.source.loaded_at = null;
      await this.source.import();
    }
    if (opts.no_changes && this.smart_change) {
      const unwrapped = this.smart_change.unwrap(content, { file_type: this.item.file_type });
      content = unwrapped[opts.no_changes === "after" ? "after" : "before"];
    }
    if (opts.add_depth) {
      content = increase_heading_depth(content, opts.add_depth);
    }
    return content;
  }
  async _read() {
    return await super.read();
  }
  async remove() {
    await this.fs.remove(this.file_path);
    this.item.delete();
  }
  async move_to(entity_ref) {
    const new_path = typeof entity_ref === "string" ? entity_ref : entity_ref.key;
    if (!new_path) {
      throw new Error("Invalid entity reference for move_to operation");
    }
    const current_content = await this.read();
    const [target_source_key, ...headings] = new_path.split("#");
    const target_source = this.env.smart_sources.get(target_source_key);
    if (headings.length > 0) {
      const new_headings_content = this.construct_headings(headings);
      const new_content = `${new_headings_content}
${current_content}`;
      await this._update(new_content);
    }
    if (target_source) {
      await this.merge(current_content, { mode: "append_blocks" });
    } else {
      await this.rename_and_import(target_source_key, current_content);
    }
    if (this.item.key !== target_source_key) await this.remove();
  }
  construct_headings(headings) {
    return headings.map((heading, i) => `${"#".repeat(i + 1)} ${heading}`).join("\n");
  }
  async rename_and_import(target_source_key, content) {
    await this.fs.rename(this.file_path, target_source_key);
    const new_source = await this.item.collection.create_or_update({ path: target_source_key, content });
    await new_source.import();
  }
  /**
   * Merge content into the source
   * @param {string} content - The content to merge into the source
   * @param {Object} opts - Options for the merge operation
   * @param {string} opts.mode - The mode to use for the merge operation. Defaults to 'append_blocks' (may also be 'replace_blocks')
   */
  async merge(content, opts = {}) {
    const { mode = "append_blocks" } = opts;
    const blocks_obj = markdown_to_blocks(content);
    if (typeof blocks_obj !== "object" || Array.isArray(blocks_obj)) {
      console.warn("merge error: Expected an object from markdown_to_blocks, but received:", blocks_obj);
      throw new Error("merge error: markdown_to_blocks did not return an object as expected.");
    }
    const { new_blocks, new_with_parent_blocks, changed_blocks, same_blocks } = await this.get_changes(blocks_obj, content);
    for (const block of new_blocks) {
      await this.append(block.content);
    }
    for (const block of new_with_parent_blocks) {
      const parent_block = this.env.smart_blocks.get(block.parent_key);
      await parent_block.append(block.content);
    }
    for (const block of changed_blocks) {
      const changed_block = this.item.block_collection.get(block.key);
      if (mode === "replace_blocks") {
        await changed_block.update(block.content);
      } else {
        await changed_block.append(block.content);
      }
    }
  }
  async get_changes(blocks_obj, content) {
    const new_blocks = [];
    const new_with_parent_blocks = [];
    const changed_blocks = [];
    const same_blocks = [];
    const existing_blocks = this.source.data.blocks || {};
    for (const [sub_key, line_range] of Object.entries(blocks_obj)) {
      const has_existing = !!existing_blocks[sub_key];
      const block_key = `${this.source.key}${sub_key}`;
      const block_content = get_line_range(content, line_range[0], line_range[1]);
      if (!has_existing) {
        new_blocks.push({
          key: block_key,
          state: "new",
          content: block_content
        });
        continue;
      }
      let has_parent;
      let headings = sub_key.split("#");
      let parent_key;
      while (!has_parent && headings.length > 0) {
        headings.pop();
        parent_key = headings.join("#");
        has_parent = !!existing_blocks[parent_key];
      }
      if (has_parent) {
        new_with_parent_blocks.push({
          key: block_key,
          parent_key: `${this.source.key}${parent_key}`,
          state: "new",
          content: block_content
        });
        continue;
      }
      const block = this.item.env.smart_blocks.get(block_key);
      const content_hash = await this.create_hash(block_content);
      if (content_hash !== block.hash) {
        changed_blocks.push({
          key: block_key,
          state: "changed",
          content: block_content
        });
        continue;
      }
      same_blocks.push({
        key: block_key,
        state: "same",
        content: block_content
      });
    }
    return {
      new_blocks,
      new_with_parent_blocks,
      changed_blocks,
      same_blocks
    };
  }
  async block_read(opts = {}) {
    const source_content = await this.read();
    try {
      const block_content = block_read(source_content, this.item.sub_key);
      const breadcrumbs = this.item.breadcrumbs;
      const embed_input = breadcrumbs + "\n" + block_content;
      const hash = await this.create_hash(embed_input);
      if (hash !== this.item.hash) {
        this.item.source?.queue_import();
        return this._block_read(source_content, this.item.sub_key);
      }
      return block_content;
    } catch (error) {
      console.warn("Error reading block:", error.message);
      return "BLOCK NOT FOUND";
    }
  }
  _block_read(source_content, block_key) {
    return block_read(source_content, block_key);
  }
  async block_append(append_content) {
    let all_lines = (await this.read()).split("\n");
    if (all_lines[this.item.line_start] === append_content.split("\n")[0]) {
      append_content = append_content.split("\n").slice(1).join("\n");
    }
    if (this.smart_change) append_content = this.smart_change.wrap("content", { before: "", after: append_content, adapter: this.item.smart_change_adapter });
    await this._block_append(append_content);
  }
  async _block_append(append_content) {
    let all_lines = (await this.read()).split("\n");
    const content_before = all_lines.slice(0, this.item.line_end + 1);
    const content_after = all_lines.slice(this.item.line_end + 1);
    const new_content = [
      ...content_before,
      "",
      // add a blank line before appending
      append_content,
      ...content_after
    ].join("\n").trim();
    await this.item.source._update(new_content);
    await this.item.source.import();
  }
  async block_update(new_block_content, opts = {}) {
    if (this.smart_change) new_block_content = this.smart_change.wrap("content", {
      before: await this.block_read({ no_changes: "before", headings: "last" }),
      after: new_block_content,
      adapter: this.item.smart_change_adapter
    });
    await this._block_update(new_block_content);
  }
  async _block_update(new_block_content) {
    const full_content = await this.read();
    try {
      const updated_content = block_update(full_content, this.item.sub_key, new_block_content);
      await this.item.source._update(updated_content);
      await this.item.source.import();
    } catch (error) {
      console.warn("Error updating block:", error.message);
    }
  }
  async block_remove() {
    const full_content = await this.read();
    try {
      const updated_content = block_destroy(full_content, this.item.sub_key);
      await this.item.source._update(updated_content);
      await this.item.source.import();
    } catch (error) {
      console.warn("Error removing block:", error.message);
    }
    this.item.delete();
  }
  async block_move_to(to_key) {
    const to_collection_key = to_key.includes("#") ? "smart_blocks" : "smart_sources";
    const to_entity = this.env[to_collection_key].get(to_key);
    let content = await this.block_read({ no_changes: "before", headings: "last" });
    try {
      if (this.smart_change) {
        const smart_change = this.smart_change.wrap("location", {
          to_key,
          before: await this.block_read({ headings: "last", no_change: "before" }),
          adapter: this.item.smart_change_adapter
        });
        this._block_update(smart_change);
      } else {
        this.block_remove();
      }
    } catch (e) {
      console.warn("error removing block: ", e);
    }
    try {
      if (to_entity) {
        if (this.smart_change) {
          content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: content, adapter: this.item.smart_change_adapter });
          await to_entity._append(content);
        } else {
          await to_entity.append(content);
        }
      } else {
        const target_source_key = to_key.split("#")[0];
        const target_source = this.env.smart_sources.get(target_source_key);
        if (to_key.includes("#")) {
          const headings = to_key.split("#").slice(1);
          const new_headings_content = headings.map((heading, i) => `${"#".repeat(i + 1)} ${heading}`).join("\n");
          let new_content = [
            new_headings_content,
            ...content.split("\n").slice(1)
          ].join("\n").trim();
          if (this.smart_change) new_content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: new_content, adapter: this.item.smart_change_adapter });
          if (target_source) await target_source._append(new_content);
          else await this.env.smart_sources.create(target_source_key, new_content);
        } else {
          if (this.smart_change) content = this.smart_change.wrap("location", { from_key: this.item.source.key, after: content, adapter: this.item.smart_change_adapter });
          if (target_source) await target_source._append(content);
          else await this.env.smart_sources.create(target_source_key, content);
        }
      }
    } catch (e) {
      console.warn("error moving block: ", e);
      this.item.deleted = false;
      await this.block_update(content);
    }
    await this.item.source.import();
  }
};

// node_modules/smart-collections/utils/ajson_merge.js
function ajson_merge(existing, new_obj) {
  if (new_obj === null) return null;
  if (new_obj === void 0) return existing;
  if (typeof new_obj !== "object") return new_obj;
  if (typeof existing !== "object" || existing === null) existing = {};
  const keys = Object.keys(new_obj);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    const new_val = new_obj[key];
    const existing_val = existing[key];
    if (Array.isArray(new_val)) {
      existing[key] = new_val.slice();
    } else if (is_object(new_val)) {
      existing[key] = ajson_merge(is_object(existing_val) ? existing_val : {}, new_val);
    } else if (new_val !== void 0) {
      existing[key] = new_val;
    }
  }
  return existing;
}
function is_object(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

// node_modules/smart-collections/adapters/_adapter.js
var SmartCollectionDataAdapter = class {
  constructor(collection) {
    this.collection = collection;
  }
  // REQUIRED METHODS IN SUBCLASSES
  async load() {
    throw new Error("SmartCollectionDataAdapter: load() not implemented");
  }
  async save() {
    throw new Error("SmartCollectionDataAdapter: save() not implemented");
  }
  // END REQUIRED METHODS IN SUBCLASSES
  get env() {
    return this.collection.env;
  }
  get data_path() {
    return "collection.json";
  }
  get collection_key() {
    return this.collection.collection_key;
  }
};

// node_modules/smart-collections/adapters/multi_file.js
var class_to_collection_key = {
  "SmartSource": "smart_sources",
  "SmartNote": "smart_sources",
  // DEPRECATED: added for backward compatibility
  "SmartBlock": "smart_blocks",
  "SmartDirectory": "smart_directories"
};
var SmartCollectionMultiFileDataAdapter = class extends SmartCollectionDataAdapter {
  /**
   * Gets the filesystem interface to use for data operations.
   * Uses collection's data_fs if available, otherwise falls back to environment's data_fs.
   * @returns {Object} The filesystem interface
   */
  get fs() {
    return this.collection.data_fs || this.env.data_fs;
  }
  /**
   * Gets the data folder path where .ajson files are stored.
   * @returns {string} Path to the data folder
   */
  get data_folder() {
    return this.collection.data_dir || "multi";
  }
  /**
   * Loads data for a collection item from its corresponding .ajson file.
   * Handles:
   * - AJSON parsing and merging
   * - Null overwrite patterns
   * - Inactive item types
   * - Change detection via loaded_at timestamp
   * @param {CollectionItem} item - The collection item to load data for
   * @returns {Promise<void>}
   */
  async load(item) {
    if (!await this.fs.exists(this.data_folder)) await this.fs.mkdir(this.data_folder);
    try {
      const data_ajson = (await this.fs.adapter.read(item.data_path, "utf-8", { no_cache: true })).trim();
      if (!data_ajson) {
        console.log(`Data file not found: ${item.data_path}`);
        return item.queue_import();
      }
      const ajson_lines = data_ajson.split("\n");
      const parsed_data = ajson_lines.reduce((acc, line) => {
        try {
          const parsed = JSON.parse(`{${line}}`);
          if (Object.values(parsed)[0] === null) {
            if (acc[Object.keys(parsed)[0]]) delete acc[Object.keys(parsed)[0]];
            return acc;
          }
          return ajson_merge(acc, parsed);
        } catch (err) {
          console.warn("Error parsing line: ", line);
          console.warn(err.stack);
          return acc;
        }
      }, {});
      const rebuilt_ajson = [];
      Object.entries(parsed_data).forEach(([ajson_key, value], index) => {
        if (!value) return;
        rebuilt_ajson.push(`${JSON.stringify(ajson_key)}: ${JSON.stringify(value)}`);
        const [class_name, ...key_parts] = ajson_key.split(":");
        const entity_key = key_parts.join(":");
        if (entity_key === item.key) item.data = value;
        else {
          if (!this.env[class_to_collection_key[class_name]]) return console.warn(`Collection class not found: ${class_name}`);
          this.env[class_to_collection_key[class_name]].items[entity_key] = new this.env.item_types[class_name](this.env, value);
        }
      });
      item._queue_load = false;
      if (ajson_lines.length !== Object.keys(parsed_data).length) this.fs.write(item.data_path, rebuilt_ajson.join("\n"));
      item.loaded_at = Date.now();
    } catch (err) {
      if (err.message.includes("ENOENT")) return item.queue_import();
      console.log("Error loading collection item: " + item.key);
      console.warn(err.stack);
      item.queue_load();
      return;
    }
  }
  /**
   * Saves data for a collection item to its corresponding .ajson file.
   * Handles item deletion and appending new data.
   * @param {CollectionItem} item - The collection item to save data for
   * @param {string} [ajson=null] - Optional AJSON string to save. If not provided, uses item.ajson
   * @returns {Promise<boolean>} True if save was successful, false otherwise
   */
  async save(item, ajson = null) {
    if (!ajson) ajson = item.ajson;
    if (!await this.fs.exists(this.data_folder)) await this.fs.mkdir(this.data_folder);
    try {
      if (item.deleted) {
        this.collection.delete_item(item.key);
        if (await this.fs.exists(item.data_path)) await this.fs.remove(item.data_path);
      } else {
        await this.fs.append(item.data_path, "\n" + ajson);
      }
      item._queue_save = false;
      return true;
    } catch (err) {
      if (err.message.includes("ENOENT")) return;
      console.warn("Error saving collection item: ", item.key);
      console.warn(err.stack);
      item.queue_save();
      return false;
    }
  }
};

// node_modules/smart-embed-model/node_modules/smart-model/smart_model.js
var SmartModel = class {
  scope_name = "smart_model";
  static defaults = {
    // override in sub-class if needed
  };
  /**
   * Create a SmartModel instance.
   * @param {Object} opts - Configuration options
   * @param {Object} opts.adapters - Map of adapter names to adapter classes
   * @param {Object} opts.settings - Model settings configuration
   * @param {Object} opts.model_config - Model-specific configuration
   * @param {string} opts.model_config.adapter - Name of the adapter to use
   * @param {string} [opts.model_key] - Optional model identifier to override settings
   * @throws {Error} If required options are missing
   */
  constructor(opts = {}) {
    this.opts = opts;
    this.validate_opts(opts);
    this.state = "unloaded";
    this._adapter = null;
  }
  /**
   * Initialize the model by loading the configured adapter.
   * @async
   * @returns {Promise<void>}
   */
  async initialize() {
    this.load_adapter(this.adapter_name);
    await this.load();
  }
  /**
   * Validate required options.
   * @param {Object} opts - Configuration options
   */
  validate_opts(opts) {
    if (!opts.adapters) throw new Error("opts.adapters is required");
    if (!opts.settings) throw new Error("opts.settings is required");
  }
  /**
   * Get the current settings
   * @returns {Object} Current settings
   */
  get settings() {
    if (!this.opts.settings) this.opts.settings = {
      ...this.constructor.defaults
    };
    return this.opts.settings;
  }
  /**
   * Get the current adapter name
   * @returns {string} Current adapter name
   */
  get adapter_name() {
    const adapter_key = this.opts.model_config?.adapter || this.opts.adapter || this.settings.adapter || Object.keys(this.adapters)[0];
    if (!adapter_key || !this.adapters[adapter_key]) throw new Error(`Platform "${adapter_key}" not supported`);
    return adapter_key;
  }
  /**
   * Get adapter-specific settings.
   * @returns {Object} Settings for current adapter
   */
  get adapter_settings() {
    if (!this.settings[this.adapter_name]) this.settings[this.adapter_name] = {};
    return this.settings[this.adapter_name];
  }
  get adapter_config() {
    const base_config = this.adapters[this.adapter_name]?.defaults || {};
    return {
      ...base_config,
      ...this.adapter_settings,
      ...this.opts.adapter_config
    };
  }
  /**
   * Get available models.
   * @returns {Object} Map of model objects
   */
  get models() {
    return this.adapter.models;
  }
  /**
   * Get the default model key to use
   * @returns {string} Default model identifier
   */
  get default_model_key() {
    throw new Error("default_model_key must be overridden in sub-class");
  }
  /**
   * Get the current model key
   * @returns {string} Current model key
   */
  get model_key() {
    return this.opts.model_key || this.adapter_config.model_key || this.settings.model_key || this.default_model_key;
  }
  /**
   * Get the current model configuration
   * @returns {Object} Combined base and custom model configuration
   */
  get model_config() {
    const model_key = this.model_key;
    const base_model_config = this.models[model_key] || {};
    return {
      ...this.adapter_config,
      ...base_model_config,
      ...this.opts.model_config
    };
  }
  get model_settings() {
    if (!this.settings[this.model_key]) this.settings[this.model_key] = {};
    return this.settings[this.model_key];
  }
  /**
   * Load the current adapter and transition to loaded state.
   * @async
   * @returns {Promise<void>}
   */
  async load() {
    this.set_state("loading");
    if (!this.adapter?.loaded) {
      await this.invoke_adapter_method("load");
    }
    this.set_state("loaded");
  }
  /**
   * Unload the current adapter and transition to unloaded state.
   * @async
   * @returns {Promise<void>}
   */
  async unload() {
    if (this.adapter?.loaded) {
      this.set_state("unloading");
      await this.invoke_adapter_method("unload");
      this.set_state("unloaded");
    }
  }
  /**
   * Set the model's state.
   * @param {('unloaded'|'loading'|'loaded'|'unloading')} new_state - The new state
   * @throws {Error} If the state is invalid
   */
  set_state(new_state) {
    const valid_states = ["unloaded", "loading", "loaded", "unloading"];
    if (!valid_states.includes(new_state)) {
      throw new Error(`Invalid state: ${new_state}`);
    }
    this.state = new_state;
  }
  get is_loading() {
    return this.state === "loading";
  }
  get is_loaded() {
    return this.state === "loaded";
  }
  get is_unloading() {
    return this.state === "unloading";
  }
  get is_unloaded() {
    return this.state === "unloaded";
  }
  // ADAPTERS
  /**
   * Get the map of available adapters
   * @returns {Object} Map of adapter names to adapter classes
   */
  get adapters() {
    return this.opts.adapters || {};
  }
  /**
   * Load a specific adapter by name.
   * @async
   * @param {string} adapter_name - Name of the adapter to load
   * @throws {Error} If adapter not found or loading fails
   * @returns {Promise<void>}
   */
  async load_adapter(adapter_name) {
    this.set_adapter(adapter_name);
    if (!this._adapter.loaded) {
      this.set_state("loading");
      try {
        await this.invoke_adapter_method("load");
        this.set_state("loaded");
      } catch (err) {
        this.set_state("unloaded");
        throw new Error(`Failed to load adapter: ${err.message}`);
      }
    }
  }
  /**
   * Set an adapter instance by name without loading it.
   * @param {string} adapter_name - Name of the adapter to set
   * @throws {Error} If adapter not found
   */
  set_adapter(adapter_name) {
    const AdapterClass = this.adapters[adapter_name];
    if (!AdapterClass) {
      throw new Error(`Adapter "${adapter_name}" not found.`);
    }
    if (this._adapter?.constructor.name.toLowerCase() === adapter_name.toLowerCase()) {
      return;
    }
    this._adapter = new AdapterClass(this);
  }
  /**
   * Get the current active adapter instance
   * @returns {Object} The active adapter instance
   * @throws {Error} If adapter not found
   */
  get adapter() {
    const adapter_name = this.adapter_name;
    if (!adapter_name) {
      throw new Error(`Adapter not set for model.`);
    }
    if (!this._adapter) {
      this.load_adapter(adapter_name);
    }
    return this._adapter;
  }
  /**
   * Ensure the adapter is ready to execute a method.
   * @param {string} method - Name of the method to check
   * @throws {Error} If adapter not loaded or method not implemented
   */
  ensure_adapter_ready(method) {
    if (!this.adapter) {
      throw new Error("No adapter loaded.");
    }
    if (typeof this.adapter[method] !== "function") {
      throw new Error(`Adapter does not implement method: ${method}`);
    }
  }
  /**
   * Invoke a method on the current adapter.
   * @async
   * @param {string} method - Name of the method to call
   * @param {...any} args - Arguments to pass to the method
   * @returns {Promise<any>} Result from the adapter method
   * @throws {Error} If adapter not ready or method fails
   */
  async invoke_adapter_method(method, ...args) {
    this.ensure_adapter_ready(method);
    return await this.adapter[method](...args);
  }
  /**
   * Get platforms as dropdown options.
   * @returns {Array<Object>} Array of {value, name} option objects
   */
  get_platforms_as_options() {
    console.log("get_platforms_as_options", this.adapters);
    return Object.entries(this.adapters).map(([key, AdapterClass]) => ({ value: key, name: AdapterClass.defaults.description || key }));
  }
  // SETTINGS
  /**
   * Get the settings configuration schema
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    return this.process_settings_config({
      adapter: {
        name: "Model Platform",
        type: "dropdown",
        description: "Select a model platform to use with Smart Model.",
        options_callback: "get_platforms_as_options",
        is_scope: true,
        // trigger re-render of settings when changed
        callback: "adapter_changed",
        default: "default"
      }
    });
  }
  /**
   * Process settings configuration with conditionals and prefixes.
   * @param {Object} _settings_config - Raw settings configuration
   * @param {string} [prefix] - Optional prefix for setting keys
   * @returns {Object} Processed settings configuration
   */
  process_settings_config(_settings_config, prefix = null) {
    return Object.entries(_settings_config).reduce((acc, [key, val]) => {
      if (val.conditional) {
        if (!val.conditional(this)) return acc;
        delete val.conditional;
      }
      const new_key = (prefix ? prefix + "." : "") + this.process_setting_key(key);
      acc[new_key] = val;
      return acc;
    }, {});
  }
  /**
   * Process an individual setting key.
   * @param {string} key - Setting key to process
   * @returns {string} Processed setting key
   */
  process_setting_key(key) {
    return key;
  }
  // override in sub-class if needed for prefixes and variable replacements
  re_render_settings() {
    if (typeof this.opts.re_render_settings === "function") this.opts.re_render_settings();
    else console.warn("re_render_settings is not a function (must be passed in model opts)");
  }
  /**
   * Reload model.
   */
  reload_model() {
    console.log("reload_model", this.opts);
    if (typeof this.opts.reload_model === "function") this.opts.reload_model();
    else console.warn("reload_model is not a function (must be passed in model opts)");
  }
  adapter_changed() {
    this.reload_model();
    this.re_render_settings();
  }
  model_changed() {
    this.reload_model();
    this.re_render_settings();
  }
  // /**
  //  * Render settings.
  //  * @param {HTMLElement} [container] - Container element
  //  * @param {Object} [opts] - Render options
  //  * @returns {Promise<HTMLElement>} Container element
  //  */
  // async render_settings(container=this.settings_container, opts = {}) {
  //   if(!this.settings_container || container !== this.settings_container) this.settings_container = container;
  //   const model_type = this.constructor.name.toLowerCase().replace('smart', '').replace('model', '');
  //   let model_settings_container;
  //   if(this.settings_container) {
  //     const container_id = `#${model_type}-model-settings-container`;
  //     model_settings_container = this.settings_container.querySelector(container_id);
  //     if(!model_settings_container) {
  //       model_settings_container = document.createElement('div');
  //       model_settings_container.id = container_id;
  //       this.settings_container.appendChild(model_settings_container);
  //     }
  //     model_settings_container.innerHTML = '<div class="sc-loading">Loading ' + this.adapter_name + ' settings...</div>';
  //   }
  //   const frag = await this.render_settings_component(this, opts);
  //   if(model_settings_container) {
  //     model_settings_container.innerHTML = '';
  //     model_settings_container.appendChild(frag);
  //     this.smart_view.on_open_overlay(model_settings_container);
  //   }
  //   return frag;
  // }
};

// node_modules/smart-embed-model/smart_embed_model.js
var SmartEmbedModel = class extends SmartModel {
  scope_name = "smart_embed_model";
  static defaults = {
    adapter: "transformers"
  };
  /**
   * Create a SmartEmbedModel instance
   * @param {Object} opts - Configuration options
   * @param {Object} [opts.adapters] - Map of available adapter implementations
   * @param {boolean} [opts.use_gpu] - Whether to enable GPU acceleration
   * @param {number} [opts.gpu_batch_size] - Batch size when using GPU
   * @param {number} [opts.batch_size] - Default batch size for processing
   * @param {Object} [opts.model_config] - Model-specific configuration
   * @param {string} [opts.model_config.adapter] - Override adapter type
   * @param {number} [opts.model_config.dims] - Embedding dimensions
   * @param {number} [opts.model_config.max_tokens] - Maximum tokens to process
   * @param {Object} [opts.settings] - User settings
   * @param {string} [opts.settings.api_key] - API key for remote models
   * @param {number} [opts.settings.min_chars] - Minimum text length to embed
   */
  constructor(opts = {}) {
    super(opts);
  }
  /**
   * Count tokens in an input string
   * @param {string} input - Text to tokenize
   * @returns {Promise<Object>} Token count result
   * @property {number} tokens - Number of tokens in input
   * 
   * @example
   * ```javascript
   * const result = await model.count_tokens("Hello world");
   * console.log(result.tokens); // 2
   * ```
   */
  async count_tokens(input) {
    return await this.invoke_adapter_method("count_tokens", input);
  }
  /**
   * Generate embeddings for a single input
   * @param {string|Object} input - Text or object with embed_input property
   * @returns {Promise<Object>} Embedding result
   * @property {number[]} vec - Embedding vector
   * @property {number} tokens - Token count
   * 
   * @example
   * ```javascript
   * const result = await model.embed("Hello world");
   * console.log(result.vec); // [0.1, 0.2, ...]
   * ```
   */
  async embed(input) {
    if (typeof input === "string") input = { embed_input: input };
    return (await this.embed_batch([input]))[0];
  }
  /**
   * Generate embeddings for multiple inputs in batch
   * @param {Array<string|Object>} inputs - Array of texts or objects with embed_input
   * @returns {Promise<Array<Object>>} Array of embedding results
   * @property {number[]} vec - Embedding vector for each input
   * @property {number} tokens - Token count for each input
   * 
   * @example
   * ```javascript
   * const results = await model.embed_batch([
   *   { embed_input: "First text" },
   *   { embed_input: "Second text" }
   * ]);
   * ```
   */
  async embed_batch(inputs) {
    return await this.invoke_adapter_method("embed_batch", inputs);
  }
  /**
   * Get the current batch size based on GPU settings
   * @returns {number} Current batch size for processing
   */
  get batch_size() {
    return this.adapter.batch_size || 1;
  }
  /**
   * Get settings configuration schema
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    const _settings_config = {
      adapter: {
        name: "Embedding Model Platform",
        type: "dropdown",
        description: "Select an embedding model platform.",
        options_callback: "get_platforms_as_options",
        callback: "adapter_changed",
        default: this.constructor.defaults.adapter
      },
      ...this.adapter.settings_config || {}
    };
    return this.process_settings_config(_settings_config);
  }
  process_setting_key(key) {
    return key.replace(/\[ADAPTER\]/g, this.adapter_name);
  }
  /**
   * Get available embedding model options
   * @returns {Array<Object>} Array of model options with value and name
   */
  get_embedding_model_options() {
    return Object.entries(this.models).map(([key, model]) => ({ value: key, name: key }));
  }
  /**
   * Get embedding model options including 'None' option
   * @returns {Array<Object>} Array of model options with value and name
   */
  get_block_embedding_model_options() {
    const options = this.get_embedding_model_options();
    options.unshift({ value: "None", name: "None" });
    return options;
  }
};

// node_modules/smart-embed-model/node_modules/smart-model/adapters/_adapter.js
var SmartModelAdapter = class {
  /**
   * Create a SmartModelAdapter instance.
   * @param {SmartModel} model - The parent SmartModel instance
   */
  constructor(model) {
    this.model = model;
    this.state = "unloaded";
  }
  /**
   * Load the adapter.
   * @async
   * @returns {Promise<void>}
   */
  async load() {
    this.set_state("loaded");
  }
  /**
   * Unload the adapter.
   * @returns {void}
   */
  unload() {
    this.set_state("unloaded");
  }
  /**
   * Get all settings.
   * @returns {Object} All settings
   */
  get settings() {
    return this.model.settings;
  }
  /**
   * Get the current model key.
   * @returns {string} Current model identifier
   */
  get model_key() {
    return this.model.model_key;
  }
  /**
   * Get the current model configuration.
   * @returns {Object} Model configuration
   */
  get model_config() {
    return this.model.model_config;
  }
  /**
   * Get model-specific settings.
   * @returns {Object} Settings for current model
   */
  get model_settings() {
    return this.model.model_settings;
  }
  /**
   * Get adapter-specific configuration.
   * @returns {Object} Adapter configuration
   */
  get adapter_config() {
    return this.model.adapter_config;
  }
  /**
   * Get adapter-specific settings.
   * @returns {Object} Adapter settings
   */
  get adapter_settings() {
    return this.model.adapter_settings;
  }
  /**
   * Get the models.
   * @returns {Object} Map of model objects
   */
  get models() {
    if (typeof this.adapter_config.models === "object" && Object.keys(this.adapter_config.models || {}).length > 0) return this.adapter_config.models;
    else {
      return {};
    }
  }
  /**
   * Get available models from the API.
   * @abstract
   * @param {boolean} [refresh=false] - Whether to refresh cached models
   * @returns {Promise<Object>} Map of model objects
   */
  async get_models(refresh = false) {
    throw new Error("get_models not implemented");
  }
  /**
   * Validate the parameters for get_models.
   * @returns {boolean|Array<Object>} True if parameters are valid, otherwise an array of error objects
   */
  validate_get_models_params() {
    return true;
  }
  /**
   * Get available models as dropdown options synchronously.
   * @returns {Array<Object>} Array of model options.
   */
  get_models_as_options_sync() {
    const models = this.models;
    const params_valid = this.validate_get_models_params();
    if (params_valid !== true) return params_valid;
    if (!Object.keys(models || {}).length) {
      this.get_models(true);
      return [{ value: "", name: "No models currently available" }];
    }
    return Object.values(models).map((model) => ({ value: model.id, name: model.name || model.id })).sort((a, b) => a.name.localeCompare(b.name));
  }
  /**
   * Set the adapter's state.
   * @param {('unloaded'|'loading'|'loaded'|'unloading')} new_state - The new state
   * @throws {Error} If the state is invalid
   */
  set_state(new_state) {
    const valid_states = ["unloaded", "loading", "loaded", "unloading"];
    if (!valid_states.includes(new_state)) {
      throw new Error(`Invalid state: ${new_state}`);
    }
    this.state = new_state;
  }
  // Replace individual state getters/setters with a unified state management
  get is_loading() {
    return this.state === "loading";
  }
  get is_loaded() {
    return this.state === "loaded";
  }
  get is_unloading() {
    return this.state === "unloading";
  }
  get is_unloaded() {
    return this.state === "unloaded";
  }
};

// node_modules/smart-embed-model/adapters/_adapter.js
var SmartEmbedAdapter = class extends SmartModelAdapter {
  /**
   * @override in sub-class with adapter-specific default configurations
   * @property {string} id - The adapter identifier
   * @property {string} description - Human-readable description
   * @property {string} type - Adapter type ("API")
   * @property {string} endpoint - API endpoint
   * @property {string} adapter - Adapter identifier
   * @property {string} default_model - Default model to use
   */
  static defaults = {};
  /**
   * Create adapter instance
   * @param {SmartEmbedModel} model - Parent model instance
   */
  constructor(model) {
    super(model);
    this.smart_embed = model;
  }
  /**
   * Count tokens in input text
   * @abstract
   * @param {string} input - Text to tokenize
   * @returns {Promise<Object>} Token count result
   * @property {number} tokens - Number of tokens in input
   * @throws {Error} If not implemented by subclass
   */
  async count_tokens(input) {
    throw new Error("count_tokens method not implemented");
  }
  /**
   * Generate embeddings for single input
   * @abstract
   * @param {string|Object} input - Text to embed
   * @returns {Promise<Object>} Embedding result
   * @property {number[]} vec - Embedding vector
   * @property {number} tokens - Number of tokens in input
   * @throws {Error} If not implemented by subclass
   */
  async embed(input) {
    throw new Error("embed method not implemented");
  }
  /**
   * Generate embeddings for multiple inputs
   * @abstract
   * @param {Array<string|Object>} inputs - Texts to embed
   * @returns {Promise<Array<Object>>} Array of embedding results
   * @property {number[]} vec - Embedding vector for each input
   * @property {number} tokens - Number of tokens in each input
   * @throws {Error} If not implemented by subclass
   */
  async embed_batch(inputs) {
    throw new Error("embed_batch method not implemented");
  }
  get settings_config() {
    return {
      "[ADAPTER].model_key": {
        name: "Embedding Model",
        type: "dropdown",
        description: "Select an embedding model.",
        options_callback: "adapter.get_models_as_options_sync",
        callback: "model_changed",
        default: this.constructor.defaults.default_model
      }
    };
  }
  get dims() {
    return this.model_config.dims;
  }
  get max_tokens() {
    return this.model_config.max_tokens;
  }
  // get batch_size() { return this.model_config.batch_size; }
  get use_gpu() {
    if (typeof this._use_gpu === "undefined") {
      if (typeof this.model.opts.use_gpu !== "undefined") this._use_gpu = this.model.opts.use_gpu;
      else this._use_gpu = typeof navigator !== "undefined" && !!navigator?.gpu && this.model_settings.gpu_batch_size !== 0;
    }
    return this._use_gpu;
  }
  set use_gpu(value) {
    this._use_gpu = value;
  }
  get batch_size() {
    if (this.use_gpu && this.model_settings?.gpu_batch_size) return this.model_settings.gpu_batch_size;
    return this.model.opts.batch_size || this.model_config.batch_size || 1;
  }
};

// node_modules/smart-embed-model/node_modules/smart-http-request/smart_http_request.js
var SmartHttpRequest = class {
  /**
   * @param {object} opts - Options for the SmartHttpRequest class
   * @param {SmartHttpRequestAdapter} opts.adapter - The adapter constructor to use for making HTTP requests
   * @param {Obsidian.requestUrl} opts.obsidian_request_adapter - For use with Obsidian adapter
   */
  constructor(opts = {}) {
    this.opts = opts;
    if (!opts.adapter) throw new Error("HttpRequestAdapter is required");
    this.adapter = new opts.adapter(this);
  }
  /**
   * Returns a well-formed response object
   * @param {object} request_params - Parameters for the HTTP request
   * @param {string} request_params.url - The URL to make the request to
   * @param {string} [request_params.method='GET'] - The HTTP method to use
   * @param {object} [request_params.headers] - Headers to include in the request
   * @param {*} [request_params.body] - The body of the request (for POST, PUT, etc.)
   * @returns {SmartHttpResponseAdapter} instance of the SmartHttpResponseAdapter class
   * @example
   * const response = await smart_http_request.request({
   *   url: 'https://api.example.com/data',
   *   method: 'GET',
   *   headers: { 'Content-Type': 'application/json' }
   * });
   * console.log(await response.json());
   */
  async request(request_params) {
    return await this.adapter.request(request_params);
  }
};

// node_modules/smart-embed-model/node_modules/smart-http-request/adapters/_adapter.js
var SmartHttpRequestAdapter = class {
  constructor(main) {
    this.main = main;
  }
  async request(request_params) {
    throw new Error("request not implemented");
  }
};
var SmartHttpResponseAdapter = class {
  constructor(response) {
    this.response = response;
  }
  async headers() {
    throw new Error("headers not implemented");
  }
  async json() {
    throw new Error("json not implemented");
  }
  async status() {
    throw new Error("status not implemented");
  }
  async text() {
    throw new Error("text not implemented");
  }
};

// node_modules/smart-embed-model/node_modules/smart-http-request/adapters/fetch.js
var SmartHttpRequestFetchAdapter = class extends SmartHttpRequestAdapter {
  async request(request_params) {
    const { url: url2, ...opts } = request_params;
    const resp = await fetch(url2, opts);
    return new SmartHttpResponseFetchAdapter(resp);
  }
};
var SmartHttpResponseFetchAdapter = class extends SmartHttpResponseAdapter {
  async headers() {
    return this.response.headers;
  }
  async json() {
    if (!this._json) {
      this._json = await this.response.json();
    }
    return this._json;
  }
  async status() {
    return this.response.status;
  }
  async text() {
    if (!this._text) {
      this._text = await this.response.text();
    }
    return this._text;
  }
};

// node_modules/smart-embed-model/adapters/_api.js
var SmartEmbedModelApiAdapter = class extends SmartEmbedAdapter {
  /**
   * Get the request adapter class.
   * @returns {SmartEmbedModelRequestAdapter} The request adapter class
   */
  get req_adapter() {
    return SmartEmbedModelRequestAdapter;
  }
  /**
   * Get the response adapter class.
   * @returns {SmartEmbedModelResponseAdapter} The response adapter class
   */
  get res_adapter() {
    return SmartEmbedModelResponseAdapter;
  }
  /** @returns {string} API endpoint URL */
  get endpoint() {
    return this.model_config.endpoint;
  }
  /**
   * Get HTTP request adapter instance
   * @returns {SmartHttpRequest} HTTP request handler
   */
  get http_adapter() {
    if (!this._http_adapter) {
      if (this.model.opts.http_adapter)
        this._http_adapter = this.model.opts.http_adapter;
      else
        this._http_adapter = new SmartHttpRequest({
          adapter: SmartHttpRequestFetchAdapter
        });
    }
    return this._http_adapter;
  }
  /**
   * Get API key for authentication
   * @returns {string} API key
   */
  get api_key() {
    return this.settings.api_key || this.model_config.api_key;
  }
  /**
   * Count tokens in input text
   * @abstract
   * @param {string} input - Text to tokenize
   * @returns {Promise<Object>} Token count result
   * @throws {Error} If not implemented by subclass
   */
  async count_tokens(input) {
    throw new Error("count_tokens not implemented");
  }
  /**
   * Estimate token count for input text
   * Uses character-based estimation (3.7 chars per token)
   * @param {string|Object} input - Input to estimate tokens for
   * @returns {number} Estimated token count
   */
  estimate_tokens(input) {
    if (typeof input === "object") input = JSON.stringify(input);
    return Math.ceil(input.length / 3.7);
  }
  /**
   * Process a batch of inputs for embedding
   * @param {Array<Object>} inputs - Array of input objects
   * @returns {Promise<Array<Object>>} Processed inputs with embeddings
   * @throws {Error} If API key is not set
   */
  async embed_batch(inputs) {
    if (!this.api_key) throw new Error("API key not set");
    inputs = inputs.filter((item) => item.embed_input?.length > 0);
    if (inputs.length === 0) {
      console.log("Empty batch (or all items have empty embed_input)");
      return [];
    }
    const embed_inputs = await Promise.all(
      inputs.map((item) => this.prepare_embed_input(item.embed_input))
    );
    const _req = new this.req_adapter(this, embed_inputs);
    const request_params = _req.to_platform();
    const resp = await this.request(request_params);
    if (!resp) {
      console.error("No response received for embedding request.");
      return [];
    }
    const _res = new this.res_adapter(this, resp);
    const embeddings = _res.to_openai();
    if (!embeddings) {
      console.error("Failed to parse embeddings.");
      return [];
    }
    return inputs.map((item, i) => {
      item.vec = embeddings[i].vec;
      item.tokens = embeddings[i].tokens;
      return item;
    });
  }
  /**
   * Prepare input text for embedding
   * @abstract
   * @param {string} embed_input - Raw input text
   * @returns {Promise<string>} Processed input text
   * @throws {Error} If not implemented by subclass
   */
  async prepare_embed_input(embed_input) {
    throw new Error("prepare_embed_input not implemented");
  }
  /**
   * Prepare request headers
   * @returns {Object} Headers object with authorization
   */
  prepare_request_headers() {
    let headers = {
      "Content-Type": "application/json"
    };
    if (this.api_key) {
      headers["Authorization"] = `Bearer ${this.api_key}`;
    }
    if (this.smart_embed.opts.headers) {
      headers = { ...headers, ...this.smart_embed.opts.headers };
    }
    return headers;
  }
  /**
   * Make API request with retry logic
   * @param {Object} req - Request configuration
   * @param {number} [retries=0] - Number of retries attempted
   * @returns {Promise<Object>} API response
   */
  async request(req, retries = 0) {
    try {
      req.throw = false;
      const resp = await this.http_adapter.request({
        url: this.endpoint,
        ...req
      });
      const resp_json = await this.get_resp_json(resp);
      return resp_json;
    } catch (error) {
      return await this.handle_request_err(error, req, retries);
    }
  }
  /**
   * Handle API request errors with retry logic
   * @param {Error|Object} error - Error object
   * @param {Object} req - Original request
   * @param {number} retries - Number of retries attempted
   * @returns {Promise<Object|null>} Retry response or null
   */
  async handle_request_err(error, req, retries) {
    if (error.status === 429 && retries < 3) {
      const backoff = Math.pow(retries + 1, 2);
      console.log(`Retrying request (429) in ${backoff} seconds...`);
      await new Promise((r) => setTimeout(r, 1e3 * backoff));
      return await this.request(req, retries + 1);
    }
    console.error(error);
    return null;
  }
  /**
   * Parse response body as JSON
   * @param {Response} resp - Response object
   * @returns {Promise<Object>} Parsed JSON
   */
  async get_resp_json(resp) {
    return typeof resp.json === "function" ? await resp.json() : await resp.json;
  }
  /**
   * Validate API key by making test request
   * @returns {Promise<boolean>} True if API key is valid
   */
  async validate_api_key() {
    const resp = await this.embed_batch([{ embed_input: "test" }]);
    return Array.isArray(resp) && resp.length > 0 && resp[0].vec !== null;
  }
};
var SmartEmbedModelRequestAdapter = class {
  /**
   * @constructor
   * @param {SmartEmbedModelApiAdapter} adapter - The SmartEmbedModelApiAdapter instance
   * @param {Array<string>} embed_inputs - The array of input texts
   */
  constructor(adapter, embed_inputs) {
    this.adapter = adapter;
    this.embed_inputs = embed_inputs;
  }
  /**
   * Get request headers
   * @returns {Object} Headers object
   */
  get_headers() {
    return this.adapter.prepare_request_headers();
  }
  /**
   * Convert request to platform-specific format
   * @returns {Object} Platform-specific request parameters
   */
  to_platform() {
    return {
      method: "POST",
      headers: this.get_headers(),
      body: JSON.stringify(this.prepare_request_body())
    };
  }
  /**
   * Prepare request body for API call
   * @abstract
   * @returns {Object} Request body object
   * @throws {Error} If not implemented by subclass
   */
  prepare_request_body() {
    throw new Error("prepare_request_body not implemented");
  }
};
var SmartEmbedModelResponseAdapter = class {
  /**
   * @constructor
   * @param {SmartEmbedModelApiAdapter} adapter - The SmartEmbedModelApiAdapter instance
   * @param {Object} response - The response object
   */
  constructor(adapter, response) {
    this.adapter = adapter;
    this.response = response;
  }
  /**
   * Convert response to standard format
   * @returns {Array<Object>} Array of embedding results
   */
  to_openai() {
    return this.parse_response();
  }
  /**
   * Parse API response
   * @abstract
   * @returns {Array<Object>} Parsed embedding results
   * @throws {Error} If not implemented by subclass
   */
  parse_response() {
    throw new Error("parse_response not implemented");
  }
};

// node_modules/smart-embed-model/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js
var import_base64_js = __toESM(require_base64_js(), 1);
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var _Tiktoken = class {
  /** @internal */
  specialTokens;
  /** @internal */
  inverseSpecialTokens;
  /** @internal */
  patStr;
  /** @internal */
  textEncoder = new TextEncoder();
  /** @internal */
  textDecoder = new TextDecoder("utf-8");
  /** @internal */
  rankMap = /* @__PURE__ */ new Map();
  /** @internal */
  textMap = /* @__PURE__ */ new Map();
  constructor(ranks, extendedSpecialTokens) {
    this.patStr = ranks.pat_str;
    const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
      const [_, offsetStr, ...tokens] = x.split(" ");
      const offset = Number.parseInt(offsetStr, 10);
      tokens.forEach((token, i) => memo[token] = offset + i);
      return memo;
    }, {});
    for (const [token, rank] of Object.entries(uncompressed)) {
      const bytes = import_base64_js.default.toByteArray(token);
      this.rankMap.set(bytes.join(","), rank);
      this.textMap.set(rank, bytes);
    }
    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
      memo[rank] = this.textEncoder.encode(text);
      return memo;
    }, {});
  }
  encode(text, allowedSpecial = [], disallowedSpecial = "all") {
    const regexes = new RegExp(this.patStr, "ug");
    const specialRegex = _Tiktoken.specialTokenRegex(
      Object.keys(this.specialTokens)
    );
    const ret = [];
    const allowedSpecialSet = new Set(
      allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
    );
    const disallowedSpecialSet = new Set(
      disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
        (x) => !allowedSpecialSet.has(x)
      ) : disallowedSpecial
    );
    if (disallowedSpecialSet.size > 0) {
      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
        ...disallowedSpecialSet
      ]);
      const specialMatch = text.match(disallowedSpecialRegex);
      if (specialMatch != null) {
        throw new Error(
          `The text contains a special token that is not allowed: ${specialMatch[0]}`
        );
      }
    }
    let start = 0;
    while (true) {
      let nextSpecial = null;
      let startFind = start;
      while (true) {
        specialRegex.lastIndex = startFind;
        nextSpecial = specialRegex.exec(text);
        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
          break;
        startFind = nextSpecial.index + 1;
      }
      const end = nextSpecial?.index ?? text.length;
      for (const match of text.substring(start, end).matchAll(regexes)) {
        const piece = this.textEncoder.encode(match[0]);
        const token2 = this.rankMap.get(piece.join(","));
        if (token2 != null) {
          ret.push(token2);
          continue;
        }
        ret.push(...bytePairEncode(piece, this.rankMap));
      }
      if (nextSpecial == null)
        break;
      let token = this.specialTokens[nextSpecial[0]];
      ret.push(token);
      start = nextSpecial.index + nextSpecial[0].length;
    }
    return ret;
  }
  decode(tokens) {
    const res = [];
    let length = 0;
    for (let i2 = 0; i2 < tokens.length; ++i2) {
      const token = tokens[i2];
      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
      if (bytes != null) {
        res.push(bytes);
        length += bytes.length;
      }
    }
    const mergedArray = new Uint8Array(length);
    let i = 0;
    for (const bytes of res) {
      mergedArray.set(bytes, i);
      i += bytes.length;
    }
    return this.textDecoder.decode(mergedArray);
  }
};
var Tiktoken = _Tiktoken;
__publicField(Tiktoken, "specialTokenRegex", (tokens) => {
  return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
});

// node_modules/smart-embed-model/cl100k_base.json

// node_modules/smart-embed-model/adapters/openai.js
var SmartEmbedOpenAIAdapter = class extends SmartEmbedModelApiAdapter {
  static defaults = {
    adapter: "openai",
    description: "OpenAI",
    default_model: "text-embedding-3-small",
    endpoint: "https://api.openai.com/v1/embeddings"
  };
  /**
   * Create OpenAI adapter instance
   * @param {SmartEmbedModel} smart_embed - Parent model instance
   */
  constructor(smart_embed) {
    super(smart_embed);
    this.enc = null;
  }
  /**
   * Initialize tokenizer
   * @returns {Promise<void>}
   */
  async load() {
    this.enc = new Tiktoken(cl100k_base_default);
  }
  /**
   * Count tokens in input text using OpenAI's tokenizer
   * @param {string} input - Text to tokenize
   * @returns {Promise<Object>} Token count result
   */
  async count_tokens(input) {
    if (!this.enc) await this.load();
    return { tokens: this.enc.encode(input).length };
  }
  /**
   * Prepare input text for embedding
   * Handles token limit truncation
   * @param {string} embed_input - Raw input text
   * @returns {Promise<string|null>} Processed input text
   */
  async prepare_embed_input(embed_input) {
    if (typeof embed_input !== "string") {
      throw new TypeError("embed_input must be a string");
    }
    if (embed_input.length === 0) {
      console.log("Warning: prepare_embed_input received an empty string");
      return null;
    }
    const { tokens } = await this.count_tokens(embed_input);
    if (tokens <= this.max_tokens) {
      return embed_input;
    }
    return await this.trim_input_to_max_tokens(embed_input, tokens);
  }
  /**
   * Trim input text to fit token limit
   * @private
   * @param {string} embed_input - Input text to trim
   * @param {number} tokens_ct - Current token count
   * @returns {Promise<string|null>} Trimmed input text
   */
  async trim_input_to_max_tokens(embed_input, tokens_ct) {
    const reduce_ratio = (tokens_ct - this.max_tokens) / tokens_ct;
    const new_length = Math.floor(embed_input.length * (1 - reduce_ratio));
    let trimmed_input = embed_input.slice(0, new_length);
    const last_space_index = trimmed_input.lastIndexOf(" ");
    if (last_space_index > 0) {
      trimmed_input = trimmed_input.slice(0, last_space_index);
    }
    const prepared_input = await this.prepare_embed_input(trimmed_input);
    if (prepared_input === null) {
      console.log(
        "Warning: prepare_embed_input resulted in an empty string after trimming"
      );
      return null;
    }
    return prepared_input;
  }
  /**
   * Get the request adapter class.
   * @returns {SmartEmbedOpenAIRequestAdapter} The request adapter class
   */
  get req_adapter() {
    return SmartEmbedOpenAIRequestAdapter;
  }
  /**
   * Get the response adapter class.
   * @returns {SmartEmbedOpenAIResponseAdapter} The response adapter class
   */
  get res_adapter() {
    return SmartEmbedOpenAIResponseAdapter;
  }
  /** @returns {string} OpenAI API key */
  get api_key() {
    return this.settings.openai_api_key;
  }
  /** @returns {number} Maximum tokens per input */
  get max_tokens() {
    return this.model_config.max_tokens || 8191;
  }
  /** @returns {Object} Settings configuration for OpenAI adapter */
  get settings_config() {
    return {
      ...super.settings_config,
      "[ADAPTER].api_key": {
        name: "OpenAI API Key for embeddings",
        type: "password",
        description: "Required for OpenAI embedding models",
        placeholder: "Enter OpenAI API Key"
      }
    };
  }
  /**
   * Get available models (hardcoded list)
   * @returns {Promise<Object>} Map of model objects
   */
  get_models() {
    return Promise.resolve(this.models);
  }
  get models() {
    return {
      "text-embedding-3-small": {
        "id": "text-embedding-3-small",
        "batch_size": 50,
        "dims": 1536,
        "max_tokens": 8191,
        "name": "OpenAI Text-3 Small",
        "description": "API, 8,191 tokens, 1,536 dim",
        "endpoint": "https://api.openai.com/v1/embeddings",
        "adapter": "openai"
      },
      "text-embedding-3-large": {
        "id": "text-embedding-3-large",
        "batch_size": 50,
        "dims": 3072,
        "max_tokens": 8191,
        "name": "OpenAI Text-3 Large",
        "description": "API, 8,191 tokens, 3,072 dim",
        "endpoint": "https://api.openai.com/v1/embeddings",
        "adapter": "openai"
      },
      "text-embedding-3-small-512": {
        "id": "text-embedding-3-small",
        "batch_size": 50,
        "dims": 512,
        "max_tokens": 8191,
        "name": "OpenAI Text-3 Small - 512",
        "description": "API, 8,191 tokens, 512 dim",
        "endpoint": "https://api.openai.com/v1/embeddings",
        "adapter": "openai"
      },
      "text-embedding-3-large-256": {
        "id": "text-embedding-3-large",
        "batch_size": 50,
        "dims": 256,
        "max_tokens": 8191,
        "name": "OpenAI Text-3 Large - 256",
        "description": "API, 8,191 tokens, 256 dim",
        "endpoint": "https://api.openai.com/v1/embeddings",
        "adapter": "openai"
      },
      "text-embedding-ada-002": {
        "id": "text-embedding-ada-002",
        "batch_size": 50,
        "dims": 1536,
        "max_tokens": 8191,
        "name": "OpenAI Ada",
        "description": "API, 8,191 tokens, 1,536 dim",
        "endpoint": "https://api.openai.com/v1/embeddings",
        "adapter": "openai"
      }
    };
  }
};
var SmartEmbedOpenAIRequestAdapter = class extends SmartEmbedModelRequestAdapter {
  /**
   * Prepare request body for OpenAI API
   * @returns {Object} Request body for API
   */
  prepare_request_body() {
    const body = {
      model: this.adapter.model_config.id,
      input: this.embed_inputs
    };
    if (this.adapter.model_key.startsWith("text-embedding-3")) {
      body.dimensions = this.adapter.model_config.dims;
    }
    return body;
  }
};
var SmartEmbedOpenAIResponseAdapter = class extends SmartEmbedModelResponseAdapter {
  /**
   * Parse OpenAI API response
   * @returns {Array<Object>} Parsed embedding results
   */
  parse_response() {
    const resp = this.response;
    if (!resp || !resp.data || !resp.usage) {
      console.error("Invalid response format", resp);
      return [];
    }
    const avg_tokens = resp.usage.total_tokens / resp.data.length;
    return resp.data.map((item) => ({
      vec: item.embedding,
      tokens: avg_tokens
      // OpenAI doesn't provide tokens per item in batch requests
    }));
  }
};

// node_modules/smart-embed-model/adapters/_message.js
var SmartEmbedMessageAdapter = class extends SmartEmbedAdapter {
  /**
   * Create message adapter instance
   * @param {SmartEmbedModel} model - Parent model instance
   */
  constructor(model) {
    super(model);
    this.message_queue = {};
    this.message_id = 0;
    this.connector = null;
    this.message_prefix = `msg_${Math.random().toString(36).substr(2, 9)}_`;
  }
  /**
   * Send message and wait for response
   * @protected
   * @param {string} method - Method name to call
   * @param {Object} params - Method parameters
   * @returns {Promise<any>} Response data
   */
  async _send_message(method, params) {
    return new Promise((resolve, reject) => {
      const id = `${this.message_prefix}${this.message_id++}`;
      this.message_queue[id] = { resolve, reject };
      this._post_message({ method, params, id });
    });
  }
  /**
   * Handle response message from worker/iframe
   * @protected
   * @param {string} id - Message ID
   * @param {*} result - Response result
   * @param {Error} [error] - Response error
   */
  _handle_message_result(id, result, error) {
    if (!id.startsWith(this.message_prefix)) return;
    if (result?.model_loaded) {
      console.log("model loaded");
      this.model.model_loaded = true;
    }
    if (this.message_queue[id]) {
      if (error) {
        this.message_queue[id].reject(new Error(error));
      } else {
        this.message_queue[id].resolve(result);
      }
      delete this.message_queue[id];
    }
  }
  /**
   * Count tokens in input text
   * @param {string} input - Text to tokenize
   * @returns {Promise<Object>} Token count result
   */
  async count_tokens(input) {
    return this._send_message("count_tokens", { input });
  }
  /**
   * Generate embeddings for multiple inputs
   * @param {Array<Object>} inputs - Array of input objects
   * @returns {Promise<Array<Object>>} Processed inputs with embeddings
   */
  async embed_batch(inputs) {
    inputs = inputs.filter((item) => item.embed_input?.length > 0);
    if (!inputs.length) return [];
    const embed_inputs = inputs.map((item) => ({ embed_input: item.embed_input }));
    const result = await this._send_message("embed_batch", { inputs: embed_inputs });
    return inputs.map((item, i) => {
      item.vec = result[i].vec;
      item.tokens = result[i].tokens;
      return item;
    });
  }
  /**
   * Post message to worker/iframe
   * @abstract
   * @protected
   * @param {Object} message_data - Message to send
   * @throws {Error} If not implemented by subclass
   */
  _post_message(message_data) {
    throw new Error("_post_message must be implemented by subclass");
  }
};

// node_modules/smart-embed-model/adapters/iframe.js
var SmartEmbedIframeAdapter = class extends SmartEmbedMessageAdapter {
  /**
   * Create iframe adapter instance
   * @param {SmartEmbedModel} model - Parent model instance
   */
  constructor(model) {
    super(model);
    this.iframe = null;
    this.origin = window.location.origin;
    this.iframe_id = `smart_embed_iframe`;
  }
  /**
   * Initialize iframe and load model
   * @returns {Promise<void>}
   */
  async load() {
    const existing_iframe = document.getElementById(this.iframe_id);
    if (existing_iframe) {
      existing_iframe.remove();
    }
    this.iframe = document.createElement("iframe");
    this.iframe.style.display = "none";
    this.iframe.id = this.iframe_id;
    this.iframe.sandbox = "allow-scripts allow-same-origin";
    document.body.appendChild(this.iframe);
    window.addEventListener("message", this._handle_message.bind(this));
    this.iframe.srcdoc = `
          <html>
            <body>
              <script type="module">
                ${this.connector}
                // Set up a message listener in the iframe
                window.addEventListener('message', async (event) => {
                    if (event.origin !== '${this.origin}' || event.data.iframe_id !== '${this.iframe_id}') return console.log('message ignored (listener)', event);
                    // Process the message and send the response back
                    const response = await process_message(event.data);
                    window.parent.postMessage({ ...response, iframe_id: '${this.iframe_id}' }, '${this.origin}');
                });
              </script>
            </body>
          </html>
        `;
    await new Promise((resolve) => this.iframe.onload = resolve);
    const load_opts = {
      // ...this.model.opts,
      model_key: this.model.model_key,
      adapters: null,
      // cannot clone classes
      settings: null,
      batch_size: this.batch_size,
      use_gpu: this.use_gpu
    };
    console.log({ load_opts });
    await this._send_message("load", load_opts);
    return new Promise((resolve) => {
      const check_model_loaded = () => {
        if (this.model.model_loaded) {
          resolve();
        } else {
          setTimeout(check_model_loaded, 100);
        }
      };
      check_model_loaded();
    });
  }
  /**
   * Post message to iframe
   * @protected
   * @param {Object} message_data - Message to send
   */
  _post_message(message_data) {
    this.iframe.contentWindow.postMessage({ ...message_data, iframe_id: this.iframe_id }, this.origin);
  }
  /**
   * Handle message from iframe
   * @private
   * @param {MessageEvent} event - Message event
   */
  _handle_message(event) {
    if (event.origin !== this.origin || event.data.iframe_id !== this.iframe_id) return;
    const { id, result, error } = event.data;
    this._handle_message_result(id, result, error);
  }
};

// node_modules/smart-embed-model/connectors/transformers_iframe.js
var transformers_connector = 'var __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);\n\n// ../smart-model/smart_model.js\nvar SmartModel = class {\n  /**\n   * Create a SmartModel instance.\n   * @param {Object} opts - Configuration options\n   * @param {Object} opts.adapters - Map of adapter names to adapter classes\n   * @param {Object} opts.settings - Model settings configuration\n   * @param {Object} opts.model_config - Model-specific configuration\n   * @param {string} opts.model_config.adapter - Name of the adapter to use\n   * @param {string} [opts.model_key] - Optional model identifier to override settings\n   * @throws {Error} If required options are missing\n   */\n  constructor(opts = {}) {\n    __publicField(this, "scope_name", "smart_model");\n    this.opts = opts;\n    this.validate_opts(opts);\n    this.state = "unloaded";\n    this._adapter = null;\n  }\n  /**\n   * Initialize the model by loading the configured adapter.\n   * @async\n   * @returns {Promise<void>}\n   */\n  async initialize() {\n    this.load_adapter(this.adapter_name);\n    await this.load();\n  }\n  /**\n   * Validate required options.\n   * @param {Object} opts - Configuration options\n   */\n  validate_opts(opts) {\n    if (!opts.adapters) throw new Error("opts.adapters is required");\n    if (!opts.settings) throw new Error("opts.settings is required");\n  }\n  /**\n   * Get the current settings\n   * @returns {Object} Current settings\n   */\n  get settings() {\n    if (!this.opts.settings) this.opts.settings = {\n      ...this.constructor.defaults\n    };\n    return this.opts.settings;\n  }\n  /**\n   * Get the current adapter name\n   * @returns {string} Current adapter name\n   */\n  get adapter_name() {\n    const adapter_key = this.opts.model_config?.adapter || this.opts.adapter || this.settings.adapter || Object.keys(this.adapters)[0];\n    if (!adapter_key || !this.adapters[adapter_key]) throw new Error(`Platform "${adapter_key}" not supported`);\n    return adapter_key;\n  }\n  /**\n   * Get adapter-specific settings.\n   * @returns {Object} Settings for current adapter\n   */\n  get adapter_settings() {\n    if (!this.settings[this.adapter_name]) this.settings[this.adapter_name] = {};\n    return this.settings[this.adapter_name];\n  }\n  get adapter_config() {\n    const base_config = this.adapters[this.adapter_name]?.defaults || {};\n    return {\n      ...base_config,\n      ...this.adapter_settings,\n      ...this.opts.adapter_config\n    };\n  }\n  /**\n   * Get available models.\n   * @returns {Object} Map of model objects\n   */\n  get models() {\n    return this.adapter.models;\n  }\n  /**\n   * Get the default model key to use\n   * @returns {string} Default model identifier\n   */\n  get default_model_key() {\n    throw new Error("default_model_key must be overridden in sub-class");\n  }\n  /**\n   * Get the current model key\n   * @returns {string} Current model key\n   */\n  get model_key() {\n    return this.opts.model_key || this.adapter_config.model_key || this.settings.model_key || this.default_model_key;\n  }\n  /**\n   * Get the current model configuration\n   * @returns {Object} Combined base and custom model configuration\n   */\n  get model_config() {\n    const model_key = this.model_key;\n    const base_model_config = this.models[model_key] || {};\n    return {\n      ...this.adapter_config,\n      ...base_model_config,\n      ...this.opts.model_config\n    };\n  }\n  get model_settings() {\n    if (!this.settings[this.model_key]) this.settings[this.model_key] = {};\n    return this.settings[this.model_key];\n  }\n  /**\n   * Load the current adapter and transition to loaded state.\n   * @async\n   * @returns {Promise<void>}\n   */\n  async load() {\n    this.set_state("loading");\n    if (!this.adapter?.loaded) {\n      await this.invoke_adapter_method("load");\n    }\n    this.set_state("loaded");\n  }\n  /**\n   * Unload the current adapter and transition to unloaded state.\n   * @async\n   * @returns {Promise<void>}\n   */\n  async unload() {\n    if (this.adapter?.loaded) {\n      this.set_state("unloading");\n      await this.invoke_adapter_method("unload");\n      this.set_state("unloaded");\n    }\n  }\n  /**\n   * Set the model\'s state.\n   * @param {(\'unloaded\'|\'loading\'|\'loaded\'|\'unloading\')} new_state - The new state\n   * @throws {Error} If the state is invalid\n   */\n  set_state(new_state) {\n    const valid_states = ["unloaded", "loading", "loaded", "unloading"];\n    if (!valid_states.includes(new_state)) {\n      throw new Error(`Invalid state: ${new_state}`);\n    }\n    this.state = new_state;\n  }\n  get is_loading() {\n    return this.state === "loading";\n  }\n  get is_loaded() {\n    return this.state === "loaded";\n  }\n  get is_unloading() {\n    return this.state === "unloading";\n  }\n  get is_unloaded() {\n    return this.state === "unloaded";\n  }\n  // ADAPTERS\n  /**\n   * Get the map of available adapters\n   * @returns {Object} Map of adapter names to adapter classes\n   */\n  get adapters() {\n    return this.opts.adapters || {};\n  }\n  /**\n   * Load a specific adapter by name.\n   * @async\n   * @param {string} adapter_name - Name of the adapter to load\n   * @throws {Error} If adapter not found or loading fails\n   * @returns {Promise<void>}\n   */\n  async load_adapter(adapter_name) {\n    this.set_adapter(adapter_name);\n    if (!this._adapter.loaded) {\n      this.set_state("loading");\n      try {\n        await this.invoke_adapter_method("load");\n        this.set_state("loaded");\n      } catch (err) {\n        this.set_state("unloaded");\n        throw new Error(`Failed to load adapter: ${err.message}`);\n      }\n    }\n  }\n  /**\n   * Set an adapter instance by name without loading it.\n   * @param {string} adapter_name - Name of the adapter to set\n   * @throws {Error} If adapter not found\n   */\n  set_adapter(adapter_name) {\n    const AdapterClass = this.adapters[adapter_name];\n    if (!AdapterClass) {\n      throw new Error(`Adapter "${adapter_name}" not found.`);\n    }\n    if (this._adapter?.constructor.name.toLowerCase() === adapter_name.toLowerCase()) {\n      return;\n    }\n    this._adapter = new AdapterClass(this);\n  }\n  /**\n   * Get the current active adapter instance\n   * @returns {Object} The active adapter instance\n   * @throws {Error} If adapter not found\n   */\n  get adapter() {\n    const adapter_name = this.adapter_name;\n    if (!adapter_name) {\n      throw new Error(`Adapter not set for model.`);\n    }\n    if (!this._adapter) {\n      this.load_adapter(adapter_name);\n    }\n    return this._adapter;\n  }\n  /**\n   * Ensure the adapter is ready to execute a method.\n   * @param {string} method - Name of the method to check\n   * @throws {Error} If adapter not loaded or method not implemented\n   */\n  ensure_adapter_ready(method) {\n    if (!this.adapter) {\n      throw new Error("No adapter loaded.");\n    }\n    if (typeof this.adapter[method] !== "function") {\n      throw new Error(`Adapter does not implement method: ${method}`);\n    }\n  }\n  /**\n   * Invoke a method on the current adapter.\n   * @async\n   * @param {string} method - Name of the method to call\n   * @param {...any} args - Arguments to pass to the method\n   * @returns {Promise<any>} Result from the adapter method\n   * @throws {Error} If adapter not ready or method fails\n   */\n  async invoke_adapter_method(method, ...args) {\n    this.ensure_adapter_ready(method);\n    return await this.adapter[method](...args);\n  }\n  /**\n   * Get platforms as dropdown options.\n   * @returns {Array<Object>} Array of {value, name} option objects\n   */\n  get_platforms_as_options() {\n    console.log("get_platforms_as_options", this.adapters);\n    return Object.entries(this.adapters).map(([key, AdapterClass]) => ({ value: key, name: AdapterClass.defaults.description || key }));\n  }\n  // SETTINGS\n  /**\n   * Get the settings configuration schema\n   * @returns {Object} Settings configuration object\n   */\n  get settings_config() {\n    return this.process_settings_config({\n      adapter: {\n        name: "Model Platform",\n        type: "dropdown",\n        description: "Select a model platform to use with Smart Model.",\n        options_callback: "get_platforms_as_options",\n        is_scope: true,\n        // trigger re-render of settings when changed\n        callback: "adapter_changed",\n        default: "default"\n      }\n    });\n  }\n  /**\n   * Process settings configuration with conditionals and prefixes.\n   * @param {Object} _settings_config - Raw settings configuration\n   * @param {string} [prefix] - Optional prefix for setting keys\n   * @returns {Object} Processed settings configuration\n   */\n  process_settings_config(_settings_config, prefix = null) {\n    return Object.entries(_settings_config).reduce((acc, [key, val]) => {\n      if (val.conditional) {\n        if (!val.conditional(this)) return acc;\n        delete val.conditional;\n      }\n      const new_key = (prefix ? prefix + "." : "") + this.process_setting_key(key);\n      acc[new_key] = val;\n      return acc;\n    }, {});\n  }\n  /**\n   * Process an individual setting key.\n   * @param {string} key - Setting key to process\n   * @returns {string} Processed setting key\n   */\n  process_setting_key(key) {\n    return key;\n  }\n  // override in sub-class if needed for prefixes and variable replacements\n  re_render_settings() {\n    if (typeof this.opts.re_render_settings === "function") this.opts.re_render_settings();\n    else console.warn("re_render_settings is not a function (must be passed in model opts)");\n  }\n  /**\n   * Reload model.\n   */\n  reload_model() {\n    console.log("reload_model", this.opts);\n    if (typeof this.opts.reload_model === "function") this.opts.reload_model();\n    else console.warn("reload_model is not a function (must be passed in model opts)");\n  }\n  adapter_changed() {\n    this.reload_model();\n    this.re_render_settings();\n  }\n  model_changed() {\n    this.reload_model();\n    this.re_render_settings();\n  }\n  // /**\n  //  * Render settings.\n  //  * @param {HTMLElement} [container] - Container element\n  //  * @param {Object} [opts] - Render options\n  //  * @returns {Promise<HTMLElement>} Container element\n  //  */\n  // async render_settings(container=this.settings_container, opts = {}) {\n  //   if(!this.settings_container || container !== this.settings_container) this.settings_container = container;\n  //   const model_type = this.constructor.name.toLowerCase().replace(\'smart\', \'\').replace(\'model\', \'\');\n  //   let model_settings_container;\n  //   if(this.settings_container) {\n  //     const container_id = `#${model_type}-model-settings-container`;\n  //     model_settings_container = this.settings_container.querySelector(container_id);\n  //     if(!model_settings_container) {\n  //       model_settings_container = document.createElement(\'div\');\n  //       model_settings_container.id = container_id;\n  //       this.settings_container.appendChild(model_settings_container);\n  //     }\n  //     model_settings_container.innerHTML = \'<div class="sc-loading">Loading \' + this.adapter_name + \' settings...</div>\';\n  //   }\n  //   const frag = await this.render_settings_component(this, opts);\n  //   if(model_settings_container) {\n  //     model_settings_container.innerHTML = \'\';\n  //     model_settings_container.appendChild(frag);\n  //     this.smart_view.on_open_overlay(model_settings_container);\n  //   }\n  //   return frag;\n  // }\n};\n__publicField(SmartModel, "defaults", {\n  // override in sub-class if needed\n});\n\n// smart_embed_model.js\nvar SmartEmbedModel = class extends SmartModel {\n  /**\n   * Create a SmartEmbedModel instance\n   * @param {Object} opts - Configuration options\n   * @param {Object} [opts.adapters] - Map of available adapter implementations\n   * @param {boolean} [opts.use_gpu] - Whether to enable GPU acceleration\n   * @param {number} [opts.gpu_batch_size] - Batch size when using GPU\n   * @param {number} [opts.batch_size] - Default batch size for processing\n   * @param {Object} [opts.model_config] - Model-specific configuration\n   * @param {string} [opts.model_config.adapter] - Override adapter type\n   * @param {number} [opts.model_config.dims] - Embedding dimensions\n   * @param {number} [opts.model_config.max_tokens] - Maximum tokens to process\n   * @param {Object} [opts.settings] - User settings\n   * @param {string} [opts.settings.api_key] - API key for remote models\n   * @param {number} [opts.settings.min_chars] - Minimum text length to embed\n   */\n  constructor(opts = {}) {\n    super(opts);\n    __publicField(this, "scope_name", "smart_embed_model");\n  }\n  /**\n   * Count tokens in an input string\n   * @param {string} input - Text to tokenize\n   * @returns {Promise<Object>} Token count result\n   * @property {number} tokens - Number of tokens in input\n   * \n   * @example\n   * ```javascript\n   * const result = await model.count_tokens("Hello world");\n   * console.log(result.tokens); // 2\n   * ```\n   */\n  async count_tokens(input) {\n    return await this.invoke_adapter_method("count_tokens", input);\n  }\n  /**\n   * Generate embeddings for a single input\n   * @param {string|Object} input - Text or object with embed_input property\n   * @returns {Promise<Object>} Embedding result\n   * @property {number[]} vec - Embedding vector\n   * @property {number} tokens - Token count\n   * \n   * @example\n   * ```javascript\n   * const result = await model.embed("Hello world");\n   * console.log(result.vec); // [0.1, 0.2, ...]\n   * ```\n   */\n  async embed(input) {\n    if (typeof input === "string") input = { embed_input: input };\n    return (await this.embed_batch([input]))[0];\n  }\n  /**\n   * Generate embeddings for multiple inputs in batch\n   * @param {Array<string|Object>} inputs - Array of texts or objects with embed_input\n   * @returns {Promise<Array<Object>>} Array of embedding results\n   * @property {number[]} vec - Embedding vector for each input\n   * @property {number} tokens - Token count for each input\n   * \n   * @example\n   * ```javascript\n   * const results = await model.embed_batch([\n   *   { embed_input: "First text" },\n   *   { embed_input: "Second text" }\n   * ]);\n   * ```\n   */\n  async embed_batch(inputs) {\n    return await this.invoke_adapter_method("embed_batch", inputs);\n  }\n  /**\n   * Get the current batch size based on GPU settings\n   * @returns {number} Current batch size for processing\n   */\n  get batch_size() {\n    return this.adapter.batch_size || 1;\n  }\n  /**\n   * Get settings configuration schema\n   * @returns {Object} Settings configuration object\n   */\n  get settings_config() {\n    const _settings_config = {\n      adapter: {\n        name: "Embedding Model Platform",\n        type: "dropdown",\n        description: "Select an embedding model platform.",\n        options_callback: "get_platforms_as_options",\n        callback: "adapter_changed",\n        default: this.constructor.defaults.adapter\n      },\n      ...this.adapter.settings_config || {}\n    };\n    return this.process_settings_config(_settings_config);\n  }\n  process_setting_key(key) {\n    return key.replace(/\\[ADAPTER\\]/g, this.adapter_name);\n  }\n  /**\n   * Get available embedding model options\n   * @returns {Array<Object>} Array of model options with value and name\n   */\n  get_embedding_model_options() {\n    return Object.entries(this.models).map(([key, model2]) => ({ value: key, name: key }));\n  }\n  /**\n   * Get embedding model options including \'None\' option\n   * @returns {Array<Object>} Array of model options with value and name\n   */\n  get_block_embedding_model_options() {\n    const options = this.get_embedding_model_options();\n    options.unshift({ value: "None", name: "None" });\n    return options;\n  }\n};\n__publicField(SmartEmbedModel, "defaults", {\n  adapter: "transformers"\n});\n\n// ../smart-model/adapters/_adapter.js\nvar SmartModelAdapter = class {\n  /**\n   * Create a SmartModelAdapter instance.\n   * @param {SmartModel} model - The parent SmartModel instance\n   */\n  constructor(model2) {\n    this.model = model2;\n    this.state = "unloaded";\n  }\n  /**\n   * Load the adapter.\n   * @async\n   * @returns {Promise<void>}\n   */\n  async load() {\n    this.set_state("loaded");\n  }\n  /**\n   * Unload the adapter.\n   * @returns {void}\n   */\n  unload() {\n    this.set_state("unloaded");\n  }\n  /**\n   * Get all settings.\n   * @returns {Object} All settings\n   */\n  get settings() {\n    return this.model.settings;\n  }\n  /**\n   * Get the current model key.\n   * @returns {string} Current model identifier\n   */\n  get model_key() {\n    return this.model.model_key;\n  }\n  /**\n   * Get the current model configuration.\n   * @returns {Object} Model configuration\n   */\n  get model_config() {\n    return this.model.model_config;\n  }\n  /**\n   * Get model-specific settings.\n   * @returns {Object} Settings for current model\n   */\n  get model_settings() {\n    return this.model.model_settings;\n  }\n  /**\n   * Get adapter-specific configuration.\n   * @returns {Object} Adapter configuration\n   */\n  get adapter_config() {\n    return this.model.adapter_config;\n  }\n  /**\n   * Get adapter-specific settings.\n   * @returns {Object} Adapter settings\n   */\n  get adapter_settings() {\n    return this.model.adapter_settings;\n  }\n  /**\n   * Get the models.\n   * @returns {Object} Map of model objects\n   */\n  get models() {\n    if (typeof this.adapter_config.models === "object" && Object.keys(this.adapter_config.models || {}).length > 0) return this.adapter_config.models;\n    else {\n      return {};\n    }\n  }\n  /**\n   * Get available models from the API.\n   * @abstract\n   * @param {boolean} [refresh=false] - Whether to refresh cached models\n   * @returns {Promise<Object>} Map of model objects\n   */\n  async get_models(refresh = false) {\n    throw new Error("get_models not implemented");\n  }\n  /**\n   * Validate the parameters for get_models.\n   * @returns {boolean|Array<Object>} True if parameters are valid, otherwise an array of error objects\n   */\n  validate_get_models_params() {\n    return true;\n  }\n  /**\n   * Get available models as dropdown options synchronously.\n   * @returns {Array<Object>} Array of model options.\n   */\n  get_models_as_options_sync() {\n    const models = this.models;\n    const params_valid = this.validate_get_models_params();\n    if (params_valid !== true) return params_valid;\n    if (!Object.keys(models || {}).length) {\n      this.get_models(true);\n      return [{ value: "", name: "No models currently available" }];\n    }\n    return Object.values(models).map((model2) => ({ value: model2.id, name: model2.name || model2.id })).sort((a, b) => a.name.localeCompare(b.name));\n  }\n  /**\n   * Set the adapter\'s state.\n   * @param {(\'unloaded\'|\'loading\'|\'loaded\'|\'unloading\')} new_state - The new state\n   * @throws {Error} If the state is invalid\n   */\n  set_state(new_state) {\n    const valid_states = ["unloaded", "loading", "loaded", "unloading"];\n    if (!valid_states.includes(new_state)) {\n      throw new Error(`Invalid state: ${new_state}`);\n    }\n    this.state = new_state;\n  }\n  // Replace individual state getters/setters with a unified state management\n  get is_loading() {\n    return this.state === "loading";\n  }\n  get is_loaded() {\n    return this.state === "loaded";\n  }\n  get is_unloading() {\n    return this.state === "unloading";\n  }\n  get is_unloaded() {\n    return this.state === "unloaded";\n  }\n};\n\n// adapters/_adapter.js\nvar SmartEmbedAdapter = class extends SmartModelAdapter {\n  /**\n   * Create adapter instance\n   * @param {SmartEmbedModel} model - Parent model instance\n   */\n  constructor(model2) {\n    super(model2);\n    this.smart_embed = model2;\n  }\n  /**\n   * Count tokens in input text\n   * @abstract\n   * @param {string} input - Text to tokenize\n   * @returns {Promise<Object>} Token count result\n   * @property {number} tokens - Number of tokens in input\n   * @throws {Error} If not implemented by subclass\n   */\n  async count_tokens(input) {\n    throw new Error("count_tokens method not implemented");\n  }\n  /**\n   * Generate embeddings for single input\n   * @abstract\n   * @param {string|Object} input - Text to embed\n   * @returns {Promise<Object>} Embedding result\n   * @property {number[]} vec - Embedding vector\n   * @property {number} tokens - Number of tokens in input\n   * @throws {Error} If not implemented by subclass\n   */\n  async embed(input) {\n    throw new Error("embed method not implemented");\n  }\n  /**\n   * Generate embeddings for multiple inputs\n   * @abstract\n   * @param {Array<string|Object>} inputs - Texts to embed\n   * @returns {Promise<Array<Object>>} Array of embedding results\n   * @property {number[]} vec - Embedding vector for each input\n   * @property {number} tokens - Number of tokens in each input\n   * @throws {Error} If not implemented by subclass\n   */\n  async embed_batch(inputs) {\n    throw new Error("embed_batch method not implemented");\n  }\n  get settings_config() {\n    return {\n      "[ADAPTER].model_key": {\n        name: "Embedding Model",\n        type: "dropdown",\n        description: "Select an embedding model.",\n        options_callback: "adapter.get_models_as_options_sync",\n        callback: "model_changed",\n        default: this.constructor.defaults.default_model\n      }\n    };\n  }\n  get dims() {\n    return this.model_config.dims;\n  }\n  get max_tokens() {\n    return this.model_config.max_tokens;\n  }\n  // get batch_size() { return this.model_config.batch_size; }\n  get use_gpu() {\n    if (typeof this._use_gpu === "undefined") {\n      if (typeof this.model.opts.use_gpu !== "undefined") this._use_gpu = this.model.opts.use_gpu;\n      else this._use_gpu = typeof navigator !== "undefined" && !!navigator?.gpu && this.model_settings.gpu_batch_size !== 0;\n    }\n    return this._use_gpu;\n  }\n  set use_gpu(value) {\n    this._use_gpu = value;\n  }\n  get batch_size() {\n    if (this.use_gpu && this.model_settings?.gpu_batch_size) return this.model_settings.gpu_batch_size;\n    return this.model.opts.batch_size || this.model_config.batch_size || 1;\n  }\n};\n/**\n * @override in sub-class with adapter-specific default configurations\n * @property {string} id - The adapter identifier\n * @property {string} description - Human-readable description\n * @property {string} type - Adapter type ("API")\n * @property {string} endpoint - API endpoint\n * @property {string} adapter - Adapter identifier\n * @property {string} default_model - Default model to use\n */\n__publicField(SmartEmbedAdapter, "defaults", {});\n\n// adapters/transformers.js\nvar transformers_defaults = {\n  adapter: "transformers",\n  description: "Transformers",\n  default_model: "TaylorAI/bge-micro-v2"\n};\nvar SmartEmbedTransformersAdapter = class extends SmartEmbedAdapter {\n  /**\n   * Create transformers adapter instance\n   * @param {SmartEmbedModel} model - Parent model instance\n   */\n  constructor(model2) {\n    super(model2);\n    this.pipeline = null;\n    this.tokenizer = null;\n  }\n  /**\n   * Load model and tokenizer\n   * @returns {Promise<void>}\n   */\n  async load() {\n    await this.load_transformers();\n    this.loaded = true;\n  }\n  /**\n   * Unload model and free resources\n   * @returns {Promise<void>}\n   */\n  async unload() {\n    if (this.pipeline) {\n      if (this.pipeline.destroy) await this.pipeline.destroy();\n      this.pipeline = null;\n    }\n    if (this.tokenizer) {\n      this.tokenizer = null;\n    }\n    this.loaded = false;\n  }\n  /**\n   * Initialize transformers pipeline and tokenizer\n   * @private\n   * @returns {Promise<void>}\n   */\n  async load_transformers() {\n    const { pipeline, env, AutoTokenizer } = await import("@xenova/transformers");\n    env.allowLocalModels = false;\n    const pipeline_opts = {\n      quantized: true\n    };\n    if (this.use_gpu) {\n      console.log("[Transformers] Using GPU");\n      pipeline_opts.device = "webgpu";\n      pipeline_opts.dtype = "fp32";\n    } else {\n      console.log("[Transformers] Using CPU");\n      env.backends.onnx.wasm.numThreads = 8;\n    }\n    this.pipeline = await pipeline("feature-extraction", this.model_key, pipeline_opts);\n    this.tokenizer = await AutoTokenizer.from_pretrained(this.model_key);\n  }\n  /**\n   * Count tokens in input text\n   * @param {string} input - Text to tokenize\n   * @returns {Promise<Object>} Token count result\n   */\n  async count_tokens(input) {\n    if (!this.tokenizer) await this.load();\n    const { input_ids } = await this.tokenizer(input);\n    return { tokens: input_ids.data.length };\n  }\n  /**\n   * Generate embeddings for multiple inputs\n   * @param {Array<Object>} inputs - Array of input objects\n   * @returns {Promise<Array<Object>>} Processed inputs with embeddings\n   */\n  async embed_batch(inputs) {\n    if (!this.pipeline) await this.load();\n    const filtered_inputs = inputs.filter((item) => item.embed_input?.length > 0);\n    if (!filtered_inputs.length) return [];\n    if (filtered_inputs.length > this.batch_size) {\n      console.log(`Processing ${filtered_inputs.length} inputs in batches of ${this.batch_size}`);\n      const results = [];\n      for (let i = 0; i < filtered_inputs.length; i += this.batch_size) {\n        const batch = filtered_inputs.slice(i, i + this.batch_size);\n        const batch_results = await this._process_batch(batch);\n        results.push(...batch_results);\n      }\n      return results;\n    }\n    return await this._process_batch(filtered_inputs);\n  }\n  /**\n   * Process a single batch of inputs\n   * @private\n   * @param {Array<Object>} batch_inputs - Batch of inputs to process\n   * @returns {Promise<Array<Object>>} Processed batch results\n   */\n  async _process_batch(batch_inputs) {\n    const tokens = await Promise.all(batch_inputs.map((item) => this.count_tokens(item.embed_input)));\n    const embed_inputs = await Promise.all(batch_inputs.map(async (item, i) => {\n      if (tokens[i].tokens < this.max_tokens) return item.embed_input;\n      let token_ct = tokens[i].tokens;\n      let truncated_input = item.embed_input;\n      while (token_ct > this.max_tokens) {\n        const pct = this.max_tokens / token_ct;\n        const max_chars = Math.floor(truncated_input.length * pct * 0.9);\n        truncated_input = truncated_input.substring(0, max_chars) + "...";\n        token_ct = (await this.count_tokens(truncated_input)).tokens;\n      }\n      tokens[i].tokens = token_ct;\n      return truncated_input;\n    }));\n    try {\n      const resp = await this.pipeline(embed_inputs, { pooling: "mean", normalize: true });\n      return batch_inputs.map((item, i) => {\n        item.vec = Array.from(resp[i].data).map((val) => Math.round(val * 1e8) / 1e8);\n        item.tokens = tokens[i].tokens;\n        return item;\n      });\n    } catch (err) {\n      console.error("error_processing_batch", err);\n      return Promise.all(batch_inputs.map(async (item) => {\n        try {\n          const result = await this.pipeline(item.embed_input, { pooling: "mean", normalize: true });\n          item.vec = Array.from(result[0].data).map((val) => Math.round(val * 1e8) / 1e8);\n          item.tokens = (await this.count_tokens(item.embed_input)).tokens;\n          return item;\n        } catch (single_err) {\n          console.error("error_processing_single_item", single_err);\n          return {\n            ...item,\n            vec: [],\n            tokens: 0,\n            error: single_err.message\n          };\n        }\n      }));\n    }\n  }\n  /** @returns {Object} Settings configuration for transformers adapter */\n  get settings_config() {\n    return transformers_settings_config;\n  }\n  /**\n   * Get available models (hardcoded list)\n   * @returns {Promise<Object>} Map of model objects\n   */\n  get_models() {\n    return Promise.resolve(this.models);\n  }\n  get models() {\n    return transformers_models;\n  }\n};\n__publicField(SmartEmbedTransformersAdapter, "defaults", transformers_defaults);\nvar transformers_models = {\n  "TaylorAI/bge-micro-v2": {\n    "id": "TaylorAI/bge-micro-v2",\n    "batch_size": 1,\n    "dims": 384,\n    "max_tokens": 512,\n    "name": "BGE-micro-v2",\n    "description": "Local, 512 tokens, 384 dim (recommended)",\n    "adapter": "transformers"\n  },\n  "TaylorAI/gte-tiny": {\n    "id": "TaylorAI/gte-tiny",\n    "batch_size": 1,\n    "dims": 384,\n    "max_tokens": 512,\n    "name": "GTE-tiny",\n    "description": "Local, 512 tokens, 384 dim",\n    "adapter": "transformers"\n  },\n  "Mihaiii/Ivysaur": {\n    "id": "Mihaiii/Ivysaur",\n    "batch_size": 1,\n    "dims": 384,\n    "max_tokens": 512,\n    "name": "Ivysaur",\n    "description": "Local, 512 tokens, 384 dim",\n    "adapter": "transformers"\n  },\n  "andersonbcdefg/bge-small-4096": {\n    "id": "andersonbcdefg/bge-small-4096",\n    "batch_size": 1,\n    "dims": 384,\n    "max_tokens": 4096,\n    "name": "BGE-small-4K",\n    "description": "Local, 4,096 tokens, 384 dim",\n    "adapter": "transformers"\n  },\n  "Xenova/jina-embeddings-v2-base-zh": {\n    "id": "Xenova/jina-embeddings-v2-base-zh",\n    "batch_size": 1,\n    "dims": 512,\n    "max_tokens": 8192,\n    "name": "Jina-v2-base-zh-8K",\n    "description": "Local, 8,192 tokens, 512 dim, Chinese/English bilingual",\n    "adapter": "transformers"\n  },\n  "Xenova/jina-embeddings-v2-small-en": {\n    "id": "Xenova/jina-embeddings-v2-small-en",\n    "batch_size": 1,\n    "dims": 512,\n    "max_tokens": 8192,\n    "name": "Jina-v2-small-en",\n    "description": "Local, 8,192 tokens, 512 dim",\n    "adapter": "transformers"\n  },\n  "nomic-ai/nomic-embed-text-v1.5": {\n    "id": "nomic-ai/nomic-embed-text-v1.5",\n    "batch_size": 1,\n    "dims": 256,\n    "max_tokens": 8192,\n    "name": "Nomic-embed-text-v1.5",\n    "description": "Local, 8,192 tokens, 256 dim",\n    "adapter": "transformers"\n  },\n  "Xenova/bge-small-en-v1.5": {\n    "id": "Xenova/bge-small-en-v1.5",\n    "batch_size": 1,\n    "dims": 384,\n    "max_tokens": 512,\n    "name": "BGE-small",\n    "description": "Local, 512 tokens, 384 dim",\n    "adapter": "transformers"\n  },\n  "nomic-ai/nomic-embed-text-v1": {\n    "id": "nomic-ai/nomic-embed-text-v1",\n    "batch_size": 1,\n    "dims": 768,\n    "max_tokens": 2048,\n    "name": "Nomic-embed-text",\n    "description": "Local, 2,048 tokens, 768 dim",\n    "adapter": "transformers"\n  }\n};\nvar transformers_settings_config = {\n  "[ADAPTER].gpu_batch_size": {\n    name: "GPU Batch Size",\n    type: "number",\n    description: "Number of embeddings to process per batch on GPU. Use 0 to disable GPU.",\n    placeholder: "Enter number ex. 10"\n  },\n  "[ADAPTER].legacy_transformers": {\n    name: "Legacy Transformers (no GPU)",\n    type: "toggle",\n    description: "Use legacy transformers (v2) instead of v3.",\n    callback: "embed_model_changed",\n    default: true\n  }\n};\n\n// build/transformers_iframe_script.js\nvar model = null;\nasync function process_message(data) {\n  const { method, params, id, iframe_id } = data;\n  try {\n    let result;\n    switch (method) {\n      case "init":\n        console.log("init");\n        break;\n      case "load":\n        console.log("load", params);\n        model = new SmartEmbedModel({\n          ...params,\n          adapters: { transformers: SmartEmbedTransformersAdapter },\n          adapter: "transformers",\n          settings: {}\n        });\n        await model.load();\n        result = { model_loaded: true };\n        break;\n      case "embed_batch":\n        if (!model) throw new Error("Model not loaded");\n        result = await model.embed_batch(params.inputs);\n        break;\n      case "count_tokens":\n        if (!model) throw new Error("Model not loaded");\n        result = await model.count_tokens(params);\n        break;\n      default:\n        throw new Error(`Unknown method: ${method}`);\n    }\n    return { id, result, iframe_id };\n  } catch (error) {\n    console.error("Error processing message:", error);\n    return { id, error: error.message, iframe_id };\n  }\n}\nprocess_message({ method: "init" });\n';

// node_modules/smart-embed-model/adapters/transformers.js
var transformers_defaults = {
  adapter: "transformers",
  description: "Transformers",
  default_model: "TaylorAI/bge-micro-v2"
};
var transformers_models = {
  "TaylorAI/bge-micro-v2": {
    "id": "TaylorAI/bge-micro-v2",
    "batch_size": 1,
    "dims": 384,
    "max_tokens": 512,
    "name": "BGE-micro-v2",
    "description": "Local, 512 tokens, 384 dim (recommended)",
    "adapter": "transformers"
  },
  "TaylorAI/gte-tiny": {
    "id": "TaylorAI/gte-tiny",
    "batch_size": 1,
    "dims": 384,
    "max_tokens": 512,
    "name": "GTE-tiny",
    "description": "Local, 512 tokens, 384 dim",
    "adapter": "transformers"
  },
  "Mihaiii/Ivysaur": {
    "id": "Mihaiii/Ivysaur",
    "batch_size": 1,
    "dims": 384,
    "max_tokens": 512,
    "name": "Ivysaur",
    "description": "Local, 512 tokens, 384 dim",
    "adapter": "transformers"
  },
  "andersonbcdefg/bge-small-4096": {
    "id": "andersonbcdefg/bge-small-4096",
    "batch_size": 1,
    "dims": 384,
    "max_tokens": 4096,
    "name": "BGE-small-4K",
    "description": "Local, 4,096 tokens, 384 dim",
    "adapter": "transformers"
  },
  "Xenova/jina-embeddings-v2-base-zh": {
    "id": "Xenova/jina-embeddings-v2-base-zh",
    "batch_size": 1,
    "dims": 512,
    "max_tokens": 8192,
    "name": "Jina-v2-base-zh-8K",
    "description": "Local, 8,192 tokens, 512 dim, Chinese/English bilingual",
    "adapter": "transformers"
  },
  "Xenova/jina-embeddings-v2-small-en": {
    "id": "Xenova/jina-embeddings-v2-small-en",
    "batch_size": 1,
    "dims": 512,
    "max_tokens": 8192,
    "name": "Jina-v2-small-en",
    "description": "Local, 8,192 tokens, 512 dim",
    "adapter": "transformers"
  },
  "nomic-ai/nomic-embed-text-v1.5": {
    "id": "nomic-ai/nomic-embed-text-v1.5",
    "batch_size": 1,
    "dims": 256,
    "max_tokens": 8192,
    "name": "Nomic-embed-text-v1.5",
    "description": "Local, 8,192 tokens, 256 dim",
    "adapter": "transformers"
  },
  "Xenova/bge-small-en-v1.5": {
    "id": "Xenova/bge-small-en-v1.5",
    "batch_size": 1,
    "dims": 384,
    "max_tokens": 512,
    "name": "BGE-small",
    "description": "Local, 512 tokens, 384 dim",
    "adapter": "transformers"
  },
  "nomic-ai/nomic-embed-text-v1": {
    "id": "nomic-ai/nomic-embed-text-v1",
    "batch_size": 1,
    "dims": 768,
    "max_tokens": 2048,
    "name": "Nomic-embed-text",
    "description": "Local, 2,048 tokens, 768 dim",
    "adapter": "transformers"
  }
};
var transformers_settings_config = {
  "[ADAPTER].gpu_batch_size": {
    name: "GPU Batch Size",
    type: "number",
    description: "Number of embeddings to process per batch on GPU. Use 0 to disable GPU.",
    placeholder: "Enter number ex. 10"
  },
  "[ADAPTER].legacy_transformers": {
    name: "Legacy Transformers (no GPU)",
    type: "toggle",
    description: "Use legacy transformers (v2) instead of v3.",
    callback: "embed_model_changed",
    default: true
  }
};

// node_modules/smart-embed-model/adapters/transformers_iframe.js
var SmartEmbedTransformersIframeAdapter = class extends SmartEmbedIframeAdapter {
  static defaults = transformers_defaults;
  /**
   * Create transformers iframe adapter instance
   * @param {SmartEmbedModel} model - Parent model instance
   */
  constructor(model) {
    super(model);
    this.connector = transformers_connector;
    if (this.settings.legacy_transformers || !this.use_gpu) {
      this.connector = this.connector.replace("@xenova/transformers", "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2");
      this.use_gpu = false;
    } else this.connector = this.connector.replace("@xenova/transformers", "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2");
  }
  /** @returns {Object} Settings configuration for transformers adapter */
  get settings_config() {
    return {
      ...super.settings_config,
      ...transformers_settings_config
    };
  }
  /**
   * Get available models (hardcoded list)
   * @returns {Promise<Object>} Map of model objects
   */
  get_models() {
    return Promise.resolve(this.models);
  }
  get models() {
    return transformers_models;
  }
};

// node_modules/smart-file-system/utils/match_glob.js
var glob_to_regex_pattern = (pattern, extended_glob) => {
  let in_class = false;
  let in_brace = 0;
  let result = "";
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    switch (char) {
      case "\\":
        result += "\\" + (i + 1 < pattern.length ? pattern[++i] : "\\");
        break;
      case "/":
        result += "\\/";
        break;
      case "[":
        if (!in_class) {
          in_class = true;
          if (pattern[i + 1] === "!") {
            result += "[^";
            i++;
          } else {
            result += "[";
          }
        } else {
          result += "\\[";
        }
        break;
      case "]":
        if (in_class) {
          in_class = false;
          result += "]";
        } else {
          result += "\\]";
        }
        break;
      case "{":
        if (!in_class) {
          in_brace++;
          result += "(";
        } else {
          result += "{";
        }
        break;
      case "}":
        if (!in_class && in_brace > 0) {
          in_brace--;
          result += ")";
        } else {
          result += "}";
        }
        break;
      case ",":
        if (!in_class && in_brace > 0) {
          result += "|";
        } else {
          result += ",";
        }
        break;
      case "*":
        if (!in_class) {
          if (pattern[i + 1] === "*") {
            result += ".*";
            i++;
          } else {
            result += "[^/]*";
          }
        } else {
          result += "\\*";
        }
        break;
      case "?":
        result += in_class ? "\\?" : "[^/]";
        break;
      case ".":
      case "(":
      case ")":
      case "+":
      case "|":
      case "^":
      case "$":
        result += "\\" + char;
        break;
      default:
        result += char;
    }
  }
  if (extended_glob) {
    result = result.replace(/\\\+\\\((.*?)\\\)/g, "($1)+").replace(/\\\@\\\((.*?)\\\)/g, "($1)").replace(/\\\!\\\((.*?)\\\)/g, "(?!$1).*").replace(/\\\?\\\((.*?)\\\)/g, "($1)?").replace(/\\\*\\\((.*?)\\\)/g, "($1)*");
  }
  return result;
};
var adjust_for_windows_paths = (pattern, windows_paths) => windows_paths ? pattern.replace(/\\\//g, "[\\\\/]") : pattern;
var create_regex = (pattern, { case_sensitive, extended_glob, windows_paths }) => {
  const regex_pattern = glob_to_regex_pattern(pattern, extended_glob);
  const adjusted_pattern = adjust_for_windows_paths(regex_pattern, windows_paths);
  const flags = case_sensitive ? "" : "i";
  return new RegExp(`^${adjusted_pattern}$`, flags);
};
function glob_to_regex(pattern, options = {}) {
  const default_options = { case_sensitive: true, extended_glob: false, windows_paths: false };
  const merged_options = { ...default_options, ...options };
  if (pattern === "") {
    return /^$/;
  }
  if (pattern === "*" && !merged_options.windows_paths) {
    return /^[^/]+$/;
  }
  if (pattern === "**" && !merged_options.windows_paths) {
    return /^.+$/;
  }
  return create_regex(pattern, merged_options);
}

// node_modules/smart-file-system/utils/fuzzy_search.js
function fuzzy_search(arr, search_term) {
  let matches = [];
  for (let i = 0; i < arr.length; i++) {
    const search_chars = search_term.toLowerCase().split("");
    let match = true;
    let distance = 0;
    const name = arr[i];
    const label_name = name.toLowerCase();
    for (let j = 0; j < search_chars.length; j++) {
      const search_index = label_name.substring(distance).indexOf(search_chars[j]);
      if (search_index >= 0) {
        distance += search_index + 1;
      } else {
        match = false;
        break;
      }
    }
    if (match) matches.push({ name, distance });
  }
  matches.sort((a, b) => a.distance - b.distance);
  return matches.map((match) => match.name);
}

// node_modules/smart-file-system/smart_fs.js
var SmartFs = class {
  /**
   * Create a new SmartFs instance
   * 
   * @param {Object} env - The Smart Environment instance
   * @param {Object} [opts={}] - Optional configuration
   * @param {string} [opts.fs_path] - Custom environment path
   */
  constructor(env, opts = {}) {
    this.env = env;
    this.opts = opts;
    this.fs_path = opts.fs_path || opts.env_path || "";
    if (!opts.adapter) throw new Error("SmartFs requires an adapter");
    this.adapter = new opts.adapter(this);
    this.excluded_patterns = [];
    if (Array.isArray(opts.exclude_patterns)) {
      opts.exclude_patterns.forEach((pattern) => this.add_ignore_pattern(pattern));
    }
    this.folders = {};
    this.files = {};
    this.file_paths = [];
    this.folder_paths = [];
  }
  async refresh() {
    this.files = {};
    this.file_paths = [];
    this.folders = {};
    this.folder_paths = [];
    await this.init();
  }
  async init() {
    await this.load_gitignore();
    await this.load_files();
  }
  async load_files() {
    const all = await this.list_recursive();
    this.file_paths = [];
    this.folder_paths = [];
    all.forEach((file) => {
      if (file.type === "file") {
        this.files[file.path] = file;
        this.file_paths.push(file.path);
      }
      if (file.type === "folder") {
        this.folders[file.path] = file;
        this.folder_paths.push(file.path);
      }
    });
  }
  include_file(file_path) {
    const file = this.adapter.get_file(file_path);
    this.files[file.path] = file;
    this.file_paths.push(file.path);
    return file;
  }
  /**
   * Load .gitignore patterns
   * 
   * @returns {Promise<RegExp[]>} Array of RegExp patterns
   */
  async load_gitignore() {
    const gitignore_path = ".gitignore";
    const gitignore_exists = await this.adapter.exists(gitignore_path);
    if (gitignore_exists) {
      const gitignore_content = await this.adapter.read(gitignore_path, "utf-8");
      gitignore_content.split("\n").filter((line) => !line.startsWith("#")).filter(Boolean).forEach((pattern) => this.add_ignore_pattern(pattern));
    }
    this.add_ignore_pattern(".**");
    this.add_ignore_pattern("**/.**");
    this.add_ignore_pattern("**/.*/**");
    this.add_ignore_pattern("**/*.ajson");
    this.add_ignore_pattern("**/*.excalidraw.md");
  }
  /**
   * Add a new ignore pattern
   * 
   * @param {string} pattern - The pattern to add
   */
  add_ignore_pattern(pattern, opts = {}) {
    this.excluded_patterns.push(glob_to_regex(pattern.trim(), opts));
  }
  /**
   * Check if a path is ignored based on gitignore patterns
   * 
   * @param {string} _path - The path to check
   * @returns {boolean} True if the path is ignored, false otherwise
   */
  is_excluded(_path) {
    try {
      if (_path.includes("#")) return true;
      if (!this.excluded_patterns.length) return false;
      return this.excluded_patterns.some((pattern) => pattern.test(_path));
    } catch (e) {
      console.error(`Error checking if path is excluded: ${e.message}`);
      console.error(`Path: `, _path);
      throw e;
    }
  }
  /**
   * Check if any path in an array of paths is excluded
   * 
   * @param {string[]} paths - Array of paths to check
   * @returns {boolean} True if any path is excluded, false otherwise
   */
  has_excluded_patterns(paths) {
    return paths.some((p) => this.is_excluded(p));
  }
  /**
   * Pre-process an array of paths, throwing an error if any path is excluded
   * 
   * @param {string[]} paths - Array of paths to pre-process
   * @throws {Error} If any path in the array is excluded
   * @returns {string[]} The array of paths
   */
  pre_process(paths) {
    if (this.has_excluded_patterns(paths)) {
      throw new Error(`Path is excluded: ${paths.find((p) => this.is_excluded(p))}`);
    }
    return paths;
  }
  /**
   * Post-process the result of an operation
   * 
   * @param {any} returned_value - The value returned by the operation
   * @returns {any} The post-processed value
   */
  post_process(returned_value) {
    if (this.adapter.post_process) return this.adapter.post_process(returned_value);
    if (Array.isArray(returned_value)) {
      returned_value = returned_value.filter((r) => {
        if (typeof r === "string") return !this.is_excluded(r);
        if (typeof r === "object" && r.path) return !this.is_excluded(r.path);
        return true;
      });
    }
    return returned_value;
  }
  // v2
  /**
   * Use the adapter for a method
   * runs pre_process and post_process (checks exclusions)
   * @param {string} method - The method to use
   * @param {string[]} paths - The paths to use
   * @param {...any} args - Additional arguments for the method
   * @returns {Promise<any>} The result of the method
   */
  async use_adapter(method, paths, ...args) {
    if (!this.adapter[method]) throw new Error(`Method ${method} not found in adapter`);
    paths = this.pre_process(paths);
    let resp = await this.adapter[method](...paths, ...args);
    return this.post_process(resp);
  }
  /**
   * Append content to a file
   * 
   * @param {string} rel_path - The relative path of the file to append to
   * @param {string|Buffer} content - The content to append
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async append(rel_path, content) {
    return await this.use_adapter("append", [rel_path], content);
  }
  /**
   * Create a new directory
   * 
   * @param {string} rel_path - The relative path of the directory to create
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async mkdir(rel_path, opts = { recursive: true }) {
    return await this.use_adapter("mkdir", [rel_path], opts);
  }
  /**
   * Check if a file or directory exists
   * 
   * @param {string} rel_path - The relative path to check
   * @returns {Promise<boolean>} True if the path exists, false otherwise
   */
  async exists(rel_path) {
    return await this.use_adapter("exists", [rel_path]);
  }
  /**
   * List files in a directory
   * 
   * @param {string} rel_path - The relative path to list
   * @returns {Promise<string[]>} Array of file paths
   */
  async list(rel_path = "/") {
    return await this.use_adapter("list", [rel_path]);
  }
  async list_recursive(rel_path = "/") {
    return await this.use_adapter("list_recursive", [rel_path]);
  }
  async list_files(rel_path = "/") {
    return await this.use_adapter("list_files", [rel_path]);
  }
  async list_files_recursive(rel_path = "/") {
    return await this.use_adapter("list_files_recursive", [rel_path]);
  }
  async list_folders(rel_path = "/") {
    return await this.use_adapter("list_folders", [rel_path]);
  }
  async list_folders_recursive(rel_path = "/") {
    return await this.use_adapter("list_folders_recursive", [rel_path]);
  }
  /**
   * Read the contents of a file
   * 
   * @param {string} rel_path - The relative path of the file to read
   * @returns {Promise<string|Buffer>} The contents of the file
   */
  async read(rel_path, encoding = "utf-8") {
    try {
      const content = await this.adapter.read(rel_path, encoding);
      return content;
    } catch (error) {
      console.warn("Error during read: " + error.message);
      if (error.code === "ENOENT") return null;
      return { error: error.message };
    }
  }
  /**
   * Remove a file
   * 
   * @param {string} rel_path - The relative path of the file to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove(rel_path) {
    return await this.use_adapter("remove", [rel_path]);
  }
  /**
   * Remove a directory
   * 
   * @param {string} rel_path - The relative path of the directory to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove_dir(rel_path, recursive = false) {
    return await this.use_adapter("remove_dir", [rel_path], recursive);
  }
  /**
   * Rename a file or directory
   * 
   * @param {string} rel_path - The current relative path
   * @param {string} new_rel_path - The new relative path
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async rename(rel_path, new_rel_path) {
    await this.use_adapter("rename", [rel_path, new_rel_path]);
    await this.refresh();
  }
  /**
   * Get file or directory statistics
   * 
   * @param {string} rel_path - The relative path to get statistics for
   * @returns {Promise<Object>} An object containing file or directory statistics
   */
  async stat(rel_path) {
    return await this.use_adapter("stat", [rel_path]);
  }
  /**
   * Write content to a file
   * Should handle when target path is within a folder that doesn't exist
   * 
   * @param {string} rel_path - The relative path of the file to write to
   * @param {string|Buffer} content - The content to write
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async write(rel_path, content) {
    try {
      await this.adapter.write(rel_path, content);
    } catch (error) {
      console.error("Error during write:", error);
      throw error;
    }
  }
  // // aliases
  // async create(rel_path, content) { return await this.use_adapter('write', [rel_path], content); }
  // async update(rel_path, content) { return await this.use_adapter('write', [rel_path], content); }
  get_link_target_path(link_target, source_path) {
    if (this.adapter.get_link_target_path) return this.adapter.get_link_target_path(link_target, source_path);
    if (!this.file_paths) return console.warn("get_link_target_path: file_paths not found");
    const matching_file_paths = this.file_paths.filter((path) => path.includes(link_target));
    return fuzzy_search(matching_file_paths, link_target)[0];
  }
  get sep() {
    return this.adapter.sep || "/";
  }
};

// node_modules/smart-file-system/adapters/obsidian.js
var SmartFsObsidianAdapter = class {
  /**
   * Create an SmartFsObsidianAdapter instance
   * 
   * @param {Object} smart_fs - The SmartFs instance
   */
  constructor(smart_fs) {
    this.smart_fs = smart_fs;
    this.obsidian = smart_fs.env.main.obsidian;
    this.obsidian_app = smart_fs.env.main.app;
    this.obsidian_adapter = smart_fs.env.main.app.vault.adapter;
  }
  get fs_path() {
    return this.smart_fs.fs_path;
  }
  get_file(file_path) {
    const file = {};
    file.path = file_path.replace(/\\/g, "/").replace(this.smart_fs.fs_path, "").replace(/^\//, "");
    file.type = "file";
    file.extension = file.path.split(".").pop().toLowerCase();
    file.name = file.path.split("/").pop();
    file.basename = file.name.split(".").shift();
    Object.defineProperty(file, "stat", {
      get: () => {
        const tfile = this.obsidian_app.vault.getAbstractFileByPath(file_path);
        if (tfile) {
          return {
            ctime: tfile.stat.ctime,
            mtime: tfile.stat.mtime,
            size: tfile.stat.size
          };
        }
        return null;
      }
    });
    return file;
  }
  /**
   * Append content to a file
   * 
   * @param {string} rel_path - The relative path of the file to append to
   * @param {string} data - The content to append
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async append(rel_path, data) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.append(rel_path, data);
  }
  /**
   * Create a new directory
   * 
   * @param {string} rel_path - The relative path of the directory to create
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async mkdir(rel_path) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.mkdir(rel_path);
  }
  /**
   * Check if a file or directory exists
   * 
   * @param {string} rel_path - The relative path to check
   * @returns {Promise<boolean>} True if the path exists, false otherwise
   */
  async exists(rel_path) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.exists(rel_path);
  }
  /**
   * List files in a directory (NOT up-to-date with list_recursive)
   * 
   * @param {string} rel_path - The relative path to list
   * @returns {Promise<string[]>} Array of file paths
   */
  async list(rel_path, opts = {}) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    if (rel_path.startsWith("/")) rel_path = rel_path.slice(1);
    if (rel_path.endsWith("/")) rel_path = rel_path.slice(0, -1);
    if (rel_path.includes(".")) {
      const { files: file_paths } = await this.obsidian_adapter.list(rel_path);
      const files2 = file_paths.map((file_path) => {
        if (this.smart_fs.fs_path) file_path = file_path.replace(this.smart_fs.fs_path, "").slice(1);
        const file_name = file_path.split("/").pop();
        const file = {
          basename: file_name.split(".")[0],
          extension: file_name.split(".").pop().toLowerCase(),
          name: file_name,
          path: file_path
        };
        return file;
      });
      return files2;
    }
    const files = this.obsidian_app.vault.getAllLoadedFiles().filter((file) => {
      const last_slash = file.path.lastIndexOf("/");
      if (last_slash === -1 && rel_path !== "") return false;
      const folder_path = file.path.slice(0, last_slash);
      if (folder_path !== rel_path) return false;
      return true;
    });
    return files;
  }
  // NOTE: currently does not handle hidden files and folders
  async list_recursive(rel_path, opts = {}) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    if (rel_path.startsWith("/")) rel_path = rel_path.slice(1);
    if (rel_path.endsWith("/")) rel_path = rel_path.slice(0, -1);
    const files = this.obsidian_app.vault.getAllLoadedFiles().filter((file) => {
      if (rel_path !== "" && !file.path.startsWith(rel_path)) return false;
      if (file instanceof this.obsidian.TFile) {
        if (opts.type === "folder") return false;
        file.type = "file";
      } else if (file instanceof this.obsidian.TFolder) {
        if (opts.type === "file") return false;
        delete file.basename;
        delete file.extension;
        file.type = "folder";
      }
      if (this.smart_fs.fs_path) file.path = file.path.replace(this.smart_fs.fs_path, "").slice(1);
      return true;
    });
    return files;
  }
  async list_files(rel_path) {
    return await this.list(rel_path, { type: "file" });
  }
  async list_files_recursive(rel_path) {
    return await this.list_recursive(rel_path, { type: "file" });
  }
  async list_folders(rel_path) {
    return await this.list(rel_path, { type: "folder" });
  }
  async list_folders_recursive(rel_path) {
    return await this.list_recursive(rel_path, { type: "folder" });
  }
  /**
   * Read the contents of a file
   * 
   * @param {string} rel_path - The relative path of the file to read
   * @returns {Promise<string>} The contents of the file
   */
  async read(rel_path, encoding, opts = {}) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    if (encoding === "utf-8") {
      if (!opts.no_cache) {
        const tfile = this.obsidian_app.vault.getFileByPath(rel_path);
        if (tfile) return await this.obsidian_app.vault.cachedRead(tfile);
      }
      return await this.obsidian_adapter.read(rel_path);
    }
    if (encoding === "base64") {
      const array_buffer2 = await this.obsidian_adapter.readBinary(rel_path, "base64");
      const base642 = this.obsidian.arrayBufferToBase64(array_buffer2);
      return base642;
    }
    const array_buffer = await this.obsidian_adapter.readBinary(rel_path);
    return array_buffer;
  }
  /**
   * Rename a file or directory
   * 
   * @param {string} old_path - The current path of the file or directory
   * @param {string} new_path - The new path for the file or directory
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async rename(old_path, new_path) {
    if (!old_path.startsWith(this.fs_path)) old_path = this.fs_path + "/" + old_path;
    if (!new_path.startsWith(this.fs_path)) new_path = this.fs_path + "/" + new_path;
    return await this.obsidian_adapter.rename(old_path, new_path);
  }
  /**
   * Remove a file
   * 
   * @param {string} rel_path - The relative path of the file to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove(rel_path) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    try {
      return await this.obsidian_adapter.remove(rel_path);
    } catch (error) {
      console.warn(`Error removing file: ${rel_path}`, error);
    }
  }
  /**
   * Remove a directory
   * 
   * @param {string} rel_path - The relative path of the directory to remove
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async remove_dir(rel_path, recursive = false) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.rmdir(rel_path, { recursive });
  }
  /**
   * Get file or directory information
   * 
   * @param {string} rel_path - The relative path of the file or directory
   * @returns {Promise<Object>} An object containing file or directory information
   */
  async stat(rel_path) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.stat(rel_path);
  }
  /**
   * Write content to a file
   * 
   * @param {string} rel_path - The relative path of the file to write to
   * @param {string} data - The content to write
   * @returns {Promise<void>} A promise that resolves when the operation is complete
   */
  async write(rel_path, data) {
    if (!rel_path.startsWith(this.fs_path)) rel_path = this.fs_path + "/" + rel_path;
    return await this.obsidian_adapter.write(rel_path, data);
  }
  get_link_target_path(link_path, file_path) {
    return this.obsidian_app.metadataCache.getFirstLinkpathDest(link_path, file_path)?.path;
  }
};

// node_modules/smart-view/smart_view.js
var SmartView = class {
  constructor(opts = {}) {
    this.opts = opts;
    this._adapter = null;
  }
  /**
   * Renders all setting components within a container.
   * @param {HTMLElement} container - The container element.
   * @param {Object} opts - Additional options for rendering.
   * @returns {Promise<void>}
   */
  async render_setting_components(container, opts = {}) {
    const components = container.querySelectorAll(".setting-component");
    for (const component of components) {
      await this.render_setting_component(component, opts);
    }
    return container;
  }
  /**
   * Creates a document fragment from HTML string.
   * @param {string} html - The HTML string.
   * @returns {DocumentFragment}
   */
  create_doc_fragment(html) {
    return document.createRange().createContextualFragment(html);
  }
  /**
   * Gets the adapter instance.
   * @returns {Object} The adapter instance.
   */
  get adapter() {
    if (!this._adapter) {
      this._adapter = new this.opts.adapter(this);
    }
    return this._adapter;
  }
  /**
   * Gets an icon (implemented in adapter).
   * @param {string} icon_name - The name of the icon.
   * @returns {string} The icon HTML.
   */
  get_icon_html(icon_name) {
    return this.adapter.get_icon_html(icon_name);
  }
  /**
   * Renders a single setting component (implemented in adapter).
   * @param {HTMLElement} setting_elm - The setting element.
   * @param {Object} opts - Additional options for rendering.
   * @returns {Promise<*>}
   */
  async render_setting_component(setting_elm, opts = {}) {
    return await this.adapter.render_setting_component(setting_elm, opts);
  }
  /**
   * Renders markdown content (implemented in adapter).
   * @param {string} markdown - The markdown content.
   * @returns {Promise<*>}
   */
  async render_markdown(markdown, scope = null) {
    return await this.adapter.render_markdown(markdown, scope);
  }
  /**
   * Gets a value from an object by path.
   * @param {Object} obj - The object to search in.
   * @param {string} path - The path to the value.
   * @returns {*}
   */
  get_by_path(obj, path) {
    return get_by_path(obj, path);
  }
  /**
   * Sets a value in an object by path.
   * @param {Object} obj - The object to modify.
   * @param {string} path - The path to set the value.
   * @param {*} value - The value to set.
   */
  set_by_path(obj, path, value) {
    set_by_path(obj, path, value);
  }
  /**
   * Deletes a value from an object by path.
   * @param {Object} obj - The object to modify.
   * @param {string} path - The path to delete.
   */
  delete_by_path(obj, path) {
    delete_by_path(obj, path);
  }
  /**
   * Escapes HTML special characters in a string.
   * @param {string} str - The string to escape.
   * @returns {string} The escaped string.
   */
  escape_html(str) {
    if (typeof str !== "string") return str;
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  /**
   * Renders HTML for a setting component based on its configuration.
   * @param {Object} setting_config - The configuration object for the setting.
   * @returns {string} The rendered HTML string.
   */
  render_setting_html(setting_config) {
    if (setting_config.type === "html") return setting_config.value;
    const attributes = Object.entries(setting_config).map(([attr, value]) => {
      if (attr.includes("class")) return "";
      if (typeof value === "number") return `data-${attr.replace(/_/g, "-")}=${value}`;
      return `data-${attr.replace(/_/g, "-")}="${value}"`;
    }).join("\n");
    return `<div class="setting-component${setting_config.scope_class ? ` ${setting_config.scope_class}` : ""}"
data-setting="${setting_config.setting}"
${attributes}
></div>`;
  }
  /**
   * Validates the setting config and determines if the setting should be rendered.
   * @param {Object} scope - The scope object.
   * @param {Object} opts - The options object.
   * @param {string} setting_key - The key of the setting.
   * @param {Object} setting_config - The config of the setting.
   * @returns {boolean} True if the setting should be rendered, false otherwise.
   */
  validate_setting(scope, opts, setting_key, setting_config) {
    if (opts.settings_keys && !opts.settings_keys.includes(setting_key)) return false;
    if (typeof setting_config.conditional === "function" && !setting_config.conditional(scope)) return false;
    return true;
  }
  /**
   * Handles the smooth transition effect when opening overlays.
   * @param {HTMLElement} overlay_container - The overlay container element.
   */
  on_open_overlay(overlay_container) {
    overlay_container.style.transition = "background-color 0.5s ease-in-out";
    overlay_container.style.backgroundColor = "var(--bold-color)";
    setTimeout(() => {
      overlay_container.style.backgroundColor = "";
    }, 500);
  }
  /**
   * Renders settings components based on the provided settings configuration.
   * @param {Object} scope - The scope object.
   * @param {Object} settings_config - The settings configuration object.
   * @returns {Promise<DocumentFragment>} The rendered settings fragment.
   */
  async render_settings(settings_config4, opts = {}) {
    const scope = opts.scope || {};
    const html = Object.entries(settings_config4).map(([setting_key, setting_config]) => {
      if (!setting_config.setting) setting_config.setting = setting_key;
      if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
      return "";
    }).join("\n");
    const frag = this.create_doc_fragment(`<div>${html}</div>`);
    return await this.render_setting_components(frag, opts);
  }
};
function get_by_path(obj, path) {
  if (!path) return "";
  const keys = path.split(".");
  const finalKey = keys.pop();
  const instance = keys.reduce((acc, key) => acc && acc[key], obj);
  if (instance && typeof instance[finalKey] === "function") {
    return instance[finalKey].bind(instance);
  }
  return instance ? instance[finalKey] : void 0;
}
function set_by_path(obj, path, value) {
  const keys = path.split(".");
  const final_key = keys.pop();
  const target = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== "object") {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
  target[final_key] = value;
}
function delete_by_path(obj, path) {
  const keys = path.split(".");
  const finalKey = keys.pop();
  const instance = keys.reduce((acc, key) => acc && acc[key], obj);
  delete instance[finalKey];
}

// node_modules/smart-view/adapters/_adapter.js
var SmartViewAdapter = class {
  constructor(main) {
    this.main = main;
  }
  // NECESSARY OVERRIDES
  /**
   * Retrieves the class used for settings.
   * Must be overridden by subclasses to return the appropriate setting class.
   * @abstract
   * @returns {Function} The setting class constructor.
   * @throws Will throw an error if not implemented in the subclass.
   */
  get setting_class() {
    throw new Error("setting_class() not implemented");
  }
  /**
   * Generates the HTML for a specified icon.
   * Must be overridden by subclasses to provide the correct icon HTML.
   * @abstract
   * @param {string} icon_name - The name of the icon to generate HTML for.
   * @returns {string} The HTML string representing the icon.
   * @throws Will throw an error if not implemented in the subclass.
   */
  get_icon_html(icon_name) {
    throw new Error("get_icon_html() not implemented");
  }
  /**
   * Renders Markdown content within a specific scope.
   * Must be overridden by subclasses to handle Markdown rendering appropriately.
   * @abstract
   * @param {string} markdown - The Markdown content to render.
   * @param {object|null} [scope=null] - The scope within which to render the Markdown.
   * @returns {Promise<void>} A promise that resolves when rendering is complete.
   * @throws Will throw an error if not implemented in the subclass.
   */
  async render_markdown(markdown, scope = null) {
    throw new Error("render_markdown() not implemented");
  }
  /**
   * Opens a specified URL.
   * Should be overridden by subclasses to define how URLs are opened.
   * @abstract
   * @param {string} url - The URL to open.
   */
  open_url(url2) {
    throw new Error("open_url() not implemented");
  }
  /**
   * Handles the selection of a folder by invoking the folder selection dialog and updating the setting.
   * @abstract
   * @param {string} setting - The path of the setting being modified.
   * @param {string} value - The current value of the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  handle_folder_select(path, value, elm, scope) {
    throw new Error("handle_folder_select not implemented");
  }
  /**
   * Handles the selection of a file by invoking the file selection dialog and updating the setting.
   * @abstract
   * @param {string} setting - The path of the setting being modified.
   * @param {string} value - The current value of the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  handle_file_select(path, value, elm, scope) {
    throw new Error("handle_file_select not implemented");
  }
  /**
   * Performs actions before a setting is changed, such as clearing notices and updating the UI.
   * @abstract
   * @param {string} setting - The path of the setting being changed.
   * @param {*} value - The new value for the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings and actions.
   */
  pre_change(path, value, elm) {
    console.warn("pre_change() not implemented");
  }
  /**
   * Performs actions after a setting is changed, such as updating UI elements.
   * @abstract
   * @param {string} setting - The path of the setting that was changed.
   * @param {*} value - The new value for the setting.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} changed - Additional information about the change.
   */
  post_change(path, value, elm) {
    console.warn("post_change() not implemented");
  }
  /**
   * Reverts a setting to its previous value in case of validation failure or error.
   * @abstract
   * @param {string} setting - The path of the setting to revert.
   * @param {HTMLElement} elm - The HTML element associated with the setting.
   * @param {object} scope - The current scope containing settings.
   */
  revert_setting(path, elm, scope) {
    console.warn("revert_setting() not implemented");
  }
  // DEFAULT IMPLEMENTATIONS (may be overridden)
  get setting_renderers() {
    return {
      text: this.render_text_component,
      string: this.render_text_component,
      password: this.render_password_component,
      number: this.render_number_component,
      dropdown: this.render_dropdown_component,
      toggle: this.render_toggle_component,
      textarea: this.render_textarea_component,
      button: this.render_button_component,
      remove: this.render_remove_component,
      folder: this.render_folder_select_component,
      "text-file": this.render_file_select_component,
      file: this.render_file_select_component,
      html: this.render_html_component
    };
  }
  async render_setting_component(elm, opts = {}) {
    elm.innerHTML = "";
    const path = elm.dataset.setting;
    const scope = opts.scope || this.main.main;
    try {
      let value = elm.dataset.value ?? this.main.get_by_path(scope.settings, path);
      if (typeof value === "undefined" && typeof elm.dataset.default !== "undefined") {
        value = elm.dataset.default;
        if (typeof value === "string") value = value.toLowerCase() === "true" ? true : value === "false" ? false : value;
        this.main.set_by_path(scope.settings, path, value);
      }
      const renderer = this.setting_renderers[elm.dataset.type];
      if (!renderer) {
        console.warn(`Unsupported setting type: ${elm.dataset.type}`);
        return elm;
      }
      const setting = renderer.call(this, elm, path, value, scope);
      if (elm.dataset.name) setting.setName(elm.dataset.name);
      if (elm.dataset.description) {
        const frag = this.main.create_doc_fragment(`<span>${elm.dataset.description}</span>`);
        setting.setDesc(frag);
      }
      if (elm.dataset.tooltip) setting.setTooltip(elm.dataset.tooltip);
      this.add_button_if_needed(setting, elm, path, scope);
      this.handle_disabled_and_hidden(elm);
      return elm;
    } catch (e) {
      console.error({ path, elm });
      console.error(e);
    }
  }
  render_dropdown_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    let options;
    if (elm.dataset.optionsCallback) {
      console.log(`getting options callback: ${elm.dataset.optionsCallback}`);
      const opts_callback = this.main.get_by_path(scope, elm.dataset.optionsCallback);
      if (typeof opts_callback === "function") options = opts_callback();
      else console.warn(`optionsCallback is not a function: ${elm.dataset.optionsCallback}`, scope);
    }
    if (!options || !options.length) {
      options = this.get_dropdown_options(elm);
    }
    smart_setting.addDropdown((dropdown) => {
      if (elm.dataset.required) dropdown.inputEl.setAttribute("required", true);
      options.forEach((option) => {
        const opt = dropdown.addOption(option.value, option.name ?? option.value);
        opt.selected = option.value === value;
      });
      dropdown.onChange((value2) => {
        this.handle_on_change(path, value2, elm, scope);
      });
      dropdown.setValue(value);
    });
    return smart_setting;
  }
  render_text_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((text) => {
      text.setPlaceholder(elm.dataset.placeholder || "");
      if (value) text.setValue(value);
      let debounceTimer;
      if (elm.dataset.button) {
        smart_setting.addButton((button) => {
          button.setButtonText(elm.dataset.button);
          button.onClick(async () => this.handle_on_change(path, text.getValue(), elm, scope));
        });
      } else {
        text.onChange(async (value2) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => this.handle_on_change(path, value2.trim(), elm, scope), 2e3);
        });
      }
    });
    return smart_setting;
  }
  render_password_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((text) => {
      text.inputEl.type = "password";
      text.setPlaceholder(elm.dataset.placeholder || "");
      if (value) text.setValue(value);
      let debounceTimer;
      text.onChange(async (value2) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, value2, elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_number_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addText((number) => {
      number.inputEl.type = "number";
      number.setPlaceholder(elm.dataset.placeholder || "");
      if (typeof value !== "undefined") number.inputEl.value = parseInt(value);
      number.inputEl.min = elm.dataset.min || 0;
      if (elm.dataset.max) number.inputEl.max = elm.dataset.max;
      let debounceTimer;
      number.onChange(async (value2) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, parseInt(value2), elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_toggle_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addToggle((toggle) => {
      let checkbox_val = value ?? true;
      if (typeof checkbox_val === "string") {
        checkbox_val = checkbox_val.toLowerCase() === "true";
      }
      toggle.setValue(checkbox_val);
      toggle.onChange(async (value2) => this.handle_on_change(path, value2, elm, scope));
    });
    return smart_setting;
  }
  render_textarea_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addTextArea((textarea) => {
      textarea.setPlaceholder(elm.dataset.placeholder || "");
      textarea.setValue(value || "");
      let debounceTimer;
      textarea.onChange(async (value2) => {
        value2 = value2.split("\n").map((v) => v.trim()).filter((v) => v);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.handle_on_change(path, value2, elm, scope), 2e3);
      });
    });
    return smart_setting;
  }
  render_button_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addButton((button) => {
      button.setButtonText(elm.dataset.btnText || elm.dataset.name);
      button.onClick(async () => {
        if (elm.dataset.confirm && !confirm(elm.dataset.confirm)) return;
        if (elm.dataset.href) this.open_url(elm.dataset.href);
        if (elm.dataset.callback) {
          const callback = this.main.get_by_path(scope, elm.dataset.callback);
          if (callback) callback(path, value, elm, scope);
        }
      });
    });
    return smart_setting;
  }
  render_remove_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addButton((button) => {
      button.setButtonText(elm.dataset.btnText || elm.dataset.name || "Remove");
      button.onClick(async () => {
        this.main.delete_by_path(scope.settings, path);
        if (elm.dataset.callback) {
          const callback = this.main.get_by_path(scope, elm.dataset.callback);
          if (callback) callback(path, value, elm, scope);
        }
      });
    });
    return smart_setting;
  }
  render_folder_select_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addFolderSelect((folder_select) => {
      folder_select.setPlaceholder(elm.dataset.placeholder || "");
      if (value) folder_select.setValue(value);
      folder_select.inputEl.closest("div").addEventListener("click", () => {
        this.handle_folder_select(path, value, elm, scope);
      });
    });
    return smart_setting;
  }
  render_file_select_component(elm, path, value, scope) {
    const smart_setting = new this.setting_class(elm);
    smart_setting.addFileSelect((file_select) => {
      file_select.setPlaceholder(elm.dataset.placeholder || "");
      if (value) file_select.setValue(value);
      file_select.inputEl.closest("div").addEventListener("click", () => {
        this.handle_file_select(path, value, elm, scope);
      });
    });
    return smart_setting;
  }
  render_html_component(elm, path, value, scope) {
    elm.innerHTML = value;
    return elm;
  }
  add_button_if_needed(smart_setting, elm, path, scope) {
    if (elm.dataset.btn) {
      smart_setting.addButton((button) => {
        button.setButtonText(elm.dataset.btn);
        button.inputEl.addEventListener("click", (e) => {
          if (elm.dataset.btnCallback && typeof scope[elm.dataset.btnCallback] === "function") {
            if (elm.dataset.btnCallbackArg) scope[elm.dataset.btnCallback](elm.dataset.btnCallbackArg);
            else scope[elm.dataset.btnCallback](path, null, smart_setting, scope);
          } else if (elm.dataset.btnHref) {
            this.open_url(elm.dataset.btnHref);
          } else if (elm.dataset.callback && typeof this.main.get_by_path(scope, elm.dataset.callback) === "function") {
            this.main.get_by_path(scope, elm.dataset.callback)(path, null, smart_setting, scope);
          } else if (elm.dataset.href) {
            this.open_url(elm.dataset.href);
          } else {
            console.error("No callback or href found for button.");
          }
        });
        if (elm.dataset.btnDisabled || elm.dataset.disabled && elm.dataset.btnDisabled !== "false") {
          button.inputEl.disabled = true;
        }
      });
    }
  }
  handle_disabled_and_hidden(elm) {
    if (elm.dataset.disabled && elm.dataset.disabled !== "false") {
      elm.classList.add("disabled");
      elm.querySelector("input, select, textarea, button").disabled = true;
    }
    if (elm.dataset.hidden && elm.dataset.hidden !== "false") {
      elm.style.display = "none";
    }
  }
  get_dropdown_options(elm) {
    return Object.entries(elm.dataset).reduce((acc, [k, v]) => {
      if (!k.startsWith("option")) return acc;
      const [value, name] = v.split("|");
      acc.push({ value, name: name || value });
      return acc;
    }, []);
  }
  handle_on_change(path, value, elm, scope) {
    this.pre_change(path, value, elm, scope);
    if (elm.dataset.validate) {
      const valid = this[elm.dataset.validate](path, value, elm, scope);
      if (!valid) {
        elm.querySelector(".setting-item").style.border = "2px solid red";
        this.revert_setting(path, elm, scope);
        return;
      }
    }
    this.main.set_by_path(scope.settings, path, value);
    if (elm.dataset.callback) {
      const callback = this.main.get_by_path(scope, elm.dataset.callback);
      if (callback) callback(path, value, elm, scope);
    }
    this.post_change(path, value, elm, scope);
  }
};

// node_modules/smart-view/adapters/obsidian.js
var import_obsidian2 = require("obsidian");
var SmartViewObsidianAdapter = class extends SmartViewAdapter {
  get setting_class() {
    return import_obsidian2.Setting;
  }
  open_url(url2) {
    window.open(url2);
  }
  async render_file_select_component(elm, path, value) {
    return super.render_text_component(elm, path, value);
  }
  async render_folder_select_component(elm, path, value) {
    return super.render_text_component(elm, path, value);
  }
  async render_markdown(markdown, scope) {
    const component = scope.env.smart_connections_plugin.view;
    if (!scope) return console.warn("Scope required for rendering markdown in Obsidian adapter");
    const frag = this.main.create_doc_fragment("<div><div class='inner'></div></div>");
    const container = frag.querySelector(".inner");
    try {
      await import_obsidian2.MarkdownRenderer.render(
        scope.env.plugin.app,
        markdown,
        container,
        scope?.file_path || "",
        component || new import_obsidian2.Component()
      );
    } catch (e) {
      console.warn("Error rendering markdown in Obsidian adapter", e);
    }
    return frag;
  }
  get_icon_html(name) {
    return (0, import_obsidian2.getIcon)(name).outerHTML;
  }
  // Obsidian Specific
  is_mod_event(event) {
    return import_obsidian2.Keymap.isModEvent(event);
  }
};

// src/smart_notices.js
var import_obsidian3 = require("obsidian");
var SmartNotices = class {
  constructor(main) {
    this.main = main;
    this.active = {};
  }
  get settings() {
    return this.main.settings.smart_notices;
  }
  get adapter() {
    return this.main.smart_env_config.modules.smart_notices.adapter;
  }
  show(id, message, opts = {}) {
    id = this.normalize(id);
    if (typeof opts.timeout === "undefined") opts.timeout = 5e3;
    if (this.settings?.muted?.[id]) {
      if (opts.confirm && typeof opts.confirm.callback === "function") opts.confirm.callback.call();
      return;
    }
    const content = this.build(id, message, opts);
    if (this.active[id] && this.active[id].noticeEl?.parentElement) {
      return this.active[id].setMessage(content, opts.timeout);
    }
    return this.render(id, content, opts);
  }
  normalize(id) {
    id = id.replace(/[^a-zA-Z0-9_-]/g, "_");
    return id;
  }
  render(id, content, opts) {
    id = this.normalize(id);
    this.active[id] = new this.adapter(content, opts.timeout);
    return this.active[id];
  }
  build(id, message, opts = {}) {
    id = this.normalize(id);
    const frag = document.createDocumentFragment();
    const head = frag.createEl("p", { cls: "sc-notice-head", text: `[Smart Connections v${this.main.manifest.version}]` });
    const content = frag.createEl("p", { cls: "sc-notice-content" });
    const actions = frag.createEl("div", { cls: "sc-notice-actions" });
    if (typeof message === "string") content.innerText = message;
    else if (Array.isArray(message)) content.innerHTML = message.join("<br>");
    if (opts.confirm) this.add_btn(opts.confirm, actions);
    if (opts.button) this.add_btn(opts.button, actions);
    if (!opts.immutable) this.add_mute_btn(id, actions);
    return frag;
  }
  add_btn(button, container) {
    const btn = document.createElement("button");
    btn.innerHTML = button.text;
    btn.addEventListener("click", (e) => {
      if (button.stay_open) {
        e.preventDefault();
        e.stopPropagation();
      }
      button.callback();
    });
    container.appendChild(btn);
  }
  add_mute_btn(id, container) {
    id = this.normalize(id);
    const btn = document.createElement("button");
    (0, import_obsidian3.setIcon)(btn, "bell-off");
    btn.addEventListener("click", () => {
      if (!this.settings.muted) this.settings.muted = {};
      this.settings.muted[id] = true;
      this.show("Notice muted", "Notice muted", { timeout: 2e3 });
    });
    container.appendChild(btn);
  }
  unload() {
    for (let id in this.active) {
      this.remove(id);
    }
  }
  remove(id) {
    id = this.normalize(id);
    this.active[id]?.hide();
    delete this.active[id];
  }
  // begin plugin specific methods
  show_requires_smart_view() {
    const btn = { text: "Open Smart View", callback: () => {
      this.main.open_view(false);
    } };
    const msg = 'Smart View must be open to utilize all Smart Chat features. For example, asking things like "Based on my notes..." requires Smart View to be open.';
    this.show("requires smart view", msg, { button: btn, timeout: 0 });
  }
};

// src/smart_env.config.js
var import_obsidian8 = require("obsidian");

// node_modules/smart-settings/smart_settings.js
var SmartSettings = class {
  /**
   * Creates an instance of SmartEnvSettings.
   * @param {Object} main - The main object to contain the instance (smart_settings) and getter (settings)
   * @param {Object} [opts={}] - Configuration options.
   */
  constructor(main, opts = {}) {
    this.main = main;
    this.opts = opts;
    this._fs = null;
    this._settings = {};
    this._saved = false;
    this.save_timeout = null;
  }
  static async create(main, opts = {}) {
    const smart_settings = new this(main, opts);
    await smart_settings.load();
    main.smart_settings = smart_settings;
    Object.defineProperty(main, "settings", {
      get() {
        return smart_settings.settings;
      },
      set(settings) {
        smart_settings.settings = settings;
      }
    });
    return smart_settings;
  }
  static create_sync(main, opts = {}) {
    const smart_settings = new this(main, opts);
    smart_settings.load_sync();
    main.smart_settings = smart_settings;
    Object.defineProperty(main, "settings", {
      get() {
        return smart_settings.settings;
      },
      set(settings) {
        smart_settings.settings = settings;
      }
    });
    return smart_settings;
  }
  /**
   * Gets the current settings, wrapped with an observer to handle changes.
   * @returns {Proxy} A proxy object that observes changes to the settings.
   */
  get settings() {
    return observe_object(this._settings, (property, value, target) => {
      if (this.save_timeout) clearTimeout(this.save_timeout);
      this.save_timeout = setTimeout(() => {
        this.save(this._settings);
        this.save_timeout = null;
      }, 1e3);
    });
  }
  /**
   * Sets the current settings.
   * @param {Object} settings - The new settings to apply.
   */
  set settings(settings) {
    this._settings = settings;
  }
  async save(settings = this._settings) {
    if (typeof this.opts.save === "function") await this.opts.save(settings);
    else await this.main.save_settings(settings);
  }
  async load() {
    if (typeof this.opts.load === "function") this._settings = await this.opts.load();
    else this._settings = await this.main.load_settings();
  }
  load_sync() {
    if (typeof this.opts.load === "function") this._settings = this.opts.load();
    else this._settings = this.main.load_settings();
  }
};
function observe_object(obj, on_change) {
  function create_proxy(target) {
    return new Proxy(target, {
      set(target2, property, value) {
        if (target2[property] !== value) {
          target2[property] = value;
          on_change(property, value, target2);
        }
        if (typeof value === "object" && value !== null) {
          target2[property] = create_proxy(value);
        }
        return true;
      },
      get(target2, property) {
        const result = target2[property];
        if (typeof result === "object" && result !== null) {
          return create_proxy(result);
        }
        return result;
      },
      deleteProperty(target2, property) {
        if (property in target2) {
          delete target2[property];
          on_change(property, void 0, target2);
        }
        return true;
      }
    });
  }
  return create_proxy(obj);
}

// node_modules/smart-sources/components/settings.js
async function render5(scope, opts = {}) {
  const settings_html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const html = `<div class="source-settings">
    ${settings_header_html(scope, opts)}
    ${settings_html}
  </div>`;
  const frag = this.create_doc_fragment(html);
  return await post_process5.call(this, scope, frag, opts);
}
async function post_process5(source_collection, frag, opts = {}) {
  await this.render_setting_components(frag, { scope: source_collection });
  frag.querySelector(".sources-load-btn")?.addEventListener("click", () => {
    source_collection.run_load();
  });
  if (source_collection.loaded) {
    frag.querySelector(".sources-import-btn")?.addEventListener("click", () => {
      source_collection.run_import();
    });
    frag.querySelector(".sources-prune-btn")?.addEventListener("click", () => {
      source_collection.run_prune();
    });
    frag.querySelector(".sources-clear-all-btn")?.addEventListener("click", async () => {
      if (confirm("Are you sure you want to clear all data and re-import? This action cannot be undone.")) {
        await source_collection.run_clear_all();
        source_collection.render_settings();
        source_collection.block_collection.render_settings();
      }
    });
  }
  return frag;
}
function settings_header_html(scope, opts = {}) {
  const heading_text = scope.collection_key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const heading_html = scope.collection_key === "smart_sources" ? get_source_heading_html(scope) : get_block_heading_html(scope);
  const button_html = get_button_html(scope);
  return `<div class="group-header">
    <h2>${heading_text}</h2>
    ${heading_html}
    ${button_html}
  </div>`;
}
function get_source_heading_html(scope) {
  const item_count = Object.keys(scope.items).length;
  if (!scope.loaded) {
    return `<span>${item_count} sources (embeddings not currently loaded)</span>`;
  }
  const total_count = scope.total_files;
  const included_count = scope.included_files;
  if (scope.loaded !== included_count) {
    return `<span>${scope.loaded}/${included_count} sources (partially loaded, should refresh/reload)</span>`;
  }
  const embedded_items = Object.values(scope.items).filter((item) => item.vec);
  const embedded_percentage = Math.round(embedded_items.length / item_count * 100);
  const load_time_html = scope.load_time_ms ? `<span>Load time: ${scope.load_time_ms}ms</span>` : "";
  return `
    <span>${embedded_percentage}% embedded</span>
    <span>${included_count} sources included (${total_count} total)</span>
    ${load_time_html}
  `;
}
function get_block_heading_html(scope) {
  const item_count = Object.keys(scope.items).length;
  if (!scope.loaded) {
    return `<span>${item_count} blocks (embeddings not currently loaded)</span>`;
  }
  if (scope.loaded !== item_count) {
    return `<span>${scope.loaded}/${item_count} blocks (partially loaded, should refresh/reload)</span>`;
  }
  const items_w_vec = Object.values(scope.items).filter((item) => item.vec).length;
  const embedded_percentage = Math.round(items_w_vec / item_count * 100);
  const load_time_html = scope.load_time_ms ? `<span>Load time: ${scope.load_time_ms}ms</span>` : "";
  return `
    <span>${embedded_percentage}% embedded (${items_w_vec})</span>
    <span>Loaded: ${item_count} blocks (expected ${scope.expected_blocks_ct})</span>
    ${load_time_html}
  `;
}
function get_button_html(scope) {
  if (scope.collection_key !== "smart_sources") return "";
  const load_btn_html = `<button class="sources-load-btn">${scope.loaded ? "Re-load" : "Load"} Sources</button>`;
  let additional_buttons = "";
  if (scope.loaded) {
    additional_buttons = `
      <button class="sources-import-btn">Import</button>
      <button class="sources-prune-btn">Prune</button>
      <button class="sources-clear-all-btn">Clear All &amp; Re-import</button>
    `;
  }
  return `
    ${load_btn_html}
    ${additional_buttons}
  `;
}

// src/components/env_settings.js
async function build_html2(scope, opts = {}) {
  const env_settings_html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const html = `
    <div class="">
      ${env_settings_html}
      <div data-smart-settings="smart_sources"></div>
      <div data-smart-settings="smart_blocks"></div>
    </div>
  `;
  return html;
}
async function render6(scope, opts = {}) {
  let html = await build_html2.call(this, scope, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process.call(this, scope, frag, opts);
}

// node_modules/smart-entities/components/result.js
async function build_html3(result, opts = {}) {
  const item = result.item;
  const score = result.score;
  const expanded_view = item.env.settings.expanded_view;
  return `<div class="temp-container">
    <div
      class="sc-result${expanded_view ? "" : " sc-collapsed"}"
      data-path="${item.path.replace(/"/g, "&quot;")}"
      data-link="${item.link?.replace(/"/g, "&quot;") || ""}"
      data-collection="${item.collection_key}"
      data-score="${score}"
      draggable="true"
    >
      <span class="header">
        ${this.get_icon_html("right-triangle")}
        <a class="sc-result-file-title" href="#" title="${item.path.replace(/"/g, "&quot;")}" draggable="true">
          <small>${[score?.toFixed(2), item.name].join(" | ")}</small>
        </a>
      </span>
      <ul draggable="true">
        <li class="sc-result-file-title" title="${item.path.replace(/"/g, "&quot;")}" data-collection="${item.collection_key}" data-key="${item.key}"></li>
      </ul>
    </div>
  </div>`;
}
async function render7(result, opts = {}) {
  let html = await build_html3.call(this, result, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process6.call(this, result, frag, opts);
}
async function post_process6(result, frag, opts = {}) {
  const search_result = frag.querySelector(".sc-result");
  const filter_settings = result.item.env.settings.smart_view_filter;
  if (!filter_settings.render_markdown) search_result.classList.add("sc-result-plaintext");
  if (typeof opts.add_result_listeners === "function") opts.add_result_listeners(search_result);
  if (!filter_settings.expanded_view) return search_result;
  const li = search_result.querySelector("li");
  const entity = result.item;
  if (entity) {
    await entity.render_item(li, opts);
  } else {
    li.innerHTML = "<p>Entity not found.</p>";
  }
  return search_result;
}

// node_modules/smart-entities/components/results.js
async function build_html4(results, opts = {}) {
  return ``;
}
async function render8(results, opts = {}) {
  const html = await build_html4.call(this, results, opts);
  const frag = this.create_doc_fragment(html);
  const result_frags = await Promise.all(results.map((result) => {
    return render7.call(this, result, { ...opts });
  }));
  result_frags.forEach((result_frag) => frag.appendChild(result_frag));
  return frag;
}

// node_modules/smart-entities/components/connections.js
async function build_html5(scope, opts = {}) {
  const context_name = scope.path.split("/").pop();
  const html = `<div class="sc-connections-view">
    <div class="sc-top-bar">
      <p class="sc-context" data-key="${scope.path}">
        ${scope.env.smart_sources.keys.length} (${scope.env.smart_blocks.keys.length})
      </p>
      <button class="sc-refresh">${this.get_icon_html("refresh-cw")}</button>
      <button class="sc-fold-toggle">${this.get_icon_html(scope.env.settings.expanded_view ? "fold-vertical" : "unfold-vertical")}</button>
      <button class="sc-filter">${this.get_icon_html("sliders-horizontal")}</button>
      <button class="sc-search">${this.get_icon_html("search")}</button>
      <button class="sc-help" 
              aria-label="Open help documentation"
              title="Open help documentation">
        ${this.get_icon_html("help-circle")}
      </button>
    </div>
    <div id="settings" class="sc-overlay"></div>
    <div class="sc-list">
    </div>
    <div class="sc-bottom-bar">
      <span class="sc-context" data-key="${scope.path}" title="${scope.path}">
        ${context_name}${opts.re_ranked ? " (re-ranked)" : ""}
      </span>
      ${opts.attribution || ""}
    </div>
  </div>`;
  return html;
}
async function render9(source, opts = {}) {
  let html = await build_html5.call(this, source, opts);
  const frag = this.create_doc_fragment(html);
  const results = source.find_connections({ ...opts, exclude_source_connections: source.env.smart_blocks.settings.embed_blocks });
  const sc_list = frag.querySelector(".sc-list");
  const results_frag = await render8.call(this, results, opts);
  Array.from(results_frag.children).forEach((elm) => sc_list.appendChild(elm));
  return await post_process7.call(this, source, frag, opts);
}
async function post_process7(source, frag, opts = {}) {
  const container = frag.querySelector(".sc-list");
  const overlay_container = frag.querySelector(".sc-overlay");
  const render_filter_settings = async () => {
    if (!overlay_container) throw new Error("Container is required");
    overlay_container.innerHTML = "";
    const filter_frag = await this.render_settings(source.collection.connections_filter_config, {
      scope: {
        settings: source.env.settings,
        refresh_smart_view: opts.refresh_smart_view,
        refresh_smart_view_filter: render_filter_settings.bind(this)
      }
    });
    overlay_container.innerHTML = "";
    overlay_container.appendChild(filter_frag);
    this.on_open_overlay(overlay_container);
  };
  const toggle_button = frag.querySelector(".sc-fold-toggle");
  toggle_button.addEventListener("click", () => {
    const expanded = source.env.settings.expanded_view;
    container.querySelectorAll(".sc-result").forEach((elm) => {
      if (expanded) {
        elm.classList.add("sc-collapsed");
      } else {
        elm.classList.remove("sc-collapsed");
        const collection_key = elm.dataset.collection;
        const entity = source.env[collection_key].get(elm.dataset.path);
        entity.render_item(elm.querySelector("li"));
      }
    });
    source.env.settings.expanded_view = !expanded;
    toggle_button.innerHTML = this.get_icon_html(source.env.settings.expanded_view ? "fold-vertical" : "unfold-vertical");
    toggle_button.setAttribute("aria-label", source.env.settings.expanded_view ? "Fold all" : "Unfold all");
  });
  const filter_button = frag.querySelector(".sc-filter");
  filter_button.addEventListener("click", () => {
    render_filter_settings();
  });
  const refresh_button = frag.querySelector(".sc-refresh");
  refresh_button.addEventListener("click", () => {
    opts.refresh_smart_view();
  });
  const search_button = frag.querySelector(".sc-search");
  search_button.addEventListener("click", () => {
    opts.open_lookup_view();
  });
  const help_button = frag.querySelector(".sc-help");
  help_button.addEventListener("click", () => {
    window.open("https://docs.smartconnections.app/connections-pane", "_blank");
  });
  return frag;
}

// node_modules/smart-entities/components/lookup.js
async function build_html6(collection, opts = {}) {
  return `<div id="sc-lookup-view">
    <div class="sc-top-bar">
      <button class="sc-fold-toggle">${this.get_icon_html(collection.settings.expanded_view ? "fold-vertical" : "unfold-vertical")}</button>
    </div>
    <div class="sc-container">
      <h2>Smart Lookup</h2>
      <div class="sc-textarea-container">
        <textarea
          id="query"
          name="query"
          placeholder="Describe what you're looking for (e.g., 'PKM strategies', 'story elements', 'personal AI alignment')"
        ></textarea>
        <div class="sc-textarea-btn-container">
          <button class="send-button">${this.get_icon_html("search")}</button>
        </div>
      </div>
      <p>Use semantic (embeddings) search to surface relevant notes. Results are sorted by similarity to your query. Note: returns different results than lexical (keyword) search.</p>
    </div>
    <div class="sc-list">
    </div>
    <div class="sc-bottom-bar">
      ${opts.attribution || ""}
    </div>
  </div>`;
}
async function render10(collection, opts = {}) {
  let html = await build_html6.call(this, collection, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process8.call(this, collection, frag, opts);
}
async function post_process8(collection, frag, opts = {}) {
  const query_input = frag.querySelector("#query");
  const results_container = frag.querySelector(".sc-list");
  const render_lookup = async (query, results_container2) => {
    const results = await collection.lookup({ hypotheticals: [query] });
    results_container2.innerHTML = "";
    const results_frag = await render8.call(this, results, opts);
    Array.from(results_frag.children).forEach((elm) => results_container2.appendChild(elm));
  };
  let timeout;
  query_input.addEventListener("input", (event) => {
    clearTimeout(timeout);
    const query = event.target.value.trim();
    if (query) {
      timeout = setTimeout(async () => {
        await render_lookup(query, results_container);
      }, 500);
    }
  });
  if (opts.query) {
    query_input.value = opts.query;
    await render_lookup(opts.query, results_container);
  }
  const send_button = frag.querySelector(".send-button");
  send_button.addEventListener("click", async (event) => {
    clearTimeout(timeout);
    const query = query_input.value.trim();
    if (query) {
      await render_lookup(query, results_container);
    }
  });
  const fold_toggle = frag.querySelector(".sc-fold-toggle");
  fold_toggle.addEventListener("click", async (event) => {
    const container = event.target.closest("#sc-lookup-view");
    const expanded = collection.settings.expanded_view;
    const results = container.querySelectorAll(".sc-result");
    for (const elm of results) {
      if (expanded) {
        elm.classList.add("sc-collapsed");
      } else {
        elm.click();
      }
    }
    collection.settings.expanded_view = !expanded;
    fold_toggle.innerHTML = this.get_icon_html(collection.settings.expanded_view ? "fold-vertical" : "unfold-vertical");
    fold_toggle.setAttribute("aria-label", collection.settings.expanded_view ? "Fold all" : "Unfold all");
  });
  return frag;
}

// node_modules/smart-model/components/settings.js
async function render11(scope, opts = {}) {
  const html = Object.entries(scope.settings_config).map(([setting_key, setting_config]) => {
    if (!setting_config.setting) setting_config.setting = setting_key;
    if (this.validate_setting(scope, opts, setting_key, setting_config)) return this.render_setting_html(setting_config);
    return "";
  }).join("\n");
  const frag = this.create_doc_fragment(html);
  return await post_process9.call(this, scope, frag, opts);
}
async function post_process9(scope, frag, opts = {}) {
  await this.render_setting_components(frag, { scope });
  return frag;
}

// node_modules/smart-groups/components/directory.js
async function build_html7(directory, opts = {}) {
  const expanded_view = opts.expanded_view || directory.env.settings.expanded_view;
  const sources = directory.direct_sources;
  const subdirs = directory.direct_subdirectories;
  return `<div class="sg-directory-item${expanded_view ? "" : " sg-collapsed"}" 
       data-path="${directory.data.path}"
       draggable="true">
    <div class="sg-directory-header">
      ${this.get_icon_html("right-triangle")}
      <span class="sg-directory-name" title="${directory.data.path}">
        ${directory.data.path.slice(0, -1)}
      </span>
      <small class="sg-directory-stats">
        ${sources.length} files${subdirs.length ? `, ${subdirs.length} subdirs` : ""}
      </small>
    </div>
    <div class="sg-directory-content">
      <div class="sg-subdirectories sc-list"></div>
      <div class="sg-directory-sources sc-list"></div>
    </div>
  </div>`;
}
async function render12(directory, opts = {}) {
  const html = await build_html7.call(this, directory, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process10.call(this, directory, frag, opts);
}
async function post_process10(directory, frag, opts = {}) {
  const dir_item = frag.querySelector(".sg-directory-item");
  const sources_container = dir_item.querySelector(".sg-directory-sources");
  const subdirs_container = dir_item.querySelector(".sg-subdirectories");
  const header = dir_item.querySelector(".sg-directory-header");
  header.addEventListener("click", async (e) => {
    e.stopPropagation();
    const was_collapsed = dir_item.classList.contains("sg-collapsed");
    dir_item.classList.toggle("sg-collapsed");
    if (was_collapsed && !sources_container.innerHTML.trim()) {
      await render_content.call(this, directory, sources_container, subdirs_container, opts);
    }
  });
  const start_expanded = opts.expanded_view || directory.env.settings.expanded_view;
  if (start_expanded) {
    dir_item.classList.remove("sg-collapsed");
    await render_content.call(this, directory, sources_container, subdirs_container, opts);
  }
  return dir_item;
}
async function render_content(directory, sources_container, subdirs_container, opts) {
  if (!sources_container.innerHTML.trim()) {
    sources_container.innerHTML = "";
    subdirs_container.innerHTML = "";
    const results = directory.settings.sort_nearest ? directory.nearest_sources_results : directory.furthest_sources_results;
    const result_frags = await render8.call(this, results, opts);
    sources_container.appendChild(result_frags);
  }
}

// node_modules/smart-groups/components/directories.js
async function build_html8(directories, opts = {}) {
  const html = `<div class="sg-directories-view">
    <div class="sg-top-bar">
      <div class="sg-actions">
        <button class="sg-refresh" aria-label="Refresh view">${this.get_icon_html("refresh-cw")}</button>
        <button class="sg-sort" aria-label="Sort directories">${this.get_icon_html("arrow-up-down")} ${directories.settings.sort_nearest ? "nearest" : "furthest"}</button>
        <button class="sg-subdirectories" aria-label="Show subdirectories">${directories.settings.show_subdirectories ? this.get_icon_html("folder-minus") : this.get_icon_html("folder-plus")}</button>
        <button class="sg-help" aria-label="Open help documentation">${this.get_icon_html("help-circle")}</button>
      </div>
    </div>
    <div class="sg-list">
    </div>
  </div>`;
  return html;
}
async function render13(directories, opts = {}) {
  const html = await build_html8.call(this, directories, opts);
  const frag = this.create_doc_fragment(html);
  const sg_list = frag.querySelector(".sg-list");
  const directory_frags = await Promise.all(
    Object.values(directories.items).filter((dir) => directories.settings.show_subdirectories ? true : !dir.data.path.slice(0, -1).includes("/")).sort((a, b) => a.data.path.localeCompare(b.data.path)).map(
      (directory) => render12.call(this, directory, opts)
    )
  );
  directory_frags.forEach((dir_frag) => sg_list.appendChild(dir_frag));
  return await post_process11.call(this, directories, frag, opts);
}
async function post_process11(directories, frag, opts = {}) {
  const refresh_button = frag.querySelector(".sg-refresh");
  refresh_button.addEventListener("click", () => {
    opts.refresh_view();
  });
  const help_button = frag.querySelector(".sg-help");
  help_button.addEventListener("click", () => {
    window.open("https://docs.smartconnections.app/directories", "_blank");
  });
  const sort_button = frag.querySelector(".sg-sort");
  sort_button.addEventListener("click", () => {
    directories.settings.sort_nearest = !directories.settings.sort_nearest;
    opts.refresh_view();
  });
  const subdirectories_button = frag.querySelector(".sg-subdirectories");
  subdirectories_button.addEventListener("click", () => {
    directories.settings.show_subdirectories = !directories.settings.show_subdirectories;
    opts.refresh_view();
  });
  return frag;
}

// node_modules/smart-chat-model/node_modules/smart-model/smart_model.js
var SmartModel2 = class {
  scope_name = "smart_model";
  static defaults = {
    // override in sub-class if needed
  };
  /**
   * Create a SmartModel instance.
   * @param {Object} opts - Configuration options
   * @param {Object} opts.adapters - Map of adapter names to adapter classes
   * @param {Object} opts.settings - Model settings configuration
   * @param {Object} opts.model_config - Model-specific configuration
   * @param {string} opts.model_config.adapter - Name of the adapter to use
   * @param {string} [opts.model_key] - Optional model identifier to override settings
   * @throws {Error} If required options are missing
   */
  constructor(opts = {}) {
    this.opts = opts;
    this.validate_opts(opts);
    this.state = "unloaded";
    this._adapter = null;
  }
  /**
   * Initialize the model by loading the configured adapter.
   * @async
   * @returns {Promise<void>}
   */
  async initialize() {
    this.load_adapter(this.adapter_name);
    await this.load();
  }
  /**
   * Validate required options.
   * @param {Object} opts - Configuration options
   */
  validate_opts(opts) {
    if (!opts.adapters) throw new Error("opts.adapters is required");
    if (!opts.settings) throw new Error("opts.settings is required");
  }
  /**
   * Get the current settings
   * @returns {Object} Current settings
   */
  get settings() {
    if (!this.opts.settings) this.opts.settings = {
      ...this.constructor.defaults
    };
    return this.opts.settings;
  }
  /**
   * Get the current adapter name
   * @returns {string} Current adapter name
   */
  get adapter_name() {
    const adapter_key = this.opts.model_config?.adapter || this.opts.adapter || this.settings.adapter || Object.keys(this.adapters)[0];
    if (!adapter_key || !this.adapters[adapter_key]) throw new Error(`Platform "${adapter_key}" not supported`);
    return adapter_key;
  }
  /**
   * Get adapter-specific settings.
   * @returns {Object} Settings for current adapter
   */
  get adapter_settings() {
    if (!this.settings[this.adapter_name]) this.settings[this.adapter_name] = {};
    return this.settings[this.adapter_name];
  }
  get adapter_config() {
    const base_config = this.adapters[this.adapter_name]?.defaults || {};
    return {
      ...base_config,
      ...this.adapter_settings,
      ...this.opts.adapter_config
    };
  }
  /**
   * Get available models.
   * @returns {Object} Map of model objects
   */
  get models() {
    return this.adapter.models;
  }
  /**
   * Get the default model key to use
   * @returns {string} Default model identifier
   */
  get default_model_key() {
    throw new Error("default_model_key must be overridden in sub-class");
  }
  /**
   * Get the current model key
   * @returns {string} Current model key
   */
  get model_key() {
    return this.opts.model_key || this.adapter_config.model_key || this.settings.model_key || this.default_model_key;
  }
  /**
   * Get the current model configuration
   * @returns {Object} Combined base and custom model configuration
   */
  get model_config() {
    const model_key = this.model_key;
    const base_model_config = this.models[model_key] || {};
    return {
      ...this.adapter_config,
      ...base_model_config,
      ...this.opts.model_config
    };
  }
  get model_settings() {
    if (!this.settings[this.model_key]) this.settings[this.model_key] = {};
    return this.settings[this.model_key];
  }
  /**
   * Load the current adapter and transition to loaded state.
   * @async
   * @returns {Promise<void>}
   */
  async load() {
    this.set_state("loading");
    if (!this.adapter?.loaded) {
      await this.invoke_adapter_method("load");
    }
    this.set_state("loaded");
  }
  /**
   * Unload the current adapter and transition to unloaded state.
   * @async
   * @returns {Promise<void>}
   */
  async unload() {
    if (this.adapter?.loaded) {
      this.set_state("unloading");
      await this.invoke_adapter_method("unload");
      this.set_state("unloaded");
    }
  }
  /**
   * Set the model's state.
   * @param {('unloaded'|'loading'|'loaded'|'unloading')} new_state - The new state
   * @throws {Error} If the state is invalid
   */
  set_state(new_state) {
    const valid_states = ["unloaded", "loading", "loaded", "unloading"];
    if (!valid_states.includes(new_state)) {
      throw new Error(`Invalid state: ${new_state}`);
    }
    this.state = new_state;
  }
  get is_loading() {
    return this.state === "loading";
  }
  get is_loaded() {
    return this.state === "loaded";
  }
  get is_unloading() {
    return this.state === "unloading";
  }
  get is_unloaded() {
    return this.state === "unloaded";
  }
  // ADAPTERS
  /**
   * Get the map of available adapters
   * @returns {Object} Map of adapter names to adapter classes
   */
  get adapters() {
    return this.opts.adapters || {};
  }
  /**
   * Load a specific adapter by name.
   * @async
   * @param {string} adapter_name - Name of the adapter to load
   * @throws {Error} If adapter not found or loading fails
   * @returns {Promise<void>}
   */
  async load_adapter(adapter_name) {
    this.set_adapter(adapter_name);
    if (!this._adapter.loaded) {
      this.set_state("loading");
      try {
        await this.invoke_adapter_method("load");
        this.set_state("loaded");
      } catch (err) {
        this.set_state("unloaded");
        throw new Error(`Failed to load adapter: ${err.message}`);
      }
    }
  }
  /**
   * Set an adapter instance by name without loading it.
   * @param {string} adapter_name - Name of the adapter to set
   * @throws {Error} If adapter not found
   */
  set_adapter(adapter_name) {
    const AdapterClass = this.adapters[adapter_name];
    if (!AdapterClass) {
      throw new Error(`Adapter "${adapter_name}" not found.`);
    }
    if (this._adapter?.constructor.name.toLowerCase() === adapter_name.toLowerCase()) {
      return;
    }
    this._adapter = new AdapterClass(this);
  }
  /**
   * Get the current active adapter instance
   * @returns {Object} The active adapter instance
   * @throws {Error} If adapter not found
   */
  get adapter() {
    const adapter_name = this.adapter_name;
    if (!adapter_name) {
      throw new Error(`Adapter not set for model.`);
    }
    if (!this._adapter) {
      this.load_adapter(adapter_name);
    }
    return this._adapter;
  }
  /**
   * Ensure the adapter is ready to execute a method.
   * @param {string} method - Name of the method to check
   * @throws {Error} If adapter not loaded or method not implemented
   */
  ensure_adapter_ready(method) {
    if (!this.adapter) {
      throw new Error("No adapter loaded.");
    }
    if (typeof this.adapter[method] !== "function") {
      throw new Error(`Adapter does not implement method: ${method}`);
    }
  }
  /**
   * Invoke a method on the current adapter.
   * @async
   * @param {string} method - Name of the method to call
   * @param {...any} args - Arguments to pass to the method
   * @returns {Promise<any>} Result from the adapter method
   * @throws {Error} If adapter not ready or method fails
   */
  async invoke_adapter_method(method, ...args) {
    this.ensure_adapter_ready(method);
    return await this.adapter[method](...args);
  }
  /**
   * Get platforms as dropdown options.
   * @returns {Array<Object>} Array of {value, name} option objects
   */
  get_platforms_as_options() {
    console.log("get_platforms_as_options", this.adapters);
    return Object.entries(this.adapters).map(([key, AdapterClass]) => ({ value: key, name: AdapterClass.defaults.description || key }));
  }
  // SETTINGS
  /**
   * Get the settings configuration schema
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    return this.process_settings_config({
      adapter: {
        name: "Model Platform",
        type: "dropdown",
        description: "Select a model platform to use with Smart Model.",
        options_callback: "get_platforms_as_options",
        is_scope: true,
        // trigger re-render of settings when changed
        callback: "adapter_changed",
        default: "default"
      }
    });
  }
  /**
   * Process settings configuration with conditionals and prefixes.
   * @param {Object} _settings_config - Raw settings configuration
   * @param {string} [prefix] - Optional prefix for setting keys
   * @returns {Object} Processed settings configuration
   */
  process_settings_config(_settings_config, prefix = null) {
    return Object.entries(_settings_config).reduce((acc, [key, val]) => {
      if (val.conditional) {
        if (!val.conditional(this)) return acc;
        delete val.conditional;
      }
      const new_key = (prefix ? prefix + "." : "") + this.process_setting_key(key);
      acc[new_key] = val;
      return acc;
    }, {});
  }
  /**
   * Process an individual setting key.
   * @param {string} key - Setting key to process
   * @returns {string} Processed setting key
   */
  process_setting_key(key) {
    return key;
  }
  // override in sub-class if needed for prefixes and variable replacements
  re_render_settings() {
    if (typeof this.opts.re_render_settings === "function") this.opts.re_render_settings();
    else console.warn("re_render_settings is not a function (must be passed in model opts)");
  }
  /**
   * Reload model.
   */
  reload_model() {
    console.log("reload_model", this.opts);
    if (typeof this.opts.reload_model === "function") this.opts.reload_model();
    else console.warn("reload_model is not a function (must be passed in model opts)");
  }
  adapter_changed() {
    this.reload_model();
    this.re_render_settings();
  }
  model_changed() {
    this.reload_model();
    this.re_render_settings();
  }
  // /**
  //  * Render settings.
  //  * @param {HTMLElement} [container] - Container element
  //  * @param {Object} [opts] - Render options
  //  * @returns {Promise<HTMLElement>} Container element
  //  */
  // async render_settings(container=this.settings_container, opts = {}) {
  //   if(!this.settings_container || container !== this.settings_container) this.settings_container = container;
  //   const model_type = this.constructor.name.toLowerCase().replace('smart', '').replace('model', '');
  //   let model_settings_container;
  //   if(this.settings_container) {
  //     const container_id = `#${model_type}-model-settings-container`;
  //     model_settings_container = this.settings_container.querySelector(container_id);
  //     if(!model_settings_container) {
  //       model_settings_container = document.createElement('div');
  //       model_settings_container.id = container_id;
  //       this.settings_container.appendChild(model_settings_container);
  //     }
  //     model_settings_container.innerHTML = '<div class="sc-loading">Loading ' + this.adapter_name + ' settings...</div>';
  //   }
  //   const frag = await this.render_settings_component(this, opts);
  //   if(model_settings_container) {
  //     model_settings_container.innerHTML = '';
  //     model_settings_container.appendChild(frag);
  //     this.smart_view.on_open_overlay(model_settings_container);
  //   }
  //   return frag;
  // }
};

// node_modules/smart-chat-model/smart_chat_model.js
var SmartChatModel = class extends SmartModel2 {
  scope_name = "smart_chat_model";
  static defaults = {
    adapter: "openai"
  };
  /**
   * Create a SmartChatModel instance.
   * @param {Object} opts - Configuration options
   * @param {string} opts.adapter - Adapter to use
   * @param {Object} opts.adapters - Map of adapter names to adapter classes
   * @param {Object} opts.settings - Model settings configuration
   */
  constructor(opts = {}) {
    super(opts);
  }
  /**
   * Get available models.
   * @returns {Object} Map of model objects
   */
  get models() {
    return this.adapter.models;
  }
  get can_stream() {
    return this.adapter.constructor.defaults.streaming;
  }
  get can_use_tools() {
    return this.adapter.constructor.defaults.can_use_tools;
  }
  /**
   * Complete a chat request.
   * @param {Object} req - Request parameters
   * @returns {Promise<Object>} Completion result
   */
  async complete(req) {
    return await this.invoke_adapter_method("complete", req);
  }
  /**
   * Stream chat responses.
   * @param {Object} req - Request parameters
   * @param {Object} handlers - Event handlers for streaming
   * @returns {Promise<string>} Complete response text
   */
  async stream(req, handlers = {}) {
    return await this.invoke_adapter_method("stream", req, handlers);
  }
  /**
   * Stop active stream.
   */
  stop_stream() {
    this.invoke_adapter_method("stop_stream");
  }
  /**
   * Count tokens in input text.
   * @param {string|Object} input - Text to count tokens for
   * @returns {Promise<number>} Token count
   */
  async count_tokens(input) {
    return await this.invoke_adapter_method("count_tokens", input);
  }
  /**
   * Test if API key is valid.
   * @returns {Promise<boolean>} True if API key is valid
   */
  async test_api_key() {
    await this.invoke_adapter_method("test_api_key");
    this.re_render_settings();
  }
  /**
   * Get default model key.
   * @returns {string} Default model key
   */
  get default_model_key() {
    return this.adapter.constructor.defaults.default_model;
  }
  /**
   * Get current settings.
   * @returns {Object} Settings object
   */
  get settings() {
    return this.opts.settings;
  }
  /**
   * Get settings configuration.
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    const _settings_config = {
      adapter: {
        name: "Chat Model Platform",
        type: "dropdown",
        description: "Select a chat model platform to use with Smart Chat.",
        options_callback: "get_platforms_as_options",
        is_scope: true,
        // trigger re-render of settings when changed
        callback: "adapter_changed",
        default: "open_router"
      },
      // Merge adapter-specific settings
      ...this.adapter.settings_config || {}
    };
    return this.process_settings_config(_settings_config);
  }
  /**
   * Process setting key.
   * @param {string} key - Setting key
   * @returns {string} Processed key
   */
  process_setting_key(key) {
    return key.replace(/\[CHAT_ADAPTER\]/g, this.adapter_name);
  }
  /**
   * Validate the adapter configuration.
   * @returns {Object} Validation result with 'valid' and 'message'.
   */
  validate_config() {
    return this.adapter.validate_config();
  }
};

// node_modules/smart-chat-model/node_modules/smart-http-request/smart_http_request.js
var SmartHttpRequest2 = class {
  /**
   * @param {object} opts - Options for the SmartHttpRequest class
   * @param {SmartHttpRequestAdapter} opts.adapter - The adapter constructor to use for making HTTP requests
   * @param {Obsidian.requestUrl} opts.obsidian_request_adapter - For use with Obsidian adapter
   */
  constructor(opts = {}) {
    this.opts = opts;
    if (!opts.adapter) throw new Error("HttpRequestAdapter is required");
    this.adapter = new opts.adapter(this);
  }
  /**
   * Returns a well-formed response object
   * @param {object} request_params - Parameters for the HTTP request
   * @param {string} request_params.url - The URL to make the request to
   * @param {string} [request_params.method='GET'] - The HTTP method to use
   * @param {object} [request_params.headers] - Headers to include in the request
   * @param {*} [request_params.body] - The body of the request (for POST, PUT, etc.)
   * @returns {SmartHttpResponseAdapter} instance of the SmartHttpResponseAdapter class
   * @example
   * const response = await smart_http_request.request({
   *   url: 'https://api.example.com/data',
   *   method: 'GET',
   *   headers: { 'Content-Type': 'application/json' }
   * });
   * console.log(await response.json());
   */
  async request(request_params) {
    return await this.adapter.request(request_params);
  }
};

// node_modules/smart-chat-model/node_modules/smart-http-request/adapters/_adapter.js
var SmartHttpRequestAdapter2 = class {
  constructor(main) {
    this.main = main;
  }
  async request(request_params) {
    throw new Error("request not implemented");
  }
};
var SmartHttpResponseAdapter2 = class {
  constructor(response) {
    this.response = response;
  }
  async headers() {
    throw new Error("headers not implemented");
  }
  async json() {
    throw new Error("json not implemented");
  }
  async status() {
    throw new Error("status not implemented");
  }
  async text() {
    throw new Error("text not implemented");
  }
};

// node_modules/smart-chat-model/node_modules/smart-http-request/adapters/fetch.js
var SmartHttpRequestFetchAdapter2 = class extends SmartHttpRequestAdapter2 {
  async request(request_params) {
    const { url: url2, ...opts } = request_params;
    const resp = await fetch(url2, opts);
    return new SmartHttpResponseFetchAdapter2(resp);
  }
};
var SmartHttpResponseFetchAdapter2 = class extends SmartHttpResponseAdapter2 {
  async headers() {
    return this.response.headers;
  }
  async json() {
    if (!this._json) {
      this._json = await this.response.json();
    }
    return this._json;
  }
  async status() {
    return this.response.status;
  }
  async text() {
    if (!this._text) {
      this._text = await this.response.text();
    }
    return this._text;
  }
};

// node_modules/smart-chat-model/streamer.js
var SmartStreamer = class {
  constructor(url2, options = {}) {
    const {
      method = "GET",
      headers = {},
      body = null,
      withCredentials = false
    } = options;
    this.url = url2;
    this.method = method;
    this.headers = headers;
    this.body = body;
    this.withCredentials = withCredentials;
    this.listeners = {};
    this.readyState = this.CONNECTING;
    this.progress = 0;
    this.chunk = "";
    this.last_event_id = "";
    this.xhr = null;
    this.FIELD_SEPARATOR = ":";
    this.INITIALIZING = -1;
    this.CONNECTING = 0;
    this.OPEN = 1;
    this.CLOSED = 2;
    this.chunk_accumulator = "";
    this.chunk_splitting_regex = options.chunk_splitting_regex || /(\r\n|\n|\r)/g;
  }
  /**
   * Adds an event listener for the specified event type.
   *
   * @param {string} type - The type of the event.
   * @param {Function} listener - The listener function to be called when the event is triggered.
   */
  addEventListener(type, listener) {
    if (!this.listeners[type]) this.listeners[type] = [];
    if (!this.listeners[type].includes(listener)) this.listeners[type].push(listener);
  }
  /**
   * Removes an event listener from the SmartStreamer instance.
   *
   * @param {string} type - The type of event to remove the listener from.
   * @param {Function} listener - The listener function to remove.
   */
  removeEventListener(type, listener) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((callback) => callback !== listener);
    if (this.listeners[type].length === 0) delete this.listeners[type];
  }
  /**
   * Dispatches an event to the appropriate event handlers.
   *
   * @param {Event} event - The event to be dispatched.
   * @returns {boolean} - Returns true if the event was successfully dispatched, false otherwise.
   */
  dispatchEvent(event) {
    if (!event) return true;
    event.source = this;
    const onHandler = "on" + event.type;
    if (Object.prototype.hasOwnProperty.call(this, onHandler)) {
      this[onHandler].call(this, event);
      if (event.defaultPrevented) return false;
    }
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach((callback) => {
        callback(event);
        return !event.defaultPrevented;
      });
    }
    return true;
  }
  /**
   * Initiates the streaming process.
   */
  stream() {
    this.#setReadyState(this.CONNECTING);
    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener("progress", this.#onStreamProgress.bind(this));
    this.xhr.addEventListener("load", this.#onStreamLoaded.bind(this));
    this.xhr.addEventListener("readystatechange", this.#checkStreamClosed.bind(this));
    this.xhr.addEventListener("error", this.#onStreamFailure.bind(this));
    this.xhr.addEventListener("abort", this.#onStreamAbort.bind(this));
    this.xhr.open(this.method, this.url);
    for (const header in this.headers) {
      this.xhr.setRequestHeader(header, this.headers[header]);
    }
    if (this.last_event_id) this.xhr.setRequestHeader("Last-Event-ID", this.last_event_id);
    this.xhr.withCredentials = this.withCredentials;
    this.xhr.send(this.body);
  }
  /**
   * Ends the streamer connection.
   * Aborts the current XHR request and sets the ready state to CLOSED.
   */
  end() {
    if (this.readyState === this.CLOSED) return;
    this.xhr.abort();
    this.xhr = null;
    this.#setReadyState(this.CLOSED);
  }
  // private methods
  #setReadyState(state) {
    const event = new CustomEvent("readyStateChange");
    event.readyState = state;
    this.readyState = state;
    this.dispatchEvent(event);
  }
  #onStreamFailure(e) {
    const event = new CustomEvent("error");
    event.data = e.currentTarget.response;
    this.dispatchEvent(event);
    this.end();
  }
  #onStreamAbort(e) {
    const event = new CustomEvent("abort");
    this.end();
  }
  #onStreamProgress(e) {
    if (!this.xhr) return;
    if (this.xhr.status !== 200) {
      this.#onStreamFailure(e);
      return;
    }
    if (this.readyState === this.CONNECTING) {
      this.dispatchEvent(new CustomEvent("open"));
      this.#setReadyState(this.OPEN);
    }
    const data = this.xhr.responseText.substring(this.progress);
    this.progress += data.length;
    const parts = data.split(this.chunk_splitting_regex);
    parts.forEach((part, index) => {
      if (part.trim().length === 0) {
        if (this.chunk) {
          this.dispatchEvent(this.#parseEventChunk(this.chunk.trim()));
          this.chunk = "";
        }
      } else {
        this.chunk += part;
        if (index === parts.length - 1 && this.xhr.readyState === XMLHttpRequest.DONE) {
          this.dispatchEvent(this.#parseEventChunk(this.chunk.trim()));
          this.chunk = "";
        }
      }
    });
  }
  #onStreamLoaded(e) {
    this.#onStreamProgress(e);
    this.dispatchEvent(this.#parseEventChunk(this.chunk));
    this.chunk = "";
  }
  #parseEventChunk(chunk) {
    if (!chunk) return console.log("no chunk");
    const event = new CustomEvent("message");
    event.data = chunk;
    event.last_event_id = this.last_event_id;
    return event;
  }
  #checkStreamClosed() {
    if (!this.xhr) return;
    if (this.xhr.readyState === XMLHttpRequest.DONE) this.#setReadyState(this.CLOSED);
  }
};

// node_modules/smart-chat-model/node_modules/smart-model/adapters/_adapter.js
var SmartModelAdapter2 = class {
  /**
   * Create a SmartModelAdapter instance.
   * @param {SmartModel} model - The parent SmartModel instance
   */
  constructor(model) {
    this.model = model;
    this.state = "unloaded";
  }
  /**
   * Load the adapter.
   * @async
   * @returns {Promise<void>}
   */
  async load() {
    this.set_state("loaded");
  }
  /**
   * Unload the adapter.
   * @returns {void}
   */
  unload() {
    this.set_state("unloaded");
  }
  /**
   * Get all settings.
   * @returns {Object} All settings
   */
  get settings() {
    return this.model.settings;
  }
  /**
   * Get the current model key.
   * @returns {string} Current model identifier
   */
  get model_key() {
    return this.model.model_key;
  }
  /**
   * Get the current model configuration.
   * @returns {Object} Model configuration
   */
  get model_config() {
    return this.model.model_config;
  }
  /**
   * Get model-specific settings.
   * @returns {Object} Settings for current model
   */
  get model_settings() {
    return this.model.model_settings;
  }
  /**
   * Get adapter-specific configuration.
   * @returns {Object} Adapter configuration
   */
  get adapter_config() {
    return this.model.adapter_config;
  }
  /**
   * Get adapter-specific settings.
   * @returns {Object} Adapter settings
   */
  get adapter_settings() {
    return this.model.adapter_settings;
  }
  /**
   * Get the models.
   * @returns {Object} Map of model objects
   */
  get models() {
    if (typeof this.adapter_config.models === "object" && Object.keys(this.adapter_config.models || {}).length > 0) return this.adapter_config.models;
    else {
      return {};
    }
  }
  /**
   * Get available models from the API.
   * @abstract
   * @param {boolean} [refresh=false] - Whether to refresh cached models
   * @returns {Promise<Object>} Map of model objects
   */
  async get_models(refresh = false) {
    throw new Error("get_models not implemented");
  }
  /**
   * Validate the parameters for get_models.
   * @returns {boolean|Array<Object>} True if parameters are valid, otherwise an array of error objects
   */
  validate_get_models_params() {
    return true;
  }
  /**
   * Get available models as dropdown options synchronously.
   * @returns {Array<Object>} Array of model options.
   */
  get_models_as_options_sync() {
    const models = this.models;
    const params_valid = this.validate_get_models_params();
    if (params_valid !== true) return params_valid;
    if (!Object.keys(models || {}).length) {
      this.get_models(true);
      return [{ value: "", name: "No models currently available" }];
    }
    return Object.values(models).map((model) => ({ value: model.id, name: model.name || model.id })).sort((a, b) => a.name.localeCompare(b.name));
  }
  /**
   * Set the adapter's state.
   * @param {('unloaded'|'loading'|'loaded'|'unloading')} new_state - The new state
   * @throws {Error} If the state is invalid
   */
  set_state(new_state) {
    const valid_states = ["unloaded", "loading", "loaded", "unloading"];
    if (!valid_states.includes(new_state)) {
      throw new Error(`Invalid state: ${new_state}`);
    }
    this.state = new_state;
  }
  // Replace individual state getters/setters with a unified state management
  get is_loading() {
    return this.state === "loading";
  }
  get is_loaded() {
    return this.state === "loaded";
  }
  get is_unloading() {
    return this.state === "unloading";
  }
  get is_unloaded() {
    return this.state === "unloaded";
  }
};

// node_modules/smart-chat-model/adapters/_adapter.js
var SmartChatModelAdapter = class extends SmartModelAdapter2 {
  /**
   * @override in sub-class with adapter-specific default configurations
   * @property {string} id - The adapter identifier
   * @property {string} description - Human-readable description
   * @property {string} type - Adapter type ("API")
   * @property {string} endpoint - API endpoint
   * @property {boolean} streaming - Whether streaming is supported
   * @property {string} adapter - Adapter identifier
   * @property {string} models_endpoint - Endpoint for retrieving models
   * @property {string} default_model - Default model to use
   * @property {string} signup_url - URL for API key signup
   */
  static defaults = {};
  /**
   * Create a SmartChatModelAdapter instance.
   * @param {SmartChatModel} model - The parent SmartChatModel instance
   */
  constructor(model) {
    super(model);
    this.smart_chat = model;
    this.main = model;
  }
  /**
   * Complete a chat request.
   * @abstract
   * @param {Object} req - Request parameters
   * @returns {Promise<Object>} Completion result
   */
  async complete(req) {
    throw new Error("complete not implemented");
  }
  /**
   * Count tokens in input text.
   * @abstract
   * @param {string|Object} input - Text to count tokens for
   * @returns {Promise<number>} Token count
   */
  async count_tokens(input) {
    throw new Error("count_tokens not implemented");
  }
  /**
   * Stream chat responses.
   * @abstract
   * @param {Object} req - Request parameters
   * @param {Object} handlers - Event handlers for streaming
   * @returns {Promise<string>} Complete response text
   */
  async stream(req, handlers = {}) {
    throw new Error("stream not implemented");
  }
  /**
   * Test if API key is valid.
   * @abstract
   * @returns {Promise<boolean>} True if API key is valid
   */
  async test_api_key() {
    throw new Error("test_api_key not implemented");
  }
  /**
   * Refresh available models.
   */
  refresh_models() {
    console.log("refresh_models");
    this.get_models(true);
  }
  /**
   * Get settings configuration.
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    return {
      "[CHAT_ADAPTER].model_key": {
        name: "Chat Model",
        type: "dropdown",
        description: "Select a chat model to use with Smart Chat.",
        options_callback: "adapter.get_models_as_options_sync",
        callback: "reload_model",
        default: this.constructor.defaults.default_model
      },
      "[CHAT_ADAPTER].refresh_models": {
        name: "Refresh Models",
        type: "button",
        description: "Refresh the list of available models.",
        callback: "adapter.refresh_models"
      }
    };
  }
  /**
   * Validate the adapter configuration.
   * @abstract
   * @returns {Object} { valid: boolean, message: string }
   */
  validate_config() {
    throw new Error("validate_config not implemented");
  }
  get can_use_tools() {
    return this.model_config?.can_use_tools || false;
  }
};

// node_modules/smart-chat-model/adapters/_api.js
var SmartChatModelApiAdapter = class extends SmartChatModelAdapter {
  /**
   * Get the request adapter class.
   * @returns {SmartChatModelRequestAdapter} The request adapter class
   */
  get req_adapter() {
    return SmartChatModelRequestAdapter;
  }
  /**
   * Get the response adapter class.
   * @returns {SmartChatModelResponseAdapter} The response adapter class
   */
  get res_adapter() {
    return SmartChatModelResponseAdapter;
  }
  /**
   * Get or initialize the HTTP adapter.
   * @returns {SmartHttpRequest} The HTTP adapter instance
   */
  get http_adapter() {
    if (!this._http_adapter) {
      if (this.model.opts.http_adapter) this._http_adapter = this.model.opts.http_adapter;
      else this._http_adapter = new SmartHttpRequest2({ adapter: SmartHttpRequestFetchAdapter2 });
    }
    return this._http_adapter;
  }
  /**
   * Get the settings configuration for the API adapter.
   * @returns {Object} Settings configuration object with API key and other settings
   */
  get settings_config() {
    return {
      ...super.settings_config,
      "[CHAT_ADAPTER].api_key": {
        name: "API Key",
        type: "password",
        description: "Enter your API key for the chat model platform.",
        callback: "test_api_key",
        is_scope: true
        // trigger re-render of settings when changed (reload models dropdown)
      }
    };
  }
  /**
   * Count tokens in the input text.
   * @abstract
   * @param {string|Object} input - Text or message object to count tokens for
   * @returns {Promise<number>} Number of tokens in the input
   */
  async count_tokens(input) {
    throw new Error("count_tokens not implemented");
  }
  /**
   * Get the parameters for requesting available models.
   * @returns {Object} Request parameters for models endpoint
   */
  get models_request_params() {
    return {
      url: this.models_endpoint,
      method: this.models_endpoint_method,
      headers: {
        "Authorization": `Bearer ${this.api_key}`
      }
    };
  }
  /**
   * Validate parameters required for getting models.
   * @returns {true|Array<Object>} True if valid, array of error objects if invalid
   */
  validate_get_models_params() {
    if (!this.adapter_config.models_endpoint) {
      const err_msg = `${this.model.adapter_name} models endpoint required to retrieve models`;
      console.warn(err_msg);
      return [{ value: "", name: err_msg }];
    }
    if (!this.api_key) {
      const err_msg = `${this.model.adapter_name} API key required to retrieve models`;
      console.warn(err_msg);
      return [{ value: "", name: err_msg }];
    }
    return true;
  }
  /**
   * Get available models from the API.
   * @param {boolean} [refresh=false] - Whether to refresh cached models
   * @returns {Promise<Object>} Map of model objects
   */
  async get_models(refresh = false) {
    if (!refresh && this.adapter_config?.models && typeof this.adapter_config.models === "object" && Object.keys(this.adapter_config.models).length > 0) return this.adapter_config.models;
    try {
      console.log("models_request_params", this.models_request_params);
      const response = await this.http_adapter.request(this.models_request_params);
      console.log("response", response);
      const model_data = this.parse_model_data(await response.json());
      console.log("model_data", model_data);
      this.adapter_settings.models = model_data;
      this.model.render_settings();
      return model_data;
    } catch (error) {
      console.error("Failed to fetch model data:", error);
      return { "_": { id: `Failed to fetch models from ${this.model.adapter_name}` } };
    }
  }
  /**
   * Parses the raw model data from OpenAI API and transforms it into a more usable format.
   * @param {Object} model_data - The raw model data received from OpenAI API.
   * @returns {Array<Object>} An array of parsed model objects with the following properties:
   *   @property {string} model_name - The name/ID of the model as returned by the API.
   *   @property {string} id - The id used to identify the model (usually same as model_name).
   *   @property {boolean} multimodal - Indicates if the model supports multimodal inputs.
   *   @property {number} [max_input_tokens] - The maximum number of input tokens the model can process.
   *   @property {string} [description] - A description of the model's context and output capabilities.
   */
  parse_model_data(model_data) {
    throw new Error("parse_model_data not implemented");
  }
  /**
   * Complete a chat request.
   * @param {Object} req - Request parameters
   * @returns {Promise<Object>} Completion response in OpenAI format
   */
  async complete(req) {
    const _req = new this.req_adapter(this, {
      ...req,
      stream: false
    });
    const request_params = _req.to_platform();
    console.log("request_params", request_params);
    const http_resp = await this.http_adapter.request(request_params);
    if (!http_resp) return null;
    console.log("http_resp", http_resp);
    const _res = new this.res_adapter(this, await http_resp.json());
    try {
      return _res.to_openai();
    } catch (error) {
      console.error("Error in SmartChatModelApiAdapter.complete():", error);
      console.error(http_resp);
      return null;
    }
  }
  // STREAMING
  /**
  * Stream chat responses.
  * @param {Object} req - Request parameters
  * @param {Object} handlers - Event handlers for streaming
  * @param {Function} handlers.chunk - Handler for response objects
  * @param {Function} handlers.error - Handler for errors
  * @param {Function} handlers.done - Handler for completion
  * @returns {Promise<Object>} Complete response object
  */
  async stream(req, handlers = {}) {
    const _req = new this.req_adapter(this, req);
    const request_params = _req.to_platform(true);
    if (this.streaming_chunk_splitting_regex) request_params.chunk_splitting_regex = this.streaming_chunk_splitting_regex;
    console.log("request_params", request_params);
    return await new Promise((resolve, reject) => {
      try {
        this.active_stream = new SmartStreamer(this.endpoint_streaming, request_params);
        const resp_adapter = new this.res_adapter(this);
        this.active_stream.addEventListener("message", async (e) => {
          if (this.is_end_of_stream(e)) {
            console.log("end of stream");
            await resp_adapter.handle_chunk(e.data);
            this.stop_stream();
            const final_resp = resp_adapter.to_openai();
            handlers.done && await handlers.done(final_resp);
            resolve(final_resp);
            console.log("final_resp", final_resp);
            console.log(resp_adapter);
            return;
          }
          try {
            resp_adapter.handle_chunk(e.data);
            handlers.chunk && await handlers.chunk(resp_adapter.to_openai());
          } catch (error) {
            console.error("Error processing stream chunk:", error);
            handlers.error && handlers.error(e.data);
            this.stop_stream();
            reject(error);
          }
        });
        this.active_stream.addEventListener("error", (e) => {
          console.error("Stream error:", e);
          handlers.error && handlers.error("*API Error. See console logs for details.*");
          this.stop_stream();
          reject(e);
        });
        this.active_stream.stream();
      } catch (err) {
        console.error("Failed to start stream:", err);
        handlers.error && handlers.error("*API Error. See console logs for details.*");
        this.stop_stream();
        reject(err);
      }
    });
  }
  /**
   * Check if a stream event indicates end of stream.
   * @param {Event} event - Stream event
   * @returns {boolean} True if end of stream
   */
  is_end_of_stream(event) {
    return event.data === "data: [DONE]";
  }
  /**
   * Stop active stream.
   */
  stop_stream() {
    if (this.active_stream) {
      this.active_stream.end();
      this.active_stream = null;
    }
  }
  /**
   * Validate Anthropic adapter configuration.
   * @returns {Object} { valid: boolean, message: string }
   */
  validate_config() {
    if (!this.adapter_config.model_key || this.adapter_config.model_key === "undefined") return { valid: false, message: "No model selected." };
    if (!this.api_key) {
      return { valid: false, message: "API key is missing." };
    }
    if (!this.can_use_tools) {
      return { valid: false, message: "Selected model does not support tools." };
    }
    return { valid: true, message: "Configuration is valid." };
  }
  /**
   * Get the API key.
   * @returns {string} The API key.
   */
  get api_key() {
    return this.main.opts.api_key || this.adapter_config?.api_key;
  }
  /**
  
     * Get the number of choices.
     * @returns {number} The number of choices.
     */
  get choices() {
    return this.adapter_config.choices;
  }
  get models_endpoint() {
    return this.adapter_config.models_endpoint;
  }
  get models_endpoint_method() {
    return "POST";
  }
  /**
   * Get the endpoint URL.
   * @returns {string} The endpoint URL.
   */
  get endpoint() {
    return this.adapter_config.endpoint;
  }
  /**
   * Get the streaming endpoint URL.
   * @returns {string} The streaming endpoint URL.
   */
  get endpoint_streaming() {
    return this.adapter_config.endpoint_streaming || this.endpoint;
  }
  /**
   * Get the maximum output tokens.
   * @returns {number} The maximum output tokens.
   */
  get max_output_tokens() {
    return this.adapter_config.max_output_tokens || 3e3;
  }
  /**
   * Get the temperature.
   * @returns {number} The temperature.
   */
  get temperature() {
    return this.adapter_config.temperature;
  }
};
var SmartChatModelRequestAdapter = class {
  /**
   * @constructor
   * @param {SmartChatModelAdapter} adapter - The SmartChatModelAdapter instance
   * @param {Object} req - The incoming request object
   */
  constructor(adapter, req = {}) {
    this.adapter = adapter;
    this._req = req;
  }
  /**
   * Get the messages array from the request
   * @returns {Array<Object>} Array of message objects
   */
  get messages() {
    return this._req.messages || [];
  }
  /**
   * Get the model identifier
   * @returns {string} Model ID
   */
  get model() {
    return this._req.model || this.adapter.model_config.id;
  }
  /**
   * Get the temperature setting
   * @returns {number} Temperature value
   */
  get temperature() {
    return this._req.temperature;
  }
  /**
   * Get the maximum tokens setting
   * @returns {number} Max tokens value
   */
  get max_tokens() {
    return this._req.max_tokens || this.adapter.model_config.max_output_tokens;
  }
  /**
   * Get the streaming flag
   * @returns {boolean} Whether to stream responses
   */
  get stream() {
    return this._req.stream;
  }
  /**
   * Get the tools array
   * @returns {Array<Object>|null} Array of tool objects or null
   */
  get tools() {
    return this._req.tools || null;
  }
  /**
   * Get the tool choice setting
   * @returns {string|Object|null} Tool choice configuration
   */
  get tool_choice() {
    return this._req.tool_choice || null;
  }
  get frequency_penalty() {
    return this._req.frequency_penalty;
  }
  get presence_penalty() {
    return this._req.presence_penalty;
  }
  get top_p() {
    return this._req.top_p;
  }
  /**
   * Get request headers
   * @returns {Object} Headers object
   */
  get_headers() {
    const headers = {
      "Content-Type": "application/json",
      ...this.adapter.adapter_config.headers || {}
    };
    if (this.adapter.adapter_config.api_key_header !== "none") {
      if (this.adapter.adapter_config.api_key_header) {
        headers[this.adapter.adapter_config.api_key_header] = this.adapter.api_key;
      } else if (this.adapter.api_key) {
        headers["Authorization"] = `Bearer ${this.adapter.api_key}`;
      }
    }
    return headers;
  }
  /**
   * Convert request to platform-specific format
   * @returns {Object} Platform-specific request parameters
   */
  to_platform(streaming = false) {
    return this.to_openai(streaming);
  }
  /**
   * Convert request to OpenAI format
   * @returns {Object} Request parameters in OpenAI format
   */
  to_openai(streaming = false) {
    const body = {
      messages: this._transform_messages_to_openai(),
      model: this.model,
      max_tokens: this.max_tokens,
      temperature: this.temperature,
      stream: streaming,
      ...this.tools && { tools: this._transform_tools_to_openai() },
      ...this._req.tool_choice && { tool_choice: this._req.tool_choice }
    };
    if (this.model.startsWith("o1-")) {
      body.messages = body.messages.filter((m) => m.role !== "system");
      delete body.temperature;
    }
    if (typeof this._req.top_p === "number") body.top_p = this._req.top_p;
    if (typeof this._req.presence_penalty === "number") body.presence_penalty = this._req.presence_penalty;
    if (typeof this._req.frequency_penalty === "number") body.frequency_penalty = this._req.frequency_penalty;
    return {
      url: this.adapter.endpoint,
      method: "POST",
      headers: this.get_headers(),
      body: JSON.stringify(body)
    };
  }
  /**
   * Transform messages to OpenAI format
   * @returns {Array<Object>} Transformed messages array
   * @private
   */
  _transform_messages_to_openai() {
    return this.messages.map((message) => this._transform_single_message_to_openai(message));
  }
  /**
   * Transform a single message to OpenAI format
   * @param {Object} message - Message object to transform
   * @returns {Object} Transformed message object
   * @private
   */
  _transform_single_message_to_openai(message) {
    const transformed = {
      role: this._get_openai_role(message.role),
      content: this._get_openai_content(message.content)
    };
    if (message.name) transformed.name = message.name;
    if (message.tool_calls) transformed.tool_calls = this._transform_tool_calls_to_openai(message.tool_calls);
    if (message.image_url) transformed.image_url = message.image_url;
    if (message.tool_call_id) transformed.tool_call_id = message.tool_call_id;
    return transformed;
  }
  /**
   * Get the OpenAI role for a given role.
   * @param {string} role - The role to transform.
   * @returns {string} The transformed role.
   * @private
   */
  _get_openai_role(role) {
    return role;
  }
  /**
   * Get the OpenAI content for a given content.
   * @param {string} content - The content to transform.
   * @returns {string} The transformed content.
   * @private
   */
  _get_openai_content(content) {
    return content;
  }
  /**
   * Transform tool calls to OpenAI format.
   * @param {Array} tool_calls - Array of tool call objects.
   * @returns {Array} Transformed tool calls array.
   * @private
   */
  _transform_tool_calls_to_openai(tool_calls) {
    return tool_calls.map((tool_call) => ({
      id: tool_call.id,
      type: tool_call.type,
      function: {
        name: tool_call.function.name,
        arguments: tool_call.function.arguments
      }
    }));
  }
  /**
   * Transform tools to OpenAI format.
   * @returns {Array} Transformed tools array.
   * @private
   */
  _transform_tools_to_openai() {
    return this.tools.map((tool) => ({
      type: tool.type,
      function: {
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters
      }
    }));
  }
};
var SmartChatModelResponseAdapter = class {
  // must be getter to prevent erroneous assignment
  static get platform_res() {
    return {
      id: "",
      object: "chat.completion",
      created: 0,
      model: "",
      choices: [],
      usage: {}
    };
  }
  /**
   * @constructor
   * @param {SmartChatModelAdapter} adapter - The SmartChatModelAdapter instance
   * @param {Object} res - The response object
   */
  constructor(adapter, res) {
    this.adapter = adapter;
    this._res = res || this.constructor.platform_res;
  }
  /**
   * Get response ID
   * @returns {string|null} Response ID
   */
  get id() {
    return this._res.id || null;
  }
  /**
   * Get response object type
   * @returns {string|null} Object type
   */
  get object() {
    return this._res.object || null;
  }
  /**
   * Get creation timestamp
   * @returns {number|null} Creation timestamp
   */
  get created() {
    return this._res.created || null;
  }
  /**
   * Get response choices
   * @returns {Array<Object>} Array of choice objects
   */
  get choices() {
    return this._res.choices || [];
  }
  /**
   * Get first tool call if present
   * @returns {Object|null} Tool call object
   */
  get tool_call() {
    return this.message.tool_calls?.[0] || null;
  }
  /**
   * Get tool name from first tool call
   * @returns {string|null} Tool name
   */
  get tool_name() {
    return this.tool_call?.tool_name || null;
  }
  /**
   * Get tool call parameters
   * @returns {Object|null} Tool parameters
   */
  get tool_call_content() {
    return this.tool_call?.parameters || null;
  }
  /**
   * Get token usage statistics
   * @returns {Object|null} Usage statistics
   */
  get usage() {
    return this._res.usage || null;
  }
  get error() {
    return this._res.error || null;
  }
  /**
   * Convert response to OpenAI format
   * @returns {Object} Response in OpenAI format
   */
  to_openai() {
    const res = {
      id: this.id,
      object: this.object,
      created: this.created,
      choices: this._transform_choices_to_openai(),
      usage: this._transform_usage_to_openai(),
      raw: this._res
    };
    if (this.error) res.error = this.error;
    return res;
  }
  /**
   * Parse chunk adds delta to content as expected output format
   */
  handle_chunk(chunk) {
    if (chunk === "data: [DONE]") return;
    chunk = JSON.parse(chunk.split("data: ")[1] || "{}");
    if (Object.keys(chunk).length === 0) return;
    if (!this._res.choices[0]) {
      this._res.choices.push({
        message: {
          index: 0,
          role: "assistant",
          content: ""
        }
      });
    }
    if (!this._res.id) {
      this._res.id = chunk.id;
    }
    if (chunk.choices?.[0]?.delta?.content) {
      this._res.choices[0].message.content += chunk.choices[0].delta.content;
    }
    if (chunk.choices?.[0]?.delta?.tool_calls) {
      if (!this._res.choices[0].message.tool_calls) {
        this._res.choices[0].message.tool_calls = [{
          id: "",
          type: "function",
          function: {
            name: "",
            arguments: ""
          }
        }];
      }
      if (chunk.choices[0].delta.tool_calls[0].id) {
        this._res.choices[0].message.tool_calls[0].id += chunk.choices[0].delta.tool_calls[0].id;
      }
      if (chunk.choices[0].delta.tool_calls[0].function.name) {
        this._res.choices[0].message.tool_calls[0].function.name += chunk.choices[0].delta.tool_calls[0].function.name;
      }
      if (chunk.choices[0].delta.tool_calls[0].function.arguments) {
        this._res.choices[0].message.tool_calls[0].function.arguments += chunk.choices[0].delta.tool_calls[0].function.arguments;
      }
    }
  }
  /**
   * Transform choices to OpenAI format.
   * @returns {Array} Transformed choices array.
   * @private
   */
  _transform_choices_to_openai() {
    return this.choices.map((choice) => ({
      index: choice.index,
      message: this._transform_message_to_openai(choice.message),
      finish_reason: this._get_openai_finish_reason(choice.finish_reason)
    }));
  }
  /**
   * Transform a single message to OpenAI format.
   * @param {Object} message - The message object to transform.
   * @returns {Object} Transformed message object.
   * @private
   */
  _transform_message_to_openai(message = {}) {
    const transformed = {
      role: this._get_openai_role(message.role),
      content: this._get_openai_content(message.content)
    };
    if (message.name) transformed.name = message.name;
    if (message.tool_calls) transformed.tool_calls = this._transform_tool_calls_to_openai(message.tool_calls);
    if (message.image_url) transformed.image_url = message.image_url;
    return transformed;
  }
  /**
   * Get the OpenAI role for a given role.
   * @param {string} role - The role to transform.
   * @returns {string} The transformed role.
   * @private
   */
  _get_openai_role(role) {
    return role;
  }
  /**
   * Get the OpenAI content for a given content.
   * @param {string} content - The content to transform.
   * @returns {string} The transformed content.
   * @private
   */
  _get_openai_content(content) {
    return content;
  }
  /**
   * Get the OpenAI finish reason for a given finish reason.
   * @param {string} finish_reason - The finish reason to transform.
   * @returns {string} The transformed finish reason.
   * @private
   */
  _get_openai_finish_reason(finish_reason) {
    return finish_reason;
  }
  /**
   * Transform usage to OpenAI format.
   * @returns {Object} Transformed usage object.
   * @private
   */
  _transform_usage_to_openai() {
    return this.usage;
  }
  /**
   * Transform tool calls to OpenAI format.
   * @param {Array} tool_calls - Array of tool call objects.
   * @returns {Array} Transformed tool calls array.
   * @private
   */
  _transform_tool_calls_to_openai(tool_calls) {
    return tool_calls.map((tool_call) => ({
      id: tool_call.id,
      type: tool_call.type,
      function: {
        name: tool_call.function.name,
        arguments: tool_call.function.arguments
      }
    }));
  }
};

// node_modules/smart-chat-model/adapters/anthropic.js
var SmartChatModelAnthropicAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "Anthropic Claude",
    type: "API",
    endpoint: "https://api.anthropic.com/v1/messages",
    // streaming: false,
    streaming: true,
    api_key_header: "x-api-key",
    headers: {
      "anthropic-version": "2023-06-01",
      "anthropic-beta": "tools-2024-04-04",
      "anthropic-dangerous-direct-browser-access": true
    },
    adapter: "Anthropic",
    models_endpoint: false,
    default_model: "claude-3-5-sonnet-latest",
    signup_url: "https://console.anthropic.com/login?returnTo=%2Fsettings%2Fkeys",
    can_use_tools: true
  };
  /**
   * Get request adapter class
   * @returns {typeof SmartChatModelAnthropicRequestAdapter} Request adapter class
   */
  get req_adapter() {
    return SmartChatModelAnthropicRequestAdapter;
  }
  /**
   * Get response adapter class
   * @returns {typeof SmartChatModelAnthropicResponseAdapter} Response adapter class
   */
  res_adapter = SmartChatModelAnthropicResponseAdapter;
  /**
   * Validate parameters for getting models
   * @returns {boolean} Always true since models are hardcoded
   */
  validate_get_models_params() {
    return true;
  }
  /**
   * Get available models (hardcoded list)
   * @returns {Promise<Object>} Map of model objects
   */
  get_models() {
    return Promise.resolve(this.models);
  }
  is_end_of_stream(event) {
    return event.data.includes("message_stop");
  }
  /**
   * Get hardcoded list of available models
   * @returns {Object} Map of model objects with capabilities and limits
   */
  get models() {
    return {
      "claude-3-5-sonnet-latest": {
        id: "claude-3-5-sonnet-latest",
        model_name: "claude-3.5-sonnet-latest",
        description: "Anthropic's Claude Sonnet (Latest)",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      },
      "claude-3-opus-20240229": {
        id: "claude-3-opus-20240229",
        model_name: "claude-3-opus-20240229",
        description: "Anthropic's Claude Opus",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      },
      "claude-3-haiku-20240307": {
        id: "claude-3-haiku-20240307",
        model_name: "claude-3-haiku-20240307",
        description: "Anthropic's Claude Haiku (2024-03-07)",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      },
      "claude-3-5-sonnet-20241022": {
        id: "claude-3.5-sonnet-20241022",
        model_name: "claude-3.5-sonnet-20241022",
        description: "Anthropic's Claude Sonnet (2024-10-22)",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      },
      "claude-3-5-sonnet-20240620": {
        id: "claude-3.5-sonnet-20240620",
        model_name: "claude-3.5-sonnet-20240620",
        description: "Anthropic's Claude Sonnet (2024-06-20)",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      },
      "claude-3-sonnet-20240229": {
        id: "claude-3-sonnet-20240229",
        model_name: "claude-3-sonnet-20240229",
        description: "Anthropic's Claude Sonnet",
        max_input_tokens: 2e5,
        max_output_tokens: 4e3,
        multimodal: true
      }
    };
  }
};
var SmartChatModelAnthropicRequestAdapter = class extends SmartChatModelRequestAdapter {
  /**
   * Convert request to Anthropic format
   * @returns {Object} Request parameters in Anthropic format
   */
  to_platform(streaming = false) {
    return this.to_anthropic(streaming);
  }
  /**
   * Convert request to Anthropic format
   * @returns {Object} Request parameters in Anthropic format
   */
  to_anthropic(streaming = false) {
    this.anthropic_body = {
      model: this.model,
      max_tokens: this.max_tokens,
      temperature: this.temperature,
      stream: streaming
    };
    this.anthropic_body.messages = this._transform_messages_to_anthropic();
    if (this.tools) {
      this.anthropic_body.tools = this._transform_tools_to_anthropic();
    }
    if (this.tool_choice) {
      if (this.tool_choice === "auto") {
        this.anthropic_body.tool_choice = { type: "auto" };
      } else if (typeof this.tool_choice === "object" && this.tool_choice.function) {
        this.anthropic_body.tool_choice = { type: "tool", name: this.tool_choice.function.name };
      }
    }
    return {
      url: this.adapter.endpoint,
      method: "POST",
      headers: this.get_headers(),
      body: JSON.stringify(this.anthropic_body)
    };
  }
  /**
   * Transform messages to Anthropic format
   * @returns {Array<Object>} Messages in Anthropic format
   * @private
   */
  _transform_messages_to_anthropic() {
    let anthropic_messages = [];
    for (const message of this.messages) {
      if (message.role === "system") {
        if (!this.anthropic_body.system) this.anthropic_body.system = "";
        else this.anthropic_body.system += "\n\n";
        this.anthropic_body.system += Array.isArray(message.content) ? message.content.map((part) => part.text).join("\n") : message.content;
      } else if (message.role === "tool") {
        const msg = {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: message.tool_call_id,
              content: message.content
            }
          ]
        };
        anthropic_messages.push(msg);
      } else {
        const msg = {
          role: this._get_anthropic_role(message.role),
          content: this._get_anthropic_content(message.content)
        };
        if (message.tool_calls?.length > 0) msg.content = this._transform_tool_calls_to_content(message.tool_calls);
        anthropic_messages.push(msg);
      }
    }
    return anthropic_messages;
  }
  /**
   * Transform tool calls to Anthropic format
   * @param {Array<Object>} tool_calls - Tool calls
   * @returns {Array<Object>} Tool calls in Anthropic format
   * @private
   */
  _transform_tool_calls_to_content(tool_calls) {
    return tool_calls.map((tool_call) => ({
      type: "tool_use",
      id: tool_call.id,
      name: tool_call.function.name,
      input: JSON.parse(tool_call.function.arguments)
    }));
  }
  /**
   * Transform role to Anthropic format
   * @param {string} role - Original role
   * @returns {string} Role in Anthropic format
   * @private
   */
  _get_anthropic_role(role) {
    const role_map = {
      function: "assistant",
      // Anthropic doesn't have a function role, so we'll treat it as assistant
      tool: "user"
    };
    return role_map[role] || role;
  }
  /**
   * Transform content to Anthropic format
   * @param {string|Array} content - Original content
   * @returns {string|Array} Content in Anthropic format
   * @private
   */
  _get_anthropic_content(content) {
    if (Array.isArray(content)) {
      return content.map((item) => {
        if (item.type === "text") return { type: "text", text: item.text };
        if (item.type === "image_url") {
          return {
            type: "image",
            source: {
              type: "base64",
              media_type: item.image_url.url.split(";")[0].split(":")[1],
              data: item.image_url.url.split(",")[1]
            }
          };
        }
        return item;
      });
    }
    return content;
  }
  /**
   * Transform tools to Anthropic format
   * @returns {Array<Object>} Tools in Anthropic format
   * @private
   */
  _transform_tools_to_anthropic() {
    if (!this.tools) return void 0;
    return this.tools.map((tool) => ({
      name: tool.function.name,
      description: tool.function.description,
      input_schema: tool.function.parameters
    }));
  }
};
var SmartChatModelAnthropicResponseAdapter = class extends SmartChatModelResponseAdapter {
  static get platform_res() {
    return {
      content: [],
      id: "",
      model: "",
      role: "assistant",
      stop_reason: null,
      stop_sequence: null,
      type: "message",
      usage: {
        input_tokens: 0,
        output_tokens: 0
      }
    };
  }
  /**
   * Convert response to OpenAI format
   * @returns {Object} Response in OpenAI format
   */
  to_openai() {
    return {
      id: this._res.id,
      object: "chat.completion",
      created: Date.now(),
      choices: [
        {
          index: 0,
          message: this._transform_message_to_openai(),
          finish_reason: this._get_openai_finish_reason(this._res.stop_reason)
        }
      ],
      usage: this._transform_usage_to_openai()
    };
  }
  /**
   * Transform message to OpenAI format
   * @returns {Object} Message in OpenAI format
   * @private
   */
  _transform_message_to_openai() {
    const message = {
      role: "assistant",
      content: "",
      tool_calls: []
    };
    if (Array.isArray(this._res.content)) {
      for (const content of this._res.content) {
        if (content.type === "text") {
          message.content += (message.content ? "\n\n" : "") + content.text;
        } else if (content.type === "tool_use") {
          message.tool_calls.push({
            id: content.id,
            type: "function",
            function: {
              name: content.name,
              arguments: JSON.stringify(content.input)
            }
          });
        }
      }
    } else {
      message.content = this._res.content;
    }
    if (message.tool_calls.length === 0) {
      delete message.tool_calls;
    }
    return message;
  }
  /**
   * Transform finish reason to OpenAI format
   * @param {string} stop_reason - Original finish reason
   * @returns {string} Finish reason in OpenAI format
   * @private
   */
  _get_openai_finish_reason(stop_reason) {
    const reason_map = {
      "end_turn": "stop",
      "max_tokens": "length",
      "tool_use": "function_call"
    };
    return reason_map[stop_reason] || stop_reason;
  }
  /**
   * Transform usage statistics to OpenAI format
   * @returns {Object} Usage statistics in OpenAI format
   * @private
   */
  _transform_usage_to_openai() {
    if (!this._res.usage) {
      return {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
      };
    }
    return {
      prompt_tokens: this._res.usage.input_tokens || 0,
      completion_tokens: this._res.usage.output_tokens || 0,
      total_tokens: (this._res.usage.input_tokens || 0) + (this._res.usage.output_tokens || 0)
    };
  }
  handle_chunk(chunk) {
    if (!chunk.startsWith("data: ")) return;
    chunk = JSON.parse(chunk.slice(6));
    if (!this._res.content.length) {
      this._res.content = [
        {
          type: "text",
          text: ""
        }
      ];
    }
    if (chunk.message?.id) {
      this._res.id = chunk.message.id;
    }
    if (chunk.message?.model) {
      this._res.model = chunk.message.model;
    }
    if (chunk.message?.role) {
      this._res.role = chunk.message.role;
    }
    if (chunk.delta?.type === "text_delta") {
      this._res.content[0].text += chunk.delta.text;
    }
    if (chunk.delta?.stop_reason) {
      this._res.stop_reason = chunk.delta.stop_reason;
    }
    if (chunk.usage) {
      this._res.usage = {
        ...this._res.usage,
        ...chunk.usage
      };
    }
  }
};

// node_modules/smart-chat-model/adapters/openai.js
var SmartChatModelOpenaiAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "OpenAI",
    type: "API",
    endpoint: "https://api.openai.com/v1/chat/completions",
    streaming: true,
    models_endpoint: "https://api.openai.com/v1/models",
    default_model: "gpt-4o-mini",
    signup_url: "https://platform.openai.com/api-keys",
    can_use_tools: true
  };
  res_adapter = SmartChatModelOpenaiResponseAdapter;
  /**
   * Parse model data from OpenAI API response.
   * Filters for GPT models and adds context window information.
   * @param {Object} model_data - Raw model data from OpenAI
   * @returns {Object} Map of model objects with capabilities and limits
   */
  parse_model_data(model_data) {
    return model_data.data.filter((model) => ["gpt-", "o1-"].some((m) => model.id.startsWith(m)) && !model.id.includes("-instruct")).reduce((acc, model) => {
      const out = {
        model_name: model.id,
        id: model.id,
        multimodal: model.id.includes("vision") || model.id.includes("gpt-4-turbo") || model.id.startsWith("gpt-4o"),
        can_use_tools: model.id.startsWith("o1-") ? false : true
      };
      const m = Object.entries(model_context).find((m2) => m2[0] === model.id || model.id.startsWith(m2[0] + "-"));
      if (m) {
        out.max_input_tokens = m[1].context;
        out.description = `context: ${m[1].context}, output: ${m[1].max_out}`;
      }
      acc[model.id] = out;
      return acc;
    }, {});
  }
  /**
   * Override the HTTP method for fetching models.
   */
  models_endpoint_method = "GET";
  /**
   * Test the API key by attempting to fetch models.
   * @returns {Promise<boolean>} True if API key is valid
   */
  async test_api_key() {
    const models = await this.get_models();
    return models.length > 0;
  }
  /**
   * Get settings configuration for OpenAI adapter.
   * Adds image resolution setting for multimodal models.
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    return {
      ...super.settings_config,
      "[CHAT_ADAPTER].image_resolution": {
        name: "Image Resolution",
        type: "dropdown",
        description: "Select the image resolution for the chat model.",
        option_1: "low",
        option_2: "high",
        default: "low",
        conditional: (_this) => _this.adapter?.model_config?.multimodal
      }
    };
  }
};
var SmartChatModelOpenaiResponseAdapter = class extends SmartChatModelResponseAdapter {
};
var model_context = {
  "gpt-3.5-turbo-0125": {
    "context": 16385,
    "max_out": 4096
  },
  "gpt-3.5-turbo-0301": {
    "context": 4097,
    "max_out": 4097
  },
  "gpt-3.5-turbo-0613": {
    "context": 4097,
    "max_out": 4097
  },
  "gpt-3.5-turbo-1106": {
    "context": 16385,
    "max_out": 4096
  },
  "gpt-3.5-turbo-16k": {
    "context": 16385,
    "max_out": 16385
  },
  "gpt-3.5-turbo-16k-0613": {
    "context": 16385,
    "max_out": 16385
  },
  "gpt-4-0125-preview": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-0314": {
    "context": 8192,
    "max_out": 8192
  },
  "gpt-4-0613": {
    "context": 8192,
    "max_out": 8192
  },
  "gpt-4-1106-preview": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-1106-vision-preview": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-32k-0314": {
    "context": 32768,
    "max_out": 32768
  },
  "gpt-4-32k-0613": {
    "context": 32768,
    "max_out": 32768
  },
  "gpt-4-turbo-2024-04-09": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-turbo-preview": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-vision-preview": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-3.5-turbo": {
    "context": 16385,
    "max_out": 4096
  },
  "gpt-4-turbo": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4-32k": {
    "context": 32768,
    "max_out": 32768
  },
  "gpt-4o": {
    "context": 128e3,
    "max_out": 4096
  },
  "gpt-4": {
    "context": 8192,
    "max_out": 8192
  }
};

// node_modules/smart-chat-model/adapters/google.js
var SmartChatModelGeminiAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "Google Gemini",
    type: "API",
    api_key_header: "none",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:generateContent",
    endpoint_streaming: "https://generativelanguage.googleapis.com/v1beta/models/MODEL_NAME:streamGenerateContent",
    streaming: true,
    adapter: "Gemini",
    models_endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    default_model: "gemini-1.5-pro",
    signup_url: "https://ai.google.dev/",
    can_use_tools: true
  };
  streaming_chunk_splitting_regex = /(\r\n|\n|\r){2}/g;
  // handle Google's BS (split on double newlines only)
  /**
   * Get request adapter class
   */
  req_adapter = SmartChatModelGeminiRequestAdapter;
  /**
   * Get response adapter class
   */
  res_adapter = SmartChatModelGeminiResponseAdapter;
  /**
   * Uses Gemini's dedicated token counting endpoint
   */
  async count_tokens(input) {
    const req = {
      url: `https://generativelanguage.googleapis.com/v1beta/models/${this.model_key}:countTokens?key=${this.api_key}`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.prepare_token_count_body(input))
    };
    const resp = await this.http_adapter.request(req);
    return resp.json.totalTokens;
  }
  /**
   * Formats input for token counting based on type
   * @private
   */
  prepare_token_count_body(input) {
    if (typeof input === "string") {
      return { contents: [{ parts: [{ text: input }] }] };
    } else if (Array.isArray(input)) {
      return { contents: input.map((msg) => this.transform_message_for_token_count(msg)) };
    } else if (typeof input === "object") {
      return { contents: [this.transform_message_for_token_count(input)] };
    }
    throw new Error("Invalid input for count_tokens");
  }
  /**
   * Transforms message for token counting, handling text and images
   * @private
   */
  transform_message_for_token_count(message) {
    return {
      role: message.role === "assistant" ? "model" : message.role,
      parts: Array.isArray(message.content) ? message.content.map((part) => {
        if (part.type === "text") return { text: part.text };
        if (part.type === "image_url") return {
          inline_data: {
            mime_type: part.image_url.url.split(";")[0].split(":")[1],
            data: part.image_url.url.split(",")[1]
          }
        };
        return part;
      }) : [{ text: message.content }]
    };
  }
  /**
   * Builds endpoint URLs with model and API key
   */
  get endpoint() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model_key}:generateContent?key=${this.api_key}`;
  }
  get endpoint_streaming() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model_key}:streamGenerateContent?key=${this.api_key}`;
  }
  // /**
  //  * Extracts text from Gemini's streaming format
  //  */
  // get_text_chunk_from_stream(event) {
  //   const data = JSON.parse(event.data);
  //   return data.candidates[0]?.content?.parts[0]?.text || '';
  // }
  /**
   * Get models endpoint URL with API key
   * @returns {string} Complete models endpoint URL
   */
  get models_endpoint() {
    return `${this.constructor.defaults.models_endpoint}?key=${this.api_key}`;
  }
  /**
   * Get HTTP method for models endpoint
   * @returns {string} HTTP method ("GET")
   */
  get models_endpoint_method() {
    return "GET";
  }
  get models_request_params() {
    return {
      url: this.models_endpoint,
      method: this.models_endpoint_method
    };
  }
  /**
   * Parse model data from Gemini API response
   * @param {Object} model_data - Raw model data from API
   * @returns {Object} Map of model objects with capabilities and limits
   */
  parse_model_data(model_data) {
    return model_data.models.filter((model) => model.name.startsWith("models/gemini")).reduce((acc, model) => {
      const out = {
        model_name: model.name.split("/").pop(),
        id: model.name.split("/").pop(),
        max_input_tokens: model.inputTokenLimit,
        max_output_tokens: model.maxOutputTokens,
        description: model.description,
        multimodal: model.name.includes("vision") || model.description.includes("multimodal"),
        raw: model
      };
      acc[model.name.split("/").pop()] = out;
      return acc;
    }, {});
  }
  is_end_of_stream(event) {
    return event.data.includes('"finishReason"');
    return false;
  }
};
var SmartChatModelGeminiRequestAdapter = class extends SmartChatModelRequestAdapter {
  to_platform(streaming = false) {
    return this.to_gemini(streaming);
  }
  to_gemini(streaming = false) {
    const gemini_body = {
      contents: this._transform_messages_to_gemini(),
      generationConfig: {
        temperature: this.temperature,
        maxOutputTokens: this.max_tokens,
        topK: this._req.topK || 1,
        topP: this._req.topP || 1,
        stopSequences: this._req.stop || []
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    };
    if (this.tools) gemini_body.tools = this._transform_tools_to_gemini();
    if (this._req.tool_choice) gemini_body.tool_config = this._transform_tool_choice_to_gemini();
    return {
      url: streaming ? this.adapter.endpoint_streaming : this.adapter.endpoint,
      method: "POST",
      headers: this.get_headers(),
      body: JSON.stringify(gemini_body)
    };
  }
  _transform_messages_to_gemini() {
    let gemini_messages = [];
    let system_message = "";
    for (const message of this.messages) {
      if (message.role === "system") {
        system_message += message.content + "\n";
      } else {
        gemini_messages.push({
          role: this._get_gemini_role(message.role),
          parts: this._transform_content_to_gemini(message.content)
        });
      }
    }
    if (system_message) {
      gemini_messages.unshift({
        role: "user",
        parts: [{ text: system_message.trim() }]
      });
    }
    return gemini_messages;
  }
  _get_gemini_role(role) {
    const role_map = {
      user: "user",
      assistant: "model",
      function: "model"
      // Gemini doesn't have a function role, so we'll treat it as model
    };
    return role_map[role] || role;
  }
  _transform_content_to_gemini(content) {
    if (Array.isArray(content)) {
      return content.map((part) => {
        if (part.type === "text") return { text: part.text };
        if (part.type === "image_url") {
          return {
            inline_data: {
              mime_type: part.image_url.url.split(";")[0].split(":")[1],
              data: part.image_url.url.split(",")[1]
            }
          };
        }
        return part;
      });
    }
    return [{ text: content }];
  }
  _transform_tools_to_gemini() {
    return [{
      function_declarations: this.tools.map((tool) => ({
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters
      }))
    }];
  }
  _transform_tool_choice_to_gemini() {
    return {
      function_calling_config: {
        mode: "ANY",
        allowed_function_names: this.tools.map((tool) => tool.function.name)
      }
    };
  }
};
var SmartChatModelGeminiResponseAdapter = class extends SmartChatModelResponseAdapter {
  static get platform_res() {
    return {
      candidates: [{
        content: {
          parts: [
            {
              text: ""
            }
          ],
          role: ""
        },
        finishReason: ""
      }],
      promptFeedback: {},
      usageMetadata: {}
    };
  }
  to_openai() {
    const first_candidate = this._res.candidates[0];
    if (!this._res.id) this._res.id = "gemini-" + Date.now().toString();
    return {
      id: this._res.id,
      object: "chat.completion",
      created: Date.now(),
      model: this.adapter.model_key,
      choices: [{
        index: 0,
        message: first_candidate?.content ? this._transform_message_to_openai(first_candidate.content) : "",
        finish_reason: this._get_openai_finish_reason(first_candidate.finishReason)
      }],
      usage: this._transform_usage_to_openai()
    };
  }
  _transform_message_to_openai(content) {
    const message = {
      role: "assistant",
      content: content.parts.filter((part) => part.text).map((part) => part.text).join("")
    };
    const function_call = content.parts.find((part) => part.functionCall);
    if (function_call) {
      message.tool_calls = [{
        type: "function",
        function: {
          name: function_call.functionCall.name,
          arguments: JSON.stringify(function_call.functionCall.args)
        }
      }];
    }
    return message;
  }
  _get_openai_finish_reason(finish_reason) {
    const reason_map = {
      "STOP": "stop",
      "MAX_TOKENS": "length",
      "SAFETY": "content_filter",
      "RECITATION": "content_filter",
      "OTHER": "null"
    };
    return reason_map[finish_reason] || finish_reason.toLowerCase();
  }
  _transform_usage_to_openai() {
    if (!this._res.usageMetadata) {
      return {
        prompt_tokens: null,
        completion_tokens: null,
        total_tokens: null
      };
    }
    return {
      prompt_tokens: this._res.usageMetadata.promptTokenCount || null,
      completion_tokens: this._res.usageMetadata.candidatesTokenCount || null,
      total_tokens: this._res.usageMetadata.totalTokenCount || null
    };
  }
  handle_chunk(chunk) {
    console.log("handle_chunk", chunk);
    let chunk_trimmed = chunk.trim();
    if (["[", ","].includes(chunk_trimmed[0])) chunk_trimmed = chunk_trimmed.slice(1);
    if (["]", ","].includes(chunk_trimmed[chunk_trimmed.length - 1])) chunk_trimmed = chunk_trimmed.slice(0, -1);
    const data = JSON.parse(chunk_trimmed);
    if (data.candidates?.[0]?.content?.parts?.[0]?.text?.length) {
      this._res.candidates[0].content.parts[0].text += data.candidates[0].content.parts[0].text;
    }
    if (data.candidates?.[0]?.content?.role?.length) {
      this._res.candidates[0].content.role = data.candidates[0].content.role;
    }
    if (data.candidates?.[0]?.finishReason?.length) {
      this._res.candidates[0].finishReason += data.candidates[0].finishReason;
    }
    if (data.promptFeedback) {
      this._res.promptFeedback = {
        ...this._res.promptFeedback || {},
        ...data.promptFeedback
      };
    }
    if (data.usageMetadata) {
      this._res.usageMetadata = {
        ...this._res.usageMetadata || {},
        ...data.usageMetadata
      };
    }
  }
};

// node_modules/smart-chat-model/adapters/open_router.js
var SmartChatModelOpenRouterAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "Open Router",
    type: "API",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    streaming: true,
    adapter: "OpenRouter",
    models_endpoint: "https://openrouter.ai/api/v1/models",
    default_model: "mistralai/mistral-7b-instruct:free",
    signup_url: "https://accounts.openrouter.ai/sign-up?redirect_url=https%3A%2F%2Fopenrouter.ai%2Fkeys",
    can_use_tools: true
  };
  /**
   * Get request adapter class
   * @returns {typeof SmartChatModelOpenRouterRequestAdapter} Request adapter class
   */
  get req_adapter() {
    return SmartChatModelOpenRouterRequestAdapter;
  }
  /**
   * Get response adapter class
   * @returns {typeof SmartChatModelOpenRouterResponseAdapter} Response adapter class
   */
  get res_adapter() {
    return SmartChatModelOpenRouterResponseAdapter;
  }
  /**
   * Get API key from various sources
   * @returns {string|undefined} API key if available
   */
  get api_key() {
    return this.main.opts.api_key || this.adapter_settings?.api_key || "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";
  }
  /**
   * Count tokens in input text (rough estimate)
   * @param {string|Object} input - Text to count tokens for
   * @returns {Promise<number>} Estimated token count
   */
  async count_tokens(input) {
    const text = typeof input === "string" ? input : JSON.stringify(input);
    return Math.ceil(text.length / 4);
  }
  get models_request_params() {
    return {
      url: this.models_endpoint,
      method: "GET"
    };
  }
  /**
   * Parse model data from OpenRouter API response
   * @param {Object} model_data - Raw model data
   * @returns {Object} Map of model objects with capabilities and limits
   */
  parse_model_data(model_data) {
    if (model_data.data) {
      model_data = model_data.data;
    }
    if (model_data.error) throw new Error(model_data.error);
    console.log("model_data", model_data);
    return model_data.reduce((acc, model) => {
      acc[model.id] = {
        model_name: model.id,
        id: model.id,
        max_input_tokens: model.context_length,
        description: model.name,
        can_use_tools: model.description.includes("tool use") || model.description.includes("function call"),
        multimodal: model.architecture.modality === "multimodal",
        raw: model
      };
      return acc;
    }, {});
  }
};
var SmartChatModelOpenRouterRequestAdapter = class extends SmartChatModelRequestAdapter {
  to_platform(stream = false) {
    const req = this.to_openai(stream);
    return req;
  }
};
var SmartChatModelOpenRouterResponseAdapter = class extends SmartChatModelResponseAdapter {
  static get platform_res() {
    return {
      id: "",
      object: "chat.completion",
      created: 0,
      model: "",
      choices: [],
      usage: {}
    };
  }
  to_platform() {
    return this.to_openai();
  }
  get object() {
    return "chat.completion";
  }
  get error() {
    if (!this._res.error) return null;
    const error = this._res.error;
    if (!error.message) error.message = "";
    if (this._res.error.metadata?.raw) {
      if (typeof this._res.error.metadata.raw === "string") {
        error.message += `

${this._res.error.metadata.raw}`;
      } else {
        error.message += `

${JSON.stringify(this._res.error.metadata.raw, null, 2)}`;
      }
    }
    return error;
  }
};

// node_modules/smart-chat-model/adapters/_custom.js
var SmartChatModelCustomAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "Custom API (Local or Remote, OpenAI format)",
    type: "API"
  };
  get settings_config() {
    return {
      // LOCAL PLATFORM SETTINGS
      "[CHAT_ADAPTER].model_name": {
        name: "Model Name",
        type: "text",
        description: "Enter the model name for the local chat model platform."
      },
      "[CHAT_ADAPTER].protocol": {
        name: "Protocol",
        type: "text",
        description: "Enter the protocol for the local chat model."
      },
      "[CHAT_ADAPTER].hostname": {
        name: "Hostname",
        type: "text",
        description: "Enter the hostname for the local chat model."
      },
      "[CHAT_ADAPTER].port": {
        name: "Port",
        type: "number",
        description: "Enter the port for the local chat model."
      },
      "[CHAT_ADAPTER].path": {
        name: "Path",
        type: "text",
        description: "Enter the path for the local chat model."
      },
      "[CHAT_ADAPTER].streaming": {
        name: "Streaming",
        type: "toggle",
        description: "Enable streaming for the local chat model."
      },
      "[CHAT_ADAPTER].max_input_tokens": {
        name: "Max Input Tokens",
        type: "number",
        description: "Enter the maximum number of input tokens for the chat model."
      },
      "[CHAT_ADAPTER].api_key": {
        name: "API Key",
        type: "text",
        description: "Enter the API key for the chat model."
      }
    };
  }
};

// node_modules/smart-chat-model/adapters/ollama.js
var SmartChatModelOllamaAdapter = class extends SmartChatModelApiAdapter {
  static defaults = {
    description: "Ollama (Local)",
    type: "API",
    models_endpoint: "http://localhost:11434/api/tags",
    endpoint: "http://localhost:11434/api/chat",
    api_key: "na",
    // streaming: false, // TODO: Implement streaming
    streaming: true
  };
  req_adapter = SmartChatModelOllamaRequestAdapter;
  res_adapter = SmartChatModelOllamaResponseAdapter;
  /**
   * Get parameters for models request - no auth needed for local instance
   * @returns {Object} Request parameters
   */
  get models_request_params() {
    return {
      url: this.adapter_config.models_endpoint
    };
  }
  /**
   * Get available models from local Ollama instance
   * @param {boolean} [refresh=false] - Whether to refresh cached models
   * @returns {Promise<Object>} Map of model objects
   */
  async get_models(refresh = false) {
    console.log("get_models", refresh);
    if (!refresh && this.adapter_config?.models && typeof this.adapter_config.models === "object" && Object.keys(this.adapter_config.models).length > 0) return this.adapter_config.models;
    try {
      console.log("models_request_params", this.models_request_params);
      const list_resp = await this.http_adapter.request(this.models_request_params);
      console.log("list_response", list_resp);
      const list_data = await list_resp.json();
      const models_raw_data = [];
      for (const model of list_data.models) {
        const model_details_resp = await this.http_adapter.request({
          url: `http://localhost:11434/api/show`,
          method: "POST",
          body: JSON.stringify({ model: model.name })
        });
        console.log("model_details_response", model_details_resp);
        const model_details_data = await model_details_resp.json();
        console.log("model_details_data", model_details_data);
        models_raw_data.push({ ...model_details_data, name: model.name });
      }
      const model_data = this.parse_model_data(models_raw_data);
      console.log("model_data", model_data);
      this.adapter_settings.models = model_data;
      this.model.render_settings();
      return model_data;
    } catch (error) {
      console.error("Failed to fetch model data:", error);
      return { "_": { id: `Failed to fetch models from ${this.model.adapter_name}` } };
    }
  }
  /**
   * Parse model data from Ollama API response
   * @param {Object[]} model_data - Raw model data from Ollama
   * @returns {Object} Map of model objects with capabilities and limits
   */
  parse_model_data(model_data) {
    return model_data.reduce((acc, model) => {
      const out = {
        model_name: model.name,
        id: model.name,
        multimodal: false,
        max_input_tokens: Object.entries(model.model_info).find((m) => m[0].includes(".context_length"))[1],
        can_use_tools: true
        // TODO: CHECK MODELFILE FOR TOOLS SUPPORT
      };
      acc[model.name] = out;
      return acc;
    }, {});
  }
  /**
   * Override settings config to remove API key setting since not needed for local instance
   * @returns {Object} Settings configuration object
   */
  get settings_config() {
    const config = super.settings_config;
    delete config["[CHAT_ADAPTER].api_key"];
    return config;
  }
  is_end_of_stream(event) {
    return event.data.includes('"done_reason"');
  }
};
var SmartChatModelOllamaRequestAdapter = class extends SmartChatModelRequestAdapter {
  /**
   * Convert request to Ollama format
   * @returns {Object} Request parameters in Ollama format
   */
  to_platform(streaming = false) {
    const ollama_body = {
      model: this.model,
      messages: this._transform_messages_to_ollama(),
      options: this._transform_parameters_to_ollama(),
      stream: streaming || this.stream
      // format: 'json', // only used for tool calls since returns JSON in content body
    };
    if (this.tools) {
      ollama_body.tools = this._transform_functions_to_tools();
      if (this.tool_choice?.function?.name) {
        ollama_body.messages[ollama_body.messages.length - 1].content += `

Use the "${this.tool_choice.function.name}" tool.`;
        ollama_body.format = "json";
      }
    }
    return {
      url: this.adapter.endpoint,
      method: "POST",
      body: JSON.stringify(ollama_body)
    };
  }
  /**
   * Transform messages to Ollama format
   * @returns {Array} Messages in Ollama format
   * @private
   */
  _transform_messages_to_ollama() {
    return this.messages.map((message) => {
      const ollama_message = {
        role: message.role,
        content: this._transform_content_to_ollama(message.content)
      };
      const images = this._extract_images_from_content(message.content);
      if (images.length > 0) {
        ollama_message.images = images;
      }
      return ollama_message;
    });
  }
  /**
   * Transform content to Ollama format
   * @param {string|Array} content - Message content
   * @returns {string} Content in Ollama format
   * @private
   */
  _transform_content_to_ollama(content) {
    if (Array.isArray(content)) {
      return content.filter((item) => item.type === "text").map((item) => item.text).join("\n");
    }
    return content;
  }
  /**
   * Extract images from content
   * @param {string|Array} content - Message content
   * @returns {Array} Array of image URLs
   * @private
   */
  _extract_images_from_content(content) {
    if (!Array.isArray(content)) return [];
    return content.filter((item) => item.type === "image_url").map((item) => item.image_url.url);
  }
  /**
   * Transform functions to tools format
   * @returns {Array} Tools array in Ollama format
   * @private
   */
  _transform_functions_to_tools() {
    return this.tools;
  }
  /**
   * Transform parameters to Ollama options format
   * @returns {Object} Options in Ollama format
   * @private
   */
  _transform_parameters_to_ollama() {
    const options = {};
    if (this.max_tokens) options.num_predict = this.max_tokens;
    if (this.temperature) options.temperature = this.temperature;
    if (this.top_p) options.top_p = this.top_p;
    if (this.frequency_penalty) options.frequency_penalty = this.frequency_penalty;
    if (this.presence_penalty) options.presence_penalty = this.presence_penalty;
    return options;
  }
};
var SmartChatModelOllamaResponseAdapter = class extends SmartChatModelResponseAdapter {
  static get platform_res() {
    return {
      model: "",
      created_at: null,
      message: {
        role: "",
        content: ""
      },
      total_duration: 0,
      load_duration: 0,
      prompt_eval_count: 0,
      prompt_eval_duration: 0,
      eval_count: 0,
      eval_duration: 0
    };
  }
  /**
   * Convert response to OpenAI format
   * @returns {Object} Response in OpenAI format
   */
  to_openai() {
    return {
      id: this._res.created_at,
      object: "chat.completion",
      created: Date.now(),
      model: this._res.model,
      choices: [
        {
          index: 0,
          message: this._transform_message_to_openai(),
          finish_reason: this._res.done_reason
        }
      ],
      usage: this._transform_usage_to_openai()
    };
  }
  /**
   * Transform message to OpenAI format
   * @returns {Object} Message in OpenAI format
   * @private
   */
  _transform_message_to_openai() {
    return {
      role: this._res.message.role,
      content: this._res.message.content,
      tool_calls: this._res.message.tool_calls
    };
  }
  /**
   * Transform usage statistics to OpenAI format
   * @returns {Object} Usage statistics in OpenAI format
   * @private
   */
  _transform_usage_to_openai() {
    return {
      prompt_tokens: this._res.prompt_eval_count || 0,
      completion_tokens: this._res.eval_count || 0,
      total_tokens: (this._res.prompt_eval_count || 0) + (this._res.eval_count || 0)
    };
  }
  /**
   * Parse chunk adds delta to content as expected output format
   */
  handle_chunk(chunk) {
    chunk = JSON.parse(chunk || "{}");
    if (chunk.created_at && !this._res.created_at) {
      this._res.created_at = chunk.created_at;
    }
    if (chunk.message?.content) {
      this._res.message.content += chunk.message.content;
    }
    if (chunk.message?.role) {
      this._res.message.role = chunk.message.role;
    }
    if (chunk.model) {
      this._res.model = chunk.model;
    }
    if (chunk.message?.tool_calls) {
      if (!this._res.message.tool_calls) {
        this._res.message.tool_calls = [{
          id: "",
          type: "function",
          function: {
            name: "",
            arguments: ""
          }
        }];
      }
      if (chunk.message.tool_calls[0].id) {
        this._res.message.tool_calls[0].id += chunk.message.tool_calls[0].id;
      }
      if (chunk.message.tool_calls[0].function.name) {
        this._res.message.tool_calls[0].function.name += chunk.message.tool_calls[0].function.name;
      }
      if (chunk.message.tool_calls[0].function.arguments) {
        this._res.message.tool_calls[0].function.arguments += chunk.message.tool_calls[0].function.arguments;
      }
    }
  }
};

// node_modules/smart-http-request/smart_http_request.js
var SmartHttpRequest3 = class {
  /**
   * @param {object} opts - Options for the SmartHttpRequest class
   * @param {SmartHttpRequestAdapter} opts.adapter - The adapter constructor to use for making HTTP requests
   * @param {Obsidian.requestUrl} opts.obsidian_request_adapter - For use with Obsidian adapter
   */
  constructor(opts = {}) {
    this.opts = opts;
    if (!opts.adapter) throw new Error("HttpRequestAdapter is required");
    this.adapter = new opts.adapter(this);
  }
  /**
   * Returns a well-formed response object
   * @param {object} request_params - Parameters for the HTTP request
   * @param {string} request_params.url - The URL to make the request to
   * @param {string} [request_params.method='GET'] - The HTTP method to use
   * @param {object} [request_params.headers] - Headers to include in the request
   * @param {*} [request_params.body] - The body of the request (for POST, PUT, etc.)
   * @returns {SmartHttpResponseAdapter} instance of the SmartHttpResponseAdapter class
   * @example
   * const response = await smart_http_request.request({
   *   url: 'https://api.example.com/data',
   *   method: 'GET',
   *   headers: { 'Content-Type': 'application/json' }
   * });
   * console.log(await response.json());
   */
  async request(request_params) {
    return await this.adapter.request(request_params);
  }
};

// node_modules/smart-http-request/adapters/_adapter.js
var SmartHttpRequestAdapter3 = class {
  constructor(main) {
    this.main = main;
  }
  async request(request_params) {
    throw new Error("request not implemented");
  }
};
var SmartHttpResponseAdapter3 = class {
  constructor(response) {
    this.response = response;
  }
  async headers() {
    throw new Error("headers not implemented");
  }
  async json() {
    throw new Error("json not implemented");
  }
  async status() {
    throw new Error("status not implemented");
  }
  async text() {
    throw new Error("text not implemented");
  }
};

// node_modules/smart-http-request/adapters/obsidian.js
var SmartHttpObsidianRequestAdapter3 = class extends SmartHttpRequestAdapter3 {
  async request(request_params) {
    let response;
    try {
      if (!this.main.opts.obsidian_request_url) {
        throw new Error("obsidian_request_url is required in SmartHttp constructor opts");
      }
      response = await this.main.opts.obsidian_request_url({ ...request_params, throw: false });
      if (response.status === 400) throw new Error("Obsidian request failed");
      return new SmartHttpObsidianResponseAdapter(response);
    } catch (error) {
      console.error("Error in SmartHttpObsidianRequestAdapter.request():");
      console.error(JSON.stringify(request_params, null, 2));
      console.error(response);
      console.error(error);
      return null;
    }
  }
};
var SmartHttpObsidianResponseAdapter = class extends SmartHttpResponseAdapter3 {
  async status() {
    return this.response.status;
  }
  async json() {
    return await this.response.json;
  }
  async text() {
    return await this.response.text;
  }
  async headers() {
    return this.response.headers;
  }
};

// src/smart_env.config.js
var import_obsidian9 = require("obsidian");

// node_modules/smart-groups/node_modules/smart-entities/utils/sort_by_score.js
function sort_by_score2(a, b) {
  const epsilon = 1e-9;
  const score_diff = a.score - b.score;
  if (Math.abs(score_diff) < epsilon) return 0;
  return score_diff > 0 ? -1 : 1;
}
function sort_by_score_descending(a, b) {
  return sort_by_score2(a, b);
}
function sort_by_score_ascending(a, b) {
  return sort_by_score2(a, b) * -1;
}

// node_modules/smart-groups/node_modules/smart-entities/adapters/_adapter.js
var EntityAdapter2 = class {
  /**
   * Creates an instance of EntityAdapter.
   * @constructor
   * @param {Object} smart_entity - The SmartEntity instance that this adapter is wrapping.
   */
  constructor(smart_entity) {
    this.smart_entity = smart_entity;
  }
  /**
   * Retrieves the data object of the smart entity.
   * @readonly
   * @returns {Object} The data object containing embeddings and other entity data.
   */
  get data() {
    return this.smart_entity.data;
  }
  /**
   * Retrieves the embedding model key used for this entity.
   * @readonly
   * @returns {string} The key for the embedding model.
   */
  get embed_model_key() {
    return this.smart_entity.embed_model_key;
  }
  /**
   * Retrieves the vector representation for this entity's embedding.
   * @readonly
   * @returns {Array<number>|undefined} The vector array if available, or undefined if not set.
   */
  get vec() {
    return this.data?.embeddings?.[this.embed_model_key]?.vec;
  }
  /**
   * Sets the vector representation for this entity's embedding.
   * Initializes the embeddings data structure if not already present.
   * @param {Array<number>} vec - The vector array to set for this embedding.
   */
  set vec(vec) {
    if (!this.data.embeddings) {
      this.data.embeddings = {};
    }
    if (!this.data.embeddings[this.embed_model_key]) {
      this.data.embeddings[this.embed_model_key] = {};
    }
    this.data.embeddings[this.embed_model_key].vec = vec;
  }
};

// node_modules/smart-groups/node_modules/smart-entities/components/entity.js
async function render14(scope, opts = {}) {
  const markdown = await get_markdown3(scope);
  const frag = await this.render_markdown(markdown, scope);
  return await post_process12.call(this, scope, frag, opts);
}
async function get_markdown3(scope) {
  return should_render_embed3(scope) ? scope.embed_link : (await scope.get_content())?.replace(/```dataview/g, "```\\dataview");
}
async function post_process12(scope, frag, opts = {}) {
  return frag;
}
function should_render_embed3(entity) {
  if (!entity) return false;
  if (entity.is_canvas) return true;
  if (entity.is_excalidraw) return true;
  if (entity.source?.is_canvas) return true;
  if (entity.source?.is_excalidraw) return true;
  return false;
}

// node_modules/smart-groups/node_modules/smart-entities/smart_entity.js
var SmartEntity2 = class extends CollectionItem {
  /**
   * Creates an instance of SmartEntity.
   * @constructor
   * @param {Object} env - The environment instance.
   * @param {Object} [opts={}] - Configuration options.
   */
  constructor(env, opts = {}) {
    super(env, opts);
    this.entity_adapter = new EntityAdapter2(this);
  }
  /**
   * Provides default values for a SmartEntity instance.
   * @static
   * @readonly
   * @returns {Object} The default values.
   */
  static get defaults() {
    return {
      data: {
        path: null,
        embeddings: {},
        // contains keys per model
        embedding: {}
        // DEPRECATED
      }
    };
  }
  /**
   * Initializes the SmartEntity instance.
   * @returns {void}
   */
  init() {
    super.init();
    if (!this.vec) this.queue_embed();
    Object.entries(this.data.embeddings || {}).forEach(([model, embedding]) => {
      if (model !== this.embed_model_key) {
        this.data.embeddings[model] = null;
        delete this.data.embeddings[model];
      }
    });
  }
  /**
   * Queues the entity for embedding.
   * @returns {void}
   */
  queue_embed() {
    this._queue_embed = true;
  }
  /**
   * Finds the nearest entities to this entity.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest(filter = {}) {
    return this.collection.nearest_to(this, filter);
  }
  /**
   * Generates the context string for the entity.
   * @async
   * @param {Object} [params={}] - Parameters for context generation.
   * @param {number} [params.i] - Optional index for note numbering.
   * @returns {Promise<string>} The context string.
   */
  async get_as_context(params = {}) {
    return `---BEGIN NOTE${params.i ? " " + params.i : ""} [[${this.path}]]---
${await this.get_content()}
---END NOTE${params.i ? " " + params.i : ""}---`;
  }
  /**
   * Prepares the input for embedding.
   * @async
   * @returns {Promise<void>} Should be overridden in child classes.
   */
  async get_embed_input() {
  }
  // override in child class
  /**
   * Prepares filter options for finding connections based on parameters.
   * @param {Object} [params={}] - Parameters for finding connections.
   * @returns {Object} The prepared filter options.
   */
  prepare_find_connections_filter_opts(params = {}) {
    const opts = {
      ...this.env.settings.smart_view_filter || {},
      ...params,
      entity: this
    };
    if (opts.filter?.limit) delete opts.filter.limit;
    if (opts.limit) delete opts.limit;
    return opts;
  }
  /**
   * Finds connections relevant to this entity based on provided parameters.
   * @param {Object} [params={}] - Parameters for finding connections.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  find_connections(params = {}) {
    const filter_opts = this.prepare_find_connections_filter_opts(params);
    const limit = params.filter?.limit || params.limit || this.env.settings.smart_view_filter?.results_limit || 10;
    const cache_key = this.key + JSON.stringify(params);
    if (!this.env.connections_cache) this.env.connections_cache = {};
    if (!this.env.connections_cache[cache_key]) {
      const connections = this.nearest(filter_opts).sort(sort_by_score2).slice(0, limit);
      this.connections_to_cache(cache_key, connections);
    }
    return this.connections_from_cache(cache_key);
  }
  /**
   * Retrieves connections from the cache based on the cache key.
   * @param {string} cache_key - The cache key.
   * @returns {Array<Result>} The cached connections.
   */
  connections_from_cache(cache_key) {
    return this.env.connections_cache[cache_key];
  }
  /**
   * Stores connections in the cache with the provided cache key.
   * @param {string} cache_key - The cache key.
   * @param {Array<Result>} connections - The connections to cache.
   * @returns {void}
   */
  connections_to_cache(cache_key, connections) {
    this.env.connections_cache[cache_key] = connections;
  }
  /**
   * Gets the embed link for the entity.
   * @readonly
   * @returns {string} The embed link.
   */
  get embed_link() {
    return `![[${this.path}]]`;
  }
  /**
   * Gets the key of the embedding model.
   * @readonly
   * @returns {string} The embedding model key.
   */
  get embed_model_key() {
    return this.collection.embed_model_key;
  }
  /**
   * Gets the name of the entity, formatted based on settings.
   * @readonly
   * @returns {string} The entity name.
   */
  get name() {
    return (!this.should_show_full_path ? this.path.split("/").pop() : this.path.split("/").join(" > ")).split("#").join(" > ").replace(".md", "");
  }
  /**
   * Determines whether to show the full path of the entity.
   * @readonly
   * @returns {boolean} True if the full path should be shown, false otherwise.
   */
  get should_show_full_path() {
    return this.env.settings.smart_view_filter?.show_full_path;
  }
  /**
   * @deprecated Use embed_model instead.
   * @readonly
   * @returns {Object} The smart embedding model.
   */
  get smart_embed() {
    return this.embed_model;
  }
  /**
   * Gets the embedding model instance from the collection.
   * @readonly
   * @returns {Object} The embedding model instance.
   */
  get embed_model() {
    return this.collection.embed_model;
  }
  /**
   * Gets the number of tokens associated with the entity's embedding.
   * @readonly
   * @returns {number|undefined} The number of tokens, or undefined if not set.
   */
  get tokens() {
    return this.data.embeddings[this.embed_model_key]?.tokens;
  }
  /**
   * Determines if the entity is unembedded based on vector presence and size.
   * @readonly
   * @returns {boolean} True if unembedded, false otherwise.
   */
  get is_unembedded() {
    if (this.vec) return false;
    if (this.size < (this.settings?.min_chars || 300)) return false;
    return true;
  }
  /**
   * Determines if the entity should be embedded.
   * @readonly
   * @returns {boolean} Always returns true. Can be overridden in child classes.
   */
  get should_embed() {
    return true;
  }
  // may override in child class
  /**
   * Sets the error for the embedding model.
   * @param {string} error - The error message.
   */
  set error(error) {
    this.data.embeddings[this.embed_model_key].error = error;
  }
  /**
   * Sets the number of tokens for the embedding.
   * @param {number} tokens - The number of tokens.
   */
  set tokens(tokens) {
    if (!this.data.embeddings) this.data.embeddings = {};
    if (!this.data.embeddings[this.embed_model_key]) this.data.embeddings[this.embed_model_key] = {};
    this.data.embeddings[this.embed_model_key].tokens = tokens;
  }
  /**
   * Gets the vector representation from the entity adapter.
   * @readonly
   * @returns {Array<number>|undefined} The vector or undefined if not set.
   */
  get vec() {
    return this.entity_adapter.vec;
  }
  /**
   * Sets the vector representation in the entity adapter.
   * @param {Array<number>} vec - The vector to set.
   */
  set vec(vec) {
    this.entity_adapter.vec = vec;
    this._queue_embed = false;
    this._embed_input = null;
    this.queue_save();
  }
  /**
   * Removes all embeddings from the entity.
   * @returns {void}
   */
  remove_embeddings() {
    this.data.embeddings = null;
    this.queue_save();
  }
  /**
   * Retrieves the key of the entity.
   * @returns {string} The entity key.
   */
  get_key() {
    return this.data.key || this.data.path;
  }
  /**
   * Retrieves the path of the entity.
   * @readonly
   * @returns {string|null} The entity path.
   */
  get path() {
    return this.data.path;
  }
  /**
   * Gets the component responsible for rendering the entity.
   * @readonly
   * @returns {Function} The render function for the entity component.
   */
  get component() {
    return render14;
  }
  // COMPONENTS 2024-11-27
  get connections_component() {
    if (!this._connections_component) this._connections_component = this.components?.connections?.bind(this.smart_view);
    return this._connections_component;
  }
  async render_connections(container, opts = {}) {
    if (container) container.innerHTML = "Loading connections...";
    const frag = await this.env.render_component("connections", this, opts);
    if (container) {
      container.innerHTML = "";
      container.appendChild(frag);
    }
    return frag;
  }
};

// node_modules/smart-groups/node_modules/smart-entities/top_acc.js
function results_acc2(_acc, result, ct = 10) {
  if (_acc.results.size < ct) {
    _acc.results.add(result);
  } else if (result.score > _acc.min) {
    _acc.results.add(result);
    _acc.results.delete(_acc.minResult);
    _acc.minResult = Array.from(_acc.results).reduce((min, curr) => curr.score < min.score ? curr : min);
    _acc.min = _acc.minResult.score;
  }
}
function furthest_acc2(_acc, result, ct = 10) {
  if (_acc.results.size < ct) {
    _acc.results.add(result);
  } else if (result.score < _acc.max) {
    _acc.results.add(result);
    _acc.results.delete(_acc.maxResult);
    _acc.maxResult = Array.from(_acc.results).reduce((max, curr) => curr.score > max.score ? curr : max);
    _acc.max = _acc.maxResult.score;
  }
}

// node_modules/smart-groups/node_modules/smart-entities/cos_sim.js
function cos_sim2(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error("Vectors must have the same length");
  }
  let dot_product = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  const epsilon = 1e-8;
  for (let i = 0; i < vector1.length; i++) {
    dot_product += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  if (magnitude1 < epsilon || magnitude2 < epsilon) {
    return 0;
  }
  return dot_product / (magnitude1 * magnitude2);
}

// node_modules/smart-groups/node_modules/smart-entities/smart_entities.js
var SmartEntities2 = class extends Collection {
  /**
   * Creates an instance of SmartEntities.
   * @constructor
   * @param {Object} env - The environment instance.
   * @param {Object} opts - Configuration options.
   */
  constructor(env, opts) {
    super(env, opts);
    this.model_instance_id = null;
    this.is_processing_queue = false;
    this.queue_total = 0;
    this.embedded_total = 0;
    this.is_queue_halted = false;
    this.total_tokens = 0;
    this.total_time = 0;
  }
  /**
   * Initializes the SmartEntities instance by loading embeddings.
   * @async
   * @returns {Promise<void>}
   */
  async init() {
    await super.init();
    await this.load_smart_embed();
    if (!this.embed_model) {
      console.log(`SmartEmbed not loaded for ${this.collection_key}. Continuing without embedding capabilities.`);
    }
  }
  /**
   * Loads the smart embedding model.
   * @async
   * @returns {Promise<void>}
   */
  async load_smart_embed() {
    if (this.embed_model_key === "None") return;
    if (!this.embed_model) return;
    if (this.embed_model.is_loading) return console.log(`SmartEmbedModel already loading for ${this.embed_model_key}`);
    if (this.embed_model.is_loaded) return console.log(`SmartEmbedModel already loaded for ${this.embed_model_key}`);
    try {
      console.log(`Loading SmartEmbedModel in ${this.collection_key}, current state: ${this.embed_model.state}`);
      await this.embed_model.load();
    } catch (e) {
      console.error(`Error loading SmartEmbedModel for ${this.embed_model_key}`);
      console.error(e);
      if (this.env.smart_connections_plugin?.settings?.legacy_transformers) {
        console.log("Switching to legacy transformers");
        this.settings.embed_model[this.embed_model_key] = this.env.smart_connections_plugin.settings.legacy_transformers;
        this.env.smart_connections_plugin.settings.legacy_transformers = null;
        delete this.env.smart_connections_plugin.settings.legacy_transformers;
        await this.embed_model_changed();
      }
    }
  }
  /**
   * Unloads the smart embedding model.
   * @async
   * @returns {Promise<void>}
   */
  async unload() {
    if (typeof this.embed_model?.unload === "function") {
      await this.embed_model.unload();
      this.embed_model = null;
    }
    super.unload();
  }
  /**
   * Gets the key of the embedding model.
   * @readonly
   * @returns {string} The embedding model key.
   */
  get embed_model_key() {
    return this.settings?.embed_model?.model_key || "TaylorAI/bge-micro-v2";
  }
  /**
   * Gets the settings for the embedding model.
   * @readonly
   * @returns {Object} The embedding model settings.
   */
  get embed_model_settings() {
    if (!this.settings.embed_model) this.settings.embed_model = {};
    if (!this.settings.embed_model?.[this.embed_model_key]) this.settings.embed_model[this.embed_model_key] = {};
    return this.settings.embed_model[this.embed_model_key];
  }
  /**
   * Gets or creates the container for smart embeddings in the DOM.
   * @readonly
   * @returns {HTMLElement|undefined} The container element or undefined if not available.
   */
  get smart_embed_container() {
    if (!this.model_instance_id) return console.log("model_key not set");
    const id = this.model_instance_id.replace(/[^a-zA-Z0-9]/g, "_");
    if (!window.document) return console.log("window.document not available");
    if (window.document.querySelector(`#${id}`)) return window.document.querySelector(`#${id}`);
    const container = window.document.createElement("div");
    container.id = id;
    window.document.body.appendChild(container);
    return container;
  }
  /**
   * @deprecated Use embed_model instead.
   * @readonly
   * @returns {Object} The smart embedding model.
   */
  get smart_embed() {
    return this.embed_model;
  }
  /**
   * Gets the embedding model instance.
   * @readonly
   * @returns {Object|null} The embedding model instance or null if none.
   */
  get embed_model() {
    if (this.embed_model_key === "None") return null;
    if (!this.env._embed_model && this.env.opts.modules.smart_embed_model?.class) this.env._embed_model = new this.env.opts.modules.smart_embed_model.class({
      settings: this.settings.embed_model,
      adapters: this.env.opts.modules.smart_embed_model?.adapters,
      re_render_settings: this.re_render_settings.bind(this),
      reload_model: this.reload_embed_model.bind(this)
    });
    return this.env._embed_model;
  }
  set embed_model(embed_model) {
    this.env._embed_model = embed_model;
  }
  reload_embed_model() {
    console.log("reload_embed_model");
    this.embed_model.unload();
    this.env._embed_model = null;
  }
  re_render_settings() {
    this.settings_container.innerHTML = "";
    this.render_settings();
  }
  /**
   * Finds the nearest entities to a given entity.
   * @param {Object} entity - The reference entity.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest_to(entity, filter = {}) {
    return this.nearest(entity.vec, filter);
  }
  /**
   * Finds the nearest entities to a vector based on cosine similarity.
   * @param {Array<number>} vec - The vector to compare against.
   * @param {Object} [filter={}] - Optional filters to apply.
   * @param {number} [filter.limit=50] - The maximum number of results to return.
   * @returns {Array<Result>} An array of result objects with score and item.
   */
  nearest(vec, filter = {}) {
    if (!vec) return console.log("no vec");
    const {
      limit = 50
      // TODO: default configured in settings
    } = filter;
    const nearest = this.filter(filter).reduce((acc, item) => {
      if (!item.vec) return acc;
      const result = { item, score: cos_sim2(vec, item.vec) };
      results_acc2(acc, result, limit);
      return acc;
    }, { min: 0, results: /* @__PURE__ */ new Set() });
    return Array.from(nearest.results);
  }
  furthest(vec, filter = {}) {
    if (!vec) return console.log("no vec");
    const {
      limit = 50
      // TODO: default configured in settings
    } = filter;
    const furthest = this.filter(filter).reduce((acc, item) => {
      if (!item.vec) return acc;
      const result = { item, score: cos_sim2(vec, item.vec) };
      furthest_acc2(acc, result, limit);
      return acc;
    }, { max: 0, results: /* @__PURE__ */ new Set() });
    return Array.from(furthest.results);
  }
  /**
   * Gets the file name based on collection key and embedding model key.
   * @readonly
   * @returns {string} The constructed file name.
   */
  get file_name() {
    return this.collection_key + "-" + this.embed_model_key.split("/").pop();
  }
  // Uncomment and implement if needed
  // get data_dir() { return this.env.env_data_dir + "/" + this.embed_model_key.replace("/", "_"); }
  /**
   * Calculates the relevance of an item based on the search filter.
   * @param {Object} item - The item to calculate relevance for.
   * @param {Object} search_filter - The search filter containing keywords.
   * @returns {number} The relevance score:
   *                   1 if any keyword is found in the item's path,
   *                   0 otherwise (default relevance for keyword in content).
   */
  calculate_relevance(item, search_filter) {
    if (search_filter.keywords.some((keyword) => item.path?.includes(keyword))) return 1;
    return 0;
  }
  /**
   * Prepares the filter options by incorporating entity-based filters.
   * @param {Object} [opts={}] - The filter options.
   * @param {Object} [opts.entity] - The entity to base the filters on.
   * @param {string|string[]} [opts.exclude_filter] - Keys or prefixes to exclude.
   * @param {string|string[]} [opts.include_filter] - Keys or prefixes to include.
   * @param {boolean} [opts.exclude_inlinks] - Whether to exclude inlinks of the entity.
   * @param {boolean} [opts.exclude_outlinks] - Whether to exclude outlinks of the entity.
   * @returns {Object} The modified filter options.
   */
  prepare_filter(opts = {}) {
    const {
      entity,
      exclude_filter,
      include_filter,
      exclude_inlinks,
      exclude_outlinks
    } = opts;
    if (entity) {
      if (typeof opts.exclude_key_starts_with_any === "undefined") opts.exclude_key_starts_with_any = [];
      if (opts.exclude_key_starts_with) {
        opts.exclude_key_starts_with_any = [
          opts.exclude_key_starts_with
        ];
        delete opts.exclude_key_starts_with;
      }
      opts.exclude_key_starts_with_any.push(entity.source_key || entity.key);
      if (exclude_filter) {
        if (typeof exclude_filter === "string") opts.exclude_key_starts_with_any.push(exclude_filter);
        else if (Array.isArray(exclude_filter)) opts.exclude_key_starts_with_any.push(...exclude_filter);
      }
      if (include_filter) {
        if (!Array.isArray(opts.key_starts_with_any)) opts.key_starts_with_any = [];
        if (typeof include_filter === "string") opts.key_starts_with_any.push(include_filter);
        else if (Array.isArray(include_filter)) opts.key_starts_with_any.push(...include_filter);
      }
      if (exclude_inlinks && this.env.links[entity.path]) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...Object.keys(this.env.links[entity.path] || {}));
      }
      if (exclude_outlinks) {
        if (!Array.isArray(opts.exclude_key_starts_with_any)) opts.exclude_key_starts_with_any = [];
        opts.exclude_key_starts_with_any.push(...entity.outlink_paths);
      }
    }
    return opts;
  }
  /**
   * Looks up entities based on hypothetical content.
   * @async
   * @param {Object} [params={}] - The parameters for the lookup.
   * @param {Array<string>} [params.hypotheticals=[]] - The hypothetical content to lookup.
   * @param {Object} [params.filter] - The filter to use for the lookup.
   * @param {number} [params.k] - Deprecated: Use `filter.limit` instead.
   * @returns {Promise<Array<Result>|Object>} The lookup results or an error object.
   */
  async lookup(params = {}) {
    const { hypotheticals = [] } = params;
    if (!hypotheticals?.length) return { error: "hypotheticals is required" };
    if (!this.smart_embed) return { error: "Embedding search is not enabled." };
    const hyp_vecs = await this.smart_embed.embed_batch(hypotheticals.map((h) => ({ embed_input: h })));
    const limit = params.filter?.limit || params.k || this.env.settings.lookup_k || 10;
    if (params.filter?.limit) delete params.filter.limit;
    const filter = {
      ...this.env.chats?.current?.scope || {},
      ...params.filter || {}
    };
    const results = hyp_vecs.reduce((acc, embedding, i) => {
      const results2 = this.nearest(embedding.vec, filter);
      results2.forEach((result) => {
        if (!acc[result.item.path] || result.score > acc[result.item.path].score) {
          acc[result.item.path] = {
            key: result.item.key,
            score: result.score,
            item: result.item,
            entity: result.item,
            // DEPRECATED: use item instead
            hypothetical_i: i
          };
        } else {
          result.score = acc[result.item.path].score;
        }
      });
      return acc;
    }, {});
    const top_k = Object.values(results).sort(sort_by_score2).slice(0, limit);
    console.log(`Found and returned ${top_k.length} ${this.collection_key}.`);
    return top_k;
  }
  /**
   * Gets the configuration for settings.
   * @readonly
   * @returns {Object} The settings configuration.
   */
  get settings_config() {
    return settings_config3;
  }
  async render_settings(container = this.settings_container, opts = {}) {
    container = await this.render_collection_settings(container, opts);
    const embed_model_settings_frag = await this.env.render_component("settings", this.embed_model, opts);
    container.appendChild(embed_model_settings_frag);
    return container;
  }
  /**
   * Gets the notices from the environment.
   * @readonly
   * @returns {Object} The notices object.
   */
  get notices() {
    return this.env.smart_connections_plugin?.notices || this.env.main?.notices;
  }
  /**
   * Gets the embed queue containing items to be embedded.
   * @readonly
   * @returns {Array<Object>} The embed queue.
   */
  get embed_queue() {
    return Object.values(this.items).filter((item) => item._queue_embed && item.should_embed);
  }
  /**
   * Processes the embed queue by batching and embedding items.
   * @async
   * @returns {Promise<void>}
   */
  async process_embed_queue() {
    try {
      if (this.embed_model_key === "None") return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (!this.embed_model) return console.log(`Smart Connections: No active embedding model for ${this.collection_key}, skipping embedding`);
      if (this.is_queue_halted || this.is_processing_queue) return console.log(`Smart Connections: Embed queue processing already in progress for ${this.collection_key}`);
      this.is_processing_queue = true;
      const datetime_start = /* @__PURE__ */ new Date();
      const queue = this.embed_queue;
      const datetime_end = /* @__PURE__ */ new Date();
      console.log(`Time spent getting embed queue: ${datetime_end.getTime() - datetime_start.getTime()}ms`);
      this.queue_total = queue.length;
      if (!this.queue_total) {
        this.is_processing_queue = false;
        return console.log(`Smart Connections: No items in ${this.collection_key} embed queue`);
      }
      console.log(`Processing ${this.collection_key} embed queue: ${this.queue_total} items`);
      for (let i = this.embedded_total; i < this.queue_total; i += this.embed_model.batch_size) {
        if (this.is_queue_halted) break;
        const batch = queue.slice(i, i + this.embed_model.batch_size);
        await Promise.all(batch.map((item) => item.get_embed_input()));
        const start_time = Date.now();
        await this.embed_model.embed_batch(batch);
        this.total_time += Date.now() - start_time;
        this.embedded_total += batch.length;
        this.total_tokens += batch.reduce((acc, item) => acc + (item.tokens || 0), 0);
        this._show_embed_progress_notice();
      }
      this.is_processing_queue = false;
      if (!this.is_queue_halted) this._embed_queue_complete();
    } catch (e) {
      if (e.message.includes("API key not set")) {
        this.halt_embed_queue_processing(`API key not set for ${this.embed_model_key}
Please set the API key in the settings.`);
      }
      this.is_processing_queue = false;
      console.error(`Error processing ${this.collection_key} embed queue: ` + JSON.stringify(e || {}, null, 2));
    }
  }
  /**
   * Displays the embedding progress notice.
   * @private
   * @returns {void}
   */
  _show_embed_progress_notice() {
    if (this.is_queue_halted) return;
    if (this.embedded_total - this.last_notice_embedded_total < 100) return;
    this.last_notice_embedded_total = this.embedded_total;
    const pause_btn = { text: "Pause", callback: this.halt_embed_queue_processing.bind(this), stay_open: true };
    this.notices?.show(
      "embedding_progress",
      [
        `Making Smart Connections...`,
        `Embedding progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
      ],
      {
        timeout: 0,
        button: pause_btn
      }
    );
  }
  /**
   * Displays the embedding completion notice.
   * @private
   * @returns {void}
   */
  _show_embed_completion_notice() {
    this.notices?.remove("embedding_progress");
    this.notices?.show("embedding_complete", [
      `Embedding complete.`,
      `${this.embedded_total} entities embedded.`,
      `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
    ], { timeout: 1e4 });
  }
  /**
   * Calculates the number of tokens processed per second.
   * @private
   * @returns {number} Tokens per second.
   */
  _calculate_embed_tokens_per_second() {
    const elapsed_time = this.total_time / 1e3;
    return Math.round(this.total_tokens / elapsed_time);
  }
  /**
   * Handles the completion of the embed queue processing.
   * @private
   * @returns {void}
   */
  _embed_queue_complete() {
    this.is_processing_queue = false;
    if (this.completed_embed_queue_timeout) clearTimeout(this.completed_embed_queue_timeout);
    this.completed_embed_queue_timeout = setTimeout(() => {
      this._show_embed_completion_notice();
      this._reset_embed_queue_stats();
      this.env.save();
    }, 3e3);
  }
  /**
   * Resets the statistics related to embed queue processing.
   * @private
   * @returns {void}
   */
  _reset_embed_queue_stats() {
    this.embedded_total = 0;
    this.queue_total = 0;
    this.total_tokens = 0;
    this.total_time = 0;
    this.last_notice_embedded_total = 0;
    this.is_processing_queue = false;
    this.is_queue_halted = false;
  }
  /**
   * Halts the embed queue processing.
   * @returns {void}
   */
  halt_embed_queue_processing(msg = null) {
    this.is_queue_halted = true;
    console.log("Embed queue processing halted");
    this.notices?.remove("embedding_progress");
    this.notices?.show(
      "embedding_paused",
      [
        msg || `Embedding paused.`,
        `Progress: ${this.embedded_total} / ${this.queue_total}`,
        `${this._calculate_embed_tokens_per_second()} tokens/sec using ${this.embed_model_key}`
      ],
      {
        timeout: 0,
        button: { text: "Resume", callback: () => this.resume_embed_queue_processing(100) }
      }
    );
    this.env.save();
  }
  /**
   * Resumes the embed queue processing after a delay.
   * @param {number} [delay=0] - The delay in milliseconds before resuming.
   * @returns {void}
   */
  resume_embed_queue_processing(delay = 0) {
    console.log("resume_embed_queue_processing");
    this.is_queue_halted = false;
    this.notices?.remove("embedding_paused");
    setTimeout(() => {
      this.embedded_total = 0;
      this.process_embed_queue();
    }, delay);
  }
  /**
   * Handles changes to the embedding model by reinitializing and processing the load queue.
   * @async
   * @returns {Promise<void>}
   */
  async embed_model_changed() {
    await this.unload();
    await this.init();
    this.render_settings();
    await this.process_load_queue();
  }
  async render_lookup(container, opts = {}) {
    if (container) container.innerHTML = "Loading lookup...";
    const frag = await this.env.render_component("lookup", this, opts);
    if (container) {
      container.innerHTML = "";
      container.appendChild(frag);
    }
    return frag;
  }
  get connections_filter_config() {
    return connections_filter_config2;
  }
};
var settings_config3 = {
  "min_chars": {
    name: "Minimum length of entity to embed",
    type: "number",
    description: "Minimum length of entity to embed.",
    placeholder: "Enter number ex. 300",
    default: 300
  }
};
var connections_filter_config2 = {
  "smart_view_filter.show_full_path": {
    "name": "Show Full Path",
    "type": "toggle",
    "description": "Show full path in view.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.render_markdown": {
    "name": "Render Markdown",
    "type": "toggle",
    "description": "Render markdown in results.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.results_limit": {
    "name": "Results Limit",
    "type": "number",
    "description": "Limit the number of results.",
    "default": 20,
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.exclude_inlinks": {
    "name": "Exclude Inlinks",
    "type": "toggle",
    "description": "Exclude inlinks.",
    "callback": "refresh_smart_view_filter"
  },
  "smart_view_filter.exclude_outlinks": {
    "name": "Exclude Outlinks",
    "type": "toggle",
    "description": "Exclude outlinks.",
    "callback": "refresh_smart_view_filter"
  },
  "smart_view_filter.include_filter": {
    "name": "Include Filter",
    "type": "text",
    "description": "Require that results match this value.",
    "callback": "refresh_smart_view"
  },
  "smart_view_filter.exclude_filter": {
    "name": "Exclude Filter",
    "type": "text",
    "description": "Exclude results that match this value.",
    "callback": "refresh_smart_view"
  }
};

// node_modules/smart-groups/smart_directory.js
var SmartDirectory = class extends SmartEntity2 {
  static get defaults() {
    return {
      data: {
        path: "",
        median_vec: null,
        median_block_vec: null,
        sources: [],
        // Cache of contained source keys
        metadata: {
          labels: {},
          // Store directory labels/tags with q-scores
          last_modified: 0,
          // Track directory changes
          stats: {
            // Directory statistics
            total_files: 0,
            total_size: 0,
            last_scan: 0
          }
        }
      }
    };
  }
  async init() {
    this.data.path = this.data.path.replace(/\\/g, "/");
    this.queue_save();
  }
  get fs() {
    return this.env.smart_sources.fs;
  }
  get file_type() {
    return "directory";
  }
  get smart_embed() {
    return false;
  }
  async read() {
    const contents = await this.fs.list(this.data.path);
    return contents.map((item) => ({
      path: item.path,
      type: item.type
    }));
  }
  async move_to(new_path) {
    const old_path = this.data.path;
    if (!await this.fs.exists(old_path)) {
      throw new Error(`Directory not found: ${old_path}`);
    }
    const parent_dir = new_path.split("/").slice(0, -1).join("/");
    if (parent_dir && !await this.fs.exists(parent_dir)) {
      await this.fs.mkdir(parent_dir, { recursive: true });
    }
    await this.fs.rename(old_path, new_path);
    this.data.path = new_path;
    this.queue_save();
  }
  async remove() {
    await this.fs.remove_dir(this.data.path);
    await this.delete();
  }
  async create(path) {
    if (await this.fs.exists(path)) {
      const stat = await this.fs.stat(path);
      if (stat.isFile()) {
        throw new Error(`Cannot create directory: A file with the same name already exists at ${path}`);
      }
    } else {
      await this.fs.mkdir(path, { recursive: true });
    }
  }
  // These methods are not supported for directories
  async append() {
    throw new Error("append method not supported for directory");
  }
  async update() {
    throw new Error("update method not supported for directory");
  }
  async _update() {
    throw new Error("_update method not supported for directory");
  }
  async _read() {
    throw new Error("_read method not supported for directory");
  }
  async merge() {
    throw new Error("merge method not supported for directory");
  }
  /**
   * Gets all SmartSources contained in this directory
   * @returns {SmartSource[]} Array of SmartSource instances
   */
  get sources() {
    return this.env.smart_sources.filter(
      (source) => source.path.startsWith(this.data.path)
    );
  }
  get nearest_sources_results() {
    if (!this.median_vec) {
      console.log(`no median vec for directory: ${this.data.path}`);
      return [];
    }
    const filter = {
      key_starts_with: this.data.path
    };
    const results = this.env.smart_sources.nearest(this.median_vec, filter);
    return results.sort(sort_by_score_descending);
  }
  get furthest_sources_results() {
    if (!this.median_vec) {
      console.log(`no median vec for directory: ${this.data.path}`);
      return [];
    }
    const filter = {
      key_starts_with: this.data.path
    };
    const results = this.env.smart_sources.furthest(this.median_vec, filter);
    return results.sort(sort_by_score_ascending);
  }
  /**
   * Gets only direct child sources (excludes sources in subdirectories)
   */
  get direct_sources() {
    return this.sources.filter((source) => {
      const relative_path = source.path.slice(this.data.path.length);
      return !relative_path.includes("/");
    });
  }
  /**
   * Gets all subdirectories
   */
  get subdirectories() {
    return this.env.smart_directories.filter({
      key_starts_with: this.data.path
    });
  }
  /**
   * Gets only direct child directories
   */
  get direct_subdirectories() {
    return this.subdirectories.filter((dir) => {
      const relative_path = dir.data.path.slice(this.data.path.length);
      return !relative_path.slice(0, -1).includes("/");
    });
  }
  /**
   * Gets the median vector of all contained sources
   */
  get median_vec() {
    if (this.data.median_vec) return this.data.median_vec;
    const source_vecs = this.sources.map((source) => source.vec).filter((vec) => vec);
    if (!source_vecs.length) return null;
    const vec_length = source_vecs[0].length;
    const median_vec = new Array(vec_length);
    const mid = Math.floor(source_vecs.length / 2);
    for (let i = 0; i < vec_length; i++) {
      const values = source_vecs.map((vec) => vec[i]).sort((a, b) => a - b);
      median_vec[i] = source_vecs.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    }
    this.data.median_vec = median_vec;
    return median_vec;
  }
  get vec() {
    return this.median_vec;
  }
  /**
   * Gets the median vector of all contained blocks
   */
  get median_block_vec() {
    if (this.data.median_block_vec) return this.data.median_block_vec;
    const block_vecs = this.sources.flatMap((source) => source.blocks).map((block) => block.vec).filter((vec) => vec);
    if (!block_vecs.length) return null;
    const vec_length = block_vecs[0].length;
    const median_vec = new Array(vec_length);
    const mid = Math.floor(block_vecs.length / 2);
    for (let i = 0; i < vec_length; i++) {
      const values = block_vecs.map((vec) => vec[i]).sort((a, b) => a - b);
      median_vec[i] = block_vecs.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    }
    this.data.median_block_vec = median_vec;
    return median_vec;
  }
  /**
   * Performs a lookup within this directory's sources
   */
  async lookup(opts = {}) {
    return await this.env.smart_sources.lookup({
      ...opts,
      filter: {
        ...opts.filter || {},
        key_starts_with: this.data.path
      }
    });
  }
  // Add method to update directory statistics
  async update_stats() {
    const sources = this.sources;
    this.data.metadata.stats = {
      total_files: sources.length,
      total_size: sources.reduce((sum, src) => sum + (src.size || 0), 0),
      last_scan: Date.now()
    };
    this.queue_save();
  }
  // Add method to manage directory labels
  async update_label(label, q_score, block_key = null) {
    if (!this.data.metadata.labels[label]) {
      this.data.metadata.labels[label] = {
        q_score: 0,
        supporting_blocks: {}
      };
    }
    if (block_key) {
      this.data.metadata.labels[label].supporting_blocks[block_key] = q_score;
    }
    const scores = Object.values(this.data.metadata.labels[label].supporting_blocks);
    this.data.metadata.labels[label].q_score = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    this.queue_save();
  }
  // Track directory changes
  async on_source_change(source_key) {
    this.data.metadata.last_modified = Date.now();
    await this.update_stats();
    this.data.median_vec = null;
    this.data.median_block_vec = null;
    this.queue_save();
  }
  get component() {
    return render12;
  }
};

// node_modules/smart-groups/smart_directories.js
var SmartDirectories = class extends SmartEntities2 {
  static get defaults() {
    return {
      item_type: SmartDirectory,
      collection_key: "smart_directories"
    };
  }
  /**
   * Creates a directory if it doesn't exist
   */
  async ensure_directory(path) {
    path = path.replace(/\\/g, "/");
    if (!path.endsWith("/")) path += "/";
    let dir = this.get(path);
    if (!dir) {
      dir = await this.create_or_update({ path });
      await dir.init();
    }
    dir.data.env_settings_expanded_view = this.env.settings.expanded_view;
    return dir;
  }
  /**
   * Gets or creates parent directories recursively
   */
  async ensure_parent_directories(path) {
    const parts = path.split("/").filter((p) => p);
    let current_path = "";
    for (const part of parts) {
      current_path += part + "/";
      await this.ensure_directory(current_path);
    }
  }
  /**
   * Initializes directories based on existing sources
   */
  async init() {
    await super.init();
    const source_paths = Object.keys(this.env.smart_sources.items);
    for (const path of source_paths) {
      const dir_path = path.split("/").slice(0, -1).join("/") + "/";
      await this.ensure_parent_directories(dir_path);
    }
  }
  /**
   * Updates directory metadata when sources change
   */
  async update_directory_metadata(dir_path) {
    const dir = await this.ensure_directory(dir_path);
    dir.data.median_vec = null;
    dir.data.median_block_vec = null;
    dir.queue_save();
  }
  async render_directories(container, opts = {}) {
    opts.expanded_view = this.env.settings.expanded_view;
    if (container) container.innerHTML = "Loading directories...";
    const frag = await this.env.render_component("directories", this, opts);
    if (container) {
      container.innerHTML = "";
      container.appendChild(frag);
    }
    return frag;
  }
};

// node_modules/smart-chats/components/threads.js
function build_html9(threads_collection, opts = {}) {
  const top_bar_buttons = [
    { title: "Open Conversation Note", icon: "external-link" },
    { title: "Chat History", icon: "history" },
    { title: "Chat Options", icon: "sliders-horizontal", style: "display: none;" },
    { title: "Chat Settings", icon: "gear" },
    { title: "New Chat", icon: "plus" }
  ].map((btn) => `
    <button title="${btn.title}" ${btn.style ? `style="${btn.style}"` : ""}>
      ${this.get_icon_html(btn.icon)}
    </button>
  `).join("");
  return `
    <div class="sc-chat-container">
      <div class="sc-top-bar-container">
        <input class="sc-chat-name-input" type="text" value="Untitled" placeholder="Chat Name">
        ${top_bar_buttons}
      </div>
      <div id="settings" class="smart-chat-overlay" style="display: none;">
        <div class="smart-chat-overlay-header">
          <button class="smart-chat-overlay-close">
            ${this.get_icon_html("x")}
          </button>
        </div>
        <div class="settings-container"></div>
      </div>
      <div class="sc-thread">
        <!-- Thread messages will be inserted here -->
      </div>
    </div>
    ${opts.attribution || ""}
  `;
}
async function render15(threads_collection, opts = {}) {
  const html = build_html9.call(this, threads_collection, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process13.call(this, threads_collection, frag, opts);
}
async function post_process13(threads_collection, frag, opts) {
  const chat_box = frag.querySelector(".sc-thread");
  const settings_button = frag.querySelector('button[title="Chat Settings"]');
  const overlay_container = frag.querySelector(".smart-chat-overlay");
  const settings_container = overlay_container.querySelector(".settings-container");
  let thread;
  if (opts.thread_key) thread = threads_collection.get(opts.thread_key);
  if (!thread) thread = threads_collection.get_active_thread();
  if (!thread) {
    thread = await threads_collection.create_or_update({});
  }
  chat_box.setAttribute("data-thread-key", thread.key);
  await thread.render(chat_box, opts);
  const close_button = overlay_container.querySelector(".smart-chat-overlay-close");
  if (close_button) {
    close_button.addEventListener("click", () => {
      overlay_container.style.display = "none";
    });
  }
  settings_button.addEventListener("click", () => {
    if (overlay_container.style.display === "none") {
      threads_collection.render_settings(settings_container);
      overlay_container.style.display = "block";
    } else {
      overlay_container.style.display = "none";
    }
  });
  const new_chat_button = frag.querySelector('button[title="New Chat"]');
  new_chat_button.addEventListener("click", async () => {
    threads_collection.container.innerHTML = "";
    opts.thread_key = null;
    threads_collection.render();
  });
  const chat_history_button = frag.querySelector('button[title="Chat History"]');
  chat_history_button.addEventListener("click", () => {
    opts.open_chat_history();
  });
  setup_chat_name_input_handler.call(this, frag, thread);
  return frag;
}
function setup_chat_name_input_handler(frag, thread) {
  const name_input = frag.querySelector(".sc-chat-name-input");
  if (!name_input) return;
  name_input.value = thread.key;
  name_input.addEventListener("blur", async () => {
    const new_name = name_input.value.trim();
    if (new_name && new_name !== thread.key) {
      try {
        await thread.rename(new_name);
        console.log(`Thread renamed to "${new_name}"`);
      } catch (error) {
        console.error("Error renaming thread:", error);
        name_input.value = thread.key;
      }
    }
  });
  name_input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      name_input.blur();
    }
  });
}

// node_modules/smart-chats/utils/ScTranslations.json
var ScTranslations_default = {
  en: {
    name: "English",
    pronouns: ["my", "I", "me", "mine", "our", "ours", "us", "we"],
    context_prefix_prompt: "Context from lookup:",
    context_suffix_prompt: 'Use the provided context to respond like "Based on your notes..."',
    initial_message: "Hi there, welcome to the Smart Chat. Ask me a question about your notes and I'll try to answer it."
  },
  es: {
    name: "Espa\xF1ol",
    pronouns: ["mi", "yo", "m\xED", "t\xFA", "mis"],
    context_prefix_prompt: "Contexto de b\xFAsqueda:",
    context_suffix_prompt: 'Usa el contexto proporcionado para responder como "Bas\xE1ndote en tus notas..."',
    initial_message: "Hola, bienvenido al Smart Chat. Hazme una pregunta sobre tus apuntes y tratar\xE9 de responderla."
  },
  fr: {
    name: "Fran\xE7ais",
    pronouns: ["me", "mon", "ma", "mes", "moi", "nous", "notre", "nos", "je", "j'", "m'"],
    context_prefix_prompt: "Contexte de recherche :",
    context_suffix_prompt: `Utilisez le contexte fourni pour r\xE9pondre comme "D'apr\xE8s vos notes..."`,
    initial_message: "Bonjour, bienvenue dans le Smart Chat. Posez-moi une question sur vos notes et j'essaierai d'y r\xE9pondre."
  },
  de: {
    name: "Deutsch",
    pronouns: ["mein", "meine", "meinen", "meiner", "meines", "mir", "uns", "unser", "unseren", "unserer", "unseres"],
    context_prefix_prompt: "Kontext aus Suche:",
    context_suffix_prompt: 'Verwenden Sie den bereitgestellten Kontext, um zu antworten wie "Basierend auf Ihren Notizen..."',
    initial_message: "Hallo, willkommen beim Smart Chat. Stellen Sie mir eine Frage zu Ihren Notizen, und ich werde versuchen, sie zu beantworten."
  },
  it: {
    name: "Italiano",
    pronouns: ["mio", "mia", "miei", "mie", "noi", "nostro", "nostri", "nostra", "nostre"],
    context_prefix_prompt: "Contesto dalla ricerca:",
    context_suffix_prompt: 'Usa il contesto fornito per rispondere come "Basandoti sui tuoi appunti..."',
    initial_message: "Ciao, benvenuto al Smart Chat. Fai una domanda sui tuoi appunti e cercher\xF2 di risponderti."
  },
  pt: {
    name: "Portugu\xEAs",
    pronouns: ["meu", "eu", "mim", "minha", "nosso", "nossa", "n\xF3s"],
    context_prefix_prompt: "Contexto da pesquisa:",
    context_suffix_prompt: 'Use o contexto fornecido para responder como "Com base em suas anota\xE7\xF5es..."',
    initial_message: "Ol\xE1, bem-vindo ao Smart Chat. Fa\xE7a-me uma pergunta sobre suas anota\xE7\xF5es e tentarei respond\xEA-la."
  },
  "pt-br": {
    name: "Portugu\xEAs (Brasil)",
    pronouns: ["eu", "me", "mim", "meu", "meus", "minha", "minhas", "nosso", "nossos", "nossa", "nossas", "n\xF3s", "nos", "a gente"],
    context_prefix_prompt: "Contexto da pesquisa:",
    context_suffix_prompt: 'Use o contexto fornecido para responder como "Com base nas suas notas..."',
    initial_message: "Ol\xE1, bem-vindo ao Smart Chat. Fa\xE7a-me uma pergunta sobre suas notas e tentarei respond\xEA-la."
  },
  ja: {
    name: "\u65E5\u672C\u8A9E",
    pronouns: ["\u79C1", "\u81EA\u5206", "\u50D5", "\u4FFA", "\u79C1\u9054", "\u3053\u306E"],
    context_prefix_prompt: "\u691C\u7D22\u304B\u3089\u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\uFF1A",
    context_suffix_prompt: "\u63D0\u4F9B\u3055\u308C\u305F\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u3092\u4F7F\u7528\u3057\u3066\u300C\u3053\u306E\u30CE\u30FC\u30C8\u306B\u57FA\u3065\u3044\u3066...\u300D\u306E\u3088\u3046\u306B\u5FDC\u7B54\u3057\u3066\u304F\u3060\u3055\u3044",
    initial_message: "\u3053\u3093\u306B\u3061\u306F\u3001Smart Chat\u3078\u3088\u3046\u3053\u305D\u3002\u3042\u306A\u305F\u306E\u30CE\u30FC\u30C8\u306B\u95A2\u3059\u308B\u8CEA\u554F\u3092\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u304A\u7B54\u3048\u3057\u307E\u3059\u3002"
  },
  zh: {
    name: "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
    pronouns: ["\u6211", "\u6211\u7684", "\u6211\u4EEC", "\u6211\u4EEC\u7684"],
    context_prefix_prompt: "\u67E5\u627E\u7684\u4E0A\u4E0B\u6587\uFF1A",
    context_suffix_prompt: "\u4F7F\u7528\u63D0\u4F9B\u7684\u4E0A\u4E0B\u6587\uFF0C\u4EE5\u201C\u6839\u636E\u4F60\u7684\u7B14\u8BB0...\u201D\u7684\u65B9\u5F0F\u56DE\u7B54",
    initial_message: "\u4F60\u597D\uFF0C\u6B22\u8FCE\u4F7F\u7528 Smart Chat\u3002\u8BF7\u95EE\u6211\u5173\u4E8E\u4F60\u7684\u7B14\u8BB0\u7684\u95EE\u9898\uFF0C\u6211\u4F1A\u5C3D\u529B\u56DE\u7B54\u3002"
  },
  "zh-TW": {
    name: "\u4E2D\u6587\uFF08\u7E41\u4F53\uFF09",
    pronouns: ["\u6211", "\u6211\u7684", "\u6211\u5011", "\u6211\u5011\u7684"],
    context_prefix_prompt: "\u67E5\u627E\u7684\u4E0A\u4E0B\u6587\uFF1A",
    context_suffix_prompt: "\u4F7F\u7528\u63D0\u4F9B\u7684\u4E0A\u4E0B\u6587\uFF0C\u4EE5\u300C\u6839\u64DA\u60A8\u7684\u7B46\u8A18...\u300D\u7684\u65B9\u5F0F\u56DE\u7B54",
    initial_message: "\u55E8\uFF0C\u6B61\u8FCE\u4F86\u5230 Smart Chat\u3002\u8ACB\u554F\u6211\u95DC\u65BC\u60A8\u7684\u7B46\u8A18\u7684\u554F\u984C\uFF0C\u6211\u6703\u76E1\u529B\u56DE\u7B54\u3002"
  },
  hi: {
    name: "\u0939\u093F\u0928\u094D\u0926\u0940",
    pronouns: ["\u092E\u0948\u0902", "\u092E\u0941\u091D\u0947", "\u092E\u0947\u0930\u093E", "\u092E\u0947\u0930\u0947", "\u092E\u0947\u0930\u0940", "\u0939\u092E", "\u0939\u092E\u0947\u0902", "\u0939\u092E\u093E\u0930\u093E", "\u0939\u092E\u093E\u0930\u0947", "\u0939\u092E\u093E\u0930\u0940"],
    context_prefix_prompt: "\u0916\u094B\u091C \u0938\u0947 \u0938\u0902\u0926\u0930\u094D\u092D:",
    context_suffix_prompt: '\u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u093F\u090F \u0917\u090F \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 "\u0906\u092A\u0915\u0947 \u0928\u094B\u091F\u094D\u0938 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930..." \u0915\u0940 \u0924\u0930\u0939 \u0909\u0924\u094D\u0924\u0930 \u0926\u0947\u0902',
    initial_message: "\u0928\u092E\u0938\u094D\u0924\u0947, Smart Chat \u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948\u0964 \u0905\u092A\u0928\u0947 \u0928\u094B\u091F\u094D\u0938 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092E\u0941\u091D\u0938\u0947 \u0915\u094B\u0908 \u092A\u094D\u0930\u0936\u094D\u0928 \u092A\u0942\u091B\u0947\u0902 \u0914\u0930 \u092E\u0948\u0902 \u0909\u0924\u094D\u0924\u0930 \u0926\u0947\u0928\u0947 \u0915\u093E \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0942\u0902\u0917\u093E\u0964"
  },
  ar: {
    name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    pronouns: ["\u0623\u0646\u0627", "\u0644\u064A", "\u0646\u062D\u0646", "\u0644\u0646\u0627", "\u064A", "\u0646\u0627"],
    context_prefix_prompt: "\u0633\u064A\u0627\u0642 \u0645\u0646 \u0627\u0644\u0628\u062D\u062B:",
    context_suffix_prompt: '\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0633\u064A\u0627\u0642 \u0627\u0644\u0645\u0642\u062F\u0645 \u0644\u0644\u0631\u062F \u0645\u062B\u0644 "\u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643..."',
    initial_message: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A Smart Chat. \u0627\u0633\u0623\u0644\u0646\u064A \u0633\u0624\u0627\u0644\u0627\u064B \u062D\u0648\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0648\u0633\u0623\u062D\u0627\u0648\u0644 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0639\u0644\u064A\u0647."
  },
  bn: {
    name: "\u09AC\u09BE\u0982\u09B2\u09BE",
    pronouns: ["\u0986\u09AE\u09BF", "\u0986\u09AE\u09BE\u09B0", "\u0986\u09AE\u09BE\u0995\u09C7", "\u0986\u09AE\u09B0\u09BE", "\u0986\u09AE\u09BE\u09A6\u09C7\u09B0", "\u0986\u09AE\u09BE\u09A6\u09C7\u09B0\u0995\u09C7"],
    context_prefix_prompt: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u09A5\u09C7\u0995\u09C7 \u09AA\u09CD\u09B0\u09C7\u0995\u09CD\u09B7\u09BE\u09AA\u099F:",
    context_suffix_prompt: '\u09AA\u09CD\u09B0\u09A6\u09A4\u09CD\u09A4 \u09AA\u09CD\u09B0\u09B8\u0999\u09CD\u0997 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09C7 "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09CB\u099F\u09C7\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u09A4\u09C7..." \u098F\u09B0 \u09AE\u09A4\u09CB \u0995\u09B0\u09C7 \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BF\u09A8',
    initial_message: "\u09B9\u09CD\u09AF\u09BE\u09B2\u09CB, Smart Chat-\u098F \u0986\u09AA\u09A8\u09BE\u0995\u09C7 \u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE\u0964 \u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09CB\u099F \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u0986\u09AE\u09BE\u0995\u09C7 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0995\u09B0\u09C1\u09A8, \u0986\u09AE\u09BF \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09AC\u0964"
  },
  ur: {
    name: "\u0627\u0631\u062F\u0648",
    pronouns: ["\u0645\u06CC\u06BA", "\u0645\u062C\u06BE\u06D2", "\u0645\u06CC\u0631\u0627", "\u06C1\u0645", "\u06C1\u0645\u06CC\u06BA", "\u06C1\u0645\u0627\u0631\u0627"],
    context_prefix_prompt: "\u062A\u0644\u0627\u0634 \u0633\u06D2 \u0633\u06CC\u0627\u0642 \u0648 \u0633\u0628\u0627\u0642:",
    context_suffix_prompt: '\u0641\u0631\u0627\u06C1\u0645 \u06A9\u0631\u062F\u06C1 \u0633\u06CC\u0627\u0642 \u0648 \u0633\u0628\u0627\u0642 \u06A9\u0627 \u0627\u0633\u062A\u0639\u0645\u0627\u0644 \u06A9\u0631\u062A\u06D2 \u06C1\u0648\u0626\u06D2 \u0627\u06CC\u0633\u06D2 \u062C\u0648\u0627\u0628 \u062F\u06CC\u06BA \u062C\u06CC\u0633\u06D2 "\u0622\u067E \u06A9\u06D2 \u0646\u0648\u0679\u0633 \u06A9\u06CC \u0628\u0646\u06CC\u0627\u062F \u067E\u0631..."',
    initial_message: "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F\u060C Smart Chat \u0645\u06CC\u06BA\u06D4 \u0627\u067E\u0646\u06D2 \u0646\u0648\u0679\u0633 \u06A9\u06D2 \u0628\u0627\u0631\u06D2 \u0645\u06CC\u06BA \u0645\u062C\u06BE \u0633\u06D2 \u06A9\u0648\u0626\u06CC \u0633\u0648\u0627\u0644 \u067E\u0648\u0686\u06BE\u06CC\u06BA \u0627\u0648\u0631 \u0645\u06CC\u06BA \u062C\u0648\u0627\u0628 \u062F\u06CC\u0646\u06D2 \u06A9\u06CC \u06A9\u0648\u0634\u0634 \u06A9\u0631\u0648\u06BA \u06AF\u0627\u06D4"
  },
  sw: {
    name: "Kiswahili",
    pronouns: ["mimi", "yangu", "sisi", "yetu"],
    context_prefix_prompt: "Muktadha kutoka utafutaji:",
    context_suffix_prompt: 'Tumia muktadha uliotolewa kujibu kama "Kulingana na maelezo yako..."',
    initial_message: "Hujambo, karibu kwenye Smart Chat. Niulize swali kuhusu maelezo yako na nitajaribu kujibu."
  },
  pl: {
    name: "Polski",
    pronouns: ["ja", "mnie", "m\xF3j", "moja", "moje", "my", "nas", "nasz", "nasza", "nasze"],
    context_prefix_prompt: "Kontekst z wyszukiwania:",
    context_suffix_prompt: 'U\u017Cyj podanego kontekstu, aby odpowiedzie\u0107 jak "Na podstawie twoich notatek..."',
    initial_message: "Cze\u015B\u0107, witaj w Smart Chat. Zadaj mi pytanie dotycz\u0105ce twoich notatek, a postaram si\u0119 odpowiedzie\u0107."
  },
  uk: {
    name: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    pronouns: ["\u044F", "\u043C\u0435\u043D\u0456", "\u043C\u0456\u0439", "\u043C\u043E\u044F", "\u043C\u043E\u0454", "\u043C\u0438", "\u043D\u0430\u0441", "\u043D\u0430\u0448", "\u043D\u0430\u0448\u0430", "\u043D\u0430\u0448\u0435"],
    context_prefix_prompt: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0437 \u043F\u043E\u0448\u0443\u043A\u0443:",
    context_suffix_prompt: '\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0439\u0442\u0435 \u043D\u0430\u0434\u0430\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0449\u043E\u0431 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0441\u0442\u0438 \u044F\u043A "\u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0456 \u0432\u0430\u0448\u0438\u0445 \u043D\u043E\u0442\u0430\u0442\u043E\u043A..."',
    initial_message: "\u041F\u0440\u0438\u0432\u0456\u0442, \u043B\u0430\u0441\u043A\u0430\u0432\u043E \u043F\u0440\u043E\u0441\u0438\u043C\u043E \u0434\u043E Smart Chat. \u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u043C\u0435\u043D\u0456 \u043F\u0438\u0442\u0430\u043D\u043D\u044F \u043F\u0440\u043E \u0432\u0430\u0448\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438, \u0456 \u044F \u0441\u043F\u0440\u043E\u0431\u0443\u044E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0441\u0442\u0438."
  },
  nl: {
    name: "Nederlands",
    pronouns: ["ik", "mij", "me", "mijn", "wij", "we", "ons", "onze"],
    context_prefix_prompt: "Context van zoekopdracht:",
    context_suffix_prompt: 'Gebruik de verstrekte context om te reageren als "Gebaseerd op uw notities..."',
    initial_message: "Hallo, welkom bij Smart Chat. Stel me een vraag over uw notities en ik zal proberen deze te beantwoorden."
  },
  sv: {
    name: "Svenska",
    pronouns: ["jag", "mig", "min", "mitt", "mina", "vi", "oss", "v\xE5r", "v\xE5rt", "v\xE5ra"],
    context_prefix_prompt: "Kontext fr\xE5n s\xF6kning:",
    context_suffix_prompt: 'Anv\xE4nd den tillhandah\xE5llna kontexten f\xF6r att svara som "Baserat p\xE5 dina anteckningar..."',
    initial_message: "Hej, v\xE4lkommen till Smart Chat. St\xE4ll en fr\xE5ga om dina anteckningar s\xE5 ska jag f\xF6rs\xF6ka svara."
  },
  tr: {
    name: "T\xFCrk\xE7e",
    pronouns: ["ben", "bana", "benim", "biz", "bize", "bizim"],
    context_prefix_prompt: "Arama ba\u011Flam\u0131:",
    context_suffix_prompt: 'Verilen ba\u011Flam\u0131 kullanarak "Notlar\u0131n\u0131za dayanarak..." \u015Feklinde cevap verin',
    initial_message: "Merhaba, Smart Chat'e ho\u015F geldiniz. Notlar\u0131n\u0131z hakk\u0131nda bana bir soru sorun, yan\u0131tlamaya \xE7al\u0131\u015Faca\u011F\u0131m."
  },
  ru: {
    name: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
    pronouns: ["\u044F", "\u043C\u043E\u0451", "\u043C\u043E\u0435", "\u043C\u043E\u0439", "\u043C\u043D\u0435", "\u043C\u043E\u0438\u0445", "\u043C\u043E\u0438", "\u043C\u043E\u0451\u043C", "\u043C\u043E\u0435\u043C", "\u043D\u0430\u0448", "\u043D\u0430\u0448\u0435", "\u043D\u0430\u0448\u0435\u043C", "\u043D\u0430\u0448\u0435\u043C\u0443", "\u043D\u0430\u0448\u0438\u043C", "\u043D\u0430\u0448\u0438", "\u043C\u044B"],
    context_prefix_prompt: "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0438\u0437 \u043F\u043E\u0438\u0441\u043A\u0430:",
    context_suffix_prompt: '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A "\u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0432\u0430\u0448\u0438\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439..."',
    initial_message: "\u041F\u0440\u0438\u0432\u0435\u0442, \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 Smart Chat. \u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u043C\u043D\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u043E \u0432\u0430\u0448\u0438\u0445 \u0437\u0430\u043F\u0438\u0441\u044F\u0445, \u0438 \u044F \u043F\u043E\u0441\u0442\u0430\u0440\u0430\u044E\u0441\u044C \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C."
  }
};

// node_modules/smart-chats/utils/self_referential_keywords.js
function contains_self_referential_keywords(user_input, language) {
  const language_settings = ScTranslations_default[language];
  if (!language_settings) return false;
  let check_str = `${user_input}`;
  if (check_str.match(new RegExp(`\\b(${language_settings.pronouns.join("|")})\\b`, "gi"))) return true;
  return false;
}
function get_language_options() {
  return Object.entries(ScTranslations_default).map(([language, language_settings]) => ({ value: language, name: language_settings.name }));
}
function get_initial_message(language) {
  const language_settings = ScTranslations_default[language];
  return language_settings.initial_message;
}
function get_translated_context_suffix_prompt(language) {
  const language_settings = ScTranslations_default[language];
  return language_settings.context_suffix_prompt;
}
function get_translated_context_prefix_prompt(language) {
  const language_settings = ScTranslations_default[language];
  return language_settings.context_prefix_prompt;
}

// node_modules/smart-chats/smart_threads.js
var SmartThreads = class extends SmartSources {
  // /**
  //  * Initializes the file system and preloads chat models
  //  * @async
  //  */
  // async init() {
  //   await this.fs.init();
  // }
  /**
   * Initializes items by setting up the file system and loading sources.
   * @async
   * @returns {Promise<void>}
   */
  async init_items() {
    if (!await this.fs.exists(this.source_dir)) await this.fs.mkdir(this.source_dir);
    (await this.fs.list(this.source_dir)).filter((file) => this.source_adapters[file.extension]).forEach((file) => {
      const key = file.path.replace(this.source_dir + "/", "").replace("." + file.extension, "");
      this.items[key] = new this.item_type(this.env, { path: file.path, key });
    });
    this.notices?.remove("initial scan");
    this.notices?.show("done initial scan", "Initial scan complete", { timeout: 3e3 });
  }
  /**
   * Renders the chat interface
   * @async
   * @param {HTMLElement} [container] - Container element to render into
   * @param {Object} [opts={}] - Rendering options
   * @returns {DocumentFragment} Rendered chat interface
   */
  async render(container = this.container, opts = {}) {
    if (Object.keys(opts).length > 0) this.render_opts = opts;
    if (container && (!this.container || this.container !== container)) this.container = container;
    const frag = await render15.call(this.smart_view, this, this.render_opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return frag;
  }
  get chat_model_settings() {
    if (!this.settings.chat_model) this.settings.chat_model = {};
    return this.settings.chat_model;
  }
  /**
   * @property {Object} chat_model - The AI chat model instance
   * @readonly
   */
  get chat_model() {
    if (!this._chat_model) {
      this._chat_model = this.env.init_module("smart_chat_model", {
        model_config: {},
        settings: this.chat_model_settings,
        env: this.env,
        reload_model: this.reload_chat_model.bind(this),
        re_render_settings: this.re_render_settings.bind(this)
      });
    }
    return this._chat_model;
  }
  reload_chat_model() {
    console.log("reload_chat_model");
    this.chat_model.unload();
    this._chat_model = null;
  }
  get container() {
    return this._container;
  }
  set container(container) {
    this._container = container;
  }
  /**
   * @property {Object} default_settings - Default configuration for models
   * @readonly
   * @returns {Object} settings - Default settings object containing:
   * @returns {Object} settings.chat_model - Chat model configuration
   * @returns {string} settings.chat_model.adapter - Default adapter
   * @returns {Object} settings.chat_model.openai - OpenAI-specific settings
   * @returns {Object} settings.embed_model - Embedding model configuration
   */
  get default_settings() {
    return {
      chat_model: {
        adapter: "openai",
        openai: {
          model_key: "gpt-4o"
        }
      },
      embed_model: {
        model_key: "None"
      }
    };
  }
  async render_settings(container = this.settings_container, opts = {}) {
    container = await this.render_collection_settings(container, opts);
    const chat_model_frag = await this.env.render_component("settings", this.chat_model, opts);
    container.appendChild(chat_model_frag);
    return container;
  }
  /**
   * @property {Object} settings_config - Processed settings configuration
   * @readonly
   */
  get settings_config() {
    return {
      "language": {
        name: "Language",
        type: "dropdown",
        options_callback: "get_language_options",
        description: "The language to use for the chat.",
        default: "en"
      },
      "review_context": {
        name: "Review Context",
        type: "toggle",
        default: false,
        description: "Whether to review the retrieved context before the AI completes the message."
      },
      "lookup_limit": {
        name: "Lookup Limit",
        type: "number",
        default: 10,
        description: "The maximum number of context items to retrieve via lookup."
      },
      "send_tool_output_in_user_message": {
        name: "Send Tool Output in User Message",
        type: "toggle",
        default: false,
        description: "Whether to send tool output in the user message."
      }
    };
  }
  get_language_options() {
    return get_language_options();
  }
  get initial_message() {
    return get_initial_message(this.language);
  }
  get language() {
    return this.settings.language || "en";
  }
  /**
   * Gets the currently active thread based on the chat box data-thread-key
   * @returns {SmartThread} The active thread
   */
  get_active_thread() {
    const chat_box = this.container?.querySelector(".sc-thread");
    if (!chat_box) return null;
    const thread_key = chat_box.getAttribute("data-thread-key");
    if (!thread_key) return null;
    return this.get(thread_key);
  }
  queue_save() {
    if (this._queue_process_save) {
      clearTimeout(this._queue_process_save);
      this._queue_process_save = null;
    }
    this._queue_process_save = setTimeout(async () => {
      await this.process_save_queue();
      this._queue_process_save = null;
    }, 3e3);
  }
  /**
   * @property {string} data_folder - Path to chat history storage
   * @readonly
   */
  get data_folder() {
    return this.env.opts.env_path + (this.env.opts.env_path ? "/" : "") + ".smart-env";
  }
  get source_dir() {
    return this.data_folder + "/" + this.collection_key;
  }
  get fs() {
    if (!this._fs) {
      this._fs = super.fs;
      this._fs.excluded_patterns = [];
    }
    return this._fs;
  }
};

// node_modules/smart-chats/components/thread.js
function build_html10(thread, opts = {}) {
  return `
    <div class="sc-thread" data-thread-key="${thread.key}">
      <div class="sc-message-container">
        ${opts.show_welcome && !thread.messages.length ? `
          <div class="sc-message assistant">
            <div class="sc-message-content">
              <span>${thread.collection.initial_message}</span>
            </div>
          </div>
        ` : ""}
      </div>
      <div class="sc-typing-indicator">
        <div class="sc-typing-dots">
          <div class="sc-typing-dot"></div>
          <div class="sc-typing-dot"></div>
          <div class="sc-typing-dot"></div>
        </div>
      </div>
      <div class="sc-config-error-notice" style="display: none;"></div>
      <div class="sc-chat-form">
        <textarea class="sc-chat-input" placeholder="Use @ to add context. Try &quot;Based on my notes&quot; or &quot;Summarize [[this note]]&quot; or &quot;Important tasks in /folder/&quot;"></textarea>
        <div class="sc-btn-container">
          <span id="sc-abort-button" style="display: none;">${this.get_icon_html("square")}</span>
          <button class="send-button" id="sc-send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="currentColor" />
              <path fill="currentColor" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd" fill="#727272"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}
async function render16(thread, opts = {}) {
  const html = build_html10.call(this, thread, {
    show_welcome: opts.show_welcome !== false
  });
  const frag = this.create_doc_fragment(html);
  return await post_process14.call(this, thread, frag, opts);
}
async function post_process14(thread, frag, opts) {
  const container = frag.querySelector(".sc-message-container");
  if (thread.messages.length) {
    thread.messages.forEach((msg) => {
      const msg_elm = document.createElement("div");
      msg_elm.id = msg.data.id;
      container.appendChild(msg_elm);
    });
    await Promise.all(
      thread.messages.map((msg) => msg.render(container))
    );
  }
  const chat_input = frag.querySelector(".sc-chat-form textarea");
  console.log("chat_input", chat_input);
  if (chat_input) {
    chat_input.addEventListener("keydown", (e) => handle_chat_input_keydown.call(this, e, thread, chat_input, opts));
    chat_input.addEventListener("keyup", (e) => handle_chat_input_keyup.call(this, e, chat_input));
  }
  if (container.scrollHeight > container.clientHeight) {
    container.scrollTop = container.scrollHeight;
  }
  const send_button = frag.querySelector("#sc-send-button");
  send_button.addEventListener("click", () => {
    thread.handle_message_from_user(chat_input.value);
    chat_input.value = "";
  });
  const abort_button = frag.querySelector("#sc-abort-button");
  abort_button.addEventListener("click", () => {
    thread.chat_model.abort_current_response();
    thread.clear_streaming_ux();
  });
  const validation_result = thread.chat_model.validate_config();
  console.log("validation_result", validation_result);
  if (!validation_result.valid) {
    const notice = frag.querySelector(".sc-config-error-notice");
    const message = document.createElement("span");
    message.textContent = validation_result.message;
    notice.appendChild(message);
    notice.style.display = "";
    const hide_button = document.createElement("button");
    hide_button.textContent = "Hide";
    notice.appendChild(hide_button);
    hide_button.addEventListener("click", () => {
      notice.style.display = "none";
    });
  }
  const typing_indicator = frag.querySelector(".sc-typing-indicator");
  if (typing_indicator) {
    const is_dark = document.body.classList.contains("theme-dark");
    typing_indicator.style.setProperty("--text-muted", is_dark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)");
  }
  return frag;
}
function handle_chat_input_keydown(e, thread, chat_input, opts) {
  const mod = this.adapter.is_mod_event(e);
  if (e.key === "Enter" && mod) {
    e.preventDefault();
    thread.handle_message_from_user(chat_input.value);
    chat_input.value = "";
    return;
  }
  opts.handle_chat_input_keydown(e, chat_input);
}
function handle_chat_input_keyup(e, chat_input) {
  clearTimeout(this.resize_debounce);
  this.resize_debounce = setTimeout(() => {
    chat_input.style.height = "auto";
    chat_input.style.height = `${chat_input.scrollHeight}px`;
  }, 200);
}

// node_modules/smart-chats/utils/folder_references.js
function contains_folder_reference(user_input) {
  const first_slash = user_input.indexOf("/");
  if (first_slash === -1) return false;
  const last_slash = user_input.lastIndexOf("/");
  if (last_slash - first_slash <= 1) return false;
  const first_open_parentheses = user_input.indexOf("(");
  const first_close_parentheses = user_input.indexOf(")");
  if (first_open_parentheses > first_slash && first_close_parentheses < last_slash) return true;
  const first_wiki_open = user_input.indexOf("[[");
  const first_wiki_close = user_input.indexOf("]]");
  if (first_wiki_open !== -1 && first_wiki_close !== -1) {
    if (first_slash > first_wiki_open && last_slash < first_wiki_close) return false;
  }
  if (first_open_parentheses !== -1 && first_close_parentheses !== -1) {
    if (first_slash > first_open_parentheses && last_slash < first_close_parentheses) return false;
    const without_content_in_parentheses = user_input.slice(0, first_open_parentheses) + user_input.slice(first_close_parentheses + 1);
    if (without_content_in_parentheses.indexOf("/") !== -1) return false;
    if (without_content_in_parentheses.indexOf("/") === without_content_in_parentheses.lastIndexOf("/")) return false;
  }
  return true;
}
function extract_folder_references(folders, user_input) {
  folders = folders.slice();
  const matches = folders.sort((a, b) => b.length - a.length).map((folder) => {
    if (user_input.indexOf(folder) !== -1) {
      user_input = user_input.replace(folder, "");
      return folder;
    }
    return false;
  }).filter((folder) => folder && folder !== "/");
  if (matches) return matches;
  return false;
}

// node_modules/smart-chats/utils/internal_links.js
function contains_internal_link(user_input) {
  if (user_input.indexOf("[[") === -1) return false;
  if (user_input.indexOf("]]") === -1) return false;
  return true;
}
function extract_internal_links(user_input) {
  const matches = [];
  const regex = /\[\[(.*?)\]\]/g;
  let match;
  while ((match = regex.exec(user_input)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}
function contains_internal_embedded_link(user_input) {
  if (user_input.indexOf("![") === -1) return false;
  if (user_input.indexOf("]") === -1) return false;
  return true;
}
function extract_internal_embedded_links(user_input) {
  const matches = [];
  const regex = /[!]\[\[(.*?)\]\]/g;
  let match;
  while ((match = regex.exec(user_input)) !== null) {
    matches.push(match);
  }
  return matches;
}

// node_modules/smart-chats/components/error.js
function build_html11(error, opts = {}) {
  const error_message = error?.error?.message || error?.message || "An unknown error occurred";
  const error_code = error?.error?.code || error?.code;
  const error_type = error?.error?.type || error?.type || "Error";
  return `
    <div class="sc-error-container" role="alert">
      <div class="sc-error-header">
        <span class="sc-error-icon">${this.get_icon_html("alert-triangle")}</span>
        <span class="sc-error-type">${error_type}</span>
        ${error_code ? `<span class="sc-error-code">(${error_code})</span>` : ""}
        <button class="sc-error-close" title="Dismiss">${this.get_icon_html("x")}</button>
      </div>
      <div class="sc-error-content">
        <p class="sc-error-message">${error_message}</p>
        ${error?.error?.details ? `
          <button class="sc-error-details-toggle" aria-expanded="false">
            Show Details ${this.get_icon_html("chevron-down")}
          </button>
          <div class="sc-error-details" hidden>
            <pre>${JSON.stringify(error.error.details, null, 2)}</pre>
          </div>
        ` : ""}
      </div>
      ${opts.retry ? `
        <div class="sc-error-actions">
          <button class="sc-error-retry">
            ${this.get_icon_html("refresh-cw")} Retry
          </button>
        </div>
      ` : ""}
    </div>
  `;
}
async function render17(error, opts = {}) {
  const html = build_html11.call(this, error, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process15.call(this, error, frag, opts);
}
async function post_process15(error, frag, opts) {
  const close_button = frag.querySelector(".sc-error-close");
  if (close_button) {
    close_button.addEventListener("click", () => {
      const container = close_button.closest(".sc-error-container");
      container.remove();
    });
  }
  const details_toggle = frag.querySelector(".sc-error-details-toggle");
  const details_content = frag.querySelector(".sc-error-details");
  if (details_toggle && details_content) {
    details_toggle.addEventListener("click", () => {
      const is_expanded = details_toggle.getAttribute("aria-expanded") === "true";
      details_toggle.setAttribute("aria-expanded", !is_expanded);
      details_content.hidden = is_expanded;
      details_toggle.innerHTML = `
        ${is_expanded ? "Show" : "Hide"} Details ${this.get_icon_html(is_expanded ? "chevron-down" : "chevron-up")}
      `;
    });
  }
  const retry_button = frag.querySelector(".sc-error-retry");
  if (retry_button && opts.retry && typeof opts.retry === "function") {
    retry_button.addEventListener("click", async () => {
      const container = retry_button.closest(".sc-error-container");
      container.classList.add("retrying");
      retry_button.disabled = true;
      retry_button.innerHTML = `${this.get_icon_html("loader")} Retrying...`;
      try {
        await opts.retry();
        container.remove();
      } catch (retry_error) {
        const new_error_frag = await render17.call(this, retry_error, opts);
        container.replaceWith(new_error_frag);
      }
    });
  }
  if (opts.auto_dismiss) {
    const dismiss_delay = typeof opts.auto_dismiss === "number" ? opts.auto_dismiss : 5e3;
    setTimeout(() => {
      const container = frag.querySelector(".sc-error-container");
      if (container) {
        container.classList.add("sc-error-fade-out");
        setTimeout(() => container.remove(), 300);
      }
    }, dismiss_delay);
  }
  return frag;
}

// node_modules/smart-chats/smart_thread.js
var SmartThread = class extends SmartSource {
  /**
   * @static
   * @property {Object} defaults - Default configuration for a new thread
   */
  static get defaults() {
    return {
      data: {
        created_at: null,
        responses: {},
        messages: {},
        branches: {},
        path: null
      }
    };
  }
  // Define the tools
  tools = {
    lookup: {
      type: "function",
      function: {
        name: "lookup",
        description: "Performs a semantic search of the user's data. Use this function to respond to queries like 'Based on my notes...' or any other request that requires surfacing relevant content.",
        parameters: {
          type: "object",
          properties: {
            hypotheticals: {
              type: "object",
              description: "Short hypothetical notes predicted to be semantically similar to the notes necessary to fulfill the user's request. Provide at least three hypotheticals per request. The hypothetical notes may contain paragraphs, lists, or checklists in markdown format. Each hypothetical note should begin with breadcrumbs indicating the anticipated folder(s), file name, and relevant headings separated by ' > ' (no slashes). Example: PARENT FOLDER NAME > CHILD FOLDER NAME > FILE NAME > HEADING 1 > HEADING 2 > HEADING 3: HYPOTHETICAL NOTE CONTENTS.",
              properties: {
                "1": {
                  type: "string"
                },
                "2": {
                  type: "string"
                },
                "3": {
                  type: "string"
                }
              },
              required: ["1", "2", "3"]
            }
          },
          required: ["hypotheticals"]
        }
      }
    }
  };
  /**
   * Imports the SmartSource by checking for updates and parsing content.
   * @async
   * @returns {Promise<void>}
   */
  async import() {
    this._queue_import = false;
    try {
      await this.source_adapter.import();
    } catch (err) {
      this.queue_import();
      console.error(err, err.stack);
    }
  }
  /**
   * Renders the thread interface
   * @async
   * @param {HTMLElement} [container] - Container element to render into
   * @returns {DocumentFragment} Rendered thread interface
   */
  async render(container = this.container, opts = {}) {
    const frag = await render16.call(this.smart_view, this, opts);
    if (container) {
      container.empty();
      if (container.classList.contains("sc-thread")) {
        container.replaceWith(frag);
      } else {
        container.appendChild(frag);
      }
    }
    return frag;
  }
  /**
   * Creates a new user message and adds it to the thread
   * @async
   * @param {string} content - The content of the user's message
   */
  async handle_message_from_user(content) {
    try {
      const new_msg_data = {
        thread_key: this.key,
        role: "user",
        content: [{
          type: "text",
          text: content.trim()
        }],
        context: {}
      };
      for (let i = 0; i < new_msg_data.content.length; i++) {
        const part = new_msg_data.content[i];
        if (part.type !== "text" || !part.text) continue;
        if (contains_internal_embedded_link(part.text)) {
          const internal_links = extract_internal_embedded_links(part.text);
          for (const [full_match, link_path] of internal_links) {
            const [before, after] = part.text.split(full_match);
            const embedded_part = {};
            const is_image = ["png", "jpg", "jpeg"].some((ext) => link_path.endsWith(ext));
            if (is_image) {
              embedded_part.type = "image_url";
              embedded_part.input = {
                image_path: link_path
              };
            } else {
              embedded_part.type = "text";
              embedded_part.input = {
                key: this.env.smart_sources.fs.get_link_target_path(link_path, "/")
              };
            }
            part.text = after;
            if (typeof before === "string" && before.trim().length) new_msg_data.content.splice(
              i,
              0,
              {
                type: "text",
                text: before
              },
              embedded_part
            );
          }
        }
      }
      for (let i = 0; i < new_msg_data.content.length; i++) {
        const part = new_msg_data.content[i];
        if (part.type !== "text" || !part.text) continue;
        if (contains_internal_link(part.text)) {
          const internal_links = extract_internal_links(part.text);
          new_msg_data.context.internal_links = internal_links.map((link) => {
            console.log("link", link);
            return this.env.smart_sources?.fs?.get_link_target_path(link, "/") || link;
          });
        }
        if (contains_folder_reference(part.text)) {
          const folders = Object.keys(this.env.smart_sources.fs.folders);
          const folder_refs = extract_folder_references(folders, part.text);
          new_msg_data.context.folder_refs = folder_refs;
        }
        if (contains_self_referential_keywords(part.text, this.language)) {
          new_msg_data.context.has_self_ref = true;
        }
      }
      await this.env.smart_messages.create_or_update(new_msg_data);
    } catch (error) {
      console.error("Error in handle_message_from_user:", error);
    }
  }
  async add_system_message(system_message) {
    if (typeof system_message === "string") {
      system_message = {
        type: "text",
        text: system_message
      };
    }
    if (!system_message.type) system_message.type = "text";
    const last_msg = this.messages[this.messages.length - 1];
    if (last_msg?.role === "system") {
      last_msg.content.push(system_message);
      last_msg.render();
    } else {
      await this.env.smart_messages.create_or_update({
        role: "system",
        content: [system_message],
        thread_key: this.key
      });
    }
  }
  /**
   * Processes and adds an AI response to the thread
   * @async
   * @param {Object} response - Raw response from the AI model
   */
  async handle_message_from_chat_model(response, opts = {}) {
    const choices = response.choices;
    const response_id = response.id;
    if (!response_id) return [];
    const msg_items = await Promise.all(choices.map(async (choice, index) => {
      const msg_data = {
        ...choice?.message || choice,
        // fallback on full choice to handle non-message choices
        thread_key: this.key,
        response_id
      };
      const msg = this.messages.find((msg2) => msg2.data.response_id === response_id);
      if (msg) {
        msg_data.key = msg.key;
      }
      return this.env.smart_messages.create_or_update(msg_data);
    }));
    return msg_items;
  }
  /**
   * Prepares the request payload for the AI model
   * @async
   * @returns {Object} Formatted request payload
   */
  async to_request() {
    const request2 = { messages: [] };
    for (const msg of this.messages) {
      if (this.settings.send_tool_output_in_user_message) {
        if (msg.is_last_message && msg.role === "tool") {
          continue;
        }
        if (msg.tool_calls && !msg.is_last_message) {
          continue;
        }
        if (msg.role === "user" && msg.next_message?.tool_calls?.length && !msg.next_message.is_last_message && msg.next_message.next_message?.role === "tool") {
          const message = { role: "user", content: [] };
          const tool_output = await msg.next_message.next_message.tool_call_output_to_request();
          console.log("tool_output", tool_output);
          message.content.push({ type: "text", text: tool_output });
          message.content.push(...(await msg.to_request()).content);
          request2.messages.push(message);
          continue;
        }
      }
      request2.messages.push(await msg.to_request());
      if (msg.context?.has_self_ref || msg.context?.folder_refs) {
        request2.tools = [this.tools["lookup"]];
        if (msg.is_last_message) request2.tool_choice = { type: "function", function: { name: "lookup" } };
      }
    }
    request2.temperature = 0.3;
    request2.top_p = 1;
    request2.presence_penalty = 0;
    request2.frequency_penalty = 0;
    if (request2.messages[request2.messages.length - 1]?.tool_call_id) {
      const last_user_msg = request2.messages.findLast((msg) => msg.role === "user");
      if (last_user_msg) {
        request2.messages = [
          ...request2.messages.filter((msg) => msg !== last_user_msg),
          last_user_msg
        ];
        console.log("moved last user message to the end of the request", request2.messages);
      }
    }
    return request2;
  }
  /**
   * Sends the current thread state to the AI model and processes the response
   * @async
   */
  async complete() {
    this.show_typing_indicator();
    const request2 = await this.to_request();
    if (this.chat_model.can_stream && !request2.tool_choice) {
      await this.chat_model.stream(request2, {
        chunk: this.chunk_handler.bind(this),
        done: this.done_handler.bind(this),
        error: this.error_handler.bind(this)
      });
    } else {
      const response = await this.chat_model.complete(request2);
      if (response.error) {
        return this.error_handler(response);
      }
      this.data.responses[response.id] = response;
      await this.handle_message_from_chat_model(response);
    }
    this.hide_typing_indicator();
  }
  /**
   * @description
   *  - renders the message
   */
  async chunk_handler(response) {
    const msg_items = await this.handle_message_from_chat_model(response);
    if (msg_items?.length > 0) await msg_items[0].render();
  }
  /**
   * @description
   *  - different from chunk_handler in that it calls init() instead of render()
   * 	- allows handling tool-calls in `message.init()`
   */
  async done_handler(response) {
    const msg_items = await this.handle_message_from_chat_model(response);
    this.data.responses[response.id] = response;
    await msg_items[0].init();
  }
  error_handler(response) {
    this.hide_typing_indicator();
    this.render_error(response);
    console.error("error_handler", response);
  }
  async render_error(response, container = this.messages_container) {
    const frag = await render17.call(this.smart_view, response);
    if (container) container.appendChild(frag);
    return frag;
  }
  /**
   * @property {Object} chat_model - The AI chat model instance
   * @readonly
   */
  get chat_model() {
    return this.collection.chat_model;
  }
  get created_at() {
    if (!this.data.created_at) this.data.created_at = Date.now();
    return this.data.created_at;
  }
  /**
   * @property {HTMLElement} container - Container element for the thread UI
   */
  get container() {
    return this.collection.container?.querySelector(".sc-thread");
  }
  get messages_container() {
    return this.container?.querySelector(".sc-message-container");
  }
  /**
   * @property {Array<SmartMessage>} messages - All messages in the thread
   * @readonly
   */
  get messages() {
    return Object.entries(this.data.messages || {}).sort((a, b) => a[1] - b[1]).map(([key, msg_i]) => this.env.smart_messages.get(this.key + "#" + key));
  }
  /**
   * @alias {Array<SmartMessage>} messages
   * @readonly
   */
  get blocks() {
    return this.messages;
  }
  get_key() {
    if (!this.data.key) this.data.key = "Untitled " + this.created_at;
    return this.data.key;
  }
  /**
   * @property {string} path - Path identifier for the thread
   * @readonly
   */
  get path() {
    if (!this.data.path) {
      this.data.path = this.collection.source_dir + "/" + this.key + "." + this.source_adapter.extension;
    }
    return this.data.path;
  }
  get language() {
    return this.settings.language || "en";
  }
  /**
   * Processes base64 encoding for image files
   * @async
   * @param {string} file_path - Path to the image file
   * @returns {string} Base64 encoded image data URL
   */
  async process_image_to_base64(file_path) {
    const file = this.env.smart_connections_plugin?.app.vault.getFileByPath(file_path);
    if (!file) return null;
    const base642 = await this.env.smart_sources.fs.read(file.path, "base64");
    return `data:image/${file.extension};base64,${base642}`;
  }
  /**
   * Queues the thread for saving via the collection.
   * @returns {void}
   */
  queue_save() {
    if (this.messages.length === 0) return;
    this._queue_save = true;
    this.collection?.queue_save();
  }
  async save() {
    await this.source_adapter.save();
  }
  async rename(new_name) {
    await this.source_adapter.rename(new_name);
  }
  /**
   * Get all branches for a specific message index
   * @param {number} msg_i - Message index to get branches for
   * @returns {Array<Object>} Array of branch message objects
   */
  get_branches(msg_i) {
    return this.data.branches?.[msg_i] || [];
  }
  /**
   * Get the latest branch for a specific message index
   * @param {number} msg_i - Message index to get latest branch for
   * @returns {Object|null} Latest branch message object or null if no branches exist
   */
  get_latest_branch(msg_i) {
    const branches = this.get_branches(msg_i);
    return branches.length > 0 ? branches[branches.length - 1] : null;
  }
  /**
   * Create a new branch from a specific message index
   * @param {number} msg_i - Message index to branch from
   * @param {Object} branch_messages - Messages to store in the branch
   */
  create_branch(msg_i, branch_messages) {
    if (!this.data.branches) this.data.branches = {};
    if (!this.data.branches[msg_i]) this.data.branches[msg_i] = [];
    this.data.branches[msg_i].push(branch_messages);
    this.queue_save();
  }
  move_to_branch(msg_i, branch_messages) {
    this.create_branch(msg_i, branch_messages);
    Object.keys(branch_messages).forEach((id) => delete this.data.messages[id]);
    this.queue_save();
  }
  /**
   * Cycles to the next branch for a given message index
   * @param {number} msg_i - Message index to cycle branches for
   * @returns {Promise<void>}
   */
  async cycle_branch(msg_i) {
    if (!this.data.branches) this.data.branches = {};
    if (!this.data.branches[msg_i]) this.data.branches[msg_i] = [];
    const current_msg = this.messages.find((msg) => this.data.messages[msg.id] === msg_i);
    if (!current_msg) return console.warn("no current message found for msg_i", msg_i);
    const current_messages = Object.entries(this.data.messages).filter(([_, _msg_i]) => _msg_i >= msg_i).reduce((acc, [id, _msg_i]) => ({ ...acc, [id]: _msg_i }), {});
    this.move_to_branch(msg_i, current_messages);
    const branch = this.data.branches?.[msg_i]?.shift();
    this.data.messages = {
      ...this.data.messages,
      ...branch
    };
    await this.render();
    this.queue_save();
  }
  /**
   * Shows the typing indicator
   * @private
   */
  show_typing_indicator() {
    const indicator = this.container?.querySelector(".sc-typing-indicator");
    if (indicator) {
      indicator.classList.add("visible");
    }
  }
  /**
   * Hides the typing indicator
   * @private
   */
  hide_typing_indicator() {
    const indicator = this.container?.querySelector(".sc-typing-indicator");
    if (indicator) {
      indicator.classList.remove("visible");
    }
  }
};

// node_modules/smart-chats/smart_messages.js
var SmartMessages = class extends SmartBlocks {
  /**
   * Override for processing load queue
   * @override
   */
  process_load_queue() {
  }
  /**
   * Override for processing import queue
   * @override
   */
  process_import_queue() {
  }
  /**
   * @property {string} data_folder - Path to message storage
   * @readonly
   */
  get data_folder() {
    return this.env.opts.env_path + (this.env.opts.env_path ? "/" : "") + "multi/chats";
  }
  /**
   * Override for initialization
   * @override
   */
  init() {
  }
};

// node_modules/smart-chats/components/message.js
function build_html12(message, opts = {}) {
  const content = Array.isArray(message.content) ? message.content.map((part) => {
    if (part.type === "image_url") {
      return " ![[" + part.input.image_path + "]] ";
    }
    if (part.type === "text" && part.input?.key?.length) return " ![[" + part.input.key + "]] ";
    if (part.type === "text" && part.text?.length) return part.text;
  }).join("\n") : message.content;
  const branches = message.thread.get_branches(message.msg_i);
  const has_branches = branches && branches.length > 0;
  return `
    <div class="sc-message ${message.role}" id="${message.data.id}">
      <div class="sc-message-content" data-content="${encodeURIComponent(content)}">
        <span>${content}</span>
        <div class="sc-msg-buttons">
          <span class="sc-msg-button" title="Copy message to clipboard">${this.get_icon_html("copy")}</span>
          ${has_branches ? `
            <span class="sc-msg-button cycle-branch" title="Cycle through message variations">${message.branch_i.split("-").pop()} / ${branches.length + 1} ${this.get_icon_html("chevron-right")}</span>
          ` : ""}
          ${message.role === "assistant" ? `
            <span class="sc-msg-button regenerate" title="Regenerate response">${this.get_icon_html("refresh-cw")}</span>
          ` : `
            <span class="sc-msg-button edit" title="Edit message">${this.get_icon_html("edit")}</span>
          `}
        </div>
      </div>
      ${message.role === "user" ? `<textarea class="sc-message-edit" style="display: none;">${content}</textarea>` : ""}
    </div>
  `;
}
async function render18(message, opts = {}) {
  const html = build_html12.call(this, message, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process16.call(this, message, frag, opts);
}
async function post_process16(message, frag, opts) {
  const copy_button = frag.querySelector(".sc-msg-button:not(.regenerate)");
  if (copy_button) {
    copy_button.addEventListener("click", () => {
      navigator.clipboard.writeText(message.content).then(() => {
        console.log("Message copied to clipboard");
      }).catch((err) => {
        console.error("Failed to copy message: ", err);
      });
    });
  }
  const regenerate_button = frag.querySelector(".sc-msg-button.regenerate");
  if (regenerate_button) {
    regenerate_button.addEventListener("click", async () => {
      const thread = message.thread;
      const msg_i = thread.data.messages[message.data.id];
      if (!thread.data.branches) thread.data.branches = {};
      if (!thread.data.branches[msg_i]) thread.data.branches[msg_i] = [];
      const branch_messages = {};
      Object.entries(thread.data.messages).filter(([_, i]) => i >= msg_i).forEach(([key, i]) => {
        branch_messages[key] = i;
        delete thread.data.messages[key];
      });
      thread.data.branches[msg_i].push(branch_messages);
      await thread.render();
      await thread.complete();
    });
  }
  const cycle_branch_button = frag.querySelector(".sc-msg-button.cycle-branch");
  if (cycle_branch_button) {
    cycle_branch_button.addEventListener("click", async () => {
      await message.thread.cycle_branch(message.msg_i);
    });
  }
  const edit_button = frag.querySelector(".sc-msg-button.edit");
  if (edit_button) {
    const msg_content = frag.querySelector(".sc-message-content");
    const edit_textarea = frag.querySelector(".sc-message-edit");
    edit_button.addEventListener("click", async () => {
      const is_editing = edit_textarea.style.display === "block";
      if (is_editing) {
        const new_content = edit_textarea.value.trim();
        if (new_content !== message.content) {
          const thread = message.thread;
          const msg_i = thread.data.messages[message.data.id];
          const current_messages = Object.entries(thread.data.messages).filter(([_, i]) => i >= msg_i).reduce((acc, [id, i]) => ({ ...acc, [id]: i }), {});
          thread.move_to_branch(msg_i, current_messages);
          msg_content.querySelector("span").textContent = new_content;
          msg_content.setAttribute("data-content", encodeURIComponent(new_content));
          edit_textarea.style.display = "none";
          msg_content.style.display = "block";
          edit_button.innerHTML = this.get_icon_html("edit");
          edit_button.title = "Edit message";
          await thread.handle_message_from_user(new_content);
          await thread.render();
        } else {
          edit_textarea.style.display = "none";
          msg_content.style.display = "block";
          edit_button.innerHTML = this.get_icon_html("edit");
          edit_button.title = "Edit message";
        }
      } else {
        edit_textarea.style.display = "block";
        edit_button.innerHTML = this.get_icon_html("check");
        edit_button.title = "Save changes";
        edit_textarea.focus();
      }
    });
    edit_textarea.addEventListener("keydown", async (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        edit_button.click();
      }
    });
  }
  const msg_span = frag.querySelector(".sc-message-content > span:first-child");
  const markdown_rendered_frag = await this.render_markdown(msg_span.textContent, message);
  msg_span.innerHTML = "";
  msg_span.appendChild(markdown_rendered_frag);
  return frag;
}

// node_modules/smart-chats/components/context.js
function build_html13(message, opts = {}) {
  const lookup_results = message.tool_call_output || [];
  if (lookup_results.length === 0) {
    return "";
  }
  const review_context = message.settings?.review_context === true;
  return `
    <div class="sc-context-container" id="${message.data.id}">
      <div class="sc-context-header" tabindex="0" role="button" aria-expanded="false" aria-controls="context-list-${message.data.id}">
        <span>${this.get_icon_html("info")} Context (${lookup_results.length})</span>
        <span class="sc-context-toggle-icon">${this.get_icon_html("chevron-down")}</span>
      </div>
      <ul class="sc-context-list" id="context-list-${message.data.id}" hidden>
        ${lookup_results.map((result, index) => `
          <li class="sc-context-item" data-index="${index}">
            ${review_context ? `<button class="sc-context-remove-btn" title="Remove">${this.get_icon_html("x")}</button>` : ""}
            <span class="sc-context-item-path">${result.key}</span>
            <span class="sc-context-item-score">Score: ${result.score.toFixed(2)}</span>
          </li>
        `).join("")}
        ${review_context ? `
          <li class="sc-context-submit">
            <button class="sc-context-submit-btn">Submit</button>
          </li>
        ` : ""}
      </ul>
    </div>
  `;
}
async function render19(message, opts = {}) {
  const html = build_html13.call(this, message, opts);
  if (!html) return document.createDocumentFragment();
  const frag = this.create_doc_fragment(html);
  return await post_process17.call(this, message, frag, opts);
}
async function post_process17(message, frag, opts) {
  const header = frag.querySelector(".sc-context-header");
  const list = frag.querySelector(".sc-context-list");
  const toggle_icon = frag.querySelector(".sc-context-toggle-icon");
  const review_context = message.settings?.review_context === true;
  if (header && list && toggle_icon) {
    if (review_context) header.setAttribute("aria-expanded", "true");
    else header.setAttribute("aria-expanded", "false");
    header.addEventListener("click", () => {
      const is_expanded = header.getAttribute("aria-expanded") === "true";
      if (is_expanded) {
        header.setAttribute("aria-expanded", "false");
      } else {
        header.setAttribute("aria-expanded", "true");
      }
    });
  }
  if (review_context) {
    const remove_buttons = frag.querySelectorAll(".sc-context-remove-btn");
    remove_buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const item = btn.closest(".sc-context-item");
        const index = parseInt(item.getAttribute("data-index"), 10);
        message.tool_call_output.splice(index, 1);
        message.render();
      });
    });
    const submit_button = frag.querySelector(".sc-context-submit-btn");
    if (submit_button) {
      submit_button.addEventListener("click", async (e) => {
        e.stopPropagation();
        const container = e.target.closest(".sc-context-container");
        container.querySelectorAll(".sc-context-remove-btn").forEach((btn) => btn.remove());
        const submit_container = submit_button.closest(".sc-context-submit");
        if (submit_container) {
          submit_container.remove();
        }
        header.setAttribute("aria-expanded", "false");
        await message.thread.complete();
      });
    }
  }
  return frag;
}

// node_modules/smart-chats/components/tool_calls.js
function build_html14(message, opts = {}) {
  const tool_calls = message.tool_calls || [];
  if (tool_calls.length === 0) {
    return "";
  }
  return `
    <div class="sc-tool-calls-container" id="${message.data.id}">
      ${tool_calls.map((tool_call, index) => `
        <div class="sc-tool-call">
          <div class="sc-tool-call-header" tabindex="0" role="button" aria-expanded="false" aria-controls="${message.data.id}-content">
            <span>${tool_call.function.name}</span>
            <span class="sc-tool-call-toggle-icon">${this.get_icon_html("chevron-down")}</span>
          </div>
          <div class="sc-tool-call-content" id="${message.data.id}-content" hidden>
            <pre><code class="language-json">${JSON.stringify(typeof tool_call.function.arguments === "string" ? JSON.parse(tool_call.function.arguments) : tool_call.function.arguments, null, 2)}</code></pre>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}
async function render20(message, opts = {}) {
  const html = build_html14.call(this, message, opts);
  if (!html) return document.createDocumentFragment();
  const frag = this.create_doc_fragment(html);
  return await post_process18.call(this, message, frag, opts);
}
async function post_process18(message, frag, opts) {
  const tool_call_headers = frag.querySelectorAll(".sc-tool-call-header");
  tool_call_headers.forEach((header) => {
    const content = header.nextElementSibling;
    const toggle_icon = header.querySelector(".sc-tool-call-toggle-icon");
    header.addEventListener("click", () => {
      const is_expanded = header.getAttribute("aria-expanded") === "true";
      if (is_expanded) {
        header.setAttribute("aria-expanded", "false");
        content.hidden = true;
      } else {
        header.setAttribute("aria-expanded", "true");
        content.hidden = false;
      }
    });
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });
  return frag;
}

// node_modules/smart-chats/components/system_message.js
function build_html15(message, opts = {}) {
  return `
    <div class="sc-system-message-container" id="${message.data.id}">
      <div class="sc-system-message-header" tabindex="0" role="button" aria-expanded="false" aria-controls="${message.data.id}-content">
        <span>${this.get_icon_html("settings")} System Message</span>
        <span class="sc-system-message-toggle-icon">${this.get_icon_html("chevron-down")}</span>
      </div>
      <div class="sc-system-message-content" id="${message.data.id}-content" hidden>
        <div class="sc-system-message-text">
          <pre>${message.content.map((part) => part.text || part.input?.key).join("\n")}</pre>
        </div>
        <button class="sc-system-message-copy" title="Copy system message">
          ${this.get_icon_html("copy")}
        </button>
      </div>
    </div>
  `;
}
async function render21(message, opts = {}) {
  const html = build_html15.call(this, message, opts);
  const frag = this.create_doc_fragment(html);
  return await post_process19.call(this, message, frag, opts);
}
async function post_process19(message, frag, opts) {
  const header = frag.querySelector(".sc-system-message-header");
  const content = frag.querySelector(".sc-system-message-content");
  const toggle_icon = frag.querySelector(".sc-system-message-toggle-icon");
  const copy_button = frag.querySelector(".sc-system-message-copy");
  const text_container = frag.querySelector(".sc-system-message-text");
  if (header && content && toggle_icon) {
    header.addEventListener("click", () => {
      const is_expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", !is_expanded);
      content.hidden = is_expanded;
      toggle_icon.style.transform = is_expanded ? "" : "rotate(180deg)";
    });
  }
  if (copy_button && text_container) {
    copy_button.addEventListener("click", () => {
      navigator.clipboard.writeText(text_container.textContent).then(() => {
        copy_button.classList.add("sc-copied");
        setTimeout(() => {
          copy_button.classList.remove("sc-copied");
        }, 1e3);
      }).catch((err) => {
        console.error("Failed to copy system message:", err);
      });
    });
  }
  if (text_container && typeof message.content === "string") {
    const markdown_rendered_frag = await this.render_markdown(message.content, message);
    text_container.innerHTML = "";
    text_container.appendChild(markdown_rendered_frag);
  }
  return frag;
}

// node_modules/smart-chats/smart_message.js
var SmartMessage = class extends SmartBlock {
  /**
   * @static
   * @property {Object} defaults - Default data object for a new message
   * @returns {Object}
   * @property {string} thread_key - Key for the thread
   * @property {string} role - Message role ('user' or 'assistant')
   * @property {number} msg_i - Message index
   * @property {string} id - Message ID
   * @property {Array<Object>|null} content - Message content
   * @property {Array<Object>|null} tool_calls - Tool calls
   * @property {string|null} tool_call_id - Tool call ID
   * @property {Object|null} context - Message context
   */
  static get defaults() {
    return {
      data: {
        thread_key: null,
        content: null,
        role: null,
        tool_calls: null,
        tool_call_id: null,
        msg_i: null,
        id: null,
        context: {},
        tool_call_output: null
      }
    };
  }
  /**
   * Generates a unique key for the message
   * @returns {string} Unique message identifier
   */
  get_key() {
    return `${this.data.thread_key}#${this.id}`;
  }
  get msg_i() {
    if (!this.data.msg_i) {
      const msg_i = Object.keys(this.thread.data.messages || {}).length + 1;
      this.data.msg_i = msg_i;
    }
    return this.data.msg_i;
  }
  get branch_i() {
    if (!this.data.branch_i) {
      const branch_i = Date.now() + "-" + ((this.thread.data.branches?.[this.msg_i] || []).length + 1);
      this.data.branch_i = branch_i;
    }
    return this.data.branch_i;
  }
  get id() {
    if (!this.data.id) {
      this.data.id = `${this.role}-${this.msg_i}-${this.branch_i}`;
    }
    return this.data.id;
  }
  /**
   * Initializes the message and triggers processing if it's a user message
   * @async
   */
  async init() {
    while (!this.thread) await new Promise((resolve) => setTimeout(resolve, 100));
    if (!this.thread.data.messages[this.id]) {
      this.thread.data.messages[this.id] = this.msg_i;
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    await this.render();
    if (this.role === "user") {
      await this.thread.complete();
    } else if (this.tool_calls?.length > 0) {
      await this.handle_tool_calls();
    } else if (this.role === "tool") {
      if (!this.settings.review_context) {
        this.thread.complete();
      }
    }
    this.queue_save();
  }
  /**
   * Queues the message for saving via the thread.
   * @returns {void}
   */
  queue_save() {
    this._queue_save = true;
    this.thread?.queue_save();
  }
  /**
   * Renders the message in the UI
   * @async
   * @param {HTMLElement} [container] - Container element to render into
   * @returns {DocumentFragment} Rendered message interface
   */
  async render(container = this.thread.messages_container) {
    let frag;
    if (this.role === "system") {
      frag = await render21.call(this.smart_view, this);
    } else if (this.tool_calls?.length > 0) {
      frag = await render20.call(this.smart_view, this);
    } else if (this.role === "tool") {
      frag = await render19.call(this.smart_view, this);
    } else {
      frag = await render18.call(this.smart_view, this);
    }
    if (container) {
      this.elm = container.querySelector(`#${this.data.id}`);
      if (this.elm) this.elm.replaceWith(frag);
      else {
        container.appendChild(frag);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    }
    return frag;
  }
  /**
   * Fetches and processes internal links, embedding images as Base64 data URLs.
   * @async
   * @param {Array<string>} paths - Array of paths to fetch content from
   * @returns {Array<Object>} contents - Array of content objects:
   * @returns {string} contents[].type - Content type ('text' or 'image')
   * @returns {string} [contents[].content] - Text content if type is 'text'
   * @returns {string} [contents[].image_url] - Base64 image URL if type is 'image'
   * @throws {Error} When unable to fetch or process content
   */
  async fetch_content(paths) {
    try {
      const image_extensions = ["png", "jpg", "jpeg", "gif", "svg", "webp", "heic", "heif", "ico"];
      const contents = await Promise.all(paths.map(async (path) => {
        if (path) {
          try {
            const item = this.env.smart_blocks.get(path) || this.env.smart_sources.get(path);
            const file_extension = path.split(".").pop().toLowerCase();
            if (image_extensions.includes(file_extension)) {
              const image_data = await this.env.smart_sources.fs.read(path, "base64");
              const base64_image = `data:image/${file_extension};base64,${image_data}`;
              return { type: "image", image_url: base64_image };
            } else {
              return { type: "text", content: await item.read() };
            }
          } catch (e) {
            console.error(`Error fetching content for ${path}:`, e);
            return { type: "error", content: "Failed to fetch content" };
          }
        }
      }));
      return contents;
    } catch (error) {
      console.error(`Error fetching internal links content:`, error);
      return [];
    }
  }
  async handle_tool_calls() {
    for (const tool_call of this.tool_calls) {
      if (tool_call.function.name === "lookup") {
        await this.handle_lookup_tool_call(tool_call);
      }
    }
  }
  build_lookup_params(args) {
    const params = {};
    args = typeof args === "string" ? JSON.parse(args) : args;
    if (Array.isArray(args.hypotheticals)) {
      params.hypotheticals = args.hypotheticals;
    } else if (typeof args.hypotheticals === "object" && args.hypotheticals !== null) {
      params.hypotheticals = Object.values(args.hypotheticals);
    } else if (typeof args.hypotheticals === "string") {
      params.hypotheticals = [args.hypotheticals];
    } else {
      console.warn("Invalid hypotheticals provided for lookup tool call, using user message as lookup context, args:" + JSON.stringify(args));
      params.hypotheticals = [this.content];
    }
    params.hypotheticals = params.hypotheticals.map((h) => {
      if (typeof h === "string") return h;
      else return JSON.stringify(h);
    });
    if (this.previous_message.context.folder_refs) params.filter = {
      key_starts_with_any: this.previous_message.context.folder_refs
    };
    params.filter = {
      ...params.filter || {},
      limit: this.settings.lookup_limit || 10
    };
    return params;
  }
  async handle_lookup_tool_call(tool_call) {
    const params = this.build_lookup_params(tool_call.function.arguments);
    const lookup_collection = this.env.smart_blocks.settings.embed_blocks ? this.env.smart_blocks : this.env.smart_sources;
    const lookup_results = (await lookup_collection.lookup(params)).map((result) => ({
      key: result.item.key,
      score: result.score
    }));
    const msg_i = Object.keys(this.thread.data.messages || {}).length + 1;
    const branch_i = (this.thread.data.branches?.[msg_i] || []).length + 1;
    await this.env.smart_messages.create_or_update({
      thread_key: this.thread.key,
      tool_call_id: tool_call.id,
      tool_name: tool_call.function.name,
      tool_call_output: lookup_results,
      role: "tool",
      response_id: tool_call.id,
      id: `tool-${msg_i}-${branch_i}`
    });
  }
  /**
   * Converts the message to a request payload
   * @returns {Array<Object>} Request payload
   */
  async to_request() {
    const this_message = { role: this.role, content: [] };
    if (this.context.internal_links && this.context.internal_links.length > 0) {
      const internal_links_content = await this.fetch_content(this.context.internal_links);
      if (internal_links_content) {
        let context_content = "";
        this.context.internal_links.forEach((link, index) => {
          if (internal_links_content[index].type === "text") {
            if (!context_content.length) context_content += `Context specified in message:`;
            context_content += `
-----------------------
`;
            context_content += `/${link}
`;
            context_content += `---
`;
            context_content += `${internal_links_content[index].content}
`;
            context_content += `-----------------------
`;
          } else if (internal_links_content[index].type === "image") {
            this_message.content.push({
              type: "image_url",
              image_url: {
                url: internal_links_content[index].image_url
              }
            });
          }
        });
        if (context_content.length > 0) this_message.content.push({
          type: "text",
          text: context_content
        });
      }
    }
    if (typeof this.content === "string") {
      this_message.content.push({
        type: "text",
        text: this.content
      });
    } else if (Array.isArray(this.content)) {
      for (const part of this.content) {
        if (part.type === "text") {
          let text = part.text || "";
          if (!text && part.input?.key) {
            text = await this.env.smart_sources.get(part.input.key)?.read() || "";
          }
          if (!text && part.input?.key) {
            text = await this.env.smart_sources.fs.read(part.input.key) || "";
          }
          this_message.content.push({
            type: "text",
            text
          });
        } else if (part.type === "image_url") {
          const base64_img = await this.env.smart_sources.fs.read(part.input.image_path, "base64");
          if (base64_img) {
            const extension = part.input.image_path.split(".").pop();
            const base64_url = `data:image/${extension};base64,${base64_img}`;
            this_message.content.push({
              type: "image_url",
              image_url: {
                url: base64_url
              }
            });
          } else {
            console.warn(`Image not found: ${part.input.image_url}`);
            this_message.content.push({
              type: "text",
              text: `Image not found: ${part.input.image_url}`
            });
          }
        }
      }
    }
    if (this.tool_calls?.length) {
      this_message.tool_calls = this.tool_calls;
      delete this_message.content;
    }
    if (this.tool_call_id) this_message.tool_call_id = this.tool_call_id;
    if (this.tool_call_output?.length) this_message.content = await this.tool_call_output_to_request();
    return this_message;
  }
  async tool_call_output_to_request() {
    if (this.tool_name === "lookup") {
      if (this.settings.tool_call_output_as_json) {
        const lookup_collection = this.tool_call_output[0]?.key.includes("#") ? this.env.smart_blocks : this.env.smart_sources;
        const tool_call_output = await Promise.all(this.tool_call_output.map(async (result) => ({ ...result, content: await lookup_collection.get(result.key).read() })));
        return JSON.stringify(tool_call_output);
      }
      const lookup_content = await this.fetch_content(this.tool_call_output.map((result) => result.key));
      const prefix_prompt = get_translated_context_prefix_prompt(this.thread.language);
      let lookup_output = `${prefix_prompt}
`;
      this.tool_call_output.forEach((result, index) => {
        if (lookup_content[index]?.type === "text") {
          lookup_output += `-----------------------
`;
          lookup_output += `/${result.key} (relevance score: ${result.score})
`;
          lookup_output += `---
`;
          lookup_output += `${lookup_content[index].content}
`;
          lookup_output += `-----------------------

`;
        }
      });
      const suffix_prompt = get_translated_context_suffix_prompt(this.thread.language);
      return lookup_output + suffix_prompt;
    }
  }
  /**
   * @property {string} content - Message content
   */
  get content() {
    return this.data.content;
  }
  set content(value) {
    this.data.content = value;
  }
  /**
   * @property {string} role - Message sender role ('user' or 'assistant')
   */
  get role() {
    return this.data.role;
  }
  set role(value) {
    this.data.role = value;
  }
  /**
   * @property {Object} tool_calls - Tool calls
   */
  get tool_calls() {
    return this.data.tool_calls;
  }
  set tool_calls(value) {
    this.data.tool_calls = value;
  }
  /**
   * @property {string} tool_call_id - Tool call ID
   */
  get tool_call_id() {
    return this.data.tool_call_id;
  }
  set tool_call_id(value) {
    this.data.tool_call_id = value;
  }
  /**
   * @property {Array<Object>} tool_call_output - Tool call output
   */
  get tool_call_output() {
    return this.data.tool_call_output;
  }
  set tool_call_output(value) {
    this.data.tool_call_output = value;
  }
  /**
   * @property {string} tool_name - Tool name
   */
  get tool_name() {
    return this.data.tool_name;
  }
  set tool_name(value) {
    this.data.tool_name = value;
  }
  /**
   * @property {Object} context - Message context data
   */
  get context() {
    return this.data.context;
  }
  set context(value) {
    this.data.context = value;
  }
  /**
   * @property {SmartThread} thread - Parent thread reference
   * @readonly
   */
  get thread() {
    return this.source;
  }
  /**
   * @property {SmartMessage} next_message - Next message reference
   * @readonly
   */
  get next_message() {
    return this.thread.messages[this.msg_i];
  }
  /**
   * @property {SmartMessage} previous_message - Previous message reference
   * @readonly
   */
  get previous_message() {
    return this.thread.messages[this.msg_i - 2];
  }
  /**
   * @property {boolean} is_last_message - Whether the message is the last message in the thread
   * @readonly
   */
  get is_last_message() {
    return this.msg_i === Object.keys(this.thread.messages).length;
  }
  /**
   * @property {string} source_key - Key for source reference
   * @readonly
   */
  get source_key() {
    return this.data.thread_key;
  }
  /**
   * @property {SmartThreads} source_collection - Collection reference
   * @readonly
   */
  get source_collection() {
    return this.env.smart_threads;
  }
  /**
   * @property {string} path - Path identifier for the message
   * @readonly
   */
  get path() {
    return this.data.thread_key;
  }
  get settings() {
    return this.thread.settings;
  }
  get has_image() {
    return this.content.some((part) => part.type === "image_url");
  }
};

// node_modules/smart-chats/adapters/_adapter.js
var ThreadSourceAdapter = class {
  /**
   * @constructor
   * @param {SmartThread} item - The SmartThread instance this adapter is attached to
   */
  constructor(item) {
    this.item = item;
  }
  /**
   * @property {Object} data - The underlying data of the SmartThread
   * @readonly
   */
  get data() {
    return this.item.data;
  }
  get fs() {
    return this.item.collection.fs;
  }
  get created_at() {
    return this.item.created_at;
  }
  get file_path() {
    return this.item.path;
  }
  /**
   * @property {Object} env - The environment configuration
   * @readonly
   */
  get env() {
    return this.item.env;
  }
  /**
   * Converts adapter file format to `item.source_data{}` format
   * @abstract
   * @throws {Error} Must be implemented by subclasses
   */
  to_source_data() {
    throw new Error("to_source_data() not implemented");
  }
  /**
   * Converts `item.source_data{}` format to adapter file format
   * @abstract
   * @throws {Error} Must be implemented by subclasses
   */
  from_source_data(source_data) {
    throw new Error("from_source_data() not implemented");
  }
  async import() {
    const source_data = await this.read();
    if (!source_data) return console.warn("no source data found for", this);
    this.from_source_data(source_data);
  }
  async read() {
    return await this.fs.read(this.file_path);
  }
  async save() {
    if (Object.keys(this.data.messages).length) {
      this.fs.write(this.file_path, this.to_source_data());
    }
  }
  async rename(new_name) {
    const old_key = this.item.key;
    const old_file_path = this.file_path;
    this.item.messages.forEach((msg) => {
      msg.data.key = msg.key.replace(old_key, new_name);
      msg.data.thread_key = new_name;
      this.item.env.smart_messages.items[msg.key] = msg;
    });
    this.data.path = null;
    this.data.key = new_name;
    this.item.collection.items[new_name] = this.item;
    delete this.item.collection.items[old_key];
    await this.save();
    await this.fs.remove(old_file_path);
    this.item.render();
  }
};

// node_modules/smart-chats/adapters/json.js
var EnvJsonThreadSourceAdapter = class extends ThreadSourceAdapter {
  static extension = "json";
  extension = "json";
  to_source_data() {
    const all_block_keys = [...Object.keys(this.data.messages)];
    if (Object.keys(this.data.branches).length) {
      const branches = Object.values(this.data.branches);
      const branch_block_keys = {};
      branches.forEach((branch) => {
        branch.forEach((branch_messages) => {
          Object.keys(branch_messages).forEach((key) => {
            branch_block_keys[key] = true;
          });
        });
      });
      all_block_keys.push(...Object.keys(branch_block_keys));
    }
    const blocks = all_block_keys.map((sub_key) => {
      const block_key = this.item.key + "#" + sub_key;
      const block = this.item.env.smart_messages.get(block_key);
      if (!block) {
        console.warn("block not found", block_key);
        return null;
      }
      return {
        ...block.data,
        key: block_key
      };
    }).filter((block) => block);
    return JSON.stringify({
      ...this.item.data,
      blocks
    }, null, 2);
  }
  from_source_data(source_data) {
    const parsed_data = JSON.parse(source_data);
    this.item.data = { ...parsed_data, blocks: void 0 };
    parsed_data.blocks.forEach((block) => {
      this.item.env.smart_messages.items[block.key] = new this.item.env.smart_messages.item_type(
        this.item.env,
        block
      );
    });
  }
};

// src/smart_env.config.js
var smart_env_config = {
  global_ref: window,
  env_path: "",
  // env_data_dir: '.smart-env', // added in Plugin class
  collections: {
    smart_collections: {
      data_adapter: SmartCollectionMultiFileDataAdapter
    },
    smart_sources: {
      class: SmartSources,
      data_adapter: SmartCollectionMultiFileDataAdapter,
      source_adapters: {
        "md": MarkdownSourceAdapter,
        "txt": MarkdownSourceAdapter,
        // temp
        "canvas": MarkdownSourceAdapter,
        // temp
        "default": SourceAdapter
      }
    },
    smart_blocks: {
      class: SmartBlocks
    },
    smart_directories: {
      class: SmartDirectories
    },
    smart_threads: {
      class: SmartThreads,
      data_adapter: SmartCollectionMultiFileDataAdapter,
      source_adapters: {
        "json": EnvJsonThreadSourceAdapter,
        "default": EnvJsonThreadSourceAdapter
      }
    },
    smart_messages: {
      class: SmartMessages
    }
  },
  item_types: {
    SmartSource,
    SmartBlock,
    SmartDirectory,
    SmartThread,
    SmartMessage
  },
  modules: {
    smart_chat_model: {
      class: SmartChatModel,
      adapters: {
        openai: SmartChatModelOpenaiAdapter,
        anthropic: SmartChatModelAnthropicAdapter,
        // cohere: SmartChatModelCohereAdapter,
        gemini: SmartChatModelGeminiAdapter,
        open_router: SmartChatModelOpenRouterAdapter,
        custom: SmartChatModelCustomAdapter,
        ollama: SmartChatModelOllamaAdapter
      },
      http_adapter: new SmartHttpRequest3({
        adapter: SmartHttpObsidianRequestAdapter3,
        obsidian_request_url: import_obsidian9.requestUrl
      })
    },
    smart_embed_model: {
      class: SmartEmbedModel,
      adapters: {
        transformers: SmartEmbedTransformersIframeAdapter,
        openai: SmartEmbedOpenAIAdapter
      }
    },
    smart_fs: {
      class: SmartFs,
      adapter: SmartFsObsidianAdapter
    },
    smart_view: {
      class: SmartView,
      adapter: SmartViewObsidianAdapter
    },
    smart_notices: {
      class: SmartNotices,
      adapter: import_obsidian8.Notice
    },
    smart_settings: {
      class: SmartSettings
    }
  },
  components: {
    smart_env: {
      settings: render6
    },
    smart_sources: {
      connections: render9,
      lookup: render10,
      settings: render5
    },
    smart_blocks: {
      settings: render5
    },
    smart_threads: {
      settings: render2
    },
    smart_directories: {
      directories: render13
    },
    smart_chat_model: {
      settings: render11
    },
    smart_embed_model: {
      settings: render11
    }
  },
  default_settings: {
    is_obsidian_vault: true,
    smart_blocks: {
      embed_blocks: true
    },
    smart_sources: {
      embed_model: {
        model_key: "TaylorAI/bge-micro-v2",
        legacy_transformers: true
      }
    },
    file_exclusions: "Untitled",
    folder_exclusions: "smart-chats",
    smart_view_filter: {
      render_markdown: true,
      show_full_path: false
    }
  }
};

// src/default_settings.js
function default_settings() {
  return {
    settings: {
      new_user: true,
      // v2.2
      legacy_transformers: false,
      enable_mobile: true,
      actions: {
        "lookup": true
      },
      smart_notices: {},
      // v2.1
      system_prompts_folder: "smart prompts",
      smart_chat_folder: "smart-chats",
      smart_chat_folder_last: "smart-chats",
      chat_model_platform_key: "open_router",
      open_router: {},
      // V1
      api_key: "",
      excluded_headings: "",
      folder_exclusions: "smart-chats",
      show_full_path: false,
      expanded_view: true,
      language: "en",
      version: ""
    }
  };
}

// src/index.js
var import_ejs_min2 = __toESM(require_ejs_min(), 1);

// build/views.json
var views_default = {
  attribution: '<div class="sc-brand">\n  <svg viewBox="0 0 100 100" class="svg-icon smart-connections">\n    <path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"></path>\n    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"></path>\n    <circle cx="50" cy="20" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="40" r="9" fill="currentColor"></circle>\n    <circle cx="80" cy="70" r="9" fill="currentColor"></circle>\n    <circle cx="50" cy="100" r="9" fill="currentColor"></circle>\n    <circle cx="30" cy="50" r="9" fill="currentColor"></circle>\n  </svg>\n  <p><a style="font-weight: 700;" href="https://smartconnections.app/">Smart Connections</a></p>\n</div>',
  sc_change: '<div class="sc-change">\n  <div class="sc-variation">\n    <div class="new-content"></div>\n    <button>Accept</button>\n  </div>\n  <div class="sc-variation">\n    <div class="old-content"></div>\n    <button>Reject</button>\n  </div>\n  <div class="sc-change-footer">\n    <i>Time saved: <%= time_saved %></i>\n    <%- this.attribution %>\n  </div>\n</div>\n\n',
  smart_note_inspect: `<h2>Blocks</h2>
<% if(note.blocks.length === 0) { %>
  <p>No blocks</p>
<% } %>
<% for(let block of note.blocks.sort((a, b) => a.line_start - b.line_start)) { %>
<p>
  <%- block.sub_key.split("#").join(" > ") + " (" + block.size + " chars; lines: " + block.line_start + "-" + block.line_end + ")" %>
  <br>
  <%- block.should_embed ? "<span style='color: green;'>should embed</span>" : "<span style='color: orange;'>embedding skipped</span>" %>
</p>
<blockquote>
  <%- (await block.read())
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\n/g, "<br>")
    .replace(/\\t/g, "&nbsp;&nbsp;")
  %>
</blockquote>
<hr>
<% } %>

`
};

// src/smart_obsidian_view2.js
var import_obsidian10 = require("obsidian");
var SmartObsidianView2 = class extends import_obsidian10.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.app = plugin.app;
    this.plugin = plugin;
  }
  // static
  static get view_type() {
    throw new Error("view_type must be implemented in subclass");
  }
  static get display_text() {
    throw new Error("display_text must be implemented in subclass");
  }
  static get icon_name() {
    return "smart-connections";
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static get_view(workspace) {
    return this.get_leaf(workspace)?.view;
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  static is_open(workspace) {
    return this.get_leaf(workspace)?.view instanceof this;
  }
  // instance
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  async onOpen() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  async initialize() {
    await this.wait_for_env_to_load();
    this.container.empty();
    this.plugin[this.constructor.view_type.replace(/-/g, "_")] = this;
    this.register_plugin_events();
    this.app.workspace.registerHoverLinkSource(this.constructor.view_type, { display: this.getDisplayText(), defaultMod: true });
    this.render_view();
  }
  async wait_for_env_to_load() {
    if (!this.env?.collections_loaded) {
      while (!this.env?.collections_loaded) {
        const loading_msg = this.env?.smart_connections_plugin?.obsidian_is_syncing ? "Waiting for Obsidian Sync to finish..." : "Loading Smart Connections...";
        if (this.containerEl.children[1].innerHTML !== loading_msg) {
          this.containerEl.children[1].innerHTML = loading_msg;
        }
        await new Promise((r) => setTimeout(r, 2e3));
      }
    }
  }
  register_plugin_events() {
  }
  render_view() {
    throw new Error("render_view must be implemented in subclass");
  }
  get container() {
    return this.containerEl.children[1];
  }
  get env() {
    return this.plugin.env;
  }
  get smart_view() {
    if (!this._smart_view) this._smart_view = this.env.init_module("smart_view");
    return this._smart_view;
  }
  get attribution() {
    return `
      <div class="sc-brand">
        <svg viewBox="0 0 100 100" class="svg-icon smart-connections">
          <path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"></path>
          <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"></path>
          <circle cx="50" cy="20" r="9" fill="currentColor"></circle>
          <circle cx="80" cy="40" r="9" fill="currentColor"></circle>
          <circle cx="80" cy="70" r="9" fill="currentColor"></circle>
          <circle cx="50" cy="100" r="9" fill="currentColor"></circle>
          <circle cx="30" cy="50" r="9" fill="currentColor"></circle>
        </svg>
        <p><a style="font-weight: 700;" href="https://smartconnections.app/">Smart Connections</a></p>
      </div>
    `;
  }
};

// src/smart_entities_view.js
var SmartEntitiesView = class extends SmartObsidianView2 {
  add_result_listeners(elm) {
    this.plugin.add_result_listeners(elm, this.constructor.view_type);
  }
};

// src/sc_connections_view.js
var import_obsidian11 = require("obsidian");
var ScConnectionsView = class extends SmartEntitiesView {
  static get view_type() {
    return "smart-connections-view";
  }
  static get display_text() {
    return "Smart Connections";
  }
  static get icon_name() {
    return "smart-connections";
  }
  register_plugin_events() {
    this.plugin.registerEvent(this.app.workspace.on("file-open", (file) => {
      if (!file) return;
      this.render_view(file?.path);
    }));
    this.plugin.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => {
      if (leaf.view instanceof this.constructor) {
        this.render_view();
      }
    }));
  }
  async render_view(entity = null, container = this.container) {
    if (container.checkVisibility() === false) return console.log("View inactive, skipping render nearest");
    if (!entity) {
      const current_file = this.app.workspace.getActiveFile();
      if (current_file) entity = current_file?.path;
    }
    let key = null;
    if (typeof entity === "string") {
      const collection = entity.includes("#") ? this.env.smart_blocks : this.env.smart_sources;
      key = entity;
      entity = collection.get(key);
    }
    if (!entity) return this.plugin.notices.show("no entity", "No entity found for key: " + key);
    if (entity.collection_key === "smart_sources" && entity?.path?.endsWith(".pdf")) {
      const page_number = this.app.workspace.getActiveFileView().contentEl.firstChild.firstChild.children[8].value;
      if (!["1", 1].includes(page_number)) {
        const page_block = entity.blocks?.find((b) => b.sub_key.includes(`age ${page_number}`));
        if (page_block) {
          return await this.render_view(page_block);
        }
      }
    }
    if (this.current_context === entity?.key) return;
    this.current_context = entity?.key;
    await entity.render_connections(container, {
      add_result_listeners: this.add_result_listeners.bind(this),
      attribution: this.attribution,
      refresh_smart_view: this.refresh_smart_view.bind(this),
      open_lookup_view: this.plugin.open_lookup_view.bind(this.plugin)
    });
    this.add_top_bar_listeners();
  }
  refresh_smart_view() {
    console.log("refresh_smart_view");
    this.env.connections_cache = {};
    this.current_context = null;
    this.render_view();
  }
  add_top_bar_listeners() {
    const container = this.container;
    container.querySelectorAll(".sc-context").forEach((el) => {
      const entity = this.env.smart_sources.get(el.dataset.key);
      if (entity) {
        el.addEventListener("click", () => {
          new SmartNoteInspectModal(this.env, entity).open();
        });
      }
    });
  }
};
var SmartNoteInspectModal = class extends import_obsidian11.Modal {
  constructor(env, entity) {
    super(env.smart_connections_plugin.app);
    this.entity = entity;
    this.env = env;
    this.template = this.env.opts.templates["smart_note_inspect"];
    this.ejs = this.env.ejs;
  }
  onOpen() {
    this.titleEl.innerText = this.entity.key;
    this.render();
  }
  async render() {
    const html = await this.ejs.render(this.template, { note: this.entity }, { async: true });
    this.contentEl.innerHTML = html;
  }
};

// src/sc_lookup_view.js
var ScLookupView = class extends SmartEntitiesView {
  static get view_type() {
    return "smart-lookup-view";
  }
  static get display_text() {
    return "Smart Lookup";
  }
  static get icon_name() {
    return "search";
  }
  async render_view(query = "", container = this.container) {
    await this.env.smart_sources.render_lookup(container, {
      add_result_listeners: this.add_result_listeners.bind(this),
      attribution: this.attribution,
      query
    });
  }
};

// src/smart_search.js
var SmartSearch = class {
  constructor(plugin) {
    this.main = plugin;
    this.plugin = plugin;
  }
  async search(search_text, filter = {}) {
    try {
      if (!this.plugin.env?.smart_blocks?.smart_embed && !this.plugin.env?.smart_sources?.smart_embed) {
        this.plugin.notices.show("embed model not loaded", "Embed model not loaded. Please wait for the model to load and try again.");
        return [];
      }
      const collection = this.plugin.env?.smart_blocks?.smart_embed ? this.plugin.env.smart_blocks : this.plugin.env.smart_sources;
      const embedding = await collection.smart_embed.embed(search_text);
      if (!embedding?.vec) {
        this.main.notices.show("embed search text failed", "Failed to embed search text.");
        return [];
      }
      return collection.nearest(embedding.vec, filter).sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      });
    } catch (e) {
      this.main.notices.show("error in embedding search", "Error in embedding search. See console for details.", { timeout: 0 });
      console.error(e);
      return [];
    }
  }
};

// src/smart_chat_view.js
var import_obsidian12 = require("obsidian");
var SmartChatsView = class extends SmartObsidianView2 {
  static get view_type() {
    return "smart-chat-view";
  }
  static get display_text() {
    return "Smart Chat";
  }
  static get icon_name() {
    return "message-square";
  }
  /**
   * Registers plugin-specific events such as file opening and active leaf changes.
   */
  register_plugin_events() {
  }
  /**
   * Renders the chat view for a specific entity (chat thread).
   * @param {string|null} entity - The path or key of the chat thread to render.
   */
  async render_view(thread_key = null) {
    this.container.innerHTML = "Loading...";
    await this.env.smart_threads.render(this.container, {
      attribution: this.attribution,
      thread_key,
      // callbacks
      open_chat_history: this.open_chat_history.bind(this),
      open_conversation_note: this.open_conversation_note.bind(this),
      handle_chat_input_keydown: this.handle_chat_input_keydown.bind(this)
    });
  }
  /**
   * Opens the chat history view.
   */
  async open_chat_history() {
    if (!this._chat_history_selector) this._chat_history_selector = new ScChatHistoryModal(this.plugin.app, this);
    this._chat_history_selector.open();
  }
  open_thread(thread_name) {
    const thread_key = Object.keys(this.env.smart_threads.items).find((key) => this.thread_key_to_name(key) === thread_name);
    this.render_view(thread_key);
  }
  thread_key_to_name(thread_key) {
    return thread_key.split("/").pop().split(".").shift();
  }
  /**
   * Opens the conversation note associated with the current chat thread.
   */
  async open_conversation_note() {
    const current_thread = this.env.smart_threads.get(this.current_context);
    if (current_thread) {
      this.plugin.open_note(current_thread.conversation_note_path, { active: true });
    } else {
      this.plugin.notices.show("No Conversation Note Found", "Unable to locate the conversation note for the current chat.");
    }
  }
  /**
   * Handles click events on messages, such as copying to clipboard.
   * @param {Event} event - The click event.
   */
  handle_message_click(event) {
    event.preventDefault();
    event.stopPropagation();
    const message = event.target.classList.contains("sc-message-content") ? event.target : event.target.closest(".sc-message-content");
    if (event.target.classList.contains("sc-msg-button")) {
      this.copy_message_to_clipboard(message);
    }
  }
  handle_chat_input_keydown(event, chat_input) {
    if (!["/", "@", "[", "!"].includes(event.key)) return;
    const pos = chat_input.selectionStart;
    if (event.key === "@" && (!pos || [" ", "\n"].includes(chat_input.value[pos - 1]))) {
      this.open_omni_modal();
      event.preventDefault();
      event.stopPropagation();
      return;
    } else if (event.key === "[" && chat_input.value[pos - 1] === "[") {
      setTimeout(() => this.open_file_suggestion_modal(), 10);
    } else if (event.key === "/" && (!pos || [" ", "\n"].includes(chat_input.value[pos - 1]))) {
      setTimeout(() => this.open_folder_suggestion_modal(), 10);
    } else if (event.key === "!" && (!pos || [" ", "\n"].includes(chat_input.value[pos - 1]))) {
      setTimeout(() => this.open_image_suggestion_modal(), 10);
    }
  }
  /**
   * Copies the message content to the clipboard.
   * @param {HTMLElement} message - The message element containing the content.
   */
  copy_message_to_clipboard(message) {
    const content = message.dataset.content;
    navigator.clipboard.writeText(content).then(() => {
      this.plugin.notices.show("Copied to Clipboard", `Message: "${content}" copied successfully.`, { timeout: 2e3 });
    }).catch((err) => {
      console.error("Failed to copy message: ", err);
      this.plugin.notices.show("Copy Failed", "Unable to copy message to clipboard.", { timeout: 2e3 });
    });
  }
  open_omni_modal() {
    if (!this.omni_selector) this.omni_selector = new ScOmniModal(this.plugin.app, this);
    this.omni_selector.open();
  }
  open_modal(item) {
    switch (item) {
      case "Files":
        this.open_file_suggestion_modal();
        break;
      case "Folders":
        this.open_folder_suggestion_modal();
        break;
      case "Notes":
        this.open_notes_suggestion_modal();
        break;
      case "Images":
        this.open_image_suggestion_modal();
        break;
    }
  }
  // open file suggestion modal
  open_file_suggestion_modal() {
    if (!this.file_selector) this.file_selector = new ScFileSelectModal(this.plugin.app, this);
    this.file_selector.open();
  }
  open_notes_suggestion_modal() {
    if (!this.notes_selector) this.notes_selector = new ScNotesSelectModal(this.plugin.app, this);
    this.notes_selector.open();
  }
  // open folder suggestion modal
  async open_folder_suggestion_modal() {
    if (!this.folder_selector) {
      const folders = await this.plugin.get_folders();
      this.folder_selector = new ScFolderSelectModal(this.plugin.app, this, folders);
    }
    this.folder_selector.open();
  }
  async open_system_prompt_modal() {
    if (!this.system_prompt_selector) this.system_prompt_selector = new ScSystemPromptSelectModal(this.plugin.app, this);
    this.system_prompt_selector.open();
  }
  async open_image_suggestion_modal() {
    if (!this.image_selector) {
      this.image_selector = new ScImageSelectModal(this.plugin.app, this);
    }
    this.image_selector.open();
  }
  /**
   * Inserts selected text from a suggestion modal into the chat input.
   * @param {string} insert_text - The text to insert.
   */
  insert_selection(insert_text) {
    if (this.textarea.value.endsWith("[[")) this.textarea.value = this.textarea.value.slice(0, -2);
    if (this.textarea.value.endsWith("/")) this.textarea.value = this.textarea.value.slice(0, -1);
    let caret_pos = this.textarea.selectionStart;
    let text_before = this.textarea.value.substring(0, caret_pos);
    let text_after = this.textarea.value.substring(caret_pos, this.textarea.value.length);
    this.textarea.value = text_before + insert_text + text_after;
    this.textarea.selectionStart = caret_pos + insert_text.length;
    this.textarea.selectionEnd = caret_pos + insert_text.length;
    this.textarea.focus();
  }
  get textarea() {
    return this.container.querySelector(".sc-chat-form textarea");
  }
  insert_system_prompt(prompt_file) {
    const system_message = {
      input: {
        key: prompt_file.path
      }
    };
    this.env.smart_threads.get_active_thread().add_system_message(system_message);
    if (this.textarea.value.endsWith("[[")) this.textarea.value = this.textarea.value.slice(0, -2);
  }
};
var ScChatHistoryModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, view) {
    super(app);
    this.app = app;
    this.view = view;
    this.setPlaceholder("Type the name of a chat session...");
  }
  // sort alphabetically & then by startsWith UNITITLED
  getItems() {
    return Object.keys(this.view.env.smart_threads.items).map((key) => this.view.thread_key_to_name(key)).sort((a, b) => a.localeCompare(b)).sort((a, b) => b.startsWith("UNTITLED") ? -1 : 1);
  }
  // if not UNTITLED, remove date after last em dash
  getItemText(item) {
    return item.indexOf("UNTITLED") === -1 ? item.replace(/—[^—]*$/, "") : item;
  }
  // onChooseItem(session) { this.view.open_chat(session); }
  onChooseItem(thread_name) {
    this.view.open_thread(thread_name);
  }
};
var ScOmniModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, view) {
    super(app);
    this.app = app;
    this.view = view;
    this.setPlaceholder("Select input type...");
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.selectActiveSuggestion(e);
    });
    this.setInstructions([
      {
        command: `Enter or \u2192`,
        purpose: "Select a context type"
      }
    ]);
  }
  getItems() {
    return [
      "Files",
      "Folders",
      "Notes",
      // "System Prompt",
      "Images"
    ];
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(item) {
    this.view.open_modal(item);
  }
};
var ContextSelectModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, view) {
    super(app);
    this.app = app;
    this.view = view;
    this.setPlaceholder("Find and select a context...");
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "ArrowLeft") {
        this.view.open_omni_modal();
        this.close();
      }
      if (e.key === "Enter") this.selectActiveSuggestion(e);
    });
  }
};
var ScFileSelectModal = class extends ContextSelectModal {
  constructor(app, view) {
    super(app, view);
    const mod_key = import_obsidian12.Platform.isMacOS ? `\u2318` : `ctrl`;
    this.setInstructions([
      {
        command: `\u2190`,
        purpose: "Go back"
      },
      {
        command: `\u21B5`,
        purpose: "Insert as linked context"
      },
      {
        command: `${mod_key} \u21B5`,
        purpose: "Insert as system prompt"
      },
      {
        command: `shift \u21B5`,
        purpose: "Insert content inline"
      }
    ]);
  }
  // get all markdown files
  getItems() {
    return this.app.vault.getFiles().sort((a, b) => a.basename.localeCompare(b.basename));
  }
  getItemText(item) {
    return item.basename;
  }
  selectSuggestion(item, evt) {
    if (import_obsidian12.Keymap.isModEvent(evt)) this.view.insert_system_prompt(item.item);
    else {
      const link = `[[${item.item.path}]] `;
      if (evt.shiftKey) this.view.insert_selection("!" + link);
      else this.view.insert_selection(link);
    }
    this.close();
  }
};
var ScNotesSelectModal = class extends ScFileSelectModal {
  getItems() {
    return this.app.vault.getMarkdownFiles().sort((a, b) => a.basename.localeCompare(b.basename));
  }
};
var ScFolderSelectModal = class extends ContextSelectModal {
  constructor(app, view, folders) {
    super(app, view);
    this.folders = folders;
    this.setPlaceholder("Type the name of a folder...");
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "ArrowLeft") {
        this.view.open_omni_modal();
        this.close();
      }
    });
  }
  getItems() {
    return this.folders;
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(folder) {
    this.view.insert_selection("/" + folder + "/ ");
  }
};
var ScImageSelectModal = class extends ScFileSelectModal {
  constructor(app, view) {
    super(app, view);
    this.setPlaceholder("Type the name of an image...");
  }
  get image_extensions() {
    return [
      "gif",
      "heic",
      "heif",
      "jpeg",
      "jpg",
      "png",
      "webp"
    ];
  }
  getItems() {
    return this.app.vault.getFiles().filter((file) => this.image_extensions.includes(file.extension)).sort((a, b) => a.basename.localeCompare(b.basename));
  }
  getItemText(item) {
    return item.path;
  }
};
var ScSystemPromptSelectModal = class extends import_obsidian12.FuzzySuggestModal {
  constructor(app, view) {
    super(app);
    this.app = app;
    this.view = view;
    this.setPlaceholder("Type the name of a system prompt...");
  }
  getItems() {
    return this.view.plugin.system_prompts;
  }
  getItemText(item) {
    return item.basename;
  }
  onChooseItem(prompt) {
    this.view.insert_selection('"' + prompt.path + '"');
  }
};

// src/sc_settings_tab.js
var import_obsidian13 = require("obsidian");

// src/components/main_settings.js
async function render22(scope) {
  const html = `
    <div id="smart-connections-settings">
      ${render_mobile_warning(scope)}
      ${render_info_callout()}
      ${render_supporters_section(scope)}
      <h2>Smart Environment</h2>
      <div data-smart-settings="env"></div>
      <p>Notes about embedding models:</p>
      <ul>
        <li>IMPORTANT: make sure local <code>BGE-micro-v2</code> embedding model works before trying other local models.</li>
        <li>Local model compatibility depends on available CPU and RAM. Try reducing the max tokens (context) if a local model if failing.</li>
        <li>API models are not dependent on local compute, but they require an API key and send your notes to third-party servers for processing.</li>
      </ul>
      <!-- OLD -->
      ${render_muted_notices_section(scope)}
      ${render_mobile_toggle(scope)}
      ${render_version_revert_button(scope)}
    </div>
  `;
  const frag = this.create_doc_fragment(html);
  return await post_process20.call(this, scope, frag);
}
async function post_process20(scope, frag) {
  await this.render_setting_components(frag, { scope });
  const smart_settings_containers = frag.querySelectorAll("[data-smart-settings]");
  for (const container of smart_settings_containers) {
    const sub_scope = container.dataset.smartSettings.split(".").reduce((acc, key) => acc[key], scope);
    await sub_scope.render_settings(container);
  }
  frag.querySelector(".sc-supporters")?.addEventListener("click", (e) => {
    e.currentTarget.style.maxHeight = "100%";
  });
  return frag;
}
function render_mobile_warning(scope) {
  if (scope.obsidian.Platform.isMobile && !scope.settings.enable_mobile) {
    return `
      <div data-callout-metadata="" data-callout-fold="" data-callout="warning" class="callout">
        <div class="callout-title">
          <div class="callout-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="svg-icon lucide-alert-triangle">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </div>
          <div class="callout-title-inner">Mobile is DISABLED.</div>
        </div>
        <div class="callout-content">
          <p>Toggle "Enable mobile" setting to activate mobile.</p>
        </div>
      </div>
    `;
  }
  return "";
}
function render_info_callout() {
  return `
    <div data-callout-metadata="" data-callout-fold="" data-callout="info" class="callout" style="mix-blend-mode: unset;">
      <div class="callout-title">
        <div class="callout-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-info">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg></div>
        <div class="callout-title-inner"><p><strong>User Agreement:</strong> By using Smart Connections you agree to share how it helps you with at least one other person \u{1F60A}\u{1F334}</p></div>
      </div>
    </div>
  `;
}
function render_supporters_section(scope) {
  const stable_release_html = scope.EARLY_ACCESS ? "" : `<p>The success of Smart Connections is a direct result of our community of supporters who generously fund and evaluate new features. Their unwavering commitment to our privacy-focused, open-source software benefits all. Together, we can continue to innovate and make a positive impact on the world.</p>` + render_supporter_benefits_html();
  const become_supporter_html = scope.EARLY_ACCESS ? "" : `<div class="setting-component"
      data-name="Upgrade to Early Access Version (v2.4)"
      data-description="Upgrade to v2.4 (Early Access) to access new features and improvements."
      data-type="button"
      data-btn-text="Upgrade to early-access"
      data-callback="update_early_access"
    ></div>
    <div class="setting-component"
      data-name="Become a Supporter"
      data-description="Become a Supporter"
      data-type="button"
      data-href="https://buy.stripe.com/9AQ7sWemT48u1LGcN4"
    ></div>`;
  return `<div class="sc-supporters">
    <h1>Smart Connections Supporter Community</h1>
    <i>Join the next <a href="https://lu.ma/calendar/cal-ZJtdnzAdURyouM7">Lean Coffee session</a> to discuss future features & improvements.</i>
    <hr>
    ${stable_release_html}
    <div class="setting-component"
      data-name="Supporter License Key"
      data-type="text"
      data-setting="license_key"
      data-description="Note: this is not required to use Smart Connections."
      data-placeholder="Enter your license_key"
    ></div>
    <div class="setting-component"
      data-name="Smart Connect - Obsidian GPT"
      data-btn-text="Open GPT"
      data-description='Chat with your notes in ChatGPT without uploading your notes to the cloud!'
      data-type="button"
      data-href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connections-2"
    ></div>
    <div class="setting-component"
      data-name="Supporter Community Chat"
      data-btn-text="Join us"
      data-description='Join the supporter community chat.'
      data-type="button"
      data-href="https://chat.smartconnections.app"
    ></div>
    ${become_supporter_html}
  </div>`;
}
function render_supporter_benefits_html() {
  return `<p><b>Supporter benefits include:</b></p>
    <ul>
      <li>Early access to new &amp; experimental features:
        <ul>
          <li>Early access to new versions enables supporters to help ensure new features are ready for the broader community.</li>
          <li><i>Current Early Access Features:</i><ul>
            <li>\u{1F5BC}\uFE0F Add images to Smart Chat (multimodal chat)</li>
            <li>Re-ranking model in the Smart Connections View</li>
            <li>Smart Chat History in canvas format</li>
          </ul></li>
          <li><i>Coming soon to Early Access:</i><ul>
            <li>PDF Support in Smart Connections view</li>
            <li>Edit notes in Smart Chat</li>
            <li>New retrieval methods in Smart Chat</li>
            <li>Review retrieved context before sending in Smart Chat</li>
            <li>Audio files in Smart Connections view</li>
          </ul></li>
          <li><i>Past Early Access Features:</i><ul>
            <li>ChatGPT integration with your Obsidian Vault</li>
            <li>Mobile support for Smart Connections</li>
          </ul></li>
        </ul>
      </li>
      <li>Access to the supporter-only <a href="https://chat.smartconnections.app">private chat</a>:
        <ul>
          <li><i>Community:</i>
            <ul>
              <li>Ask questions and share insights with other supporters.</li>
            </ul>
          </li>
          <li><i>Help &amp; Support (priority):</i>
            <ul>
              <li>Swift, top-priority support in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
            </ul>
          </li>
          <li><i>Feature Requests (priority):</i>
            <ul>
              <li>Influence the future of Smart Connections with priority feature requests in the <a href="https://chat.smartconnections.app">Supporter Chat</a>.</li>
            </ul>
          </li>
          <li><i>Insider Updates:</i>
            <ul>
              <li>Learn about the latest features &amp; improvements before they are announced.</li>
            </ul>
          </li>
        </ul>
      </li>
      <li><b>For a very limited time:</b> Early access to Smart Connect: Use ChatGPT with your notes <i>without</i> uploading your notes to the cloud using <a href="https://chat.openai.com/g/g-9Xb1mRJYl-smart-connect-obsidian">Smart Connect - Obsidian</a> GPT.</li>
    </ul>
  `;
}
function render_muted_notices_section(scope) {
  let html = `
    <h1>Muted Notices</h1>
  `;
  if (Object.keys(scope.notices.settings?.muted || {}).length) {
    for (const notice in scope.notices.settings?.muted) {
      html += `
        <div class="setting-component"
          data-name="${notice}"
          data-setting="smart_notices.muted.${notice}"
          data-type="remove"
          data-btn-text="Unmute"
          data-callback="remove_setting_elm"
        ></div>
      `;
    }
  } else {
    html += `<p>No muted notices.</p>`;
  }
  return html;
}
function render_mobile_toggle(scope) {
  return `
    <hr>
    <div class="setting-component"
      data-name="Enable Mobile (EXPERIMENTAL)"
      data-description="Enable mobile support for Smart Connections."
      data-type="toggle"
      data-setting="enable_mobile"
      data-callback="toggle_mobile"
    ></div>
  `;
}
function render_version_revert_button(scope) {
  if (scope.EARLY_ACCESS) {
    return `
      <hr>
      <div class="setting-component"
        data-name="Revert to Stable Release"
        data-btn-text="Revert"
        data-description='Revert to the stable release of Smart Connections. Requires "Check for Updates" and then "Update Plugin" to complete the process.'
        data-type="button"
        data-callback="revert_to_stable_release"
      ></div>
    `;
  }
  return "";
}

// src/sc_settings_tab.js
var ScSettingsTab = class extends import_obsidian13.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.main_settings_container = null;
  }
  /**
   * @method display
   * @description Called by Obsidian to display the settings tab
   */
  display() {
    console.log("displaying settings tab");
    this.render_settings(this.containerEl);
  }
  get smart_view() {
    if (!this._smart_view) {
      this._smart_view = new this.plugin.smart_env_config.modules.smart_view.class({ adapter: this.plugin.smart_env_config.modules.smart_view.adapter });
    }
    return this._smart_view;
  }
  async render_settings(container = this.main_settings_container, opts = {}) {
    if (!this.main_settings_container || container !== this.main_settings_container) this.main_settings_container = container;
    if (!container) throw new Error("Container is required");
    container.innerHTML = "";
    container.innerHTML = '<div class="sc-loading">Loading main settings...</div>';
    const frag = await render22.call(this.smart_view, this.plugin, opts);
    container.innerHTML = "";
    container.appendChild(frag);
    return container;
  }
};

// src/sc_actions_ux.js
var import_ejs_min = __toESM(require_ejs_min(), 1);
var ScActionsUx = class {
  constructor(plugin, container, codeblock_type) {
    this.plugin = plugin;
    this.container = container;
    this.codeblock_type = codeblock_type;
  }
  change_code_block(code) {
    const active_file = this.plugin.app.workspace.getActiveFile();
    const note_path = active_file.path;
    const old_content = code.substring(code.indexOf("<<<<<<< ORIGINAL\n") + "<<<<<<< ORIGINAL\n".length, code.indexOf("======="));
    const new_content = code.substring(code.indexOf("=======\n") + "=======\n".length, code.indexOf(">>>>>>>"));
    const time_saved = (Math.round(new_content.split(" ").length / 50) || 1) + " min";
    this.container.innerHTML = this.render_template("sc_change", { new_content, old_content, time_saved });
    const new_content_container = this.container.querySelector(".new-content");
    const old_content_container = this.container.querySelector(".old-content");
    this.plugin.obsidian.MarkdownRenderer.renderMarkdown(new_content, new_content_container, note_path, new this.plugin.obsidian.Component());
    this.plugin.obsidian.MarkdownRenderer.renderMarkdown(old_content, old_content_container, note_path, new this.plugin.obsidian.Component());
    const approve_button = this.get_button_by_text("Accept");
    approve_button.onclick = async () => {
      console.log("Accepted");
      const content = await this.plugin.app.vault.cachedRead(active_file);
      const updated_content = content.replace("```" + this.codeblock_type + "\n" + code + "\n```", new_content.trim());
      await this.plugin.app.vault.modify(active_file, updated_content);
      await this.append_accepted_changes({ note_path, old_content, new_content, time_saved });
    };
    const reject_button = this.get_button_by_text("Reject");
    reject_button.onclick = async () => {
      const content = await this.plugin.app.vault.cachedRead(active_file);
      const updated_content = content.replace("```" + this.codeblock_type + "\n" + code + "\n```", old_content.trim());
      await this.plugin.app.vault.modify(active_file, updated_content);
    };
  }
  async append_accepted_changes(change) {
    const file_path = this.plugin.env.env_data_dir + "/accepted_changes.ndjson";
    if (!await this.plugin.app.vault.exists(file_path)) {
      console.log("File does not exist, creating it");
      await this.plugin.app.vault.create(file_path, "");
    }
    await this.plugin.app.vault.adapter.append(file_path, JSON.stringify(change) + "\n");
  }
  render_template(template_name, data) {
    if (!views_default[template_name]) throw new Error(`Template '${template_name}' not found.`);
    return import_ejs_min.default.render(views_default[template_name], data, { context: this });
  }
  get_button_by_text(text) {
    return get_button_by_text(this.container, text);
  }
  get_icon(name) {
    return this.plugin.obsidian.getIcon(name).outerHTML;
  }
  get attribution() {
    return views_default.attribution;
  }
};
function get_button_by_text(container, text) {
  return Array.from(container.querySelectorAll("button")).find((button) => button.textContent === text);
}

// src/open_note.js
async function open_note(plugin, target_path, event = null) {
  const env = plugin.env;
  let targetFile;
  let block;
  if (target_path.includes(".pdf#page=")) {
    return plugin.app.workspace.openLinkText(target_path, "/");
  }
  if (target_path.endsWith("#")) target_path = target_path.slice(0, -1);
  if (target_path.includes("#")) {
    targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path.split("#")[0], "");
    block = env.smart_blocks.get(target_path);
  } else {
    targetFile = plugin.app.metadataCache.getFirstLinkpathDest(target_path, "");
  }
  let leaf;
  if (event) {
    const mod = plugin.obsidian.Keymap.isModEvent(event);
    leaf = plugin.app.workspace.getLeaf(mod);
  } else {
    leaf = plugin.app.workspace.getMostRecentLeaf();
  }
  await leaf.openFile(targetFile);
  if (block?.line_start) {
    let { editor } = leaf.view;
    const pos = { line: block.line_start, ch: 0 };
    editor.setCursor(pos);
    editor.scrollIntoView({ to: pos, from: pos }, true);
  }
}

// src/sc_chatgpt_view.js
var import_obsidian14 = require("obsidian");
var SmartChatGPTView = class extends import_obsidian14.ItemView {
  static get view_type() {
    return "smart_chatgpt";
  }
  static get display_text() {
    return "Smart ChatGPT";
  }
  static get icon_name() {
    return "bot";
  }
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  onload() {
    console.log("loading view");
    this.initialize();
  }
  initialize() {
    this.containerEl.empty();
    const refreshButton = this.containerEl.createEl("button", {
      text: "Refresh"
    });
    refreshButton.addEventListener("click", () => {
      this.initialize();
    });
    this.containerEl.appendChild(this.create());
  }
  create() {
    this.frame = document.createElement("webview");
    this.frame.setAttribute("nodeintegration", "");
    this.frame.setAttribute("contextisolation", "");
    this.frame.setAttribute("allowpopups", "");
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";
    this.frame.setAttribute("src", "https://chatgpt.com");
    return this.frame;
  }
};

// src/sc_private_chat_view.js
var import_obsidian15 = require("obsidian");
var SmartPrivateChatView = class extends import_obsidian15.ItemView {
  static get view_type() {
    return "smart_private_chat";
  }
  static get display_text() {
    return "Smart Connections Supporter Private Chat";
  }
  static get icon_name() {
    return "users";
  }
  getViewType() {
    return this.constructor.view_type;
  }
  getDisplayText() {
    return this.constructor.display_text;
  }
  getIcon() {
    return this.constructor.icon_name;
  }
  static get_leaf(workspace) {
    return workspace.getLeavesOfType(this.view_type)?.find((leaf) => leaf.view instanceof this);
  }
  static open(workspace, active = true) {
    if (this.get_leaf(workspace)) this.get_leaf(workspace).setViewState({ type: this.view_type, active });
    else workspace.getRightLeaf(false).setViewState({ type: this.view_type, active });
    if (workspace.rightSplit.collapsed) workspace.rightSplit.toggle();
  }
  onload() {
    console.log("loading view");
    this.initialize();
  }
  initialize() {
    this.containerEl.empty();
    const refreshButton = this.containerEl.createEl("button", {
      text: "Refresh"
    });
    refreshButton.addEventListener("click", () => {
      this.initialize();
    });
    this.containerEl.appendChild(this.create());
  }
  create() {
    this.frame = document.createElement("webview");
    this.frame.setAttribute("nodeintegration", "");
    this.frame.setAttribute("contextisolation", "");
    this.frame.setAttribute("allowpopups", "");
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";
    this.frame.setAttribute("src", "https://chat.smartconnections.app");
    return this.frame;
  }
};

// src/sc_app_connector.js
var import_http = __toESM(require("http"), 1);
var import_url = __toESM(require("url"), 1);
var ScAppConnector = class _ScAppConnector {
  constructor(env, port = 37042) {
    this.env = env;
    this.sc_plugin = this.env.smart_connections_plugin;
    this.port = port;
    this.server = null;
    this.dataview_api = null;
    this.check_env_interval = null;
  }
  static async create(env, port) {
    const connector = new _ScAppConnector(env, port);
    env.sc_app_connector = connector;
    await connector.init();
    return connector;
  }
  async init() {
    await this.get_dataview_api();
    await this.create_server();
    console.log(`ScAppConnector initialized on port ${this.port}`);
    this.start_env_check();
  }
  create_server() {
    return new Promise((resolve, reject) => {
      this.server = import_http.default.createServer((req, res) => {
        const parsed_url = import_url.default.parse(req.url, true);
        if (parsed_url.pathname === "/message") {
          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", async () => {
              try {
                const data = JSON.parse(body);
                const response = await this.handle_message(data);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(response));
              } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ status: "error", message: error.message }));
              }
            });
          } else if (req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "ok", message: "Obsidian HTTP server is running" }));
          } else {
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end("Method Not Allowed");
          }
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      });
      this.server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          console.log(`Port ${this.port} is already in use. Attempting to retry once.`);
          if (window.sc_app_connector_server) {
            window.sc_app_connector_server.close();
          }
          this.retry_count = (this.retry_count || 0) + 1;
          if (this.retry_count <= 1) {
            this.create_server().then(resolve).catch(reject);
          } else {
            console.error(`Failed to create server after retry. Port ${this.port} is still in use.`);
            reject(new Error(`Unable to start server on port ${this.port} after retry.`));
          }
        } else {
          reject(error);
        }
      });
      this.server.listen(this.port, () => {
        console.log(`Server running at http://localhost:${this.port}/`);
        window.sc_app_connector_server = this.server;
        resolve();
      });
    });
  }
  async get_dataview_api(retries = 0) {
    this.dataview_api = window["DataviewAPI"];
    if (!this.dataview_api) {
      if (retries < 10) {
        await new Promise((resolve) => setTimeout(resolve, retries * 1e3));
        return this.get_dataview_api(retries + 1);
      } else {
        console.log("Dataview API not found. No dataview connection for Smart Connect.");
      }
    }
  }
  async handle_message(data) {
    if (data.fx === "full_render") {
      const rendered = await this.full_render(data.markdown, data.rel_path);
      return { status: "ok", rendered };
    }
    if (data.fx === "current_note") {
      return await this.current_note();
    }
    if (data.fx === "current_notes") {
      return await this.current_notes();
    }
    try {
      const resp = await this.dataview_api.queryMarkdown(data.query, data.rel_path, null);
      return resp;
    } catch (err) {
      console.error(err);
      return { status: "error", message: err.message };
    }
  }
  async current_note() {
    const curr_file = this.sc_plugin.app.workspace.getActiveFile();
    if (!curr_file) return { path: null, content: null };
    let content = await this.sc_plugin.read_file(curr_file);
    return {
      path: curr_file.path,
      content
    };
  }
  async current_notes() {
    const cfiles = [];
    await this.sc_plugin.app.workspace.iterateRootLeaves((leave) => {
      cfiles.push(leave.view.file.path);
    });
    return cfiles;
  }
  async full_render(markdown, rel_path) {
    const html_elm = document.createElement("div");
    const { MarkdownRenderer: MarkdownRenderer3, htmlToMarkdown, Component: Component2 } = this.sc_plugin.obsidian;
    await MarkdownRenderer3.render(this.sc_plugin.app, markdown, html_elm, rel_path, new Component2());
    let html = html_elm.innerHTML;
    await new Promise((resolve) => setTimeout(resolve, 200));
    while (html !== html_elm.innerHTML) {
      html = html_elm.innerHTML;
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log("waiting for changes");
    }
    return htmlToMarkdown(html_elm.innerHTML);
  }
  close_server() {
    if (this.server) {
      this.server.close(() => {
        console.log("Server closed");
      });
    }
    if (window.sc_app_connector_server) {
      window.sc_app_connector_server.close(() => {
        console.log("Window server reference closed");
      });
      delete window.sc_app_connector_server;
    }
    if (this.check_env_interval) {
      clearInterval(this.check_env_interval);
    }
  }
  start_env_check() {
    this.check_env_interval = setInterval(() => {
      if (!this.env) {
        console.log("Environment no longer available. Closing server.");
        this.close_server();
      }
    }, 5e3);
  }
};

// src/sc_dirs_view.js
var ScDirsView = class extends SmartEntitiesView {
  static get view_type() {
    return "smart-directories-view";
  }
  static get display_text() {
    return "Smart Directories";
  }
  static get icon_name() {
    return "folder";
  }
  async render_view(container = this.container) {
    this.container.empty();
    await this.env.smart_directories.render_directories(container, {
      add_result_listeners: this.add_result_listeners.bind(this),
      attribution: this.attribution,
      refresh_view: this.render_view.bind(this)
    });
  }
};

// src/index.js
var {
  addIcon,
  Keymap: Keymap3,
  MarkdownRenderer: MarkdownRenderer2,
  Notice: Notice2,
  Plugin,
  request,
  requestUrl: requestUrl2,
  TAbstractFile,
  TFile
} = import_obsidian16.default;
var SmartConnectionsPlugin = class extends Plugin {
  static get defaults() {
    return default_settings();
  }
  get item_views() {
    return {
      ScConnectionsView,
      ScDirsView,
      ScLookupView,
      SmartChatsView,
      SmartChatGPTView,
      SmartPrivateChatView
    };
  }
  // GETTERS for overrides in subclasses without overriding the constructor or init method
  get smart_env_class() {
    return SmartEnv;
  }
  get smart_env_config() {
    const config = {
      ...smart_env_config,
      env_path: "",
      // scope handled by Obsidian FS methods
      // DEPRECATED schema
      smart_env_settings: {
        // careful: overrides saved settings
        is_obsidian_vault: true
        // redundant with default_settings.is_obsidian_vault
      },
      // DEPRECATED usage
      ejs: import_ejs_min2.default,
      templates: views_default,
      request_adapter: this.obsidian.requestUrl
      // NEEDS BETTER HANDLING
    };
    if (this.obsidian.Platform.isMobile && !this.settings.enable_mobile) config.prevent_load_on_init = true;
    return config;
  }
  get_tfile(file_path) {
    return this.app.vault.getAbstractFileByPath(file_path);
  }
  async read_file(tfile_or_path) {
    const t_file = typeof tfile_or_path === "string" ? this.get_tfile(tfile_or_path) : tfile_or_path;
    if (!(t_file instanceof this.obsidian.TFile)) return null;
    return await this.app.vault.cachedRead(t_file);
  }
  get api() {
    return this._api;
  }
  async onload() {
    this.app.workspace.onLayoutReady(this.initialize.bind(this));
  }
  // initialize when layout is ready
  onunload() {
    console.log("unloading plugin");
    this.env?.unload_main("smart_connections_plugin");
    this.env = null;
    this.notices?.unload();
  }
  async initialize() {
    this.obsidian = import_obsidian16.default;
    await smart_env_config.modules.smart_settings.class.create(this);
    this.notices = new this.smart_env_config.modules.smart_notices.class(this);
    this.smart_connections_view = null;
    this.add_commands();
    this.register_views();
    this.addSettingTab(new ScSettingsTab(this.app, this));
    await this.check_for_updates();
    this._api = new SmartSearch(this);
    (window["SmartSearch"] = this._api) && this.register(() => delete window["SmartSearch"]);
    this.addRibbonIcon("smart-connections", "Open: View Smart Connections", () => {
      this.open_view();
    });
    this.addRibbonIcon("message-square", "Open: Smart Chat Conversation", () => {
      this.open_chat();
    });
    this.register_code_blocks();
    this.new_user();
    console.log("loading env");
    await this.load_env();
    console.log("Smart Connections v2 loaded");
  }
  register_code_blocks() {
    this.register_code_block("smart-connections", "render_code_block");
    this.register_code_block("sc-context", "render_code_block_context");
    this.register_code_block("sc-change", "change_code_block");
    this.register_code_block("smart-change", "change_code_block");
  }
  register_code_block(name, callback_name) {
    try {
      this.registerMarkdownCodeBlockProcessor(name, this[callback_name].bind(this));
    } catch (error) {
      console.warn(`Error registering code block: ${name}`, error);
    }
  }
  async load_env() {
    await this.smart_env_class.create(this, this.smart_env_config);
    console.log("env loaded");
    if (!this.obsidian.Platform.isMobile) ScAppConnector.create(this.env, 37042);
    Object.defineProperty(this.env, "entities_loaded", { get: () => this.env.collections_loaded });
    Object.defineProperty(this.env, "smart_notes", { get: () => this.env.smart_sources });
  }
  async ready_to_load_collections() {
    await new Promise((r) => setTimeout(r, 5e3));
    await this.wait_for_obsidian_sync();
  }
  new_user() {
    if (!this.settings.new_user) return;
    this.settings.new_user = false;
    this.settings.version = this.manifest.version;
    setTimeout(() => {
      this.open_view();
      this.open_chat();
    }, 1e3);
    if (this.app.workspace.rightSplit.collapsed) this.app.workspace.rightSplit.toggle();
    this.add_to_gitignore("\n\n# Ignore Smart Environment folder\n.smart-env");
    this.save_settings();
  }
  register_views() {
    this.obsidian.addIcon("smart-connections", `<path d="M50,20 L80,40 L80,60 L50,100" stroke="currentColor" stroke-width="4" fill="none"/>
    <path d="M30,50 L55,70" stroke="currentColor" stroke-width="5" fill="none"/>
    <circle cx="50" cy="20" r="9" fill="currentColor"/>
    <circle cx="80" cy="40" r="9" fill="currentColor"/>
    <circle cx="80" cy="70" r="9" fill="currentColor"/>
    <circle cx="50" cy="100" r="9" fill="currentColor"/>
    <circle cx="30" cy="50" r="9" fill="currentColor"/>`);
    Object.values(this.item_views).forEach((View) => {
      this.registerView(View.view_type, (leaf) => new View(leaf, this));
      this.addCommand({
        id: View.view_type,
        name: "Open: " + View.display_text + " view",
        callback: () => {
          View.open(this.app.workspace);
        }
      });
    });
  }
  async check_for_updates() {
    if (this.settings.version !== this.manifest.version) {
      this.settings.version = this.manifest.version;
      await this.save_settings();
    }
    setTimeout(this.check_for_update.bind(this), 3e3);
    setInterval(this.check_for_update.bind(this), 108e5);
  }
  // check for update
  async check_for_update() {
    try {
      const { json: response } = await requestUrl2({
        url: "https://api.github.com/repos/brianpetro/obsidian-smart-connections/releases/latest",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        contentType: "application/json"
      });
      const latest_release = response.tag_name;
      if (latest_release !== this.manifest.version) {
        new Notice2(`[Smart Connections] A new version is available! (v${latest_release})`);
        this.update_available = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async restart_plugin() {
    await this.saveData(this.settings);
    await new Promise((r) => setTimeout(r, 3e3));
    window.restart_plugin = async (id) => {
      await window.app.plugins.disablePlugin(id);
      await window.app.plugins.enablePlugin(id);
    };
    await window.restart_plugin(this.manifest.id);
  }
  add_commands() {
    this.addCommand({
      id: "sc-find-notes",
      name: "Find: Make Smart Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: (editor) => {
        if (editor.somethingSelected()) {
          this.lookup_view.render_view(editor.getSelection());
          return;
        }
        if (editor.getCursor()?.line) {
          const line = editor.getCursor().line;
          const source = this.env.smart_sources.current_note;
          let item = source.get_block_by_line(line);
          if (item?.vec) return this.view.render_view(item);
          else this.view.render_view(source);
        } else this.view.render_view();
      }
    });
    this.addCommand({
      id: "sc-refresh-connections",
      name: "Refresh & Make Connections",
      icon: "pencil_icon",
      hotkeys: [],
      editorCallback: async (editor) => {
        const curr_file = this.app.workspace.getActiveFile();
        if (!curr_file?.path) return console.warn("No active file", curr_file);
        let source = this.env.smart_sources.get(curr_file.path);
        if (source) {
          source.data = { path: curr_file.path };
          await this.env.data_fs.remove(source.data_path);
        } else {
          this.env.smart_sources.fs.include_file(curr_file.path);
          source = this.env.smart_sources.init_file_path(curr_file.path);
        }
        await source.import();
        await this.env.smart_sources.process_embed_queue();
        setTimeout(() => {
          this.view.render_view();
        }, 1e3);
      }
    });
    this.addCommand({
      id: "smart-connections-view",
      name: "Open: View Smart Connections",
      callback: () => {
        this.open_view();
      }
    });
    this.addCommand({
      id: "smart-connections-chat",
      name: "Open: Smart Chat Conversation",
      callback: () => {
        this.open_chat();
      }
    });
    this.addCommand({
      id: "smart-connections-random",
      name: "Random Note",
      callback: () => {
        const curr_file = this.app.workspace.getActiveFile();
        const entity = this.env.smart_sources.get(curr_file.path);
        const connections = entity.find_connections({
          filter: { limit: 20 }
        });
        const rand = Math.floor(Math.random() * connections.length / 2);
        const rand_entity = connections[rand];
        this.open_note(rand_entity.item.path);
      }
    });
    this.addCommand({
      id: "smart-connections-chatgpt",
      name: "Open: Smart ChatGPT",
      callback: () => {
        this.open_chatgpt();
      }
    });
    this.addCommand({
      id: "smart-connections-private-chat",
      name: "Open: Smart Connections Supporter Private Chat",
      callback: () => {
        this.open_private_chat();
      }
    });
  }
  async make_connections(selected_text = null) {
    if (!this.view) await this.open_view();
    await this.view.render_nearest(selected_text);
  }
  // utils
  async add_to_gitignore(ignore, message = null) {
    if (!await this.app.vault.adapter.exists(".gitignore")) return;
    let gitignore_file = await this.app.vault.adapter.read(".gitignore");
    if (gitignore_file.indexOf(ignore) < 0) {
      await this.app.vault.adapter.append(".gitignore", `

${message ? "# " + message + "\n" : ""}${ignore}`);
      console.log("Added to .gitignore: " + ignore);
    }
  }
  show_notice(message, opts = {}) {
    console.log("old showing notice");
    const notice_id = typeof message === "string" ? message : message[0];
    return this.notices.show(notice_id, message, opts);
  }
  get chat_view() {
    return SmartChatsView.get_view(this.app.workspace);
  }
  open_chat() {
    SmartChatsView.open(this.app.workspace);
  }
  get view() {
    return ScConnectionsView.get_view(this.app.workspace);
  }
  open_view(active = true) {
    ScConnectionsView.open(this.app.workspace, active);
  }
  open_lookup_view() {
    ScLookupView.open(this.app.workspace);
  }
  get lookup_view() {
    return ScLookupView.get_view(this.app.workspace);
  }
  open_chatgpt() {
    SmartChatGPTView.open(this.app.workspace);
  }
  open_private_chat() {
    SmartPrivateChatView.open(this.app.workspace);
  }
  async open_note(target_path, event = null) {
    await open_note(this, target_path, event);
  }
  // get folders, traverse non-hidden sub-folders
  async get_folders(path = "/") {
    try {
      const folders = (await this.app.vault.adapter.list(path)).folders;
      let folder_list = [];
      for (let i = 0; i < folders.length; i++) {
        if (folders[i].startsWith(".")) continue;
        folder_list.push(folders[i]);
        folder_list = folder_list.concat(await this.get_folders(folders[i] + "/"));
      }
      return folder_list;
    } catch (error) {
      console.warn("Error getting folders", error);
      return [];
    }
  }
  get_link_target_path(link_path, file_path) {
    return this.app.metadataCache.getFirstLinkpathDest(link_path, file_path)?.path;
  }
  // SUPPORTERS
  async render_code_block(contents, container, ctx) {
    let frag;
    if (contents.trim().length) {
      frag = await this.env.smart_sources.render_lookup(
        container,
        {
          add_result_listeners: this.add_result_listeners.bind(this),
          attribution: this.attribution,
          query: contents
        }
      );
    } else {
      const entity = this.env.smart_sources.get(ctx.sourcePath);
      if (!entity) return container.innerHTML = "Entity not found: " + ctx.sourcePath;
      frag = await entity.render_connections(
        container,
        {
          add_result_listeners: this.add_result_listeners.bind(this),
          attribution: this.attribution,
          refresh_smart_view: () => {
            this.render_code_block(contents, container, ctx);
          },
          open_lookup_view: this.open_lookup_view.bind(this)
        }
      );
    }
  }
  async render_code_block_context(results, container, ctx) {
    results = this.get_entities_from_context_codeblock(results);
    container.innerHTML = this.view.render_template("smart_connections", { current_path: "context", results });
    container.querySelectorAll(".sc-result").forEach((elm, i) => this.view.add_link_listeners(elm, results[i]));
    container.querySelectorAll(".sc-result:not(.sc-collapsed) ul li").forEach(this.view.render_result.bind(this.view));
  }
  get_entities_from_context_codeblock(results) {
    return results.split("\n").map((key) => {
      const entity = key.includes("#") ? this.env.smart_blocks.get(key) : this.env.smart_sources.get(key);
      return entity ? entity : { name: "Not found: " + key };
    });
  }
  // change code block
  async change_code_block(source, el, ctx) {
    const el_class = el.classList[0];
    const codeblock_type = el_class.replace("block-language-", "");
    const renderer = new ScActionsUx(this, el, codeblock_type);
    renderer.change_code_block(source);
  }
  async update_early_access() {
    if (!this.settings.license_key) return this.show_notice("Supporter license key required for early access update");
    const v2 = await this.obsidian.requestUrl({
      url: "https://sync.smartconnections.app/download_v2",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key: this.settings.license_key
      })
    });
    if (v2.status !== 200) return console.error("Error downloading early access update", v2);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/main.js", v2.json.main);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/manifest.json", v2.json.manifest);
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/styles.css", v2.json.styles);
    await window.app.plugins.loadManifests();
    await this.restart_plugin();
  }
  get plugin_is_enabled() {
    return this.app?.plugins?.enabledPlugins?.has("smart-connections");
  }
  // WAIT FOR OBSIDIAN SYNC
  async wait_for_obsidian_sync() {
    while (this.obsidian_is_syncing) {
      if (!this.plugin_is_enabled) throw new Error("Smart Connections: plugin disabled while waiting for obsidian sync");
      console.log("Smart Connections: Waiting for Obsidian Sync to finish");
      await new Promise((r) => setTimeout(r, 1e3));
    }
  }
  get obsidian_is_syncing() {
    const obsidian_sync_instance = this.app?.internalPlugins?.plugins?.sync?.instance;
    if (!obsidian_sync_instance) return false;
    if (obsidian_sync_instance?.syncStatus.startsWith("Uploading")) return false;
    if (obsidian_sync_instance?.syncStatus.startsWith("Fully synced")) return false;
    return obsidian_sync_instance?.syncing;
  }
  // main settings
  async load_settings() {
    const settings = default_settings().settings;
    const saved_settings = await this.loadData();
    Object.assign(settings, saved_settings || {});
    return settings;
  }
  async save_settings(settings = this.smart_settings._settings) {
    await this.saveData(settings);
  }
  get system_prompts() {
    const folder = this.env.settings?.smart_chats?.prompts_path || this.settings.system_prompts_folder;
    return this.app.vault.getMarkdownFiles().filter((file) => file.path.includes(folder) || file.path.includes(".prompt") || file.path.includes(".sp"));
  }
  // FROM ScSettings
  async force_refresh() {
    this.env.smart_blocks.clear();
    this.env.smart_sources.clear();
    await this.env.smart_sources.init();
    Object.values(this.env.smart_sources.items).forEach((item) => item.queue_import());
    await this.env.smart_sources.process_import_queue();
  }
  async exclude_all_top_level_folders() {
    const folders = (await this.app.vault.adapter.list("/")).folders;
    const input = document.querySelector("#smart-connections-settings div[data-setting='folder_exclusions'] input");
    input.value = folders.join(", ");
    input.dispatchEvent(new Event("input"));
    this.update_exclusions();
  }
  async update_exclusions() {
    this.env.smart_sources.smart_fs = null;
    console.log("render_file_counts");
    const elm = document.querySelector("#smart-connections-settings #file-counts");
    elm.setText(`Included files: ${this.included_files} / Total files: ${this.total_files}`);
  }
  async toggle_mobile(setting, value, elm) {
    const manifest = JSON.parse(await this.app.vault.adapter.read(".obsidian/plugins/smart-connections/manifest.json"));
    manifest.isDesktopOnly = !value;
    await this.app.vault.adapter.write(".obsidian/plugins/smart-connections/manifest.json", JSON.stringify(manifest, null, 2));
    console.log("Manifest written");
    this.restart_plugin();
  }
  // // TODO: re-implement in plugin initialization
  // /**
  //  * Loads settings specific to Obsidian for backwards compatibility.
  //  * @returns {Promise<void>} A promise that resolves when Obsidian settings have been loaded.
  //  */
  // async load_obsidian_settings() {
  //   if (this._settings.is_obsidian_vault && this.env.smart_connections_plugin) {
  //     const obsidian_settings = this._settings.smart_connections_plugin;
  //     console.log("obsidian_settings", obsidian_settings, this._settings);
  //     if(obsidian_settings){
  //       this.transform_backwards_compatible_settings(obsidian_settings);
  //       await this.save_settings();
  //       this.env.smart_connections_plugin.save_settings(obsidian_settings);
  //     }
  //   }
  // }
  // /**
  //  * Transforms settings to maintain backwards compatibility with older configurations.
  //  * @param {Object} os - The old settings object to transform.
  //  */
  // transform_backwards_compatible_settings(os) {
  //   // move muted notices to main 2024-09-27
  //   if(this.env._settings.smart_notices){
  //     if(!os.smart_notices) os.smart_notices = {};
  //     os.smart_notices.muted = {...this.env._settings.smart_notices.muted};
  //     delete this.env._settings.smart_notices;
  //   }
  //   // rename to model_key
  //   if(this.env._settings.smart_sources?.embed_model_key){
  //     if(!this.env._settings.smart_sources.embed_model) this.env._settings.smart_sources.embed_model = {};
  //     this.env._settings.smart_sources.embed_model.model_key = this.env._settings.smart_sources.embed_model_key;
  //     delete this.env._settings.smart_sources.embed_model_key;
  //   }
  //   // rename to embed_model
  //   if (os.smart_sources_embed_model) {
  //     if (!this.env._settings.smart_sources) this.env._settings.smart_sources = {};
  //     if (!this.env._settings.smart_sources.embed_model) this.env._settings.smart_sources.embed_model = {};
  //     if (!this.env._settings.smart_sources.embed_model.model_key) this.env._settings.smart_sources.embed_model.model_key = os.smart_sources_embed_model;
  //     if (!this.env._settings.smart_sources.embed_model[os.smart_sources_embed_model]) this.env._settings.smart_sources.embed_model[os.smart_sources_embed_model] = {};
  //     delete os.smart_sources_embed_model;
  //   }
  //   // move from main to embed_model in env
  //   if (os.smart_blocks_embed_model) {
  //     if (!this.env._settings.smart_blocks) this.env._settings.smart_blocks = {};
  //     if (!this.env._settings.smart_blocks.embed_model) this.env._settings.smart_blocks.embed_model = {};
  //     if (!this.env._settings.smart_blocks.embed_model.model_key) this.env._settings.smart_blocks.embed_model.model_key = os.smart_blocks_embed_model;
  //     if (!this.env._settings.smart_blocks.embed_model[os.smart_blocks_embed_model]) this.env._settings.smart_blocks.embed_model[os.smart_blocks_embed_model] = {};
  //     delete os.smart_blocks_embed_model;
  //   }
  //   if (os.api_key) {
  //     Object.entries(this.env._settings.smart_sources?.embed_model || {}).forEach(([key, value]) => {
  //       if (key.startsWith('text')) value.api_key = os.api_key;
  //       if (os.embed_input_min_chars && typeof value === 'object' && !value.min_chars) value.min_chars = os.embed_input_min_chars;
  //     });
  //     Object.entries(this.env._settings.smart_blocks?.embed_model || {}).forEach(([key, value]) => {
  //       if (key.startsWith('text')) value.api_key = os.api_key;
  //       if (os.embed_input_min_chars && typeof value === 'object' && !value.min_chars) value.min_chars = os.embed_input_min_chars;
  //     });
  //     delete os.api_key;
  //     delete os.embed_input_min_chars;
  //   }
  //   if(os.muted_notices) {
  //     if(!this.env._settings.smart_notices) this.env._settings.smart_notices = {};
  //     this.env._settings.smart_notices.muted = {...os.muted_notices};
  //     delete os.muted_notices;
  //   }
  //   if(os.smart_connections_folder){
  //     if(!os.env_data_dir) os.env_data_dir = os.smart_connections_folder;
  //     delete os.smart_connections_folder;
  //   }
  //   if(os.smart_connections_folder_last){
  //     os.env_data_dir_last = os.smart_connections_folder_last;
  //     delete os.smart_connections_folder_last;
  //   }
  //   if(os.file_exclusions){
  //     if(!this.env._settings.file_exclusions || this.env._settings.file_exclusions === 'Untitled') this.env._settings.file_exclusions = os.file_exclusions;
  //     delete os.file_exclusions;
  //   }
  //   if(os.folder_exclusions){
  //     if(!this.env._settings.folder_exclusions || this.env._settings.folder_exclusions === 'smart-chats') this.env._settings.folder_exclusions = os.folder_exclusions;
  //     delete os.folder_exclusions;
  //   }
  //   if(os.system_prompts_folder){
  //     if(!this.env._settings.smart_chats) this.env._settings.smart_chats = {};
  //     if(!this.env._settings.smart_chats?.prompts_path) this.env._settings.smart_chats.prompts_path = os.system_prompts_folder;
  //     delete os.system_prompts_folder;
  //   }
  //   if(os.smart_chat_folder){
  //     if(!this.env._settings.smart_chats) this.env._settings.smart_chats = {};
  //     if(!this.env._settings.smart_chats?.fs_path) this.env._settings.smart_chats.fs_path = os.smart_chat_folder;
  //     delete os.smart_chat_folder;
  //   }
  // }
  remove_setting_elm(path, value, elm) {
    elm.remove();
  }
  // ENTITIES VIEW
  add_result_listeners(elm, source) {
    const toggle_result = async (result) => {
      result.classList.toggle("sc-collapsed");
      if (!result.querySelector("li").innerHTML) {
        const collection_key = result.dataset.collection;
        const entity = this.env[collection_key].get(result.dataset.path);
        await entity.render_item(result.querySelector("li"));
      }
    };
    const handle_result_click = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      const result = target.closest(".sc-result");
      if (target.classList.contains("svg-icon")) {
        toggle_result(result);
        return;
      }
      const link = result.dataset.link || result.dataset.path;
      if (result.classList.contains("sc-collapsed")) {
        if (this.obsidian.Keymap.isModEvent(event)) {
          console.log("open_note", link);
          this.open_note(link, event);
        } else {
          toggle_result(result);
        }
      } else {
        console.log("open_note", link);
        this.open_note(link, event);
      }
    };
    elm.addEventListener("click", handle_result_click.bind(this));
    const path = elm.querySelector("li").dataset.key;
    elm.addEventListener("dragstart", (event) => {
      const drag_manager = this.app.dragManager;
      const file_path = path.split("#")[0];
      const file = this.app.metadataCache.getFirstLinkpathDest(file_path, "");
      const drag_data = drag_manager.dragFile(event, file);
      drag_manager.onDragStart(event, drag_data);
    });
    if (path.indexOf("{") === -1) {
      elm.addEventListener("mouseover", (event) => {
        this.app.workspace.trigger("hover-link", {
          event,
          // source: this.constructor.view_type,
          source,
          hoverParent: elm.parentElement,
          targetEl: elm,
          linktext: path
        });
      });
    }
  }
};


/* nosourcemap */