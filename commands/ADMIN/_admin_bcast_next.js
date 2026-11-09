/*CMD
  command: /admin_bcast_next
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

var users = Bot.getProp("bcast_users") || [];
var i = Bot.getProp("bcast_idx") || 0;
if (i >= users.length) return Bot.runCommand("/admin_bcast_done");

var uid = users[i];
Bot.setProp("bcast_idx", i + 1, "integer");

var txt = Bot.getProp("bcast_text") || "";
var photo = Bot.getProp("bcast_photo") || "";
var token = Bot.getProp("bcast_token") || bot.token;

if (photo) {
  HTTP.post({
    url: "https://api.telegram.org/bot" + token + "/sendPhoto",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "chat_id=" + encodeURIComponent(uid) +
          "&photo=" + encodeURIComponent(photo) +
          "&caption=" + encodeURIComponent(txt) +
          "&parse_mode=HTML",
    success: "/admin_bcast_ok",
    error: "/admin_bcast_fail"
  });
} else {
  HTTP.post({
    url: "https://api.telegram.org/bot" + token + "/sendMessage",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "chat_id=" + encodeURIComponent(uid) +
          "&text=" + encodeURIComponent(txt) +
          "&parse_mode=HTML",
    success: "/admin_bcast_ok",
    error: "/admin_bcast_fail"
  });
}
