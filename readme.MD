# BarsLab Blog

Kişisel blog sitesi. Node.js, Express ve SQLite ile geliştirilmiştir.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- EJS (Şablon Motoru)
- SQLite (better-sqlite3)
- express-session
- multer

## Kurulum

Projeyi klonla:
```
git clone https://github.com/kullaniciadin/Siber_Vatan_Web_Blog.git
```

Bağımlılıkları yükle:
```
npm install
```

Sunucuyu başlat:
```
node server.js
```

Tarayıcıda aç:
```
http://localhost:1907
```

## Admin Paneli

Admin paneline erişmek için:
```
http://localhost:1907/giris
```

- Kullanıcı adı: `bars_admin`
- Şifre: `1234`

## Dosya Yapısı
```
Siber_Vatan_Web_Blog/
├── public/
│   ├── style.css
│   └── logo.jpg
├── views/
│   ├── index.ejs
│   ├── yazi.ejs
│   ├── hakkimda.html
│   ├── admin.ejs
│   ├── giris.ejs
│   └── duzenle.ejs
├── server.js
├── veritabani.js
├── package.json
└── .gitignore
```

## Özellikler

- Blog yazılarını listeleme
- Yazı detay sayfası
- Admin paneli ile yazı ekleme, düzenleme ve silme
- Yazılara resim yükleme
- Oturum yönetimi ile güvenli admin girişi