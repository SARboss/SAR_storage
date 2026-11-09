/*CMD
  command: /admin_manage
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

if (String(user.telegramid) !== "6568760089") return;

var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
var list = "";
for (var i = 0; i < adminIds.length; i++) list += (i+1) + ". <code>" + adminIds[i] + "</code>\n";

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "👥 <b>Admins</b>\n\n" + list + "\n" +
    "<b>Add:</b> <code>/addadmin 123456</code>\n" +
    "<b>Remove:</b> <code>/deladmin 123456</code>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
