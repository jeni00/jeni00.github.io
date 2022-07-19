

let dataServer;
let pubKey = "pub-c-f36fe4cb-8521-484d-b92b-3265cc0fffe3";
let subKey = "sub-c-fae7ce25-95cb-4d22-8dca-9e4f509e15cd";
let secretKey = "sec-c-ZjAzYzA2MWUtM2E1Mi00MzljLTliMzktNDUwZWYzNmE4MDcz";

function createServer(y) {

  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: y,
    secretKey: secretKey,
    heartbeatInterval: 0,
  });
  console.log("server set up!");
}

