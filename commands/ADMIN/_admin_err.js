/*CMD
  command: /admin_err
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

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "❌ File fetch error.",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
