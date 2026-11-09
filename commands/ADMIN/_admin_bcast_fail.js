/*CMD
  command: /admin_bcast_fail
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

Bot.setProp("bcast_fail", (Bot.getProp("bcast_fail") || 0) + 1, "integer");
Bot.runCommand("/admin_bcast_next");
