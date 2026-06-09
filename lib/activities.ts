export type CategorySlug = 'arts' | 'science' | 'sports' | 'humanities';

export interface ActivityMeta {
  slug: string;
  name: string;
  cat: string;
  catSlug: CategorySlug;
  catIdx: number;
  img: string;
  size: 'big' | 'wide' | 'tall' | '';
  desc: string;
  badge?: 'FEATURED' | 'ONLINE' | 'IN-PERSON';
  grades?: string;
  schedule?: string;
  since?: string;
  /** Photo gallery (absolute URLs) shown on the activity detail page. */
  gallery?: string[];
}

export interface ActivityFaculty {
  initials: string;
  name: string;
  role: string;
}

export interface ActivityTimeline {
  period: string;
  title: string;
  desc: string;
}

export interface ActivityMilestone {
  num: string;
  label: string;
}

export interface ActivityDetail extends ActivityMeta {
  lede: string;
  aboutWatermark: string;
  aboutGoldTitle: string;
  aboutBody: string[];
  glance: Array<{ label: string; value: string }>;
  faculty?: ActivityFaculty[];
  timelineTitle: string;
  timeline: ActivityTimeline[];
  milestones?: ActivityMilestone[];
  testimonial?: {
    quote: string;
    name: string;
    sub: string;
    initials: string;
  };
  relatedSlugs: string[];
}



