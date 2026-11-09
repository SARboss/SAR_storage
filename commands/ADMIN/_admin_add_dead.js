/*CMD
  command: /admin_add_dead
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

User.setProp("add_dead", (User.getProp("add_dead") || 0) + 1, "integer");
Bot.runCommand("/admin_add_next");
