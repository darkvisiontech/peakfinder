(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // node_modules/d3-array/build/d3-array.js
  var require_d3_array = __commonJS({
    "node_modules/d3-array/build/d3-array.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.d3_array = {});
      })(exports, function(exports2) {
        "use strict";
        function ascending(a, b) {
          return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
        }
        function bisector(compare) {
          if (compare.length === 1)
            compare = ascendingComparator(compare);
          return {
            left: function(a, x2, lo, hi) {
              if (lo == null)
                lo = 0;
              if (hi == null)
                hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x2) < 0)
                  lo = mid + 1;
                else
                  hi = mid;
              }
              return lo;
            },
            right: function(a, x2, lo, hi) {
              if (lo == null)
                lo = 0;
              if (hi == null)
                hi = a.length;
              while (lo < hi) {
                var mid = lo + hi >>> 1;
                if (compare(a[mid], x2) > 0)
                  hi = mid;
                else
                  lo = mid + 1;
              }
              return lo;
            }
          };
        }
        function ascendingComparator(f) {
          return function(d, x2) {
            return ascending(f(d), x2);
          };
        }
        var ascendingBisect = bisector(ascending);
        var bisectRight = ascendingBisect.right;
        var bisectLeft = ascendingBisect.left;
        function descending(a, b) {
          return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
        }
        function number$1(x2) {
          return x2 === null ? NaN : +x2;
        }
        function variance(array, f) {
          var n = array.length, m = 0, a, d, s = 0, i2 = -1, j = 0;
          if (f == null) {
            while (++i2 < n) {
              if (!isNaN(a = number$1(array[i2]))) {
                d = a - m;
                m += d / ++j;
                s += d * (a - m);
              }
            }
          } else {
            while (++i2 < n) {
              if (!isNaN(a = number$1(f(array[i2], i2, array)))) {
                d = a - m;
                m += d / ++j;
                s += d * (a - m);
              }
            }
          }
          if (j > 1)
            return s / (j - 1);
        }
        function deviation(array, f) {
          var v = variance(array, f);
          return v ? Math.sqrt(v) : v;
        }
        function extent(array, f) {
          var i2 = -1, n = array.length, a, b, c;
          if (f == null) {
            while (++i2 < n)
              if ((b = array[i2]) != null && b >= b) {
                a = c = b;
                break;
              }
            while (++i2 < n)
              if ((b = array[i2]) != null) {
                if (a > b)
                  a = b;
                if (c < b)
                  c = b;
              }
          } else {
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null && b >= b) {
                a = c = b;
                break;
              }
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null) {
                if (a > b)
                  a = b;
                if (c < b)
                  c = b;
              }
          }
          return [a, c];
        }
        function constant(x2) {
          return function() {
            return x2;
          };
        }
        function identity(x2) {
          return x2;
        }
        function range(start, stop, step2) {
          start = +start, stop = +stop, step2 = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step2;
          var i2 = -1, n = Math.max(0, Math.ceil((stop - start) / step2)) | 0, range2 = new Array(n);
          while (++i2 < n) {
            range2[i2] = start + i2 * step2;
          }
          return range2;
        }
        var e10 = Math.sqrt(50);
        var e5 = Math.sqrt(10);
        var e2 = Math.sqrt(2);
        function ticks(start, stop, count) {
          var step2 = tickStep(start, stop, count);
          return range(
            Math.ceil(start / step2) * step2,
            Math.floor(stop / step2) * step2 + step2 / 2,
            // inclusive
            step2
          );
        }
        function tickStep(start, stop, count) {
          var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
          if (error >= e10)
            step1 *= 10;
          else if (error >= e5)
            step1 *= 5;
          else if (error >= e2)
            step1 *= 2;
          return stop < start ? -step1 : step1;
        }
        function sturges(values) {
          return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
        }
        function number(x2) {
          return +x2;
        }
        function histogram() {
          var value = identity, domain = extent, threshold = sturges;
          function histogram2(data) {
            var i2, n = data.length, x2, values = new Array(n);
            for (i2 = 0; i2 < n; ++i2) {
              values[i2] = +value(data[i2], i2, data);
            }
            var xz = domain(values), x0 = +xz[0], x1 = +xz[1], tz = threshold(values, x0, x1);
            if (!Array.isArray(tz))
              tz = ticks(x0, x1, +tz);
            var m = tz.length;
            for (i2 = 0; i2 < m; ++i2)
              tz[i2] = +tz[i2];
            while (tz[0] <= x0)
              tz.shift(), --m;
            while (tz[m - 1] >= x1)
              tz.pop(), --m;
            var bins = new Array(m + 1), bin;
            for (i2 = 0; i2 <= m; ++i2) {
              bin = bins[i2] = [];
              bin.x0 = i2 > 0 ? tz[i2 - 1] : x0;
              bin.x1 = i2 < m ? tz[i2] : x1;
            }
            for (i2 = 0; i2 < n; ++i2) {
              x2 = values[i2];
              if (x0 <= x2 && x2 <= x1) {
                bins[bisectRight(tz, x2, 0, m)].push(data[i2]);
              }
            }
            return bins;
          }
          histogram2.value = function(_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram2) : value;
          };
          histogram2.domain = function(_) {
            return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram2) : domain;
          };
          histogram2.thresholds = function(_) {
            if (!arguments.length)
              return threshold;
            threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(Array.prototype.map.call(_, number)) : constant(+_);
            return histogram2;
          };
          return histogram2;
        }
        function quantile(array, p, f) {
          if (f == null)
            f = number$1;
          if (!(n = array.length))
            return;
          if ((p = +p) <= 0 || n < 2)
            return +f(array[0], 0, array);
          if (p >= 1)
            return +f(array[n - 1], n - 1, array);
          var n, h = (n - 1) * p, i2 = Math.floor(h), a = +f(array[i2], i2, array), b = +f(array[i2 + 1], i2 + 1, array);
          return a + (b - a) * (h - i2);
        }
        function freedmanDiaconis(values, min2, max2) {
          values.sort(ascending);
          return Math.ceil((max2 - min2) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
        }
        function scott(values, min2, max2) {
          return Math.ceil((max2 - min2) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
        }
        function max(array, f) {
          var i2 = -1, n = array.length, a, b;
          if (f == null) {
            while (++i2 < n)
              if ((b = array[i2]) != null && b >= b) {
                a = b;
                break;
              }
            while (++i2 < n)
              if ((b = array[i2]) != null && b > a)
                a = b;
          } else {
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null && b >= b) {
                a = b;
                break;
              }
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null && b > a)
                a = b;
          }
          return a;
        }
        function mean(array, f) {
          var s = 0, n = array.length, a, i2 = -1, j = n;
          if (f == null) {
            while (++i2 < n)
              if (!isNaN(a = number$1(array[i2])))
                s += a;
              else
                --j;
          } else {
            while (++i2 < n)
              if (!isNaN(a = number$1(f(array[i2], i2, array))))
                s += a;
              else
                --j;
          }
          if (j)
            return s / j;
        }
        function median(array, f) {
          var numbers = [], n = array.length, a, i2 = -1;
          if (f == null) {
            while (++i2 < n)
              if (!isNaN(a = number$1(array[i2])))
                numbers.push(a);
          } else {
            while (++i2 < n)
              if (!isNaN(a = number$1(f(array[i2], i2, array))))
                numbers.push(a);
          }
          return quantile(numbers.sort(ascending), 0.5);
        }
        function merge(arrays) {
          var n = arrays.length, m, i2 = -1, j = 0, merged, array;
          while (++i2 < n)
            j += arrays[i2].length;
          merged = new Array(j);
          while (--n >= 0) {
            array = arrays[n];
            m = array.length;
            while (--m >= 0) {
              merged[--j] = array[m];
            }
          }
          return merged;
        }
        function min(array, f) {
          var i2 = -1, n = array.length, a, b;
          if (f == null) {
            while (++i2 < n)
              if ((b = array[i2]) != null && b >= b) {
                a = b;
                break;
              }
            while (++i2 < n)
              if ((b = array[i2]) != null && a > b)
                a = b;
          } else {
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null && b >= b) {
                a = b;
                break;
              }
            while (++i2 < n)
              if ((b = f(array[i2], i2, array)) != null && a > b)
                a = b;
          }
          return a;
        }
        function pairs(array) {
          var i2 = 0, n = array.length - 1, p = array[0], pairs2 = new Array(n < 0 ? 0 : n);
          while (i2 < n)
            pairs2[i2] = [p, p = array[++i2]];
          return pairs2;
        }
        function permute(array, indexes) {
          var i2 = indexes.length, permutes = new Array(i2);
          while (i2--)
            permutes[i2] = array[indexes[i2]];
          return permutes;
        }
        function scan(array, compare) {
          if (!(n = array.length))
            return;
          var i2 = 0, n, j = 0, xi, xj = array[j];
          if (!compare)
            compare = ascending;
          while (++i2 < n)
            if (compare(xi = array[i2], xj) < 0 || compare(xj, xj) !== 0)
              xj = xi, j = i2;
          if (compare(xj, xj) === 0)
            return j;
        }
        function shuffle(array, i0, i1) {
          var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0), t, i2;
          while (m) {
            i2 = Math.random() * m-- | 0;
            t = array[m + i0];
            array[m + i0] = array[i2 + i0];
            array[i2 + i0] = t;
          }
          return array;
        }
        function sum(array, f) {
          var s = 0, n = array.length, a, i2 = -1;
          if (f == null) {
            while (++i2 < n)
              if (a = +array[i2])
                s += a;
          } else {
            while (++i2 < n)
              if (a = +f(array[i2], i2, array))
                s += a;
          }
          return s;
        }
        function transpose(matrix) {
          if (!(n = matrix.length))
            return [];
          for (var i2 = -1, m = min(matrix, length), transpose2 = new Array(m); ++i2 < m; ) {
            for (var j = -1, n, row = transpose2[i2] = new Array(n); ++j < n; ) {
              row[j] = matrix[j][i2];
            }
          }
          return transpose2;
        }
        function length(d) {
          return d.length;
        }
        function zip() {
          return transpose(arguments);
        }
        var version = "0.7.1";
        exports2.version = version;
        exports2.bisect = bisectRight;
        exports2.bisectRight = bisectRight;
        exports2.bisectLeft = bisectLeft;
        exports2.ascending = ascending;
        exports2.bisector = bisector;
        exports2.descending = descending;
        exports2.deviation = deviation;
        exports2.extent = extent;
        exports2.histogram = histogram;
        exports2.thresholdFreedmanDiaconis = freedmanDiaconis;
        exports2.thresholdScott = scott;
        exports2.thresholdSturges = sturges;
        exports2.max = max;
        exports2.mean = mean;
        exports2.median = median;
        exports2.merge = merge;
        exports2.min = min;
        exports2.pairs = pairs;
        exports2.permute = permute;
        exports2.quantile = quantile;
        exports2.range = range;
        exports2.scan = scan;
        exports2.shuffle = shuffle;
        exports2.sum = sum;
        exports2.ticks = ticks;
        exports2.tickStep = tickStep;
        exports2.transpose = transpose;
        exports2.variance = variance;
        exports2.zip = zip;
      });
    }
  });

  // node_modules/spline-interpolator/index.js
  var require_spline_interpolator = __commonJS({
    "node_modules/spline-interpolator/index.js"(exports, module) {
      var { bisectRight } = require_d3_array();
      var quincunx = (u, v, w, q) => {
        const n = u.length - 1;
        u[0] = 0;
        v[0] = 0;
        w[0] = 0;
        v[1] = v[1] / u[1];
        w[1] = w[1] / u[1];
        for (let i2 = 2; i2 < n; ++i2) {
          u[i2] = u[i2] - u[i2 - 2] * w[i2 - 2] * w[i2 - 2] - u[i2 - 1] * v[i2 - 1] * v[i2 - 1];
          v[i2] = (v[i2] - u[i2 - 1] * v[i2 - 1] * w[i2 - 1]) / u[i2];
          w[i2] = w[i2] / u[i2];
        }
        for (let i2 = 2; i2 < n; ++i2) {
          q[i2] = q[i2] - v[i2 - 1] * q[i2 - 1] - w[i2 - 2] * q[i2 - 2];
        }
        for (let i2 = 1; i2 < n; ++i2) {
          q[i2] = q[i2] / u[i2];
        }
        q[n - 2] = q[n - 2] - v[n - 2] * q[n - 1];
        for (let i2 = n - 3; i2 > 0; --i2) {
          q[i2] = q[i2] - v[i2] * q[i2 + 1] - w[i2] * q[i2 + 2];
        }
      };
      var smoothingSpline = (x2, y2, sigma, lambda) => {
        const n = x2.length - 1;
        const h = new Array(n + 1);
        const r = new Array(n + 1);
        const f = new Array(n + 1);
        const p = new Array(n + 1);
        const q = new Array(n + 1);
        const u = new Array(n + 1);
        const v = new Array(n + 1);
        const w = new Array(n + 1);
        const params = x2.map(() => [0, 0, 0, 0]);
        params.pop();
        const mu = 2 * (1 - lambda) / (3 * lambda);
        for (let i2 = 0; i2 < n; ++i2) {
          h[i2] = x2[i2 + 1] - x2[i2];
          r[i2] = 3 / h[i2];
        }
        q[0] = 0;
        for (let i2 = 1; i2 < n; ++i2) {
          f[i2] = -(r[i2 - 1] + r[i2]);
          p[i2] = 2 * (x2[i2 + 1] - x2[i2 - 1]);
          q[i2] = 3 * (y2[i2 + 1] - y2[i2]) / h[i2] - 3 * (y2[i2] - y2[i2 - 1]) / h[i2 - 1];
        }
        q[n] = 0;
        for (let i2 = 1; i2 < n; ++i2) {
          u[i2] = r[i2 - 1] * r[i2 - 1] * sigma[i2 - 1] + f[i2] * f[i2] * sigma[i2] + r[i2] * r[i2] * sigma[i2 + 1];
          u[i2] = mu * u[i2] + p[i2];
        }
        for (let i2 = 1; i2 < n - 1; ++i2) {
          v[i2] = f[i2] * r[i2] * sigma[i2] + r[i2] * f[i2 + 1] * sigma[i2 + 1];
          v[i2] = mu * v[i2] + h[i2];
        }
        for (let i2 = 1; i2 < n - 2; ++i2) {
          w[i2] = mu * r[i2] * r[i2 + 1] * sigma[i2 + 1];
        }
        quincunx(u, v, w, q);
        params[0][3] = y2[0] - mu * r[0] * q[1] * sigma[0];
        params[1][3] = y2[1] - mu * (f[1] * q[1] + r[1] * q[2]) * sigma[0];
        params[0][0] = q[1] / (3 * h[0]);
        params[0][1] = 0;
        params[0][2] = (params[1][3] - params[0][3]) / h[0] - q[1] * h[0] / 3;
        r[0] = 0;
        for (let i2 = 1; i2 < n; ++i2) {
          params[i2][0] = (q[i2 + 1] - q[i2]) / (3 * h[i2]);
          params[i2][1] = q[i2];
          params[i2][2] = (q[i2] + q[i2 - 1]) * h[i2 - 1] + params[i2 - 1][2];
          params[i2][3] = r[i2 - 1] * q[i2 - 1] + f[i2] * q[i2] + r[i2] * q[i2 + 1];
          params[i2][3] = y2[i2] - mu * params[i2][3] * sigma[i2];
        }
        return params;
      };
      var SplineInterpolator2 = class {
        constructor(xIn, yIn, lambda = 1) {
          const indices = xIn.map((_, i2) => i2);
          indices.sort((i2, j) => xIn[i2] - xIn[j]);
          const x2 = indices.map((i2) => xIn[i2]);
          const y2 = indices.map((i2) => yIn[i2]);
          const n = indices.length;
          const sigma = indices.map(() => 1);
          this.n = n;
          this.x = x2;
          this.y = y2;
          this.params = smoothingSpline(x2, y2, sigma, lambda);
        }
        interpolate(v) {
          if (v === this.x[this.n - 1]) {
            return this.y[this.n - 1];
          }
          const i2 = Math.min(Math.max(0, bisectRight(this.x, v) - 1), this.n - 2);
          const [a, b, c, d] = this.params[i2];
          v = v - this.x[i2];
          return a * v * v * v + b * v * v + c * v + d;
        }
        max(step2 = 100) {
          const xStart = this.x[0];
          const xStop = this.x[this.n - 1];
          const delta = (xStop - xStart) / step2;
          let maxValue = -Infinity;
          for (let i2 = 0, x2 = xStart; i2 < step2; ++i2, x2 += delta) {
            const y2 = this.interpolate(x2);
            if (y2 > maxValue) {
              maxValue = y2;
            }
          }
          return maxValue;
        }
        min(step2 = 100) {
          const xStart = this.x[0];
          const xStop = this.x[this.n - 1];
          const delta = (xStop - xStart) / step2;
          let minValue = Infinity;
          for (let i2 = 0, x2 = xStart; i2 < step2; ++i2, x2 += delta) {
            const y2 = this.interpolate(x2);
            if (y2 < minValue) {
              minValue = y2;
            }
          }
          return minValue;
        }
        domain() {
          return [this.x[0], this.x[this.x.length - 1]];
        }
        range() {
          return [this.min(), this.max()];
        }
        curve(nInterval, domain = null) {
          domain = domain || this.domain();
          const delta = (domain[1] - domain[0]) / (nInterval - 1);
          const vals = new Array(nInterval);
          for (let i2 = 0; i2 < nInterval; ++i2) {
            const x2 = delta * i2 + domain[0];
            vals[i2] = [x2, this.interpolate(x2)];
          }
          return vals;
        }
      };
      module.exports = SplineInterpolator2;
    }
  });

  // node_modules/fft.js/lib/fft.js
  var require_fft = __commonJS({
    "node_modules/fft.js/lib/fft.js"(exports, module) {
      "use strict";
      function FFT2(size) {
        this.size = size | 0;
        if (this.size <= 1 || (this.size & this.size - 1) !== 0)
          throw new Error("FFT size must be a power of two and bigger than 1");
        this._csize = size << 1;
        var table = new Array(this.size * 2);
        for (var i2 = 0; i2 < table.length; i2 += 2) {
          const angle = Math.PI * i2 / this.size;
          table[i2] = Math.cos(angle);
          table[i2 + 1] = -Math.sin(angle);
        }
        this.table = table;
        var power = 0;
        for (var t = 1; this.size > t; t <<= 1)
          power++;
        this._width = power % 2 === 0 ? power - 1 : power;
        this._bitrev = new Array(1 << this._width);
        for (var j = 0; j < this._bitrev.length; j++) {
          this._bitrev[j] = 0;
          for (var shift = 0; shift < this._width; shift += 2) {
            var revShift = this._width - shift - 2;
            this._bitrev[j] |= (j >>> shift & 3) << revShift;
          }
        }
        this._out = null;
        this._data = null;
        this._inv = 0;
      }
      module.exports = FFT2;
      FFT2.prototype.fromComplexArray = function fromComplexArray(complex, storage) {
        var res = storage || new Array(complex.length >>> 1);
        for (var i2 = 0; i2 < complex.length; i2 += 2)
          res[i2 >>> 1] = complex[i2];
        return res;
      };
      FFT2.prototype.createComplexArray = function createComplexArray() {
        const res = new Array(this._csize);
        for (var i2 = 0; i2 < res.length; i2++)
          res[i2] = 0;
        return res;
      };
      FFT2.prototype.toComplexArray = function toComplexArray(input, storage) {
        var res = storage || this.createComplexArray();
        for (var i2 = 0; i2 < res.length; i2 += 2) {
          res[i2] = input[i2 >>> 1];
          res[i2 + 1] = 0;
        }
        return res;
      };
      FFT2.prototype.completeSpectrum = function completeSpectrum(spectrum) {
        var size = this._csize;
        var half = size >>> 1;
        for (var i2 = 2; i2 < half; i2 += 2) {
          spectrum[size - i2] = spectrum[i2];
          spectrum[size - i2 + 1] = -spectrum[i2 + 1];
        }
      };
      FFT2.prototype.transform = function transform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 0;
        this._transform4();
        this._out = null;
        this._data = null;
      };
      FFT2.prototype.realTransform = function realTransform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 0;
        this._realTransform4();
        this._out = null;
        this._data = null;
      };
      FFT2.prototype.inverseTransform = function inverseTransform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 1;
        this._transform4();
        for (var i2 = 0; i2 < out.length; i2++)
          out[i2] /= this.size;
        this._out = null;
        this._data = null;
      };
      FFT2.prototype._transform4 = function _transform4() {
        var out = this._out;
        var size = this._csize;
        var width = this._width;
        var step2 = 1 << width;
        var len = size / step2 << 1;
        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleTransform2(outOff, off, step2);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleTransform4(outOff, off, step2);
          }
        }
        var inv = this._inv ? -1 : 1;
        var table = this.table;
        for (step2 >>= 2; step2 >= 2; step2 >>= 2) {
          len = size / step2 << 1;
          var quarterLen = len >>> 2;
          for (outOff = 0; outOff < size; outOff += len) {
            var limit = outOff + quarterLen;
            for (var i2 = outOff, k = 0; i2 < limit; i2 += 2, k += step2) {
              const A = i2;
              const B = A + quarterLen;
              const C = B + quarterLen;
              const D = C + quarterLen;
              const Ar = out[A];
              const Ai = out[A + 1];
              const Br = out[B];
              const Bi = out[B + 1];
              const Cr = out[C];
              const Ci = out[C + 1];
              const Dr = out[D];
              const Di = out[D + 1];
              const MAr = Ar;
              const MAi = Ai;
              const tableBr = table[k];
              const tableBi = inv * table[k + 1];
              const MBr = Br * tableBr - Bi * tableBi;
              const MBi = Br * tableBi + Bi * tableBr;
              const tableCr = table[2 * k];
              const tableCi = inv * table[2 * k + 1];
              const MCr = Cr * tableCr - Ci * tableCi;
              const MCi = Cr * tableCi + Ci * tableCr;
              const tableDr = table[3 * k];
              const tableDi = inv * table[3 * k + 1];
              const MDr = Dr * tableDr - Di * tableDi;
              const MDi = Dr * tableDi + Di * tableDr;
              const T0r = MAr + MCr;
              const T0i = MAi + MCi;
              const T1r = MAr - MCr;
              const T1i = MAi - MCi;
              const T2r = MBr + MDr;
              const T2i = MBi + MDi;
              const T3r = inv * (MBr - MDr);
              const T3i = inv * (MBi - MDi);
              const FAr = T0r + T2r;
              const FAi = T0i + T2i;
              const FCr = T0r - T2r;
              const FCi = T0i - T2i;
              const FBr = T1r + T3i;
              const FBi = T1i - T3r;
              const FDr = T1r - T3i;
              const FDi = T1i + T3r;
              out[A] = FAr;
              out[A + 1] = FAi;
              out[B] = FBr;
              out[B + 1] = FBi;
              out[C] = FCr;
              out[C + 1] = FCi;
              out[D] = FDr;
              out[D + 1] = FDi;
            }
          }
        }
      };
      FFT2.prototype._singleTransform2 = function _singleTransform2(outOff, off, step2) {
        const out = this._out;
        const data = this._data;
        const evenR = data[off];
        const evenI = data[off + 1];
        const oddR = data[off + step2];
        const oddI = data[off + step2 + 1];
        const leftR = evenR + oddR;
        const leftI = evenI + oddI;
        const rightR = evenR - oddR;
        const rightI = evenI - oddI;
        out[outOff] = leftR;
        out[outOff + 1] = leftI;
        out[outOff + 2] = rightR;
        out[outOff + 3] = rightI;
      };
      FFT2.prototype._singleTransform4 = function _singleTransform4(outOff, off, step2) {
        const out = this._out;
        const data = this._data;
        const inv = this._inv ? -1 : 1;
        const step22 = step2 * 2;
        const step3 = step2 * 3;
        const Ar = data[off];
        const Ai = data[off + 1];
        const Br = data[off + step2];
        const Bi = data[off + step2 + 1];
        const Cr = data[off + step22];
        const Ci = data[off + step22 + 1];
        const Dr = data[off + step3];
        const Di = data[off + step3 + 1];
        const T0r = Ar + Cr;
        const T0i = Ai + Ci;
        const T1r = Ar - Cr;
        const T1i = Ai - Ci;
        const T2r = Br + Dr;
        const T2i = Bi + Di;
        const T3r = inv * (Br - Dr);
        const T3i = inv * (Bi - Di);
        const FAr = T0r + T2r;
        const FAi = T0i + T2i;
        const FBr = T1r + T3i;
        const FBi = T1i - T3r;
        const FCr = T0r - T2r;
        const FCi = T0i - T2i;
        const FDr = T1r - T3i;
        const FDi = T1i + T3r;
        out[outOff] = FAr;
        out[outOff + 1] = FAi;
        out[outOff + 2] = FBr;
        out[outOff + 3] = FBi;
        out[outOff + 4] = FCr;
        out[outOff + 5] = FCi;
        out[outOff + 6] = FDr;
        out[outOff + 7] = FDi;
      };
      FFT2.prototype._realTransform4 = function _realTransform4() {
        var out = this._out;
        var size = this._csize;
        var width = this._width;
        var step2 = 1 << width;
        var len = size / step2 << 1;
        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleRealTransform2(outOff, off >>> 1, step2 >>> 1);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleRealTransform4(outOff, off >>> 1, step2 >>> 1);
          }
        }
        var inv = this._inv ? -1 : 1;
        var table = this.table;
        for (step2 >>= 2; step2 >= 2; step2 >>= 2) {
          len = size / step2 << 1;
          var halfLen = len >>> 1;
          var quarterLen = halfLen >>> 1;
          var hquarterLen = quarterLen >>> 1;
          for (outOff = 0; outOff < size; outOff += len) {
            for (var i2 = 0, k = 0; i2 <= hquarterLen; i2 += 2, k += step2) {
              var A = outOff + i2;
              var B = A + quarterLen;
              var C = B + quarterLen;
              var D = C + quarterLen;
              var Ar = out[A];
              var Ai = out[A + 1];
              var Br = out[B];
              var Bi = out[B + 1];
              var Cr = out[C];
              var Ci = out[C + 1];
              var Dr = out[D];
              var Di = out[D + 1];
              var MAr = Ar;
              var MAi = Ai;
              var tableBr = table[k];
              var tableBi = inv * table[k + 1];
              var MBr = Br * tableBr - Bi * tableBi;
              var MBi = Br * tableBi + Bi * tableBr;
              var tableCr = table[2 * k];
              var tableCi = inv * table[2 * k + 1];
              var MCr = Cr * tableCr - Ci * tableCi;
              var MCi = Cr * tableCi + Ci * tableCr;
              var tableDr = table[3 * k];
              var tableDi = inv * table[3 * k + 1];
              var MDr = Dr * tableDr - Di * tableDi;
              var MDi = Dr * tableDi + Di * tableDr;
              var T0r = MAr + MCr;
              var T0i = MAi + MCi;
              var T1r = MAr - MCr;
              var T1i = MAi - MCi;
              var T2r = MBr + MDr;
              var T2i = MBi + MDi;
              var T3r = inv * (MBr - MDr);
              var T3i = inv * (MBi - MDi);
              var FAr = T0r + T2r;
              var FAi = T0i + T2i;
              var FBr = T1r + T3i;
              var FBi = T1i - T3r;
              out[A] = FAr;
              out[A + 1] = FAi;
              out[B] = FBr;
              out[B + 1] = FBi;
              if (i2 === 0) {
                var FCr = T0r - T2r;
                var FCi = T0i - T2i;
                out[C] = FCr;
                out[C + 1] = FCi;
                continue;
              }
              if (i2 === hquarterLen)
                continue;
              var ST0r = T1r;
              var ST0i = -T1i;
              var ST1r = T0r;
              var ST1i = -T0i;
              var ST2r = -inv * T3i;
              var ST2i = -inv * T3r;
              var ST3r = -inv * T2i;
              var ST3i = -inv * T2r;
              var SFAr = ST0r + ST2r;
              var SFAi = ST0i + ST2i;
              var SFBr = ST1r + ST3i;
              var SFBi = ST1i - ST3r;
              var SA = outOff + quarterLen - i2;
              var SB = outOff + halfLen - i2;
              out[SA] = SFAr;
              out[SA + 1] = SFAi;
              out[SB] = SFBr;
              out[SB + 1] = SFBi;
            }
          }
        }
      };
      FFT2.prototype._singleRealTransform2 = function _singleRealTransform2(outOff, off, step2) {
        const out = this._out;
        const data = this._data;
        const evenR = data[off];
        const oddR = data[off + step2];
        const leftR = evenR + oddR;
        const rightR = evenR - oddR;
        out[outOff] = leftR;
        out[outOff + 1] = 0;
        out[outOff + 2] = rightR;
        out[outOff + 3] = 0;
      };
      FFT2.prototype._singleRealTransform4 = function _singleRealTransform4(outOff, off, step2) {
        const out = this._out;
        const data = this._data;
        const inv = this._inv ? -1 : 1;
        const step22 = step2 * 2;
        const step3 = step2 * 3;
        const Ar = data[off];
        const Br = data[off + step2];
        const Cr = data[off + step22];
        const Dr = data[off + step3];
        const T0r = Ar + Cr;
        const T1r = Ar - Cr;
        const T2r = Br + Dr;
        const T3r = inv * (Br - Dr);
        const FAr = T0r + T2r;
        const FBr = T1r;
        const FBi = -T3r;
        const FCr = T0r - T2r;
        const FDr = T1r;
        const FDi = T3r;
        out[outOff] = FAr;
        out[outOff + 1] = 0;
        out[outOff + 2] = FBr;
        out[outOff + 3] = FBi;
        out[outOff + 4] = FCr;
        out[outOff + 5] = 0;
        out[outOff + 6] = FDr;
        out[outOff + 7] = FDi;
      };
    }
  });

  // node_modules/@lukeed/uuid/dist/index.mjs
  var IDX = 256;
  var HEX = [];
  var BUFFER;
  while (IDX--)
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
  function v4() {
    var i2 = 0, num, out = "";
    if (!BUFFER || IDX + 16 > 256) {
      BUFFER = Array(i2 = 256);
      while (i2--)
        BUFFER[i2] = 256 * Math.random() | 0;
      i2 = IDX = 0;
    }
    for (; i2 < 16; i2++) {
      num = BUFFER[IDX + i2];
      if (i2 == 6)
        out += HEX[num & 15 | 64];
      else if (i2 == 8)
        out += HEX[num & 63 | 128];
      else
        out += HEX[num];
      if (i2 & 1 && i2 > 1 && i2 < 11)
        out += "-";
    }
    IDX++;
    return out;
  }

  // node_modules/is-any-array/lib-esm/index.js
  var toString = Object.prototype.toString;
  function isAnyArray(value) {
    const tag = toString.call(value);
    return tag.endsWith("Array]") && !tag.includes("Big");
  }

  // node_modules/ml-savitzky-golay-generalized/lib-esm/index.js
  function sgg(ys, xs, options = {}) {
    let { windowSize = 9, derivative = 0, polynomial = 3 } = options;
    if (windowSize % 2 === 0 || windowSize < 5 || !Number.isInteger(windowSize)) {
      throw new RangeError("Invalid window size (should be odd and at least 5 integer number)");
    }
    if (!isAnyArray(ys)) {
      throw new TypeError("Y values must be an array");
    }
    if (typeof xs === "undefined") {
      throw new TypeError("X must be defined");
    }
    if (windowSize > ys.length) {
      throw new RangeError(`Window size is higher than the data length ${windowSize}>${ys.length}`);
    }
    if (derivative < 0 || !Number.isInteger(derivative)) {
      throw new RangeError("Derivative should be a positive integer");
    }
    if (polynomial < 1 || !Number.isInteger(polynomial)) {
      throw new RangeError("Polynomial should be a positive integer");
    }
    if (polynomial >= 6) {
      console.warn("You should not use polynomial grade higher than 5 if you are not sure that your data arises from such a model. Possible polynomial oscillation problems");
    }
    let half = Math.floor(windowSize / 2);
    let np = ys.length;
    let ans = new Float64Array(np);
    let weights = fullWeights(windowSize, polynomial, derivative);
    let hs = 0;
    let constantH = true;
    if (isAnyArray(xs)) {
      constantH = false;
    } else {
      hs = Math.pow(xs, derivative);
    }
    for (let i2 = 0; i2 < half; i2++) {
      let wg1 = weights[half - i2 - 1];
      let wg2 = weights[half + i2 + 1];
      let d1 = 0;
      let d2 = 0;
      for (let l = 0; l < windowSize; l++) {
        d1 += wg1[l] * ys[l];
        d2 += wg2[l] * ys[np - windowSize + l];
      }
      if (constantH) {
        ans[half - i2 - 1] = d1 / hs;
        ans[np - half + i2] = d2 / hs;
      } else {
        hs = getHs(xs, half - i2 - 1, half, derivative);
        ans[half - i2 - 1] = d1 / hs;
        hs = getHs(xs, np - half + i2, half, derivative);
        ans[np - half + i2] = d2 / hs;
      }
    }
    let wg = weights[half];
    for (let i2 = windowSize; i2 <= np; i2++) {
      let d = 0;
      for (let l = 0; l < windowSize; l++)
        d += wg[l] * ys[l + i2 - windowSize];
      if (!constantH) {
        hs = getHs(xs, i2 - half - 1, half, derivative);
      }
      ans[i2 - half - 1] = d / hs;
    }
    return ans;
  }
  function getHs(h, center, half, derivative) {
    let hs = 0;
    let count = 0;
    for (let i2 = center - half; i2 < center + half; i2++) {
      if (i2 >= 0 && i2 < h.length - 1) {
        hs += h[i2 + 1] - h[i2];
        count++;
      }
    }
    return Math.pow(hs / count, derivative);
  }
  function gramPoly(i2, m, k, s) {
    let Grampoly = 0;
    if (k > 0) {
      Grampoly = (4 * k - 2) / (k * (2 * m - k + 1)) * (i2 * gramPoly(i2, m, k - 1, s) + s * gramPoly(i2, m, k - 1, s - 1)) - (k - 1) * (2 * m + k) / (k * (2 * m - k + 1)) * gramPoly(i2, m, k - 2, s);
    } else {
      if (k === 0 && s === 0) {
        Grampoly = 1;
      } else {
        Grampoly = 0;
      }
    }
    return Grampoly;
  }
  function genFact(a, b) {
    let gf = 1;
    if (a >= b) {
      for (let j = a - b + 1; j <= a; j++) {
        gf *= j;
      }
    }
    return gf;
  }
  function weight(i2, t, m, n, s) {
    let sum = 0;
    for (let k = 0; k <= n; k++) {
      sum += (2 * k + 1) * (genFact(2 * m, k) / genFact(2 * m + k + 1, k + 1)) * gramPoly(i2, m, k, 0) * gramPoly(t, m, k, s);
    }
    return sum;
  }
  function fullWeights(m, n, s) {
    let weights = new Array(m);
    let np = Math.floor(m / 2);
    for (let t = -np; t <= np; t++) {
      weights[t + np] = new Float64Array(m);
      for (let j = -np; j <= np; j++) {
        weights[t + np][j + np] = weight(j, t, np, n, s);
      }
    }
    return weights;
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xNoiseSanPlot.js
  var import_spline_interpolator = __toESM(require_spline_interpolator());

  // node_modules/ml-spectra-processing/lib-esm/reim/reimFFT.js
  var import_fft = __toESM(require_fft());

  // node_modules/ml-spectra-processing/lib-esm/x/xMedian.js
  function xMedian(input) {
    if (!isAnyArray(input)) {
      throw new TypeError("input must be an array");
    }
    if (input.length === 0) {
      throw new TypeError("input must not be empty");
    }
    const array = input.slice();
    let low = 0;
    let high = array.length - 1;
    let middle = 0;
    let currentLow = 0;
    let currentHigh = 0;
    let median = calcMiddle(low, high);
    while (true) {
      if (high <= low) {
        return array[median];
      }
      if (high === low + 1) {
        if (array[low] > array[high]) {
          swap(array, low, high);
        }
        return array[median];
      }
      middle = calcMiddle(low, high);
      if (array[middle] > array[high])
        swap(array, middle, high);
      if (array[low] > array[high])
        swap(array, low, high);
      if (array[middle] > array[low])
        swap(array, middle, low);
      swap(array, middle, low + 1);
      currentLow = low + 1;
      currentHigh = high;
      while (true) {
        do
          currentLow++;
        while (array[low] > array[currentLow]);
        do
          currentHigh--;
        while (array[currentHigh] > array[low]);
        if (currentHigh < currentLow) {
          break;
        }
        swap(array, currentLow, currentHigh);
      }
      swap(array, low, currentHigh);
      if (currentHigh <= median) {
        low = currentLow;
      }
      if (currentHigh >= median) {
        high = currentHigh - 1;
      }
    }
  }
  function swap(array, i2, j) {
    const temp = array[j];
    array[j] = array[i2];
    array[i2] = temp;
  }
  function calcMiddle(i2, j) {
    return Math.floor((i2 + j) / 2);
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xCheck.js
  function xCheck(input, options = {}) {
    const { minLength } = options;
    if (!isAnyArray(input)) {
      throw new TypeError("input must be an array");
    }
    if (input.length === 0) {
      throw new TypeError("input must not be empty");
    }
    if (minLength && input.length < minLength) {
      throw new Error(`input must have a length of at least ${minLength}`);
    }
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xFindClosestIndex.js
  function xFindClosestIndex(array, target, options = {}) {
    const { sorted = true } = options;
    if (sorted) {
      let low = 0;
      let high = array.length - 1;
      let middle = 0;
      while (high - low > 1) {
        middle = low + (high - low >> 1);
        if (array[middle] < target) {
          low = middle;
        } else if (array[middle] > target) {
          high = middle;
        } else {
          return middle;
        }
      }
      if (low < array.length - 1) {
        if (Math.abs(target - array[low]) < Math.abs(array[low + 1] - target)) {
          return low;
        } else {
          return low + 1;
        }
      } else {
        return low;
      }
    } else {
      let index = 0;
      let diff = Number.POSITIVE_INFINITY;
      for (let i2 = 0; i2 < array.length; i2++) {
        const currentDiff = Math.abs(array[i2] - target);
        if (currentDiff < diff) {
          diff = currentDiff;
          index = i2;
        }
      }
      return index;
    }
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xGetFromToIndex.js
  function xGetFromToIndex(x2, options = {}) {
    let { fromIndex, toIndex, from, to } = options;
    if (fromIndex === void 0) {
      if (from !== void 0) {
        fromIndex = xFindClosestIndex(x2, from);
      } else {
        fromIndex = 0;
      }
    }
    if (toIndex === void 0) {
      if (to !== void 0) {
        toIndex = xFindClosestIndex(x2, to);
      } else {
        toIndex = x2.length - 1;
      }
    }
    if (fromIndex < 0)
      fromIndex = 0;
    if (toIndex < 0)
      toIndex = 0;
    if (fromIndex >= x2.length)
      fromIndex = x2.length - 1;
    if (toIndex >= x2.length)
      toIndex = x2.length - 1;
    if (fromIndex > toIndex)
      [fromIndex, toIndex] = [toIndex, fromIndex];
    return { fromIndex, toIndex };
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xMaxValue.js
  function xMaxValue(array, options = {}) {
    xCheck(array);
    const { fromIndex, toIndex } = xGetFromToIndex(array, options);
    let maxValue = array[fromIndex];
    for (let i2 = fromIndex + 1; i2 <= toIndex; i2++) {
      if (array[i2] > maxValue) {
        maxValue = array[i2];
      }
    }
    return maxValue;
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xMinValue.js
  function xMinValue(array, options = {}) {
    xCheck(array);
    const { fromIndex, toIndex } = xGetFromToIndex(array, options);
    let minValue = array[fromIndex];
    for (let i2 = fromIndex + 1; i2 <= toIndex; i2++) {
      if (array[i2] < minValue) {
        minValue = array[i2];
      }
    }
    return minValue;
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xIsEquallySpaced.js
  function xIsEquallySpaced(array, options = {}) {
    if (array.length < 3)
      return true;
    const { tolerance = 0.05 } = options;
    let maxDx = 0;
    let minDx = Number.MAX_SAFE_INTEGER;
    for (let i2 = 0; i2 < array.length - 1; ++i2) {
      let absoluteDifference = array[i2 + 1] - array[i2];
      if (absoluteDifference < minDx) {
        minDx = absoluteDifference;
      }
      if (absoluteDifference > maxDx) {
        maxDx = absoluteDifference;
      }
    }
    return (maxDx - minDx) / maxDx < tolerance;
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xIsMonotonic.js
  function xIsMonotonic(array) {
    if (array.length <= 2) {
      return 1;
    }
    if (array[0] === array[1]) {
      for (let i2 = 1; i2 < array.length - 1; i2++) {
        if (array[i2] !== array[i2 + 1])
          return 0;
      }
      return 1;
    }
    if (array[0] < array[array.length - 1]) {
      for (let i2 = 0; i2 < array.length - 1; i2++) {
        if (array[i2] >= array[i2 + 1])
          return 0;
      }
      return 1;
    } else {
      for (let i2 = 0; i2 < array.length - 1; i2++) {
        if (array[i2] <= array[i2 + 1])
          return 0;
      }
      return -1;
    }
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xMedianAbsoluteDeviation.js
  function xMedianAbsoluteDeviation(array) {
    const median = xMedian(array);
    const averageDeviations = new Float64Array(array.length);
    for (let i2 = 0; i2 < array.length; i2++) {
      averageDeviations[i2] = Math.abs(array[i2] - median);
    }
    return {
      median,
      mad: xMedian(averageDeviations)
    };
  }

  // node_modules/ml-spectra-processing/lib-esm/x/xNoiseStandardDeviation.js
  function xNoiseStandardDeviation(array) {
    const { mad, median } = xMedianAbsoluteDeviation(array);
    return { sd: mad / 0.6744897501960817, mad, median };
  }

  // node_modules/ml-xsadd/lib-es6/xsadd.js
  var FLOAT_MUL = 1 / 16777216;

  // node_modules/ml-gsd/lib-esm/utils/optimizeTop.js
  function optimizeTop(data, peaks) {
    const { x: x2, y: y2 } = data;
    for (const peak of peaks) {
      let currentIndex = peak.index;
      if (y2[currentIndex - 1] >= y2[currentIndex - 2] && y2[currentIndex - 1] >= y2[currentIndex]) {
        currentIndex--;
      } else if (y2[currentIndex + 1] >= y2[currentIndex] && y2[currentIndex + 1] >= y2[currentIndex + 2]) {
        currentIndex++;
      } else if (y2[currentIndex - 2] >= y2[currentIndex - 3] && y2[currentIndex - 2] >= y2[currentIndex - 1]) {
        currentIndex -= 2;
      } else if (y2[currentIndex + 2] >= y2[currentIndex + 1] && y2[currentIndex + 2] >= y2[currentIndex + 3]) {
        currentIndex += 2;
      }
      if (y2[currentIndex - 1] > 0 && y2[currentIndex + 1] > 0 && y2[currentIndex] >= y2[currentIndex - 1] && y2[currentIndex] >= y2[currentIndex + 1] && (y2[currentIndex] !== y2[currentIndex - 1] || y2[currentIndex] !== y2[currentIndex + 1])) {
        let alpha = 20 * Math.log10(y2[currentIndex - 1]);
        let beta = 20 * Math.log10(y2[currentIndex]);
        let gamma = 20 * Math.log10(y2[currentIndex + 1]);
        let p = 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
        peak.x = x2[currentIndex] + (x2[currentIndex] - x2[currentIndex - 1]) * p;
        peak.y = y2[currentIndex] - 0.25 * (y2[currentIndex - 1] - y2[currentIndex + 1]) * p;
      }
    }
  }

  // node_modules/ml-gsd/lib-esm/gsd.js
  function gsd(data, options = {}) {
    let { sgOptions = {
      windowSize: 9,
      polynomial: 3
    }, noiseLevel, smoothY = false, maxCriteria = true, minMaxRatio = 25e-5, realTopDetection = false } = options;
    let { x: x2, y: y2 } = data;
    if (xIsMonotonic(x2) !== 1) {
      throw new Error("GSD only accepts monotone increasing x values");
    }
    y2 = y2.slice();
    let equallySpaced = xIsEquallySpaced(x2);
    if (noiseLevel === void 0) {
      if (equallySpaced) {
        const noiseInfo = xNoiseStandardDeviation(y2);
        if (maxCriteria) {
          noiseLevel = noiseInfo.median + 1.5 * noiseInfo.sd;
        } else {
          noiseLevel = -noiseInfo.median + 1.5 * noiseInfo.sd;
        }
      } else {
        noiseLevel = 0;
      }
    } else if (!maxCriteria) {
      noiseLevel *= -1;
    }
    if (!maxCriteria) {
      for (let i2 = 0; i2 < y2.length; i2++) {
        y2[i2] *= -1;
      }
    }
    if (noiseLevel !== void 0) {
      for (let i2 = 0; i2 < y2.length; i2++) {
        if (y2[i2] < noiseLevel) {
          y2[i2] = noiseLevel;
        }
      }
    }
    let yData = y2;
    let dY, ddY;
    const { windowSize, polynomial } = sgOptions;
    if (equallySpaced) {
      if (smoothY) {
        yData = sgg(y2, x2[1] - x2[0], {
          windowSize,
          polynomial,
          derivative: 0
        });
      }
      dY = sgg(y2, x2[1] - x2[0], {
        windowSize,
        polynomial,
        derivative: 1
      });
      ddY = sgg(y2, x2[1] - x2[0], {
        windowSize,
        polynomial,
        derivative: 2
      });
    } else {
      if (smoothY) {
        yData = sgg(y2, x2, {
          windowSize,
          polynomial,
          derivative: 0
        });
      }
      dY = sgg(y2, x2, {
        windowSize,
        polynomial,
        derivative: 1
      });
      ddY = sgg(y2, x2, {
        windowSize,
        polynomial,
        derivative: 2
      });
    }
    const minY = xMinValue(yData);
    const maxY = xMaxValue(yData);
    if (minY > maxY || minY === maxY)
      return [];
    const yThreshold = minY + (maxY - minY) * minMaxRatio;
    const dX = x2[1] - x2[0];
    let lastMax = null;
    let lastMin = null;
    let minddY = [];
    let intervalL = [];
    let intervalR = [];
    for (let i2 = 1; i2 < yData.length - 1; ++i2) {
      if (dY[i2] < dY[i2 - 1] && dY[i2] <= dY[i2 + 1] || dY[i2] <= dY[i2 - 1] && dY[i2] < dY[i2 + 1]) {
        lastMin = {
          x: x2[i2],
          index: i2
        };
        if (dX > 0 && lastMax !== null) {
          intervalL.push(lastMax);
          intervalR.push(lastMin);
        }
      }
      if (dY[i2] >= dY[i2 - 1] && dY[i2] > dY[i2 + 1] || dY[i2] > dY[i2 - 1] && dY[i2] >= dY[i2 + 1]) {
        lastMax = {
          x: x2[i2],
          index: i2
        };
        if (dX < 0 && lastMin !== null) {
          intervalL.push(lastMax);
          intervalR.push(lastMin);
        }
      }
      if (ddY[i2] < ddY[i2 - 1] && ddY[i2] < ddY[i2 + 1]) {
        minddY.push(i2);
      }
    }
    let lastK = -1;
    const peaks = [];
    for (const minddYIndex of minddY) {
      let deltaX = x2[minddYIndex];
      let possible = -1;
      let k = lastK + 1;
      let minDistance = Number.POSITIVE_INFINITY;
      let currentDistance = 0;
      while (possible === -1 && k < intervalL.length) {
        currentDistance = Math.abs(deltaX - (intervalL[k].x + intervalR[k].x) / 2);
        if (currentDistance < (intervalR[k].x - intervalL[k].x) / 2) {
          possible = k;
          lastK = k;
        }
        ++k;
        if (currentDistance >= minDistance) {
          break;
        }
        minDistance = currentDistance;
      }
      if (possible !== -1) {
        if (yData[minddYIndex] > yThreshold) {
          let width = Math.abs(intervalR[possible].x - intervalL[possible].x);
          peaks.push({
            id: v4(),
            x: deltaX,
            y: yData[minddYIndex],
            width,
            index: minddYIndex,
            ddY: ddY[minddYIndex],
            inflectionPoints: {
              from: intervalL[possible],
              to: intervalR[possible]
            }
          });
        }
      }
    }
    if (realTopDetection) {
      optimizeTop({ x: x2, y: yData }, peaks);
    }
    peaks.forEach((peak) => {
      if (!maxCriteria) {
        peak.y *= -1;
        peak.ddY = peak.ddY * -1;
      }
    });
    peaks.sort((a, b) => {
      return a.x - b.x;
    });
    return peaks;
  }

  // node_modules/ml-peak-shape-generator/lib-esm/util/constants.js
  var GAUSSIAN_EXP_FACTOR = -4 * Math.LN2;
  var ROOT_PI_OVER_LN2 = Math.sqrt(Math.PI / Math.LN2);
  var ROOT_THREE = Math.sqrt(3);
  var ROOT_2LN2 = Math.sqrt(2 * Math.LN2);
  var ROOT_2LN2_MINUS_ONE = Math.sqrt(2 * Math.LN2) - 1;

  // node_modules/ml-gsd/lib-esm/utils/addMissingShape.js
  var { parse, stringify } = JSON;

  // node_modules/ml-gsd/lib-esm/utils/addMissingIDs.js
  var { parse: parse2, stringify: stringify2 } = JSON;

  // node_modules/ml-gsd/lib-esm/utils/setShape.js
  var { parse: parse3, stringify: stringify3 } = JSON;

  // javascript/custom/softypo.js
  window.generateID = v4;
  var softypo = softypo || {};
  softypo.peakfinder = function() {
    function run_peaks() {
      var peakalgo = document.getElementById("peak-algo").value;
      var minPeakDistance = parseFloat(document.getElementById("min-peak-distance").value);
      var maxCriteria = document.getElementById("criteria").value == "valleys" ? false : true;
      var peakson = document.getElementById("peaks-on").value;
      var minPeakHeight = parseFloat(document.getElementById("min-peak-height").value);
      var minMaxRatio = parseFloat(document.getElementById("minMaxRatio").value);
      var windowSize = parseInt(document.getElementById("win-size").value);
      var degree = parseInt(document.getElementById("degree").value);
      var realTopDetection = document.getElementById("top").value == "no" ? false : true;
      var smooth = document.getElementById("smooth").value == "no" ? false : true;
      var pixeldataset = wpd.tree.getActiveDataset();
      wpd.plotDataProvider.setDataSource(pixeldataset);
      window.bckdts = window.peaksflag != pixeldataset.id ? Object.assign({}, wpd.plotDataProvider.getData()) : window.bckdts;
      window.peaksflag = pixeldataset.id;
      var rawdataset = window.bckdts.rawData.slice(0);
      rawdataset = dropdupsort(rawdataset, peakson);
      if (peakson == "X") {
        var ref = rawdataset.map((x2) => x2[1]);
        var sig = rawdataset.map((x2) => x2[0]);
      } else {
        var ref = rawdataset.map((x2) => x2[0]);
        var sig = rawdataset.map((x2) => x2[1]);
      }
      if (peakalgo == "Local Maxima") {
        var peaks = maxCriteria == true ? findPeaks(ref, sig, minPeakHeight) : findValleys(ref, sig, minPeakHeight);
      } else if (peakalgo == "Savitzky-Golay") {
        var peaks = gsd({ x: ref, y: sig }, {
          minMaxRatio,
          // Threshold to determine if a given peak should be considered as a noise
          realTopDetection,
          // Correction of the x and y coordinates using a quadratic optimizations
          maxCriteria,
          // Are we looking for maxima or minima
          smoothY: smooth,
          // should we smooth the spectra and return smoothed peaks ? Default false.
          sgOptions: { windowSize, polynomial: degree }
          // Savitzky-Golay smoothing parameters for first and second derivative calculation
        });
      }
      peaks = distancefilter(peaks, minPeakDistance);
      if (peakson == "X") {
        x = peaks.map(({ y: y2 }) => y2);
        y = peaks.map(({ x: x2 }) => x2);
      } else {
        x = peaks.map(({ x: x2 }) => x2);
        y = peaks.map(({ y: y2 }) => y2);
      }
      pixeldataset.clearAll();
      for (i = 0; i < peaks.length; i++) {
        addDataPoint(x[i], y[i]);
      }
      pixeldataset.peaksOn = peakson;
      wpd.graphicsWidget.forceHandlerRepaint();
      wpd.dataPointCounter.setCount(peaks.length);
    }
    function findPeaks(x2, y2, minPeakHeight) {
      if (!Array.isArray(y2) || y2.length === 0) {
        return [];
      }
      const filteredArr = [];
      const lastindex = y2.length - 1;
      for (let i2 = 1; i2 < lastindex; i2++) {
        if (y2[i2] > y2[i2 - 1] && // Check if higher than left neighbor
        y2[i2] >= y2[i2 + 1] && // Check if higher than right neighbor
        y2[i2] >= minPeakHeight) {
          let leftIndex = i2;
          while (leftIndex > 0 && y2[leftIndex - 1] <= y2[leftIndex]) {
            leftIndex--;
          }
          let rightIndex = i2;
          while (rightIndex < lastindex && y2[rightIndex + 1] <= y2[rightIndex]) {
            rightIndex++;
          }
          const peakWidth = Math.max(x2[rightIndex], x2[leftIndex]) - Math.min(x2[rightIndex], x2[leftIndex]);
          filteredArr.push({ index: i2, x: x2[i2], y: y2[i2], width: peakWidth });
        }
      }
      return filteredArr;
    }
    function findValleys(x2, y2, minPeakHeight) {
      if (!Array.isArray(y2) || y2.length === 0) {
        return [];
      }
      const filteredArr = [];
      const lastindex = y2.length - 1;
      for (let i2 = 1; i2 < lastindex; i2++) {
        if (y2[i2] < y2[i2 - 1] && // Check if higher than left neighbor
        y2[i2] <= y2[i2 + 1] && // Check if higher than right neighbor
        y2[i2] <= minPeakHeight) {
          let leftIndex = i2;
          while (leftIndex < 0 && y2[leftIndex - 1] >= y2[leftIndex]) {
            leftIndex--;
          }
          let rightIndex = i2;
          while (rightIndex < lastindex && y2[rightIndex + 1] >= y2[rightIndex]) {
            rightIndex++;
          }
          const peakWidth = Math.max(x2[rightIndex], x2[leftIndex]) - Math.min(x2[rightIndex], x2[leftIndex]);
          filteredArr.push({ index: i2, x: x2[i2], y: y2[i2], width: peakWidth });
        }
      }
      return filteredArr;
    }
    function distancefilter(inputArray, minPeakDistance) {
      if (!Array.isArray(inputArray) || inputArray.length === 0) {
        return [];
      }
      const filteredArr = [inputArray[0]];
      for (let i2 = 1; i2 < inputArray.length; i2++) {
        const currentX = inputArray[i2].x;
        const prevX = filteredArr[filteredArr.length - 1].x;
        if (currentX - prevX >= minPeakDistance) {
          filteredArr.push(inputArray[i2]);
        }
      }
      return filteredArr;
    }
    function addDataPoint(x2, y2) {
      let dataset = wpd.tree.getActiveDataset();
      let axes = wpd.appData.getPlotData().getAxesForDataset(dataset);
      let dataPx = axes.dataToPixel(x2, y2);
      dataset.addPixel(dataPx.x, dataPx.y);
    }
    function dropdupsort(arr, key) {
      const seen = /* @__PURE__ */ new Set();
      const result = [];
      for (const item of arr) {
        const value = key === "Y" ? item[0] : item[1];
        if (!seen.has(value)) {
          result.push(item);
          seen.add(value);
        }
      }
      result.sort((a, b) => key === "Y" ? a[0] - b[0] : a[1] - b[1]);
      return result;
    }
    return {
      run_peaks
    };
  }();
  softypo.listeners = function() {
    function w_updateSliderLabel(value) {
      const w_slider = document.getElementById("win-slider");
      const w_sliderLabel = document.getElementById("win-size");
      if (value) {
        w_slider.value = value;
        w_sliderLabel.value = value;
      } else {
        const dlenght = wpd.tree.getActiveDataset()._dataPoints.length > 1 ? wpd.tree.getActiveDataset()._dataPoints.length : 200;
        const maxrange = dlenght < 1e4 ? 625 : dlenght > 1e4 ? parseInt(dlenght / 16) : dlenght > 1e3 ? parseInt(dlenght / 4) : dlenght > 100 ? parseInt(dlenght / 2) : parseInt(dlenght - 1);
        const step2 = dlenght > 1e3 ? 4 : 2;
        w_slider.min = 5;
        w_slider.max = maxrange;
        w_slider.step = step2;
      }
    }
    function w_updateSliderFromInput() {
      const w_sliderLabel = document.getElementById("win-size");
      let w_newvalue = parseInt(w_sliderLabel.value);
      if (isNaN(w_newvalue) || w_newvalue < 5) {
        w_newvalue = 5;
      } else if (w_newvalue % 2 === 0) {
        w_newvalue--;
      }
      const w_slider = document.getElementById("win-slider");
      w_slider.value = w_newvalue;
      w_sliderLabel.value = w_newvalue;
    }
    function w_initSlider() {
      const w_slider = document.getElementById("win-slider");
      const w_sliderLabel = document.getElementById("win-size");
      w_slider.min = 5;
      w_slider.max = 200;
      w_slider.step = 2;
      w_slider.addEventListener("input", () => {
        softypo.listeners.w_updateSliderLabel(w_slider.value);
      });
      w_sliderLabel.addEventListener("input", () => {
        softypo.listeners.w_updateSliderFromInput();
      });
      softypo.listeners.w_updateSliderLabel(w_slider.value);
    }
    function d_updateSliderLabel(value) {
      const d_slider = document.getElementById("deg-slider");
      d_slider.value = value;
      const d_sliderLabel = document.getElementById("degree");
      d_sliderLabel.value = value;
    }
    function d_updateSliderFromInput() {
      const d_sliderLabel = document.getElementById("degree");
      let d_newvalue = parseInt(d_sliderLabel.value);
      if (isNaN(d_newvalue) || d_newvalue < 2) {
        d_newvalue = 2;
      } else if (d_newvalue > 5) {
        d_newvalue = 5;
      }
      const d_slider = document.getElementById("deg-slider");
      d_slider.value = d_newvalue;
      d_sliderLabel.value = d_newvalue;
    }
    function d_initSlider() {
      const d_slider = document.getElementById("deg-slider");
      const d_sliderLabel = document.getElementById("degree");
      d_slider.min = 2;
      d_slider.max = 5;
      d_slider.step = 1;
      d_slider.addEventListener("input", () => {
        softypo.listeners.d_updateSliderLabel(d_slider.value);
      });
      d_sliderLabel.addEventListener("input", () => {
        softypo.listeners.d_updateSliderFromInput();
      });
      softypo.listeners.d_updateSliderLabel(d_slider.value);
    }
    function showgsd() {
      document.getElementById("peak-algo").addEventListener("change", function() {
        if (this.value == "Local Maxima") {
          document.getElementById("gsdparams").hidden = true;
          document.getElementById("lmparams").hidden = false;
        } else if (this.value == "Savitzky-Golay") {
          document.getElementById("gsdparams").hidden = false;
          document.getElementById("lmparams").hidden = true;
        }
      });
    }
    return {
      showgsd,
      w_updateSliderLabel,
      w_updateSliderFromInput,
      w_initSlider,
      d_updateSliderLabel,
      d_updateSliderFromInput,
      d_initSlider
    };
  }();
  softypo.onepager = function() {
    function run() {
      wpd.busyNote.show();
      pagemanager = wpd.appData.getPageManager();
      const startPage = parseInt(document.getElementById("min-page").value);
      const endPage = parseInt(document.getElementById("max-page").value);
      const scale = parseFloat(document.getElementById("scale-page").value);
      convertPdfToPng(startPage, endPage, scale).then((pngDataUrl) => {
        console.log("PDF converted to PNG successfully");
        wpd.messagePopup.show("Turn 1pager", 'Check your "Downloads" folder for a file called "stacked_pages.png"');
        const downloadLink = document.createElement("a");
        downloadLink.href = pngDataUrl;
        downloadLink.download = "stacked_pages.png";
        downloadLink.click();
        wpd.busyNote.close();
      }).catch((error) => {
        wpd.busyNote.close();
        wpd.messagePopup.show("Turn 1pager", "Error converting PDF to PNG");
        console.error("Error converting PDF to PNG:", error);
      });
    }
    async function convertPdfToPng(startPage, endPage, scale) {
      const pdfData = await wpd.appData.getFileManager().files[0].arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let currentY = 0;
      let totalHeight = 0;
      for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        totalHeight += viewport.height;
      }
      if (totalHeight > 32700) {
        scale = 32700 * scale / totalHeight;
        totalHeight = 0;
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });
          totalHeight += viewport.height;
        }
      }
      const pageWidth = await pdf.getPage(startPage).then((page) => page.getViewport({ scale }).width);
      console.log("scale: ", scale);
      canvas.width = pageWidth;
      canvas.height = totalHeight;
      for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        const canvasPage = document.createElement("canvas");
        const ctxPage = canvasPage.getContext("2d");
        canvasPage.width = viewport.width;
        canvasPage.height = viewport.height;
        await page.render({ canvasContext: ctxPage, viewport }).promise;
        ctx.drawImage(canvasPage, 0, currentY);
        currentY += viewport.height;
      }
      const pngDataUrl = canvas.toDataURL("image/png");
      return pngDataUrl;
    }
    return {
      run
    };
  }();
  window.softypo = softypo;
  window.onload = function() {
    softypo.listeners.showgsd();
    softypo.listeners.d_initSlider();
    softypo.listeners.w_initSlider();
  };
})();
