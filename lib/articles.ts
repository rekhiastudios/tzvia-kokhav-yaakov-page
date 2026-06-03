// ─────────────────────────────────────────────────────────────────────────────
// Article data types and in-memory store.
// All user-facing content is authored here; no backend or CMS is involved.
// ─────────────────────────────────────────────────────────────────────────────

export type ArticleTag = 'ANNOUNCEMENT' | 'ACHIEVEMENT' | 'EVENT' | 'ALUMNAE';

export interface ArticleAuthor {
  name: string;
  role: string;
  /** Two-character string for the avatar circle placeholder. */
  initials: string;
}

export interface ArticleFact {
  label: string;
  value: string;
}

/** Opening paragraph rendered with an oversized drop-cap first letter. */
type ParagraphBlock = {
  type: 'paragraph';
  text: string;
  dropCap?: boolean;
};

/** Full-width pull-quote with optional attribution line. */
type PullQuoteBlock = {
  type: 'pullQuote';
  text: string;
  attribution?: string;
};

/**
 * Inline photograph.
 * `src` references a path in /public, e.g. "/science.png".
 * Set `wide: true` to render at full body-column width.
 */
type ImageBlock = {
  type: 'image';
  src: string;
  caption?: string;
  wide?: boolean;
};

 type VideoBlock = {
  type: 'video';
  src: string;
  caption?: string;
  wide?: boolean;
};

/** Section heading rendered as h2 or h3 inside the article body. */
type HeadingBlock = {
  type: 'heading';
  /** Displayed heading text; also slugified to generate an anchor id. */
  text: string;
  level?: 2 | 3;
};

/** Decorative gold diamond divider between body sections. */
type DividerBlock = {
  type: 'divider';
};

export type BodyBlock =
  | ParagraphBlock
  | PullQuoteBlock
  | ImageBlock
  | VideoBlock
  | HeadingBlock
  | DividerBlock;

export interface Article {
  slug: string;
  /** BCP-47 locale, e.g. "en" or "he". Used to partition the article store. */
  locale: string;
  tag: ArticleTag;
  /** Human-readable display date, e.g. "2026 · 05 · 18". */
  date: string;
  /** ISO 8601 date for sorting, e.g. "2026-05-18". */
  dateSort: string;

  // To identify the assets of articles with the same publication date
  id: string;

  year: number;
  title: string;
  /** Short deck shown on archive cards and below the article headline. */
  lede: string;
  /** Estimated reading time in minutes. */
  readTime: number;
  /** When true the article gets the hero two-column treatment in the archive. */
  featured?: boolean;
  author?: ArticleAuthor;
  /** Absolute path from /public, e.g. "/science.png". */
  coverImage?: string;
  /** Ordered rich-text body blocks rendered by ArticleBody. */
  body: BodyBlock[];
  /** Key statistics displayed in the sidebar "THE FACTS" panel. */
  facts?: ArticleFact[];
  /** Topic tags shown in the sidebar and on cards. */
  tags?: string[];
  /**
   * Manual table of contents. Each `id` must match the slugified heading text
   * so `<a href="#id">` anchor links resolve. Derived from heading blocks when
   * omitted.
   */
  toc?: Array<{ id: string; label: string }>;
}

// ─────────────────────────────────────────────────────────────── article data ──

