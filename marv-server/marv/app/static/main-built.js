/*!
 * MARV
 * Copyright (C) 2016  Ternaris, Munich, Germany
 * 
 * This file is part of MARV
 * 
 * MARV is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * MARV is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with MARV.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 Leaflet 1.0.0, a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
"use strict";

_dereq_(295);

_dereq_(296);

_dereq_(2);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2,"295":295,"296":296}],2:[function(_dereq_,module,exports){
_dereq_(119);
module.exports = _dereq_(23).RegExp.escape;
},{"119":119,"23":23}],3:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],4:[function(_dereq_,module,exports){
var cof = _dereq_(18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"18":18}],5:[function(_dereq_,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _dereq_(117)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)_dereq_(40)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"117":117,"40":40}],6:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],7:[function(_dereq_,module,exports){
var isObject = _dereq_(49);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"49":49}],8:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = _dereq_(109)
  , toIndex  = _dereq_(105)
  , toLength = _dereq_(108);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"105":105,"108":108,"109":109}],9:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = _dereq_(109)
  , toIndex  = _dereq_(105)
  , toLength = _dereq_(108);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"105":105,"108":108,"109":109}],10:[function(_dereq_,module,exports){
var forOf = _dereq_(37);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"37":37}],11:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_(107)
  , toLength  = _dereq_(108)
  , toIndex   = _dereq_(105);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"105":105,"107":107,"108":108}],12:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_(25)
  , IObject  = _dereq_(45)
  , toObject = _dereq_(109)
  , toLength = _dereq_(108)
  , asc      = _dereq_(15);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"108":108,"109":109,"15":15,"25":25,"45":45}],13:[function(_dereq_,module,exports){
var aFunction = _dereq_(3)
  , toObject  = _dereq_(109)
  , IObject   = _dereq_(45)
  , toLength  = _dereq_(108);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"108":108,"109":109,"3":3,"45":45}],14:[function(_dereq_,module,exports){
var isObject = _dereq_(49)
  , isArray  = _dereq_(47)
  , SPECIES  = _dereq_(117)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"117":117,"47":47,"49":49}],15:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _dereq_(14);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"14":14}],16:[function(_dereq_,module,exports){
'use strict';
var aFunction  = _dereq_(3)
  , isObject   = _dereq_(49)
  , invoke     = _dereq_(44)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"3":3,"44":44,"49":49}],17:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_(18)
  , TAG = _dereq_(117)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"117":117,"18":18}],18:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(_dereq_,module,exports){
'use strict';
var dP          = _dereq_(67).f
  , create      = _dereq_(66)
  , redefineAll = _dereq_(86)
  , ctx         = _dereq_(25)
  , anInstance  = _dereq_(6)
  , defined     = _dereq_(27)
  , forOf       = _dereq_(37)
  , $iterDefine = _dereq_(53)
  , step        = _dereq_(55)
  , setSpecies  = _dereq_(91)
  , DESCRIPTORS = _dereq_(28)
  , fastKey     = _dereq_(62).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"25":25,"27":27,"28":28,"37":37,"53":53,"55":55,"6":6,"62":62,"66":66,"67":67,"86":86,"91":91}],20:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = _dereq_(17)
  , from    = _dereq_(10);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"10":10,"17":17}],21:[function(_dereq_,module,exports){
'use strict';
var redefineAll       = _dereq_(86)
  , getWeak           = _dereq_(62).getWeak
  , anObject          = _dereq_(7)
  , isObject          = _dereq_(49)
  , anInstance        = _dereq_(6)
  , forOf             = _dereq_(37)
  , createArrayMethod = _dereq_(12)
  , $has              = _dereq_(39)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"12":12,"37":37,"39":39,"49":49,"6":6,"62":62,"7":7,"86":86}],22:[function(_dereq_,module,exports){
'use strict';
var global            = _dereq_(38)
  , $export           = _dereq_(32)
  , redefine          = _dereq_(87)
  , redefineAll       = _dereq_(86)
  , meta              = _dereq_(62)
  , forOf             = _dereq_(37)
  , anInstance        = _dereq_(6)
  , isObject          = _dereq_(49)
  , fails             = _dereq_(34)
  , $iterDetect       = _dereq_(54)
  , setToStringTag    = _dereq_(92)
  , inheritIfRequired = _dereq_(43);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"32":32,"34":34,"37":37,"38":38,"43":43,"49":49,"54":54,"6":6,"62":62,"86":86,"87":87,"92":92}],23:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],24:[function(_dereq_,module,exports){
'use strict';
var $defineProperty = _dereq_(67)
  , createDesc      = _dereq_(85);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"67":67,"85":85}],25:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_(3);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"3":3}],26:[function(_dereq_,module,exports){
'use strict';
var anObject    = _dereq_(7)
  , toPrimitive = _dereq_(110)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
},{"110":110,"7":7}],27:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_(34)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"34":34}],29:[function(_dereq_,module,exports){
var isObject = _dereq_(49)
  , document = _dereq_(38).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"38":38,"49":49}],30:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],31:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_(76)
  , gOPS    = _dereq_(73)
  , pIE     = _dereq_(77);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"73":73,"76":76,"77":77}],32:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , core      = _dereq_(23)
  , hide      = _dereq_(40)
  , redefine  = _dereq_(87)
  , ctx       = _dereq_(25)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"23":23,"25":25,"38":38,"40":40,"87":87}],33:[function(_dereq_,module,exports){
var MATCH = _dereq_(117)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"117":117}],34:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],35:[function(_dereq_,module,exports){
'use strict';
var hide     = _dereq_(40)
  , redefine = _dereq_(87)
  , fails    = _dereq_(34)
  , defined  = _dereq_(27)
  , wks      = _dereq_(117);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"117":117,"27":27,"34":34,"40":40,"87":87}],36:[function(_dereq_,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = _dereq_(7);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"7":7}],37:[function(_dereq_,module,exports){
var ctx         = _dereq_(25)
  , call        = _dereq_(51)
  , isArrayIter = _dereq_(46)
  , anObject    = _dereq_(7)
  , toLength    = _dereq_(108)
  , getIterFn   = _dereq_(118)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"108":108,"118":118,"25":25,"46":46,"51":51,"7":7}],38:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],39:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],40:[function(_dereq_,module,exports){
var dP         = _dereq_(67)
  , createDesc = _dereq_(85);
module.exports = _dereq_(28) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"28":28,"67":67,"85":85}],41:[function(_dereq_,module,exports){
module.exports = _dereq_(38).document && document.documentElement;
},{"38":38}],42:[function(_dereq_,module,exports){
module.exports = !_dereq_(28) && !_dereq_(34)(function(){
  return Object.defineProperty(_dereq_(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"28":28,"29":29,"34":34}],43:[function(_dereq_,module,exports){
var isObject       = _dereq_(49)
  , setPrototypeOf = _dereq_(90).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"49":49,"90":90}],44:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],45:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"18":18}],46:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_(56)
  , ITERATOR   = _dereq_(117)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"117":117,"56":56}],47:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"18":18}],48:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = _dereq_(49)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"49":49}],49:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],50:[function(_dereq_,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = _dereq_(49)
  , cof      = _dereq_(18)
  , MATCH    = _dereq_(117)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"117":117,"18":18,"49":49}],51:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_(7);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"7":7}],52:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_(66)
  , descriptor     = _dereq_(85)
  , setToStringTag = _dereq_(92)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_(40)(IteratorPrototype, _dereq_(117)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"117":117,"40":40,"66":66,"85":85,"92":92}],53:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_(58)
  , $export        = _dereq_(32)
  , redefine       = _dereq_(87)
  , hide           = _dereq_(40)
  , has            = _dereq_(39)
  , Iterators      = _dereq_(56)
  , $iterCreate    = _dereq_(52)
  , setToStringTag = _dereq_(92)
  , getPrototypeOf = _dereq_(74)
  , ITERATOR       = _dereq_(117)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"117":117,"32":32,"39":39,"40":40,"52":52,"56":56,"58":58,"74":74,"87":87,"92":92}],54:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_(117)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"117":117}],55:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],56:[function(_dereq_,module,exports){
module.exports = {};
},{}],57:[function(_dereq_,module,exports){
var getKeys   = _dereq_(76)
  , toIObject = _dereq_(107);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"107":107,"76":76}],58:[function(_dereq_,module,exports){
module.exports = false;
},{}],59:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
},{}],60:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],61:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],62:[function(_dereq_,module,exports){
var META     = _dereq_(114)('meta')
  , isObject = _dereq_(49)
  , has      = _dereq_(39)
  , setDesc  = _dereq_(67).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_dereq_(34)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"114":114,"34":34,"39":39,"49":49,"67":67}],63:[function(_dereq_,module,exports){
var Map     = _dereq_(149)
  , $export = _dereq_(32)
  , shared  = _dereq_(94)('metadata')
  , store   = shared.store || (shared.store = new (_dereq_(255)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"149":149,"255":255,"32":32,"94":94}],64:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , macrotask = _dereq_(104).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"104":104,"18":18,"38":38}],65:[function(_dereq_,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _dereq_(76)
  , gOPS     = _dereq_(73)
  , pIE      = _dereq_(77)
  , toObject = _dereq_(109)
  , IObject  = _dereq_(45)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || _dereq_(34)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"109":109,"34":34,"45":45,"73":73,"76":76,"77":77}],66:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_(7)
  , dPs         = _dereq_(68)
  , enumBugKeys = _dereq_(30)
  , IE_PROTO    = _dereq_(93)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_(41).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"29":29,"30":30,"41":41,"68":68,"7":7,"93":93}],67:[function(_dereq_,module,exports){
var anObject       = _dereq_(7)
  , IE8_DOM_DEFINE = _dereq_(42)
  , toPrimitive    = _dereq_(110)
  , dP             = Object.defineProperty;

exports.f = _dereq_(28) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"110":110,"28":28,"42":42,"7":7}],68:[function(_dereq_,module,exports){
var dP       = _dereq_(67)
  , anObject = _dereq_(7)
  , getKeys  = _dereq_(76);

module.exports = _dereq_(28) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"28":28,"67":67,"7":7,"76":76}],69:[function(_dereq_,module,exports){
// Forced replacement prototype accessors methods
module.exports = _dereq_(58)|| !_dereq_(34)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete _dereq_(38)[K];
});
},{"34":34,"38":38,"58":58}],70:[function(_dereq_,module,exports){
var pIE            = _dereq_(77)
  , createDesc     = _dereq_(85)
  , toIObject      = _dereq_(107)
  , toPrimitive    = _dereq_(110)
  , has            = _dereq_(39)
  , IE8_DOM_DEFINE = _dereq_(42)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = _dereq_(28) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"107":107,"110":110,"28":28,"39":39,"42":42,"77":77,"85":85}],71:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_(107)
  , gOPN      = _dereq_(72).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"107":107,"72":72}],72:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = _dereq_(75)
  , hiddenKeys = _dereq_(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"30":30,"75":75}],73:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],74:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_(39)
  , toObject    = _dereq_(109)
  , IE_PROTO    = _dereq_(93)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"109":109,"39":39,"93":93}],75:[function(_dereq_,module,exports){
var has          = _dereq_(39)
  , toIObject    = _dereq_(107)
  , arrayIndexOf = _dereq_(11)(false)
  , IE_PROTO     = _dereq_(93)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"107":107,"11":11,"39":39,"93":93}],76:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_(75)
  , enumBugKeys = _dereq_(30);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"30":30,"75":75}],77:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],78:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_(32)
  , core    = _dereq_(23)
  , fails   = _dereq_(34);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"23":23,"32":32,"34":34}],79:[function(_dereq_,module,exports){
var getKeys   = _dereq_(76)
  , toIObject = _dereq_(107)
  , isEnum    = _dereq_(77).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"107":107,"76":76,"77":77}],80:[function(_dereq_,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = _dereq_(72)
  , gOPS     = _dereq_(73)
  , anObject = _dereq_(7)
  , Reflect  = _dereq_(38).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"38":38,"7":7,"72":72,"73":73}],81:[function(_dereq_,module,exports){
var $parseFloat = _dereq_(38).parseFloat
  , $trim       = _dereq_(102).trim;

module.exports = 1 / $parseFloat(_dereq_(103) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"102":102,"103":103,"38":38}],82:[function(_dereq_,module,exports){
var $parseInt = _dereq_(38).parseInt
  , $trim     = _dereq_(102).trim
  , ws        = _dereq_(103)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"102":102,"103":103,"38":38}],83:[function(_dereq_,module,exports){
'use strict';
var path      = _dereq_(84)
  , invoke    = _dereq_(44)
  , aFunction = _dereq_(3);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"3":3,"44":44,"84":84}],84:[function(_dereq_,module,exports){
module.exports = _dereq_(38);
},{"38":38}],85:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],86:[function(_dereq_,module,exports){
var redefine = _dereq_(87);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"87":87}],87:[function(_dereq_,module,exports){
var global    = _dereq_(38)
  , hide      = _dereq_(40)
  , has       = _dereq_(39)
  , SRC       = _dereq_(114)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_dereq_(23).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"114":114,"23":23,"38":38,"39":39,"40":40}],88:[function(_dereq_,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],89:[function(_dereq_,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],90:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = _dereq_(49)
  , anObject = _dereq_(7);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_(25)(Function.call, _dereq_(70).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"25":25,"49":49,"7":7,"70":70}],91:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_(38)
  , dP          = _dereq_(67)
  , DESCRIPTORS = _dereq_(28)
  , SPECIES     = _dereq_(117)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"117":117,"28":28,"38":38,"67":67}],92:[function(_dereq_,module,exports){
var def = _dereq_(67).f
  , has = _dereq_(39)
  , TAG = _dereq_(117)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"117":117,"39":39,"67":67}],93:[function(_dereq_,module,exports){
var shared = _dereq_(94)('keys')
  , uid    = _dereq_(114);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"114":114,"94":94}],94:[function(_dereq_,module,exports){
var global = _dereq_(38)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"38":38}],95:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_(7)
  , aFunction = _dereq_(3)
  , SPECIES   = _dereq_(117)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"117":117,"3":3,"7":7}],96:[function(_dereq_,module,exports){
var fails = _dereq_(34);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"34":34}],97:[function(_dereq_,module,exports){
var toInteger = _dereq_(106)
  , defined   = _dereq_(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"106":106,"27":27}],98:[function(_dereq_,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = _dereq_(50)
  , defined  = _dereq_(27);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"27":27,"50":50}],99:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , fails   = _dereq_(34)
  , defined = _dereq_(27)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"27":27,"32":32,"34":34}],100:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = _dereq_(108)
  , repeat   = _dereq_(101)
  , defined  = _dereq_(27);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"101":101,"108":108,"27":27}],101:[function(_dereq_,module,exports){
'use strict';
var toInteger = _dereq_(106)
  , defined   = _dereq_(27);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"106":106,"27":27}],102:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , defined = _dereq_(27)
  , fails   = _dereq_(34)
  , spaces  = _dereq_(103)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"103":103,"27":27,"32":32,"34":34}],103:[function(_dereq_,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],104:[function(_dereq_,module,exports){
var ctx                = _dereq_(25)
  , invoke             = _dereq_(44)
  , html               = _dereq_(41)
  , cel                = _dereq_(29)
  , global             = _dereq_(38)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"18":18,"25":25,"29":29,"38":38,"41":41,"44":44}],105:[function(_dereq_,module,exports){
var toInteger = _dereq_(106)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"106":106}],106:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],107:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_(45)
  , defined = _dereq_(27);
module.exports = function(it){
  return IObject(defined(it));
};
},{"27":27,"45":45}],108:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_(106)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"106":106}],109:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_(27);
module.exports = function(it){
  return Object(defined(it));
};
},{"27":27}],110:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_(49);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"49":49}],111:[function(_dereq_,module,exports){
'use strict';
if(_dereq_(28)){
  var LIBRARY             = _dereq_(58)
    , global              = _dereq_(38)
    , fails               = _dereq_(34)
    , $export             = _dereq_(32)
    , $typed              = _dereq_(113)
    , $buffer             = _dereq_(112)
    , ctx                 = _dereq_(25)
    , anInstance          = _dereq_(6)
    , propertyDesc        = _dereq_(85)
    , hide                = _dereq_(40)
    , redefineAll         = _dereq_(86)
    , toInteger           = _dereq_(106)
    , toLength            = _dereq_(108)
    , toIndex             = _dereq_(105)
    , toPrimitive         = _dereq_(110)
    , has                 = _dereq_(39)
    , same                = _dereq_(89)
    , classof             = _dereq_(17)
    , isObject            = _dereq_(49)
    , toObject            = _dereq_(109)
    , isArrayIter         = _dereq_(46)
    , create              = _dereq_(66)
    , getPrototypeOf      = _dereq_(74)
    , gOPN                = _dereq_(72).f
    , getIterFn           = _dereq_(118)
    , uid                 = _dereq_(114)
    , wks                 = _dereq_(117)
    , createArrayMethod   = _dereq_(12)
    , createArrayIncludes = _dereq_(11)
    , speciesConstructor  = _dereq_(95)
    , ArrayIterators      = _dereq_(130)
    , Iterators           = _dereq_(56)
    , $iterDetect         = _dereq_(54)
    , setSpecies          = _dereq_(91)
    , arrayFill           = _dereq_(9)
    , arrayCopyWithin     = _dereq_(8)
    , $DP                 = _dereq_(67)
    , $GOPD               = _dereq_(70)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
},{"105":105,"106":106,"108":108,"109":109,"11":11,"110":110,"112":112,"113":113,"114":114,"117":117,"118":118,"12":12,"130":130,"17":17,"25":25,"28":28,"32":32,"34":34,"38":38,"39":39,"40":40,"46":46,"49":49,"54":54,"56":56,"58":58,"6":6,"66":66,"67":67,"70":70,"72":72,"74":74,"8":8,"85":85,"86":86,"89":89,"9":9,"91":91,"95":95}],112:[function(_dereq_,module,exports){
'use strict';
var global         = _dereq_(38)
  , DESCRIPTORS    = _dereq_(28)
  , LIBRARY        = _dereq_(58)
  , $typed         = _dereq_(113)
  , hide           = _dereq_(40)
  , redefineAll    = _dereq_(86)
  , fails          = _dereq_(34)
  , anInstance     = _dereq_(6)
  , toInteger      = _dereq_(106)
  , toLength       = _dereq_(108)
  , gOPN           = _dereq_(72).f
  , dP             = _dereq_(67).f
  , arrayFill      = _dereq_(9)
  , setToStringTag = _dereq_(92)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"106":106,"108":108,"113":113,"28":28,"34":34,"38":38,"40":40,"58":58,"6":6,"67":67,"72":72,"86":86,"9":9,"92":92}],113:[function(_dereq_,module,exports){
var global = _dereq_(38)
  , hide   = _dereq_(40)
  , uid    = _dereq_(114)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"114":114,"38":38,"40":40}],114:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],115:[function(_dereq_,module,exports){
var global         = _dereq_(38)
  , core           = _dereq_(23)
  , LIBRARY        = _dereq_(58)
  , wksExt         = _dereq_(116)
  , defineProperty = _dereq_(67).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"116":116,"23":23,"38":38,"58":58,"67":67}],116:[function(_dereq_,module,exports){
exports.f = _dereq_(117);
},{"117":117}],117:[function(_dereq_,module,exports){
var store      = _dereq_(94)('wks')
  , uid        = _dereq_(114)
  , Symbol     = _dereq_(38).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"114":114,"38":38,"94":94}],118:[function(_dereq_,module,exports){
var classof   = _dereq_(17)
  , ITERATOR  = _dereq_(117)('iterator')
  , Iterators = _dereq_(56);
module.exports = _dereq_(23).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"117":117,"17":17,"23":23,"56":56}],119:[function(_dereq_,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = _dereq_(32)
  , $re     = _dereq_(88)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"32":32,"88":88}],120:[function(_dereq_,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = _dereq_(32);

$export($export.P, 'Array', {copyWithin: _dereq_(8)});

_dereq_(5)('copyWithin');
},{"32":32,"5":5,"8":8}],121:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $every  = _dereq_(12)(4);

$export($export.P + $export.F * !_dereq_(96)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],122:[function(_dereq_,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = _dereq_(32);

$export($export.P, 'Array', {fill: _dereq_(9)});

_dereq_(5)('fill');
},{"32":32,"5":5,"9":9}],123:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $filter = _dereq_(12)(2);

$export($export.P + $export.F * !_dereq_(96)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],124:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = _dereq_(32)
  , $find   = _dereq_(12)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);
},{"12":12,"32":32,"5":5}],125:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = _dereq_(32)
  , $find   = _dereq_(12)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_dereq_(5)(KEY);
},{"12":12,"32":32,"5":5}],126:[function(_dereq_,module,exports){
'use strict';
var $export  = _dereq_(32)
  , $forEach = _dereq_(12)(0)
  , STRICT   = _dereq_(96)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],127:[function(_dereq_,module,exports){
'use strict';
var ctx            = _dereq_(25)
  , $export        = _dereq_(32)
  , toObject       = _dereq_(109)
  , call           = _dereq_(51)
  , isArrayIter    = _dereq_(46)
  , toLength       = _dereq_(108)
  , createProperty = _dereq_(24)
  , getIterFn      = _dereq_(118);

$export($export.S + $export.F * !_dereq_(54)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"108":108,"109":109,"118":118,"24":24,"25":25,"32":32,"46":46,"51":51,"54":54}],128:[function(_dereq_,module,exports){
'use strict';
var $export       = _dereq_(32)
  , $indexOf      = _dereq_(11)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
},{"11":11,"32":32,"96":96}],129:[function(_dereq_,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = _dereq_(32);

$export($export.S, 'Array', {isArray: _dereq_(47)});
},{"32":32,"47":47}],130:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_(5)
  , step             = _dereq_(55)
  , Iterators        = _dereq_(56)
  , toIObject        = _dereq_(107);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_(53)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"107":107,"5":5,"53":53,"55":55,"56":56}],131:[function(_dereq_,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = _dereq_(32)
  , toIObject = _dereq_(107)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (_dereq_(45) != Object || !_dereq_(96)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"107":107,"32":32,"45":45,"96":96}],132:[function(_dereq_,module,exports){
'use strict';
var $export       = _dereq_(32)
  , toIObject     = _dereq_(107)
  , toInteger     = _dereq_(106)
  , toLength      = _dereq_(108)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !_dereq_(96)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});
},{"106":106,"107":107,"108":108,"32":32,"96":96}],133:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $map    = _dereq_(12)(1);

$export($export.P + $export.F * !_dereq_(96)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],134:[function(_dereq_,module,exports){
'use strict';
var $export        = _dereq_(32)
  , createProperty = _dereq_(24);

// WebKit Array.of isn't generic
$export($export.S + $export.F * _dereq_(34)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
},{"24":24,"32":32,"34":34}],135:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(96)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"13":13,"32":32,"96":96}],136:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $reduce = _dereq_(13);

$export($export.P + $export.F * !_dereq_(96)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"13":13,"32":32,"96":96}],137:[function(_dereq_,module,exports){
'use strict';
var $export    = _dereq_(32)
  , html       = _dereq_(41)
  , cof        = _dereq_(18)
  , toIndex    = _dereq_(105)
  , toLength   = _dereq_(108)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * _dereq_(34)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"105":105,"108":108,"18":18,"32":32,"34":34,"41":41}],138:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $some   = _dereq_(12)(3);

$export($export.P + $export.F * !_dereq_(96)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"12":12,"32":32,"96":96}],139:[function(_dereq_,module,exports){
'use strict';
var $export   = _dereq_(32)
  , aFunction = _dereq_(3)
  , toObject  = _dereq_(109)
  , fails     = _dereq_(34)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !_dereq_(96)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"109":109,"3":3,"32":32,"34":34,"96":96}],140:[function(_dereq_,module,exports){
_dereq_(91)('Array');
},{"91":91}],141:[function(_dereq_,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = _dereq_(32);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});
},{"32":32}],142:[function(_dereq_,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = _dereq_(32)
  , fails   = _dereq_(34)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"32":32,"34":34}],143:[function(_dereq_,module,exports){
'use strict';
var $export     = _dereq_(32)
  , toObject    = _dereq_(109)
  , toPrimitive = _dereq_(110);

$export($export.P + $export.F * _dereq_(34)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"109":109,"110":110,"32":32,"34":34}],144:[function(_dereq_,module,exports){
var TO_PRIMITIVE = _dereq_(117)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))_dereq_(40)(proto, TO_PRIMITIVE, _dereq_(26));
},{"117":117,"26":26,"40":40}],145:[function(_dereq_,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  _dereq_(87)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"87":87}],146:[function(_dereq_,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = _dereq_(32);

$export($export.P, 'Function', {bind: _dereq_(16)});
},{"16":16,"32":32}],147:[function(_dereq_,module,exports){
'use strict';
var isObject       = _dereq_(49)
  , getPrototypeOf = _dereq_(74)
  , HAS_INSTANCE   = _dereq_(117)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))_dereq_(67).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"117":117,"49":49,"67":67,"74":74}],148:[function(_dereq_,module,exports){
var dP         = _dereq_(67).f
  , createDesc = _dereq_(85)
  , has        = _dereq_(39)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || _dereq_(28) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});
},{"28":28,"39":39,"67":67,"85":85}],149:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);

// 23.1 Map Objects
module.exports = _dereq_(22)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"19":19,"22":22}],150:[function(_dereq_,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = _dereq_(32)
  , log1p   = _dereq_(60)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"32":32,"60":60}],151:[function(_dereq_,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = _dereq_(32)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});
},{"32":32}],152:[function(_dereq_,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = _dereq_(32)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"32":32}],153:[function(_dereq_,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = _dereq_(32)
  , sign    = _dereq_(61);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"32":32,"61":61}],154:[function(_dereq_,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"32":32}],155:[function(_dereq_,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = _dereq_(32)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"32":32}],156:[function(_dereq_,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = _dereq_(32)
  , $expm1  = _dereq_(59);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});
},{"32":32,"59":59}],157:[function(_dereq_,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = _dereq_(32)
  , sign      = _dereq_(61)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"32":32,"61":61}],158:[function(_dereq_,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = _dereq_(32)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"32":32}],159:[function(_dereq_,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = _dereq_(32)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * _dereq_(34)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"32":32,"34":34}],160:[function(_dereq_,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"32":32}],161:[function(_dereq_,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {log1p: _dereq_(60)});
},{"32":32,"60":60}],162:[function(_dereq_,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"32":32}],163:[function(_dereq_,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {sign: _dereq_(61)});
},{"32":32,"61":61}],164:[function(_dereq_,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = _dereq_(32)
  , expm1   = _dereq_(59)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * _dereq_(34)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"32":32,"34":34,"59":59}],165:[function(_dereq_,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = _dereq_(32)
  , expm1   = _dereq_(59)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"32":32,"59":59}],166:[function(_dereq_,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = _dereq_(32);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"32":32}],167:[function(_dereq_,module,exports){
'use strict';
var global            = _dereq_(38)
  , has               = _dereq_(39)
  , cof               = _dereq_(18)
  , inheritIfRequired = _dereq_(43)
  , toPrimitive       = _dereq_(110)
  , fails             = _dereq_(34)
  , gOPN              = _dereq_(72).f
  , gOPD              = _dereq_(70).f
  , dP                = _dereq_(67).f
  , $trim             = _dereq_(102).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(_dereq_(66)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = _dereq_(28) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _dereq_(87)(global, NUMBER, $Number);
}
},{"102":102,"110":110,"18":18,"28":28,"34":34,"38":38,"39":39,"43":43,"66":66,"67":67,"70":70,"72":72,"87":87}],168:[function(_dereq_,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = _dereq_(32);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"32":32}],169:[function(_dereq_,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = _dereq_(32)
  , _isFinite = _dereq_(38).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"32":32,"38":38}],170:[function(_dereq_,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = _dereq_(32);

$export($export.S, 'Number', {isInteger: _dereq_(48)});
},{"32":32,"48":48}],171:[function(_dereq_,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = _dereq_(32);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"32":32}],172:[function(_dereq_,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = _dereq_(32)
  , isInteger = _dereq_(48)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"32":32,"48":48}],173:[function(_dereq_,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = _dereq_(32);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"32":32}],174:[function(_dereq_,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = _dereq_(32);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"32":32}],175:[function(_dereq_,module,exports){
var $export     = _dereq_(32)
  , $parseFloat = _dereq_(81);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"32":32,"81":81}],176:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , $parseInt = _dereq_(82);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"32":32,"82":82}],177:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , toInteger    = _dereq_(106)
  , aNumberValue = _dereq_(4)
  , repeat       = _dereq_(101)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !_dereq_(34)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"101":101,"106":106,"32":32,"34":34,"4":4}],178:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , $fails       = _dereq_(34)
  , aNumberValue = _dereq_(4)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"32":32,"34":34,"4":4}],179:[function(_dereq_,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = _dereq_(32);

$export($export.S + $export.F, 'Object', {assign: _dereq_(65)});
},{"32":32,"65":65}],180:[function(_dereq_,module,exports){
var $export = _dereq_(32)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: _dereq_(66)});
},{"32":32,"66":66}],181:[function(_dereq_,module,exports){
var $export = _dereq_(32);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !_dereq_(28), 'Object', {defineProperties: _dereq_(68)});
},{"28":28,"32":32,"68":68}],182:[function(_dereq_,module,exports){
var $export = _dereq_(32);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_(28), 'Object', {defineProperty: _dereq_(67).f});
},{"28":28,"32":32,"67":67}],183:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],184:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = _dereq_(107)
  , $getOwnPropertyDescriptor = _dereq_(70).f;

_dereq_(78)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"107":107,"70":70,"78":78}],185:[function(_dereq_,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
_dereq_(78)('getOwnPropertyNames', function(){
  return _dereq_(71).f;
});
},{"71":71,"78":78}],186:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = _dereq_(109)
  , $getPrototypeOf = _dereq_(74);

_dereq_(78)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"109":109,"74":74,"78":78}],187:[function(_dereq_,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = _dereq_(49);

_dereq_(78)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"49":49,"78":78}],188:[function(_dereq_,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = _dereq_(49);

_dereq_(78)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"49":49,"78":78}],189:[function(_dereq_,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = _dereq_(49);

_dereq_(78)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"49":49,"78":78}],190:[function(_dereq_,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = _dereq_(32);
$export($export.S, 'Object', {is: _dereq_(89)});
},{"32":32,"89":89}],191:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_(109)
  , $keys    = _dereq_(76);

_dereq_(78)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"109":109,"76":76,"78":78}],192:[function(_dereq_,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],193:[function(_dereq_,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = _dereq_(49)
  , meta     = _dereq_(62).onFreeze;

_dereq_(78)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"49":49,"62":62,"78":78}],194:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_(32);
$export($export.S, 'Object', {setPrototypeOf: _dereq_(90).set});
},{"32":32,"90":90}],195:[function(_dereq_,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = _dereq_(17)
  , test    = {};
test[_dereq_(117)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  _dereq_(87)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"117":117,"17":17,"87":87}],196:[function(_dereq_,module,exports){
var $export     = _dereq_(32)
  , $parseFloat = _dereq_(81);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"32":32,"81":81}],197:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , $parseInt = _dereq_(82);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"32":32,"82":82}],198:[function(_dereq_,module,exports){
'use strict';
var LIBRARY            = _dereq_(58)
  , global             = _dereq_(38)
  , ctx                = _dereq_(25)
  , classof            = _dereq_(17)
  , $export            = _dereq_(32)
  , isObject           = _dereq_(49)
  , aFunction          = _dereq_(3)
  , anInstance         = _dereq_(6)
  , forOf              = _dereq_(37)
  , speciesConstructor = _dereq_(95)
  , task               = _dereq_(104).set
  , microtask          = _dereq_(64)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_dereq_(117)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_(86)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
_dereq_(92)($Promise, PROMISE);
_dereq_(91)(PROMISE);
Wrapper = _dereq_(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_(54)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"104":104,"117":117,"17":17,"23":23,"25":25,"3":3,"32":32,"37":37,"38":38,"49":49,"54":54,"58":58,"6":6,"64":64,"86":86,"91":91,"92":92,"95":95}],199:[function(_dereq_,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = _dereq_(32)
  , aFunction = _dereq_(3)
  , anObject  = _dereq_(7)
  , rApply    = (_dereq_(38).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !_dereq_(34)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
},{"3":3,"32":32,"34":34,"38":38,"7":7}],200:[function(_dereq_,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = _dereq_(32)
  , create     = _dereq_(66)
  , aFunction  = _dereq_(3)
  , anObject   = _dereq_(7)
  , isObject   = _dereq_(49)
  , fails      = _dereq_(34)
  , bind       = _dereq_(16)
  , rConstruct = (_dereq_(38).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"16":16,"3":3,"32":32,"34":34,"38":38,"49":49,"66":66,"7":7}],201:[function(_dereq_,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = _dereq_(67)
  , $export     = _dereq_(32)
  , anObject    = _dereq_(7)
  , toPrimitive = _dereq_(110);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * _dereq_(34)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"110":110,"32":32,"34":34,"67":67,"7":7}],202:[function(_dereq_,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = _dereq_(32)
  , gOPD     = _dereq_(70).f
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"32":32,"7":7,"70":70}],203:[function(_dereq_,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = _dereq_(32)
  , anObject = _dereq_(7);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
_dereq_(52)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"32":32,"52":52,"7":7}],204:[function(_dereq_,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = _dereq_(70)
  , $export  = _dereq_(32)
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"32":32,"7":7,"70":70}],205:[function(_dereq_,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = _dereq_(32)
  , getProto = _dereq_(74)
  , anObject = _dereq_(7);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"32":32,"7":7,"74":74}],206:[function(_dereq_,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = _dereq_(70)
  , getPrototypeOf = _dereq_(74)
  , has            = _dereq_(39)
  , $export        = _dereq_(32)
  , isObject       = _dereq_(49)
  , anObject       = _dereq_(7);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"32":32,"39":39,"49":49,"7":7,"70":70,"74":74}],207:[function(_dereq_,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = _dereq_(32);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"32":32}],208:[function(_dereq_,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = _dereq_(32)
  , anObject      = _dereq_(7)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"32":32,"7":7}],209:[function(_dereq_,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = _dereq_(32);

$export($export.S, 'Reflect', {ownKeys: _dereq_(80)});
},{"32":32,"80":80}],210:[function(_dereq_,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = _dereq_(32)
  , anObject           = _dereq_(7)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"32":32,"7":7}],211:[function(_dereq_,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = _dereq_(32)
  , setProto = _dereq_(90);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"32":32,"90":90}],212:[function(_dereq_,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = _dereq_(67)
  , gOPD           = _dereq_(70)
  , getPrototypeOf = _dereq_(74)
  , has            = _dereq_(39)
  , $export        = _dereq_(32)
  , createDesc     = _dereq_(85)
  , anObject       = _dereq_(7)
  , isObject       = _dereq_(49);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"32":32,"39":39,"49":49,"67":67,"7":7,"70":70,"74":74,"85":85}],213:[function(_dereq_,module,exports){
var global            = _dereq_(38)
  , inheritIfRequired = _dereq_(43)
  , dP                = _dereq_(67).f
  , gOPN              = _dereq_(72).f
  , isRegExp          = _dereq_(50)
  , $flags            = _dereq_(36)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(_dereq_(28) && (!CORRECT_NEW || _dereq_(34)(function(){
  re2[_dereq_(117)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  _dereq_(87)(global, 'RegExp', $RegExp);
}

_dereq_(91)('RegExp');
},{"117":117,"28":28,"34":34,"36":36,"38":38,"43":43,"50":50,"67":67,"72":72,"87":87,"91":91}],214:[function(_dereq_,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(_dereq_(28) && /./g.flags != 'g')_dereq_(67).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _dereq_(36)
});
},{"28":28,"36":36,"67":67}],215:[function(_dereq_,module,exports){
// @@match logic
_dereq_(35)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"35":35}],216:[function(_dereq_,module,exports){
// @@replace logic
_dereq_(35)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"35":35}],217:[function(_dereq_,module,exports){
// @@search logic
_dereq_(35)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"35":35}],218:[function(_dereq_,module,exports){
// @@split logic
_dereq_(35)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = _dereq_(50)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"35":35,"50":50}],219:[function(_dereq_,module,exports){
'use strict';
_dereq_(214);
var anObject    = _dereq_(7)
  , $flags      = _dereq_(36)
  , DESCRIPTORS = _dereq_(28)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  _dereq_(87)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(_dereq_(34)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"214":214,"28":28,"34":34,"36":36,"7":7,"87":87}],220:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_(19);

// 23.2 Set Objects
module.exports = _dereq_(22)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"19":19,"22":22}],221:[function(_dereq_,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
_dereq_(99)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"99":99}],222:[function(_dereq_,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
_dereq_(99)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"99":99}],223:[function(_dereq_,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
_dereq_(99)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"99":99}],224:[function(_dereq_,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
_dereq_(99)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"99":99}],225:[function(_dereq_,module,exports){
'use strict';
var $export = _dereq_(32)
  , $at     = _dereq_(97)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"32":32,"97":97}],226:[function(_dereq_,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = _dereq_(32)
  , toLength  = _dereq_(108)
  , context   = _dereq_(98)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * _dereq_(33)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"108":108,"32":32,"33":33,"98":98}],227:[function(_dereq_,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
_dereq_(99)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"99":99}],228:[function(_dereq_,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
_dereq_(99)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"99":99}],229:[function(_dereq_,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
_dereq_(99)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"99":99}],230:[function(_dereq_,module,exports){
var $export        = _dereq_(32)
  , toIndex        = _dereq_(105)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"105":105,"32":32}],231:[function(_dereq_,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = _dereq_(32)
  , context  = _dereq_(98)
  , INCLUDES = 'includes';

$export($export.P + $export.F * _dereq_(33)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"32":32,"33":33,"98":98}],232:[function(_dereq_,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
_dereq_(99)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"99":99}],233:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_(97)(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_(53)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"53":53,"97":97}],234:[function(_dereq_,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
_dereq_(99)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"99":99}],235:[function(_dereq_,module,exports){
var $export   = _dereq_(32)
  , toIObject = _dereq_(107)
  , toLength  = _dereq_(108);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"107":107,"108":108,"32":32}],236:[function(_dereq_,module,exports){
var $export = _dereq_(32);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _dereq_(101)
});
},{"101":101,"32":32}],237:[function(_dereq_,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
_dereq_(99)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"99":99}],238:[function(_dereq_,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = _dereq_(32)
  , toLength    = _dereq_(108)
  , context     = _dereq_(98)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * _dereq_(33)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"108":108,"32":32,"33":33,"98":98}],239:[function(_dereq_,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
_dereq_(99)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"99":99}],240:[function(_dereq_,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
_dereq_(99)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"99":99}],241:[function(_dereq_,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
_dereq_(99)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"99":99}],242:[function(_dereq_,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
_dereq_(102)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"102":102}],243:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = _dereq_(38)
  , has            = _dereq_(39)
  , DESCRIPTORS    = _dereq_(28)
  , $export        = _dereq_(32)
  , redefine       = _dereq_(87)
  , META           = _dereq_(62).KEY
  , $fails         = _dereq_(34)
  , shared         = _dereq_(94)
  , setToStringTag = _dereq_(92)
  , uid            = _dereq_(114)
  , wks            = _dereq_(117)
  , wksExt         = _dereq_(116)
  , wksDefine      = _dereq_(115)
  , keyOf          = _dereq_(57)
  , enumKeys       = _dereq_(31)
  , isArray        = _dereq_(47)
  , anObject       = _dereq_(7)
  , toIObject      = _dereq_(107)
  , toPrimitive    = _dereq_(110)
  , createDesc     = _dereq_(85)
  , _create        = _dereq_(66)
  , gOPNExt        = _dereq_(71)
  , $GOPD          = _dereq_(70)
  , $DP            = _dereq_(67)
  , $keys          = _dereq_(76)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _dereq_(72).f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_(77).f  = $propertyIsEnumerable;
  _dereq_(73).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_(58)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_(40)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"107":107,"110":110,"114":114,"115":115,"116":116,"117":117,"28":28,"31":31,"32":32,"34":34,"38":38,"39":39,"40":40,"47":47,"57":57,"58":58,"62":62,"66":66,"67":67,"7":7,"70":70,"71":71,"72":72,"73":73,"76":76,"77":77,"85":85,"87":87,"92":92,"94":94}],244:[function(_dereq_,module,exports){
'use strict';
var $export      = _dereq_(32)
  , $typed       = _dereq_(113)
  , buffer       = _dereq_(112)
  , anObject     = _dereq_(7)
  , toIndex      = _dereq_(105)
  , toLength     = _dereq_(108)
  , isObject     = _dereq_(49)
  , ArrayBuffer  = _dereq_(38).ArrayBuffer
  , speciesConstructor = _dereq_(95)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * _dereq_(34)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

_dereq_(91)(ARRAY_BUFFER);
},{"105":105,"108":108,"112":112,"113":113,"32":32,"34":34,"38":38,"49":49,"7":7,"91":91,"95":95}],245:[function(_dereq_,module,exports){
var $export = _dereq_(32);
$export($export.G + $export.W + $export.F * !_dereq_(113).ABV, {
  DataView: _dereq_(112).DataView
});
},{"112":112,"113":113,"32":32}],246:[function(_dereq_,module,exports){
_dereq_(111)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],247:[function(_dereq_,module,exports){
_dereq_(111)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],248:[function(_dereq_,module,exports){
_dereq_(111)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],249:[function(_dereq_,module,exports){
_dereq_(111)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],250:[function(_dereq_,module,exports){
_dereq_(111)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],251:[function(_dereq_,module,exports){
_dereq_(111)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],252:[function(_dereq_,module,exports){
_dereq_(111)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],253:[function(_dereq_,module,exports){
_dereq_(111)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"111":111}],254:[function(_dereq_,module,exports){
_dereq_(111)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"111":111}],255:[function(_dereq_,module,exports){
'use strict';
var each         = _dereq_(12)(0)
  , redefine     = _dereq_(87)
  , meta         = _dereq_(62)
  , assign       = _dereq_(65)
  , weak         = _dereq_(21)
  , isObject     = _dereq_(49)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _dereq_(22)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"12":12,"21":21,"22":22,"49":49,"62":62,"65":65,"87":87}],256:[function(_dereq_,module,exports){
'use strict';
var weak = _dereq_(21);

// 23.4 WeakSet Objects
_dereq_(22)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"21":21,"22":22}],257:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export   = _dereq_(32)
  , $includes = _dereq_(11)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_dereq_(5)('includes');
},{"11":11,"32":32,"5":5}],258:[function(_dereq_,module,exports){
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = _dereq_(32)
  , microtask = _dereq_(64)()
  , process   = _dereq_(38).process
  , isNode    = _dereq_(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"18":18,"32":32,"38":38,"64":64}],259:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = _dereq_(32)
  , cof     = _dereq_(18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"18":18,"32":32}],260:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(32);

$export($export.P + $export.R, 'Map', {toJSON: _dereq_(20)('Map')});
},{"20":20,"32":32}],261:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"32":32}],262:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"32":32}],263:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"32":32}],264:[function(_dereq_,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = _dereq_(32);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"32":32}],265:[function(_dereq_,module,exports){
'use strict';
var $export         = _dereq_(32)
  , toObject        = _dereq_(109)
  , aFunction       = _dereq_(3)
  , $defineProperty = _dereq_(67);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});
},{"109":109,"28":28,"3":3,"32":32,"67":67,"69":69}],266:[function(_dereq_,module,exports){
'use strict';
var $export         = _dereq_(32)
  , toObject        = _dereq_(109)
  , aFunction       = _dereq_(3)
  , $defineProperty = _dereq_(67);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});
},{"109":109,"28":28,"3":3,"32":32,"67":67,"69":69}],267:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = _dereq_(32)
  , $entries = _dereq_(79)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"32":32,"79":79}],268:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = _dereq_(32)
  , ownKeys        = _dereq_(80)
  , toIObject      = _dereq_(107)
  , gOPD           = _dereq_(70)
  , createProperty = _dereq_(24);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});
},{"107":107,"24":24,"32":32,"70":70,"80":80}],269:[function(_dereq_,module,exports){
'use strict';
var $export                  = _dereq_(32)
  , toObject                 = _dereq_(109)
  , toPrimitive              = _dereq_(110)
  , getPrototypeOf           = _dereq_(74)
  , getOwnPropertyDescriptor = _dereq_(70).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});
},{"109":109,"110":110,"28":28,"32":32,"69":69,"70":70,"74":74}],270:[function(_dereq_,module,exports){
'use strict';
var $export                  = _dereq_(32)
  , toObject                 = _dereq_(109)
  , toPrimitive              = _dereq_(110)
  , getPrototypeOf           = _dereq_(74)
  , getOwnPropertyDescriptor = _dereq_(70).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
_dereq_(28) && $export($export.P + _dereq_(69), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});
},{"109":109,"110":110,"28":28,"32":32,"69":69,"70":70,"74":74}],271:[function(_dereq_,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = _dereq_(32)
  , $values = _dereq_(79)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"32":32,"79":79}],272:[function(_dereq_,module,exports){
'use strict';
// https://github.com/zenparsing/es-observable
var $export     = _dereq_(32)
  , global      = _dereq_(38)
  , core        = _dereq_(23)
  , microtask   = _dereq_(64)()
  , OBSERVABLE  = _dereq_(117)('observable')
  , aFunction   = _dereq_(3)
  , anObject    = _dereq_(7)
  , anInstance  = _dereq_(6)
  , redefineAll = _dereq_(86)
  , hide        = _dereq_(40)
  , forOf       = _dereq_(37)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

_dereq_(91)('Observable');
},{"117":117,"23":23,"3":3,"32":32,"37":37,"38":38,"40":40,"6":6,"64":64,"7":7,"86":86,"91":91}],273:[function(_dereq_,module,exports){
var metadata                  = _dereq_(63)
  , anObject                  = _dereq_(7)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"63":63,"7":7}],274:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"63":63,"7":7}],275:[function(_dereq_,module,exports){
var Set                     = _dereq_(220)
  , from                    = _dereq_(10)
  , metadata                = _dereq_(63)
  , anObject                = _dereq_(7)
  , getPrototypeOf          = _dereq_(74)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"10":10,"220":220,"63":63,"7":7,"74":74}],276:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , getPrototypeOf         = _dereq_(74)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7,"74":74}],277:[function(_dereq_,module,exports){
var metadata                = _dereq_(63)
  , anObject                = _dereq_(7)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"63":63,"7":7}],278:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7}],279:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , getPrototypeOf         = _dereq_(74)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7,"74":74}],280:[function(_dereq_,module,exports){
var metadata               = _dereq_(63)
  , anObject               = _dereq_(7)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"63":63,"7":7}],281:[function(_dereq_,module,exports){
var metadata                  = _dereq_(63)
  , anObject                  = _dereq_(7)
  , aFunction                 = _dereq_(3)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"3":3,"63":63,"7":7}],282:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_(32);

$export($export.P + $export.R, 'Set', {toJSON: _dereq_(20)('Set')});
},{"20":20,"32":32}],283:[function(_dereq_,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = _dereq_(32)
  , $at     = _dereq_(97)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"32":32,"97":97}],284:[function(_dereq_,module,exports){
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export     = _dereq_(32)
  , defined     = _dereq_(27)
  , toLength    = _dereq_(108)
  , isRegExp    = _dereq_(50)
  , getFlags    = _dereq_(36)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

_dereq_(52)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
},{"108":108,"27":27,"32":32,"36":36,"50":50,"52":52}],285:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(32)
  , $pad    = _dereq_(100);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"100":100,"32":32}],286:[function(_dereq_,module,exports){
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = _dereq_(32)
  , $pad    = _dereq_(100);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"100":100,"32":32}],287:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(102)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"102":102}],288:[function(_dereq_,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_dereq_(102)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"102":102}],289:[function(_dereq_,module,exports){
_dereq_(115)('asyncIterator');
},{"115":115}],290:[function(_dereq_,module,exports){
_dereq_(115)('observable');
},{"115":115}],291:[function(_dereq_,module,exports){
// https://github.com/ljharb/proposal-global
var $export = _dereq_(32);

$export($export.S, 'System', {global: _dereq_(38)});
},{"32":32,"38":38}],292:[function(_dereq_,module,exports){
var $iterators    = _dereq_(130)
  , redefine      = _dereq_(87)
  , global        = _dereq_(38)
  , hide          = _dereq_(40)
  , Iterators     = _dereq_(56)
  , wks           = _dereq_(117)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"117":117,"130":130,"38":38,"40":40,"56":56,"87":87}],293:[function(_dereq_,module,exports){
var $export = _dereq_(32)
  , $task   = _dereq_(104);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"104":104,"32":32}],294:[function(_dereq_,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = _dereq_(38)
  , $export    = _dereq_(32)
  , invoke     = _dereq_(44)
  , partial    = _dereq_(83)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"32":32,"38":38,"44":44,"83":83}],295:[function(_dereq_,module,exports){
_dereq_(243);
_dereq_(180);
_dereq_(182);
_dereq_(181);
_dereq_(184);
_dereq_(186);
_dereq_(191);
_dereq_(185);
_dereq_(183);
_dereq_(193);
_dereq_(192);
_dereq_(188);
_dereq_(189);
_dereq_(187);
_dereq_(179);
_dereq_(190);
_dereq_(194);
_dereq_(195);
_dereq_(146);
_dereq_(148);
_dereq_(147);
_dereq_(197);
_dereq_(196);
_dereq_(167);
_dereq_(177);
_dereq_(178);
_dereq_(168);
_dereq_(169);
_dereq_(170);
_dereq_(171);
_dereq_(172);
_dereq_(173);
_dereq_(174);
_dereq_(175);
_dereq_(176);
_dereq_(150);
_dereq_(151);
_dereq_(152);
_dereq_(153);
_dereq_(154);
_dereq_(155);
_dereq_(156);
_dereq_(157);
_dereq_(158);
_dereq_(159);
_dereq_(160);
_dereq_(161);
_dereq_(162);
_dereq_(163);
_dereq_(164);
_dereq_(165);
_dereq_(166);
_dereq_(230);
_dereq_(235);
_dereq_(242);
_dereq_(233);
_dereq_(225);
_dereq_(226);
_dereq_(231);
_dereq_(236);
_dereq_(238);
_dereq_(221);
_dereq_(222);
_dereq_(223);
_dereq_(224);
_dereq_(227);
_dereq_(228);
_dereq_(229);
_dereq_(232);
_dereq_(234);
_dereq_(237);
_dereq_(239);
_dereq_(240);
_dereq_(241);
_dereq_(141);
_dereq_(143);
_dereq_(142);
_dereq_(145);
_dereq_(144);
_dereq_(129);
_dereq_(127);
_dereq_(134);
_dereq_(131);
_dereq_(137);
_dereq_(139);
_dereq_(126);
_dereq_(133);
_dereq_(123);
_dereq_(138);
_dereq_(121);
_dereq_(136);
_dereq_(135);
_dereq_(128);
_dereq_(132);
_dereq_(120);
_dereq_(122);
_dereq_(125);
_dereq_(124);
_dereq_(140);
_dereq_(130);
_dereq_(213);
_dereq_(219);
_dereq_(214);
_dereq_(215);
_dereq_(216);
_dereq_(217);
_dereq_(218);
_dereq_(198);
_dereq_(149);
_dereq_(220);
_dereq_(255);
_dereq_(256);
_dereq_(244);
_dereq_(245);
_dereq_(250);
_dereq_(253);
_dereq_(254);
_dereq_(248);
_dereq_(251);
_dereq_(249);
_dereq_(252);
_dereq_(246);
_dereq_(247);
_dereq_(199);
_dereq_(200);
_dereq_(201);
_dereq_(202);
_dereq_(203);
_dereq_(206);
_dereq_(204);
_dereq_(205);
_dereq_(207);
_dereq_(208);
_dereq_(209);
_dereq_(210);
_dereq_(212);
_dereq_(211);
_dereq_(257);
_dereq_(283);
_dereq_(286);
_dereq_(285);
_dereq_(287);
_dereq_(288);
_dereq_(284);
_dereq_(289);
_dereq_(290);
_dereq_(268);
_dereq_(271);
_dereq_(267);
_dereq_(265);
_dereq_(266);
_dereq_(269);
_dereq_(270);
_dereq_(260);
_dereq_(282);
_dereq_(291);
_dereq_(259);
_dereq_(261);
_dereq_(263);
_dereq_(262);
_dereq_(264);
_dereq_(273);
_dereq_(274);
_dereq_(276);
_dereq_(275);
_dereq_(278);
_dereq_(277);
_dereq_(279);
_dereq_(280);
_dereq_(281);
_dereq_(258);
_dereq_(272);
_dereq_(294);
_dereq_(293);
_dereq_(292);
module.exports = _dereq_(23);
},{"120":120,"121":121,"122":122,"123":123,"124":124,"125":125,"126":126,"127":127,"128":128,"129":129,"130":130,"131":131,"132":132,"133":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"161":161,"162":162,"163":163,"164":164,"165":165,"166":166,"167":167,"168":168,"169":169,"170":170,"171":171,"172":172,"173":173,"174":174,"175":175,"176":176,"177":177,"178":178,"179":179,"180":180,"181":181,"182":182,"183":183,"184":184,"185":185,"186":186,"187":187,"188":188,"189":189,"190":190,"191":191,"192":192,"193":193,"194":194,"195":195,"196":196,"197":197,"198":198,"199":199,"200":200,"201":201,"202":202,"203":203,"204":204,"205":205,"206":206,"207":207,"208":208,"209":209,"210":210,"211":211,"212":212,"213":213,"214":214,"215":215,"216":216,"217":217,"218":218,"219":219,"220":220,"221":221,"222":222,"223":223,"224":224,"225":225,"226":226,"227":227,"228":228,"229":229,"23":23,"230":230,"231":231,"232":232,"233":233,"234":234,"235":235,"236":236,"237":237,"238":238,"239":239,"240":240,"241":241,"242":242,"243":243,"244":244,"245":245,"246":246,"247":247,"248":248,"249":249,"250":250,"251":251,"252":252,"253":253,"254":254,"255":255,"256":256,"257":257,"258":258,"259":259,"260":260,"261":261,"262":262,"263":263,"264":264,"265":265,"266":266,"267":267,"268":268,"269":269,"270":270,"271":271,"272":272,"273":273,"274":274,"275":275,"276":276,"277":277,"278":278,"279":279,"280":280,"281":281,"282":282,"283":283,"284":284,"285":285,"286":286,"287":287,"288":288,"289":289,"290":290,"291":291,"292":292,"293":293,"294":294}],296:[function(_dereq_,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
var _uAMD_m={},_uAMD_r={},define=function(g,q,B){_uAMD_m[g]=[q,B]},require=function(g){if(!_uAMD_m[g])throw new Error("Module \""+g+"\" required, but does not exist.");if(!_uAMD_r[g]){_uAMD_r[g]={exports:{}};var q,B,C,D,E=[];for(B=0,q=_uAMD_m[g][0],C=q.length;B<C;B++)E[B]="module"===(D=q[B])?_uAMD_r[g]:"exports"===(D=q[B])?_uAMD_r[g].exports:require(D);_uAMD_m[g][1].apply(this.global||this,E)}return _uAMD_r[g].exports};define("app",["exports","voltage/m","app/pods/application-route/component","app/pods/button-confirm/component","app/pods/detail-route/component","app/pods/field-datetime/component","app/pods/field-filesize/component","app/pods/field-string/component","app/pods/field-subset/component","app/pods/field-timedelta/component","app/pods/index-route/component","app/pods/input-checkbox/component","app/pods/input-control/component","app/pods/input-textarea/component","app/pods/m-select/component","app/pods/m-tag/component","app/pods/notfound-route/component","app/pods/routes/main","app/pods/widget-comment/component","app/pods/widget-filter/component","app/pods/widget-gallery/component","app/pods/widget-image/component","app/pods/widget-keyval/component","app/pods/widget-modal/component","app/pods/widget-osm/component","app/pods/widget-table/component","app/pods/widget-tag/component"],function(g,q,B,C,D,E,G,H,I,J,K,N,P,Q,R,T,U,V,W,X,Y,Z,$,_,aa,ba,ca){"use strict";function da(Fa){return Fa&&Fa.__esModule?Fa:{default:Fa}}Object.defineProperty(g,"__esModule",{value:!0});var ea=da(B),fa=da(C),ga=da(D),ha=da(E),ia=da(G),ja=da(H),ka=da(I),la=da(J),ma=da(K),na=da(N),oa=da(P),pa=da(Q),qa=da(R),ra=da(T),sa=da(U),ta=da(V),va=da(W),wa=da(X),xa=da(Y),ya=da(Z),za=da($),Aa=da(_),Ba=da(aa),Ca=da(ba),Da=da(ca);const Ea=q.M.create({});Ea.components["application-route"]=ea.default,Ea.components["button-confirm"]=fa.default,Ea.components["detail-route"]=ga.default,Ea.components["field-datetime"]=ha.default,Ea.components["field-filesize"]=ia.default,Ea.components["field-string"]=ja.default,Ea.components["field-subset"]=ka.default,Ea.components["field-timedelta"]=la.default,Ea.components["index-route"]=ma.default,Ea.components["input-checkbox"]=na.default,Ea.components["input-control"]=oa.default,Ea.components["input-textarea"]=pa.default,Ea.components["m-select"]=qa.default,Ea.components["m-tag"]=ra.default,Ea.components["notfound-route"]=sa.default,Ea.components.main=ta.default,Ea.components["widget-comment"]=va.default,Ea.components["widget-filter"]=wa.default,Ea.components["widget-gallery"]=xa.default,Ea.components["widget-image"]=ya.default,Ea.components["widget-keyval"]=za.default,Ea.components["widget-modal"]=Aa.default,Ea.components["widget-osm"]=Ba.default,Ea.components["widget-table"]=Ca.default,Ea.components["widget-tag"]=Da.default,Ea.routes=ta.default,g.default=Ea}),define("app/pods/application-route/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.RoutableComponent{constructor(){super(),this.template=`
            <nav class="navbar navbar-default navbar-fixed-top">
				<div class="container-fluid">
					<div class="left-right vcenter">
						<link-to href="/"><img src="{{logo}}" width=100></link-to>
						<ul class="nav navbar-nav">
							<li>
								{{#if loggedin}}
									<button type="button" class="btn btn-default" {{"action" ("noexpand" "signout")}}>Sign out <strong>{{loggedin}}</strong></button>
								{{else}}
									<button type="button" class="btn btn-default" {{"action" ("noexpand" "openSignin")}}>Sign in</button>
								{{/if}}
							</li>
						</ul>
					</div>
				</div>
            </nav>

            <!--
            <div class="pace pace-active">
                <div class="pace-progress" data-progress="{{owner.xhrProgress}}" data-progress-text="{{owner.xhrProgress}}%" style="transform: translate3d({{owner.xhrProgress}}%, 0px, 0px);">
                    <div class="pace-progress-inner">
                    </div>
                </div>
                <div class="pace-activity"></div>
            </div>
            -->

            <div class="container-fluid main bagbunker">
                {{#if owner.ajaxError}}
                    <div class="alert alert-danger" role="alert">
                        <strong>Request failed:</strong> {{owner.ajaxError}}
                    </div>
                {{/if}}

                {{outlet}}
            </div>

            <form {{"action" ("noexpand" "signin" on="submit")}}>
                <widget-modal open={{signinOpen}}
                              setOpen={{"curry" ("noexpand" ("set" ("noexpand" signinOpen)))}}
                              title="Sign in"
                              as="target">
                    {{#if ("is-equal" target "body")}}
                            <div class="form-group">
                                <label>Username</label>
                                <input-control class="form-control"
                                               placeholder="username"
                                               value={{username}}
                                               changeAction={{"curry" ("noexpand" ("set" ("noexpand" username)))}} />
                            </div>
                            <div class="form-group {{"if" password_error "has-error"}}">
                                <label>Password</label>
                                <input-control type="password"
                                               class="form-control"
                                               placeholder="password"
                                               value={{password}}
                                               changeAction={{"curry" ("noexpand" ("set" ("noexpand" password)))}} />
                            </div>
                    {{else}}
                        <button type="submit" class="btn btn-default">Sign in</button>
                    {{/if}}
                </widget-modal>
            </form>

            <nav class="navbar navbar-inverted footer">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="https://ternaris.com" target=_blank><img src="app/styles/ternaris-weiss.svg" width=100></a>
                    </div>
                    <div class="navbar-collapse">
                    <p class="navbar-text">
                        <ul class="list-inline">
                            <li>
                                <a class="navbar-link" href={{code}} target=_blank>Code</a>
                            </li>
                            <li>
                                <a class="navbar-link" href={{issues}} target=_blank>Issues</a>
                            </li>
                        </ul>
                    </p>
                    </div>
                </div>
            </nav>
        `,this.logo=(0,B.computed)(function(){return Array.from(this.renderNode.doc.querySelectorAll("script")).map(D=>D.dataset.marvLogo).filter(D=>D)[0]}),this.code=(0,B.computed)(function(){return Array.from(this.renderNode.doc.querySelectorAll("script")).map(D=>D.dataset.marvCodeLink).filter(D=>D)[0]}),this.issues=(0,B.computed)(function(){return Array.from(this.renderNode.doc.querySelectorAll("script")).map(D=>D.dataset.marvIssuesLink).filter(D=>D)[0]}),this.loggedin="",this.username="",this.password="",this.password_error=(0,B.computed)("username","password",function(){return!1}),this.apiEndpoint=`${document.querySelector("base").href}marv/api/2/`,this.actions={openSignin(){this.signinOpen=!0},signin(D){const E={url:"login",method:"POST",data:{username:this.username,password:this.password}};this.api(E).then(G=>{G.username?(this.loggedin=G.username,this.username="",this.password="",this.signinOpen=!1,this.getOwner().rootNode.update()):(this.password="",this.password_error=!0,this.getOwner().rootNode.update())}),D.preventDefault()},signout(){this.api({url:"logout",method:"POST"}).then(D=>{this.loggedin="",this.getOwner().rootNode.update()})}}}modelHook(){return this.api({url:"login"}).then(D=>{this.loggedin=D.username})}api(D){return D.url=`${this.apiEndpoint}${D.url}`,this.loading=!0,this.getOwner().ajax(D).then(E=>{return this.loading=!1,this.error=E.error,E},E=>{return this.error="The frontend is unable to communicate with the server.",E})}postData(D){return{contentType:"application/json",data:JSON.stringify(D),type:"POST"}}comment(D){return this.api({url:"comment",method:"POST",data:D})}tag(D){return this.api({url:"tag",method:"POST",data:D})}getFilelist(D){return this.api({url:"file-list",method:"POST",data:D,sync:!0}).then(E=>JSON.parse(E))}delete(D){return this.api({url:"fileset",method:"DELETE",data:D})}}g.default=C}),define("app/pods/button-confirm/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            {{#if ("is-equal" mode "link")}}
                <a class="{{class}} {{buttonClass}}" {{"action" ("noexpand" "check")}}>
                    <yield-block />
                </a>
            {{else}}
                <button class="{{class}} {{buttonClass}}" {{"action" ("noexpand" "check")}}>
                    <yield-block />
                </button>
            {{/if}}
            <widget-modal open={{modalOpen}}
                          setOpen={{"curry" ("noexpand" ("set" ("noexpand" modalOpen)))}}
                          title={{title}}
                          as="target">
                {{#if ("is-equal" target "body")}}
                    {{text}}
                {{else}}
                    <button class="{{class}} {{actionButtonClass}}" {{"action" ("noexpand" "execute")}}>{{("if" confirmText confirmText "Confirm")}}</button>
                {{/if}}
            </widget-modal>
        `,this.modalOpen=!1,this.actions={check(){this.modalOpen=!0},execute(){this.action(),this.modalOpen=!1}}}}g.default=C}),define("app/pods/detail-route/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.RoutableComponent{constructor(){super(),this.template=`
            {{#if model.error}}
                <div class="alert alert-danger" role="alert">{{model.error}}</div>
            {{else}}
                <div class="breadcrumbs left-right vcenter">
                    <ol class="breadcrumb">
                      <li><link-to href="/">Overview</link-to></li>
                      <li class="active">{{model.title}}</li>
                    </ol>
					<span>
						<widget-tag class="btn btn-xs btn-default" disabled={{"not" bagbunker.loggedin}} tags={{model.tags}} alltags={{model.all_known_tags}} changeAction={{"fn" retag}} menuClass="dropdown-menu-right" />
						<widget-comment class="btn btn-xs btn-default" disabled={{"not" bagbunker.loggedin}} changeAction={{"fn" Xcomment}} menuClass="dropdown-menu-right" />
					</span>
                </div>
                <ul class="nav nav-tabs">
                    <li role="presentation" class="{{"if" ("is-equal" tabindex "summary") "active"}}"><a role="button" {{"action" ("noexpand" "settab" "summary")}}>Summary</a></li>
                    {{#each model.sections as |section index|}}
                        <li role="presentation" class="{{"if" ("is-equal" tabindex index) "active"}}"><a role="button" {{"action" ("noexpand" "settab" index)}}>{{section.title}}</a></li>
                    {{/each}}
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane {{"if" ("is-equal" tabindex "summary") "active"}}">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="left-right">
                                    <widget-keyval model={{model.summary.widget}} />
                                    <div>
                                        {{#if bagbunker.loggedin}}
                                            <button-confirm buttonClass="link-default" actionButtonClass="btn btn-default"
                                                            mode="link"
                                                            title="Delete fileset {{uuid}}" text="Are you sure you want to discard this fileset. Tags and comments would be IRREVOCABLY gone. If the fileset still exists on disk it would be re-added with a new UUID during the next scan."
                                                            action={{"fn" delete}}
                                                            confirmText="Discard fileset">
                                                Discard fileset
                                            </button-confirm>
                                        {{else}}
                                            <a role="button" class="link-default disabled">Discard fileset</a>
                                        {{/if}}
                                    </div>
                                </div>
                                <hr />

                                <div>
                                    Tagged
                                    <ul class="list-inline tagged">{{#each model.tags as |tag|}}<li><span class="badge">{{tag}}</span></li>{{/each}}</ul>
                                    <widget-tag class="btn btn-xs btn-default" disabled={{"not" bagbunker.loggedin}} tags={{model.tags}} alltags={{model.all_known_tags}} changeAction={{"fn" retag}} />
                                </div>
                                <hr />

                                {{#each model.comments as |comment|}}
                                    <div class="comment panel panel-default">
                                        <div class="comment-header panel-heading">
                                            <strong>{{comment.username}}</strong> commented <time datetime="{{comment.timestamp}}" is="relative-time" title="{{comment.timestamp}}" >{{("print-relatime" comment.timestamp)}}</time>
                                        </div>
                                        <div class="comment-content panel-body">
                                            {{comment.comment}}
                                        </div>
                                    </div>
                                {{/each}}
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="form-group">
                                            {{#if bagbunker.loggedin}}
                                                <input-textarea class="form-control"
                                                                placeholder="Leave a comment"
                                                                value={{comment}}
                                                                rows=5
                                                                changeAction={{"curry" ("noexpand" ("set" ("noexpand" comment)))}} />
                                            {{else}}
                                                <input-textarea class="form-control"
                                                                placeholder="Sign in to comment"
                                                                value={{comment}}
                                                                rows=5
                                                                changeAction={{"curry" ("noexpand" ("set" ("noexpand" comment)))}}
                                                                disabled="disabled" />
                                            {{/if}}
                                        </div>
                                        {{#if bagbunker.loggedin}}
                                            <button type="button"
                                                    class="btn btn-default pull-right"
                                                    {{"action" ("noexpand" "saveComment")}}>
                                                Comment
                                            </button>
                                        {{/if}}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {{#each model.sections as |section index|}}
                        <div role="tabpanel" class="tab-pane {{"if" ("is-equal" tabindex index) "active"}}">
                            <!--section-collapse model={{section}} / -->
                            {{#if ("is-equal" tabindex index)}}

                            {{#each section.widgets as |widget|}}
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <h3>{{widget.caption}}</h3>
                                        <delegate-component component="widget-{{widget.type}}" model={{widget}} />
                                    </div>
                                </div>
                            {{/each}}

                            {{/if}}
                        </div>
                    {{/each}}
                </div>
            {{/if}}
        `,this.bagbunker=(0,B.computed)(function(){return this.getOwner().lookup("application-route")}),this.tabindex="summary",this.comment="",this.actions={toggleControls(){this.controlsOpen=!this.controlsOpen},saveComment(){this.comment&&(this.bagbunker.comment({[this.uuid]:{add:[this.comment]}}).then(()=>this.reloadModel()),this.comment="")},settab(D){this.tabindex=D}}}retag(D){this.bagbunker.tag({[this.uuid]:{add:D.added,remove:D.removed}}).then(()=>this.reloadModel())}Xcomment(D){this.bagbunker.comment({[this.uuid]:{add:[D]}}).then(()=>this.reloadModel())}delete(){this.bagbunker.delete([this.uuid]).then(()=>{this.transitionTo({route:"index"})})}reloadModel(){console.log("calling model hook!"),this.modelHook({id:this.uuid}).then(D=>{console.log("RELOAD DONE!!"),this.model=D,this.getOwner().rootNode.update()})}modelHook(D){return this.uuid=D.id,this.baseurl=`${this.bagbunker.apiEndpoint}fileset-detail/${D.id}`,this.getOwner().ajax({url:this.baseurl}).then(E=>{return E.sections.forEach(G=>{G.widgets.forEach(H=>{"image"===H.type?H.image.src=`${this.baseurl}/${H.image.src}`:"gallery"===H.type?H.images.forEach(I=>{I.src=`${this.baseurl}/${I.src}`}):"table"===H.type&&H.columns.forEach((I,J)=>{"rellink"===I.formatter&&(I.formatter="link",H.rows.forEach(K=>K.values[J].href=`${this.baseurl}/${K.values[J].href}`))})})}),E.comments=B.A.create(E.comments),this.getOwner().ajax({url:`${this.bagbunker.apiEndpoint}all-known-tags`}).then(G=>{return E.all_known_tags=B.A.create(G),E.tags=B.A.create(E.tags),B.O.create(E)})},E=>{return B.O.create({error:`Could not load fileset ${D.id}, reason "${E.statusText}"`})})}}g.default=C}),define("app/pods/field-datetime/component",["exports","voltage/component","voltage/observable","voltage/helper"],function(g,q,B,C){"use strict";function D(G,H){do{if(G===H)return!0;H=H.parentElement}while(H.parentElement);return!1}Object.defineProperty(g,"__esModule",{value:!0});class E extends q.Component{constructor(){super(),this.template=`
            <div class="row">
                <div class="col-xs-6">
                    <div class="input-group date"
                         {{"action" ("noexpand" "calendarFocusIn" on="focus" capture=true)}}
                         {{"action" ("noexpand" "calendarFocusOut" on="blur" capture=true)}}>
                        <span class="input-group-addon dropdown {{"if" calendarOpen "open"}}">
                            <span class="glyphicon glyphicon-calendar"></span>
                            {{#if calendarOpen}}
                                <div class="dropdown-menu" tabindex="-1">
                                    <table class="Xtable table-condensed small text-center">
                                        <thead>
                                            <tr>
                                                <th class="text-center" style="Xpadding-left:0; padding-right:0">
                                                    <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "prev")}}>
                                                        <span class="small glyphicon glyphicon-backward"></span>
                                                    </button>
                                                </th>
                                                <th class="text-center" colspan="5">{{displayMonthyear}}</th>
                                                <th class="text-center" style="padding-left:0; Xpadding-right:0">
                                                    <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "next")}}>
                                                        <span class="small glyphicon glyphicon-forward"></span>
                                                    </button>
                                                </th>
                                            </tr>
                                            <tr>
                                                {{!#group}}
                                                    {{#each weekdays as |weekday|}}
                                                        <th>{{weekday}}</th>
                                                    {{/each}}
                                                {{!/group}}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {{#each matrix as |line|}}
                                                <tr>
                                                    {{#each line as |column|}}
                                                        <td class={{"if" column.isCurrent "currentDay"}}>
                                                            <a class="btn btn-xs {{"if" column.isMonth "black" "gray"}}" {{"action" ("noexpand" "setDate" column.year column.month column.date)}}>{{column.date}}</a>
                                                        </td>
                                                    {{/each}}
                                                </tr>
                                            {{/each}}
                                        </tbody>
                                    </table>
                                </div>
                            {{/if}}
                        </span>
                        <input-control class="form-control" value={{displayDate}} />
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="input-group time"
                         {{"action" ("noexpand" "clockFocusIn" on="focus" capture=true)}}
                         {{"action" ("noexpand" "clockFocusOut" on="blur" capture=true)}}>
                        <span class="input-group-addon dropdown {{"if" clockOpen "open"}}">
                            <span class="glyphicon glyphicon-time"></span>
                            {{#if clockOpen}}
                                <div class="dropdown-menu" style="min-width:0" tabindex="-1">
                                    <table class="Xtable table-condensed small text-center">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <button class="btn btn-default" {{"action" ("noexpand" "hourUp")}}>
                                                        <span class="glyphicon glyphicon-chevron-up"></span>
                                                    </button>
                                                </td>
                                                <td class="separator">&nbsp;</td>
                                                <td>
                                                    <button class="btn btn-default" {{"action" ("noexpand" "minuteUp")}}>
                                                        <span class="glyphicon glyphicon-chevron-up"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{{hour}}</td>
                                                <td class="separator">:</td>
                                                <td>{{minute}}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button class="btn btn-default" {{"action" ("noexpand" "hourDown")}}>
                                                        <span class="glyphicon glyphicon-chevron-down"></span>
                                                    </button>
                                                </td>
                                                <td class="separator">&nbsp;</td>
                                                <td>
                                                    <button class="btn btn-default" {{"action" ("noexpand" "minuteDown")}}>
                                                        <span class="glyphicon glyphicon-chevron-down"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            {{/if}}
                        </span>
                        <!--input-control class="form-control" value={{displayTime}} /-->
                        <input class="form-control" value={{displayTime}} disabled=disabled >
                    </div>
                </div>
            </div>
        `,this.weekdays=[0,1,2,3,4,5,6].map(G=>{const H=new C.Moment;return H.weekday=G,H.format("dd")}),this.val=(0,B.computed)("value",function(){return this.value?new C.Moment(this.value):new C.Moment().startOf("date")}),this.currentMonth=(0,B.computed)("value",function(){return this.val.clone().startOf("month")}),this.displayMonthyear=(0,B.computed)("currentMonth",function(){return this.currentMonth.format("MMM YYYY")}),this.displayDate=(0,B.computed)("val",function(){return this.value?this.val.format("LL"):""}),this.displayTime=(0,B.computed)("val",function(){return this.val.format("LT")}),this.hour=(0,B.computed)("val",function(){return this.val.hours}),this.minute=(0,B.computed)("val",function(){return this.val.minutes}),this.matrix=(0,B.computed)("currentMonth","val",function(){const G=this.val,H=this.currentMonth,I=G.year,J=G.month,K=G.date,N=H.month,P=H.clone().startOf("month").startOf("week"),Q=H.clone().endOf("month").endOf("week");for(var R=B.A.create();P<Q;){const T=B.A.create();for(let U=0;7>U;U++)T.push(B.O.create({isCurrent:P.date===K&&P.month===J&&P.year===I,isMonth:P.month===N,year:P.year,month:P.month,date:P.date})),P.add(1,"date");R.push(T)}return R}),this.actions={calendarFocusIn(G){console.log("focusin",G),this.calendarOpen=!0},calendarFocusOut(G){if(console.log("focusout",G),G.relatedTarget){const H=this.renderNode.children[0].elements[0];if(D(H,G.relatedTarget))return}this.calendarOpen=!1},clockFocusIn(){this.clockOpen=!0},clockFocusOut(G){if(G.relatedTarget){const H=this.renderNode.children[0].elements[0];if(D(H,G.relatedTarget))return}this.clockOpen=!1},prev(){this.currentMonth=this.currentMonth.clone().add(-1,"month")},next(){this.currentMonth=this.currentMonth.clone().add(1,"month")},setDate(G,H,I){const J=this.val.clone();J.year=G,J.month=H,J.date=I,this.changeAction(J.format()),console.log("selected",J.format()),this.val=J},hourUp(){this.val=this.val.clone().add(1,"hour")},hourDown(){this.val=this.val.clone().add(-1,"hour")},minuteUp(){this.val=this.val.clone().add(1,"minute")},minuteDown(){this.val=this.val.clone().add(-1,"minute")}}}mChangeAction(G){this.changeAction(G?G:G)}}g.default=E}),define("app/pods/field-filesize/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";function C(H){if(""===H)return"";const I=D.exec(H);return!I||isNaN(I[1])?NaN:(H=+I[1],I[2]&&(H*=Math.pow(2,10*E.indexOf(I[2][0].toLowerCase()))),Math.floor(H))}Object.defineProperty(g,"__esModule",{value:!0});const D=/^\s*([0-9.]+)\s*([kmgtpezy][b]?)?\s*$/i,E=["b","k","m","g","t","p","e","z","y"];class G extends q.Component{constructor(){super(),this.template=`
            <div class="row">
                <div class="col-xs-9">
                    <input-control class="form-control"
                                   value={{value}}
                                   changeAction={{"fn" mChangeAction}} />
                </div>
                <div class="col-xs-3">
                    <input class="form-control" value={{size}} disabled=true>
                </div>
            </div>
        `,this.size=(0,B.computed)("value",function(){const H=C(this.value);return H?`${H} bytes`:""})}mChangeAction(H){const I=C(H);isNaN(I)?this.changeErrorAction("Value must be a number and optional unit (e.g. MB)"):this.changeErrorAction(null),this.changeAction(H)}}g.default=G}),define("app/pods/field-string/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <input-control class="form-control"
                           value={{value}}
                           changeAction={{"fn" mChangeAction}} />
        `}mChangeAction(D){this.changeAction(D?D:D)}}g.default=C}),define("app/pods/field-subset/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            <m-tag tags={{value}}
                   suggestions={{constraints}}
                   subset=true
                   add={{"fn" add}}
                   remove={{"fn" remove}} />
        `}add(C){this.value.push(C),this.changeAction(B.A.create(this.value))}remove(C){this.value.splice(this.value.indexOf(C),1),this.changeAction(B.A.create(this.value))}}}),define("app/pods/field-timedelta/component",["exports","voltage/component"],function(g,q){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            <input-control class="form-control"
                           value={{value}}
                           changeAction={{"fn" mChangeAction}} />
        `}mChangeAction(B){isNaN(+B)?this.changeErrorAction("Value must be a number"):this.changeErrorAction(null),this.changeAction(B)}}}),define("app/pods/index-route/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.RoutableComponent{constructor(){super(),this.template=`
            <h2>
                {{model.summary.title}}
                <button type="button" class="btn btn-default btn-sm pull-right {{"if" filtersOpen "active"}}" {{"action" ("noexpand" "toggleFilters")}}>{{model.filters.title}}</button>
            </h2>
            <div class="panel panel-default">
                {{#if filtersOpen}}
                    <div class="panel-body">
                        <widget-filter model={{model.filters.widget}} />
                    </div>
                    <hr />
                {{/if}}
                <div class="panel-body">
                    <widget-keyval model={{model.summary.widget}} />
                </div>
            </div>

            <h2>{{model.listing.title}}</h2>
            <div class="panel panel-default">
                <div class="panel-body">
                    <widget-table model={{model.listing.widget}} selectable=true as="selected">
                        <ul class="list-inline inline-block">
                            <li>
                                ({{selected.length}} items selected)
                            </li>
                            <li>
                                <!--
                                <form class="dropdown {{"if" tagging "open"}}" {{"action" ("noexpand" "toggleTagging" selected on="xfocusout")}} {{"action" ("noexpand" "bulkTag" selected on="submit")}}>
                                    <button class="btn btn-xs btn-default button-tag"
                                            type="button"
                                            disabled={{"not" selected.length}}
                                            {{"action" ("noexpand" "toggleTagging" selected)}}>
                                        tag <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu bulk-dropdown">
                                        {{#if bagbunker.loggedin}}
                                            <li class="dropdown-header">Add tag</li>
                                            <li>
                                                <a role="button">
                                                    <div class="input-group input-group-sm">
                                                        <input-control type="text" class="form-control input-sm" placeholder="Label" value={{tag}} changeAction={{"curry" ("noexpand" ("set" ("noexpand" tag)))}} />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-default" type="button" {{"action" ("noexpand" "bulkTagAdd" selected tag)}} disabled={{"not" tag}}><span class="glyphicon glyphicon-plus"></span></button>
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>

                                            <li class="dropdown-header">Tags</li>
                                            {{#each tags as |tag|}}
                                                <li class="xtag">
                                                    <a role="button" xclass="btn btn-block btn-default btn-xs" type="button" {{"action" ("noexpand" "bulkTagToggle" selected tag.name)}} title={{tag.hint}}>
                                                        <span class="glyphicon glyphicon-{{tag.state}}"></span>
                                                        {{tag.name}}
                                                    </a>
                                                </li>
                                            {{/each}}
                                            <li role="separator" class="divider"></li>
                                            <li class="text-right">
                                                <a role="button">
                                                    <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "toggleTagging" selected)}}>Cancel</button>
                                                    <button class="btn btn-default btn-xs" type="submit" disabled={{saveTagsDisabled}}>Save tags</button>
                                                </a>
                                            </li>
                                        {{else}}
                                            <li class="text-center">Sign in to tag</li>
                                        {{/if}}
                                    </ul>
                                </form>
                                -->
                                <widget-tag class="btn btn-xs btn-default" disabled={{"not" bagbunker.loggedin}} fulldisabled={{"not" selected.length}} tags={{selected}} alltags={{alltags}} changeAction={{"fn" execTag selected}} />
                            </li>
                            <li>
                                <!--
                                <form class="dropdown {{"if" commenting "open"}}" {{"action" ("noexpand" "bulkComment" selected on="submit")}}>
                                    <button class="btn btn-xs btn-default button-comment"
                                            type="button"
                                            disabled={{"not" selected.length}}
                                            {{"action" ("noexpand" "toggleCommenting" selected)}}>
                                        comment <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu bulk-dropdown">
                                        {{#if bagbunker.loggedin}}
                                            <li class="dropdown-header">Comment</li>
                                            <li>
                                                <a role="button" class="form-group">
                                                    <input-textarea class="form-control" rows=10 cols=80 value={{comment}} changeAction={{"curry" ("noexpand" ("set" ("noexpand" comment)))}} />
                                                </a>
                                            </li>
                                            <li role="separator" class="divider"></li>
                                            <li class="text-right">
                                                <a role="button">
                                                    <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "toggleCommenting" selected)}}>Cancel</button>
                                                    <button class="btn btn-default btn-xs" type="submit" disabled={{"not" comment}}>Comment</button>
                                                </a>
                                            </li>
                                        {{else}}
                                            <li class="text-center">Sign in to comment</li>
                                        {{/if}}
                                    </ul>
                                </form>
                                -->
                                <widget-comment class="btn btn-xs btn-default" disabled={{"not" bagbunker.loggedin}} fulldisabled={{"not" selected.length}} changeAction={{"fn" Xcomment selected}} />
                            </li>
                            <li>
                                <button class="btn btn-xs btn-default"
                                        disabled={{"not" selected.length}}
                                        {{"action" ("noexpand" "copyFilelist" selected)}}>
                                    {{copyFilelistStr}}
                                </button>
                            </li>
                            <li>
                                <button class="btn btn-xs btn-default"
                                        disabled={{"not" selected.length}}
                                        {{"action" ("noexpand" "copyUrllist" selected)}}>
                                    {{copyUrllistStr}}
                                </button>
                            </li>
                        </ul>
                    </widget-table>
                </div>
            </div>

        `,this.queryParamsX={filter:{refreshModel:!0},debugfilters:{}},this.filter="",this.debugfilters=!1,this.filterFixed=(0,B.computed)("filter",function(){return"undefined"==typeof this.filter?"":this.filter}),this.filterObj=(0,B.computed)(function(){const D={};if(this.filter){const E=JSON.parse(atob(this.filter));for(let G in E)D[G]=B.O.create(E[G])}return B.O.create(D)}),this.filterJSON=(0,B.computed)("model",function(){const D=[];this.model.filters.widget.filters.forEach(G=>{D.push(`filterObj.${G.key}.op`),D.push(`filterObj.${G.key}.val`)}),(0,B.updateComputed)(this,"filterJSON",D);const E={};for(let G in this.filterObj)this.filterObj[G].val.length&&(E[G]={op:this.filterObj[G].op,val:this.filterObj[G].val});return JSON.stringify(E,0,1)}),this.filterBase=(0,B.computed)("filterJSON",function(){this.filterJSON;const D={};for(let G in this.filterObj)this.filterObj[G].val.length&&(D[G]={op:this.filterObj[G].op,val:this.filterObj[G].val});const E=JSON.stringify(D);return"{}"===E?"":btoa(E)}),this.copyFilelistStr=(0,B.computed)("selected.@each",function(){return"copy file paths"}),this.copyUrllistStr=(0,B.computed)("selected.@each",function(){return"copy URLs"}),this.tags=B.A.create(),this.tag="",this.filtersOpen=(0,B.computed)("filterFixed",function(){return!!this.filterFixed}),this.alltags=(0,B.computed)("model.all_known",function(){const D=Object.keys(this.model.all_known).filter(E=>/tags$/.test(E))[0];return B.A.create(this.model.all_known[D])}),this.saveTagsDisabled=(0,B.computed)("tags.@each.state",function(){const D=!!this.tags.filter(G=>G.initial&&"minus"!==G.state).length,E=!!this.tags.filter(G=>"check"===G.state).length;return!(D||E)}),this.comment="",this.actions={toggleFilters(){this.filtersOpen=!this.filtersOpen},applyFilter(D){D.preventDefault(),this.transitionTo({query:{filter:this.filterBase}})},resetFilters(){for(let D in this.filterObj){const E=this.filterObj[D];E.val=E.val.slice(0,0)}},toggleTagging(D){if(this.selected=D,this.tagging=!this.tagging,this.tagging){this.tags=B.A.create();const E={};D.forEach(G=>G.tags.forEach(H=>E[H]=!0)),Object.keys(E).forEach(G=>{const H=D.filter(I=>~I.tags.indexOf(G)).length!==D.length;this.tags.push(B.O.create({name:G,state:H?"minus":"check",isSome:H,initial:!0}))}),this.tags.selected=D}else this.tags.selected=null},toggleCommenting(){this.commenting=!this.commenting},bulkTagAdd(D,E){let G=this.tags.filter(H=>H.name===E)[0];G||this.tags.push(B.O.create({name:E,state:"check",hint:"add to all",isSome:!1})),this.tag=""},bulkTagToggle(D,E){let G=this.tags.filter(H=>H.name===E)[0];G.state=G.isSome?{check:"unchecked",unchecked:"minus",minus:"check"}[G.state]:{check:"unchecked",unchecked:"check"}[G.state],G.hint={checked:"add to all",unchecked:"remove from all",minus:"leave unmodified"}[G.state]},bulkTag(){const D={};this.tags.forEach(E=>{this.tags.selected.forEach(G=>{if("minus"!==E.state&&(E.initial||"unchecked"!==E.state)){D[G.id]||(D[G.id]={});const H=D[G.id],I="check"===E.state?"add":"remove";H[I]||(H[I]=[]),H[I].push(E.name)}})}),this.bagbunker.tag(D).then(()=>this.reloadModel()),this.tagging=!1,this.tag="",event.preventDefault()},bulkComment(D){this.selected=D;const E={};D.forEach(G=>{E[G.id]={add:[this.comment]}}),this.bagbunker.comment(E).then(()=>this.reloadModel()),this.commenting=!1,this.comment="",event.preventDefault()},copyFilelist(D){this.selected=D;const E=D.map(G=>G.id);this.bagbunker.getFilelist(E).then(G=>{this.copyToClipboard(G.paths.join("\n")),this.copyFilelistStr="Paths copied",this.getOwner().rootNode.update()})},copyUrllist(D){this.selected=D;const E=D.map(G=>G.id);this.bagbunker.getFilelist(E).then(G=>{this.copyToClipboard(G.urls.map(H=>`${this.bagbunker.apiEndpoint}${H}`).join("\n")),this.copyUrllistStr="URLs copied",this.getOwner().rootNode.update()})}}}execTag(D,E){const G={};D.forEach(H=>{G[H.id]={add:E.added,remove:E.removed}}),this.bagbunker.tag(G).then(()=>this.reloadModel())}Xcomment(D,E){const G={};D.forEach(H=>{G[H.id]={add:[E]}}),this.bagbunker.comment(G).then(()=>this.reloadModel())}copyToClipboard(D){const E=this.renderNode.doc.createElement("textarea");E.value=D,this.renderNode.children[0].elements[0].appendChild(E),E.select(),this.renderNode.doc.execCommand("copy"),E.remove()}init(){super.init(),this.bagbunker=this.getOwner().lookup("application-route")}modelHook(D){this.params=D;const E={};return D.filter&&(E.filter=atob(D.filter)),this.getOwner().ajax({url:`${this.bagbunker.apiEndpoint}fileset-listing`,data:E})}show(D){this.transitionToRoute("set",D.id)}reloadModel(){this.modelHook(this.params).then(D=>{this.model=D,this.getOwner().rootNode.update()})}}g.default=C}),define("app/pods/input-checkbox/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <input type="checkbox"
                   class={{class}}
                   disabled={{"if" disabled "disabled" undefined}}
                   checked={{mValue}}
                   {{"action" ("noexpand" "change" on="change")}} >
        `,this.mValue=(0,B.computed)("value",function(){const D=this.renderNode.children[0].elements[0];return D.firstChild.nextSibling.checked=this.value,this.value}),this.actions={change(){const D=this.renderNode.children[0].elements[0],E=D.firstChild.nextSibling.checked;console.log(this.__oid__,"checked?",E),this.changeAction(E)}}}}g.default=C}),define("app/pods/input-control/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <input type={{type}}
                   class={{class}}
                   disabled={{"if" disabled "disabled" undefined}}
                   placeholder={{placeholder}}
                   value={{mValue}}
                   {{"action" ("noexpand" "change" on="change")}}
                   {{"action" ("noexpand" "change" on="keyup")}} >
        `,this.type="text",this.mValue=(0,B.computed)("value",function(){const D=this.renderNode.children[0].elements[0];return D.firstChild.nextSibling.value=this.value,this.value}),this.actions={change(){const D=this.renderNode.children[0].elements[0],E=D.firstChild.nextSibling.value;console.log(this.__oid__,E),this.changeAction(E)}}}}g.default=C}),define("app/pods/input-textarea/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <textarea class={{class}}
                      disabled={{"if" disabled "disabled" undefined}}
                      value={{mValue}}
                      rows={{rows}}
                      cols={{cols}}
                      placeholder={{placeholder}}
                      {{"action" ("noexpand" "change" on="change")}}
                      {{"action" ("noexpand" "change" on="keyup")}} >
            </textarea>
        `,this.mValue=(0,B.computed)("value",function(){const D=this.renderNode.children[0].elements[0];return D.firstChild.nextSibling.value=this.value,this.value}),this.actions={change(){const D=this.renderNode.children[0].elements[0],E=D.firstChild.nextSibling.value;this.changeAction(E)}}}}g.default=C}),define("app/pods/m-select/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            <select class="form-control" {{"action" ("noexpand" "change" on="change")}} disabled={{disabled}}>
                {{#each mOptions as |item|}}
                    <option value={{item.value}} selected={{"if" ("is-equal" item.value mSelected) "selected"}}>
                        {{item.name}}
                    </option>
                {{/each}}
            </select>
        `,this.nameKey="",this.valueKey="__index__",this.mOptions=(0,B.computed)("options",function(){return this.options.map((C,D)=>{return{name:this.nameKey?C[this.nameKey]:C,value:"__index__"===this.valueKey?D:C[this.valueKey]}})}),this.mSelected=(0,B.computed)("options","selected",function(){console.log("recalculating selected...");const C=this.options,D=this.selected,E=C.indexOf(D);if(~E){if("__index__"===this.valueKey)return E;return D[this.valueKey]}}),this.actions={change(){const C=this.renderNode.children[0].elements[0],D=C.firstChild.nextSibling.selectedIndex;this.changeAction(this.options[D])}}}foo(){return console.log("foo called"),"bar"}init(){super.init()}}}),define("app/pods/m-tag/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";function C(E,G){do{if(E===G)return!0;G=G.parentElement}while(G.parentElement);return!1}Object.defineProperty(g,"__esModule",{value:!0});class D extends q.Component{constructor(){super(),this.template=`
			<div class="dropdown {{"if" resultsVisible "open"}}"
                 {{"action" ("noexpand" "click")}}
                 {{"action" ("noexpand" "keydown" on="keydown")}}
                 {{"action" ("noexpand" "focusIn" on="focus" capture=true)}}
                 {{"action" ("noexpand" "focusOut" on="blur" capture=true)}}>
				<div class="form-control {{"if" focused "focus"}}">
					{{#each tags as |tag|}}
						<span class="badge">
							{{tag}}
							{{#if disabled}}
							{{else}}
								<span {{"action" ("noexpand" "remove" tag)}}>x</span>
							{{/if}}
						</span>
					{{/each}}
					<input-control value={{search}} disabled={{disabled}} placeholder={{placeholder}} changeAction={{"fn" inputChangeAction}} />
				</div>
				<ul class="dropdown-menu">
					{{#each results as |result|}}
						<li class={{"if" result.active "active"}} {{"action" ("noexpand" "highlight" result on="mouseenter")}} {{"action" ("noexpand" "add" result)}}>
							<a href="#" tabindex=-1 {{"action" ("noexpand" "add" result)}}>
								{{result.tag}}
							</a>
						</li>
					{{/each}}
				</ul>
			</div>
		`,this.tags=null,this.suggestions=null,this.search="",this.focused=!1,this.disabled=(0,B.computed)("subset","suggestions.@each",function(){return this.subset&&!this.suggestions.length}),this.placeholder=(0,B.computed)("subset","suggestions.@each",function(){return this.subset&&!this.suggestions.length?"There are no items":void 0}),this.results=(0,B.computed)("search","tags.@each","suggestions.@each",function(){const E=this.search,G=this.subset;if(!E&&!G)return B.A.create();const H=this.tags,I=new RegExp(E,"i");return B.A.create(this.suggestions.filter(J=>!~H.indexOf(J)).filter(J=>I.test(J)).map(J=>B.O.create({tag:J,active:!1})))}),this.resultsVisible=(0,B.computed)("results.@each","focused",function(){return this.results.length&&this.focused}),this.actions={click(){this.renderNode.children[0].elements[0].querySelector("input").focus()},focusIn(){this.focused=!0},focusOut(E){if(E.relatedTarget){const G=this.renderNode.children[0].elements[0];if(C(G,E.relatedTarget))return}this.focused=!1},add(E,G){this.add(E.tag),this.renderNode.children[0].elements[0].querySelector("input").focus(),this.search="",G.stopPropagation(),G.preventDefault()},remove(E,G){this.remove(E),G.stopPropagation(),G.preventDefault()},highlight(E){const G=this.results;if(G.length){const H=G.filter(I=>!0===I.active)[0];if(G.forEach(I=>I.active=!1),"number"==typeof E){let I=G.indexOf(H);I=(I+G.length+E)%G.length,G[I].active=!0}else E.active=!0}},keydown(E){const G=E;if(38===G.keyCode)this.actions.highlight.call(this,-1),G.stopPropagation(),G.preventDefault();else if(40===G.keyCode)this.actions.highlight.call(this,1),G.stopPropagation(),G.preventDefault();else if(13===G.keyCode||9===G.keyCode){this.tags;const H=this.results,I=this.search.trim();this.search="";const J=H.filter(K=>!0===K.active)[0];if(J)this.add(J.tag);else if(I.length)(!this.subset||H.filter(K=>K.tag===I)[0])&&this.add(I);else if(9===G.keyCode)return;G.stopPropagation(),G.preventDefault()}else if(8===G.keyCode){if(this.search.length)return;this.tags.length&&this.remove(this.tags[this.tags.length-1]),G.stopPropagation(),G.preventDefault()}}}}inputChangeAction(E){this.search=E,this.subset&&E&&!this.results.length&&(this.search=E.substr(0,E.length-1))}}g.default=D}),define("app/pods/notfound-route/component",["exports","voltage/component"],function(g,q){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class B extends q.RoutableComponent{constructor(){super(),this.template=`
        	<div class="alert alert-danger" role="alert">
				<strong>Error:</strong> This is not a valid marv route.
			</div>
			<link-to href="/">Go to overview</link-to>
        `}}g.default=B}),define("app/pods/routes/main",["exports"],function(g){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=[{name:"index",path:"",queryParams:{filter:{refreshModel:!0},debugfilters:{}}},{name:"detail",path:"/detail/:id"},{name:"notfound",path:"*wildcard"}]}),define("app/pods/widget-comment/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";function C(E,G){do{if(E===G)return!0;G=G.parentElement}while(G.parentElement);return!1}Object.defineProperty(g,"__esModule",{value:!0});class D extends q.Component{constructor(){super(),this.template=`
            <span class="dropdown {{"if" focused "open"}}">
                <span class="backdrop" {{"action" ("noexpand" "focusIn")}}></span>
                <button role="button" class="{{class}}" disabled={{fulldisabled}} {{"action" ("noexpand" "focusIn")}}>
                    comment <span class="caret"></span>
                </button>
                <ul class="dropdown-menu {{menuClass}} bulk-dropdown">
                    {{#if disabled}}
                        <li class="text-center">Sign in to comment</li>
                    {{else}}
                        <li>
                            <a role="button">
								<input-textarea class="form-control" rows=10 cols=80 placeholder="Comment" value={{comment}} changeAction={{"curry" ("noexpand" ("set" ("noexpand" comment)))}} />
                            </a>
                        </li>
                        <li role="separator" class="divider"></li>
                        <li class="text-right">
                            <a role="button">
                                <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "save")}}>Comment</button>
                            </a>
                        </li>
                    {{/if}}
                </ul>
            </span>
		`,this.comment="",this.focused=!1,this.actions={focusIn(E){console.log("in",E.target),this.focused=!this.focused},focusOut(E){if(console.log("out",E.target,E.relatedTarget),E.relatedTarget){const G=this.renderNode.children[0].elements[0];if(C(G,E.relatedTarget))return}this.focused=!1},save(){this.comment&&(this.changeAction(this.comment),this.comment="",this.focused=!1)}}}}g.default=D}),define("app/pods/widget-filter/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <div class="row">
                <div class="col-xs-2">Add new filter</div>
                <div class="col-xs-10">
                    <ul class="list-inline">
                        {{#each fields as |field|}}
                            <li>
                                <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "add" field)}} disabled={{field.active}}>{{field.title}}</button>
                            </li>
                        {{/each}}
                    </ul>
                </div>
            </div>

            <form class="form-horizontal" {{"action" ("noexpand" "applyFilter" on="submit")}}>
                {{#each fields as |field|}}
                    {{#if field.active}}
                    <div class="row form-group form-group-sm {{"if" field.entry.error "has-error"}}">
                        <label class="col-xs-2 control-label">
                            {{field.title}}
                        </label>
                        {{#if ("is-greater" field.operators.length 1)}}
                            <div class="col-xs-2">
                                <m-select options={{field.operators}}
                                          selected={{field.entry.op}}
                                          changeAction={{"curry" ("noexpand" ("set" ("noexpand" field.entry.op)))}}
                                          disabled={{"if" ("is-greater" field.operators.length 1) undefined true}}
                                />
                            </div>
                            <div class="col-xs-7">
                                <delegate-component component="field-{{field.value_type}}"
                                                    value={{field.entry.val}}
                                                    constraints={{field.constraints}}
                                                    changeAction={{"curry" ("noexpand" ("set" ("noexpand" field.entry.val)))}}
                                                    changeErrorAction={{"curry" ("noexpand" ("set" ("noexpand" field.entry.error)))}} />
                                {{#if field.entry.error}}
                                    <span class="help-block">{{field.entry.error}}</span>
                                {{/if}}
                            </div>
                        {{else}}
                            <div class="col-xs-9">
                                <delegate-component component="field-{{field.value_type}}"
                                                    value={{field.entry.val}}
                                                    constraints={{field.constraints}}
                                                    changeAction={{"curry" ("noexpand" ("set" ("noexpand" field.entry.val)))}}
                                                    changeErrorAction={{"curry" ("noexpand" ("set" ("noexpand" field.entry.error)))}} />
                                {{#if field.entry.error}}
                                    <span class="help-block">{{field.entry.error}}</span>
                                {{/if}}
                            </div>
                        {{/if}}
                        <div class="col-xs-1">
                            <button class="btn btn-default btn-sm" type="button" {{"action" ("noexpand" "remove" field)}}>
                                <span class="glyphicon glyphicon-remove"></span>
                            </button>
                        </div>
                    </div>
                    {{/if}}
                {{/each}}

                <div class="filter-controls row">
                    {{#if bagbunker_index.debugfilters}}
                        <h4>Filter Debug</h4>
                        <pre>{{bagbunker_index.filterJSON}}</pre>
                        <pre>{{bagbunker_index.filterBase}}</pre>
                    {{/if}}

                    <div class="col-xs-9 col-xs-offset-2 text-right">
                        <button type="button"
                                class="btn btn-default btn-sm"
                                disabled={{"is-equal" bagbunker_index.filterBase ""}}
                                {{"action" ("noexpand" "resetFilters")}}>reset filters</button>
                        <button type="submit"
                                class="btn btn-primary btn-sm"
                                disabled={{"is-equal" bagbunker_index.filterFixed bagbunker_index.filterBase}}>apply filter</button>
                    </div>
                </div>
            </form>
        `,this.fields=(0,B.computed)("model","bagbunker_index.filterObj",function(){const D=this.bagbunker_index.filterObj,E=this.model.filters;return E.map((G,H)=>{const I=D[G.key]||(D[G.key]=B.O.create({}));return I.op=I.op||G.operators[0],I.val=I.val||("subset"===G.value_type?B.A.create():""),I.error=null,B.O.create({key:G.key,title:G.title,operators:G.operators,value_type:G.value_type,constraints:B.A.create(G.constraints),active:0===H||!!I.val.length,entry:I})})}),this.actions={add(D){D.active=!0},remove(D){D.active=!1,D.entry.val=D.entry.val instanceof B.A?B.A.create():""},applyFilter(D){this.bagbunker_index.actions.applyFilter.apply(this.bagbunker_index,[D]),D.preventDefault()},resetFilters(){for(let D in this.bagbunker_index.filterObj){const E=this.bagbunker_index.filterObj[D];E.val=E.val.slice(0,0)}}}}init(){super.init(),this.bagbunker_index=this.getOwner().lookup("index-route")}}g.default=C}),define("app/pods/widget-gallery/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            {{#if showTitle}}
                <h4 class="text-center">Image {{("increment" index)}} of {{model.images.length}} <small>{{image.alt}}</small></h4>
            {{/if}}
            <div class="row">
                <div class="{{("if" hasBlock "col-xs-9" "col-xs-12")}}">
                    <div class="carousel">
                        <div class="carousel-inner" role="listbox">
                            {{#each model.images as |image i|}}
                                <div class="item {{("if" ("is-equal" i index) "active")}}">
                                    <img class="img-responsive center-block" src={{image.src}} alt={{image.alt}}>
                                </div>
                            {{/each}}
                        </div>
                        <a class="left carousel-control" {{"action" ("noexpand" "setIndex" "-1")}}>
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" {{"action" ("noexpand" "setIndex" "+1")}}>
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                {{#if hasBlock}}<div class="col-xs-3"><yield-block /></div>{{/if}}
            </div>
            <ul class="image-stripe">
                {{#each model.images as |image i|}}
                    <li>
                        <div class="img-thumbnail-wrapper {{"if" ("is-equal" i index) "active"}}" {{"action" ("noexpand" "setIndex" i)}}>
                            <img src={{image.src}} alt={{image.alt}}>
                        </div>
                    </li>
                {{/each}}
            </ul>
        `,this.index=0,this.image=(0,B.computed)("index",function(){return this.model.images[this.index]}),this.actions={setIndex(C){"-1"===C?0<this.index&&this.index--:"+1"===C?this.index<this.model.images.length-1&&this.index++:this.index=C}}}}}),define("app/pods/widget-image/component",["exports","voltage/component"],function(g,q){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.tagName="img",this.attributeBindings=["class","src:model.image.src","alt:model.image.alt","width:model.image.width"],this.class="img-responsive widget-img",this.template=null}}}),define("app/pods/widget-keyval/component",["exports","voltage/component"],function(g,q){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            <!--
            <table class="table">
                <thead>
                    <tr>
                        {{#each model.items as |row index|}}
                            <th>{{row.title}}</th>
                        {{/each}}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {{#each model.items as |row index|}}
                            <td>
                                {{#if row.list}}
                                    {{#each row.value as |val|}}
                                        {{(("concat" "format-" row.formatter) val)}}
                                    {{/each}}
                                {{else}}
                                    {{(("concat" "format-" row.formatter) row.value)}}
                                {{/if}}
                            </td>
                        {{/each}}
                    </tr>
                </tbody>
            </table>
            -->
            <ul class="list-inline">
                {{#each model.items as |row index|}}
                    <li>
                        <div class="value">
                            {{#if row.list}}
                                {{#each row.value as |val|}}
                                    {{(("concat" "format-" row.formatter) val)}}
                                {{/each}}
                            {{else}}
                                {{(("concat" "format-" row.formatter) row.value)}}
                            {{/if}}
                        </div>
                        <div class="uint">
                            {{row.title}}
                        </div>
                    </li>
                {{/each}}
            </ul>
        `}}}),define("app/pods/widget-modal/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0});class C extends q.Component{constructor(){super(),this.template=`
            <div class="modal fade {{"if" open "in"}} {{class}}" style={{"if" open "display:block;"}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    {{"action" ("noexpand" "close")}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body">
                            <yield-block params={{"body"}} />
                        </div>
                        <div class="modal-footer">
                            <yield-block params={{"footer"}} />
                            <!--
                            <button type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                    {{"action" ("noexpand" "close")}}>
                                Close
                            </button>
                            -->
                        </div>
                    </div>
                </div>
            </div>
        `,this.actions={close(){this.setOpen(!1)}}}}g.default=C}),define("app/pods/widget-osm/component",["exports","voltage/component","voltage/observable","leaflet"],function(g,q,B,C){"use strict";Object.defineProperty(g,"__esModule",{value:!0});var D=function(G){return G&&G.__esModule?G:{default:G}}(C);D.default.Icon.Default.imagePath="/bower_components/leaflet/dist/images",g.default=class extends q.Component{constructor(){super(),this.template=`
            <div class="map {{modelObserve}}"></div>
        `,this.modelObserve=(0,B.computed)("model",function(){if(this.inDom){const E=this.trajectories;if(E){E.clearLayers(),E.addData(this.model.geoJSON||[]);const G=E.getBounds();return G.isValid()&&this.map.fitBounds(G,{padding:[100,100]}),""}}})}didInsertElement(){this.inDom=!0;const E=D.default.tileLayer(`${window.location.protocol}//{s}.osm.ternaris.com/mapbox-studio-osm-bright/{z}/{x}/{y}${D.default.Browser.retina?"@2x":""}.png`,{attribution:"\xA9 <a href=\"https://www.mapbox.com/map-feedback/\">Mapbox</a> \xA9 <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",maxZoom:22}),G=D.default.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"\xA9 <a href=\"http://www.esri.com/\">Esri</a> i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",maxZoom:22}),H=D.default.geoJson([],{style(N){return N.properties.style||{}}}),I=this.renderNode.children[0].elements[0].querySelector(".map"),J=D.default.map(I,{layers:[E,H],zoom:18,minZoom:0,maxZoom:22,maxBounds:D.default.LatLngBounds(D.default.latLng([75,-180]),D.default.latLng([-75,180]))});D.default.control.layers({Roadmap:E,Satellite:G},{Trajectories:H}).addTo(J),this.map=J,this.trajectories=H,H.addData(this.model.geoJSON||[]);const K=H.getBounds();K.isValid()&&this.map.fitBounds(K,{padding:[100,100]})}}}),define("app/pods/widget-table/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";Object.defineProperty(g,"__esModule",{value:!0}),g.default=class extends q.Component{constructor(){super(),this.template=`
            {{#if sorted.length}}
                {{#if selectable}}
                    <label style="padding-left: 8px">
                    <input-checkbox value={{allChecked}} changeAction={{"fn" toggleAll}} />
                    All
                    </label>
                {{/if}}
                <yield-block params={{selected}} />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            {{#if selectable}}<th></th>{{/if}}
                            {{#each omodel.columns as |col index|}}
                                <th class="interactive text-{{col.align}}" {{"action" ("noexpand" "sort" index)}}>
                                    {{col.title}}
                                    {{#if ("is-equal" index sort)}}
                                        <span class="glyphicon glyphicon-sort-by-attributes{{"if" descending "-alt" ""}}"></span>
                                    {{/if}}
                                </th>
                            {{/each}}
                        </tr>
                    </thead>
                    <tbody>
                        {{#each paginated as |row|}}
                            <tr>
                                {{#if selectable}}
                                    <td>
                                        <input-checkbox value={{row.selected}} changeAction={{"curry" ("noexpand" ("set" ("noexpand" row.selected)))}} />
                                    </td>
                                {{/if}}
                                {{#each row.columns as |col|}}
                                    <td class="text-{{col.align}}">
                                        {{#if col.list}}
                                            {{#each col.value as |val|}}
                                                {{(("concat" "format-" col.formatter) val)}}
                                            {{/each}}
                                        {{else}}
                                            {{(("concat" "format-" col.formatter) col.value)}}
                                        {{/if}}
                                    </td>
                                {{/each}}
                            </tr>
                        {{/each}}
                    </tbody>
                </table>
                {{#if ("not" ("is-equal" numPages 1))}}
                    <nav class="text-center">
                        <ul class="pagination pagination-sm">
                            <li class="{{"if" pager.prev.disabled "disabled"}}">
                                <a role="button" aria-label="Previous" {{"action" ("noexpand" "prevPage")}}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {{#each pager.pages as |page|}}
                                <li class="{{"if" page.active "active"}} {{"if" page.disabled "disabled"}}"><a role="button" {{"action" ("noexpand" "page" page.num)}}>{{page.num}}</a></li>
                            {{/each}}
                            <li class="{{"if" pager.next.disabled "disabled"}}">
                                <a role="button" aria-label="Next" {{"action" ("noexpand" "nextPage")}}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                {{/if}}
            {{/if}}
        `,this.actions={prevPage(){0<this.page&&this.page--},nextPage(){this.page<this.numPages-1&&this.page++},page(C){"..."===C||(this.page=C-1)},sort(C){var D=this.sort;D===C?this.descending=!this.descending:(this.descending=!0,this.sort=C)}},this.omodel=(0,B.computed)("model",function(){this.model.rows.forEach(D=>{D.columns=D.values.map((E,G)=>{const H={value:E};return Object.assign(H,this.model.columns[G]),H})});const C=B.O.create(this.model);return C.rows=B.A.create(C.rows.map(D=>B.O.create(D))),C}),this.sort=(0,B.computed)("omodel.sort",function(){return this.omodel.sort}),this.descending=(0,B.computed)("omodel.sort_descending",function(){return this.omodel.sort_descending}),this.sorted=(0,B.computed)("sort","descending","omodel.rows",function(){console.time("sorted");const C=this.omodel.rows,D=this.sort,E=this.descending;if(null===D||!C.length)return C;if(!("sort"in C[0].columns[D])){let H;if(this.model.columns[D].sort_key){const I=this.model.columns[D].sort_key;H=J=>null===J?"":J[I]}else H=this.model.columns[D].list?I=>null===I?"":I.length:I=>null===I?"":I;C.forEach(I=>{I.columns[D].sort=H(I.columns[D].value)})}const G=C.sort((H,I)=>{return H=H.columns[D].sort,I=I.columns[D].sort,H===I?0:E?2*(H<I)-1:2*(H>=I)-1});return console.timeEnd("sorted"),G}),this.page=0,this.pagesizes=[50,100],this.pagesize=50,this.numPages=(0,B.computed)("sorted","pagesize",function(){return this.pagesize?Math.ceil(this.sorted.length/this.pagesize):1}),this.paginated=(0,B.computed)("sorted","page","pagesize",function(){const C=this.page,D=this.pagesize;return-1===D?this.sorted:this.sorted.slice(C*D,(C+1)*D)}),this.selected=B.A.create(),this.allChecked=(0,B.computed)("omodel.rows.@each.selected",function(){return this.selected.splice.apply(this.selected,[0,this.selected.length].concat(this.omodel.rows.filter(C=>C.selected))),this.omodel.rows.filter(C=>C.selected).length===this.omodel.rows.length}),this.pagersize=7,this.pager=(0,B.computed)("page","pagesize","sorted",function(){if(this.sorted.length<this.pagesize)return[];const C={prev:{disabled:0===this.page,page:this.page-1},next:{disabled:this.page===this.numPages-1,page:this.page+1},pages:[]};for(let D=0,E=this.numPages;D<E;D++)C.pages.push({num:D+1,active:D===this.page});if(C.pages.length>this.pagersize){const D={num:"...",disabled:!0},E=this.pagersize-1,G=E>>1,H=(E>>1)+(1&E);this.page<=G?C.pages.splice(E-1,C.pages.length-E,D):this.page>=C.pages.length-1-H?C.pages.splice(1,C.pages.length-E,D):(C.pages.splice(this.page+H-1,C.pages.length-1-(this.page+H-1),D),C.pages.splice(1,this.page-(G-1),D))}return C})}toggleAll(){this.allChecked?this.omodel.rows.forEach(C=>C.selected=!1):this.omodel.rows.forEach(C=>C.selected=!0)}}}),define("app/pods/widget-tag/component",["exports","voltage/component","voltage/observable"],function(g,q,B){"use strict";function C(E,G){do{if(E===G)return!0;G=G.parentElement}while(G.parentElement);return!1}Object.defineProperty(g,"__esModule",{value:!0});class D extends q.Component{constructor(){super(),this.template=`
            <span class="dropdown {{"if" focused "open"}}"
                        {{"action" ("noexpand" "keydown" on="keydown")}}
                        {{"action" ("noexpand" "focusIn" on="focusinX")}}
                        {{"action" ("noexpand" "focusOut" on="focusoutX")}}>
                <span class="backdrop" {{"action" ("noexpand" "focusIn")}}></span>
                <button role="button" class="{{class}}" disabled={{fulldisabled}} {{"action" ("noexpand" "focusIn")}}>
                    tag <span class="caret"></span>
                </button>
                <ul class="dropdown-menu {{menuClass}} bulk-dropdown">
                    {{#if disabled}}
                        <li class="text-center">Sign in to tag</li>
                    {{else}}
                        <li>
                            <a role="button">
                                <input-control type="text" class="form-control input-sm" placeholder="Label" value={{search}} changeAction={{"curry" ("noexpand" ("set" ("noexpand" search)))}} />
                            </a>
                        </li>
						<!--
                        <li class="dropdown-header">Tags</li>
						-->
                        {{#each results as |tag|}}
                            <li class="xtag">
                                <a role="button" {{"action" ("noexpand" "toggle" tag)}} title={{tag.hint}} tabindex=-1>
                                    <span class="glyphicon glyphicon-{{tag.state}}"></span>
                                    {{tag.name}}
                                </a>
                            </li>
                        {{/each}}
                        <li role="separator" class="divider"></li>
                        <li class="text-right">
                            <a role="button">
                                <button class="btn btn-default btn-xs" type="button" {{"action" ("noexpand" "save")}}>Save tags</button>
                            </a>
                        </li>
                    {{/if}}
                </ul>
            </span>
		`,this.tags=null,this.alltags=null,this.search="",this.realtags=(0,B.computed)("focused",function(){if(!this.tags.length)return B.A.create();if("string"==typeof this.tags[0])return B.A.create(this.tags);let E=this.tags[0].tags.slice();return this.tags.forEach(G=>{E=E.filter(H=>~G.tags.indexOf(H))}),B.A.create(E)}),this.mtags=(0,B.computed)("realtags",function(){return B.A.create(this.realtags)}),this.malltags=(0,B.computed)("focused",function(){return B.A.create(this.alltags)}),this.vtags=(0,B.computed)("mtags.@each","malltags.@each",function(){return B.A.create(this.realtags.map(E=>{return B.O.create({name:E,state:~this.mtags.indexOf(E)?"check":"unchecked"})}).concat(this.malltags.filter(E=>!~this.realtags.indexOf(E)).map(E=>{return B.O.create({name:E,state:~this.mtags.indexOf(E)?"check":"unchecked"})})))}),this.results=(0,B.computed)("search","vtags.@each",function(){const E=this.search,G=new RegExp(E,"i"),H=B.A.create(this.vtags.filter(I=>G.test(I.name)));return E&&!H.filter(I=>I.name===E).length&&H.push(B.O.create({name:`create "${E}"`,action:"create",label:this.search})),H}),this.focused=!1,this.actions={focusIn(E){console.log("in",E.target),this.focused=!this.focused},focusOut(E){if(console.log("out",E.target,E.relatedTarget),E.relatedTarget){const G=this.renderNode.children[0].elements[0];if(C(G,E.relatedTarget))return}this.focused=!1},toggle(E){"create"===E.action?(this.mtags.push(this.search),!~this.malltags.indexOf(this.search)&&this.malltags.push(this.search),this.search=""):~this.mtags.indexOf(E.name)?this.mtags.splice(this.mtags.indexOf(E.name),1):this.mtags.push(E.name)},keydown(E){const G=E;13===G.keyCode&&(~this.malltags.indexOf(this.search)?~this.mtags.indexOf(this.search)?this.mtags.splice(this.mtags.indexOf(this.search),1):this.mtags.push(this.search):(this.malltags.push(this.search),this.mtags.push(this.search)),this.search="",G.stopPropagation(),G.preventDefault())},save(){const E=this.mtags.filter(H=>!~this.realtags.indexOf(H)),G=this.realtags.filter(H=>!~this.mtags.indexOf(H));this.changeAction({added:E,removed:G}),this.focused=!1}}}}g.default=D}),define("leaflet",["module","exports"],function(g,q){"use strict";function B(){var I=window.L;C.noConflict=function(){return window.L=I,this},window.L=C}Object.defineProperty(q,"__esModule",{value:!0});var C={version:"1.0.0"};"object"==typeof g&&"object"==typeof g.exports?g.exports=C:"function"==typeof define&&define.amd&&define(C),"undefined"!=typeof window&&B(),C.Util={extend:function(I){var J,K,N,P;for(K=1,N=arguments.length;K<N;K++)for(J in P=arguments[K],P)I[J]=P[J];return I},create:Object.create||function(){function I(){}return function(J){return I.prototype=J,new I}}(),bind:function(I,J){var K=Array.prototype.slice;if(I.bind)return I.bind.apply(I,K.call(arguments,1));var N=K.call(arguments,2);return function(){return I.apply(J,N.length?N.concat(K.call(arguments)):arguments)}},stamp:function(I){return I._leaflet_id=I._leaflet_id||++C.Util.lastId,I._leaflet_id},lastId:0,throttle:function(I,J,K){var N,P,Q,R;return R=function(){N=!1,P&&(Q.apply(K,P),P=!1)},Q=function(){N?P=arguments:(I.apply(K,arguments),setTimeout(R,J),N=!0)},Q},wrapNum:function(I,J,K){var N=J[1],P=J[0],Q=N-P;return I===N&&K?I:((I-P)%Q+Q)%Q+P},falseFn:function(){return!1},formatNum:function(I,J){var K=Math.pow(10,J||5);return Math.round(I*K)/K},trim:function(I){return I.trim?I.trim():I.replace(/^\s+|\s+$/g,"")},splitWords:function(I){return C.Util.trim(I).split(/\s+/)},setOptions:function(I,J){for(var K in I.hasOwnProperty("options")||(I.options=I.options?C.Util.create(I.options):{}),J)I.options[K]=J[K];return I.options},getParamString:function(I,J,K){var N=[];for(var P in I)N.push(encodeURIComponent(K?P.toUpperCase():P)+"="+encodeURIComponent(I[P]));return(J&&-1!==J.indexOf("?")?"&":"?")+N.join("&")},template:function(I,J){return I.replace(C.Util.templateRe,function(K,N){var P=J[N];if(P===void 0)throw new Error("No value provided for variable "+K);else"function"==typeof P&&(P=P(J));return P})},templateRe:/\{ *([\w_\-]+) *\}/g,isArray:Array.isArray||function(I){return"[object Array]"===Object.prototype.toString.call(I)},indexOf:function(I,J){for(var K=0;K<I.length;K++)if(I[K]===J)return K;return-1},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function I(Q){return window["webkit"+Q]||window["moz"+Q]||window["ms"+Q]}function J(Q){var R=+new Date,T=Math.max(0,16-(R-K));return K=R+T,window.setTimeout(Q,T)}var K=0,N=window.requestAnimationFrame||I("RequestAnimationFrame")||J,P=window.cancelAnimationFrame||I("CancelAnimationFrame")||I("CancelRequestAnimationFrame")||function(Q){window.clearTimeout(Q)};C.Util.requestAnimFrame=function(Q,R,T){return T&&N===J?void Q.call(R):N.call(window,C.bind(Q,R))},C.Util.cancelAnimFrame=function(Q){Q&&P.call(window,Q)}}(),C.extend=C.Util.extend,C.bind=C.Util.bind,C.stamp=C.Util.stamp,C.setOptions=C.Util.setOptions,C.Class=function(){},C.Class.extend=function(I){var J=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},K=J.__super__=this.prototype,N=C.Util.create(K);for(var P in N.constructor=J,J.prototype=N,this)this.hasOwnProperty(P)&&"prototype"!==P&&(J[P]=this[P]);return I.statics&&(C.extend(J,I.statics),delete I.statics),I.includes&&(C.Util.extend.apply(null,[N].concat(I.includes)),delete I.includes),N.options&&(I.options=C.Util.extend(C.Util.create(N.options),I.options)),C.extend(N,I),N._initHooks=[],N.callInitHooks=function(){if(!this._initHooksCalled){K.callInitHooks&&K.callInitHooks.call(this),this._initHooksCalled=!0;for(var Q=0,R=N._initHooks.length;Q<R;Q++)N._initHooks[Q].call(this)}},J},C.Class.include=function(I){return C.extend(this.prototype,I),this},C.Class.mergeOptions=function(I){return C.extend(this.prototype.options,I),this},C.Class.addInitHook=function(I){var J=Array.prototype.slice.call(arguments,1),K="function"==typeof I?I:function(){this[I].apply(this,J)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(K),this},C.Evented=C.Class.extend({on:function(I,J,K){if("object"==typeof I)for(var N in I)this._on(N,I[N],J);else{I=C.Util.splitWords(I);for(var P=0,Q=I.length;P<Q;P++)this._on(I[P],J,K)}return this},off:function(I,J,K){if(!I)delete this._events;else if("object"==typeof I)for(var N in I)this._off(N,I[N],J);else{I=C.Util.splitWords(I);for(var P=0,Q=I.length;P<Q;P++)this._off(I[P],J,K)}return this},_on:function(I,J,K){this._events=this._events||{};var N=this._events[I];N||(N=[],this._events[I]=N),K===this&&(K=void 0);var P={fn:J,ctx:K},Q=N;for(var R=0,T=Q.length;R<T;R++)if(Q[R].fn===J&&Q[R].ctx===K)return;Q.push(P),N.count++},_off:function(I,J,K){var N,P,Q;if(this._events&&(N=this._events[I],!!N)){if(!J){for(P=0,Q=N.length;P<Q;P++)N[P].fn=C.Util.falseFn;return void delete this._events[I]}if(K===this&&(K=void 0),N)for(P=0,Q=N.length;P<Q;P++){var R=N[P];R.ctx===K&&R.fn===J&&(R.fn=C.Util.falseFn,this._firingCount&&(this._events[I]=N=N.slice()),N.splice(P,1))}}},fire:function(I,J,K){if(!this.listens(I,K))return this;var N=C.Util.extend({},J,{type:I,target:this});if(this._events){var P=this._events[I];if(P){this._firingCount=this._firingCount+1||1;for(var Q=0,R=P.length;Q<R;Q++){var T=P[Q];T.fn.call(T.ctx||this,N)}this._firingCount--}}return K&&this._propagateEvent(N),this},listens:function(I,J){var K=this._events&&this._events[I];if(K&&K.length)return!0;if(J)for(var N in this._eventParents)if(this._eventParents[N].listens(I,J))return!0;return!1},once:function(I,J,K){if("object"==typeof I){for(var N in I)this.once(N,I[N],J);return this}var P=C.bind(function(){this.off(I,J,K).off(I,P,K)},this);return this.on(I,J,K).on(I,P,K)},addEventParent:function(I){return this._eventParents=this._eventParents||{},this._eventParents[C.stamp(I)]=I,this},removeEventParent:function(I){return this._eventParents&&delete this._eventParents[C.stamp(I)],this},_propagateEvent:function(I){for(var J in this._eventParents)this._eventParents[J].fire(I.type,C.extend({layer:I.target},I),!0)}});var D=C.Evented.prototype;D.addEventListener=D.on,D.removeEventListener=D.clearAllEventListeners=D.off,D.addOneTimeEventListener=D.once,D.fireEvent=D.fire,D.hasEventListeners=D.listens,C.Mixin={Events:D},function(){var I=navigator.userAgent.toLowerCase(),J=document.documentElement,K="ActiveXObject"in window,N=-1!==I.indexOf("webkit"),P=-1!==I.indexOf("phantom"),Q=-1!==I.search("android [23]"),R=-1!==I.indexOf("chrome"),T=-1!==I.indexOf("gecko")&&!N&&!window.opera&&!K,U=0===navigator.platform.indexOf("Win"),V="undefined"!=typeof orientation||-1!==I.indexOf("mobile"),W=!window.PointerEvent&&window.MSPointerEvent,X=window.PointerEvent||W,Y=K&&"transition"in J.style,Z="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Q,$="MozPerspective"in J.style,_="OTransition"in J.style,aa=!window.L_NO_TOUCH&&(X||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch);C.Browser={ie:K,ielt9:K&&!document.addEventListener,edge:"msLaunchUri"in navigator&&!("documentMode"in document),webkit:N,gecko:T,android:-1!==I.indexOf("android"),android23:Q,chrome:R,safari:!R&&-1!==I.indexOf("safari"),win:U,ie3d:Y,webkit3d:Z,gecko3d:$,opera12:_,any3d:!window.L_DISABLE_3D&&(Y||Z||$)&&!_&&!P,mobile:V,mobileWebkit:V&&N,mobileWebkit3d:V&&Z,mobileOpera:V&&window.opera,mobileGecko:V&&T,touch:!!aa,msPointer:!!W,pointer:!!X,retina:1<(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)}}(),C.Point=function(I,J,K){this.x=K?Math.round(I):I,this.y=K?Math.round(J):J},C.Point.prototype={clone:function(){return new C.Point(this.x,this.y)},add:function(I){return this.clone()._add(C.point(I))},_add:function(I){return this.x+=I.x,this.y+=I.y,this},subtract:function(I){return this.clone()._subtract(C.point(I))},_subtract:function(I){return this.x-=I.x,this.y-=I.y,this},divideBy:function(I){return this.clone()._divideBy(I)},_divideBy:function(I){return this.x/=I,this.y/=I,this},multiplyBy:function(I){return this.clone()._multiplyBy(I)},_multiplyBy:function(I){return this.x*=I,this.y*=I,this},scaleBy:function(I){return new C.Point(this.x*I.x,this.y*I.y)},unscaleBy:function(I){return new C.Point(this.x/I.x,this.y/I.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},distanceTo:function(I){I=C.point(I);var J=I.x-this.x,K=I.y-this.y;return Math.sqrt(J*J+K*K)},equals:function(I){return I=C.point(I),I.x===this.x&&I.y===this.y},contains:function(I){return I=C.point(I),Math.abs(I.x)<=Math.abs(this.x)&&Math.abs(I.y)<=Math.abs(this.y)},toString:function(){return"Point("+C.Util.formatNum(this.x)+", "+C.Util.formatNum(this.y)+")"}},C.point=function(I,J,K){return I instanceof C.Point?I:C.Util.isArray(I)?new C.Point(I[0],I[1]):void 0===I||null===I?I:"object"==typeof I&&"x"in I&&"y"in I?new C.Point(I.x,I.y):new C.Point(I,J,K)},C.Bounds=function(I,J){if(I){var K=J?[I,J]:I;for(var N=0,P=K.length;N<P;N++)this.extend(K[N])}},C.Bounds.prototype={extend:function(I){return I=C.point(I),this.min||this.max?(this.min.x=Math.min(I.x,this.min.x),this.max.x=Math.max(I.x,this.max.x),this.min.y=Math.min(I.y,this.min.y),this.max.y=Math.max(I.y,this.max.y)):(this.min=I.clone(),this.max=I.clone()),this},getCenter:function(I){return new C.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,I)},getBottomLeft:function(){return new C.Point(this.min.x,this.max.y)},getTopRight:function(){return new C.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(I){var J,K;return I="number"==typeof I[0]||I instanceof C.Point?C.point(I):C.bounds(I),I instanceof C.Bounds?(J=I.min,K=I.max):J=K=I,J.x>=this.min.x&&K.x<=this.max.x&&J.y>=this.min.y&&K.y<=this.max.y},intersects:function(I){I=C.bounds(I);var J=this.min,K=this.max,N=I.min,P=I.max,Q=P.x>=J.x&&N.x<=K.x,R=P.y>=J.y&&N.y<=K.y;return Q&&R},overlaps:function(I){I=C.bounds(I);var J=this.min,K=this.max,N=I.min,P=I.max,Q=P.x>J.x&&N.x<K.x,R=P.y>J.y&&N.y<K.y;return Q&&R},isValid:function(){return!!(this.min&&this.max)}},C.bounds=function(I,J){return!I||I instanceof C.Bounds?I:new C.Bounds(I,J)},C.Transformation=function(I,J,K,N){this._a=I,this._b=J,this._c=K,this._d=N},C.Transformation.prototype={transform:function(I,J){return this._transform(I.clone(),J)},_transform:function(I,J){return J=J||1,I.x=J*(this._a*I.x+this._b),I.y=J*(this._c*I.y+this._d),I},untransform:function(I,J){return J=J||1,new C.Point((I.x/J-this._b)/this._a,(I.y/J-this._d)/this._c)}},C.DomUtil={get:function(I){return"string"==typeof I?document.getElementById(I):I},getStyle:function(I,J){var K=I.style[J]||I.currentStyle&&I.currentStyle[J];if((!K||"auto"===K)&&document.defaultView){var N=document.defaultView.getComputedStyle(I,null);K=N?N[J]:null}return"auto"===K?null:K},create:function(I,J,K){var N=document.createElement(I);return N.className=J,K&&K.appendChild(N),N},remove:function(I){var J=I.parentNode;J&&J.removeChild(I)},empty:function(I){for(;I.firstChild;)I.removeChild(I.firstChild)},toFront:function(I){I.parentNode.appendChild(I)},toBack:function(I){var J=I.parentNode;J.insertBefore(I,J.firstChild)},hasClass:function(I,J){if(I.classList!==void 0)return I.classList.contains(J);var K=C.DomUtil.getClass(I);return 0<K.length&&new RegExp("(^|\\s)"+J+"(\\s|$)").test(K)},addClass:function(I,J){if(I.classList!==void 0){var K=C.Util.splitWords(J);for(var N=0,P=K.length;N<P;N++)I.classList.add(K[N])}else if(!C.DomUtil.hasClass(I,J)){var Q=C.DomUtil.getClass(I);C.DomUtil.setClass(I,(Q?Q+" ":"")+J)}},removeClass:function(I,J){I.classList===void 0?C.DomUtil.setClass(I,C.Util.trim((" "+C.DomUtil.getClass(I)+" ").replace(" "+J+" "," "))):I.classList.remove(J)},setClass:function(I,J){I.className.baseVal===void 0?I.className=J:I.className.baseVal=J},getClass:function(I){return I.className.baseVal===void 0?I.className:I.className.baseVal},setOpacity:function(I,J){"opacity"in I.style?I.style.opacity=J:"filter"in I.style&&C.DomUtil._setOpacityIE(I,J)},_setOpacityIE:function(I,J){var K=!1,N="DXImageTransform.Microsoft.Alpha";try{K=I.filters.item(N)}catch(P){if(1===J)return}J=Math.round(100*J),K?(K.Enabled=100!==J,K.Opacity=J):I.style.filter+=" progid:"+N+"(opacity="+J+")"},testProp:function(I){var J=document.documentElement.style;for(var K=0;K<I.length;K++)if(I[K]in J)return I[K];return!1},setTransform:function(I,J,K){var N=J||new C.Point(0,0);I.style[C.DomUtil.TRANSFORM]=(C.Browser.ie3d?"translate("+N.x+"px,"+N.y+"px)":"translate3d("+N.x+"px,"+N.y+"px,0)")+(K?" scale("+K+")":"")},setPosition:function(I,J){I._leaflet_pos=J,C.Browser.any3d?C.DomUtil.setTransform(I,J):(I.style.left=J.x+"px",I.style.top=J.y+"px")},getPosition:function(I){return I._leaflet_pos||new C.Point(0,0)}},function(){C.DomUtil.TRANSFORM=C.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]);var I=C.DomUtil.TRANSITION=C.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]);if(C.DomUtil.TRANSITION_END="webkitTransition"===I||"OTransition"===I?I+"End":"transitionend","onselectstart"in document)C.DomUtil.disableTextSelection=function(){C.DomEvent.on(window,"selectstart",C.DomEvent.preventDefault)},C.DomUtil.enableTextSelection=function(){C.DomEvent.off(window,"selectstart",C.DomEvent.preventDefault)};else{var J=C.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);C.DomUtil.disableTextSelection=function(){if(J){var K=document.documentElement.style;this._userSelect=K[J],K[J]="none"}},C.DomUtil.enableTextSelection=function(){J&&(document.documentElement.style[J]=this._userSelect,delete this._userSelect)}}C.DomUtil.disableImageDrag=function(){C.DomEvent.on(window,"dragstart",C.DomEvent.preventDefault)},C.DomUtil.enableImageDrag=function(){C.DomEvent.off(window,"dragstart",C.DomEvent.preventDefault)},C.DomUtil.preventOutline=function(K){for(;-1===K.tabIndex;)K=K.parentNode;K&&K.style&&(C.DomUtil.restoreOutline(),this._outlineElement=K,this._outlineStyle=K.style.outline,K.style.outline="none",C.DomEvent.on(window,"keydown",C.DomUtil.restoreOutline,this))},C.DomUtil.restoreOutline=function(){this._outlineElement&&(this._outlineElement.style.outline=this._outlineStyle,delete this._outlineElement,delete this._outlineStyle,C.DomEvent.off(window,"keydown",C.DomUtil.restoreOutline,this))}}(),C.LatLng=function(I,J,K){if(isNaN(I)||isNaN(J))throw new Error("Invalid LatLng object: ("+I+", "+J+")");this.lat=+I,this.lng=+J,K!==void 0&&(this.alt=+K)},C.LatLng.prototype={equals:function(I,J){if(!I)return!1;I=C.latLng(I);var K=Math.max(Math.abs(this.lat-I.lat),Math.abs(this.lng-I.lng));return K<=(J===void 0?1e-9:J)},toString:function(I){return"LatLng("+C.Util.formatNum(this.lat,I)+", "+C.Util.formatNum(this.lng,I)+")"},distanceTo:function(I){return C.CRS.Earth.distance(this,C.latLng(I))},wrap:function(){return C.CRS.Earth.wrapLatLng(this)},toBounds:function(I){var J=180*I/40075017,K=J/Math.cos(Math.PI/180*this.lat);return C.latLngBounds([this.lat-J,this.lng-K],[this.lat+J,this.lng+K])},clone:function(){return new C.LatLng(this.lat,this.lng,this.alt)}},C.latLng=function(I,J,K){return I instanceof C.LatLng?I:C.Util.isArray(I)&&"object"!=typeof I[0]?3===I.length?new C.LatLng(I[0],I[1],I[2]):2===I.length?new C.LatLng(I[0],I[1]):null:void 0===I||null===I?I:"object"==typeof I&&"lat"in I?new C.LatLng(I.lat,"lng"in I?I.lng:I.lon,I.alt):void 0===J?null:new C.LatLng(I,J,K)},C.LatLngBounds=function(I,J){if(I){var K=J?[I,J]:I;for(var N=0,P=K.length;N<P;N++)this.extend(K[N])}},C.LatLngBounds.prototype={extend:function(I){var N,P,J=this._southWest,K=this._northEast;if(I instanceof C.LatLng)N=I,P=I;else{if(!(I instanceof C.LatLngBounds))return I?this.extend(C.latLng(I)||C.latLngBounds(I)):this;if(N=I._southWest,P=I._northEast,!N||!P)return this}return J||K?(J.lat=Math.min(N.lat,J.lat),J.lng=Math.min(N.lng,J.lng),K.lat=Math.max(P.lat,K.lat),K.lng=Math.max(P.lng,K.lng)):(this._southWest=new C.LatLng(N.lat,N.lng),this._northEast=new C.LatLng(P.lat,P.lng)),this},pad:function(I){var J=this._southWest,K=this._northEast,N=Math.abs(J.lat-K.lat)*I,P=Math.abs(J.lng-K.lng)*I;return new C.LatLngBounds(new C.LatLng(J.lat-N,J.lng-P),new C.LatLng(K.lat+N,K.lng+P))},getCenter:function(){return new C.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new C.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new C.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(I){I="number"==typeof I[0]||I instanceof C.LatLng?C.latLng(I):C.latLngBounds(I);var N,P,J=this._southWest,K=this._northEast;return I instanceof C.LatLngBounds?(N=I.getSouthWest(),P=I.getNorthEast()):N=P=I,N.lat>=J.lat&&P.lat<=K.lat&&N.lng>=J.lng&&P.lng<=K.lng},intersects:function(I){I=C.latLngBounds(I);var J=this._southWest,K=this._northEast,N=I.getSouthWest(),P=I.getNorthEast(),Q=P.lat>=J.lat&&N.lat<=K.lat,R=P.lng>=J.lng&&N.lng<=K.lng;return Q&&R},overlaps:function(I){I=C.latLngBounds(I);var J=this._southWest,K=this._northEast,N=I.getSouthWest(),P=I.getNorthEast(),Q=P.lat>J.lat&&N.lat<K.lat,R=P.lng>J.lng&&N.lng<K.lng;return Q&&R},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(I){return!!I&&(I=C.latLngBounds(I),this._southWest.equals(I.getSouthWest())&&this._northEast.equals(I.getNorthEast()))},isValid:function(){return!!(this._southWest&&this._northEast)}},C.latLngBounds=function(I,J){return I instanceof C.LatLngBounds?I:new C.LatLngBounds(I,J)},C.Projection={},C.Projection.LonLat={project:function(I){return new C.Point(I.lng,I.lat)},unproject:function(I){return new C.LatLng(I.y,I.x)},bounds:C.bounds([-180,-90],[180,90])},C.Projection.SphericalMercator={R:6378137,MAX_LATITUDE:85.0511287798,project:function(I){var J=Math.PI/180,K=this.MAX_LATITUDE,N=Math.max(Math.min(K,I.lat),-K),P=Math.sin(N*J);return new C.Point(this.R*I.lng*J,this.R*Math.log((1+P)/(1-P))/2)},unproject:function(I){var J=180/Math.PI;return new C.LatLng((2*Math.atan(Math.exp(I.y/this.R))-Math.PI/2)*J,I.x*J/this.R)},bounds:function(){var I=6378137*Math.PI;return C.bounds([-I,-I],[I,I])}()},C.CRS={latLngToPoint:function(I,J){var K=this.projection.project(I),N=this.scale(J);return this.transformation._transform(K,N)},pointToLatLng:function(I,J){var K=this.scale(J),N=this.transformation.untransform(I,K);return this.projection.unproject(N)},project:function(I){return this.projection.project(I)},unproject:function(I){return this.projection.unproject(I)},scale:function(I){return 256*Math.pow(2,I)},zoom:function(I){return Math.log(I/256)/Math.LN2},getProjectedBounds:function(I){if(this.infinite)return null;var J=this.projection.bounds,K=this.scale(I),N=this.transformation.transform(J.min,K),P=this.transformation.transform(J.max,K);return C.bounds(N,P)},infinite:!1,wrapLatLng:function(I){var J=this.wrapLng?C.Util.wrapNum(I.lng,this.wrapLng,!0):I.lng,K=this.wrapLat?C.Util.wrapNum(I.lat,this.wrapLat,!0):I.lat,N=I.alt;return C.latLng(K,J,N)}},C.CRS.Simple=C.extend({},C.CRS,{projection:C.Projection.LonLat,transformation:new C.Transformation(1,0,-1,0),scale:function(I){return Math.pow(2,I)},zoom:function(I){return Math.log(I)/Math.LN2},distance:function(I,J){var K=J.lng-I.lng,N=J.lat-I.lat;return Math.sqrt(K*K+N*N)},infinite:!0}),C.CRS.Earth=C.extend({},C.CRS,{wrapLng:[-180,180],R:6371000,distance:function(I,J){var K=Math.PI/180,N=I.lat*K,P=J.lat*K,Q=Math.sin(N)*Math.sin(P)+Math.cos(N)*Math.cos(P)*Math.cos((J.lng-I.lng)*K);return this.R*Math.acos(Math.min(Q,1))}}),C.CRS.EPSG3857=C.extend({},C.CRS.Earth,{code:"EPSG:3857",projection:C.Projection.SphericalMercator,transformation:function(){var I=0.5/(Math.PI*C.Projection.SphericalMercator.R);return new C.Transformation(I,0.5,-I,0.5)}()}),C.CRS.EPSG900913=C.extend({},C.CRS.EPSG3857,{code:"EPSG:900913"}),C.CRS.EPSG4326=C.extend({},C.CRS.Earth,{code:"EPSG:4326",projection:C.Projection.LonLat,transformation:new C.Transformation(1/180,1,-1/180,0.5)}),C.Map=C.Evented.extend({options:{crs:C.CRS.EPSG3857,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(I,J){J=C.setOptions(this,J),this._initContainer(I),this._initLayout(),this._onResize=C.bind(this._onResize,this),this._initEvents(),J.maxBounds&&this.setMaxBounds(J.maxBounds),J.zoom!==void 0&&(this._zoom=this._limitZoom(J.zoom)),J.center&&J.zoom!==void 0&&this.setView(C.latLng(J.center),J.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._addLayers(this.options.layers)},setView:function(I,J){return J=void 0===J?this.getZoom():J,this._resetView(C.latLng(I),J),this},setZoom:function(I,J){return this._loaded?this.setView(this.getCenter(),I,{zoom:J}):(this._zoom=I,this)},zoomIn:function(I,J){return I=I||(C.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+I,J)},zoomOut:function(I,J){return I=I||(C.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-I,J)},setZoomAround:function(I,J,K){var N=this.getZoomScale(J),P=this.getSize().divideBy(2),Q=I instanceof C.Point?I:this.latLngToContainerPoint(I),R=Q.subtract(P).multiplyBy(1-1/N),T=this.containerPointToLatLng(P.add(R));return this.setView(T,J,{zoom:K})},_getBoundsCenterZoom:function(I,J){J=J||{},I=I.getBounds?I.getBounds():C.latLngBounds(I);var K=C.point(J.paddingTopLeft||J.padding||[0,0]),N=C.point(J.paddingBottomRight||J.padding||[0,0]),P=this.getBoundsZoom(I,!1,K.add(N));P="number"==typeof J.maxZoom?Math.min(J.maxZoom,P):P;var Q=N.subtract(K).divideBy(2),R=this.project(I.getSouthWest(),P),T=this.project(I.getNorthEast(),P),U=this.unproject(R.add(T).divideBy(2).add(Q),P);return{center:U,zoom:P}},fitBounds:function(I,J){if(I=C.latLngBounds(I),!I.isValid())throw new Error("Bounds are not valid.");var K=this._getBoundsCenterZoom(I,J);return this.setView(K.center,K.zoom,J)},fitWorld:function(I){return this.fitBounds([[-90,-180],[90,180]],I)},panTo:function(I,J){return this.setView(I,this._zoom,{pan:J})},panBy:function(I){return this.fire("movestart"),this._rawPanBy(C.point(I)),this.fire("move"),this.fire("moveend")},setMaxBounds:function(I){return(I=C.latLngBounds(I),!I.isValid())?(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds)):(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=I,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds))},setMinZoom:function(I){return this.options.minZoom=I,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(I):this},setMaxZoom:function(I){return this.options.maxZoom=I,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(I):this},panInsideBounds:function(I,J){this._enforcingBounds=!0;var K=this.getCenter(),N=this._limitCenter(K,this._zoom,C.latLngBounds(I));return K.equals(N)||this.panTo(N,J),this._enforcingBounds=!1,this},invalidateSize:function(I){if(!this._loaded)return this;I=C.extend({animate:!1,pan:!0},!0===I?{animate:!0}:I);var J=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var K=this.getSize(),N=J.divideBy(2).round(),P=K.divideBy(2).round(),Q=N.subtract(P);return Q.x||Q.y?(I.animate&&I.pan?this.panBy(Q):(I.pan&&this._rawPanBy(Q),this.fire("move"),I.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(C.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:J,newSize:K})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},addHandler:function(I,J){if(!J)return this;var K=this[I]=new J(this);return this._handlers.push(K),this.options[I]&&K.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(J){this._container._leaflet_id=void 0,this._containerId=void 0}for(var I in C.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[I].remove();return this},createPane:function(I,J){var K="leaflet-pane"+(I?" leaflet-"+I.replace("Pane","")+"-pane":""),N=C.DomUtil.create("div",K,J||this._mapPane);return I&&(this._panes[I]=N),N},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var I=this.getPixelBounds(),J=this.unproject(I.getBottomLeft()),K=this.unproject(I.getTopRight());return new C.LatLngBounds(J,K)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(I,J,K){I=C.latLngBounds(I),K=C.point(K||[0,0]);var N=this.getZoom(),P=this.getMinZoom(),Q=this.getMaxZoom(),R=I.getNorthWest(),T=I.getSouthEast(),U=this.getSize().subtract(K),V=this.project(T,N).subtract(this.project(R,N)),W=C.Browser.any3d?this.options.zoomSnap:1,X=Math.min(U.x/V.x,U.y/V.y);return N=this.getScaleZoom(X,N),W&&(N=Math.round(N/(W/100))*(W/100),N=J?Math.ceil(N/W)*W:Math.floor(N/W)*W),Math.max(P,Math.min(Q,N))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new C.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(I,J){var K=this._getTopLeftPoint(I,J);return new C.Bounds(K,K.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(I){return this.options.crs.getProjectedBounds(I===void 0?this.getZoom():I)},getPane:function(I){return"string"==typeof I?this._panes[I]:I},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(I,J){var K=this.options.crs;return J=void 0===J?this._zoom:J,K.scale(I)/K.scale(J)},getScaleZoom:function(I,J){var K=this.options.crs;J=J===void 0?this._zoom:J;var N=K.zoom(I*K.scale(J));return isNaN(N)?1/0:N},project:function(I,J){return J=void 0===J?this._zoom:J,this.options.crs.latLngToPoint(C.latLng(I),J)},unproject:function(I,J){return J=void 0===J?this._zoom:J,this.options.crs.pointToLatLng(C.point(I),J)},layerPointToLatLng:function(I){var J=C.point(I).add(this.getPixelOrigin());return this.unproject(J)},latLngToLayerPoint:function(I){var J=this.project(C.latLng(I))._round();return J._subtract(this.getPixelOrigin())},wrapLatLng:function(I){return this.options.crs.wrapLatLng(C.latLng(I))},distance:function(I,J){return this.options.crs.distance(C.latLng(I),C.latLng(J))},containerPointToLayerPoint:function(I){return C.point(I).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(I){return C.point(I).add(this._getMapPanePos())},containerPointToLatLng:function(I){var J=this.containerPointToLayerPoint(C.point(I));return this.layerPointToLatLng(J)},latLngToContainerPoint:function(I){return this.layerPointToContainerPoint(this.latLngToLayerPoint(C.latLng(I)))},mouseEventToContainerPoint:function(I){return C.DomEvent.getMousePosition(I,this._container)},mouseEventToLayerPoint:function(I){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(I))},mouseEventToLatLng:function(I){return this.layerPointToLatLng(this.mouseEventToLayerPoint(I))},_initContainer:function(I){var J=this._container=C.DomUtil.get(I);if(!J)throw new Error("Map container not found.");else if(J._leaflet_id)throw new Error("Map container is already initialized.");C.DomEvent.addListener(J,"scroll",this._onScroll,this),this._containerId=C.Util.stamp(J)},_initLayout:function(){var I=this._container;this._fadeAnimated=this.options.fadeAnimation&&C.Browser.any3d,C.DomUtil.addClass(I,"leaflet-container"+(C.Browser.touch?" leaflet-touch":"")+(C.Browser.retina?" leaflet-retina":"")+(C.Browser.ielt9?" leaflet-oldie":"")+(C.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var J=C.DomUtil.getStyle(I,"position");"absolute"!==J&&"relative"!==J&&"fixed"!==J&&(I.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var I=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),C.DomUtil.setPosition(this._mapPane,new C.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(C.DomUtil.addClass(I.markerPane,"leaflet-zoom-hide"),C.DomUtil.addClass(I.shadowPane,"leaflet-zoom-hide"))},_resetView:function(I,J){C.DomUtil.setPosition(this._mapPane,new C.Point(0,0));var K=!this._loaded;this._loaded=!0,J=this._limitZoom(J),this.fire("viewprereset");var N=this._zoom!==J;this._moveStart(N)._move(I,J)._moveEnd(N),this.fire("viewreset"),K&&this.fire("load")},_moveStart:function(I){return I&&this.fire("zoomstart"),this.fire("movestart")},_move:function(I,J,K){void 0===J&&(J=this._zoom);var N=this._zoom!==J;return this._zoom=J,this._lastCenter=I,this._pixelOrigin=this._getNewPixelOrigin(I),(N||K&&K.pinch)&&this.fire("zoom",K),this.fire("move",K)},_moveEnd:function(I){return I&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return C.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(I){C.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(I))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(I){if(C.DomEvent){this._targets={},this._targets[C.stamp(this._container)]=this;var J=I?"off":"on";C.DomEvent[J](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&C.DomEvent[J](window,"resize",this._onResize,this),C.Browser.any3d&&this.options.transform3DLimit&&this[J]("moveend",this._onMoveEnd)}},_onResize:function(){C.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=C.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var I=this._getMapPanePos();Math.max(Math.abs(I.x),Math.abs(I.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(I,J){for(var N,K=[],P="mouseout"===J||"mouseover"===J,Q=I.target||I.srcElement,R=!1;Q;){if(N=this._targets[C.stamp(Q)],N&&("click"===J||"preclick"===J)&&!I._simulated&&this._draggableMoved(N)){R=!0;break}if(N&&N.listens(J,!0)){if(P&&!C.DomEvent._isExternalTarget(Q,I))break;if(K.push(N),P)break}if(Q===this._container)break;Q=Q.parentNode}return K.length||R||P||!C.DomEvent._isExternalTarget(Q,I)||(K=[this]),K},_handleDOMEvent:function(I){if(this._loaded&&!C.DomEvent._skipped(I)){var J="keypress"===I.type&&13===I.keyCode?"click":I.type;"mousedown"===J&&C.DomUtil.preventOutline(I.target||I.srcElement),this._fireDOMEvent(I,J)}},_fireDOMEvent:function(I,J,K){if("click"===I.type){var N=C.Util.extend({},I);N.type="preclick",this._fireDOMEvent(N,N.type,K)}if(!I._stopped&&(K=(K||[]).concat(this._findEventTargets(I,J)),!!K.length)){var P=K[0];"contextmenu"===J&&P.listens(J,!0)&&C.DomEvent.preventDefault(I);var Q={originalEvent:I};if("keypress"!==I.type){var R=P instanceof C.Marker;Q.containerPoint=R?this.latLngToContainerPoint(P.getLatLng()):this.mouseEventToContainerPoint(I),Q.layerPoint=this.containerPointToLayerPoint(Q.containerPoint),Q.latlng=R?P.getLatLng():this.layerPointToLatLng(Q.layerPoint)}for(var T=0;T<K.length;T++)K[T].fire(J,Q,!0),Q.originalEvent._stopped||K[T].options.nonBubblingEvents&&-1!==C.Util.indexOf(K[T].options.nonBubblingEvents,J)}},_draggableMoved:function(I){return I=I.dragging&&I.dragging.enabled()?I:this,I.dragging&&I.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var I=0,J=this._handlers.length;I<J;I++)this._handlers[I].disable()},whenReady:function(I,J){return this._loaded?I.call(J||this,{target:this}):this.on("load",I,J),this},_getMapPanePos:function(){return C.DomUtil.getPosition(this._mapPane)||new C.Point(0,0)},_moved:function(){var I=this._getMapPanePos();return I&&!I.equals([0,0])},_getTopLeftPoint:function(I,J){var K=I&&J!==void 0?this._getNewPixelOrigin(I,J):this.getPixelOrigin();return K.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(I,J){var K=this.getSize()._divideBy(2);return this.project(I,J)._subtract(K)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(I,J,K){var N=this._getNewPixelOrigin(K,J);return this.project(I,J)._subtract(N)},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(I){return this.latLngToLayerPoint(I).subtract(this._getCenterLayerPoint())},_limitCenter:function(I,J,K){if(!K)return I;var N=this.project(I,J),P=this.getSize().divideBy(2),Q=new C.Bounds(N.subtract(P),N.add(P)),R=this._getBoundsOffset(Q,K,J);return R.round().equals([0,0])?I:this.unproject(N.add(R),J)},_limitOffset:function(I,J){if(!J)return I;var K=this.getPixelBounds(),N=new C.Bounds(K.min.add(I),K.max.add(I));return I.add(this._getBoundsOffset(N,J))},_getBoundsOffset:function(I,J,K){var N=C.bounds(this.project(J.getNorthEast(),K),this.project(J.getSouthWest(),K)),P=N.min.subtract(I.min),Q=N.max.subtract(I.max),R=this._rebound(P.x,-Q.x),T=this._rebound(P.y,-Q.y);return new C.Point(R,T)},_rebound:function(I,J){return 0<I+J?Math.round(I-J)/2:Math.max(0,Math.ceil(I))-Math.max(0,Math.floor(J))},_limitZoom:function(I){var J=this.getMinZoom(),K=this.getMaxZoom(),N=C.Browser.any3d?this.options.zoomSnap:1;return N&&(I=Math.round(I/N)*N),Math.max(J,Math.min(K,I))}}),C.map=function(I,J){return new C.Map(I,J)},C.Layer=C.Evented.extend({options:{pane:"overlayPane",nonBubblingEvents:[]},addTo:function(I){return I.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(I){return I&&I.removeLayer(this),this},getPane:function(I){return this._map.getPane(I?this.options[I]||I:this.options.pane)},addInteractiveTarget:function(I){return this._map._targets[C.stamp(I)]=this,this},removeInteractiveTarget:function(I){return delete this._map._targets[C.stamp(I)],this},_layerAdd:function(I){var J=I.target;if(J.hasLayer(this)){if(this._map=J,this._zoomAnimated=J._zoomAnimated,this.getEvents){var K=this.getEvents();J.on(K,this),this.once("remove",function(){J.off(K,this)},this)}this.onAdd(J),this.getAttribution&&this._map.attributionControl&&this._map.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),J.fire("layeradd",{layer:this})}}}),C.Map.include({addLayer:function(I){var J=C.stamp(I);return this._layers[J]?this:(this._layers[J]=I,I._mapToAdd=this,I.beforeAdd&&I.beforeAdd(this),this.whenReady(I._layerAdd,I),this)},removeLayer:function(I){var J=C.stamp(I);return this._layers[J]?(this._loaded&&I.onRemove(this),I.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(I.getAttribution()),delete this._layers[J],this._loaded&&(this.fire("layerremove",{layer:I}),I.fire("remove")),I._map=I._mapToAdd=null,this):this},hasLayer:function(I){return!!I&&C.stamp(I)in this._layers},eachLayer:function(I,J){for(var K in this._layers)I.call(J,this._layers[K]);return this},_addLayers:function(I){I=I?C.Util.isArray(I)?I:[I]:[];for(var J=0,K=I.length;J<K;J++)this.addLayer(I[J])},_addZoomLimit:function(I){(isNaN(I.options.maxZoom)||!isNaN(I.options.minZoom))&&(this._zoomBoundLayers[C.stamp(I)]=I,this._updateZoomLevels())},_removeZoomLimit:function(I){var J=C.stamp(I);this._zoomBoundLayers[J]&&(delete this._zoomBoundLayers[J],this._updateZoomLevels())},_updateZoomLevels:function(){var I=1/0,J=-(1/0),K=this._getZoomSpan();for(var N in this._zoomBoundLayers){var P=this._zoomBoundLayers[N].options;I=P.minZoom===void 0?I:Math.min(I,P.minZoom),J=P.maxZoom===void 0?J:Math.max(J,P.maxZoom)}this._layersMaxZoom=J===-(1/0)?void 0:J,this._layersMinZoom=I===1/0?void 0:I,K!==this._getZoomSpan()&&this.fire("zoomlevelschange")}}),C.Projection.Mercator={R:6378137,R_MINOR:6356752.314245179,bounds:C.bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(I){var J=Math.PI/180,K=this.R,N=I.lat*J,P=this.R_MINOR/K,Q=Math.sqrt(1-P*P),R=Q*Math.sin(N),T=Math.tan(Math.PI/4-N/2)/Math.pow((1-R)/(1+R),Q/2);return N=-K*Math.log(Math.max(T,1e-10)),new C.Point(I.lng*J*K,N)},unproject:function(I){var J=180/Math.PI,K=this.R,N=this.R_MINOR/K,P=Math.sqrt(1-N*N),Q=Math.exp(-I.y/K),R=Math.PI/2-2*Math.atan(Q);for(var V,T=0,U=0.1;15>T&&1e-7<Math.abs(U);T++)V=P*Math.sin(R),V=Math.pow((1-V)/(1+V),P/2),U=Math.PI/2-2*Math.atan(Q*V)-R,R+=U;return new C.LatLng(R*J,I.x*J/K)}},C.CRS.EPSG3395=C.extend({},C.CRS.Earth,{code:"EPSG:3395",projection:C.Projection.Mercator,transformation:function(){var I=0.5/(Math.PI*C.Projection.Mercator.R);return new C.Transformation(I,0.5,-I,0.5)}()}),C.GridLayer=C.Layer.extend({options:{tileSize:256,opacity:1,updateWhenIdle:C.Browser.mobile,updateWhenZooming:!0,updateInterval:200,attribution:null,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(I){C.setOptions(this,I)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(I){I._addZoomLimit(this)},onRemove:function(I){this._removeAllTiles(),C.DomUtil.remove(this._container),I._removeZoomLimit(this),this._container=null,this._tileZoom=null},bringToFront:function(){return this._map&&(C.DomUtil.toFront(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(C.DomUtil.toBack(this._container),this._setAutoZIndex(Math.min)),this},getAttribution:function(){return this.options.attribution},getContainer:function(){return this._container},setOpacity:function(I){return this.options.opacity=I,this._updateOpacity(),this},setZIndex:function(I){return this.options.zIndex=I,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var I={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(!this._onMove&&(this._onMove=C.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),I.move=this._onMove),this._zoomAnimated&&(I.zoomanim=this._animateZoom),I},createTile:function(){return document.createElement("div")},getTileSize:function(){var I=this.options.tileSize;return I instanceof C.Point?I:new C.Point(I,I)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(I){var J=this.getPane().children,K=-I(-(1/0),1/0);for(var Q,N=0,P=J.length;N<P;N++)Q=J[N].style.zIndex,J[N]!==this._container&&Q&&(K=I(K,+Q));isFinite(K)&&(this.options.zIndex=K+I(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!C.Browser.ielt9){C.DomUtil.setOpacity(this._container,this.options.opacity);var I=+new Date,J=!1,K=!1;for(var N in this._tiles){var P=this._tiles[N];if(P.current&&P.loaded){var Q=Math.min(1,(I-P.loaded)/200);C.DomUtil.setOpacity(P.el,Q),1>Q?J=!0:(P.active&&(K=!0),P.active=!0)}}K&&!this._noPrune&&this._pruneTiles(),J&&(C.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=C.Util.requestAnimFrame(this._updateOpacity,this))}},_initContainer:function(){this._container||(this._container=C.DomUtil.create("div","leaflet-layer "+this.options.className),this._updateZIndex(),1>this.options.opacity&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var I=this._tileZoom,J=this.options.maxZoom;if(void 0===I)return void 0;for(var K in this._levels)this._levels[K].el.children.length||K===I?this._levels[K].el.style.zIndex=J-Math.abs(I-K):(C.DomUtil.remove(this._levels[K].el),this._removeTilesAtZoom(K),delete this._levels[K]);var N=this._levels[I],P=this._map;return N||(N=this._levels[I]={},N.el=C.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),N.el.style.zIndex=J,N.origin=P.project(P.unproject(P.getPixelOrigin()),I).round(),N.zoom=I,this._setZoomTransform(N,P.getCenter(),P.getZoom()),C.Util.falseFn(N.el.offsetWidth)),this._level=N,N},_pruneTiles:function(){if(this._map){var I,J,K=this._map.getZoom();if(K>this.options.maxZoom||K<this.options.minZoom)return void this._removeAllTiles();for(I in this._tiles)J=this._tiles[I],J.retain=J.current;for(I in this._tiles)if(J=this._tiles[I],J.current&&!J.active){var N=J.coords;this._retainParent(N.x,N.y,N.z,N.z-5)||this._retainChildren(N.x,N.y,N.z,N.z+2)}for(I in this._tiles)this._tiles[I].retain||this._removeTile(I)}},_removeTilesAtZoom:function(I){for(var J in this._tiles)this._tiles[J].coords.z===I&&this._removeTile(J)},_removeAllTiles:function(){for(var I in this._tiles)this._removeTile(I)},_invalidateAll:function(){for(var I in this._levels)C.DomUtil.remove(this._levels[I].el),delete this._levels[I];this._removeAllTiles(),this._tileZoom=null},_retainParent:function(I,J,K,N){var P=Math.floor(I/2),Q=Math.floor(J/2),R=K-1,T=new C.Point(+P,+Q);T.z=+R;var U=this._tileCoordsToKey(T),V=this._tiles[U];return V&&V.active?(V.retain=!0,!0):(V&&V.loaded&&(V.retain=!0),!!(R>N)&&this._retainParent(P,Q,R,N))},_retainChildren:function(I,J,K,N){for(var P=2*I;P<2*I+2;P++)for(var Q=2*J;Q<2*J+2;Q++){var R=new C.Point(P,Q);R.z=K+1;var T=this._tileCoordsToKey(R),U=this._tiles[T];if(U&&U.active){U.retain=!0;continue}else U&&U.loaded&&(U.retain=!0);K+1<N&&this._retainChildren(P,Q,K+1,N)}},_resetView:function(I){var J=I&&(I.pinch||I.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),J,J)},_animateZoom:function(I){this._setView(I.center,I.zoom,!0,I.noUpdate)},_setView:function(I,J,K,N){var P=Math.round(J);(this.options.maxZoom!==void 0&&P>this.options.maxZoom||this.options.minZoom!==void 0&&P<this.options.minZoom)&&(P=void 0);var Q=this.options.updateWhenZooming&&P!==this._tileZoom;(!N||Q)&&(this._tileZoom=P,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),P!==void 0&&this._update(I),!K&&this._pruneTiles(),this._noPrune=!!K),this._setZoomTransforms(I,J)},_setZoomTransforms:function(I,J){for(var K in this._levels)this._setZoomTransform(this._levels[K],I,J)},_setZoomTransform:function(I,J,K){var N=this._map.getZoomScale(K,I.zoom),P=I.origin.multiplyBy(N).subtract(this._map._getNewPixelOrigin(J,K)).round();C.Browser.any3d?C.DomUtil.setTransform(I.el,P,N):C.DomUtil.setPosition(I.el,P)},_resetGrid:function(){var I=this._map,J=I.options.crs,K=this._tileSize=this.getTileSize(),N=this._tileZoom,P=this._map.getPixelWorldBounds(this._tileZoom);P&&(this._globalTileRange=this._pxBoundsToTileRange(P)),this._wrapX=J.wrapLng&&!this.options.noWrap&&[Math.floor(I.project([0,J.wrapLng[0]],N).x/K.x),Math.ceil(I.project([0,J.wrapLng[1]],N).x/K.y)],this._wrapY=J.wrapLat&&!this.options.noWrap&&[Math.floor(I.project([J.wrapLat[0],0],N).y/K.x),Math.ceil(I.project([J.wrapLat[1],0],N).y/K.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(I){var J=this._map,K=J._animatingZoom?Math.max(J._animateToZoom,J.getZoom()):J.getZoom(),N=J.getZoomScale(K,this._tileZoom),P=J.project(I,this._tileZoom).floor(),Q=J.getSize().divideBy(2*N);return new C.Bounds(P.subtract(Q),P.add(Q))},_update:function(I){var J=this._map;if(J){var K=J.getZoom();if(void 0===I&&(I=J.getCenter()),void 0!==this._tileZoom){var N=this._getTiledPixelBounds(I),P=this._pxBoundsToTileRange(N),Q=P.getCenter(),R=[],T=this.options.keepBuffer,U=new C.Bounds(P.getBottomLeft().subtract([T,-T]),P.getTopRight().add([T,-T]));for(var V in this._tiles){var W=this._tiles[V].coords;W.z===this._tileZoom&&U.contains(C.point(W.x,W.y))||(this._tiles[V].current=!1)}if(1<Math.abs(K-this._tileZoom))return void this._setView(I,K);for(var X=P.min.y;X<=P.max.y;X++)for(var Y=P.min.x;Y<=P.max.x;Y++){var Z=new C.Point(Y,X);if(Z.z=this._tileZoom,!!this._isValidTile(Z)){var $=this._tiles[this._tileCoordsToKey(Z)];$?$.current=!0:R.push(Z)}}if(R.sort(function(aa,ba){return aa.distanceTo(Q)-ba.distanceTo(Q)}),0!==R.length){this._loading||(this._loading=!0,this.fire("loading"));var _=document.createDocumentFragment();for(Y=0;Y<R.length;Y++)this._addTile(R[Y],_);this._level.el.appendChild(_)}}}},_isValidTile:function(I){var J=this._map.options.crs;if(!J.infinite){var K=this._globalTileRange;if(!J.wrapLng&&(I.x<K.min.x||I.x>K.max.x)||!J.wrapLat&&(I.y<K.min.y||I.y>K.max.y))return!1}if(!this.options.bounds)return!0;var N=this._tileCoordsToBounds(I);return C.latLngBounds(this.options.bounds).overlaps(N)},_keyToBounds:function(I){return this._tileCoordsToBounds(this._keyToTileCoords(I))},_tileCoordsToBounds:function(I){var J=this._map,K=this.getTileSize(),N=I.scaleBy(K),P=N.add(K),Q=J.unproject(N,I.z),R=J.unproject(P,I.z);return this.options.noWrap||(Q=J.wrapLatLng(Q),R=J.wrapLatLng(R)),new C.LatLngBounds(Q,R)},_tileCoordsToKey:function(I){return I.x+":"+I.y+":"+I.z},_keyToTileCoords:function(I){var J=I.split(":"),K=new C.Point(+J[0],+J[1]);return K.z=+J[2],K},_removeTile:function(I){var J=this._tiles[I];J&&(C.DomUtil.remove(J.el),delete this._tiles[I],this.fire("tileunload",{tile:J.el,coords:this._keyToTileCoords(I)}))},_initTile:function(I){C.DomUtil.addClass(I,"leaflet-tile");var J=this.getTileSize();I.style.width=J.x+"px",I.style.height=J.y+"px",I.onselectstart=C.Util.falseFn,I.onmousemove=C.Util.falseFn,C.Browser.ielt9&&1>this.options.opacity&&C.DomUtil.setOpacity(I,this.options.opacity),C.Browser.android&&!C.Browser.android23&&(I.style.WebkitBackfaceVisibility="hidden")},_addTile:function(I,J){var K=this._getTilePos(I),N=this._tileCoordsToKey(I),P=this.createTile(this._wrapCoords(I),C.bind(this._tileReady,this,I));this._initTile(P),2>this.createTile.length&&C.Util.requestAnimFrame(C.bind(this._tileReady,this,I,null,P)),C.DomUtil.setPosition(P,K),this._tiles[N]={el:P,coords:I,current:!0},J.appendChild(P),this.fire("tileloadstart",{tile:P,coords:I})},_tileReady:function(I,J,K){if(this._map){J&&this.fire("tileerror",{error:J,tile:K,coords:I});var N=this._tileCoordsToKey(I);K=this._tiles[N],K&&(K.loaded=+new Date,this._map._fadeAnimated?(C.DomUtil.setOpacity(K.el,0),C.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=C.Util.requestAnimFrame(this._updateOpacity,this)):(K.active=!0,this._pruneTiles()),C.DomUtil.addClass(K.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:K.el,coords:I}),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),C.Browser.ielt9||!this._map._fadeAnimated?C.Util.requestAnimFrame(this._pruneTiles,this):setTimeout(C.bind(this._pruneTiles,this),250)))}},_getTilePos:function(I){return I.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(I){var J=new C.Point(this._wrapX?C.Util.wrapNum(I.x,this._wrapX):I.x,this._wrapY?C.Util.wrapNum(I.y,this._wrapY):I.y);return J.z=I.z,J},_pxBoundsToTileRange:function(I){var J=this.getTileSize();return new C.Bounds(I.min.unscaleBy(J).floor(),I.max.unscaleBy(J).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var I in this._tiles)if(!this._tiles[I].loaded)return!1;return!0}}),C.gridLayer=function(I){return new C.GridLayer(I)},C.TileLayer=C.GridLayer.extend({options:{minZoom:0,maxZoom:18,maxNativeZoom:null,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(I,J){this._url=I,J=C.setOptions(this,J),J.detectRetina&&C.Browser.retina&&0<J.maxZoom&&(J.tileSize=Math.floor(J.tileSize/2),J.zoomReverse?(J.zoomOffset--,J.minZoom++):(J.zoomOffset++,J.maxZoom--),J.minZoom=Math.max(0,J.minZoom)),"string"==typeof J.subdomains&&(J.subdomains=J.subdomains.split("")),C.Browser.android||this.on("tileunload",this._onTileRemove)},setUrl:function(I,J){return this._url=I,J||this.redraw(),this},createTile:function(I,J){var K=document.createElement("img");return C.DomEvent.on(K,"load",C.bind(this._tileOnLoad,this,J,K)),C.DomEvent.on(K,"error",C.bind(this._tileOnError,this,J,K)),this.options.crossOrigin&&(K.crossOrigin=""),K.alt="",K.src=this.getTileUrl(I),K},getTileUrl:function(I){var J={r:C.Browser.retina?"@2x":"",s:this._getSubdomain(I),x:I.x,y:I.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var K=this._globalTileRange.max.y-I.y;this.options.tms&&(J.y=K),J["-y"]=K}return C.Util.template(this._url,C.extend(J,this.options))},_tileOnLoad:function(I,J){C.Browser.ielt9?setTimeout(C.bind(I,this,null,J),0):I(null,J)},_tileOnError:function(I,J,K){var N=this.options.errorTileUrl;N&&(J.src=N),I(K,J)},getTileSize:function(){var I=this._map,J=C.GridLayer.prototype.getTileSize.call(this),K=this._tileZoom+this.options.zoomOffset,N=this.options.maxNativeZoom;return null!==N&&K>N?J.divideBy(I.getZoomScale(N,K)).round():J},_onTileRemove:function(I){I.tile.onload=null},_getZoomForUrl:function(){var I=this.options,J=this._tileZoom;return I.zoomReverse&&(J=I.maxZoom-J),J+=I.zoomOffset,null===I.maxNativeZoom?J:Math.min(J,I.maxNativeZoom)},_getSubdomain:function(I){var J=Math.abs(I.x+I.y)%this.options.subdomains.length;return this.options.subdomains[J]},_abortLoading:function(){var I,J;for(I in this._tiles)this._tiles[I].coords.z!==this._tileZoom&&(J=this._tiles[I].el,J.onload=C.Util.falseFn,J.onerror=C.Util.falseFn,J.complete||(J.src=C.Util.emptyImageUrl,C.DomUtil.remove(J)))}}),C.tileLayer=function(I,J){return new C.TileLayer(I,J)},C.TileLayer.WMS=C.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(I,J){this._url=I;var K=C.extend({},this.defaultWmsParams);for(var N in J)N in this.options||(K[N]=J[N]);J=C.setOptions(this,J),K.width=K.height=J.tileSize*(J.detectRetina&&C.Browser.retina?2:1),this.wmsParams=K},onAdd:function(I){this._crs=this.options.crs||I.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var J=1.3<=this._wmsVersion?"crs":"srs";this.wmsParams[J]=this._crs.code,C.TileLayer.prototype.onAdd.call(this,I)},getTileUrl:function(I){var J=this._tileCoordsToBounds(I),K=this._crs.project(J.getNorthWest()),N=this._crs.project(J.getSouthEast()),P=(1.3<=this._wmsVersion&&this._crs===C.CRS.EPSG4326?[N.y,K.x,K.y,N.x]:[K.x,N.y,N.x,K.y]).join(","),Q=C.TileLayer.prototype.getTileUrl.call(this,I);return Q+C.Util.getParamString(this.wmsParams,Q,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+P},setParams:function(I,J){return C.extend(this.wmsParams,I),J||this.redraw(),this}}),C.tileLayer.wms=function(I,J){return new C.TileLayer.WMS(I,J)},C.ImageOverlay=C.Layer.extend({options:{opacity:1,alt:"",interactive:!1,attribution:null,crossOrigin:!1},initialize:function(I,J,K){this._url=I,this._bounds=C.latLngBounds(J),C.setOptions(this,K)},onAdd:function(){this._image||(this._initImage(),1>this.options.opacity&&this._updateOpacity()),this.options.interactive&&(C.DomUtil.addClass(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){C.DomUtil.remove(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(I){return this.options.opacity=I,this._image&&this._updateOpacity(),this},setStyle:function(I){return I.opacity&&this.setOpacity(I.opacity),this},bringToFront:function(){return this._map&&C.DomUtil.toFront(this._image),this},bringToBack:function(){return this._map&&C.DomUtil.toBack(this._image),this},setUrl:function(I){return this._url=I,this._image&&(this._image.src=I),this},setBounds:function(I){return this._bounds=I,this._map&&this._reset(),this},getAttribution:function(){return this.options.attribution},getEvents:function(){var I={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(I.zoomanim=this._animateZoom),I},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var I=this._image=C.DomUtil.create("img","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));I.onselectstart=C.Util.falseFn,I.onmousemove=C.Util.falseFn,I.onload=C.bind(this.fire,this,"load"),this.options.crossOrigin&&(I.crossOrigin=""),I.src=this._url,I.alt=this.options.alt},_animateZoom:function(I){var J=this._map.getZoomScale(I.zoom),K=this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(),I.zoom,I.center);C.DomUtil.setTransform(this._image,K,J)},_reset:function(){var I=this._image,J=new C.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),K=J.getSize();C.DomUtil.setPosition(I,J.min),I.style.width=K.x+"px",I.style.height=K.y+"px"},_updateOpacity:function(){C.DomUtil.setOpacity(this._image,this.options.opacity)}}),C.imageOverlay=function(I,J,K){return new C.ImageOverlay(I,J,K)},C.Icon=C.Class.extend({initialize:function(I){C.setOptions(this,I)},createIcon:function(I){return this._createIcon("icon",I)},createShadow:function(I){return this._createIcon("shadow",I)},_createIcon:function(I,J){var K=this._getIconUrl(I);if(!K){if("icon"===I)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var N=this._createImg(K,J&&"IMG"===J.tagName?J:null);return this._setIconStyles(N,I),N},_setIconStyles:function(I,J){var K=this.options,N=K[J+"Size"];"number"==typeof N&&(N=[N,N]);var P=C.point(N),Q=C.point("shadow"===J&&K.shadowAnchor||K.iconAnchor||P&&P.divideBy(2,!0));I.className="leaflet-marker-"+J+" "+K.className,Q&&(I.style.marginLeft=-Q.x+"px",I.style.marginTop=-Q.y+"px"),P&&(I.style.width=P.x+"px",I.style.height=P.y+"px")},_createImg:function(I,J){return J=J||document.createElement("img"),J.src=I,J},_getIconUrl:function(I){return C.Browser.retina&&this.options[I+"RetinaUrl"]||this.options[I+"Url"]}}),C.icon=function(I){return new C.Icon(I)},C.Icon.Default=C.Icon.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(I){return C.Icon.Default.imagePath||(C.Icon.Default.imagePath=this._detectIconPath()),(this.options.imagePath||C.Icon.Default.imagePath)+C.Icon.prototype._getIconUrl.call(this,I)},_detectIconPath:function(){var I=C.DomUtil.create("div","leaflet-default-icon-path",document.body),J=C.DomUtil.getStyle(I,"background-image")||C.DomUtil.getStyle(I,"backgroundImage");return document.body.removeChild(I),0===J.indexOf("url")?J.replace(/^url\([\"\']?/,"").replace(/[\"\']?\)$/,""):""}}),C.Marker=C.Layer.extend({options:{icon:new C.Icon.Default,interactive:!0,draggable:!1,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",nonBubblingEvents:["click","dblclick","mouseover","mouseout","contextmenu"]},initialize:function(I,J){C.setOptions(this,J),this._latlng=C.latLng(I)},onAdd:function(I){this._zoomAnimated=this._zoomAnimated&&I.options.markerZoomAnimation,this._zoomAnimated&&I.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(I){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),this._zoomAnimated&&I.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(I){var J=this._latlng;return this._latlng=C.latLng(I),this.update(),this.fire("move",{oldLatLng:J,latlng:this._latlng})},setZIndexOffset:function(I){return this.options.zIndexOffset=I,this.update()},setIcon:function(I){return this.options.icon=I,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon){var I=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(I)}return this},_initIcon:function(){var I=this.options,J="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),K=I.icon.createIcon(this._icon),N=!1;K!==this._icon&&(this._icon&&this._removeIcon(),N=!0,I.title&&(K.title=I.title),I.alt&&(K.alt=I.alt)),C.DomUtil.addClass(K,J),I.keyboard&&(K.tabIndex="0"),this._icon=K,I.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var P=I.icon.createShadow(this._shadow),Q=!1;P!==this._shadow&&(this._removeShadow(),Q=!0),P&&C.DomUtil.addClass(P,J),this._shadow=P,1>I.opacity&&this._updateOpacity(),N&&this.getPane().appendChild(this._icon),this._initInteraction(),P&&Q&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),C.DomUtil.remove(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&C.DomUtil.remove(this._shadow),this._shadow=null},_setPos:function(I){C.DomUtil.setPosition(this._icon,I),this._shadow&&C.DomUtil.setPosition(this._shadow,I),this._zIndex=I.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(I){this._icon.style.zIndex=this._zIndex+I},_animateZoom:function(I){var J=this._map._latLngToNewLayerPoint(this._latlng,I.zoom,I.center).round();this._setPos(J)},_initInteraction:function(){if(this.options.interactive&&(C.DomUtil.addClass(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),C.Handler.MarkerDrag)){var I=this.options.draggable;this.dragging&&(I=this.dragging.enabled(),this.dragging.disable()),this.dragging=new C.Handler.MarkerDrag(this),I&&this.dragging.enable()}},setOpacity:function(I){return this.options.opacity=I,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var I=this.options.opacity;C.DomUtil.setOpacity(this._icon,I),this._shadow&&C.DomUtil.setOpacity(this._shadow,I)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)}}),C.marker=function(I,J){return new C.Marker(I,J)},C.DivIcon=C.Icon.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(I){var J=I&&"DIV"===I.tagName?I:document.createElement("div"),K=this.options;if(J.innerHTML=!1===K.html?"":K.html,K.bgPos){var N=C.point(K.bgPos);J.style.backgroundPosition=-N.x+"px "+-N.y+"px"}return this._setIconStyles(J,"icon"),J},createShadow:function(){return null}}),C.divIcon=function(I){return new C.DivIcon(I)},C.DivOverlay=C.Layer.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(I,J){C.setOptions(this,I),this._source=J},onAdd:function(I){this._zoomAnimated=I._zoomAnimated,this._container||this._initLayout(),I._fadeAnimated&&C.DomUtil.setOpacity(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),I._fadeAnimated&&C.DomUtil.setOpacity(this._container,1),this.bringToFront()},onRemove:function(I){I._fadeAnimated?(C.DomUtil.setOpacity(this._container,0),this._removeTimeout=setTimeout(C.bind(C.DomUtil.remove,C.DomUtil,this._container),200)):C.DomUtil.remove(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(I){return this._latlng=C.latLng(I),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(I){return this._content=I,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var I={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(I.zoomanim=this._animateZoom),I},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&C.DomUtil.toFront(this._container),this},bringToBack:function(){return this._map&&C.DomUtil.toBack(this._container),this},_updateContent:function(){if(this._content){var I=this._contentNode,J="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof J)I.innerHTML=J;else{for(;I.hasChildNodes();)I.removeChild(I.firstChild);I.appendChild(J)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var I=this._map.latLngToLayerPoint(this._latlng),J=C.point(this.options.offset),K=this._getAnchor();this._zoomAnimated?C.DomUtil.setPosition(this._container,I.add(K)):J=J.add(I).add(K);var N=this._containerBottom=-J.y,P=this._containerLeft=-Math.round(this._containerWidth/2)+J.x;this._container.style.bottom=N+"px",this._container.style.left=P+"px"}},_getAnchor:function(){return[0,0]}}),C.Popup=C.DivOverlay.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,className:""},openOn:function(I){return I.openPopup(this),this},onAdd:function(I){C.DivOverlay.prototype.onAdd.call(this,I),I.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),!(this._source instanceof C.Path)&&this._source.on("preclick",C.DomEvent.stopPropagation))},onRemove:function(I){C.DivOverlay.prototype.onRemove.call(this,I),I.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),!(this._source instanceof C.Path)&&this._source.off("preclick",C.DomEvent.stopPropagation))},getEvents:function(){var I=C.DivOverlay.prototype.getEvents.call(this);return("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(I.preclick=this._close),this.options.keepInView&&(I.moveend=this._adjustPan),I},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var I="leaflet-popup",J=this._container=C.DomUtil.create("div",I+" "+this.options.className+" leaflet-zoom-animated");if(this.options.closeButton){var K=this._closeButton=C.DomUtil.create("a",I+"-close-button",J);K.href="#close",K.innerHTML="&#215;",C.DomEvent.on(K,"click",this._onCloseButtonClick,this)}var N=this._wrapper=C.DomUtil.create("div",I+"-content-wrapper",J);this._contentNode=C.DomUtil.create("div",I+"-content",N),C.DomEvent.disableClickPropagation(N).disableScrollPropagation(this._contentNode).on(N,"contextmenu",C.DomEvent.stopPropagation),this._tipContainer=C.DomUtil.create("div",I+"-tip-container",J),this._tip=C.DomUtil.create("div",I+"-tip",this._tipContainer)},_updateLayout:function(){var I=this._contentNode,J=I.style;J.width="",J.whiteSpace="nowrap";var K=I.offsetWidth;K=Math.min(K,this.options.maxWidth),K=Math.max(K,this.options.minWidth),J.width=K+1+"px",J.whiteSpace="",J.height="";var N=I.offsetHeight,P=this.options.maxHeight,Q="leaflet-popup-scrolled";P&&N>P?(J.height=P+"px",C.DomUtil.addClass(I,Q)):C.DomUtil.removeClass(I,Q),this._containerWidth=this._container.offsetWidth},_animateZoom:function(I){var J=this._map._latLngToNewLayerPoint(this._latlng,I.zoom,I.center),K=this._getAnchor();C.DomUtil.setPosition(this._container,J.add(K))},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var I=this._map,J=parseInt(C.DomUtil.getStyle(this._container,"marginBottom"),10),K=this._container.offsetHeight+J,N=this._containerWidth,P=new C.Point(this._containerLeft,-K-this._containerBottom);P._add(C.DomUtil.getPosition(this._container));var Q=I.layerPointToContainerPoint(P),R=C.point(this.options.autoPanPadding),T=C.point(this.options.autoPanPaddingTopLeft||R),U=C.point(this.options.autoPanPaddingBottomRight||R),V=I.getSize(),W=0,X=0;Q.x+N+U.x>V.x&&(W=Q.x+N-V.x+U.x),0>Q.x-W-T.x&&(W=Q.x-T.x),Q.y+K+U.y>V.y&&(X=Q.y+K-V.y+U.y),0>Q.y-X-T.y&&(X=Q.y-T.y),(W||X)&&I.fire("autopanstart").panBy([W,X])}},_onCloseButtonClick:function(I){this._close(),C.DomEvent.stop(I)},_getAnchor:function(){return C.point(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),C.popup=function(I,J){return new C.Popup(I,J)},C.Map.mergeOptions({closePopupOnClick:!0}),C.Map.include({openPopup:function(I,J,K){return(I instanceof C.Popup||(I=new C.Popup(K).setContent(I)),J&&I.setLatLng(J),this.hasLayer(I))?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=I,this.addLayer(I))},closePopup:function(I){return I&&I!==this._popup||(I=this._popup,this._popup=null),I&&this.removeLayer(I),this}}),C.Layer.include({bindPopup:function(I,J){return I instanceof C.Popup?(C.setOptions(I,J),this._popup=I,I._source=this):((!this._popup||J)&&(this._popup=new C.Popup(J,this)),this._popup.setContent(I)),this._popupHandlersAdded||(this.on({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(I,J){if(I instanceof C.Layer||(J=I,I=this),I instanceof C.FeatureGroup)for(var K in this._layers){I=this._layers[K];break}return J||(J=I.getCenter?I.getCenter():I.getLatLng()),this._popup&&this._map&&(this._popup._source=I,this._popup.update(),this._map.openPopup(this._popup,J)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(I){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(I)),this},isPopupOpen:function(){return this._popup.isOpen()},setPopupContent:function(I){return this._popup&&this._popup.setContent(I),this},getPopup:function(){return this._popup},_openPopup:function(I){var J=I.layer||I.target;if(this._popup)return this._map?(C.DomEvent.stop(I),J instanceof C.Path?void this.openPopup(I.layer||I.target,I.latlng):void(this._map.hasLayer(this._popup)&&this._popup._source===J?this.closePopup():this.openPopup(J,I.latlng))):void 0},_movePopup:function(I){this._popup.setLatLng(I.latlng)}}),C.Marker.include({_getPopupAnchor:function(){return this.options.icon.options.popupAnchor||[0,0]}}),C.Tooltip=C.DivOverlay.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:0.9},onAdd:function(I){C.DivOverlay.prototype.onAdd.call(this,I),this.setOpacity(this.options.opacity),I.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(I){C.DivOverlay.prototype.onRemove.call(this,I),I.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var I=C.DivOverlay.prototype.getEvents.call(this);return C.Browser.touch&&!this.options.permanent&&(I.preclick=this._close),I},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var I="leaflet-tooltip "+this.options.className+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=C.DomUtil.create("div",I)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(I){var J=this._map,K=this._container,N=J.latLngToContainerPoint(J.getCenter()),P=J.layerPointToContainerPoint(I),Q=this.options.direction,R=K.offsetWidth,T=K.offsetHeight,U=C.point(this.options.offset),V=this._getAnchor();"top"===Q?I=I.add(C.point(-R/2+U.x,-T+U.y+V.y)):"bottom"===Q?I=I.subtract(C.point(R/2-U.x,-U.y)):"center"===Q?I=I.subtract(C.point(R/2+U.x,T/2-V.y+U.y)):"right"===Q||"auto"===Q&&P.x<N.x?(Q="right",I=I.add([U.x+V.x,V.y-T/2+U.y])):(Q="left",I=I.subtract(C.point(R+V.x-U.x,T/2-V.y-U.y))),C.DomUtil.removeClass(K,"leaflet-tooltip-right"),C.DomUtil.removeClass(K,"leaflet-tooltip-left"),C.DomUtil.removeClass(K,"leaflet-tooltip-top"),C.DomUtil.removeClass(K,"leaflet-tooltip-bottom"),C.DomUtil.addClass(K,"leaflet-tooltip-"+Q),C.DomUtil.setPosition(K,I)},_updatePosition:function(){var I=this._map.latLngToLayerPoint(this._latlng);this._setPosition(I)},setOpacity:function(I){this.options.opacity=I,this._container&&C.DomUtil.setOpacity(this._container,I)},_animateZoom:function(I){var J=this._map._latLngToNewLayerPoint(this._latlng,I.zoom,I.center);this._setPosition(J)},_getAnchor:function(){return C.point(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),C.tooltip=function(I,J){return new C.Tooltip(I,J)},C.Map.include({openTooltip:function(I,J,K){return I instanceof C.Tooltip||(I=new C.Tooltip(K).setContent(I)),J&&I.setLatLng(J),this.hasLayer(I)?this:this.addLayer(I)},closeTooltip:function(I){return I&&this.removeLayer(I),this}}),C.Layer.include({bindTooltip:function(I,J){return I instanceof C.Tooltip?(C.setOptions(I,J),this._tooltip=I,I._source=this):((!this._tooltip||J)&&(this._tooltip=C.tooltip(J,this)),this._tooltip.setContent(I)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(I){if(I||!this._tooltipHandlersAdded){var J=I?"off":"on",K={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?K.add=this._openTooltip:(K.mouseover=this._openTooltip,K.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(K.mousemove=this._moveTooltip),C.Browser.touch&&(K.click=this._openTooltip)),this[J](K),this._tooltipHandlersAdded=!I}},openTooltip:function(I,J){if(I instanceof C.Layer||(J=I,I=this),I instanceof C.FeatureGroup)for(var K in this._layers){I=this._layers[K];break}return J||(J=I.getCenter?I.getCenter():I.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=I,this._tooltip.update(),this._map.openTooltip(this._tooltip,J),this._tooltip.options.interactive&&this._tooltip._container&&(C.DomUtil.addClass(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(C.DomUtil.removeClass(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(I){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(I)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(I){return this._tooltip&&this._tooltip.setContent(I),this},getTooltip:function(){return this._tooltip},_openTooltip:function(I){var J=I.layer||I.target;this._tooltip&&this._map&&this.openTooltip(J,this._tooltip.options.sticky?I.latlng:void 0)},_moveTooltip:function(I){var K,N,J=I.latlng;this._tooltip.options.sticky&&I.originalEvent&&(K=this._map.mouseEventToContainerPoint(I.originalEvent),N=this._map.containerPointToLayerPoint(K),J=this._map.layerPointToLatLng(N)),this._tooltip.setLatLng(J)}}),C.Marker.include({_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor||[0,0]}}),C.LayerGroup=C.Layer.extend({initialize:function(I){this._layers={};var J,K;if(I)for(J=0,K=I.length;J<K;J++)this.addLayer(I[J])},addLayer:function(I){var J=this.getLayerId(I);return this._layers[J]=I,this._map&&this._map.addLayer(I),this},removeLayer:function(I){var J=I in this._layers?I:this.getLayerId(I);return this._map&&this._layers[J]&&this._map.removeLayer(this._layers[J]),delete this._layers[J],this},hasLayer:function(I){return!!I&&(I in this._layers||this.getLayerId(I)in this._layers)},clearLayers:function(){for(var I in this._layers)this.removeLayer(this._layers[I]);return this},invoke:function(I){var K,N,J=Array.prototype.slice.call(arguments,1);for(K in this._layers)N=this._layers[K],N[I]&&N[I].apply(N,J);return this},onAdd:function(I){for(var J in this._layers)I.addLayer(this._layers[J])},onRemove:function(I){for(var J in this._layers)I.removeLayer(this._layers[J])},eachLayer:function(I,J){for(var K in this._layers)I.call(J,this._layers[K]);return this},getLayer:function(I){return this._layers[I]},getLayers:function(){var I=[];for(var J in this._layers)I.push(this._layers[J]);return I},setZIndex:function(I){return this.invoke("setZIndex",I)},getLayerId:function(I){return C.stamp(I)}}),C.layerGroup=function(I){return new C.LayerGroup(I)},C.FeatureGroup=C.LayerGroup.extend({addLayer:function(I){return this.hasLayer(I)?this:(I.addEventParent(this),C.LayerGroup.prototype.addLayer.call(this,I),this.fire("layeradd",{layer:I}))},removeLayer:function(I){return this.hasLayer(I)?(I in this._layers&&(I=this._layers[I]),I.removeEventParent(this),C.LayerGroup.prototype.removeLayer.call(this,I),this.fire("layerremove",{layer:I})):this},setStyle:function(I){return this.invoke("setStyle",I)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var I=new C.LatLngBounds;for(var J in this._layers){var K=this._layers[J];I.extend(K.getBounds?K.getBounds():K.getLatLng())}return I}}),C.featureGroup=function(I){return new C.FeatureGroup(I)},C.Renderer=C.Layer.extend({options:{padding:0.1},initialize:function(I){C.setOptions(this,I),C.stamp(this)},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&C.DomUtil.addClass(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update()},onRemove:function(){C.DomUtil.remove(this._container)},getEvents:function(){var I={viewreset:this._reset,zoom:this._onZoom,moveend:this._update};return this._zoomAnimated&&(I.zoomanim=this._onAnimZoom),I},_onAnimZoom:function(I){this._updateTransform(I.center,I.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(I,J){var K=this._map.getZoomScale(J,this._zoom),N=C.DomUtil.getPosition(this._container),P=this._map.getSize().multiplyBy(0.5+this.options.padding),Q=this._map.project(this._center,J),R=this._map.project(I,J),T=R.subtract(Q),U=P.multiplyBy(-K).add(N).add(P).subtract(T);C.Browser.any3d?C.DomUtil.setTransform(this._container,U,K):C.DomUtil.setPosition(this._container,U)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom)},_update:function(){var I=this.options.padding,J=this._map.getSize(),K=this._map.containerPointToLayerPoint(J.multiplyBy(-I)).round();this._bounds=new C.Bounds(K,K.add(J.multiplyBy(1+2*I)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),C.Map.include({getRenderer:function(I){var J=I.options.renderer||this._getPaneRenderer(I.options.pane)||this.options.renderer||this._renderer;return J||(J=this._renderer=this.options.preferCanvas&&C.canvas()||C.svg()),this.hasLayer(J)||this.addLayer(J),J},_getPaneRenderer:function(I){if("overlayPane"===I||void 0===I)return!1;var J=this._paneRenderers[I];return void 0===J&&(J=C.SVG&&C.svg({pane:I})||C.Canvas&&C.canvas({pane:I}),this._paneRenderers[I]=J),J}}),C.Path=C.Layer.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:0.2,fillRule:"evenodd",interactive:!0},beforeAdd:function(I){this._renderer=I.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this),this._renderer.on("update",this._update,this)},onRemove:function(){this._renderer._removePath(this),this._renderer.off("update",this._update,this)},getEvents:function(){return{zoomend:this._project,viewreset:this._reset}},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(I){return C.setOptions(this,I),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(C.Browser.touch?10:0)}}),C.LineUtil={simplify:function(I,J){if(!J||!I.length)return I.slice();var K=J*J;return I=this._reducePoints(I,K),I=this._simplifyDP(I,K),I},pointToSegmentDistance:function(I,J,K){return Math.sqrt(this._sqClosestPointOnSegment(I,J,K,!0))},closestPointOnSegment:function(I,J,K){return this._sqClosestPointOnSegment(I,J,K)},_simplifyDP:function(I,J){var K=I.length,N=typeof Uint8Array==void 0+""?Array:Uint8Array,P=new N(K);P[0]=P[K-1]=1,this._simplifyDPStep(I,P,J,0,K-1);var Q,R=[];for(Q=0;Q<K;Q++)P[Q]&&R.push(I[Q]);return R},_simplifyDPStep:function(I,J,K,N,P){var R,T,U,Q=0;for(T=N+1;T<=P-1;T++)U=this._sqClosestPointOnSegment(I[T],I[N],I[P],!0),U>Q&&(R=T,Q=U);Q>K&&(J[R]=1,this._simplifyDPStep(I,J,K,N,R),this._simplifyDPStep(I,J,K,R,P))},_reducePoints:function(I,J){var K=[I[0]];for(var N=1,P=0,Q=I.length;N<Q;N++)this._sqDist(I[N],I[P])>J&&(K.push(I[N]),P=N);return P<Q-1&&K.push(I[Q-1]),K},clipSegment:function(I,J,K,N,P){var T,U,V,Q=N?this._lastCode:this._getBitCode(I,K),R=this._getBitCode(J,K);for(this._lastCode=R;!0;){if(!(Q|R))return[I,J];if(Q&R)return!1;T=Q||R,U=this._getEdgeIntersection(I,J,T,K,P),V=this._getBitCode(U,K),T===Q?(I=U,Q=V):(J=U,R=V)}},_getEdgeIntersection:function(I,J,K,N,P){var V,W,Q=J.x-I.x,R=J.y-I.y,T=N.min,U=N.max;return 8&K?(V=I.x+Q*(U.y-I.y)/R,W=U.y):4&K?(V=I.x+Q*(T.y-I.y)/R,W=T.y):2&K?(V=U.x,W=I.y+R*(U.x-I.x)/Q):1&K&&(V=T.x,W=I.y+R*(T.x-I.x)/Q),new C.Point(V,W,P)},_getBitCode:function(I,J){var K=0;return I.x<J.min.x?K|=1:I.x>J.max.x&&(K|=2),I.y<J.min.y?K|=4:I.y>J.max.y&&(K|=8),K},_sqDist:function(I,J){var K=J.x-I.x,N=J.y-I.y;return K*K+N*N},_sqClosestPointOnSegment:function(I,J,K,N){var V,P=J.x,Q=J.y,R=K.x-P,T=K.y-Q,U=R*R+T*T;return 0<U&&(V=((I.x-P)*R+(I.y-Q)*T)/U,1<V?(P=K.x,Q=K.y):0<V&&(P+=R*V,Q+=T*V)),R=I.x-P,T=I.y-Q,N?R*R+T*T:new C.Point(P,Q)}},C.Polyline=C.Path.extend({options:{smoothFactor:1,noClip:!1},initialize:function(I,J){C.setOptions(this,J),this._setLatLngs(I)},getLatLngs:function(){return this._latlngs},setLatLngs:function(I){return this._setLatLngs(I),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(I){var P,Q,J=1/0,K=null,N=C.LineUtil._sqClosestPointOnSegment;for(var R=0,T=this._parts.length;R<T;R++){var U=this._parts[R];for(var V=1,W=U.length;V<W;V++){P=U[V-1],Q=U[V];var X=N(I,P,Q,!0);X<J&&(J=X,K=N(I,P,Q))}}return K&&(K.distance=Math.sqrt(J)),K},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var I,J,K,N,P,Q,R,T=this._rings[0],U=T.length;if(!U)return null;for(I=0,J=0;I<U-1;I++)J+=T[I].distanceTo(T[I+1])/2;if(0===J)return this._map.layerPointToLatLng(T[0]);for(I=0,N=0;I<U-1;I++)if(P=T[I],Q=T[I+1],K=P.distanceTo(Q),N+=K,N>J)return R=(N-J)/K,this._map.layerPointToLatLng([Q.x-R*(Q.x-P.x),Q.y-R*(Q.y-P.y)])},getBounds:function(){return this._bounds},addLatLng:function(I,J){return J=J||this._defaultShape(),I=C.latLng(I),J.push(I),this._bounds.extend(I),this.redraw()},_setLatLngs:function(I){this._bounds=new C.LatLngBounds,this._latlngs=this._convertLatLngs(I)},_defaultShape:function(){return C.Polyline._flat(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(I){var J=[],K=C.Polyline._flat(I);for(var N=0,P=I.length;N<P;N++)K?(J[N]=C.latLng(I[N]),this._bounds.extend(J[N])):J[N]=this._convertLatLngs(I[N]);return J},_project:function(){var I=new C.Bounds;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,I);var J=this._clickTolerance(),K=new C.Point(J,J);this._bounds.isValid()&&I.isValid()&&(I.min._subtract(K),I.max._add(K),this._pxBounds=I)},_projectLatlngs:function(I,J,K){var Q,R,N=I[0]instanceof C.LatLng,P=I.length;if(N){for(R=[],Q=0;Q<P;Q++)R[Q]=this._map.latLngToLayerPoint(I[Q]),K.extend(R[Q]);J.push(R)}else for(Q=0;Q<P;Q++)this._projectLatlngs(I[Q],J,K)},_clipPoints:function(){var I=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(I)){if(this.options.noClip)return void(this._parts=this._rings);var K,N,P,Q,R,T,U,J=this._parts;for(K=0,P=0,Q=this._rings.length;K<Q;K++)for(U=this._rings[K],N=0,R=U.length;N<R-1;N++)(T=C.LineUtil.clipSegment(U[N],U[N+1],I,N,!0),!!T)&&(J[P]=J[P]||[],J[P].push(T[0]),(T[1]!==U[N+1]||N===R-2)&&(J[P].push(T[1]),P++))}},_simplifyPoints:function(){var I=this._parts,J=this.options.smoothFactor;for(var K=0,N=I.length;K<N;K++)I[K]=C.LineUtil.simplify(I[K],J)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)}}),C.polyline=function(I,J){return new C.Polyline(I,J)},C.Polyline._flat=function(I){return!C.Util.isArray(I[0])||"object"!=typeof I[0][0]&&"undefined"!=typeof I[0][0]},C.PolyUtil={},C.PolyUtil.clipPolygon=function(I,J,K){var N,Q,R,T,U,V,W,X,Y,P=[1,4,2,8],Z=C.LineUtil;for(Q=0,W=I.length;Q<W;Q++)I[Q]._code=Z._getBitCode(I[Q],J);for(T=0;4>T;T++){for(X=P[T],N=[],(Q=0,W=I.length,R=W-1);Q<W;R=Q++)U=I[Q],V=I[R],U._code&X?!(V._code&X)&&(Y=Z._getEdgeIntersection(V,U,X,J,K),Y._code=Z._getBitCode(Y,J),N.push(Y)):(V._code&X&&(Y=Z._getEdgeIntersection(V,U,X,J,K),Y._code=Z._getBitCode(Y,J),N.push(Y)),N.push(U));I=N}return I},C.Polygon=C.Polyline.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var I,J,K,N,P,Q,R,T,U,V=this._rings[0],W=V.length;if(!W)return null;for(Q=R=T=0,I=0,J=W-1;I<W;J=I++)K=V[I],N=V[J],P=K.y*N.x-N.y*K.x,R+=(K.x+N.x)*P,T+=(K.y+N.y)*P,Q+=3*P;return U=0===Q?V[0]:[R/Q,T/Q],this._map.layerPointToLatLng(U)},_convertLatLngs:function(I){var J=C.Polyline.prototype._convertLatLngs.call(this,I),K=J.length;return 2<=K&&J[0]instanceof C.LatLng&&J[0].equals(J[K-1])&&J.pop(),J},_setLatLngs:function(I){C.Polyline.prototype._setLatLngs.call(this,I),C.Polyline._flat(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return C.Polyline._flat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var I=this._renderer._bounds,J=this.options.weight,K=new C.Point(J,J);if(I=new C.Bounds(I.min.subtract(K),I.max.add(K)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(I)){if(this.options.noClip)return void(this._parts=this._rings);for(var Q,N=0,P=this._rings.length;N<P;N++)Q=C.PolyUtil.clipPolygon(this._rings[N],I,!0),Q.length&&this._parts.push(Q)}},_updatePath:function(){this._renderer._updatePoly(this,!0)}}),C.polygon=function(I,J){return new C.Polygon(I,J)},C.Rectangle=C.Polygon.extend({initialize:function(I,J){C.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(I),J)},setBounds:function(I){return this.setLatLngs(this._boundsToLatLngs(I))},_boundsToLatLngs:function(I){return I=C.latLngBounds(I),[I.getSouthWest(),I.getNorthWest(),I.getNorthEast(),I.getSouthEast()]}}),C.rectangle=function(I,J){return new C.Rectangle(I,J)},C.CircleMarker=C.Path.extend({options:{fill:!0,radius:10},initialize:function(I,J){C.setOptions(this,J),this._latlng=C.latLng(I),this._radius=this.options.radius},setLatLng:function(I){return this._latlng=C.latLng(I),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(I){return this.options.radius=this._radius=I,this.redraw()},getRadius:function(){return this._radius},setStyle:function(I){var J=I&&I.radius||this._radius;return C.Path.prototype.setStyle.call(this,I),this.setRadius(J),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var I=this._radius,J=this._radiusY||I,K=this._clickTolerance(),N=[I+K,J+K];this._pxBounds=new C.Bounds(this._point.subtract(N),this._point.add(N))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)}}),C.circleMarker=function(I,J){return new C.CircleMarker(I,J)},C.Circle=C.CircleMarker.extend({initialize:function(I,J,K){if("number"==typeof J&&(J=C.extend({},K,{radius:J})),C.setOptions(this,J),this._latlng=C.latLng(I),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(I){return this._mRadius=I,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var I=[this._radius,this._radiusY||this._radius];return new C.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(I)),this._map.layerPointToLatLng(this._point.add(I)))},setStyle:C.Path.prototype.setStyle,_project:function(){var I=this._latlng.lng,J=this._latlng.lat,K=this._map,N=K.options.crs;if(N.distance===C.CRS.Earth.distance){var P=Math.PI/180,Q=this._mRadius/C.CRS.Earth.R/P,R=K.project([J+Q,I]),T=K.project([J-Q,I]),U=R.add(T).divideBy(2),V=K.unproject(U).lat,W=Math.acos((Math.cos(Q*P)-Math.sin(J*P)*Math.sin(V*P))/(Math.cos(J*P)*Math.cos(V*P)))/P;(isNaN(W)||0==W)&&(W=Q/Math.cos(Math.PI/180*J)),this._point=U.subtract(K.getPixelOrigin()),this._radius=isNaN(W)?0:Math.max(Math.round(U.x-K.project([V,I-W]).x),1),this._radiusY=Math.max(Math.round(U.y-R.y),1)}else{var X=N.unproject(N.project(this._latlng).subtract([this._mRadius,0]));this._point=K.latLngToLayerPoint(this._latlng),this._radius=this._point.x-K.latLngToLayerPoint(X).x}this._updateBounds()}}),C.circle=function(I,J,K){return new C.Circle(I,J,K)},C.SVG=C.Renderer.extend({getEvents:function(){var I=C.Renderer.prototype.getEvents.call(this);return I.zoomstart=this._onZoomStart,I},_initContainer:function(){this._container=C.SVG.create("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=C.SVG.create("g"),this._container.appendChild(this._rootGroup)},_onZoomStart:function(){this._update()},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){C.Renderer.prototype._update.call(this);var I=this._bounds,J=I.getSize(),K=this._container;this._svgSize&&this._svgSize.equals(J)||(this._svgSize=J,K.setAttribute("width",J.x),K.setAttribute("height",J.y)),C.DomUtil.setPosition(K,I.min),K.setAttribute("viewBox",[I.min.x,I.min.y,J.x,J.y].join(" ")),this.fire("update")}},_initPath:function(I){var J=I._path=C.SVG.create("path");I.options.className&&C.DomUtil.addClass(J,I.options.className),I.options.interactive&&C.DomUtil.addClass(J,"leaflet-interactive"),this._updateStyle(I)},_addPath:function(I){this._rootGroup.appendChild(I._path),I.addInteractiveTarget(I._path)},_removePath:function(I){C.DomUtil.remove(I._path),I.removeInteractiveTarget(I._path)},_updatePath:function(I){I._project(),I._update()},_updateStyle:function(I){var J=I._path,K=I.options;J&&(K.stroke?(J.setAttribute("stroke",K.color),J.setAttribute("stroke-opacity",K.opacity),J.setAttribute("stroke-width",K.weight),J.setAttribute("stroke-linecap",K.lineCap),J.setAttribute("stroke-linejoin",K.lineJoin),K.dashArray?J.setAttribute("stroke-dasharray",K.dashArray):J.removeAttribute("stroke-dasharray"),K.dashOffset?J.setAttribute("stroke-dashoffset",K.dashOffset):J.removeAttribute("stroke-dashoffset")):J.setAttribute("stroke","none"),K.fill?(J.setAttribute("fill",K.fillColor||K.color),J.setAttribute("fill-opacity",K.fillOpacity),J.setAttribute("fill-rule",K.fillRule||"evenodd")):J.setAttribute("fill","none"))},_updatePoly:function(I,J){this._setPath(I,C.SVG.pointsToPath(I._parts,J))},_updateCircle:function(I){var J=I._point,K=I._radius,N=I._radiusY||K,P="a"+K+","+N+" 0 1,0 ",Q=I._empty()?"M0 0":"M"+(J.x-K)+","+J.y+P+2*K+",0 "+P+2*-K+",0 ";this._setPath(I,Q)},_setPath:function(I,J){I._path.setAttribute("d",J)},_bringToFront:function(I){C.DomUtil.toFront(I._path)},_bringToBack:function(I){C.DomUtil.toBack(I._path)}}),C.extend(C.SVG,{create:function(I){return document.createElementNS("http://www.w3.org/2000/svg",I)},pointsToPath:function(I,J){var N,P,Q,R,T,U,K="";for(N=0,Q=I.length;N<Q;N++){for(T=I[N],P=0,R=T.length;P<R;P++)U=T[P],K+=(P?"L":"M")+U.x+" "+U.y;K+=J?C.Browser.svg?"z":"x":""}return K||"M0 0"}}),C.Browser.svg=!!(document.createElementNS&&C.SVG.create("svg").createSVGRect),C.svg=function(I){return C.Browser.svg||C.Browser.vml?new C.SVG(I):null},C.Browser.vml=!C.Browser.svg&&function(){try{var I=document.createElement("div");I.innerHTML="<v:shape adj=\"1\"/>";var J=I.firstChild;return J.style.behavior="url(#default#VML)",J&&"object"==typeof J.adj}catch(K){return!1}}(),C.SVG.include(C.Browser.vml?{_initContainer:function(){this._container=C.DomUtil.create("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||C.Renderer.prototype._update.call(this)},_initPath:function(I){var J=I._container=C.SVG.create("shape");C.DomUtil.addClass(J,"leaflet-vml-shape "+this.options.className),J.coordsize="1 1",I._path=C.SVG.create("path"),J.appendChild(I._path),this._updateStyle(I)},_addPath:function(I){var J=I._container;this._container.appendChild(J),I.options.interactive&&I.addInteractiveTarget(J)},_removePath:function(I){var J=I._container;C.DomUtil.remove(J),I.removeInteractiveTarget(J)},_updateStyle:function(I){var J=I._stroke,K=I._fill,N=I.options,P=I._container;P.stroked=!!N.stroke,P.filled=!!N.fill,N.stroke?(!J&&(J=I._stroke=C.SVG.create("stroke")),P.appendChild(J),J.weight=N.weight+"px",J.color=N.color,J.opacity=N.opacity,J.dashStyle=N.dashArray?C.Util.isArray(N.dashArray)?N.dashArray.join(" "):N.dashArray.replace(/( *, *)/g," "):"",J.endcap=N.lineCap.replace("butt","flat"),J.joinstyle=N.lineJoin):J&&(P.removeChild(J),I._stroke=null),N.fill?(!K&&(K=I._fill=C.SVG.create("fill")),P.appendChild(K),K.color=N.fillColor||N.color,K.opacity=N.fillOpacity):K&&(P.removeChild(K),I._fill=null)},_updateCircle:function(I){var J=I._point.round(),K=Math.round(I._radius),N=Math.round(I._radiusY||K);this._setPath(I,I._empty()?"M0 0":"AL "+J.x+","+J.y+" "+K+","+N+" 0,"+23592600)},_setPath:function(I,J){I._path.v=J},_bringToFront:function(I){C.DomUtil.toFront(I._container)},_bringToBack:function(I){C.DomUtil.toBack(I._container)}}:{}),C.Browser.vml&&(C.SVG.create=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(I){return document.createElement("<lvml:"+I+" class=\"lvml\">")}}catch(I){return function(J){return document.createElement("<"+J+" xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">")}}}()),C.Canvas=C.Renderer.extend({onAdd:function(){C.Renderer.prototype.onAdd.call(this),this._layers=this._layers||{},this._draw()},_initContainer:function(){var I=this._container=document.createElement("canvas");C.DomEvent.on(I,"mousemove",C.Util.throttle(this._onMouseMove,32,this),this).on(I,"click dblclick mousedown mouseup contextmenu",this._onClick,this).on(I,"mouseout",this._handleMouseOut,this),this._ctx=I.getContext("2d")},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){this._drawnLayers={},C.Renderer.prototype._update.call(this);var I=this._bounds,J=this._container,K=I.getSize(),N=C.Browser.retina?2:1;C.DomUtil.setPosition(J,I.min),J.width=N*K.x,J.height=N*K.y,J.style.width=K.x+"px",J.style.height=K.y+"px",C.Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-I.min.x,-I.min.y),this.fire("update")}},_initPath:function(I){this._updateDashArray(I),this._layers[C.stamp(I)]=I},_addPath:C.Util.falseFn,_removePath:function(I){I._removed=!0,this._requestRedraw(I)},_updatePath:function(I){this._redrawBounds=I._pxBounds,this._draw(!0),I._project(),I._update(),this._draw(),this._redrawBounds=null},_updateStyle:function(I){this._updateDashArray(I),this._requestRedraw(I)},_updateDashArray:function(I){if(I.options.dashArray){var N,J=I.options.dashArray.split(","),K=[];for(N=0;N<J.length;N++)K.push(+J[N]);I.options._dashArray=K}},_requestRedraw:function(I){if(this._map){var J=I.options.weight+1;this._redrawBounds=this._redrawBounds||new C.Bounds,this._redrawBounds.extend(I._pxBounds.min.subtract([J,J])),this._redrawBounds.extend(I._pxBounds.max.add([J,J])),this._redrawRequest=this._redrawRequest||C.Util.requestAnimFrame(this._redraw,this)}},_redraw:function(){this._redrawRequest=null,this._draw(!0),this._draw(),this._redrawBounds=null},_draw:function(I){this._clear=I;var J,K=this._redrawBounds;for(var N in this._ctx.save(),K&&(this._ctx.beginPath(),this._ctx.rect(K.min.x,K.min.y,K.max.x-K.min.x,K.max.y-K.min.y),this._ctx.clip()),this._layers)J=this._layers[N],(!K||J._pxBounds&&J._pxBounds.intersects(K))&&J._updatePath(),I&&J._removed&&(delete J._removed,delete this._layers[N]);this._ctx.restore()},_updatePoly:function(I,J){var K,N,P,Q,R=I._parts,T=R.length,U=this._ctx;if(T){for(this._drawnLayers[I._leaflet_id]=I,U.beginPath(),U.setLineDash&&U.setLineDash(I.options&&I.options._dashArray||[]),K=0;K<T;K++){for(N=0,P=R[K].length;N<P;N++)Q=R[K][N],U[N?"lineTo":"moveTo"](Q.x,Q.y);J&&U.closePath()}this._fillStroke(U,I)}},_updateCircle:function(I){if(!I._empty()){var J=I._point,K=this._ctx,N=I._radius,P=(I._radiusY||N)/N;this._drawnLayers[I._leaflet_id]=I,1!=P&&(K.save(),K.scale(1,P)),K.beginPath(),K.arc(J.x,J.y/P,N,0,2*Math.PI,!1),1!=P&&K.restore(),this._fillStroke(K,I)}},_fillStroke:function(I,J){var K=this._clear,N=J.options;I.globalCompositeOperation=K?"destination-out":"source-over",N.fill&&(I.globalAlpha=K?1:N.fillOpacity,I.fillStyle=N.fillColor||N.color,I.fill(N.fillRule||"evenodd")),N.stroke&&0!==N.weight&&(I.globalAlpha=K?1:N.opacity,J._prevWeight=I.lineWidth=K?J._prevWeight+1:N.weight,I.strokeStyle=N.color,I.lineCap=N.lineCap,I.lineJoin=N.lineJoin,I.stroke())},_onClick:function(I){var N,J=this._map.mouseEventToLayerPoint(I),K=[];for(var P in this._layers)N=this._layers[P],N.options.interactive&&N._containsPoint(J)&&!this._map._draggableMoved(N)&&(C.DomEvent._fakeStop(I),K.push(N));K.length&&this._fireEvent(K,I)},_onMouseMove:function(I){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var J=this._map.mouseEventToLayerPoint(I);this._handleMouseOut(I,J),this._handleMouseHover(I,J)}},_handleMouseOut:function(I,J){var K=this._hoveredLayer;K&&("mouseout"===I.type||!K._containsPoint(J))&&(C.DomUtil.removeClass(this._container,"leaflet-interactive"),this._fireEvent([K],I,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(I,J){var K,N;for(K in this._drawnLayers)N=this._drawnLayers[K],N.options.interactive&&N._containsPoint(J)&&(C.DomUtil.addClass(this._container,"leaflet-interactive"),this._fireEvent([N],I,"mouseover"),this._hoveredLayer=N);this._hoveredLayer&&this._fireEvent([this._hoveredLayer],I)},_fireEvent:function(I,J,K){this._map._fireDOMEvent(J,K||J.type,I)},_bringToFront:C.Util.falseFn,_bringToBack:C.Util.falseFn}),C.Browser.canvas=function(){return!!document.createElement("canvas").getContext}(),C.canvas=function(I){return C.Browser.canvas?new C.Canvas(I):null},C.Polyline.prototype._containsPoint=function(I,J){var K,N,P,Q,R,T,U=this._clickTolerance();if(!this._pxBounds.contains(I))return!1;for(K=0,Q=this._parts.length;K<Q;K++)for(T=this._parts[K],N=0,R=T.length,P=R-1;N<R;P=N++)if((J||0!==N)&&C.LineUtil.pointToSegmentDistance(I,T[P],T[N])<=U)return!0;return!1},C.Polygon.prototype._containsPoint=function(I){var K,N,P,Q,R,T,U,V,J=!1;if(!this._pxBounds.contains(I))return!1;for(Q=0,U=this._parts.length;Q<U;Q++)for(K=this._parts[Q],R=0,V=K.length,T=V-1;R<V;T=R++)N=K[R],P=K[T],N.y>I.y!=P.y>I.y&&I.x<(P.x-N.x)*(I.y-N.y)/(P.y-N.y)+N.x&&(J=!J);return J||C.Polyline.prototype._containsPoint.call(this,I,!0)},C.CircleMarker.prototype._containsPoint=function(I){return I.distanceTo(this._point)<=this._radius+this._clickTolerance()},C.GeoJSON=C.FeatureGroup.extend({initialize:function(I,J){C.setOptions(this,J),this._layers={},I&&this.addData(I)},addData:function(I){var K,N,P,J=C.Util.isArray(I)?I:I.features;if(J){for(K=0,N=J.length;K<N;K++)P=J[K],(P.geometries||P.geometry||P.features||P.coordinates)&&this.addData(P);return this}var Q=this.options;if(Q.filter&&!Q.filter(I))return this;var R=C.GeoJSON.geometryToLayer(I,Q);return R?(R.feature=C.GeoJSON.asFeature(I),R.defaultOptions=R.options,this.resetStyle(R),Q.onEachFeature&&Q.onEachFeature(I,R),this.addLayer(R)):this},resetStyle:function(I){return I.options=C.Util.extend({},I.defaultOptions),this._setLayerStyle(I,this.options.style),this},setStyle:function(I){return this.eachLayer(function(J){this._setLayerStyle(J,I)},this)},_setLayerStyle:function(I,J){"function"==typeof J&&(J=J(I.feature)),I.setStyle&&I.setStyle(J)}}),C.extend(C.GeoJSON,{geometryToLayer:function(I,J){var T,U,V,W,K="Feature"===I.type?I.geometry:I,N=K?K.coordinates:null,P=[],Q=J&&J.pointToLayer,R=J&&J.coordsToLatLng||this.coordsToLatLng;if(!N&&!K)return null;switch(K.type){case"Point":return T=R(N),Q?Q(I,T):new C.Marker(T);case"MultiPoint":for(V=0,W=N.length;V<W;V++)T=R(N[V]),P.push(Q?Q(I,T):new C.Marker(T));return new C.FeatureGroup(P);case"LineString":case"MultiLineString":return U=this.coordsToLatLngs(N,"LineString"===K.type?0:1,R),new C.Polyline(U,J);case"Polygon":case"MultiPolygon":return U=this.coordsToLatLngs(N,"Polygon"===K.type?1:2,R),new C.Polygon(U,J);case"GeometryCollection":for(V=0,W=K.geometries.length;V<W;V++){var X=this.geometryToLayer({geometry:K.geometries[V],type:"Feature",properties:I.properties},J);X&&P.push(X)}return new C.FeatureGroup(P);default:throw new Error("Invalid GeoJSON object.");}},coordsToLatLng:function(I){return new C.LatLng(I[1],I[0],I[2])},coordsToLatLngs:function(I,J,K){var N=[];for(var R,P=0,Q=I.length;P<Q;P++)R=J?this.coordsToLatLngs(I[P],J-1,K):(K||this.coordsToLatLng)(I[P]),N.push(R);return N},latLngToCoords:function(I){return I.alt===void 0?[I.lng,I.lat]:[I.lng,I.lat,I.alt]},latLngsToCoords:function(I,J,K){var N=[];for(var P=0,Q=I.length;P<Q;P++)N.push(J?C.GeoJSON.latLngsToCoords(I[P],J-1,K):C.GeoJSON.latLngToCoords(I[P]));return!J&&K&&N.push(N[0]),N},getFeature:function(I,J){return I.feature?C.extend({},I.feature,{geometry:J}):C.GeoJSON.asFeature(J)},asFeature:function(I){return"Feature"===I.type?I:{type:"Feature",properties:{},geometry:I}}});var E={toGeoJSON:function(){return C.GeoJSON.getFeature(this,{type:"Point",coordinates:C.GeoJSON.latLngToCoords(this.getLatLng())})}};C.Marker.include(E),C.Circle.include(E),C.CircleMarker.include(E),C.Polyline.prototype.toGeoJSON=function(){var I=!C.Polyline._flat(this._latlngs),J=C.GeoJSON.latLngsToCoords(this._latlngs,I?1:0);return C.GeoJSON.getFeature(this,{type:(I?"Multi":"")+"LineString",coordinates:J})},C.Polygon.prototype.toGeoJSON=function(){var I=!C.Polyline._flat(this._latlngs),J=I&&!C.Polyline._flat(this._latlngs[0]),K=C.GeoJSON.latLngsToCoords(this._latlngs,J?2:I?1:0,!0);return I||(K=[K]),C.GeoJSON.getFeature(this,{type:(J?"Multi":"")+"Polygon",coordinates:K})},C.LayerGroup.include({toMultiPoint:function(){var I=[];return this.eachLayer(function(J){I.push(J.toGeoJSON().geometry.coordinates)}),C.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:I})},toGeoJSON:function(){var I=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===I)return this.toMultiPoint();var J="GeometryCollection"===I,K=[];return this.eachLayer(function(N){if(N.toGeoJSON){var P=N.toGeoJSON();K.push(J?P.geometry:C.GeoJSON.asFeature(P))}}),J?C.GeoJSON.getFeature(this,{geometries:K,type:"GeometryCollection"}):{type:"FeatureCollection",features:K}}}),C.geoJSON=function(I,J){return new C.GeoJSON(I,J)},C.geoJson=C.geoJSON;var G="_leaflet_events";C.DomEvent={on:function(I,J,K,N){if("object"==typeof J)for(var P in J)this._on(I,P,J[P],K);else{J=C.Util.splitWords(J);for(var Q=0,R=J.length;Q<R;Q++)this._on(I,J[Q],K,N)}return this},off:function(I,J,K,N){if("object"==typeof J)for(var P in J)this._off(I,P,J[P],K);else{J=C.Util.splitWords(J);for(var Q=0,R=J.length;Q<R;Q++)this._off(I,J[Q],K,N)}return this},_on:function(I,J,K,N){var P=J+C.stamp(K)+(N?"_"+C.stamp(N):"");if(I[G]&&I[G][P])return this;var Q=function(T){return K.call(N||I,T||window.event)},R=Q;return C.Browser.pointer&&0===J.indexOf("touch")?this.addPointerListener(I,J,Q,P):C.Browser.touch&&"dblclick"===J&&this.addDoubleTapListener?this.addDoubleTapListener(I,Q,P):"addEventListener"in I?"mousewheel"===J?I.addEventListener("onwheel"in I?"wheel":"mousewheel",Q,!1):"mouseenter"===J||"mouseleave"===J?(Q=function(T){T=T||window.event,C.DomEvent._isExternalTarget(I,T)&&R(T)},I.addEventListener("mouseenter"===J?"mouseover":"mouseout",Q,!1)):("click"==J&&C.Browser.android&&(Q=function(T){return C.DomEvent._filterClick(T,R)}),I.addEventListener(J,Q,!1)):"attachEvent"in I&&I.attachEvent("on"+J,Q),I[G]=I[G]||{},I[G][P]=Q,this},_off:function(I,J,K,N){var P=J+C.stamp(K)+(N?"_"+C.stamp(N):""),Q=I[G]&&I[G][P];return Q?(C.Browser.pointer&&0===J.indexOf("touch")?this.removePointerListener(I,J,P):C.Browser.touch&&"dblclick"===J&&this.removeDoubleTapListener?this.removeDoubleTapListener(I,P):"removeEventListener"in I?"mousewheel"===J?I.removeEventListener("onwheel"in I?"wheel":"mousewheel",Q,!1):I.removeEventListener("mouseenter"===J?"mouseover":"mouseleave"===J?"mouseout":J,Q,!1):"detachEvent"in I&&I.detachEvent("on"+J,Q),I[G][P]=null,this):this},stopPropagation:function(I){return I.stopPropagation?I.stopPropagation():I.originalEvent?I.originalEvent._stopped=!0:I.cancelBubble=!0,C.DomEvent._skipped(I),this},disableScrollPropagation:function(I){return C.DomEvent.on(I,"mousewheel",C.DomEvent.stopPropagation)},disableClickPropagation:function(I){var J=C.DomEvent.stopPropagation;return C.DomEvent.on(I,C.Draggable.START.join(" "),J),C.DomEvent.on(I,{click:C.DomEvent._fakeStop,dblclick:J})},preventDefault:function(I){return I.preventDefault?I.preventDefault():I.returnValue=!1,this},stop:function(I){return C.DomEvent.preventDefault(I).stopPropagation(I)},getMousePosition:function(I,J){if(!J)return new C.Point(I.clientX,I.clientY);var K=J.getBoundingClientRect();return new C.Point(I.clientX-K.left-J.clientLeft,I.clientY-K.top-J.clientTop)},_wheelPxFactor:C.Browser.win&&C.Browser.chrome?2:C.Browser.gecko?window.devicePixelRatio:1,getWheelDelta:function(I){return C.Browser.edge?I.wheelDeltaY/2:I.deltaY&&0===I.deltaMode?-I.deltaY/C.DomEvent._wheelPxFactor:I.deltaY&&1===I.deltaMode?20*-I.deltaY:I.deltaY&&2===I.deltaMode?60*-I.deltaY:I.deltaX||I.deltaZ?0:I.wheelDelta?(I.wheelDeltaY||I.wheelDelta)/2:I.detail&&32765>Math.abs(I.detail)?20*-I.detail:I.detail?60*(I.detail/-32765):0},_skipEvents:{},_fakeStop:function(I){C.DomEvent._skipEvents[I.type]=!0},_skipped:function(I){var J=this._skipEvents[I.type];return this._skipEvents[I.type]=!1,J},_isExternalTarget:function(I,J){var K=J.relatedTarget;if(!K)return!0;try{for(;K&&K!==I;)K=K.parentNode}catch(N){return!1}return K!==I},_filterClick:function(I,J){var K=I.timeStamp||I.originalEvent&&I.originalEvent.timeStamp,N=C.DomEvent._lastClick&&K-C.DomEvent._lastClick;return N&&100<N&&500>N||I.target._simulatedClick&&!I._simulated?void C.DomEvent.stop(I):void(C.DomEvent._lastClick=K,J(I))}},C.DomEvent.addListener=C.DomEvent.on,C.DomEvent.removeListener=C.DomEvent.off,C.Draggable=C.Evented.extend({options:{clickTolerance:3},statics:{START:C.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(I,J,K){this._element=I,this._dragStartTarget=J||I,this._preventOutline=K},enable:function(){this._enabled||(C.DomEvent.on(this._dragStartTarget,C.Draggable.START.join(" "),this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(C.DomEvent.off(this._dragStartTarget,C.Draggable.START.join(" "),this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(I){if(!I._simulated&&this._enabled&&(this._moved=!1,!C.DomUtil.hasClass(this._element,"leaflet-zoom-anim"))&&!C.Draggable._dragging&&!I.shiftKey&&(1===I.which||1===I.button||I.touches)&&this._enabled&&(C.Draggable._dragging=!0,this._preventOutline&&C.DomUtil.preventOutline(this._element),C.DomUtil.disableImageDrag(),C.DomUtil.disableTextSelection(),!this._moving)){this.fire("down");var J=I.touches?I.touches[0]:I;this._startPoint=new C.Point(J.clientX,J.clientY),C.DomEvent.on(document,C.Draggable.MOVE[I.type],this._onMove,this).on(document,C.Draggable.END[I.type],this._onUp,this)}},_onMove:function(I){if(!I._simulated&&this._enabled){if(I.touches&&1<I.touches.length)return void(this._moved=!0);var J=I.touches&&1===I.touches.length?I.touches[0]:I,K=new C.Point(J.clientX,J.clientY),N=K.subtract(this._startPoint);(N.x||N.y)&&!(Math.abs(N.x)+Math.abs(N.y)<this.options.clickTolerance)&&(C.DomEvent.preventDefault(I),!this._moved&&(this.fire("dragstart"),this._moved=!0,this._startPos=C.DomUtil.getPosition(this._element).subtract(N),C.DomUtil.addClass(document.body,"leaflet-dragging"),this._lastTarget=I.target||I.srcElement,window.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),C.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(N),this._moving=!0,C.Util.cancelAnimFrame(this._animRequest),this._lastEvent=I,this._animRequest=C.Util.requestAnimFrame(this._updatePosition,this,!0))}},_updatePosition:function(){var I={originalEvent:this._lastEvent};this.fire("predrag",I),C.DomUtil.setPosition(this._element,this._newPos),this.fire("drag",I)},_onUp:function(I){if(!I._simulated&&this._enabled){for(var J in C.DomUtil.removeClass(document.body,"leaflet-dragging"),this._lastTarget&&(C.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),C.Draggable.MOVE)C.DomEvent.off(document,C.Draggable.MOVE[J],this._onMove,this).off(document,C.Draggable.END[J],this._onUp,this);C.DomUtil.enableImageDrag(),C.DomUtil.enableTextSelection(),this._moved&&this._moving&&(C.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,C.Draggable._dragging=!1}}}),C.Handler=C.Class.extend({initialize:function(I){this._map=I},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}}),C.Map.mergeOptions({dragging:!0,inertia:!C.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:0.2,worldCopyJump:!1,maxBoundsViscosity:0}),C.Map.Drag=C.Handler.extend({addHooks:function(){if(!this._draggable){var I=this._map;this._draggable=new C.Draggable(I._mapPane,I._container),this._draggable.on({down:this._onDown,dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),I.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),I.on("zoomend",this._onZoomEnd,this),I.whenReady(this._onZoomEnd,this))}C.DomUtil.addClass(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){C.DomUtil.removeClass(this._map._container,"leaflet-grab"),C.DomUtil.removeClass(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDown:function(){this._map._stop()},_onDragStart:function(){var I=this._map;if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var J=C.latLngBounds(this._map.options.maxBounds);this._offsetLimit=C.bounds(this._map.latLngToContainerPoint(J.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(J.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;I.fire("movestart").fire("dragstart"),I.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(I){if(this._map.options.inertia){var J=this._lastTime=+new Date,K=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(K),this._times.push(J),50<J-this._times[0]&&(this._positions.shift(),this._times.shift())}this._map.fire("move",I).fire("drag",I)},_onZoomEnd:function(){var I=this._map.getSize().divideBy(2),J=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=J.subtract(I).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(I,J){return I-(I-J)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var I=this._draggable._newPos.subtract(this._draggable._startPos),J=this._offsetLimit;I.x<J.min.x&&(I.x=this._viscousLimit(I.x,J.min.x)),I.y<J.min.y&&(I.y=this._viscousLimit(I.y,J.min.y)),I.x>J.max.x&&(I.x=this._viscousLimit(I.x,J.max.x)),I.y>J.max.y&&(I.y=this._viscousLimit(I.y,J.max.y)),this._draggable._newPos=this._draggable._startPos.add(I)}},_onPreDragWrap:function(){var I=this._worldWidth,J=Math.round(I/2),K=this._initialWorldOffset,N=this._draggable._newPos.x,P=(N-J+K)%I+J-K,Q=(N+J+K)%I-J-K,R=Math.abs(P+K)<Math.abs(Q+K)?P:Q;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=R},_onDragEnd:function(I){var J=this._map,K=J.options,N=!K.inertia||2>this._times.length;if(J.fire("dragend",I),N)J.fire("moveend");else{var P=this._lastPos.subtract(this._positions[0]),Q=(this._lastTime-this._times[0])/1000,R=K.easeLinearity,T=P.multiplyBy(R/Q),U=T.distanceTo([0,0]),V=Math.min(K.inertiaMaxSpeed,U),W=T.multiplyBy(V/U),X=V/(K.inertiaDeceleration*R),Y=W.multiplyBy(-X/2).round();Y.x||Y.y?(Y=J._limitOffset(Y,J.options.maxBounds),C.Util.requestAnimFrame(function(){J.panBy(Y,{duration:X,easeLinearity:R,noMoveStart:!0,animate:!0})})):J.fire("moveend")}}}),C.Map.addInitHook("addHandler","dragging",C.Map.Drag),C.Map.mergeOptions({doubleClickZoom:!0}),C.Map.DoubleClickZoom=C.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(I){var J=this._map,K=J.getZoom(),N=J.options.zoomDelta,P=I.originalEvent.shiftKey?K-N:K+N;"center"===J.options.doubleClickZoom?J.setZoom(P):J.setZoomAround(I.containerPoint,P)}}),C.Map.addInitHook("addHandler","doubleClickZoom",C.Map.DoubleClickZoom),C.Map.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60}),C.Map.ScrollWheelZoom=C.Handler.extend({addHooks:function(){C.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){C.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll,this)},_onWheelScroll:function(I){var J=C.DomEvent.getWheelDelta(I),K=this._map.options.wheelDebounceTime;this._delta+=J,this._lastMousePos=this._map.mouseEventToContainerPoint(I),this._startTime||(this._startTime=+new Date);var N=Math.max(K-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(C.bind(this._performZoom,this),N),C.DomEvent.stop(I)},_performZoom:function(){var I=this._map,J=I.getZoom(),K=this._map.options.zoomSnap;I._stop();var N=this._delta/(4*this._map.options.wheelPxPerZoomLevel),P=4*Math.log(2/(1+Math.exp(-Math.abs(N))))/Math.LN2,Q=K?Math.ceil(P/K)*K:P,R=I._limitZoom(J+(0<this._delta?Q:-Q))-J;this._delta=0,this._startTime=null;R&&("center"===I.options.scrollWheelZoom?I.setZoom(J+R):I.setZoomAround(this._lastMousePos,J+R))}}),C.Map.addInitHook("addHandler","scrollWheelZoom",C.Map.ScrollWheelZoom),C.extend(C.DomEvent,{_touchstart:C.Browser.msPointer?"MSPointerDown":C.Browser.pointer?"pointerdown":"touchstart",_touchend:C.Browser.msPointer?"MSPointerUp":C.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(I,J,K){function N(X){var Y;if(Y=C.Browser.pointer?C.DomEvent._pointersCount:X.touches.length,!(1<Y)){var Z=Date.now(),$=Z-(Q||Z);R=X.touches?X.touches[0]:X,T=0<$&&250>=$,Q=Z}}function P(){if(T&&!R.cancelBubble){if(C.Browser.pointer){var Y,Z,X={};for(Z in R)Y=R[Z],X[Z]=Y&&Y.bind?Y.bind(R):Y;R=X}R.type="dblclick",J(R),Q=null}}var Q,R,T=!1,U="_leaflet_",V=this._touchstart,W=this._touchend;return I[U+V+K]=N,I[U+W+K]=P,I[U+"dblclick"+K]=J,I.addEventListener(V,N,!1),I.addEventListener(W,P,!1),C.Browser.edge||I.addEventListener("dblclick",J,!1),this},removeDoubleTapListener:function(I,J){var K="_leaflet_",N=I[K+this._touchstart+J],P=I[K+this._touchend+J],Q=I[K+"dblclick"+J];return I.removeEventListener(this._touchstart,N,!1),I.removeEventListener(this._touchend,P,!1),C.Browser.edge||I.removeEventListener("dblclick",Q,!1),this}}),C.extend(C.DomEvent,{POINTER_DOWN:C.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:C.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:C.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:C.Browser.msPointer?"MSPointerCancel":"pointercancel",TAG_WHITE_LIST:["INPUT","SELECT","OPTION"],_pointers:{},_pointersCount:0,addPointerListener:function(I,J,K,N){return"touchstart"===J?this._addPointerStart(I,K,N):"touchmove"===J?this._addPointerMove(I,K,N):"touchend"==J&&this._addPointerEnd(I,K,N),this},removePointerListener:function(I,J,K){var N=I["_leaflet_"+J+K];return"touchstart"===J?I.removeEventListener(this.POINTER_DOWN,N,!1):"touchmove"===J?I.removeEventListener(this.POINTER_MOVE,N,!1):"touchend"==J&&(I.removeEventListener(this.POINTER_UP,N,!1),I.removeEventListener(this.POINTER_CANCEL,N,!1)),this},_addPointerStart:function(I,J,K){var N=C.bind(function(Q){if("mouse"!==Q.pointerType&&Q.pointerType!==Q.MSPOINTER_TYPE_MOUSE)if(0>this.TAG_WHITE_LIST.indexOf(Q.target.tagName))C.DomEvent.preventDefault(Q);else return;this._handlePointer(Q,J)},this);if(I["_leaflet_touchstart"+K]=N,I.addEventListener(this.POINTER_DOWN,N,!1),!this._pointerDocListener){var P=C.bind(this._globalPointerUp,this);document.documentElement.addEventListener(this.POINTER_DOWN,C.bind(this._globalPointerDown,this),!0),document.documentElement.addEventListener(this.POINTER_MOVE,C.bind(this._globalPointerMove,this),!0),document.documentElement.addEventListener(this.POINTER_UP,P,!0),document.documentElement.addEventListener(this.POINTER_CANCEL,P,!0),this._pointerDocListener=!0}},_globalPointerDown:function(I){this._pointers[I.pointerId]=I,this._pointersCount++},_globalPointerMove:function(I){this._pointers[I.pointerId]&&(this._pointers[I.pointerId]=I)},_globalPointerUp:function(I){delete this._pointers[I.pointerId],this._pointersCount--},_handlePointer:function(I,J){for(var K in I.touches=[],this._pointers)I.touches.push(this._pointers[K]);I.changedTouches=[I],J(I)},_addPointerMove:function(I,J,K){var N=C.bind(function(P){(P.pointerType===P.MSPOINTER_TYPE_MOUSE||"mouse"===P.pointerType)&&0===P.buttons||this._handlePointer(P,J)},this);I["_leaflet_touchmove"+K]=N,I.addEventListener(this.POINTER_MOVE,N,!1)},_addPointerEnd:function(I,J,K){var N=C.bind(function(P){this._handlePointer(P,J)},this);I["_leaflet_touchend"+K]=N,I.addEventListener(this.POINTER_UP,N,!1),I.addEventListener(this.POINTER_CANCEL,N,!1)}}),C.Map.mergeOptions({touchZoom:C.Browser.touch&&!C.Browser.android23,bounceAtZoomLimits:!0}),C.Map.TouchZoom=C.Handler.extend({addHooks:function(){C.DomUtil.addClass(this._map._container,"leaflet-touch-zoom"),C.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){C.DomUtil.removeClass(this._map._container,"leaflet-touch-zoom"),C.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(I){var J=this._map;if(!(!I.touches||2!==I.touches.length||J._animatingZoom||this._zooming)){var K=J.mouseEventToContainerPoint(I.touches[0]),N=J.mouseEventToContainerPoint(I.touches[1]);this._centerPoint=J.getSize()._divideBy(2),this._startLatLng=J.containerPointToLatLng(this._centerPoint),"center"!==J.options.touchZoom&&(this._pinchStartLatLng=J.containerPointToLatLng(K.add(N)._divideBy(2))),this._startDist=K.distanceTo(N),this._startZoom=J.getZoom(),this._moved=!1,this._zooming=!0,J._stop(),C.DomEvent.on(document,"touchmove",this._onTouchMove,this).on(document,"touchend",this._onTouchEnd,this),C.DomEvent.preventDefault(I)}},_onTouchMove:function(I){if(I.touches&&2===I.touches.length&&this._zooming){var J=this._map,K=J.mouseEventToContainerPoint(I.touches[0]),N=J.mouseEventToContainerPoint(I.touches[1]),P=K.distanceTo(N)/this._startDist;if(this._zoom=J.getScaleZoom(P,this._startZoom),!J.options.bounceAtZoomLimits&&(this._zoom<J.getMinZoom()&&1>P||this._zoom>J.getMaxZoom()&&1<P)&&(this._zoom=J._limitZoom(this._zoom)),"center"!==J.options.touchZoom){var Q=K._add(N)._divideBy(2)._subtract(this._centerPoint);if(1==P&&0===Q.x&&0===Q.y)return;this._center=J.unproject(J.project(this._pinchStartLatLng,this._zoom).subtract(Q),this._zoom)}else if(this._center=this._startLatLng,1==P)return;this._moved||(J._moveStart(!0),this._moved=!0),C.Util.cancelAnimFrame(this._animRequest);var R=C.bind(J._move,J,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=C.Util.requestAnimFrame(R,this,!0),C.DomEvent.preventDefault(I)}},_onTouchEnd:function(){return this._moved&&this._zooming?void(this._zooming=!1,C.Util.cancelAnimFrame(this._animRequest),C.DomEvent.off(document,"touchmove",this._onTouchMove).off(document,"touchend",this._onTouchEnd),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):void(this._zooming=!1)}}),C.Map.addInitHook("addHandler","touchZoom",C.Map.TouchZoom),C.Map.mergeOptions({tap:!0,tapTolerance:15}),C.Map.Tap=C.Handler.extend({addHooks:function(){C.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){C.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(I){if(I.touches){if(C.DomEvent.preventDefault(I),this._fireClick=!0,1<I.touches.length)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var J=I.touches[0],K=J.target;this._startPos=this._newPos=new C.Point(J.clientX,J.clientY),K.tagName&&"a"===K.tagName.toLowerCase()&&C.DomUtil.addClass(K,"leaflet-active"),this._holdTimeout=setTimeout(C.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",J))},this),1000),this._simulateEvent("mousedown",J),C.DomEvent.on(document,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(I){if(clearTimeout(this._holdTimeout),C.DomEvent.off(document,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&I&&I.changedTouches){var J=I.changedTouches[0],K=J.target;K&&K.tagName&&"a"===K.tagName.toLowerCase()&&C.DomUtil.removeClass(K,"leaflet-active"),this._simulateEvent("mouseup",J),this._isTapValid()&&this._simulateEvent("click",J)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(I){var J=I.touches[0];this._newPos=new C.Point(J.clientX,J.clientY),this._simulateEvent("mousemove",J)},_simulateEvent:function(I,J){var K=document.createEvent("MouseEvents");K._simulated=!0,J.target._simulatedClick=!0,K.initMouseEvent(I,!0,!0,window,1,J.screenX,J.screenY,J.clientX,J.clientY,!1,!1,!1,!1,0,null),J.target.dispatchEvent(K)}}),C.Browser.touch&&!C.Browser.pointer&&C.Map.addInitHook("addHandler","tap",C.Map.Tap),C.Map.mergeOptions({boxZoom:!0}),C.Map.BoxZoom=C.Handler.extend({initialize:function(I){this._map=I,this._container=I._container,this._pane=I._panes.overlayPane},addHooks:function(){C.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){C.DomEvent.off(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_resetState:function(){this._moved=!1},_onMouseDown:function(I){return I.shiftKey&&(1===I.which||1===I.button)&&void(this._resetState(),C.DomUtil.disableTextSelection(),C.DomUtil.disableImageDrag(),this._startPoint=this._map.mouseEventToContainerPoint(I),C.DomEvent.on(document,{contextmenu:C.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this))},_onMouseMove:function(I){this._moved||(this._moved=!0,this._box=C.DomUtil.create("div","leaflet-zoom-box",this._container),C.DomUtil.addClass(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(I);var J=new C.Bounds(this._point,this._startPoint),K=J.getSize();C.DomUtil.setPosition(this._box,J.min),this._box.style.width=K.x+"px",this._box.style.height=K.y+"px"},_finish:function(){this._moved&&(C.DomUtil.remove(this._box),C.DomUtil.removeClass(this._container,"leaflet-crosshair")),C.DomUtil.enableTextSelection(),C.DomUtil.enableImageDrag(),C.DomEvent.off(document,{contextmenu:C.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(I){if((1===I.which||1===I.button)&&(this._finish(),!!this._moved)){setTimeout(C.bind(this._resetState,this),0);var J=new C.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(J).fire("boxzoomend",{boxZoomBounds:J})}},_onKeyDown:function(I){27===I.keyCode&&this._finish()}}),C.Map.addInitHook("addHandler","boxZoom",C.Map.BoxZoom),C.Map.mergeOptions({keyboard:!0,keyboardPanDelta:80}),C.Map.Keyboard=C.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(I){this._map=I,this._setPanDelta(I.options.keyboardPanDelta),this._setZoomDelta(I.options.zoomDelta)},addHooks:function(){var I=this._map._container;0>=I.tabIndex&&(I.tabIndex="0"),C.DomEvent.on(I,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),C.DomEvent.off(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var I=document.body,J=document.documentElement,K=I.scrollTop||J.scrollTop,N=I.scrollLeft||J.scrollLeft;this._map._container.focus(),window.scrollTo(N,K)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(I){var N,P,J=this._panKeys={},K=this.keyCodes;for(N=0,P=K.left.length;N<P;N++)J[K.left[N]]=[-1*I,0];for(N=0,P=K.right.length;N<P;N++)J[K.right[N]]=[I,0];for(N=0,P=K.down.length;N<P;N++)J[K.down[N]]=[0,I];for(N=0,P=K.up.length;N<P;N++)J[K.up[N]]=[0,-1*I]},_setZoomDelta:function(I){var N,P,J=this._zoomKeys={},K=this.keyCodes;for(N=0,P=K.zoomIn.length;N<P;N++)J[K.zoomIn[N]]=I;for(N=0,P=K.zoomOut.length;N<P;N++)J[K.zoomOut[N]]=-I},_addHooks:function(){C.DomEvent.on(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){C.DomEvent.off(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(I){if(!(I.altKey||I.ctrlKey||I.metaKey)){var N,J=I.keyCode,K=this._map;if(J in this._panKeys){if(K._panAnim&&K._panAnim._inProgress)return;N=this._panKeys[J],I.shiftKey&&(N=C.point(N).multiplyBy(3)),K.panBy(N),K.options.maxBounds&&K.panInsideBounds(K.options.maxBounds)}else if(J in this._zoomKeys)K.setZoom(K.getZoom()+(I.shiftKey?3:1)*this._zoomKeys[J]);else if(27===J)K.closePopup();else return;C.DomEvent.stop(I)}}}),C.Map.addInitHook("addHandler","keyboard",C.Map.Keyboard),C.Handler.MarkerDrag=C.Handler.extend({initialize:function(I){this._marker=I},addHooks:function(){var I=this._marker._icon;this._draggable||(this._draggable=new C.Draggable(I,I,!0)),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),C.DomUtil.addClass(I,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&C.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(I){var J=this._marker,K=J._shadow,N=C.DomUtil.getPosition(J._icon),P=J._map.layerPointToLatLng(N);K&&C.DomUtil.setPosition(K,N),J._latlng=P,I.latlng=P,I.oldLatLng=this._oldLatLng,J.fire("move",I).fire("drag",I)},_onDragEnd:function(I){delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",I)}}),C.Control=C.Class.extend({options:{position:"topright"},initialize:function(I){C.setOptions(this,I)},getPosition:function(){return this.options.position},setPosition:function(I){var J=this._map;return J&&J.removeControl(this),this.options.position=I,J&&J.addControl(this),this},getContainer:function(){return this._container},addTo:function(I){this.remove(),this._map=I;var J=this._container=this.onAdd(I),K=this.getPosition(),N=I._controlCorners[K];return C.DomUtil.addClass(J,"leaflet-control"),-1===K.indexOf("bottom")?N.appendChild(J):N.insertBefore(J,N.firstChild),this},remove:function(){return this._map?(C.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(I){this._map&&I&&0<I.screenX&&0<I.screenY&&this._map.getContainer().focus()}}),C.control=function(I){return new C.Control(I)},C.Map.include({addControl:function(I){return I.addTo(this),this},removeControl:function(I){return I.remove(),this},_initControlPos:function(){function I(P,Q){J[P+Q]=C.DomUtil.create("div",K+P+" "+K+Q,N)}var J=this._controlCorners={},K="leaflet-",N=this._controlContainer=C.DomUtil.create("div",K+"control-container",this._container);I("top","left"),I("top","right"),I("bottom","left"),I("bottom","right")},_clearControlPos:function(){C.DomUtil.remove(this._controlContainer)}}),C.Control.Zoom=C.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(I){var J="leaflet-control-zoom",K=C.DomUtil.create("div",J+" leaflet-bar"),N=this.options;return this._zoomInButton=this._createButton(N.zoomInText,N.zoomInTitle,J+"-in",K,this._zoomIn),this._zoomOutButton=this._createButton(N.zoomOutText,N.zoomOutTitle,J+"-out",K,this._zoomOut),this._updateDisabled(),I.on("zoomend zoomlevelschange",this._updateDisabled,this),K},onRemove:function(I){I.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(I){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(I.shiftKey?3:1))},_zoomOut:function(I){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(I.shiftKey?3:1))},_createButton:function(I,J,K,N,P){var Q=C.DomUtil.create("a",K,N);return Q.innerHTML=I,Q.href="#",Q.title=J,C.DomEvent.on(Q,"mousedown dblclick",C.DomEvent.stopPropagation).on(Q,"click",C.DomEvent.stop).on(Q,"click",P,this).on(Q,"click",this._refocusOnMap,this),Q},_updateDisabled:function(){var I=this._map,J="leaflet-disabled";C.DomUtil.removeClass(this._zoomInButton,J),C.DomUtil.removeClass(this._zoomOutButton,J),(this._disabled||I._zoom===I.getMinZoom())&&C.DomUtil.addClass(this._zoomOutButton,J),(this._disabled||I._zoom===I.getMaxZoom())&&C.DomUtil.addClass(this._zoomInButton,J)}}),C.Map.mergeOptions({zoomControl:!0}),C.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new C.Control.Zoom,this.addControl(this.zoomControl))}),C.control.zoom=function(I){return new C.Control.Zoom(I)},C.Control.Attribution=C.Control.extend({options:{position:"bottomright",prefix:"<a href=\"http://leafletjs.com\" title=\"A JS library for interactive maps\">Leaflet</a>"},initialize:function(I){C.setOptions(this,I),this._attributions={}},onAdd:function(I){for(var J in I.attributionControl=this,this._container=C.DomUtil.create("div","leaflet-control-attribution"),C.DomEvent&&C.DomEvent.disableClickPropagation(this._container),I._layers)I._layers[J].getAttribution&&this.addAttribution(I._layers[J].getAttribution());return this._update(),this._container},setPrefix:function(I){return this.options.prefix=I,this._update(),this},addAttribution:function(I){return I?(this._attributions[I]||(this._attributions[I]=0),this._attributions[I]++,this._update(),this):this},removeAttribution:function(I){return I?(this._attributions[I]&&(this._attributions[I]--,this._update()),this):this},_update:function(){if(this._map){var I=[];for(var J in this._attributions)this._attributions[J]&&I.push(J);var K=[];this.options.prefix&&K.push(this.options.prefix),I.length&&K.push(I.join(", ")),this._container.innerHTML=K.join(" | ")}}}),C.Map.mergeOptions({attributionControl:!0}),C.Map.addInitHook(function(){this.options.attributionControl&&new C.Control.Attribution().addTo(this)}),C.control.attribution=function(I){return new C.Control.Attribution(I)},C.Control.Scale=C.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(I){var J="leaflet-control-scale",K=C.DomUtil.create("div",J),N=this.options;return this._addScales(N,J+"-line",K),I.on(N.updateWhenIdle?"moveend":"move",this._update,this),I.whenReady(this._update,this),K},onRemove:function(I){I.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(I,J,K){I.metric&&(this._mScale=C.DomUtil.create("div",J,K)),I.imperial&&(this._iScale=C.DomUtil.create("div",J,K))},_update:function(){var I=this._map,J=I.getSize().y/2,K=I.distance(I.containerPointToLatLng([0,J]),I.containerPointToLatLng([this.options.maxWidth,J]));this._updateScales(K)},_updateScales:function(I){this.options.metric&&I&&this._updateMetric(I),this.options.imperial&&I&&this._updateImperial(I)},_updateMetric:function(I){var J=this._getRoundNum(I),K=1000>J?J+" m":J/1000+" km";this._updateScale(this._mScale,K,J/I)},_updateImperial:function(I){var K,N,P,J=3.2808399*I;5280<J?(K=J/5280,N=this._getRoundNum(K),this._updateScale(this._iScale,N+" mi",N/K)):(P=this._getRoundNum(J),this._updateScale(this._iScale,P+" ft",P/J))},_updateScale:function(I,J,K){I.style.width=Math.round(this.options.maxWidth*K)+"px",I.innerHTML=J},_getRoundNum:function(I){var J=Math.pow(10,(Math.floor(I)+"").length-1),K=I/J;return K=10<=K?10:5<=K?5:3<=K?3:2<=K?2:1,J*K}}),C.control.scale=function(I){return new C.Control.Scale(I)},C.Control.Layers=C.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1},initialize:function(I,J,K){for(var N in C.setOptions(this,K),this._layers=[],this._lastZIndex=0,this._handlingClick=!1,I)this._addLayer(I[N],N);for(N in J)this._addLayer(J[N],N,!0)},onAdd:function(I){return this._initLayout(),this._update(),this._map=I,I.on("zoomend",this._checkDisabledLayers,this),this._container},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var I=0;I<this._layers.length;I++)this._layers[I].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(I,J){return this._addLayer(I,J),this._map?this._update():this},addOverlay:function(I,J){return this._addLayer(I,J,!0),this._map?this._update():this},removeLayer:function(I){I.off("add remove",this._onLayerChange,this);var J=this._getLayer(C.stamp(I));return J&&this._layers.splice(this._layers.indexOf(J),1),this._map?this._update():this},expand:function(){C.DomUtil.addClass(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var I=this._map.getSize().y-(this._container.offsetTop+50);return I<this._form.clientHeight?(C.DomUtil.addClass(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=I+"px"):C.DomUtil.removeClass(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return C.DomUtil.removeClass(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var I="leaflet-control-layers",J=this._container=C.DomUtil.create("div",I);J.setAttribute("aria-haspopup",!0),C.DomEvent.disableClickPropagation(J),C.Browser.touch||C.DomEvent.disableScrollPropagation(J);var K=this._form=C.DomUtil.create("form",I+"-list");if(this.options.collapsed){C.Browser.android||C.DomEvent.on(J,{mouseenter:this.expand,mouseleave:this.collapse},this);var N=this._layersLink=C.DomUtil.create("a",I+"-toggle",J);N.href="#",N.title="Layers",C.Browser.touch?C.DomEvent.on(N,"click",C.DomEvent.stop).on(N,"click",this.expand,this):C.DomEvent.on(N,"focus",this.expand,this),C.DomEvent.on(K,"click",function(){setTimeout(C.bind(this._onInputClick,this),0)},this),this._map.on("click",this.collapse,this)}else this.expand();this._baseLayersList=C.DomUtil.create("div",I+"-base",K),this._separator=C.DomUtil.create("div",I+"-separator",K),this._overlaysList=C.DomUtil.create("div",I+"-overlays",K),J.appendChild(K)},_getLayer:function(I){for(var J=0;J<this._layers.length;J++)if(this._layers[J]&&C.stamp(this._layers[J].layer)===I)return this._layers[J]},_addLayer:function(I,J,K){I.on("add remove",this._onLayerChange,this),this._layers.push({layer:I,name:J,overlay:K}),this.options.autoZIndex&&I.setZIndex&&(this._lastZIndex++,I.setZIndex(this._lastZIndex))},_update:function(){if(!this._container)return this;C.DomUtil.empty(this._baseLayersList),C.DomUtil.empty(this._overlaysList);var I,J,K,N,P=0;for(K=0;K<this._layers.length;K++)N=this._layers[K],this._addItem(N),J=J||N.overlay,I=I||!N.overlay,P+=N.overlay?0:1;return this.options.hideSingleBase&&(I=I&&1<P,this._baseLayersList.style.display=I?"":"none"),this._separator.style.display=J&&I?"":"none",this},_onLayerChange:function(I){this._handlingClick||this._update();var J=this._getLayer(C.stamp(I.target)),K=J.overlay?"add"===I.type?"overlayadd":"overlayremove":"add"===I.type?"baselayerchange":null;K&&this._map.fire(K,J)},_createRadioElement:function(I,J){var K="<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\""+I+"\""+(J?" checked=\"checked\"":"")+"/>",N=document.createElement("div");return N.innerHTML=K,N.firstChild},_addItem:function(I){var N,J=document.createElement("label"),K=this._map.hasLayer(I.layer);I.overlay?(N=document.createElement("input"),N.type="checkbox",N.className="leaflet-control-layers-selector",N.defaultChecked=K):N=this._createRadioElement("leaflet-base-layers",K),N.layerId=C.stamp(I.layer),C.DomEvent.on(N,"click",this._onInputClick,this);var P=document.createElement("span");P.innerHTML=" "+I.name;var Q=document.createElement("div");J.appendChild(Q),Q.appendChild(N),Q.appendChild(P);var R=I.overlay?this._overlaysList:this._baseLayersList;return R.appendChild(J),this._checkDisabledLayers(),J},_onInputClick:function(){var J,K,N,I=this._form.getElementsByTagName("input"),P=[],Q=[];this._handlingClick=!0;for(var R=I.length-1;0<=R;R--)J=I[R],K=this._getLayer(J.layerId).layer,N=this._map.hasLayer(K),J.checked&&!N?P.push(K):!J.checked&&N&&Q.push(K);for(R=0;R<Q.length;R++)this._map.removeLayer(Q[R]);for(R=0;R<P.length;R++)this._map.addLayer(P[R]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){var J,K,I=this._form.getElementsByTagName("input"),N=this._map.getZoom();for(var P=I.length-1;0<=P;P--)J=I[P],K=this._getLayer(J.layerId).layer,J.disabled=void 0!==K.options.minZoom&&N<K.options.minZoom||void 0!==K.options.maxZoom&&N>K.options.maxZoom},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),C.control.layers=function(I,J,K){return new C.Control.Layers(I,J,K)},C.PosAnimation=C.Evented.extend({run:function(I,J,K,N){this.stop(),this._el=I,this._inProgress=!0,this._duration=K||0.25,this._easeOutPower=1/Math.max(N||0.5,0.2),this._startPos=C.DomUtil.getPosition(I),this._offset=J.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=C.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(I){var J=+new Date-this._startTime,K=1000*this._duration;J<K?this._runFrame(this._easeOut(J/K),I):(this._runFrame(1),this._complete())},_runFrame:function(I,J){var K=this._startPos.add(this._offset.multiplyBy(I));J&&K._round(),C.DomUtil.setPosition(this._el,K),this.fire("step")},_complete:function(){C.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(I){return 1-Math.pow(1-I,this._easeOutPower)}}),C.Map.include({setView:function(I,J,K){if(J=void 0===J?this._zoom:this._limitZoom(J),I=this._limitCenter(C.latLng(I),J,this.options.maxBounds),K=K||{},this._stop(),this._loaded&&!K.reset&&!0!==K){void 0!==K.animate&&(K.zoom=C.extend({animate:K.animate},K.zoom),K.pan=C.extend({animate:K.animate,duration:K.duration},K.pan));var N=this._zoom===J?this._tryAnimatedPan(I,K.pan):this._tryAnimatedZoom&&this._tryAnimatedZoom(I,J,K.zoom);if(N)return clearTimeout(this._sizeTimer),this}return this._resetView(I,J),this},panBy:function(I,J){if(I=C.point(I).round(),J=J||{},!I.x&&!I.y)return this.fire("moveend");if(!0!==J.animate&&!this.getSize().contains(I))return this._resetView(this.unproject(this.project(this.getCenter()).add(I)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new C.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),J.noMoveStart||this.fire("movestart"),!1!==J.animate){C.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var K=this._getMapPanePos().subtract(I).round();this._panAnim.run(this._mapPane,K,J.duration||0.25,J.easeLinearity)}else this._rawPanBy(I),this.fire("move").fire("moveend");return this},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){C.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(I,J){var K=this._getCenterOffset(I)._floor();return(!0===(J&&J.animate)||this.getSize().contains(K))&&(this.panBy(K,J),!0)}}),C.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4});var H=C.DomUtil.TRANSITION&&C.Browser.any3d&&!C.Browser.mobileOpera;H&&C.Map.addInitHook(function(){this._zoomAnimated=this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),C.DomEvent.on(this._proxy,C.DomUtil.TRANSITION_END,this._catchTransitionEnd,this))}),C.Map.include(H?{_createAnimProxy:function(){var I=this._proxy=C.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(I),this.on("zoomanim",function(J){var K=C.DomUtil.TRANSFORM,N=I.style[K];C.DomUtil.setTransform(I,this.project(J.center,J.zoom),this.getZoomScale(J.zoom,1)),N===I.style[K]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var J=this.getCenter(),K=this.getZoom();C.DomUtil.setTransform(I,this.project(J,K),this.getZoomScale(K,1))},this)},_catchTransitionEnd:function(I){this._animatingZoom&&0<=I.propertyName.indexOf("transform")&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(I,J,K){if(this._animatingZoom)return!0;if(K=K||{},!this._zoomAnimated||!1===K.animate||this._nothingToAnimate()||Math.abs(J-this._zoom)>this.options.zoomAnimationThreshold)return!1;var N=this.getZoomScale(J),P=this._getCenterOffset(I)._divideBy(1-1/N);return(!0===K.animate||this.getSize().contains(P))&&(C.Util.requestAnimFrame(function(){this._moveStart(!0)._animateZoom(I,J,!0)},this),!0)},_animateZoom:function(I,J,K,N){K&&(this._animatingZoom=!0,this._animateToCenter=I,this._animateToZoom=J,C.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:I,zoom:J,noUpdate:N}),setTimeout(C.bind(this._onZoomTransitionEnd,this),250)},_onZoomTransitionEnd:function(){this._animatingZoom&&(C.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),C.Util.requestAnimFrame(function(){this._moveEnd(!0)},this))}}:{}),C.Map.include({flyTo:function(I,J,K){function N(ia){var ja=ia?-1:1,ka=ia?aa:_,la=(aa*aa-_*_+ja*da*da*ba*ba)/(2*ka*da*ba),ma=Math.sqrt(la*la+1)-la,na=1e-9>ma?-18:Math.log(ma);return na}function P(ia){return(Math.exp(ia)-Math.exp(-ia))/2}function Q(ia){return(Math.exp(ia)+Math.exp(-ia))/2}function R(ia){return P(ia)/Q(ia)}function T(ia){return _*(Q(ea)/Q(ea+ca*ia))}function U(ia){return _*(Q(ea)*R(ea+ca*ia)-P(ea))/da}function V(ia){return 1-Math.pow(1-ia,1.5)}function W(){var ia=(Date.now()-fa)/ha,ja=V(ia)*ga;1>=ia?(this._flyToFrame=C.Util.requestAnimFrame(W,this),this._move(this.unproject(X.add(Y.subtract(X).multiplyBy(U(ja)/ba)),$),this.getScaleZoom(_/T(ja),$),{flyTo:!0})):this._move(I,J)._moveEnd(!0)}if(K=K||{},!1===K.animate||!C.Browser.any3d)return this.setView(I,J,K);this._stop();var X=this.project(this.getCenter()),Y=this.project(I),Z=this.getSize(),$=this._zoom;I=C.latLng(I),J=void 0===J?$:J;var _=Math.max(Z.x,Z.y),aa=_*this.getZoomScale($,J),ba=Y.distanceTo(X)||1,ca=1.42,da=ca*ca,ea=N(0),fa=Date.now(),ga=(N(1)-ea)/ca,ha=K.duration?1000*K.duration:0.8*(1000*ga);return this._moveStart(!0),W.call(this),this},flyToBounds:function(I,J){var K=this._getBoundsCenterZoom(I,J);return this.flyTo(K.center,K.zoom,J)}}),C.Map.include({_defaultLocateOptions:{timeout:10000,watch:!1},locate:function(I){if(I=this._locateOptions=C.extend({},this._defaultLocateOptions,I),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var J=C.bind(this._handleGeolocationResponse,this),K=C.bind(this._handleGeolocationError,this);return I.watch?this._locationWatchId=navigator.geolocation.watchPosition(J,K,I):navigator.geolocation.getCurrentPosition(J,K,I),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(I){var J=I.code,K=I.message||(1===J?"permission denied":2===J?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:J,message:"Geolocation error: "+K+"."})},_handleGeolocationResponse:function(I){var J=I.coords.latitude,K=I.coords.longitude,N=new C.LatLng(J,K),P=N.toBounds(I.coords.accuracy),Q=this._locateOptions;if(Q.setView){var R=this.getBoundsZoom(P);this.setView(N,Q.maxZoom?Math.min(R,Q.maxZoom):R)}var T={latlng:N,bounds:P,timestamp:I.timestamp};for(var U in I.coords)"number"==typeof I.coords[U]&&(T[U]=I.coords[U]);this.fire("locationfound",T)}}),q.default=C}),define("voltage/component",["exports","voltage/observable","voltage/parser3","voltage/render-node"],function(g,q,B,C){Object.defineProperty(g,"__esModule",{value:!0}),g.components=g.RoutableComponent=g.Component=void 0;class D extends q.O{constructor(){super(),this.template="<span>This is the default component template</span>"}get __parsedTemplate__(){return this.__proto__.__parsedTemplate||(this.__proto__.__parsedTemplate={}),this.__proto__.__parsedTemplate[this.template]||(console.log("compiling template",this.__oid__),this.__proto__.__parsedTemplate[this.template]=this.template?(0,B.parse)(this.template):[]),this.__proto__.__parsedTemplate[this.template]}init(){super.init(),Object.defineProperty(this,"renderNode",{enumerable:!1,writable:!0,value:this.renderNode}),this.renderNode&&this.renderNode.node.attributes&&this.renderNode.node.attributes.forEach(E=>{if("Literal"===E.value.type)this[E.name]=E.value.value;else{const G={};this.renderNode.evalExpression(E.value,G),(0,q.convertComputed)(this,E.name,{get:()=>{return this.renderNode.evalExpression(E.value,{})},set:null,keys:Object.keys(G).map(H=>`renderNode.${H}`)})}})}dispose(){}didInsertElement(){}willRemoveElement(){}render(){"undefined"==typeof this.tagName&&(this.tagName=this.renderNode.node.name);let E;E=this.tagName?{type:"Tag",name:this.tagName,attributes:(this.attributeBindings||[]).map(G=>{let[H,I]=G.split(":");return I=I||H,{name:H,value:{type:"Identifier",value:`block.ctx.${I}`}}}),content:this.__parsedTemplate__}:{type:"Block",block:this.__parsedTemplate__},this.renderNode.children=q.A.from([C.RenderNode.create({node:E,doc:this.renderNode.doc,parentNode:this.renderNode,block:q.O.create({ctx:this}),parentElement:this.renderNode.parentElement,owner:this.renderNode.owner})]);for(let G=0,H=this.renderNode.children.length;G<H;G++)this.renderNode.children[G].render();this.didInsertElement()}unrender(){this.renderNode.elements&&(this.renderNode.elements.forEach(E=>E.remove()),this.renderNode.elements=null),this.renderNode.children.forEach(E=>E.dispose()),this.renderNode.children=null}}g.Component=D,g.RoutableComponent=class extends D{init(){if(super.init(),this.queryParamsx){const G=location.search.substr(1),H=G.split("&");for(let I=0,J=H.length;I<J;I++){const K=H[I],N=K.substr(0,K.indexOf("="));if(N in this.queryParams){const P=K.slice(N.length+1);(0,q.convertComputed)(this,N,{keys:[],get:null,set(Q){console.log("init transition",Q)}}),this[N]=P}}}}modelHook(){}redirect(){}error(){}loading(){}didEnter(){console.log("didEnter",this.__name)}didLeave(){console.log("didLeave",this.__name)}willTransition(){console.log("willTransition",this.__name)}transitionTo(G){this.getOwner().router.transitionTo(G)}},g.components={"delegate-component":class extends D{init(){super.init();const E=[];this.renderNode.node.attributes.forEach(G=>E.push(`${G.name}={{${G.name}}}`)),this.template=`
                <${this.component} ${E.join(" ")}>
                    <yield-block />
                </${this.component}>
            `}},"link-to":class extends D{constructor(){super(),this.tagName="a",this.attributeBindings=["href:_href","class:_class"],this._href=(0,q.computed)("renderNode.block.href",function(){return`${window.location.pathname}#/${this.href}`}),this._class=(0,q.computed)("owner.router.currentRoute","href",function(){return this.getOwner().router.currentRoute===this.href?`${this.class} active`:this.class}),this.template="<yield-block/>"}},"yield-block":class extends D{render(){function E(K,N,P){for(let Q of K)if(Q[N]===P)return Q;return null}for(var G=this.renderNode.parentNode;!G.component;)G=G.parentNode;const H=q.O.create({__yield:this.renderNode.block});if(G.block.computedProps.length)throw new Error("Cannot clone blocks with computed props");Object.assign(H,G.block);let I=[],J=[];try{if(J=G.node.params,I=E(this.renderNode.node.attributes,"name","params"),I){if(I="Invocation"===I.value.type?I.value.value:[I.value],I.length!==J.length)throw console.log(I,J),new Error("Yield block and params have different args");J.forEach((K,N)=>{if("Literal"===I[N].type)H[K]=I[N].value;else{const P=I[N].value;(0,q.convertComputed)(H,K,{get:()=>{return this.renderNode.getPath(P)},set:null,keys:[`__yield.${P.replace(/^block./,"")}`]})}})}}catch(K){console.log(`Caught ${K}`)}this.renderNode.children=[C.RenderNode.create({node:{type:"Block",block:G.node.content},doc:this.renderNode.doc,parentNode:this.renderNode,block:H,parentElement:this.renderNode.parentElement,owner:this.renderNode.owner})];for(let K of this.renderNode.children)K.render()}}}}),define("voltage/helper",["exports"],function(g){function q(K){const N=`action${K.type}`,P=K.currentTarget.dataset[N];if(P){const{action:Q,args:R}=this.actions[`${K.type}-${P}`],T=this.block.ctx,U=T.renderNode.evalExpression(Q,{}),V=T.actions&&T.actions[U];if(!V)throw new Error(`There is no action ${U} on ${T.__oid__}`);V.apply(T,R.map(W=>this.evalExpression(W,{})).concat([K])),this.getOwner().rootNode.update()}}Object.defineProperty(g,"__esModule",{value:!0}),g.daysToMonths=function(N){return 4800*N/146097},g.monthsToDays=function(N){return 146097*N/4800};class B{constructor(K){this.fn=K}}g.Helper=B;class C{constructor(K){this.expand=!0,this.fn=K}}g.HelperExpandArgs=C;class D{constructor(K){this.expr=!0,this.fn=K}}g.HelperExpression=D;class E{constructor(K){this.content=K}}g.HTML=E;const G=/(?=^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:[,.]\d+)?(?:Z|[+-][01]\d:[0-5]\d)?$)(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:[,.]\d+)?)(.*)/,H=K=>{const N=K.toString();return 2>N.length?`0${N}`:N},I={s:45,m:45,h:22,d:26,M:11};class J{constructor(K){if("string"==typeof K)this.d=new Date(K),this.o=G.exec(K);else if(K instanceof J)this.d=new Date(K.d);else if(!K){this.d=new Date;const N=this.d.getTimezoneOffset(),P=`${0>N?"+":"-"}${Math.abs(N)/60>>0}:${Math.abs(N)%60}`;this.o=G.exec(`${this.d.toISOString().slice(0,-1)}${P}`)}else console.assert(!1,`Bad moment initialization: ${K}`);this.dddd=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],this.ddd=this.dddd.map(N=>N.slice(0,3)),this.dd=this.dddd.map(N=>N.slice(0,2)),this.MMMM=["January","Februray","March","April","May","June","July","August","September","October","November","December"],this.MMM=this.MMMM.map(N=>N.slice(0,3))}clone(){return new J(this)}monthDays(K,N){return new Date(K,N,0).getDate()}get year(){return this.d.getFullYear()}set year(K){this.d.setFullYear(K)}get month(){return this.d.getMonth()+1}set month(K){const N=this.monthDays(this.year,K);this.date>N&&(this.date=N),this.d.setMonth(K-1)}get date(){return this.d.getDate()}set date(K){this.d.setDate(K)}get hour(){return this.d.getHours()}set hour(K){this.d.setHours(K)}get minute(){return this.d.getMinutes()}set minute(K){this.d.setMinutes(K)}get second(){return this.d.getSeconds()}set second(K){this.d.setSeconds(K)}get millisecond(){return this.d.getMilliseconds()}set millisecond(K){this.d.setMilliseconds(K)}get weekday(){return this.d.getDay()}set weekday(K){const N=K-this.weekday;this.date=this.date+N}add(K,N){return"week"===N&&(K*=7,N="date"),this[N]=this[N]+K,this}startOf(K){switch(K){case"year":this.month=1;case"month":this.date=1;case"week":case"date":this.hour=0;case"hour":this.minute=0;case"minute":this.second=0;case"second":this.millisecond=0;}return"week"===K&&(this.weekday=0),this}endOf(K){return this.startOf(K).add(1,K).add(-1,"millisecond")}format(K){K=K||"YYYY-MM-DDTHH:mm:ssZ";const N={MMMM:()=>this.MMMM[this.month-1],MMM:()=>this.MMM[this.month-1],MM:()=>H(this.month),M:()=>this.month,DD:()=>H(this.date),D:()=>this.date,dddd:()=>this.dddd[this.weekday],ddd:()=>this.ddd[this.weekday],dd:()=>this.dd[this.weekday],d:()=>this.weekday,YYYY:()=>this.year,YY:()=>this.year%100,HH:()=>H(this.hour),H:()=>this.hour,hh:()=>H(this.hour%12),h:()=>this.hour%12,mm:()=>H(this.minute),m:()=>this.minute,ss:()=>H(this.second),s:()=>this.second,LL:()=>`${this.MMMM[this.month-1]} ${this.date} ${this.year}`,LT:()=>`${H(this.hour)}:${H(this.minute)}`,Z:()=>{const Q=this.d.getTimezoneOffset();return`${0>Q?"+":"-"}${H(Math.abs(Q)/60>>0)}:${H(Math.abs(Q)%60)}`}},P=new RegExp(`${Object.keys(N).join("|")}|.`,"g");return K.replace(P,Q=>{return N[Q]?N[Q]():Q})}valueOf(){return this.d.valueOf()}}g.Moment=J,g.helpers={action:new B(function([[K,...N]]){const P=N.filter(V=>"on"===V.name)[0],Q=N.filter(V=>"capture"===V.name)[0],R=P?P.value:"click";N=N.filter(V=>"on"!==V.name&&"capture"!==V.name);const T=this.getOwner().actions.id++,U=this.actions||(this.actions={});return U[`${R}-${T}`]={action:K,args:N},this.handleEvent=q,this.elements[0].addEventListener(R,this,!!Q),{name:`data-action${R}`,value:T}}),"classic-action":new B(function([K,...N]){const P=N.filter(U=>"on"===U.name)[0];N=N.filter(U=>"on"!==U.name);const Q=this.block.ctx;console.log("registering action for",this.elements[0]);const R=P?P.value:"click",T=this.getOwner().addAction(R,Q,K,N);return{name:`data-action${R}`,value:T}}),findCondition:new B(function([K],N){for(let P=0,Q=K.length;P<Q;P++){const R=K[P];if(!R)return P;if(this.evalExpression(R,N))return P}return-1}),curry:new B(function(K){return(...N)=>{return N=N.map(P=>{return{type:"Literal",value:P}}),this.evalExpression({type:"Expression",value:K[0][0].value.concat(N)},{})}}),fn:new C(function(K){return(...N)=>{return K[0].apply(this.block.ctx,K.slice(1).concat(N))}}),set:new B(function(K){return this.setPath(K[0][0].value,K[1])}),concat:new C(K=>{return K.join("")}),"if":new D(K=>{const N=K[0],P=K[1],Q=K[2];return`${N} ? ${P} : ${Q}`}),"if":new C(K=>{const N=K[0],P=K[1],Q=K[2];return N?P:Q}),"is-equal":new D(K=>`${K[0]} === ${K[1]}`),"is-equal":new C(K=>K[0]===K[1]),"is-greater":new D(K=>`${K[0]} > ${K[1]}`),"is-greater":new C(K=>K[0]>K[1]),upper:new D(K=>"undefined"==typeof K?"":`${K}.toUpperCase()`),upper:new C(K=>`${K}`.toUpperCase()),not:new C(K=>!K[0]),increment:new C(K=>K+1),"print-relatime":new C(K=>{return K[0]}),"format-timedelta":new C(K=>{K=K>>0;const N=K/3600>>0;K=K%3600;const P=K/60>>0;return(K=K%60,N)?`${H(N)}h ${H(P)}m ${H(K)}s`:P?`${H(P)}m ${H(K)}s`:`${H(K)}s`}),"format-datetime":new C((K,N)=>{return N="YYYY-MM-DD HH:mm:ss",K[0]?new J(K[0]).format(N||"YYYY-MM-DD hh:mmm:ss"):""}),"format-float":new C((K,N)=>{N="number"==typeof N?N:2;const P=Math.pow(10,N);return(K*P>>0)/P}),"format-icon":new C(K=>{return new E(`<span class="glyphicon glyphicon-${K.icon} ${K.classes}"
                 data-toggle="tooltip"
                 data-placement="top"
                 title="${K.title}">
            </span>`)}),"format-link":new C(K=>{K=K[0]||{};const N=K.external?" target=_blank":"",P=K.href,Q=K.title;return new E(`<a href="${P}" ${N}>${Q}</a>`)}),"format-pill":new C(K=>{return new E(`<span class="badge">${K}</span>`)}),"format-route":new C(K=>{return K=K[0]||{},K.route=K.route,new E(`<a href="${window.location.pathname}#/${K.route.replace(".","/")}/${K.id}">${K.title}</a>`)}),"format-filesize":new C(K=>{if(0===K[0])return"0.00 B";const N=Math.floor(Math.log(K[0])/Math.log(1024));return(K[0]/Math.pow(1024,N)).toFixed(2)+" "+" KMGTP".charAt(N)+"B"}),"format-string":new C(K=>K),"format-int":new C(K=>K)}}),define("voltage/m",["exports","voltage/helper","voltage/observable","voltage/render-node","voltage/component","voltage/router"],function(g,q,B,C,D,E){Object.defineProperty(g,"__esModule",{value:!0}),g.M=void 0,"object"!=typeof document&&(global.document={});class G extends B.O{constructor(){super(),this.id=1,this.components=D.components,this.helpers=q.helpers,this.singletons={},this.rootElement="body",this.actions={id:0}}documentReady(){const H=document.querySelector(this.rootElement)||document.body;this.router=E.Router.create({owner:this,routes:this.routes}),this.rootNode=C.RenderNode.create({node:{type:"Block",block:[{type:"Component",name:"application-route",attributes:[],content:[]}]},doc:document,parentNode:null,block:B.O.create({}),parentElement:H,owner:this}),console.time("rootNode::render"),this.rootNode.render(),console.timeEnd("rootNode::render"),this.singletons["application-route"]=this.rootNode.children[0].component,this.rootNode.children[0].component.modelHook(),this.router.updateFromLocation(),window.onpopstate=()=>this.router.updateFromLocation()}lookup(H){if(!this.singletons[H]){let I=this.components[H];this.singletons[H]=I?I.create({__name:H,owner:this}):D.RoutableComponent.create({__name:H,owner:this,template:`
                        Autogenerated routable component ${H}
                        <div class="${H}">{{outlet}}</div>
                    `})}return this.singletons[H]}init(){if(~["interactive","complete"].indexOf(document.readyState))setTimeout(()=>this.documentReady(),0);else{const H=document.onreadystatechange;document.onreadystatechange=()=>{H&&H(),~["interactive","complete"].indexOf(document.readyState)&&(document.onreadystatechange=H,this.documentReady())}}}ajax(H){if(H.method=H.method||"GET",H.data&&"GET"===H.method){const I=[];for(let[J,K]of Object.entries(H.data))I.push(`${J}=${encodeURIComponent(K)}`);H.url=`${H.url}?${I.join("&")}`}return new Promise((I,J)=>{const K=new XMLHttpRequest;H.sync?K.open(H.method,H.url,!1):(K.open(H.method,H.url),K.responseType="json");let N=3;const P=this;this.rootNode.update(),K.onprogress=Q=>{N=N+(100-N)/2,console.log("progress",N),this.xhrProgress=N,this.rootNode.update()},K.onloadend=Q=>{console.log("progress",Q.loaded),this.xhrProgress=0,this.rootNode.update()},K.onload=function(){200<=this.status&&300>this.status?(P.ajaxError=null,I(K.response)):(P.ajaxError=K.statusText,J({status:this.status,statusText:K.statusText}))},K.onerror=function(){P.ajaxError=K.statusText,J({status:this.status,statusText:K.statusText})},"GET"!==H.method&&H.data?(K.setRequestHeader("Content-Type","application/json;charset=UTF-8"),K.send(JSON.stringify(H.data))):K.send()})}}g.M=G}),define("voltage/observable",["exports"],function(g){function q(T){return T instanceof R||T instanceof P}function B(T,U,V,W){const X=+U;isNaN(X)||(U="@each");const Y=T[H.watched],Z=Y[U];if(Z)for(let $ in Z){const _=Z[$];_.subtree._hasLeaf&&("@each"===U&&isNaN(X)?(V.forEach(da=>{q(da)&&D(da,_.origin,_.subtree,$)}),W.forEach(da=>{q(da)&&C(da,_.origin,_.subtree,$)})):(q(V)&&D(V,_.origin,_.subtree,$),q(W)&&C(W,_.origin,_.subtree,$)));const aa=_.origin.target,ba=_.origin.property,ca=aa[H.watchers][ba];ca.cached&&(ca.cached=!1,B(aa,ba))}}function C(T,U,V,W){const X=T[H.watched];for(let Y in V){const Z=V[Y],$=`${W}.${Y}`;if(X[Y]||(X[Y]={}),X[Y][$]={origin:U,subtree:Z},!!Z._hasLeaf)if("@each"==Y)for(let _=0,aa=T.length;_<aa;_++){const ba=T[_];q(ba)&&C(ba,U,Z,$)}else{const _=T[H.watchers][Y];if(!_||_.cached){const aa=T[Y];q(aa)&&C(aa,U,Z,$)}}}}function D(T,U,V,W){const X=T[H.watched];for(let Y in V){const Z=V[Y],$=`${W}.${Y}`;if(delete X[Y][$],!!Z._hasLeaf)if("@each"==Y)for(let _=0,aa=T.length;_<aa;_++){const ba=T[_];q(ba)&&D(ba,U,Z,$)}else{const _=T[H.watchers][Y];if(!_||_.cached){const aa=T[Y];q(aa)&&D(aa,U,Z,$)}}}}function E(T){const U=T.join("");if(!K[U]){const V={};T.forEach(W=>{const X=W.split(".");let Y=V;for(let Z=0,$=X.length;Z<$;Z++){const _=X[Z];Y._hasLeaf=!0,Y[_]||(Y[_]={},Object.defineProperty(Y[_],"_hasLeaf",{value:!1,enumerable:!1,writable:!0})),Y=Y[_]}}),K[U]=V}return K[U]}function G(T,U,V){T[H.watchers][U]={keys:V.keys,value:null,cached:!1};const W=T[H.watchers][U];T[H.computed].push(U),Object.defineProperty(T,U,{get(){if(!W.cached){const X=W.value;W.value=V.get.apply(T),B(T,U,X,W.value),W.cached=!0}return W.value},set(X){V.set&&V.set.apply(this,arguments);const Y=this[H.watchers][U];Y.cached=!0,Y.value=X}}),V.keys.length&&C(T,{target:T,property:U},E(V.keys),`${T[H.uuid]}.${U}:`),T[H.watched][U]&&B(T,U,"","")}Object.defineProperty(g,"__esModule",{value:!0}),g.computed=function(...U){let V=U.pop(),W=null;return"object"==typeof V&&(W=V.set,V=V.get),new J(U,V,W)},g.convertComputed=G,g.updateComputed=function(U,V,W){const X=U[H.watchers][V];if(W.length!==X.keys.length||W.some(Y=>!~X.keys.indexOf(Y))){const Y={target:U,property:V};X.keys.length&&D(U,Y,E(X.keys),`${U[H.uuid]}.${V}`),W.length&&C(U,Y,E(W),`${U[H.uuid]}:${V}`),U[H.watchers][V].keys=W}};const H={uuid:"__uuid__",watchers:"__watchers__",watched:"__watched__",computed:Symbol("computed")};let I=0;class J{constructor(T,U,V=null){this.keys=T,this.get=U,this.set=V}}g.Computed=J;const K={},N={set(T,U,V){const W=T[U];return!(W!==V)||(B(T,U,W,V),T[U]=V,!0)},get(T,U){if(T instanceof P){if("instance"===U)return T;if("splice"===U)return function(V,W,...X){const Y=T.splice.apply(T,arguments);return B(T,"@each",Y,X),X.length!==Y.length&&B(T,"length"),Y};if("push"===U)return function(V){return this.splice(this.length,0,V)};if("pop"===U)return function(){return this.splice(this.length-1,1)};if("unshift"===U)return function(V){return this.splice(0,0,V)};if("shift"===U)return function(){return this.splice(0,1)}}return T[U]}};class P extends Array{constructor(){super(),Object.defineProperties(this,{[H.watchers]:{enumerable:!1,value:{}},[H.watched]:{enumerable:!1,value:{}},[H.uuid]:{enumerable:!1,value:I++},[H.computed]:{enumerable:!1,value:[]}})}static create(T){const U=T instanceof Array?P.from(T):new P;return new Proxy(U,N)}}g.A=P;const Q={get(T,U){return"instance"===U?T:T[U]},set(T,U,V){if(T[H.watched][U]){const W=T[U];if(W===V)return!0;B(T,U,W,V)}return T[U]=V,!0}};class R{constructor(){Object.defineProperties(this,{[H.watchers]:{enumerable:!1,value:{}},[H.watched]:{enumerable:!1,value:{}},[H.uuid]:{enumerable:!1,value:I++},[H.computed]:{enumerable:!1,value:[]}})}static create(T){const U=new this;for(let W in Object.assign(U,T),U){const X=U[W];X instanceof J&&G(U,W,X)}const V=new Proxy(U,Q);return V.init(),V}init(){}dispose(){}get __oid__(){return`${this.constructor.name}(${this[H.uuid]})`}get computedProps(){return this[H.computed]}get watcherProps(){return this[H.watchers]}get watchedProps(){return this[H.watched]}getOwner(){return this.owner}}g.O=R}),define("voltage/parser3",["exports"],function(g){Object.defineProperty(g,"__esModule",{value:!0}),g.parse=function(I){return new G({input:I}).build()};const q=H=>/[A-Za-z]/.test(H),B=H=>/[0-9]/.test(H),C=H=>/[0-9A-Za-z]/.test(H),D=H=>/[\t\n\f ]/.test(H),E={data(){const H=this.consume();"&"===H?(this.returnState="data",this.state="cref"):"<"===H?this.state="tagOpen":"{"===H?(this.returnState="data",this.state="mustacheOpen"):this.emit({type:"Literal",value:H})},tagOpen(){const H=this.consume();if("/"===H)this.state="endTagOpen";else if(q(H))this.token={type:"StartTag",name:"",attrs:[]},this.state="tagName",this.pos--;else if("!"===H)this.state="commentStart";else throw new Error("Tagname expected?")},endTagOpen(){const H=this.consume();if(q(H))this.token={type:"EndTag",name:"",attrs:[]},this.state="tagName",this.pos--;else if(">"===H)throw new Error("No tagname in closing tag")},tagName(){const H=this.consume();D(H)?this.state="beforeAttributeName":"/"===H?this.state="selfClosingStartTag":">"===H?(this.state="data",this.emit(this.token)):this.token.name+=H},beforeAttributeName(){const H=this.consume();if(D(H));else if("/"===H||">"===H)this.pos--,this.state="afterAttributeName";else if("="===H)throw new Error("Tagname cannot start with =");else"{"===H?(this.attr={name:"",value:[]},this.token.attrs.push(this.attr),this.returnState="beforeAttributeName",this.state="attributeMustacheOpen"):(this.attr={name:"",value:[]},this.token.attrs.push(this.attr),this.pos--,this.state="attributeName")},attributeName(){const H=this.consume();D(H)||"/"===H||">"===H?(this.pos--,this.state="afterAttributeName"):"="===H?this.state="beforeAttributeValue":this.attr.name+=H},afterAttributeName(){const H=this.consume();if(D(H));else if("/"===H)this.state="selfClosingStartTag";else if("="===H)this.state="beforeAttributeValue";else if(">"===H)this.state="data",this.emit(this.token);else if("{"===H)throw this.attr={name:"",value:[]},this.token.attrs.push(this.attr),this.returnState="afterAttributeName",this.state="attributeMustacheOpen",new Error("TODO: Check what triggers this");else this.attr={name:"",value:[]},this.token.attrs.push(this.attr),this.pos--,this.state="attributeName"},beforeAttributeValue(){const H=this.consume();if(D(H));else if("\""===H||"'"===H)this.q=H,this.state="attributeValueQ";else if(">"===H)throw new Error("Expected attribute value");else this.pos--,this.state="attributeValueU"},attributeValueQ(){const H=this.consume();if(H===this.q)this.state="afterAttributeValueQ";else if("&"===H)this.returnState="attributeValueQ",this.state="cref";else if("{"===H)this.returnState="attributeValueQ",this.state="attributeValueMustacheOpen";else{const I=this.attr.value.slice(-1)[0];I&&"Literal"===I.type?I.value+=H:this.attr.value.push({type:"Literal",value:H})}},attributeValueU(){const H=this.consume();if(D(H))this.state="beforeAttributeName";else if("&"===H)this.returnState="attributeValueU",this.state="cref";else if(">"===H)this.state="data",this.emit(this.token);else if("{"===H)this.returnState="attributeValueU",this.state="attributeValueMustacheOpen";else{const I=this.attr.value.slice(-1)[0];I&&"Literal"===I.type?I.value+=H:this.attr.value.push({type:"Literal",value:H})}},afterAttributeValueQ(){const H=this.consume();if(D(H))this.state="beforeAttributeName";else if("/"===H)this.state="selfClosingStartTag";else if(">"===H)this.state="data",this.emit(this.token);else throw new Error("Unexpected token after attribute")},selfClosingStartTag(){const H=this.consume();if(">"===H)this.token.selfClosing=!0,this.state="data",this.emit(this.token);else throw new Error("Unexpected token / in self closing")},commentStart(){const H=this.consume();if("-"===H)this.state="commentStartDash";else if(">"===H)throw new Error("Unexpected token");else this.pos--,this.state="comment"},commentStartDash(){const H=this.consume();if("-"===H)this.state="commentEnd";else if(">"===H)throw new Error("Unexpected token");else this.commentToken=H,this.pos--,this.state="comment"},comment(){const H=this.consume();"<"===H?(this.commentToken+=H,this.state="commentLessThanSign"):"-"===H?this.state="commentEndDash":this.commentToken+=H},commentLessThanSign(){const H=this.consume();"!"===H?(this.commentToken+=H,this.state="commentLessThanSignBang"):"<"===H?this.commentToken+=H:(this.pos--,this.state="comment")},commentLessThanSignBang(){const H=this.consume();"-"===H?this.state="commentLessThanSignBangDash":(this.pos--,this.state="comment")},commentLessThanSignBangDash(){const H=this.consume();"-"===H?this.state="commentLessThanSignBangDashDash":(this.pos--,this.state="commentEndDash")},commentLessThanSignBangDashDash(){const H=this.consume();if(">"===H)this.pos--,this.state="comment";else throw new Error("Unexpected token")},commentEndDash(){const H=this.consume();"-"===H?this.state="commentEnd":(this.commentToken+="-",this.pos--,this.state="comment")},commentEnd(){const H=this.consume();">"===H?(this.state="data",this.emit({type:"comment",value:this.commentToken})):"!"===H?this.state="commentEndBang":"-"===H?this.commentToken+=H:(this.commentToken+="--",this.pos--,this.state="comment")},commentEndBang(){const H=this.consume();if("-"===H)this.commentToken+="--!",this.state="commentEndDash";else if(">"===H)throw new Error("Unexpected token");else this.commentToken+="--!",this.pos--,this.state="comment"},cref(){const H={nbsp:"\xA0",times:"\xD7",laquo:"\xAB",raquo:"\xBB"};this.t="&";const I=this.consume();if(D(I)||"<"===I||"&"===I)this.pos--,this.state="characterReferenceEnd";else if("#"===I)this.t+=I,this.state="numericCharacterReference";else{this.t+=I;for(let J=Object.keys(H).filter(P=>P[0]===I);J.length;)this.t+=this.consume(),J=J.filter(P=>P[this.t.length-2]===this.t.slice(-1));const K=this.t.slice(1,-1),N=this.t.slice(-1);if(!(K in H)){if(/^[a-zA-Z0-9]+$/.test(K)&&";"===N)throw new Error(`"${K}" is not a named entity`);else this.pos-=this.t.length-1,this.t="&",this.state="characterReferenceEnd";}else if(("attributeValueQ"===this.returnState||"attributeValueU"===this.returnState)&&("="===N||q(N)))this.state="characterReferenceEnd";else if(";"!==N)throw new Error(`Character reference &${K} not terminated with ";"`);else this.t=H[K],this.state="characterReferenceEnd"}},numericCharacterReference(){this.v=0;const H=this.consume();"x"===H||"X"===H?(this.t+=H,this.state="hexadecimalCharacterReferenceStart"):(this.pos--,this.state="decimalCharacterReferenceStart")},hexadecimalCharacterReferenceStart(){const H=this.consume();if(C(H))this.pos--,this.state="hexadecimalCharacterReference";else throw new Error("Hex digit expected")},decimalCharacterReferenceStart(){const H=this.consume();if(B(H))this.pos--,this.state="decimalCharacterReference";else throw new Error("Digit expected")},hexadecimalCharacterReference(){const H=this.consume();if(C(H))this.v*=16,this.v+=parseInt(H,16);else if(";"===H)this.state="numericCharacterReferenceEnd";else throw new Error(`Hex digit or ; expected. Got ${H} instead`)},decimalCharacterReference(){const H=this.consume();if(B(H))this.v*=10,this.v+=parseInt(H,10);else if(";"===H)this.state="numericCharacterReferenceEnd";else throw new Error("Hex digit or ; expected")},numericCharacterReferenceEnd(){this.t=String.fromCharCode(this.v),this.state="characterReferenceEnd"},characterReferenceEnd(){if("attributeValueQ"===this.returnState||"attributeValueU"===this.returnState){const H=this.attr.value.slice(-1)[0];H&&"Literal"===H.type?H.value+=this.t:this.attr.value.push({type:"Literal",value:this.t})}else this.emit({type:"Literal",value:this.t});this.state=this.returnState},mustacheOpen(){const H=this.consume();"{"===H?this.state="mustache":(this.emit({type:"Literal",value:"{"}),this.pos--,this.state=this.returnState)},attributeMustacheOpen(){const H=this.consume();"{"===H?this.state="mustache":(this.pos-=2,this.state="attributeName")},attributeValueMustacheOpen(){const H=this.consume();if("{"===H)this.state="mustache";else throw new Error("Need to back track if not double { in attr value")},mustache(){const H=this.consume();"!"===H?(this.mtoken={type:"MustacheComment",value:""},this.state="mustacheComment"):(this.mtoken={type:"MustacheContent",value:[]},this.mstack=[this.mtoken.value],this.pos--,this.state="mustacheContent")},mustacheComment(){const H=this.consume();"}"===H?this.state="mustacheCommentEnd":this.mtoken.value+=H},mustacheCommentEnd(){const H=this.consume();if("}"===H){if("data"===this.returnState)this.emit(this.mtoken);else throw new Error("Cannot emit mustache comment inside tag");this.state=this.returnState}else this.mtoken.value+="}",this.mtoken.value+=H,this.state="mustacheComment"},mustacheContent(){const H=this.consume();if("#"===H)this.mstack.slice(-1)[0].push({type:"BlockOpen",value:""}),this.state="mustacheBlockOpen";else if("/"===H)this.mstack.slice(-1)[0].push({type:"BlockClose",value:""}),this.state="mustacheBlockClose";else if("|"===H)this.mstack.slice(-1)[0].push({type:"BlockParams",value:""}),this.state="mustacheBlockParams";else if("\""===H)this.mstack.slice(-1)[0].push({type:"Literal",value:""}),this.state="mustacheLiteral";else if(B(H))this.mstack.slice(-1)[0].push({type:"Literal",value:+H}),this.state="mustacheLiteralNumber";else if("("===H){const I={type:"Expression",value:[]};this.mstack.slice(-1)[0].push(I),this.mstack.push(I.value)}else if(")"===H){if(1===this.mstack.length)throw new Error("Stray \")\" in mustache found");this.mstack.pop()}else if(q(H))this.mstack.slice(-1)[0].push({type:"Identifier",value:H}),this.state="mustacheIdentifier";else if(D(H));else if("}"===H)this.state="mustacheEndOrFail";else throw new Error(`Mustache content broken "${H}"`)},mustacheBlockOpen(){const H=this.consume();if(D(H))this.state="mustacheContent";else if("}"===H)this.state="mustacheEndOrFail";else if(q(H))this.mstack.slice(-1)[0].slice(-1)[0].value+=H;else throw new Error("Unexpected token '}'")},mustacheBlockClose(){const H=this.consume();if("}"===H)this.state="mustacheEndOrFail";else if(q(H))this.mstack.slice(-1)[0].slice(-1)[0].value+=H;else throw new Error(`Unexpected token \'${H}\'`)},mustacheBlockParams(){const H=this.consume();"|"===H?this.state="mustacheContent":this.mstack.slice(-1)[0].slice(-1)[0].value+=H},mustacheLiteral(){const H=this.consume();"\""===H?this.state="mustacheContent":this.mstack.slice(-1)[0].slice(-1)[0].value+=H},mustacheLiteralNumber(){const H=this.consume();if(B(H))this.mstack.slice(-1)[0].slice(-1)[0].value*=10,this.mstack.slice(-1)[0].slice(-1)[0].value+=+H;else if(D(H)||")"===H)this.pos--,this.state="mustacheContent";else if("}"===H)this.state="mustacheEndOrFail";else throw new Error(`Cannot parse digit ${H}`)},mustacheIdentifier(){const H=this.consume(),I=["undefined","null","true","false"];if(D(H)||")"===H){this.pos--;const J=this.mstack.slice(-1)[0].slice(-1)[0];if(~I.indexOf(J.value)){J.type="Literal";const K=J.value[0];J.value="u"===K?void 0:"n"===K?null:!("t"!==K)}this.state="mustacheContent"}else if("}"===H){const J=this.mstack.slice(-1)[0].slice(-1)[0];if(~I.indexOf(J.value)){J.type="Literal";const K=J.value[0];J.value="u"===K?void 0:"n"===K?null:!("t"!==K)}this.state="mustacheEndOrFail"}else if("="===H){const J=this.mstack.slice(-1)[0].slice(-1)[0];J.type="Key",this.state="mustacheContent"}else if(q(H)||"-"===H||"."===H||"_"===H)this.mstack.slice(-1)[0].slice(-1)[0].value+=H;else throw new Error(`Unexpected token "${H}"`)},mustacheEndOrFail(){const H=this.consume();if("}"===H){if(1!==this.mstack.length)throw new Error("Not all expressions closed");"data"===this.returnState?this.emit(this.mtoken):this.attr.value.push(this.mtoken),this.state=this.returnState}else throw new Error(`Unexpected token "${H}" after "}"`)}};class G{constructor({input:H}){this.input=H,this.pos=0,this.state="data"}consume(){return this.input[this.pos++]}emit(H){if("EndTag"===H.type)if(H.selfClosing)throw new Error("EndTags cannot be self-closing");else if(H.attrs.length)throw new Error("EndTags cannot have attrs");this.tokens.push(H)}tokenize(){for(this.tokens=[];this.pos<this.input.length;)E[this.state].call(this);return this.tokens}build(){const H=["br","img","input"],I=[{name:"root",content:[],params:[]}],J=N=>{return~I.reduce((P,Q)=>P.concat(Q.params),[]).indexOf(N.split(".")[0])},K=N=>{if("Identifier"===N.type)return{type:"Identifier",value:`block.${J(N.value)?"":"ctx."}${N.value}`};return"Expression"===N.type||"Invocation"===N.type?{type:N.type,value:N.value.map(K).reduce((P,Q)=>{const R=P.slice(-1)[0];return R&&"Key"===R.type?(R.name=R.value,R.type=Q.type,R.value=Q.value,P):P.concat([Q])},[])}:N};try{this.tokenize()}catch(N){const P=this.input.split("\n");for(let Q=this.pos,R=0;Q>P[R].length;)Q-=P[R].length+1,R++;throw new Error(`
                Line content: ${P[R]}
                Parser error at line: ${R+1} col: ${Q} abs: ${this.pos}
                ${N.message}
            `)}for(let N of this.tokens)if("Literal"===N.type){const P=I.slice(-1)[0].content.slice(-1)[0];P&&"Literal"===P.type?P.value+=N.value:I.slice(-1)[0].content.push(N)}else if("StartTag"===N.type){let P=N.attrs.map(T=>{return"as"===T.name?T:(T.value=T.value.map(U=>{return"MustacheContent"===U.type&&(1<U.value.length?U.type="Invocation":1===U.value.length&&(U=U.value[0])),U}),1<T.value.length?T.value=K({type:"Expression",value:[{type:"Literal",value:"concat"}].concat(T.value)}):1===T.value.length&&(T.value=K(T.value[0])),T)});const Q=P.filter(T=>"as"===T.name),R={type:/-/.test(N.name)?"Component":"Tag",name:N.name,attributes:P.filter(T=>"as"!==T.name),params:Q.length?Q[0].value[0].value.split(" "):[],content:[]};I.slice(-1)[0].content.push(R),~H.indexOf(N.name)||N.selfClosing||I.push({name:N.name,content:R.content,params:R.params})}else if("EndTag"===N.type){if(N.name!==I.slice(-1)[0].name)throw new Error(`Unexpected end tag ${N.name}`);else I.pop();}else if("MustacheComment"===N.type||"comment"===N.type);else if("MustacheContent"===N.type){const[P,...Q]=N.value;if("Identifier"===P.type||"Expression"===P.type){if("else"===P.value){const R=I.slice(-1)[0];if("each"===R.name){if(Q.length)throw new Error("Malformed else on each");const T=I.slice(-2)[0].content.slice(-1)[0];T.catchempty=[],R.content=T.catchempty}else if("if"===R.name){Q.length&&"if"===Q[0].value&&Q.shift();const T=I.slice(-2)[0].content.slice(-1)[0],U=Q[0]?K(Q[0]):null;T.branches.push({condition:U,content:[]}),R.content=T.branches.slice(-1)[0].content}else throw new Error(`Mustache else out of scope ${R.name}`)}else Q.length?I.slice(-1)[0].content.push(K({type:"Invocation",value:N.value})):I.slice(-1)[0].content.push(K(P));}else if("BlockOpen"===P.type){let R;"each"===P.value?(R={type:"Loop",list:K(Q[0]),params:Q[2].value.split(" "),content:[]},I.slice(-1)[0].content.push(R),I.push({name:P.value,content:R.content,params:Q[2].value.split(" ")})):"if"===P.value?(R={type:"Condition",branches:[{condition:K(Q[0]),content:[]}]},I.slice(-1)[0].content.push(R),I.push({name:P.value,content:R.branches[0].content})):(R={type:"Block",name:P.value,attributes:Q.map(K),content:[]},I.slice(-1)[0].content.push(R),I.push({name:P.value,content:R.content}))}else if(!("BlockClose"===P.type))throw new Error(`Do not know ${P.type}`);else if(P.value!==I.slice(-1)[0].name)throw new Error(`Unexpected end tag ${P.value}`);else I.pop()}else throw new Error(`Unknown type ${N.type}`);if(1!==I.length)throw new Error(`Unclosed element ${I[1].name}`);return I[0].content}}g.ASTBuilder=G}),define("voltage/render-node",["exports","voltage/observable","voltage/helper"],function(g,q,B){Object.defineProperty(g,"__esModule",{value:!0}),g.RenderNode=void 0;const C={};class D extends q.O{constructor(E){super(E),this.dynamicChildren=[]}addDynamic(E){this.computedProps.length||this.component||!this.parentNode?(this.dynamicChildren.push(E),delete this.updateFn):this.parentNode.addDynamic(E)}removeDynamic(E){this.computedProps.length||this.component||!this.parentNode?(this.dynamicChildren.splice(this.dynamicChildren.indexOf(E),1),delete this.updateFn):this.parentNode.removeDynamic(E)}init(){Object.defineProperty(this,"parentNode",{enumerable:!1,value:this.parentNode})}getPath(E){if(!C[E]){console.assert("block."===E.substr(0,6),`Path should start with block., ${E}`);const G=E.split(".");let H=["obj = obj.block;"];for(let I=1,J=G.length-1;I<J;I++)H.push(`
                    if (typeof obj === 'object') {
                        obj = obj.${G[I]};
                    } else {
                        return '';
                    }
                `);H.push(`return obj ? obj.${G[G.length-1]} : '';`),C[E]=new Function("obj",H.join("\n"))}return C[E](this)}setPath(E,G){const H=E.split(".");let I=this;for(let J=0,K=H.length-1;J<K;J++)if(I=I[H[J]],"object"!=typeof I)throw new Error(`Cannot set path ${E} to ${G}`);I[H[H.length-1]]=G}getHelper(E){const G=this.getOwner().helpers[E];if(!G)throw new Error(`Helper ${E} does not exist.`);return G}evaluate(E,G,H,I){if("Literal"===E.type)return~G.indexOf(E.value)||G.push(E.value),`__lit[${G.indexOf(E.value)}]`;if("Identifier"===E.type)return~H.indexOf(E.value)||H.push(E.value),`__ide[${H.indexOf(E.value)}]`;if("Expression"===E.type||"Invocation"===E.type){if("noexpand"===E.value[0].value)return G.push(E.value.slice(1)),`__lit[${G.length-1}]`;const J=this.evaluate(E.value[0],G,H,I),K=`obj.getHelper(${J})`;~I.indexOf(K)||I.push(K);const N=`__con${I.indexOf(K)}`,P=E.value.slice(1).map(Q=>this.evaluate(Q,G,H,I));return`(${N}.expr ? ${N}.fn.call(obj, ${P}) : ${N}.fn.call(obj, [${P}], triggers))`}throw new Error(`${E.type} is no good`)}evalExpression(E,G){if("Literal"===E.type)return E.value;if("Identifier"===E.type)return G[E.value]=!0,this.getPath(E.value);if(!E.fn){const H=[],I=[],J=[],K=this.evaluate(E,H,I,J),N=[];for(let P in I)N.push(`triggers["${I[P]}"] = true;`);for(let P=0;P<J.length;P++)N.push(`const __con${P} = ${J[P]};`);N.push(`return ${K};`),E.fn=new Function("obj","triggers","__lit","__ide",N.join("\n")),E.__lit=H,E.__ide=I}return E.fn(this,G,E.__lit,E.__ide.map(H=>this.getPath(H)))}createUpdater(E,G,H){(0,q.convertComputed)(this,E,{get(){let I={};const J=this.evalExpression(G,I);if("Loop"===this.node.type){const K=`${Object.keys(I)[0]}.@each`;I={},I[K]=!0}H.apply(this,[J]),(0,q.updateComputed)(this,E,Object.keys(I))},set:null,keys:[]}),this[E]}render(){const E=this.node,G=this.instance;if("Block"===E.type){G.children=[];for(let I=0,J=E.block.length;I<J;I++)G.children.push(D.create({node:E.block[I],doc:G.doc,parentNode:this,block:G.block,parentElement:G.parentElement,owner:G.owner}));for(let I=0,J=G.children.length;I<J;I++)G.children[I].render()}else if("Tag"===E.type){const I=G.doc.createElement(E.name);G.parentElement.appendChild(I),G.elements=[I];for(let K=0,N=E.attributes.length;K<N;K++){const P=E.attributes[K];if(P.name)"Literal"===P.value.type?I.setAttribute(P.name,P.value.value):this.createUpdater(`watch-${P.name}`,P.value,Q=>{"undefined"!=typeof Q&&!1!==Q?I.setAttribute(P.name,Q):I.removeAttribute(P.name)});else{let Q=null;this.createUpdater(`watch-${Math.random()}`,P.value,R=>{R?(Q=R.name,I.setAttribute(Q,R.value)):Q&&(I.removeAttribute(Q),Q=null)})}}const J=q.A.from(E.content.map(K=>{return D.create({node:K,doc:G.doc,parentNode:this,block:G.block,parentElement:I,owner:G.owner})}));for(let K=0,N=J.length;K<N;K++)J[K].render();G.children=J}else if("Literal"===E.type){const I=G.doc.createTextNode(E.value);G.parentElement.appendChild(I),G.elements=[I]}else if("Identifier"===E.type&&"block.ctx.outlet"===E.value){for(var H=this;H&&!H.component;)H=H.parentNode;H.outlet=this,this.createUpdater("watch-outlet",E,I=>{if(this.component&&this.component.unrender(),I){I.renderNode=this,I.render();const J=this.getNextElement();this.getElements().forEach(K=>this.parentElement.insertBefore(K,J))}this.component=I,delete this.updateFn})}else if("Identifier"===E.type||"Expression"===E.type){const I=this.doc.createTextNode("");this.parentElement.appendChild(I),this.elements=[I],this.createUpdater("watch-content",E,J=>{"undefined"==typeof J&&(J="");const K=this.elements;if(J instanceof B.HTML){const N=this.doc.createElement("div");N.innerHTML=J.content,this.elements=Array.from(N.children),this.elements.forEach(P=>this.parentElement.insertBefore(P,K[0])),K.forEach(P=>P.remove())}else{const N=this.doc.createTextNode(J);this.elements=[N],this.parentElement.insertBefore(N,K[0]),K.forEach(P=>P.remove())}})}else if("Invocation"===E.type)throw new Error("do not use invocation");else if("Condition"===E.type)E.expr||(E.expr={type:"Expression",value:[{type:"Literal",value:"findCondition"},{type:"Literal",value:E.branches.map(I=>I.condition)}]}),this.createUpdater("watch-condition",E.expr,I=>{if(G.branch!==I){G.children&&(G.children.forEach(K=>K.dispose()),G.children=void 0),G.branch=I;const J=E.branches[I];if(J){G.children=q.A.from(J.content.map(N=>{return D.create({node:N,doc:G.doc,parentNode:this,block:G.block,parentElement:G.parentElement,owner:G.owner})}));for(let N=0,P=G.children.length;N<P;N++)G.children[N].render();const K=this.getNextElement();G.getElements().forEach(N=>G.parentElement.insertBefore(N,K))}delete this.updateFn}});else if("Loop"===E.type)this.createUpdater("watch-loop",E.list,I=>{if(I&&I.length){G.children||(G.children=q.A.create());for(let K=I.length,N=G.children.length;K<N;K++)G.children[K].dispose();G.children.splice(I.length,G.children.length-I.length);for(let K=0,N=I.length;K<N;K++)if(K>=G.children.length){100<I.length&&0==K&&(console.time("loop create"),console.log("start")),100<I.length&&K==I.length-1&&(console.timeEnd("loop create"),console.log("stop")),100<I.length&&0==K%100&&console.log(K);const P=q.O.create({});Object.assign(P,G.block),E.params[0]&&(P[E.params[0]]=I[K]),E.params[1]&&(P[E.params[1]]=K),G.children.push(D.create({node:{type:"Block",block:E.content},doc:G.doc,parentNode:this,block:P,parentElement:G.parentElement,owner:G.owner})),G.children[K].render()}else if(G.children[K].node.block!=E.content){console.log("readd",K);const P=q.O.create({});Object.assign(P,G.block),E.params[0]&&(P[E.params[0]]=I[K]),E.params[1]&&(P[E.params[1]]=K),G.children[K].dispose(),G.children[K]=D.create({node:{type:"Block",block:E.content},doc:G.doc,parentNode:this,block:P,parentElement:G.parentElement,owner:G.owner}),G.children[K].render()}else G.children[K].block[E.params[0]]=I[K]}else if(E.catchempty){G.children&&(G.children.forEach(K=>K.dispose()),G.children=void 0),G.children=q.A.create([D.create({node:{type:"Block",block:E.catchempty},doc:G.doc,parentNode:this,block:G.block,parentElement:G.parentElement,owner:G.owner})]);for(let K=0,N=G.children.length;K<N;K++)G.children[K].render()}else G.children&&(G.children.forEach(K=>K.dispose()),G.children=void 0);const J=G.getNextElement();G.getElements().forEach(K=>G.parentElement.insertBefore(K,J)),delete this.updateFn});else if("Component"===E.type){const I=G.getOwner().components[E.name];if(!I)throw new Error(`Component ${E.name} does not exist`);G.component=I.create({renderNode:this,owner:G.owner}),G.component.render()}else throw new Error(`AST node ${E.type} is not known`);this.parentNode&&(this.computedProps.length||this.component)&&this.parentNode.addDynamic(this)}dispose(){this.component&&this.component.dispose(),this.children&&this.children.forEach(E=>E.dispose()),this.elements&&this.elements.forEach(E=>E.remove()),this.parentNode&&(this.computedProps.length||this.component)&&this.parentNode.removeDynamic(this),super.dispose()}getElements(){return this.elements||this.children&&this.children.reduce((E,G)=>E.concat(G.getElements()),[])||[]}getNextElement(){if(!this.parentNode)return null;const E=this.parentNode.children;if(!E){if(this.parentNode.elements)return null;return this.parentNode.getNextElement()}let G=-1;E.forEach((I,J)=>{I.node===this.node&&(G=J)});const H=E.slice(G+1).reduce((I,J)=>I.concat(J.getElements()),[]);if(H.length)return H[0];return this.parentNode.elements?null:this.parentNode.getNextElement()}update(){if(!this.updateFn){const E=[],G=this.computedProps;G.forEach(H=>E.push(`this['${H}'];`)),this.dynamicChildren.length&&(E.push("if (!this.updateFn) { return this.update(); }"),E.push("const children = this.dynamicChildren;"),this.dynamicChildren.forEach((H,I)=>E.push(`children[${I}].update();`))),this.updateFn=new Function(E.join("\n"))}return this.updateFn()}}g.RenderNode=D}),define("voltage/router",["exports","voltage/observable"],function(g,q){function B(D){return function(){var E=D.apply(this,arguments);return new Promise(function(G,H){function I(J,K){try{var N=E[J](K),P=N.value}catch(Q){return void H(Q)}return N.done?void G(P):Promise.resolve(P).then(function(Q){I("next",Q)},function(Q){I("throw",Q)})}return I("next")})}}Object.defineProperty(g,"__esModule",{value:!0}),g.Router=void 0;class C extends q.O{init(){super.init(),this.stack=[],this.currentTransition=null,this.currentRoute=null}locationToPath(){if("object"!=typeof window)return{query:null,path:null};const D={},E=window.location.search.substr(1).split("&").filter(H=>H);for(let H=0,I=E.length;H<I;H++){const J=E[H],K=J.substr(0,J.indexOf("=")),N=J.slice(K.length+1);D[K]=N}let G=window.location.hash;return"#"===G[0]&&(G=G.slice(1)),{query:D,path:G}}updateFromLocation(){this.performTransition(this.pathToStack(this.locationToPath()))}stackToLocation(D){const E=[];for(let[H,I]of Object.entries(D[0].query))E.push(`${H}=${I.replace(/&/,"%26")}`);let G="";return E.length&&(G+=`?${E.join("&")}`),G+"#/"+D.map(H=>{return"undefined"==typeof H.route.path?H.route.name:H.route.path}).filter(H=>H).join("/")}transitionTo({route:D,models:E,query:G}){D=D||this.currentRoute,E=E||[],G=Object.assign(this.locationToPath().query,G),console.assert(!E.length,"Model passing not implemented yet");const H=[];for(let I of D.split("."))H.push({route:(0===H.length?this.routes:H.slice(-1)[0].route.routes).filter(J=>J.name===I)[0],dynamics:{},query:G});this.performTransition(H),history.pushState(null,null,this.stackToLocation(H))}pathToStack({path:D,query:E}){const G=D.split("/").filter(J=>!!J.length),H=(J,K)=>{const N=K.map(P=>{const Q=J.slice(0),R=("string"==typeof P.path?P.path:P.name).split("/"),T={};let U=0;for(let W=0,X=R.length;W<X;W++){let Y=R[W];if(""!==Y){if(U*=10,"*"===Y[0])return U+=3,U*=Math.pow(10,J.length-1),T[Y.slice(1)]=Q.join("/"),{score:U,stack:[{route:P,dynamics:T,query:E}]};if(":"===Y[0])U+=2,T[Y.slice(1)]=Q.shift();else if(Y===Q[0])U+=1,Q.shift();else return{score:1/0}}}const V=H(Q,P.routes||[])||{score:1/0};if(V.score!==1/0)return U*=Math.pow(10,Q.length),U+=V.score,{score:U,stack:[{route:P,dynamics:T,query:E}].concat(V.stack)};return Q.length?V:{score:U,stack:[{route:P,dynamics:T,query:E}]}}).sort((P,Q)=>P.score-Q.score);return N[0]},I=H(G,this.routes);return I.stack}performTransition(D){var E=this;return B(function*(){const G=function(N,P){if(N.route!=P.route)return!1;if(Object.keys(N.dynamics).length!==Object.keys(P.dynamics).length)return!1;for(let[Q,R]of Object.entries(N.dynamics))if(R!==P[Q])return!1;for(let[Q,R]of Object.entries(N.route.queryParams||{}))if(R.refreshModel&&N.query[Q]!==P.query[Q])return!1;return!0};for(var H=0;D[H]&&E.stack[H]&&G(D[H],E.stack[H]);)H++;const I=function(N){return`${E.stack.slice(0,N+1).map(function(P){return P.route.name}).join("-")}-route`},J=function(N){return`${D.slice(0,N+1).map(function(P){return P.route.name}).join("-")}-route`},K={aborted:!1,abort(){this.aborted=!0},stack:D};for(let N=E.stack.length-1;N>=H;N--){const P=E.stack[N],Q=E.getOwner().lookup(`${P.route.name}-route`);if(Q.willTransition(K),K.aborted)return}for(let N=0;N<H;N++){const P=E.getOwner().lookup(J(N));for(let Q of Object.keys(D[N].route.queryParams||{}))P[Q]=D[N].query[Q]}for(let N=H;N<D.length;N++){const P=E.getOwner().lookup(J(N));for(let Q of Object.keys(D[N].route.queryParams||{}))D[N].dynamics[Q]=P[Q]=D[N].query[Q];if(!D[N].model){const Q=yield P.modelHook(D[N].dynamics);D[N].model=Q}}for(let N=E.stack.length-1;N>=H;N--){const P=E.stack.pop(),Q=E.getOwner().lookup(`${P.route.name}-route`);let R;R=0===H?E.getOwner().lookup("application-route"):E.getOwner().lookup(I(H-1)),R.outlet=null,R.renderNode.update(),Q.didLeave()}for(;H<D.length;H++){E.stack[H]=D[H];const N=E.getOwner().lookup(I(H));N.model=D[H].model;let P;P=0===H?E.getOwner().lookup("application-route"):E.getOwner().lookup(I(H-1)),N.tagName=I(H),P.outlet=N,P.renderNode.update(),N.didEnter()}E.currentRoute=E.stack.map(function(N){return N.route.name}).join(".")})()}}g.Router=C}),require(["app"]);
