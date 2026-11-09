/*CMD
  command: /tvc_result
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

var txt = String(content || "").toLowerCase();
var code = User.getProp("tvc_code");

if (txt.indexOf("success") > -1 || txt.indexOf("your tv is ready") > -1) {
  var today = new Date().toISOString().slice(0,10);
  var d = User.getProp("daily") || {};
  if (d.date !== today) d = { date: today, count: 0 };
  d.count = (d.count||0) + 1;
  User.setProp("daily", d, "json");
  var r = Api.sendMessage({
    chat_id: chat.chatid,
    text:
      "╔══════════════════════════╗\n" +
      "║   ✅  TV ACTIVATED!    ║\n" +
      "╚══════════════════════════╝\n\n" +
      "📺 Code: <code>" + code + "</code>\n\n🎉 Your TV is ready! 🍿\n\n" +
      "📅 Remaining today: <b>" + (3 - d.count) + "/3</b>\n\n" +
      "💎 Made By @sar_info1",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
} else if (txt.indexOf("invalid") > -1 || txt.indexOf("expired") > -1) {
  var re = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>Invalid or expired code.</b>",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (re && re.result) User.setProp("last_msg_id", re.result.message_id);
} else {
  Bot.runCommand("/tvc_next");
}
