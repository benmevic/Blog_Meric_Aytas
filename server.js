const express = require('express');
const app = express();
const db = require('./veritabani');
const session = require('express-session');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'gizlianahtar123',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/giris', (req, res) => {
    res.render('giris');
});

app.post('/giris', (req, res) => {
    const { kullanici, sifre } = req.body;
    if (kullanici === 'admin' && sifre === '1234') {
        req.session.admin = true;
        res.redirect('/admin');
    } else {
        res.send('Hatalı kullanıcı adı veya şifre!');
    }
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
    res.render('index', { yazilar });
});

app.get('/hakkimda', (req, res) => {
    res.sendFile(__dirname + '/views/hakkimda.html');
});

app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor. (http://localhost:3000)');
});