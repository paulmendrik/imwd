import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_each_argument, a as validate_slots, e as empty, b as insert_dev, c as detach_dev, n as noop, f as destroy_each, H as HtmlTag, g as element, t as text, h as claim_element, j as children, k as claim_text, l as add_location, m as attr_dev, o as append_dev, p as listen_dev, q as space, r as claim_space, u as toggle_class, w as query_selector_all, x as create_component, y as claim_component, z as mount_component, A as set_data_dev, B as transition_in, C as transition_out, D as destroy_component, E as check_outros, F as group_outros } from './client.1f35c9e1.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var browserPonyfill = createCommonjsModule(function (module, exports) {
var __self__ = (function (root) {
function F() {
this.fetch = false;
this.DOMException = root.DOMException;
}
F.prototype = root;
return new F();
})(typeof self !== 'undefined' ? self : commonjsGlobal);
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  return exports;

}({}));
})(__self__);
delete __self__.fetch.polyfill;
exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'
exports.default = __self__.fetch; // For TypeScript consumers without esModuleInterop.
exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'
exports.Headers = __self__.Headers;
exports.Request = __self__.Request;
exports.Response = __self__.Response;
module.exports = exports;
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Variation = /** @class */ (function () {
    function Variation(data) {
        this.data = {};
        this.data = data;
    }
    Variation.prototype.id = function () {
        return this.data.id;
    };
    Variation.prototype.ref = function () {
        return this.data.ref;
    };
    Variation.prototype.label = function () {
        return this.data.label;
    };
    return Variation;
}());
var Experiment = /** @class */ (function () {
    function Experiment(data) {
        this.data = {};
        this.data = data;
        this.variations = (data.variations || []).map(function (v) {
            return new Variation(v);
        });
    }
    Experiment.prototype.id = function () {
        return this.data.id;
    };
    Experiment.prototype.googleId = function () {
        return this.data.googleId;
    };
    Experiment.prototype.name = function () {
        return this.data.name;
    };
    return Experiment;
}());
var Experiments = /** @class */ (function () {
    function Experiments(data) {
        if (data) {
            this.drafts = (data.drafts || []).map(function (exp) {
                return new Experiment(exp);
            });
            this.running = (data.running || []).map(function (exp) {
                return new Experiment(exp);
            });
        }
    }
    Experiments.prototype.current = function () {
        if (this.running.length > 0) {
            return this.running[0];
        }
        else {
            return null;
        }
    };
    Experiments.prototype.refFromCookie = function (cookie) {
        if (!cookie || cookie.trim() === '')
            return null;
        var splitted = cookie.trim().split(' ');
        if (splitted.length < 2)
            return null;
        var expId = splitted[0];
        var varIndex = parseInt(splitted[1], 10);
        var exp = this.running.filter(function (exp) {
            return exp.googleId() === expId && exp.variations.length > varIndex;
        })[0];
        return exp ? exp.variations[varIndex].ref() : null;
    };
    return Experiments;
}());

var LazySearchForm = /** @class */ (function () {
    function LazySearchForm(id, api) {
        this.id = id;
        this.api = api;
        this.fields = {};
    }
    LazySearchForm.prototype.set = function (key, value) {
        this.fields[key] = value;
        return this;
    };
    LazySearchForm.prototype.ref = function (ref) {
        return this.set('ref', ref);
    };
    LazySearchForm.prototype.query = function (query) {
        return this.set('q', query);
    };
    LazySearchForm.prototype.pageSize = function (size) {
        return this.set('pageSize', size);
    };
    LazySearchForm.prototype.fetch = function (fields) {
        console.warn('Warning: Using Fetch is deprecated. Use the property `graphQuery` instead.');
        return this.set('fetch', fields);
    };
    LazySearchForm.prototype.fetchLinks = function (fields) {
        console.warn('Warning: Using FetchLinks is deprecated. Use the property `graphQuery` instead.');
        return this.set('fetchLinks', fields);
    };
    LazySearchForm.prototype.graphQuery = function (query) {
        return this.set('graphQuery', query);
    };
    LazySearchForm.prototype.lang = function (langCode) {
        return this.set('lang', langCode);
    };
    LazySearchForm.prototype.page = function (p) {
        return this.set('page', p);
    };
    LazySearchForm.prototype.after = function (documentId) {
        return this.set('after', documentId);
    };
    LazySearchForm.prototype.orderings = function (orderings) {
        return this.set('orderings', orderings);
    };
    LazySearchForm.prototype.url = function () {
        var _this = this;
        return this.api.get().then(function (api) {
            return LazySearchForm.toSearchForm(_this, api).url();
        });
    };
    LazySearchForm.prototype.submit = function (cb) {
        var _this = this;
        return this.api.get().then(function (api) {
            return LazySearchForm.toSearchForm(_this, api).submit(cb);
        });
    };
    LazySearchForm.toSearchForm = function (lazyForm, api) {
        var form = api.form(lazyForm.id);
        if (form) {
            return Object.keys(lazyForm.fields).reduce(function (form, fieldKey) {
                var fieldValue = lazyForm.fields[fieldKey];
                if (fieldKey === 'q') {
                    return form.query(fieldValue);
                }
                else if (fieldKey === 'pageSize') {
                    return form.pageSize(fieldValue);
                }
                else if (fieldKey === 'fetch') {
                    return form.fetch(fieldValue);
                }
                else if (fieldKey === 'fetchLinks') {
                    return form.fetchLinks(fieldValue);
                }
                else if (fieldKey === 'graphQuery') {
                    return form.graphQuery(fieldValue);
                }
                else if (fieldKey === 'lang') {
                    return form.lang(fieldValue);
                }
                else if (fieldKey === 'page') {
                    return form.page(fieldValue);
                }
                else if (fieldKey === 'after') {
                    return form.after(fieldValue);
                }
                else if (fieldKey === 'orderings') {
                    return form.orderings(fieldValue);
                }
                else {
                    return form.set(fieldKey, fieldValue);
                }
            }, form);
        }
        else {
            throw new Error("Unable to access to form " + lazyForm.id);
        }
    };
    return LazySearchForm;
}());
var SearchForm = /** @class */ (function () {
    function SearchForm(form, httpClient) {
        this.httpClient = httpClient;
        this.form = form;
        this.data = {};
        for (var field in form.fields) {
            if (form.fields[field]['default']) {
                this.data[field] = [form.fields[field]['default']];
            }
        }
    }
    SearchForm.prototype.set = function (field, value) {
        var fieldDesc = this.form.fields[field];
        if (!fieldDesc)
            throw new Error('Unknown field ' + field);
        var checkedValue = value === '' || value === undefined ? null : value;
        var values = this.data[field] || [];
        if (fieldDesc.multiple) {
            values = checkedValue ? values.concat([checkedValue]) : values;
        }
        else {
            values = checkedValue ? [checkedValue] : values;
        }
        this.data[field] = values;
        return this;
    };
    /**
     * Sets a ref to query on for this SearchForm. This is a mandatory
     * method to call before calling submit(), and api.form('everything').submit()
     * will not work.
     */
    SearchForm.prototype.ref = function (ref) {
        return this.set('ref', ref);
    };
    /**
     * Sets a predicate-based query for this SearchForm. This is where you
     * paste what you compose in your prismic.io API browser.
     */
    SearchForm.prototype.query = function (query) {
        if (typeof query === 'string') {
            return this.query([query]);
        }
        else if (Array.isArray(query)) {
            return this.set('q', "[" + query.join('') + "]");
        }
        else {
            throw new Error("Invalid query : " + query);
        }
    };
    /**
     * Sets a page size to query for this SearchForm. This is an optional method.
     *
     * @param {number} size - The page size
     * @returns {SearchForm} - The SearchForm itself
     */
    SearchForm.prototype.pageSize = function (size) {
        return this.set('pageSize', size);
    };
    /**
     * Restrict the results document to the specified fields
     */
    SearchForm.prototype.fetch = function (fields) {
        console.warn('Warning: Using Fetch is deprecated. Use the property `graphQuery` instead.');
        var strFields = Array.isArray(fields) ? fields.join(',') : fields;
        return this.set('fetch', strFields);
    };
    /**
     * Include the requested fields in the DocumentLink instances in the result
     */
    SearchForm.prototype.fetchLinks = function (fields) {
        console.warn('Warning: Using FetchLinks is deprecated. Use the property `graphQuery` instead.');
        var strFields = Array.isArray(fields) ? fields.join(',') : fields;
        return this.set('fetchLinks', strFields);
    };
    /**
     * Sets the graphquery to query for this SearchForm. This is an optional method.
     */
    SearchForm.prototype.graphQuery = function (query) {
        return this.set('graphQuery', query);
    };
    /**
     * Sets the language to query for this SearchForm. This is an optional method.
     */
    SearchForm.prototype.lang = function (langCode) {
        return this.set('lang', langCode);
    };
    /**
     * Sets the page number to query for this SearchForm. This is an optional method.
     */
    SearchForm.prototype.page = function (p) {
        return this.set('page', p);
    };
    /**
     * Remove all the documents except for those after the specified document in the list. This is an optional method.
     */
    SearchForm.prototype.after = function (documentId) {
        return this.set('after', documentId);
    };
    /**
     * Sets the orderings to query for this SearchForm. This is an optional method.
     */
    SearchForm.prototype.orderings = function (orderings) {
        if (!orderings) {
            return this;
        }
        else {
            return this.set('orderings', "[" + orderings.join(',') + "]");
        }
    };
    /**
     * Build the URL to query
     */
    SearchForm.prototype.url = function () {
        var url = this.form.action;
        if (this.data) {
            var sep = (url.indexOf('?') > -1 ? '&' : '?');
            for (var key in this.data) {
                if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                    var values = this.data[key];
                    if (values) {
                        for (var i = 0; i < values.length; i++) {
                            url += sep + key + '=' + encodeURIComponent(values[i]);
                            sep = '&';
                        }
                    }
                }
            }
        }
        return url;
    };
    /**
     * Submits the query, and calls the callback function.
     */
    SearchForm.prototype.submit = function (cb) {
        return this.httpClient.cachedRequest(this.url()).then(function (response) {
            cb && cb(null, response);
            return response;
        }).catch(function (error) {
            cb && cb(error);
            throw error;
        });
    };
    return SearchForm;
}());

var OPERATOR = {
    at: 'at',
    not: 'not',
    missing: 'missing',
    has: 'has',
    any: 'any',
    in: 'in',
    fulltext: 'fulltext',
    similar: 'similar',
    numberGt: 'number.gt',
    numberLt: 'number.lt',
    numberInRange: 'number.inRange',
    dateBefore: 'date.before',
    dateAfter: 'date.after',
    dateBetween: 'date.between',
    dateDayOfMonth: 'date.day-of-month',
    dateDayOfMonthAfter: 'date.day-of-month-after',
    dateDayOfMonthBefore: 'date.day-of-month-before',
    dateDayOfWeek: 'date.day-of-week',
    dateDayOfWeekAfter: 'date.day-of-week-after',
    dateDayOfWeekBefore: 'date.day-of-week-before',
    dateMonth: 'date.month',
    dateMonthBefore: 'date.month-before',
    dateMonthAfter: 'date.month-after',
    dateYear: 'date.year',
    dateHour: 'date.hour',
    dateHourBefore: 'date.hour-before',
    dateHourAfter: 'date.hour-after',
    GeopointNear: 'geopoint.near',
};
function encode(value) {
    if (typeof value === 'string') {
        return "\"" + value + "\"";
    }
    else if (typeof value === 'number') {
        return value.toString();
    }
    else if (value instanceof Date) {
        return value.getTime().toString();
    }
    else if (Array.isArray(value)) {
        return "[" + value.map(function (v) { return encode(v); }).join(',') + "]";
    }
    else if (typeof value === "boolean") {
        return value.toString();
    }
    else {
        throw new Error("Unable to encode " + value + " of type " + typeof value);
    }
}
var geopoint = {
    near: function (fragment, latitude, longitude, radius) {
        return "[" + OPERATOR.GeopointNear + "(" + fragment + ", " + latitude + ", " + longitude + ", " + radius + ")]";
    },
};
var date = {
    before: function (fragment, before) {
        return "[" + OPERATOR.dateBefore + "(" + fragment + ", " + encode(before) + ")]";
    },
    after: function (fragment, after) {
        return "[" + OPERATOR.dateAfter + "(" + fragment + ", " + encode(after) + ")]";
    },
    between: function (fragment, before, after) {
        return "[" + OPERATOR.dateBetween + "(" + fragment + ", " + encode(before) + ", " + encode(after) + ")]";
    },
    dayOfMonth: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfMonth + "(" + fragment + ", " + day + ")]";
    },
    dayOfMonthAfter: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfMonthAfter + "(" + fragment + ", " + day + ")]";
    },
    dayOfMonthBefore: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfMonthBefore + "(" + fragment + ", " + day + ")]";
    },
    dayOfWeek: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfWeek + "(" + fragment + ", " + encode(day) + ")]";
    },
    dayOfWeekAfter: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfWeekAfter + "(" + fragment + ", " + encode(day) + ")]";
    },
    dayOfWeekBefore: function (fragment, day) {
        return "[" + OPERATOR.dateDayOfWeekBefore + "(" + fragment + ", " + encode(day) + ")]";
    },
    month: function (fragment, month) {
        return "[" + OPERATOR.dateMonth + "(" + fragment + ", " + encode(month) + ")]";
    },
    monthBefore: function (fragment, month) {
        return "[" + OPERATOR.dateMonthBefore + "(" + fragment + ", " + encode(month) + ")]";
    },
    monthAfter: function (fragment, month) {
        return "[" + OPERATOR.dateMonthAfter + "(" + fragment + ", " + encode(month) + ")]";
    },
    year: function (fragment, year) {
        return "[" + OPERATOR.dateYear + "(" + fragment + ", " + year + ")]";
    },
    hour: function (fragment, hour) {
        return "[" + OPERATOR.dateHour + "(" + fragment + ", " + hour + ")]";
    },
    hourBefore: function (fragment, hour) {
        return "[" + OPERATOR.dateHourBefore + "(" + fragment + ", " + hour + ")]";
    },
    hourAfter: function (fragment, hour) {
        return "[" + OPERATOR.dateHourAfter + "(" + fragment + ", " + hour + ")]";
    },
};
var number = {
    gt: function (fragment, value) {
        return "[" + OPERATOR.numberGt + "(" + fragment + ", " + value + ")]";
    },
    lt: function (fragment, value) {
        return "[" + OPERATOR.numberLt + "(" + fragment + ", " + value + ")]";
    },
    inRange: function (fragment, before, after) {
        return "[" + OPERATOR.numberInRange + "(" + fragment + ", " + before + ", " + after + ")]";
    },
};
var Predicates = {
    at: function (fragment, value) {
        return "[" + OPERATOR.at + "(" + fragment + ", " + encode(value) + ")]";
    },
    not: function (fragment, value) {
        return "[" + OPERATOR.not + "(" + fragment + ", " + encode(value) + ")]";
    },
    missing: function (fragment) {
        return "[" + OPERATOR.missing + "(" + fragment + ")]";
    },
    has: function (fragment) {
        return "[" + OPERATOR.has + "(" + fragment + ")]";
    },
    any: function (fragment, values) {
        return "[" + OPERATOR.any + "(" + fragment + ", " + encode(values) + ")]";
    },
    in: function (fragment, values) {
        return "[" + OPERATOR.in + "(" + fragment + ", " + encode(values) + ")]";
    },
    fulltext: function (fragment, value) {
        return "[" + OPERATOR.fulltext + "(" + fragment + ", " + encode(value) + ")]";
    },
    similar: function (documentId, maxResults) {
        return "[" + OPERATOR.similar + "(\"" + documentId + "\", " + maxResults + ")]";
    },
    date: date,
    dateBefore: date.before,
    dateAfter: date.after,
    dateBetween: date.between,
    dayOfMonth: date.dayOfMonth,
    dayOfMonthAfter: date.dayOfMonthAfter,
    dayOfMonthBefore: date.dayOfMonthBefore,
    dayOfWeek: date.dayOfWeek,
    dayOfWeekAfter: date.dayOfWeekAfter,
    dayOfWeekBefore: date.dayOfWeekBefore,
    month: date.month,
    monthBefore: date.monthBefore,
    monthAfter: date.monthAfter,
    year: date.year,
    hour: date.hour,
    hourBefore: date.hourBefore,
    hourAfter: date.hourAfter,
    number: number,
    gt: number.gt,
    lt: number.lt,
    inRange: number.inRange,
    near: geopoint.near,
    geopoint: geopoint,
};

/* eslint-disable */
// Some portions of code from https://github.com/jshttp/cookie
var decode = decodeURIComponent;
function tryDecode(str, decode) {
    try {
        return decode(str);
    }
    catch (e) {
        return str;
    }
}
function parse(str, options) {
    if (typeof str !== 'string') {
        throw new TypeError('argument str must be a string');
    }
    var obj = {};
    var opt = options || {};
    var pairs = str.split(/; */);
    var dec = opt.decode || decode;
    pairs.forEach(function (pair) {
        var eq_idx = pair.indexOf('=');
        // skip things that don't look like key=value
        if (eq_idx < 0) {
            return;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        // quoted values
        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }
        // only assign once
        if (undefined == obj[key]) {
            obj[key] = tryDecode(val, dec);
        }
    });
    return obj;
}
var Cookies = { parse: parse };

function createPreviewResolver(token, documentId, getDocByID) {
    var resolve = function (linkResolver, defaultUrl, cb) {
        if (documentId && getDocByID) {
            return getDocByID(documentId, { ref: token }).then(function (document) {
                if (!document) {
                    cb && cb(null, defaultUrl);
                    return defaultUrl;
                }
                else {
                    var url = (linkResolver && linkResolver(document)) || document.url || defaultUrl;
                    cb && cb(null, url);
                    return url;
                }
            });
        }
        else {
            return Promise.resolve(defaultUrl);
        }
    };
    return { token: token, documentId: documentId, resolve: resolve };
}

var PREVIEW_COOKIE = 'io.prismic.preview';
var EXPERIMENT_COOKIE = 'io.prismic.experiment';
var ResolvedApi = /** @class */ (function () {
    function ResolvedApi(data, httpClient, options) {
        this.data = data;
        this.masterRef = data.refs.filter(function (ref) { return ref.isMasterRef; })[0];
        this.experiments = new Experiments(data.experiments);
        this.bookmarks = data.bookmarks;
        this.httpClient = httpClient;
        this.options = options;
        this.refs = data.refs;
        this.tags = data.tags;
        this.types = data.types;
        this.languages = data.languages;
    }
    /**
     * Returns a useable form from its id, as described in the RESTful description of the API.
     * For instance: api.form("everything") works on every repository (as "everything" exists by default)
     * You can then chain the calls: api.form("everything").query('[[:d = at(document.id, "UkL0gMuvzYUANCpf")]]').ref(ref).submit()
     */
    ResolvedApi.prototype.form = function (formId) {
        var form = this.data.forms[formId];
        if (form) {
            return new SearchForm(form, this.httpClient);
        }
        return null;
    };
    ResolvedApi.prototype.everything = function () {
        var f = this.form('everything');
        if (!f)
            throw new Error('Missing everything form');
        return f;
    };
    /**
     * The ID of the master ref on this prismic.io API.
     * Do not use like this: searchForm.ref(api.master()).
     * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
     */
    ResolvedApi.prototype.master = function () {
        return this.masterRef.ref;
    };
    /**
     * Returns the ref ID for a given ref's label.
     * Do not use like this: searchForm.ref(api.ref("Future release label")).
     * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
     */
    ResolvedApi.prototype.ref = function (label) {
        var ref = this.data.refs.filter(function (ref) { return ref.label === label; })[0];
        return ref ? ref.ref : null;
    };
    ResolvedApi.prototype.currentExperiment = function () {
        return this.experiments.current();
    };
    /**
     * Query the repository
     */
    ResolvedApi.prototype.query = function (q, optionsOrCallback, cb) {
        if (cb === void 0) { cb = function () { }; }
        var _a = typeof optionsOrCallback === 'function'
            ? { options: {}, callback: optionsOrCallback }
            : { options: optionsOrCallback || {}, callback: cb }, options = _a.options, callback = _a.callback;
        var form = this.everything();
        for (var key in options) {
            form = form.set(key, options[key]);
        }
        if (!options.ref) {
            // Look in cookies if we have a ref (preview or experiment)
            var cookieString = '';
            if (this.options.req) { // NodeJS
                cookieString = this.options.req.headers['cookie'] || '';
            }
            else if (typeof window !== 'undefined' && window.document) { // Browser
                cookieString = window.document.cookie || '';
            }
            var cookies = Cookies.parse(cookieString);
            var previewRef = cookies[PREVIEW_COOKIE];
            var experimentRef = this.experiments.refFromCookie(cookies[EXPERIMENT_COOKIE]);
            form = form.ref(previewRef || experimentRef || this.masterRef.ref);
        }
        if (q) {
            form.query(q);
        }
        return form.submit(callback);
    };
    /**
     * Retrieve the document returned by the given query
     * @param {string|array|Predicate} the query
     * @param {object} additional parameters. In NodeJS, pass the request as 'req'.
     * @param {function} callback(err, doc)
     */
    ResolvedApi.prototype.queryFirst = function (q, optionsOrCallback, cb) {
        var _a = typeof optionsOrCallback === 'function'
            ? { options: {}, callback: optionsOrCallback }
            : { options: optionsOrCallback || {}, callback: cb || (function () { }) }, options = _a.options, callback = _a.callback;
        options.page = 1;
        options.pageSize = 1;
        return this.query(q, options).then(function (response) {
            var document = response && response.results && response.results[0];
            callback(null, document);
            return document;
        }).catch(function (error) {
            callback(error);
            throw error;
        });
    };
    /**
     * Retrieve the document with the given id
     */
    ResolvedApi.prototype.getByID = function (id, maybeOptions, cb) {
        var options = maybeOptions ? __assign({}, maybeOptions) : {};
        if (!options.lang)
            options.lang = '*';
        return this.queryFirst(Predicates.at('document.id', id), options, cb);
    };
    /**
     * Retrieve multiple documents from an array of id
     */
    ResolvedApi.prototype.getByIDs = function (ids, maybeOptions, cb) {
        var options = maybeOptions ? __assign({}, maybeOptions) : {};
        if (!options.lang)
            options.lang = '*';
        return this.query(Predicates.in('document.id', ids), options, cb);
    };
    /**
     * Retrieve the document with the given uid
     */
    ResolvedApi.prototype.getByUID = function (type, uid, maybeOptions, cb) {
        var options = maybeOptions ? __assign({}, maybeOptions) : {};
        if (options.lang === '*')
            throw new Error("FORBIDDEN. You can't use getByUID with *, use the predicates instead.");
        if (!options.page)
            options.page = 1;
        return this.queryFirst(Predicates.at("my." + type + ".uid", uid), options, cb);
    };
    /**
     * Retrieve the singleton document with the given type
     */
    ResolvedApi.prototype.getSingle = function (type, maybeOptions, cb) {
        var options = maybeOptions ? __assign({}, maybeOptions) : {};
        return this.queryFirst(Predicates.at('document.type', type), options, cb);
    };
    /**
     * Retrieve the document with the given bookmark
     */
    ResolvedApi.prototype.getBookmark = function (bookmark, maybeOptions, cb) {
        var id = this.data.bookmarks[bookmark];
        if (id) {
            return this.getByID(id, maybeOptions, cb);
        }
        else {
            return Promise.reject('Error retrieving bookmarked id');
        }
    };
    ResolvedApi.prototype.getPreviewResolver = function (token, documentId) {
        return createPreviewResolver(token, documentId, this.getByID.bind(this));
    };
    ResolvedApi.prototype.previewSession = function (token, linkResolver, defaultUrl, cb) {
        var _this = this;
        console.warn('previewSession function is deprecated in favor of getPreviewResolver function.');
        return new Promise(function (resolve, reject) {
            _this.httpClient.request(token, function (e, result) {
                if (e) {
                    cb && cb(e);
                    reject(e);
                }
                else if (result) {
                    if (!result.mainDocument) {
                        cb && cb(null, defaultUrl);
                        resolve(defaultUrl);
                    }
                    else {
                        return _this.getByID(result.mainDocument, { ref: token }).then(function (document) {
                            if (!document) {
                                cb && cb(null, defaultUrl);
                                resolve(defaultUrl);
                            }
                            else {
                                var url = (linkResolver && linkResolver(document)) || document.url || defaultUrl;
                                cb && cb(null, url);
                                resolve(url);
                            }
                        }).catch(reject);
                    }
                }
            });
        });
    };
    return ResolvedApi;
}());

/* eslint-disable */
/**
* A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
* recently used items while discarding least recently used items when its limit
* is reached.
*
* Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
* Typescript-ified by Oleksandr Nikitin <https://tvori.info>
*
* Illustration of the design:
*
*       entry             entry             entry             entry
*       ______            ______            ______            ______
*      | head |.newer => |      |.newer => |      |.newer => | tail |
*      |  A   |          |  B   |          |  C   |          |  D   |
*      |______| <= older.|______| <= older.|______| <= older.|______|
*
*  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
*/
function MakeLRUCache(limit) {
    return new LRUCache(limit);
}
function LRUCache(limit) {
    // Current size of the cache. (Read-only).
    this.size = 0;
    // Maximum number of items this cache can hold.
    this.limit = limit;
    this._keymap = {};
}
/**
 * Put <value> into the cache associated with <key>. Returns the entry which was
 * removed to make room for the new entry. Otherwise undefined is returned
 * (i.e. if there was enough room already).
 */
LRUCache.prototype.put = function (key, value) {
    var entry = { key: key, value: value };
    // Note: No protection agains replacing, and thus orphan entries. By design.
    this._keymap[key] = entry;
    if (this.tail) {
        // link previous tail to the new tail (entry)
        this.tail.newer = entry;
        entry.older = this.tail;
    }
    else {
        // we're first in -- yay
        this.head = entry;
    }
    // add new entry to the end of the linked list -- it's now the freshest entry.
    this.tail = entry;
    if (this.size === this.limit) {
        // we hit the limit -- remove the head
        return this.shift();
    }
    else {
        // increase the size counter
        this.size++;
    }
};
/**
 * Purge the least recently used (oldest) entry from the cache. Returns the
 * removed entry or undefined if the cache was empty.
 *
 * If you need to perform any form of finalization of purged items, this is a
 * good place to do it. Simply override/replace this function:
 *
 *   var c = new LRUCache(123);
 *   c.shift = function() {
 *     var entry = LRUCache.prototype.shift.call(this);
 *     doSomethingWith(entry);
 *     return entry;
 *   }
 */
LRUCache.prototype.shift = function () {
    // todo: handle special case when limit == 1
    var entry = this.head;
    if (entry) {
        if (this.head.newer) {
            this.head = this.head.newer;
            this.head.older = undefined;
        }
        else {
            this.head = undefined;
        }
        // Remove last strong reference to <entry> and remove links from the purged
        // entry being returned:
        entry.newer = entry.older = undefined;
        // delete is slow, but we need to do this to avoid uncontrollable growth:
        delete this._keymap[entry.key];
    }
    console.log('purging ', entry.key);
    return entry;
};
/**
 * Get and register recent use of <key>. Returns the value associated with <key>
 * or undefined if not in cache.
 */
