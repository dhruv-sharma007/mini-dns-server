import dgram from "node:dgram";
import dnsPacket from "dns-packet";

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
	const incommingReq = dnsPacket.decode(msg);
	console.log({
		msg: incommingReq.questions,
		rinfo,
	});
});

server.bind(1053, () => console.log(" DNS server is running on port 1053 "));
