/*CMD
  command: /admin_got_file
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

if (Number(http_status) !== 200 || !content) return;
var info = JSON.parse(content);
HTTP.get({ url: "https://api.telegram.org/file/bot" + bot.token + "/" + info.result.file_path,
           success: "/admin_parse_file", error: "/admin_err" });
