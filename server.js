const express = require('express');
const app = express();
const db = require('./veritabani');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/resimler'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'barslab_siber_vatan',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/giris', (req, res) => {
    res.render('giris', { hata: undefined });
});

app.get('/yazi/:id', (req, res) => {
    const yazi = db.prepare('SELECT * FROM yazilar WHERE id = ?').get(req.params.id);
    if (!yazi) return res.send('Yazı bulunamadı.');
    res.render('yazi', { yazi });
});

app.post('/giris', (req, res) => {
    const { kullanici, sifre } = req.body;
    if (kullanici === 'bars_admin' && sifre === '1234') {
        req.session.admin = true;
        res.redirect('/admin');
    } else {
        res.render('giris', { hata: 'Kullanıcı adı veya şifre hatalı.' });
    }
});

app.post('/admin/ekle', (req, res) => {
    upload.single('resim')(req, res, (err) => {
        if (err) return res.send('Resim yüklenirken hata oluştu.');
        if (!req.session.admin) return res.redirect('/giris');
        const { baslik, tarih, icerik } = req.body;
        const resim = req.file ? '/resimler/' + req.file.filename : null;
        db.prepare('INSERT INTO yazilar (baslik, tarih, icerik, resim) VALUES (?, ?, ?, ?)')
          .run(baslik, tarih, icerik, resim);
        res.redirect('/admin');
    });
});

app.get('/admin/sil/:id', (req, res) => {
    if (!req.session.admin) return res.redirect('/giris');
    db.prepare('DELETE FROM yazilar WHERE id = ?').run(req.params.id);
    res.redirect('/admin');
});

app.get('/cikis', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/admin/duzenle/:id', (req, res) => {
    if (!req.session.admin) return res.redirect('/giris');
    const yazi = db.prepare('SELECT * FROM yazilar WHERE id = ?').get(req.params.id);
    res.render('duzenle', { yazi });
});

app.post('/admin/duzenle/:id', upload.single('resim'), (req, res) => {
    if (!req.session.admin) return res.redirect('/giris');
    const { baslik, tarih, icerik } = req.body;
    const mevcutYazi = db.prepare('SELECT * FROM yazilar WHERE id = ?').get(req.params.id);
    const resim = req.file ? '/resimler/' + req.file.filename : mevcutYazi.resim;
    db.prepare('UPDATE yazilar SET baslik = ?, tarih = ?, icerik = ?, resim = ? WHERE id = ?')
      .run(baslik, tarih, icerik, resim, req.params.id);
    res.redirect('/admin');
});

app.get('/admin', (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/giris');
    }
    const yazilar = db.prepare('SELECT * FROM yazilar').all();
    res.render('admin', { yazilar });
});

app.get('/', (req, res) => {
    const yazilar = db.prepare('SELECT * FROM yazilar').all();
    const yazilarOzet = yazilar.map(yazi => ({
        ...yazi,
        kisaIcerik: yazi.icerik.substring(0, 30) + '...'
    }));
    res.render('index', { yazilar: yazilarOzet });
});

app.get('/hakkimda', (req, res) => {
    res.sendFile(__dirname + '/views/hakkimda.html');
});

app.listen(1907, () => {
    console.log('Sunucu 1907 portunda çalışıyor. (http://localhost:1907)');
});