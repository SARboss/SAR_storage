/*CMD
  command: /admin_recheck
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

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
if (adminIds.indexOf(String(user.telegramid)) === -1) return;

var vault = Bot.getProp("vault") || [];
if (!vault.length) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "📭 Vault empty.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}

Bot.setProp("recheck_active", "1");
Bot.setProp("recheck_queue", vault.slice(), "json");
Bot.setProp("recheck_idx", 0, "integer");
Bot.setProp("recheck_alive", [], "json");
Bot.setProp("recheck_dead", 0, "integer");
Bot.setProp("recheck_count", 0, "integer");

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "🧹 Recheck started · <b>" + vault.length + "</b> entries",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "🛑 Stop", callback_data: "/recheck_stop" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);

Bot.runCommand("/admin_recheck_next");