export const ACTIVITIES_EN: ActivityDetail[] = [
  // ── ARTS ──────────────────────────────────────────────────────────────
  {
    slug: 'visual-arts',
    name: 'Visual Arts',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'wide',
    desc:
      'A flexible creative activity where student volunteers paint, draw, design decorations, and contribute to special events across the Ulpenat.',
    lede:
      'Visual Arts at Ulpenat Tzvia Kokhav Yaakov gives students opportunities to bring creativity into school life through collaborative projects, decorations, and artistic contributions for meaningful events.',
    aboutWatermark: 'CREATIVITY IN',
    aboutGoldTitle: 'ACTION.',
    aboutBody: [
      'Visual Arts is a flexible creative activity that takes shape throughout the school year according to the needs of the Ulpenat. Rather than following a fixed weekly programme, it invites students to participate voluntarily in artistic projects connected to special occasions, school events, and shared spaces.',
      'Students may paint, draw, create decorations, prepare visual elements, and help transform an idea into something tangible. Each project offers a different opportunity to experiment with colour, composition, materials, and collaborative work.',
      'The activity allows students to contribute their talents in a practical and visible way. Their creativity becomes part of the atmosphere of the Ulpenat, enriching events and helping create spaces that feel thoughtful, welcoming, and connected to the school community.',
    ],
    glance: [
      { label: 'Format', value: 'Voluntary activity' },
      { label: 'Frequency', value: 'Event-based' },
      { label: 'Focus', value: 'Painting · drawing · decoration' },
      { label: 'Approach', value: 'Creative collaboration' },
    ],
    timelineTitle: 'FROM IDEA TO CREATION.',
    timeline: [
      {
        period: 'STEP 01',
        title: 'A shared purpose',
        desc:
          'Each project begins with a school event, occasion, or space that can be enriched through visual creativity.',
      },
      {
        period: 'STEP 02',
        title: 'Creative contribution',
        desc:
          'Student volunteers paint, draw, design, and prepare decorations or other artistic elements.',
      },
      {
        period: 'STEP 03',
        title: 'A visible result',
        desc:
          'The completed work becomes part of the Ulpenat environment and contributes to the atmosphere of the event.',
      },
    ],
    relatedSlugs: ['theatre', 'dance'],
  },

  {
    slug: 'theatre',
    name: 'Theatre',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'big',
    badge: 'FEATURED',
    grades: '10 — 12',
    desc:
      'A three-year, five-unit track combining dramatic literature, acting, directing, stage work, and creative collaboration.',
    lede:
      'Theatre at Ulpenat Tzvia Kokhav Yaakov is a three-year academic track where students study dramatic texts, develop practical performance skills, and bring ideas to life on stage.',
    aboutWatermark: 'FROM TEXT',
    aboutGoldTitle: 'TO STAGE.',
    aboutBody: [
      'The theatre track is taught from 10th through 12th grade and leads to five study units. It combines a rigorous theoretical foundation with practical experience, allowing students to encounter theatre as both an academic field and a creative discipline.',
      'Students explore plays, genres, historical periods, and methods for analysing dramatic works. Alongside this theoretical study, they develop skills in acting, directing, public speaking, and stagecraft. The programme encourages careful reading, confidence, collaboration, and the ability to transform a written text into a shared artistic experience.',
      'Students also encounter professional theatre through repertory performances and bring their learning together through stage productions presented to the school community.',
    ],
    glance: [
      { label: 'Duration', value: '3 years' },
      { label: 'Grades', value: '10 — 12' },
      { label: 'Study units', value: '5' },
      { label: 'Approach', value: 'Theory + practice' },
    ],
    timelineTitle: 'THE PROGRAMME.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Dramatic literature',
        desc:
          'Plays, genres, historical periods, and methods for analysing dramatic works.',
      },
      {
        period: 'FOCUS 02',
        title: 'Performance skills',
        desc:
          'Acting, directing, public speaking, and an introduction to the elements of stage production.',
      },
      {
        period: 'FOCUS 03',
        title: 'From study to production',
        desc:
          'Collaborative creative work that brings dramatic ideas from the page to the stage.',
      },
    ],
    milestones: [
      { num: '3', label: 'Years of Study' },
      { num: '5', label: 'Study Units' },
      { num: '2', label: 'Theory + Practice' },
      { num: '1', label: 'Creative Process' },
    ],
    relatedSlugs: ['dance', 'jewish-thought', 'social-sciences'],
  },
  
  {
    slug: 'dance',
    name: 'Dance',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'tall',
    desc:
      'Movement, creativity, discipline, and personal expression within a supportive learning environment.',
    lede:
      'Dance at Ulpenat Tzvia Kokhav Yaakov offers students a creative space to explore movement, develop confidence, and discover a powerful form of personal expression.',
    aboutWatermark: 'MOVEMENT AS',
    aboutGoldTitle: 'EXPRESSION.',
    aboutBody: [
      'Dance gives students an opportunity to communicate ideas and emotions beyond words. Through movement, they can develop greater body awareness, creativity, attentiveness, and confidence in their own ability to express themselves.',
      'The learning process also nurtures perseverance, precision, self-discipline, and the ability to grow gradually through practice. Dance creates room for individual development while encouraging students to listen to one another, cooperate, and take part in a shared creative experience.',
      'This track is suited to students who wish to combine movement with thought, creativity with discipline, and personal growth with a supportive group environment.',
    ],
    glance: [
      { label: 'Focus', value: 'Movement + expression' },
      { label: 'Skills', value: 'Creativity · discipline' },
      { label: 'Approach', value: 'Personal + collaborative' },
      { label: 'Setting', value: 'Supportive group learning' },
    ],
    timelineTitle: 'THE CREATIVE PROCESS.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Movement awareness',
        desc:
          'Developing attentiveness, coordination, and a deeper awareness of movement.',
      },
      {
        period: 'FOCUS 02',
        title: 'Personal expression',
        desc:
          'Exploring how ideas and emotions can be expressed through a physical language.',
      },
      {
        period: 'FOCUS 03',
        title: 'Creative collaboration',
        desc:
          'Learning to listen, cooperate, and take part in a shared artistic process.',
      },
    ],
    relatedSlugs: ['theatre', 'basketball'],
  },

  // ── SCIENCE ───────────────────────────────────────────────────────────

  {
    slug: 'biology',
    name: 'Biology',
    cat: 'SCIENCE',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: 'wide',
    desc:
      'An exploration of living organisms, the human body, and the biological processes that shape life.',
    lede:
      'Biology at Ulpenat Tzvia Kokhav Yaakov invites curious students to explore the living world, understand the human body, and examine the processes taking place within us and around us.',
    aboutWatermark: 'LIFE FROM',
    aboutGoldTitle: 'WITHIN.',
    aboutBody: [
      'The biology track opens a door to the rich and complex world of living organisms. Students deepen their understanding of the human body, the natural world, and the systems that make life possible.',
      'The programme introduces students to fascinating topics such as the brain, the reproductive system, the body’s defence mechanisms, and the way the nervous system allows the sense of touch to function. Students also encounter the smallest living organisms and explore the remarkable diversity of life.',
      'Biology encourages students to observe carefully, ask meaningful questions, and search for evidence-based explanations. Rather than simply learning that something occurs, they examine how it happens and which biological processes make it possible.',
    ],
    glance: [
      { label: 'Focus', value: 'Living organisms' },
      { label: 'Human biology', value: 'Body systems' },
      { label: 'Key skill', value: 'Scientific thinking' },
      { label: 'Approach', value: 'Observation + inquiry' },
    ],
    timelineTitle: 'AREAS OF EXPLORATION.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'The human body',
        desc:
          'Exploring the systems and biological processes that influence everyday life.',
      },
      {
        period: 'FOCUS 02',
        title: 'The nervous system and senses',
        desc:
          'Understanding how the brain, nerves, and sensory processes help us experience the world.',
      },
      {
        period: 'FOCUS 03',
        title: 'The diversity of life',
        desc:
          'Investigating living organisms and developing a deeper appreciation for the natural world.',
      },
    ],
    relatedSlugs: ['physics', 'chemistry'],
  },

  {
    slug: 'physics',
    name: 'Physics',
    cat: 'SCIENCE',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    desc:
      'Scientific questions, analytical thinking, and a deeper understanding of the technologies that surround us.',
    lede:
      'Physics at Ulpenat Tzvia Kokhav Yaakov helps students understand the principles behind everyday phenomena and modern technology while developing precise and analytical thinking.',
    aboutWatermark: 'UNDERSTAND',
    aboutGoldTitle: 'THE WORLD.',
    aboutBody: [
      'Why is the sky blue? What is an electrical current? Can a mobile phone affect our health? What is radioactive material, and how can it be used to fight cancer while also posing risks?',
      'Physics begins with questions about the world around us. The track invites students to examine familiar phenomena from a scientific perspective and discover the principles that explain how nature and technology work.',
      'The subject is much more than a collection of formulas. It develops analytical thinking, precision, intellectual curiosity, and the ability to approach complex questions in a structured way. The online learning format makes this field accessible to students who wish to deepen their scientific understanding.',
    ],
    glance: [
      { label: 'Format', value: 'Online' },
      { label: 'Focus', value: 'Everyday phenomena' },
      { label: 'Topics', value: 'Energy · electricity · radiation' },
      { label: 'Key skill', value: 'Analytical thinking' },
    ],
    timelineTitle: 'QUESTIONS THAT LEAD TO DISCOVERY.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Phenomena in everyday life',
        desc:
          'Looking at familiar experiences through a scientific and analytical lens.',
      },
      {
        period: 'FOCUS 02',
        title: 'Electricity and technology',
        desc:
          'Understanding how scientific principles shape the devices and systems around us.',
      },
      {
        period: 'FOCUS 03',
        title: 'Radiation and its uses',
        desc:
          'Exploring how scientific knowledge can support medicine while requiring careful understanding.',
      },
    ],
    relatedSlugs: ['biology', 'chemistry'],
  },

  {
    slug: 'chemistry',
    name: 'Chemistry',
    cat: 'SCIENCE',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    desc:
      'Online learning, scientific exploration, home experiments, and practical visits to the Davidson Institute.',
    lede:
      'Chemistry at Ulpenat Tzvia Kokhav Yaakov combines accessible online learning with experiments and practical encounters that make scientific ideas tangible.',
    aboutWatermark: 'MATTER AND',
    aboutGoldTitle: 'CHANGE.',
    aboutBody: [
      'Chemistry gives students an opportunity to explore materials, reactions, and the scientific processes taking place all around us. The track combines guided online learning with practical experimentation.',
      'Students meet online each week with a teacher and a group of learners from different parts of the country. Lessons include presentations, videos, assignments, and experiments that can be carried out at home. This combination helps transform complex scientific ideas into clear and tangible experiences.',
      'Several times during the year, students are invited to the Davidson Institute for Science Education. These visits allow them to conduct experiments in real laboratories and become familiar with a professional scientific environment.',
    ],
    glance: [
      { label: 'Format', value: 'Online' },
      { label: 'Online meeting', value: 'Weekly' },
      { label: 'Home experiments', value: 'Included' },
      { label: 'Institute visits', value: 'Several each year' },
    ],
    timelineTitle: 'LEARN, EXPERIMENT, DISCOVER.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Guided online study',
        desc:
          'Weekly learning through explanations, presentations, videos, and group interaction.',
      },
      {
        period: 'FOCUS 02',
        title: 'Experiments at home',
        desc:
          'Practical activities that make scientific concepts more concrete and understandable.',
      },
      {
        period: 'FOCUS 03',
        title: 'Davidson Institute visits',
        desc:
          'Opportunities to work in laboratory settings and encounter science beyond the screen.',
      },
    ],
    milestones: [
      { num: '1', label: 'Online Meeting / Week' },
      { num: 'HOME', label: 'Experiments Included' },
      { num: 'LAB', label: 'Practical Encounters' },
      { num: '∞', label: 'Questions to Explore' },
    ],
    relatedSlugs: ['biology', 'physics'],
  },

  // ── SPORTS ────────────────────────────────────────────────────────────
  // Basketball is an editorial addition requested for the new website.
  // Operational details should be added after confirmation by the school.

  {
    slug: 'basketball',
    name: 'Basketball',
    cat: 'SPORTS',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    desc:
      'Movement, teamwork, coordination, and confidence developed through a shared sporting experience.',
    lede:
      'Basketball at Ulpenat Tzvia Kokhav Yaakov creates a space for students to move, cooperate, build confidence, and experience the value of working toward a shared goal.',
    aboutWatermark: 'MOVE AS',
    aboutGoldTitle: 'A TEAM.',
    aboutBody: [
      'Basketball is more than a physical activity. It gives students an opportunity to develop coordination, attentiveness, persistence, and the ability to make decisions while working together with others.',
      'The sport encourages students to communicate, support one another, and understand the importance of both individual effort and collective responsibility. Every practice becomes an opportunity to grow stronger, more focused, and more confident.',
      'Within a supportive educational environment, basketball can help students discover the value of discipline, teamwork, resilience, and enjoying the process of improvement.',
    ],
    glance: [
      { label: 'Format', value: 'In person' },
      { label: 'Focus', value: 'Movement + teamwork' },
      { label: 'Skills', value: 'Coordination · resilience' },
      { label: 'Approach', value: 'Practice + shared play' },
    ],
    timelineTitle: 'GROWING THROUGH SPORT.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Movement foundations',
        desc:
          'Developing coordination, attentiveness, and confidence through active participation.',
      },
      {
        period: 'FOCUS 02',
        title: 'Teamwork',
        desc:
          'Learning to communicate, cooperate, and take responsibility within a group.',
      },
      {
        period: 'FOCUS 03',
        title: 'Persistence and growth',
        desc:
          'Building resilience and discovering the value of consistent effort over time.',
      },
    ],
    relatedSlugs: ['dance', 'theatre'],
  },

  // ── HUMANITIES ────────────────────────────────────────────────────────

  {
    slug: 'social-sciences',
    name: 'Social Sciences',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    desc:
      'Psychology, sociology, and research tools for understanding individuals, groups, and society.',
    lede:
      'Social Sciences at Ulpenat Tzvia Kokhav Yaakov gives students a new lens for understanding people, communities, and the forces that shape everyday life.',
    aboutWatermark: 'SOCIETY AS',
    aboutGoldTitle: 'A QUESTION.',
    aboutBody: [
      'The social sciences track helps students examine familiar experiences from a new perspective. Why do people behave as they do? How do groups influence individuals? How are attitudes connected to actions? How do values and norms shape everyday life?',
      'The five-unit programme combines psychology and sociology with a research project. Students explore cultures, values, norms, gender, social roles, different types of groups, and the ways in which society influences the individual.',
      'In psychology, they encounter topics such as emotions, cognition, perception, attention, attitudes, behaviour, and social influence. The research component gives students an opportunity to ask questions, examine information, and draw thoughtful conclusions.',
    ],
    glance: [
      { label: 'Study units', value: '5' },
      { label: 'Psychology', value: '2 units' },
      { label: 'Sociology', value: '2 units' },
      { label: 'Research project', value: '1 unit' },
    ],
    timelineTitle: 'A NEW WAY TO SEE THE WORLD.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Psychology',
        desc:
          'Emotions, cognition, perception, attitudes, behaviour, and social influence.',
      },
      {
        period: 'FOCUS 02',
        title: 'Sociology',
        desc:
          'Cultures, values, norms, social roles, groups, and the relationship between society and the individual.',
      },
      {
        period: 'FOCUS 03',
        title: 'Research',
        desc:
          'Asking meaningful questions, examining findings, and developing evidence-based conclusions.',
      },
    ],
    milestones: [
      { num: '5', label: 'Study Units' },
      { num: '2', label: 'Psychology Units' },
      { num: '2', label: 'Sociology Units' },
      { num: '1', label: 'Research Project' },
    ],
    relatedSlugs: ['jewish-thought', 'land-of-israel'],
  },

  {
    slug: 'land-of-israel',
    name: 'Land of Israel',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: 'big',
    desc:
      'Jerusalem, the Negev, and the mountain region explored through history, geography, nature, and research.',
    lede:
      'Land of Israel studies at Ulpenat Tzvia Kokhav Yaakov offers a multidisciplinary encounter with the landscapes, stories, and natural features that shape the country.',
    aboutWatermark: 'THE LAND AS',
    aboutGoldTitle: 'A LIVING TEXT.',
    aboutBody: [
      'The Land of Israel track gives students an opportunity to explore the country in depth. The programme focuses on three central areas: Jerusalem, the Negev, and the mountain region.',
      'Understanding the land extends far beyond historical events. Students encounter the many elements that shape a region: geography, plants, animals, soil, human stories, and the relationship between nature and culture.',
      'The track includes two study units dedicated to Jerusalem, one focused on the Negev, one on the mountain region, and an additional research unit. This multidisciplinary approach helps students see the land not simply as a map, but as a complex and meaningful living environment.',
    ],
    glance: [
      { label: 'Study units', value: '5' },
      { label: 'Jerusalem', value: '2 units' },
      { label: 'Negev + mountain region', value: '2 units' },
      { label: 'Research project', value: '1 unit' },
    ],
    timelineTitle: 'READING THE LAND.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Jerusalem',
        desc:
          'A deeper encounter with the history, geography, and distinctive character of the city.',
      },
      {
        period: 'FOCUS 02',
        title: 'The Negev and the mountain region',
        desc:
          'Exploring contrasting landscapes and the natural and human stories that shape them.',
      },
      {
        period: 'FOCUS 03',
        title: 'Independent research',
        desc:
          'Choosing a topic, exploring it in depth, and developing structured independent learning skills.',
      },
    ],
    milestones: [
      { num: '5', label: 'Study Units' },
      { num: '2', label: 'Jerusalem Units' },
      { num: '1', label: 'Negev Unit' },
      { num: '1+1', label: 'Mountain + Research' },
    ],
    relatedSlugs: ['jewish-thought', 'social-sciences'],
  },

  {
    slug: 'jewish-thought',
    name: 'Jewish Thought',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: 'tall',
    desc:
      'Tradition, identity, values, and meaningful questions explored through Jewish intellectual thought.',
    lede:
      'Jewish Thought at Ulpenat Tzvia Kokhav Yaakov invites students to encounter ideas that have shaped Jewish tradition and to explore questions of identity, faith, values, and meaning.',
    aboutWatermark: 'QUESTIONS WITH',
    aboutGoldTitle: 'DEPTH.',
    aboutBody: [
      'Jewish thought reflects the ongoing effort of Jewish thinkers throughout history to reinterpret the intellectual foundations of Jewish tradition and culture and to address the challenges they raise.',
      'The track invites students into a rich world of ideas, questions, and discussions. It provides space to explore identity, faith, values, responsibility, and meaning while examining how ideas from the past continue to encounter life in the present.',
      'The learning process encourages students to ask questions, listen to different perspectives, express ideas clearly, and approach complex issues with depth, sensitivity, and responsibility.',
    ],
    glance: [
      { label: 'Focus', value: 'Jewish thought' },
      { label: 'Themes', value: 'Identity · values · meaning' },
      { label: 'Approach', value: 'Study + reflection' },
      { label: 'Key skill', value: 'Independent thinking' },
    ],
    timelineTitle: 'IDEAS THAT CONTINUE TO SPEAK.',
    timeline: [
      {
        period: 'FOCUS 01',
        title: 'Tradition and interpretation',
        desc:
          'Encountering the intellectual foundations of Jewish tradition and culture.',
      },
      {
        period: 'FOCUS 02',
        title: 'Identity and values',
        desc:
          'Exploring questions of faith, responsibility, and the ideas that shape personal and communal life.',
      },
      {
        period: 'FOCUS 03',
        title: 'Thoughtful dialogue',
        desc:
          'Learning to ask questions, listen carefully, and engage with complex issues in a meaningful way.',
      },
    ],
    relatedSlugs: ['land-of-israel', 'social-sciences', 'theatre'],
  },

];


