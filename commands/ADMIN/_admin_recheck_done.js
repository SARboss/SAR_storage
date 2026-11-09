/*CMD
  command: /admin_recheck_done
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

var alive = Bot.getProp("recheck_alive") || [];
var dead  = Bot.getProp("recheck_dead") || 0;
Bot.setProp("vault", alive, "json");
Bot.setProp("recheck_active", "0");
Bot.setProp("recheck_count", 0, "integer");

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "✅ <b>Recheck complete</b>\n\n" +
    "<code>alive</code>   · <b>" + alive.length + "</b>\n" +
    "<code>dead</code>    · <b>" + dead + "</b>\n" +
    "<code>removed</code> · <b>" + dead + "</b>\n\n" +
    "🍪 Vault: <b>" + alive.length + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
