# Backend va kurs materiallari solishtiruvi

Sana: 2026-11-08. Loyiha: REM_server, mahalliy nusxa: C:/Users/user/Desktop/Imtihon.

## Natija

Backendning asosi kursdagi NestJS, TypeScript, PostgreSQL, Prisma, CRUD, DTO validation, bcrypt, JWT, role-based authorization va Multer mavzulariga mos. Shu asos ustiga qo'shimcha kutubxonalar, yordamchi metodlar va imtihon loyihasiga xos biznes qoidalari yozilgan.

Bu tekshiruv kod usullari va mavzularni solishtiradi. Aynan qaysi qatordan nusxa olingani, muallif yoki kod AI yordamida yozilgan-yozilmaganini isbotlamaydi.

"Materiallarda topilmadi" degani faqat berilgan fayllarda shu usulning aniq kodi yoki izohi aniqlanmaganini bildiradi. Bu mavzu og'zaki darsda o'tilmagan degan xulosa emas.

## Tekshiruv qamrovi

- 61 PDF: 476 sahifadan matn chiqarilib, backendda ishlatilgan tushunchalar va kutubxonalar bo'yicha qidirildi. Asosiy backend darslari to'liq matn bo'yicha o'qildi.
- 6 DOCX: matni o'qildi. Imtihon topshiriqlari darsda tushuntirilgan mavzudan alohida baholandi.
- 13 ZIP: fayllar ro'yxati va kichik kod/konfiguratsiya fayllari bajarilmasdan ko'rildi. node_modules, build va macOS yordamchi fayllari dars kodi sifatida hisobga olinmadi.
- 12 PNG: vizual ko'rildi. PostgreSQL skrinshotidagi ON DELETE CASCADE ham inobatga olindi.
- RAR: fayllar ro'yxati va asosiy JavaScript kodi o'qildi; u DOM asosidagi haydovchilik testi sahifasi ekan.
- html.mp4 videoning mazmuni tekshirilmagan. WinRAR o'rnatgichi dars materiali sifatida olinmagan.
- Asosiy tekshiruv statik kod tahlili; backend ishga tushirilmagan, testlar bajarilmagan.

## Darslarda bor va backendda ishlatilgan qismlar

