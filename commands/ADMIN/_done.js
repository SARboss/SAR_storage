/*CMD
  command: /done
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
if (User.getProp("await_cookie") !== "1") return;

User.setProp("await_cookie", "0");
var s = User.getProp("add_scanned") || 0;
var p = User.getProp("add_premium") || 0;
var a = User.getProp("add_added") || 0;
var dd = User.getProp("add_dead") || 0;
var vault = Bot.getProp("vault") || [];

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "✅ <b>Add Mode OFF</b>\n\n" +
    "<code>scanned</code> · <b>" + s + "</b>\n" +
    "<code>premium</code> · <b>" + p + "</b>\n" +
    "<code>added</code>   · <b>" + a + "</b>\n" +
    "<code>dead</code>    · <b>" + dd + "</b>\n\n" +
    "🍪 Vault: <b>" + vault.length + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/admin" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