// const articles: Article[] = [
//   // ── English ──────────────────────────────────────────────────────────────
//   {
//     slug: 'tzvia-students-win-national-robotics-championship',
//     locale: 'en',
//     tag: 'ACHIEVEMENT',
//     date: '2026 · 05 · 18',
//     dateSort: '2026-05-18',
//     year: 2026,
//     title: 'Tzvia Students Win National Robotics Championship',
//     lede: 'Three years of weekly builds in the makerspace culminated in a first-place finish at the FRC regional finals in Tel Aviv this past Sunday.',
//     readTime: 8,
//     featured: true,
//     author: { name: 'Yael Levi', role: 'Communications Office', initials: 'YL' },
//     coverImage: '/science.png',
//     toc: [
//       { id: 'a-slow-start', label: 'A slow start' },
//       { id: 'what-comes-next', label: 'What comes next' },
//     ],
//     facts: [
//       { label: 'Schools', value: '42' },
//       { label: 'Matches', value: '11' },
//       { label: 'Win rate', value: '82%' },
//       { label: 'Final score', value: '147–96' },
//     ],
//     tags: ['ROBOTICS', 'STEM', 'FRC', 'STUDENTS'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'For three years, a small group of students gathered every Tuesday afternoon in a converted storage room behind the science wing. There were no trophies on the shelf, no scholarship sponsors, and — at the start — no robot that could move in a straight line.',
//       },
//       {
//         type: 'paragraph',
//         text: 'This past Sunday, that same group stood on a stage in Tel Aviv holding the national championship banner. The Tzvia robotics team, competing as Team 5786, defeated 41 schools across three days of qualifying matches to claim first place at the FRC Israel Regional Finals.',
//       },
//       { type: 'heading', level: 2, text: 'A slow start' },
//       {
//         type: 'paragraph',
//         text: "The club began in 2023 with four students and a borrowed laptop. Their first competition attempt ended in the third round when the chassis snapped mid-match. \"We were embarrassed,\" recalls team captain Shira Mizrahi. \"But our coach kept saying that embarrassment is just data — useful data.\"",
//       },
//       {
//         type: 'pullQuote',
//         text: '"We don\'t build robots to win — we build them to learn how to think under pressure."',
//         attribution: '— SHIRA MIZRAHI, TEAM CAPTAIN',
//       },
//       {
//         type: 'paragraph',
//         text: "Faculty advisor Dr. Tamar Goldberg credits the team's persistence to a culture of weekly retrospectives, where every failed build is documented in a shared notebook that has now grown to over 300 pages of sketches, code snippets, and reflections.",
//       },
//       {
//         type: 'image',
//         src: '/science.png',
//         caption: 'The team during a late-night build session, two weeks before the finals.',
//       },
//       { type: 'heading', level: 2, text: 'What comes next' },
//       {
//         type: 'paragraph',
//         text: 'The team will travel to Houston in April to represent Israel at the FIRST Championship — the first time an ulpana from Mateh Binyamin has qualified. Fundraising for travel costs begins this week, with a community event planned for the new STEM wing groundbreaking on June 12th.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'new-stem-wing-breaks-ground',
//     locale: 'en',
//     tag: 'ANNOUNCEMENT',
//     date: '2026 · 05 · 12',
//     dateSort: '2026-05-12',
//     year: 2026,
//     title: 'New STEM Wing Breaks Ground Next Semester',
//     lede: 'A 1,200 sqm addition with new labs, a makerspace, and a dedicated robotics studio.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'School Office', role: 'Administration', initials: 'SO' },
//     coverImage: '/science.png',
//     tags: ['STEM', 'CAMPUS', 'INFRASTRUCTURE'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: "Construction on the school's long-awaited STEM wing is scheduled to begin in September 2026, following approval from the Ministry of Education last week. The addition will nearly double Tzvia's science floor space.",
//       },
//       {
//         type: 'paragraph',
//         text: 'The 1,200 sqm building will house three new lab spaces, a makerspace open to all grades, a dedicated robotics studio, and a rooftop observation deck for astronomy. Architecture firm Ronen & Partners, based in Jerusalem, is leading the design.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"This is not just a building — it is a statement about what kind of school we intend to be."',
//         attribution: '— PRINCIPAL, RABBI DAVID SHAAR',
//       },
//       {
//         type: 'paragraph',
//         text: 'Funding comes from a combination of government grants, a three-year municipal budget commitment, and a campaign among alumnae that raised over ₪800,000 in its first month. Completion is expected by September 2027.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'tenth-grade-takes-national-tanakh-quiz',
//     locale: 'en',
//     tag: 'ACHIEVEMENT',
//     date: '2026 · 05 · 02',
//     dateSort: '2026-05-02',
//     year: 2026,
//     title: 'Tenth Grade Takes National Tanakh Quiz',
//     lede: 'For the second consecutive year, our team brought home the regional title.',
//     readTime: 4,
//     featured: false,
//     author: { name: 'Miriam Hadad', role: 'Torah Department', initials: 'MH' },
//     coverImage: '/beit-midrash.png',
//     tags: ['TANAKH', 'COMPETITION', 'STUDENTS'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'For the second consecutive year, the Tzvia team took first place in the regional Tanakh Bowl, defeating twelve schools from across Mateh Binyamin and the surrounding area. The final round was held at Bar-Ilan University on Thursday morning.',
//       },
//       {
//         type: 'paragraph',
//         text: "The team of five students from Grade 10 studied for six months under the guidance of Mrs. Batya Ofer, the school's senior Tanakh teacher. The competition covered the entire book of Shmuel, including an oral interpretation round.",
//       },
//       {
//         type: 'pullQuote',
//         text: '"They didn\'t just memorize — they argued with the text. That\'s what won it."',
//         attribution: '— MRS. BATYA OFER, TANAKH DEPARTMENT',
//       },
//       {
//         type: 'paragraph',
//         text: 'The national final will be held in Jerusalem in late June. The team has already begun preparation.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'open-house-june-4',
//     locale: 'en',
//     tag: 'EVENT',
//     date: '2026 · 04 · 28',
//     dateSort: '2026-04-28',
//     year: 2026,
//     title: 'Open House — June 4th, 17:00',
//     lede: 'Prospective students and families are welcome to tour campus and meet faculty.',
//     readTime: 2,
//     featured: false,
//     author: { name: 'Admissions Office', role: 'Administration', initials: 'AO' },
//     coverImage: '/humanities.png',
//     tags: ['ADMISSIONS', 'EVENT', 'CAMPUS'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'Tzvia will open its gates to prospective students and families on Wednesday, June 4th, from 17:00 to 20:00. Visitors will have the opportunity to tour every part of campus, sit in on a short model class, and speak directly with current students and faculty.',
//       },
//       {
//         type: 'paragraph',
//         text: 'The evening will include a presentation by the principal, breakout sessions by academic department, and a one-on-one admissions consultation for families ready to begin the application process for 5787.',
//       },
//       {
//         type: 'paragraph',
//         text: 'Transportation from the Jerusalem central bus station will be available. Registration is required and can be completed through the admissions office.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'dr-cohen-neuroscience-spotlight',
//     locale: 'en',
//     tag: 'ALUMNAE',
//     date: '2026 · 04 · 15',
//     dateSort: '2026-04-15',
//     year: 2026,
//     title: 'Spotlight — Dr. R. Cohen on Neuroscience',
//     lede: 'From Tzvia to Tel Aviv University — research, family, meaning.',
//     readTime: 6,
//     featured: false,
//     author: { name: 'Yael Levi', role: 'Communications Office', initials: 'YL' },
//     coverImage: '/humanities.png',
//     tags: ['ALUMNAE', 'SCIENCE', 'RESEARCH'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'Dr. Ronit Cohen graduated from Tzvia in 2012, the year the biology lab got its first proper centrifuge. She remembers being the only student who wanted to stay late to run experiments. "There was nowhere else I wanted to be," she says over the phone from her lab at Tel Aviv University, where she leads a research group studying memory formation in adolescents.',
//       },
//       {
//         type: 'paragraph',
//         text: 'Her work has been published in Nature Neuroscience and cited by research groups in four countries. But she still talks about Tzvia the way she talks about her family — with a mix of fondness, obligation, and something harder to name.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"Tzvia taught me that rigor isn\'t the opposite of warmth. The best teachers I had held both."',
//         attribution: '— DR. RONIT COHEN, CLASS OF 2012',
//       },
//       {
//         type: 'paragraph',
//         text: 'Cohen returns to campus twice a year to speak with upper-school students about neuroscience and research careers. She is currently co-designing an elective course with the biology department, to be piloted in the 5787 academic year.',
//       },
//       {
//         type: 'image',
//         src: '/humanities.png',
//         caption: 'Dr. Cohen with Grade 11 biology students during her last campus visit.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'memorial-ceremony-yom-hazikaron',
//     locale: 'en',
//     tag: 'EVENT',
//     date: '2026 · 04 · 10',
//     dateSort: '2026-04-10',
//     year: 2026,
//     title: 'Memorial Ceremony — Yom HaZikaron',
//     lede: 'Music, reflection, and a tribute to fallen alumnae of Mateh Binyamin.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'School Office', role: 'Administration', initials: 'SO' },
//     coverImage: '/arts.png',
//     tags: ['YOM HAZIKARON', 'COMMUNITY', 'CEREMONY'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: "This year's Yom HaZikaron ceremony was held in the school courtyard at sunset, with the entire student body and faculty present. The theme of the evening was alumnae who have served in the IDF — three of whom were honoured for the first time in the school's official memorial record.",
//       },
//       {
//         type: 'paragraph',
//         text: "The programme included musical performances by the school's vocal ensemble, readings from letters written by students to fallen soldiers they had never met, and a brief address by a graduate currently serving as an officer.",
//       },
//       {
//         type: 'pullQuote',
//         text: '"We remember not to mourn, but to understand what we are continuing."',
//         attribution: '— FROM THE STUDENT OPENING ADDRESS',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'advanced-talmud-study-opens-to-all-grades',
//     locale: 'en',
//     tag: 'ANNOUNCEMENT',
//     date: '2026 · 03 · 28',
//     dateSort: '2026-03-28',
//     year: 2026,
//     title: 'Advanced Talmud Study Opens to All Grade Levels',
//     lede: 'Weekly chavruta sessions with visiting scholars are now available to 9th and 10th graders.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'Torah Department', role: 'Beit Midrash Faculty', initials: 'TD' },
//     coverImage: '/beit-midrash.png',
//     tags: ['TALMUD', 'BEIT MIDRASH', 'CURRICULUM'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'Beginning this coming Thursday, the advanced Talmud chavruta programme — previously open only to Grade 11 and 12 students — will be extended to all grade levels. The decision follows a successful pilot with a group of motivated 9th graders last semester.',
//       },
//       {
//         type: 'paragraph',
//         text: 'Sessions run every Thursday from 15:30 to 17:00 in the Beit Midrash. A visiting scholar will anchor each session with a short shiur, after which students pair into chavruta to continue the text independently. Faculty are present throughout.',
//       },
//       {
//         type: 'paragraph',
//         text: 'Registration is open to all students with at least a B average in Torah studies. Contact the Torah department office or speak with your homeroom teacher to sign up.',
//       },
//       { type: 'divider' },
//     ],
//   },

