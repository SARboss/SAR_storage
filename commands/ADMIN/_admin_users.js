/*CMD
  command: /admin_users
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

var users = Bot.getProp("users") || [];
var preview = users.slice(0, 20).join(", ");
var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "👤 <b>Users</b> · <b>" + users.length + "</b>\n\n" +
    "<code>" + preview + "</code>" +
    (users.length > 20 ? "\n<i>…and " + (users.length - 20) + " more</i>" : ""),
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
