/*CMD
  command: /admin
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
if (adminIds.indexOf(String(user.telegramid)) === -1) {
  var rx = Api.sendMessage({
    chat_id: chat.chatid,
    text: "🚫 Admin only.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (rx && rx.result) User.setProp("last_msg_id", rx.result.message_id);
  return;
}

var vault = Bot.getProp("vault") || [];
var users = Bot.getProp("users") || [];
var isOwner = String(user.telegramid) === "6568760089";

var kb = [
  [ { text: "📊 Stats",     callback_data: "/admin_stats" },
    { text: "🍪 Vault (" + vault.length + ")", callback_data: "/admin_vault" } ],
  [ { text: "📤 Add files", callback_data: "/admin_add" },
    { text: "🧹 Recheck",   callback_data: "/admin_recheck" } ],
  [ { text: "📢 Broadcast", callback_data: "/admin_broadcast" },
    { text: "👤 Users (" + users.length + ")", callback_data: "/admin_users" } ],
  [ { text: "🗑 Wipe",      callback_data: "/admin_wipe" } ]
];
if (isOwner) kb.push([{ text: "👥 Admins", callback_data: "/admin_manage" }]);
kb.push([{ text: "← Back", callback_data: "/start" }]);

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "🔐 <b>ADMIN PANEL</b>\n\n🍪 Vault: <b>" + vault.length + "</b>\n👤 Users: <b>" + users.length + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: kb }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
if (adminIds.indexOf(String(user.telegramid)) === -1) {
  var rx = Api.sendMessage({
    chat_id: chat.chatid,
    text: "🚫 Admin only.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (rx && rx.result) User.setProp("last_msg_id", rx.result.message_id);
  return;
}

var vault = Bot.getProp("vault") || [];
var users = Bot.getProp("users") || [];
var isOwner = String(user.telegramid) === "6568760089";

var kb = [
  [ { text: "📊 Stats",     callback_data: "/admin_stats" },
    { text: "🍪 Vault (" + vault.length + ")", callback_data: "/admin_vault" } ],
  [ { text: "📤 Add files", callback_data: "/admin_add" },
    { text: "🧹 Recheck",   callback_data: "/admin_recheck" } ],
  [ { text: "📢 Broadcast", callback_data: "/admin_broadcast" },
    { text: "👤 Users (" + users.length + ")", callback_data: "/admin_users" } ],
  [ { text: "🗑 Wipe",      callback_data: "/admin_wipe" } ]
];
if (isOwner) kb.push([{ text: "👥 Admins", callback_data: "/admin_manage" }]);
kb.push([{ text: "← Back", callback_data: "/start" }]);

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "🔐 <b>ADMIN PANEL</b>\n\n🍪 Vault: <b>" + vault.length + "</b>\n👤 Users: <b>" + users.length + "</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: kb }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
