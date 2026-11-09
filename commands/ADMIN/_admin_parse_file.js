/*CMD
  command: /admin_parse_file
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ADMIN

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (Number(http_status) !== 200 || !content) return;
var text = String(content);
var seen = {}, ids = [];

var lines = text.split(/\r?\n/);
for (var k = 0; k < lines.length; k++) {
  var parts = lines[k].split("\t");
  if (parts.length >= 7 && parts[5] === "NetflixId") {
    var v = parts[6];
    if (v && !seen[v]) { seen[v] = true; ids.push(v); }
  }
}
var re = /NetflixId\s*[:=\t]\s*([^\s;,\n"']{20,})/gi, m;
while ((m = re.exec(text)) !== null) {
  var v2 = m[1].replace(/["']/g, "");
  if (v2 && !seen[v2]) { seen[v2] = true; ids.push(v2); }
}
if (!ids.length) {
  var r = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ No NetflixId in file.",
    parse_mode: "HTML"
  });
  if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
  return;
}

User.setProp("add_pending", ids, "json");
User.setProp("add_pending_idx", 0, "integer");
User.setProp("add_scanned", (User.getProp("add_scanned") || 0) + ids.length, "integer");
Bot.runCommand("/admin_add_next");
