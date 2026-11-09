/*CMD
  command: /tv
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

var today = new Date().toISOString().slice(0,10);
var d = User.getProp("daily") || {};
if (d.date !== today) d = { date: today, count: 0 };
if ((d.count||0) >= 3) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>Daily limit reached (3/3).</b>\nResets at UTC midnight.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}
User.setProp("daily", d, "json");

var code = String(params || "").replace(/\D/g, "");
if (code.length !== 8) {
  var r1 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ Usage: /tv 12345678",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r1 && r1.result) User.setProp("last_msg_id", r1.result.message_id);
  return;
}

var vault = Bot.getProp("vault") || [];
if (!vault.length) {
  var r2 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "😔 Vault empty.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r2 && r2.result) User.setProp("last_msg_id", r2.result.message_id);
  return;
}
User.setProp("tvc_code", code);
User.setProp("tvc_idx", 0, "integer");
User.setProp("tvc_max", Math.min(50, vault.length), "integer");

var r3 = Api.sendMessage({
  chat_id: chat.chatid,
  text: "🔍 Trying vault cookies...",
  parse_mode: "HTML"
});
if (r3 && r3.result) User.setProp("last_msg_id", r3.result.message_id);

Bot.runCommand("/tvc_next");
