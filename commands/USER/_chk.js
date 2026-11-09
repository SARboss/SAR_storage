/*CMD
  command: /chk
  help: 
  need_reply: false
  auto_retry_time: 
  folder: USER

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var text = String(params || "").trim();
if (!text) return Bot.sendMessage("❌ Please provide a cookie.");

var nfid = "";
var m = text.match(/NetflixId\s+([^\s\n]+)/i);

if (m) {
  nfid = m[1].trim();
} else {
  m = text.match(/NetflixId\s*=\s*([^\s;\n]+)/i);
  if (m) nfid = m[1].trim();
  else nfid = text; 
}

if (!nfid) return Bot.sendMessage("❌ Could not find NetflixId.");

// Decode URL encoding
nfid = nfid.replace(/%3D/g, '=').replace(/%26/g, '&').replace(/%2F/g, '/');

var r = Api.sendMessage({ chat_id: chat.chatid, text: "⚡ <b>Checking...</b>", parse_mode: "HTML" });
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);

// Call API natively
HTTP.get({
  url: "https://ios.prod.ftl.netflix.com/iosui/user/15.48?appVersion=15.48.1&path=%5B%22account%22%2C%22token%22%2C%22default%22%5D&pathFormat=graph&responseFormat=json",
  headers: {
    "User-Agent": "Argo/15.48.1 (iPhone; iOS 15.8.5; Scale/2.00)",
    "Accept-Encoding": "identity",
    "Cookie": "NetflixId=" + nfid,
    "x-netflix.client.appversion": "15.48.1",
    "x-netflix.client.type": "argo"
  },
  success: "/chk_send",
  error: "/chk_dead"
});if (r && r.result) User.setProp("last_msg_id", r.result.message_id);

// Call Netflix API directly from BJS
HTTP.get({
  url: "https://ios.prod.ftl.netflix.com/iosui/user/15.48?appVersion=15.48.1&path=%5B%22account%22%2C%22token%22%2C%22default%22%5D&pathFormat=graph&responseFormat=json",
  headers: {
    "User-Agent": "Argo/15.48.1 (iPhone; iOS 15.8.5; Scale/2.00)",
    "Accept-Encoding": "identity",
    "Cookie": "NetflixId=" + nfid,
    "x-netflix.client.appversion": "15.48.1",
    "x-netflix.client.type": "argo"
  },
  success: "/chk_send",
  error: "/chk_dead"
});