export const ACTIVITIES_HE: ActivityDetail[] = [
  // ── אמנויות ──────────────────────────────────────────────────────────

  {
    slug: 'theatre',
    name: 'תיאטרון',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'big',
    badge: 'FEATURED',
    grades: 'י׳ — י״ב',
    desc:
      'מסלול תלת־שנתי בן חמש יחידות המשלב ספרות דרמטית, משחק, בימוי, עבודה בימתית ויצירה משותפת.',
    lede:
      'מגמת התיאטרון באולפנת צביה כוכב יעקב היא מסלול תלת־שנתי שבו התלמידות לומדות טקסטים דרמטיים, מפתחות כישורי במה והופכות רעיונות ליצירה חיה.',
    aboutWatermark: 'מהטקסט',
    aboutGoldTitle: 'אל הבמה.',
    aboutBody: [
      'מגמת התיאטרון נלמדת מכיתה י׳ ועד כיתה י״ב ומקנה חמש יחידות לימוד. היא משלבת בסיס עיוני מעמיק עם התנסות מעשית, ומאפשרת לתלמידות להכיר את התיאטרון הן כתחום דעת והן כמרחב יצירתי.',
      'התלמידות לומדות מחזות, ז׳אנרים, תקופות שונות בתולדות התיאטרון ודרכים לניתוח יצירות דרמטיות. לצד הלימוד העיוני הן מתנסות במשחק, בימוי, עמידה מול קהל והיכרות עם מרכיבי ההפקה הבימתית. התהליך מעודד קריאה מעמיקה, ביטחון עצמי, שיתוף פעולה ויכולת להפוך טקסט כתוב לחוויה אמנותית משותפת.',
      'כחלק מהלימודים התלמידות נחשפות גם לתיאטרון מקצועי באמצעות צפייה בהצגות רפרטואריות ומביאות את התהליך לידי ביטוי בהפקות במה המוצגות בפני קהילת האולפנה.',
    ],
    glance: [
      { label: 'משך המסלול', value: '3 שנים' },
      { label: 'שכבות גיל', value: 'י׳ — י״ב' },
      { label: 'יחידות לימוד', value: '5' },
      { label: 'גישה לימודית', value: 'עיון + מעשה' },
    ],
    timelineTitle: 'התהליך הלימודי.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'ספרות דרמטית',
        desc:
          'היכרות עם מחזות, ז׳אנרים, תקופות שונות ודרכים לניתוח יצירות דרמטיות.',
      },
      {
        period: 'מוקד 02',
        title: 'כישורי במה',
        desc:
          'משחק, בימוי, עמידה מול קהל והיכרות עם המרכיבים המרכזיים של הפקה תיאטרונית.',
      },
      {
        period: 'מוקד 03',
        title: 'מלמידה להפקה',
        desc:
          'עבודה יצירתית משותפת ההופכת רעיון וטקסט להצגה חיה על הבמה.',
      },
    ],
    milestones: [
      { num: '3', label: 'שנות לימוד' },
      { num: '5', label: 'יחידות לימוד' },
      { num: '2', label: 'עיון + מעשה' },
      { num: '1', label: 'תהליך יצירתי' },
    ],
    relatedSlugs: ['dance', 'visual-arts', 'jewish-thought'],
  },

  {
    slug: 'dance',
    name: 'מחול',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'tall',
    desc:
      'תנועה, יצירתיות, התמדה וביטוי אישי בתוך מרחב לימודי תומך ומשותף.',
    lede:
      'מגמת המחול באולפנת צביה כוכב יעקב מעניקה לתלמידות מרחב יצירתי לחקור תנועה, לפתח ביטחון ולגלות דרך משמעותית לביטוי אישי.',
    aboutWatermark: 'תנועה כדרך',
    aboutGoldTitle: 'לביטוי.',
    aboutBody: [
      'המחול מאפשר לתלמידות לבטא רעיונות ורגשות בדרך שאינה תלויה במילים. באמצעות תנועה הן מפתחות מודעות גופנית, יצירתיות, הקשבה וביטחון ביכולת להביא את עצמן לידי ביטוי.',
      'תהליך הלמידה מטפח גם התמדה, דיוק, משמעת עצמית ויכולת להתקדם בהדרגה מתוך תרגול. המחול מעניק מקום להתפתחות אישית, ובמקביל מעודד הקשבה לאחרות, שיתוף פעולה והשתתפות בתהליך יצירתי משותף.',
      'המגמה מתאימה לתלמידות המבקשות לשלב בין תנועה למחשבה, בין יצירתיות למשמעת ובין צמיחה אישית לבין חוויה קבוצתית תומכת.',
    ],
    glance: [
      { label: 'מוקד', value: 'תנועה + ביטוי אישי' },
      { label: 'מיומנויות', value: 'יצירתיות · התמדה' },
      { label: 'גישה', value: 'אישי + קבוצתי' },
      { label: 'מסגרת', value: 'למידה תומכת ומשותפת' },
    ],
    timelineTitle: 'התהליך היצירתי.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'מודעות לתנועה',
        desc:
          'פיתוח הקשבה, קואורדינציה והיכרות מעמיקה יותר עם עולם התנועה.',
      },
      {
        period: 'מוקד 02',
        title: 'ביטוי אישי',
        desc:
          'גילוי הדרך שבה רעיונות ורגשות יכולים לקבל ביטוי באמצעות שפה תנועתית.',
      },
      {
        period: 'מוקד 03',
        title: 'יצירה משותפת',
        desc:
          'למידה של הקשבה, שיתוף פעולה והשתתפות בתהליך אמנותי קבוצתי.',
      },
    ],
    relatedSlugs: ['theatre', 'visual-arts', 'basketball'],
  },

  {
    slug: 'visual-arts',
    name: 'אמנות חזותית',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'wide',
    desc:
      'פעילות יצירתית גמישה שבה תלמידות מתנדבות מציירות, מעצבות ומכינות תפאורה וקישוטים לאירועים מיוחדים באולפנה.',
    lede:
      'האמנות החזותית באולפנת צביה כוכב יעקב מאפשרת לתלמידות להביא יצירתיות אל חיי האולפנה באמצעות פרויקטים משותפים, קישוטים ותרומות אמנותיות לאירועים משמעותיים.',
    aboutWatermark: 'יצירתיות',
    aboutGoldTitle: 'בפעולה.',
    aboutBody: [
      'האמנות החזותית היא פעילות יצירתית גמישה המתקיימת לאורך השנה בהתאם לצרכים של האולפנה. במקום תוכנית שבועית קבועה, התלמידות מוזמנות להשתתף בהתנדבות בפרויקטים אמנותיים הקשורים לאירועים מיוחדים, מועדים ומרחבים משותפים.',
      'במהלך הפעילות התלמידות יכולות לצייר, לאייר, להכין קישוטים, לעצב אלמנטים חזותיים ולהפוך רעיון למשהו מוחשי. כל פרויקט מציע הזדמנות אחרת להתנסות בצבע, קומפוזיציה, חומרים ועבודה משותפת.',
      'הפעילות מאפשרת לתלמידות לתרום מכישוריהן באופן מעשי ונראה לעין. היצירתיות שלהן הופכת לחלק מהאווירה באולפנה, מעשירה אירועים ומסייעת ליצור מרחבים נעימים, מזמינים ומחוברים לקהילה.',
    ],
    glance: [
      { label: 'סוג הפעילות', value: 'פעילות התנדבותית' },
      { label: 'תדירות', value: 'בהתאם לאירועים' },
      { label: 'מוקד', value: 'ציור · איור · קישוט' },
      { label: 'גישה', value: 'יצירה משותפת' },
    ],
    timelineTitle: 'מרעיון ליצירה.',
    timeline: [
      {
        period: 'שלב 01',
        title: 'מטרה משותפת',
        desc:
          'כל פרויקט מתחיל באירוע, מועד או מרחב באולפנה שניתן להעשיר באמצעות יצירה חזותית.',
      },
      {
        period: 'שלב 02',
        title: 'תרומה יצירתית',
        desc:
          'התלמידות המתנדבות מציירות, מאיירות, מעצבות ומכינות קישוטים או אלמנטים אמנותיים נוספים.',
      },
      {
        period: 'שלב 03',
        title: 'תוצאה שנוכחת במרחב',
        desc:
          'העבודות המוגמרות הופכות לחלק מסביבת האולפנה ותורמות לאווירה של האירוע.',
      },
    ],
    relatedSlugs: ['theatre', 'dance'],
  },

  // ── מדעים ─────────────────────────────────────────────────────────────

  {
    slug: 'biology',
    name: 'ביולוגיה',
    cat: 'מדעים',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: 'wide',
    desc:
      'היכרות עם עולם החי, גוף האדם והתהליכים הביולוגיים המעצבים את החיים.',
    lede:
      'מגמת הביולוגיה באולפנת צביה כוכב יעקב מזמינה תלמידות סקרניות לחקור את עולם החיים, להבין את גוף האדם ולהעמיק בתהליכים המתרחשים בתוכנו וסביבנו.',
    aboutWatermark: 'החיים',
    aboutGoldTitle: 'מבפנים.',
    aboutBody: [
      'מגמת הביולוגיה פותחת דלת לעולם העשיר והמורכב של היצורים החיים. התלמידות מעמיקות בהבנת גוף האדם, הטבע והמערכות המאפשרות את קיומם של החיים.',
      'הלימודים חושפים את התלמידות לנושאים מרתקים כגון פעילות המוח, מערכת הרבייה, מנגנוני ההגנה של הגוף והדרך שבה מערכת העצבים מאפשרת לחוש מגע. הן מכירות גם יצורים חיים זעירים ולומדות על המגוון הרחב הקיים בעולם החי.',
      'הביולוגיה מעודדת התבוננות מדויקת, שאילת שאלות וחיפוש אחר הסברים מבוססים. במקום להסתפק בידיעה שתופעה מסוימת מתרחשת, התלמידות בוחנות כיצד היא מתרחשת ואילו תהליכים ביולוגיים מאפשרים אותה.',
    ],
    glance: [
      { label: 'מוקד', value: 'עולם החי' },
      { label: 'ביולוגיה אנושית', value: 'מערכות הגוף' },
      { label: 'מיומנות מרכזית', value: 'חשיבה מדעית' },
      { label: 'גישה', value: 'התבוננות + חקר' },
    ],
    timelineTitle: 'תחומי חקר.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'גוף האדם',
        desc:
          'היכרות עם המערכות והתהליכים הביולוגיים המשפיעים על חיי היום־יום.',
      },
      {
        period: 'מוקד 02',
        title: 'מערכת העצבים והחושים',
        desc:
          'הבנת הדרך שבה המוח, העצבים והחושים מאפשרים לנו לחוות את העולם.',
      },
      {
        period: 'מוקד 03',
        title: 'מגוון החיים',
        desc:
          'חקירת יצורים חיים ופיתוח הבנה עמוקה יותר של עולם הטבע.',
      },
    ],
    relatedSlugs: ['physics', 'chemistry'],
  },

  {
    slug: 'physics',
    name: 'פיזיקה',
    cat: 'מדעים',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    desc:
      'שאלות מדעיות, חשיבה אנליטית והבנה מעמיקה יותר של התופעות והטכנולוגיות המקיפות אותנו.',
    lede:
      'מגמת הפיזיקה באולפנת צביה כוכב יעקב מסייעת לתלמידות להבין את העקרונות שמאחורי תופעות יום־יומיות וטכנולוגיות מתקדמות, תוך פיתוח חשיבה מדויקת ואנליטית.',
    aboutWatermark: 'להבין את',
    aboutGoldTitle: 'העולם.',
    aboutBody: [
      'מדוע השמים כחולים? מהו זרם חשמלי? האם טלפון נייד יכול להשפיע על הבריאות שלנו? מהו חומר רדיואקטיבי, וכיצד ניתן להשתמש בו לטיפול רפואי תוך הבנת הסיכונים הכרוכים בו?',
      'הפיזיקה מתחילה בשאלות על העולם שסביבנו. המגמה מזמינה את התלמידות להתבונן בתופעות מוכרות מנקודת מבט מדעית ולגלות את העקרונות המסבירים כיצד פועלים הטבע והטכנולוגיה.',
      'פיזיקה אינה רק אוסף של נוסחאות. היא מפתחת חשיבה אנליטית, דיוק, סקרנות אינטלקטואלית ויכולת להתמודד עם שאלות מורכבות בצורה מסודרת. המסגרת המקוונת מאפשרת לתלמידות המעוניינות בכך להעמיק בתחום המדעי בצורה נגישה.',
    ],
    glance: [
      { label: 'מתכונת', value: 'מקוון' },
      { label: 'מוקד', value: 'תופעות מחיי היום־יום' },
      { label: 'נושאים', value: 'אנרגיה · חשמל · קרינה' },
      { label: 'מיומנות מרכזית', value: 'חשיבה אנליטית' },
    ],
    timelineTitle: 'שאלות שמובילות לגילוי.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'תופעות בחיי היום־יום',
        desc:
          'התבוננות בחוויות מוכרות באמצעות כלים מדעיים וחשיבה אנליטית.',
      },
      {
        period: 'מוקד 02',
        title: 'חשמל וטכנולוגיה',
        desc:
          'הבנת העקרונות המדעיים המעצבים את המכשירים והמערכות המקיפים אותנו.',
      },
      {
        period: 'מוקד 03',
        title: 'קרינה והשימושים בה',
        desc:
          'היכרות עם הדרך שבה ידע מדעי יכול לסייע ברפואה תוך הבנה אחראית של הסיכונים.',
      },
    ],
    relatedSlugs: ['biology', 'chemistry'],
  },

  {
    slug: 'chemistry',
    name: 'כימיה',
    cat: 'מדעים',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    desc:
      'למידה מקוונת, חקר מדעי, ניסויים בבית ומפגשים מעשיים במכון דוידסון לחינוך מדעי.',
    lede:
      'מגמת הכימיה באולפנת צביה כוכב יעקב משלבת למידה מקוונת נגישה עם ניסויים והתנסויות מעשיות ההופכים רעיונות מדעיים למוחשיים.',
    aboutWatermark: 'חומר',
    aboutGoldTitle: 'ושינוי.',
    aboutBody: [
      'הכימיה מאפשרת לתלמידות להכיר חומרים, תגובות ותהליכים מדעיים המתרחשים סביבנו בכל יום. המגמה משלבת למידה מקוונת מונחית עם התנסות מעשית.',
      'בכל שבוע מתקיים שיעור מקוון עם מורה וקבוצת תלמידות ותלמידים מרחבי הארץ. השיעורים כוללים מצגות, סרטונים, משימות וניסויים שניתן לבצע בבית. השילוב הזה מסייע להפוך רעיונות מדעיים מורכבים לברורים ומוחשיים יותר.',
      'מספר פעמים במהלך השנה התלמידות מוזמנות למכון דוידסון לחינוך מדעי. המפגשים מאפשרים לבצע ניסויים במעבדות אמיתיות ולהכיר מקרוב סביבה מדעית מקצועית.',
    ],
    glance: [
      { label: 'מתכונת', value: 'מקוון' },
      { label: 'מפגש מקוון', value: 'אחת לשבוע' },
      { label: 'ניסויים בבית', value: 'כלולים במסלול' },
      { label: 'ביקורים במכון', value: 'מספר פעמים בשנה' },
    ],
    timelineTitle: 'ללמוד, להתנסות ולגלות.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'למידה מקוונת מונחית',
        desc:
          'מפגש שבועי הכולל הסברים, מצגות, סרטונים ואינטראקציה קבוצתית.',
      },
      {
        period: 'מוקד 02',
        title: 'ניסויים בבית',
        desc:
          'פעילויות מעשיות ההופכות מושגים מדעיים למוחשיים וברורים יותר.',
      },
      {
        period: 'מוקד 03',
        title: 'ביקורים במכון דוידסון',
        desc:
          'התנסות בסביבת מעבדה והיכרות עם עולם המדע מעבר למסך.',
      },
    ],
    milestones: [
      { num: '1', label: 'מפגש מקוון בשבוע' },
      { num: 'HOME', label: 'ניסויים בבית' },
      { num: 'LAB', label: 'התנסות מעשית' },
      { num: '∞', label: 'שאלות לחקור' },
    ],
    relatedSlugs: ['biology', 'physics'],
  },

  // ── ספורט ─────────────────────────────────────────────────────────────

  {
    slug: 'basketball',
    name: 'כדורסל',
    cat: 'ספורט',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    desc:
      'תנועה, עבודת צוות, קואורדינציה וביטחון עצמי המתפתחים באמצעות פעילות ספורטיבית משותפת.',
    lede:
      'פעילות הכדורסל באולפנת צביה כוכב יעקב יוצרת מרחב לתנועה, שיתוף פעולה, חיזוק הביטחון העצמי והתנסות בערך של עבודה למען מטרה משותפת.',
    aboutWatermark: 'לנוע',
    aboutGoldTitle: 'כקבוצה.',
    aboutBody: [
      'כדורסל הוא הרבה מעבר לפעילות גופנית. הוא מעניק לתלמידות הזדמנות לפתח קואורדינציה, ריכוז, התמדה ויכולת לקבל החלטות תוך שיתוף פעולה עם אחרות.',
      'המשחק מעודד תקשורת, תמיכה הדדית והבנת החשיבות של מאמץ אישי לצד אחריות קבוצתית. כל אימון הוא הזדמנות להתחזק, להתמקד ולבנות ביטחון.',
      'בתוך סביבה חינוכית תומכת, הכדורסל מסייע לתלמידות לגלות את הערך של משמעת, עבודת צוות, חוסן אישי והנאה מתהליך ההתקדמות.',
    ],
    glance: [
      { label: 'מתכונת', value: 'פעילות פרונטלית' },
      { label: 'מוקד', value: 'תנועה + עבודת צוות' },
      { label: 'מיומנויות', value: 'קואורדינציה · חוסן אישי' },
      { label: 'גישה', value: 'תרגול + משחק משותף' },
    ],
    timelineTitle: 'צומחות דרך הספורט.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'יסודות התנועה',
        desc:
          'פיתוח קואורדינציה, ריכוז וביטחון באמצעות השתתפות פעילה.',
      },
      {
        period: 'מוקד 02',
        title: 'עבודת צוות',
        desc:
          'למידה של תקשורת, שיתוף פעולה ואחריות בתוך קבוצה.',
      },
      {
        period: 'מוקד 03',
        title: 'התמדה וצמיחה',
        desc:
          'חיזוק החוסן האישי והיכרות עם הערך של מאמץ עקבי לאורך זמן.',
      },
    ],
    relatedSlugs: ['dance', 'theatre'],
  },

  // ── מדעי הרוח ─────────────────────────────────────────────────────────

  {
    slug: 'social-sciences',
    name: 'מדעי החברה',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    desc:
      'פסיכולוגיה, סוציולוגיה וכלי מחקר המסייעים להבין אנשים, קבוצות ותהליכים חברתיים.',
    lede:
      'מגמת מדעי החברה באולפנת צביה כוכב יעקב מעניקה לתלמידות נקודת מבט חדשה על אנשים, קהילות והכוחות המעצבים את חיי היום־יום.',
    aboutWatermark: 'החברה',
    aboutGoldTitle: 'כשאלה.',
    aboutBody: [
      'מגמת מדעי החברה מאפשרת לתלמידות להתבונן בחוויות מוכרות מנקודת מבט חדשה. מדוע אנשים מתנהגים כפי שהם מתנהגים? כיצד קבוצות משפיעות על היחיד? מה הקשר בין עמדות להתנהגות? וכיצד ערכים ונורמות מעצבים את חיי היום־יום?',
      'המסלול בן חמש יחידות הלימוד משלב פסיכולוגיה, סוציולוגיה ועבודת חקר. התלמידות עוסקות בתרבויות, ערכים, נורמות, מגדר, תפקידים חברתיים, סוגים שונים של קבוצות והדרכים שבהן החברה משפיעה על האדם.',
      'בלימודי הפסיכולוגיה הן מכירות נושאים כגון רגשות, קוגניציה, תפיסה, קשב, עמדות, התנהגות והשפעה חברתית. עבודת החקר מעניקה להן הזדמנות לשאול שאלות, לבחון מידע ולהסיק מסקנות מבוססות.',
    ],
    glance: [
      { label: 'יחידות לימוד', value: '5' },
      { label: 'פסיכולוגיה', value: '2 יחידות' },
      { label: 'סוציולוגיה', value: '2 יחידות' },
      { label: 'עבודת חקר', value: 'יחידה אחת' },
    ],
    timelineTitle: 'דרך חדשה להתבונן בעולם.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'פסיכולוגיה',
        desc:
          'רגשות, קוגניציה, תפיסה, עמדות, התנהגות והשפעה חברתית.',
      },
      {
        period: 'מוקד 02',
        title: 'סוציולוגיה',
        desc:
          'תרבויות, ערכים, נורמות, תפקידים חברתיים וקשרים בין החברה לבין היחיד.',
      },
      {
        period: 'מוקד 03',
        title: 'מחקר',
        desc:
          'שאילת שאלות משמעותיות, בחינת ממצאים ופיתוח מסקנות מבוססות.',
      },
    ],
    milestones: [
      { num: '5', label: 'יחידות לימוד' },
      { num: '2', label: 'יחידות פסיכולוגיה' },
      { num: '2', label: 'יחידות סוציולוגיה' },
      { num: '1', label: 'עבודת חקר' },
    ],
    relatedSlugs: ['jewish-thought', 'land-of-israel'],
  },

  {
    slug: 'land-of-israel',
    name: 'ארץ ישראל',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: 'big',
    desc:
      'ירושלים, הנגב ואזור ההר נלמדים דרך היסטוריה, גאוגרפיה, טבע ועבודת חקר.',
    lede:
      'מגמת ארץ ישראל באולפנת צביה כוכב יעקב מציעה היכרות רב־תחומית עם הנופים, הסיפורים והמאפיינים הטבעיים המעצבים את הארץ.',
    aboutWatermark: 'הארץ כ',
    aboutGoldTitle: 'טקסט חי.',
    aboutBody: [
      'מגמת ארץ ישראל מעניקה לתלמידות הזדמנות להכיר את הארץ לעומק. המסלול מתמקד בשלושה אזורים מרכזיים: ירושלים, הנגב ואזור ההר.',
      'היכרות עם הארץ אינה מסתכמת בלימוד אירועים היסטוריים. התלמידות בוחנות גם את המרכיבים המעצבים כל אזור: גאוגרפיה, צומח, בעלי חיים, קרקע, סיפורים אנושיים והקשר שבין טבע לתרבות.',
      'המסלול כולל שתי יחידות לימוד העוסקות בירושלים, יחידה המוקדשת לנגב, יחידה העוסקת באזור ההר ויחידה נוספת של עבודת חקר. הגישה הרב־תחומית מאפשרת לתלמידות לראות בארץ לא רק מפה, אלא מרחב חי, מורכב ובעל משמעות.',
    ],
    glance: [
      { label: 'יחידות לימוד', value: '5' },
      { label: 'ירושלים', value: '2 יחידות' },
      { label: 'הנגב + אזור ההר', value: '2 יחידות' },
      { label: 'עבודת חקר', value: 'יחידה אחת' },
    ],
    timelineTitle: 'לקרוא את הארץ.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'ירושלים',
        desc:
          'היכרות מעמיקה עם ההיסטוריה, הגאוגרפיה והאופי הייחודי של העיר.',
      },
      {
        period: 'מוקד 02',
        title: 'הנגב ואזור ההר',
        desc:
          'חקר נופים שונים והסיפורים הטבעיים והאנושיים המעצבים אותם.',
      },
      {
        period: 'מוקד 03',
        title: 'עבודת חקר עצמאית',
        desc:
          'בחירת נושא, העמקה בו ופיתוח יכולת למידה עצמאית ומסודרת.',
      },
    ],
    milestones: [
      { num: '5', label: 'יחידות לימוד' },
      { num: '2', label: 'יחידות ירושלים' },
      { num: '1', label: 'יחידת הנגב' },
      { num: '1+1', label: 'אזור ההר + מחקר' },
    ],
    relatedSlugs: ['jewish-thought', 'social-sciences'],
  },

  {
    slug: 'jewish-thought',
    name: 'מחשבת ישראל',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: 'tall',
    desc:
      'מסורת, זהות, ערכים ושאלות משמעותיות הנלמדים מתוך עולם המחשבה היהודית.',
    lede:
      'מגמת מחשבת ישראל באולפנת צביה כוכב יעקב מזמינה את התלמידות לפגוש רעיונות שעיצבו את המסורת היהודית ולהעמיק בשאלות של זהות, אמונה, ערכים ומשמעות.',
    aboutWatermark: 'שאלות עם',
    aboutGoldTitle: 'עומק.',
    aboutBody: [
      'מחשבת ישראל היא תוצאה של מאמץ מתמשך מצד הוגים יהודים לאורך הדורות לפרש מחדש את היסודות העיוניים של המסורת והתרבות היהודית ולהתמודד עם האתגרים שהן מעלות.',
      'המגמה מזמינה את התלמידות להיכנס לעולם עשיר של רעיונות, שאלות ודיונים. היא יוצרת מרחב לעיסוק בזהות, אמונה, ערכים, אחריות ומשמעות, תוך בחינת הדרך שבה רעיונות מן העבר ממשיכים לפגוש את החיים בהווה.',
      'תהליך הלמידה מעודד את התלמידות לשאול שאלות, להקשיב לעמדות שונות, לבטא רעיונות בצורה בהירה ולהתמודד עם סוגיות מורכבות מתוך עומק, רגישות ואחריות.',
    ],
    glance: [
      { label: 'מוקד', value: 'מחשבה יהודית' },
      { label: 'נושאים', value: 'זהות · ערכים · משמעות' },
      { label: 'גישה', value: 'לימוד + התבוננות' },
      { label: 'מיומנות מרכזית', value: 'חשיבה עצמאית' },
    ],
    timelineTitle: 'רעיונות שממשיכים לדבר.',
    timeline: [
      {
        period: 'מוקד 01',
        title: 'מסורת ופרשנות',
        desc:
          'היכרות עם היסודות העיוניים של המסורת והתרבות היהודית.',
      },
      {
        period: 'מוקד 02',
        title: 'זהות וערכים',
        desc:
          'עיסוק בשאלות של אמונה, אחריות והרעיונות המעצבים את החיים האישיים והקהילתיים.',
      },
      {
        period: 'מוקד 03',
        title: 'שיח מעמיק',
        desc:
          'פיתוח היכולת לשאול, להקשיב ולהתמודד בצורה משמעותית עם סוגיות מורכבות.',
      },
    ],
    relatedSlugs: ['land-of-israel', 'social-sciences', 'theatre'],
  },
];


