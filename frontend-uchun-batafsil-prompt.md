Sen tajribali frontend dasturchi va UI/UX dizaynersan. Mavjud REM — Real Estate Marketplace backendiga ulangan, to'liq ishlaydigan frontend yarat. Quyidagi talablarni bir butun loyiha sifatida amalga oshir.

1. LOYIHA KONTEKSTI VA CHEGARALARI

Bu ko'chmas mulkni sotish va ijaraga berish e'lonlari platformasi. Saytdagi "mahsulot" — ko'chmas mulk e'loni.

Mavjud backend NestJS + Prisma + PostgreSQL asosida yozilgan. Avval uning controller, DTO va response shakllarini o'qi. Backendning src/, prisma/, package.json, .env va boshqa fayllarini o'zgartirma. Frontendni alohida frontend/ papkasida, o'z package.json va sozlamalari bilan yarat. APIga tegishli muammo topsang, uni alohida qayd et; yashirincha backendni tahrirlama.

Stek: React + TypeScript + Vite, React Router, Tailwind CSS, TanStack Query, i18next + react-i18next. Ikonalar uchun bitta izchil kutubxonadan foydalan. Keraksiz dependencylar qo'shma. Kod o'qishga va talaba tomonidan himoyada tushuntirishga qulay bo'lsin.

2. IKKITA REFERENS RASM VA YAGONA DIZAYN TIZIMI

Birinchi rasm light mode uchun asos: oq fon, ko'k aksentlar, aniq navbar, hero, qidiruv paneli, chap filtrlar va tartibli e'lon kartochkalari.

Ikkinchi rasm dark mode uchun asos: to'q grafit fon, och matn, iliq oltin aksentlar, katta ko'chmas mulk rasmlari va premium kayfiyat.

Bular ikkita alohida sayt emas. Bitta ilovaning ikkita mavzusi bo'lsin. Rejim almashganda marshrut, sahifa tuzilishi, filtrlar, ma'lumotlar va foydalanuvchi holati saqlansin.

Light ranglari:
- Fon: #F6F8FC
- Kartochka va navbar: #FFFFFF
- Asosiy matn: #0F172A
- Ikkinchi darajali matn: #475569
- Chegara: #CBD5E1
- Asosiy aksent: #1D4ED8
- Aksent ustidagi matn: #FFFFFF

Dark ranglari:
- Fon: #101719
- Kartochka va navbar: #1C2529
- Asosiy matn: #F4F1E8
- Ikkinchi darajali matn: #B7C0C4
- Chegara: #3B484E
- Asosiy aksent: #D9B87A
- Aksent ustidagi matn: #14191B

Ranglarni semantik CSS tokenlari orqali boshqar: background, surface, text, muted, border, primary, on-primary, danger, success, warning. Tugma, input, dropdown, drawer, modal, toast, skeleton, pagination, footer, seller va admin sahifalari ham ikki rejimga mos bo'lsin.

REM belgisi, izchil outline ikonalar, 12–16 px radius, tartibli spacing, yengil soyalar va sifatli rasmlar ishlat. Asosiy matn va navbar uchun lotin/kirill harflarini qo'llaydigan Noto Sans yoki mos shrift ishlat. Ў, Қ, Ғ, Ҳ harflarini tekshir. Sarlavhalar referensdagi xarakterga mos, lekin o'qilishi oson bo'lsin.

3. DARK/LIGHT REJIMNING ISHLASHI

Navbar ichida mavzu boshqaruvi bo'lsin: "Tizim", "Oq", "Qora". Light va dark uchun quyosh/oy ikonalari ishlat.

Tanlovni localStorage'da saqla. Tanlov bo'lmasa, tizim mavzusini qo'lla. "Tizim" tanlanganda OS mavzusi o'zgarsa, ilova ham yangilansin. Sahifa yangilanganda tanlov saqlansin, dastlab noto'g'ri fon chaqnashi bo'lmasin. color-scheme va asosiy sahifa fonini ham moslashtir.

Hover/focus/disabled/error holatlarini har ikki rejimda tekshir. Matn kontrasti yetarli bo'lsin. Rang o'zgarishi taxminan 150–250 ms, reduced-motion holatida minimal bo'lsin.

4. UCH TIL, TO'RTTA TIL/YOZUV VARIANTI

