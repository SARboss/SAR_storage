/*CMD
  command: /start
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

var users = Bot.getProp("users") || [];
var myid = String(user.telegramid);
if (users.indexOf(myid) === -1) { users.push(myid); Bot.setProp("users", users, "json"); }

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var vault = Bot.getProp("vault") || [];
var adminIds = String(Bot.getProp("admin_ids") || "6568760089").split(",");
var isAdmin = adminIds.indexOf(myid) > -1;

var kb = [
  [
    { text: "🔑 NFToken",  callback_data: "/nftoken" },
    { text: "📺 TV Login", callback_data: "/tv_login" }
  ],
  [ { text: "📖 Help", callback_data: "/help" } ]
];
if (isAdmin) kb.push([{ text: "🔐 Admin Panel", callback_data: "/admin" }]);

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "╔══════════════════════════╗\n" +
    "║   🎬  NETFLIX TOOLKIT  ║\n" +
    "╚══════════════════════════╝\n\n" +
    "👋 Welcome, <b>" + user.first_name + "</b>\n\n" +
    "🔧 <b>Tools:</b>\n" +
    "  🔑 NFToken — random from vault\n" +
    "  📺 TV Login — code OR login link\n\n" +
    "📅 Daily grab limit: <b>3</b>\n" +
    "🍪 Vault: <b>" + vault.length + "</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "💎 Made By @sar_info1",
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: { inline_keyboard: kb }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