//   // ── Hebrew ────────────────────────────────────────────────────────────
//   {
//     slug: 'tzvia-students-win-national-robotics-championship',
//     locale: 'he',
//     tag: 'ACHIEVEMENT',
//     date: '2026 · 05 · 18',
//     dateSort: '2026-05-18',
//     year: 2026,
//     title: 'תלמידות צביה זוכות באליפות הרובוטיקה הארצית',
//     lede: 'שלוש שנות בנייה שבועיות במייקרספייס הסתיימו במקום הראשון בגמר האזורי של FRC בתל אביב ביום ראשון האחרון.',
//     readTime: 8,
//     featured: true,
//     author: { name: 'יעל לוי', role: 'לשכת תקשורת', initials: 'YL' },
//     coverImage: '/science.png',
//     toc: [
//       { id: 'a-slow-start', label: 'התחלה איטית' },
//       { id: 'what-comes-next', label: 'מה הלאה' },
//     ],
//     facts: [
//       { label: 'בתי ספר', value: '42' },
//       { label: 'משחקים', value: '11' },
//       { label: 'אחוז ניצחון', value: '82%' },
//       { label: 'תוצאה סופית', value: '147–96' },
//     ],
//     tags: ['רובוטיקה', 'מדע וטכנולוגיה', 'FRC', 'תלמידות'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'שלוש שנים, קבוצה קטנה של תלמידות התכנסה כל יום שלישי אחר הצהריים בחדר אחסון ממוחזר מאחורי כנף המדעים. לא היו גביעים על המדף, לא ספונסרים, ו — בתחילה — לא היה רובוט שהצליח לנוע בקו ישר.',
//       },
//       {
//         type: 'paragraph',
//         text: 'ביום ראשון האחרון, אותה קבוצה עמדה על במה בתל אביב ואחזה בבאנר של אליפות ארצית. קבוצת הרובוטיקה של צביה, המתחרה כצוות 5786, ניצחה 41 בתי ספר במהלך שלושה ימי מקצים וכבשה את המקום הראשון בגמר האזורי של FRC ישראל.',
//       },
//       { type: 'heading', level: 2, text: 'התחלה איטית' },
//       {
//         type: 'paragraph',
//         text: 'המועדון החל בשנת 2023 עם ארבע תלמידות ומחשב נייד שאול. ניסיון ההשתתפות הראשון שלהן הסתיים בסיבוב השלישי כשהשלדה נשברה באמצע מקצה. "התביישנו," מספרת קפטנית הצוות שירה מזרחי. "אבל המאמנת שלנו המשיכה לומר שבושה היא סתם מידע — מידע שימושי."',
//       },
//       {
//         type: 'pullQuote',
//         text: '"אנחנו לא בונות רובוטים כדי לנצח — אנחנו בונות אותם כדי ללמוד לחשוב תחת לחץ."',
//         attribution: '— שירה מזרחי, קפטנית הצוות',
//       },
//       {
//         type: 'paragraph',
//         text: 'המדריכה ד"ר תמר גולדברג מייחסת את עקשנות הצוות לתרבות של רפלקציה שבועית, שבה כל בנייה כושלת מתועדת במחברת משותפת שצמחה לכדי יותר מ-300 עמודים של סקיצות, קטעי קוד ורפלקציות.',
//       },
//       {
//         type: 'image',
//         src: '/science.png',
//         caption: 'הצוות במהלך מפגש בנייה לילי, שבועיים לפני הגמר.',
//       },
//       { type: 'heading', level: 2, text: 'מה הלאה' },
//       {
//         type: 'paragraph',
//         text: 'הצוות יסע להיוסטון באפריל לייצג את ישראל באליפות FIRST — הפעם הראשונה שאולפנה ממטה בנימין מתאגדת. גיוס כספים לצורכי נסיעה מתחיל השבוע, עם אירוע קהילתי מתוכנן לחנוכת כנף המדעים החדשה ב-12 ביוני.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'new-stem-wing-breaks-ground',
//     locale: 'he',
//     tag: 'ANNOUNCEMENT',
//     date: '2026 · 05 · 12',
//     dateSort: '2026-05-12',
//     year: 2026,
//     title: 'כנף מדעים ומחשבים חדשה מתחילה בבנייה הסמסטר הבא',
//     lede: 'תוספת של 1,200 מ"ר עם מעבדות חדשות, מייקרספייס ואולפן רובוטיקה ייעודי.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'לשכת בית הספר', role: 'מינהל', initials: 'SO' },
//     coverImage: '/science.png',
//     tags: ['מדע וטכנולוגיה', 'קמפוס', 'תשתיות'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'הבנייה של כנף המדעים הממתינה מזה זמן רב תחל בספטמבר 2026, בעקבות אישור ממשרד החינוך בשבוע שעבר. התוספת כמעט תכפיל את שטח המדעים של צביה.',
//       },
//       {
//         type: 'paragraph',
//         text: 'הבניין בשטח 1,200 מ"ר יאכלס שלושה חללי מעבדה חדשים, מייקרספייס פתוח לכל הכיתות, אולפן רובוטיקה ייעודי ומרפסת תצפית לאסטרונומיה. חברת האדריכלות רונן ושותפים מירושלים מובילה את העיצוב.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"זה לא סתם בניין — זו הצהרה על איזה סוג בית ספר אנחנו מתכוונים להיות."',
//         attribution: '— מנהל בית הספר, הרב דוד שער',
//       },
//       {
//         type: 'paragraph',
//         text: 'המימון מגיע משילוב של מענקי ממשלה, התחייבות תקציב עירונית לשלוש שנים, וקמפיין בקרב בוגרות שגייס יותר מ-800,000 ₪ בחודש הראשון. השלמה צפויה בספטמבר 2027.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'tenth-grade-takes-national-tanakh-quiz',
//     locale: 'he',
//     tag: 'ACHIEVEMENT',
//     date: '2026 · 05 · 02',
//     dateSort: '2026-05-02',
//     year: 2026,
//     title: 'כיתה י\' זוכה בתחרות התנ"ך הארצית',
//     lede: 'לשנה השנייה ברציפות, הקבוצה שלנו הביאה את התואר האזורי הביתה.',
//     readTime: 4,
//     featured: false,
//     author: { name: 'מרים הדד', role: 'מחלקת התורה', initials: 'MH' },
//     coverImage: '/beit-midrash.png',
//     tags: ['תנ"ך', 'תחרות', 'תלמידות'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'לשנה השנייה ברציפות, קבוצת צביה זכתה במקום הראשון בתחרות התנ"ך האזורית, מנצחת שנים עשר בתי ספר מרחבי מטה בנימין ואזורי הסביבה. הגמר התקיים באוניברסיטת בר-אילן ביום חמישי בבוקר.',
//       },
//       {
//         type: 'paragraph',
//         text: 'הצוות של חמש תלמידות מכיתה י\' למד שישה חודשים בהדרכת גב\' בתיה עופר, מורה התנ"ך הבכירה של בית הספר. התחרות כיסתה את כל ספר שמואל, כולל סיבוב פרשנות בעל פה.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"הן לא רק שיננו — הן ויכחו עם הטקסט. זה מה שניצח."',
//         attribution: '— גב\' בתיה עופר, מחלקת התנ"ך',
//       },
//       {
//         type: 'paragraph',
//         text: 'הגמר הארצי יתקיים בירושלים בסוף יוני. הצוות כבר החל בהכנה.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'open-house-june-4',
//     locale: 'he',
//     tag: 'EVENT',
//     date: '2026 · 04 · 28',
//     dateSort: '2026-04-28',
//     year: 2026,
//     title: 'יום שערים פתוחים — 4 ביוני, 17:00',
//     lede: 'תלמידות עתידיות ומשפחות מוזמנות לסייר בקמפוס ולפגוש את הצוות.',
//     readTime: 2,
//     featured: false,
//     author: { name: 'לשכת רישום', role: 'מינהל', initials: 'AO' },
//     coverImage: '/humanities.png',
//     tags: ['הרשמה', 'אירוע', 'קמפוס'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'צביה תפתח את שעריה לתלמידות עתידיות ומשפחות ביום רביעי, 4 ביוני, בין 17:00 ל-20:00. המבקרים יוכלו לסייר בכל חלק מהקמפוס, להשתתף בשיעור מודל קצר ולדבר ישירות עם תלמידות ומורות.',
//       },
//       {
//         type: 'paragraph',
//         text: 'הערב יכלול מצגת של המנהל, מפגשים לפי מחלקה אקדמית, וייעוץ הרשמה אישי למשפחות המוכנות להתחיל את תהליך הגשת המועמדות לשנה"ל ה\'תשפ"ז.',
//       },
//       {
//         type: 'paragraph',
//         text: 'תחבורה מהתחנה המרכזית בירושלים תהיה זמינה. נדרשת הרשמה מראש דרך לשכת ההרשמה.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'dr-cohen-neuroscience-spotlight',
//     locale: 'he',
//     tag: 'ALUMNAE',
//     date: '2026 · 04 · 15',
//     dateSort: '2026-04-15',
//     year: 2026,
//     title: 'זרקור — ד"ר ר. כהן על מדעי המוח',
//     lede: 'מצביה לאוניברסיטת תל אביב — מחקר, משפחה, משמעות.',
//     readTime: 6,
//     featured: false,
//     author: { name: 'יעל לוי', role: 'לשכת תקשורת', initials: 'YL' },
//     coverImage: '/humanities.png',
//     tags: ['בוגרות', 'מדע', 'מחקר'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'ד"ר רונית כהן סיימה את לימודיה בצביה בשנת 2012, השנה שבה המעבדה לביולוגיה קיבלה את הצנטריפוגה הראשונה שלה. היא זוכרת שהייתה התלמידה היחידה שרצתה להישאר אחרי הצהריים להריץ ניסויים. "לא רציתי להיות בשום מקום אחר," היא אומרת בטלפון ממעבדתה באוניברסיטת תל אביב, שם היא מובילה קבוצת מחקר החוקרת גיבוש זיכרון אצל מתבגרים.',
//       },
//       {
//         type: 'paragraph',
//         text: 'עבודתה פורסמה ב-Nature Neuroscience ואוזכרה על ידי קבוצות מחקר בארבע מדינות. אבל היא עדיין מדברת על צביה כמו שהיא מדברת על משפחתה — עם שילוב של חיבה, מחויבות ומשהו שקשה יותר לשים עליו שם.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"צביה לימדה אותי שדיוק אינו ההפך מחמימות. המורות הטובות ביותר שהיו לי החזיקו בשניהם."',
//         attribution: '— ד"ר רונית כהן, בוגרת 2012',
//       },
//       {
//         type: 'paragraph',
//         text: 'כהן חוזרת לקמפוס פעמיים בשנה לדבר עם תלמידות בית הספר העליון על מדעי המוח וקריירות מחקר. כיום היא שותפה לתכנון קורס בחירה עם מחלקת הביולוגיה, שיופעל בשנת הלימודים ה\'תשפ"ז.',
//       },
//       {
//         type: 'image',
//         src: '/humanities.png',
//         caption: 'ד"ר כהן עם תלמידות ביולוגיה מכיתה י"א בביקורה האחרון בקמפוס.',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'memorial-ceremony-yom-hazikaron',
//     locale: 'he',
//     tag: 'EVENT',
//     date: '2026 · 04 · 10',
//     dateSort: '2026-04-10',
//     year: 2026,
//     title: 'טקס יום הזיכרון',
//     lede: 'מוזיקה, הרהורים ומחווה לבוגרות שנפלו ממטה בנימין.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'לשכת בית הספר', role: 'מינהל', initials: 'SO' },
//     coverImage: '/arts.png',
//     tags: ['יום הזיכרון', 'קהילה', 'טקס'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'טקס יום הזיכרון השנתי התקיים בחצר בית הספר עם שקיעת השמש, בנוכחות כל גוף התלמידות והצוות. נושא הערב היה בוגרות שנפלו ממטה בנימין — שלוש מהן הונצחו לראשונה ברשומות ההנצחה הרשמיות של בית הספר.',
//       },
//       {
//         type: 'paragraph',
//         text: 'התכנית כללה הופעות מוזיקליות של המקהלה, קריאת מכתבים שכתבו תלמידות לחיילים שנפלו שמעולם לא פגשו, ודברי תלמידה בוגרת המשרתת כיום כקצינה.',
//       },
//       {
//         type: 'pullQuote',
//         text: '"אנחנו זוכרות לא כדי להתאבל, אלא כדי להבין מה אנחנו ממשיכות."',
//         attribution: '— מדברי הנאום הפותח של התלמידות',
//       },
//       { type: 'divider' },
//     ],
//   },
//   {
//     slug: 'advanced-talmud-study-opens-to-all-grades',
//     locale: 'he',
//     tag: 'ANNOUNCEMENT',
//     date: '2026 · 03 · 28',
//     dateSort: '2026-03-28',
//     year: 2026,
//     title: 'לימוד תלמוד מתקדם נפתח לכל הכיתות',
//     lede: 'מפגשי חברותא שבועיים עם מלומדים מבאים פתוחים כעת לתלמידות כיתה ט\' ו-י\'.',
//     readTime: 3,
//     featured: false,
//     author: { name: 'מחלקת התורה', role: 'סגל בית המדרש', initials: 'TD' },
//     coverImage: '/beit-midrash.png',
//     tags: ['תלמוד', 'בית מדרש', 'תכנית לימודים'],
//     body: [
//       {
//         type: 'paragraph',
//         dropCap: true,
//         text: 'החל מהיום חמישי הקרוב, תכנית חברותא התלמוד המתקדמת — שהייתה פתוחה עד כה רק לתלמידות כיתות י"א וי"ב — תורחב לכל הכיתות. ההחלטה באה בעקבות פיילוט מוצלח עם קבוצת תלמידות מוטיבציוניות מכיתה ט\' בסמסטר האחרון.',
//       },
//       {
//         type: 'paragraph',
//         text: 'המפגשים מתקיימים כל יום חמישי בין 15:30 ל-17:00 בבית המדרש. מלומד מבאי יפתח כל מפגש בשיעור קצר, ולאחריו יתחלקו התלמידות לזוגות חברותא לעיון עצמאי בטקסט. הצוות נוכח לאורך כל הפגישה.',
//       },
//       {
//         type: 'paragraph',
//         text: 'ההרשמה פתוחה לכל התלמידות עם ממוצע ב ולמעלה בלימודי תורה. לפנות ללשכת מחלקת התורה או לדבר עם המחנכת.',
//       },
//       { type: 'divider' },
//     ],
//   },
// ];


