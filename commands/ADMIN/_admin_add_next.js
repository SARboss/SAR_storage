/*CMD
  command: /admin_add_next
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

var ids = User.getProp("add_pending") || [];
var i = User.getProp("add_pending_idx") || 0;
if (i >= ids.length) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "📄 File done. Send next file or tap ✅ Done.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "✅ Done", callback_data: "/done" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}
var nf = ids[i];
User.setProp("add_pending_idx", i + 1);
User.setProp("add_cur_nf", nf);

HTTP.get({
  url: "https://www.netflix.com/YourAccount",
  headers: { "User-Agent": "Mozilla/5.0", "Cookie": "NetflixId=" + nf,
             "Accept": "text/html,application/xhtml+xml" },
  success: "/admin_add_check",
  error: "/admin_add_dead"
});
