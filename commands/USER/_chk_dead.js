/*CMD
  command: /chk_dead
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

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "❌ <b>NOT WORK</b>\n\nThe cookie is dead or invalid.",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
