!function(w) {
	var J=JSON, trackInterval = 100, trackerFunctions = [], tfCount = 0, shadowZen = {},
	objSerialize = function (obj) {
		for(var keys = Object.keys(obj).sort(), res = {}, k;k=keys.shift();) res[k] = obj[k]
		return J.stringify(res)
	}, poller = function(k, shadowZenSerialized) {
		if((shadowZenSerialized = objSerialize(shadowZen)) !== ''+zen) {
			shadowZen = J.parse(shadowZenSerialized)
			for(k=0;k<tfCount;k++) {
				try {trackerFunctions[k].call(zen)}
				catch(e) {}
			}
		}
		setTimeout(poller, trackInterval)
	}, zen = function(cb) {
		trackerFunctions.push(cb)
		if(!tfCount) poller()
		tfCount++
		return this
	}
	Object.defineProperties(zen, {
		interval : {value: function(interval) {
			trackInterval=interval
			return this
		}},
		'import' : {value: function(obj, k) {
			if(''+obj === obj)
				try{obj=J.parse(obj)} catch(e) {}
			if(obj)
				for(k in obj)
					if(obj.hasOwnProperty(k))
						zen[k] = obj[k]
			return this
		}},
		toString: {value: function(){
			return objSerialize(zen)
		}},
		req: {value: function(key, url, data, xhr) {
			xhr = new XMLHttpRequest
			xhr.open(data ? 'POST' : 'GET', url, true)
			xhr.onload = function(res) {
				res = xhr.responseText
				try {res = J.parse(res)} catch(e) {}
				zen[key] = res
			}
			xhr.send(data)
		}}
	})
	w.Zen = zen
}(this)