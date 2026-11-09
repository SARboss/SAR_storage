/*CMD
  command: /tvl_dead
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

var dead = User.getProp("tvl_ck");
var vault = Bot.getProp("vault") || [];
var clean = [];
for (var i = 0; i < vault.length; i++) if (String(vault[i]) !== String(dead)) clean.push(vault[i]);
Bot.setProp("vault", clean, "json");
if (!clean.length) {
  User.setProp("tvl_retries", 0, "integer");
  var r = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>Vault empty.</b> All cookies failed.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
  return;
}
Bot.runCommand("/tvl_pick");
