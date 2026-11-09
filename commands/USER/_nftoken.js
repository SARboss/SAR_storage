/*CMD
  command: /nftoken
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

var vault = Bot.getProp("vault") || [];
if (!vault.length) {
  var r1 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "😔 <b>Vault empty.</b>",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r1 && r1.result) User.setProp("last_msg_id", r1.result.message_id);
  return;
}
User.setProp("nftok_retries", 0, "integer");
Bot.runCommand("/nftok_pick");
