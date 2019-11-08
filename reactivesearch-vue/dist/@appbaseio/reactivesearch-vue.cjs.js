'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var configureStore = require('@appbaseio/reactivecore');
var configureStore__default = _interopDefault(configureStore);
var VueTypes = _interopDefault(require('vue-types'));
var emotion = require('emotion');
var styled = require('@appbaseio/vue-emotion');
var styled__default = _interopDefault(styled);
var polished = require('polished');
var redux = require('redux');
var Appbase = _interopDefault(require('appbase-js'));
require('url-search-params-polyfill');
var computeScrollIntoView = _interopDefault(require('compute-scroll-into-view'));
var Highlight = _interopDefault(require('vue-highlight-words'));
var helper = require('@appbaseio/reactivecore/lib/utils/helper');
var _mergeJSXProps = _interopDefault(require('@vue/babel-helper-vue-jsx-merge-props'));
var NoSSR = _interopDefault(require('vue-no-ssr'));

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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: inline-flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-radius: 3px;\n\tborder: 1px solid transparent;\n\tmin-height: 30px;\n\tword-wrap: break-word;\n\tpadding: 5px 12px;\n\tline-height: 1.2rem;\n\tbackground-color: ", ";\n\tcolor: ", ";\n\tcursor: pointer;\n\tuser-select: none;\n\ttransition: all 0.3s ease;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n\n\t&:focus {\n\t\toutline: 0;\n\t\tborder-color: ", ";\n\t\tbox-shadow: ", ";\n\t}\n\n\t", ";\n\t", ";\n\t", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: #ccc;\n\tcursor: not-allowed;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n\tmin-height: 40px;\n\tpadding: 10px 20px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: ", ";\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -5px;\n\ta {\n\t\tmargin: 5px;\n\t}\n\tspan {\n\t\tmargin: 0 5px;\n\t}\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -3px;\n\tmax-width: 100%;\n\n\ta {\n\t\tmargin: 3px 3px;\n\t}\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 10px -3px;\n\tmax-width: 100%;\n\ttext-align: center;\n\n\ta {\n\t\tmargin: 0 3px;\n\t}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 -3px;\n\tmax-width: 100%;\n\n\ta {\n\t\tmargin: 2px 3px;\n\t\tpadding: 5px 8px;\n\t\tfont-size: 0.85rem;\n\t\tposition: relative;\n\n\t\tspan:first-child {\n\t\t\tmax-width: 260px;\n\t\t\twhite-space: nowrap;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t\tmargin-right: 26px;\n\t\t}\n\n\t\tspan:last-child {\n\t\t\tdisplay: flex;\n\t\t\theight: 100%;\n\t\t\ttop: 0;\n\t\t\tright: 8px;\n\t\t\tposition: absolute;\n\t\t\talign-items: center;\n\t\t\tborder-left: 1px solid ", ";\n\t\t\tpadding-left: 8px;\n\t\t\tmargin-left: 8px;\n\t\t}\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tspan:first-child {\n\t\t\t\ttext-decoration: line-through;\n\t\t\t}\n\t\t}\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var filters = function filters(_ref) {
  var borderColor = _ref.colors.borderColor;
  return emotion.css(_templateObject(), borderColor || '#fff');
};

var pagination = emotion.css(_templateObject2());
var toggleButtons = emotion.css(_templateObject3());
var numberBoxContainer = emotion.css(_templateObject4());

var primary = function primary(_ref2) {
  var theme = _ref2.theme;
  return emotion.css(_templateObject5(), theme.colors.primaryColor, theme.colors.primaryTextColor, polished.darken(0.1, theme.colors.primaryColor));
};

var large = function large() {
  return emotion.css(_templateObject6());
};

var disabled = function disabled(_ref3) {
  var theme = _ref3.theme;
  return emotion.css(_templateObject7(), theme.colors.backgroundColor ? polished.lighten(0.1, theme.colors.backgroundColor) : '#fafafa', theme.colors.backgroundColor ? polished.lighten(0.2, theme.colors.backgroundColor) : '#fafafa');
};

var Button = styled__default('a')(_templateObject8(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.backgroundColor || '#eee';
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.colors.textColor;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.colors.backgroundColor ? polished.darken(0.1, theme.colors.backgroundColor) : '#ccc';
}, function (_ref7) {
  var theme = _ref7.theme;
  return polished.rgba(theme.colors.primaryColor, 0.6);
}, function (_ref8) {
  var theme = _ref8.theme;
  return "0 0 0 2px " + polished.rgba(theme.colors.primaryColor, 0.3);
}, function (props) {
  return props.primary ? primary : null;
}, function (props) {
  return props.disabled ? disabled : null;
}, function (props) {
  return props.large && large;
});
var loadMoreContainer = emotion.css({
  margin: '5px 0',
  display: 'flex',
  justifyContent: 'center'
});

var _types;

VueTypes.sensibleDefaults = false;
var reactKeyType = VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string), VueTypes.object, VueTypes.arrayOf(VueTypes.object)]);

function validateLocation(props, propName) {
  // eslint-disable-next-line
  if (isNaN(props[propName])) {
    return new Error(propName + " value must be a VueTypes.number");
  }

  if (propName === 'lat' && (props[propName] < -90 || props[propName] > 90)) {
    return new Error(propName + " value should be between -90 and 90.");
  }

  if (propName === 'lng' && (props[propName] < -180 || props[propName] > 180)) {
    return new Error(propName + " value should be between -180 and 180.");
  }

  return null;
}

var types = (_types = {
  any: VueTypes.any,
  bool: VueTypes.bool,
  boolRequired: VueTypes.bool.isRequired,
  components: VueTypes.arrayOf(VueTypes.string),
  children: VueTypes.any,
  data: VueTypes.arrayOf(VueTypes.object),
  dataFieldArray: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]).isRequired,
  dataNumberBox: VueTypes.shape({
    label: VueTypes.string,
    start: VueTypes.number.isRequired,
    end: VueTypes.number.isRequired
  }).isRequired,
  date: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]),
  dateObject: VueTypes.object,
  excludeFields: VueTypes.arrayOf(VueTypes.string),
  fieldWeights: VueTypes.arrayOf(VueTypes.number),
  filterLabel: VueTypes.string,
  func: VueTypes.func,
  funcRequired: VueTypes.func.isRequired,
  fuzziness: VueTypes.oneOf([0, 1, 2, 'AUTO']),
  headers: VueTypes.object,
  hits: VueTypes.arrayOf(VueTypes.object),
  iconPosition: VueTypes.oneOf(['left', 'right']),
  includeFields: VueTypes.arrayOf(VueTypes.string),
  labelPosition: VueTypes.oneOf(['left', 'right', 'top', 'bottom']),
  number: VueTypes.number,
  options: VueTypes.oneOfType([VueTypes.arrayOf(VueTypes.object), VueTypes.object]),
  paginationAt: VueTypes.oneOf(['top', 'bottom', 'both']),
  range: VueTypes.shape({
    start: VueTypes.number.isRequired,
    end: VueTypes.number.isRequired
  }),
  rangeLabels: VueTypes.shape({
    start: VueTypes.string.isRequired,
    end: VueTypes.string.isRequired
  }),
  react: VueTypes.shape({
    and: reactKeyType,
    or: reactKeyType,
    not: reactKeyType
  }),
  selectedValues: VueTypes.object,
  selectedValue: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string), VueTypes.arrayOf(VueTypes.object), VueTypes.object, Number, VueTypes.arrayOf(Number)]),
  suggestions: VueTypes.arrayOf(VueTypes.object),
  supportedOrientations: VueTypes.oneOf(['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']),
  sortBy: VueTypes.oneOf(['asc', 'desc']),
  sortOptions: VueTypes.arrayOf(VueTypes.shape({
    label: VueTypes.string,
    dataField: VueTypes.string,
    sortBy: VueTypes.string
  })),
  sortByWithCount: VueTypes.oneOf(['asc', 'desc', 'count']),
  stats: VueTypes.arrayOf(VueTypes.object),
  string: VueTypes.string,
  stringArray: VueTypes.arrayOf(VueTypes.string),
  stringOrArray: VueTypes.oneOfType([VueTypes.string, VueTypes.arrayOf(VueTypes.string)]),
  stringRequired: VueTypes.string.isRequired,
  style: VueTypes.object,
  themePreset: VueTypes.oneOf(['light', 'dark']),
  // queryFormatDate: VueTypes.oneOf(VueTypes.object.keys(dateFormats)),
  queryFormatSearch: VueTypes.oneOf(['and', 'or']),
  queryFormatNumberBox: VueTypes.oneOf(['exact', 'lte', 'gte']),
  params: VueTypes.object.isRequired,
  props: VueTypes.object
}, _types["rangeLabels"] = VueTypes.shape({
  start: VueTypes.string,
  end: VueTypes.string
}), _types.rangeLabelsAlign = VueTypes.oneOf(['left', 'right']), _types.title = VueTypes.oneOfType([VueTypes.string, VueTypes.any]), _types.tooltipTrigger = VueTypes.oneOf(['always', 'none', 'hover']), _types.location = VueTypes.shape({
  lat: validateLocation,
  lng: validateLocation
}), _types.unit = VueTypes.oneOf(['mi', 'miles', 'yd', 'yards', 'ft', 'feet', 'in', 'inch', 'km', 'kilometers', 'm', 'meters', 'cm', 'centimeters', 'mm', 'millimeters', 'NM', 'nmi', 'nauticalmiles']), _types.value = VueTypes.string.def(undefined), _types);

var getClassName = configureStore.helper.getClassName,
    handleA11yAction = configureStore.helper.handleA11yAction;

function getStartPage(totalPages, currentPage, showEndPage) {
  var midValue = parseInt(totalPages / 2, 10);
  var start = currentPage - (showEndPage ? Math.ceil(midValue / 2) - 1 : midValue);
  return start > 1 ? start : 2;
}

var Pagination = {
  name: 'Pagination',
  functional: true,
  props: {
    currentPage: types.number,
    innerClass: types.style,
    pages: types.number,
    setPage: types.func,
    totalPages: types.number,
    showEndPage: types.bool
  },
  render: function render(createElement, context) {
    var h = arguments[0];
    var props = context.props;

    var onPrevPage = function onPrevPage() {
      if (props.currentPage) {
        props.setPage(props.currentPage - 1);
      }
    };

    var onNextPage = function onNextPage() {
      if (props.currentPage < props.totalPages - 1) {
        props.setPage(props.currentPage + 1);
      }
    };

    if (!props.totalPages) {
      return null;
    }

    var innerClassName = getClassName(props.innerClass, 'button');
    var primary = props.currentPage === 0;
    var className = innerClassName || primary ? innerClassName + " " + (primary ? 'active' : '') : '';

    var buildPaginationDOM = function buildPaginationDOM(position) {
      var pages = props.pages,
          currentPage = props.currentPage,
          totalPages = props.totalPages,
          setPage = props.setPage,
          showEndPage = props.showEndPage;
      var start = position === 'start' ? getStartPage(pages, currentPage, showEndPage) : Math.ceil(totalPages - (pages - 1) / 2) + 1;
      var paginationButtons = [];

      if (start <= totalPages) {
        var totalPagesToShow = pages < totalPages ? start + (pages - 1) : totalPages + 1;

        if (showEndPage) {
          totalPagesToShow = position === 'start' ? start + (Math.ceil(pages / 2) - pages % 2) : totalPages + 1;
        }

        if (currentPage > totalPages - pages + 2) {
          start = totalPages - pages + 2;
        }

        if (totalPages <= pages) start = 2;

        var _loop = function _loop(i) {
          var activeButton = currentPage === i - 1;
          var classNameBtn = innerClassName || activeButton ? innerClassName + " " + (activeButton ? 'active' : '') : '';
          var pageBtn = h(Button, {
            "class": classNameBtn,
            "attrs": {
              "primary": activeButton,
              "tabIndex": "0",
              "alt": "page-" + i
            },
            "on": {
              "keyPress": function keyPress(event) {
                return handleA11yAction(event, function () {
                  return setPage(i - 1);
                });
              },
              "click": function click() {
                return setPage(i - 1);
              }
            }
          }, [i]);

          if (i <= totalPages + 1) {
            paginationButtons.push(pageBtn);
          }
        };

        for (var i = start; i < totalPagesToShow; i += 1) {
          _loop(i);
        }
      }

      return paginationButtons;
    };

    return h("div", {
      "class": pagination + " " + getClassName(props.innerClass, 'pagination')
    }, [h(Button, {
      "class": getClassName(props.innerClass, 'button') || '',
      "attrs": {
        "disabled": props.currentPage === 0,
        "tabIndex": "0"
      },
      "on": {
        "keyPress": function keyPress(event) {
          return handleA11yAction(event, onPrevPage);
        },
        "click": onPrevPage
      }
    }, ["Prev"]), h(Button, {
      "class": className,
      "attrs": {
        "primary": primary,
        "tabIndex": "0"
      },
      "on": {
        "keyPress": function keyPress(event) {
          return handleA11yAction(event, function () {
            return props.setPage(0);
          });
        },
        "click": function click() {
          return props.setPage(0);
        }
      }
    }, ["1"]), props.showEndPage && props.currentPage >= Math.floor(props.pages / 2) + !!(props.pages % 2) ? h("span", ["..."]) : null, (props.currentPage <= props.totalPages - props.pages + 2 || props.totalPages <= props.pages) && buildPaginationDOM('start'), props.showEndPage && props.pages > 2 && props.currentPage <= props.totalPages - Math.ceil(props.pages * 0.75) ? h("span", ["..."]) : null, props.showEndPage && buildPaginationDOM('end'), h(Button, {
      "class": getClassName(props.innerClass, 'button') || '',
      "attrs": {
        "disabled": props.currentPage >= props.totalPages - 1,
        "tabIndex": "0"
      },
      "on": {
        "keyPress": function keyPress(event) {
          return handleA11yAction(event, onNextPage);
        },
        "click": onNextPage
      }
    }, ["Next"])]);
  }
};

Pagination.install = function (Vue) {
  Vue.component(Pagination.name, Pagination);
};

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 110px;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var PoweredByImage = styled__default('img')(_templateObject$1());

var PoweredBy = {
  functional: true,
  render: function render(h) {
    return h("a", {
      "attrs": {
        "href": "https://appbase.io/",
        "target": "_blank",
        "rel": "noopener noreferrer"
      }
    }, [h(PoweredByImage, {
      "attrs": {
        "src": "https://cdn.jsdelivr.net/gh/appbaseio/cdn@d2ec210045e59104ee5485841fa17b23fc83f097/appbase/logos/rbc-logo.svg"
      }
    })]);
  }
};

// Credit to React-Redux for this util function
// https://github.com/reactjs/react-redux/blob/573db0bfc8d1d50fdb6e2a98bd8a7d4675fecf11/src/utils/shallowEqual.js
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } // eslint-disable-next-line


  return x !== x && y !== y;
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var defaultMapState = function defaultMapState() {
  return {};
};

var defaultMapDispatch = {};

var normalizeMapState = function normalizeMapState(mapState) {
  if (typeof mapState === 'function') return mapState;

  if (mapState === Object(mapState)) {
    return function (state, ownProps) {
      return Object.keys(mapState).filter(function (key) {
        return typeof mapState[key] === 'function';
      }).reduce(function (map, key) {
        var _extends2;

        return _extends({}, map, (_extends2 = {}, _extends2[key] = mapState[key](state, ownProps), _extends2));
      }, {});
    };
  }

  throw new Error('[revux] - mapState provided to connect is invalid');
}; // eslint-disable-next-line


var connector = function connector(_mapState, mapDispatch) {
  if (_mapState === void 0) {
    _mapState = defaultMapState;
  }

  if (mapDispatch === void 0) {
    mapDispatch = defaultMapDispatch;
  }

  return function (component) {
    var mapState = normalizeMapState(_mapState);
    return {
      name: "connect-" + component.name,
      mixins: [component],
      inject: ['$$store'],
      data: function data() {
        var merged = _extends({}, mapState(this.$$store.getState(), this.$props || {}), {}, redux.bindActionCreators(mapDispatch, this.$$store.dispatch));

        return Object.keys(merged).reduce(function (data, key) {
          var _extends3;

          return _extends({}, data, (_extends3 = {}, _extends3[key] = merged[key], _extends3));
        }, {});
      },
      created: function created() {
        var _this = this;

        var getMappedState = function getMappedState(state) {
          return mapState(state, _this.$props || {});
        };

        var observeStore = function observeStore(store, select, onChange) {
          var currentState = select(store.getState());
          return store.subscribe(function () {
            var nextState = select(store.getState());

            if (!shallowEqual(currentState, nextState)) {
              var previousState = currentState;
              currentState = nextState;
              onChange(currentState, previousState);
            }
          });
        };

        this._unsubscribe = observeStore(this.$$store, getMappedState, function (newState) {
          Object.keys(newState).forEach(function (key) {
            _this.$set(_this, key, newState[key]);
          });
        });
      },
      beforeDestroy: function beforeDestroy() {
        this._unsubscribe();
      }
    };
  };
};

// import { storeKey } from '@appbaseio/reactivecore';

var connect = function connect() {
  return connector.apply(void 0, arguments);
}; // connectToStore(...args, null, {
//   storeKey,
// });

var composeThemeObject = function composeThemeObject(ownTheme, userTheme) {
  if (ownTheme === void 0) {
    ownTheme = {};
  }

  if (userTheme === void 0) {
    userTheme = {};
  }

  return {
    typography: _extends({}, ownTheme.typography, {}, userTheme.typography),
    colors: _extends({}, ownTheme.colors, {}, userTheme.colors),
    component: _extends({}, ownTheme.component, {}, userTheme.component)
  };
};
/**
 * To determine wether an element is a function
 * @param {any} element
 */

var isFunction = function isFunction(element) {
  return typeof element === 'function';
}; // parses current array (i.e. this.props.value) for `onChange` callback for multi-* components

function parseValueArray(objectValues, currentValue) {
  var keys = Object.keys(objectValues);
  var selectedValues = keys.map(function (key) {
    return objectValues[key] ? key : null;
  });

  if (selectedValues.includes(currentValue)) {
    return selectedValues.filter(function (item) {
      return item !== currentValue;
    });
  }

  return [].concat(selectedValues, [currentValue]);
}

function _templateObject11() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex-basis: ", ";\n\t\t"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex-direction: ", ";\n\t\t"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tflex: ", ";\n\t\t"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$1() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\talign-items: ", ";\n\t\t"]);

  _templateObject8$1 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$1() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tjustify-content: ", ";\n\t\t"]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: ", ";\n\t", ";\n\t", ";\n\t", ";\n\t", ";\n\t", ";\n\n\t", ";\n\t", ";\n\n\t", ";\n\t", ";\n\t", ";\n\n\tsvg.cancel-icon {\n\t\tcursor: pointer;\n\t\tfill: ", ";\n\t\tflex-basis: 30px;\n\n\t\t&:hover {\n\t\t\tfill: ", ";\n\t\t}\n\t}\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tborder: 1px solid ", ";\n"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: column-reverse;\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: column;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: row-reverse;\n\talign-items: center;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n\tflex-direction: row;\n\talign-items: center;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var leftLabel = emotion.css(_templateObject$2());
var rightLabel = emotion.css(_templateObject2$1());
var topLabel = emotion.css(_templateObject3$1());
var bottomLabel = emotion.css(_templateObject4$1());

var border = function border(_ref) {
  var colors = _ref.theme.colors;
  return emotion.css(_templateObject5$1(), colors.borderColor || '#ccc');
};

var Flex = styled__default('div')(_templateObject6$1(), function (props) {
  return props.inline ? 'inline-flex' : 'flex';
}, function (props) {
  return (props.labelPosition === 'left' || props.iconPosition === 'right') && leftLabel;
}, function (props) {
  return (props.labelPosition === 'right' || props.iconPosition === 'left') && rightLabel;
}, function (props) {
  return props.labelPosition === 'top' && topLabel;
}, function (props) {
  return props.labelPosition === 'bottom' && bottomLabel;
}, function (props) {
  return props.showBorder && border;
}, function (props) {
  return props.justifyContent && emotion.css(_templateObject7$1(), props.justifyContent);
}, function (props) {
  return props.alignItems && emotion.css(_templateObject8$1(), props.alignItems);
}, function (props) {
  return props.flex && emotion.css(_templateObject9(), props.flex);
}, function (props) {
  return props.direction && emotion.css(_templateObject10(), props.direction);
}, function (props) {
  return props.basis && emotion.css(_templateObject11(), props.basis);
}, function (_ref2) {
  var colors = _ref2.theme.colors;
  return colors.borderColor || polished.lighten(0.3, colors.textColor);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.textColor;
});

