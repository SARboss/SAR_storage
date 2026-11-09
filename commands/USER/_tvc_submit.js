/*CMD
  command: /tvc_submit
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

if (Number(http_status) !== 200 || !content) return Bot.runCommand("/tvc_next");
var authM = content.match(/name="authURL"\s+value="([^"]+)"/);
if (!authM) return Bot.runCommand("/tvc_next");
var code = User.getProp("tvc_code");
HTTP.post({
  url: "https://www.netflix.com/tv8",
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Cookie": "NetflixId=" + User.getProp("tvc_nf"),
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "https://www.netflix.com/tv8"
  },
  body: "flow=websiteSignUp&authURL=" + encodeURIComponent(decodeURIComponent(authM[1])) +
        "&flowMode=enterTvLoginRendezvousCode&withFields=tvLoginRendezvousCode,isTvUrl2" +
        "&code=" + code + "&tvLoginRendezvousCode=" + code + "&action=nextAction",
  success: "/tvc_result",
  error: "/tvc_next"
});
