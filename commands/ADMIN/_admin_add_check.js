/*CMD
  command: /admin_add_check
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

var txt = String(content || "");
var nf  = User.getProp("add_cur_nf");
if (Number(http_status) !== 200 || txt.indexOf("Account") === -1) return Bot.runCommand("/admin_add_dead");
var ms = (txt.match(/"membershipStatus"\s*:\s*"([^"]+)"/) || [])[1] || "Unknown";
if (ms !== "CURRENT_MEMBER") {
  User.setProp("add_dead", (User.getProp("add_dead") || 0) + 1, "integer");
  return Bot.runCommand("/admin_add_next");
}

User.setProp("add_premium", (User.getProp("add_premium") || 0) + 1, "integer");

var vault = Bot.getProp("vault") || [];
var seen = {}, clean = [];
for (var j = 0; j < vault.length; j++) {
  var s = String(vault[j]);
  var mm = s.match(/NetflixId[\t=]([^\s;\n"']+)/);
  var val = mm ? mm[1] : null;
  if (val && !seen[val]) { seen[val] = true; clean.push("NetflixId=" + val); }
}
if (!seen[nf]) {
  var emails = Bot.getProp("add_emails") || [];
  var em = (txt.match(/"emailAddress"\s*:\s*"([^"]+)"/) || [])[1] || "";
  if (em && emails.indexOf(em) > -1) {
    User.setProp("add_dead", (User.getProp("add_dead") || 0) + 1, "integer");
    return Bot.runCommand("/admin_add_next");
  }
  if (em) { emails.push(em); Bot.setProp("add_emails", emails, "json"); }
  clean.push("NetflixId=" + nf);
  User.setProp("add_added", (User.getProp("add_added") || 0) + 1, "integer");
}
Bot.setProp("vault", clean, "json");
Bot.runCommand("/admin_add_next");