Uch tilni qo'lla: o'zbek, rus, ingliz. O'zbek ikki yozuvda bo'lsin:
- uz-Latn — O'zbekcha
- uz-Cyrl — Ўзбекча
- ru — Русский
- en — English

Demak, til tanlash menyusida to'rtta variant bo'ladi. Boshlang'ich til — o'zbek lotin. Tanlovni localStorage'da saqla va refreshdan keyin tikla.

i18next orqali to'liq tarjima lug'atlari yarat. Navbar, bo'limlar, tugmalar, formalar, validation, statuslar, filterlar, sort, toastlar, loading/empty/error, 404/403, accessibility yozuvlari va kabinet/admin matnlari tarjima qilinsin. document lang atributi ham yangilansin. Kirill tarjimasini tekshirilmagan avtomatik transliteratsiya bilan cheklama.

Misollar:
- Bosh sahifa / Бош саҳифа / Главная / Home
- E'lonlar / Эълонлар / Объявления / Listings
- Saqlanganlar / Сақланганлар / Избранное / Saved
- Kirish / Кириш / Войти / Sign in
- Ro'yxatdan o'tish / Рўйхатдан ўтиш / Регистрация / Sign up
- E'lon berish / Эълон бериш / Подать объявление / Post a listing
- Murojaat yuborish / Мурожаат юбориш / Отправить запрос / Send inquiry

API enumlari va field nomlarini tarjima qilma. categoryId/slug hamda shahar filterining asl qiymatini saqla; faqat ko'rinadigan labelni tarjima qil. Ma'lum kategoriya sluglari uchun tarjima xaritasi, noma'lumlari uchun original name fallback bo'lsin.

Backendda ko'p tilli e'lon maydonlari yo'q. Foydalanuvchi kiritgan title, description, address va ismlarni asl holida ko'rsat. Til almashganda e'lonlar avtomatik tarjima bo'lgandek ko'rsatma.

Narx/sanalarni locale bo'yicha formatla, lekin property.currency qiymatini saqla. USDni o'z-o'zidan UZSga aylantirma.

5. NAVBAR VA NAVIGATSIYA

Desktop navbar:
- REM logotipi: bosh sahifaga olib boradi.
- Bosh sahifa.
- E'lonlar.
- Bo'limlar: API kategoriyalari bilan dropdown.
- Saqlanganlar.
- Til/yozuv menyusi.
- Mavzu tanlash.
- Mehmon uchun Kirish va E'lon berish.
- Tizimga kirgan foydalanuvchi uchun profil menyusi.

Profil menyusi: Profilim, Mening e'lonlarim, Saqlanganlar, Murojaatlarim, Chiqish. ADMIN rolida Admin panel havolasi ham ko'rinsin. USER sotuvchi amallarini ham bajaradi; mavjud bo'lmagan SELLER rolini talab qilma.

Navbar yuqorida sticky bo'lsin, active sahifa aniq ajralsin. Dropdownlar bosish, klaviatura, Escape va tashqariga bosish bilan ishlasin. Faqat hoverga tayanma.

Mobil navbar: REM, mavzu/til boshqaruvi va hamburger. Drawer ichida to'liq navigatsiya bo'lsin. Pastki navigatsiyada Bosh sahifa, E'lonlar, Saqlanganlar, Kabinet bo'lsin. Drawer va bottom navbar kontentni yopmasin; safe-area hisobga olinsin. Til nomlari ruscha/inglizchada uzayganda navbar buzilmasin.

6. MEHMON, REGISTRATSIYA VA XARIDGA QIZIQISH OQIMI

Sayt ochilganda majburiy login oynasini chiqarma. Mehmon bosh sahifa, bo'limlar, katalog, filter/sort/pagination va APPROVED e'lon tafsilotini erkin ko'rsin.

"Sotib olish" va "Ijara" qidiruv tablari katalog filtrlari: ularni mehmon ham ishlatadi. Bu tablarni autentifikatsiya bilan to'sma.

E'lon tafsilotidagi asosiy CTA:
- SALE: "Sotib olishga qiziqaman".
- RENT: "Ijaraga olishga qiziqaman".

