import dgram from "node:dgram";
import dnsPacket from "dns-packet";

const server = dgram.createSocket("udp4");

const db = {
	"dhruv.dev": {
        type: 'A',
        data: '1.2.3.4'
    },
	"github.dhruv.dev":{
        type: 'CNAME',
        data: 'hashnode.network'
    },
};

server.on("message", (msg, rinfo) => {
	const incommingReq = dnsPacket.decode(msg);
	const ipFromDb = db[incommingReq.questions[0].name];

	const ans = dnsPacket.encode({
		type: "response",
		id: incommingReq.id,
		flags: dnsPacket.AUTHORITATIVE_ANSWER,
		questions: incommingReq.questions,
		answers: [
			{
				type: "A",
				class: "IN",
				name: incommingReq.questions[0].name,
				data: ipFromDb,
			},
		],
	});
    server.send(ans, rinfo.port, rinfo.address)
});


server.bind(1053, () => console.log(" DNS server is running on port 1053 "));
