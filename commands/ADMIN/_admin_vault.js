/*CMD
  command: /admin_vault
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
var preview = "";
for (var i = 0; i < Math.min(5, vault.length); i++) {
  preview += (i+1) + ". <code>" + String(vault[i]).substring(0, 30) + "…</code>\n";
}
var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "🍪 <b>Vault</b> · <b>" + vault.length + "</b> entries\n\n" + (preview || "<i>empty</i>"),
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
