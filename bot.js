const mineflayer = require('mineflayer');
const http = require('http'); // Render'ı kandırmak için gerekli kütüphane

// --- 1. RENDER ZAMAN AŞIMINI ENGELLEMEK İÇİN SAHTE WEB SERVER ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot aktif ve 7/24 calisiyor!\n');
});

// Render otomatik olarak PORT adında bir değişken verir, yoksa varsayılan 10000'i kullanır
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Sahte web sunucusu ${PORT} portunda baslatildi. Render artik botu kapatmayacak!`);
});

// --- 2. MINEFLAYER BOT KODLARI ---
function createBot() {
    const bot = mineflayer.createBot({
        host: 'shadowmcs.duckdns.org',      // Buraya MagmaNode IP adresini yaz
        port: 25922,             // Buraya MagmaNode port numaranı yaz
        username: 'MagmaBot_724',// Botun oyundaki adı
        version: '1.20.4'        // Sunucunun Minecraft sürümü
    });

    const botSifresi = "MagmaBot1234"; // AuthMe şifren

    bot.on('spawn', () => {
        console.log('Bot MagmaNode sunucusuna basariyla girdi!');
        
        // AuthMe otomatik kayıt ve giriş komutları
        bot.chat(`/register ${botSifresi} ${botSifresi}`);
        setTimeout(() => {
            bot.chat(`/login ${botSifresi}`);
        }, 1500);

        // AFK kalıp atılmaması için 60 saniyede bir zıplama
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