Mehmon shu CTAni bossa, uni ro'yxatdan o'tish sahifasiga yo'naltir. Qisqa matn: "Sotuvchiga murojaat qilish uchun ro'yxatdan o'ting." "Akkauntingiz bormi? Kirish" havolasi ham bo'lsin.

Tanlangan propertyId, ichki returnTo va kerakli actionni saqla. Register/login sahifalari orasida o'tganda bu kontekst yo'qolmasin. returnTo faqat sayt ichidagi ruxsat etilgan manzil bo'lsin.

Backend registerdan user qaytaradi, token qaytarmaydi. Register muvaffaqiyatidan keyin login sahifasiga o'tkaz; emailni oldindan to'ldirish mumkin. Login {accessToken,user} qaytargach autentifikatsiya holatini yarat. Parolni storagega yozma.

Login tugagach foydalanuvchi o'sha e'longa qaytsin va murojaat formasi ochilsin. Xabarni avtomatik yuborma; foydalanuvchi ko'rib, tasdiqlab yuborsin.

Muhim: backendda purchase/order/checkout/payment endpointi yo'q. Xaridga qiziqish mavjud inquiry APIga olib boradi. "Xarid amalga oshdi", to'lov yoki buyurtma muvaffaqiyati kabi yolg'on natija ko'rsatma.

Mehmon Saqlanganlar, yurakcha, E'lon berish yoki Kabinetni tanlasa ham register/login oqimi ishlasin. Oddiy e'lon kartochkasini ochish login talab qilmasin.

7. ASOSIY SAHIFA VA KATALOG

Bosh sahifada hero, sotib olish/ijara tablari, shahar/kategoriya/narx qidiruvi, API bo'limlari va yangi e'lonlar bo'lsin. Bo'lim tanlanganda katalog shu kategoriya bilan ochilsin.

Katalog:
- Desktopda chap filtr paneli, o'ngda kartochkalar.
- Mobil qurilmada filter drawer.
- Filtrlar: city, category, type, minPrice, maxPrice, rooms.
- Saralash: newest, price_asc, price_desc.
- Server pagination, total va bo'sh natija holati.
- Faol filtrlar va "Tozalash" tugmasi.
- Filtrlar URL queryda saqlansin; refresh va Back/Forward ishlasin.
- Filtr o'zgarganda page=1 bo'lsin.
- minPrice > maxPrice bo'lsa xato ko'rsat.
- Backend rooms bo'yicha aniq tenglikni tekshiradi: 4+ deb >=4 ma'nosini va'da qilma. "4 xona" kabi aniq variant ishlat.
- Backend umumiy title/description qidiruvini qo'llamaydi. Shahar inputini "Shahar bo'yicha qidirish" deb nomla; ishlamaydigan universal search yaratma.

Kartochka: rasm, Sotuv/Ijara badge, yurakcha, title, city/address, price/currency, rooms va area. Rasm bo'lmasa sifatli fallback ishlasin. Card link va yurakcha alohida bosilsin; yurakcha bosilganda tasodifan detail ochilmasin.

Reyting, tasdiqlangan sotuvchi, ko'rishlar soni, sun'iy statistika yoki tavsiya algoritmini mavjud ma'lumotdek ko'rsatma.

8. E'LON TAFSILOTI VA MUROJAAT

Tafsilot sahifasi: rasmlar galereyasi, sarlavha, narx/valyuta, sotuv/ijara turi, kategoriya, manzil, shahar, maydon, xonalar, hammomlar, tavsif va egasi haqidagi mavjud ma'lumotlar.

images ni sortOrder bo'yicha tartibla. Nisbiy /uploads/... yo'llarini backend originiga ulab och. Galereya mobil swipe yoki qulay oldingi/keyingi boshqaruvlarga ega bo'lsin.

Murojaat formasi:
- message: majburiy, 1–1000 belgi.
- phone: ixtiyoriy.
- loading, disabled, field error va muvaffaqiyat xabari.
- O'z e'loniga murojaat yuborish tugmasi o'rniga egasiga mos boshqaruv ko'rsat.
- E'lon yo'q yoki kirish mumkin bo'lmasa, tushunarli holat chiqsin.
- Success faqat API muvaffaqiyatidan keyin ko'rsatilsin.

9. AUTH, PROFIL VA SHAXSIY SAHIFALAR