// ── Cloudinary assets ────────────────────────────────────────────────────────
// Grouped per dispatch folder: `dispatch-{dateSort}` plus `-({id})` when more
// than one article shares a publication date. Hebrew public-ids arrive
// percent-encoded from the Cloudinary Admin API and are kept verbatim.
const CLD = 'https://res.cloudinary.com/dcpeggch3';

// dispatch-2025-05-12-(1) — Zechut Horim community volunteering
const ZECHUT_COVER = `${CLD}/image/upload/v1780384626/%D7%96%D7%9B%D7%95%D7%AA-%D7%94%D7%95%D7%A8%D7%99%D7%9D-1-1536x864_myuj5j.jpg`;
const ZECHUT_PACKING = `${CLD}/image/upload/v1780384627/%D7%96%D7%9B%D7%95%D7%AA-%D7%94%D7%95%D7%A8%D7%99%D7%9D-2-1536x1152_dujujd.jpg`;
const ZECHUT_DISTRIBUTION = `${CLD}/image/upload/v1780384627/%D7%96%D7%9B%D7%95%D7%AA-%D7%94%D7%95%D7%A8%D7%99%D7%9D-3-1536x1152_gq3rgx.jpg`;

// dispatch-2025-05-12-(2) — Social leadership program
const LEADERSHIP_COVER = `${CLD}/image/upload/v1780384655/%D7%9E%D7%A0%D7%94%D7%99%D7%92%D7%95%D7%AA-%D7%A0%D7%95%D7%A2%D7%A8-2_v68c5z.jpg`;

