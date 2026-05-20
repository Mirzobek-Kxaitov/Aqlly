// Page sections for Aqlly

const goTo = (path) => {
  if (window.top) window.top.location.href = path;
  else window.location.href = path;
};

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
      <rect x="2" y="2" width="13" height="13" rx="3" fill="var(--accent)"/>
      <rect x="17" y="2" width="13" height="13" rx="3" fill="var(--accent)" opacity="0.55"/>
      <rect x="2" y="17" width="13" height="13" rx="3" fill="var(--accent)" opacity="0.75"/>
      <rect x="17" y="17" width="13" height="13" rx="3" fill="var(--accent)"/>
      <path d="M 8 21 L 10 23 L 13 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" }}>
      Aqlly
    </span>
  </div>
);

// ============================================================
// TOP NAV
// ============================================================
const TopNav = () => (
  <nav style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 28px", maxWidth: 1320, margin: "0 auto", gap: 16, flexWrap: "wrap",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
      <Logo />
      <span className="nav-tagline" style={{
        fontFamily: "'Caveat', cursive", fontSize: 18,
        color: "var(--muted)", whiteSpace: "nowrap",
      }}>
        Yaxshiroq darslar — tezroq
      </span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 14.5, flexWrap: "wrap" }}>
      <a href="#" style={navLink}>Bosh sahifa</a>
      <a href="#" style={navLink}>Imkoniyatlar</a>
      <a href="#" style={navLink}>Narxlar</a>
      <a href="#" style={{ ...navLink, display: "inline-flex", alignItems: "center", gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        Hamjamiyat
      </a>
      <button style={btnGhost} onClick={() => goTo("/kirish")}>Kirish</button>
      <button style={btnGhost} onClick={() => goTo("/ro-yxat")}>Bepul ro'yxat</button>
      <button style={langBtn} aria-label="Til">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
        <span>O'zbek</span>
        <span style={{ fontSize: 10 }}>▾</span>
      </button>
    </div>
  </nav>
);

const navLink = {
  color: "var(--ink)", textDecoration: "none", fontWeight: 600,
  fontFamily: "'Nunito', sans-serif",
};

const btnGhost = {
  background: "white", border: "1.5px solid var(--ink)", color: "var(--ink)",
  padding: "8px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer",
  fontFamily: "'Nunito', sans-serif", fontSize: 14,
};

const langBtn = {
  background: "white", border: "1.5px solid var(--border)", color: "var(--ink)",
  padding: "8px 12px", borderRadius: 6, fontWeight: 600, cursor: "pointer",
  fontFamily: "'Nunito', sans-serif", fontSize: 13,
  display: "inline-flex", alignItems: "center", gap: 6,
};

// ============================================================
// CARD wrapper
// ============================================================
const Card = ({ children, style }) => (
  <section style={{
    background: "white", borderRadius: 12, padding: "56px 64px",
    border: "1px solid var(--border)",
    ...style,
  }}>
    {children}
  </section>
);

// ============================================================
// HERO
// ============================================================
const Hero = ({ stats }) => (
  <Card style={{ padding: "48px 64px 56px" }}>
    <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
      <div>
        <h1 style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 52, fontWeight: 900, letterSpacing: "-0.025em",
          lineHeight: 1.05, margin: 0, color: "var(--ink)",
        }}>
          Ko'proq o'qitish,<br/>kamroq tayyorgarlik.
        </h1>

        <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            <>Atigi <b>1 daqiqada</b> interaktiv mashqlar yarating</>,
            <><b>1,2 million</b> tayyor materiallar kutubxonasi</>,
            <><b>30+ mashq turi</b>, AI yordamchi va bosma versiya</>,
          ].map((t, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 18, color: "var(--ink)" }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "var(--accent)", color: "white",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 900, flexShrink: 0, marginTop: 2,
              }}>✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 20 }}>
          <button style={ctaButton} onClick={() => goTo("/ro-yxat")}>Bepul boshlash</button>
          <span style={{
            background: "var(--accent-soft)", color: "var(--accent-dark)",
            padding: "8px 14px", borderRadius: 999, fontWeight: 700, fontSize: 14,
            fontFamily: "'Nunito', sans-serif",
          }}>
            {stats} ta resurs yaratildi
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <HeroIllustration />
      </div>
    </div>
  </Card>
);

const ctaButton = {
  background: "var(--accent)", color: "white", border: "none",
  padding: "16px 36px", borderRadius: 8, fontSize: 17, fontWeight: 800,
  cursor: "pointer", fontFamily: "'Nunito', sans-serif",
  boxShadow: "0 4px 0 var(--accent-dark)",
  whiteSpace: "nowrap",
};