function _templateObject2$2() {
  var data = _taggedTemplateLiteralLoose(["\n\tcolor: #424242;\n\theight: 32px;\n\tfont-size: 0.82rem;\n\tpadding: 0 25px 0 10px;\n\tbackground: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)\n\t\tno-repeat 95% 50%;\n\tbackground-color: #fff;\n\t-moz-appearance: none;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-border-radius: 0;\n\tborder-radius: 0;\n\tborder: 0;\n\toutline: 1px solid #ddd;\n\toutline-offset: -1px;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n\tflex-grow: 1;\n\tfont-size: 0.82rem;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var resultStats = emotion.css(_templateObject$3());
var sortOptions = emotion.css(_templateObject2$2());

var addComponent = configureStore.Actions.addComponent,
    removeComponent = configureStore.Actions.removeComponent,
    setStreaming = configureStore.Actions.setStreaming,
    watchComponent = configureStore.Actions.watchComponent,
    setQueryOptions = configureStore.Actions.setQueryOptions,
    updateQuery = configureStore.Actions.updateQuery,
    loadMore = configureStore.Actions.loadMore,
    setValue = configureStore.Actions.setValue,
    setQueryListener = configureStore.Actions.setQueryListener;
var isEqual = configureStore.helper.isEqual,
    getQueryOptions = configureStore.helper.getQueryOptions,
    pushToAndClause = configureStore.helper.pushToAndClause,
    getClassName$1 = configureStore.helper.getClassName,
    parseHits = configureStore.helper.parseHits,
    getOptionsFromQuery = configureStore.helper.getOptionsFromQuery;
var ReactiveList = {
  name: 'ReactiveList',
  data: function data() {
    var props = this.$props;
    var $currentPage = 0;

    if (props.currentPage) {
      $currentPage = Math.max(props.currentPage - 1, 0);
    }

    this.__state = {
      from: $currentPage * props.size,
      isLoading: true,
      $currentPage: $currentPage
    };
    return this.__state;
  },
  created: function created() {
    var _this = this;

    if (this.defaultPage >= 0) {
      this.$currentPage = this.defaultPage;
      this.from = this.$currentPage * this.$props.size;
    }

    this.isLoading = true;
    this.internalComponent = this.$props.componentId + "__internal";

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    var onError = function onError(e) {
      _this.$emit('error', e);
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, onError);
  },
  props: {
    currentPage: VueTypes.number.def(0),
    includeFields: types.includeFields.def(['*']),
    // component props
    className: types.string,
    componentId: types.stringRequired,
    dataField: types.stringRequired,
    defaultQuery: types.func,
    excludeFields: types.excludeFields.def([]),
    innerClass: types.style,
    listClass: VueTypes.string.def(''),
    loader: types.title,
    renderAllData: types.func,
    renderData: types.func,
    renderNoResults: VueTypes.any.def('No Results found.'),
    renderError: types.title,
    renderResultStats: types.func,
    pages: VueTypes.number.def(5),
    pagination: VueTypes.bool.def(false),
    paginationAt: types.paginationAt.def('bottom'),
    react: types.react,
    showResultStats: VueTypes.bool.def(true),
    showEndPage: VueTypes.bool.def(false),
    size: VueTypes.number.def(10),
    sortBy: types.sortBy,
    sortOptions: types.sortOptions,
    stream: types.bool,
    URLParams: VueTypes.bool.def(false)
  },
  computed: {
    totalPages: function totalPages() {
      return Math.ceil(this.total / this.$props.size) || 0;
    },
    hasPageChangeListener: function hasPageChangeListener() {
      return this.$listeners && this.$listeners.pageChange;
    },
    hasResultStatsListener: function hasResultStatsListener() {
      return this.$listeners && this.$listeners.resultStats;
    },
    stats: function stats() {
      var results = parseHits(this.$data.hits) || [];
      var streamResults = parseHits(this.$data.streamHits) || [];
      var filteredResults = results;

      if (streamResults.length) {
        var ids = streamResults.map(function (item) {
          return item._id;
        });
        filteredResults = filteredResults.filter(function (item) {
          return !ids.includes(item._id);
        });
      }

      return {
        totalResults: this.$data.total,
        totalPages: Math.ceil(this.$data.total / this.$props.size),
        displayedResults: [].concat(streamResults, filteredResults).length,
        time: this.$data.time,
        currentPage: this.$data.currentPage
      };
    }
  },
  watch: {
    sortOptions: function sortOptions(newVal, oldVal) {
      if (!isEqual(oldVal, newVal)) {
        this.updateQueryOptions(this.$props);
      }
    },
    sortBy: function sortBy(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateQueryOptions(this.$props);
      }
    },
    size: function size(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateQueryOptions(this.$props);
      }
    },
    dataField: function dataField(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateQueryOptions(this.$props);
      }
    },
    includeFields: function includeFields(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateQueryOptions(this.$props);
      }
    },
    excludeFields: function excludeFields(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.updateQueryOptions(this.$props);
      }
    },
    defaultQuery: function defaultQuery(newVal, oldVal) {
      if (newVal && !isEqual(newVal(), oldVal)) {
        var options = getQueryOptions(this.$props);
        options.from = 0;
        this.$defaultQuery = newVal();

        var _this$$defaultQuery = this.$defaultQuery,
            sort = _this$$defaultQuery.sort,
            query = _objectWithoutPropertiesLoose(_this$$defaultQuery, ["sort"]);

        if (sort) {
          options.sort = this.$defaultQuery.sort;
        }

        var queryOptions = getOptionsFromQuery(this.$defaultQuery);

        if (queryOptions) {
          options = _extends({}, options, {}, getOptionsFromQuery(this.$defaultQuery));
        }

        this.setQueryOptions(this.$props.componentId, options, !query);
        this.updateQuery({
          componentId: this.internalComponent,
          query: query
        }, true); // reset page because of query change

        this.$currentPage = 0;
        this.from = 0;
      }
    },
    stream: function stream(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.setStreaming(this.$props.componentId, newVal);
      }
    },
    react: function react(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.setReact(this.$props);
      }
    },
    streamHits: function streamHits() {
      this.$emit('data', this.getAllData());
    },
    hits: function hits(newVal, oldVal) {
      this.$emit('data', this.getAllData());
      this.$emit('resultStats', this.stats);

      if (this.$props.pagination) {
        // called when page is changed
        if (this.isLoading && (oldVal || newVal)) {
          if (this.hasPageChangeListener) {
            this.$emit('pageChange', this.$currentPage + 1, this.totalPages);
          } else {
            window.scrollTo(0, 0);
          }

          this.isLoading = false;
        }
      } else if (oldVal && newVal) {
        if (oldVal.length !== newVal.length || newVal.length === this.$props.total) {
          this.isLoading = false;

          if (newVal.length < oldVal.length) {
            // query has changed
            window.scrollTo(0, 0);
            this.from = 0;
          }
        }
      } else if ((!oldVal || !oldVal.length) && newVal) {
        this.isLoading = false;
      }
    },
    total: function total(newVal, oldVal) {
      if (this.$props.pagination && newVal !== oldVal) {
        var currentPage = this.$data.total ? 0 : this.$currentPage;
        this.$currentPage = currentPage;
        this.$emit('pageChange', currentPage + 1, this.totalPages);
      }
    },
    currentPage: function currentPage(newVal, oldVal) {
      if (oldVal !== newVal && newVal > 0 && newVal <= this.totalPages) {
        this.setPage(newVal - 1);
      }
    },
    pagination: function pagination(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal) {
          window.addEventListener('scroll', this.scrollHandler);
        } else {
          window.removeEventListener('scroll', this.scrollHandler);
        }
      } // handle window url history change (on native back and forth interactions)

    },
    defaultPage: function defaultPage(newVal) {
      if (this.$currentPage !== newVal && this.defaultPage !== newVal) {
        this.setPage(newVal >= 0 ? newVal : 0);
      }
    }
  },
  mounted: function mounted() {
    this.addComponent(this.internalComponent);
    this.addComponent(this.$props.componentId);

    if (this.$props.stream) {
      this.setStreaming(this.$props.componentId, true);
    }

    var options = getQueryOptions(this.$props);
    options.from = this.$data.from;

    if (this.$props.sortOptions) {
      var _ref;

      options.sort = [(_ref = {}, _ref[this.$props.sortOptions[0].dataField] = {
        order: this.$props.sortOptions[0].sortBy
      }, _ref)];
    } else if (this.$props.sortBy) {
      var _ref2;

      options.sort = [(_ref2 = {}, _ref2[this.$props.dataField] = {
        order: this.$props.sortBy
      }, _ref2)];
    } // Override sort query with defaultQuery's sort if defined


    this.$defaultQuery = null;

    if (this.$props.defaultQuery) {
      this.$defaultQuery = this.$props.defaultQuery();
      options = _extends({}, options, {}, getOptionsFromQuery(this.$defaultQuery));

      if (this.$defaultQuery.sort) {
        options.sort = this.$defaultQuery.sort;
      }
    } // execute is set to false at the time of mount


    var _ref3 = this.$defaultQuery || {},
        sort = _ref3.sort,
        query = _objectWithoutPropertiesLoose(_ref3, ["sort"]); // to avoid firing (multiple) partial queries.
    // Hence we are building the query in parts here
    // and only executing it with setReact() at core


    var execute = false;
    this.setQueryOptions(this.$props.componentId, options, execute);

    if (this.$defaultQuery) {
      this.updateQuery({
        componentId: this.internalComponent,
        query: query
      }, execute);
    } else {
      this.updateQuery({
        componentId: this.internalComponent,
        query: null
      }, execute);
    } // query will be executed here


    this.setReact(this.$props);

    if (!this.$props.pagination) {
      window.addEventListener('scroll', this.scrollHandler);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
    window.removeEventListener('scroll', this.scrollHandler);
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var size = this.$props.size;
    var hits = this.$data.hits;
    var results = parseHits(hits) || [];
    var streamResults = parseHits(this.$data.streamHits) || [];
    var filteredResults = results;
    var renderData = this.$scopedSlots.renderData || this.$props.renderData;

    if (streamResults.length) {
      var ids = streamResults.map(function (item) {
        return item._id;
      });
      filteredResults = filteredResults.filter(function (item) {
        return !ids.includes(item._id);
      });
    }

    return h("div", {
      "style": this.$props.style,
      "class": this.$props.className
    }, [this.isLoading && this.$props.pagination && (this.$scopedSlots.loader || this.$props.loader), this.renderErrorComponent(), h(Flex, {
      "attrs": {
        "labelPosition": this.$props.sortOptions ? 'right' : 'left'
      },
      "class": getClassName$1(this.$props.innerClass, 'resultsInfo')
    }, [this.$props.sortOptions ? this.renderSortOptions() : null, this.$props.showResultStats ? this.renderStats() : null]), !this.isLoading && results.length === 0 && streamResults.length === 0 ? this.renderNoResult() : null, this.$props.pagination && (this.$props.paginationAt === 'top' || this.$props.paginationAt === 'both') ? h(Pagination, {
      "attrs": {
        "pages": this.$props.pages,
        "totalPages": this.totalPages,
        "currentPage": this.$currentPage,
        "setPage": this.setPage,
        "innerClass": this.$props.innerClass
      }
    }) : null, this.$scopedSlots.renderAllData ? this.$scopedSlots.renderAllData(this.getAllData()) : h("div", {
      "class": this.$props.listClass + " " + getClassName$1(this.$props.innerClass, 'list')
    }, [[].concat(streamResults, filteredResults).map(function (item, index) {
      return renderData({
        item: item,
        triggerClickAnalytics: function triggerClickAnalytics() {
          return _this2.triggerClickAnalytics(_this2.$currentPage * size + index);
        }
      });
    })]), this.isLoading && !this.$props.pagination ? this.$props.loader || h("div", {
      "style": {
        textAlign: 'center',
        margin: '20px 0',
        color: '#666'
      }
    }, ["Loading..."]) : null, this.$props.pagination && (this.$props.paginationAt === 'bottom' || this.$props.paginationAt === 'both') ? h(Pagination, {
      "attrs": {
        "pages": this.$props.pages,
        "totalPages": Math.ceil(this.$data.total / this.$props.size),
        "currentPage": this.$currentPage,
        "setPage": this.setPage,
        "showEndPage": this.$props.showEndPage,
        "innerClass": this.$props.innerClass
      }
    }) : null, this.config.url.endsWith('appbase.io') && results.length ? h(Flex, {
      "attrs": {
        "direction": "row-reverse"
      },
      "class": getClassName$1(this.$props.innerClass, 'poweredBy')
    }, [h(PoweredBy)]) : null]);
  },
  methods: {
    renderErrorComponent: function renderErrorComponent() {
      var renderError = this.$scopedSlots.renderError || this.$props.renderError;

      if (renderError && this.error && !this.isLoading) {
        return isFunction(renderError) ? renderError(this.error) : renderError;
      }

      return null;
    },
    updateQueryOptions: function updateQueryOptions(props) {
      var options = getQueryOptions(props);
      options.from = this.$data.from;

      if (props.sortOptions) {
        var _ref4;

        options.sort = [(_ref4 = {}, _ref4[props.sortOptions[0].dataField] = {
          order: props.sortOptions[0].sortBy
        }, _ref4)];
      } else if (props.sortBy) {
        var _ref5;

        options.sort = [(_ref5 = {}, _ref5[props.dataField] = {
          order: props.sortBy
        }, _ref5)];
      }

      this.setQueryOptions(this.$props.componentId, options, true);
    },
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        var newReact = pushToAndClause(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    scrollHandler: function scrollHandler() {
      if (!this.isLoading && window.innerHeight + window.pageYOffset + 300 >= document.body.offsetHeight) {
        this.loadMore();
      }
    },
    loadMore: function loadMore() {
      if (this.hits && !this.$props.pagination && this.total !== this.hits.length) {
        var value = this.$data.from + this.$props.size;
        var options = getQueryOptions(this.$props);
        this.from = value;
        this.isLoading = true;
        this.loadMoreAction(this.$props.componentId, _extends({}, options, {
          from: value
        }), true);
      } else if (this.isLoading) {
        this.isLoading = false;
      }
    },
    setPage: function setPage(page) {
      // pageClick will be called everytime a pagination button is clicked
      if (page !== this.$currentPage) {
        this.$emit('pageClick', page + 1);
        var value = this.$props.size * page;
        var options = getQueryOptions(this.$props);
        options.from = this.$data.from;
        this.from = value;
        this.isLoading = true;
        this.$currentPage = page;
        this.loadMoreAction(this.$props.componentId, _extends({}, options, {
          from: value
        }), false);

        if (this.$props.URLParams) {
          this.setPageURL(this.$props.componentId, page + 1, this.$props.componentId, false, true);
        }
      }
    },
    renderStats: function renderStats() {
      var h = this.$createElement;
      var renderResultStats = this.$scopedSlots.renderResultStats || this.$props.renderResultStats;

      if (renderResultStats && this.$data.total) {
        return renderResultStats(this.stats);
      } else if (this.$data.total) {
        return h("p", {
          "class": resultStats + " " + getClassName$1(this.$props.innerClass, 'resultStats')
        }, [this.$data.total, " results found in ", this.$data.time, "ms"]);
      }

      return null;
    },
    renderNoResult: function renderNoResult() {
      var h = this.$createElement;
      var renderNoResults = this.$scopedSlots.renderNoResults || this.$props.renderNoResults;
      return h("p", {
        "class": getClassName$1(this.$props.innerClass, 'noResults') || null
      }, [isFunction(renderNoResults) ? renderNoResults() : renderNoResults]);
    },
    handleSortChange: function handleSortChange(e) {
      var _ref6;

      var index = e.target.value; // This fixes issue #371 (where sorting a multi-result page with infinite loader breaks)

      var options = getQueryOptions(this.$props);
      options.from = 0;
      options.sort = [(_ref6 = {}, _ref6[this.$props.sortOptions[index].dataField] = {
        order: this.$props.sortOptions[index].sortBy
      }, _ref6)];
      this.setQueryOptions(this.$props.componentId, options, true);
      this.$currentPage = 0;
      this.from = 0;
    },
    triggerClickAnalytics: function triggerClickAnalytics(searchPosition) {
      // click analytics would only work client side and after javascript loads
      var config = this.config,
          searchId = this.analytics.searchId;
      var url = config.url,
          app = config.app,
          credentials = config.credentials;

      if (config.analytics && searchId) {
        fetch(url + "/" + app + "/_analytics", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Basic " + btoa(credentials),
            'X-Search-Id': searchId,
            'X-Search-Click': true,
            'X-Search-ClickPosition': searchPosition + 1
          }
        });
      }
    },
    renderSortOptions: function renderSortOptions() {
      var h = this.$createElement;
      return h("select", {
        "class": sortOptions + " " + getClassName$1(this.$props.innerClass, 'sortOptions'),
        "attrs": {
          "name": "sort-options"
        },
        "on": {
          "change": this.handleSortChange
        }
      }, [this.$props.sortOptions.map(function (sort, index) {
        return h("option", {
          "key": sort.label,
          "domProps": {
            "value": index
          }
        }, [sort.label]);
      })]);
    },
    // Shape of the object to be returned in onData & renderAllData
    getAllData: function getAllData() {
      var size = this.$props.size;
      var _this$$data = this.$data,
          hits = _this$$data.hits,
          streamHits = _this$$data.streamHits;
      var results = parseHits(hits) || [];
      var streamResults = parseHits(streamHits) || [];
      return {
        results: results,
        streamResults: streamResults,
        loadMore: this.loadMore,
        base: this.$currentPage * size,
        triggerClickAnalytics: this.triggerClickAnalytics
      };
    }
  }
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    defaultPage: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value - 1 || -1,
    hits: state.hits[props.componentId] && state.hits[props.componentId].hits,
    streamHits: state.streamHits[props.componentId],
    time: state.hits[props.componentId] && state.hits[props.componentId].time || 0,
    total: state.hits[props.componentId] && state.hits[props.componentId].total,
    analytics: state.analytics,
    config: state.config,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps = {
  addComponent: addComponent,
  loadMoreAction: loadMore,
  removeComponent: removeComponent,
  setPageURL: setValue,
  setQueryOptions: setQueryOptions,
  setQueryListener: setQueryListener,
  setStreaming: setStreaming,
  updateQuery: updateQuery,
  watchComponent: watchComponent
}; // Only used for SSR

ReactiveList.generateQueryOptions = function (props) {
  // simulate default (includeFields and excludeFields) props to generate consistent query
  var options = getQueryOptions(_extends({
    includeFields: ['*'],
    excludeFields: []
  }, props));
  options.from = props.currentPage ? (props.currentPage - 1) * (props.size || 10) : 0;
  options.size = props.size || 10;

  if (props.sortOptions) {
    var _ref7;

    options.sort = [(_ref7 = {}, _ref7[props.sortOptions[0].dataField] = {
      order: props.sortOptions[0].sortBy
    }, _ref7)];
  } else if (props.sortBy) {
    var _ref8;

    options.sort = [(_ref8 = {}, _ref8[props.dataField] = {
      order: props.sortBy
    }, _ref8)];
  }

  return options;
};

var RLConnected = connect(mapStateToProps, mapDispatchtoProps)(ReactiveList);

ReactiveList.install = function (Vue) {
  Vue.component(ReactiveList.name, RLConnected);
};

var Provider = {
  name: 'Provider',
  props: {
    store: {
      type: Object,
      required: true,
      validator: function validator(store) {
        if (!store.dispatch && !store.subscribe && !store.getState) {
          throw new Error('[reactivesearch-vue] - store provided is not a valid redux store');
        }

        return true;
      }
    }
  },
  provide: function provide() {
    return {
      $$store: this.store
    };
  },
  render: function render(h) {
    if (this.$slots["default"].length > 1) {
      return h('div', this.$slots["default"]);
    }

    return this.$slots["default"][0];
  }
};

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["\n\tfont-family: ", ";\n\tfont-size: ", ";\n\tcolor: ", ";\n\twidth: 100%;\n\n\tinput,\n\tbutton,\n\ttextarea,\n\tselect {\n\t\tfont-family: ", ";\n\t}\n\n\t*,\n\t*:before,\n\t*:after {\n\t\tbox-sizing: border-box;\n\t}\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var Base = styled__default('div')(_templateObject$4(), function (_ref) {
  var theme = _ref.theme;
  return theme.typography.fontFamily;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.typography.fontSize;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.textColor;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.typography.fontFamily;
});

var setHeaders = configureStore.Actions.setHeaders,
    setValue$1 = configureStore.Actions.setValue;
var isEqual$1 = configureStore.helper.isEqual;
var URLParamsProvider = {
  name: 'URLParamsProvider',
  props: {
    className: types.string,
    headers: types.headers,
    getSearchParams: types.func,
    setSearchParams: types.func
  },
  mounted: function mounted() {
    var _this = this;

    this.init();

    window.onpopstate = function () {
      _this.init();

      var activeComponents = Array.from(_this.params.keys()); // remove inactive components from selectedValues

      Object.keys(_this.currentSelectedState).filter(function (item) {
        return !activeComponents.includes(item);
      }).forEach(function (component) {
        _this.setValue(component, null);
      }); // update active components in selectedValues

      Array.from(_this.params.entries()).forEach(function (item) {
        try {
          var component = item[0],
              value = item[1];

          var _ref = _this.selectedValues[component] || {
            label: component
          },
              label = _ref.label,
              showFilter = _ref.showFilter,
              URLParams = _ref.URLParams;

          _this.setValue(component, JSON.parse(value), label, showFilter, URLParams);
        } catch (e) {
          // Do not set value if JSON parsing fails.
          console.error(e);
        }
      });
    };
  },
  watch: {
    $route: function $route() {
      // this ensures the url params change are handled
      // when the url changes, which enables us to
      // make `onpopstate` event handler work with history.pushState updates
      this.checkForURLParamsChange();
    },
    selectedValues: function selectedValues(newVal, oldVal) {
      var _this2 = this;

      this.currentSelectedState = newVal;

      if (!isEqual$1(newVal, oldVal)) {
        this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
        this.params = new URLSearchParams(this.searchString);
        var currentComponents = Object.keys(newVal);
        var urlComponents = Array.from(this.params.keys());
        currentComponents.filter(function (component) {
          return newVal[component].URLParams;
        }).forEach(function (component) {
          // prevents empty history pollution on initial load
          if (_this2.hasValidValue(newVal[component]) || _this2.hasValidValue(oldVal[component])) {
            var selectedValues = newVal[component];

            if (selectedValues.URLParams) {
              if (selectedValues.category) {
                _this2.setURL(component, _this2.getValue({
                  category: selectedValues.category,
                  value: selectedValues.value
                }));
              } else {
                _this2.setURL(component, _this2.getValue(selectedValues.value));
              }
            } else {
              _this2.params["delete"](component);

              _this2.pushToHistory();
            }
          } else if (!_this2.hasValidValue(newVal[component]) && urlComponents.includes(component)) {
            // doesn't have a valid value, but the url has a (stale) valid value set
            _this2.params["delete"](component);

            _this2.pushToHistory();
          }
        }); // remove unmounted components

        Object.keys(newVal).filter(function (component) {
          return !currentComponents.includes(component);
        }).forEach(function (component) {
          _this2.params["delete"](component);

          _this2.pushToHistory();
        });

        if (!currentComponents.length) {
          Array.from(this.params.keys()).forEach(function (item) {
            _this2.params["delete"](item);
          });
          this.pushToHistory();
        }
      }
    },
    headers: function headers(newVal, oldVal) {
      if (!isEqual$1(oldVal, newVal)) {
        this.setHeaders(newVal);
      }
    }
  },
  methods: {
    init: function init() {
      this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
      this.params = new URLSearchParams(this.searchString);
      this.currentSelectedState = this.selectedValues || {};
    },
    checkForURLParamsChange: function checkForURLParamsChange() {
      // we only compare the search string (window.location.search by default)
      // to see if the route has changed (or) not. This handles the following usecase:
      // search on homepage -> route changes -> search results page with same search query
      if (window) {
        var searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;

        if (searchString !== this.searchString) {
          var event;

          if (typeof Event === 'function') {
            event = new Event('popstate');
          } else {
            // Correctly fire popstate event on IE11 to prevent app crash.
            event = document.createEvent('Event');
            event.initEvent('popstate', true, true);
          }

          window.dispatchEvent(event);
        }
      }
    },
    hasValidValue: function hasValidValue(component) {
      if (!component) return false;
      if (Array.isArray(component.value)) return !!component.value.length;
      return !!component.value;
    },
    getValue: function getValue(value) {
      var _this3 = this;

      if (Array.isArray(value) && value.length) {
        return value.map(function (item) {
          return _this3.getValue(item);
        });
      } else if (value && typeof value === 'object') {
        // TODO: support for NestedList
        if (value.location) return value;
        if (value.category) return value;
        return value.label || value.key || null;
      }

      return value;
    },
    setURL: function setURL(component, value) {
      this.searchString = this.$props.getSearchParams ? this.$props.getSearchParams() : window.location.search;
      this.params = new URLSearchParams(this.searchString);

      if (!value || typeof value === 'string' && value.trim() === '' || Array.isArray(value) && value.length === 0) {
        this.params["delete"](component);
        this.pushToHistory();
      } else {
        var data = JSON.stringify(this.getValue(value));

        if (data !== this.params.get(component)) {
          this.params.set(component, data);
          this.pushToHistory();
        }
      }
    },
    pushToHistory: function pushToHistory() {
      var paramsSting = this.params.toString() ? "?" + this.params.toString() : '';
      var base = window.location.href.split('?')[0];
      var newURL = "" + base + paramsSting;

      if (this.$props.setSearchParams) {
        this.$props.setSearchParams(newURL);
      } else if (window.history.pushState) {
        window.history.pushState({
          path: newURL
        }, '', newURL);
      }

      this.init();
    }
  },
  render: function render() {
    var h = arguments[0];
    var children = this.$slots["default"];
    return h(Base, {
      "class": this.$props.className
    }, [children]);
  }
};

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    selectedValues: state.selectedValues
  };
};

var mapDispatchtoProps$1 = {
  setHeaders: setHeaders,
  setValue: setValue$1
};

URLParamsProvider.install = function (Vue) {
  Vue.component(URLParamsProvider.name, URLParamsProvider);
};

var URLParamsProvider$1 = connect(mapStateToProps$1, mapDispatchtoProps$1)(URLParamsProvider);

var typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: '16px'
};
var light = {
  typography: typography,
  colors: {
    textColor: '#424242',
    primaryTextColor: '#fff',
    primaryColor: '#0B6AFF',
    titleColor: '#424242',
    alertColor: '#d9534f'
  }
};
var dark = {
  typography: typography,
  colors: {
    textColor: '#fff',
    backgroundColor: '#212121',
    primaryTextColor: '#fff',
    primaryColor: '#2196F3',
    titleColor: '#fff',
    alertColor: '#d9534f',
    borderColor: '#666'
  }
};
function getTheme(preset) {
  if (preset === 'light') {
    return light;
  }

  return dark;
}

var ReactiveBase = {
  name: 'ReactiveBase',
  data: function data() {
    this.state = {
      key: '__REACTIVE_BASE__'
    };
    return this.state;
  },
  created: function created() {
    this.setStore(this.$props);
  },
  props: {
    app: types.stringRequired,
    analytics: VueTypes.bool.def(false),
    credentials: types.string,
    headers: types.headers,
    queryParams: types.string,
    theme: VueTypes.object.def({}),
    themePreset: VueTypes.string.def('light'),
    type: types.string,
    url: types.string,
    mapKey: types.string,
    className: types.string,
    initialState: VueTypes.object.def({}),
    transformRequest: types.func,
    transformResponse: types.func
  },
  provide: function provide() {
    return {
      theme_reactivesearch: composeThemeObject(getTheme(this.$props.themePreset), this.$props.theme),
      store: this.store
    };
  },
  watch: {
    app: function app() {
      this.updateState(this.$props);
    },
    url: function url() {
      this.updateState(this.$props);
    },
    type: function type() {
      this.updateState(this.$props);
    },
    credentials: function credentials() {
      this.updateState(this.$props);
    },
    mapKey: function mapKey() {
      this.updateState(this.$props);
    },
    headers: function headers() {
      this.updateState(this.$props);
    }
  },
  methods: {
    updateState: function updateState(props) {
      this.setStore(props);
      this.key = state.key + "-0";
    },
    setStore: function setStore(props) {
      var credentials = props.url && props.url.trim() !== '' && !props.credentials ? null : props.credentials;
      var config = {
        url: props.url && props.url.trim() !== '' ? props.url : 'https://scalr.api.appbase.io',
        app: props.app,
        credentials: credentials,
        type: props.type ? props.type : '*',
        transformRequest: props.transformRequest,
        transformResponse: props.transformResponse,
        analytics: props.analytics
      };
      var queryParams = '';

      if (typeof window !== 'undefined') {
        queryParams = window.location.search;
      } else {
        queryParams = props.queryParams || '';
      }

      var params = new URLSearchParams(queryParams);
      var selectedValues = {};
      Array.from(params.keys()).forEach(function (key) {
        try {
          var _extends2;

          var parsedParams = JSON.parse(params.get(key));
          var selectedValue = {};

          if (parsedParams.value) {
            selectedValue.value = parsedParams.value;
          } else {
            selectedValue.value = parsedParams;
          }

          if (parsedParams.category) selectedValue.category = parsedParams.category;
          selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[key] = selectedValue, _extends2));
        } catch (e) {// Do not add to selectedValues if JSON parsing fails.
        }
      });
      var _props$headers = props.headers,
          headers = _props$headers === void 0 ? {} : _props$headers,
          themePreset = props.themePreset;
      var appbaseRef = Appbase(config);

      if (this.$props.transformRequest) {
        appbaseRef.transformRequest = this.$props.transformRequest;
      }

      if (this.$props.transformResponse) {
        appbaseRef.transformResponse = this.$props.transformResponse;
      }

      var initialState = _extends({
        config: _extends({}, config, {
          mapKey: props.mapKey,
          themePreset: themePreset
        }),
        appbaseRef: appbaseRef,
        selectedValues: selectedValues,
        headers: headers
      }, this.$props.initialState);

      this.store = configureStore__default(initialState);
    }
  },
  render: function render() {
    var h = arguments[0];
    var children = this.$slots["default"];
    var _this$$props = this.$props,
        headers = _this$$props.headers,
        style = _this$$props.style,
        className = _this$$props.className;
    return h(Provider, {
      "attrs": {
        "store": this.store
      }
    }, [h(URLParamsProvider$1, {
      "attrs": {
        "headers": headers,
        "className": className
      },
      "style": style
    }, [children])]);
  }
};

ReactiveBase.install = function (Vue) {
  Vue.component(ReactiveBase.name, ReactiveBase);
};

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin: 0 0 8px;\n\tfont-size: 1rem;\n\tcolor: ", ";\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var Title = styled__default('h2')(_templateObject$5(), function (_ref) {
  var theme = _ref.theme;
  return theme.colors.titleColor;
});

