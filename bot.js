const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'SUNUCU_IP_ADRESINIZ', // MagmaNode IP'sinin sadece yazı kısmı
        port: 25565,                // MagmaNode port numaranız
        username: 'MagmaBot_724',   // Botun oyundaki adı
        version: '1.20.1'           // Sunucunuzun Minecraft sürümü
    });

    // --- AUTHME OTOMATİK GİRİŞ AYARI ---
    const botSifresi = "MagmaBot1234"; // Bot için zor bir şifre belirle

    bot.on('spawn', () => {
        console.log('Bot sunucuya girdi, sifre giriliyor...');
        
        // Botun sunucuya ilk defa kayıt olması için (İlk girişte bir kere çalışır)
        bot.chat(`/register ${botSifresi} ${botSifresi}`);
        
        // Sonraki girişlerinde otomatik giriş yapması için
        setTimeout(() => {
            bot.chat(`/login ${botSifresi}`);
        }, 1500); // Sunucuya tam yerleşmesi için 1.5 saniye bekler

        // AFK kalıp atılmaması için her 60 saniyede bir zıplama koruması
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Baglanti koptu, 10 saniye sonra tekrar deneniyor...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', (err) => console.log('Hata olustu: ', err));
}
createBot();
