/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ── Delete previous bot message on non-command update ──
var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

// ── Admin flag ──
var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
var isAdmin = adminIds.indexOf(String(user.telegramid)) > -1;

// ── Broadcast content capture ──
if (isAdmin && User.getProp("bcast_mode") === "1") {
  User.setProp("bcast_mode", "0");
  if (request && request.photo && request.photo.length) {
    var p = request.photo[request.photo.length - 1];
    if (p && p.file_id) {
      Bot.setProp("bcast_photo", p.file_id);
      Bot.setProp("bcast_text", request.caption || "");
      Bot.runCommand("/admin_broadcast_send");
      return;
    }
  }
  if (request && request.text) {
    Bot.setProp("bcast_photo", "");
    Bot.setProp("bcast_text", request.text);
    Bot.runCommand("/admin_broadcast_send");
    return;
  }
  return Bot.sendMessage("❌ Unsupported content.");
}

// ── Add-mode file intake ──
if (isAdmin && User.getProp("await_cookie") === "1") {
  if (!request || !request.document) return;
  var d = request.document;
  if (!d.file_id) return Bot.sendMessage("❌ No file_id.");
  if (!d.file_name || !/\.(txt|json)$/i.test(d.file_name)) return Bot.sendMessage("❌ Only .txt / .json.");
  HTTP.get({
    url: "https://api.telegram.org/bot" + bot.token + "/getFile?file_id=" + d.file_id,
    success: "/admin_got_file",
    error: "/admin_err"
  });
}