Register: fullName, email, password, optional phone. Parol kamida 6 belgi. Confirm password faqat frontendda tekshirilsin, APIga yuborilmasin. Registerdan role yuborma.

Login: email, password, parolni ko'rish/yashirish, aniq validation va backend xatolari.

Token uchun bitta izchil boshqaruv qo'lla. Ushbu loyiha doirasida accessTokenni sessionStorage'da saqlab, refreshda GET /auth/me orqali sessiyani tekshir; auth tekshiruvi tugamaguncha protected route shoshilib registerga o'tkazmasin. Tokenni URL yoki logga chiqarmagin. JWT_SECRET frontendga tushmasin.

Login paytidagi 401 forma xatosi sifatida chiqsin. Himoyalangan so'rovdagi sessiya muddati tugashi alohida boshqarilsin; token/cache tozalansin va qaytish manzili saqlansin. 403 holati "Ruxsat yo'q" bo'lsin. Logoutda foydalanuvchiga tegishli cache ham tozalansin.

Profil: fullName va phone ni yangilash. Hozirgi API qo'llamaydigan email/parol o'zgartirish tugmalarini ishlayotgandek yaratma.

Saqlanganlar API bilan ishlasin. GET /favorites natijasi ichidagi property ni to'g'ri o'qi. Bir e'lon ikki marta qo'shilsa 409ni boshqar.

Murojaatlarim sahifasi yuborilgan inquirylarni ko'rsatsin. Backendda suhbat, javob threadi yoki yetkazilgan/o'qilgan statusi yo'q.

10. SOTUVCHI KABINETI VA ADMIN PANEL

Sotuvchi kabineti:
- Mening e'lonlarim, server pagination.
- Yaratish, tahrirlash, o'chirish.
- PENDING, APPROVED, REJECTED statuslari tarjima bilan.
- Formada title, description, address, city, price, currency, area, rooms, bathrooms, listingType, categoryId.
- Son va majburiy maydonlar DTOga mos tekshirilsin.
- Avval e'lon yaratilsin, keyin rasmlar uning idsi orqali yuklansin.
- Har rasm alohida multipart so'rov: field nomi file.
- JPEG/PNG/WebP va har faylga 5 MiB chegarasi.
- Upload xato bo'lsa yaratilgan propertyId saqlansin, qayta urinilganda e'lon takroran yaratilmasin.
- O'chirish uchun tushunarli tasdiqlash oynasi.

Admin panel faqat ADMIN uchun:
- Status bo'yicha e'lonlar, boshlang'ich PENDING.
- E'lonni ko'rish, APPROVED/REJECTED qilish.
- Foydalanuvchilar ro'yxati.
- Kategoriyalar yaratish/tahrirlash/o'chirish.
- APIda mavjud bo'lmagan userni bloklash, rol o'zgartirish yoki butun sayt statistikasi funksiyalarini qo'shma.

11. MAVJUD API SHARTNOMASI

Frontend .env.example ichida VITE_API_BASE_URL bo'lsin. Mahalliy backend odatda http://localhost:3000. Ulanishni environment orqali sozla. /api — Swagger sahifasi, endpointlar uchun umumiy prefix emas.

Public:
GET /categories
GET /properties
GET /properties/:id

Auth:
POST /auth/register
POST /auth/login
GET /auth/me

User:
GET /users/me
PATCH /users/me

Seller:
GET /properties/my/list
POST /properties
PATCH /properties/:id
DELETE /properties/:id
POST /properties/:id/images
DELETE /properties/:id/images/:imageId

Favorites:
GET /favorites
POST /favorites/:propertyId
DELETE /favorites/:propertyId

Inquiries:
POST /properties/:propertyId/inquiries
GET /inquiries/my

Admin:
GET /admin/properties?status=PENDING
PATCH /admin/properties/:id/status
GET /admin/users
POST /categories
PATCH /categories/:id
DELETE /categories/:id

Property list javobi: {items,total,page,limit,totalPages}.
Query: page, limit, city, category, type, minPrice, maxPrice, rooms, sort.
limit 1–50 oralig'ida. Enumlarni aynan backend kutgan ko'rinishda yubor.
Protected so'rovlarga Authorization: Bearer <accessToken> yubor.

