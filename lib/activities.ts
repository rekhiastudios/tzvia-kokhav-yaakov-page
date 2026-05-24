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
  glance: Array<{label: string; value: string}>;
  faculty: ActivityFaculty[];
  timelineTitle: string;
  timeline: ActivityTimeline[];
  milestones: ActivityMilestone[];
  testimonial: {
    quote: string;
    name: string;
    sub: string;
    initials: string;
  };
  relatedSlugs: string[];
}

const ACTIVITIES_EN: ActivityDetail[] = [
  // ── ARTS ──────────────────────────────────────────────────────────────
  {
    slug: 'theatre',
    name: 'Theatre',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'big',
    badge: 'FEATURED',
    grades: '9 — 12',
    schedule: 'Mon · Wed',
    since: '2009',
    desc: 'Three productions a year, from Tanakh adaptations to contemporary Israeli playwrights.',
    lede: 'A four-year programme where students stage three full productions a year — from Tanakh adaptations to contemporary Israeli playwrights.',
    aboutWatermark: 'TREAT IT AS',
    aboutGoldTitle: 'SERIOUS STUDY.',
    aboutBody: [
      'Students who join the theatre programme commit to three productions a year and weekly workshops in voice, movement, and text analysis. The programme treats performance as a form of careful reading: every scene begins on the page, in close study, before it ever reaches the stage.',
      'Past productions have ranged from Megillat Esther staged in modern dress to original works developed with visiting playwrights from the Cameri Theatre in Tel Aviv.',
    ],
    glance: [
      {label: 'Hours / week', value: '6'},
      {label: 'Productions / year', value: '3'},
      {label: 'Avg. cohort', value: '24'},
      {label: 'Audition?', value: 'Yes'},
    ],
    faculty: [
      {initials: 'RM', name: 'Rivka Mor', role: 'Programme Director'},
      {initials: 'DG', name: 'Dov Gefen', role: 'Voice & Text'},
      {initials: 'SK', name: 'Shoshana Katz', role: 'Movement'},
    ],
    timelineTitle: 'THE ARC.',
    timeline: [
      {period: 'Tishrei · Cheshvan', title: 'Fall studio piece', desc: 'Small ensemble work; devised collaboratively over six weeks.'},
      {period: 'Tevet · Adar', title: 'Purim main stage', desc: 'Full production opening the week of Purim; two public performances.'},
      {period: 'Iyar · Sivan', title: 'Closing showcase', desc: 'Senior-led pieces presented to families and faculty.'},
    ],
    milestones: [
      {num: '15', label: 'Years Running'},
      {num: '42', label: 'Productions Staged'},
      {num: '3', label: 'National Awards'},
      {num: '300+', label: 'Alumnae Trained'},
    ],
    testimonial: {
      quote: 'I learned to read a text the way you read a person — slowly, and assuming there\'s more underneath than what\'s on the surface.',
      name: 'Yael Avraham',
      sub: 'Alumna · Class of 2022',
      initials: 'YA',
    },
    relatedSlugs: ['visual-arts', 'dance', 'music-ensemble'],
  },
  {
    slug: 'visual-arts',
    name: 'Visual Arts',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'Tue · Thu',
    since: '2012',
    desc: 'Studio practice, drawing, painting, and digital media.',
    lede: 'A studio-based programme in drawing, painting, sculpture, photography, and digital design — every student finds her visual voice.',
    aboutWatermark: 'SEEING AS',
    aboutGoldTitle: 'SERIOUS PRACTICE.',
    aboutBody: [
      'The visual arts programme runs across all four years, with a dedicated studio open to students six days a week. Work is portfolio-based, and seniors submit work to national art competitions.',
      'The curriculum moves from foundational drawing in 9th grade through advanced studio practice, photography, and digital design in the upper years.',
    ],
    glance: [
      {label: 'Hours / week', value: '4'},
      {label: 'Exhibitions / year', value: '2'},
      {label: 'Avg. cohort', value: '18'},
      {label: 'Portfolio required?', value: 'No'},
    ],
    faculty: [
      {initials: 'TL', name: 'Tamar Levy', role: 'Studio Lead'},
      {initials: 'NB', name: 'Noa Ben-David', role: 'Photography'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Kislev', title: 'Foundation drawing', desc: 'Still life, line, and observation.'},
      {period: 'Tevet · Adar', title: 'Theme project', desc: 'Each student develops a personal theme across media.'},
      {period: 'Iyar · Sivan', title: 'End-of-year exhibition', desc: 'Public show on campus; alumnae and families invited.'},
    ],
    milestones: [
      {num: '12', label: 'Years Running'},
      {num: '8', label: 'National Awards'},
      {num: '200+', label: 'Alumnae Trained'},
      {num: '2', label: 'Exhibitions / Year'},
    ],
    testimonial: {
      quote: 'The studio taught me that seeing carefully is itself a discipline — as rigorous as any text.',
      name: 'Miriam Shapiro',
      sub: 'Alumna · Class of 2021',
      initials: 'MS',
    },
    relatedSlugs: ['theatre', 'dance'],
  },
  {
    slug: 'dance',
    name: 'Dance',
    cat: 'ARTS',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'Wed · Fri',
    since: '2015',
    desc: 'Modern, folk, and choreographed performance.',
    lede: 'Technique, choreography, and performance — dance as a precise physical language and a form of communal expression.',
    aboutWatermark: 'THE BODY AS',
    aboutGoldTitle: 'INSTRUMENT.',
    aboutBody: [
      'The dance programme covers modern technique, Israeli folk forms, and original choreography. Students perform at school events and in the year-end showcase.',
      'Advanced students join the school\'s dance ensemble, which has performed at regional and national festivals.',
    ],
    glance: [
      {label: 'Hours / week', value: '5'},
      {label: 'Performances / year', value: '4'},
      {label: 'Avg. cohort', value: '20'},
      {label: 'Audition?', value: 'No'},
    ],
    faculty: [
      {initials: 'HL', name: 'Hila Levi', role: 'Movement Director'},
      {initials: 'RK', name: 'Rachel Koren', role: 'Folk & Ensemble'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Cheshvan', title: 'Technique foundations', desc: 'Body alignment, rhythm, and ensemble work.'},
      {period: 'Tevet · Adar', title: 'Choreography project', desc: 'Students create and rehearse original short works.'},
      {period: 'Iyar · Sivan', title: 'Year-end performance', desc: 'Full programme performed for school and families.'},
    ],
    milestones: [
      {num: '9', label: 'Years Running'},
      {num: '6', label: 'Festival Awards'},
      {num: '150+', label: 'Alumnae Trained'},
      {num: '4', label: 'Performances / Year'},
    ],
    testimonial: {
      quote: 'Dance gave me a discipline I carry into everything — precision, patience, and the courage to be present.',
      name: 'Shira Cohen',
      sub: 'Alumna · Class of 2023',
      initials: 'SC',
    },
    relatedSlugs: ['theatre', 'visual-arts'],
  },

  // ── SCIENCE ───────────────────────────────────────────────────────────
  {
    slug: 'biology',
    name: 'Biology',
    cat: 'SCIENCE',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'Sun · Tue',
    since: '1998',
    desc: 'Wet lab, dissections, and field studies in Mateh Binyamin.',
    lede: 'From cell biology to ecology — a hands-on, lab-based programme built around the living landscape of Mateh Binyamin.',
    aboutWatermark: 'INQUIRY AS',
    aboutGoldTitle: 'DAILY PRACTICE.',
    aboutBody: [
      'Biology at Tzvia is taught in our dedicated wet lab, with regular field work in the Binyamin hills. Students in 11th–12th grade follow the full matriculation track and sit the national biology bagrut.',
      'The school participates in the national science olympiad, and graduates regularly go on to biology and medicine programmes at Israeli universities.',
    ],
    glance: [
      {label: 'Hours / week', value: '5'},
      {label: 'Bagrut units', value: '5'},
      {label: 'Lab sessions / week', value: '2'},
      {label: 'Field trips / year', value: '3'},
    ],
    faculty: [
      {initials: 'DB', name: 'Dr. Dina Bar-Oz', role: 'Head of Science'},
      {initials: 'AL', name: 'Avital Luria', role: 'Lab Instructor'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Kislev', title: 'Cellular biology', desc: 'Microscopy, cell division, and genetics foundations.'},
      {period: 'Tevet · Nisan', title: 'Ecology fieldwork', desc: 'Flora and fauna survey of the Binyamin hills.'},
      {period: 'Iyar · Sivan', title: 'Bagrut preparation', desc: 'Full review cycle and mock examinations.'},
    ],
    milestones: [
      {num: '26', label: 'Years Running'},
      {num: '94%', label: 'Bagrut Pass Rate'},
      {num: '12', label: 'Olympiad Medals'},
      {num: '60+', label: 'Med School Alumnae'},
    ],
    testimonial: {
      quote: 'The lab work made abstract concepts concrete — I arrived at university already knowing how to think like a scientist.',
      name: 'Dr. Rachel Cohen',
      sub: 'Alumna · Class of 2014',
      initials: 'RC',
    },
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
    grades: '10 — 12',
    schedule: 'Mon · Wed · Thu',
    since: '2008',
    desc: 'Synchronous online track with weekly problem sets.',
    lede: 'A rigorous physics track taught synchronously online, with weekly problem sessions and monthly on-campus lab days.',
    aboutWatermark: 'LAWS THAT',
    aboutGoldTitle: 'GOVERN EVERYTHING.',
    aboutBody: [
      'The physics programme is delivered as a synchronous online course, taught by a specialist at Mifteach — one of Israel\'s leading distance-learning providers. Students attend live sessions and submit weekly problem sets.',
      'Monthly on-campus lab days ensure students get hands-on experimental experience alongside the theoretical curriculum.',
    ],
    glance: [
      {label: 'Hours / week', value: '6'},
      {label: 'Bagrut units', value: '5'},
      {label: 'Lab days / month', value: '1'},
      {label: 'Format', value: 'Online + lab'},
    ],
    faculty: [
      {initials: 'EP', name: 'Eitan Peretz', role: 'Physics Instructor'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Tevet', title: 'Mechanics & waves', desc: 'Motion, forces, energy, and oscillation.'},
      {period: 'Shevat · Nisan', title: 'Electricity & optics', desc: 'Circuits, light, and electromagnetic theory.'},
      {period: 'Iyar · Sivan', title: 'Exam preparation', desc: 'Full curriculum review and mock bagrut.'},
    ],
    milestones: [
      {num: '16', label: 'Years Running'},
      {num: '89%', label: 'Pass Rate (5 units)'},
      {num: '3', label: 'Olympiad Finalists'},
      {num: '40+', label: 'Engineering Alumnae'},
    ],
    testimonial: {
      quote: 'Physics online sounds counterintuitive, but the structured problem sets built a rigour I carry into my engineering work.',
      name: 'Neta Grossman',
      sub: 'Alumna · Class of 2017',
      initials: 'NG',
    },
    relatedSlugs: ['chemistry', 'biology'],
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
    grades: '10 — 12',
    schedule: 'Tue · Thu',
    since: '2011',
    desc: 'Online theory paired with on-campus practical sessions.',
    lede: 'Chemistry theory delivered online, with on-campus practical sessions in our fully equipped lab — the best of both models.',
    aboutWatermark: 'MATTER AND',
    aboutGoldTitle: 'ITS CHANGES.',
    aboutBody: [
      'The chemistry programme combines a synchronous online theory course with biweekly practical sessions in Tzvia\'s chemistry lab. Students follow the full 5-unit matriculation curriculum.',
      'The programme prepares students for the national bagrut and for further study in chemistry, pharmacy, and the life sciences.',
    ],
    glance: [
      {label: 'Hours / week', value: '5'},
      {label: 'Bagrut units', value: '5'},
      {label: 'Lab sessions / two weeks', value: '1'},
      {label: 'Format', value: 'Online + lab'},
    ],
    faculty: [
      {initials: 'SM', name: 'Sara Mizrahi', role: 'Chemistry Instructor'},
      {initials: 'AL', name: 'Avital Luria', role: 'Lab Instructor'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Kislev', title: 'Atomic structure', desc: 'Periodic table, bonding, and molecular geometry.'},
      {period: 'Tevet · Adar', title: 'Reactions & equilibrium', desc: 'Kinetics, thermodynamics, and acid-base chemistry.'},
      {period: 'Nisan · Sivan', title: 'Practical exams', desc: 'Lab component of bagrut and full review.'},
    ],
    milestones: [
      {num: '13', label: 'Years Running'},
      {num: '92%', label: 'Pass Rate (5 units)'},
      {num: '5', label: 'Chemistry Olympiad'},
      {num: '30+', label: 'Pharmacy Alumnae'},
    ],
    testimonial: {
      quote: 'The blend of online theory and hands-on lab time gave me exactly the preparation I needed for university chemistry.',
      name: 'Batya Rosenberg',
      sub: 'Alumna · Class of 2019',
      initials: 'BR',
    },
    relatedSlugs: ['biology', 'physics'],
  },

  // ── SPORTS ────────────────────────────────────────────────────────────
  {
    slug: 'volleyball',
    name: 'Volleyball',
    cat: 'SPORTS',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'Sun · Tue',
    since: '2001',
    desc: 'Inter-school league play across two age divisions.',
    lede: 'Competitive volleyball in two age divisions, with inter-school league play across Mateh Binyamin and the Jerusalem corridor.',
    aboutWatermark: 'STRONG BODY',
    aboutGoldTitle: 'STRONG MIND.',
    aboutBody: [
      'The volleyball programme runs two competitive squads — junior (grades 9–10) and senior (grades 11–12) — each playing in the regional league from Tishrei through Adar.',
      'Training emphasises technique, team communication, and conditioning. The senior squad has reached the regional semi-finals in three of the last five years.',
    ],
    glance: [
      {label: 'Sessions / week', value: '3'},
      {label: 'Season length', value: '6 months'},
      {label: 'Age divisions', value: '2'},
      {label: 'League', value: 'Regional'},
    ],
    faculty: [
      {initials: 'OA', name: 'Orly Azoulay', role: 'Head Coach'},
      {initials: 'MN', name: 'Michal Nevo', role: 'Junior Coach'},
    ],
    timelineTitle: 'THE SEASON.',
    timeline: [
      {period: 'Tishrei · Cheshvan', title: 'Pre-season', desc: 'Conditioning, technique drills, and team formation.'},
      {period: 'Kislev · Adar', title: 'League season', desc: 'Regional fixtures — home and away.'},
      {period: 'Nisan · Iyar', title: 'Play-offs', desc: 'Top-four teams advance to regional semi-finals.'},
    ],
    milestones: [
      {num: '23', label: 'Years Running'},
      {num: '3', label: 'Semi-final Appearances'},
      {num: '2', label: 'Age Divisions'},
      {num: '400+', label: 'Players Trained'},
    ],
    testimonial: {
      quote: 'The team taught me what I could only learn alongside others — accountability, resilience, and the discipline of showing up.',
      name: 'Adina Weiss',
      sub: 'Alumna · Class of 2020',
      initials: 'AW',
    },
    relatedSlugs: ['running'],
  },
  {
    slug: 'running',
    name: 'Running',
    cat: 'SPORTS',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'Mon · Thu',
    since: '2005',
    desc: 'Cross-country training with seasonal regional meets.',
    lede: 'Cross-country and road running — individual discipline, team spirit, and the rolling hills of Mateh Binyamin as a training ground.',
    aboutWatermark: 'ONE STEP',
    aboutGoldTitle: 'AT A TIME.',
    aboutBody: [
      'The running programme offers structured training for all levels, from first-time runners to competitive athletes. Weekly sessions cover distance, interval work, and strength conditioning.',
      'The school enters teams in the regional cross-country series each spring, and individual runners regularly qualify for district championships.',
    ],
    glance: [
      {label: 'Sessions / week', value: '2'},
      {label: 'Season', value: 'Year-round'},
      {label: 'Meets / year', value: '4'},
      {label: 'All abilities?', value: 'Yes'},
    ],
    faculty: [
      {initials: 'RP', name: 'Ruth Perelman', role: 'Running Coach'},
    ],
    timelineTitle: 'THE SEASON.',
    timeline: [
      {period: 'Tishrei · Cheshvan', title: 'Base training', desc: 'Aerobic base, form, and weekly distance runs.'},
      {period: 'Kislev · Adar', title: 'Interval work', desc: 'Speed sessions and hill repeats; first regional meet.'},
      {period: 'Nisan · Sivan', title: 'Race season', desc: 'Three regional meets; district championships for qualifiers.'},
    ],
    milestones: [
      {num: '19', label: 'Years Running'},
      {num: '4', label: 'Meets / Year'},
      {num: '8', label: 'District Medalists'},
      {num: '300+', label: 'Runners Trained'},
    ],
    testimonial: {
      quote: 'Running taught me patience with myself — that every improvement is built one session at a time.',
      name: 'Tamar Elul',
      sub: 'Alumna · Class of 2018',
      initials: 'TE',
    },
    relatedSlugs: ['volleyball'],
  },

  // ── HUMANITIES ────────────────────────────────────────────────────────
  {
    slug: 'israeli-thought',
    name: 'Israeli Thought',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: '',
    badge: undefined,
    grades: '10 — 12',
    schedule: 'Sun · Wed',
    since: '2003',
    desc: 'Zionist philosophy, Jewish identity, and contemporary Israeli society.',
    lede: 'A rigorous study of Zionist thought from Herzl to the present — primary sources, competing visions, and the questions that still define Israeli society.',
    aboutWatermark: 'WHO WE',
    aboutGoldTitle: 'ARE BECOMING.',
    aboutBody: [
      'The programme spans classical Zionist texts (Herzl, Achad Ha\'am, Jabotinsky, Rav Kook), the early state period, and contemporary debates around identity, religion, and democracy.',
      'Students engage with primary sources and are expected to construct and defend original arguments. The course culminates in a substantial research essay.',
    ],
    glance: [
      {label: 'Hours / week', value: '3'},
      {label: 'Primary texts', value: '20+'},
      {label: 'Research essay?', value: 'Yes'},
      {label: 'Bagrut elective?', value: 'Yes'},
    ],
    faculty: [
      {initials: 'YM', name: 'Yosef Melamed', role: 'Head of Humanities'},
      {initials: 'ES', name: 'Esther Sela', role: 'Research Supervisor'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Kislev', title: 'Classical texts', desc: 'Herzl, Achad Ha\'am, and early Zionist debate.'},
      {period: 'Tevet · Adar', title: 'State and society', desc: 'The founding generation and contemporary challenges.'},
      {period: 'Nisan · Sivan', title: 'Research project', desc: 'Independent essay defended before a faculty panel.'},
    ],
    milestones: [
      {num: '21', label: 'Years Running'},
      {num: '20+', label: 'Primary Texts'},
      {num: '95%', label: 'Bagrut Pass Rate'},
      {num: '500+', label: 'Alumnae Trained'},
    ],
    testimonial: {
      quote: 'This course gave me a language for questions I\'d been carrying since childhood — and the rigour to actually answer them.',
      name: 'Devorah Tal',
      sub: 'Alumna · Class of 2022',
      initials: 'DT',
    },
    relatedSlugs: ['national-excursions', 'social-sciences', 'jewish-history'],
  },
  {
    slug: 'national-excursions',
    name: 'National Excursions',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'Monthly',
    since: '1998',
    desc: 'Journeys across Israel — from the Galilee to the Negev.',
    lede: 'Every grade travels. The land of Israel as a classroom — geography, history, and memory brought to life through encounter.',
    aboutWatermark: 'THE LAND',
    aboutGoldTitle: 'AS TEACHER.',
    aboutBody: [
      'National excursions are embedded in the school calendar from grade 9 through 12. Each trip is designed to complement classroom learning — Biblical archaeology, modern military history, ecology, and social geography.',
      'Grade 12 takes a three-day capstone journey through the south — from the Negev highlands to Eilat — that brings together four years of study.',
    ],
    glance: [
      {label: 'Trips / year', value: '4'},
      {label: 'Total days in field', value: '8'},
      {label: 'Grades', value: '9 — 12'},
      {label: 'Capstone trip?', value: 'Yes (Gr. 12)'},
    ],
    faculty: [
      {initials: 'AM', name: 'Avi Menashe', role: 'Field Studies Lead'},
      {initials: 'DH', name: 'Dafna Hirsch', role: 'Archaeology Guide'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Cheshvan', title: 'Binyamin hills', desc: 'Local archaeology and landscape — starting close to home.'},
      {period: 'Adar', title: 'Galilee & Golan', desc: 'Second Temple sites, water systems, and the north.'},
      {period: 'Iyar', title: 'Negev capstone (Gr. 12)', desc: 'Three-day journey through the southern landscape.'},
    ],
    milestones: [
      {num: '26', label: 'Years Running'},
      {num: '4', label: 'Trips / Year'},
      {num: '100+', label: 'Sites Visited'},
      {num: '1,500+', label: 'Students Traveled'},
    ],
    testimonial: {
      quote: 'The land stopped being a map and became a home. That shift happened on these trips.',
      name: 'Lior Tal',
      sub: 'Alumna · Class of 2023',
      initials: 'LT',
    },
    relatedSlugs: ['israeli-thought', 'jewish-history'],
  },
  {
    slug: 'social-sciences',
    name: 'Social Sciences',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    badge: undefined,
    grades: '10 — 12',
    schedule: 'Sun · Tue',
    since: '2006',
    desc: 'Sociology, psychology, and civic studies.',
    lede: 'Sociology, psychology, and civic education — learning to read society as carefully as you read a text.',
    aboutWatermark: 'SOCIETY AS',
    aboutGoldTitle: 'TEXT.',
    aboutBody: [
      'The social sciences track combines sociology, social psychology, and civic studies. Students analyse Israeli society through both quantitative data and qualitative case studies.',
      'The programme includes a community research project in which students survey, interview, and present findings on a social issue of their choice.',
    ],
    glance: [
      {label: 'Hours / week', value: '4'},
      {label: 'Research project?', value: 'Yes'},
      {label: 'Bagrut track?', value: 'Yes'},
      {label: 'Avg. cohort', value: '22'},
    ],
    faculty: [
      {initials: 'LB', name: 'Leah Barak', role: 'Sociology'},
      {initials: 'HR', name: 'Hannah Rosen', role: 'Psychology'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Tevet', title: 'Foundations', desc: 'Key concepts in sociology and social psychology.'},
      {period: 'Shevat · Nisan', title: 'Field research', desc: 'Community survey design, data collection, and analysis.'},
      {period: 'Iyar · Sivan', title: 'Presentations', desc: 'Students present research findings to peers and faculty.'},
    ],
    milestones: [
      {num: '18', label: 'Years Running'},
      {num: '22', label: 'Avg. Cohort'},
      {num: '96%', label: 'Bagrut Pass Rate'},
      {num: '400+', label: 'Alumnae Trained'},
    ],
    testimonial: {
      quote: 'The research project changed how I move through the world — I ask better questions now, and I listen differently.',
      name: 'Ronit Katz',
      sub: 'Alumna · Class of 2021',
      initials: 'RK',
    },
    relatedSlugs: ['israeli-thought', 'jewish-history'],
  },
  {
    slug: 'jewish-history',
    name: 'Jewish History',
    cat: 'HUMANITIES',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'Mon · Wed',
    since: '1998',
    desc: 'From the Biblical period to the modern state — history as living memory.',
    lede: 'Four thousand years in four years — a rigorous and living engagement with Jewish history from Sinai to the State.',
    aboutWatermark: 'MEMORY AS',
    aboutGoldTitle: 'IDENTITY.',
    aboutBody: [
      'Jewish history is taught across all four years, moving from ancient through modern periods. The curriculum follows the national matriculation syllabus but extends it with primary sources, historiographical debates, and oral history projects.',
      'Students in 12th grade choose a specialisation: ancient period, Shoah and revival, or modern Israel — and complete an extended research essay.',
    ],
    glance: [
      {label: 'Hours / week', value: '4'},
      {label: 'Bagrut units', value: '5'},
      {label: 'Specialisations', value: '3'},
      {label: 'Research essay?', value: 'Yes (Gr. 12)'},
    ],
    faculty: [
      {initials: 'YM', name: 'Yosef Melamed', role: 'Head of Humanities'},
      {initials: 'NF', name: 'Naomi Friedman', role: 'Modern History'},
    ],
    timelineTitle: 'THE YEAR.',
    timeline: [
      {period: 'Tishrei · Kislev', title: 'Ancient & medieval', desc: 'Biblical, Second Temple, diaspora — foundations of memory.'},
      {period: 'Tevet · Nisan', title: 'Modern period', desc: 'Emancipation, Shoah, Zionism, and the founding of the state.'},
      {period: 'Iyar · Sivan', title: 'Research essay', desc: 'Extended essay in chosen specialisation; faculty review.'},
    ],
    milestones: [
      {num: '26', label: 'Years Running'},
      {num: '97%', label: 'Bagrut Pass Rate'},
      {num: '3', label: 'Specialisations'},
      {num: '600+', label: 'Alumnae Trained'},
    ],
    testimonial: {
      quote: 'History class at Tzvia felt urgent — like the past was something we were responsible for, not just required to memorise.',
      name: 'Naomi Gross',
      sub: 'Alumna · Class of 2020',
      initials: 'NG',
    },
    relatedSlugs: ['israeli-thought', 'national-excursions', 'social-sciences'],
  },
];

const ACTIVITIES_HE: ActivityDetail[] = [
  // ── אמנויות ───────────────────────────────────────────────────────────
  {
    slug: 'theatre',
    name: 'תיאטרון',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: 'big',
    badge: 'FEATURED',
    grades: '9 — 12',
    schedule: 'שני · רביעי',
    since: '2009',
    desc: 'שלוש הפקות בשנה, ממגילת אסתר ועד מחזאים ישראלים עכשוויים.',
    lede: 'תכנית ארבע שנתית שבה תלמידות מביימות שלוש הפקות מלאות בשנה — ממגילת אסתר בתלבושת מודרנית ועד מחזאים ישראלים עכשוויים.',
    aboutWatermark: 'התייחסי לזה',
    aboutGoldTitle: 'כלמידה רצינית.',
    aboutBody: [
      'תלמידות בתכנית התיאטרון מתחייבות לשלוש הפקות בשנה וסדנאות שבועיות בקול, תנועה ואנליזת טקסט. התכנית מתייחסת להופעה כאל צורה של קריאה מדוקדקת: כל סצנה מתחילה בדף, בעיון מעמיק, לפני שמגיעה לבמה.',
      'הפקות עבר כללו את מגילת אסתר בתלבושת מודרנית ועד יצירות מקוריות שפותחו עם מחזאים מבאים ממחזאות קמרי בתל אביב.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '6' },
      { label: 'הפקות / שנה', value: '3' },
      { label: 'ממוצע קבוצה', value: '24' },
      { label: 'אודישן?', value: 'כן' },
    ],
    faculty: [
      { initials: 'RM', name: 'רבקה מור', role: 'מנהלת תכנית' },
      { initials: 'DG', name: 'דב גפן', role: 'קול וטקסט' },
      { initials: 'SK', name: 'שושנה כץ', role: 'תנועה' },
    ],
    timelineTitle: 'הקשת.',
    timeline: [
      { period: 'תשרי · חשון', title: 'יצירה בסתיו', desc: 'עבודת הרכב קטנה; פותחת שיתופית על פני שישה שבועות.' },
      { period: 'טבת · אדר', title: 'הפקת פורים', desc: 'הפקה מלאה הנפתחת בשבוע פורים; שתי הופעות ציבוריות.' },
      { period: 'אייר · סיוון', title: 'תצוגת סיום', desc: 'יצירות בהובלת הכיתות הבכירות המוצגות למשפחות ולצוות.' },
    ],
    milestones: [
      { num: '15', label: 'שנות פעילות' },
      { num: '42', label: 'הפקות על הבמה' },
      { num: '3', label: 'פרסים ארציים' },
      { num: '300+', label: 'בוגרות שאומנו' },
    ],
    testimonial: {
      quote: 'למדתי לקרוא טקסט כמו שקוראים אדם — לאט, ובהנחה שיש יותר מתחת לפני השטח.',
      name: 'יעל אברהם',
      sub: 'בוגרת · מחזור 2022',
      initials: 'YA',
    },
    relatedSlugs: ['visual-arts', 'dance', 'music-ensemble'],
  },
  {
    slug: 'visual-arts',
    name: 'אמנות חזותית',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'שלישי · חמישי',
    since: '2012',
    desc: 'עבודת סטודיו, רישום, ציור ומדיה דיגיטלית.',
    lede: 'תכנית סטודיו בציור, ציור בצבעי מים, פיסול, צילום ועיצוב דיגיטלי — כל תלמידה מוצאת את קולה החזותי.',
    aboutWatermark: 'לראות היא',
    aboutGoldTitle: 'תרגול רציני.',
    aboutBody: [
      'תכנית האמנות החזותית פועלת על פני ארבע השנים, עם סטודיו ייעודי הפתוח לתלמידות שישה ימים בשבוע. העבודה מבוססת על תיק יצירות, ותלמידות הכיתות הבכירות מגישות עבודות לתחרויות אמנות ארציות.',
      'תכנית הלימודים עוברת מרישום יסודי בכיתה ט\' דרך עבודת סטודיו מתקדמת, צילום ועיצוב דיגיטלי בשנים הגבוהות יותר.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '4' },
      { label: 'תערוכות / שנה', value: '2' },
      { label: 'ממוצע קבוצה', value: '18' },
      { label: 'תיק יצירות נדרש?', value: 'לא' },
    ],
    faculty: [
      { initials: 'TL', name: 'תמר לוי', role: 'מובילת סטודיו' },
      { initials: 'NB', name: 'נועה בן-דוד', role: 'צילום' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · כסלו', title: 'רישום יסודי', desc: 'טבע דומם, קו ותצפית.' },
      { period: 'טבת · אדר', title: 'פרויקט נושא', desc: 'כל תלמידה מפתחת נושא אישי על פני מדיות שונות.' },
      { period: 'אייר · סיוון', title: 'תערוכת סוף שנה', desc: 'הצגה ציבורית בקמפוס; בוגרות ומשפחות מוזמנות.' },
    ],
    milestones: [
      { num: '12', label: 'שנות פעילות' },
      { num: '8', label: 'פרסים ארציים' },
      { num: '200+', label: 'בוגרות שאומנו' },
      { num: '2', label: 'תערוכות / שנה' },
    ],
    testimonial: {
      quote: 'הסטודיו לימד אותי שלראות בקפידה היא בפני עצמה משמעת — קפדנית כמו כל טקסט.',
      name: 'מרים שפירו',
      sub: 'בוגרת · מחזור 2021',
      initials: 'MS',
    },
    relatedSlugs: ['theatre', 'dance'],
  },
  {
    slug: 'dance',
    name: 'ריקוד',
    cat: 'אמנויות',
    catSlug: 'arts',
    catIdx: 1,
    img: '/arts.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'רביעי · שישי',
    since: '2015',
    desc: 'ריקוד מודרני, עממי והופעות כוריאוגרפיות.',
    lede: 'טכניקה, כוריאוגרפיה והופעה — ריקוד כשפה גופנית מדויקת וצורה של ביטוי קהילתי.',
    aboutWatermark: 'הגוף הוא',
    aboutGoldTitle: 'כלי.',
    aboutBody: [
      'תכנית הריקוד מכסה טכניקה מודרנית, צורות עממיות ישראליות וכוריאוגרפיה מקורית. התלמידות מופיעות באירועי בית הספר ובהצגת סוף השנה.',
      'תלמידות מתקדמות מצטרפות להרכב הריקוד של בית הספר, שהופיע בפסטיבלים אזוריים וארציים.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '5' },
      { label: 'הופעות / שנה', value: '4' },
      { label: 'ממוצע קבוצה', value: '20' },
      { label: 'אודישן?', value: 'לא' },
    ],
    faculty: [
      { initials: 'HL', name: 'הילה לוי', role: 'מנהלת תנועה' },
      { initials: 'RK', name: 'רחל קורן', role: 'ריקוד עממי והרכב' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · חשון', title: 'יסודות טכניקה', desc: 'יישור גוף, קצב ועבודת הרכב.' },
      { period: 'טבת · אדר', title: 'פרויקט כוריאוגרפיה', desc: 'תלמידות יוצרות וחוזרות על יצירות קצרות מקוריות.' },
      { period: 'אייר · סיוון', title: 'הופעת סוף שנה', desc: 'תכנית מלאה המוצגת בפני בית הספר ומשפחות.' },
    ],
    milestones: [
      { num: '9', label: 'שנות פעילות' },
      { num: '6', label: 'פרסי פסטיבל' },
      { num: '150+', label: 'בוגרות שאומנו' },
      { num: '4', label: 'הופעות / שנה' },
    ],
    testimonial: {
      quote: 'הריקוד נתן לי משמעת שאני נושאת לכל מקום — דיוק, סבלנות והאומץ להיות נוכחת.',
      name: 'שירה כהן',
      sub: 'בוגרת · מחזור 2023',
      initials: 'SC',
    },
    relatedSlugs: ['theatre', 'visual-arts'],
  },

  // ── מדע ───────────────────────────────────────────────────────────────
  {
    slug: 'biology',
    name: 'ביולוגיה',
    cat: 'מדע וטכנולוגיה',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'ראשון · שלישי',
    since: '1998',
    desc: 'מעבדה רטובה, ניתוחים ולימודי שטח במטה בנימין.',
    lede: 'מביולוגיה תאית ועד אקולוגיה — תכנית מבוססת מעבדה הבנויה סביב הנוף החי של מטה בנימין.',
    aboutWatermark: 'חקירה כ',
    aboutGoldTitle: 'תרגול יומיומי.',
    aboutBody: [
      'הביולוגיה בצביה נלמדת במעבדה הרטובה הייעודית שלנו, עם עבודת שטח קבועה בגבעות הבנימין. תלמידות בכיתות י"א—י"ב עוקבות אחר מסלול הבגרות המלא ויושבות בבגרות הלאומית בביולוגיה.',
      'בית הספר משתתף באולימפיאדת המדעים הארצית, ובוגרות עוברות בקביעות לתכניות ביולוגיה ורפואה באוניברסיטאות הישראליות.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '5' },
      { label: 'יחידות בגרות', value: '5' },
      { label: 'מפגשי מעבדה / שבוע', value: '2' },
      { label: 'טיולי שדה / שנה', value: '3' },
    ],
    faculty: [
      { initials: 'DB', name: 'ד"ר דינה בר-אוז', role: 'ראש המדעים' },
      { initials: 'AL', name: 'אביטל לוריא', role: 'מדריכת מעבדה' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · כסלו', title: 'ביולוגיה תאית', desc: 'מיקרוסקופיה, חלוקת תאים ויסודות גנטיקה.' },
      { period: 'טבת · ניסן', title: 'עבודת שדה אקולוגית', desc: 'סקר צומח ובעלי חיים בגבעות הבנימין.' },
      { period: 'אייר · סיוון', title: 'הכנה לבגרות', desc: 'מחזור חזרה מלא ובחינות מדומות.' },
    ],
    milestones: [
      { num: '26', label: 'שנות פעילות' },
      { num: '94%', label: 'אחוז מעבר בגרות' },
      { num: '12', label: 'מדליות אולימפיאדה' },
      { num: '60+', label: 'בוגרות בבתי ספר לרפואה' },
    ],
    testimonial: {
      quote: 'עבודת המעבדה הפכה מושגים מופשטים למוחשיים — הגעתי לאוניברסיטה וכבר ידעתי לחשוב כמו מדענית.',
      name: 'ד"ר רחל כהן',
      sub: 'בוגרת · מחזור 2014',
      initials: 'RC',
    },
    relatedSlugs: ['physics', 'chemistry'],
  },
  {
    slug: 'physics',
    name: 'פיזיקה',
    cat: 'מדע וטכנולוגיה',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    grades: '10 — 12',
    schedule: 'שני · רביעי · חמישי',
    since: '2008',
    desc: 'מסלול מקוון סינכרוני עם שיעורי בעיות שבועיים.',
    lede: 'מסלול פיזיקה קפדני הנלמד מקוון בסינכרוניות, עם מפגשי בעיות שבועיים וימי מעבדה חודשיים בקמפוס.',
    aboutWatermark: 'חוקים שנמצאים',
    aboutGoldTitle: 'בכל מקום.',
    aboutBody: [
      'תכנית הפיזיקה מועברת כקורס מקוון סינכרוני, הנלמד על ידי מומחה ממפתח — אחד מספקי הלמידה מרחוק המובילים בישראל. התלמידות נוכחות בשיעורים חיים ומגישות שיעורי בעיות שבועיים.',
      'ימי מעבדה חודשיים בקמפוס מבטיחים שהתלמידות מקבלות ניסיון מעשי ניסיוני לצד תכנית הלימודים התיאורטית.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '6' },
      { label: 'יחידות בגרות', value: '5' },
      { label: 'ימי מעבדה / חודש', value: '1' },
      { label: 'פורמט', value: 'מקוון + מעבדה' },
    ],
    faculty: [
      { initials: 'EP', name: 'איתן פרץ', role: 'מורה לפיזיקה' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · טבת', title: 'מכניקה וגלים', desc: 'תנועה, כוחות, אנרגיה ותנודות.' },
      { period: 'שבט · ניסן', title: 'חשמל ואופטיקה', desc: 'מעגלים, אור ותורת האלקטרומגנטיקה.' },
      { period: 'אייר · סיוון', title: 'הכנה לבחינות', desc: 'חזרה מלאה על החומר ובגרות מדומה.' },
    ],
    milestones: [
      { num: '16', label: 'שנות פעילות' },
      { num: '89%', label: 'אחוז מעבר (5 יחידות)' },
      { num: '3', label: 'גמרניות אולימפיאדה' },
      { num: '40+', label: 'בוגרות בהנדסה' },
    ],
    testimonial: {
      quote: 'פיזיקה מקוונת נשמע נגד האינטואיציה, אבל שיעורי הבעיות המובנים בנו קפדנות שאני נושאת לעבודת ההנדסה שלי.',
      name: 'נטע גרוסמן',
      sub: 'בוגרת · מחזור 2017',
      initials: 'NG',
    },
    relatedSlugs: ['chemistry', 'biology'],
  },
  {
    slug: 'chemistry',
    name: 'כימיה',
    cat: 'מדע וטכנולוגיה',
    catSlug: 'science',
    catIdx: 2,
    img: '/science.png',
    size: '',
    badge: 'ONLINE',
    grades: '10 — 12',
    schedule: 'שלישי · חמישי',
    since: '2011',
    desc: 'תיאוריה מקוונת בשילוב מפגשים מעשיים בקמפוס.',
    lede: 'תיאורית כימיה מועברת מקוון, עם מפגשים מעשיים בקמפוס במעבדה המאובזרת במלואה — הטוב משני המודלים.',
    aboutWatermark: 'חומר ו',
    aboutGoldTitle: 'שינוייו.',
    aboutBody: [
      'תכנית הכימיה משלבת קורס תיאוריה מקוון סינכרוני עם מפגשים מעשיים דו-שבועיים במעבדת הכימיה של צביה. התלמידות עוקבות אחר תכנית הלימודים המלאה של 5 יחידות.',
      'התכנית מכינה תלמידות לבגרות הלאומית ולהמשך לימודים בכימיה, פרמקולוגיה ומדעי החיים.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '5' },
      { label: 'יחידות בגרות', value: '5' },
      { label: 'מפגשי מעבדה / שבועיים', value: '1' },
      { label: 'פורמט', value: 'מקוון + מעבדה' },
    ],
    faculty: [
      { initials: 'SM', name: 'שרה מזרחי', role: 'מורה לכימיה' },
      { initials: 'AL', name: 'אביטל לוריא', role: 'מדריכת מעבדה' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · כסלו', title: 'מבנה אטומי', desc: 'טבלה מחזורית, קשרים וגיאומטריה מולקולרית.' },
      { period: 'טבת · אדר', title: 'תגובות שיווי משקל', desc: 'קינטיקה, תרמודינמיקה וכימיה חומצה-בסיס.' },
      { period: 'ניסן · סיוון', title: 'בחינות מעשיות', desc: 'רכיב מעבדה של הבגרות וחזרה מלאה.' },
    ],
    milestones: [
      { num: '13', label: 'שנות פעילות' },
      { num: '92%', label: 'אחוז מעבר (5 יחידות)' },
      { num: '5', label: 'אולימפיאדת כימיה' },
      { num: '30+', label: 'בוגרות בפרמקולוגיה' },
    ],
    testimonial: {
      quote: 'שילוב התיאוריה המקוונת עם זמן מעבדה מעשי נתן לי בדיוק את ההכנה שהייתי צריכה לכימיה באוניברסיטה.',
      name: 'בתיה רוזנברג',
      sub: 'בוגרת · מחזור 2019',
      initials: 'BR',
    },
    relatedSlugs: ['biology', 'physics'],
  },

  // ── ספורט ─────────────────────────────────────────────────────────────
  {
    slug: 'volleyball',
    name: 'כדורעף',
    cat: 'ספורט',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'ראשון · שלישי',
    since: '2001',
    desc: 'ליגה בין-בית ספרית בשתי חטיבות גיל.',
    lede: 'כדורעף תחרותי בשתי חטיבות גיל, עם משחקי ליגה בין-בית ספריים ברחבי מטה בנימין ומסדרון ירושלים.',
    aboutWatermark: 'גוף חזק',
    aboutGoldTitle: 'מוח חזק.',
    aboutBody: [
      'תכנית הכדורעף מנהלת שתי קבוצות תחרותיות — צעירות (כיתות ט-י) ובכירות (כיתות י"א-י"ב) — כל אחת משחקת בליגה האזורית מתשרי עד אדר.',
      'האימון מדגיש טכניקה, תקשורת צוותית וכושר. קבוצת הבכירות הגיעה לגמר-חצי האזורי בשלוש מתוך חמש השנים האחרונות.',
    ],
    glance: [
      { label: 'אימונים / שבוע', value: '3' },
      { label: 'אורך העונה', value: '6 חודשים' },
      { label: 'חטיבות גיל', value: '2' },
      { label: 'ליגה', value: 'אזורית' },
    ],
    faculty: [
      { initials: 'OA', name: 'אורלי אזולאי', role: 'מאמנת ראשית' },
      { initials: 'MN', name: 'מיכל נבו', role: 'מאמנת צעירות' },
    ],
    timelineTitle: 'העונה.',
    timeline: [
      { period: 'תשרי · חשון', title: 'טרום עונה', desc: 'כושר, תרגילי טכניקה וגיבוש צוות.' },
      { period: 'כסלו · אדר', title: 'עונת ליגה', desc: 'משחקי ליגה אזורית — בית ואורח.' },
      { period: 'ניסן · אייר', title: 'פלייאוף', desc: 'ארבע הקבוצות המובילות מתקדמות לגמר-חצי אזורי.' },
    ],
    milestones: [
      { num: '23', label: 'שנות פעילות' },
      { num: '3', label: 'הופעות בגמר-חצי' },
      { num: '2', label: 'חטיבות גיל' },
      { num: '400+', label: 'שחקניות שאומנו' },
    ],
    testimonial: {
      quote: 'הצוות לימד אותי מה שיכולתי ללמוד רק לצד אחרות — אחריות, חוסן ומשמעת של להגיע.',
      name: 'עדינה וייס',
      sub: 'בוגרת · מחזור 2020',
      initials: 'AW',
    },
    relatedSlugs: ['running'],
  },
  {
    slug: 'running',
    name: 'ריצה',
    cat: 'ספורט',
    catSlug: 'sports',
    catIdx: 3,
    img: '/humanities.png',
    size: 'wide',
    badge: 'IN-PERSON',
    grades: '9 — 12',
    schedule: 'שני · חמישי',
    since: '2005',
    desc: 'אימוני קרוס קאנטרי עם תחרויות אזוריות עונתיות.',
    lede: 'ריצת קרוס קאנטרי ושטח — משמעת אישית, רוח צוות וגבעות מטה בנימין כשטח אימון.',
    aboutWatermark: 'צעד אחד',
    aboutGoldTitle: 'בכל פעם.',
    aboutBody: [
      'תכנית הריצה מציעה אימון מובנה לכל הרמות, ממתחילות ועד ספורטאיות תחרותיות. מפגשים שבועיים מכסים מרחק, אינטרוולים וחיזוק כוח.',
      'בית הספר מכניס קבוצות לסדרת קרוס קאנטרי האזורית בכל אביב, ורצות בודדות מתאגדות בקביעות לאליפויות המחוז.',
    ],
    glance: [
      { label: 'אימונים / שבוע', value: '2' },
      { label: 'עונה', value: 'כל השנה' },
      { label: 'תחרויות / שנה', value: '4' },
      { label: 'לכל הרמות?', value: 'כן' },
    ],
    faculty: [
      { initials: 'RP', name: 'רות פרלמן', role: 'מאמנת ריצה' },
    ],
    timelineTitle: 'העונה.',
    timeline: [
      { period: 'תשרי · חשון', title: 'אימון בסיס', desc: 'בסיס אירובי, טכניקה וריצות מרחק שבועיות.' },
      { period: 'כסלו · אדר', title: 'עבודת אינטרוולים', desc: 'אימוני מהירות ועליות; תחרות אזורית ראשונה.' },
      { period: 'ניסן · סיוון', title: 'עונת תחרויות', desc: 'שלוש תחרויות אזוריות; אליפות מחוז למתאגדות.' },
    ],
    milestones: [
      { num: '19', label: 'שנות פעילות' },
      { num: '4', label: 'תחרויות / שנה' },
      { num: '8', label: 'מדליסטיות מחוז' },
      { num: '300+', label: 'רצות שאומנו' },
    ],
    testimonial: {
      quote: 'הריצה לימדה אותי סבלנות עם עצמי — שכל שיפור נבנה מפגש אחד בכל פעם.',
      name: 'תמר אלול',
      sub: 'בוגרת · מחזור 2018',
      initials: 'TE',
    },
    relatedSlugs: ['volleyball'],
  },

  // ── מדעי הרוח ─────────────────────────────────────────────────────────
  {
    slug: 'israeli-thought',
    name: 'הגות ישראלית',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: '',
    badge: undefined,
    grades: '10 — 12',
    schedule: 'ראשון · רביעי',
    since: '2003',
    desc: 'פילוסופיה ציונית, זהות יהודית והחברה הישראלית העכשווית.',
    lede: 'עיון קפדני במחשבה הציונית מהרצל ועד ימינו — מקורות ראשוניים, חזיונות מתחרים והשאלות שעדיין מגדירות את החברה הישראלית.',
    aboutWatermark: 'מי אנחנו',
    aboutGoldTitle: 'הופכות להיות.',
    aboutBody: [
      'התכנית משתרעת על פני טקסטים ציוניים קלאסיים (הרצל, אחד העם, ז\'בוטינסקי, הרב קוק), תקופת המדינה הראשונה ועל ויכוחים עכשוויים סביב זהות, דת ודמוקרטיה.',
      'התלמידות עוסקות במקורות ראשוניים וצפויות לבנות ולהגן על טיעונים מקוריים. הקורס מסתיים בחיבור מחקר מהותי.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '3' },
      { label: 'טקסטים ראשוניים', value: '20+' },
      { label: 'עבודת מחקר?', value: 'כן' },
      { label: 'בחירה לבגרות?', value: 'כן' },
    ],
    faculty: [
      { initials: 'YM', name: 'יוסף מלמד', role: 'ראש מדעי הרוח' },
      { initials: 'ES', name: 'אסתר סלע', role: 'מנחת מחקר' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · כסלו', title: 'טקסטים קלאסיים', desc: 'הרצל, אחד העם והוויכוח הציוני הקדום.' },
      { period: 'טבת · אדר', title: 'מדינה וחברה', desc: 'דור המייסדים ואתגרים עכשוויים.' },
      { period: 'ניסן · סיוון', title: 'פרויקט מחקר', desc: 'חיבור עצמאי המוגן בפני ועדת סגל.' },
    ],
    milestones: [
      { num: '21', label: 'שנות פעילות' },
      { num: '20+', label: 'טקסטים ראשוניים' },
      { num: '95%', label: 'אחוז מעבר בגרות' },
      { num: '500+', label: 'בוגרות שאומנו' },
    ],
    testimonial: {
      quote: 'הקורס הזה נתן לי שפה לשאלות שנשאתי מאז הילדות — ואת הקפדנות לענות עליהן ממש.',
      name: 'דבורה טל',
      sub: 'בוגרת · מחזור 2022',
      initials: 'DT',
    },
    relatedSlugs: ['national-excursions', 'social-sciences', 'jewish-history'],
  },
  {
    slug: 'national-excursions',
    name: 'טיולים ארציים',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'חודשי',
    since: '1998',
    desc: 'מסעות ברחבי ישראל — מהגליל עד הנגב.',
    lede: 'כל כיתה נוסעת. ארץ ישראל כאולפן — גיאוגרפיה, היסטוריה וזיכרון שחיים באמצעות פגישה.',
    aboutWatermark: 'הארץ היא',
    aboutGoldTitle: 'המורה.',
    aboutBody: [
      'הטיולים הארציים משובצים בלוח השנה של בית הספר מכיתה ט\' עד י"ב. כל טיול מתוכנן להשלים את הלמידה בכיתה — ארכיאולוגיה מקראית, היסטוריה צבאית מודרנית, אקולוגיה וגיאוגרפיה חברתית.',
      'כיתה י"ב יוצאת למסע סיום בן שלושה ימים בדרום — מרמת הנגב לאילת — המביא יחד ארבע שנות לימוד.',
    ],
    glance: [
      { label: 'טיולים / שנה', value: '4' },
      { label: 'ימים בשטח', value: '8' },
      { label: 'כיתות', value: '9 — 12' },
      { label: 'טיול סיום?', value: 'כן (כיתה י"ב)' },
    ],
    faculty: [
      { initials: 'AM', name: 'אבי מנשה', role: 'ראש לימודי שטח' },
      { initials: 'DH', name: 'דפנה הירש', role: 'מדריכת ארכיאולוגיה' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'חשון', title: 'גבעות הבנימין', desc: 'ארכיאולוגיה מקומית ונוף — מתחילים קרוב לבית.' },
      { period: 'אדר', title: 'גליל וגולן', desc: 'אתרי בית שני, מערכות מים והצפון.' },
      { period: 'אייר', title: 'מסע נגב (כיתה י"ב)', desc: 'מסע שלושה ימים דרך נוף הדרום.' },
    ],
    milestones: [
      { num: '26', label: 'שנות פעילות' },
      { num: '4', label: 'טיולים / שנה' },
      { num: '100+', label: 'אתרים שביקרו' },
      { num: '1,500+', label: 'תלמידות שנסעו' },
    ],
    testimonial: {
      quote: 'הארץ הפסיקה להיות מפה והפכה לבית. המעבר הזה קרה בטיולים האלה.',
      name: 'ליאור טל',
      sub: 'בוגרת · מחזור 2023',
      initials: 'LT',
    },
    relatedSlugs: ['israeli-thought', 'jewish-history'],
  },
  {
    slug: 'social-sciences',
    name: 'מדעי החברה',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/humanities.png',
    size: '',
    badge: undefined,
    grades: '10 — 12',
    schedule: 'ראשון · שלישי',
    since: '2006',
    desc: 'סוציולוגיה, פסיכולוגיה ולימודים אזרחיים.',
    lede: 'סוציולוגיה, פסיכולוגיה וחינוך אזרחי — ללמוד לקרוא את החברה בקפידה כמו שקוראים טקסט.',
    aboutWatermark: 'החברה כ',
    aboutGoldTitle: 'טקסט.',
    aboutBody: [
      'מסלול מדעי החברה משלב סוציולוגיה, פסיכולוגיה חברתית ולימודים אזרחיים. התלמידות מנתחות את החברה הישראלית הן דרך נתונים כמותיים והן דרך מקרי בוחן איכותיים.',
      'התכנית כוללת פרויקט מחקר קהילתי שבו התלמידות סוקרות, מראיינות ומציגות ממצאים על סוגיה חברתית לבחירתן.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '4' },
      { label: 'פרויקט מחקר?', value: 'כן' },
      { label: 'מסלול בגרות?', value: 'כן' },
      { label: 'ממוצע קבוצה', value: '22' },
    ],
    faculty: [
      { initials: 'LB', name: 'לאה ברק', role: 'סוציולוגיה' },
      { initials: 'HR', name: 'חנה רוזן', role: 'פסיכולוגיה' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · טבת', title: 'יסודות', desc: 'מושגי מפתח בסוציולוגיה ופסיכולוגיה חברתית.' },
      { period: 'שבט · ניסן', title: 'מחקר שדה', desc: 'עיצוב סקר קהילתי, איסוף נתונים וניתוח.' },
      { period: 'אייר · סיוון', title: 'מצגות', desc: 'התלמידות מציגות ממצאי מחקר בפני עמיתות וסגל.' },
    ],
    milestones: [
      { num: '18', label: 'שנות פעילות' },
      { num: '22', label: 'ממוצע קבוצה' },
      { num: '96%', label: 'אחוז מעבר בגרות' },
      { num: '400+', label: 'בוגרות שאומנו' },
    ],
    testimonial: {
      quote: 'פרויקט המחקר שינה את האופן שבו אני נעה בעולם — אני שואלת שאלות טובות יותר עכשיו, ומקשיבה אחרת.',
      name: 'רונית כץ',
      sub: 'בוגרת · מחזור 2021',
      initials: 'RK',
    },
    relatedSlugs: ['israeli-thought', 'jewish-history'],
  },
  {
    slug: 'jewish-history',
    name: 'היסטוריה יהודית',
    cat: 'מדעי הרוח',
    catSlug: 'humanities',
    catIdx: 4,
    img: '/beit-midrash.png',
    size: '',
    badge: undefined,
    grades: '9 — 12',
    schedule: 'שני · רביעי',
    since: '1998',
    desc: 'מהתקופה המקראית ועד המדינה המודרנית — היסטוריה כזיכרון חי.',
    lede: 'ארבעת אלפים שנה בארבע שנים — עיסוק קפדני וחי בהיסטוריה היהודית מסיני ועד המדינה.',
    aboutWatermark: 'זיכרון כ',
    aboutGoldTitle: 'זהות.',
    aboutBody: [
      'ההיסטוריה היהודית נלמדת על פני ארבע השנים, מהתקופה הקדומה ועד המודרנית. תכנית הלימודים עוקבת אחר סילבוס הבגרות הלאומי אבל מרחיבה אותו במקורות ראשוניים, ויכוחים היסטוריוגרפיים ופרויקטי היסטוריה בעל פה.',
      'תלמידות בכיתה י"ב בוחרות התמחות: תקופה קדומה, שואה ותקומה, או ישראל המודרנית — ומשלימות חיבור מחקר מורחב.',
    ],
    glance: [
      { label: 'שעות / שבוע', value: '4' },
      { label: 'יחידות בגרות', value: '5' },
      { label: 'התמחויות', value: '3' },
      { label: 'עבודת מחקר?', value: 'כן (כיתה י"ב)' },
    ],
    faculty: [
      { initials: 'YM', name: 'יוסף מלמד', role: 'ראש מדעי הרוח' },
      { initials: 'NF', name: 'נעמי פרידמן', role: 'היסטוריה מודרנית' },
    ],
    timelineTitle: 'השנה.',
    timeline: [
      { period: 'תשרי · כסלו', title: 'קדמון ומימי הביניים', desc: 'מקרא, בית שני, גלות — יסודות הזיכרון.' },
      { period: 'טבת · ניסן', title: 'תקופה מודרנית', desc: 'אמנציפציה, שואה, ציונות וקום המדינה.' },
      { period: 'אייר · סיוון', title: 'עבודת מחקר', desc: 'חיבור מורחב בהתמחות שנבחרה; סקירת סגל.' },
    ],
    milestones: [
      { num: '26', label: 'שנות פעילות' },
      { num: '97%', label: 'אחוז מעבר בגרות' },
      { num: '3', label: 'התמחויות' },
      { num: '600+', label: 'בוגרות שאומנו' },
    ],
    testimonial: {
      quote: 'שיעורי ההיסטוריה בצביה הרגישו דחופים — כאילו העבר הוא משהו שאנחנו אחראיות לו, לא רק נדרשות לשנן.',
      name: 'נעמי גרוס',
      sub: 'בוגרת · מחזור 2020',
      initials: 'NG',
    },
    relatedSlugs: ['israeli-thought', 'national-excursions', 'social-sciences'],
  },
];

function getStore(locale: string): ActivityDetail[] {
  return locale === 'he' ? ACTIVITIES_HE : ACTIVITIES_EN;
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