// ── Cloudinary academy imagery (folder academy/<activity>, shared per locale) ──
const CLD = 'https://res.cloudinary.com/dcpeggch3/image/upload';

const BIOLOGY_IMGS = [
  `${CLD}/v1780433199/%D7%91%D7%99%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94-1-1-1536x1152_vopc1v.jpg`,
  `${CLD}/v1780433197/%D7%91%D7%99%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94-2-1-1536x1152_hsmvc9.jpg`,
  `${CLD}/v1780433200/%D7%91%D7%99%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94-3-1-1536x1152_rkevf6.jpg`,
  `${CLD}/v1780433202/%D7%91%D7%99%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94-4-1-1536x1152_lkc0x0.jpg`,
];
const COUNTRY_IMGS = [
  `${CLD}/v1780433152/%D7%90%D7%A8%D7%A5-1-1-1536x1152_siosyg.jpg`,
  `${CLD}/v1780433154/WhatsApp-Image-2025-11-10-at-11.03.49-1536x1152_k4bccn.jpg`,
  `${CLD}/v1780433153/%D7%90%D7%A8%D7%A5-2-1-1152x1536_h1599j.jpg`,
  `${CLD}/v1780433155/%D7%90%D7%A8%D7%A5-3-1-1152x1536_k2qnlz.jpg`,
];
const SOCIAL_SCIENCE_IMGS = [
  `${CLD}/v1780433241/%D7%9E%D7%93%D7%A2%D7%99-%D7%94%D7%97%D7%91%D7%A8%D7%94-1-1-1536x1152_yzrx4s.jpg`,
  `${CLD}/v1780433239/%D7%9E%D7%93%D7%A2%D7%99-%D7%94%D7%97%D7%91%D7%A8%D7%94-2-1-1536x1152_gpi3ev.jpg`,
];
const THEATER_IMGS = [
  `${CLD}/v1780433179/%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F-1-1-1536x1152_mj72gy.jpg`,
  `${CLD}/v1780433183/%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F-2-1-1536x1074_frzbys.jpg`,
  `${CLD}/v1780433181/%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F-3-1-1536x1152_aujjhv.jpg`,
];

