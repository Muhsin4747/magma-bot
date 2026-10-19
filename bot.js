const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'shadowmcs.duckdns.org', // Buraya MagmaNode IP'sinin sadece yazı kısmını yaz (Örn: ://magmanode.com)
        port: 25922,                // Buraya MagmaNode paneline verilen 5 haneli port numarasını yaz
        username: 'MagmaBot_724',   // Botun oyundaki adı
        version: '1.20.4'           // Sunucunun Minecraft sürümü neyse onu yaz (Örn: 1.20.1, 1.16.5 vb.)
    });

    bot.on('spawn', () => {
        console.log('Bot MagmaNode sunucusuna basariyla girdi!');
        // Botun AFK kalıp atılmaması için her 60 saniyede bir zıplamasını sağlar
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
