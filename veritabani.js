const Database = require('better-sqlite3');
const db = new Database('blog.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS yazilar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        baslik TEXT NOT NULL,
        tarih TEXT NOT NULL,
        ozet TEXT NOT NULL,
        icerik TEXT NOT NULL
    )
`);

const adet = db.prepare('SELECT COUNT(*) as sayi FROM yazilar').get();

if (adet.sayi === 0) {
    db.prepare(`
        INSERT INTO yazilar (baslik, tarih, ozet, icerik) 
        VALUES (?, ?, ?, ?)
    `).run(
        'Yapay Zeka Nedir',
        '16.03.2026',
        'Yapay zeka, bilgisayarların insan benzeri düşünme ve öğrenme yetenekleri...',
        'Yapay zeka hakkında detaylı içerik buraya gelecek.'
    );

    db.prepare(`
        INSERT INTO yazilar (baslik, tarih, ozet, icerik) 
        VALUES (?, ?, ?, ?)
    `).run(
        'Siber Güvenlik Nedir',
        '16.03.2026',
        'Siber güvenlik, bilgisayar sistemlerindeki verilerin ve ağların korunması...',
        'Siber güvenlik hakkında detaylı içerik buraya gelecek.'
    );
}

module.exports = db;