function _templateObject12() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: block;\n\twidth: 100%;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fff;\n\tfont-size: 0.9rem;\n\tz-index: 3;\n\tposition: absolute;\n\ttop: 41px;\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tmax-height: 260px;\n\toverflow-y: auto;\n\n\t&.small {\n\t\ttop: 30px;\n\t}\n\n\tli {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\tpadding: 10px;\n\t\tuser-select: none;\n\n\t\t& > .trim {\n\t\t\tdisplay: block;\n\t\t\tdisplay: -webkit-box;\n\t\t\twidth: 100%;\n\t\t\tmax-height: 2.3rem;\n\t\t\tline-height: 1.2rem;\n\t\t\t-webkit-line-clamp: 2;\n\t\t\t-webkit-box-orient: vertical;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t}\n\n\t", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tposition: relative;\n\t.cancel-icon {\n\t\tcursor: pointer;\n\t}\n"]);

  _templateObject11$1 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: block;\n\twidth: 100%;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fff;\n\tfont-size: 0.9rem;\n\tz-index: 3;\n\tposition: absolute;\n\ttop: 41px;\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tmax-height: 260px;\n\toverflow-y: auto;\n\n\t&.small {\n\t\ttop: 30px;\n\t}\n\n\tli {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\tcursor: pointer;\n\t\tpadding: 10px;\n\t\tuser-select: none;\n\n\t\t& > .trim {\n\t\t\tdisplay: block;\n\t\t\tdisplay: -webkit-box;\n\t\t\twidth: 100%;\n\t\t\tmax-height: 2.3rem;\n\t\t\tline-height: 1.2rem;\n\t\t\t-webkit-line-clamp: 2;\n\t\t\t-webkit-box-orient: vertical;\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tbackground-color: #eee;\n\t\t}\n\t}\n\n\t", ";\n"]);

  _templateObject10$1 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$1() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 48px;\n\t\t"]);

  _templateObject9$1 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$2() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 32px;\n\t\t"]);

  _templateObject8$2 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$2() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-right: 32px;\n\t\t"]);

  _templateObject7$2 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$2() {
  var data = _taggedTemplateLiteralLoose(["\n\t\t\tpadding-left: 32px;\n\t\t"]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n\n\t", ";\n"]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tcolor: ", ";\n\t", ";\n\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$2() {
  var data = _taggedTemplateLiteralLoose(["\n\tborder-color: ", ";\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$3() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\theight: 42px;\n\tpadding: 8px 12px;\n\tborder: 1px solid #ccc;\n\tbackground-color: #fafafa;\n\tfont-size: 0.9rem;\n\toutline: none;\n\n\t&:focus {\n\t\tbackground-color: #fff;\n\t}\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteralLoose(["\n\tborder: 1px solid ", ";\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}

var alertBorder = function alertBorder(_ref) {
  var theme = _ref.theme;
  return emotion.css(_templateObject$6(), theme.colors.alertColor);
};

var input = emotion.css(_templateObject2$3());

var dark$1 = function dark(theme) {
  return emotion.css(_templateObject3$2(), theme.colors.borderColor);
};

var darkInput = function darkInput(_ref2) {
  var theme = _ref2.theme;
  return emotion.css(_templateObject4$2(), theme.colors.backgroundColor, theme.colors.textColor, dark$1(theme), theme.colors.backgroundColor);
};

var Input = styled__default('input')(_templateObject5$2(), input, function (_ref3) {
  var themePreset = _ref3.themePreset;
  return themePreset === 'dark' && darkInput;
}, function (props) {
  return props.showIcon && props.iconPosition === 'left' && emotion.css(_templateObject6$2());
}, function (props) {
  return props.showIcon && props.iconPosition === 'right' && emotion.css(_templateObject7$2());
}, function (props) {
  return (// for clear icon
    props.showClear && emotion.css(_templateObject8$2())
  );
}, function (props) {
  return (// for clear icon with search icon
    props.showClear && props.showIcon && props.iconPosition === 'right' && emotion.css(_templateObject9$1())
  );
}, function (props) {
  return props.alert && alertBorder;
});

var suggestions = function suggestions(themePreset, theme) {
  return emotion.css(_templateObject10$1(), themePreset === 'dark' && dark$1(theme));
};

var suggestionsContainer = emotion.css(_templateObject11$1());

var noSuggestions = function noSuggestions(themePreset, theme) {
  return emotion.css(_templateObject12(), themePreset === 'dark' && dark$1(theme));
};

function _templateObject4$3() {
  var data = _taggedTemplateLiteralLoose(["\n\tposition: absolute;\n\ttop: calc(50%);\n\ttransform: translateY(-50%);\n\t", ";\n\t", "};\n\n\tsvg.search-icon {\n\t\tfill: ", ";\n\t}\n\n\tsvg.cancel-icon {\n\t\tfill: ", ";\n\t}\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteralLoose(["\n\tpadding-right: 32px;\n\tright: 0;\n\ttop: calc(50% - 9px);\n"]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteralLoose(["\n\tpadding-right: 12px;\n\tright: 0;\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose(["\n\tpadding-left: 12px;\n\tleft: 0;\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var left = styled.css(_templateObject$7());
var right = styled.css(_templateObject2$4());
var clear = styled.css(_templateObject3$3());
var InputIcon = styled__default('div')(_templateObject4$3(), function (_ref) {
  var iconPosition = _ref.iconPosition;

  if (iconPosition === 'left') {
    return left;
  }

  if (iconPosition === 'right') {
    return right;
  }

  return null;
}, function (_ref2) {
  var clearIcon = _ref2.clearIcon;
  return clearIcon && clear;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primaryColor;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.borderColor;
});

/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} rootNode the root element of the component
 */
// eslint-disable-next-line

var scrollIntoView = function scrollIntoView(node, rootNode) {
  if (node === null) {
    return;
  }

  var actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: 'nearest',
    scrollMode: 'if-needed'
  });
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;
    el.scrollTop = top;
    el.scrollLeft = left;
  });
};

var Downshift = {
  // eslint-disable-next-line
  props: ['isOpen', 'inputValue', 'selectedItem', 'highlightedIndex', 'handleChange', 'itemToString', 'handleMouseup'],
  data: function data() {
    return {
      isMouseDown: false,
      internal_isOpen: false,
      internal_inputValue: '',
      internal_selectedItem: null,
      internal_highlightedIndex: null
    };
  },
  computed: {
    mergedState: function mergedState() {
      var _this = this;

      return Object.keys(this.$props).reduce(function (state, key) {
        var _extends2;

        return _extends({}, state, (_extends2 = {}, _extends2[key] = _this.isControlledProp(key) ? _this.$props[key] : _this["internal_" + key], _extends2));
      }, {});
    },
    internalItemCount: function internalItemCount() {
      return this.items.length;
    }
  },
  mounted: function mounted() {
    window.addEventListener('mousedown', this.handleWindowMousedown);
    window.addEventListener('mouseup', this.handleWindowMouseup);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('mousedown', this.handleWindowMousedown);
    window.removeEventListener('mouseup', this.handleWindowMouseup);
  },
  methods: {
    handleWindowMousedown: function handleWindowMousedown() {
      this.isMouseDown = true;
    },
    handleWindowMouseup: function handleWindowMouseup(event) {
      this.isMouseDown = false;

      if ((event.target === this.$refs.rootNode || !this.$refs.rootNode.contains(event.target)) && this.mergedState.isOpen) {
        // TODO: handle on outer click here
        if (!this.isMouseDown) {
          this.reset();

          if (this.$props.handleMouseup) {
            this.$props.handleMouseup({
              isOpen: false
            });
          }
        }
      }
    },
    keyDownArrowDown: function keyDownArrowDown(event) {
      event.preventDefault();
      var amount = event.shiftKey ? 5 : 1;

      if (this.mergedState.isOpen) {
        this.changeHighlightedIndex(amount);
      } else {
        this.setState({
          isOpen: true
        });
        this.setHighlightedIndex();
      }
    },
    keyDownArrowUp: function keyDownArrowUp(event) {
      event.preventDefault();
      var amount = event.shiftKey ? -5 : -1;

      if (this.mergedState.isOpen) {
        this.changeHighlightedIndex(amount);
      } else {
        this.setState({
          isOpen: true
        });
        this.setHighlightedIndex();
      }
    },
    keyDownEnter: function keyDownEnter(event) {
      if (this.mergedState.isOpen) {
        event.preventDefault();
        this.selectHighlightedItem();
      }
    },
    keyDownEscape: function keyDownEscape(event) {
      event.preventDefault();
      this.reset();
    },
    selectHighlightedItem: function selectHighlightedItem() {
      return this.selectItemAtIndex(this.mergedState.highlightedIndex);
    },
    selectItemAtIndex: function selectItemAtIndex(itemIndex) {
      var item = this.items[itemIndex];

      if (item == null) {
        return;
      }

      this.selectItem(item);
    },
    selectItem: function selectItem(item) {
      if (this.$props.handleChange) {
        this.$props.handleChange(item);
      }

      this.setState({
        isOpen: false,
        highlightedIndex: null,
        selectedItem: item,
        inputValue: this.isControlledProp('selectedItem') ? '' : item
      });
    },
    changeHighlightedIndex: function changeHighlightedIndex(moveAmount) {
      if (this.internalItemCount < 0) {
        return;
      }

      var highlightedIndex = this.mergedState.highlightedIndex;
      var baseIndex = highlightedIndex;

      if (baseIndex === null) {
        baseIndex = moveAmount > 0 ? -1 : this.internalItemCount + 1;
      }

      var newIndex = baseIndex + moveAmount;

      if (newIndex < 0) {
        newIndex = this.internalItemCount;
      } else if (newIndex > this.internalItemCount) {
        newIndex = 0;
      }

      this.setHighlightedIndex(newIndex);
    },
    setHighlightedIndex: function setHighlightedIndex(highlightedIndex) {
      if (highlightedIndex === void 0) {
        highlightedIndex = null;
      }

      this.setState({
        highlightedIndex: highlightedIndex
      });
      var element = document.getElementById("Downshift" + highlightedIndex);
      scrollIntoView(element, this.rootNode); // Implement scrollIntroView thingy
    },
    reset: function reset() {
      var selectedItem = this.mergedState.selectedItem;
      this.setState({
        isOpen: false,
        highlightedIndex: null,
        inputValue: selectedItem
      });
    },
    getItemProps: function getItemProps(_ref) {
      var index = _ref.index,
          item = _ref.item;
      var newIndex = index;

      if (index === undefined) {
        if (this.$props.itemToString) {
          this.items.push(this.$props.itemToString(item));
        } else {
          this.items.push(item);
        }

        newIndex = this.items.indexOf(item);
      } else {
        this.items[newIndex] = item;
      }

      return {
        id: "Downshift" + newIndex
      };
    },
    getItemEvents: function getItemEvents(_ref2) {
      var index = _ref2.index,
          item = _ref2.item;
      var newIndex = index;

      if (index === undefined) {
        newIndex = this.items.indexOf(item);
      }

      var vm = this;
      return {
        mouseenter: function mouseenter() {
          vm.setHighlightedIndex(newIndex);
        },
        click: function click(event) {
          event.stopPropagation();
          vm.selectItemAtIndex(newIndex);
        }
      };
    },
    getInputProps: function getInputProps(_ref3) {
      var value = _ref3.value;
      var inputValue = this.mergedState.inputValue;

      if (value !== inputValue) {
        this.setState({
          inputValue: value
        });
      }

      return {
        value: inputValue
      };
    },
    getButtonProps: function getButtonProps(_ref4) {
      var _this2 = this;

      var onClick = _ref4.onClick,
          onKeyDown = _ref4.onKeyDown,
          onKeyUp = _ref4.onKeyUp,
          onBlur = _ref4.onBlur;
      return {
        click: function click(event) {
          _this2.setState({
            isOpen: true,
            inputValue: event.target.value
          });

          if (onClick) {
            onClick(event);
          }
        },
        keydown: function keydown(event) {
          if (event.key && _this2["keyDown" + event.key]) {
            _this2["keyDown" + event.key].call(_this2, event);
          }

          if (onKeyDown) {
            onKeyDown(event);
          }
        },
        keyup: function keyup(event) {
          if (onKeyUp) {
            onKeyUp(event);
          }
        },
        blur: function blur(event) {
          if (onBlur) {
            onBlur(event);
          }
        }
      };
    },
    getInputEvents: function getInputEvents(_ref5) {
      var _this3 = this;

      var onInput = _ref5.onInput,
          onBlur = _ref5.onBlur,
          onFocus = _ref5.onFocus,
          onKeyPress = _ref5.onKeyPress,
          onKeyDown = _ref5.onKeyDown,
          onKeyUp = _ref5.onKeyUp;
      return {
        input: function input(event) {
          _this3.setState({
            isOpen: true,
            inputValue: event.target.value
          });

          if (onInput) {
            onInput(event);
          }
        },
        focus: function focus(event) {
          if (onFocus) {
            onFocus(event);
          }
        },
        keydown: function keydown(event) {
          if (event.key && _this3["keyDown" + event.key]) {
            _this3["keyDown" + event.key].call(_this3, event);
          }

          if (onKeyDown) {
            onKeyDown(event);
          }
        },
        keypress: function keypress(event) {
          if (onKeyPress) {
            onKeyPress(event);
          }
        },
        keyup: function keyup(event) {
          if (onKeyUp) {
            onKeyUp(event);
          }
        },
        blur: function blur(event) {
          if (onBlur) {
            onBlur(event);
          } // TODO: implement isMouseDown
          // this.reset()

        }
      };
    },
    getHelpersAndState: function getHelpersAndState() {
      var getItemProps = this.getItemProps,
          getItemEvents = this.getItemEvents,
          getInputProps = this.getInputProps,
          getInputEvents = this.getInputEvents,
          getButtonProps = this.getButtonProps;
      return _extends({
        getItemProps: getItemProps,
        getItemEvents: getItemEvents,
        getInputProps: getInputProps,
        getInputEvents: getInputEvents,
        getButtonProps: getButtonProps
      }, this.mergedState);
    },
    isControlledProp: function isControlledProp(prop) {
      return this.$props[prop] !== undefined;
    },
    setState: function setState(stateToSet) {
      var _this4 = this;

      // eslint-disable-next-line
      Object.keys(stateToSet).map(function (key) {
        // eslint-disable-next-line
        _this4.isControlledProp(key) ? _this4.$emit(key + "Change", stateToSet[key]) : _this4["internal_" + key] = stateToSet[key];
      });
      this.$emit('stateChange', this.mergedState);
    }
  },
  render: function render() {
    var h = arguments[0];
    this.items = [];
    return h("div", {
      "ref": "rootNode"
    }, [this.$scopedSlots["default"] && this.$scopedSlots["default"](_extends({}, this.getHelpersAndState()))]);
  }
};

function _templateObject$8() {
  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var Container = styled__default('div')(_templateObject$8(), function (_ref) {
  var theme = _ref.theme;
  return theme.component;
});

var getClassName$2 = configureStore.helper.getClassName;
var SuggestionWrapper = {
  name: 'SuggestionWrapper',
  props: {
    innerClassName: types.string,
    themePreset: types.themePreset,
    innerClass: types.style
  },
  render: function render() {
    var h = arguments[0];
    var _this$$props = this.$props,
        themePreset = _this$$props.themePreset,
        innerClass = _this$$props.innerClass,
        innerClassName = _this$$props.innerClassName;
    return h("div", {
      "class": noSuggestions(themePreset) + " " + getClassName$2(innerClass, innerClassName || '')
    }, [h("li", [this.$scopedSlots["default"]()])]);
  }
};

var highlightStyle = {
  fontWeight: 600,
  padding: 0,
  backgroundColor: 'transparent',
  color: 'inherit'
};
var SuggestionItem = {
  name: 'SuggestionItem',
  props: {
    currentValue: types.string,
    suggestion: types.any
  },
  render: function render() {
    var h = arguments[0];
    var _this$suggestion = this.suggestion,
        label = _this$suggestion.label,
        value = _this$suggestion.value,
        title = _this$suggestion.title,
        description = _this$suggestion.description,
        image = _this$suggestion.image;

    if (label) {
      // label has highest precedence
      return typeof label === 'string' ? h("div", {
        "class": "trim"
      }, [h(Highlight, {
        "attrs": {
          "searchWords": this.currentValue.split(' '),
          "textToHighlight": label,
          "autoEscape": true,
          "highlightStyle": highlightStyle
        }
      })]) : label;
    }

    if (title || image || description) {
      return h(Flex, {
        "attrs": {
          "alignItems": "center",
          "css": {
            width: '100%'
          }
        }
      }, [image && h("div", {
        "attrs": {
          "css": {
            margin: 'auto',
            marginRight: 10
          }
        }
      }, [h("img", {
        "attrs": {
          "src": image,
          "alt": " ",
          "height": "50px",
          "width": "50px",
          "css": {
            objectFit: 'contain'
          }
        }
      })]), h(Flex, {
        "attrs": {
          "direction": "column",
          "css": {
            width: image ? 'calc(100% - 60px)' : '100%'
          }
        }
      }, [title && h("div", {
        "class": "trim"
      }, [h(Highlight, {
        "attrs": {
          "searchWords": this.currentValue.split(' '),
          "textToHighlight": title,
          "highlightStyle": highlightStyle
        },
        "class": styled.css({
          fontSize: '1rem'
        })
      })]), description && h("div", {
        "class": styled.cx('trim', styled.css({
          marginTop: 3
        }))
      }, [h(Highlight, {
        "attrs": {
          "searchWords": this.currentValue.split(' '),
          "textToHighlight": description,
          "highlightStyle": highlightStyle
        }
      })])])]);
    }

    return value;
  }
};

var SearchSvg = {
  functional: true,
  render: function render(h) {
    return h("svg", {
      "attrs": {
        "alt": "Search",
        "height": "14",
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 15 15"
      },
      "class": "search-icon"
    }, [h("title", ["Search"]), h("path", {
      "attrs": {
        "d": 'M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z'
      }
    })]);
  }
};

var CancelSvg = {
  functional: true,
  render: function render(h) {
    return h("svg", {
      "attrs": {
        "alt": "Clear",
        "height": "10",
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 212.982 212.982"
      },
      "class": "cancel-icon"
    }, [h("title", ["Clear"]), h("path", {
      "attrs": {
        "d": 'M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z'
      }
    })]);
  }
};

var addComponent$1 = configureStore.Actions.addComponent,
    removeComponent$1 = configureStore.Actions.removeComponent,
    watchComponent$1 = configureStore.Actions.watchComponent,
    updateQuery$1 = configureStore.Actions.updateQuery,
    setQueryOptions$1 = configureStore.Actions.setQueryOptions,
    setQueryListener$1 = configureStore.Actions.setQueryListener;
var debounce = configureStore.helper.debounce,
    pushToAndClause$1 = configureStore.helper.pushToAndClause,
    checkValueChange = configureStore.helper.checkValueChange,
    getClassName$3 = configureStore.helper.getClassName,
    getOptionsFromQuery$1 = configureStore.helper.getOptionsFromQuery;
var DataSearch = {
  name: 'DataSearch',
  data: function data() {
    var props = this.$props;
    this.__state = {
      currentValue: '',
      isOpen: false,
      normalizedSuggestions: []
    };
    this.internalComponent = props.componentId + "__internal";
    this.locked = false;
    return this.__state;
  },
  inject: {
    theme: {
      from: 'theme_reactivesearch'
    }
  },
  created: function created() {
    var _this = this;

    this.currentValue = this.selectedValue || '';
    this.handleTextChange = debounce(function (value) {
      if (_this.$props.autosuggest) {
        _this.updateQueryHandler(_this.internalComponent, value, _this.$props);
      } else {
        _this.updateQueryHandler(_this.$props.componentId, value, _this.$props);
      }
    }, this.$props.debounce);

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  computed: {
    suggestionsList: function suggestionsList() {
      var suggestionsList = [];

      if (!this.$data.currentValue && this.$props.defaultSuggestions && this.$props.defaultSuggestions.length) {
        suggestionsList = this.$props.defaultSuggestions;
      } else if (this.$data.currentValue) {
        suggestionsList = this.normalizedSuggestions;
      }

      return suggestionsList;
    }
  },
  props: {
    options: types.options,
    autoFocus: types.bool,
    autosuggest: VueTypes.bool.def(true),
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    clearIcon: types.children,
    componentId: types.stringRequired,
    customHighlight: types.func,
    customQuery: types.func,
    dataField: types.dataFieldArray,
    debounce: VueTypes.number.def(0),
    defaultSelected: types.string,
    defaultSuggestions: types.suggestions,
    fieldWeights: types.fieldWeights,
    filterLabel: types.string,
    fuzziness: types.fuzziness,
    highlight: types.bool,
    highlightField: types.stringOrArray,
    icon: types.children,
    iconPosition: VueTypes.oneOf(['left', 'right']).def('left'),
    innerClass: types.style,
    innerRef: types.func,
    renderAllSuggestions: types.func,
    renderSuggestion: types.func,
    renderNoSuggestion: types.title,
    renderError: types.title,
    placeholder: VueTypes.string.def('Search'),
    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
    react: types.react,
    showClear: VueTypes.bool.def(true),
    showFilter: VueTypes.bool.def(true),
    showIcon: VueTypes.bool.def(true),
    title: types.title,
    theme: types.style,
    URLParams: VueTypes.bool.def(false),
    strictSelection: VueTypes.bool.def(false),
    nestedField: types.string
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId, 'DATASEARCH');
    this.addComponent(this.internalComponent);

    if (this.$props.highlight) {
      var queryOptions = DataSearch.highlightQuery(this.$props) || {};
      queryOptions.size = 20;
      this.queryOptions = queryOptions;
      this.setQueryOptions(this.$props.componentId, this.queryOptions);
    } else {
      this.queryOptions = {
        size: 20
      };
      this.setQueryOptions(this.$props.componentId, this.queryOptions);
    }

    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue, true);
    } else if (this.$props.defaultSelected) {
      this.setValue(this.$props.defaultSelected, true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
  },
  watch: {
    highlight: function highlight() {
      this.updateQueryOptions();
    },
    dataField: function dataField() {
      this.updateQueryOptions();
      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
    },
    highlightField: function highlightField() {
      this.updateQueryOptions();
    },
    react: function react() {
      this.setReact(this.$props);
    },
    fieldWeights: function fieldWeights() {
      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
    },
    fuzziness: function fuzziness() {
      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
    },
    queryFormat: function queryFormat() {
      this.updateQueryHandler(this.$props.componentId, this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(newVal, true, this.$props);
    },
    suggestions: function suggestions(newVal) {
      if (Array.isArray(newVal) && this.$data.currentValue.trim().length) {
        // shallow check allows us to set suggestions even if the next set
        // of suggestions are same as the current one
        this.$emit('suggestions', newVal);
        this.normalizedSuggestions = this.onSuggestions(newVal);
      }
    },
    selectedValue: function selectedValue(newVal, oldVal) {
      if (oldVal !== newVal && this.$data.currentValue !== newVal) {
        this.setValue(newVal || '', true, this.$props);
      }
    }
  },
  methods: {
    updateQueryOptions: function updateQueryOptions() {
      var queryOptions = DataSearch.highlightQuery(this.$props) || {};
      queryOptions.size = 20;
      this.queryOptions = queryOptions;
      this.setQueryOptions(this.$props.componentId, this.queryOptions);
    },
    setReact: function setReact(props) {
      var react = this.$props.react;

      if (react) {
        var newReact = pushToAndClause$1(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    onSuggestions: function onSuggestions(results) {
      var renderSuggestion = this.$props.renderSuggestion;
      var fields = Array.isArray(this.$props.dataField) ? this.$props.dataField : [this.$props.dataField];
      var parsedSuggestions = configureStore.suggestions(fields, results, this.$data.currentValue.toLowerCase());

      if (renderSuggestion) {
        return parsedSuggestions.map(function (suggestion) {
          return renderSuggestion(suggestion);
        });
      }

      return parsedSuggestions;
    },
    setValue: function setValue(value, isDefaultValue, props, cause) {
      var _this2 = this;

      if (isDefaultValue === void 0) {
        isDefaultValue = false;
      }

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;

      var performUpdate = function performUpdate() {
        _this2.currentValue = value;
        _this2.normalizedSuggestions = [];

        if (isDefaultValue) {
          if (_this2.$props.autosuggest) {
            _this2.isOpen = false;

            _this2.updateQueryHandler(_this2.internalComponent, value, props);
          } // in case of strict selection only SUGGESTION_SELECT should be able
          // to set the query otherwise the value should reset


          if (props.strictSelection) {
            if (cause === configureStore.causes.SUGGESTION_SELECT || value === '') {
              _this2.updateQueryHandler(props.componentId, value, props);
            } else {
              _this2.setValue('', true);
            }
          } else {
            _this2.updateQueryHandler(props.componentId, value, props);
          }
        } else {
          // debounce for handling text while typing
          _this2.handleTextChange(value);
        }

        _this2.locked = false;

        _this2.$emit('valueChange', value);
      };

      checkValueChange(props.componentId, value, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(componentId, value, props) {
      var customQuery = props.customQuery,
          filterLabel = props.filterLabel,
          showFilter = props.showFilter,
          URLParams = props.URLParams;
      var customQueryOptions;
      var defaultQueryTobeSet = DataSearch.defaultQuery(value, props);
      var query = defaultQueryTobeSet;

      if (customQuery) {
        var customQueryTobeSet = customQuery(value, props);
        var queryTobeSet = customQueryTobeSet.query;

        if (queryTobeSet) {
          query = [queryTobeSet];
        }

        customQueryOptions = getOptionsFromQuery$1(customQueryTobeSet);
        this.setQueryOptions(componentId, _extends({}, this.queryOptions, {}, customQueryOptions));
      }

      this.updateQuery({
        componentId: componentId,
        query: query,
        value: value,
        label: filterLabel,
        showFilter: showFilter,
        URLParams: URLParams,
        componentType: 'DATASEARCH'
      });
    },
    // need to review
    handleFocus: function handleFocus(event) {
      this.isOpen = true;

      if (this.$props.onFocus) {
        this.$emit('focus', event);
      }
    },
    clearValue: function clearValue() {
      this.setValue('', true);
      this.onValueSelectedHandler(null, configureStore.causes.CLEAR_VALUE);
    },
    handleKeyDown: function handleKeyDown(event, highlightedIndex) {
      // if a suggestion was selected, delegate the handling to suggestion handler
      if (event.key === 'Enter' && highlightedIndex === null) {
        this.setValue(event.target.value, true);
        this.onValueSelectedHandler(event.target.value, configureStore.causes.ENTER_PRESS);
      } // Need to review


      if (this.$props.onKeyDown) {
        this.$emit('keyDown', event);
      }
    },
    onInputChange: function onInputChange(e) {
      var value = e.target.value;

      if (!this.$data.isOpen) {
        this.isOpen = true;
      }

      this.setValue(value);
    },
    onSuggestionSelected: function onSuggestionSelected(suggestion) {
      this.setValue(suggestion.value, true, this.$props, configureStore.causes.SUGGESTION_SELECT);
      this.onValueSelectedHandler(suggestion.value, configureStore.causes.SUGGESTION_SELECT, suggestion.source);
    },
    onValueSelectedHandler: function onValueSelectedHandler(currentValue) {
      if (currentValue === void 0) {
        currentValue = this.$data.currentValue;
      }

      for (var _len2 = arguments.length, cause = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        cause[_key2 - 1] = arguments[_key2];
      }

      this.$emit.apply(this, ['valueSelected', currentValue].concat(cause));
    },
    handleStateChange: function handleStateChange(changes) {
      var isOpen = changes.isOpen;
      this.isOpen = isOpen;
    },
    getBackgroundColor: function getBackgroundColor(highlightedIndex, index) {
      var isDark = this.themePreset === 'dark';

      if (isDark) {
        return highlightedIndex === index ? '#555' : '#424242';
      }

      return highlightedIndex === index ? '#eee' : '#fff';
    },
    renderIcon: function renderIcon() {
      var h = this.$createElement;

      if (this.$props.showIcon) {
        return this.$props.icon || h(SearchSvg);
      }

      return null;
    },
    renderErrorComponent: function renderErrorComponent() {
      var h = this.$createElement;
      var renderError = this.$scopedSlots.renderError || this.$props.renderError;

      if (this.error && renderError && this.$data.currentValue && !this.isLoading) {
        return h(SuggestionWrapper, {
          "attrs": {
            "innerClass": this.$props.innerClass,
            "innerClassName": "error",
            "theme": this.theme,
            "themePreset": this.themePreset
          }
        }, [isFunction(renderError) ? renderError(this.error) : renderError]);
      }

      return null;
    },
    renderCancelIcon: function renderCancelIcon() {
      var h = this.$createElement;

      if (this.$props.showClear) {
        return this.$props.clearIcon || h(CancelSvg);
      }

      return null;
    },
    renderNoSuggestions: function renderNoSuggestions(finalSuggestionsList) {
      if (finalSuggestionsList === void 0) {
        finalSuggestionsList = [];
      }

      var h = this.$createElement;
      var _this$$props = this.$props,
          theme = _this$$props.theme,
          innerClass = _this$$props.innerClass;
      var renderNoSuggestion = this.$scopedSlots.renderNoSuggestion || this.$props.renderNoSuggestion;
      var renderError = this.$scopedSlots.renderError || this.$props.renderError;
      var _this$$data = this.$data,
          isOpen = _this$$data.isOpen,
          currentValue = _this$$data.currentValue;

      if (renderNoSuggestion && isOpen && !finalSuggestionsList.length && !this.isLoading && currentValue && !(renderError && this.error)) {
        return h(SuggestionWrapper, {
          "attrs": {
            "innerClass": innerClass,
            "themePreset": this.themePreset,
            "theme": theme,
            "innerClassName": "noSuggestion"
          },
          "scopedSlots": {
            "default": function _default() {
              return typeof renderNoSuggestion === 'function' ? renderNoSuggestion(currentValue) : renderNoSuggestion;
            }
          }
        });
      }

      return null;
    },
    renderIcons: function renderIcons() {
      var h = this.$createElement;
      return h("div", [this.$data.currentValue && this.$props.showClear && h(InputIcon, {
        "on": {
          "click": this.clearValue
        },
        "attrs": {
          "iconPosition": "right",
          "clearIcon": this.$props.iconPosition === 'right'
        }
      }, [this.renderCancelIcon()]), h(InputIcon, {
        "attrs": {
          "iconPosition": this.$props.iconPosition
        }
      }, [this.renderIcon()])]);
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var theme = this.$props.theme;
    var renderAllSuggestions = this.$scopedSlots.renderAllSuggestions || this.$props.renderAllSuggestions;
    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$3(this.$props.innerClass, 'title') || ''
    }, [this.$props.title]), this.$props.defaultSuggestions || this.$props.autosuggest ? h(Downshift, {
      "attrs": {
        "id": this.$props.componentId + "-downshift",
        "handleChange": this.onSuggestionSelected,
        "handleMouseup": this.handleStateChange,
        "isOpen": this.$data.isOpen
      },
      "scopedSlots": {
        "default": function _default(_ref) {
          var getInputEvents = _ref.getInputEvents,
              getInputProps = _ref.getInputProps,
              getItemProps = _ref.getItemProps,
              getItemEvents = _ref.getItemEvents,
              isOpen = _ref.isOpen,
              highlightedIndex = _ref.highlightedIndex;
          return h("div", {
            "class": suggestionsContainer
          }, [h(Input, {
            "attrs": {
              "id": _this3.$props.componentId + "-input",
              "showIcon": _this3.$props.showIcon,
              "showClear": _this3.$props.showClear,
              "iconPosition": _this3.$props.iconPosition,
              "innerRef": _this3.$props.innerRef,
              "placeholder": _this3.$props.placeholder,
              "themePreset": _this3.themePreset
            },
            "class": getClassName$3(_this3.$props.innerClass, 'input'),
            "on": _extends({}, getInputEvents({
              onInput: _this3.onInputChange,
              onBlur: function onBlur(e) {
                _this3.$emit('blur', e);
              },
              onFocus: _this3.handleFocus,
              onKeyPress: function onKeyPress(e) {
                _this3.$emit('keyPress', e);
              },
              onKeyDown: function onKeyDown(e) {
                return _this3.handleKeyDown(e, highlightedIndex);
              },
              onKeyUp: function onKeyUp(e) {
                _this3.$emit('keyUp', e);
              }
            })),
            "domProps": _extends({}, getInputProps({
              value: _this3.$data.currentValue === null ? '' : _this3.$data.currentValue
            }))
          }), _this3.renderIcons(), renderAllSuggestions && renderAllSuggestions({
            currentValue: _this3.$data.currentValue,
            isOpen: isOpen,
            getItemProps: getItemProps,
            getItemEvents: getItemEvents,
            highlightedIndex: highlightedIndex,
            suggestions: _this3.suggestions,
            parsedSuggestions: _this3.suggestionsList
          }), _this3.renderErrorComponent(), !renderAllSuggestions && isOpen && _this3.suggestionsList.length ? h("ul", {
            "class": suggestions(_this3.themePreset, theme) + " " + getClassName$3(_this3.$props.innerClass, 'list')
          }, [_this3.suggestionsList.slice(0, 10).map(function (item, index) {
            return h("li", {
              "domProps": _extends({}, getItemProps({
                item: item
              })),
              "on": _extends({}, getItemEvents({
                item: item
              })),
              "key": index + 1 + "-" + item.value,
              "style": {
                backgroundColor: _this3.getBackgroundColor(highlightedIndex, index)
              }
            }, [h(SuggestionItem, {
              "attrs": {
                "currentValue": _this3.currentValue,
                "suggestion": item
              }
            })]);
          })]) : _this3.renderNoSuggestions(_this3.suggestionsList), ' ']);
        }
      }
    }) : h("div", {
      "class": suggestionsContainer
    }, [h(Input, {
      "class": getClassName$3(this.$props.innerClass, 'input') || '',
      "attrs": {
        "placeholder": this.$props.placeholder,
        "iconPosition": this.$props.iconPosition,
        "showIcon": this.$props.showIcon,
        "showClear": this.$props.showClear,
        "innerRef": this.$props.innerRef,
        "themePreset": this.themePreset
      },
      "on": _extends({}, {
        blur: function blur(e) {
          _this3.$emit('blur', e);
        },
        keypress: function keypress(e) {
          _this3.$emit('keyPress', e);
        },
        input: this.onInputChange,
        focus: function focus(e) {
          _this3.$emit('focus', e);
        },
        keydown: function keydown(e) {
          _this3.$emit('keyDown', e);
        },
        keyup: function keyup(e) {
          _this3.$emit('keyUp', e);
        }
      }),
      "domProps": _extends({}, {
        autofocus: this.$props.autoFocus,
        value: this.$data.currentValue ? this.$data.currentValue : ''
      })
    }), this.renderIcons()])]);
  }
};

DataSearch.defaultQuery = function (value, props) {
  var finalQuery = null;
  var fields;

  if (value) {
    if (Array.isArray(props.dataField)) {
      fields = props.dataField;
    } else {
      fields = [props.dataField];
    }

    finalQuery = {
      bool: {
        should: DataSearch.shouldQuery(value, fields, props),
        minimum_should_match: '1'
      }
    };
  }

  if (value === '') {
    finalQuery = null;
  }

  if (finalQuery && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: finalQuery
        }
      }
    };
  }

  return finalQuery;
};

DataSearch.shouldQuery = function (value, dataFields, props) {
  var fields = dataFields.map(function (field, index) {
    return "" + field + (Array.isArray(props.fieldWeights) && props.fieldWeights[index] ? "^" + props.fieldWeights[index] : '');
  });

  if (props.queryFormat === 'and') {
    return [{
      multi_match: {
        query: value,
        fields: fields,
        type: 'cross_fields',
        operator: 'and'
      }
    }, {
      multi_match: {
        query: value,
        fields: fields,
        type: 'phrase_prefix',
        operator: 'and'
      }
    }];
  }

  return [{
    multi_match: {
      query: value,
      fields: fields,
      type: 'best_fields',
      operator: 'or',
      fuzziness: props.fuzziness ? props.fuzziness : 0
    }
  }, {
    multi_match: {
      query: value,
      fields: fields,
      type: 'phrase_prefix',
      operator: 'or'
    }
  }];
};

DataSearch.highlightQuery = function (props) {
  if (props.customHighlight) {
    return props.customHighlight(props);
  }

  if (!props.highlight) {
    return null;
  }

  var fields = {};
  var highlightField = props.highlightField ? props.highlightField : props.dataField;

  if (typeof highlightField === 'string') {
    fields[highlightField] = {};
  } else if (Array.isArray(highlightField)) {
    highlightField.forEach(function (item) {
      fields[item] = {};
    });
  }

  return {
    highlight: _extends({
      pre_tags: ['<mark>'],
      post_tags: ['</mark>'],
      fields: fields
    }, props.highlightField && {
      require_field_match: false
    })
  };
};

var mapStateToProps$2 = function mapStateToProps(state, props) {
  return {
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
    suggestions: state.hits[props.componentId] && state.hits[props.componentId].hits,
    isLoading: state.isLoading[props.componentId],
    themePreset: state.config.themePreset,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps$2 = {
  addComponent: addComponent$1,
  removeComponent: removeComponent$1,
  setQueryOptions: setQueryOptions$1,
  updateQuery: updateQuery$1,
  watchComponent: watchComponent$1,
  setQueryListener: setQueryListener$1
};
var DSConnected = connect(mapStateToProps$2, mapDispatchtoProps$2)(DataSearch);

DataSearch.install = function (Vue) {
  Vue.component(DataSearch.name, DSConnected);
};

function _templateObject6$3() {
  var data = _taggedTemplateLiteralLoose(["\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n\tmax-height: 240px;\n\tposition: relative;\n\toverflow-y: auto;\n\tpadding-bottom: 12px;\n\n\tli {\n\t\theight 30px;\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tpadding-left: 2px;\n\t}\n"]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$3() {
  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t+ label {\n\t\t&::before,\n\t\t&::after {\n\t\t\tborder-radius: 0;\n\t\t}\n\n\t\t&::after {\n\t\t\tbackground-color: transparent;\n\t\t\ttop: 50%;\n\t\t\tleft: calc(1px + ", " / 5);\n\t\t\twidth: calc(", " / 2);\n\t\t\theight: calc(", " / 5);\n\t\t\tmargin-top: calc(", " / -2 / 2 * 0.8);\n\t\t\tborder-style: solid;\n\t\t\tborder-color: ", ";\n\t\t\tborder-width: 0 0 2px 2px;\n\t\t\tborder-radius: 0;\n\t\t\tborder-image: none;\n\t\t\ttransform: rotate(-45deg) scale(0);\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tborder-color: ", ";\n\t\t\t}\n\n\t\t\t&::after {\n\t\t\t\tcontent: '';\n\t\t\t\ttransform: rotate(-45deg) scale(1);\n\t\t\t\ttransition: transform 200ms ease-out;\n\t\t\t}\n\t\t}\n\t}\n"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\t", ";\n\n\t+ label {\n\t\t&::before,\n\t\t&::after {\n\t\t\tborder-radius: 50%;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t&:active,\n\t\t&:focus {\n\t\t\t+ label {\n\t\t\t\tcolor: ", ";\n\n\t\t\t\t&::before {\n\t\t\t\t\tanimation: none;\n\t\t\t\t\tfilter: none;\n\t\t\t\t\ttransition: none;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tanimation: none;\n\t\t\t\tbackground-color: #fff;\n\t\t\t\tborder-color: ", ";\n\t\t}\n\n\t\t&::after {\n\t\t\ttransform: scale(1);\n\t\t}\n\t}\n"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteralLoose(["\n\t", ";\n\n\t&:focus {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tbox-shadow: 0 0 0 2px ", ";\n\t\t\t}\n\t\t}\n\t}\n\n\t&:hover {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\tborder-color: ", ";\n\t\t\t}\n\t\t}\n\t}\n\n\t&:active {\n\t\t+ label {\n\t\t\t&::before {\n\t\t\t\ttransition-duration: 0;\n\t\t\t}\n\t\t}\n\t}\n\n\t+ label {\n\t\tposition: relative;\n\t\tuser-select: none;\n\t\tdisplay: flex;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\talign-items: center;\n\t\tcursor: pointer;\n\n\t\t&::before {\n\t\t\tbackground-color: #fff;\n\t\t\tborder: 1px solid ", ";\n\t\t\tbox-sizing: content-box;\n\t\t\tcontent: '';\n\t\t\tcolor: ", ";\n\t\t\tmargin-right: calc(", " * 0.5);\n\t\t\ttop: 50%;\n\t\t\tleft: 0;\n\t\t\twidth: ", ";\n\t\t\theight: ", ";\n\t\t\tdisplay: inline-block;\n\t\t\tvertical-align: middle;\n\t\t}\n\n\t\t&::after {\n\t\t\tbox-sizing: content-box;\n\t\t\tcontent: '';\n\t\t\tbackground-color: ", ";\n\t\t\tposition: absolute;\n\t\t\ttop: 50%;\n\t\t\tleft: calc(1px + ", " / 2);\n\t\t\twidth: calc(", " - ", ");\n\t\t\theight: calc(", " - ", ");\n\t\t\tmargin-top: calc(", " / -2 - ", " / -2);\n\t\t\ttransform: scale(0);\n\t\t\ttransform-origin: 50%;\n\t\t\ttransition: transform 200ms ease-out;\n\t\t}\n\t}\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteralLoose(["\n\t+ label {\n\t\tpadding-left: 0;\n\n\t\t&::before,\n\t\t&::after {\n\t\t\twidth: 0;\n\t\t\theight: 0;\n\t\t\tborder: 0;\n\t\t\tmargin: 0;\n\t\t\tvisibility: hidden;\n\t\t}\n\t}\n\n\t&:checked {\n\t\t+ label {\n\t\t\tfont-weight: bold;\n\t\t}\n\t}\n"]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteralLoose(["\n\tborder: 0;\n\tclip: rect(1px, 1px, 1px, 1px);\n\tclip-path: inset(50%);\n\theight: 1px;\n\toverflow: hidden;\n\tpadding: 0;\n\tposition: absolute;\n\twidth: 1px;\n\twhite-space: nowrap;\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var item = {
  width: '15px',
  height: '15px',
  scale: '4px'
};
var vh = emotion.css(_templateObject$9());
var hideInputControl = emotion.css(_templateObject2$5());

var formItem = function formItem(_ref) {
  var theme = _ref.theme;
  return emotion.css(_templateObject3$4(), vh, polished.lighten(0.4, theme.colors.primaryColor), theme.colors.primaryColor, theme.colors.borderColor || polished.lighten(0.1, theme.colors.textColor), theme.colors.primaryColor, item.width, item.width, item.height, theme.colors.primaryColor, item.scale, item.width, item.scale, item.height, item.scale, item.height, item.scale);
};

var Radio = styled__default('input')(_templateObject4$4(), formItem, function (props) {
  return props.show ? null : hideInputControl;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.primaryColor;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primaryColor;
});
var Checkbox = styled__default('input')(_templateObject5$3(), formItem, function (props) {
  return props.show ? null : hideInputControl;
}, item.width, item.width, item.width, item.height, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.primaryColor;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.colors.primaryColor;
});
var UL = styled__default('ul')(_templateObject6$3());

var getAggsOrder = configureStore.helper.getAggsOrder;

var extractQuery = function extractQuery(defaultQuery) {
  var queryToBeReturned = {};

  if (defaultQuery) {
    var evaluateQuery = defaultQuery();

    if (evaluateQuery) {
      if (evaluateQuery.query) {
        queryToBeReturned.query = evaluateQuery.query;
      }

      if (evaluateQuery.aggs) {
        queryToBeReturned.aggs = evaluateQuery.aggs;
      }
    }
  }

  return queryToBeReturned;
};

var getAggsQuery = function getAggsQuery(query, props) {
  var _clonedQuery$aggs;

  var clonedQuery = query;
  var dataField = props.dataField,
      size = props.size,
      sortBy = props.sortBy,
      showMissing = props.showMissing,
      missingLabel = props.missingLabel;
  clonedQuery.size = 0;
  clonedQuery.aggs = (_clonedQuery$aggs = {}, _clonedQuery$aggs[dataField] = {
    terms: _extends({
      field: dataField,
      size: size,
      order: getAggsOrder(sortBy || 'count')
    }, showMissing ? {
      missing: missingLabel
    } : {})
  }, _clonedQuery$aggs);

  if (props.nestedField) {
    clonedQuery.aggs = {
      reactivesearch_nested: {
        nested: {
          path: props.nestedField
        },
        aggs: clonedQuery.aggs
      }
    };
  }

  return _extends({}, clonedQuery, {}, extractQuery(props.defaultQuery));
};

var getCompositeAggsQuery = function getCompositeAggsQuery(query, props, after) {
  var _ref, _clonedQuery$aggs2;

  var clonedQuery = query; // missing label not available in composite aggs

  var dataField = props.dataField,
      size = props.size,
      sortBy = props.sortBy,
      showMissing = props.showMissing; // composite aggs only allows asc and desc

  var order = sortBy === 'count' ? {} : {
    order: sortBy
  };
  clonedQuery.aggs = (_clonedQuery$aggs2 = {}, _clonedQuery$aggs2[dataField] = {
    composite: _extends({
      sources: [(_ref = {}, _ref[dataField] = {
        terms: _extends({
          field: dataField
        }, order, {}, showMissing ? {
          missing_bucket: true
        } : {})
      }, _ref)],
      size: size
    }, after)
  }, _clonedQuery$aggs2);
  clonedQuery.size = 0;

  if (props.nestedField) {
    clonedQuery.aggs = {
      reactivesearch_nested: {
        nested: {
          path: props.nestedField
        },
        aggs: clonedQuery.aggs
      }
    };
  }

  return _extends({}, clonedQuery, {}, extractQuery(props.defaultQuery));
};

var deprecatePropWarning = function deprecatePropWarning(propName, replaceWith) {
  console.warn(propName + " prop will be deprecated in the next release. Please replace it with " + replaceWith + " before upgrading to the next major version.");
};

var addComponent$2 = configureStore.Actions.addComponent,
    removeComponent$2 = configureStore.Actions.removeComponent,
    watchComponent$2 = configureStore.Actions.watchComponent,
    updateQuery$2 = configureStore.Actions.updateQuery,
    setQueryOptions$2 = configureStore.Actions.setQueryOptions,
    setQueryListener$2 = configureStore.Actions.setQueryListener;
var getQueryOptions$1 = configureStore.helper.getQueryOptions,
    pushToAndClause$2 = configureStore.helper.pushToAndClause,
    checkValueChange$1 = configureStore.helper.checkValueChange,
    getClassName$4 = configureStore.helper.getClassName,
    getOptionsFromQuery$2 = configureStore.helper.getOptionsFromQuery;
var SingleList = {
  name: 'SingleList',
  props: {
    beforeValueChange: types.func,
    className: types.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    dataField: types.stringRequired,
    defaultSelected: types.string,
    defaultValue: types.string,
    value: types.value,
    defaultQuery: types.func,
    filterLabel: types.string,
    innerClass: types.style,
    placeholder: VueTypes.string.def('Search'),
    react: types.react,
    renderItem: types.func,
    transformData: types.func,
    selectAllLabel: types.string,
    showCount: VueTypes.bool.def(true),
    showFilter: VueTypes.bool.def(true),
    showRadio: VueTypes.bool.def(true),
    showSearch: VueTypes.bool.def(true),
    size: VueTypes.number.def(100),
    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    showMissing: VueTypes.bool.def(false),
    missingLabel: VueTypes.string.def('N/A'),
    nestedField: types.string
  },
  data: function data() {
    var props = this.$props;
    this.__state = {
      currentValue: '',
      modifiedOptions: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
      searchTerm: ''
    };
    this.locked = false;
    this.internalComponent = props.componentId + "__internal";
    return this.__state;
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.internalComponent);
    this.addComponent(this.$props.componentId);
    this.updateQueryHandlerOptions(this.$props);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue);
    } else if (this.$props.value) {
      this.setValue(this.$props.value);
    } else if (this.$props.defaultValue) {
      this.setValue(this.$props.defaultValue);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.setValue(this.$props.defaultSelected);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    options: function options(newVal) {
      this.modifiedOptions = newVal[this.$props.dataField] ? newVal[this.$props.dataField].buckets : [];
    },
    size: function size() {
      this.updateQueryHandlerOptions(this.$props);
    },
    sortBy: function sortBy() {
      this.updateQueryHandlerOptions(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryHandlerOptions(this.$props);
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(newVal);
    },
    defaultValue: function defaultValue(newVal) {
      this.setValue(newVal);
    },
    value: function value(newVal, oldVal) {
      if (!helper.isEqual(newVal, oldVal)) {
        this.setValue(newVal);
      }
    },
    selectedValue: function selectedValue(newVal) {
      if (this.$data.currentValue !== newVal) {
        this.setValue(newVal || '');
      }
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var _this$$props = this.$props,
        selectAllLabel = _this$$props.selectAllLabel,
        renderItem = _this$$props.renderItem,
        renderError = _this$$props.renderError;
    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

    if (renderErrorCalc && this.error) {
      return isFunction(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
    }

    if (this.modifiedOptions.length === 0) {
      return null;
    }

    var itemsToRender = this.$data.modifiedOptions;

    if (this.$props.transformData) {
      itemsToRender = this.$props.transformData(itemsToRender);
    }

    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$4(this.$props.innerClass, 'title') || ''
    }, [this.$props.title]), this.renderSearch(), h(UL, {
      "class": getClassName$4(this.$props.innerClass, 'list') || ''
    }, [selectAllLabel ? h("li", {
      "key": selectAllLabel,
      "class": "" + (this.$data.currentValue === selectAllLabel ? 'active' : '')
    }, [h(Radio, {
      "class": getClassName$4(this.$props.innerClass, 'radio'),
      "attrs": {
        "id": this.$props.componentId + "-" + selectAllLabel,
        "name": this.$props.componentId,
        "value": selectAllLabel,
        "readOnly": true,
        "show": this.$props.showRadio
      },
      "on": {
        "click": this.handleClick
      },
      "domProps": _extends({}, {
        checked: this.$data.currentValue === selectAllLabel
      })
    }), h("label", {
      "class": getClassName$4(this.$props.innerClass, 'label') || null,
      "attrs": {
        "for": this.$props.componentId + "-" + selectAllLabel
      }
    }, [selectAllLabel])]) : null, itemsToRender.filter(function (item) {
      if (String(item.key).length) {
        if (_this2.$props.showSearch && _this2.$data.searchTerm) {
          return String(item.key).toLowerCase().includes(_this2.$data.searchTerm.toLowerCase());
        }

        return true;
      }

      return false;
    }).map(function (item) {
      return h("li", {
        "key": item.key,
        "class": "" + (_this2.currentValue === String(item.key) ? 'active' : '')
      }, [h(Radio, {
        "class": getClassName$4(_this2.$props.innerClass, 'radio'),
        "attrs": {
          "id": _this2.$props.componentId + "-" + item.key,
          "name": _this2.$props.componentId,
          "value": item.key,
          "readOnly": true,
          "type": "radio",
          "show": _this2.$props.showRadio
        },
        "on": {
          "click": _this2.handleClick
        },
        "domProps": _extends({}, {
          checked: _this2.currentValue === String(item.key)
        })
      }), h("label", {
        "class": getClassName$4(_this2.$props.innerClass, 'label') || null,
        "attrs": {
          "for": _this2.$props.componentId + "-" + item.key
        }
      }, [renderItemCalc ? renderItemCalc({
        label: item.key,
        count: item.doc_count,
        isChecked: _this2.currentValue === String(item.key)
      }) : h("span", [item.key, _this2.$props.showCount && h("span", {
        "class": getClassName$4(_this2.$props.innerClass, 'count') || null
      }, ["\xA0(", item.doc_count, ")"])])])]);
    })])]);
  },
  methods: {
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        var newReact = pushToAndClause$2(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    setValue: function setValue(nextValue, props) {
      var _this3 = this;

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;
      var value = nextValue;

      if (nextValue === this.$data.currentValue) {
        value = '';
      }

      var performUpdate = function performUpdate() {
        _this3.currentValue = value;

        _this3.updateQueryHandler(value, props);

        _this3.locked = false;

        _this3.$emit('valueChange', value);
      };

      checkValueChange$1(props.componentId, value, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = SingleList.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$2(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'SINGLELIST'
      });
    },
    generateQueryOptions: function generateQueryOptions(props) {
      var queryOptions = getQueryOptions$1(props);
      return getAggsQuery(queryOptions, props);
    },
    updateQueryHandlerOptions: function updateQueryHandlerOptions(props) {
      var queryOptions = SingleList.generateQueryOptions(props);

      if (props.defaultQuery) {
        var value = this.$data.currentValue;
        var defaultQueryOptions = getOptionsFromQuery$2(props.defaultQuery(value, props));
        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
      } else {
        this.setQueryOptions(this.internalComponent, queryOptions);
      }
    },
    handleInputChange: function handleInputChange(e) {
      var value = e.target.value;
      this.searchTerm = value;
    },
    renderSearch: function renderSearch() {
      var h = this.$createElement;

      if (this.$props.showSearch) {
        return h(Input, {
          "class": getClassName$4(this.$props.innerClass, 'input') || '',
          "on": {
            "input": this.handleInputChange
          },
          "attrs": {
            "value": this.$data.searchTerm,
            "placeholder": this.$props.placeholder,
            "themePreset": this.$props.themePreset
          },
          "style": {
            margin: '0 0 8px'
          }
        });
      }

      return null;
    },
    handleClick: function handleClick(e) {
      var value = this.$props.value;

      if (value === undefined) {
        this.setValue(e.target.value);
      } else {
        this.$emit('change', e.target.value);
      }
    }
  }
};

SingleList.generateQueryOptions = function (props) {
  var queryOptions = getQueryOptions$1(props);
  return getAggsQuery(queryOptions, props);
};

SingleList.defaultQuery = function (value, props) {
  var query = null;

  if (props.selectAllLabel && props.selectAllLabel === value) {
    if (props.showMissing) {
      query = {
        match_all: {}
      };
    }

    query = {
      exists: {
        field: props.dataField
      }
    };
  }

  if (value) {
    var _term;

    if (props.showMissing && props.missingLabel === value) {
      query = {
        bool: {
          must_not: {
            exists: {
              field: props.dataField
            }
          }
        }
      };
    }

    query = {
      term: (_term = {}, _term[props.dataField] = value, _term)
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

var mapStateToProps$3 = function mapStateToProps(state, props) {
  return {
    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || '',
    themePreset: state.config.themePreset,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps$3 = {
  addComponent: addComponent$2,
  removeComponent: removeComponent$2,
  setQueryOptions: setQueryOptions$2,
  setQueryListener: setQueryListener$2,
  updateQuery: updateQuery$2,
  watchComponent: watchComponent$2
};
var ListConnected = connect(mapStateToProps$3, mapDispatchtoProps$3)(SingleList);

SingleList.install = function (Vue) {
  Vue.component(SingleList.name, ListConnected);
};

var addComponent$3 = configureStore.Actions.addComponent,
    removeComponent$3 = configureStore.Actions.removeComponent,
    watchComponent$3 = configureStore.Actions.watchComponent,
    updateQuery$3 = configureStore.Actions.updateQuery,
    setQueryOptions$3 = configureStore.Actions.setQueryOptions,
    setQueryListener$3 = configureStore.Actions.setQueryListener;
var isEqual$2 = configureStore.helper.isEqual,
    getQueryOptions$2 = configureStore.helper.getQueryOptions,
    pushToAndClause$3 = configureStore.helper.pushToAndClause,
    checkValueChange$2 = configureStore.helper.checkValueChange,
    getClassName$5 = configureStore.helper.getClassName,
    getOptionsFromQuery$3 = configureStore.helper.getOptionsFromQuery;
var MultiList = {
  name: 'MultiList',
  props: {
    defaultSelected: types.stringArray,
    defaultValue: types.stringArray,
    value: types.stringArray,
    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
    showCheckbox: VueTypes.bool.def(true),
    beforeValueChange: types.func,
    className: types.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    dataField: types.stringRequired,
    defaultQuery: types.func,
    filterLabel: types.string,
    innerClass: types.style,
    placeholder: VueTypes.string.def('Search'),
    react: types.react,
    renderItem: types.func,
    renderError: types.title,
    transformData: types.func,
    selectAllLabel: types.string,
    showCount: VueTypes.bool.def(true),
    showFilter: VueTypes.bool.def(true),
    showSearch: VueTypes.bool.def(true),
    size: VueTypes.number.def(100),
    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    showMissing: VueTypes.bool.def(false),
    missingLabel: VueTypes.string.def('N/A'),
    nestedField: types.string
  },
  data: function data() {
    var props = this.$props;
    this.__state = {
      currentValue: {},
      modifiedOptions: props.options && props.options[props.dataField] ? props.options[props.dataField].buckets : [],
      searchTerm: ''
    };
    this.locked = false;
    this.internalComponent = props.componentId + "__internal";
    return this.__state;
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.internalComponent);
    this.addComponent(this.$props.componentId);
    this.updateQueryHandlerOptions(this.$props);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue);
    } else if (this.$props.value) {
      this.setValue(this.$props.value, true);
    } else if (this.$props.defaultValue) {
      this.setValue(this.$props.defaultValue, true);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.setValue(this.$props.defaultSelected, true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    options: function options(newVal) {
      this.modifiedOptions = newVal[this.$props.dataField] ? newVal[this.$props.dataField].buckets : [];
    },
    size: function size() {
      this.updateQueryHandlerOptions(this.$props);
    },
    sortBy: function sortBy() {
      this.updateQueryHandlerOptions(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryHandlerOptions(this.$props);
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal, oldVal) {
      if (!isEqual$2(oldVal, newVal)) {
        this.setValue(newVal, true);
      }
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$2(oldVal, newVal)) {
        this.setValue(newVal, true);
      }
    },
    defaultValue: function defaultValue(newVal, oldVal) {
      if (!isEqual$2(oldVal, newVal)) {
        this.setValue(newVal, true);
      }
    },
    selectedValue: function selectedValue(newVal) {
      var _this2 = this;

      var selectedValue = Object.keys(this.$data.currentValue);

      if (this.$props.selectAllLabel) {
        selectedValue = selectedValue.filter(function (val) {
          return val !== _this2.$props.selectAllLabel;
        });

        if (this.$data.currentValue[this.$props.selectAllLabel]) {
          selectedValue = [this.$props.selectAllLabel];
        }
      }

      if (!isEqual$2(selectedValue, newVal)) {
        this.setValue(newVal || [], true);
      }
    }
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var _this$$props = this.$props,
        selectAllLabel = _this$$props.selectAllLabel,
        renderItem = _this$$props.renderItem,
        renderError = _this$$props.renderError;
    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

    if (renderErrorCalc && this.error) {
      return isFunction(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
    }

    if (this.modifiedOptions.length === 0) {
      return null;
    }

    var itemsToRender = this.$data.modifiedOptions;

    if (this.$props.transformData) {
      itemsToRender = this.$props.transformData(itemsToRender);
    }

    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$5(this.$props.innerClass, 'title')
    }, [this.$props.title]), this.renderSearch(), h(UL, {
      "class": getClassName$5(this.$props.innerClass, 'list')
    }, [selectAllLabel ? h("li", {
      "key": selectAllLabel,
      "class": "" + (this.currentValue[selectAllLabel] ? 'active' : '')
    }, [h(Checkbox, {
      "attrs": {
        "type": "checkbox",
        "id": this.$props.componentId + "-" + selectAllLabel,
        "name": selectAllLabel,
        "value": selectAllLabel,
        "show": this.$props.showCheckbox
      },
      "class": getClassName$5(this.$props.innerClass, 'checkbox'),
      "on": {
        "click": this.handleClick
      },
      "domProps": _extends({}, {
        checked: !!this.currentValue[selectAllLabel]
      })
    }), h("label", {
      "class": getClassName$5(this.$props.innerClass, 'label'),
      "attrs": {
        "for": this.$props.componentId + "-" + selectAllLabel
      }
    }, [selectAllLabel])]) : null, itemsToRender.filter(function (item) {
      if (String(item.key).length) {
        if (_this3.$props.showSearch && _this3.$data.searchTerm) {
          return String(item.key).toLowerCase().includes(_this3.$data.searchTerm.toLowerCase());
        }

        return true;
      }

      return false;
    }).map(function (item) {
      return h("li", {
        "key": item.key,
        "class": "" + (_this3.$data.currentValue[item.key] ? 'active' : '')
      }, [h(Checkbox, {
        "attrs": {
          "type": "checkbox",
          "id": _this3.$props.componentId + "-" + item.key,
          "name": _this3.$props.componentId,
          "value": item.key,
          "show": _this3.$props.showCheckbox
        },
        "class": getClassName$5(_this3.$props.innerClass, 'checkbox'),
        "on": {
          "click": _this3.handleClick
        },
        "domProps": _extends({}, {
          checked: !!_this3.$data.currentValue[item.key]
        })
      }), h("label", {
        "class": getClassName$5(_this3.$props.innerClass, 'label'),
        "attrs": {
          "for": _this3.$props.componentId + "-" + item.key
        }
      }, [renderItemCalc ? renderItemCalc({
        label: item.key,
        count: item.doc_count,
        isChecked: !!_this3.$data.currentValue[item.key]
      }) : h("span", [item.key, _this3.$props.showCount && h("span", {
        "class": getClassName$5(_this3.$props.innerClass, 'count')
      }, ["\xA0(", item.doc_count, ")"])])])]);
    })])]);
  },
  methods: {
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        var newReact = pushToAndClause$3(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    setValue: function setValue(value, isDefaultValue, props) {
      var _this4 = this;

      if (isDefaultValue === void 0) {
        isDefaultValue = false;
      }

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;
      var selectAllLabel = this.$props.selectAllLabel;
      var currentValue = this.$data.currentValue;
      var finalValues = null;

      if (selectAllLabel && (Array.isArray(value) && value.includes(selectAllLabel) || typeof value === 'string' && value === selectAllLabel)) {
        if (currentValue[selectAllLabel]) {
          currentValue = {};
          finalValues = [];
        } else {
          this.$data.modifiedOptions.forEach(function (item) {
            currentValue[item.key] = true;
          });
          currentValue[selectAllLabel] = true;
          finalValues = [selectAllLabel];
        }
      } else if (isDefaultValue) {
        finalValues = value;
        currentValue = {};

        if (value && value.length) {
          value.forEach(function (item) {
            currentValue[item] = true;
          });
        }

        if (selectAllLabel && selectAllLabel in currentValue) {
          var _currentValue = currentValue,
              del = _currentValue[selectAllLabel],
              obj = _objectWithoutPropertiesLoose(_currentValue, [selectAllLabel].map(_toPropertyKey));

          currentValue = _extends({}, obj);
        }
      } else {
        if (currentValue[value]) {
          var _currentValue2 = currentValue,
              _del = _currentValue2[value],
              rest = _objectWithoutPropertiesLoose(_currentValue2, [value].map(_toPropertyKey));

          currentValue = _extends({}, rest);
        } else {
          currentValue[value] = true;
        }

        if (selectAllLabel && selectAllLabel in currentValue) {
          var _currentValue3 = currentValue,
              _del2 = _currentValue3[selectAllLabel],
              _obj = _objectWithoutPropertiesLoose(_currentValue3, [selectAllLabel].map(_toPropertyKey));

          currentValue = _extends({}, _obj);
        }

        finalValues = Object.keys(currentValue);
      }

      var performUpdate = function performUpdate() {
        _this4.currentValue = Object.assign({}, currentValue);

        _this4.updateQueryHandler(finalValues, props);

        _this4.locked = false;

        _this4.$emit('valueChange', finalValues);
      };

      checkValueChange$2(props.componentId, finalValues, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = MultiList.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$3(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'MULTILIST'
      });
    },
    generateQueryOptions: function generateQueryOptions(props) {
      var queryOptions = getQueryOptions$2(props);
      return getAggsQuery(queryOptions, props);
    },
    updateQueryHandlerOptions: function updateQueryHandlerOptions(props) {
      var queryOptions = MultiList.generateQueryOptions(props);

      if (props.defaultQuery) {
        var value = Object.keys(this.$data.currentValue);
        var defaultQueryOptions = getOptionsFromQuery$3(props.defaultQuery(value, props));
        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
      } else {
        this.setQueryOptions(this.internalComponent, queryOptions);
      }
    },
    handleInputChange: function handleInputChange(e) {
      var value = e.target.value;
      this.searchTerm = value;
    },
    renderSearch: function renderSearch() {
      var h = this.$createElement;

      if (this.$props.showSearch) {
        return h(Input, {
          "class": getClassName$5(this.$props.innerClass, 'input') || '',
          "on": {
            "input": this.handleInputChange
          },
          "attrs": {
            "value": this.$data.searchTerm,
            "placeholder": this.$props.placeholder,
            "themePreset": this.$props.themePreset
          },
          "style": {
            margin: '0 0 8px'
          }
        });
      }

      return null;
    },
    handleClick: function handleClick(e) {
      var value = this.$props.value;

      if (value === undefined) {
        this.setValue(e.target.value);
      } else {
        var values = parseValueArray(this.currentValue, e.target.value);
        this.$emit('change', values);
      }
    }
  }
};

MultiList.defaultQuery = function (value, props) {
  var query = null;
  var type = props.queryFormat === 'or' ? 'terms' : 'term';

  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  if (props.selectAllLabel && value.includes(props.selectAllLabel)) {
    if (props.showMissing) {
      query = {
        match_all: {}
      };
    } else {
      query = {
        exists: {
          field: props.dataField
        }
      };
    }
  } else if (value) {
    var listQuery;

    if (props.queryFormat === 'or') {
      if (props.showMissing) {
        var _type, _ref2;

        var hasMissingTerm = value.includes(props.missingLabel);
        var should = [(_ref2 = {}, _ref2[type] = (_type = {}, _type[props.dataField] = value.filter(function (item) {
          return item !== props.missingLabel;
        }), _type), _ref2)];

        if (hasMissingTerm) {
          should = should.concat({
            bool: {
              must_not: {
                exists: {
                  field: props.dataField
                }
              }
            }
          });
        }

        listQuery = {
          bool: {
            should: should
          }
        };
      } else {
        var _type2, _listQuery;

        listQuery = (_listQuery = {}, _listQuery[type] = (_type2 = {}, _type2[props.dataField] = value, _type2), _listQuery);
      }
    } else {
      // adds a sub-query with must as an array of objects for each term/value
      var queryArray = value.map(function (item) {
        var _type3, _ref3;

        return _ref3 = {}, _ref3[type] = (_type3 = {}, _type3[props.dataField] = item, _type3), _ref3;
      });
      listQuery = {
        bool: {
          must: queryArray
        }
      };
    }

    query = value.length ? listQuery : null;
  }

  if (query && props.nestedField) {
    query = {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

MultiList.generateQueryOptions = function (props) {
  var queryOptions = getQueryOptions$2(props);
  return getAggsQuery(queryOptions, props);
};

var mapStateToProps$4 = function mapStateToProps(state, props) {
  return {
    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
    themePreset: state.config.themePreset,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps$4 = {
  addComponent: addComponent$3,
  removeComponent: removeComponent$3,
  setQueryOptions: setQueryOptions$3,
  setQueryListener: setQueryListener$3,
  updateQuery: updateQuery$3,
  watchComponent: watchComponent$3
};
var ListConnected$1 = connect(mapStateToProps$4, mapDispatchtoProps$4)(MultiList);

MultiList.install = function (Vue) {
  Vue.component(MultiList.name, ListConnected$1);
};

function _templateObject4$5() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 16px;\n\theight: 16px;\n\tdisplay: inline-block;\n\tposition: relative;\n\tuser-select: none;\n\talign-items: center;\n\n\t&::after {\n\t\tbox-sizing: content-box;\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tbackground-color: transparent;\n\t\ttop: 50%;\n\t\tleft: 0;\n\t\twidth: 8px;\n\t\theight: 4px;\n\t\tmargin-top: -4px;\n\t\tborder-style: solid;\n\t\tborder-color: ", ";\n\t\tborder-width: 0 0 2px 2px;\n\t\tborder-radius: 0;\n\t\tborder-image: none;\n\t\ttransform: rotate(-45deg) scale(1);\n\t\ttransition: all 200ms ease-out;\n\t}\n"]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$5() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tmin-height: 42px;\n\tborder-radius: 0;\n\toutline: none;\n\tpadding: 5px 12px;\n\tfont-size: 0.9rem;\n\tline-height: 1.2rem;\n\tbackground-color: #fff;\n\tborder: 1px solid #ccc;\n\tcolor: #424242;\n\tcursor: pointer;\n\tuser-select: none;\n\ttransition: all 0.3s ease;\n\n\t", ";\n\n\t& > div {\n\t\twidth: calc(100% - 24px);\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-align: left;\n\t}\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: #fcfcfc;\n\t}\n\n\t", ";\n"]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteralLoose(["\n\tbackground-color: ", ";\n\tborder-color: ", ";\n\tcolor: ", ";\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: ", ";\n\t}\n"]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteralLoose(["\n\tmin-height: 0;\n\theight: 30px;\n\tborder: 0;\n\tbox-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;\n\tborder-radius: 2px;\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var small = emotion.css(_templateObject$a());

var dark$2 = function dark(_ref) {
  var theme = _ref.theme;
  return emotion.css(_templateObject2$6(), theme.colors.backgroundColor, theme.colors.borderColor, theme.colors.textColor, theme.colors.backgroundColor);
};

var Select = styled__default('button')(_templateObject3$5(), function (props) {
  return props.small ? small : null;
}, function (_ref2) {
  var themePreset = _ref2.themePreset;
  return themePreset === 'dark' && dark$2;
});
var Tick = styled__default('span')(_templateObject4$5(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.primaryColor;
});

function _templateObject2$7() {
  var data = _taggedTemplateLiteralLoose(["\n\t&::before {\n\t\tcontent: '';\n\t\tborder-style: solid;\n\t\tborder-width: 0.15em 0.15em 0 0;\n\t\tdisplay: inline-block;\n\t\theight: 0.45em;\n\t\tposition: relative;\n\t\ttop: 0.35em;\n\t\tleft: 0;\n\t\ttransform: rotate(135deg);\n\t\tvertical-align: top;\n\t\twidth: 0.45em;\n\n\t\t", ";\n\t}\n"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$b() {
  var data = _taggedTemplateLiteralLoose(["\n\ttop: 0.55em;\n\ttransform: rotate(-45deg);\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var open = emotion.css(_templateObject$b());
var Chevron = styled__default('span')(_templateObject2$7(), function (props) {
  return props.open ? open : null;
});

var getClassName$6 = configureStore.helper.getClassName;
var Dropdown = {
  data: function data() {
    this.__state = {
      isOpen: false,
      searchTerm: ''
    };
    return this.__state;
  },
  inject: {
    theme: {
      from: 'theme_reactivesearch'
    }
  },
  props: {
    innerClass: types.style,
    items: types.data,
    keyField: VueTypes.string.def('key'),
    labelField: VueTypes.string.def('label'),
    multi: types.bool,
    // change event
    placeholder: types.string,
    returnsObject: types.bool,
    renderItem: types.func,
    handleChange: types.func,
    transformData: types.func,
    selectedItem: types.selectedValue,
    showCount: types.bool,
    single: types.bool,
    small: VueTypes.bool.def(false),
    themePreset: types.themePreset,
    showSearch: types.bool
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var _this$$props = this.$props,
        items = _this$$props.items,
        selectedItem = _this$$props.selectedItem,
        placeholder = _this$$props.placeholder,
        labelField = _this$$props.labelField,
        keyField = _this$$props.keyField,
        themePreset = _this$$props.themePreset,
        renderItem = _this$$props.renderItem,
        transformData = _this$$props.transformData,
        footer = _this$$props.footer;
    var itemsToRender = items;

    if (transformData) {
      itemsToRender = transformData(itemsToRender);
    }

    return h(Downshift, {
      "attrs": {
        "isOpen": this.$data.isOpen,
        "selectedItem": selectedItem,
        "handleChange": this.onChange,
        "handleMouseup": this.handleStateChange
      },
      "scopedSlots": {
        "default": function _default(_ref) {
          var getItemProps = _ref.getItemProps,
              isOpen = _ref.isOpen,
              highlightedIndex = _ref.highlightedIndex,
              getButtonProps = _ref.getButtonProps,
              getItemEvents = _ref.getItemEvents;
          return h("div", {
            "class": suggestionsContainer
          }, [h(Select, {
            "on": _extends({}, _extends({}, getButtonProps({
              onClick: _this.toggle
            }))),
            "class": getClassName$6(_this.$props.innerClass, 'select') || '',
            "attrs": {
              "title": selectedItem ? _this.renderToString(selectedItem) : placeholder,
              "small": _this.$props.small,
              "themePreset": _this.$props.themePreset
            }
          }, [h("div", [selectedItem ? _this.renderToString(selectedItem) : placeholder]), h(Chevron, {
            "attrs": {
              "open": isOpen
            }
          })]), isOpen && itemsToRender.length ? h("ul", {
            "class": suggestions(themePreset, _this.theme) + " " + (_this.$props.small ? 'small' : '') + " " + getClassName$6(_this.$props.innerClass, 'list')
          }, [_this.$props.showSearch ? h(Input, {
            "attrs": {
              "id": _this.$props.componentId + "-input",
              "showIcon": false,
              "placeholder": "Type here to search...",
              "value": _this.$data.searchTerm,
              "themePreset": themePreset
            },
            "style": {
              border: 0,
              borderBottom: '1px solid #ddd'
            },
            "class": getClassName$6(_this.$props.innerClass, 'input'),
            "on": {
              "change": _this.handleInputChange
            }
          }) : null, itemsToRender.filter(function (item) {
            if (String(item[labelField]).length) {
              if (_this.$props.showSearch && _this.$data.searchTerm) {
                return String(item[labelField]).toLowerCase().includes(_this.$data.searchTerm.toLowerCase());
              }

              return true;
            }

            return false;
          }).map(function (item, index) {
            var selected = _this.$props.multi // MultiDropdownList
            && (selectedItem && !!selectedItem[item[keyField]] || // MultiDropdownRange
            Array.isArray(selectedItem) && selectedItem.find(function (value) {
              return value[labelField] === item[labelField];
            }));
            if (!_this.$props.multi) selected = item.key === selectedItem;
            return h("li", {
              "domProps": _extends({}, getItemProps({
                item: item
              })),
              "on": _extends({}, getItemEvents({
                item: item
              })),
              "key": item[keyField],
              "class": "" + (selected ? 'active' : ''),
              "style": {
                backgroundColor: _this.getBackgroundColor(highlightedIndex === index, selected)
              }
            }, [renderItem ? renderItem({
              label: item[labelField],
              count: item.doc_count,
              isChecked: selected && _this.$props.multi
            }) : h("div", [typeof item[labelField] === 'string' ? h("span", {
              "domProps": {
                "innerHTML": item[labelField]
              }
            }) : item[labelField], _this.$props.showCount && item.doc_count && h("span", {
              "class": getClassName$6(_this.$props.innerClass, 'count') || ''
            }, ["\xA0(", item.doc_count, ")"])]), selected && _this.$props.multi ? h(Tick, {
              "class": getClassName$6(_this.$props.innerClass, 'icon') || ''
            }) : null]);
          }), footer]) : null]);
        }
      }
    });
  },
  methods: {
    toggle: function toggle() {
      this.isOpen = !this.$data.isOpen;
    },
    close: function close() {
      this.isOpen = false;
    },
    onChange: function onChange(item) {
      if (this.$props.returnsObject) {
        this.$props.handleChange(item);
      } else {
        this.$props.handleChange(item[this.$props.keyField]);
      }

      if (!this.$props.multi) {
        this.isOpen = false;
      }
    },
    handleStateChange: function handleStateChange(_ref2) {
      var isOpen = _ref2.isOpen;
      this.isOpen = isOpen;
    },
    getBackgroundColor: function getBackgroundColor(highlighted, selected) {
      var isDark = this.$props.themePreset === 'dark';

      if (highlighted) {
        return isDark ? '#555' : '#eee';
      }

      if (selected) {
        return isDark ? '#686868' : '#fafafa';
      }

      return isDark ? '#424242' : '#fff';
    },
    handleInputChange: function handleInputChange(e) {
      var value = e.target.value;
      this.searchTerm = value;
    },
    renderToString: function renderToString(value) {
      var _this2 = this;

      if (Array.isArray(value) && value.length) {
        var arrayToRender = value.map(function (item) {
          return _this2.renderToString(item);
        });
        return arrayToRender.join(', ');
      }

      if (value && typeof value === 'object') {
        if (value[this.$props.labelField]) {
          return value[this.$props.labelField];
        }

        if (Object.keys(value).length) {
          return this.renderToString(Object.keys(value));
        }

        return this.$props.placeholder;
      }

      return value;
    }
  }
};

var addComponent$4 = configureStore.Actions.addComponent,
    removeComponent$4 = configureStore.Actions.removeComponent,
    watchComponent$4 = configureStore.Actions.watchComponent,
    updateQuery$4 = configureStore.Actions.updateQuery,
    setQueryOptions$4 = configureStore.Actions.setQueryOptions,
    setQueryListener$4 = configureStore.Actions.setQueryListener;
var getQueryOptions$3 = configureStore.helper.getQueryOptions,
    pushToAndClause$4 = configureStore.helper.pushToAndClause,
    checkValueChange$3 = configureStore.helper.checkValueChange,
    checkPropChange = configureStore.helper.checkPropChange,
    getClassName$7 = configureStore.helper.getClassName,
    getOptionsFromQuery$4 = configureStore.helper.getOptionsFromQuery;
var SingleDropdownList = {
  name: 'SingleDropdownList',
  data: function data() {
    var props = this.$props;
    this.__state = {
      currentValue: '',
      modifiedOptions: [],
      after: {},
      // for composite aggs
      isLastBucket: false
    };
    this.locked = false;
    this.internalComponent = props.componentId + "__internal";
    return this.__state;
  },
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    dataField: types.stringRequired,
    defaultQuery: types.func,
    defaultSelected: types.string,
    defaultValue: types.string,
    value: types.value,
    filterLabel: types.string,
    innerClass: types.style,
    placeholder: VueTypes.string.def('Select a value'),
    react: types.react,
    renderItem: types.func,
    renderError: types.title,
    transformData: types.func,
    selectAllLabel: types.string,
    showCount: VueTypes.bool.def(true),
    showFilter: VueTypes.bool.def(true),
    size: VueTypes.number.def(100),
    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    showMissing: VueTypes.bool.def(false),
    missingLabel: VueTypes.string.def('N/A'),
    showSearch: VueTypes.bool.def(false),
    showLoadMore: VueTypes.bool.def(false),
    loadMoreLabel: VueTypes.oneOfType([VueTypes.string, VueTypes.any]).def('Load More'),
    nestedField: types.string
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.internalComponent);
    this.addComponent(this.$props.componentId);
    this.updateQueryOptions(this.$props);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue);
    } else if (this.$props.value) {
      this.setValue(this.$props.value);
    } else if (this.$props.defaultValue) {
      this.setValue(this.$props.defaultValue);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.setValue(this.$props.defaultSelected);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    options: function options(newVal, oldVal) {
      var _this2 = this;

      checkPropChange(oldVal, newVal, function () {
        var _this2$$props = _this2.$props,
            showLoadMore = _this2$$props.showLoadMore,
            dataField = _this2$$props.dataField;
        var modifiedOptions = _this2.$data.modifiedOptions;

        if (showLoadMore) {
          // append options with showLoadMore
          var buckets = newVal[dataField].buckets;
          var nextOptions = [].concat(modifiedOptions, buckets.map(function (bucket) {
            return {
              key: bucket.key[dataField],
              doc_count: bucket.doc_count
            };
          }));
          var after = newVal[dataField].after_key; // detect the last bucket by checking if the next set of buckets were empty

          var isLastBucket = !buckets.length;
          _this2.after = {
            after: after
          };
          _this2.isLastBucket = isLastBucket;
          _this2.modifiedOptions = nextOptions;
        } else {
          _this2.modifiedOptions = newVal[_this2.$props.dataField] ? newVal[_this2.$props.dataField].buckets : [];
        }
      });
    },
    size: function size() {
      this.updateQueryOptions(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryOptions(this.$props);
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(newVal);
    },
    defaultValue: function defaultValue(newVal) {
      this.setValue(newVal);
    },
    value: function value(newVal, oldVal) {
      if (!helper.isEqual(newVal, oldVal)) {
        this.setValue(newVal);
      }
    },
    selectedValue: function selectedValue(newVal) {
      if (this.$data.currentValue !== newVal) {
        this.setValue(newVal || '');
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var _this$$props = this.$props,
        showLoadMore = _this$$props.showLoadMore,
        loadMoreLabel = _this$$props.loadMoreLabel,
        renderItem = _this$$props.renderItem,
        renderError = _this$$props.renderError;
    var isLastBucket = this.$data.isLastBucket;
    var selectAll = [];
    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
    var renderErrorCalc = this.$scopedSlots.renderError || renderError;

    if (renderErrorCalc && this.error) {
      return isFunction(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
    }

    if (this.$data.modifiedOptions.length === 0) {
      return null;
    }

    if (this.$props.selectAllLabel) {
      selectAll = [{
        key: this.$props.selectAllLabel
      }];
    }

    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$7(this.$props.innerClass, 'title') || ''
    }, [this.$props.title]), h(Dropdown, {
      "attrs": {
        "innerClass": this.$props.innerClass,
        "items": [].concat(selectAll, this.$data.modifiedOptions.filter(function (item) {
          return String(item.key).trim().length;
        }).map(function (item) {
          return _extends({}, item, {
            key: String(item.key)
          });
        })),
        "handleChange": this.handleChange,
        "selectedItem": this.$data.currentValue,
        "placeholder": this.$props.placeholder,
        "labelField": "key",
        "showCount": this.$props.showCount,
        "renderItem": renderItemCalc,
        "themePreset": this.themePreset,
        "showSearch": this.$props.showSearch,
        "transformData": this.$props.transformData,
        "footer": showLoadMore && !isLastBucket && h("div", {
          "attrs": {
            "css": loadMoreContainer
          }
        }, [h(Button, {
          "on": {
            "click": this.handleLoadMore
          }
        }, [loadMoreLabel])])
      }
    })]);
  },
  methods: {
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        var newReact = pushToAndClause$4(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    setValue: function setValue(value, props) {
      var _this3 = this;

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;

      var performUpdate = function performUpdate() {
        _this3.currentValue = value;

        _this3.updateQueryHandler(value, props);

        _this3.locked = false;

        _this3.$emit('valueChange', value);
      };

      checkValueChange$3(props.componentId, value, props.beforeValueChange, performUpdate);
    },
    handleChange: function handleChange(item) {
      var value = this.$props.value;

      if (value === undefined) {
        this.setValue(item);
      } else {
        this.$emit('change', item);
      }
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = SingleDropdownList.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$4(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'SINGLEDROPDOWNLIST'
      });
    },
    generateQueryOptions: function generateQueryOptions(props, after) {
      var queryOptions = getQueryOptions$3(props);
      return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
    },
    updateQueryOptions: function updateQueryOptions(props, addAfterKey) {
      if (addAfterKey === void 0) {
        addAfterKey = false;
      }

      // when using composite aggs flush the current options for a fresh query
      if (props.showLoadMore && !addAfterKey) {
        this.modifiedOptions = [];
      } // for a new query due to other changes don't append after to get fresh results


      var queryOptions = SingleDropdownList.generateQueryOptions(props, addAfterKey ? this.$data.after : {});

      if (props.defaultQuery) {
        var value = this.$data.currentValue;
        var defaultQueryOptions = getOptionsFromQuery$4(props.defaultQuery(value, props));
        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
      } else {
        this.setQueryOptions(this.internalComponent, queryOptions);
      }
    },
    handleLoadMore: function handleLoadMore() {
      this.updateQueryOptions(this.$props, true);
    }
  }
};

SingleDropdownList.defaultQuery = function (value, props) {
  var query = null;

  if (props.selectAllLabel && props.selectAllLabel === value) {
    if (props.showMissing) {
      query = {
        match_all: {}
      };
    }

    query = {
      exists: {
        field: props.dataField
      }
    };
  } else if (value) {
    var _term;

    if (props.showMissing && props.missingLabel === value) {
      query = {
        bool: {
          must_not: {
            exists: {
              field: props.dataField
            }
          }
        }
      };
    }

    query = {
      term: (_term = {}, _term[props.dataField] = value, _term)
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

SingleDropdownList.generateQueryOptions = function (props, after) {
  var queryOptions = getQueryOptions$3(props);
  return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
};

var mapStateToProps$5 = function mapStateToProps(state, props) {
  return {
    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || '',
    themePreset: state.config.themePreset,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps$5 = {
  addComponent: addComponent$4,
  removeComponent: removeComponent$4,
  setQueryOptions: setQueryOptions$4,
  setQueryListener: setQueryListener$4,
  updateQuery: updateQuery$4,
  watchComponent: watchComponent$4
};
var ListConnected$2 = connect(mapStateToProps$5, mapDispatchtoProps$5)(SingleDropdownList);

SingleDropdownList.install = function (Vue) {
  Vue.component(SingleDropdownList.name, ListConnected$2);
};

var addComponent$5 = configureStore.Actions.addComponent,
    removeComponent$5 = configureStore.Actions.removeComponent,
    watchComponent$5 = configureStore.Actions.watchComponent,
    updateQuery$5 = configureStore.Actions.updateQuery,
    setQueryOptions$5 = configureStore.Actions.setQueryOptions,
    setQueryListener$5 = configureStore.Actions.setQueryListener;
var isEqual$3 = configureStore.helper.isEqual,
    getQueryOptions$4 = configureStore.helper.getQueryOptions,
    pushToAndClause$5 = configureStore.helper.pushToAndClause,
    checkValueChange$4 = configureStore.helper.checkValueChange,
    checkPropChange$1 = configureStore.helper.checkPropChange,
    getClassName$8 = configureStore.helper.getClassName,
    getOptionsFromQuery$5 = configureStore.helper.getOptionsFromQuery;
var MultiDropdownList = {
  name: 'MultiDropdownList',
  data: function data() {
    var props = this.$props;
    this.__state = {
      currentValue: {},
      modifiedOptions: [],
      after: {},
      // for composite aggs
      isLastBucket: false
    };
    this.locked = false;
    this.internalComponent = props.componentId + "__internal";
    return this.__state;
  },
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    dataField: types.stringRequired,
    defaultSelected: types.stringArray,
    defaultValue: types.stringArray,
    value: types.stringArray,
    defaultQuery: types.func,
    filterLabel: types.string,
    innerClass: types.style,
    placeholder: VueTypes.string.def('Select values'),
    queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
    react: types.react,
    renderItem: types.func,
    renderError: types.title,
    transformData: types.func,
    selectAllLabel: types.string,
    showCount: VueTypes.bool.def(true),
    showFilter: VueTypes.bool.def(true),
    size: VueTypes.number.def(100),
    sortBy: VueTypes.oneOf(['asc', 'desc', 'count']).def('count'),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    showMissing: VueTypes.bool.def(false),
    missingLabel: VueTypes.string.def('N/A'),
    showSearch: VueTypes.bool.def(false),
    showLoadMore: VueTypes.bool.def(false),
    loadMoreLabel: VueTypes.oneOfType([VueTypes.string, VueTypes.any]).def('Load More'),
    nestedField: types.string
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.internalComponent);
    this.addComponent(this.$props.componentId);
    this.updateQueryOptions(this.$props);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue, true);
    } else if (this.$props.value) {
      this.setValue(this.$props.value, true);
    } else if (this.$props.defaultValue) {
      this.setValue(this.$props.defaultValue, true);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.setValue(this.$props.defaultSelected, true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalComponent);
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    selectedValue: function selectedValue(newVal) {
      var _this2 = this;

      var selectedValue = Object.keys(this.$data.currentValue);

      if (this.$props.selectAllLabel) {
        selectedValue = selectedValue.filter(function (val) {
          return val !== _this2.$props.selectAllLabel;
        });

        if (this.$data.currentValue[this.$props.selectAllLabel]) {
          selectedValue = [this.$props.selectAllLabel];
        }
      }

      if (!isEqual$3(selectedValue, newVal)) {
        this.setValue(newVal || [], true);
      }
    },
    options: function options(newVal, oldVal) {
      var _this3 = this;

      checkPropChange$1(oldVal, newVal, function () {
        var _this3$$props = _this3.$props,
            showLoadMore = _this3$$props.showLoadMore,
            dataField = _this3$$props.dataField;
        var modifiedOptions = _this3.$data.modifiedOptions;

        if (showLoadMore) {
          // append options with showLoadMore
          var buckets = newVal[dataField].buckets;
          var nextOptions = [].concat(modifiedOptions, buckets.map(function (bucket) {
            return {
              key: bucket.key[dataField],
              doc_count: bucket.doc_count
            };
          }));
          var after = newVal[dataField].after_key; // detect the last bucket by checking if the next set of buckets were empty

          var isLastBucket = !buckets.length;
          _this3.after = {
            after: after
          };
          _this3.isLastBucket = isLastBucket;
          _this3.modifiedOptions = nextOptions;
        } else {
          _this3.modifiedOptions = newVal[_this3.$props.dataField] ? newVal[_this3.$props.dataField].buckets : [];
        }
      });
    },
    size: function size() {
      this.updateQueryOptions(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryOptions(this.$props);
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(newVal, true);
    },
    defaultValue: function defaultValue(newVal) {
      this.setValue(newVal, true);
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$3(newVal, oldVal)) {
        this.setValue(newVal, true);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var _this$$props = this.$props,
        showLoadMore = _this$$props.showLoadMore,
        loadMoreLabel = _this$$props.loadMoreLabel,
        renderItem = _this$$props.renderItem,
        renderError = _this$$props.renderError;
    var renderItemCalc = this.$scopedSlots.renderItem || renderItem;
    var renderErrorCalc = this.$scopedSlots.renderError || renderError;
    var isLastBucket = this.$data.isLastBucket;
    var selectAll = [];

    if (renderErrorCalc && this.error) {
      return isFunction(renderErrorCalc) ? renderErrorCalc(this.error) : renderErrorCalc;
    }

    if (this.$data.modifiedOptions.length === 0) {
      return null;
    }

    if (this.$props.selectAllLabel) {
      selectAll = [{
        key: this.$props.selectAllLabel
      }];
    }

    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$8(this.$props.innerClass, 'title') || ''
    }, [this.$props.title]), h(Dropdown, {
      "attrs": {
        "innerClass": this.$props.innerClass,
        "items": [].concat(selectAll, this.$data.modifiedOptions.filter(function (item) {
          return String(item.key).trim().length;
        }).map(function (item) {
          return _extends({}, item, {
            key: String(item.key)
          });
        })),
        "handleChange": this.handleChange,
        "selectedItem": this.$data.currentValue,
        "placeholder": this.$props.placeholder,
        "labelField": "key",
        "multi": true,
        "showCount": this.$props.showCount,
        "themePreset": this.themePreset,
        "renderItem": renderItemCalc,
        "showSearch": this.$props.showSearch,
        "transformData": this.$props.transformData,
        "footer": showLoadMore && !isLastBucket && h("div", {
          "attrs": {
            "css": loadMoreContainer
          }
        }, [h(Button, {
          "on": {
            "click": this.handleLoadMore
          }
        }, [loadMoreLabel])])
      }
    })]);
  },
  methods: {
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        var newReact = pushToAndClause$5(react, this.internalComponent);
        this.watchComponent(props.componentId, newReact);
      } else {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    },
    handleChange: function handleChange(item) {
      var value = this.$props.value;

      if (value === undefined) {
        this.setValue(item);
      } else {
        var values = parseValueArray(this.currentValue, item);
        this.$emit('change', values);
      }
    },
    setValue: function setValue(value, isDefaultValue, props) {
      var _this4 = this;

      if (isDefaultValue === void 0) {
        isDefaultValue = false;
      }

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;
      var selectAllLabel = this.$props.selectAllLabel;
      var currentValue = this.$data.currentValue;
      var finalValues = null;

      if (selectAllLabel && value.includes(selectAllLabel)) {
        if (currentValue[selectAllLabel]) {
          currentValue = {};
          finalValues = [];
        } else {
          this.$data.modifiedOptions.forEach(function (item) {
            currentValue[item.key] = true;
          });
          currentValue[selectAllLabel] = true;
          finalValues = [selectAllLabel];
        }
      } else if (isDefaultValue) {
        finalValues = value;
        currentValue = {};

        if (Array.isArray(value)) {
          value.forEach(function (item) {
            currentValue[item] = true;
          });
        }

        if (selectAllLabel && selectAllLabel in currentValue) {
          var _currentValue = currentValue,
              del = _currentValue[selectAllLabel],
              obj = _objectWithoutPropertiesLoose(_currentValue, [selectAllLabel].map(_toPropertyKey));

          currentValue = _extends({}, obj);
        }
      } else {
        if (currentValue[value]) {
          var _currentValue2 = currentValue,
              _del = _currentValue2[value],
              rest = _objectWithoutPropertiesLoose(_currentValue2, [value].map(_toPropertyKey));

          currentValue = _extends({}, rest);
        } else {
          currentValue[value] = true;
        }

        if (selectAllLabel && selectAllLabel in currentValue) {
          var _currentValue3 = currentValue,
              _del2 = _currentValue3[selectAllLabel],
              _obj = _objectWithoutPropertiesLoose(_currentValue3, [selectAllLabel].map(_toPropertyKey));

          currentValue = _extends({}, _obj);
        }

        finalValues = Object.keys(currentValue);
      }

      var performUpdate = function performUpdate() {
        _this4.currentValue = currentValue;

        _this4.updateQueryHandler(finalValues, props);

        _this4.locked = false;

        _this4.$emit('valueChange', finalValues);
      };

      checkValueChange$4(props.componentId, finalValues, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = MultiDropdownList.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$5(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'MULTIDROPDOWNLIST'
      });
    },
    generateQueryOptions: function generateQueryOptions(props, after) {
      var queryOptions = getQueryOptions$4(props);
      return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
    },
    updateQueryOptions: function updateQueryOptions(props, addAfterKey) {
      if (addAfterKey === void 0) {
        addAfterKey = false;
      }

      // when using composite aggs flush the current options for a fresh query
      if (props.showLoadMore && !addAfterKey) {
        this.modifiedOptions = [];
      } // for a new query due to other changes don't append after to get fresh results


      var queryOptions = MultiDropdownList.generateQueryOptions(props, addAfterKey ? this.$data.after : {});

      if (props.defaultQuery) {
        var value = Object.keys(this.$data.currentValue);
        var defaultQueryOptions = getOptionsFromQuery$5(props.defaultQuery(value, props));
        this.setQueryOptions(this.internalComponent, _extends({}, queryOptions, {}, defaultQueryOptions));
      } else {
        this.setQueryOptions(this.internalComponent, queryOptions);
      }
    },
    handleLoadMore: function handleLoadMore() {
      this.updateQueryOptions(this.$props, true);
    }
  }
};

MultiDropdownList.defaultQuery = function (value, props) {
  var query = null;
  var type = props.queryFormat === 'or' ? 'terms' : 'term';

  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  if (props.selectAllLabel && value.includes(props.selectAllLabel)) {
    if (props.showMissing) {
      query = {
        match_all: {}
      };
    } else {
      query = {
        exists: {
          field: props.dataField
        }
      };
    }
  } else if (value) {
    var listQuery;

    if (props.queryFormat === 'or') {
      if (props.showMissing) {
        var _type, _ref2;

        var hasMissingTerm = value.includes(props.missingLabel);
        var should = [(_ref2 = {}, _ref2[type] = (_type = {}, _type[props.dataField] = value.filter(function (item) {
          return item !== props.missingLabel;
        }), _type), _ref2)];

        if (hasMissingTerm) {
          should = should.concat({
            bool: {
              must_not: {
                exists: {
                  field: props.dataField
                }
              }
            }
          });
        }

        listQuery = {
          bool: {
            should: should
          }
        };
      } else {
        var _type2, _listQuery;

        listQuery = (_listQuery = {}, _listQuery[type] = (_type2 = {}, _type2[props.dataField] = value, _type2), _listQuery);
      }
    } else {
      // adds a sub-query with must as an array of objects for each term/value
      var queryArray = value.map(function (item) {
        var _type3, _ref3;

        return _ref3 = {}, _ref3[type] = (_type3 = {}, _type3[props.dataField] = item, _type3), _ref3;
      });
      listQuery = {
        bool: {
          must: queryArray
        }
      };
    }

    query = value.length ? listQuery : null;
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

MultiDropdownList.generateQueryOptions = function (props, after) {
  var queryOptions = getQueryOptions$4(props);
  return props.showLoadMore ? getCompositeAggsQuery(queryOptions, props, after) : getAggsQuery(queryOptions, props);
};

var mapStateToProps$6 = function mapStateToProps(state, props) {
  return {
    options: props.nestedField && state.aggregations[props.componentId] ? state.aggregations[props.componentId].reactivesearch_nested : state.aggregations[props.componentId],
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null,
    themePreset: state.config.themePreset,
    error: state.error[props.componentId]
  };
};

var mapDispatchtoProps$6 = {
  addComponent: addComponent$5,
  removeComponent: removeComponent$5,
  setQueryOptions: setQueryOptions$5,
  setQueryListener: setQueryListener$5,
  updateQuery: updateQuery$5,
  watchComponent: watchComponent$5
};
var ListConnected$3 = connect(mapStateToProps$6, mapDispatchtoProps$6)(MultiDropdownList);

MultiDropdownList.install = function (Vue) {
  Vue.component(MultiDropdownList.name, ListConnected$3);
};

var addComponent$6 = configureStore.Actions.addComponent,
    removeComponent$6 = configureStore.Actions.removeComponent,
    updateQuery$6 = configureStore.Actions.updateQuery,
    watchComponent$6 = configureStore.Actions.watchComponent,
    setQueryListener$6 = configureStore.Actions.setQueryListener,
    setQueryOptions$6 = configureStore.Actions.setQueryOptions;
var isEqual$4 = configureStore.helper.isEqual,
    checkValueChange$5 = configureStore.helper.checkValueChange,
    getClassName$9 = configureStore.helper.getClassName,
    getOptionsFromQuery$6 = configureStore.helper.getOptionsFromQuery,
    handleA11yAction$1 = configureStore.helper.handleA11yAction;
var ToggleButton = {
  name: 'ToggleButton',
  props: {
    componentId: types.stringRequired,
    data: types.data,
    dataField: types.stringRequired,
    defaultSelected: types.stringOrArray,
    defaultValue: types.stringOrArray,
    value: types.stringOrArray,
    filterLabel: types.string,
    nestedField: types.string,
    innerClass: types.style,
    multiSelect: types.bool,
    react: types.react,
    showFilter: types.bool,
    title: types.title,
    URLParams: types.bool,
    renderItem: types.func
  },
  data: function data() {
    var props = this.$props;
    var value = this.selectedValue || props.value || props.defaultValue || props.defaultSelected || [];

    if (props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
    }

    var currentValue = ToggleButton.parseValue(value, props);
    this.__state = {
      currentValue: currentValue
    };
    this.locked = false;
    return this.__state;
  },
  beforeMount: function beforeMount() {
    var props = this.$props;
    var hasMounted = false;

    if (this.$data.currentValue.length) {
      this.handleToggle(this.$data.currentValue, true, props, hasMounted);
    }

    this.addComponent(props.componentId);
    this.setReact(props);
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
  },
  watch: {
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(ToggleButton.parseValue(newVal, this.$props));
    },
    defaultValue: function defaultValue(newVal) {
      this.setValue(ToggleButton.parseValue(newVal, this.$props));
    },
    react: function react() {
      this.setReact(this.$props);
    },
    dataField: function dataField() {
      this.updateQuery(this.$data.currentValue, this.$props);
    },
    nestedField: function nestedField() {
      this.updateQuery(this.$data.currentValue, this.$props);
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$4(newVal, oldVal)) {
        this.handleToggle(newVal, true, this.$props);
      }
    },
    selectedValue: function selectedValue(newVal, oldVal) {
      if (this.$props.multiSelect) {
        // for multiselect selectedValue will be an array
        if (!isEqual$4(this.$data.currentValue, newVal) && !isEqual$4(oldVal, newVal)) {
          this.handleToggle(newVal || [], true, this.$props);
        }
      } else {
        // else selectedValue will be a string
        var currentValue = this.$data.currentValue[0] ? this.$data.currentValue[0].value : null;

        if (!isEqual$4(currentValue, this.selectedValue) && !isEqual$4(oldVal, this.selectedValue)) {
          this.handleToggle(this.selectedValue || [], true, this.$props);
        }
      }
    }
  },
  methods: {
    handleToggle: function handleToggle(value, isDefaultValue, props, hasMounted) {
      if (isDefaultValue === void 0) {
        isDefaultValue = false;
      }

      if (props === void 0) {
        props = this.$props;
      }

      if (hasMounted === void 0) {
        hasMounted = true;
      }

      var currentValue = this.$data.currentValue;
      var toggleValue = value;
      var finalValue = [];

      if (isDefaultValue) {
        finalValue = ToggleButton.parseValue(toggleValue, props);
      } else if (this.$props.multiSelect) {
        finalValue = currentValue.some(function (item) {
          return item.value === toggleValue.value;
        }) ? currentValue.filter(function (item) {
          return item.value !== toggleValue.value;
        }) : currentValue.concat(toggleValue);
      } else {
        finalValue = currentValue.some(function (item) {
          return item.value === toggleValue.value;
        }) ? [] : [toggleValue];
      }

      this.setValue(finalValue, props, hasMounted);
    },
    setReact: function setReact(props) {
      if (props.react) {
        this.watchComponent(props.componentId, props.react);
      }
    },
    setValue: function setValue(value, props, hasMounted) {
      var _this2 = this;

      if (props === void 0) {
        props = this.$props;
      }

      if (hasMounted === void 0) {
        hasMounted = true;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;

      var performUpdate = function performUpdate() {
        var handleUpdates = function handleUpdates() {
          _this2.updateQuery(value, props);

          _this2.locked = false;

          _this2.$emit('valueChange', value);
        };

        if (hasMounted) {
          _this2.currentValue = value;
          handleUpdates();
        } else {
          handleUpdates();
        }
      };

      checkValueChange$5(props.componentId, props.multiSelect ? value : value[0], props.beforeValueChange, performUpdate);
    },
    updateQuery: function updateQuery(value, props) {
      var filterValue = value;

      if (!props.multiSelect) {
        filterValue = value[0] ? value[0].value : null;
      }

      var customQuery = props.customQuery;
      var query = ToggleButton.defaultQuery(value, props);

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        this.setQueryOptions(props.componentId, getOptionsFromQuery$6(customQuery(value, props)));
      }

      this.updateQueryHandler({
        componentId: props.componentId,
        query: query,
        value: filterValue,
        // sets a string in URL not array
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'TOGGLEBUTTON'
      });
    },
    handleClick: function handleClick(item) {
      var value = this.$props.value;

      if (value === undefined) {
        this.handleToggle(item);
      } else {
        this.$emit('change', item.value);
      }
    },
    renderButton: function renderButton(item) {
      var _this3 = this;

      var h = this.$createElement;
      var renderItem = this.$scopedSlots.renderItem || this.renderItem;
      var isSelected = this.$data.currentValue.some(function (value) {
        return value.value === item.value;
      });
      return h(Button, {
        "class": getClassName$9(this.$props.innerClass, 'button') + " " + (isSelected ? 'active' : ''),
        "on": {
          "click": function click() {
            return _this3.handleClick(item);
          },
          "keypress": function keypress(e) {
            return handleA11yAction$1(e, function () {
              return _this3.handleClick(item);
            });
          }
        },
        "key": item.value,
        "attrs": {
          "primary": isSelected,
          "large": true,
          "tabIndex": isSelected ? "-1" : "0"
        }
      }, [renderItem ? renderItem({
        item: item,
        isSelected: isSelected
      }) : item.label]);
    }
  },
  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    return h(Container, {
      "class": toggleButtons
    }, [this.$props.title && h(Title, {
      "class": getClassName$9(this.$props.innerClass, 'title')
    }, [this.$props.title]), this.$props.data.map(function (item) {
      return _this4.renderButton(item);
    })]);
  }
};

ToggleButton.parseValue = function (value, props) {
  if (Array.isArray(value)) {
    if (typeof value[0] === 'string') {
      return props.data.filter(function (item) {
        return value.includes(item.value);
      });
    }

    return value;
  }

  return props.data.filter(function (item) {
    return item.value === value;
  });
};

ToggleButton.defaultQuery = function (value, props) {
  var query = null;

  if (value && value.length) {
    query = {
      bool: {
        boost: 1.0,
        minimum_should_match: 1,
        should: value.map(function (item) {
          var _term;

          return {
            term: (_term = {}, _term[props.dataField] = item.value, _term)
          };
        })
      }
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

var mapStateToProps$7 = function mapStateToProps(state, props) {
  return {
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
  };
};

var mapDispatchtoProps$7 = {
  addComponent: addComponent$6,
  removeComponent: removeComponent$6,
  updateQueryHandler: updateQuery$6,
  watchComponent: watchComponent$6,
  setQueryListener: setQueryListener$6,
  setQueryOptions: setQueryOptions$6
};
var RcConnected = connect(mapStateToProps$7, mapDispatchtoProps$7)(ToggleButton);

ToggleButton.install = function (Vue) {
  Vue.component(ToggleButton.name, RcConnected);
};

var addComponent$7 = configureStore.Actions.addComponent,
    removeComponent$7 = configureStore.Actions.removeComponent,
    watchComponent$7 = configureStore.Actions.watchComponent,
    updateQuery$7 = configureStore.Actions.updateQuery,
    setQueryOptions$7 = configureStore.Actions.setQueryOptions,
    setQueryListener$7 = configureStore.Actions.setQueryListener;
var pushToAndClause$6 = configureStore.helper.pushToAndClause,
    parseHits$1 = configureStore.helper.parseHits,
    isEqual$5 = configureStore.helper.isEqual;
var ReactiveComponent = {
  name: 'ReactiveComponent',
  props: {
    componentId: types.stringRequired,
    defaultQuery: types.func,
    filterLabel: types.string,
    react: types.react,
    showFilter: VueTypes.bool.def(true),
    URLParams: VueTypes.bool.def(false)
  },
  created: function created() {
    var _this = this;

    var props = this.$props;
    this.internalComponent = null;
    this.$defaultQuery = null;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(props.componentId, onQueryChange, function (e) {
      _this.$emit('error', e);
    });

    this.setQuery = function (obj) {
      _this.updateQuery(_extends({}, obj, {
        componentId: props.componentId,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams
      }));
    };

    if (props.defaultQuery) {
      this.internalComponent = props.componentId + "__internal";
    }
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId);

    if (this.internalComponent) {
      this.addComponent(this.internalComponent);
    }

    this.setReact(this.$props); // set query for internal component

    if (this.internalComponent && this.$props.defaultQuery) {
      this.$defaultQuery = this.$props.defaultQuery();

      var _ref = this.$defaultQuery || {},
          query = _ref.query,
          queryOptions = _objectWithoutPropertiesLoose(_ref, ["query"]);

      if (queryOptions) {
        this.setQueryOptions(this.internalComponent, queryOptions, false);
      }

      this.updateQuery({
        componentId: this.internalComponent,
        query: query || null
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);

    if (this.internalComponent) {
      this.removeComponent(this.internalComponent);
    }
  },
  watch: {
    hits: function hits(newVal, oldVal) {
      if (!isEqual$5(newVal, oldVal)) {
        this.$emit('allData', parseHits$1(newVal), oldVal);
      }
    },
    aggregations: function aggregations(newVal, oldVal) {
      if (!isEqual$5(newVal, oldVal)) {
        this.$emit('allData', parseHits$1(newVal), oldVal);
      }
    },
    defaultQuery: function defaultQuery(newVal, oldVal) {
      if (newVal && !isEqual$5(newVal(), oldVal)) {
        this.$defaultQuery = newVal();

        var _ref2 = this.$defaultQuery || {},
            query = _ref2.query,
            queryOptions = _objectWithoutPropertiesLoose(_ref2, ["query"]);

        if (queryOptions) {
          this.setQueryOptions(this.internalComponent, queryOptions, false);
        }

        this.updateQuery({
          componentId: this.internalComponent,
          query: query || null
        });
      }
    },
    react: function react() {
      this.setReact(this.$props);
    }
  },
  render: function render() {
    var h = arguments[0];

    try {
      var dom = this.$scopedSlots["default"];

      var propsToBePassed = _extends({
        aggregations: this.aggregations,
        hits: this.hits,
        selectedValue: this.selectedValue,
        setQuery: this.setQuery,
        error: this.error,
        isLoading: this.isLoading
      }, this.$props);

      return h("div", [dom(propsToBePassed)]);
    } catch (e) {
      return null;
    }
  },
  methods: {
    setReact: function setReact(props) {
      var react = props.react;

      if (react) {
        if (this.internalComponent) {
          var newReact = pushToAndClause$6(react, this.internalComponent);
          this.watchComponent(props.componentId, newReact);
        } else {
          this.watchComponent(props.componentId, react);
        }
      } else if (this.internalComponent) {
        this.watchComponent(props.componentId, {
          and: this.internalComponent
        });
      }
    }
  }
};

var mapStateToProps$8 = function mapStateToProps(state, props) {
  return {
    aggregations: state.aggregations[props.componentId] && state.aggregations[props.componentId] || null,
    hits: state.hits[props.componentId] && state.hits[props.componentId].hits || [],
    error: state.error[props.componentId],
    isLoading: state.isLoading[props.componentId],
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
  };
};

var mapDispatchtoProps$8 = {
  addComponent: addComponent$7,
  removeComponent: removeComponent$7,
  setQueryOptions: setQueryOptions$7,
  setQueryListener: setQueryListener$7,
  updateQuery: updateQuery$7,
  watchComponent: watchComponent$7
};
var RcConnected$1 = connect(mapStateToProps$8, mapDispatchtoProps$8)(ReactiveComponent);

ReactiveComponent.install = function (Vue) {
  Vue.component(ReactiveComponent.name, RcConnected$1);
};

var patchValue = configureStore.Actions.patchValue,
    clearValues = configureStore.Actions.clearValues;
var getClassName$a = configureStore.helper.getClassName,
    handleA11yAction$2 = configureStore.helper.handleA11yAction;
var SelectedFilters = {
  name: 'SelectedFilters',
  props: {
    className: VueTypes.string.def(''),
    clearAllLabel: VueTypes.string.def('Clear All'),
    innerClass: types.style,
    showClearAll: VueTypes.bool.def(true),
    title: types.title
  },
  inject: {
    theme: {
      from: 'theme_reactivesearch'
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];

    if (this.$scopedSlots["default"]) {
      return this.$scopedSlots["default"](this.$props);
    }

    var filtersToRender = this.renderFilters();
    var hasValues = !!filtersToRender.length;
    return h(Container, {
      "class": filters(this.theme) + " " + (this.$props.className || '')
    }, [this.$props.title && hasValues && h(Title, {
      "class": getClassName$a(this.$props.innerClass, 'title') || ''
    }, [this.$props.title]), filtersToRender, this.$props.showClearAll && hasValues ? h(Button, {
      "class": getClassName$a(this.$props.innerClass, 'button') || '',
      "on": _extends({}, {
        click: this.clearValues,
        keypress: function keypress() {
          return handleA11yAction$2(event, function () {
            return _this.clearValues();
          });
        }
      }),
      "attrs": {
        "tabIndex": "0"
      }
    }, [this.$props.clearAllLabel]) : null]);
  },
  methods: {
    remove: function remove(component, value) {
      if (value === void 0) {
        value = null;
      }

      this.patchValue(component, {
        value: null
      });
      this.$emit('clear', component, value);
    },
    clearValues: function clearValues() {
      this.clearValuesAction();
      this.$emit('clear', null);
    },
    renderValue: function renderValue(value, isArray) {
      var _this2 = this;

      if (isArray && value.length) {
        var arrayToRender = value.map(function (item) {
          return _this2.renderValue(item);
        });
        return arrayToRender.join(', ');
      }

      if (value && typeof value === 'object') {
        // TODO: support for NestedList
        var label = (typeof value.label === 'string' ? value.label : value.value) || value.key || value.distance || null;

        if (value.location) {
          label = value.location + " - " + label;
        }

        return label;
      }

      return value;
    },
    renderFilters: function renderFilters() {
      var _this3 = this;

      var h = this.$createElement;
      var selectedValues = this.selectedValues;
      return Object.keys(selectedValues).filter(function (id) {
        return _this3.components.includes(id) && selectedValues[id].showFilter;
      }).map(function (component, index) {
        var _selectedValues$compo = selectedValues[component],
            label = _selectedValues$compo.label,
            value = _selectedValues$compo.value;
        var isArray = Array.isArray(value);

        if (label && (isArray && value.length || !isArray && value)) {
          var valueToRender = _this3.renderValue(value, isArray);

          return h(Button, {
            "class": getClassName$a(_this3.$props.innerClass, 'button') || '',
            "key": component + "-" + (index + 1),
            "on": _extends({}, {
              click: function click() {
                return _this3.remove(component, value);
              },
              keypress: function keypress(event) {
                return handleA11yAction$2(event, function () {
                  return _this3.remove(component, value);
                });
              }
            }),
            "attrs": {
              "tabIndex": "0"
            }
          }, [h("span", [selectedValues[component].label, ": ", valueToRender]), h("span", ["\u2715"])]);
        }

        return null;
      }).filter(Boolean);
    }
  }
};

var mapStateToProps$9 = function mapStateToProps(state) {
  return {
    components: state.components,
    selectedValues: state.selectedValues
  };
};

var mapDispatchtoProps$9 = {
  clearValuesAction: clearValues,
  patchValue: patchValue
};
var RcConnected$2 = connect(mapStateToProps$9, mapDispatchtoProps$9)(SelectedFilters);

SelectedFilters.install = function (Vue) {
  Vue.component(SelectedFilters.name, RcConnected$2);
};

var addComponent$8 = configureStore.Actions.addComponent,
    removeComponent$8 = configureStore.Actions.removeComponent,
    watchComponent$8 = configureStore.Actions.watchComponent,
    updateQuery$8 = configureStore.Actions.updateQuery,
    setQueryListener$8 = configureStore.Actions.setQueryListener,
    setQueryOptions$8 = configureStore.Actions.setQueryOptions;
var isEqual$6 = configureStore.helper.isEqual,
    checkValueChange$6 = configureStore.helper.checkValueChange,
    getClassName$b = configureStore.helper.getClassName,
    getOptionsFromQuery$7 = configureStore.helper.getOptionsFromQuery;
var SingleRange = {
  name: 'SingleRange',
  data: function data() {
    this.__state = {
      currentValue: null
    };
    this.type = 'range';
    this.locked = false;
    return this.__state;
  },
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    data: types.data,
    dataField: types.stringRequired,
    defaultSelected: types.string,
    defaultValue: types.string,
    value: types.value,
    filterLabel: types.string,
    innerClass: types.style,
    react: types.react,
    showFilter: VueTypes.bool.def(true),
    showRadio: VueTypes.bool.def(true),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    nestedField: types.string
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, null);
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.setValue(this.selectedValue);
    } else if (this.$props.value) {
      this.setValue(this.$props.value);
    } else if (this.$props.defaultValue) {
      this.setValue(this.$props.defaultValue);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.setValue(this.$props.defaultSelected);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.setValue(newVal);
    },
    defaultValue: function defaultValue(newVal) {
      this.setValue(newVal);
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$6(newVal, oldVal)) {
        this.setValue(newVal);
      }
    },
    selectedValue: function selectedValue(newVal) {
      if (!isEqual$6(this.$data.currentValue, newVal)) {
        this.setValue(newVal);
      }
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$b(this.$props.innerClass, 'title')
    }, [this.$props.title]), h(UL, {
      "class": getClassName$b(this.$props.innerClass, 'list')
    }, [this.$props.data.map(function (item) {
      var selected = !!_this2.$data.currentValue && _this2.$data.currentValue.label === item.label;
      return h("li", {
        "key": item.label,
        "class": "" + (selected ? 'active' : '')
      }, [h(Radio, {
        "class": getClassName$b(_this2.$props.innerClass, 'radio'),
        "attrs": {
          "id": _this2.$props.componentId + "-" + item.label,
          "name": _this2.$props.componentId,
          "value": item.label,
          "type": "radio",
          "checked": selected,
          "show": _this2.$props.showRadio
        },
        "on": {
          "change": _this2.handleChange
        }
      }), h("label", {
        "class": getClassName$b(_this2.$props.innerClass, 'label'),
        "attrs": {
          "for": _this2.$props.componentId + "-" + item.label
        }
      }, [item.label])]);
    })])]);
  },
  methods: {
    setReact: function setReact(props) {
      if (props.react) {
        this.watchComponent(props.componentId, props.react);
      }
    },
    setValue: function setValue(value, props) {
      var _this3 = this;

      if (props === void 0) {
        props = this.$props;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;
      var currentValue = SingleRange.parseValue(value, props);

      var performUpdate = function performUpdate() {
        _this3.currentValue = currentValue;

        _this3.updateQueryHandler(currentValue, props);

        _this3.locked = false;

        _this3.$emit('valueChange', currentValue);
      };

      checkValueChange$6(props.componentId, currentValue, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = SingleRange.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$7(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'SINGLERANGE'
      });
    },
    handleChange: function handleChange(e) {
      var value = this.$props.value;

      if (value === undefined) {
        this.setValue(e.target.value);
      } else {
        this.$emit('change', e.target.value);
      }
    }
  }
};

SingleRange.parseValue = function (value, props) {
  return props.data.find(function (item) {
    return item.label === value;
  }) || null;
};

SingleRange.defaultQuery = function (value, props) {
  var query = null;

  if (value) {
    var _range;

    query = {
      range: (_range = {}, _range[props.dataField] = {
        gte: value.start,
        lte: value.end,
        boost: 2.0
      }, _range)
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

var mapStateToProps$a = function mapStateToProps(state, props) {
  return {
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
  };
};

var mapDispatchtoProps$a = {
  addComponent: addComponent$8,
  removeComponent: removeComponent$8,
  updateQuery: updateQuery$8,
  watchComponent: watchComponent$8,
  setQueryListener: setQueryListener$8,
  setQueryOptions: setQueryOptions$8
};
var RangeConnected = connect(mapStateToProps$a, mapDispatchtoProps$a)(SingleRange);

SingleRange.install = function (Vue) {
  Vue.component(SingleRange.name, RangeConnected);
};

var addComponent$9 = configureStore.Actions.addComponent,
    removeComponent$9 = configureStore.Actions.removeComponent,
    watchComponent$9 = configureStore.Actions.watchComponent,
    updateQuery$9 = configureStore.Actions.updateQuery,
    setQueryListener$9 = configureStore.Actions.setQueryListener,
    setQueryOptions$9 = configureStore.Actions.setQueryOptions;
var isEqual$7 = configureStore.helper.isEqual,
    checkValueChange$7 = configureStore.helper.checkValueChange,
    getClassName$c = configureStore.helper.getClassName,
    getOptionsFromQuery$8 = configureStore.helper.getOptionsFromQuery;
var MultiRange = {
  name: 'MultiRange',
  data: function data() {
    this.state = {
      currentValue: [],
      showModal: false,
      selectedValues: {}
    };
    this.type = 'range';
    this.locked = false;
    return this.state;
  },
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    componentId: types.stringRequired,
    customQuery: types.func,
    data: types.data,
    dataField: types.stringRequired,
    defaultSelected: types.stringArray,
    defaultValue: types.stringArray,
    value: types.stringArray,
    filterLabel: types.string,
    innerClass: types.style,
    react: types.react,
    showFilter: VueTypes.bool.def(true),
    showCheckbox: VueTypes.bool.def(true),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    nestedField: types.string
  },
  methods: {
    setReact: function setReact(props) {
      if (props.react) {
        this.watchComponent(props.componentId, props.react);
      }
    },
    handleClick: function handleClick(e) {
      var value = this.$props.value;

      if (value === undefined) {
        this.selectItem(e.target.value);
      } else {
        var values = parseValueArray(this.selectedValues, e.target.value);
        this.$emit('change', values);
      }
    },
    selectItem: function selectItem(item, isDefaultValue, props, reset) {
      var _this = this;

      if (isDefaultValue === void 0) {
        isDefaultValue = false;
      }

      if (props === void 0) {
        props = this.$props;
      }

      if (reset === void 0) {
        reset = false;
      }

      // ignore state updates when component is locked
      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;
      var currentValue = this.currentValue,
          selectedValues = this.selectedValues;

      if (!item) {
        currentValue = [];
        selectedValues = {};
      } else if (isDefaultValue) {
        currentValue = MultiRange.parseValue(item, props);
        var values = {};
        currentValue.forEach(function (value) {
          values[[value.label]] = true;
        });

        if (reset) {
          selectedValues = values;
        } else {
          selectedValues = _extends({}, selectedValues, {}, values);
        }
      } else if (selectedValues[item]) {
        currentValue = currentValue.filter(function (value) {
          return value.label !== item;
        });

        var _selectedValues = selectedValues,
            del = _selectedValues[item],
            selected = _objectWithoutPropertiesLoose(_selectedValues, [item].map(_toPropertyKey));

        selectedValues = selected;
      } else {
        var _extends2;

        var currentItem = props.data.find(function (value) {
          return item === value.label;
        });
        currentValue = [].concat(currentValue, [currentItem]);
        selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[item] = true, _extends2));
      }

      var performUpdate = function performUpdate() {
        _this.currentValue = currentValue;
        _this.selectedValues = selectedValues;

        _this.updateQueryHandler(currentValue, props);

        _this.locked = false;

        _this.$emit('valueChange', Object.keys(selectedValues));
      };

      checkValueChange$7(props.componentId, currentValue, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = MultiRange.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$8(customQuery(value, props));
      }

      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: props.showFilter,
        URLParams: props.URLParams,
        componentType: 'MULTIRANGE'
      });
    }
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    dataField: function dataField() {
      this.updateQueryHandler(this.$data.currentValue, this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.selectItem(newVal, true, undefined, true);
    },
    defaultValue: function defaultValue(newVal) {
      this.selectItem(newVal, true, undefined, true);
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$7(newVal, oldVal)) {
        this.selectItem(newVal, true, undefined, true);
      }
    },
    selectedValue: function selectedValue(newVal) {
      if (!isEqual$7(this.$data.currentValue, newVal)) {
        this.selectItem(newVal);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2.$emit.apply(_this2, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, null);
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId);
    this.setReact(this.$props);

    if (this.selectedValue) {
      this.selectItem(this.selectedValue, true);
    } else if (this.$props.value) {
      this.selectItem(this.$props.value, true);
    } else if (this.$props.defaultValue) {
      this.selectItem(this.$props.defaultValue, true);
    } else if (this.$props.defaultSelected) {
      /* TODO: Remove this before next release */
      deprecatePropWarning('defaultSelected', 'defaultValue');
      this.selectItem(this.$props.defaultSelected, true);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
  },
  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$c(this.$props.innerClass, 'title')
    }, [this.$props.title]), h(UL, {
      "class": getClassName$c(this.$props.innerClass, 'list')
    }, [this.$props.data.map(function (item) {
      var selected = !!_this3.$data.currentValue && _this3.$data.currentValue.label === item.label;
      return h("li", {
        "key": item.label,
        "class": "" + (selected ? 'active' : '')
      }, [h(Checkbox, {
        "class": getClassName$c(_this3.$props.innerClass, 'checkbox'),
        "attrs": {
          "id": _this3.$props.componentId + "-" + item.label,
          "name": _this3.$props.componentId,
          "value": item.label,
          "type": "Checkbox",
          "show": _this3.$props.showCheckbox
        },
        "domProps": _extends({}, {
          checked: _this3.selectedValues[item.label]
        }),
        "on": _extends({}, {
          click: _this3.handleClick
        })
      }), h("label", {
        "class": getClassName$c(_this3.$props.innerClass, 'label'),
        "attrs": {
          "for": _this3.$props.componentId + "-" + item.label
        }
      }, [item.label])]);
    })])]);
  }
};

MultiRange.parseValue = function (value, props) {
  return value ? props.data.filter(function (item) {
    return value.includes(item.label);
  }) : null;
};

MultiRange.defaultQuery = function (values, props) {
  var generateRangeQuery = function generateRangeQuery(dataField, items) {
    if (items.length > 0) {
      return items.map(function (value) {
        var _range;

        return {
          range: (_range = {}, _range[dataField] = {
            gte: value.start,
            lte: value.end,
            boost: 2.0
          }, _range)
        };
      });
    }

    return null;
  };

  var query = null;

  if (values && values.length) {
    query = {
      bool: {
        should: generateRangeQuery(props.dataField, values),
        minimum_should_match: 1,
        boost: 1.0
      }
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

var mapStateToProps$b = function mapStateToProps(state, props) {
  return {
    selectedValue: state.selectedValues[props.componentId] && state.selectedValues[props.componentId].value || null
  };
};

var mapDispatchtoProps$b = {
  addComponent: addComponent$9,
  removeComponent: removeComponent$9,
  updateQuery: updateQuery$9,
  watchComponent: watchComponent$9,
  setQueryListener: setQueryListener$9,
  setQueryOptions: setQueryOptions$9
};
var RangeConnected$1 = connect(mapStateToProps$b, mapDispatchtoProps$b)(MultiRange);

MultiRange.install = function (Vue) {
  Vue.component(MultiRange.name, RangeConnected$1);
};

function _templateObject3$6() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: auto;\n\tflex-grow: 1;\n\toutline: none;\n\ttext-decoration: none;\n\tmin-width: 240px;\n\tmax-width: 250px;\n\tborder-radius: 0.25rem;\n\tbackground-color: ", ";\n\theight: 300px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: space-between;\n\tmargin: 8px;\n\tpadding: 10px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);\n\tcolor: ", ";\n\t", ";\n\ttransition: all 0.3s ease;\n\n\th2 {\n\t\twidth: 100%;\n\t\tfont-size: 0.9rem;\n\t\tline-height: 1.2rem;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin: 0;\n\t\tpadding: 10px 0 8px;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n\n\tarticle {\n\t\tflex-grow: 1;\n\t\tfont-size: 0.9rem;\n\t}\n\n\t&:hover,\n\t&:focus {\n\t\tbox-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.3);\n\t}\n\n\t@media (max-width: 420px) {\n\t\twidth: 50%;\n\t\tmin-width: 0;\n\t\theight: 210px;\n\t\tmargin: 0;\n\t\tborder-radius: 0;\n\t\tbox-shadow: none;\n\t\tborder: 1px solid #eee;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\tbox-shadow: 0;\n\t\t}\n\t}\n"]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: calc(100% + 20px);\n\theight: 220px;\n\tmargin: -10px -10px 0;\n\tbackground-color: ", ";\n\tbackground-size: contain;\n\tbackground-position: center center;\n\tbackground-repeat: no-repeat;\n"]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$c() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: center;\n\tflex-wrap: wrap;\n\tmargin: 0 -8px;\n\n\t@media (max-width: 420px) {\n\t\tmargin: 0;\n\t}\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var container = emotion.css(_templateObject$c());
var Image = styled__default('div')(_templateObject2$8(), function (_ref) {
  var colors = _ref.theme.colors;
  return colors.backgroundColor || '#fcfcfc';
});
var Card = styled__default('a')(_templateObject3$6(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.backgroundColor ? polished.lighten(0.1, theme.colors.backgroundColor) : '#fff';
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.textColor;
}, function (props) {
  return props.href ? 'cursor: pointer' : null;
});

var getClassName$d = configureStore.helper.getClassName;
var ResultCard = {
  name: 'ResultCard',
  props: {
    currentPage: VueTypes.number.def(0),
    includeFields: types.includeFields.def(['*']),
    // component props
    className: types.string,
    componentId: types.stringRequired,
    dataField: types.stringRequired,
    defaultQuery: types.func,
    excludeFields: types.excludeFields.def([]),
    innerClass: types.style,
    listClass: VueTypes.string.def(''),
    loader: types.title,
    renderAllData: types.func,
    renderData: types.func,
    onResultStats: types.func,
    onNoResults: VueTypes.string.def('No Results found.'),
    pages: VueTypes.number.def(5),
    pagination: VueTypes.bool.def(false),
    paginationAt: types.paginationAt.def('bottom'),
    react: types.react,
    showResultStats: VueTypes.bool.def(true),
    size: VueTypes.number.def(10),
    sortBy: types.sortBy,
    sortOptions: types.sortOptions,
    stream: types.bool,
    URLParams: VueTypes.bool.def(false),
    target: VueTypes.string.def('_blank')
  },
  render: function render() {
    var h = arguments[0];

    var _this$$props = this.$props,
        renderData = _this$$props.renderData,
        props = _objectWithoutPropertiesLoose(_this$$props, ["renderData"]);

    var onResultStats = this.$props.onResultStats || this.$scopedSlots.onResultStats;
    return h(RLConnected, {
      "props": _extends({}, _extends({}, props, {
        renderData: this.renderAsCard,
        onResultStats: onResultStats,
        listClass: container
      }))
    });
  },
  methods: {
    renderAsCard: function renderAsCard(_ref) {
      var item = _ref.item,
          triggerClickAnalytics = _ref.triggerClickAnalytics;
      var h = this.$createElement;
      var renderData = this.$props.renderData || this.$scopedSlots.renderData;
      var result = renderData(item);

      if (result) {
        return h(Card, _mergeJSXProps([{
          "key": item._id,
          "attrs": {
            "href": result.url,
            "className": getClassName$d(this.$props.innerClass, 'listItem'),
            "target": this.$props.target,
            "rel": this.$props.target === '_blank' ? 'noopener noreferrer' : null
          },
          "on": _extends({}, {
            click: triggerClickAnalytics
          })
        }, result.containerProps]), [h(Image, {
          "style": {
            backgroundImage: "url(" + result.image + ")"
          },
          "attrs": {
            "className": getClassName$d(this.$props.innerClass, 'image')
          }
        }), typeof result.title === 'string' ? h(Title, {
          "domProps": _extends({}, {
            innerHTML: result.title
          }),
          "attrs": {
            "className": getClassName$d(this.$props.innerClass, 'title')
          }
        }) : h(Title, {
          "attrs": {
            "className": getClassName$d(this.$props.innerClass, 'title')
          }
        }, [result.title]), typeof result.description === 'string' ? h("article", {
          "domProps": _extends({}, {
            innerHTML: result.description
          })
        }) : h("article", [result.description])]);
      }

      return null;
    }
  }
};

ResultCard.generateQueryOptions = function (props) {
  return ReactiveList.generateQueryOptions(props);
};

ResultCard.install = function (Vue) {
  Vue.component(ResultCard.name, ResultCard);
};

function _templateObject4$6() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\theight: auto;\n\toutline: none;\n\ttext-decoration: none;\n\tborder-radius: 0;\n\tbackground-color: ", ";\n\tdisplay: flex;\n\tflex-direction: row;\n\tmargin: 0;\n\tpadding: 10px;\n\tborder-bottom: 1px solid ", ";\n\tcolor: ", ";\n\t", "; all 0.3s ease;\n\n\t&:hover, &:focus {\n\t\tbackground-color: ", ";\n\t}\n\n\t&:last-child {\n\t\tborder: 0;\n\t}\n\n\th2 {\n\t\twidth: 100%;\n\t\tline-height: 1.2rem;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin: 0;\n\t\tpadding: 0 0 8px;\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n\n\tarticle {\n\t\twidth: ", ";\n\t\tpadding-left: ", ";\n\t\tfont-size: 0.9rem;\n\t}\n\n\t&:hover, &:focus {\n\t\tbox-shadow: 0 0 0 0 rgba(0,0,0,0.10);\n\t}\n\n\t@media (max-width: 420px) {\n\t\tmin-width: 0;\n\t\tmargin: 0;\n\t\tborder-radius: 0;\n\t\tbox-shadow: none;\n\t\tborder: 1px solid #eee;\n\n\t\t&:hover, &:focus {\n\t\t\tbox-shadow: 0;\n\t\t}\n\t}\n"]);

  _templateObject4$6 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$7() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 160px;\n\theight: 160px;\n\t", ";\n\tmargin: 0;\n\tbackground-size: contain;\n\tbackground-position: center center;\n\tbackground-repeat: no-repeat;\n\tbackground-image: ", ";\n"]);

  _templateObject3$7 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$9() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100px;\n\theight: 100px;\n"]);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: 0;\n\tborder-radius: 0.25rem;\n\toverflow: hidden;\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var container$1 = emotion.css(_templateObject$d());
var smallImage = emotion.css(_templateObject2$9());
var Image$1 = styled__default('div')(_templateObject3$7(), function (props) {
  return props.small ? smallImage : null;
}, function (props) {
  return "url(" + props.src + ")";
});
var ListItem = styled__default('a')(_templateObject4$6(), function (_ref) {
  var theme = _ref.theme;
  return theme.colors.backgroundColor ? polished.lighten(0.1, theme.colors.backgroundColor) : '#fff';
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.backgroundColor ? polished.lighten(0.3, theme.colors.backgroundColor) : polished.lighten(0.68, theme.colors.textColor);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.textColor;
}, function (props) {
  return props.href ? 'cursor: pointer' : null;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.colors.backgroundColor ? polished.lighten(0.2, theme.colors.backgroundColor) : '#fdfefd';
}, function (props) {
  if (props.image) {
    return props.small ? 'calc(100% - 100px)' : 'calc(100% - 160px)';
  }

  return '100%';
}, function (props) {
  return props.image ? '10px' : 0;
});

var getClassName$e = configureStore.helper.getClassName;
var ResultList = {
  name: 'ResultList',
  props: {
    currentPage: VueTypes.number.def(0),
    includeFields: types.includeFields.def(['*']),
    // component props
    className: types.string,
    componentId: types.stringRequired,
    dataField: types.stringRequired,
    defaultQuery: types.func,
    excludeFields: types.excludeFields.def([]),
    innerClass: types.style,
    listClass: VueTypes.string.def(''),
    loader: types.title,
    renderAllData: types.func,
    renderData: types.func,
    onResultStats: types.func,
    onNoResults: VueTypes.string.def('No Results found.'),
    pages: VueTypes.number.def(5),
    pagination: VueTypes.bool.def(false),
    paginationAt: types.paginationAt.def('bottom'),
    react: types.react,
    showResultStats: VueTypes.bool.def(true),
    size: VueTypes.number.def(10),
    sortBy: types.sortBy,
    sortOptions: types.sortOptions,
    stream: types.bool,
    URLParams: VueTypes.bool.def(false),
    target: VueTypes.string.def('_blank')
  },
  render: function render() {
    var h = arguments[0];

    var _this$$props = this.$props,
        renderData = _this$$props.renderData,
        props = _objectWithoutPropertiesLoose(_this$$props, ["renderData"]);

    var onResultStats = this.$props.onResultStats || this.$scopedSlots.onResultStats;
    return h(RLConnected, {
      "props": _extends({}, _extends({}, props, {
        renderData: this.renderAsList,
        onResultStats: onResultStats,
        listClass: container$1
      }))
    });
  },
  methods: {
    renderAsList: function renderAsList(_ref) {
      var item = _ref.item,
          triggerClickAnalytics = _ref.triggerClickAnalytics;
      var h = this.$createElement;
      var renderData = this.$props.renderData || this.$scopedSlots.renderData;
      var result = renderData(item);

      if (result) {
        return h(ListItem, _mergeJSXProps([{
          "key": item._id,
          "attrs": {
            "href": result.url,
            "className": getClassName$e(this.$props.innerClass, 'listItem'),
            "target": this.$props.target,
            "rel": this.$props.target === '_blank' ? 'noopener noreferrer' : null
          },
          "on": _extends({}, {
            click: triggerClickAnalytics
          })
        }, result.containerProps, {
          "attrs": {
            "image": !!result.image,
            "small": result.image_size === 'small'
          }
        }]), [result.image ? h(Image$1, {
          "attrs": {
            "src": result.image,
            "small": result.image_size === 'small',
            "className": getClassName$e(this.$props.innerClass, 'image')
          }
        }) : null, h("article", [typeof result.title === 'string' ? h(Title, {
          "domProps": _extends({}, {
            innerHTML: result.title
          }),
          "attrs": {
            "className": getClassName$e(this.$props.innerClass, 'title')
          }
        }) : h(Title, {
          "attrs": {
            "className": getClassName$e(this.$props.innerClass, 'title')
          }
        }, [result.title]), typeof result.description === 'string' ? h("div", {
          "domProps": _extends({}, {
            innerHTML: result.description
          })
        }) : h("div", [result.description])])]);
      }

      return null;
    }
  }
};

ResultList.generateQueryOptions = function (props) {
  return ReactiveList.generateQueryOptions(props);
};

ResultList.install = function (Vue) {
  Vue.component(ResultList.name, ResultList);
};

function _templateObject$e() {
  var data = _taggedTemplateLiteralLoose(["\n\tmargin-top: 30px;\n\tpadding: 10px;\n\n\t/* component style */\n\t.vue-slider-disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t}\n\n\t/* rail style */\n\t.vue-slider-rail {\n\t\tbackground-color: #ccc;\n\t\tborder-radius: 15px;\n\t\theight: 4px;\n\t}\n\n\t/* process style */\n\t.vue-slider-process {\n\t\tbackground-color: #0b6aff;\n\t\tborder-radius: 15px;\n\t}\n\n\t/* mark style */\n\t.vue-slider-mark {\n\t\tz-index: 4;\n\t}\n\n\t.vue-slider-mark:first-child .vue-slider-mark-step,\n\t.vue-slider-mark:last-child .vue-slider-mark-step {\n\t\tdisplay: none;\n\t}\n\n\t.vue-slider-mark-step {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder-radius: 50%;\n\t\tbackground-color: rgba(0, 0, 0, 0.16);\n\t}\n\n\t.vue-slider-mark-label {\n\t\tfont-size: 14px;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* dot style */\n\t.vue-slider-dot{\n\t\tz-index: 2;\n\t}\n\n\t.vue-slider-dot-handle {\n\t\tcursor: pointer;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tborder-radius: 50%;\n\t\tbackground-color: #fff;\n\t\tbox-sizing: border-box;\n\t\tborder: 1px solid #9a9a9a;\n\t\tz-index: 2;\n\t}\n\n\t.vue-slider-dot-handle-disabled {\n\t\tcursor: not-allowed;\n\t\tbackground-color: #ccc;\n\t}\n\n\t.vue-slider-dot-tooltip-inner {\n\t\tfont-size: 14px;\n\t\twhite-space: nowrap;\n\t\tpadding: 2px 5px;\n\t\tmin-width: 20px;\n\t\ttext-align: center;\n\t\tcolor: #fff;\n\t\tborder-radius: 5px;\n\t\tborder-color: #000;\n\t\tbackground-color: #000;\n\t\tbox-sizing: content-box;\n\t}\n\n\t.vue-slider-dot-tooltip-inner::after {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t}\n\n\t.vue-slider-dot -tooltip-inner-top::after {\n\t\ttop: 100%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, 0);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-top-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-bottom::after {\n\t\tbottom: 100%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, 0);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-bottom-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-left::after {\n\t\tleft: 100%;\n\t\ttop: 50%;\n\t\ttransform: translate(0, -50%);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-left-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-inner-right::after {\n\t\tright: 100%;\n\t\ttop: 50%;\n\t\ttransform: translate(0, -50%);\n\t\theight: 0;\n\t\twidth: 0;\n\t\tborder-color: transparent;\n\t\tborder-style: solid;\n\t\tborder-width: 5px;\n\t\tborder-right-color: inherit;\n\t}\n\n\t.vue-slider-dot-tooltip-wrapper {\n\t\topacity: 0;\n\t\ttransition: all 0.3s;\n\t}\n\t.vue-slider-dot-tooltip-wrapper-show {\n\t\topacity: 1;\n\t}\n\n\t.label-container {\n\t\tmargin: 10px 0;\n\t\twidth: 100%;\n\t}\n\n\t.range-label-right {\n\t\tfloat: right;\n\t}\n"]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var Slider = styled__default('div')(_templateObject$e());

/**
 * Caution: Please do not change this file without having a discussion with the Team.
 * Any change may break the umd build, we're directly replacing the line no: 14
 * `components['vue-slider-component'] = require('vue-slider-component');` in rollup umd build process with some script.
 */
// eslint-disable-next-line

var getComponents = function getComponents() {
  var components = {
    NoSSR: NoSSR
  };

  if (process.browser) {
    try {
      // in older versions of nuxt, it's process.BROWSER_BUILD
      // eslint-disable-next-line
      components['vue-slider-component'] = require('vue-slider-component');
    } catch (e) {
      console.error('Unable to load vue-slider', e);
    }
  }

  return components;
};

var addComponent$a = configureStore.Actions.addComponent,
    removeComponent$a = configureStore.Actions.removeComponent,
    watchComponent$a = configureStore.Actions.watchComponent,
    updateQuery$a = configureStore.Actions.updateQuery,
    setQueryListener$a = configureStore.Actions.setQueryListener,
    setQueryOptions$a = configureStore.Actions.setQueryOptions;
var checkValueChange$8 = configureStore.helper.checkValueChange,
    getClassName$f = configureStore.helper.getClassName,
    getOptionsFromQuery$9 = configureStore.helper.getOptionsFromQuery,
    isEqual$8 = configureStore.helper.isEqual;
var RangeSlider = {
  name: 'RangeSlider',
  components: getComponents(),
  inject: {
    theme: {
      from: 'theme_reactivesearch'
    }
  },
  data: function data() {
    var state = {
      currentValue: this.$props.range ? [this.$props.range.start, this.$props.range.end] : [],
      stats: []
    };
    this.locked = false;
    return state;
  },
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    range: VueTypes.shape({
      start: VueTypes.integer.def(0),
      end: VueTypes.integer.def(10)
    }),
    rangeLabels: types.rangeLabels,
    componentId: types.stringRequired,
    customQuery: types.func,
    data: types.data,
    dataField: types.stringRequired,
    defaultSelected: types.range,
    defaultValue: types.range,
    value: types.range,
    filterLabel: types.string,
    innerClass: types.style,
    react: types.react,
    showFilter: VueTypes.bool.def(true),
    showCheckbox: VueTypes.bool.def(true),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    sliderOptions: VueTypes.object.def({}),
    nestedField: types.string
  },
  methods: {
    setReact: function setReact(props) {
      if (props.react) {
        this.watchComponent(props.componentId, props.react);
      }
    },
    handleSlider: function handleSlider(values) {
      var value = this.$props.value;

      if (value === undefined) {
        this.handleChange(values.currentValue);
      } else {
        this.$emit('change', {
          start: values.currentValue[0],
          end: values.currentValue[1]
        });
      }
    },
    handleChange: function handleChange(currentValue, props) {
      var _this = this;

      if (props === void 0) {
        props = this.$props;
      }

      if (props.beforeValueChange && this.locked) {
        return;
      }

      this.locked = true;

      var performUpdate = function performUpdate() {
        _this.currentValue = currentValue;

        _this.updateQueryHandler([currentValue[0], currentValue[1]], props);

        _this.locked = false;

        _this.$emit('valueChange', {
          start: currentValue[0],
          end: currentValue[1]
        });
      };

      checkValueChange$8(props.componentId, {
        start: currentValue[0],
        end: currentValue[1]
      }, props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value, props) {
      var customQuery = props.customQuery;
      var query = RangeSlider.defaultQuery(value, props);
      var customQueryOptions;

      if (customQuery) {
        var _ref = customQuery(value, props) || {};

        query = _ref.query;
        customQueryOptions = getOptionsFromQuery$9(customQuery(value, props));
      }

      var showFilter = props.showFilter,
          _props$range = props.range,
          start = _props$range.start,
          end = _props$range.end;
      var currentStart = value[0],
          currentEnd = value[1]; // check if the slider is at its initial position

      var isInitialValue = currentStart === start && currentEnd === end;
      this.setQueryOptions(props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: props.componentId,
        query: query,
        value: value,
        label: props.filterLabel,
        showFilter: showFilter && !isInitialValue,
        URLParams: props.URLParams,
        componentType: 'RANGESLIDER'
      });
    }
  },
  watch: {
    react: function react() {
      this.setReact(this.$props);
    },
    defaultSelected: function defaultSelected(newVal) {
      this.handleChange(RangeSlider.parseValue(newVal, this.$props));
    },
    defaultValue: function defaultValue(newVal) {
      this.handleChange(RangeSlider.parseValue(newVal, this.$props));
    },
    value: function value(newVal, oldVal) {
      if (!isEqual$8(newVal, oldVal)) {
        this.handleChange(RangeSlider.parseValue(newVal, this.$props));
      }
    },
    selectedValue: function selectedValue(newVal) {
      if (!isEqual$8(this.$data.currentValue, newVal)) {
        this.handleChange(RangeSlider.parseValue(newVal, this.$props));
      }
    }
  },
  created: function created() {
    var _this2 = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this2.$emit.apply(_this2, ['queryChange'].concat(args));
    };

    if (!this.$props.range) {
      console.error('%crange is not defined. Read more about this at https://opensource.appbase.io/reactive-manual/vue/range-components/rangeslider.html#props', 'font-size: 12.5px;');
    }

    this.setQueryListener(this.$props.componentId, onQueryChange, null);
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId);
    this.setReact(this.$props);
    var _this$$props = this.$props,
        defaultSelected = _this$$props.defaultSelected,
        value = _this$$props.value,
        defaultValue = _this$$props.defaultValue;
    var selectedValue = this.selectedValue;

    if (this.$props.range) {
      if (Array.isArray(selectedValue)) {
        this.handleChange(selectedValue);
      } else if (selectedValue) {
        this.handleChange(RangeSlider.parseValue(selectedValue, this.$props));
      } else if (value) {
        this.handleChange(RangeSlider.parseValue(value, this.$props));
      } else if (defaultValue) {
        this.handleChange(RangeSlider.parseValue(defaultValue, this.$props));
      } else if (defaultSelected) {
        /* TODO: Remove this before next release */
        deprecatePropWarning('defaultSelected', 'defaultValue');
        this.handleChange(RangeSlider.parseValue(defaultSelected, this.$props));
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
  },
  render: function render() {
    var h = arguments[0];
    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$f(this.$props.innerClass, 'title')
    }, [this.$props.title]), this.$props.range ? h(NoSSR, [h(Slider, {
      "class": getClassName$f(this.$props.innerClass, 'slider')
    }, [h("vue-slider-component", {
      "ref": "slider",
      "attrs": {
        "value": this.currentValue,
        "min": this.$props.range.start,
        "max": this.$props.range.end,
        "dotSize": 20,
        "height": 4,
        "enable-cross": false
      },
      "on": {
        "drag-end": this.handleSlider
      },
      "props": _extends({}, this.$props.sliderOptions)
    }), this.$props.rangeLabels && h("div", {
      "class": "label-container"
    }, [h("label", {
      "class": getClassName$f(this.$props.innerClass, 'label') || 'range-label-left'
    }, [this.$props.rangeLabels.start]), h("label", {
      "class": getClassName$f(this.$props.innerClass, 'label') || 'range-label-right'
    }, [this.$props.rangeLabels.end])])])]) : null]);
  }
};

RangeSlider.defaultQuery = function (values, props) {
  var query = null;

  if (Array.isArray(values) && values.length) {
    var _range;

    query = {
      range: (_range = {}, _range[props.dataField] = {
        gte: values[0],
        lte: values[1],
        boost: 2.0
      }, _range)
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

RangeSlider.parseValue = function (value, props) {
  if (value) {
    return [value.start, value.end];
  }

  if (props.range) {
    return [props.range.start, props.range.end];
  }

  return [];
};

var mapStateToProps$c = function mapStateToProps(state, props) {
  return {
    options: state.aggregations[props.componentId] ? state.aggregations[props.componentId][props.dataField] && state.aggregations[props.componentId][props.dataField].buckets // eslint-disable-line
    : [],
    selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
  };
};

var mapDispatchtoProps$c = {
  addComponent: addComponent$a,
  removeComponent: removeComponent$a,
  updateQuery: updateQuery$a,
  watchComponent: watchComponent$a,
  setQueryListener: setQueryListener$a,
  setQueryOptions: setQueryOptions$a
};
var RangeConnected$2 = connect(mapStateToProps$c, mapDispatchtoProps$c)(RangeSlider);

RangeSlider.install = function (Vue) {
  Vue.component(RangeSlider.name, RangeConnected$2);
};

var addComponent$b = configureStore.Actions.addComponent,
    removeComponent$b = configureStore.Actions.removeComponent,
    watchComponent$b = configureStore.Actions.watchComponent,
    updateQuery$b = configureStore.Actions.updateQuery,
    setQueryListener$b = configureStore.Actions.setQueryListener,
    setQueryOptions$b = configureStore.Actions.setQueryOptions;
var checkValueChange$9 = configureStore.helper.checkValueChange,
    getClassName$g = configureStore.helper.getClassName,
    getOptionsFromQuery$a = configureStore.helper.getOptionsFromQuery,
    isEqual$9 = configureStore.helper.isEqual;
var DynamicRangeSlider = {
  name: 'DynamicRangeSlider',
  components: getComponents(),
  props: {
    beforeValueChange: types.func,
    className: VueTypes.string.def(''),
    rangeLabels: types.func,
    componentId: types.stringRequired,
    customQuery: types.func,
    data: types.data,
    dataField: types.stringRequired,
    defaultSelected: types.func,
    filterLabel: types.string,
    innerClass: types.style,
    react: types.react,
    showFilter: VueTypes.bool.def(true),
    showCheckbox: VueTypes.bool.def(true),
    title: types.title,
    URLParams: VueTypes.bool.def(false),
    sliderOptions: VueTypes.object.def({}),
    nestedField: types.string
  },
  data: function data() {
    this.internalRangeComponent = this.$props.componentId + "__range__internal";
    this.locked = false;
    return {
      currentValue: null,
      stats: []
    };
  },
  created: function created() {
    var _this = this;

    var onQueryChange = function onQueryChange() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.$emit.apply(_this, ['queryChange'].concat(args));
    };

    this.setQueryListener(this.$props.componentId, onQueryChange, null);
  },
  beforeMount: function beforeMount() {
    this.addComponent(this.$props.componentId);
    this.addComponent(this.$props.internalRangeComponent);

    if (Array.isArray(this.selectedValue)) {
      this.handleChange(this.selectedValue);
    } else if (this.selectedValue) {
      this.handleChange(DynamicRangeSlider.parseValue(this.selectedValue, this.$props));
    } // get range before executing other queries


    this.updateRangeQueryOptions();
    this.setReact();
  },
  beforeUpdate: function beforeUpdate() {
    if (!this.currentValue) {
      this.setDefaultValue(this.range);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeComponent(this.$props.componentId);
    this.removeComponent(this.internalRangeComponent);
  },
  methods: {
    setDefaultValue: function setDefaultValue(_ref) {
      var start = _ref.start,
          end = _ref.end;

      if (this.$props.defaultSelected) {
        var _this$$props$defaultS = this.$props.defaultSelected(start, end),
            defaultStart = _this$$props$defaultS.start,
            defaultEnd = _this$$props$defaultS.end;

        this.handleChange([defaultStart, defaultEnd]);
      } else {
        this.currentValue = [start, end];
      }
    },
    setReact: function setReact() {
      if (this.$props.react) {
        this.watchComponent(this.internalRangeComponent, this.$props.react);
        this.watchComponent(this.$props.componentId, this.$props.react);
      } else {
        this.watchComponent(this.internalRangeComponent, {});
        this.watchComponent(this.$props.componentId, {});
      }
    },
    rangeQuery: function rangeQuery() {
      return {
        min: {
          min: {
            field: this.$props.dataField
          }
        },
        max: {
          max: {
            field: this.$props.dataField
          }
        }
      };
    },
    updateRangeQueryOptions: function updateRangeQueryOptions() {
      var aggs = {};

      if (this.$props.nestedField) {
        var _aggs;

        aggs = (_aggs = {}, _aggs[this.$props.nestedField] = {
          nested: {
            path: this.$props.nestedField
          },
          aggs: this.rangeQuery()
        }, _aggs);
      } else {
        aggs = this.rangeQuery();
      }

      this.setQueryOptions(this.internalRangeComponent, {
        aggs: aggs
      });
    },
    handleSlider: function handleSlider(values) {
      this.handleChange(values.currentValue);
    },
    handleChange: function handleChange(currentValue) {
      var _this2 = this;

      if (this.$props.beforeValueChange && this.locked) return; // Always keep the values within range

      var normalizedValue = [this.range ? Math.max(this.range.start, currentValue[0]) : currentValue[0], this.range ? Math.min(this.range.end, currentValue[1]) : currentValue[1]];
      this.locked = true;

      var performUpdate = function performUpdate() {
        _this2.currentValue = normalizedValue;

        _this2.updateQueryHandler(normalizedValue, _this2.$props);

        _this2.locked = false;

        _this2.$emit('valueChange', {
          start: normalizedValue[0],
          end: normalizedValue[1]
        });
      };

      checkValueChange$9(this.$props.componentId, {
        start: normalizedValue[0],
        end: normalizedValue[1]
      }, this.$props.beforeValueChange, performUpdate);
    },
    updateQueryHandler: function updateQueryHandler(value) {
      var query = DynamicRangeSlider.defaultQuery(value, this.$props);
      var customQueryOptions;

      if (this.$props.customQuery) {
        var _ref2 = this.$props.customQuery(value, this.$props) || {};

        query = _ref2.query;
        customQueryOptions = getOptionsFromQuery$a(this.$props.customQuery(value, this.$props));
      }

      var _ref3 = this.range || {
        start: value[0],
        end: value[1]
      },
          start = _ref3.start,
          end = _ref3.end;

      var currentStart = value[0],
          currentEnd = value[1]; // check if the slider is at its initial position

      var isInitialValue = currentStart === start && currentEnd === end;
      this.setQueryOptions(this.$props.componentId, customQueryOptions);
      this.updateQuery({
        componentId: this.$props.componentId,
        query: query,
        value: value,
        label: this.$props.filterLabel,
        showFilter: this.$props.showFilter && !isInitialValue,
        URLParams: this.$props.URLParams,
        componentType: 'DYNAMICRANGESLIDER'
      });
    }
  },
  computed: {
    labels: function labels() {
      if (!this.rangeLabels) return null;
      return this.rangeLabels(this.range.start, this.range.end);
    }
  },
  watch: {
    react: function react() {
      this.setReact();
    },
    selectedValue: function selectedValue(newValue) {
      if (isEqual$9(newValue, this.currentValue)) return;
      var value = newValue || {
        start: this.range.start,
        end: this.range.end
      };
      this.handleChange(DynamicRangeSlider.parseValue(value, this.$props));
    },
    range: function range(newValue, oldValue) {
      if (isEqual$9(newValue, oldValue) || !this.currentValue) return;

      var _ref4 = this.currentValue || [],
          currentStart = _ref4[0],
          currentEnd = _ref4[1];

      var _ref5 = oldValue || {},
          oldStart = _ref5.start,
          oldEnd = _ref5.end;

      var newStart = currentStart === oldStart ? newValue.start : currentStart;
      var newEnd = currentEnd === oldEnd ? newValue.end : currentEnd;
      this.handleChange([newStart, newEnd]);
    }
  },
  render: function render() {
    var h = arguments[0];

    if (!this.range) {
      return null;
    }

    var _this$range = this.range,
        start = _this$range.start,
        end = _this$range.end;
    return h(Container, {
      "class": this.$props.className
    }, [this.$props.title && h(Title, {
      "class": getClassName$g(this.$props.innerClass, 'title')
    }, [this.$props.title]), h(NoSSR, [h(Slider, {
      "class": getClassName$g(this.$props.innerClass, 'slider')
    }, [h("vue-slider-component", {
      "attrs": {
        "value": [Math.max(start, this.currentValue[0]), Math.min(end, this.currentValue[1])],
        "min": Math.min(start, this.currentValue[0]),
        "max": Math.max(end, this.currentValue[1]),
        "dotSize": 20,
        "height": 4,
        "enable-cross": false
      },
      "on": {
        "drag-end": this.handleSlider
      },
      "props": _extends({}, this.$props.sliderOptions)
    }), this.labels ? h("div", {
      "class": "label-container"
    }, [h("label", {
      "class": getClassName$g(this.$props.innerClass, 'label') || 'range-label-left'
    }, [this.labels.start]), h("label", {
      "class": getClassName$g(this.$props.innerClass, 'label') || 'range-label-right'
    }, [this.labels.end])]) : null])])]);
  }
};

DynamicRangeSlider.defaultQuery = function (values, props) {
  var query = null;

  if (Array.isArray(values) && values.length) {
    var _range;

    query = {
      range: (_range = {}, _range[props.dataField] = {
        gte: values[0],
        lte: values[1],
        boost: 2.0
      }, _range)
    };
  }

  if (query && props.nestedField) {
    return {
      query: {
        nested: {
          path: props.nestedField,
          query: query
        }
      }
    };
  }

  return query;
};

DynamicRangeSlider.parseValue = function (value) {
  return [value.start, value.end];
};

var mapStateToProps$d = function mapStateToProps(state, props) {
  var componentId = state.aggregations[props.componentId];
  var internalRange = state.aggregations[props.componentId + "__range__internal"];
  var options = componentId && componentId[props.dataField];
  var range = state.aggregations[props.componentId + "__range__internal"];

  if (props.nestedField) {
    options = options && componentId[props.dataField][props.nestedField] && componentId[props.dataField][props.nestedField].buckets ? componentId[props.dataField][props.nestedField].buckets : [];
    range = range && internalRange[props.nestedField].min ? {
      start: internalRange[props.nestedField].min.value,
      end: internalRange[props.nestedField].max.value
    } : null;
  } else {
    options = options && componentId[props.dataField].buckets ? componentId[props.dataField].buckets : [];
    range = range && internalRange.min ? {
      start: internalRange.min.value,
      end: internalRange.max.value
    } : null;
  }

  return {
    options: options,
    range: range,
    selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
  };
};

var mapDispatchtoProps$d = {
  addComponent: addComponent$b,
  removeComponent: removeComponent$b,
  updateQuery: updateQuery$b,
  watchComponent: watchComponent$b,
  setQueryListener: setQueryListener$b,
  setQueryOptions: setQueryOptions$b
};
var RangeConnected$3 = connect(mapStateToProps$d, mapDispatchtoProps$d)(DynamicRangeSlider);

DynamicRangeSlider.install = function (Vue) {
  Vue.component(DynamicRangeSlider.name, RangeConnected$3);
};

var buildQuery = configureStore.helper.buildQuery,
    pushToAndClause$7 = configureStore.helper.pushToAndClause;
var valueReducer = configureStore.Reducers.valueReducer,
    queryReducer = configureStore.Reducers.queryReducer,
    queryOptionsReducer = configureStore.Reducers.queryOptionsReducer,
    dependencyTreeReducer = configureStore.Reducers.dependencyTreeReducer;
var componentsWithHighlightQuery = ['DataSearch', 'CategorySearch'];
var componentsWithOptions = ['ReactiveList', 'ResultCard', 'ResultList', 'ReactiveMap', 'SingleList', 'MultiList', 'TagCloud'].concat(componentsWithHighlightQuery);
var componentsWithoutFilters = ['NumberBox', 'RatingsFilter'];
var resultComponents = ['ReactiveList', 'ReactiveMap', 'ResultCard', 'ResultList'];

function getValue(state, id, defaultValue) {
  if (!state) return defaultValue;

  if (state[id]) {
    try {
      // parsing for next.js - since it uses extra set of quotes to wrap params
      var parsedValue = JSON.parse(state[id]);
      return parsedValue;
    } catch (error) {
      // using react-dom-server for ssr
      return state[id] || defaultValue;
    }
  }

  return defaultValue;
}

function parseValue(value, component) {
  if (component.source && component.source.parseValue) {
    return component.source.parseValue(value, component);
  }

  return value;
}

function getQuery(component, value, componentType) {
  // get default query of result components
  if (resultComponents.includes(componentType)) {
    return component.defaultQuery ? component.defaultQuery() : {};
  } // get custom or default query of sensor components


  var currentValue = parseValue(value, component);

  if (component.customQuery) {
    return component.customQuery(currentValue, component);
  }

  return component.source.defaultQuery ? component.source.defaultQuery(currentValue, component) : {};
}

function initReactivesearch(componentCollection, searchState, settings) {
  return new Promise(function (resolve, reject) {
    var credentials = settings.url && settings.url.trim() !== '' && !settings.credentials ? null : settings.credentials;
    var config = {
      url: settings.url && settings.url.trim() !== '' ? settings.url : 'https://scalr.api.appbase.io',
      app: settings.app,
      credentials: credentials,
      transformRequest: settings.transformRequest || null,
      type: settings.type ? settings.type : '*'
    };
    var appbaseRef = Appbase(config);
    var components = [];
    var selectedValues = {};
    var queryList = {};
    var queryLog = {};
    var queryOptions = {};
    var dependencyTree = {};
    var finalQuery = [];
    var orderOfQueries = [];
    var hits = {};
    var aggregations = {};
    var state = {};
    componentCollection.forEach(function (component) {
      var componentType = component.source.name;
      components = [].concat(components, [component.componentId]);
      var isInternalComponentPresent = false;
      var isResultComponent = resultComponents.includes(componentType);
      var internalComponent = component.componentId + "__internal";
      var label = component.filterLabel || component.componentId;
      var value = getValue(searchState, label, component.defaultSelected); // [1] set selected values

      var showFilter = component.showFilter !== undefined ? component.showFilter : true;

      if (componentsWithoutFilters.includes(componentType)) {
        showFilter = false;
      }

      selectedValues = valueReducer(selectedValues, {
        type: 'SET_VALUE',
        component: component.componentId,
        label: label,
        value: value,
        showFilter: showFilter,
        URLParams: component.URLParams || false
      }); // [2] set query options - main component query (valid for result components)

      if (componentsWithOptions.includes(componentType)) {
        var options = component.source.generateQueryOptions ? component.source.generateQueryOptions(component) : null;
        var highlightQuery = {};

        if (componentsWithHighlightQuery.includes(componentType) && component.highlight) {
          highlightQuery = component.source.highlightQuery(component);
        }

        if (options && Object.keys(options).length || highlightQuery && Object.keys(highlightQuery).length) {
          // eslint-disable-next-line
          var _ref = options || {},
              aggs = _ref.aggs,
              size = _ref.size,
              otherQueryOptions = _objectWithoutPropertiesLoose(_ref, ["aggs", "size"]);

          if (aggs && Object.keys(aggs).length) {
            isInternalComponentPresent = true; // query should be applied on the internal component
            // to enable feeding the data to parent component

            queryOptions = queryOptionsReducer(queryOptions, {
              type: 'SET_QUERY_OPTIONS',
              component: internalComponent,
              options: {
                aggs: aggs,
                size: size || 100
              }
            });
          } // sort, highlight, size, from - query should be applied on the main component


          if (otherQueryOptions && Object.keys(otherQueryOptions).length || highlightQuery && Object.keys(highlightQuery).length) {
            if (!otherQueryOptions) otherQueryOptions = {};
            if (!highlightQuery) highlightQuery = {};

            var mainQueryOptions = _extends({}, otherQueryOptions, {}, highlightQuery, {
              size: size
            });

            if (isInternalComponentPresent) {
              mainQueryOptions = _extends({}, otherQueryOptions, {}, highlightQuery);
            }

            if (isResultComponent) {
              var currentPage = component.currentPage ? component.currentPage - 1 : 0;

              if (selectedValues[component.componentId] && selectedValues[component.componentId].value) {
                currentPage = selectedValues[component.componentId].value - 1 || 0;
              }

              var resultSize = component.size || 10;
              mainQueryOptions = _extends({}, mainQueryOptions, {}, highlightQuery, {
                size: resultSize,
                from: currentPage * resultSize
              });
            }

            queryOptions = queryOptionsReducer(queryOptions, {
              type: 'SET_QUERY_OPTIONS',
              component: component.componentId,
              options: _extends({}, mainQueryOptions)
            });
          }
        }
      } // [3] set dependency tree


      if (component.react || isInternalComponentPresent || isResultComponent) {
        var react = component.react;

        if (isInternalComponentPresent || isResultComponent) {
          react = pushToAndClause$7(react, internalComponent);
        }

        dependencyTree = dependencyTreeReducer(dependencyTree, {
          type: 'WATCH_COMPONENT',
          component: component.componentId,
          react: react
        });
      } // [4] set query list


      if (isResultComponent) {
        var _getQuery = getQuery(component, null, componentType),
            query = _getQuery.query;

        queryList = queryReducer(queryList, {
          type: 'SET_QUERY',
          component: internalComponent,
          query: query
        });
      } else {
        queryList = queryReducer(queryList, {
          type: 'SET_QUERY',
          component: component.componentId,
          query: getQuery(component, value, componentType)
        });
      }
    }); // [5] Generate finalQuery for search

    componentCollection.forEach(function (component) {
      // eslint-disable-next-line
      var _buildQuery = buildQuery(component.componentId, dependencyTree, queryList, queryOptions),
          queryObj = _buildQuery.queryObj,
          options = _buildQuery.options;

      var validOptions = ['aggs', 'from', 'sort']; // check if query or options are valid - non-empty

      if (queryObj && !!Object.keys(queryObj).length || options && Object.keys(options).some(function (item) {
        return validOptions.includes(item);
      })) {
        var _extends2;

        if (!queryObj || queryObj && !Object.keys(queryObj).length) {
          queryObj = {
            match_all: {}
          };
        }

        orderOfQueries = [].concat(orderOfQueries, [component.componentId]);

        var currentQuery = _extends({
          query: _extends({}, queryObj)
        }, options, {}, queryOptions[component.componentId]);

        queryLog = _extends({}, queryLog, (_extends2 = {}, _extends2[component.componentId] = currentQuery, _extends2));
        finalQuery = [].concat(finalQuery, [{
          preference: component.componentId
        }, currentQuery]);
      }
    });
    state = {
      components: components,
      dependencyTree: dependencyTree,
      queryList: queryList,
      queryOptions: queryOptions,
      selectedValues: selectedValues,
      queryLog: queryLog
    };
    appbaseRef.msearch({
      type: config.type === '*' ? '' : config.type,
      body: finalQuery
    }).then(function (res) {
      orderOfQueries.forEach(function (component, index) {
        var _extends4;

        var response = res.responses[index];

        if (response.aggregations) {
          var _extends3;

          aggregations = _extends({}, aggregations, (_extends3 = {}, _extends3[component] = response.aggregations, _extends3));
        }

        hits = _extends({}, hits, (_extends4 = {}, _extends4[component] = {
          hits: response.hits.hits,
          total: response.hits.total,
          time: response.took
        }, _extends4));
      });
      state = _extends({}, state, {
        hits: hits,
        aggregations: aggregations
      });
      resolve(state);
    })["catch"](function (err) {
      return reject(err);
    });
  });
}

var version = "1.0.0-beta.21";

// Add polyfills to support in IE
var components = [ReactiveList, ResultCard, ResultList, ReactiveBase, DataSearch, SingleList, MultiList, SingleRange, MultiRange, RangeSlider, DynamicRangeSlider, ReactiveComponent, SelectedFilters, ToggleButton, SingleDropdownList, MultiDropdownList];

var install = function install(Vue) {
  components.map(function (component) {
    Vue.use(component);
    return null;
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
var index = {
  version: version,
  install: install
};

exports.DataSearch = DataSearch;
exports.DynamicRangeSlider = DynamicRangeSlider;
exports.MultiDropdownList = MultiDropdownList;
exports.MultiList = MultiList;
exports.MultiRange = MultiRange;
exports.RangeSlider = RangeSlider;
exports.ReactiveBase = ReactiveBase;
exports.ReactiveComponent = ReactiveComponent;
exports.ReactiveList = ReactiveList;
exports.ResultCard = ResultCard;
exports.ResultList = ResultList;
exports.SelectedFilters = SelectedFilters;
exports.SingleDropdownList = SingleDropdownList;
exports.SingleList = SingleList;
exports.SingleRange = SingleRange;
exports.ToggleButton = ToggleButton;
exports.default = index;
exports.initReactivesearch = initReactivesearch;
exports.install = install;
exports.version = version;
