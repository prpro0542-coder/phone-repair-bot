const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// برای آنلاین ماندن ربات
const http = require('http');
setInterval(() => {
  http.get('http://localhost:3000');
}, 300000);

// دستور start
bot.start((ctx) => {
  ctx.reply('🛠️ سلام! به ربات تعمیرات موبایل خوش آمدید!', {
    reply_markup: {
      keyboard: [
        ['📱 ثبت درخواست تعمیر'],
        ['💰 استعلام قیمت', '📞 پشتیبانی']
      ],
      resize_keyboard: true
    }
  });
});

// منوی اصلی
bot.hears('📱 ثبت درخواست تعمیر', (ctx) => {
  ctx.reply('✅ برای ثبت درخواست تعمیر، روی دکمه زیر کلیک کنید:', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🚀 بازکردن فرم ثبت درخواست',
          web_app: { url: 'https://deft-narwhal-6f66e0.netlify.app/' }
        }
      ]]
    }
  });
});

bot.hears('💰 استعلام قیمت', (ctx) => {
  ctx.reply(`📋 لیست قیمت خدمات:\n
• تعویض صفحه آیفون: 200,000 تومان
• تعویض باتری: 80,000 تومان  
• رفع مشکل نرم‌افزاری: 50,000 تومان`);
});

bot.hears('📞 پشتیبانی', (ctx) => {
  ctx.reply(`📞 راه‌های ارتباطی:\n
☎️ تلفن: ۰۲۱-۱۲۳۴۵۶۷۸
📱 واتس‌اپ: ۰۹۱۲۳۴۵۶۷۸۹`);
});

// دریافت داده از وب‌اپ
bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data.json);
    ctx.reply(`✅ درخواست ثبت شد!\nنام: ${data.name}\nتلفن: ${data.phone}`);
  } catch (error) {
    ctx.reply('❌ خطا در ثبت درخواست');
  }
});

console.log('🤖 ربات روشن شد...');
bot.launch();
