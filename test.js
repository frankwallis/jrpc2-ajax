var rpc = require('jrpc2');
var koa = require('koa');
var koaJrpc = require("koa-jrpc2");
var AjaxTransport = require("./");
var expect = require('chai').expect;

describe('AjaxTransport', function() {

	it('returns requests', function(done) {
		var app = koa();

		var rpcServer = new rpc.Server();
		rpcServer.expose('sum', function(a, b) {
			return a + b;
		});
		app.use(koaJrpc(rpcServer));
		app.listen(8081);

		// in the browser you can just use path: "/api/" if connecting to window.location
		var ajax = new AjaxTransport({path: "http://localhost:8081/"});
		var client = new rpc.Client(ajax);

		client.invoke('sum', { a: 5, b: 17 }, function (err, raw) {
			expect(raw.result).to.equal(22);
			done();
		});
	});
});
