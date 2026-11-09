# REM — Real Estate Marketplace

Ko‘chmas mulk e’lonlari platformasi: sotuv va ijara e’lonlarini ko‘rish, qidirish, filtrlash, saqlash va sotuvchiga murojaat yuborish. Sotuvchi o‘z e’lonlarini boshqaradi, admin e’lonlarni moderatsiya qiladi.

Yakuniy imtihon loyihasi (NestJS Capstone).

![Bosh sahifa](docs/screenshots/home.png)

## Jamoa

| A’zo | Rol | Asosiy hissa |
| --- | --- | --- |
| _Ism Familiya_ | Backend | _to‘ldiring_ |
| _Ism Familiya_ | Backend / DB | _to‘ldiring_ |
| _Ism Familiya_ | Frontend | _to‘ldiring_ |

## Stack

| Qism | Texnologiya |
| --- | --- |
| Backend | NestJS 12, Prisma 6, PostgreSQL, JWT (passport-jwt), bcrypt, class-validator, Multer, `@nestjs/mail`, Swagger |
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS 4, TanStack Query, i18next, lucide-react |
| Testlar | Vitest |

## Tuzilma

```
.
├── src/                    # NestJS backend
│   ├── auth/               # register, login, JWT, email tasdiqlash
│   ├── users/              # GET/PATCH /users/me
│   ├── categories/         # kategoriyalar CRUD (admin)
│   ├── properties/         # e’lonlar CRUD, filter, rasm upload (Multer)
│   ├── favorites/          # saqlanganlar
│   ├── inquiries/          # murojaatlar
│   ├── admin/              # moderatsiya, foydalanuvchilar
│   └── common/             # guardlar, dekoratorlar, umumiy DTO va validatsiya
├── prisma/                 # schema.prisma, migratsiyalar, seed.ts
├── frontend/               # React frontend (alohida README bor)
├── docs/screenshots/       # screenshotlar
└── uploads/                # yuklangan rasmlar (git’ga kirmaydi)
```

## Imkoniyatlar

- **Rollar:** Guest (ko‘rish, qidirish, filtr), User/Seller (o‘z e’lonlari CRUD, rasm, favorites, inquiry), Admin (moderatsiya, foydalanuvchilar, kategoriyalar).
- **Biznes qoidalari:**
  - yangi e’lon `PENDING` holatida yaratiladi, ro‘yxatda faqat `APPROVED` e’lonlar ko‘rinadi;
  - tasdiqlangan e’lon tahrirlansa, u qayta `PENDING` bo‘ladi, ya’ni tasdiqdan keyin mazmunni almashtirib bo‘lmaydi;
  - e’lonni faqat egasi o‘zgartira yoki o‘chira oladi;
  - favorite `unique(userId, propertyId)`;
  - o‘z e’loniga murojaat yuborib bo‘lmaydi.
- **Ro‘yxatdan o‘tish:**
  - ism-familiya, email, telefon va parol kiritiladi;
  - telefon `+998` bilan, O‘zbekiston operator kodlari tekshiriladi;
  - emailga 6 xonali kod yuboriladi: kod 10 daqiqa amal qiladi, qayta yuborish 1 daqiqadan keyin, bitta email uchun 24 soatda 5 ta kod;
  - kod tasdiqlangach foydalanuvchi avtomatik tizimga kiradi.
- **Mehmon oqimi:** e’londa “Sotib olishga qiziqaman” yoki “Sotuvchi bilan bog‘lanish” bosilsa, ro‘yxatdan o‘tish ochiladi. Undan keyin foydalanuvchi o‘sha e’longa qaytadi. Sotuvchi telefoni faqat ro‘yxatdan o‘tganlarga ko‘rinadi.
- **Frontend:**
  - 4 til: O‘zbek (lotin), Ўзбек (кирилл), Русский, English;
  - Qora (asosiy) va Oq mavzu;
  - responsive (360–1440 px), klaviatura va screen reader uchun qulayliklar.

Xarid yoki to‘lov funksiyasi yo‘q: “sotib olishga qiziqaman” tugmasi sotuvchiga murojaat (inquiry) yuboradi.

## O‘rnatish (local)

Talablar: Node.js 22+, PostgreSQL 14+ (local).

```bash
# 1. Backend dependencylari
npm install

# 2. .env yaratish va to'ldirish
cp .env.example .env

# 3. Prisma client, migratsiyalar va demo ma'lumotlar
npx prisma generate
npx prisma migrate deploy
npm run seed

# 4. Backendni ishga tushirish (http://localhost:3000, Swagger: /api)
npm run start:dev
```

Frontend (alohida terminalda):

