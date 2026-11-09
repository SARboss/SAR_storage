/*CMD
  command: /admin_recheck_result
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

if (Bot.getProp("recheck_active") !== "1") return;
var txt = String(content || "");
if (Number(http_status) === 200 && txt.indexOf("Account") > -1) {
  var alive = Bot.getProp("recheck_alive") || [];
  alive.push(Bot.getProp("recheck_cur_ck"));
  Bot.setProp("recheck_alive", alive, "json");
} else {
  Bot.setProp("recheck_dead", (Bot.getProp("recheck_dead") || 0) + 1, "integer");
}
Bot.runCommand("/admin_recheck_next");
