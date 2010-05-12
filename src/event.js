alloy.event = {
	add: function(obj, type, fn, data) {
		return obj.addEventListener(type, fn);
	},
	remove: function(obj, type, fn) {
		return obj.removeEventListener(type, fn);
	},
	trigger: function(obj, type, data) {
		return obj.fireEvent(type, data);
	},
	handle: function(obj, type, fn) {
		return obj[type](fn);
	},
	proxy: alloy.proxy
};

function trigger(type, obj, args) {
	args[0].type = type;
	return alloy.event.handle.apply(obj, args);
}

alloy.each(["bind","one"], function(i, name) {
	alloy.fn[name] = function(type, data, fn) {
		if (typeof type === "object") {
			for (var key in type) {
				if (key) {
					this[name](key, data, type[key], fn);
				}
			}
			return this;
		}
		if (alloy.isFunction(data) || data === false) {
			fn = data;
			data = undefined;
		}
		
		var handler = name === "one" ? alloy.proxy(fn, function(event) {
			alloy(this).unbind(event, handler);
			return fn.apply(this, arguments);
		}) : fn;
		
		alloy.event.add(this.context, type, fn, data);
		if (data && data !== undefined) {
			alloy.fn[type] = function(type, data) {
				return alloy.event.trigger(this.context, type, data);
			};
		}
		return this;
	};
});

alloy.fn.extend({
	unbind: function(type, fn) {
		if (typeof type === "object" && !type.preventDefault) {
			for (var key in type) {
				this.unbind(key, type[key]);
			}
		} else {
			alloy.event.remove(this.context, type, fn);
		}
		return this;
	},
	trigger: function(type, data) {
		return alloy.event.trigger(type, data, this.context);
	}
});

