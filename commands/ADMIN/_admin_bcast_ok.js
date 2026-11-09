/*CMD
  command: /admin_bcast_ok
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

Bot.setProp("bcast_ok", (Bot.getProp("bcast_ok") || 0) + 1, "integer");
Bot.runCommand("/admin_bcast_next");