| Mavzu | Kursdagi dalil | Backenddagi joyi va vazifasi |
| --- | --- | --- |
| NestJS Module, Controller, Service va DI | NestJS.pdf, 1-10-betlar | src/app.module.ts va barcha modullar. Controller so'rovni qabul qiladi, Service amallarni bajaradi, constructor orqali servislar ulanadi. |
| Prisma + PostgreSQL | Haqiqiy-databaza-PosgreSQL-Prisma.pdf, 2-12-betlar | prisma/schema.prisma, src/prisma/prisma.service.ts. Ma'lumot bazaga Prisma orqali yoziladi/o'qiladi. Dars ham Prisma 6 o'rnatishni ko'rsatgan. |
| CRUD: findMany, findUnique, create, update, delete | Validation-in-NestJS.pdf, 3-6-betlar | properties, users, categories servislarida. E'lon yaratish, olish, yangilash va o'chirish. |
| DTO, class-validator, ValidationPipe | Validation-in-NestJS.pdf, 7-10-betlar | DTO fayllari va src/main.ts. Matn, son, majburiy/ixtiyoriy maydonlar va chegaralarni tekshirish. |
| bcrypt.hash va bcrypt.compare | Foydalanuvchi-Autentifikatsiyasi.pdf, 5-10-betlar | src/auth/auth.service.ts. Parolni hash qilib saqlash va login paytida solishtirish. |
| JwtModule, JwtService.sign, Bearer token va Guard tushunchasi | Nima-Uchun-Login-Yetarli-Emas.pdf, 4-13-betlar | src/auth/auth.module.ts, auth.service.ts va JWT Guard. Token yaratish darsga mos; tekshirishning aniq usuli Passport bilan o'zgargan. |
| Role enum, @Roles, SetMetadata, RolesGuard, Reflector | Authentication-va-Authorization.pdf, 2-9-betlar | src/common/decorators/roles va src/common/guards/roles. ADMIN bo'lmagan foydalanuvchiga ayrim yo'llarni yopish. Bular yangi, darsdan tashqari mavzu emas. |
| Multer, FileInterceptor, diskStorage va ServeStaticModule | RasmFile-Yuklash-Multer-Prisma.pdf, 3-11-betlar | src/properties/properties.controller.ts, multer.config.ts, src/app.module.ts. Faylni uploads papkasiga saqlash va URL orqali ochish. |
| fs va path | Nodejs-Asosiy-Modullari.pdf, 1-5-betlar | mkdirSync, unlink, join, extname. Papka yaratish, rasmlarni o'chirish va fayl yo'llarini tuzish. Promise asosidagi fs/promises varianti kengaytirilgan qo'llanish. |
| ES modules: import/export va .js import | Nodejs-ga-Kirish.pdf, 8-bet | package.json: type=module, barcha TypeScript fayllaridagi importlar. ESMning o'zi yangi mavzu emas. |
| Foreign key, unique, default, munosabatlar va cascade tushunchasi | NOT-NULL-UNIQUE-va-DEFAULT.pdf, 1, 3, 5-betlar; PostgreSQL skrinshoti | prisma/schema.prisma. Prisma orqali yozilishi batafsilroq, lekin SQL asoslari kursda bor. |
| Saralash va natija sonini cheklash | ORDER-BY-va-LIMIT.pdf, 1-bet | properties.service.ts dagi orderBy, skip, take. SQL tushunchasi o'tilgan; Prisma sintaksisi kengaytirilgan. |
| CORS va dotenv | Backend Books Full.zip ichidagi script.js va package.json | src/main.ts dagi enableCors; dotenv/config importlari. Vazifasi avvalgi mashqda ham bor, NestJSda chaqirilishi boshqacha. |
| extends va instanceof | OOP-Principles-Static-Methods-instanceof-and-Mixins.pdf, 5 va 8-betlar | PrismaService extends PrismaClient; Prisma xatolari uchun instanceof tekshiruvi. Operatorlarning o'zi kursda bor. |

## Backendda bor, materiallarda aniq misoli topilmagan usullar