LRUCache.prototype.get = function (key, returnEntry) {
    // First, find our cache entry
    var entry = this._keymap[key];
    if (entry === undefined)
        return; // Not cached. Sorry.
    // As <key> was found in the cache, register it as being requested recently
    if (entry === this.tail) {
        // Already the most recently used entry, so no need to update the list
        return returnEntry ? entry : entry.value;
    }
    // HEAD--------------TAIL
    //   <.older   .newer>
    //  <--- add direction --
    //   A  B  C  <D>  E
    if (entry.newer) {
        if (entry === this.head)
            this.head = entry.newer;
        entry.newer.older = entry.older; // C <-- E.
    }
    if (entry.older)
        entry.older.newer = entry.newer; // C. --> E
    entry.newer = undefined; // D --x
    entry.older = this.tail; // D. --> E
    if (this.tail)
        this.tail.newer = entry; // E. <-- D
    this.tail = entry;
    return returnEntry ? entry : entry.value;
};
// ----------------------------------------------------------------------------
// Following code is optional and can be removed without breaking the core
// functionality.
/**
 * Check if <key> is in the cache without registering recent use. Feasible if
 * you do not want to chage the state of the cache, but only "peek" at it.
 * Returns the entry associated with <key> if found, or undefined if not found.
 */
LRUCache.prototype.find = function (key) {
    return this._keymap[key];
};
/**
 * Update the value of entry with <key>. Returns the old value, or undefined if
 * entry was not in the cache.
 */
LRUCache.prototype.set = function (key, value) {
    var oldvalue;
    var entry = this.get(key, true);
    if (entry) {
        oldvalue = entry.value;
        entry.value = value;
    }
    else {
        oldvalue = this.put(key, value);
        if (oldvalue)
            oldvalue = oldvalue.value;
    }
    return oldvalue;
};
/**
 * Remove entry <key> from cache and return its value. Returns undefined if not
 * found.
 */
LRUCache.prototype.remove = function (key) {
    var entry = this._keymap[key];
    if (!entry)
        return;
    delete this._keymap[entry.key]; // need to do delete unfortunately
    if (entry.newer && entry.older) {
        // relink the older entry with the newer entry
        entry.older.newer = entry.newer;
        entry.newer.older = entry.older;
    }
    else if (entry.newer) {
        // remove the link to us
        entry.newer.older = undefined;
        // link the newer entry to head
        this.head = entry.newer;
    }
    else if (entry.older) {
        // remove the link to us
        entry.older.newer = undefined;
        // link the newer entry to head
        this.tail = entry.older;
    }
    else { // if(entry.older === undefined && entry.newer === undefined) {
        this.head = this.tail = undefined;
    }
    this.size--;
    return entry.value;
};
/** Removes all entries */
LRUCache.prototype.removeAll = function () {
    // This should be safe, as we never expose strong refrences to the outside
    this.head = this.tail = undefined;
    this.size = 0;
    this._keymap = {};
};
/**
 * Return an array containing all keys of entries stored in the cache object, in
 * arbitrary order.
 */
if (typeof Object.keys === 'function') {
    LRUCache.prototype.keys = function () { return Object.keys(this._keymap); };
}
else {
    LRUCache.prototype.keys = function () {
        var keys = [];
        for (var k in this._keymap)
            keys.push(k);
        return keys;
    };
}
/**
 * Call `fun` for each entry. Starting with the newest entry if `desc` is a true
 * value, otherwise starts with the oldest (head) enrty and moves towards the
 * tail.
 *
 * `fun` is called with 3 arguments in the context `context`:
 *   `fun.call(context, Object key, Object value, LRUCache self)`
 */
LRUCache.prototype.forEach = function (fun, context, desc) {
    var entry;
    if (context === true) {
        desc = true;
        context = undefined;
    }
    else if (typeof context !== 'object')
        context = this;
    if (desc) {
        entry = this.tail;
        while (entry) {
            fun.call(context, entry.key, entry.value, this);
            entry = entry.older;
        }
    }
    else {
        entry = this.head;
        while (entry) {
            fun.call(context, entry.key, entry.value, this);
            entry = entry.newer;
        }
    }
};
/** Returns a JSON (array) representation */
//LRUCache.prototype.toJSON = function () {
//    var s: IEntry[] = [], entry = this.head;
//    while (entry) {
//        s.push({ key: entry.key.toJSON(), value: entry.value.toJSON() });
//        entry = entry.newer;
//    }
//    return s;
//};
/** Returns a String representation */
LRUCache.prototype.toString = function () {
    var s = '', entry = this.head;
    while (entry) {
        s += String(entry.key) + ':' + entry.value;
        entry = entry.newer;
        if (entry)
            s += ' < ';
    }
    return s;
};
// Export ourselves
//if (typeof this === 'object') this.LRUCache = LRUCache;

var DefaultApiCache = /** @class */ (function () {
    function DefaultApiCache(limit) {
        if (limit === void 0) { limit = 1000; }
        this.lru = MakeLRUCache(limit);
    }
    DefaultApiCache.prototype.isExpired = function (key) {
        var value = this.lru.get(key, false);
        if (value) {
            return value.expiredIn !== 0 && value.expiredIn < Date.now();
        }
        else {
            return false;
        }
    };
    DefaultApiCache.prototype.get = function (key, cb) {
        var value = this.lru.get(key, false);
        if (value && !this.isExpired(key)) {
            cb(null, value.data);
        }
        else {
            cb && cb(null);
        }
    };
    DefaultApiCache.prototype.set = function (key, value, ttl, cb) {
        this.lru.remove(key);
        this.lru.put(key, {
            data: value,
            expiredIn: ttl ? (Date.now() + (ttl * 1000)) : 0,
        });
        cb && cb(null);
    };
    DefaultApiCache.prototype.remove = function (key, cb) {
        this.lru.remove(key);
        cb && cb(null);
    };
    DefaultApiCache.prototype.clear = function (cb) {
        this.lru.removeAll();
        cb && cb(null);
    };
    return DefaultApiCache;
}());

function fetchRequest(url, options, callback) {
    var fetchOptions = {
        headers: {
            Accept: 'application/json',
        },
    };
    if (options && options.proxyAgent) {
        fetchOptions.agent = options.proxyAgent;
    }
    // can't use number because of NodeJS globals included
    var timeoutId;
    var fetchPromise = browserPonyfill(url, fetchOptions);
    var promise = options.timeoutInMs ? Promise.race([
        fetchPromise,
        new Promise(function (_, reject) {
            timeoutId = setTimeout(function () { return reject(new Error(url + " response timeout")); }, options.timeoutInMs);
        })
    ]) : fetchPromise;
    promise.then(function (resp) {
        clearTimeout(timeoutId);
        if (~~(resp.status / 100 !== 2)) {
            /**
             * @description
             * drain the resp before throwing an error to prevent memory leaks
             * @link https://github.com/bitinn/node-fetch/issues/83
             */
            return resp.text().then(function () {
                var e = new Error("Unexpected status code [" + resp.status + "] on URL " + url);
                e.status = resp.status;
                throw e;
            });
        }
        return resp.json().then(function (result) {
            var cacheControl = resp.headers.get('cache-control');
            var parsedCacheControl = cacheControl ? /max-age=(\d+)/.exec(cacheControl) : null;
            var ttl = parsedCacheControl ? parseInt(parsedCacheControl[1], 10) : undefined;
            callback(null, result, resp, ttl);
        });
    }).catch(function (err) {
        clearTimeout(timeoutId);
        callback(err);
    });
}
var DefaultRequestHandler = /** @class */ (function () {
    function DefaultRequestHandler(options) {
        this.options = options || {};
    }
    DefaultRequestHandler.prototype.request = function (url, callback) {
        fetchRequest(url, this.options, callback);
    };
    return DefaultRequestHandler;
}());

var HttpClient = /** @class */ (function () {
    function HttpClient(requestHandler, cache, proxyAgent, timeoutInMs) {
        this.requestHandler = requestHandler || new DefaultRequestHandler({ proxyAgent: proxyAgent, timeoutInMs: timeoutInMs });
        this.cache = cache || new DefaultApiCache();
    }
    HttpClient.prototype.request = function (url, callback) {
        this.requestHandler.request(url, function (err, result, xhr, ttl) {
            if (err) {
                callback && callback(err, null, xhr, ttl);
            }
            else if (result) {
                callback && callback(null, result, xhr, ttl);
            }
        });
    };
    /**
     * Fetch a URL corresponding to a query, and parse the response as a Response object
     */
    HttpClient.prototype.cachedRequest = function (url, maybeOptions) {
        var _this = this;
        var options = maybeOptions || {};
        var run = function (cb) {
            var cacheKey = options.cacheKey || url;
            _this.cache.get(cacheKey, function (cacheGetError, cacheGetValue) {
                if (cacheGetError || cacheGetValue) {
                    cb(cacheGetError, cacheGetValue);
                }
                else {
                    _this.request(url, function (fetchError, fetchValue, _, ttlReq) {
                        if (fetchError) {
                            cb(fetchError, null);
                        }
                        else {
                            var ttl = ttlReq || options.ttl;
                            if (ttl) {
                                _this.cache.set(cacheKey, fetchValue, ttl, cb);
                            }
                            cb(null, fetchValue);
                        }
                    });
                }
            });
        };
        return new Promise(function (resolve, reject) {
            run(function (err, value) {
                if (err)
                    reject(err);
                if (value)
                    resolve(value);
            });
        });
    };
    return HttpClient;
}());

function separator(url) {
    return url.indexOf('?') > -1 ? '&' : '?';
}
var Api = /** @class */ (function () {
    function Api(url, options) {
        this.options = options || {};
        this.url = url;
        if (this.options.accessToken) {
            var accessTokenParam = "access_token=" + this.options.accessToken;
            this.url += separator(url) + accessTokenParam;
        }
        if (this.options.routes) {
            this.url += separator(url) + ("routes=" + encodeURIComponent(JSON.stringify(this.options.routes)));
        }
        this.apiDataTTL = this.options.apiDataTTL || 5;
        this.httpClient = new HttpClient(this.options.requestHandler, this.options.apiCache, this.options.proxyAgent, this.options.timeoutInMs);
    }
    /**
     * Fetches data used to construct the api client, from cache if it's
     * present, otherwise from calling the prismic api endpoint (which is
     * then cached).
     */
    Api.prototype.get = function (cb) {
        var _this = this;
        return this.httpClient.cachedRequest(this.url, { ttl: this.apiDataTTL }).then(function (data) {
            var resolvedApi = new ResolvedApi(data, _this.httpClient, _this.options);
            cb && cb(null, resolvedApi);
            return resolvedApi;
        }).catch(function (error) {
            cb && cb(error);
            throw error;
        });
    };
    return Api;
}());

var DefaultClient = /** @class */ (function () {
    function DefaultClient(url, options) {
        this.api = new Api(url, options);
    }
    DefaultClient.prototype.getApi = function () {
        return this.api.get();
    };
    DefaultClient.prototype.everything = function () {
        return this.form('everything');
    };
    DefaultClient.prototype.form = function (formId) {
        return new LazySearchForm(formId, this.api);
    };
    DefaultClient.prototype.query = function (q, optionsOrCallback, cb) {
        return this.getApi().then(function (api) { return api.query(q, optionsOrCallback, cb); });
    };
    DefaultClient.prototype.queryFirst = function (q, optionsOrCallback, cb) {
        return this.getApi().then(function (api) { return api.queryFirst(q, optionsOrCallback, cb); });
    };
    DefaultClient.prototype.getByID = function (id, options, cb) {
        return this.getApi().then(function (api) { return api.getByID(id, options, cb); });
    };
    DefaultClient.prototype.getByIDs = function (ids, options, cb) {
        return this.getApi().then(function (api) { return api.getByIDs(ids, options, cb); });
    };
    DefaultClient.prototype.getByUID = function (type, uid, options, cb) {
        return this.getApi().then(function (api) { return api.getByUID(type, uid, options, cb); });
    };
    DefaultClient.prototype.getSingle = function (type, options, cb) {
        return this.getApi().then(function (api) { return api.getSingle(type, options, cb); });
    };
    DefaultClient.prototype.getBookmark = function (bookmark, options, cb) {
        return this.getApi().then(function (api) { return api.getBookmark(bookmark, options, cb); });
    };
    DefaultClient.prototype.previewSession = function (token, linkResolver, defaultUrl, cb) {
        return this.getApi().then(function (api) { return api.previewSession(token, linkResolver, defaultUrl, cb); });
    };
    DefaultClient.prototype.getPreviewResolver = function (token, documentId) {
        var _this = this;
        var getDocById = function (documentId, maybeOptions) { return _this.getApi().then(function (api) {
            return api.getByID(documentId, maybeOptions);
        }); };
        return createPreviewResolver(token, documentId, getDocById);
    };
    DefaultClient.getApi = function (url, options) {
        var api = new Api(url, options);
        return api.get();
    };
    return DefaultClient;
}());

var index = {
    experimentCookie: EXPERIMENT_COOKIE,
    previewCookie: PREVIEW_COOKIE,
    Predicates: Predicates,
    Experiments: Experiments,
    Api: Api,
    client: client,
    getApi: getApi,
    api: api,
};
function client(url, options) {
    return new DefaultClient(url, options);
}
function getApi(url, options) {
    return DefaultClient.getApi(url, options);
}
function api(url, options) {
    return getApi(url, options);
}

const apiEndpoint = "https://imwd.cdn.prismic.io/api/v2";
const Client = index.client(apiEndpoint);

var prismicDom_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1);},function(e,t,n){var r=n(2),o=n(3);e.exports={Link:r,Date:o};},function(e,t,n){e.exports={url:function(e,t){if(e&&[e.link_type,e._linkType,e.linkType].some((function(e){return e&&["Document","Link.Document","Link.document"].includes(e)}))&&t&&"function"==typeof t){var n=t(e);if(n)return n}return e&&e.url?e.url:""}};},function(e,t){e.exports=function(e){if(!e)return null;var t=24==e.length?"".concat(e.substring(0,22),":").concat(e.substring(22,24)):e;return new Date(t)};}]);},function(e,t,n){e.exports=n(2);},function(e,t,n){var r=n(0),o=n(3),i=r.Date,u=r.Link;e.exports={Date:i,Link:u,RichText:o};},function(e,t,n){var r=n(4),o=n(0).Link,i=n(5),u=r.Elements;function c(e,t,n,r,c){switch(t){case u.heading1:return l("h1",n,c);case u.heading2:return l("h2",n,c);case u.heading3:return l("h3",n,c);case u.heading4:return l("h4",n,c);case u.heading5:return l("h5",n,c);case u.heading6:return l("h6",n,c);case u.paragraph:return l("p",n,c);case u.preformatted:return function(e){return "<pre".concat(a(e),">").concat(i(e.text),"</pre>")}(n);case u.strong:return l("strong",n,c);case u.em:return l("em",n,c);case u.listItem:case u.oListItem:return l("li",n,c);case u.list:return l("ul",n,c);case u.oList:return l("ol",n,c);case u.image:return function(e,t){var n=t.linkTo?o.url(t.linkTo,e):null,r=t.linkTo&&t.linkTo.target?'target="'.concat(t.linkTo.target,'" rel="noopener"'):"",i=[t.label||"","block-img"],u='<img src="'.concat(t.url,'" alt="').concat(t.alt||"",'" copyright="').concat(t.copyright||"",'">');return '\n    <p class="'.concat(i.join(" "),'">\n      ').concat(n?"<a ".concat(r,' href="').concat(n,'">').concat(u,"</a>"):u,"\n    </p>\n  ")}(e,n);case u.embed:return function(e){return '\n    <div data-oembed="'.concat(e.oembed.embed_url,'"\n      data-oembed-type="').concat(e.oembed.type,'"\n      data-oembed-provider="').concat(e.oembed.provider_name,'"\n      ').concat(a(e),">\n          \n      ").concat(e.oembed.html,"\n    </div>\n  ")}(n);case u.hyperlink:return function(e,t,n){var r=t.data.target?'target="'.concat(t.data.target,'" rel="noopener"'):"";return "<a ".concat(r,' href="').concat(o.url(t.data,e),'">').concat(n.join(""),"</a>")}(e,n,c);case u.label:return function(e,t){return "<span ".concat(a(e.data),">").concat(t.join(""),"</span>")}(n,c);case u.span:return function(e){return e?i(e).replace(/\n/g,"<br />"):""}(r);default:return ""}}function a(e){return e.label?' class="'.concat(e.label,'"'):""}function l(e,t,n){return "<".concat(e).concat(a(t),">").concat(n.join(""),"</").concat(e,">")}e.exports={asText:function(e,t){return r.asText(e,t)},asHtml:function(e,t,n){return r.serialize(e,c.bind(null,t),n).join("")},Elements:u};},function(e,t,n){e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){var r=n(3);e.exports=function(e){return function t(n){return 0===arguments.length||r(n)?t:e.apply(this,arguments)}};},function(e,t,n){var r=n(0),o=n(3);e.exports=function(e){return function t(n,i){switch(arguments.length){case 0:return t;case 1:return o(n)?t:r((function(t){return e(n,t)}));default:return o(n)&&o(i)?t:o(n)?r((function(t){return e(t,i)})):o(i)?r((function(t){return e(n,t)})):e(n,i)}}};},function(e,t,n){var r;function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.PRIORITIES=t.NODE_TYPES=void 0;var i={heading1:"heading1",heading2:"heading2",heading3:"heading3",heading4:"heading4",heading5:"heading5",heading6:"heading6",paragraph:"paragraph",preformatted:"preformatted",strong:"strong",em:"em",listItem:"list-item",oListItem:"o-list-item",list:"group-list-item",oList:"group-o-list-item",image:"image",embed:"embed",hyperlink:"hyperlink",label:"label",span:"span"};t.NODE_TYPES=i;var u=(o(r={},i.heading1,4),o(r,i.heading2,4),o(r,i.heading3,4),o(r,i.heading4,4),o(r,i.heading5,4),o(r,i.heading6,4),o(r,i.paragraph,3),o(r,i.preformatted,5),o(r,i.strong,6),o(r,i.em,6),o(r,i.oList,1),o(r,i.list,1),o(r,i.listItem,1),o(r,i.oListItem,1),o(r,i.image,1),o(r,i.embed,1),o(r,i.hyperlink,3),o(r,i.label,4),o(r,i.span,7),r);t.PRIORITIES=u;},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e&&!0===e["@@functional/placeholder"]};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=d(n(12)),o=d(n(15)),i=d(n(16)),u=d(n(17)),c=d(n(21)),a=d(n(7)),l=n(23),f=n(2),s=n(8);function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function h(e){return function(e,t){return t.reduce((function(e,t){var n=(0, c.default)(e);if(n){if(n.some((function(e){return e.isParentOf(t)})))return (0, u.default)(e).concat([n.concat(t)]);var r=(0, c.default)(n);return r&&function(e,t){return e.end>=t.start}(r,t)?(0, u.default)(e).concat([n.concat(t)]):e.concat([[t]])}return [[t]]}),[])}(0,(0, i.default)([function(e,t){return e.start-t.start},function(e,t){return e.end-t.end}],e))}function y(e){if(0===e.length)throw new Error("Unable to elect node on empty list");var t=function(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(e.sort((function(e,t){if(e.isParentOf(t))return -1;if(t.isParentOf(e))return 1;var n=f.PRIORITIES[e.type]-f.PRIORITIES[t.type];return 0===n?e.text.length-t.text.length:n})));return {elected:t[0],others:t.slice(1)}}function v(e,t,n){if(t.length>0)return function(e,t,n){return t.reduce((function(r,o,i){var u=[],c=0===i&&o.start>n.lower,a=i===t.length-1&&n.upper>o.end;if(c){var l=new s.TextNode(n.lower,o.start,e.slice(n.lower,o.start));u=u.concat(l);}else {var f=t[i-1];if(f&&o.start>f.end){var d=e.slice(f.end,o.start),p=new s.TextNode(f.end,o.start,d);u=u.concat(p);}}if(u=u.concat(o),a){var h=new s.TextNode(o.end,n.upper,e.slice(o.end,n.upper));u=u.concat(h);}return r.concat(u)}),[])}(e,m(e,t),n);var r=e.slice(n.lower,n.upper);return [new s.TextNode(n.lower,n.upper,r)]}function m(e,t){var n=h((0, o.default)((function(e){return e.start}),t)).map(y),i=(0, r.default)(n.map((function(t){return function(e,t){var n=t.others.reduce((function(n,r){var o=n.inner,i=n.outer,u=function(e,t,n){return n.start<t.start?{inner:s.SpanNode.slice(n,t.start,n.end,e),outer:s.SpanNode.slice(n,n.start,t.start,e)}:n.end>t.end?{inner:s.SpanNode.slice(n,n.start,t.end,e),outer:s.SpanNode.slice(n,t.end,n.end,e)}:{inner:n}}(e,t.elected,r);return {inner:o.concat(u.inner),outer:u.outer?i.concat(u.outer):i}}),{inner:[],outer:[]}),r=n.inner,o=n.outer;return [t.elected.setChildren(v(e,r,t.elected.boundaries()))].concat(m(e,o))}(e,t)})));return (0, o.default)((function(e){return e.start}),i)}var b=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);}var t,n;return t=e,(n=[{key:"fromRichText",value:function(e){return {key:(0, a.default)(),children:e.reduce((function(e,t,n){if(l.RichTextBlock.isEmbedBlock(t.type)||l.RichTextBlock.isImageBlock(t.type))return e.concat(new s.BlockNode(t.type,t));var r=function(e){var t=e.spans.map((function(t){var n=e.text.slice(t.start,t.end);return new s.SpanNode(t.start,t.end,t.type,n,[],t)})),n={lower:0,upper:e.text.length};return v(e.text,t,n)}(t),o=e[e.length-1];if(l.RichTextBlock.isListItem(t.type)&&o&&o instanceof s.ListBlockNode){var i=new s.ListItemBlockNode(t,r),c=o.addChild(i);return (0, u.default)(e).concat(c)}if(l.RichTextBlock.isOrderedListItem(t.type)&&o&&o instanceof s.OrderedListBlockNode){var a=new s.OrderedListItemBlockNode(t,r),f=o.addChild(a);return (0, u.default)(e).concat(f)}if(l.RichTextBlock.isListItem(t.type)){var d=new s.ListItemBlockNode(t,r),p=new s.ListBlockNode(l.RichTextBlock.emptyList(),[d]);return e.concat(p)}if(l.RichTextBlock.isOrderedListItem(t.type)){var h=new s.OrderedListItemBlockNode(t,r),y=new s.OrderedListBlockNode(l.RichTextBlock.emptyOrderedList(),[h]);return e.concat(y)}return e.concat(new s.BlockNode(t.type,t,r))}),[])}}}])&&p(t,n),e}();t.default=b;},function(e,t){e.exports=Array.isArray||function(e){return null!=e&&e.length>=0&&"[object Array]"===Object.prototype.toString.call(e)};},function(e,t){e.exports=function(e){return "[object String]"===Object.prototype.toString.call(e)};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=(new Date).getTime();return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)}))};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.ListBlockNode=t.OrderedListBlockNode=t.OrderedListItemBlockNode=t.ListItemBlockNode=t.BlockNode=t.TextNode=t.SpanNode=t.Node=void 0;var r,o=(r=n(7))&&r.__esModule?r:{default:r},i=n(2);function u(e){return (u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function a(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),e}function l(e,t){return !t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return (f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t);}(e,t);}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var p=function e(t,n,r){d(this,e),this.key=(0, o.default)(),this.type=t,this.element=n,this.children=r;};t.Node=p;var h=function(e){function t(e,n,r,o,i,u){var c;return d(this,t),(c=l(this,f(t).call(this,r,u,i))).start=e,c.end=n,c.text=o,c.children=i,c}return s(t,p),a(t,[{key:"boundaries",value:function(){return {lower:this.start,upper:this.end}}},{key:"isParentOf",value:function(e){return this.start<=e.start&&this.end>=e.end}},{key:"setChildren",value:function(e){return new t(this.start,this.end,this.type,this.text,e,this.element)}}],[{key:"slice",value:function(e,n,r,o){return new t(n,r,e.type,o.slice(n,r),e.children,e.element)}}]),t}();t.SpanNode=h;var y=function(e){function t(e,n,r){d(this,t);var o={type:i.NODE_TYPES.span,start:e,end:n,text:r};return l(this,f(t).call(this,e,n,i.NODE_TYPES.span,r,[],o))}return s(t,h),t}();t.TextNode=y;var v=function(e){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return d(this,t),l(this,f(t).call(this,e,n,r))}return s(t,p),t}();t.BlockNode=v;var m=function(e){function t(e,n){return d(this,t),l(this,f(t).call(this,i.NODE_TYPES.listItem,e,n))}return s(t,v),t}();t.ListItemBlockNode=m;var b=function(e){function t(e,n){return d(this,t),l(this,f(t).call(this,i.NODE_TYPES.oListItem,e,n))}return s(t,v),t}();t.OrderedListItemBlockNode=b;var g=function(e){function t(e,n){return d(this,t),l(this,f(t).call(this,i.NODE_TYPES.oList,e,n))}return s(t,v),a(t,[{key:"addChild",value:function(e){var n=this.children.concat(e);return new t(this.element,n)}}]),t}();t.OrderedListBlockNode=g;var x=function(e){function t(e,n){return d(this,t),l(this,f(t).call(this,i.NODE_TYPES.list,e,n))}return s(t,v),a(t,[{key:"addChild",value:function(e){var n=this.children.concat(e);return new t(this.element,n)}}]),t}();t.ListBlockNode=x;},function(e,t,n){e.exports=n(10);},function(e,t,n){var r=c(n(11)),o=c(n(4)),i=c(n(24)),u=n(2);function c(e){return e&&e.__esModule?e:{default:e}}e.exports={asText:r.default,asTree:o.default.fromRichText,serialize:i.default,Elements:u.NODE_TYPES};},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=function(e,t){var n="string"==typeof t?t:" ";return e.map((function(e){return e.text})).join(n)};},function(e,t,n){var r=n(0)(n(13)(!0));e.exports=r;},function(e,t,n){var r=n(14);e.exports=function(e){return function t(n){for(var o,i,u,c=[],a=0,l=n.length;a<l;){if(r(n[a]))for(u=0,i=(o=e?t(n[a]):n[a]).length;u<i;)c[c.length]=o[u],u+=1;else c[c.length]=n[a];a+=1;}return c}};},function(e,t,n){var r=n(0),o=n(5),i=n(6),u=r((function(e){return !!o(e)||!!e&&"object"==typeof e&&!i(e)&&(1===e.nodeType?!!e.length:0===e.length||e.length>0&&e.hasOwnProperty(0)&&e.hasOwnProperty(e.length-1))}));e.exports=u;},function(e,t,n){var r=n(1)((function(e,t){return Array.prototype.slice.call(t,0).sort((function(t,n){var r=e(t),o=e(n);return r<o?-1:r>o?1:0}))}));e.exports=r;},function(e,t,n){var r=n(1)((function(e,t){return Array.prototype.slice.call(t,0).sort((function(t,n){for(var r=0,o=0;0===r&&o<e.length;)r=e[o](t,n),o+=1;return r}))}));e.exports=r;},function(e,t,n){var r=n(18)(0,-1);e.exports=r;},function(e,t,n){var r=n(19),o=n(20)(r("slice",(function(e,t,n){return Array.prototype.slice.call(n,e,t)})));e.exports=o;},function(e,t,n){var r=n(5);e.exports=function(e,t){return function(){var n=arguments.length;if(0===n)return t();var o=arguments[n-1];return r(o)||"function"!=typeof o[e]?t.apply(this,arguments):o[e].apply(o,Array.prototype.slice.call(arguments,0,n-1))}};},function(e,t,n){var r=n(0),o=n(1),i=n(3);e.exports=function(e){return function t(n,u,c){switch(arguments.length){case 0:return t;case 1:return i(n)?t:o((function(t,r){return e(n,t,r)}));case 2:return i(n)&&i(u)?t:i(n)?o((function(t,n){return e(t,u,n)})):i(u)?o((function(t,r){return e(n,t,r)})):r((function(t){return e(n,u,t)}));default:return i(n)&&i(u)&&i(c)?t:i(n)&&i(u)?o((function(t,n){return e(t,n,c)})):i(n)&&i(c)?o((function(t,n){return e(t,u,n)})):i(u)&&i(c)?o((function(t,r){return e(n,t,r)})):i(n)?r((function(t){return e(t,u,c)})):i(u)?r((function(t){return e(n,t,c)})):i(c)?r((function(t){return e(n,u,t)})):e(n,u,c)}}};},function(e,t,n){var r=n(22)(-1);e.exports=r;},function(e,t,n){var r=n(1),o=n(6),i=r((function(e,t){var n=e<0?t.length+e:e;return o(t)?t.charAt(n):t[n]}));e.exports=i;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.RichTextBlock=void 0;var r=n(2);function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}var i=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.type=t,this.text=n,this.spans=r;}var t,n;return t=e,(n=[{key:"isEmbedBlock",value:function(e){return e===r.NODE_TYPES.embed}},{key:"isImageBlock",value:function(e){return e===r.NODE_TYPES.image}},{key:"isList",value:function(e){return e===r.NODE_TYPES.list}},{key:"isOrderedList",value:function(e){return e===r.NODE_TYPES.oList}},{key:"isListItem",value:function(e){return e===r.NODE_TYPES.listItem}},{key:"isOrderedListItem",value:function(e){return e===r.NODE_TYPES.oListItem}},{key:"emptyList",value:function(){return {type:r.NODE_TYPES.list,spans:[],text:""}}},{key:"emptyOrderedList",value:function(){return {type:r.NODE_TYPES.oList,spans:[],text:""}}}])&&o(t,n),e}();t.RichTextBlock=i;},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=(r=n(4))&&r.__esModule?r:{default:r},i=n(8);t.default=function(e,t,n){return o.default.fromRichText(e).children.map((function(e,r){return function(e,t,n,r){return function e(n,o){var u=n instanceof i.SpanNode?n.text:null,c=n.children.reduce((function(t,n,r){return t.concat([e(n,r)])}),[]);return r&&r(n.type,n.element,u,c,o)||t(n.type,n.element,u,c,o)}(e,n)}(e,t,r,n)}))};}]);},function(e,t,n){/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var r=/["'&<>]/;e.exports=function(e){var t,n=""+e,o=r.exec(n);if(!o)return n;var i="",u=0,c=0;for(u=o.index;u<n.length;u++){switch(n.charCodeAt(u)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}c!==u&&(i+=n.substring(c,u)),c=u+1,i+=t;}return c!==u?i+n.substring(c,u):i};}])}));
});

