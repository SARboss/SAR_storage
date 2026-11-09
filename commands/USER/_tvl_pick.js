/*CMD
  command: /tvl_pick
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

var vault = Bot.getProp("vault") || [];
if (!vault.length) {
  User.setProp("tvl_retries", 0, "integer");
  var r = Api.sendMessage({
    chat_id: chat.chatid,
    text: "😔 <b>Vault is now empty.</b>",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
  return;
}

var today = new Date().toISOString().slice(0,10);
var d = User.getProp("daily") || {};
if (d.date !== today) d = { date: today, count: 0 };
if ((d.count||0) >= 3) {
  User.setProp("tvl_retries", 0, "integer");
  var rd = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>Daily limit reached (3/3).</b>",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (rd && rd.result) User.setProp("last_msg_id", rd.result.message_id);
  return;
}

var retries = User.getProp("tvl_retries") || 0;
if (retries >= 20) {
  User.setProp("tvl_retries", 0, "integer");
  var rr = Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ Vault may be dead. Tried 20.",
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
  });
  if (rr && rr.result) User.setProp("last_msg_id", rr.result.message_id);
  return;
}
User.setProp("tvl_retries", retries + 1, "integer");

var ck = String(vault[Math.floor(Math.random() * vault.length)]);
if (!/^NetflixId=[^\s;]+$/.test(ck)) return Bot.runCommand("/tvl_pick");
var nf = ck.substring(10).trim();
if (!nf || nf.indexOf("NetflixId=") === 0) return Bot.runCommand("/tvl_pick");
User.setProp("tvl_ck", ck);
User.setProp("tvl_nf", nf);

HTTP.get({
  url: "https://www.netflix.com/YourAccount",
  headers: { "User-Agent": "Mozilla/5.0", "Cookie": "NetflixId=" + nf },
  success: "/tvl_validate",
  error: "/tvl_dead"
});
