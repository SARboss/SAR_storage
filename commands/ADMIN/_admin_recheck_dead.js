/*CMD
  command: /admin_recheck_dead
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
Bot.setProp("recheck_dead", (Bot.getProp("recheck_dead") || 0) + 1, "integer");
Bot.runCommand("/admin_recheck_next");
