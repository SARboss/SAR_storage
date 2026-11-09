/*CMD
  command: /admin_broadcast_send
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

var users = Bot.getProp("users") || [];
if (!users.length) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ No users registered.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}
Bot.setProp("bcast_users", users.slice(), "json");
Bot.setProp("bcast_idx", 0, "integer");
Bot.setProp("bcast_ok", 0, "integer");
Bot.setProp("bcast_fail", 0, "integer");
Bot.setProp("bcast_token", bot.token);

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "📢 Sending to <b>" + users.length + "</b>...",
  parse_mode: "HTML"
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);

Bot.runCommand("/admin_bcast_next");
