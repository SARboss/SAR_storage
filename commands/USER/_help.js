/*CMD
  command: /help
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

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "📖 <b>Help</b>\n\n" +
    "<b>Commands:</b>\n" +
    "  /start — main menu\n" +
    "  /nftoken — grab NFToken from vault\n" +
    "  /tv_login — TV login methods\n" +
    "  /tv &lt;8-digit code&gt; — activate TV by code\n" +
    "  /ucancel — cancel current operation\n" +
    "  /help — this\n\n" +
    "📅 Daily grab limit: <b>3</b>\n\n" +
    "💎 Made By @sar_info1",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