// ============================================================
// EASY AS 1-2-3
// ============================================================
const EasySteps = () => {
  const steps = [
    { n: "1", caption: "Shablon tanlang.", Ill: LaptopPickTemplate },
    { n: "2", caption: "Kontentingizni kiriting.", Ill: LaptopEnterContent },
    { n: "3", caption: "Har qanday qurilmada o'ynang yoki chop eting.", Ill: PlayDevice },
  ];
  return (
    <Card>
      <h2 style={sectionTitle}>Atigi 1-2-3 dek oson</h2>
      <p style={sectionSub}>
        Bir nechta so'z va bir nechta klik bilan o'zingizning materialingizni yarating.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 48 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 8, minHeight: 200 }}>
              <span style={{
                fontFamily: "'Caveat', cursive", fontSize: 84, fontWeight: 700,
                color: "var(--accent)", lineHeight: 1,
              }}>
                {s.n}
              </span>
              <s.Ill />
            </div>
            <p style={{
              marginTop: 24, fontFamily: "'Nunito', sans-serif",
              fontSize: 17, color: "var(--ink)", fontWeight: 600,
            }}>
              {s.caption}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const sectionTitle = {
  textAlign: "center", margin: 0,
  fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 900,
  letterSpacing: "-0.02em", color: "var(--ink)",
};

const sectionSub = {
  textAlign: "center", margin: "12px 0 0",
  fontSize: 17, color: "var(--muted)", fontFamily: "'Nunito', sans-serif",
};

// ============================================================
// FEATURES (6)
// ============================================================
const Features = () => {
  const items = [
    { Icon: IconMinute, title: "1 daqiqada mashq yarating", body: "Kontentingizni kiriting yoki AI generatordan foydalaning — \"Play\" tugmasini bosing. Shu darajada oddiy." },
    { Icon: IconActivityTypes, title: "30+ mashq turi bir joyda", body: "Test, juftlash, kartochka, gapni to'ldirish, g'ildirakni aylantirish, guruhlash va boshqalar." },
    { Icon: IconCommunity, title: "1,2 million hamjamiyat resursi", body: "Ustozlar tomonidan yaratilgan millionlab mashqlar — bir bosishda o'ynang, bo'lishing va tahrirlang." },
    { Icon: IconPrint, title: "Har qanday mashqni chop eting", body: "Har qanday interaktiv mashqni darsda ishlatish yoki uy vazifasi sifatida ish varag'iga aylantiring." },
    { Icon: IconAssignments, title: "O'quvchi topshiriqlari", body: "Mashqlarni sinfda ekranda birga o'ynang yoki o'quvchilar o'z qurilmalarida o'ynasin — natijalarni kuzating." },
    { Icon: IconCustomize, title: "Mashqlarni moslashtirish", body: "Bitta bosish bilan o'yin qoidalari yoki vizuallarni o'zgartiring, kontentni boshqa mashqqa o'tkazing." },
  ];
  return (
    <Card>
      <h2 style={sectionTitle}>Aqlly ustozlarga qanday yordam beradi</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px 40px", marginTop: 48 }}>
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", height: 88, marginBottom: 18 }}>
              <it.Icon />
            </div>
            <h3 style={{
              margin: "0 0 10px", fontFamily: "'Nunito', sans-serif",
              fontSize: 19, fontWeight: 800, color: "var(--ink)",
            }}>
              {it.title}
            </h3>
            <p style={{
              margin: 0, fontFamily: "'Nunito', sans-serif",
              fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)",
              maxWidth: 280, marginInline: "auto",
            }}>
              {it.body}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <button style={ctaButton} onClick={() => goTo("/ro-yxat")}>Bepul boshlash</button>
        <a href="#" style={{ color: "var(--accent-dark)", fontWeight: 700, fontFamily: "'Nunito', sans-serif", textDecoration: "none" }}>
          Tariflar bilan tanishing →
        </a>
      </div>
    </Card>
  );
};