// New 16:9 cover images (folder "Campus Images Enhanced/16:9 ratio").
const NEW_THEATRE_IMG = `${CLD}/v1780997829/ChatGPT_Image_Jun_9_2026_12_36_28_PM_kynaeh.png`;
const NEW_VISUAL_ARTS_IMG = `${CLD}/v1780998372/ChatGPT_Image_Jun_9_2026_12_19_34_PM_abuavh.png`;
const NEW_DANCE_IMG = `${CLD}/v1780998968/ChatGPT_Image_Jun_9_2026_12_55_33_PM_pacopb.png`;
const NEW_COUNTRY_IMG = `${CLD}/v1780997955/ChatGPT_Image_Jun_9_2026_12_38_54_PM_jbi9uy.png`;
const NEW_BASKETBALL_IMG = `${CLD}/v1780998370/ChatGPT_Image_Jun_9_2026_12_22_23_PM_xq4t94.png`;

/** Per-slug media: cover image (first) + full gallery. Applied across locales. */
const ACADEMY_MEDIA: Record<string, {img: string; gallery: string[]}> = {
  biology: {img: BIOLOGY_IMGS[0], gallery: BIOLOGY_IMGS},
  'land-of-israel': {img: NEW_COUNTRY_IMG, gallery: [NEW_COUNTRY_IMG, ...COUNTRY_IMGS]},
  'social-sciences': {img: SOCIAL_SCIENCE_IMGS[0], gallery: SOCIAL_SCIENCE_IMGS},
  theatre: {img: NEW_THEATRE_IMG, gallery: [NEW_THEATRE_IMG, ...THEATER_IMGS]},
  'visual-arts': {img: NEW_VISUAL_ARTS_IMG, gallery: [NEW_VISUAL_ARTS_IMG]},
  dance: {img: NEW_DANCE_IMG, gallery: [NEW_DANCE_IMG]},
  basketball: {img: NEW_BASKETBALL_IMG, gallery: [NEW_BASKETBALL_IMG]},
};

function withMedia(list: ActivityDetail[]): ActivityDetail[] {
  return list.map((a) => {
    const media = ACADEMY_MEDIA[a.slug];
    return media ? {...a, img: media.img, gallery: media.gallery} : a;
  });
}

function getStore(locale: string): ActivityDetail[] {
  return withMedia(locale === 'he' ? ACTIVITIES_HE : ACTIVITIES_EN);
}

export function getActivities(locale: string): ActivityMeta[] {
  return getStore(locale);
}

export function getActivity(
  locale: string,
  catSlug: string,
  actSlug: string,
): ActivityDetail | undefined {
  return getStore(locale).find(
    (a) => a.catSlug === catSlug && a.slug === actSlug,
  );
}

export function getActivitiesByCategory(
  locale: string,
  catSlug: CategorySlug,
): ActivityMeta[] {
  return getStore(locale).filter((a) => a.catSlug === catSlug);
}

export function getRelatedActivities(
  locale: string,
  slugs: string[],
): ActivityMeta[] {
  return getStore(locale).filter((a) => slugs.includes(a.slug));
}

export const VALID_CATEGORY_SLUGS: CategorySlug[] = [
  'arts',
  'science',
  'sports',
  'humanities',
];
