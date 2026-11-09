/*CMD
  command: /tvl_validate
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

if (Number(http_status) !== 200 || String(content||"").indexOf("Account") === -1) return Bot.runCommand("/tvl_dead");
HTTP.get({
  url: "https://ios.prod.ftl.netflix.com/iosui/user/15.48?appVersion=15.48.1&path=%5B%22account%22%2C%22token%22%2C%22default%22%5D&pathFormat=graph&responseFormat=json",
  headers: {
    "User-Agent": "Argo/15.48.1 (iPhone; iOS 15.8.5; Scale/2.00)",
    "Cookie": "NetflixId=" + User.getProp("tvl_nf"),
    "x-netflix.client.appversion": "15.48.1",
    "x-netflix.client.type": "argo"
  },
  success: "/tvl_result",
  error: "/tvl_dead"
});
