/*CMD
  command: /admin_broadcast
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

User.setProp("bcast_mode", "1");
var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "📢 <b>Broadcast</b>\n\n" +
    "Send the message (text, or photo with caption).\n\n" +
    "Type <code>/acancel</code> to abort.",
  parse_mode: "HTML"
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
