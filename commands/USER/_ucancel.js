/*CMD
  command: /ucancel
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

var last = User.getProp("last_msg_id");
if (last) { try { Api.deleteMessage({ chat_id: chat.chatid, message_id: Number(last) }); User.setProp("last_msg_id", ""); } catch(e){} }

User.setProp("nftok_retries", 0, "integer");
User.setProp("tvl_retries", 0, "integer");
User.setProp("tvc_idx", 0, "integer");

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: "✅ Cancelled.",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [[{ text: "← Back", callback_data: "/start" }]] }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
