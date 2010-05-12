
var alloy = function(context) { return new alloy.fn.init(context); },
	trimLeft = /^\s+/,
	trimRight = /\s+$/,
	trim = String.prototype.trim,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	indexOf = Array.prototype.indexOf,
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty;

alloy.fn = alloy.prototype = {
	init: function(context) {
		if (!context) {
			return this;
		}
		this.context = context;
		return this;
	},
	alloy: "@VERSION",
	size: function(args) {
		return args.length();
	},
	toArray: function(args) {
		return slice.call(args,0);
	},
	each: function(obj, callback, args) {
		return alloy.each(obj, callback, args);
	},
	eq: function(arg, i) {
		return i === -1 ? arg.slice(i) : arg.slice(i, +i +1);
	},
	first: function(arg) {
		return arg.eq(0);
	},
	last: function(arg) {
		return arg.eq(-1);
	},
	map: function() {
	
	},
	guid:1,
	push: push,
	sort: [].sort,
	splice: [].splice
};

alloy.fn.init.prototype = alloy.fn;

alloy.extend = alloy.fn.extend = function() {
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;

	// deep copy 
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		i = 2;
	}

	if (typeof target !== "object" && !alloy.isFunction(target)) {
		target = {};
	}

	// extend alloy if only one argument is passed
	if (length === i) {
		target = this;
		--i;
	}

	for ( ; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[ i ]) != null ) {
			// Extend the base object
			for (name in options) {
				if (!target[name]) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target === copy) { continue; }
	
					// Recurse if we're merging object literal values or arrays
					if (deep && copy && (alloy.isPlainObject(copy) || alloy.isArray(copy))) {
						var clone = src && (alloy.isPlainObject(src) || alloy.isArray(src)) ? src : alloy.isArray(copy) ? [] : {};
						target[name] = alloy.extend(deep,clone,copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
	}

	return target;
};

alloy.extend({
	isFunction: function(obj) {
		return toString.call(obj) === "[object Function]";
	},
	isArray: function(obj) {
		return toString.call(obj) === "[object Array]";
	},	
	isPlainObject: function(obj) {
		if (!obj || toString.call(obj) !== "[object Object]" || obj.setInterval) {
			return false;
		}
		
		if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
			return false;
		}

		var key, _cnt = 0;
		for (key in obj) {
			if (key) { _cnt++; }
		}
		return key === undefined || hasOwn.call(obj,key);
	},
	isEmptyObject: function(obj) {
		for (var name in obj) {
			if (name) {
				return false;
			}
		}
		return true;
	},
	error: function(msg) {
		throw msg;
	},
	noop: function() {},
	
	each: function(object,callback,args) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || alloy.isFunction(object);

		if (args) {
			if (isObj) {
				for (name in object) {
					if (callback.apply( object[ name ],args) === false ) {
						break;
					}
				}
			} else {
				for (; i < length;) {
					if (callback.apply( object[ i++ ],args) === false) {
						break;
					}
				}
			}
		} else {
			if (isObj) {
				for (name in object) {
					if (callback.call(object[name],name,object[name]) === false) {
						break;
					}
				}
			} else {
				for (var value = object[0];	i<length && callback.call(value,i,value) !== false; value = object[++i]) {}
			}
		}

		return object;
	},

	trim: trim ?
		function(text) {
			return text == null ? "" : trim.call(text);
		} :
		function(text) {
			return text == null ? "" : text.toString().replace(trimLeft,"").replace(trimRight,"");
		},
	makeArray: function(array, results) {
		var ret = results || {};
		if (array != null) {
			if (array.length == null || typeof array === "string" || alloy.isFunction(array) || (typeof array !== "function" && array.setInterval)) {
				push.call(ret, array);
			} else {
				alloy.merge(ret, array);
			}
		}
		return ret;
	},
	inArray: function(elem, array) {
		if (array.indexOf) {
			return array.indexOf( elem );
		}
	
		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}
	
		return -1;
	},
	merge: function( first, second ) {
		var i = first.length, j = 0;
	
		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}
	
		first.length = i;
	
		return first;
	},
	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}
	
		return ret;
	},
	map: function( elems, callback, arg ) {
		var ret = [], value;
	
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );
	
			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}
	
		return ret.concat.apply( [], ret );
	},
	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;
			} else if ( proxy && !alloy.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}
	
		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}
	
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || alloy.guid++;
		}
	
		return proxy;
	},
	getObject: function(name, create, obj) {
		var parts = name.split("."), p;
		if (typeof create !== 'boolean') {
			obj = create;
			create = undefined;
		} 
		obj = obj || Ti;
		
		while (obj && parts.length) {
			p = parts.shift();
			if (obj[p] === undefined && create) {
				obj[p] = {};
			}
			obj = obj[p];
		}
		return obj;
	},
	now: function() {
		return (new Date()).getTime();
	},
	ucFirst: function(text) {
		return text.substr(0,1).toUpperCase() + text.substr(1,text.length);
	}
});