```bash
cd frontend
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

## `.env` o‘zgaruvchilari

| O‘zgaruvchi | Majburiy | Tavsif |
| --- | --- | --- |
| `DATABASE_URL` | ha | PostgreSQL ulanish manzili, masalan `postgresql://postgres:parol@localhost:5432/real_estate_db?schema=public` |
| `JWT_SECRET` | ha | JWT imzo kaliti (uzun tasodifiy satr) |
| `JWT_EXPIRES_IN` | yo‘q | Token muddati, standart `7d` |
| `PORT` | yo‘q | Backend porti, standart `3000` |
| `SMTP_URL` | yo‘q | Email yuborish uchun SMTP. Gmail: `smtps://LOGIN%40gmail.com:APP_PASSWORD@smtp.gmail.com:465` (App password kerak). Bo‘sh bo‘lsa, kod xat o‘rniga **backend logiga** yoziladi |
| `MAIL_FROM` | yo‘q | Jo‘natuvchi, masalan `REM <LOGIN@gmail.com>` |
| `BREVO_API_KEY` | yo‘q | Brevo HTTPS API kaliti. Railway Free/Trial/Hobby tariflari SMTP’ni bloklaydi, u yerda email shu orqali yuboriladi. Berilsa `SMTP_URL` dan ustun turadi; `MAIL_FROM` Brevo’da tasdiqlangan jo‘natuvchi bo‘lishi kerak |

Frontend: `frontend/.env` dagi `VITE_API_BASE_URL` (standart `http://localhost:3000`).

`.env` fayllar git’ga kiritilmaydi, namunasi `.env.example` da.

## Demo ma’lumotlar (`npm run seed`)

| Rol | Email | Parol |
| --- | --- | --- |
| Admin | `admin@example.com` | `Admin123` |
| Seller | `seller1@example.com` | `Seller123` |
| Seller | `seller2@example.com` | `Seller123` |

Seed 4 ta kategoriya (Kvartira, Uy, Ofis, Yer) va 8 ta e’lon yaratadi (6 tasi `APPROVED`, 2 tasi `PENDING` — moderatsiya demo uchun). Rasmlar `uploads/` ga yoziladi.

## Internetsiz (offline) demo

Imtihon talabiga ko‘ra loyiha internetsiz ham ishlashi kerak:

1. `DATABASE_URL` **local** PostgreSQL’ga qarashi kerak (bulutdagi DB internet talab qiladi).
2. `SMTP_URL` ni bo‘sh qoldiring. Shunda tasdiqlash kodi xat bilan ketmaydi, backend terminalida `[LogMailTransport] "REM: tasdiqlash kodi 123456"` ko‘rinishida chiqadi, ro‘yxatdan o‘tish shu kod bilan davom etadi.
3. Bosh sahifadagi fon rasmlari Unsplash’dan yuklanadi. Internet bo‘lmasa, o‘rnida gradient fon qoladi. Shrift (Inter) va ikonalar loyiha ichida.

## API

Swagger: `http://localhost:3000/api`

| Modul | Endpointlar |
| --- | --- |
| Auth | `POST /auth/email/send-code` · `POST /auth/email/verify` · `POST /auth/register` · `POST /auth/login` · `GET /auth/me` |
| Users | `GET /users/me` · `PATCH /users/me` |
| Categories | `GET /categories` · `POST /categories` · `PATCH /categories/:id` · `DELETE /categories/:id` |
| Properties | `GET /properties` (page, limit, city, category, type, minPrice, maxPrice, rooms, sort) · `GET /properties/:id` · `GET /properties/my/list` · `POST /properties` · `PATCH /properties/:id` · `DELETE /properties/:id` |
| Images | `POST /properties/:id/images` (multipart, `file`) · `DELETE /properties/:id/images/:imageId` |
| Favorites | `GET /favorites` · `POST /favorites/:propertyId` · `DELETE /favorites/:propertyId` |
| Inquiries | `POST /properties/:propertyId/inquiries` · `GET /inquiries/my` |
| Admin | `GET /admin/properties?status=PENDING` · `PATCH /admin/properties/:id/status` · `GET /admin/users` |

`POST /auth/register` faqat email `POST /auth/email/verify` orqali tasdiqlangandan keyin (30 daqiqa ichida) ishlaydi.

## Testlar

```bash
npm test                       # backend unit testlar (Vitest)
cd frontend && npm run build   # frontend TypeScript + production build
```

## Screenshotlar

| E’lonlar | E’lon tafsiloti |
| --- | --- |
| ![Katalog](docs/screenshots/catalog.png) | ![Tafsilot](docs/screenshots/detail.png) |

| Ro‘yxatdan o‘tish | Mobil |
| --- | --- |
| ![Ro‘yxatdan o‘tish](docs/screenshots/register.png) | ![Mobil](docs/screenshots/home-mobile.png) |

## Tashqi manbalar va cheklovlar

- Bosh sahifa fon rasmlari: [Unsplash](https://unsplash.com/license) (Unsplash License).
- Shrift: Inter (`@fontsource-variable/inter`, SIL Open Font License). Ikonalar: lucide-react (ISC).
- Loyihani yozishda AI yordamchisidan (Claude) foydalanilgan. Kod jamoa tomonidan ko‘rib chiqilgan va moslashtirilgan.
- Cheklovlar:
  - to‘lov va xarita integratsiyasi yo‘q;
  - sotuvchi o‘ziga kelgan murojaatlarni ko‘radigan endpoint yo‘q, faqat yuborilganlari bor;
  - admin e’lonlarni status bo‘yicha ko‘radi;
  - saqlangan telefon raqamini profilda bo‘shatib bo‘lmaydi.