| # | Qo'shimcha usul | Nima qiladi? | Koddagi joyi |
| --- | --- | --- | --- |
| 1 | @nestjs/passport, passport-jwt, PassportStrategy | JWTni Authorization headerdan ajratish, imzo/muddatini tekshirish va validate natijasini request.user ga joylash jarayonini tashkil qiladi. Darsda bu vazifa qo'lda yozilgan CanActivate Guard orqali bajarilgan. | src/auth/jwt.strategy/jwt.strategy.ts; src/auth/auth.module.ts; src/common/guards/jwt-auth/jwt-auth.guard.ts |
| 2 | OptionalJwtAuthGuard | Token bilan ham, tokensiz ham e'lon tafsilotini ko'rishga yo'l beradi. Foydalanuvchi bo'lsa owner/admin tekshiruviga ishlatiladi. APPROVED bo'lmagan e'lonni guest ko'ra olmaydi. | src/common/guards/optional-jwt-auth/optional-jwt-auth.guard.ts; src/properties/properties.service.ts |
| 3 | @CurrentUser va createParamDecorator | request.user ni yoki uning id maydonini controller parametriga olib beradi. Har bir endpointda request.user.id ni takrorlashni kamaytiradi. @Roles dan boshqa turdagi custom decorator. | src/common/decorators/current-user/current-user.decorator.ts |
| 4 | PartialType va @nestjs/mapped-types | Create DTO maydonlarini meros qilib, update DTO uchun ixtiyoriy qiladi. Darsda Update DTO alohida @IsOptional bilan qo'lda yozilgan. | src/properties/dto/update-property.dto.ts; src/categories/dto/update-category.dto.ts |
| 5 | class-transformer dagi @Type(() => Number) | Query yoki formdan matn bo'lib kelgan sonlarni number ga aylantiradi. Masalan page=2 dagi "2" qiymati songa o'tadi. ValidationPipe transform tushunchasi darsda bor, aynan @Type misoli topilmadi. | src/common/dto/pagination-query.dto/pagination-query.dto.ts; src/properties/dto/query-properties.dto.ts |
| 6 | ParseIntPipe | URL ichidagi :id ni butun songa aylantiradi, yaroqsiz qiymatni controllerga o'tkazmaydi. | src/properties/properties.controller.ts va boshqa controllerlar |
| 7 | Swagger / OpenAPI | /api manzilida API hujjati va so'rov yuborish oynasini yaratadi. ApiConsumes va ApiBody rasm yuklash formasini hujjatlashtiradi. | src/main.ts; src/properties/properties.controller.ts |
| 8 | Prisma include va select | include bog'langan rasmlar/kategoriya/egani natijaga qo'shadi; select faqat kerakli maydonlarni qaytaradi. Masalan passwordHash javobdan chetda qoladi. SQL JOIN va ustun tanlash asoslari kursda bor; bu Prisma sintaksisi topilmadi. | src/properties/properties.service.ts; src/auth/auth.service.ts |
| 9 | Prisma skip, take, count, orderBy va contains/insensitive | Sahifalash, jami yozuv soni, saralash va shahar nomi bo'yicha harf kattaligiga qaramasdan filtrlash. SQL asoslari o'tilgan; tayyor Prisma so'rov shakli topilmadi. | src/properties/properties.service.ts; src/admin/admin.service.ts |
| 10 | Promise.all | E'lonlar ro'yxati va jami sonini olish kabi mustaqil asinxron ishlarni birga boshlaydi va hammasining natijasini kutadi. Bu database transaction emas. | src/properties/properties.service.ts; src/admin/admin.service.ts |
| 11 | Prisma sxemasidagi @relation, onDelete: Cascade, @@unique va Decimal(12,2) | Bog'lanishlar, bog'liq yozuvlarni avtomatik o'chirish, user-property juftligini takrorlamaslik va narxni ikki kasr xonasi bilan saqlash. Asosiy SQL munosabat/cascade/unique tushunchalari kursda bor; aynan Prisma yozilishi kengaytirilgan. | prisma/schema.prisma |
| 12 | PrismaClientKnownRequestError va P2002 | Unique constraint buzilganda, masalan bir favorite yoki slug takrorlanganda, tushunarli ConflictException qaytaradi. instanceof kursda bor; Prisma xato klassi/kodi misoli topilmadi. | src/favorites/favorites.service.ts; src/categories/categories.service.ts |
| 13 | OnModuleInit va $connect | NestJS modul ishga tushganda bazaga ulanishni chaqiradi. | src/prisma/prisma.service.ts |
| 14 | @Global() | PrismaModule ni global modul qilib, PrismaService ni boshqa modullarda har safar modul importini takrorlamasdan olish imkonini beradi. | src/prisma/prisma.module.ts |
| 15 | seed.ts va upsert | Demo Admin, 2 Seller, 4 kategoriya va 8 e'lonni tayyorlaydi; mavjud user/category uchun upsert yaratish yoki yangilashni bajaradi. SVG namunaviy rasmlar ham yozadi. Oldingi MERN imtihon DOCXida seed atamasi bor, ammo bunday kod namunasi topilmadi. | prisma/seed.ts |
| 16 | tsx nomli buyruq vositasi | npm run seed orqali TypeScript seed skriptini ishga tushiradi. Bu React .tsx fayl kengaytmasi bilan bir narsa emas. | package.json dagi seed script |
| 17 | prisma.config.ts, defineConfig va env | Prisma buyruqlari uchun schema, migrations va baza ulanishini sozlaydi. Darsda schema.prisma va .env bor; alohida bu konfiguratsiya fayli tushuntirilmagan. | prisma.config.ts |
| 18 | Upload cheklovlari va xatoda faylni tozalash | 5 MB limit, jpeg/png/webp MIME ro'yxati, noyobroq fayl nomi va DB/ownership tekshiruvi xato bo'lsa yuklangan faylni unlink orqali tozalash. Bazaviy upload darsda bor; bu aniq qo'shimcha tekshiruvlar topilmadi. | src/properties/multer.config.ts; src/properties/properties.service.ts |

