/*CMD
  command: /admin_recheck_next
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

if (Bot.getProp("recheck_active") !== "1") return;

var count = (Bot.getProp("recheck_count") || 0) + 1;
Bot.setProp("recheck_count", count, "integer");
if (count > 500) {
  Bot.setProp("recheck_active", "0");
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "⚠️ Recheck stopped: 500-entry safety cap.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}

var q = Bot.getProp("recheck_queue") || [];
var i = Bot.getProp("recheck_idx") || 0;
if (i >= q.length) return Bot.runCommand("/admin_recheck_done");

var ck = String(q[i]);
var nf = ck.replace(/^NetflixId=/, "").trim();
Bot.setProp("recheck_idx", i + 1, "integer");
if (!nf) return Bot.runCommand("/admin_recheck_next");
Bot.setProp("recheck_cur_ck", ck);

HTTP.get({
  url: "https://www.netflix.com/YourAccount",
  headers: { "User-Agent": "Mozilla/5.0", "Cookie": "NetflixId=" + nf },
  success: "/admin_recheck_result",
  error: "/admin_recheck_dead"
});
