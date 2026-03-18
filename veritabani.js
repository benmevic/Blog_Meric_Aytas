const Database = require('better-sqlite3');
const db = new Database('blog.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS yazilar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        baslik TEXT NOT NULL,
        tarih TEXT NOT NULL,
        icerik TEXT NOT NULL,
        resim TEXT
    )
`);

const adet = db.prepare('SELECT COUNT(*) as sayi FROM yazilar').get();


module.exports = db;
