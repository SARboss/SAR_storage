/*CMD
  command: /admin_stats
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

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
if (adminIds.indexOf(String(user.telegramid)) === -1) return;

var vault = Bot.getProp("vault") || [];
var users = Bot.getProp("users") || [];
var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "📊 <b>Stats</b>\n\n🍪 Vault: <b>" + vault.length + "</b>\n👤 Users: <b>" + users.length + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data:
