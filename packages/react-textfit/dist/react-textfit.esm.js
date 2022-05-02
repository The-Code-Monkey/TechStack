import process from 'process';

import PropTypes from 'prop-types';
import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// Calculate height without padding.
function innerHeight(el) {
  var style = window.getComputedStyle(el, null); // Hidden iframe in Firefox returns null, https://github.com/malte-wessel/react-textfit/pull/34

  if (!style) return el.clientHeight;
  return el.clientHeight - parseInt(style.getPropertyValue('padding-top'), 10) - parseInt(style.getPropertyValue('padding-bottom'), 10);
} // Calculate width without padding.

function innerWidth(el) {
  var style = window.getComputedStyle(el, null); // Hidden iframe in Firefox returns null, https://github.com/malte-wessel/react-textfit/pull/34

  if (!style) return el.clientWidth;
  return el.clientWidth - parseInt(style.getPropertyValue('padding-left'), 10) - parseInt(style.getPropertyValue('padding-right'), 10);
}

/**
 * Run the functions in the tasks array in series, each one running once the previous function has completed.
 * If any functions in the series pass an error to its callback, no more functions are run,
 * and callback is immediately called with the value of the error. Otherwise, callback receives an array of results
 * when tasks have completed.
 * Taken from https://github.com/feross/run-series
 *
 * @params {Array} tasks An array containing functions to run, each function is passed a callback(err, result) which it must call on completion with an error err (which can be null) and an optional result value.
 * @params {Function} callback(err, results) - An optional callback to run once all the functions have completed. This function gets a results array containing all the result arguments passed to the task callbacks.
 */
function series(tasks, cb) {
  var results = [];
  var current = 0;
  var isSync = true;

  function done(err) {
    function end() {
      if (cb) cb(err, results);
    }

    if (isSync) process.nextTick(end);else end();
  }

  function each(err, result) {
    results.push(result);
    if (++current >= tasks.length || err) done(err);else tasks[current](each);
  }

  if (tasks.length > 0) tasks[0](each);else done(null);
  isSync = false;
}

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var hasOwn = Object.prototype.hasOwnProperty;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * Taken from https://github.com/component/throttle v1.0.0
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */
function throttle(func, wait) {
  var ctx;
  var args;
  var rtn;
  var timeoutID;
  var last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date().getMilliseconds();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled(context) {
    ctx = context; // eslint-disable-next-line

    args = arguments;
    var delta = new Date().getMilliseconds() - last;

    if (!timeoutID) {
      if (delta >= wait) call();else timeoutID = setTimeout(call, wait - delta);
    }

    return rtn;
  };
}

var uid = 0;
function uniqueId() {
  return uid++;
}

var noop$1 = function noop() {};
/**
 * Repeatedly call fn, while test returns true. Calls callback when stopped, or an error occurs.
 *
 * @param {Function} test Synchronous truth test to perform before each execution of fn.
 * @param {Function} fn A function which is called each time test passes. The function is passed a callback(err), which must be called once it has completed with an optional err argument.
 * @param {Function} callback A callback which is called after the test fails and repeated execution of fn has stopped.
 */


function whilst(test, iterator, callback) {
  if (callback === void 0) {
    callback = noop$1;
  }

  if (test()) {
    iterator(function next(err) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (err) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        callback(err);
      } else if (test.apply(this, args)) {
        iterator(next);
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        callback(null);
      }
    });
  } else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    callback(null);
  }
}

var _excluded = ["children", "text", "style", "min", "max", "mode", "forceWidth", "forceSingleModeWidth", "throttle", "autoResize", "onReady"];

function assertElementFitsWidth(el, width) {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollWidth - 1 <= width;
}

function assertElementFitsHeight(el, height) {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollHeight - 1 <= height;
}

function noop() {}

