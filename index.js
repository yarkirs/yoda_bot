const messege = require('./messege')
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const fetch = require('node-fetch')
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
// id ивана 1027785936

const getQuote = async () => {
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return `${data.quoteText} Автор ${data.quoteAuthor ? data.quoteAuthor : 'Неизвестен'}`
  } catch (e) {
    console.log(e);
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

bot.hears(/привет йода/i, ctx => {

  ctx.reply(`Привет, ${ctx.message.from.username}!😉`)

  console.log("🚀 ~ file: index.js ~ line 23 ~ ctx.update.message.text", ctx.update.message.text)
  console.log("🚀 ~ file: index.js ~ line 35 ~ ctx.update.message", ctx.update.message)
  console.log("🚀 ~ file: index.js ~ line 36 ~ ctx.update", ctx.update)
  console.log("🚀 ~ file: index.js ~ line 36 ~ ctx", ctx)
})
bot.hears(/как дела йода/i, ctx => {
  ctx.reply('Всё отлично, нахожусь в разработке, пытаюсь захватить мир, а между делом отправляю вирусы всем подряд.😈 А у тебя как?')
})
bot.hears(/йода дурак/i, ctx => {
  ctx.reply(`${ctx.message.from.first_name} сам дурак`)
})

// cron.schedule('* * * * *', () => {

//   async function sendMessage() {
//     quoteText = await getQuote()
//     // bot.telegram.sendSticker(process.env.CHAT_ID, messege.text.stikerYodaThinking);
//     bot.telegram.sendMessage(process.env.CHAT_ID, quoteText)

//   }
//   sendMessage();
// }, {
//   timezone: "Europe/Moscow",
// })

cron.schedule('30 08 * * *', () => {
  async function sendMessage() {
    quoteText = await getQuote()
    bot.telegram.sendSticker(process.env.CHAT_ID, messege.text.stikerYodaThinking);
    bot.telegram.sendMessage(process.env.CHAT_ID, quoteText)
  }
  sendMessage();
}, {
  timezone: "Europe/Moscow",
})
cron.schedule('30 10 * * *', () => {
  async function sendMessage() {
    quoteText = await getQuote()
    bot.telegram.sendSticker(process.env.CHAT_ID, messege.text.stikerYodaThinking);
    bot.telegram.sendMessage(process.env.CHAT_ID, quoteText)
  }
  sendMessage();
}, {
  timezone: "Europe/Moscow",
})
cron.schedule('30 12 * * *', () => {
  async function sendMessage() {
    quoteText = await getQuote()
    bot.telegram.sendSticker(process.env.CHAT_ID, messege.text.stikerYodaThinking);
    bot.telegram.sendMessage(process.env.CHAT_ID, quoteText)
  }
  sendMessage();
}, {
  timezone: "Europe/Moscow",
})


bot.command('quote', ctx => {
  async function sendMessage() {
    quoteText = await getQuote()
    ctx.reply(quoteText)
  }
  sendMessage();
})

const getSmailNumber = (number) => {
  switch (number) {
    case 1: return '1️⃣'
    case 2: return '2️⃣'
    case 3: return '3️⃣'
    case 4: return '4️⃣'
    case 5: return '5️⃣'
    case 6: return '6️⃣'
    default:
      break;
  }
}
bot.command('kube', ctx => {
  const number = getSmailNumber(getRandomInt(1, 6))
  ctx.reply(`${ctx.message.from.first_name} бросает кубик и у него выпадает ${number}`)
})
// отправка сообщений
bot.hears(/админ/i, ctx => {
  if (ctx.update.message.from.id == process.env.MY_ID &&
    ctx.update.message.chat.id !== process.env.CHAT_ID) {

    const text = ctx.update.message.text.split(' ').slice(1)
    bot.telegram.sendMessage(process.env.CHAT_ID, text.join(' '))
  }

}) // Отправка стикеров
bot.on('sticker', ctx => {
  if (ctx.update.message.from.id == process.env.MY_ID &&
    ctx.update.message.chat.id !== process.env.CHAT_ID) {
    bot.telegram.sendSticker(process.env.CHAT_ID, ctx.message.sticker.file_id)
  }

})
bot.on('voice', ctx => {
  if (ctx.update.message.from.id == process.env.MY_ID &&
    ctx.update.message.chat.id !== process.env.CHAT_ID) {
    bot.telegram.sendVoice(process.env.CHAT_ID, ctx.message.voice.file_id)
  }

})



bot.launch()
// Включить изящную остановку
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
