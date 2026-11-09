/*CMD
  command: /chk_send
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

var token = "";
var name = "Unknown";
var email = "Unknown";
var plan = "Unknown";
var qual = "Unknown";
var stream = "Unknown";

// Safely check if content exists and parse it
if (content && content.indexOf("token") > -1) {
  var j = JSON.parse(content);
  
  if (j.value && j.value.account) {
    var acc = j.value.account;
    
    if (acc.token && acc.token["default"]) {
      token = acc.token["default"].token;
    }
    
    if (acc.profiles && acc.profiles.length > 0) {
      name = acc.profiles[0].name || "Unknown";
      if (acc.profiles[0].growthEmail && acc.profiles[0].growthEmail.email) {
        email = acc.profiles[0].growthEmail.email.value || "Unknown";
      }
    }
    
    if (acc.currentPlan && acc.currentPlan.plan) {
      plan = acc.currentPlan.plan.name || "Unknown";
      qual = acc.currentPlan.plan.videoQuality || "Unknown";
      stream = acc.currentPlan.plan.maxStreams || "Unknown";
    }
  }
}

if (token === "") {
  return Bot.runCommand("/chk_dead");
}

// Build the message in one single line to prevent BJS syntax errors
var msg = "✅ <b>COOKIE IS WORKING</b>\n\n👤 <b>Name:</b> <code>" + name + "</code>\n📧 <b>Email:</b> <code>" + email + "</code>\n📦 <b>Plan:</b> <code>" + plan + "</code>\n🎬 <b>Quality:</b> <code>" + qual + "</code>\n📺 <b>Streams:</b> " + stream + "\n\n🔑 <b>NFToken:</b>\n<code>" + token + "</code>\n\n💎 Made By @sar_info1";

var r = Api.sendMessage({
  chat_id: chat.chatid,
  text: msg,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [ { text: "📱 Phone", url: "https://www.netflix.com/unsupported?nftoken=" + token },
        { text: "🖥️ PC",    url: "https://www.netflix.com/browse?nftoken=" + token } ],
      [ { text: "📺 TV",    url: "https://www.netflix.com/tv8?nftoken=" + token } ],
      [ { text: "← Back",   callback_data: "/start" } ]
    ]
  }
});
if (r && r.result) User.setProp("last_msg_id", r.result.message_id);