/* src/components/PrismicHTML.svelte generated by Svelte v3.24.1 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (16:0) {#each elements as element}
function create_each_block(ctx) {
	let html_tag;
	let raw_value = `<${/*TAGS*/ ctx[0][/*element*/ ctx[2].type]}>${/*element*/ ctx[2].text}</${/*TAGS*/ ctx[0][/*element*/ ctx[2].type]}>` + "";
	let html_anchor;

	const block = {
		c: function create() {
			html_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			html_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			html_tag = new HtmlTag(html_anchor);
		},
		m: function mount(target, anchor) {
			html_tag.m(raw_value, target, anchor);
			insert_dev(target, html_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*elements*/ 2 && raw_value !== (raw_value = `<${/*TAGS*/ ctx[0][/*element*/ ctx[2].type]}>${/*element*/ ctx[2].text}</${/*TAGS*/ ctx[0][/*element*/ ctx[2].type]}>` + "")) html_tag.p(raw_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(html_anchor);
			if (detaching) html_tag.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(16:0) {#each elements as element}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let each_1_anchor;
	let each_value = /*elements*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*TAGS, elements*/ 3) {
				each_value = /*elements*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	const TAGS = {
		heading1: "h1",
		heading2: "h2",
		heading3: "h3",
		heading4: "h4",
		heading5: "h5",
		heading6: "h6",
		paragraph: "p",
		preformatted: "pre"
	};

	let { elements } = $$props;
	const writable_props = ["elements"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PrismicHTML> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("PrismicHTML", $$slots, []);

	$$self.$$set = $$props => {
		if ("elements" in $$props) $$invalidate(1, elements = $$props.elements);
	};

	$$self.$capture_state = () => ({ TAGS, elements });

	$$self.$inject_state = $$props => {
		if ("elements" in $$props) $$invalidate(1, elements = $$props.elements);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [TAGS, elements];
}

class PrismicHTML extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { TAGS: 0, elements: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PrismicHTML",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*elements*/ ctx[1] === undefined && !("elements" in props)) {
			console.warn("<PrismicHTML> was created without expected prop 'elements'");
		}
	}

	get TAGS() {
		return this.$$.ctx[0];
	}

	set TAGS(value) {
		throw new Error("<PrismicHTML>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get elements() {
		throw new Error("<PrismicHTML>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set elements(value) {
		throw new Error("<PrismicHTML>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/Nav.svelte generated by Svelte v3.24.1 */

const file = "src/components/Nav.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i].id;
	child_ctx[5] = list[i].name;
	child_ctx[7] = i;
	return child_ctx;
}

// (37:0) {#each titles as { id, name }
function create_each_block$1(ctx) {
	let li;
	let a;
	let h2;
	let t_value = /*name*/ ctx[5] + "";
	let t;
	let a_href_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			li = element("li");
			a = element("a");
			h2 = element("h2");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", {});
			var li_nodes = children(li);
			a = claim_element(li_nodes, "A", { href: true });
			var a_nodes = children(a);
			h2 = claim_element(a_nodes, "H2", {});
			var h2_nodes = children(h2);
			t = claim_text(h2_nodes, t_value);
			h2_nodes.forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h2, file, 37, 59, 1119);
			attr_dev(a, "href", a_href_value = "#" + /*id*/ ctx[4]);
			add_location(a, file, 37, 5, 1065);
			add_location(li, file, 37, 1, 1061);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			append_dev(li, a);
			append_dev(a, h2);
			append_dev(h2, t);

			if (!mounted) {
				dispose = listen_dev(a, "click", /*click_handler_1*/ ctx[3], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(37:0) {#each titles as { id, name }",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div4;
	let div3;
	let nav;
	let div0;
	let a;
	let img;
	let img_src_value;
	let t0;
	let div2;
	let div1;
	let span0;
	let t1;
	let span1;
	let t2;
	let span2;
	let t3;
	let div6;
	let section;
	let div5;
	let ul;
	let mounted;
	let dispose;
	let each_value = /*titles*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div4 = element("div");
			div3 = element("div");
			nav = element("nav");
			div0 = element("div");
			a = element("a");
			img = element("img");
			t0 = space();
			div2 = element("div");
			div1 = element("div");
			span0 = element("span");
			t1 = space();
			span1 = element("span");
			t2 = space();
			span2 = element("span");
			t3 = space();
			div6 = element("div");
			section = element("section");
			div5 = element("div");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div4 = claim_element(nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			nav = claim_element(div3_nodes, "NAV", { class: true, "uk-navbar": true });
			var nav_nodes = children(nav);
			div0 = claim_element(nav_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			a = claim_element(div0_nodes, "A", { class: true, href: true });
			var a_nodes = children(a);

			img = claim_element(a_nodes, "IMG", {
				src: true,
				alt: true,
				width: true,
				height: true,
				"uk-svg": true
			});

			a_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(nav_nodes);
			div2 = claim_element(nav_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);

			div1 = claim_element(div2_nodes, "DIV", {
				class: true,
				href: true,
				"uk-toggle": true
			});

			var div1_nodes = children(div1);
			span0 = claim_element(div1_nodes, "SPAN", { class: true });
			children(span0).forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			span1 = claim_element(div1_nodes, "SPAN", { class: true });
			children(span1).forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			span2 = claim_element(div1_nodes, "SPAN", { class: true });
			children(span2).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			div6 = claim_element(nodes, "DIV", { id: true, "uk-offcanvas": true });
			var div6_nodes = children(div6);
			section = claim_element(div6_nodes, "SECTION", { class: true, "uk-scrollspy": true });
			var section_nodes = children(section);
			div5 = claim_element(section_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			ul = claim_element(div5_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = "logo.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "logo");
			attr_dev(img, "width", "205");
			attr_dev(img, "height", "48");
			attr_dev(img, "uk-svg", "");
			add_location(img, file, 19, 33, 458);
			attr_dev(a, "class", "uk-logo");
			attr_dev(a, "href", "#intro");
			add_location(a, file, 19, 0, 425);
			attr_dev(div0, "class", "uk-navbar-left");
			add_location(div0, file, 18, 0, 396);
			attr_dev(span0, "class", "line");
			add_location(span0, file, 23, 0, 683);
			attr_dev(span1, "class", "line");
			add_location(span1, file, 24, 0, 710);
			attr_dev(span2, "class", "line");
			add_location(span2, file, 25, 0, 737);
			attr_dev(div1, "class", "hamburger");
			attr_dev(div1, "href", "/");
			attr_dev(div1, "uk-toggle", "target: #menu");
			toggle_class(div1, "active", /*active*/ ctx[0]);
			add_location(div1, file, 22, 0, 562);
			attr_dev(div2, "class", "uk-navbar-right");
			add_location(div2, file, 21, 0, 532);
			attr_dev(nav, "class", "uk-navbar-container");
			attr_dev(nav, "uk-navbar", "");
			add_location(nav, file, 17, 0, 352);
			attr_dev(div3, "class", "uk-container uk-container-large");
			add_location(div3, file, 16, 1, 305);
			attr_dev(div4, "class", "header");
			add_location(div4, file, 15, 0, 282);
			attr_dev(ul, "class", "uk-list");
			add_location(ul, file, 35, 0, 1005);
			attr_dev(div5, "class", "content uk-width-1-2@m uk-width-1-1@s");
			add_location(div5, file, 34, 0, 953);
			attr_dev(section, "class", "uk-text-center menu");
			attr_dev(section, "uk-scrollspy", "cls:uk-animation-scale-up; target: .content; delay: 1200");
			add_location(section, file, 33, 0, 843);
			attr_dev(div6, "id", "menu");
			attr_dev(div6, "uk-offcanvas", "flip: true;");
			add_location(div6, file, 32, 0, 800);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, div3);
			append_dev(div3, nav);
			append_dev(nav, div0);
			append_dev(div0, a);
			append_dev(a, img);
			append_dev(nav, t0);
			append_dev(nav, div2);
			append_dev(div2, div1);
			append_dev(div1, span0);
			append_dev(div1, t1);
			append_dev(div1, span1);
			append_dev(div1, t2);
			append_dev(div1, span2);
			insert_dev(target, t3, anchor);
			insert_dev(target, div6, anchor);
			append_dev(div6, section);
			append_dev(section, div5);
			append_dev(div5, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[2], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*active*/ 1) {
				toggle_class(div1, "active", /*active*/ ctx[0]);
			}

			if (dirty & /*titles, active*/ 3) {
				each_value = /*titles*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(ul, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div4);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(div6);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let titles = [
		{ id: "intro", name: "Intro" },
		{ id: "web-design", name: "Design" },
		{ id: "custom", name: "Mobile" },
		{ id: "seo", name: "SEO" },
		{ id: "web-hosting", name: "Hosting" },
		{ id: "contact", name: "Contact" }
	];

	let active = false;
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Nav", $$slots, []);
	const click_handler = () => $$invalidate(0, active = !active);
	const click_handler_1 = () => $$invalidate(0, active = !active);
	$$self.$capture_state = () => ({ titles, active });

	$$self.$inject_state = $$props => {
		if ("titles" in $$props) $$invalidate(1, titles = $$props.titles);
		if ("active" in $$props) $$invalidate(0, active = $$props.active);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [active, titles, click_handler, click_handler_1];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src/components/HeadMeta.svelte generated by Svelte v3.24.1 */

const file$1 = "src/components/HeadMeta.svelte";

function create_fragment$2(ctx) {
	let title_value;
	let meta0;
	let meta1;
	let meta2;
	let link0;
	let link1;
	let link2;
	let meta3;
	let meta4;
	let meta5;
	let meta6;
	let meta7;
	let meta8;
	let meta9;
	let link3;
	let link4;
	let link5;
	let script0;
	let script0_src_value;
	let script1;
	let script1_src_value;
	document.title = title_value = /*title*/ ctx[1];

	const block = {
		c: function create() {
			meta0 = element("meta");
			meta1 = element("meta");
			meta2 = element("meta");
			link0 = element("link");
			link1 = element("link");
			link2 = element("link");
			meta3 = element("meta");
			meta4 = element("meta");
			meta5 = element("meta");
			meta6 = element("meta");
			meta7 = element("meta");
			meta8 = element("meta");
			meta9 = element("meta");
			link3 = element("link");
			link4 = element("link");
			link5 = element("link");
			script0 = element("script");
			script1 = element("script");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1owpsgw\"]", document.head);
			meta0 = claim_element(head_nodes, "META", { name: true, content: true });
			meta1 = claim_element(head_nodes, "META", { name: true, content: true });
			meta2 = claim_element(head_nodes, "META", { name: true, content: true });
			link0 = claim_element(head_nodes, "LINK", { rel: true, type: true, href: true });

			link1 = claim_element(head_nodes, "LINK", {
				rel: true,
				type: true,
				href: true,
				sizes: true
			});

			link2 = claim_element(head_nodes, "LINK", { rel: true, href: true, sizes: true });
			meta3 = claim_element(head_nodes, "META", { name: true, content: true });
			meta4 = claim_element(head_nodes, "META", { name: true, content: true });
			meta5 = claim_element(head_nodes, "META", { name: true, content: true });
			meta6 = claim_element(head_nodes, "META", { property: true, content: true });
			meta7 = claim_element(head_nodes, "META", { property: true, content: true });
			meta8 = claim_element(head_nodes, "META", { property: true, content: true });
			meta9 = claim_element(head_nodes, "META", { property: true, content: true });
			link3 = claim_element(head_nodes, "LINK", { rel: true, href: true });
			link4 = claim_element(head_nodes, "LINK", { rel: true, href: true });
			link5 = claim_element(head_nodes, "LINK", { rel: true, href: true });
			script0 = claim_element(head_nodes, "SCRIPT", { src: true });
			var script0_nodes = children(script0);
			script0_nodes.forEach(detach_dev);
			script1 = claim_element(head_nodes, "SCRIPT", { src: true });
			var script1_nodes = children(script1);
			script1_nodes.forEach(detach_dev);
			head_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(meta0, "name", "theme-color");
			attr_dev(meta0, "content", "#000");
			add_location(meta0, file$1, 9, 4, 134);
			attr_dev(meta1, "name", "keywords");
			attr_dev(meta1, "content", "mobile app development, Vue, React, CSS, accessibility, usability");
			add_location(meta1, file$1, 11, 4, 182);
			attr_dev(meta2, "name", "description");
			attr_dev(meta2, "content", /*description*/ ctx[2]);
			add_location(meta2, file$1, 12, 4, 285);
			attr_dev(link0, "rel", "icon");
			attr_dev(link0, "type", "image/png");
			attr_dev(link0, "href", "favicon.png");
			add_location(link0, file$1, 14, 4, 338);
			attr_dev(link1, "rel", "icon");
			attr_dev(link1, "type", "image/png");
			attr_dev(link1, "href", "favicon192.png");
			attr_dev(link1, "sizes", "192x192");
			add_location(link1, file$1, 15, 4, 396);
			attr_dev(link2, "rel", "apple-touch-icon");
			attr_dev(link2, "href", "favicon512.png");
			attr_dev(link2, "sizes", "512x512");
			add_location(link2, file$1, 16, 4, 473);
			attr_dev(meta3, "name", "twitter:creator");
			attr_dev(meta3, "content", "@imwd");
			add_location(meta3, file$1, 18, 4, 546);
			attr_dev(meta4, "name", "twitter:title");
			attr_dev(meta4, "content", /*title*/ ctx[1]);
			add_location(meta4, file$1, 19, 4, 596);
			attr_dev(meta5, "name", "twitter:description");
			attr_dev(meta5, "content", /*description*/ ctx[2]);
			add_location(meta5, file$1, 20, 4, 646);
			attr_dev(meta6, "property", "og:url");
			attr_dev(meta6, "content", /*site*/ ctx[0]);
			add_location(meta6, file$1, 22, 4, 709);
			attr_dev(meta7, "property", "og:title");
			attr_dev(meta7, "content", /*title*/ ctx[1]);
			add_location(meta7, file$1, 23, 4, 755);
			attr_dev(meta8, "property", "og:description");
			attr_dev(meta8, "content", /*description*/ ctx[2]);
			add_location(meta8, file$1, 24, 4, 804);
			attr_dev(meta9, "property", "og:site_name");
			attr_dev(meta9, "content", /*title*/ ctx[1]);
			add_location(meta9, file$1, 25, 4, 865);
			attr_dev(link3, "rel", "stylesheet");
			attr_dev(link3, "href", "global.css");
			add_location(link3, file$1, 27, 4, 919);
			attr_dev(link4, "rel", "stylesheet");
			attr_dev(link4, "href", "https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/css/uikit.min.css");
			add_location(link4, file$1, 28, 4, 965);
			attr_dev(link5, "rel", "stylesheet");
			attr_dev(link5, "href", "https://use.typekit.net/har8vyv.css");
			add_location(link5, file$1, 29, 4, 1066);
			if (script0.src !== (script0_src_value = "https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js")) attr_dev(script0, "src", script0_src_value);
			add_location(script0, file$1, 30, 4, 1137);
			if (script1.src !== (script1_src_value = "https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js")) attr_dev(script1, "src", script1_src_value);
			add_location(script1, file$1, 31, 4, 1227);
		},
		m: function mount(target, anchor) {
			append_dev(document.head, meta0);
			append_dev(document.head, meta1);
			append_dev(document.head, meta2);
			append_dev(document.head, link0);
			append_dev(document.head, link1);
			append_dev(document.head, link2);
			append_dev(document.head, meta3);
			append_dev(document.head, meta4);
			append_dev(document.head, meta5);
			append_dev(document.head, meta6);
			append_dev(document.head, meta7);
			append_dev(document.head, meta8);
			append_dev(document.head, meta9);
			append_dev(document.head, link3);
			append_dev(document.head, link4);
			append_dev(document.head, link5);
			append_dev(document.head, script0);
			append_dev(document.head, script1);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 2 && title_value !== (title_value = /*title*/ ctx[1])) {
				document.title = title_value;
			}

			if (dirty & /*description*/ 4) {
				attr_dev(meta2, "content", /*description*/ ctx[2]);
			}

			if (dirty & /*title*/ 2) {
				attr_dev(meta4, "content", /*title*/ ctx[1]);
			}

			if (dirty & /*description*/ 4) {
				attr_dev(meta5, "content", /*description*/ ctx[2]);
			}

			if (dirty & /*site*/ 1) {
				attr_dev(meta6, "content", /*site*/ ctx[0]);
			}

			if (dirty & /*title*/ 2) {
				attr_dev(meta7, "content", /*title*/ ctx[1]);
			}

			if (dirty & /*description*/ 4) {
				attr_dev(meta8, "content", /*description*/ ctx[2]);
			}

			if (dirty & /*title*/ 2) {
				attr_dev(meta9, "content", /*title*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			detach_dev(meta0);
			detach_dev(meta1);
			detach_dev(meta2);
			detach_dev(link0);
			detach_dev(link1);
			detach_dev(link2);
			detach_dev(meta3);
			detach_dev(meta4);
			detach_dev(meta5);
			detach_dev(meta6);
			detach_dev(meta7);
			detach_dev(meta8);
			detach_dev(meta9);
			detach_dev(link3);
			detach_dev(link4);
			detach_dev(link5);
			detach_dev(script0);
			detach_dev(script1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { site } = $$props;
	let { title } = $$props;
	let { description } = $$props;
	const writable_props = ["site", "title", "description"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<HeadMeta> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("HeadMeta", $$slots, []);

	$$self.$$set = $$props => {
		if ("site" in $$props) $$invalidate(0, site = $$props.site);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
		if ("description" in $$props) $$invalidate(2, description = $$props.description);
	};

	$$self.$capture_state = () => ({ site, title, description });

	$$self.$inject_state = $$props => {
		if ("site" in $$props) $$invalidate(0, site = $$props.site);
		if ("title" in $$props) $$invalidate(1, title = $$props.title);
		if ("description" in $$props) $$invalidate(2, description = $$props.description);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [site, title, description];
}

class HeadMeta extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { site: 0, title: 1, description: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "HeadMeta",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*site*/ ctx[0] === undefined && !("site" in props)) {
			console.warn("<HeadMeta> was created without expected prop 'site'");
		}

		if (/*title*/ ctx[1] === undefined && !("title" in props)) {
			console.warn("<HeadMeta> was created without expected prop 'title'");
		}

		if (/*description*/ ctx[2] === undefined && !("description" in props)) {
			console.warn("<HeadMeta> was created without expected prop 'description'");
		}
	}

	get site() {
		throw new Error("<HeadMeta>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set site(value) {
		throw new Error("<HeadMeta>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get title() {
		throw new Error("<HeadMeta>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<HeadMeta>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get description() {
		throw new Error("<HeadMeta>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set description(value) {
		throw new Error("<HeadMeta>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/index.svelte generated by Svelte v3.24.1 */
const file$2 = "src/routes/index.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (54:0) {#if item.uid === "contact"}
function create_if_block(ctx) {
	let a0;
	let t0;
	let t1;
	let a1;
	let t2;

	const block = {
		c: function create() {
			a0 = element("a");
			t0 = text("hello@imwd.fr");
			t1 = space();
			a1 = element("a");
			t2 = text("+33 606 43 23 56");
			this.h();
		},
		l: function claim(nodes) {
			a0 = claim_element(nodes, "A", { href: true });
			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, "hello@imwd.fr");
			a0_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			a1 = claim_element(nodes, "A", { href: true });
			var a1_nodes = children(a1);
			t2 = claim_text(a1_nodes, "+33 606 43 23 56");
			a1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", "mailto:hello@imwd.fr");
			add_location(a0, file$2, 54, 0, 1351);
			attr_dev(a1, "href", "tel:+33 606432356");
			add_location(a1, file$2, 55, 0, 1400);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a0, anchor);
			append_dev(a0, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, a1, anchor);
			append_dev(a1, t2);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(a1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(54:0) {#if item.uid === \\\"contact\\\"}",
		ctx
	});

	return block;
}

// (45:0) {#each items as item}
function create_each_block$2(ctx) {
	let section;
	let div1;
	let h2;
	let t0_value = prismicDom_min.RichText.asText(/*item*/ ctx[1].data.title) + "";
	let t0;
	let t1;
	let div0;
	let t2;
	let prismichtml;
	let t3;
	let t4;
	let section_class_value;
	let section_id_value;
	let current;

	prismichtml = new PrismicHTML({
			props: { elements: /*item*/ ctx[1].data.text },
			$$inline: true
		});

	let if_block = /*item*/ ctx[1].uid === "contact" && create_if_block(ctx);

	const block = {
		c: function create() {
			section = element("section");
			div1 = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			t2 = space();
			create_component(prismichtml.$$.fragment);
			t3 = space();
			if (if_block) if_block.c();
			t4 = space();
			this.h();
		},
		l: function claim(nodes) {
			section = claim_element(nodes, "SECTION", {
				class: true,
				id: true,
				"uk-scrollspy": true
			});

			var section_nodes = children(section);
			div1 = claim_element(section_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h2 = claim_element(div1_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, t0_value);
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			claim_component(prismichtml.$$.fragment, div1_nodes);
			t3 = claim_space(div1_nodes);
			if (if_block) if_block.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			t4 = claim_space(section_nodes);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "uk-article-title");
			add_location(h2, file$2, 50, 0, 1154);
			attr_dev(div0, "class", "title-line uk-margin-auto");
			add_location(div0, file$2, 51, 0, 1234);
			attr_dev(div1, "class", "content uk-width-1-2@m uk-width-1-1@s");
			add_location(div1, file$2, 48, 0, 1101);
			attr_dev(section, "class", section_class_value = "uk-text-center " + /*item*/ ctx[1].uid);
			attr_dev(section, "id", section_id_value = /*item*/ ctx[1].uid);
			attr_dev(section, "uk-scrollspy", "cls:uk-animation-scale-up; target: .content; delay: 1200; repeat: true");
			add_location(section, file$2, 46, 0, 953);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section, anchor);
			append_dev(section, div1);
			append_dev(div1, h2);
			append_dev(h2, t0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			append_dev(div1, t2);
			mount_component(prismichtml, div1, null);
			append_dev(div1, t3);
			if (if_block) if_block.m(div1, null);
			append_dev(section, t4);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*items*/ 1) && t0_value !== (t0_value = prismicDom_min.RichText.asText(/*item*/ ctx[1].data.title) + "")) set_data_dev(t0, t0_value);
			const prismichtml_changes = {};
			if (dirty & /*items*/ 1) prismichtml_changes.elements = /*item*/ ctx[1].data.text;
			prismichtml.$set(prismichtml_changes);

			if (/*item*/ ctx[1].uid === "contact") {
				if (if_block) ; else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (!current || dirty & /*items*/ 1 && section_class_value !== (section_class_value = "uk-text-center " + /*item*/ ctx[1].uid)) {
				attr_dev(section, "class", section_class_value);
			}

			if (!current || dirty & /*items*/ 1 && section_id_value !== (section_id_value = /*item*/ ctx[1].uid)) {
				attr_dev(section, "id", section_id_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(prismichtml.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(prismichtml.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section);
			destroy_component(prismichtml);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(45:0) {#each items as item}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let headmeta;
	let t0;
	let t1;
	let main;
	let nav;
	let t2;
	let current;

	headmeta = new HeadMeta({
			props: {
				site: "https://www.imwd.design",
				title: "IMWD Design",
				description: `We turn ideas into accessible experiences.`
			},
			$$inline: true
		});

	nav = new Nav({ $$inline: true });
	let each_value = /*items*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			create_component(headmeta.$$.fragment);
			t0 = space();
			t1 = space();
			main = element("main");
			create_component(nav.$$.fragment);
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			claim_component(headmeta.$$.fragment, nodes);
			t0 = claim_space(nodes);
			t1 = claim_space(nodes);
			main = claim_element(nodes, "MAIN", {});
			var main_nodes = children(main);
			claim_component(nav.$$.fragment, main_nodes);
			t2 = claim_space(main_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(main_nodes);
			}

			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(main, file$2, 39, 0, 909);
		},
		m: function mount(target, anchor) {
			mount_component(headmeta, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, main, anchor);
			mount_component(nav, main, null);
			append_dev(main, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(main, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*items, PrismicDOM*/ 1) {
				each_value = /*items*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(main, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(headmeta.$$.fragment, local);
			transition_in(nav.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(headmeta.$$.fragment, local);
			transition_out(nav.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(headmeta, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(main);
			destroy_component(nav);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

let items = null;

async function preload({ params, query }) {
	const response = await Client.query(index.Predicates.at("document.type", "page"), { orderings: "[my.page.date]" });
	items = response.results;

	if (items) {
		return { items };
	} else {
		this.error(res.status, data.message);
	}
}

function instance$3($$self, $$props, $$invalidate) {
	let { items } = $$props;
	const writable_props = ["items"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);

	$$self.$$set = $$props => {
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
	};

	$$self.$capture_state = () => ({
		HeadMeta,
		Nav,
		PrismicHTML,
		Prismic: index,
		PrismicDOM: prismicDom_min,
		Client,
		items,
		preload,
		items
	});

	$$self.$inject_state = $$props => {
		if ("items" in $$props) $$invalidate(0, items = $$props.items);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [items];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { items: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*items*/ ctx[0] === undefined && !("items" in props)) {
			console.warn("<Routes> was created without expected prop 'items'");
		}
	}

	get items() {
		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Routes;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOTk3MGNiNzAuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jcm9zcy1mZXRjaC9kaXN0L2Jyb3dzZXItcG9ueWZpbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJpc21pYy1qYXZhc2NyaXB0L2VzbS9wcmlzbWljLWphdmFzY3JpcHQubWpzIiwiLi4vLi4vLi4vcHJpc21pYy1jb25maWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJpc21pYy1kb20vZGlzdC9wcmlzbWljLWRvbS5taW4uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QcmlzbWljSFRNTC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9OYXYuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVhZE1ldGEuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fc2VsZl9fID0gKGZ1bmN0aW9uIChyb290KSB7XG5mdW5jdGlvbiBGKCkge1xudGhpcy5mZXRjaCA9IGZhbHNlO1xudGhpcy5ET01FeGNlcHRpb24gPSByb290LkRPTUV4Y2VwdGlvblxufVxuRi5wcm90b3R5cGUgPSByb290O1xucmV0dXJuIG5ldyBGKCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4oZnVuY3Rpb24oc2VsZikge1xuXG52YXIgaXJyZWxldmFudCA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOlxuICAgICAgJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiZcbiAgICAgICdCbG9iJyBpbiBzZWxmICYmXG4gICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbmV3IEJsb2IoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH07XG5cbiAgZnVuY3Rpb24gaXNEYXRhVmlldyhvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXTtcblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9XG4gICAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgfHxcbiAgICAgIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpO1xuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5eX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpO1xuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fTtcblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSk7XG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV07XG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlICsgJywgJyArIHZhbHVlIDogdmFsdWU7XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICBpdGVtcy5wdXNoKG5hbWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGl0ZW1zLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfTtcblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgIH07XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKTtcbiAgICAgIH07XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpO1xuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpO1xuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5O1xuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJyc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpO1xuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKTtcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKTtcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXTtcblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gbWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHk7XG5cbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsO1xuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzO1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycyk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZDtcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGU7XG4gICAgICB0aGlzLnNpZ25hbCA9IGlucHV0LnNpZ25hbDtcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0O1xuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbic7XG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJyk7XG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsO1xuICAgIHRoaXMuc2lnbmFsID0gb3B0aW9ucy5zaWduYWwgfHwgdGhpcy5zaWduYWw7XG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGw7XG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpO1xuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywge2JvZHk6IHRoaXMuX2JvZHlJbml0fSlcbiAgfTtcblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgYm9keVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KCcmJylcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICAgIGlmIChieXRlcykge1xuICAgICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgLy8gUmVwbGFjZSBpbnN0YW5jZXMgb2YgXFxyXFxuIGFuZCBcXG4gZm9sbG93ZWQgYnkgYXQgbGVhc3Qgb25lIHNwYWNlIG9yIGhvcml6b250YWwgdGFiIHdpdGggYSBzcGFjZVxuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXG4gICAgdmFyIHByZVByb2Nlc3NlZEhlYWRlcnMgPSByYXdIZWFkZXJzLnJlcGxhY2UoL1xccj9cXG5bXFx0IF0rL2csICcgJyk7XG4gICAgcHJlUHJvY2Vzc2VkSGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpO1xuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKTtcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0JztcbiAgICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzID09PSB1bmRlZmluZWQgPyAyMDAgOiBvcHRpb25zLnN0YXR1cztcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdzdGF0dXNUZXh0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXNUZXh0IDogJ09LJztcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJyc7XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpO1xuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfTtcblxuICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pO1xuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InO1xuICAgIHJldHVybiByZXNwb25zZVxuICB9O1xuXG4gIHZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XTtcblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9O1xuXG4gIGV4cG9ydHMuRE9NRXhjZXB0aW9uID0gc2VsZi5ET01FeGNlcHRpb247XG4gIHRyeSB7XG4gICAgbmV3IGV4cG9ydHMuRE9NRXhjZXB0aW9uKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGV4cG9ydHMuRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB2YXIgZXJyb3IgPSBFcnJvcihtZXNzYWdlKTtcbiAgICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICB9O1xuICAgIGV4cG9ydHMuRE9NRXhjZXB0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBleHBvcnRzLkRPTUV4Y2VwdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdCk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCAmJiByZXF1ZXN0LnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IGV4cG9ydHMuRE9NRXhjZXB0aW9uKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKSlcbiAgICAgIH1cblxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJyk7XG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IGV4cG9ydHMuRE9NRXhjZXB0aW9uKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpO1xuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICAgIHJlcXVlc3Quc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpO1xuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBET05FIChzdWNjZXNzIG9yIGZhaWx1cmUpXG4gICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICByZXF1ZXN0LnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpO1xuICAgIH0pXG4gIH1cblxuICBmZXRjaC5wb2x5ZmlsbCA9IHRydWU7XG5cbiAgaWYgKCFzZWxmLmZldGNoKSB7XG4gICAgc2VsZi5mZXRjaCA9IGZldGNoO1xuICAgIHNlbGYuSGVhZGVycyA9IEhlYWRlcnM7XG4gICAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2U7XG4gIH1cblxuICBleHBvcnRzLkhlYWRlcnMgPSBIZWFkZXJzO1xuICBleHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICBleHBvcnRzLlJlc3BvbnNlID0gUmVzcG9uc2U7XG4gIGV4cG9ydHMuZmV0Y2ggPSBmZXRjaDtcblxuICByZXR1cm4gZXhwb3J0cztcblxufSh7fSkpO1xufSkoX19zZWxmX18pO1xuZGVsZXRlIF9fc2VsZl9fLmZldGNoLnBvbHlmaWxsXG5leHBvcnRzID0gX19zZWxmX18uZmV0Y2ggLy8gVG8gZW5hYmxlOiBpbXBvcnQgZmV0Y2ggZnJvbSAnY3Jvc3MtZmV0Y2gnXG5leHBvcnRzLmRlZmF1bHQgPSBfX3NlbGZfXy5mZXRjaCAvLyBGb3IgVHlwZVNjcmlwdCBjb25zdW1lcnMgd2l0aG91dCBlc01vZHVsZUludGVyb3AuXG5leHBvcnRzLmZldGNoID0gX19zZWxmX18uZmV0Y2ggLy8gVG8gZW5hYmxlOiBpbXBvcnQge2ZldGNofSBmcm9tICdjcm9zcy1mZXRjaCdcbmV4cG9ydHMuSGVhZGVycyA9IF9fc2VsZl9fLkhlYWRlcnNcbmV4cG9ydHMuUmVxdWVzdCA9IF9fc2VsZl9fLlJlcXVlc3RcbmV4cG9ydHMuUmVzcG9uc2UgPSBfX3NlbGZfXy5SZXNwb25zZVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzXG4iLCJpbXBvcnQgY3Jvc3NGZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xuXG52YXIgVmFyaWF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZhcmlhdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBWYXJpYXRpb24ucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmlkO1xuICAgIH07XG4gICAgVmFyaWF0aW9uLnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucmVmO1xuICAgIH07XG4gICAgVmFyaWF0aW9uLnByb3RvdHlwZS5sYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sYWJlbDtcbiAgICB9O1xuICAgIHJldHVybiBWYXJpYXRpb247XG59KCkpO1xudmFyIEV4cGVyaW1lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXhwZXJpbWVudChkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnZhcmlhdGlvbnMgPSAoZGF0YS52YXJpYXRpb25zIHx8IFtdKS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFyaWF0aW9uKHYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgRXhwZXJpbWVudC5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuaWQ7XG4gICAgfTtcbiAgICBFeHBlcmltZW50LnByb3RvdHlwZS5nb29nbGVJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nb29nbGVJZDtcbiAgICB9O1xuICAgIEV4cGVyaW1lbnQucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubmFtZTtcbiAgICB9O1xuICAgIHJldHVybiBFeHBlcmltZW50O1xufSgpKTtcbnZhciBFeHBlcmltZW50cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFeHBlcmltZW50cyhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWZ0cyA9IChkYXRhLmRyYWZ0cyB8fCBbXSkubWFwKGZ1bmN0aW9uIChleHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV4cGVyaW1lbnQoZXhwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gKGRhdGEucnVubmluZyB8fCBbXSkubWFwKGZ1bmN0aW9uIChleHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV4cGVyaW1lbnQoZXhwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIEV4cGVyaW1lbnRzLnByb3RvdHlwZS5jdXJyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5ydW5uaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bm5pbmdbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXhwZXJpbWVudHMucHJvdG90eXBlLnJlZkZyb21Db29raWUgPSBmdW5jdGlvbiAoY29va2llKSB7XG4gICAgICAgIGlmICghY29va2llIHx8IGNvb2tpZS50cmltKCkgPT09ICcnKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBzcGxpdHRlZCA9IGNvb2tpZS50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgaWYgKHNwbGl0dGVkLmxlbmd0aCA8IDIpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIGV4cElkID0gc3BsaXR0ZWRbMF07XG4gICAgICAgIHZhciB2YXJJbmRleCA9IHBhcnNlSW50KHNwbGl0dGVkWzFdLCAxMCk7XG4gICAgICAgIHZhciBleHAgPSB0aGlzLnJ1bm5pbmcuZmlsdGVyKGZ1bmN0aW9uIChleHApIHtcbiAgICAgICAgICAgIHJldHVybiBleHAuZ29vZ2xlSWQoKSA9PT0gZXhwSWQgJiYgZXhwLnZhcmlhdGlvbnMubGVuZ3RoID4gdmFySW5kZXg7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICByZXR1cm4gZXhwID8gZXhwLnZhcmlhdGlvbnNbdmFySW5kZXhdLnJlZigpIDogbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBFeHBlcmltZW50cztcbn0oKSk7XG5cbnZhciBMYXp5U2VhcmNoRm9ybSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYXp5U2VhcmNoRm9ybShpZCwgYXBpKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgICAgIHRoaXMuZmllbGRzID0ge307XG4gICAgfVxuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmZpZWxkc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTGF6eVNlYXJjaEZvcm0ucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KCdyZWYnLCByZWYpO1xuICAgIH07XG4gICAgTGF6eVNlYXJjaEZvcm0ucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgncScsIHF1ZXJ5KTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5wYWdlU2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgncGFnZVNpemUnLCBzaXplKTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBVc2luZyBGZXRjaCBpcyBkZXByZWNhdGVkLiBVc2UgdGhlIHByb3BlcnR5IGBncmFwaFF1ZXJ5YCBpbnN0ZWFkLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ2ZldGNoJywgZmllbGRzKTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5mZXRjaExpbmtzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IFVzaW5nIEZldGNoTGlua3MgaXMgZGVwcmVjYXRlZC4gVXNlIHRoZSBwcm9wZXJ0eSBgZ3JhcGhRdWVyeWAgaW5zdGVhZC4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KCdmZXRjaExpbmtzJywgZmllbGRzKTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5ncmFwaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgnZ3JhcGhRdWVyeScsIHF1ZXJ5KTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5sYW5nID0gZnVuY3Rpb24gKGxhbmdDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgnbGFuZycsIGxhbmdDb2RlKTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5wYWdlID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KCdwYWdlJywgcCk7XG4gICAgfTtcbiAgICBMYXp5U2VhcmNoRm9ybS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ2FmdGVyJywgZG9jdW1lbnRJZCk7XG4gICAgfTtcbiAgICBMYXp5U2VhcmNoRm9ybS5wcm90b3R5cGUub3JkZXJpbmdzID0gZnVuY3Rpb24gKG9yZGVyaW5ncykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ29yZGVyaW5ncycsIG9yZGVyaW5ncyk7XG4gICAgfTtcbiAgICBMYXp5U2VhcmNoRm9ybS5wcm90b3R5cGUudXJsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KCkudGhlbihmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgICByZXR1cm4gTGF6eVNlYXJjaEZvcm0udG9TZWFyY2hGb3JtKF90aGlzLCBhcGkpLnVybCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpLmdldCgpLnRoZW4oZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgICAgcmV0dXJuIExhenlTZWFyY2hGb3JtLnRvU2VhcmNoRm9ybShfdGhpcywgYXBpKS5zdWJtaXQoY2IpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExhenlTZWFyY2hGb3JtLnRvU2VhcmNoRm9ybSA9IGZ1bmN0aW9uIChsYXp5Rm9ybSwgYXBpKSB7XG4gICAgICAgIHZhciBmb3JtID0gYXBpLmZvcm0obGF6eUZvcm0uaWQpO1xuICAgICAgICBpZiAoZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGxhenlGb3JtLmZpZWxkcykucmVkdWNlKGZ1bmN0aW9uIChmb3JtLCBmaWVsZEtleSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gbGF6eUZvcm0uZmllbGRzW2ZpZWxkS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRLZXkgPT09ICdxJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5xdWVyeShmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmllbGRLZXkgPT09ICdwYWdlU2l6ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0ucGFnZVNpemUoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkS2V5ID09PSAnZmV0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmZldGNoKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWVsZEtleSA9PT0gJ2ZldGNoTGlua3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmZldGNoTGlua3MoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkS2V5ID09PSAnZ3JhcGhRdWVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uZ3JhcGhRdWVyeShmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmllbGRLZXkgPT09ICdsYW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybS5sYW5nKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWVsZEtleSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLnBhZ2UoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkS2V5ID09PSAnYWZ0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtLmFmdGVyKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWVsZEtleSA9PT0gJ29yZGVyaW5ncycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0ub3JkZXJpbmdzKGZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm0uc2V0KGZpZWxkS2V5LCBmaWVsZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBhY2Nlc3MgdG8gZm9ybSBcIiArIGxhenlGb3JtLmlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExhenlTZWFyY2hGb3JtO1xufSgpKTtcbnZhciBTZWFyY2hGb3JtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlYXJjaEZvcm0oZm9ybSwgaHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgZmllbGQgaW4gZm9ybS5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmIChmb3JtLmZpZWxkc1tmaWVsZF1bJ2RlZmF1bHQnXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtmaWVsZF0gPSBbZm9ybS5maWVsZHNbZmllbGRdWydkZWZhdWx0J11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFNlYXJjaEZvcm0ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChmaWVsZCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGZpZWxkRGVzYyA9IHRoaXMuZm9ybS5maWVsZHNbZmllbGRdO1xuICAgICAgICBpZiAoIWZpZWxkRGVzYylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBmaWVsZCAnICsgZmllbGQpO1xuICAgICAgICB2YXIgY2hlY2tlZFZhbHVlID0gdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogdmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLmRhdGFbZmllbGRdIHx8IFtdO1xuICAgICAgICBpZiAoZmllbGREZXNjLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBjaGVja2VkVmFsdWUgPyB2YWx1ZXMuY29uY2F0KFtjaGVja2VkVmFsdWVdKSA6IHZhbHVlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IGNoZWNrZWRWYWx1ZSA/IFtjaGVja2VkVmFsdWVdIDogdmFsdWVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVtmaWVsZF0gPSB2YWx1ZXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyBhIHJlZiB0byBxdWVyeSBvbiBmb3IgdGhpcyBTZWFyY2hGb3JtLiBUaGlzIGlzIGEgbWFuZGF0b3J5XG4gICAgICogbWV0aG9kIHRvIGNhbGwgYmVmb3JlIGNhbGxpbmcgc3VibWl0KCksIGFuZCBhcGkuZm9ybSgnZXZlcnl0aGluZycpLnN1Ym1pdCgpXG4gICAgICogd2lsbCBub3Qgd29yay5cbiAgICAgKi9cbiAgICBTZWFyY2hGb3JtLnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgncmVmJywgcmVmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBwcmVkaWNhdGUtYmFzZWQgcXVlcnkgZm9yIHRoaXMgU2VhcmNoRm9ybS4gVGhpcyBpcyB3aGVyZSB5b3VcbiAgICAgKiBwYXN0ZSB3aGF0IHlvdSBjb21wb3NlIGluIHlvdXIgcHJpc21pYy5pbyBBUEkgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBTZWFyY2hGb3JtLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkoW3F1ZXJ5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxdWVyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldCgncScsIFwiW1wiICsgcXVlcnkuam9pbignJykgKyBcIl1cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHF1ZXJ5IDogXCIgKyBxdWVyeSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgYSBwYWdlIHNpemUgdG8gcXVlcnkgZm9yIHRoaXMgU2VhcmNoRm9ybS4gVGhpcyBpcyBhbiBvcHRpb25hbCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIFRoZSBwYWdlIHNpemVcbiAgICAgKiBAcmV0dXJucyB7U2VhcmNoRm9ybX0gLSBUaGUgU2VhcmNoRm9ybSBpdHNlbGZcbiAgICAgKi9cbiAgICBTZWFyY2hGb3JtLnByb3RvdHlwZS5wYWdlU2l6ZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgncGFnZVNpemUnLCBzaXplKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc3RyaWN0IHRoZSByZXN1bHRzIGRvY3VtZW50IHRvIHRoZSBzcGVjaWZpZWQgZmllbGRzXG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUuZmV0Y2ggPSBmdW5jdGlvbiAoZmllbGRzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogVXNpbmcgRmV0Y2ggaXMgZGVwcmVjYXRlZC4gVXNlIHRoZSBwcm9wZXJ0eSBgZ3JhcGhRdWVyeWAgaW5zdGVhZC4nKTtcbiAgICAgICAgdmFyIHN0ckZpZWxkcyA9IEFycmF5LmlzQXJyYXkoZmllbGRzKSA/IGZpZWxkcy5qb2luKCcsJykgOiBmaWVsZHM7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgnZmV0Y2gnLCBzdHJGaWVsZHMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5jbHVkZSB0aGUgcmVxdWVzdGVkIGZpZWxkcyBpbiB0aGUgRG9jdW1lbnRMaW5rIGluc3RhbmNlcyBpbiB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUuZmV0Y2hMaW5rcyA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBVc2luZyBGZXRjaExpbmtzIGlzIGRlcHJlY2F0ZWQuIFVzZSB0aGUgcHJvcGVydHkgYGdyYXBoUXVlcnlgIGluc3RlYWQuJyk7XG4gICAgICAgIHZhciBzdHJGaWVsZHMgPSBBcnJheS5pc0FycmF5KGZpZWxkcykgPyBmaWVsZHMuam9pbignLCcpIDogZmllbGRzO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ2ZldGNoTGlua3MnLCBzdHJGaWVsZHMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZ3JhcGhxdWVyeSB0byBxdWVyeSBmb3IgdGhpcyBTZWFyY2hGb3JtLiBUaGlzIGlzIGFuIG9wdGlvbmFsIG1ldGhvZC5cbiAgICAgKi9cbiAgICBTZWFyY2hGb3JtLnByb3RvdHlwZS5ncmFwaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgnZ3JhcGhRdWVyeScsIHF1ZXJ5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGxhbmd1YWdlIHRvIHF1ZXJ5IGZvciB0aGlzIFNlYXJjaEZvcm0uIFRoaXMgaXMgYW4gb3B0aW9uYWwgbWV0aG9kLlxuICAgICAqL1xuICAgIFNlYXJjaEZvcm0ucHJvdG90eXBlLmxhbmcgPSBmdW5jdGlvbiAobGFuZ0NvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0KCdsYW5nJywgbGFuZ0NvZGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcGFnZSBudW1iZXIgdG8gcXVlcnkgZm9yIHRoaXMgU2VhcmNoRm9ybS4gVGhpcyBpcyBhbiBvcHRpb25hbCBtZXRob2QuXG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUucGFnZSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCgncGFnZScsIHApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCB0aGUgZG9jdW1lbnRzIGV4Y2VwdCBmb3IgdGhvc2UgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkb2N1bWVudCBpbiB0aGUgbGlzdC4gVGhpcyBpcyBhbiBvcHRpb25hbCBtZXRob2QuXG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ2FmdGVyJywgZG9jdW1lbnRJZCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBvcmRlcmluZ3MgdG8gcXVlcnkgZm9yIHRoaXMgU2VhcmNoRm9ybS4gVGhpcyBpcyBhbiBvcHRpb25hbCBtZXRob2QuXG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUub3JkZXJpbmdzID0gZnVuY3Rpb24gKG9yZGVyaW5ncykge1xuICAgICAgICBpZiAoIW9yZGVyaW5ncykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXQoJ29yZGVyaW5ncycsIFwiW1wiICsgb3JkZXJpbmdzLmpvaW4oJywnKSArIFwiXVwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQnVpbGQgdGhlIFVSTCB0byBxdWVyeVxuICAgICAqL1xuICAgIFNlYXJjaEZvcm0ucHJvdG90eXBlLnVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZm9ybS5hY3Rpb247XG4gICAgICAgIGlmICh0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIHZhciBzZXAgPSAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZGF0YSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gdGhpcy5kYXRhW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsICs9IHNlcCArIGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcCA9ICcmJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3VibWl0cyB0aGUgcXVlcnksIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICovXG4gICAgU2VhcmNoRm9ybS5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuY2FjaGVkUmVxdWVzdCh0aGlzLnVybCgpKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNiICYmIGNiKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZWFyY2hGb3JtO1xufSgpKTtcblxudmFyIE9QRVJBVE9SID0ge1xuICAgIGF0OiAnYXQnLFxuICAgIG5vdDogJ25vdCcsXG4gICAgbWlzc2luZzogJ21pc3NpbmcnLFxuICAgIGhhczogJ2hhcycsXG4gICAgYW55OiAnYW55JyxcbiAgICBpbjogJ2luJyxcbiAgICBmdWxsdGV4dDogJ2Z1bGx0ZXh0JyxcbiAgICBzaW1pbGFyOiAnc2ltaWxhcicsXG4gICAgbnVtYmVyR3Q6ICdudW1iZXIuZ3QnLFxuICAgIG51bWJlckx0OiAnbnVtYmVyLmx0JyxcbiAgICBudW1iZXJJblJhbmdlOiAnbnVtYmVyLmluUmFuZ2UnLFxuICAgIGRhdGVCZWZvcmU6ICdkYXRlLmJlZm9yZScsXG4gICAgZGF0ZUFmdGVyOiAnZGF0ZS5hZnRlcicsXG4gICAgZGF0ZUJldHdlZW46ICdkYXRlLmJldHdlZW4nLFxuICAgIGRhdGVEYXlPZk1vbnRoOiAnZGF0ZS5kYXktb2YtbW9udGgnLFxuICAgIGRhdGVEYXlPZk1vbnRoQWZ0ZXI6ICdkYXRlLmRheS1vZi1tb250aC1hZnRlcicsXG4gICAgZGF0ZURheU9mTW9udGhCZWZvcmU6ICdkYXRlLmRheS1vZi1tb250aC1iZWZvcmUnLFxuICAgIGRhdGVEYXlPZldlZWs6ICdkYXRlLmRheS1vZi13ZWVrJyxcbiAgICBkYXRlRGF5T2ZXZWVrQWZ0ZXI6ICdkYXRlLmRheS1vZi13ZWVrLWFmdGVyJyxcbiAgICBkYXRlRGF5T2ZXZWVrQmVmb3JlOiAnZGF0ZS5kYXktb2Ytd2Vlay1iZWZvcmUnLFxuICAgIGRhdGVNb250aDogJ2RhdGUubW9udGgnLFxuICAgIGRhdGVNb250aEJlZm9yZTogJ2RhdGUubW9udGgtYmVmb3JlJyxcbiAgICBkYXRlTW9udGhBZnRlcjogJ2RhdGUubW9udGgtYWZ0ZXInLFxuICAgIGRhdGVZZWFyOiAnZGF0ZS55ZWFyJyxcbiAgICBkYXRlSG91cjogJ2RhdGUuaG91cicsXG4gICAgZGF0ZUhvdXJCZWZvcmU6ICdkYXRlLmhvdXItYmVmb3JlJyxcbiAgICBkYXRlSG91ckFmdGVyOiAnZGF0ZS5ob3VyLWFmdGVyJyxcbiAgICBHZW9wb2ludE5lYXI6ICdnZW9wb2ludC5uZWFyJyxcbn07XG5mdW5jdGlvbiBlbmNvZGUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGVuY29kZSh2KTsgfSkuam9pbignLCcpICsgXCJdXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZW5jb2RlIFwiICsgdmFsdWUgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIHZhbHVlKTtcbiAgICB9XG59XG52YXIgZ2VvcG9pbnQgPSB7XG4gICAgbmVhcjogZnVuY3Rpb24gKGZyYWdtZW50LCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCByYWRpdXMpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuR2VvcG9pbnROZWFyICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGxhdGl0dWRlICsgXCIsIFwiICsgbG9uZ2l0dWRlICsgXCIsIFwiICsgcmFkaXVzICsgXCIpXVwiO1xuICAgIH0sXG59O1xudmFyIGRhdGUgPSB7XG4gICAgYmVmb3JlOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGJlZm9yZSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlQmVmb3JlICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGVuY29kZShiZWZvcmUpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgYWZ0ZXI6IGZ1bmN0aW9uIChmcmFnbWVudCwgYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZUFmdGVyICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGVuY29kZShhZnRlcikgKyBcIildXCI7XG4gICAgfSxcbiAgICBiZXR3ZWVuOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZUJldHdlZW4gKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZW5jb2RlKGJlZm9yZSkgKyBcIiwgXCIgKyBlbmNvZGUoYWZ0ZXIpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgZGF5T2ZNb250aDogZnVuY3Rpb24gKGZyYWdtZW50LCBkYXkpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZURheU9mTW9udGggKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZGF5ICsgXCIpXVwiO1xuICAgIH0sXG4gICAgZGF5T2ZNb250aEFmdGVyOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGRheSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlRGF5T2ZNb250aEFmdGVyICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGRheSArIFwiKV1cIjtcbiAgICB9LFxuICAgIGRheU9mTW9udGhCZWZvcmU6IGZ1bmN0aW9uIChmcmFnbWVudCwgZGF5KSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLmRhdGVEYXlPZk1vbnRoQmVmb3JlICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGRheSArIFwiKV1cIjtcbiAgICB9LFxuICAgIGRheU9mV2VlazogZnVuY3Rpb24gKGZyYWdtZW50LCBkYXkpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZURheU9mV2VlayArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBlbmNvZGUoZGF5KSArIFwiKV1cIjtcbiAgICB9LFxuICAgIGRheU9mV2Vla0FmdGVyOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGRheSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlRGF5T2ZXZWVrQWZ0ZXIgKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZW5jb2RlKGRheSkgKyBcIildXCI7XG4gICAgfSxcbiAgICBkYXlPZldlZWtCZWZvcmU6IGZ1bmN0aW9uIChmcmFnbWVudCwgZGF5KSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLmRhdGVEYXlPZldlZWtCZWZvcmUgKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZW5jb2RlKGRheSkgKyBcIildXCI7XG4gICAgfSxcbiAgICBtb250aDogZnVuY3Rpb24gKGZyYWdtZW50LCBtb250aCkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlTW9udGggKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZW5jb2RlKG1vbnRoKSArIFwiKV1cIjtcbiAgICB9LFxuICAgIG1vbnRoQmVmb3JlOiBmdW5jdGlvbiAoZnJhZ21lbnQsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLmRhdGVNb250aEJlZm9yZSArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBlbmNvZGUobW9udGgpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgbW9udGhBZnRlcjogZnVuY3Rpb24gKGZyYWdtZW50LCBtb250aCkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlTW9udGhBZnRlciArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBlbmNvZGUobW9udGgpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgeWVhcjogZnVuY3Rpb24gKGZyYWdtZW50LCB5ZWFyKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLmRhdGVZZWFyICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIHllYXIgKyBcIildXCI7XG4gICAgfSxcbiAgICBob3VyOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGhvdXIpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZUhvdXIgKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgaG91ciArIFwiKV1cIjtcbiAgICB9LFxuICAgIGhvdXJCZWZvcmU6IGZ1bmN0aW9uIChmcmFnbWVudCwgaG91cikge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5kYXRlSG91ckJlZm9yZSArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBob3VyICsgXCIpXVwiO1xuICAgIH0sXG4gICAgaG91ckFmdGVyOiBmdW5jdGlvbiAoZnJhZ21lbnQsIGhvdXIpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZGF0ZUhvdXJBZnRlciArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBob3VyICsgXCIpXVwiO1xuICAgIH0sXG59O1xudmFyIG51bWJlciA9IHtcbiAgICBndDogZnVuY3Rpb24gKGZyYWdtZW50LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5udW1iZXJHdCArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyB2YWx1ZSArIFwiKV1cIjtcbiAgICB9LFxuICAgIGx0OiBmdW5jdGlvbiAoZnJhZ21lbnQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLm51bWJlckx0ICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIHZhbHVlICsgXCIpXVwiO1xuICAgIH0sXG4gICAgaW5SYW5nZTogZnVuY3Rpb24gKGZyYWdtZW50LCBiZWZvcmUsIGFmdGVyKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLm51bWJlckluUmFuZ2UgKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgYmVmb3JlICsgXCIsIFwiICsgYWZ0ZXIgKyBcIildXCI7XG4gICAgfSxcbn07XG52YXIgUHJlZGljYXRlcyA9IHtcbiAgICBhdDogZnVuY3Rpb24gKGZyYWdtZW50LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gXCJbXCIgKyBPUEVSQVRPUi5hdCArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBlbmNvZGUodmFsdWUpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgbm90OiBmdW5jdGlvbiAoZnJhZ21lbnQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLm5vdCArIFwiKFwiICsgZnJhZ21lbnQgKyBcIiwgXCIgKyBlbmNvZGUodmFsdWUpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgbWlzc2luZzogZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLm1pc3NpbmcgKyBcIihcIiArIGZyYWdtZW50ICsgXCIpXVwiO1xuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuaGFzICsgXCIoXCIgKyBmcmFnbWVudCArIFwiKV1cIjtcbiAgICB9LFxuICAgIGFueTogZnVuY3Rpb24gKGZyYWdtZW50LCB2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuYW55ICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGVuY29kZSh2YWx1ZXMpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgaW46IGZ1bmN0aW9uIChmcmFnbWVudCwgdmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLmluICsgXCIoXCIgKyBmcmFnbWVudCArIFwiLCBcIiArIGVuY29kZSh2YWx1ZXMpICsgXCIpXVwiO1xuICAgIH0sXG4gICAgZnVsbHRleHQ6IGZ1bmN0aW9uIChmcmFnbWVudCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgT1BFUkFUT1IuZnVsbHRleHQgKyBcIihcIiArIGZyYWdtZW50ICsgXCIsIFwiICsgZW5jb2RlKHZhbHVlKSArIFwiKV1cIjtcbiAgICB9LFxuICAgIHNpbWlsYXI6IGZ1bmN0aW9uIChkb2N1bWVudElkLCBtYXhSZXN1bHRzKSB7XG4gICAgICAgIHJldHVybiBcIltcIiArIE9QRVJBVE9SLnNpbWlsYXIgKyBcIihcXFwiXCIgKyBkb2N1bWVudElkICsgXCJcXFwiLCBcIiArIG1heFJlc3VsdHMgKyBcIildXCI7XG4gICAgfSxcbiAgICBkYXRlOiBkYXRlLFxuICAgIGRhdGVCZWZvcmU6IGRhdGUuYmVmb3JlLFxuICAgIGRhdGVBZnRlcjogZGF0ZS5hZnRlcixcbiAgICBkYXRlQmV0d2VlbjogZGF0ZS5iZXR3ZWVuLFxuICAgIGRheU9mTW9udGg6IGRhdGUuZGF5T2ZNb250aCxcbiAgICBkYXlPZk1vbnRoQWZ0ZXI6IGRhdGUuZGF5T2ZNb250aEFmdGVyLFxuICAgIGRheU9mTW9udGhCZWZvcmU6IGRhdGUuZGF5T2ZNb250aEJlZm9yZSxcbiAgICBkYXlPZldlZWs6IGRhdGUuZGF5T2ZXZWVrLFxuICAgIGRheU9mV2Vla0FmdGVyOiBkYXRlLmRheU9mV2Vla0FmdGVyLFxuICAgIGRheU9mV2Vla0JlZm9yZTogZGF0ZS5kYXlPZldlZWtCZWZvcmUsXG4gICAgbW9udGg6IGRhdGUubW9udGgsXG4gICAgbW9udGhCZWZvcmU6IGRhdGUubW9udGhCZWZvcmUsXG4gICAgbW9udGhBZnRlcjogZGF0ZS5tb250aEFmdGVyLFxuICAgIHllYXI6IGRhdGUueWVhcixcbiAgICBob3VyOiBkYXRlLmhvdXIsXG4gICAgaG91ckJlZm9yZTogZGF0ZS5ob3VyQmVmb3JlLFxuICAgIGhvdXJBZnRlcjogZGF0ZS5ob3VyQWZ0ZXIsXG4gICAgbnVtYmVyOiBudW1iZXIsXG4gICAgZ3Q6IG51bWJlci5ndCxcbiAgICBsdDogbnVtYmVyLmx0LFxuICAgIGluUmFuZ2U6IG51bWJlci5pblJhbmdlLFxuICAgIG5lYXI6IGdlb3BvaW50Lm5lYXIsXG4gICAgZ2VvcG9pbnQ6IGdlb3BvaW50LFxufTtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIFNvbWUgcG9ydGlvbnMgb2YgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qc2h0dHAvY29va2llXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuZnVuY3Rpb24gdHJ5RGVjb2RlKHN0ciwgZGVjb2RlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZShzdHIpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHIgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIH1cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KC87ICovKTtcbiAgICB2YXIgZGVjID0gb3B0LmRlY29kZSB8fCBkZWNvZGU7XG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbiAocGFpcikge1xuICAgICAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgICAgIC8vIHNraXAgdGhpbmdzIHRoYXQgZG9uJ3QgbG9vayBsaWtlIGtleT12YWx1ZVxuICAgICAgICBpZiAoZXFfaWR4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSBwYWlyLnN1YnN0cigwLCBlcV9pZHgpLnRyaW0oKTtcbiAgICAgICAgdmFyIHZhbCA9IHBhaXIuc3Vic3RyKCsrZXFfaWR4LCBwYWlyLmxlbmd0aCkudHJpbSgpO1xuICAgICAgICAvLyBxdW90ZWQgdmFsdWVzXG4gICAgICAgIGlmICgnXCInID09IHZhbFswXSkge1xuICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvbmx5IGFzc2lnbiBvbmNlXG4gICAgICAgIGlmICh1bmRlZmluZWQgPT0gb2JqW2tleV0pIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdHJ5RGVjb2RlKHZhbCwgZGVjKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG59XG52YXIgQ29va2llcyA9IHsgcGFyc2U6IHBhcnNlIH07XG5cbmZ1bmN0aW9uIGNyZWF0ZVByZXZpZXdSZXNvbHZlcih0b2tlbiwgZG9jdW1lbnRJZCwgZ2V0RG9jQnlJRCkge1xuICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gKGxpbmtSZXNvbHZlciwgZGVmYXVsdFVybCwgY2IpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50SWQgJiYgZ2V0RG9jQnlJRCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldERvY0J5SUQoZG9jdW1lbnRJZCwgeyByZWY6IHRva2VuIH0pLnRoZW4oZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjYiAmJiBjYihudWxsLCBkZWZhdWx0VXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRVcmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gKGxpbmtSZXNvbHZlciAmJiBsaW5rUmVzb2x2ZXIoZG9jdW1lbnQpKSB8fCBkb2N1bWVudC51cmwgfHwgZGVmYXVsdFVybDtcbiAgICAgICAgICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVmYXVsdFVybCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7IHRva2VuOiB0b2tlbiwgZG9jdW1lbnRJZDogZG9jdW1lbnRJZCwgcmVzb2x2ZTogcmVzb2x2ZSB9O1xufVxuXG52YXIgUFJFVklFV19DT09LSUUgPSAnaW8ucHJpc21pYy5wcmV2aWV3JztcbnZhciBFWFBFUklNRU5UX0NPT0tJRSA9ICdpby5wcmlzbWljLmV4cGVyaW1lbnQnO1xudmFyIFJlc29sdmVkQXBpID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlc29sdmVkQXBpKGRhdGEsIGh0dHBDbGllbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5tYXN0ZXJSZWYgPSBkYXRhLnJlZnMuZmlsdGVyKGZ1bmN0aW9uIChyZWYpIHsgcmV0dXJuIHJlZi5pc01hc3RlclJlZjsgfSlbMF07XG4gICAgICAgIHRoaXMuZXhwZXJpbWVudHMgPSBuZXcgRXhwZXJpbWVudHMoZGF0YS5leHBlcmltZW50cyk7XG4gICAgICAgIHRoaXMuYm9va21hcmtzID0gZGF0YS5ib29rbWFya3M7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMucmVmcyA9IGRhdGEucmVmcztcbiAgICAgICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgICB0aGlzLnR5cGVzID0gZGF0YS50eXBlcztcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMgPSBkYXRhLmxhbmd1YWdlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHVzZWFibGUgZm9ybSBmcm9tIGl0cyBpZCwgYXMgZGVzY3JpYmVkIGluIHRoZSBSRVNUZnVsIGRlc2NyaXB0aW9uIG9mIHRoZSBBUEkuXG4gICAgICogRm9yIGluc3RhbmNlOiBhcGkuZm9ybShcImV2ZXJ5dGhpbmdcIikgd29ya3Mgb24gZXZlcnkgcmVwb3NpdG9yeSAoYXMgXCJldmVyeXRoaW5nXCIgZXhpc3RzIGJ5IGRlZmF1bHQpXG4gICAgICogWW91IGNhbiB0aGVuIGNoYWluIHRoZSBjYWxsczogYXBpLmZvcm0oXCJldmVyeXRoaW5nXCIpLnF1ZXJ5KCdbWzpkID0gYXQoZG9jdW1lbnQuaWQsIFwiVWtMMGdNdXZ6WVVBTkNwZlwiKV1dJykucmVmKHJlZikuc3VibWl0KClcbiAgICAgKi9cbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUuZm9ybSA9IGZ1bmN0aW9uIChmb3JtSWQpIHtcbiAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmRhdGEuZm9ybXNbZm9ybUlkXTtcbiAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2VhcmNoRm9ybShmb3JtLCB0aGlzLmh0dHBDbGllbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgUmVzb2x2ZWRBcGkucHJvdG90eXBlLmV2ZXJ5dGhpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmID0gdGhpcy5mb3JtKCdldmVyeXRoaW5nJyk7XG4gICAgICAgIGlmICghZilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBldmVyeXRoaW5nIGZvcm0nKTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgSUQgb2YgdGhlIG1hc3RlciByZWYgb24gdGhpcyBwcmlzbWljLmlvIEFQSS5cbiAgICAgKiBEbyBub3QgdXNlIGxpa2UgdGhpczogc2VhcmNoRm9ybS5yZWYoYXBpLm1hc3RlcigpKS5cbiAgICAgKiBJbnN0ZWFkLCBzZXQgeW91ciByZWYgb25jZSBpbiBhIHZhcmlhYmxlLCBhbmQgY2FsbCBpdCB3aGVuIHlvdSBuZWVkIGl0OyB0aGlzIHdpbGwgYWxsb3cgdG8gY2hhbmdlIHRoZSByZWYgeW91J3JlIHZpZXdpbmcgZWFzaWx5IGZvciB5b3VyIGVudGlyZSBwYWdlLlxuICAgICAqL1xuICAgIFJlc29sdmVkQXBpLnByb3RvdHlwZS5tYXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hc3RlclJlZi5yZWY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZWYgSUQgZm9yIGEgZ2l2ZW4gcmVmJ3MgbGFiZWwuXG4gICAgICogRG8gbm90IHVzZSBsaWtlIHRoaXM6IHNlYXJjaEZvcm0ucmVmKGFwaS5yZWYoXCJGdXR1cmUgcmVsZWFzZSBsYWJlbFwiKSkuXG4gICAgICogSW5zdGVhZCwgc2V0IHlvdXIgcmVmIG9uY2UgaW4gYSB2YXJpYWJsZSwgYW5kIGNhbGwgaXQgd2hlbiB5b3UgbmVlZCBpdDsgdGhpcyB3aWxsIGFsbG93IHRvIGNoYW5nZSB0aGUgcmVmIHlvdSdyZSB2aWV3aW5nIGVhc2lseSBmb3IgeW91ciBlbnRpcmUgcGFnZS5cbiAgICAgKi9cbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIHZhciByZWYgPSB0aGlzLmRhdGEucmVmcy5maWx0ZXIoZnVuY3Rpb24gKHJlZikgeyByZXR1cm4gcmVmLmxhYmVsID09PSBsYWJlbDsgfSlbMF07XG4gICAgICAgIHJldHVybiByZWYgPyByZWYucmVmIDogbnVsbDtcbiAgICB9O1xuICAgIFJlc29sdmVkQXBpLnByb3RvdHlwZS5jdXJyZW50RXhwZXJpbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwZXJpbWVudHMuY3VycmVudCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUXVlcnkgdGhlIHJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocSwgb3B0aW9uc09yQ2FsbGJhY2ssIGNiKSB7XG4gICAgICAgIGlmIChjYiA9PT0gdm9pZCAwKSB7IGNiID0gZnVuY3Rpb24gKCkgeyB9OyB9XG4gICAgICAgIHZhciBfYSA9IHR5cGVvZiBvcHRpb25zT3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyB7IG9wdGlvbnM6IHt9LCBjYWxsYmFjazogb3B0aW9uc09yQ2FsbGJhY2sgfVxuICAgICAgICAgICAgOiB7IG9wdGlvbnM6IG9wdGlvbnNPckNhbGxiYWNrIHx8IHt9LCBjYWxsYmFjazogY2IgfSwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGNhbGxiYWNrID0gX2EuY2FsbGJhY2s7XG4gICAgICAgIHZhciBmb3JtID0gdGhpcy5ldmVyeXRoaW5nKCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBmb3JtID0gZm9ybS5zZXQoa2V5LCBvcHRpb25zW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9ucy5yZWYpIHtcbiAgICAgICAgICAgIC8vIExvb2sgaW4gY29va2llcyBpZiB3ZSBoYXZlIGEgcmVmIChwcmV2aWV3IG9yIGV4cGVyaW1lbnQpXG4gICAgICAgICAgICB2YXIgY29va2llU3RyaW5nID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlcSkgeyAvLyBOb2RlSlNcbiAgICAgICAgICAgICAgICBjb29raWVTdHJpbmcgPSB0aGlzLm9wdGlvbnMucmVxLmhlYWRlcnNbJ2Nvb2tpZSddIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7IC8vIEJyb3dzZXJcbiAgICAgICAgICAgICAgICBjb29raWVTdHJpbmcgPSB3aW5kb3cuZG9jdW1lbnQuY29va2llIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvb2tpZXMgPSBDb29raWVzLnBhcnNlKGNvb2tpZVN0cmluZyk7XG4gICAgICAgICAgICB2YXIgcHJldmlld1JlZiA9IGNvb2tpZXNbUFJFVklFV19DT09LSUVdO1xuICAgICAgICAgICAgdmFyIGV4cGVyaW1lbnRSZWYgPSB0aGlzLmV4cGVyaW1lbnRzLnJlZkZyb21Db29raWUoY29va2llc1tFWFBFUklNRU5UX0NPT0tJRV0pO1xuICAgICAgICAgICAgZm9ybSA9IGZvcm0ucmVmKHByZXZpZXdSZWYgfHwgZXhwZXJpbWVudFJlZiB8fCB0aGlzLm1hc3RlclJlZi5yZWYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChxKSB7XG4gICAgICAgICAgICBmb3JtLnF1ZXJ5KHEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtLnN1Ym1pdChjYWxsYmFjayk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgZG9jdW1lbnQgcmV0dXJuZWQgYnkgdGhlIGdpdmVuIHF1ZXJ5XG4gICAgICogQHBhcmFtIHtzdHJpbmd8YXJyYXl8UHJlZGljYXRlfSB0aGUgcXVlcnlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gYWRkaXRpb25hbCBwYXJhbWV0ZXJzLiBJbiBOb2RlSlMsIHBhc3MgdGhlIHJlcXVlc3QgYXMgJ3JlcScuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2soZXJyLCBkb2MpXG4gICAgICovXG4gICAgUmVzb2x2ZWRBcGkucHJvdG90eXBlLnF1ZXJ5Rmlyc3QgPSBmdW5jdGlvbiAocSwgb3B0aW9uc09yQ2FsbGJhY2ssIGNiKSB7XG4gICAgICAgIHZhciBfYSA9IHR5cGVvZiBvcHRpb25zT3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyB7IG9wdGlvbnM6IHt9LCBjYWxsYmFjazogb3B0aW9uc09yQ2FsbGJhY2sgfVxuICAgICAgICAgICAgOiB7IG9wdGlvbnM6IG9wdGlvbnNPckNhbGxiYWNrIHx8IHt9LCBjYWxsYmFjazogY2IgfHwgKGZ1bmN0aW9uICgpIHsgfSkgfSwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGNhbGxiYWNrID0gX2EuY2FsbGJhY2s7XG4gICAgICAgIG9wdGlvbnMucGFnZSA9IDE7XG4gICAgICAgIG9wdGlvbnMucGFnZVNpemUgPSAxO1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeShxLCBvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIGRvY3VtZW50ID0gcmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzdWx0cyAmJiByZXNwb25zZS5yZXN1bHRzWzBdO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZG9jdW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiBpZFxuICAgICAqL1xuICAgIFJlc29sdmVkQXBpLnByb3RvdHlwZS5nZXRCeUlEID0gZnVuY3Rpb24gKGlkLCBtYXliZU9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gbWF5YmVPcHRpb25zID8gX19hc3NpZ24oe30sIG1heWJlT3B0aW9ucykgOiB7fTtcbiAgICAgICAgaWYgKCFvcHRpb25zLmxhbmcpXG4gICAgICAgICAgICBvcHRpb25zLmxhbmcgPSAnKic7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5Rmlyc3QoUHJlZGljYXRlcy5hdCgnZG9jdW1lbnQuaWQnLCBpZCksIG9wdGlvbnMsIGNiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIG11bHRpcGxlIGRvY3VtZW50cyBmcm9tIGFuIGFycmF5IG9mIGlkXG4gICAgICovXG4gICAgUmVzb2x2ZWRBcGkucHJvdG90eXBlLmdldEJ5SURzID0gZnVuY3Rpb24gKGlkcywgbWF5YmVPcHRpb25zLCBjYikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IG1heWJlT3B0aW9ucyA/IF9fYXNzaWduKHt9LCBtYXliZU9wdGlvbnMpIDoge307XG4gICAgICAgIGlmICghb3B0aW9ucy5sYW5nKVxuICAgICAgICAgICAgb3B0aW9ucy5sYW5nID0gJyonO1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeShQcmVkaWNhdGVzLmluKCdkb2N1bWVudC5pZCcsIGlkcyksIG9wdGlvbnMsIGNiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHRoZSBkb2N1bWVudCB3aXRoIHRoZSBnaXZlbiB1aWRcbiAgICAgKi9cbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUuZ2V0QnlVSUQgPSBmdW5jdGlvbiAodHlwZSwgdWlkLCBtYXliZU9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gbWF5YmVPcHRpb25zID8gX19hc3NpZ24oe30sIG1heWJlT3B0aW9ucykgOiB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGFuZyA9PT0gJyonKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRk9SQklEREVOLiBZb3UgY2FuJ3QgdXNlIGdldEJ5VUlEIHdpdGggKiwgdXNlIHRoZSBwcmVkaWNhdGVzIGluc3RlYWQuXCIpO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGFnZSlcbiAgICAgICAgICAgIG9wdGlvbnMucGFnZSA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5Rmlyc3QoUHJlZGljYXRlcy5hdChcIm15LlwiICsgdHlwZSArIFwiLnVpZFwiLCB1aWQpLCBvcHRpb25zLCBjYik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgc2luZ2xldG9uIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIHR5cGVcbiAgICAgKi9cbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUuZ2V0U2luZ2xlID0gZnVuY3Rpb24gKHR5cGUsIG1heWJlT3B0aW9ucywgY2IpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBtYXliZU9wdGlvbnMgPyBfX2Fzc2lnbih7fSwgbWF5YmVPcHRpb25zKSA6IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUZpcnN0KFByZWRpY2F0ZXMuYXQoJ2RvY3VtZW50LnR5cGUnLCB0eXBlKSwgb3B0aW9ucywgY2IpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgdGhlIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIGJvb2ttYXJrXG4gICAgICovXG4gICAgUmVzb2x2ZWRBcGkucHJvdG90eXBlLmdldEJvb2ttYXJrID0gZnVuY3Rpb24gKGJvb2ttYXJrLCBtYXliZU9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuZGF0YS5ib29rbWFya3NbYm9va21hcmtdO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJ5SUQoaWQsIG1heWJlT3B0aW9ucywgY2IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdFcnJvciByZXRyaWV2aW5nIGJvb2ttYXJrZWQgaWQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVzb2x2ZWRBcGkucHJvdG90eXBlLmdldFByZXZpZXdSZXNvbHZlciA9IGZ1bmN0aW9uICh0b2tlbiwgZG9jdW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJldmlld1Jlc29sdmVyKHRva2VuLCBkb2N1bWVudElkLCB0aGlzLmdldEJ5SUQuYmluZCh0aGlzKSk7XG4gICAgfTtcbiAgICBSZXNvbHZlZEFwaS5wcm90b3R5cGUucHJldmlld1Nlc3Npb24gPSBmdW5jdGlvbiAodG9rZW4sIGxpbmtSZXNvbHZlciwgZGVmYXVsdFVybCwgY2IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY29uc29sZS53YXJuKCdwcmV2aWV3U2Vzc2lvbiBmdW5jdGlvbiBpcyBkZXByZWNhdGVkIGluIGZhdm9yIG9mIGdldFByZXZpZXdSZXNvbHZlciBmdW5jdGlvbi4nKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmh0dHBDbGllbnQucmVxdWVzdCh0b2tlbiwgZnVuY3Rpb24gKGUsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiICYmIGNiKGUpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5tYWluRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiICYmIGNiKG51bGwsIGRlZmF1bHRVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkZWZhdWx0VXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRCeUlEKHJlc3VsdC5tYWluRG9jdW1lbnQsIHsgcmVmOiB0b2tlbiB9KS50aGVuKGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgZGVmYXVsdFVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGVmYXVsdFVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gKGxpbmtSZXNvbHZlciAmJiBsaW5rUmVzb2x2ZXIoZG9jdW1lbnQpKSB8fCBkb2N1bWVudC51cmwgfHwgZGVmYXVsdFVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVzb2x2ZWRBcGk7XG59KCkpO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4qIEEgZG91Ymx5IGxpbmtlZCBsaXN0LWJhc2VkIExlYXN0IFJlY2VudGx5IFVzZWQgKExSVSkgY2FjaGUuIFdpbGwga2VlcCBtb3N0XG4qIHJlY2VudGx5IHVzZWQgaXRlbXMgd2hpbGUgZGlzY2FyZGluZyBsZWFzdCByZWNlbnRseSB1c2VkIGl0ZW1zIHdoZW4gaXRzIGxpbWl0XG4qIGlzIHJlYWNoZWQuXG4qXG4qIExpY2Vuc2VkIHVuZGVyIE1JVC4gQ29weXJpZ2h0IChjKSAyMDEwIFJhc211cyBBbmRlcnNzb24gPGh0dHA6Ly9odW5jaC5zZS8+XG4qIFR5cGVzY3JpcHQtaWZpZWQgYnkgT2xla3NhbmRyIE5pa2l0aW4gPGh0dHBzOi8vdHZvcmkuaW5mbz5cbipcbiogSWxsdXN0cmF0aW9uIG9mIHRoZSBkZXNpZ246XG4qXG4qICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5ICAgICAgICAgICAgIGVudHJ5XG4qICAgICAgIF9fX19fXyAgICAgICAgICAgIF9fX19fXyAgICAgICAgICAgIF9fX19fXyAgICAgICAgICAgIF9fX19fX1xuKiAgICAgIHwgaGVhZCB8Lm5ld2VyID0+IHwgICAgICB8Lm5ld2VyID0+IHwgICAgICB8Lm5ld2VyID0+IHwgdGFpbCB8XG4qICAgICAgfCAgQSAgIHwgICAgICAgICAgfCAgQiAgIHwgICAgICAgICAgfCAgQyAgIHwgICAgICAgICAgfCAgRCAgIHxcbiogICAgICB8X19fX19ffCA8PSBvbGRlci58X19fX19ffCA8PSBvbGRlci58X19fX19ffCA8PSBvbGRlci58X19fX19ffFxuKlxuKiAgcmVtb3ZlZCAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIDwtLSAgPC0tICA8LS0gIGFkZGVkXG4qL1xuZnVuY3Rpb24gTWFrZUxSVUNhY2hlKGxpbWl0KSB7XG4gICAgcmV0dXJuIG5ldyBMUlVDYWNoZShsaW1pdCk7XG59XG5mdW5jdGlvbiBMUlVDYWNoZShsaW1pdCkge1xuICAgIC8vIEN1cnJlbnQgc2l6ZSBvZiB0aGUgY2FjaGUuIChSZWFkLW9ubHkpLlxuICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgLy8gTWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdGhpcyBjYWNoZSBjYW4gaG9sZC5cbiAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5fa2V5bWFwID0ge307XG59XG4vKipcbiAqIFB1dCA8dmFsdWU+IGludG8gdGhlIGNhY2hlIGFzc29jaWF0ZWQgd2l0aCA8a2V5Pi4gUmV0dXJucyB0aGUgZW50cnkgd2hpY2ggd2FzXG4gKiByZW1vdmVkIHRvIG1ha2Ugcm9vbSBmb3IgdGhlIG5ldyBlbnRyeS4gT3RoZXJ3aXNlIHVuZGVmaW5lZCBpcyByZXR1cm5lZFxuICogKGkuZS4gaWYgdGhlcmUgd2FzIGVub3VnaCByb29tIGFscmVhZHkpLlxuICovXG5MUlVDYWNoZS5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZW50cnkgPSB7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcbiAgICAvLyBOb3RlOiBObyBwcm90ZWN0aW9uIGFnYWlucyByZXBsYWNpbmcsIGFuZCB0aHVzIG9ycGhhbiBlbnRyaWVzLiBCeSBkZXNpZ24uXG4gICAgdGhpcy5fa2V5bWFwW2tleV0gPSBlbnRyeTtcbiAgICBpZiAodGhpcy50YWlsKSB7XG4gICAgICAgIC8vIGxpbmsgcHJldmlvdXMgdGFpbCB0byB0aGUgbmV3IHRhaWwgKGVudHJ5KVxuICAgICAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeTtcbiAgICAgICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB3ZSdyZSBmaXJzdCBpbiAtLSB5YXlcbiAgICAgICAgdGhpcy5oZWFkID0gZW50cnk7XG4gICAgfVxuICAgIC8vIGFkZCBuZXcgZW50cnkgdG8gdGhlIGVuZCBvZiB0aGUgbGlua2VkIGxpc3QgLS0gaXQncyBub3cgdGhlIGZyZXNoZXN0IGVudHJ5LlxuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgIGlmICh0aGlzLnNpemUgPT09IHRoaXMubGltaXQpIHtcbiAgICAgICAgLy8gd2UgaGl0IHRoZSBsaW1pdCAtLSByZW1vdmUgdGhlIGhlYWRcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpZnQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGluY3JlYXNlIHRoZSBzaXplIGNvdW50ZXJcbiAgICAgICAgdGhpcy5zaXplKys7XG4gICAgfVxufTtcbi8qKlxuICogUHVyZ2UgdGhlIGxlYXN0IHJlY2VudGx5IHVzZWQgKG9sZGVzdCkgZW50cnkgZnJvbSB0aGUgY2FjaGUuIFJldHVybnMgdGhlXG4gKiByZW1vdmVkIGVudHJ5IG9yIHVuZGVmaW5lZCBpZiB0aGUgY2FjaGUgd2FzIGVtcHR5LlxuICpcbiAqIElmIHlvdSBuZWVkIHRvIHBlcmZvcm0gYW55IGZvcm0gb2YgZmluYWxpemF0aW9uIG9mIHB1cmdlZCBpdGVtcywgdGhpcyBpcyBhXG4gKiBnb29kIHBsYWNlIHRvIGRvIGl0LiBTaW1wbHkgb3ZlcnJpZGUvcmVwbGFjZSB0aGlzIGZ1bmN0aW9uOlxuICpcbiAqICAgdmFyIGMgPSBuZXcgTFJVQ2FjaGUoMTIzKTtcbiAqICAgYy5zaGlmdCA9IGZ1bmN0aW9uKCkge1xuICogICAgIHZhciBlbnRyeSA9IExSVUNhY2hlLnByb3RvdHlwZS5zaGlmdC5jYWxsKHRoaXMpO1xuICogICAgIGRvU29tZXRoaW5nV2l0aChlbnRyeSk7XG4gKiAgICAgcmV0dXJuIGVudHJ5O1xuICogICB9XG4gKi9cbkxSVUNhY2hlLnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyB0b2RvOiBoYW5kbGUgc3BlY2lhbCBjYXNlIHdoZW4gbGltaXQgPT0gMVxuICAgIHZhciBlbnRyeSA9IHRoaXMuaGVhZDtcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZC5uZXdlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5ld2VyO1xuICAgICAgICAgICAgdGhpcy5oZWFkLm9sZGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IHN0cm9uZyByZWZlcmVuY2UgdG8gPGVudHJ5PiBhbmQgcmVtb3ZlIGxpbmtzIGZyb20gdGhlIHB1cmdlZFxuICAgICAgICAvLyBlbnRyeSBiZWluZyByZXR1cm5lZDpcbiAgICAgICAgZW50cnkubmV3ZXIgPSBlbnRyeS5vbGRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gZGVsZXRlIGlzIHNsb3csIGJ1dCB3ZSBuZWVkIHRvIGRvIHRoaXMgdG8gYXZvaWQgdW5jb250cm9sbGFibGUgZ3Jvd3RoOlxuICAgICAgICBkZWxldGUgdGhpcy5fa2V5bWFwW2VudHJ5LmtleV07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdwdXJnaW5nICcsIGVudHJ5LmtleSk7XG4gICAgcmV0dXJuIGVudHJ5O1xufTtcbi8qKlxuICogR2V0IGFuZCByZWdpc3RlciByZWNlbnQgdXNlIG9mIDxrZXk+LiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggPGtleT5cbiAqIG9yIHVuZGVmaW5lZCBpZiBub3QgaW4gY2FjaGUuXG4gKi9cbkxSVUNhY2hlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCByZXR1cm5FbnRyeSkge1xuICAgIC8vIEZpcnN0LCBmaW5kIG91ciBjYWNoZSBlbnRyeVxuICAgIHZhciBlbnRyeSA9IHRoaXMuX2tleW1hcFtrZXldO1xuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47IC8vIE5vdCBjYWNoZWQuIFNvcnJ5LlxuICAgIC8vIEFzIDxrZXk+IHdhcyBmb3VuZCBpbiB0aGUgY2FjaGUsIHJlZ2lzdGVyIGl0IGFzIGJlaW5nIHJlcXVlc3RlZCByZWNlbnRseVxuICAgIGlmIChlbnRyeSA9PT0gdGhpcy50YWlsKSB7XG4gICAgICAgIC8vIEFscmVhZHkgdGhlIG1vc3QgcmVjZW50bHkgdXNlZCBlbnRyeSwgc28gbm8gbmVlZCB0byB1cGRhdGUgdGhlIGxpc3RcbiAgICAgICAgcmV0dXJuIHJldHVybkVudHJ5ID8gZW50cnkgOiBlbnRyeS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSEVBRC0tLS0tLS0tLS0tLS0tVEFJTFxuICAgIC8vICAgPC5vbGRlciAgIC5uZXdlcj5cbiAgICAvLyAgPC0tLSBhZGQgZGlyZWN0aW9uIC0tXG4gICAgLy8gICBBICBCICBDICA8RD4gIEVcbiAgICBpZiAoZW50cnkubmV3ZXIpIHtcbiAgICAgICAgaWYgKGVudHJ5ID09PSB0aGlzLmhlYWQpXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBlbnRyeS5uZXdlcjtcbiAgICAgICAgZW50cnkubmV3ZXIub2xkZXIgPSBlbnRyeS5vbGRlcjsgLy8gQyA8LS0gRS5cbiAgICB9XG4gICAgaWYgKGVudHJ5Lm9sZGVyKVxuICAgICAgICBlbnRyeS5vbGRlci5uZXdlciA9IGVudHJ5Lm5ld2VyOyAvLyBDLiAtLT4gRVxuICAgIGVudHJ5Lm5ld2VyID0gdW5kZWZpbmVkOyAvLyBEIC0teFxuICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsOyAvLyBELiAtLT4gRVxuICAgIGlmICh0aGlzLnRhaWwpXG4gICAgICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5OyAvLyBFLiA8LS0gRFxuICAgIHRoaXMudGFpbCA9IGVudHJ5O1xuICAgIHJldHVybiByZXR1cm5FbnRyeSA/IGVudHJ5IDogZW50cnkudmFsdWU7XG59O1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRm9sbG93aW5nIGNvZGUgaXMgb3B0aW9uYWwgYW5kIGNhbiBiZSByZW1vdmVkIHdpdGhvdXQgYnJlYWtpbmcgdGhlIGNvcmVcbi8vIGZ1bmN0aW9uYWxpdHkuXG4vKipcbiAqIENoZWNrIGlmIDxrZXk+IGlzIGluIHRoZSBjYWNoZSB3aXRob3V0IHJlZ2lzdGVyaW5nIHJlY2VudCB1c2UuIEZlYXNpYmxlIGlmXG4gKiB5b3UgZG8gbm90IHdhbnQgdG8gY2hhZ2UgdGhlIHN0YXRlIG9mIHRoZSBjYWNoZSwgYnV0IG9ubHkgXCJwZWVrXCIgYXQgaXQuXG4gKiBSZXR1cm5zIHRoZSBlbnRyeSBhc3NvY2lhdGVkIHdpdGggPGtleT4gaWYgZm91bmQsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbkxSVUNhY2hlLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9rZXltYXBba2V5XTtcbn07XG4vKipcbiAqIFVwZGF0ZSB0aGUgdmFsdWUgb2YgZW50cnkgd2l0aCA8a2V5Pi4gUmV0dXJucyB0aGUgb2xkIHZhbHVlLCBvciB1bmRlZmluZWQgaWZcbiAqIGVudHJ5IHdhcyBub3QgaW4gdGhlIGNhY2hlLlxuICovXG5MUlVDYWNoZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgb2xkdmFsdWU7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgb2xkdmFsdWUgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgZW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9sZHZhbHVlID0gdGhpcy5wdXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmIChvbGR2YWx1ZSlcbiAgICAgICAgICAgIG9sZHZhbHVlID0gb2xkdmFsdWUudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBvbGR2YWx1ZTtcbn07XG4vKipcbiAqIFJlbW92ZSBlbnRyeSA8a2V5PiBmcm9tIGNhY2hlIGFuZCByZXR1cm4gaXRzIHZhbHVlLiBSZXR1cm5zIHVuZGVmaW5lZCBpZiBub3RcbiAqIGZvdW5kLlxuICovXG5MUlVDYWNoZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBlbnRyeSA9IHRoaXMuX2tleW1hcFtrZXldO1xuICAgIGlmICghZW50cnkpXG4gICAgICAgIHJldHVybjtcbiAgICBkZWxldGUgdGhpcy5fa2V5bWFwW2VudHJ5LmtleV07IC8vIG5lZWQgdG8gZG8gZGVsZXRlIHVuZm9ydHVuYXRlbHlcbiAgICBpZiAoZW50cnkubmV3ZXIgJiYgZW50cnkub2xkZXIpIHtcbiAgICAgICAgLy8gcmVsaW5rIHRoZSBvbGRlciBlbnRyeSB3aXRoIHRoZSBuZXdlciBlbnRyeVxuICAgICAgICBlbnRyeS5vbGRlci5uZXdlciA9IGVudHJ5Lm5ld2VyO1xuICAgICAgICBlbnRyeS5uZXdlci5vbGRlciA9IGVudHJ5Lm9sZGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRyeS5uZXdlcikge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGxpbmsgdG8gdXNcbiAgICAgICAgZW50cnkubmV3ZXIub2xkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGxpbmsgdGhlIG5ld2VyIGVudHJ5IHRvIGhlYWRcbiAgICAgICAgdGhpcy5oZWFkID0gZW50cnkubmV3ZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudHJ5Lm9sZGVyKSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGluayB0byB1c1xuICAgICAgICBlbnRyeS5vbGRlci5uZXdlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gbGluayB0aGUgbmV3ZXIgZW50cnkgdG8gaGVhZFxuICAgICAgICB0aGlzLnRhaWwgPSBlbnRyeS5vbGRlcjtcbiAgICB9XG4gICAgZWxzZSB7IC8vIGlmKGVudHJ5Lm9sZGVyID09PSB1bmRlZmluZWQgJiYgZW50cnkubmV3ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuc2l6ZS0tO1xuICAgIHJldHVybiBlbnRyeS52YWx1ZTtcbn07XG4vKiogUmVtb3ZlcyBhbGwgZW50cmllcyAqL1xuTFJVQ2FjaGUucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIHNob3VsZCBiZSBzYWZlLCBhcyB3ZSBuZXZlciBleHBvc2Ugc3Ryb25nIHJlZnJlbmNlcyB0byB0aGUgb3V0c2lkZVxuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNpemUgPSAwO1xuICAgIHRoaXMuX2tleW1hcCA9IHt9O1xufTtcbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtleXMgb2YgZW50cmllcyBzdG9yZWQgaW4gdGhlIGNhY2hlIG9iamVjdCwgaW5cbiAqIGFyYml0cmFyeSBvcmRlci5cbiAqL1xuaWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIExSVUNhY2hlLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fa2V5bWFwKTsgfTtcbn1cbmVsc2Uge1xuICAgIExSVUNhY2hlLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMuX2tleW1hcClcbiAgICAgICAgICAgIGtleXMucHVzaChrKTtcbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcbn1cbi8qKlxuICogQ2FsbCBgZnVuYCBmb3IgZWFjaCBlbnRyeS4gU3RhcnRpbmcgd2l0aCB0aGUgbmV3ZXN0IGVudHJ5IGlmIGBkZXNjYCBpcyBhIHRydWVcbiAqIHZhbHVlLCBvdGhlcndpc2Ugc3RhcnRzIHdpdGggdGhlIG9sZGVzdCAoaGVhZCkgZW5ydHkgYW5kIG1vdmVzIHRvd2FyZHMgdGhlXG4gKiB0YWlsLlxuICpcbiAqIGBmdW5gIGlzIGNhbGxlZCB3aXRoIDMgYXJndW1lbnRzIGluIHRoZSBjb250ZXh0IGBjb250ZXh0YDpcbiAqICAgYGZ1bi5jYWxsKGNvbnRleHQsIE9iamVjdCBrZXksIE9iamVjdCB2YWx1ZSwgTFJVQ2FjaGUgc2VsZilgXG4gKi9cbkxSVUNhY2hlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZ1biwgY29udGV4dCwgZGVzYykge1xuICAgIHZhciBlbnRyeTtcbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgICBkZXNjID0gdHJ1ZTtcbiAgICAgICAgY29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbnRleHQgIT09ICdvYmplY3QnKVxuICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICBpZiAoZGVzYykge1xuICAgICAgICBlbnRyeSA9IHRoaXMudGFpbDtcbiAgICAgICAgd2hpbGUgKGVudHJ5KSB7XG4gICAgICAgICAgICBmdW4uY2FsbChjb250ZXh0LCBlbnRyeS5rZXksIGVudHJ5LnZhbHVlLCB0aGlzKTtcbiAgICAgICAgICAgIGVudHJ5ID0gZW50cnkub2xkZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGVudHJ5ID0gdGhpcy5oZWFkO1xuICAgICAgICB3aGlsZSAoZW50cnkpIHtcbiAgICAgICAgICAgIGZ1bi5jYWxsKGNvbnRleHQsIGVudHJ5LmtleSwgZW50cnkudmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgZW50cnkgPSBlbnRyeS5uZXdlcjtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKiogUmV0dXJucyBhIEpTT04gKGFycmF5KSByZXByZXNlbnRhdGlvbiAqL1xuLy9MUlVDYWNoZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuLy8gICAgdmFyIHM6IElFbnRyeVtdID0gW10sIGVudHJ5ID0gdGhpcy5oZWFkO1xuLy8gICAgd2hpbGUgKGVudHJ5KSB7XG4vLyAgICAgICAgcy5wdXNoKHsga2V5OiBlbnRyeS5rZXkudG9KU09OKCksIHZhbHVlOiBlbnRyeS52YWx1ZS50b0pTT04oKSB9KTtcbi8vICAgICAgICBlbnRyeSA9IGVudHJ5Lm5ld2VyO1xuLy8gICAgfVxuLy8gICAgcmV0dXJuIHM7XG4vL307XG4vKiogUmV0dXJucyBhIFN0cmluZyByZXByZXNlbnRhdGlvbiAqL1xuTFJVQ2FjaGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzID0gJycsIGVudHJ5ID0gdGhpcy5oZWFkO1xuICAgIHdoaWxlIChlbnRyeSkge1xuICAgICAgICBzICs9IFN0cmluZyhlbnRyeS5rZXkpICsgJzonICsgZW50cnkudmFsdWU7XG4gICAgICAgIGVudHJ5ID0gZW50cnkubmV3ZXI7XG4gICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgIHMgKz0gJyA8ICc7XG4gICAgfVxuICAgIHJldHVybiBzO1xufTtcbi8vIEV4cG9ydCBvdXJzZWx2ZXNcbi8vaWYgKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JykgdGhpcy5MUlVDYWNoZSA9IExSVUNhY2hlO1xuXG52YXIgRGVmYXVsdEFwaUNhY2hlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlZmF1bHRBcGlDYWNoZShsaW1pdCkge1xuICAgICAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDA7IH1cbiAgICAgICAgdGhpcy5scnUgPSBNYWtlTFJVQ2FjaGUobGltaXQpO1xuICAgIH1cbiAgICBEZWZhdWx0QXBpQ2FjaGUucHJvdG90eXBlLmlzRXhwaXJlZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5scnUuZ2V0KGtleSwgZmFsc2UpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5leHBpcmVkSW4gIT09IDAgJiYgdmFsdWUuZXhwaXJlZEluIDwgRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVmYXVsdEFwaUNhY2hlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBjYikge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmxydS5nZXQoa2V5LCBmYWxzZSk7XG4gICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5pc0V4cGlyZWQoa2V5KSkge1xuICAgICAgICAgICAgY2IobnVsbCwgdmFsdWUuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYiAmJiBjYihudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVmYXVsdEFwaUNhY2hlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgdHRsLCBjYikge1xuICAgICAgICB0aGlzLmxydS5yZW1vdmUoa2V5KTtcbiAgICAgICAgdGhpcy5scnUucHV0KGtleSwge1xuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgICBleHBpcmVkSW46IHR0bCA/IChEYXRlLm5vdygpICsgKHR0bCAqIDEwMDApKSA6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICBjYiAmJiBjYihudWxsKTtcbiAgICB9O1xuICAgIERlZmF1bHRBcGlDYWNoZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSwgY2IpIHtcbiAgICAgICAgdGhpcy5scnUucmVtb3ZlKGtleSk7XG4gICAgICAgIGNiICYmIGNiKG51bGwpO1xuICAgIH07XG4gICAgRGVmYXVsdEFwaUNhY2hlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB0aGlzLmxydS5yZW1vdmVBbGwoKTtcbiAgICAgICAgY2IgJiYgY2IobnVsbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdEFwaUNhY2hlO1xufSgpKTtcblxuZnVuY3Rpb24gZmV0Y2hSZXF1ZXN0KHVybCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJveHlBZ2VudCkge1xuICAgICAgICBmZXRjaE9wdGlvbnMuYWdlbnQgPSBvcHRpb25zLnByb3h5QWdlbnQ7XG4gICAgfVxuICAgIC8vIGNhbid0IHVzZSBudW1iZXIgYmVjYXVzZSBvZiBOb2RlSlMgZ2xvYmFscyBpbmNsdWRlZFxuICAgIHZhciB0aW1lb3V0SWQ7XG4gICAgdmFyIGZldGNoUHJvbWlzZSA9IGNyb3NzRmV0Y2godXJsLCBmZXRjaE9wdGlvbnMpO1xuICAgIHZhciBwcm9taXNlID0gb3B0aW9ucy50aW1lb3V0SW5NcyA/IFByb21pc2UucmFjZShbXG4gICAgICAgIGZldGNoUHJvbWlzZSxcbiAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QobmV3IEVycm9yKHVybCArIFwiIHJlc3BvbnNlIHRpbWVvdXRcIikpOyB9LCBvcHRpb25zLnRpbWVvdXRJbk1zKTtcbiAgICAgICAgfSlcbiAgICBdKSA6IGZldGNoUHJvbWlzZTtcbiAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIGlmICh+fihyZXNwLnN0YXR1cyAvIDEwMCAhPT0gMikpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgKiBkcmFpbiB0aGUgcmVzcCBiZWZvcmUgdGhyb3dpbmcgYW4gZXJyb3IgdG8gcHJldmVudCBtZW1vcnkgbGVha3NcbiAgICAgICAgICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRpbm4vbm9kZS1mZXRjaC9pc3N1ZXMvODNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIHJlc3AudGV4dCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKFwiVW5leHBlY3RlZCBzdGF0dXMgY29kZSBbXCIgKyByZXNwLnN0YXR1cyArIFwiXSBvbiBVUkwgXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIGUuc3RhdHVzID0gcmVzcC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwLmpzb24oKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZUNvbnRyb2wgPSByZXNwLmhlYWRlcnMuZ2V0KCdjYWNoZS1jb250cm9sJyk7XG4gICAgICAgICAgICB2YXIgcGFyc2VkQ2FjaGVDb250cm9sID0gY2FjaGVDb250cm9sID8gL21heC1hZ2U9KFxcZCspLy5leGVjKGNhY2hlQ29udHJvbCkgOiBudWxsO1xuICAgICAgICAgICAgdmFyIHR0bCA9IHBhcnNlZENhY2hlQ29udHJvbCA/IHBhcnNlSW50KHBhcnNlZENhY2hlQ29udHJvbFsxXSwgMTApIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0LCByZXNwLCB0dGwpO1xuICAgICAgICB9KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0pO1xufVxudmFyIERlZmF1bHRSZXF1ZXN0SGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0UmVxdWVzdEhhbmRsZXIob3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIH1cbiAgICBEZWZhdWx0UmVxdWVzdEhhbmRsZXIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgICAgICBmZXRjaFJlcXVlc3QodXJsLCB0aGlzLm9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWZhdWx0UmVxdWVzdEhhbmRsZXI7XG59KCkpO1xuXG52YXIgSHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50KHJlcXVlc3RIYW5kbGVyLCBjYWNoZSwgcHJveHlBZ2VudCwgdGltZW91dEluTXMpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SGFuZGxlciA9IHJlcXVlc3RIYW5kbGVyIHx8IG5ldyBEZWZhdWx0UmVxdWVzdEhhbmRsZXIoeyBwcm94eUFnZW50OiBwcm94eUFnZW50LCB0aW1lb3V0SW5NczogdGltZW91dEluTXMgfSk7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZSB8fCBuZXcgRGVmYXVsdEFwaUNhY2hlKCk7XG4gICAgfVxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlcXVlc3RIYW5kbGVyLnJlcXVlc3QodXJsLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQsIHhociwgdHRsKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZXJyLCBudWxsLCB4aHIsIHR0bCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXN1bHQsIHhociwgdHRsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGZXRjaCBhIFVSTCBjb3JyZXNwb25kaW5nIHRvIGEgcXVlcnksIGFuZCBwYXJzZSB0aGUgcmVzcG9uc2UgYXMgYSBSZXNwb25zZSBvYmplY3RcbiAgICAgKi9cbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5jYWNoZWRSZXF1ZXN0ID0gZnVuY3Rpb24gKHVybCwgbWF5YmVPcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gbWF5YmVPcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgcnVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBvcHRpb25zLmNhY2hlS2V5IHx8IHVybDtcbiAgICAgICAgICAgIF90aGlzLmNhY2hlLmdldChjYWNoZUtleSwgZnVuY3Rpb24gKGNhY2hlR2V0RXJyb3IsIGNhY2hlR2V0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGVHZXRFcnJvciB8fCBjYWNoZUdldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKGNhY2hlR2V0RXJyb3IsIGNhY2hlR2V0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVxdWVzdCh1cmwsIGZ1bmN0aW9uIChmZXRjaEVycm9yLCBmZXRjaFZhbHVlLCBfLCB0dGxSZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZXRjaEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmV0Y2hFcnJvciwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHRsID0gdHRsUmVxIHx8IG9wdGlvbnMudHRsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0dGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2FjaGUuc2V0KGNhY2hlS2V5LCBmZXRjaFZhbHVlLCB0dGwsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZmV0Y2hWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcnVuKGZ1bmN0aW9uIChlcnIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBIdHRwQ2xpZW50O1xufSgpKTtcblxuZnVuY3Rpb24gc2VwYXJhdG9yKHVybCkge1xuICAgIHJldHVybiB1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPyc7XG59XG52YXIgQXBpID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwaSh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBhY2Nlc3NUb2tlblBhcmFtID0gXCJhY2Nlc3NfdG9rZW49XCIgKyB0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICB0aGlzLnVybCArPSBzZXBhcmF0b3IodXJsKSArIGFjY2Vzc1Rva2VuUGFyYW07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb3V0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMudXJsICs9IHNlcGFyYXRvcih1cmwpICsgKFwicm91dGVzPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9ucy5yb3V0ZXMpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGlEYXRhVFRMID0gdGhpcy5vcHRpb25zLmFwaURhdGFUVEwgfHwgNTtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gbmV3IEh0dHBDbGllbnQodGhpcy5vcHRpb25zLnJlcXVlc3RIYW5kbGVyLCB0aGlzLm9wdGlvbnMuYXBpQ2FjaGUsIHRoaXMub3B0aW9ucy5wcm94eUFnZW50LCB0aGlzLm9wdGlvbnMudGltZW91dEluTXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIGRhdGEgdXNlZCB0byBjb25zdHJ1Y3QgdGhlIGFwaSBjbGllbnQsIGZyb20gY2FjaGUgaWYgaXQnc1xuICAgICAqIHByZXNlbnQsIG90aGVyd2lzZSBmcm9tIGNhbGxpbmcgdGhlIHByaXNtaWMgYXBpIGVuZHBvaW50ICh3aGljaCBpc1xuICAgICAqIHRoZW4gY2FjaGVkKS5cbiAgICAgKi9cbiAgICBBcGkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmNhY2hlZFJlcXVlc3QodGhpcy51cmwsIHsgdHRsOiB0aGlzLmFwaURhdGFUVEwgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmVkQXBpID0gbmV3IFJlc29sdmVkQXBpKGRhdGEsIF90aGlzLmh0dHBDbGllbnQsIF90aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgcmVzb2x2ZWRBcGkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVkQXBpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNiICYmIGNiKGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBcGk7XG59KCkpO1xuXG52YXIgRGVmYXVsdENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZhdWx0Q2xpZW50KHVybCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmFwaSA9IG5ldyBBcGkodXJsLCBvcHRpb25zKTtcbiAgICB9XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUuZ2V0QXBpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KCk7XG4gICAgfTtcbiAgICBEZWZhdWx0Q2xpZW50LnByb3RvdHlwZS5ldmVyeXRoaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtKCdldmVyeXRoaW5nJyk7XG4gICAgfTtcbiAgICBEZWZhdWx0Q2xpZW50LnByb3RvdHlwZS5mb3JtID0gZnVuY3Rpb24gKGZvcm1JZCkge1xuICAgICAgICByZXR1cm4gbmV3IExhenlTZWFyY2hGb3JtKGZvcm1JZCwgdGhpcy5hcGkpO1xuICAgIH07XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocSwgb3B0aW9uc09yQ2FsbGJhY2ssIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkgeyByZXR1cm4gYXBpLnF1ZXJ5KHEsIG9wdGlvbnNPckNhbGxiYWNrLCBjYik7IH0pO1xuICAgIH07XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUucXVlcnlGaXJzdCA9IGZ1bmN0aW9uIChxLCBvcHRpb25zT3JDYWxsYmFjaywgY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkudGhlbihmdW5jdGlvbiAoYXBpKSB7IHJldHVybiBhcGkucXVlcnlGaXJzdChxLCBvcHRpb25zT3JDYWxsYmFjaywgY2IpOyB9KTtcbiAgICB9O1xuICAgIERlZmF1bHRDbGllbnQucHJvdG90eXBlLmdldEJ5SUQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkgeyByZXR1cm4gYXBpLmdldEJ5SUQoaWQsIG9wdGlvbnMsIGNiKTsgfSk7XG4gICAgfTtcbiAgICBEZWZhdWx0Q2xpZW50LnByb3RvdHlwZS5nZXRCeUlEcyA9IGZ1bmN0aW9uIChpZHMsIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkgeyByZXR1cm4gYXBpLmdldEJ5SURzKGlkcywgb3B0aW9ucywgY2IpOyB9KTtcbiAgICB9O1xuICAgIERlZmF1bHRDbGllbnQucHJvdG90eXBlLmdldEJ5VUlEID0gZnVuY3Rpb24gKHR5cGUsIHVpZCwgb3B0aW9ucywgY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkudGhlbihmdW5jdGlvbiAoYXBpKSB7IHJldHVybiBhcGkuZ2V0QnlVSUQodHlwZSwgdWlkLCBvcHRpb25zLCBjYik7IH0pO1xuICAgIH07XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUuZ2V0U2luZ2xlID0gZnVuY3Rpb24gKHR5cGUsIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkgeyByZXR1cm4gYXBpLmdldFNpbmdsZSh0eXBlLCBvcHRpb25zLCBjYik7IH0pO1xuICAgIH07XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUuZ2V0Qm9va21hcmsgPSBmdW5jdGlvbiAoYm9va21hcmssIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkgeyByZXR1cm4gYXBpLmdldEJvb2ttYXJrKGJvb2ttYXJrLCBvcHRpb25zLCBjYik7IH0pO1xuICAgIH07XG4gICAgRGVmYXVsdENsaWVudC5wcm90b3R5cGUucHJldmlld1Nlc3Npb24gPSBmdW5jdGlvbiAodG9rZW4sIGxpbmtSZXNvbHZlciwgZGVmYXVsdFVybCwgY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXBpKCkudGhlbihmdW5jdGlvbiAoYXBpKSB7IHJldHVybiBhcGkucHJldmlld1Nlc3Npb24odG9rZW4sIGxpbmtSZXNvbHZlciwgZGVmYXVsdFVybCwgY2IpOyB9KTtcbiAgICB9O1xuICAgIERlZmF1bHRDbGllbnQucHJvdG90eXBlLmdldFByZXZpZXdSZXNvbHZlciA9IGZ1bmN0aW9uICh0b2tlbiwgZG9jdW1lbnRJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZ2V0RG9jQnlJZCA9IGZ1bmN0aW9uIChkb2N1bWVudElkLCBtYXliZU9wdGlvbnMpIHsgcmV0dXJuIF90aGlzLmdldEFwaSgpLnRoZW4oZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgICAgcmV0dXJuIGFwaS5nZXRCeUlEKGRvY3VtZW50SWQsIG1heWJlT3B0aW9ucyk7XG4gICAgICAgIH0pOyB9O1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJldmlld1Jlc29sdmVyKHRva2VuLCBkb2N1bWVudElkLCBnZXREb2NCeUlkKTtcbiAgICB9O1xuICAgIERlZmF1bHRDbGllbnQuZ2V0QXBpID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgYXBpID0gbmV3IEFwaSh1cmwsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gYXBpLmdldCgpO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmF1bHRDbGllbnQ7XG59KCkpO1xuXG52YXIgaW5kZXggPSB7XG4gICAgZXhwZXJpbWVudENvb2tpZTogRVhQRVJJTUVOVF9DT09LSUUsXG4gICAgcHJldmlld0Nvb2tpZTogUFJFVklFV19DT09LSUUsXG4gICAgUHJlZGljYXRlczogUHJlZGljYXRlcyxcbiAgICBFeHBlcmltZW50czogRXhwZXJpbWVudHMsXG4gICAgQXBpOiBBcGksXG4gICAgY2xpZW50OiBjbGllbnQsXG4gICAgZ2V0QXBpOiBnZXRBcGksXG4gICAgYXBpOiBhcGksXG59O1xuZnVuY3Rpb24gY2xpZW50KHVybCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgRGVmYXVsdENsaWVudCh1cmwsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gZ2V0QXBpKHVybCwgb3B0aW9ucykge1xuICAgIHJldHVybiBEZWZhdWx0Q2xpZW50LmdldEFwaSh1cmwsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gYXBpKHVybCwgb3B0aW9ucykge1xuICAgIHJldHVybiBnZXRBcGkodXJsLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmlzbWljLWphdmFzY3JpcHQubWpzLm1hcFxuIiwiaW1wb3J0IFByaXNtaWMgZnJvbSAncHJpc21pYy1qYXZhc2NyaXB0J1xuXG5leHBvcnQgY29uc3QgYXBpRW5kcG9pbnQgPSBcImh0dHBzOi8vaW13ZC5jZG4ucHJpc21pYy5pby9hcGkvdjJcIlxuZXhwb3J0IGNvbnN0IENsaWVudCA9IFByaXNtaWMuY2xpZW50KGFwaUVuZHBvaW50KTtcblxuZXhwb3J0IGNvbnN0IGxpbmtSZXNvbHZlciA9IChkb2MpID0+IHtcbiAgICBpZiAoZG9jLnR5cGUgPT09ICdjb250ZW50JykgcmV0dXJuICcvJztcbiAgICByZXR1cm4gJy8nO1xufTtcbiIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwiUHJpc21pY0RPTVwiLFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuUHJpc21pY0RPTT10KCk6ZS5QcmlzbWljRE9NPXQoKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLChmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKHIpe2lmKHRbcl0pcmV0dXJuIHRbcl0uZXhwb3J0czt2YXIgbz10W3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxuKSxvLmw9ITAsby5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LHIpe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPW4oZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBvIGluIGUpbi5kKHIsbyxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLG8pKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiBuLmQodCxcImFcIix0KSx0fSxuLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LG4ucD1cIlwiLG4obi5zPTEpfShbZnVuY3Rpb24oZSx0LG4pe1widW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLGUuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKHIpe2lmKHRbcl0pcmV0dXJuIHRbcl0uZXhwb3J0czt2YXIgbz10W3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxuKSxvLmw9ITAsby5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LHIpe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPW4oZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBvIGluIGUpbi5kKHIsbyxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLG8pKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiBuLmQodCxcImFcIix0KSx0fSxuLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LG4ucD1cIlwiLG4obi5zPTApfShbZnVuY3Rpb24oZSx0LG4pe2UuZXhwb3J0cz1uKDEpfSxmdW5jdGlvbihlLHQsbil7dmFyIHI9bigyKSxvPW4oMyk7ZS5leHBvcnRzPXtMaW5rOnIsRGF0ZTpvfX0sZnVuY3Rpb24oZSx0LG4pe2UuZXhwb3J0cz17dXJsOmZ1bmN0aW9uKGUsdCl7aWYoZSYmW2UubGlua190eXBlLGUuX2xpbmtUeXBlLGUubGlua1R5cGVdLnNvbWUoKGZ1bmN0aW9uKGUpe3JldHVybiBlJiZbXCJEb2N1bWVudFwiLFwiTGluay5Eb2N1bWVudFwiLFwiTGluay5kb2N1bWVudFwiXS5pbmNsdWRlcyhlKX0pKSYmdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgdCl7dmFyIG49dChlKTtpZihuKXJldHVybiBufXJldHVybiBlJiZlLnVybD9lLnVybDpcIlwifX19LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe2lmKCFlKXJldHVybiBudWxsO3ZhciB0PTI0PT1lLmxlbmd0aD9cIlwiLmNvbmNhdChlLnN1YnN0cmluZygwLDIyKSxcIjpcIikuY29uY2F0KGUuc3Vic3RyaW5nKDIyLDI0KSk6ZTtyZXR1cm4gbmV3IERhdGUodCl9fV0pfSxmdW5jdGlvbihlLHQsbil7ZS5leHBvcnRzPW4oMil9LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDApLG89bigzKSxpPXIuRGF0ZSx1PXIuTGluaztlLmV4cG9ydHM9e0RhdGU6aSxMaW5rOnUsUmljaFRleHQ6b319LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDQpLG89bigwKS5MaW5rLGk9big1KSx1PXIuRWxlbWVudHM7ZnVuY3Rpb24gYyhlLHQsbixyLGMpe3N3aXRjaCh0KXtjYXNlIHUuaGVhZGluZzE6cmV0dXJuIGwoXCJoMVwiLG4sYyk7Y2FzZSB1LmhlYWRpbmcyOnJldHVybiBsKFwiaDJcIixuLGMpO2Nhc2UgdS5oZWFkaW5nMzpyZXR1cm4gbChcImgzXCIsbixjKTtjYXNlIHUuaGVhZGluZzQ6cmV0dXJuIGwoXCJoNFwiLG4sYyk7Y2FzZSB1LmhlYWRpbmc1OnJldHVybiBsKFwiaDVcIixuLGMpO2Nhc2UgdS5oZWFkaW5nNjpyZXR1cm4gbChcImg2XCIsbixjKTtjYXNlIHUucGFyYWdyYXBoOnJldHVybiBsKFwicFwiLG4sYyk7Y2FzZSB1LnByZWZvcm1hdHRlZDpyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuXCI8cHJlXCIuY29uY2F0KGEoZSksXCI+XCIpLmNvbmNhdChpKGUudGV4dCksXCI8L3ByZT5cIil9KG4pO2Nhc2UgdS5zdHJvbmc6cmV0dXJuIGwoXCJzdHJvbmdcIixuLGMpO2Nhc2UgdS5lbTpyZXR1cm4gbChcImVtXCIsbixjKTtjYXNlIHUubGlzdEl0ZW06Y2FzZSB1Lm9MaXN0SXRlbTpyZXR1cm4gbChcImxpXCIsbixjKTtjYXNlIHUubGlzdDpyZXR1cm4gbChcInVsXCIsbixjKTtjYXNlIHUub0xpc3Q6cmV0dXJuIGwoXCJvbFwiLG4sYyk7Y2FzZSB1LmltYWdlOnJldHVybiBmdW5jdGlvbihlLHQpe3ZhciBuPXQubGlua1RvP28udXJsKHQubGlua1RvLGUpOm51bGwscj10LmxpbmtUbyYmdC5saW5rVG8udGFyZ2V0Pyd0YXJnZXQ9XCInLmNvbmNhdCh0LmxpbmtUby50YXJnZXQsJ1wiIHJlbD1cIm5vb3BlbmVyXCInKTpcIlwiLGk9W3QubGFiZWx8fFwiXCIsXCJibG9jay1pbWdcIl0sdT0nPGltZyBzcmM9XCInLmNvbmNhdCh0LnVybCwnXCIgYWx0PVwiJykuY29uY2F0KHQuYWx0fHxcIlwiLCdcIiBjb3B5cmlnaHQ9XCInKS5jb25jYXQodC5jb3B5cmlnaHR8fFwiXCIsJ1wiPicpO3JldHVybidcXG4gICAgPHAgY2xhc3M9XCInLmNvbmNhdChpLmpvaW4oXCIgXCIpLCdcIj5cXG4gICAgICAnKS5jb25jYXQobj9cIjxhIFwiLmNvbmNhdChyLCcgaHJlZj1cIicpLmNvbmNhdChuLCdcIj4nKS5jb25jYXQodSxcIjwvYT5cIik6dSxcIlxcbiAgICA8L3A+XFxuICBcIil9KGUsbik7Y2FzZSB1LmVtYmVkOnJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4nXFxuICAgIDxkaXYgZGF0YS1vZW1iZWQ9XCInLmNvbmNhdChlLm9lbWJlZC5lbWJlZF91cmwsJ1wiXFxuICAgICAgZGF0YS1vZW1iZWQtdHlwZT1cIicpLmNvbmNhdChlLm9lbWJlZC50eXBlLCdcIlxcbiAgICAgIGRhdGEtb2VtYmVkLXByb3ZpZGVyPVwiJykuY29uY2F0KGUub2VtYmVkLnByb3ZpZGVyX25hbWUsJ1wiXFxuICAgICAgJykuY29uY2F0KGEoZSksXCI+XFxuICAgICAgICAgIFxcbiAgICAgIFwiKS5jb25jYXQoZS5vZW1iZWQuaHRtbCxcIlxcbiAgICA8L2Rpdj5cXG4gIFwiKX0obik7Y2FzZSB1Lmh5cGVybGluazpyZXR1cm4gZnVuY3Rpb24oZSx0LG4pe3ZhciByPXQuZGF0YS50YXJnZXQ/J3RhcmdldD1cIicuY29uY2F0KHQuZGF0YS50YXJnZXQsJ1wiIHJlbD1cIm5vb3BlbmVyXCInKTpcIlwiO3JldHVyblwiPGEgXCIuY29uY2F0KHIsJyBocmVmPVwiJykuY29uY2F0KG8udXJsKHQuZGF0YSxlKSwnXCI+JykuY29uY2F0KG4uam9pbihcIlwiKSxcIjwvYT5cIil9KGUsbixjKTtjYXNlIHUubGFiZWw6cmV0dXJuIGZ1bmN0aW9uKGUsdCl7cmV0dXJuXCI8c3BhbiBcIi5jb25jYXQoYShlLmRhdGEpLFwiPlwiKS5jb25jYXQodC5qb2luKFwiXCIpLFwiPC9zcGFuPlwiKX0obixjKTtjYXNlIHUuc3BhbjpyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGU/aShlKS5yZXBsYWNlKC9cXG4vZyxcIjxiciAvPlwiKTpcIlwifShyKTtkZWZhdWx0OnJldHVyblwiXCJ9fWZ1bmN0aW9uIGEoZSl7cmV0dXJuIGUubGFiZWw/JyBjbGFzcz1cIicuY29uY2F0KGUubGFiZWwsJ1wiJyk6XCJcIn1mdW5jdGlvbiBsKGUsdCxuKXtyZXR1cm5cIjxcIi5jb25jYXQoZSkuY29uY2F0KGEodCksXCI+XCIpLmNvbmNhdChuLmpvaW4oXCJcIiksXCI8L1wiKS5jb25jYXQoZSxcIj5cIil9ZS5leHBvcnRzPXthc1RleHQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gci5hc1RleHQoZSx0KX0sYXNIdG1sOmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gci5zZXJpYWxpemUoZSxjLmJpbmQobnVsbCx0KSxuKS5qb2luKFwiXCIpfSxFbGVtZW50czp1fX0sZnVuY3Rpb24oZSx0LG4pe1widW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLGUuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKHIpe2lmKHRbcl0pcmV0dXJuIHRbcl0uZXhwb3J0czt2YXIgbz10W3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxuKSxvLmw9ITAsby5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LHIpe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPW4oZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBvIGluIGUpbi5kKHIsbyxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLG8pKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiBuLmQodCxcImFcIix0KSx0fSxuLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LG4ucD1cIlwiLG4obi5zPTkpfShbZnVuY3Rpb24oZSx0LG4pe3ZhciByPW4oMyk7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbiB0KG4pe3JldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aHx8cihuKT90OmUuYXBwbHkodGhpcyxhcmd1bWVudHMpfX19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDApLG89bigzKTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uIHQobixpKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiB0O2Nhc2UgMTpyZXR1cm4gbyhuKT90OnIoKGZ1bmN0aW9uKHQpe3JldHVybiBlKG4sdCl9KSk7ZGVmYXVsdDpyZXR1cm4gbyhuKSYmbyhpKT90Om8obik/cigoZnVuY3Rpb24odCl7cmV0dXJuIGUodCxpKX0pKTpvKGkpP3IoKGZ1bmN0aW9uKHQpe3JldHVybiBlKG4sdCl9KSk6ZShuLGkpfX19fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI7ZnVuY3Rpb24gbyhlLHQsbil7cmV0dXJuIHQgaW4gZT9PYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6ZVt0XT1uLGV9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5QUklPUklUSUVTPXQuTk9ERV9UWVBFUz12b2lkIDA7dmFyIGk9e2hlYWRpbmcxOlwiaGVhZGluZzFcIixoZWFkaW5nMjpcImhlYWRpbmcyXCIsaGVhZGluZzM6XCJoZWFkaW5nM1wiLGhlYWRpbmc0OlwiaGVhZGluZzRcIixoZWFkaW5nNTpcImhlYWRpbmc1XCIsaGVhZGluZzY6XCJoZWFkaW5nNlwiLHBhcmFncmFwaDpcInBhcmFncmFwaFwiLHByZWZvcm1hdHRlZDpcInByZWZvcm1hdHRlZFwiLHN0cm9uZzpcInN0cm9uZ1wiLGVtOlwiZW1cIixsaXN0SXRlbTpcImxpc3QtaXRlbVwiLG9MaXN0SXRlbTpcIm8tbGlzdC1pdGVtXCIsbGlzdDpcImdyb3VwLWxpc3QtaXRlbVwiLG9MaXN0OlwiZ3JvdXAtby1saXN0LWl0ZW1cIixpbWFnZTpcImltYWdlXCIsZW1iZWQ6XCJlbWJlZFwiLGh5cGVybGluazpcImh5cGVybGlua1wiLGxhYmVsOlwibGFiZWxcIixzcGFuOlwic3BhblwifTt0Lk5PREVfVFlQRVM9aTt2YXIgdT0obyhyPXt9LGkuaGVhZGluZzEsNCksbyhyLGkuaGVhZGluZzIsNCksbyhyLGkuaGVhZGluZzMsNCksbyhyLGkuaGVhZGluZzQsNCksbyhyLGkuaGVhZGluZzUsNCksbyhyLGkuaGVhZGluZzYsNCksbyhyLGkucGFyYWdyYXBoLDMpLG8ocixpLnByZWZvcm1hdHRlZCw1KSxvKHIsaS5zdHJvbmcsNiksbyhyLGkuZW0sNiksbyhyLGkub0xpc3QsMSksbyhyLGkubGlzdCwxKSxvKHIsaS5saXN0SXRlbSwxKSxvKHIsaS5vTGlzdEl0ZW0sMSksbyhyLGkuaW1hZ2UsMSksbyhyLGkuZW1iZWQsMSksbyhyLGkuaHlwZXJsaW5rLDMpLG8ocixpLmxhYmVsLDQpLG8ocixpLnNwYW4sNykscik7dC5QUklPUklUSUVTPXV9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmITA9PT1lW1wiQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyXCJdfX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD12b2lkIDA7dmFyIHI9ZChuKDEyKSksbz1kKG4oMTUpKSxpPWQobigxNikpLHU9ZChuKDE3KSksYz1kKG4oMjEpKSxhPWQobig3KSksbD1uKDIzKSxmPW4oMikscz1uKDgpO2Z1bmN0aW9uIGQoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIHAoZSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsci5rZXkscil9fWZ1bmN0aW9uIGgoZSl7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQucmVkdWNlKChmdW5jdGlvbihlLHQpe3ZhciBuPSgwLGMuZGVmYXVsdCkoZSk7aWYobil7aWYobi5zb21lKChmdW5jdGlvbihlKXtyZXR1cm4gZS5pc1BhcmVudE9mKHQpfSkpKXJldHVybigwLHUuZGVmYXVsdCkoZSkuY29uY2F0KFtuLmNvbmNhdCh0KV0pO3ZhciByPSgwLGMuZGVmYXVsdCkobik7cmV0dXJuIHImJmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuZW5kPj10LnN0YXJ0fShyLHQpPygwLHUuZGVmYXVsdCkoZSkuY29uY2F0KFtuLmNvbmNhdCh0KV0pOmUuY29uY2F0KFtbdF1dKX1yZXR1cm5bW3RdXX0pLFtdKX0oMCwoMCxpLmRlZmF1bHQpKFtmdW5jdGlvbihlLHQpe3JldHVybiBlLnN0YXJ0LXQuc3RhcnR9LGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuZW5kLXQuZW5kfV0sZSkpfWZ1bmN0aW9uIHkoZSl7aWYoMD09PWUubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBlbGVjdCBub2RlIG9uIGVtcHR5IGxpc3RcIik7dmFyIHQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGV9KGUpfHxmdW5jdGlvbihlKXtpZihTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpfHxcIltvYmplY3QgQXJndW1lbnRzXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiBBcnJheS5mcm9tKGUpfShlKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKX0oKX0oZS5zb3J0KChmdW5jdGlvbihlLHQpe2lmKGUuaXNQYXJlbnRPZih0KSlyZXR1cm4tMTtpZih0LmlzUGFyZW50T2YoZSkpcmV0dXJuIDE7dmFyIG49Zi5QUklPUklUSUVTW2UudHlwZV0tZi5QUklPUklUSUVTW3QudHlwZV07cmV0dXJuIDA9PT1uP2UudGV4dC5sZW5ndGgtdC50ZXh0Lmxlbmd0aDpufSkpKTtyZXR1cm57ZWxlY3RlZDp0WzBdLG90aGVyczp0LnNsaWNlKDEpfX1mdW5jdGlvbiB2KGUsdCxuKXtpZih0Lmxlbmd0aD4wKXJldHVybiBmdW5jdGlvbihlLHQsbil7cmV0dXJuIHQucmVkdWNlKChmdW5jdGlvbihyLG8saSl7dmFyIHU9W10sYz0wPT09aSYmby5zdGFydD5uLmxvd2VyLGE9aT09PXQubGVuZ3RoLTEmJm4udXBwZXI+by5lbmQ7aWYoYyl7dmFyIGw9bmV3IHMuVGV4dE5vZGUobi5sb3dlcixvLnN0YXJ0LGUuc2xpY2Uobi5sb3dlcixvLnN0YXJ0KSk7dT11LmNvbmNhdChsKX1lbHNle3ZhciBmPXRbaS0xXTtpZihmJiZvLnN0YXJ0PmYuZW5kKXt2YXIgZD1lLnNsaWNlKGYuZW5kLG8uc3RhcnQpLHA9bmV3IHMuVGV4dE5vZGUoZi5lbmQsby5zdGFydCxkKTt1PXUuY29uY2F0KHApfX1pZih1PXUuY29uY2F0KG8pLGEpe3ZhciBoPW5ldyBzLlRleHROb2RlKG8uZW5kLG4udXBwZXIsZS5zbGljZShvLmVuZCxuLnVwcGVyKSk7dT11LmNvbmNhdChoKX1yZXR1cm4gci5jb25jYXQodSl9KSxbXSl9KGUsbShlLHQpLG4pO3ZhciByPWUuc2xpY2Uobi5sb3dlcixuLnVwcGVyKTtyZXR1cm5bbmV3IHMuVGV4dE5vZGUobi5sb3dlcixuLnVwcGVyLHIpXX1mdW5jdGlvbiBtKGUsdCl7dmFyIG49aCgoMCxvLmRlZmF1bHQpKChmdW5jdGlvbihlKXtyZXR1cm4gZS5zdGFydH0pLHQpKS5tYXAoeSksaT0oMCxyLmRlZmF1bHQpKG4ubWFwKChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgbj10Lm90aGVycy5yZWR1Y2UoKGZ1bmN0aW9uKG4scil7dmFyIG89bi5pbm5lcixpPW4ub3V0ZXIsdT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIG4uc3RhcnQ8dC5zdGFydD97aW5uZXI6cy5TcGFuTm9kZS5zbGljZShuLHQuc3RhcnQsbi5lbmQsZSksb3V0ZXI6cy5TcGFuTm9kZS5zbGljZShuLG4uc3RhcnQsdC5zdGFydCxlKX06bi5lbmQ+dC5lbmQ/e2lubmVyOnMuU3Bhbk5vZGUuc2xpY2UobixuLnN0YXJ0LHQuZW5kLGUpLG91dGVyOnMuU3Bhbk5vZGUuc2xpY2Uobix0LmVuZCxuLmVuZCxlKX06e2lubmVyOm59fShlLHQuZWxlY3RlZCxyKTtyZXR1cm57aW5uZXI6by5jb25jYXQodS5pbm5lciksb3V0ZXI6dS5vdXRlcj9pLmNvbmNhdCh1Lm91dGVyKTppfX0pLHtpbm5lcjpbXSxvdXRlcjpbXX0pLHI9bi5pbm5lcixvPW4ub3V0ZXI7cmV0dXJuW3QuZWxlY3RlZC5zZXRDaGlsZHJlbih2KGUscix0LmVsZWN0ZWQuYm91bmRhcmllcygpKSldLmNvbmNhdChtKGUsbykpfShlLHQpfSkpKTtyZXR1cm4oMCxvLmRlZmF1bHQpKChmdW5jdGlvbihlKXtyZXR1cm4gZS5zdGFydH0pLGkpfXZhciBiPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpeyFmdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSl9dmFyIHQsbjtyZXR1cm4gdD1lLChuPVt7a2V5OlwiZnJvbVJpY2hUZXh0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJue2tleTooMCxhLmRlZmF1bHQpKCksY2hpbGRyZW46ZS5yZWR1Y2UoKGZ1bmN0aW9uKGUsdCxuKXtpZihsLlJpY2hUZXh0QmxvY2suaXNFbWJlZEJsb2NrKHQudHlwZSl8fGwuUmljaFRleHRCbG9jay5pc0ltYWdlQmxvY2sodC50eXBlKSlyZXR1cm4gZS5jb25jYXQobmV3IHMuQmxvY2tOb2RlKHQudHlwZSx0KSk7dmFyIHI9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zcGFucy5tYXAoKGZ1bmN0aW9uKHQpe3ZhciBuPWUudGV4dC5zbGljZSh0LnN0YXJ0LHQuZW5kKTtyZXR1cm4gbmV3IHMuU3Bhbk5vZGUodC5zdGFydCx0LmVuZCx0LnR5cGUsbixbXSx0KX0pKSxuPXtsb3dlcjowLHVwcGVyOmUudGV4dC5sZW5ndGh9O3JldHVybiB2KGUudGV4dCx0LG4pfSh0KSxvPWVbZS5sZW5ndGgtMV07aWYobC5SaWNoVGV4dEJsb2NrLmlzTGlzdEl0ZW0odC50eXBlKSYmbyYmbyBpbnN0YW5jZW9mIHMuTGlzdEJsb2NrTm9kZSl7dmFyIGk9bmV3IHMuTGlzdEl0ZW1CbG9ja05vZGUodCxyKSxjPW8uYWRkQ2hpbGQoaSk7cmV0dXJuKDAsdS5kZWZhdWx0KShlKS5jb25jYXQoYyl9aWYobC5SaWNoVGV4dEJsb2NrLmlzT3JkZXJlZExpc3RJdGVtKHQudHlwZSkmJm8mJm8gaW5zdGFuY2VvZiBzLk9yZGVyZWRMaXN0QmxvY2tOb2RlKXt2YXIgYT1uZXcgcy5PcmRlcmVkTGlzdEl0ZW1CbG9ja05vZGUodCxyKSxmPW8uYWRkQ2hpbGQoYSk7cmV0dXJuKDAsdS5kZWZhdWx0KShlKS5jb25jYXQoZil9aWYobC5SaWNoVGV4dEJsb2NrLmlzTGlzdEl0ZW0odC50eXBlKSl7dmFyIGQ9bmV3IHMuTGlzdEl0ZW1CbG9ja05vZGUodCxyKSxwPW5ldyBzLkxpc3RCbG9ja05vZGUobC5SaWNoVGV4dEJsb2NrLmVtcHR5TGlzdCgpLFtkXSk7cmV0dXJuIGUuY29uY2F0KHApfWlmKGwuUmljaFRleHRCbG9jay5pc09yZGVyZWRMaXN0SXRlbSh0LnR5cGUpKXt2YXIgaD1uZXcgcy5PcmRlcmVkTGlzdEl0ZW1CbG9ja05vZGUodCxyKSx5PW5ldyBzLk9yZGVyZWRMaXN0QmxvY2tOb2RlKGwuUmljaFRleHRCbG9jay5lbXB0eU9yZGVyZWRMaXN0KCksW2hdKTtyZXR1cm4gZS5jb25jYXQoeSl9cmV0dXJuIGUuY29uY2F0KG5ldyBzLkJsb2NrTm9kZSh0LnR5cGUsdCxyKSl9KSxbXSl9fX1dKSYmcCh0LG4pLGV9KCk7dC5kZWZhdWx0PWJ9LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lJiZlLmxlbmd0aD49MCYmXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfX0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IFN0cmluZ11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX19LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmRlZmF1bHQ9ZnVuY3Rpb24oKXt2YXIgZT0obmV3IERhdGUpLmdldFRpbWUoKTtyZXR1cm5cInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiLnJlcGxhY2UoL1t4eV0vZywoZnVuY3Rpb24odCl7dmFyIG49KGUrMTYqTWF0aC5yYW5kb20oKSklMTZ8MDtyZXR1cm4gZT1NYXRoLmZsb29yKGUvMTYpLChcInhcIj09dD9uOjMmbnw4KS50b1N0cmluZygxNil9KSl9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5MaXN0QmxvY2tOb2RlPXQuT3JkZXJlZExpc3RCbG9ja05vZGU9dC5PcmRlcmVkTGlzdEl0ZW1CbG9ja05vZGU9dC5MaXN0SXRlbUJsb2NrTm9kZT10LkJsb2NrTm9kZT10LlRleHROb2RlPXQuU3Bhbk5vZGU9dC5Ob2RlPXZvaWQgMDt2YXIgcixvPShyPW4oNykpJiZyLl9fZXNNb2R1bGU/cjp7ZGVmYXVsdDpyfSxpPW4oMik7ZnVuY3Rpb24gdShlKXtyZXR1cm4odT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSkoZSl9ZnVuY3Rpb24gYyhlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19ZnVuY3Rpb24gYShlLHQsbil7cmV0dXJuIHQmJmMoZS5wcm90b3R5cGUsdCksbiYmYyhlLG4pLGV9ZnVuY3Rpb24gbChlLHQpe3JldHVybiF0fHxcIm9iamVjdFwiIT09dSh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdD9mdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lKXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4gZX0oZSk6dH1mdW5jdGlvbiBmKGUpe3JldHVybihmPU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3QuZ2V0UHJvdG90eXBlT2Y6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YoZSl9KShlKX1mdW5jdGlvbiBzKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCYmbnVsbCE9PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodCYmdC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSx0JiZmdW5jdGlvbihlLHQpeyhPYmplY3Quc2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuX19wcm90b19fPXQsZX0pKGUsdCl9KGUsdCl9ZnVuY3Rpb24gZChlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIHA9ZnVuY3Rpb24gZSh0LG4scil7ZCh0aGlzLGUpLHRoaXMua2V5PSgwLG8uZGVmYXVsdCkoKSx0aGlzLnR5cGU9dCx0aGlzLmVsZW1lbnQ9bix0aGlzLmNoaWxkcmVuPXJ9O3QuTm9kZT1wO3ZhciBoPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSxuLHIsbyxpLHUpe3ZhciBjO3JldHVybiBkKHRoaXMsdCksKGM9bCh0aGlzLGYodCkuY2FsbCh0aGlzLHIsdSxpKSkpLnN0YXJ0PWUsYy5lbmQ9bixjLnRleHQ9byxjLmNoaWxkcmVuPWksY31yZXR1cm4gcyh0LHApLGEodCxbe2tleTpcImJvdW5kYXJpZXNcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybntsb3dlcjp0aGlzLnN0YXJ0LHVwcGVyOnRoaXMuZW5kfX19LHtrZXk6XCJpc1BhcmVudE9mXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuc3RhcnQ8PWUuc3RhcnQmJnRoaXMuZW5kPj1lLmVuZH19LHtrZXk6XCJzZXRDaGlsZHJlblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgdCh0aGlzLnN0YXJ0LHRoaXMuZW5kLHRoaXMudHlwZSx0aGlzLnRleHQsZSx0aGlzLmVsZW1lbnQpfX1dLFt7a2V5Olwic2xpY2VcIix2YWx1ZTpmdW5jdGlvbihlLG4scixvKXtyZXR1cm4gbmV3IHQobixyLGUudHlwZSxvLnNsaWNlKG4sciksZS5jaGlsZHJlbixlLmVsZW1lbnQpfX1dKSx0fSgpO3QuU3Bhbk5vZGU9aDt2YXIgeT1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUsbixyKXtkKHRoaXMsdCk7dmFyIG89e3R5cGU6aS5OT0RFX1RZUEVTLnNwYW4sc3RhcnQ6ZSxlbmQ6bix0ZXh0OnJ9O3JldHVybiBsKHRoaXMsZih0KS5jYWxsKHRoaXMsZSxuLGkuTk9ERV9UWVBFUy5zcGFuLHIsW10sbykpfXJldHVybiBzKHQsaCksdH0oKTt0LlRleHROb2RlPXk7dmFyIHY9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlLG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpbXTtyZXR1cm4gZCh0aGlzLHQpLGwodGhpcyxmKHQpLmNhbGwodGhpcyxlLG4scikpfXJldHVybiBzKHQscCksdH0oKTt0LkJsb2NrTm9kZT12O3ZhciBtPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSxuKXtyZXR1cm4gZCh0aGlzLHQpLGwodGhpcyxmKHQpLmNhbGwodGhpcyxpLk5PREVfVFlQRVMubGlzdEl0ZW0sZSxuKSl9cmV0dXJuIHModCx2KSx0fSgpO3QuTGlzdEl0ZW1CbG9ja05vZGU9bTt2YXIgYj1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUsbil7cmV0dXJuIGQodGhpcyx0KSxsKHRoaXMsZih0KS5jYWxsKHRoaXMsaS5OT0RFX1RZUEVTLm9MaXN0SXRlbSxlLG4pKX1yZXR1cm4gcyh0LHYpLHR9KCk7dC5PcmRlcmVkTGlzdEl0ZW1CbG9ja05vZGU9Yjt2YXIgZz1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUsbil7cmV0dXJuIGQodGhpcyx0KSxsKHRoaXMsZih0KS5jYWxsKHRoaXMsaS5OT0RFX1RZUEVTLm9MaXN0LGUsbikpfXJldHVybiBzKHQsdiksYSh0LFt7a2V5OlwiYWRkQ2hpbGRcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgbj10aGlzLmNoaWxkcmVuLmNvbmNhdChlKTtyZXR1cm4gbmV3IHQodGhpcy5lbGVtZW50LG4pfX1dKSx0fSgpO3QuT3JkZXJlZExpc3RCbG9ja05vZGU9Zzt2YXIgeD1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUsbil7cmV0dXJuIGQodGhpcyx0KSxsKHRoaXMsZih0KS5jYWxsKHRoaXMsaS5OT0RFX1RZUEVTLmxpc3QsZSxuKSl9cmV0dXJuIHModCx2KSxhKHQsW3trZXk6XCJhZGRDaGlsZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXMuY2hpbGRyZW4uY29uY2F0KGUpO3JldHVybiBuZXcgdCh0aGlzLmVsZW1lbnQsbil9fV0pLHR9KCk7dC5MaXN0QmxvY2tOb2RlPXh9LGZ1bmN0aW9uKGUsdCxuKXtlLmV4cG9ydHM9bigxMCl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1jKG4oMTEpKSxvPWMobig0KSksaT1jKG4oMjQpKSx1PW4oMik7ZnVuY3Rpb24gYyhlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZS5leHBvcnRzPXthc1RleHQ6ci5kZWZhdWx0LGFzVHJlZTpvLmRlZmF1bHQuZnJvbVJpY2hUZXh0LHNlcmlhbGl6ZTppLmRlZmF1bHQsRWxlbWVudHM6dS5OT0RFX1RZUEVTfX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD12b2lkIDAsdC5kZWZhdWx0PWZ1bmN0aW9uKGUsdCl7dmFyIG49XCJzdHJpbmdcIj09dHlwZW9mIHQ/dDpcIiBcIjtyZXR1cm4gZS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRleHR9KSkuam9pbihuKX19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDApKG4oMTMpKCEwKSk7ZS5leHBvcnRzPXJ9LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDE0KTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uIHQobil7Zm9yKHZhciBvLGksdSxjPVtdLGE9MCxsPW4ubGVuZ3RoO2E8bDspe2lmKHIoblthXSkpZm9yKHU9MCxpPShvPWU/dChuW2FdKTpuW2FdKS5sZW5ndGg7dTxpOyljW2MubGVuZ3RoXT1vW3VdLHUrPTE7ZWxzZSBjW2MubGVuZ3RoXT1uW2FdO2ErPTF9cmV0dXJuIGN9fX0sZnVuY3Rpb24oZSx0LG4pe3ZhciByPW4oMCksbz1uKDUpLGk9big2KSx1PXIoKGZ1bmN0aW9uKGUpe3JldHVybiEhbyhlKXx8ISFlJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmIWkoZSkmJigxPT09ZS5ub2RlVHlwZT8hIWUubGVuZ3RoOjA9PT1lLmxlbmd0aHx8ZS5sZW5ndGg+MCYmZS5oYXNPd25Qcm9wZXJ0eSgwKSYmZS5oYXNPd25Qcm9wZXJ0eShlLmxlbmd0aC0xKSl9KSk7ZS5leHBvcnRzPXV9LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDEpKChmdW5jdGlvbihlLHQpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0LDApLnNvcnQoKGZ1bmN0aW9uKHQsbil7dmFyIHI9ZSh0KSxvPWUobik7cmV0dXJuIHI8bz8tMTpyPm8/MTowfSkpfSkpO2UuZXhwb3J0cz1yfSxmdW5jdGlvbihlLHQsbil7dmFyIHI9bigxKSgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodCwwKS5zb3J0KChmdW5jdGlvbih0LG4pe2Zvcih2YXIgcj0wLG89MDswPT09ciYmbzxlLmxlbmd0aDspcj1lW29dKHQsbiksbys9MTtyZXR1cm4gcn0pKX0pKTtlLmV4cG9ydHM9cn0sZnVuY3Rpb24oZSx0LG4pe3ZhciByPW4oMTgpKDAsLTEpO2UuZXhwb3J0cz1yfSxmdW5jdGlvbihlLHQsbil7dmFyIHI9bigxOSksbz1uKDIwKShyKFwic2xpY2VcIiwoZnVuY3Rpb24oZSx0LG4pe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuLGUsdCl9KSkpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQsbil7dmFyIHI9big1KTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoO2lmKDA9PT1uKXJldHVybiB0KCk7dmFyIG89YXJndW1lbnRzW24tMV07cmV0dXJuIHIobyl8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG9bZV0/dC5hcHBseSh0aGlzLGFyZ3VtZW50cyk6b1tlXS5hcHBseShvLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywwLG4tMSkpfX19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1uKDApLG89bigxKSxpPW4oMyk7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbiB0KG4sdSxjKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiB0O2Nhc2UgMTpyZXR1cm4gaShuKT90Om8oKGZ1bmN0aW9uKHQscil7cmV0dXJuIGUobix0LHIpfSkpO2Nhc2UgMjpyZXR1cm4gaShuKSYmaSh1KT90Omkobik/bygoZnVuY3Rpb24odCxuKXtyZXR1cm4gZSh0LHUsbil9KSk6aSh1KT9vKChmdW5jdGlvbih0LHIpe3JldHVybiBlKG4sdCxyKX0pKTpyKChmdW5jdGlvbih0KXtyZXR1cm4gZShuLHUsdCl9KSk7ZGVmYXVsdDpyZXR1cm4gaShuKSYmaSh1KSYmaShjKT90OmkobikmJmkodSk/bygoZnVuY3Rpb24odCxuKXtyZXR1cm4gZSh0LG4sYyl9KSk6aShuKSYmaShjKT9vKChmdW5jdGlvbih0LG4pe3JldHVybiBlKHQsdSxuKX0pKTppKHUpJiZpKGMpP28oKGZ1bmN0aW9uKHQscil7cmV0dXJuIGUobix0LHIpfSkpOmkobik/cigoZnVuY3Rpb24odCl7cmV0dXJuIGUodCx1LGMpfSkpOmkodSk/cigoZnVuY3Rpb24odCl7cmV0dXJuIGUobix0LGMpfSkpOmkoYyk/cigoZnVuY3Rpb24odCl7cmV0dXJuIGUobix1LHQpfSkpOmUobix1LGMpfX19fSxmdW5jdGlvbihlLHQsbil7dmFyIHI9bigyMikoLTEpO2UuZXhwb3J0cz1yfSxmdW5jdGlvbihlLHQsbil7dmFyIHI9bigxKSxvPW4oNiksaT1yKChmdW5jdGlvbihlLHQpe3ZhciBuPWU8MD90Lmxlbmd0aCtlOmU7cmV0dXJuIG8odCk/dC5jaGFyQXQobik6dFtuXX0pKTtlLmV4cG9ydHM9aX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuUmljaFRleHRCbG9jaz12b2lkIDA7dmFyIHI9bigyKTtmdW5jdGlvbiBvKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIua2V5LHIpfX12YXIgaT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpeyFmdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSksdGhpcy50eXBlPXQsdGhpcy50ZXh0PW4sdGhpcy5zcGFucz1yfXZhciB0LG47cmV0dXJuIHQ9ZSwobj1be2tleTpcImlzRW1iZWRCbG9ja1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ci5OT0RFX1RZUEVTLmVtYmVkfX0se2tleTpcImlzSW1hZ2VCbG9ja1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ci5OT0RFX1RZUEVTLmltYWdlfX0se2tleTpcImlzTGlzdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ci5OT0RFX1RZUEVTLmxpc3R9fSx7a2V5OlwiaXNPcmRlcmVkTGlzdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ci5OT0RFX1RZUEVTLm9MaXN0fX0se2tleTpcImlzTGlzdEl0ZW1cIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXIuTk9ERV9UWVBFUy5saXN0SXRlbX19LHtrZXk6XCJpc09yZGVyZWRMaXN0SXRlbVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlPT09ci5OT0RFX1RZUEVTLm9MaXN0SXRlbX19LHtrZXk6XCJlbXB0eUxpc3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybnt0eXBlOnIuTk9ERV9UWVBFUy5saXN0LHNwYW5zOltdLHRleHQ6XCJcIn19fSx7a2V5OlwiZW1wdHlPcmRlcmVkTGlzdFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJue3R5cGU6ci5OT0RFX1RZUEVTLm9MaXN0LHNwYW5zOltdLHRleHQ6XCJcIn19fV0pJiZvKHQsbiksZX0oKTt0LlJpY2hUZXh0QmxvY2s9aX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD12b2lkIDA7dmFyIHIsbz0ocj1uKDQpKSYmci5fX2VzTW9kdWxlP3I6e2RlZmF1bHQ6cn0saT1uKDgpO3QuZGVmYXVsdD1mdW5jdGlvbihlLHQsbil7cmV0dXJuIG8uZGVmYXVsdC5mcm9tUmljaFRleHQoZSkuY2hpbGRyZW4ubWFwKChmdW5jdGlvbihlLHIpe3JldHVybiBmdW5jdGlvbihlLHQsbixyKXtyZXR1cm4gZnVuY3Rpb24gZShuLG8pe3ZhciB1PW4gaW5zdGFuY2VvZiBpLlNwYW5Ob2RlP24udGV4dDpudWxsLGM9bi5jaGlsZHJlbi5yZWR1Y2UoKGZ1bmN0aW9uKHQsbixyKXtyZXR1cm4gdC5jb25jYXQoW2UobixyKV0pfSksW10pO3JldHVybiByJiZyKG4udHlwZSxuLmVsZW1lbnQsdSxjLG8pfHx0KG4udHlwZSxuLmVsZW1lbnQsdSxjLG8pfShlLG4pfShlLHQscixuKX0pKX19XSl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtcbi8qIVxuICogZXNjYXBlLWh0bWxcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTMgVEogSG9sb3dheWNodWtcbiAqIENvcHlyaWdodChjKSAyMDE1IEFuZHJlYXMgTHViYmVcbiAqIENvcHlyaWdodChjKSAyMDE1IFRpYW5jaGVuZyBcIlRpbW90aHlcIiBHdVxuICogTUlUIExpY2Vuc2VkXG4gKi92YXIgcj0vW1wiJyY8Pl0vO2UuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdCxuPVwiXCIrZSxvPXIuZXhlYyhuKTtpZighbylyZXR1cm4gbjt2YXIgaT1cIlwiLHU9MCxjPTA7Zm9yKHU9by5pbmRleDt1PG4ubGVuZ3RoO3UrKyl7c3dpdGNoKG4uY2hhckNvZGVBdCh1KSl7Y2FzZSAzNDp0PVwiJnF1b3Q7XCI7YnJlYWs7Y2FzZSAzODp0PVwiJmFtcDtcIjticmVhaztjYXNlIDM5OnQ9XCImIzM5O1wiO2JyZWFrO2Nhc2UgNjA6dD1cIiZsdDtcIjticmVhaztjYXNlIDYyOnQ9XCImZ3Q7XCI7YnJlYWs7ZGVmYXVsdDpjb250aW51ZX1jIT09dSYmKGkrPW4uc3Vic3RyaW5nKGMsdSkpLGM9dSsxLGkrPXR9cmV0dXJuIGMhPT11P2krbi5zdWJzdHJpbmcoYyx1KTppfX1dKX0pKTsiLCJcbjxzY3JpcHQ+XG5leHBvcnQgY29uc3QgVEFHUyA9IHtcbiAgICBoZWFkaW5nMTogXCJoMVwiLFxuICAgIGhlYWRpbmcyOiBcImgyXCIsXG4gICAgaGVhZGluZzM6IFwiaDNcIixcbiAgICBoZWFkaW5nNDogXCJoNFwiLFxuICAgIGhlYWRpbmc1OiBcImg1XCIsXG4gICAgaGVhZGluZzY6IFwiaDZcIixcbiAgICBwYXJhZ3JhcGg6IFwicFwiLFxuICAgIHByZWZvcm1hdHRlZDogXCJwcmVcIlxufTtcbmV4cG9ydCBsZXQgZWxlbWVudHM7XG48L3NjcmlwdD5cblxueyNlYWNoIGVsZW1lbnRzIGFzIGVsZW1lbnR9XG4gICAge0BodG1sIGA8JHtUQUdTW2VsZW1lbnQudHlwZV19PiR7ZWxlbWVudC50ZXh0fTwvJHtUQUdTW2VsZW1lbnQudHlwZV19PmB9XG57L2VhY2h9IiwiPHNjcmlwdD5cblxuIGxldCB0aXRsZXMgPSBbXG4gIHsgaWQ6ICdpbnRybycsIG5hbWU6ICdJbnRybycgfSxcbiAgeyBpZDogJ3dlYi1kZXNpZ24nLCBuYW1lOiAnRGVzaWduJyB9LFxuICB7IGlkOiAnY3VzdG9tJywgbmFtZTogJ01vYmlsZScgfSxcbiAgeyBpZDogJ3NlbycsIG5hbWU6ICdTRU8nIH0sXG4gIHsgaWQ6ICd3ZWItaG9zdGluZycsIG5hbWU6ICdIb3N0aW5nJyB9LFxuICB7IGlkOiAnY29udGFjdCcsIG5hbWU6ICdDb250YWN0JyB9XG4gXTtcblxubGV0IGFjdGl2ZSA9IGZhbHNlO1xuXG48L3NjcmlwdD5cblxuPGRpdiAgY2xhc3M9XCJoZWFkZXJcIj5cbiA8ZGl2IGNsYXNzPVwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci1sYXJnZVwiID5cbjxuYXYgY2xhc3M9XCJ1ay1uYXZiYXItY29udGFpbmVyXCIgdWstbmF2YmFyPlxuPGRpdiBjbGFzcz1cInVrLW5hdmJhci1sZWZ0XCI+XG48YSBjbGFzcz1cInVrLWxvZ29cIiBocmVmPVwiI2ludHJvXCI+PGltZyBzcmM9XCJsb2dvLnN2Z1wiIGFsdD1cImxvZ29cIiB3aWR0aD1cIjIwNVwiIGhlaWdodD1cIjQ4XCIgdWstc3ZnPjwvYT5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInVrLW5hdmJhci1yaWdodFwiPlxuPGRpdiBjbGFzcz1cImhhbWJ1cmdlclwiICBocmVmPVwiL1wiICAgY2xhc3M6YWN0aXZlPXthY3RpdmV9IG9uOmNsaWNrPVwieygpID0+IGFjdGl2ZSA9ICFhY3RpdmUgfVwiIHVrLXRvZ2dsZT1cInRhcmdldDogI21lbnVcIj5cbjxzcGFuIGNsYXNzPVwibGluZVwiPjwvc3Bhbj5cbjxzcGFuIGNsYXNzPVwibGluZVwiPjwvc3Bhbj5cbjxzcGFuIGNsYXNzPVwibGluZVwiPjwvc3Bhbj5cbjwvZGl2PlxuPC9kaXY+XG48L25hdj5cbjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgaWQ9XCJtZW51XCIgdWstb2ZmY2FudmFzPVwiZmxpcDogdHJ1ZTtcIj5cbjxzZWN0aW9uIGNsYXNzPVwidWstdGV4dC1jZW50ZXIgbWVudVwiIHVrLXNjcm9sbHNweT1cImNsczp1ay1hbmltYXRpb24tc2NhbGUtdXA7IHRhcmdldDogLmNvbnRlbnQ7IGRlbGF5OiAxMjAwXCI+XG48ZGl2IGNsYXNzPVwiY29udGVudCB1ay13aWR0aC0xLTJAbSB1ay13aWR0aC0xLTFAc1wiPlxuPHVsIGNsYXNzPVwidWstbGlzdFwiPlxueyNlYWNoIHRpdGxlcyBhcyB7IGlkLCBuYW1lIH0sIGl9XG4gPGxpPjxhIGhyZWY9XCIje2lkfVwiICBvbjpjbGljaz1cInsoKSA9PiBhY3RpdmUgPSAhYWN0aXZlIH1cIj48aDI+e25hbWV9PC9oMj48L2E+PC9saT5cbnsvZWFjaH1cbjwvdWw+XG48L2Rpdj5cbjwvc2VjdGlvbj5cbjwvZGl2PlxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsIjxzY3JpcHQ+XG4gICAgZXhwb3J0IGxldCBzaXRlXG4gICAgZXhwb3J0IGxldCB0aXRsZVxuICAgIGV4cG9ydCBsZXQgZGVzY3JpcHRpb25cbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG4gICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuXG4gICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDBcIiAvPlxuXG4gICAgPG1ldGEgbmFtZT1cImtleXdvcmRzXCIgY29udGVudD1cIm1vYmlsZSBhcHAgZGV2ZWxvcG1lbnQsIFZ1ZSwgUmVhY3QsIENTUywgYWNjZXNzaWJpbGl0eSwgdXNhYmlsaXR5XCI+XG4gICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17ZGVzY3JpcHRpb259PlxuXG4gICAgPGxpbmsgcmVsPSdpY29uJyB0eXBlPSdpbWFnZS9wbmcnIGhyZWY9J2Zhdmljb24ucG5nJz5cbiAgICA8bGluayByZWw9XCJpY29uXCIgdHlwZT1cImltYWdlL3BuZ1wiIGhyZWY9XCJmYXZpY29uMTkyLnBuZ1wiIHNpemVzPVwiMTkyeDE5MlwiPlxuICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiZmF2aWNvbjUxMi5wbmdcIiBzaXplcz1cIjUxMng1MTJcIj5cblxuICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNyZWF0b3JcIiBjb250ZW50PVwiQGltd2RcIj5cbiAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9eyB0aXRsZSB9PlxuICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIgY29udGVudD17IGRlc2NyaXB0aW9uIH0+XG5cbiAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnVybFwiIGNvbnRlbnQ9eyBzaXRlIH0+XG4gICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9eyB0aXRsZSB9PlxuICAgIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PXsgZGVzY3JpcHRpb24gfT5cbiAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnNpdGVfbmFtZVwiIGNvbnRlbnQ9eyB0aXRsZSB9PlxuXG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJnbG9iYWwuY3NzXCI+XG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3Vpa2l0QDMuNS41L2Rpc3QvY3NzL3Vpa2l0Lm1pbi5jc3NcIiAvPlxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvaGFyOHZ5di5jc3NcIj5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vdWlraXRAMy41LjUvZGlzdC9qcy91aWtpdC5taW4uanNcIj48L3NjcmlwdD5cbiAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vdWlraXRAMy41LjUvZGlzdC9qcy91aWtpdC1pY29ucy5taW4uanNcIj48L3NjcmlwdD5cbjwvc3ZlbHRlOmhlYWQ+IiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gICAgaW1wb3J0IEhlYWRNZXRhIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZE1ldGEuc3ZlbHRlJztcbiAgICBpbXBvcnQgTmF2IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2LnN2ZWx0ZSc7XG4gICAgaW1wb3J0IFByaXNtaWNIVE1MIGZyb20gJy4uL2NvbXBvbmVudHMvUHJpc21pY0hUTUwuc3ZlbHRlJztcbiAgICBpbXBvcnQgUHJpc21pYyBmcm9tICdwcmlzbWljLWphdmFzY3JpcHQnO1xuXHRpbXBvcnQgUHJpc21pY0RPTSBmcm9tICdwcmlzbWljLWRvbSc7XG5cdGltcG9ydCB7IENsaWVudCB9IGZyb20gJy4uLy4uL3ByaXNtaWMtY29uZmlnLmpzJztcblxuXHRsZXQgaXRlbXMgPSBudWxsO1xuXG5cdGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zLCBxdWVyeSB9KSB7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQ2xpZW50LnF1ZXJ5KFxuICAgICAgICAgIFByaXNtaWMuUHJlZGljYXRlcy5hdCgnZG9jdW1lbnQudHlwZScsICdwYWdlJyksXG4gICAgICAgICAgeyBvcmRlcmluZ3MgOiAnW215LnBhZ2UuZGF0ZV0nIH1cbiAgICAgIClcblxuICAgICAgICBpdGVtcyA9IHJlc3BvbnNlLnJlc3VsdHNcblxuXHRcdGlmICggaXRlbXMgKSB7XG5cdFx0XHRyZXR1cm4ge2l0ZW1zfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XG4gICAgICAgIH1cblx0fVxuXG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbmV4cG9ydCBsZXQgaXRlbXM7XG48L3NjcmlwdD5cblxuPEhlYWRNZXRhXG5zaXRlPSdodHRwczovL3d3dy5pbXdkLmRlc2lnbidcbnRpdGxlPSdJTVdEIERlc2lnbidcbmRlc2NyaXB0aW9uPXtgV2UgdHVybiBpZGVhcyBpbnRvIGFjY2Vzc2libGUgZXhwZXJpZW5jZXMuYH1cbi8+XG48c3ZlbHRlOmhlYWQ+PC9zdmVsdGU6aGVhZD5cblxuPG1haW4+XG5cbjxOYXYvPlxuXG4gICAgXG57I2VhY2ggaXRlbXMgYXMgaXRlbX1cblxuPHNlY3Rpb24gY2xhc3M9XCJ1ay10ZXh0LWNlbnRlciB7aXRlbS51aWR9XCIgaWQ9XCJ7aXRlbS51aWR9XCIgIHVrLXNjcm9sbHNweT1cImNsczp1ay1hbmltYXRpb24tc2NhbGUtdXA7IHRhcmdldDogLmNvbnRlbnQ7IGRlbGF5OiAxMjAwOyByZXBlYXQ6IHRydWVcIj5cblxuPGRpdiBjbGFzcz1cImNvbnRlbnQgdWstd2lkdGgtMS0yQG0gdWstd2lkdGgtMS0xQHNcIj5cblxuPGgyIGNsYXNzPVwidWstYXJ0aWNsZS10aXRsZVwiPntQcmlzbWljRE9NLlJpY2hUZXh0LmFzVGV4dChpdGVtLmRhdGEudGl0bGUpfTwvaDI+XG48ZGl2IGNsYXNzPVwidGl0bGUtbGluZSB1ay1tYXJnaW4tYXV0b1wiPjwvZGl2PlxuPFByaXNtaWNIVE1MIGVsZW1lbnRzPXtpdGVtLmRhdGEudGV4dH0gLz5cbnsjaWYgaXRlbS51aWQgPT09IFwiY29udGFjdFwifVxuPGEgaHJlZj1cIm1haWx0bzpoZWxsb0BpbXdkLmZyXCI+aGVsbG9AaW13ZC5mcjwvYT5cbjxhIGhyZWY9XCJ0ZWw6KzMzIDYwNjQzMjM1NlwiPiszMyA2MDYgNDMgMjMgNTY8L2E+XG57L2lmfVxuXG48L2Rpdj5cblxuPC9zZWN0aW9uPlxuey9lYWNofVxuXG48L21haW4+XG5cblxuXG4iXSwibmFtZXMiOlsidGhpcyIsImNyb3NzRmV0Y2giLCJQcmlzbWljIiwiUHJpc21pY0RPTSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7QUFDaEMs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QyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWdDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLE9BQU8sTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU0sa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFNLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxPQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFnQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFjLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBYyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTSxJQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFNLElBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsR0FBRyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFjLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFNLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxjQUFjLENBQUMsMkRBQTJELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFjLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFjLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3B4bEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sUUFBUSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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
