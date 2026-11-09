/*CMD
  command: /nftok_result
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

var token = null;
if (Number(http_status) === 200 && content) {
  try { var j = JSON.parse(content); token = j.value && j.value.account && j.value.account.token && j.value.account.token["default"] && j.value.account.token["default"].token; } catch(e){}
}
if (!token) return Bot.runCommand("/nftok_dead");

var today = new Date().toISOString().slice(0,10);
var d = User.getProp("daily") || {};
if (d.date !== today) d = { date: today, count: 0 };
d.count = (d.count||0) + 1;
User.setProp("daily", d, "json");
User.setProp("nftok_retries", 0, "integer");

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "╔══════════════════════════╗\n" +
    "║   🔑  NFTOKEN READY    ║\n" +
    "╚══════════════════════════╝\n\n" +
    "<code>" + token + "</code>\n\n" +
    "🔗 <b>Login Links:</b>\n" +
    "📱 <a href=\"https://www.netflix.com/unsupported?nftoken=" + token + "\">Phone</a>\n" +
    "🖥️ <a href=\"https://www.netflix.com/browse?nftoken=" + token + "\">Desktop</a>\n" +
    "📺 <a href=\"https://www.netflix.com/tv8?nftoken=" + token + "\">TV</a>\n\n" +
    "📅 Remaining today: <b>" + (3 - d.count) + "/3</b>\n\n" +
    "💎 Made By @sar_info1",
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
