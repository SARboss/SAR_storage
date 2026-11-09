/*CMD
  command: /admin_bcast_done
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

var ok = Bot.getProp("bcast_ok") || 0;
var fail = Bot.getProp("bcast_fail") || 0;
var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "📢 <b>Broadcast complete</b>\n\n" +
    "<code>sent</code>   · <b>" + ok + "</b>\n" +
    "<code>failed</code> · <b>" + fail + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