// ============================================================
// TEMPLATES (12)
// ============================================================
const Templates = () => {
  const items = [
    { Thumb: TTMatchUp, title: "Juftlash", body: "Har bir kalit so'zni uning ta'rifiga olib o'tkazib qo'ying." },
    { Thumb: TTQuiz, title: "Test", body: "Bir nechta tanlovli savollar. To'g'ri javobni belgilang." },
    { Thumb: TTFlashCards, title: "Kartochkalar", body: "Bir tomonida savol, ikkinchisida javob — o'zingizni sinab ko'ring." },
    { Thumb: TTSpeakingCards, title: "Nutq kartochkalari", body: "Aralashtirilgan kartochkalardan tasodifiy chiqaring." },
    { Thumb: TTSpinWheel, title: "G'ildirakni aylantir", body: "G'ildirakni aylantiring va keyingi navbat kimligini ko'ring." },
    { Thumb: TTGroupSort, title: "Guruhlash", body: "Har bir elementni o'z guruhiga olib o'tkazib qo'ying." },
    { Thumb: TTCompleteSentence, title: "Gapni to'ldirish", body: "So'zlarni matn ichidagi bo'sh joylarga tashlang." },
    { Thumb: TTUnjumble, title: "Aralashganni tartibga sol", body: "Har bir gapdagi so'zlarni to'g'ri tartibga keltiring." },
    { Thumb: TTFindMatch, title: "Mosini top", body: "Mos juftlikni bosing — barcha javoblar tugaguniga qadar takrorlang." },
    { Thumb: TTAnagram, title: "Anagramma", body: "Harflarni o'z o'rniga olib qo'yib so'z yoki iborani toping." },
    { Thumb: TTMatchingPairs, title: "Juftliklar", body: "Bir vaqtning o'zida ikki kartochkani oching — mos kelsa, qoladi." },
    { Thumb: TTOpenBox, title: "Qutini och", body: "Har bir qutini ochib, ichidagi savol yoki rasmni ko'ring." },
  ];
  return (
    <Card>
      <h2 style={sectionTitle}>Mashq shablonlarimiz bilan tanishing</h2>
      <p style={sectionSub}>Batafsil ma'lumot uchun shablonni tanlang</p>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px 20px", marginTop: 40,
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: "flex", gap: 14, padding: 12, border: "1px solid var(--border)",
            borderRadius: 8, alignItems: "center", background: "white",
            cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ flexShrink: 0 }}><it.Thumb /></div>
            <div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>
                {it.title}
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12.5, lineHeight: 1.45, color: "var(--muted)", marginTop: 4 }}>
                {it.body}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <button style={ctaButton} onClick={() => goTo("/ro-yxat")}>Bepul boshlash</button>
      </div>
    </Card>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => {
  const langs = [
    "O'zbek (lotin)", "Ўзбек (кирилл)", "Русский", "English", "Қазақша", "Türkçe",
    "Қырғызша", "Тоҷикӣ", "Türkmen", "العربية", "中文", "한국어", "日本語",
    "Español", "Français", "Deutsch", "Italiano", "Português", "Polski",
    "Українська", "Hrvatski", "Magyar", "Indonesia", "Tiếng Việt",
  ];
  const siteLinks = [
    "Biz haqimizda", "Imkoniyatlar", "Narxlar", "Maktab tarifi",
    "Hamjamiyat", "Bosh sahifa", "OEmbed API", "Aloqa",
  ];
  const linkStyle = {
    color: "var(--muted)", textDecoration: "none",
    fontFamily: "'Nunito', sans-serif", fontSize: 14, lineHeight: 1.8,
    display: "block",
  };
  const colTitle = {
    fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13,
    letterSpacing: "0.12em", textTransform: "uppercase",
    marginBottom: 20, color: "var(--ink)",
  };

  return (
    <Card style={{ padding: "56px 64px 40px" }}>
      {/* top: brand block */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Logo />
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: "var(--muted)" }}>
            Yaxshiroq darslar — tezroq
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["t", "f", "in", "yt"].map((s, i) => (
            <a key={i} href="#" aria-label={s} style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--accent-soft)", color: "var(--accent-dark)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13,
              textDecoration: "none",
            }}>{s}</a>
          ))}
        </div>
      </div>

      {/* middle: sitemap + languages */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 64 }}>
        <div>
          <div style={colTitle}>Sayt xaritasi</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
            {siteLinks.map((t, i) => (
              <a key={i} href="#" style={linkStyle}>{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={colTitle}>Til</div>
          <div style={{
            columnCount: 4, columnGap: 28,
            fontFamily: "'Nunito', sans-serif",
          }}>
            {langs.map((l, i) => (
              <a key={i} href="#" style={{ ...linkStyle, breakInside: "avoid" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom: legal */}
      <div style={{
        marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", gap: 24, fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookie siyosati</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Maxfiylik siyosati</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Foydalanish shartlari</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none" }}>Cookie sozlamalari</a>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "'Nunito', sans-serif" }}>
          © 2026 Aqlly. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </Card>
  );
};

Object.assign(window, { Logo, TopNav, Hero, EasySteps, Features, Templates, Footer });