## Test va ishlab chiqish vositalari

| Vosita | Vazifasi va hozirgi holati |
| --- | --- |
| Vitest, @vitest/coverage-v8 | Avtomatlashtirilgan testlar va test coverage. vitest.config.ts va vitest.config.e2e.ts da sozlangan. Kurs materiallarida topilmadi. |
| @nestjs/testing | Controller/service ni test uchun yig'ish. Uchta test faylida ishlatilgan. |
| Supertest | HTTP so'rov bilan E2E tekshiruv. test/app.e2e-spec.ts faqat GET / ning Hello World! javobini tekshiradi. |
| Vite | Ushbu backendda Vitest sozlamalari bilan bog'liq dev dependency. package.json dagi Vite borligi frontend allaqachon yozilganini bildirmaydi. |
| Oxlint va oxlint-tsgolint | npm run lint orqali kod/TypeScript bo'yicha tahlil. Biznes funksiyasi emas. |
| Prettier | npm run format orqali kodni bir xil formatga keltirish. Biznes funksiyasi emas. |
| @nestjs/mau va deploy script | Deploy uchun qo'shilgan paket/buyruq. Mavjudligi loyiha deploy qilinganini isbotlamaydi. |
| @types/* | Node, Express, Multer, bcrypt va boshqa paketlar uchun TypeScript turlari. Alohida API funksiyasi emas. |
| @nestjs/cli va @nestjs/schematics | nest buyruqlari va kod generatsiyasi. nest g module/controller/service darsda ko'rsatilgan. |
| rxjs va reflect-metadata | Nest ekotizimining yordamchi dependencylari. Loyiha src kodida alohida RxJS operatorlari ishlatilishi aniqlanmadi. |

Test fayllari asosan boshlang'ich tekshiruvlardan iborat: AppController Hello World!, PrismaService yaratilishi, GET /. Favorite/inquiry/admin biznes qoidalari uchun maxsus testlar mavjudligi aniqlanmadi. Testlar bu tahlilda ishga tushirilmadi.

## Paket ro'yxatida yoki READMEda bor, lekin amalda ulangan deb hisoblanmaydigan qismlar

- @nestjs/config dependency sifatida bor, ammo src ichida ConfigModule/ConfigService ishlatilmagan. Hozir .env dotenv/config bilan yuklanadi.
- README va AGENTS.md Observe haqidagi matnni o'z ichiga oladi. Lekin src/app.module.ts da ObserveModule va package.json da @nestjs/observe yo'q. Shuning uchun faol monitoring bor deb aytib bo'lmaydi.
- JWT_EXPIRES_IN .env.example da bor, ammo auth.module.ts da token muddati to'g'ridan-to'g'ri 7d qilib yozilgan. Faqat env qiymatini almashtirish hozir token muddatini o'zgartirmaydi.
- source-map-support dependency sifatida bor; src kodida unga bevosita import topilmadi.

## Imtihon loyihasiga moslashtirilgan biznes kodlari

Bular yangi framework emas; o'rganilgan CRUD, guards, validation va database munosabatlari yordamida yozilgan loyiha amallari:

- Favorites: bir user bir e'lonni faqat bir marta saqlaydi.
- Inquiries: login bo'lgan user boshqa sellerning APPROVED e'loniga murojaat yuboradi; o'z e'loniga yuborish rad etiladi.
- Admin moderatsiya: yangi e'lon PENDING; Admin APPROVED/REJECTED qiladi.
- Public katalog: faqat APPROVED e'lonlar chiqadi.
- Ownership: seller faqat o'z e'lonini va rasmlarini boshqaradi.
- Bir e'longa bir nechta PropertyImage va sortOrder.
- Filtrlar, pagination va user profili.

## Dars misolidan muhim aniq farqlar

1. JWT: darsda CanActivate ichida JwtService.verify yozilgan; loyihada PassportStrategy + AuthGuard('jwt') ishlatilgan.
2. Update DTO: darsda maydonlar @IsOptional bilan qayta yozilgan; loyihadagi property/category update DTOlarida PartialType mavjud. UpdateUserDto esa darsdagidek qo'lda @IsOptional bilan yozilgan.
3. ValidationPipe: darsdagi forbidNonWhitelisted: true loyiha main.ts da yo'q. Shuning uchun DTOda bo'lmagan maydonlar whitelist orqali olib tashlanadi, aynan shu sababning o'zi bilan 400 qaytarilmaydi.
4. Rasm yuklash: darsda createProduct so'rovi rasm bilan birga keladi va file fieldi image; loyihada e'lon va rasm alohida endpointlarda, file fieldi file.
5. Roles metadatasi: darsda 'roles' matn kaliti ishlatiladi. Loyihada Roles_Key nomli funksiya obyektidan kalit sifatida foydalanilgan; decorator va guard bir xil kalitni ishlatadi. Bu yozilishi murakkabroq, darsdagi sodda matn kaliti tushuntirishga osonroq.
6. ESM darsda bor. NodeNext/ES2023 va loyiha versiyalari konfiguratsiya tafsiloti; ESMni butunlay darsdan tashqari texnologiya deb ajratish to'g'ri emas.

## Himoyada tushuntirish uchun ustuvor mavzular

1. Passport JWT: token qayerdan olinadi, qanday tekshiriladi, request.user qayerdan keladi.
2. @CurrentUser: controllerga user id qanday tushadi.
3. PartialType, @Type va ParseIntPipe o'rtasidagi farq.
4. Prisma relation/include/select va sahifalash.
5. E'lon owner tekshiruvi, statuslar, favorite uniqueness va inquiry qoidalari.
6. Swagger faqat hujjatlashtirish/sinash oynasi ekanligi.
7. Seed, upsert va testlarning hozirgi qamrovi.

## Asosiy dars manbalari

- [NestJS darsi](<C:/Users/user/Desktop/Imtihon ppxt/NestJS.pdf>)
- [Prisma va PostgreSQL darsi](<C:/Users/user/Desktop/Imtihon ppxt/Haqiqiy-databaza-PosgreSQL-Prisma.pdf>)
- [NestJS validation darsi](<C:/Users/user/Desktop/Imtihon ppxt/Validation-in-NestJS.pdf>)
- [Register, login va bcrypt darsi](<C:/Users/user/Desktop/Imtihon ppxt/Foydalanuvchi-Autentifikatsiyasi.pdf>)
- [JWT va Guard darsi](<C:/Users/user/Desktop/Imtihon ppxt/Nima-Uchun-Login-Yetarli-Emas.pdf>)
- [Rollar va Reflector darsi](<C:/Users/user/Desktop/Imtihon ppxt/Authentication-va-Authorization.pdf>)
- [Multer va statik rasmlar darsi](<C:/Users/user/Desktop/Imtihon ppxt/RasmFile-Yuklash-Multer-Prisma.pdf>)
- [Node asosiy modullari](<C:/Users/user/Desktop/Imtihon ppxt/Nodejs-Asosiy-Modullari.pdf>)
- [ES module darsi](<C:/Users/user/Desktop/Imtihon ppxt/Nodejs-ga-Kirish.pdf>)
- [SQL constraint va munosabatlar](<C:/Users/user/Desktop/Imtihon ppxt/NOT-NULL-UNIQUE-va-DEFAULT.pdf>)
- [SQL saralash va LIMIT](<C:/Users/user/Desktop/Imtihon ppxt/ORDER-BY-va-LIMIT.pdf>)
- [OOP: extends va instanceof](<C:/Users/user/Desktop/Imtihon ppxt/OOP-Principles-Static-Methods-instanceof-and-Mixins.pdf>)
- [PostgreSQL skrinshoti](<C:/Users/user/Desktop/Imtihon ppxt/Screenshot 2026-10-05 at 19.38.50.png>)
- [CORS va dotenv ishlatilgan mashq arxivi](<C:/Users/user/Desktop/Imtihon ppxt/Backend Books Full.zip>)

