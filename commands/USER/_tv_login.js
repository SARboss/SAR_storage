/*CMD
  command: /tv_login
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

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

var vault = Bot.getProp("vault") || [];

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "📺 <b>Free TV Login</b>\n\n" +
    "🔓 Choose a method:\n\n" +
    "<b>Method 1 — TV Code</b>\n" +
    "  1️⃣ Open Netflix on your TV\n" +
    "  2️⃣ Read the 8-digit code\n" +
    "  3️⃣ Send: <code>/tv 12345678</code>\n\n" +
    "<b>Method 2 — Login Link</b>\n" +
    "  1️⃣ Tap below, open on your TV browser\n\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "🍪 Vault: <b>" + vault.length + "</b>\n" +
    "💎 Made By @sar_info1",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [ { text: "🔗 Get TV Login Link", callback_data: "/tvl_start" } ],
      [ { text: "← Back",             callback_data: "/start"    } ]
    ]
  }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
