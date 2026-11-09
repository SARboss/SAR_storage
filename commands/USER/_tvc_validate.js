/*CMD
  command: /tvc_validate
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

if (Number(http_status) !== 200 || !content || content.indexOf("Account") === -1) return Bot.runCommand("/tvc_dead");
HTTP.get({
  url: "https://www.netflix.com/tv8",
  headers: { "User-Agent": "Mozilla/5.0", "Cookie": "NetflixId=" + User.getProp("tvc_nf") },
  success: "/tvc_submit",
  error: "/tvc_next"
});