var TextFit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TextFit, _React$Component);

  function TextFit(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this._child = void 0;
    _this._parent = void 0;
    _this.pid = void 0;
    _this.state = {
      fontSize: null,
      ready: false
    };

    _this.handleWindowResize = function () {
      _this.process();
    };

    if ('perfectFit' in props) {
      console.warn('TextFit property perfectFit has been removed.');
    }

    _this.handleWindowResize = throttle(_this.handleWindowResize, props.throttle);
    return _this;
  }

  var _proto = TextFit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var autoResize = this.props.autoResize;

    if (autoResize) {
      window.addEventListener('resize', this.handleWindowResize);
    }

    this.process();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var ready = this.state.ready;
    if (!ready) return;
    if (shallowEqual(this.props, prevProps)) return;
    this.process();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'autoResize' does not exist on type 'Read... Remove this comment to see the full error message
    var autoResize = this.props.autoResize;

    if (autoResize) {
      window.removeEventListener('resize', this.handleWindowResize);
    } // Setting a new pid will cancel all running processes


    this.pid = uniqueId();
  };

  _proto.process = function process() {
    var _this2 = this;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'min' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
    var _this$props = this.props,
        min = _this$props.min,
        max = _this$props.max,
        mode = _this$props.mode,
        forceSingleModeWidth = _this$props.forceSingleModeWidth,
        onReady = _this$props.onReady;
    var el = this._parent;
    var wrapper = this._child;
    var originalWidth = innerWidth(el);
    var originalHeight = innerHeight(el);

    if (originalHeight <= 0 || isNaN(originalHeight)) {
      console.warn('Can not process element without height. Make sure the element is displayed and has a static height.');
      return;
    }

    if (originalWidth <= 0 || isNaN(originalWidth)) {
      console.warn('Can not process element without width. Make sure the element is displayed and has a static width.');
      return;
    }

    var pid = uniqueId();
    this.pid = pid;

    var shouldCancelProcess = function shouldCancelProcess() {
      return pid !== _this2.pid;
    };

    var testPrimary = mode === 'multi' ? function () {
      return assertElementFitsHeight(wrapper, originalHeight);
    } : function () {
      return assertElementFitsWidth(wrapper, originalWidth);
    };
    var testSecondary = mode === 'multi' ? function () {
      return assertElementFitsWidth(wrapper, originalWidth);
    } : function () {
      return assertElementFitsHeight(wrapper, originalHeight);
    };
    var mid;
    var low = min;
    var high = max;
    this.setState({
      ready: false
    });
    series([// Step 1:
    // Binary search to fit the element's height (multi line) / width (single line)
    function (stepCallback) {
      return whilst(function () {
        return low <= high;
      }, function (whilstCallback) {
        if (shouldCancelProcess()) return whilstCallback(true); // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message

        mid = parseInt((low + high) / 2, 10);

        _this2.setState({
          fontSize: mid
        }, function () {
          if (shouldCancelProcess()) return whilstCallback(true);
          if (testPrimary()) low = mid + 1;else high = mid - 1;
          return whilstCallback();
        });
      }, stepCallback);
    }, // Step 2:
    // Binary search to fit the element's width (multi line) / height (single line)
    // If mode is single and forceSingleModeWidth is true, skip this step
    // in order to not fit the elements height and decrease the width
    function (stepCallback) {
      if (mode === 'single' && forceSingleModeWidth) return stepCallback();
      if (testSecondary()) return stepCallback();
      low = min;
      high = mid;
      return whilst(function () {
        return low < high;
      }, function (whilstCallback) {
        if (shouldCancelProcess()) return whilstCallback(true); // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message

        mid = parseInt((low + high) / 2, 10);

        _this2.setState({
          fontSize: mid
        }, function () {
          if (pid !== _this2.pid) return whilstCallback(true);
          if (testSecondary()) low = mid + 1;else high = mid - 1;
          return whilstCallback();
        });
      }, stepCallback);
    }, // Step 3
    // Limits
    function (stepCallback) {
      // We break the previous loop without updating mid for the final time,
      // so we do it here:
      mid = Math.min(low, high); // Ensure we hit the user-supplied limits

      mid = Math.max(mid, min);
      mid = Math.min(mid, max); // Sanity check:

      mid = Math.max(mid, 0);
      if (shouldCancelProcess()) return stepCallback(true);

      _this2.setState({
        fontSize: mid
      }, stepCallback);
    }], function (err) {
      // err will be true, if another process was triggered
      if (err || shouldCancelProcess()) return;

      _this2.setState({
        ready: true
      }, function () {
        return onReady(mid);
      });
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        text = _this$props2.text,
        style = _this$props2.style,
        mode = _this$props2.mode,
        props = _objectWithoutPropertiesLoose(_this$props2, _excluded);

    var _this$state = this.state,
        fontSize = _this$state.fontSize,
        ready = _this$state.ready;

    var finalStyle = _extends({}, style, {
      fontSize: fontSize
    });

    var wrapperStyle = {
      display: ready ? 'block' : 'inline-block'
    }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'whiteSpace' does not exist on type '{ di... Remove this comment to see the full error message

    if (mode === 'single') wrapperStyle.whiteSpace = 'nowrap';
    return React.createElement("div", _extends({
      ref: function ref(c) {
        return _this3._parent = c;
      },
      style: finalStyle
    }, props), React.createElement("div", {
      ref: function ref(c) {
        return _this3._child = c;
      },
      style: wrapperStyle
    }, text && typeof children === 'function' ? ready ? children(text) : text : children));
  };

  return TextFit;
}(React.Component);

TextFit.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  mode: /*#__PURE__*/PropTypes.oneOf(['single', 'multi']),
  forceSingleModeWidth: PropTypes.bool,
  throttle: PropTypes.number,
  onReady: PropTypes.func,
  autoResize: PropTypes.bool,
  style: PropTypes.object,
  forceWidth: PropTypes.bool
};
TextFit.defaultProps = {
  min: 1,
  max: 100,
  mode: 'multi',
  forceSingleModeWidth: true,
  throttle: 50,
  autoResize: true,
  onReady: noop
};

export { TextFit as Textfit, TextFit as default };
//# sourceMappingURL=react-textfit.esm.js.map