Backend response shakllarini TypeScript typelar bilan aks ettir; barcha endpointlarni bitta bir xil wrapper qaytaradi deb taxmin qilma. Narx Prisma Decimal sabab string kelishi mumkin.

Bitta API client yarat. Faqat kerakli joyga token yubor. API kutayotgan JSON yoki FormData formatini to'g'ri tanla; FormData boundarysini brauzer belgilasin.

12. LOYIHA TUZILISHI VA HOLATLAR

frontend/src/ ichida app, pages, components, features, services, hooks, types va locales kabi tushunarli bo'limlar bo'lsin. Komponentlar: Navbar, MobileNav, ThemeSelector, LanguageSelector, PropertyCard, FilterPanel, Pagination, PropertyGallery, InquiryForm, ProtectedRoute, AdminRoute, FormField va holat komponentlari.

Auth, theme va locale holatini vazifasiga mos boshqar. API ma'lumotlarini TanStack Queryda saqla. Query keylar barcha amaldagi filtrlarni hisobga olsin. Favorite/murojaat/moderatsiya/CRUDdan keyin tegishli cache yangilansin. Eski so'rov javobi yangi filter natijasini bosib ketmasin.

Barcha muhim sahifalarda skeleton/loading, empty, error + qayta urinish, unauthorized va kerakli success holatlari bo'lsin. Xatoni yashirib, o'rniga soxta e'lon qo'ymagin. Local demo rasmlari fallback bo'lishi mumkin, yakuniy e'lonlar real API ma'lumotidan kelsin.

13. RESPONSIVE VA ACCESSIBILITY

360, 390, 768, 1024 va 1440 px kengliklarda tekshir. Mobil bir ustun, planshet ikki, katta ekran yetarli joyda uch ustun. Gorizontal scroll bo'lmasin. Kartochka tasviri uchun barqaror aspect-ratio ishlat.

Tugmalar tegish uchun kamida 44x44 px bo'lsin. Formada ko'rinadigan label, xato maydon yonida, klaviatura fokusi va tushunarli aria-label bo'lsin. Dialog/drawer fokusni boshqarsin, Escape bilan yopilsin. Toast va muhim holat yangilanishlari yordamchi texnologiyalarga e'lon qilinsin. Statuslarni faqat rang bilan ajratma.

Mobil bottom navbar va detail CTA bir-birini yopmasin. Uzun ruscha/inglizcha matnlar va kirill shriftlarini tekshir.

14. TAYYORLIKNI TEKSHIRISH VA TOPSHIRISH

Quyidagi natijalarni amalda tekshir:
- Mehmon saytda bo'lim/katalog/detailni login qilmasdan ko'radi.
- Qidiruv tablari va barcha mavjud filtrlar haqiqiy API bilan ishlaydi.
- Guest xaridga qiziqish CTAni bosganda registerga o'tadi.
- Registerdan keyin login, so'ng aynan tanlangan e'lonning murojaat formasiga qaytadi.
- So'rov foydalanuvchi tasdig'idan keyin yuboriladi.
- Theme va locale sahifalar orasida hamda refreshdan keyin saqlanadi.
- Har ikkala theme barcha to'rtta locale bilan navbar, forma va kabinetlarda ishlaydi.
- Favorite, seller CRUD/upload, inquiry va admin moderatsiya API bilan ishlaydi.
- USER admin sahifasiga kirmaydi.
- Token muddati tugashi, 403/404, bo'sh natija, yo'q rasm va API ulanish xatosi boshqariladi.
- TypeScript tekshiruvi va production build o'tadi.
- Muhim oqimlar uchun mazmunli integratsion/E2E tekshiruvlar bajariladi; faqat komponent mavjudligini tekshiradigan yuzaki testlar bilan cheklanma.

Frontend READMEda o'rnatish/ishga tushirish, VITE_API_BASE_URL, backendga bog'liqliklar, to'rtta locale, theme rejimlari va mavjud API cheklovlarini yoz. Backend ishlamasa integratsiya tekshiruvlarini o'tdi deb da'vo qilma; bajarilgan va tekshirilmagan ishlarni aniq ajrat.

Yakuniy natija referenslarga yaqin, light/dark rejimli, uch tilli va o'zbek lotin/kirill yozuvli, mavjud REM backendiga haqiqiy ulangan frontend bo'lsin.