// dispatch-2025-11-13 — Alumni Beit Midrash (Tzama Nafshi)
const ALUMNI_COVER = `${CLD}/image/upload/v1780384578/img-2025-11-11-at-11.10.06-2-1090x1536_w3q3ak.jpg`;
const ALUMNI_VIDEO = `${CLD}/video/upload/v1780384623/vid-2025-11-13-at-12.38.29-1_dlylbl.mp4`;

const articles: Article[] = [
  // ── English ──────────────────────────────────────────────────────────────

  {
    slug: 'registration-5787',
    locale: 'en',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 12 · 23',
    dateSort: '2025-12-23',
    id: "1",
    year: 2025,
    title: 'Registration for the 5787 School Year Is Open',
    lede:
      'Prospective students and their families are invited to discover Ulpanat Tzvia Kokhav Yaakov, explore the introductory-day schedule, and begin the registration process.',
    readTime: 2,
    featured: true,
    author: {
      name: 'Admissions Office',
      role: 'Ulpanat Tzvia Kokhav Yaakov',
      initials: 'AO',
    },
    coverImage: '/humanities.png',
    tags: ['ADMISSIONS', '5787', 'OPEN DAYS', 'SCHOOL COMMUNITY'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'Ulpanat Tzvia Kokhav Yaakov invites prospective students and their families to learn more about the school and begin the registration process for the 5787 academic year.',
      },
      {
        type: 'paragraph',
        text:
          'The registration period is an opportunity to discover the educational approach of the Ulpana: a meaningful combination of academic learning, personal growth, values-based education, social involvement, and a strong sense of community.',
      },
      {
        type: 'paragraph',
        text:
          'Prospective families can view the updated schedule and register for one of the upcoming introductory days. These meetings provide an opportunity to become familiar with school life, ask questions, and learn more about the educational environment offered to each student.',
      },
      {
        type: 'pullQuote',
        text:
          '"We look forward to meeting new students and introducing families to the values, learning environment, and community of our Ulpana."',
        attribution: '— ADMISSIONS OFFICE',
      },
      {
        type: 'paragraph',
        text:
          'We invite you to review the introductory-day schedule, complete the registration form, and contact the admissions office for additional information.',
      },
      { type: 'divider' },
    ],
  },

  {
    slug: 'alumni-beit-midrash-tzama-nafshi',
    locale: 'en',
    tag: 'EVENT',
    date: '2025 · 11 · 13',
    dateSort: '2025-11-13',
    id: "1",
    year: 2025,
    title: 'Alumni Beit Midrash: The Tzama Nafshi Gathering',
    lede:
      'Graduates were invited to return to the Ulpana, reconnect, and learn together during a special alumni Beit Midrash gathering.',
    readTime: 2,
    featured: false,
    author: {
      name: 'School Office',
      role: 'Ulpanat Tzvia Kokhav Yaakov',
      initials: 'SO',
    },
    coverImage: ALUMNI_COVER,
    tags: ['ALUMNAE', 'BEIT MIDRASH', 'TZAMA NAFSHI', 'COMMUNITY'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'On Thursday, November 13, 2025, Ulpanat Tzvia Kokhav Yaakov invited its graduates to return to the school for the Tzama Nafshi alumni Beit Midrash gathering.',
      },
      {
        type: 'paragraph',
        text:
          'The event offered an opportunity to return to a familiar place, reconnect with the school community, and strengthen the lasting relationship between the Ulpana and its alumnae.',
      },
      {
        type: 'pullQuote',
        text:
          '"Graduation does not mark the end of the connection. Our alumnae remain an important part of the Ulpana community."',
        attribution: '— ULPANAT TZVIA KOKHAV YAAKOV',
      },
      {
        type: 'paragraph',
        text:
          'Even after completing their studies, graduates are invited to remain connected with the Ulpana through opportunities for learning, meaningful encounters, and shared experiences.',
      },
      {
        type: 'paragraph',
        text:
          'Alumnae are encouraged to follow future updates and discover upcoming gatherings and activities.',
      },
      { type: 'video', src: ALUMNI_VIDEO, caption: 'Highlights from the alumni gathering.' },
      { type: 'divider' },
    ],
  },

  {
    slug: 'social-leadership-program',
    locale: 'en',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 05 · 12',
    dateSort: '2025-05-12',
    id: "2",
    year: 2025,
    title: 'Social Leadership at Ulpanat Tzvia Kokhav Yaakov',
    lede:
      'A student leadership program that develops empathy, active listening, initiative, cooperation, and responsibility within the school community.',
    readTime: 4,
    featured: false,
    author: {
      name: 'School Office',
      role: 'Ulpanat Tzvia Kokhav Yaakov',
      initials: 'SO',
    },
    coverImage: LEADERSHIP_COVER,
    toc: [
      {
        id: 'leadership-begins-in-the-classroom',
        label: 'Leadership begins in the classroom',
      },
      {
        id: 'a-consistent-presence',
        label: 'A consistent presence for classmates',
      },
    ],
    tags: ['SOCIAL LEADERSHIP', 'STUDENTS', 'COMMUNITY', 'VALUES'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'At Ulpanat Tzvia Kokhav Yaakov, we believe that meaningful leadership is not measured only by the ability to guide others. It also requires the ability to listen carefully, recognize the needs of the people around us, and act with a genuine sense of responsibility.',
      },
      {
        type: 'paragraph',
        text:
          'Our social leadership program gives students an opportunity to take an active role in shaping the supportive, attentive, and values-driven atmosphere of the school.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Leadership begins in the classroom',
      },
      {
        type: 'paragraph',
        text:
          'Two students are selected from each class by their homeroom teacher. The selected students participate in a dedicated training seminar that prepares them for this important role and provides practical tools for navigating a wide range of social situations.',
      },
      {
        type: 'paragraph',
        text:
          'The seminar addresses topics such as peer pressure, group cohesion, acceptance of others, cooperation, active listening, social risks, and the importance of taking initiative for the benefit of the community.',
      },
      {
        type: 'pullQuote',
        text:
          '"True leadership begins with the ability to listen, identify a need, and take responsibility for the people around us."',
        attribution: '— ULPANAT TZVIA KOKHAV YAAKOV',
      },
      {
        type: 'heading',
        level: 2,
        text: 'A consistent presence for classmates',
      },
      {
        type: 'paragraph',
        text:
          'The role of the social leadership students is not limited to a single activity. Throughout the school year, they remain actively involved in school life and serve as an accessible and attentive point of contact for their classmates.',
      },
      {
        type: 'paragraph',
        text:
          'They also lead workshops on relevant social topics at meaningful moments during the year, including the periods leading up to Purim and the summer vacation. These activities create opportunities for open conversations, strengthen a sense of belonging, and encourage personal responsibility.',
      },
      {
        type: 'paragraph',
        text:
          'The program is guided by the school counselor and reflects a central principle of our educational approach: academic learning should be accompanied by personal growth, empathy, and the ability to make a positive difference.',
      },
      { type: 'divider' },
    ],
  },

  {
    slug: 'zechut-horim-community-volunteering',
    locale: 'en',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 05 · 12',
    dateSort: '2025-05-12',
    id: "1",
    year: 2025,
    title: 'Supporting Local Families with Zechut Horim',
    lede:
      'Students take an active role in a weekly community initiative, preparing and distributing food packages to families who need support.',
    readTime: 3,
    featured: false,
    author: {
      name: 'School Office',
      role: 'Ulpanat Tzvia Kokhav Yaakov',
      initials: 'SO',
    },
    coverImage: ZECHUT_COVER,
    toc: [
      {
        id: 'learning-to-give',
        label: 'Learning to give',
      },
      {
        id: 'a-meaningful-community-connection',
        label: 'A meaningful community connection',
      },
    ],
    tags: ['VOLUNTEERING', 'ZECHUT HORIM', 'COMMUNITY', 'VALUES'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'Values-based education extends far beyond the classroom. At Ulpanat Tzvia Kokhav Yaakov, volunteering, mutual responsibility, and a commitment to the community are an important part of each student’s personal development.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Learning to give',
      },
      {
        type: 'paragraph',
        text:
          'The school hosts a local branch of Zechut Horim, a nationwide organization that supports families in need by distributing food packages.',
      },
      {
        type: 'paragraph',
        text:
          'Every week, students participate in the practical stages of the initiative: purchasing groceries, packing the products, and distributing the completed packages to families in the local community.',
      },
      {
        type: 'image',
        src: ZECHUT_PACKING,
        caption: 'Students packing the weekly food parcels.',
      },
      {
        type: 'pullQuote',
        text:
          '"Community involvement teaches students that values become meaningful when they are transformed into consistent action."',
        attribution: '— ULPANAT TZVIA KOKHAV YAAKOV',
      },
      {
        type: 'heading',
        level: 2,
        text: 'A meaningful connection with the local community',
      },
      {
        type: 'paragraph',
        text:
          'Each part of the process gives students an opportunity to assume responsibility, work together, and understand the meaning of giving with sensitivity and respect.',
      },
      {
        type: 'paragraph',
        text:
          'This activity is more than an isolated act of kindness. It creates a direct connection between the students and the community in which they live and study.',
      },
      {
        type: 'paragraph',
        text:
          'Through consistent participation, students develop a deeper awareness of the needs around them and learn how simple, thoughtful actions can make a meaningful difference.',
      },
      {
        type: 'image',
        src: ZECHUT_DISTRIBUTION,
        caption: 'Distributing the completed packages to local families.',
      },
      { type: 'divider' },
    ],
  },

  // ── Hebrew ───────────────────────────────────────────────────────────────

  {
    slug: 'registration-5787',
    locale: 'he',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 12 · 23',
    dateSort: '2025-12-23',
    id: "1",
    year: 2025,
    title: 'הרישום לאולפנת צביה כוכב יעקב לשנת תשפ״ז נפתח',
    lede:
      'תלמידות ומשפחות המעוניינות להצטרף לאולפנה מוזמנות להכיר את הדרך החינוכית שלנו, לעיין בלוח הזמנים ולהירשם לימי ההיכרות.',
    readTime: 2,
    featured: true,
    author: {
      name: 'צוות הרישום',
      role: 'אולפנת צביה כוכב יעקב',
      initials: 'AO',
    },
    coverImage: '/humanities.png',
    tags: ['הרשמה', 'תשפ״ז', 'ימי היכרות', 'קהילת האולפנה'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'אולפנת צביה כוכב יעקב מזמינה תלמידות ומשפחות המעוניינות להכיר את האולפנה ולהצטרף אלינו בשנת הלימודים תשפ״ז.',
      },
      {
        type: 'paragraph',
        text:
          'תקופת הרישום היא הזדמנות להכיר מקרוב את הדרך החינוכית של האולפנה: שילוב בין לימודים משמעותיים, צמיחה אישית, חינוך ערכי, עשייה חברתית ותחושת קהילה.',
      },
      {
        type: 'paragraph',
        text:
          'במסגרת תהליך ההיכרות ניתן לעיין בלוח הזמנים המעודכן ולהירשם לימי ההיכרות הקרובים. המפגשים מאפשרים להכיר את חיי האולפנה, לשאול שאלות ולקבל מידע נוסף על המרחב החינוכי המוצע לכל תלמידה.',
      },
      {
        type: 'pullQuote',
        text:
          '"נשמח לפגוש תלמידות חדשות ולהכיר למשפחות את הערכים, סביבת הלמידה והקהילה של האולפנה."',
        attribution: '— צוות הרישום',
      },
      {
        type: 'paragraph',
        text:
          'אנו מזמינות אתכן לעיין בלוח הזמנים, להשלים את ההרשמה וליצור קשר עם צוות האולפנה לקבלת מידע נוסף.',
      },
      { type: 'divider' },
    ],
  },

  {
    slug: 'alumni-beit-midrash-tzama-nafshi',
    locale: 'he',
    tag: 'EVENT',
    date: '2025 · 11 · 13',
    dateSort: '2025-11-13',
    id: "1",
    year: 2025,
    title: 'בית מדרש בוגרות באולפנת צביה כוכב יעקב',
    lede:
      'בוגרות האולפנה הוזמנו לחזור לבית המדרש, להיפגש וללמוד יחד במסגרת מפגש צמאה נפשי.',
    readTime: 2,
    featured: false,
    author: {
      name: 'מזכירות האולפנה',
      role: 'אולפנת צביה כוכב יעקב',
      initials: 'SO',
    },
    coverImage: ALUMNI_COVER,
    tags: ['בוגרות', 'בית מדרש', 'צמאה נפשי', 'קהילה'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'ביום חמישי, 13 בנובמבר 2025, הזמינה אולפנת צביה כוכב יעקב את בוגרותיה לחזור אל האולפנה ולהשתתף במפגש בית המדרש צמאה נפשי.',
      },
      {
        type: 'paragraph',
        text:
          'המפגש העניק הזדמנות לשוב למקום המוכר, להיפגש ולחזק את הקשר המתמשך בין האולפנה לבין הבוגרות שלה.',
      },
      {
        type: 'pullQuote',
        text:
          '"סיום הלימודים אינו מסיים את הקשר. הבוגרות ממשיכות להיות חלק משמעותי מקהילת האולפנה."',
        attribution: '— אולפנת צביה כוכב יעקב',
      },
      {
        type: 'paragraph',
        text:
          'גם לאחר סיום שנות הלימודים, האולפנה מבקשת לשמור על החיבור עם בוגרותיה ולהמשיך ליצור עבורן מרחבים של מפגש, לימוד ושייכות.',
      },
      {
        type: 'paragraph',
        text:
          'בוגרות האולפנה מוזמנות לעקוב אחר העדכונים באתר ולהתעדכן במפגשים ובאירועים הבאים.',
      },
      { type: 'video', src: ALUMNI_VIDEO, caption: 'סרטון מתוך מפגש הבוגרות.' },
      { type: 'divider' },
    ],
  },

  {
    slug: 'social-leadership-program',
    locale: 'he',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 05 · 12',
    dateSort: '2025-05-12',
    id: "2",
    year: 2025,
    title: 'מנהיגות חברתית באולפנת צביה כוכב יעקב',
    lede:
      'תוכנית המעניקה לתלמידות כלים להקשבה, יוזמה, שיתוף פעולה ואחריות כלפי הקהילה הבית־ספרית.',
    readTime: 4,
    featured: false,
    author: {
      name: 'מזכירות האולפנה',
      role: 'אולפנת צביה כוכב יעקב',
      initials: 'SO',
    },
    coverImage: LEADERSHIP_COVER,
    toc: [
      {
        id: 'leadership-begins-in-the-classroom',
        label: 'מנהיגות שמתחילה בתוך הכיתה',
      },
      {
        id: 'a-consistent-presence',
        label: 'כתובת עבור החברות',
      },
    ],
    tags: ['מנהיגות חברתית', 'תלמידות', 'קהילה', 'חינוך ערכי'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'באולפנת צביה כוכב יעקב אנו מאמינים שמנהיגות אמיתית אינה נמדדת רק ביכולת להוביל, אלא גם ביכולת להקשיב, לזהות צורך ולפעול מתוך אחריות כלפי האחר.',
      },
      {
        type: 'paragraph',
        text:
          'מתוך תפיסה זו פועלת באולפנה תוכנית המנהיגות החברתית, המעניקה לתלמידות הזדמנות משמעותית לקחת חלק פעיל בבניית האווירה החברתית והקהילתית בבית הספר.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'מנהיגות שמתחילה בתוך הכיתה',
      },
      {
        type: 'paragraph',
        text:
          'בכל כיתה נבחרות שתי תלמידות על ידי המחנכת. התלמידות שנבחרו משתתפות בסמינר הכשרה המכוון אותן לתפקידן ומעניק להן כלים מעשיים להתמודדות עם מצבים חברתיים מגוונים.',
      },
      {
        type: 'paragraph',
        text:
          'במהלך ההכשרה הן עוסקות בנושאים כגון לחץ חברתי, לכידות כיתתית, קבלת האחר, שיתוף פעולה, הקשבה פעילה, זיהוי סכנות חברתיות ולקיחת יוזמה למען הקהילה.',
      },
      {
        type: 'pullQuote',
        text:
          '"מנהיגות אמיתית מתחילה ביכולת להקשיב, לזהות צורך ולקחת אחריות על הסביבה שלנו."',
        attribution: '— אולפנת צביה כוכב יעקב',
      },
      {
        type: 'heading',
        level: 2,
        text: 'כתובת עבור החברות',
      },
      {
        type: 'paragraph',
        text:
          'תפקידן של המנהיגות החברתיות אינו מסתכם בפעילות חד־פעמית. לאורך השנה הן פועלות בתוך האולפנה, נמצאות בקשר רציף עם חברותיהן ומהוות כתובת זמינה וקשובה עבור תלמידות הכיתה.',
      },
      {
        type: 'paragraph',
        text:
          'בנוסף לפעילות השוטפת, התלמידות מעבירות סדנאות בנושאים חברתיים בתקופות משמעותיות במהלך השנה, ובהן לקראת חג הפורים ולקראת היציאה לחופשת הקיץ.',
      },
      {
        type: 'paragraph',
        text:
          'התוכנית מתקיימת בהובלת יועצת האולפנה ומשקפת את המחויבות שלנו לחינוך ערכי המשלב לימודים, צמיחה אישית, רגישות חברתית ויכולת להשפיע לטובה על הסביבה.',
      },
      { type: 'divider' },
    ],
  },

  {
    slug: 'zechut-horim-community-volunteering',
    locale: 'he',
    tag: 'ANNOUNCEMENT',
    date: '2025 · 05 · 12',
    dateSort: '2025-05-12',
    id: "1",
    year: 2025,
    title: 'התנדבות למען הקהילה עם עמותת זכות הורים',
    lede:
      'תלמידות האולפנה משתתפות מדי שבוע בקניות, באריזה ובחלוקת מארזי מזון למשפחות הזקוקות לסיוע בקהילה.',
    readTime: 3,
    featured: false,
    author: {
      name: 'מזכירות האולפנה',
      role: 'אולפנת צביה כוכב יעקב',
      initials: 'SO',
    },
    coverImage: ZECHUT_COVER,
    toc: [
      {
        id: 'learning-to-give',
        label: 'לומדות לתת',
      },
      {
        id: 'a-meaningful-community-connection',
        label: 'חיבור אמיתי לקהילה',
      },
    ],
    tags: ['התנדבות', 'זכות הורים', 'קהילה', 'חינוך ערכי'],
    body: [
      {
        type: 'paragraph',
        dropCap: true,
        text:
          'חינוך ערכי אינו נשאר רק בין כותלי הכיתה. באולפנת צביה כוכב יעקב אנו רואים בהתנדבות, באחריות ובערבות ההדדית חלק משמעותי מתהליך הצמיחה של כל תלמידה.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'לומדות לתת',
      },
      {
        type: 'paragraph',
        text:
          'מתוך תפיסה זו פועל באולפנה סניף של עמותת זכות הורים, עמותה ארצית המסייעת למשפחות הזקוקות לתמיכה באמצעות חלוקת מארזי מזון.',
      },
      {
        type: 'paragraph',
        text:
          'מדי שבוע יוצאות תלמידות האולפנה לפעילות מעשית הכוללת קניות, אריזת המוצרים וחלוקת מארזי המזון למשפחות ביישוב.',
      },
      {
        type: 'image',
        src: ZECHUT_PACKING,
        caption: 'התלמידות אורזות את מארזי המזון השבועיים.',
      },
      {
        type: 'pullQuote',
        text:
          '"העשייה הקהילתית מלמדת את התלמידות שערכים מקבלים משמעות כאשר הופכים אותם לפעולה עקבית."',
        attribution: '— אולפנת צביה כוכב יעקב',
      },
      {
        type: 'heading',
        level: 2,
        text: 'חיבור אמיתי לקהילה',
      },
      {
        type: 'paragraph',
        text:
          'כל שלב בפעילות מאפשר לתלמידות לקחת אחריות, לפעול יחד ולהכיר מקרוב את המשמעות של נתינה מתוך רגישות וכבוד.',
      },
      {
        type: 'paragraph',
        text:
          'הפעילות אינה רק מעשה חסד נקודתי. היא יוצרת חיבור ישיר בין התלמידות לבין הקהילה שבה הן חיות ומתחנכות.',
      },
      {
        type: 'paragraph',
        text:
          'באמצעות העשייה המשותפת, התלמידות מפתחות מודעות לצרכים של הסביבה ולומדות כיצד יוזמה פשוטה ועקבית יכולה להשפיע באופן משמעותי.',
      },
      {
        type: 'image',
        src: ZECHUT_DISTRIBUTION,
        caption: 'חלוקת המארזים המוכנים למשפחות ביישוב.',
      },
      { type: 'divider' },
    ],
  },
];

// ─────────────────────────────────────────────────────────── query helpers ──

/** All articles for a locale, sorted newest-first. */
export function getArticles(locale: string): Article[] {
  return articles
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}

/** Single article by locale + slug, or undefined if not found. */
export function getArticle(locale: string, slug: string): Article | undefined {
  return articles.find((a) => a.locale === locale && a.slug === slug);
}

/** Up to `limit` most-recent articles in the same locale, excluding the current slug. */
export function getRelatedArticles(locale: string, slug: string, limit = 3): Article[] {
  return articles
    .filter((a) => a.locale === locale && a.slug !== slug)
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort))
    .slice(0, limit);
}

/** All locale + slug pairs for generateStaticParams at the [slug] level. */
export function getAllSlugs(): Array<{ locale: string; slug: string }> {
  return articles.map((a) => ({ locale: a.locale, slug: a.slug }));
}
