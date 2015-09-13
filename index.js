var request = require("superagent");

function AjaxTransport(params) {
	this.params = params || {};
	this.params.headers = this.params.headers || {};
	this.params.path = this.params.path || "/";
}

AjaxTransport.prototype.setHeader = function(name, value) {
	return this.params.headers[name] = value;
};

AjaxTransport.prototype.removeHeader = function(name) {
	return delete this.params.headers[name];
};

AjaxTransport.prototype.send = function(body, callback) {
	var req = request
		.post(this.params.path)
		.type('application/json')
		.accept('application/json');

	Object.keys(this.params.headers)
		.forEach(function(header) {
			req.set(header, this.params.headers[header]);
		})

	req.send(body)
		.end(function(err, resp){
			var body = resp ? resp.body : undefined;
			callback(err, body);
		});
};

AjaxTransport.prototype.close = function() {
	throw new Error("Not implemented");
};

AjaxTransport.prototype.listen = function() {
	throw new Error("Not implemented");
};

module.exports = AjaxTransport;