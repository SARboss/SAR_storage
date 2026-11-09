/*CMD
  command: /addadmin
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

if (String(user.telegramid) !== "6568760089") return;

var id = String(params || "").trim().replace(/\D/g, "");
if (!id) {
  var r0 = Api.sendMessage({
    chat_id: chat.chatid,
    text: "Usage: /addadmin 123456",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
  });
  if (r0 && r0.result) User.setProp("last_msg_id", r0.result.message_id);
  return;
}
var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
if (adminIds.indexOf(id) === -1) adminIds.push(id);
Bot.setProp("admin_ids", adminIds.join(","));

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "✅ Added <code>" + id + "</code>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
