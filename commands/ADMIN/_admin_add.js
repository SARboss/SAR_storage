/*CMD
  command: /admin_add
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

User.setProp("await_cookie", "1");
User.setProp("add_scanned", 0, "integer");
User.setProp("add_premium", 0, "integer");
User.setProp("add_added", 0, "integer");
User.setProp("add_dead", 0, "integer");
Bot.setProp("add_emails", [], "json");

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "📤 <b>Add Mode ON</b>\n\n" +
    "Send .txt / .json files one by one.\n" +
    "Each validated · premium ones added.\n\n" +
    "Send <code>/done</code> when finished.",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "✅ Done", callback_data: "/done" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
