// NEWSDoT — Firestore Article Data Layer

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION = 'articles';

// ─── Seed data (used only if Firestore collection is empty) ────────────────────
const SEED_ARTICLES = [
  {
    id_legacy: 1,
    title: "Senate Passes Landmark Electoral Reform Bill After Months of Debate",
    excerpt: "Nigeria's upper legislative chamber voted 79-32 in favour of the bill, which introduces electronic transmission of results as a mandatory standard and stiffens penalties for electoral fraud.",
    body: `Nigeria's Senate has passed a landmark electoral reform bill, paving the way for sweeping changes to how elections are conducted across the country. The bill, which was passed after months of heated debate and several committee reviews, mandates the electronic transmission of election results from polling units directly to the Independent National Electoral Commission (INEC) collation system.\n\nSenators voted 79–32 in favour of the legislation, with some lawmakers raising concerns about network infrastructure readiness in rural areas. Proponents argue the change will drastically reduce the opportunities for result manipulation that have plagued past elections.\n\nThe bill now moves to the House of Representatives for concurrence before heading to the President for assent. Civil society groups celebrated the outcome, calling it "a major step toward a credible democracy."\n\nINEC Chairman Professor Mahmood Yakubu said the commission was ready to deploy the necessary technology nationwide, citing the success of BVAS in recent off-cycle elections. Critics, however, argue implementation timelines remain too tight ahead of the next general election cycle.`,
    category: "politics",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
    author: "Chidiebere Okonkwo",
    readTime: "5 min read",
    date: "Feb 28, 2026",
    isHero: true,
    verified: true,
    status: "published",
  },
  {
    id_legacy: 2,
    title: "FCT Minister Unveils ₦680 Billion Abuja Master Plan Revision",
    excerpt: "The new master plan revision targets rapid expansion of satellite towns, upgraded transport corridors and the creation of 120,000 new jobs in the FCT over five years.",
    body: `The Federal Capital Territory Administration has unveiled a sweeping revision to Abuja's master plan, representing a ₦680 billion investment framework aimed at transforming the city over the next five years.\n\nFCT Minister Barr. Nyesom Wike made the announcement at a stakeholder's forum at the NICON Luxury Hotel. The plan includes dedicated funding for the completion of the Abuja Light Rail Phase 2 and a new ring road from Karu to Gwarimpa.\n\nMajor components include:\n- Gazetting 14 new residential districts in the Northern Districts axis\n- Construction of 3 new hospitals in emerging communities\n- Development of tech and innovation hubs in Jabi and Central Business District\n- Affordable housing units for civil servants at satellite towns`,
    category: "politics",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    author: "Fatima Al-Rasheed",
    readTime: "4 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 3,
    title: "Opposition Governors Form Progressive Alliance Ahead of 2027 Polls",
    excerpt: "Seven state governors from three opposition parties have announced a formal political alliance, signalling early mobilisation for the 2027 general elections.",
    body: `Seven state governors representing three opposition parties have formally announced the creation of a Progressive Alliance coalition, widely seen as the most significant political development since the last general election.\n\nThe coalition — comprising governors from the Labour Party, PDP, and NNPP — has signed a memorandum of understanding committing to a unified presidential ticket.\n\nPolitical analysts say the alliance could significantly alter the calculus of the 2027 election if it holds. Previous opposition alliances have frequently collapsed over candidate selection disputes.\n\nAPC National Chairman Dr Abdullahi Ganduje dismissed the coalition as a "marriage of convenience."`,
    category: "politics",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    author: "Blessing Adeyemi",
    readTime: "4 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 4,
    title: "Dangote Refinery Hits Full Capacity, Begins Petrol Exports to West Africa",
    excerpt: "Africa's largest single-train refinery has reached its 650,000 bpd nameplate capacity and is now exporting premium motor spirit to Ghana, Côte d'Ivoire and Senegal.",
    body: `The Dangote Petroleum Refinery has officially reached its full nameplate capacity of 650,000 barrels per day and commenced exports of petroleum products to West African neighbours.\n\nGroup Chief Executive Aliko Dangote confirmed the milestone at a capacity celebration event. The refinery is now exporting PMS, diesel, and LPG to Ghana, Côte d'Ivoire, and Senegal under bilateral supply agreements.\n\nThe development is expected to bring significant foreign exchange earnings to Nigeria and reduce the country's dependence on fuel imports, which previously consumed as much as $10 billion annually.\n\nRetail pump prices in Nigeria have already begun declining in states closer to the Port Harcourt-Lagos supply corridor.`,
    category: "business",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=900&q=80",
    author: "Emeka Nwosu",
    readTime: "5 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 5,
    title: "CBN Holds MPR at 26.75% as Inflation Shows Signs of Easing",
    excerpt: "The Monetary Policy Committee voted unanimously to hold the benchmark rate, citing early evidence of disinflation and improved food supply chains.",
    body: `The Central Bank of Nigeria's Monetary Policy Committee voted unanimously to maintain the Monetary Policy Rate (MPR) at 26.75% at its February 2026 meeting.\n\nCBN Governor Olayemi Cardoso said headline inflation had eased to 29.1% in January, down from a peak of 34.8% in mid-2025. The naira strengthened to ₦1,510/$ at the official window following the announcement.\n\nBusiness groups welcomed the hold, noting that the record-high rates had increased their cost of borrowing significantly. The Lagos Chamber of Commerce called for a 100-basis-point cut at the next meeting if inflation continues its downward trend.`,
    category: "business",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    author: "Ngozi Eze",
    readTime: "4 min read",
    date: "Feb 27, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 6,
    title: "Abuja's Jabi Tech Hub Attracts $40M in Foreign Startup Investment",
    excerpt: "Three international venture capital firms have committed $40 million to early-stage Nigerian startups domiciled at the Jabi Technology Hub.",
    body: `Three international venture capital firms have committed a combined $40 million in direct investment to technology startups operating from Abuja's Jabi Technology Hub.\n\nThe Hub Director Alhaji Muhammed Garba called it "the most significant vote of confidence in FCT's emerging innovation economy." The funding will be deployed across 18 seed-stage and Series A companies in fintech, agritech, health tech, and logistics.\n\nThe FCTA has pledged to expand the hub's floor space from 4,000 sqm to 12,000 sqm by the end of 2027, adding co-working space, an accelerator programme, and a dedicated investor matching desk.`,
    category: "business",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80",
    author: "Aisha Mohammed",
    readTime: "4 min read",
    date: "Feb 27, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 7,
    title: "Nigeria Launches National AI Governance Framework, First in Sub-Saharan Africa",
    excerpt: "NITDA's newly published framework establishes ethical guidelines, safety testing requirements and liability rules for AI systems deployed in Nigeria's public and private sectors.",
    body: `Nigeria has become the first country in sub-Saharan Africa to publish a comprehensive National Artificial Intelligence Governance Framework.\n\nThe framework, published by NITDA, introduces a tiered risk classification system for AI applications — similar in structure to the EU AI Act — with stricter requirements for high-risk systems used in healthcare, finance, and criminal justice.\n\nKey provisions include mandatory transparency disclosures for AI-generated content and the creation of a National AI Safety Board to conduct post-deployment audits.\n\nNigeria's framework is being closely watched by other African countries, with Ghana, Kenya, and Rwanda already requesting technical briefings.`,
    category: "tech",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    author: "Tunde Fashola Jr.",
    readTime: "5 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 8,
    title: "MTN Nigeria Rolls Out 5G to Abuja Suburbs, Targets Full FCT Coverage by Q3",
    excerpt: "The telecoms giant has extended its 5G network to Gwarimpa, Lugbe, and Karu, with Kubwa and Bwari Districts next on the rollout schedule.",
    body: `MTN Nigeria has expanded its 5G network service to three major Abuja suburbs — Gwarimpa, Lugbe, and Karu — as part of a broad FCT rollout plan targeting full coverage by Q3 2026.\n\nCurrent 5G speeds in trial user tests averaged 480 Mbps download and 120 Mbps upload. Latency for most real-world applications was under 15 milliseconds.\n\nAirtel Nigeria confirmed it would respond with its own 5G expansion in FCT by May 2026.`,
    category: "tech",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80",
    author: "Kelechi Obi",
    readTime: "3 min read",
    date: "Feb 27, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 9,
    title: "Paystack Processes ₦120 Trillion in Transactions in 2025, Reports Record Growth",
    excerpt: "The Stripe-owned Nigerian payments giant processed over ₦120 trillion in total payment volume in 2025, serving more than 300,000 active merchants across Africa.",
    body: `Paystack has released its 2025 annual transaction report, revealing that the Nigerian fintech processed over ₦120 trillion in total payment volume, serving more than 300,000 active merchants.\n\nTransaction volume grew 58% year-on-year. Paystack's transfer product was the fastest growing feature — processing ₦42 trillion alone.\n\nThe milestone positions Paystack as the highest-volume payment gateway in Sub-Saharan Africa. Analysts say a standalone IPO remains a realistic option in the coming years.`,
    category: "tech",
    tag: "Africa",
    tagSlug: "africa",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
    author: "Adaeze Obi",
    readTime: "4 min read",
    date: "Feb 26, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 10,
    title: "Abuja Carnival Returns with Record 180,000 Attendees, Showcasing FCT Cultural Diversity",
    excerpt: "The three-day annual carnival through the city's central districts drew 180,000 attendees, with 42 cultural groups representing all six geopolitical zones.",
    body: `The Abuja Carnival concluded its three-day run with a record 180,000 attendees. The carnival, themed "Unity in Colour," featured 42 cultural groups representing all six geopolitical zones and the diaspora.\n\nHighlights included a masquerade convergence on Shehu Shagari Way, a pan-African fashion parade at Millennium Park, and a food festival at the National Children's Park.\n\nTourism officials say the carnival generated an estimated ₦2.8 billion in economic activity across the FCT.`,
    category: "society",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&q=80",
    author: "Hauwa Garba",
    readTime: "4 min read",
    date: "Feb 28, 2026",
    verified: false,
    status: "published",
  },
  {
    id_legacy: 11,
    title: "University of Abuja Tops National Rankings for Research Output",
    excerpt: "UNIABUJA has been ranked Nigeria's most productive university for research output for the second consecutive year, driven by STEM and medical science publications.",
    body: `The University of Abuja has been ranked the most productive university for research output in Nigeria for the second consecutive year, producing 1,240 peer-reviewed publications in 2025 — a 34% jump from the previous year.\n\nVice Chancellor Prof. Abdul-Rasheed Na'Allah attributed the achievement to a tripling of research grant funding and partnerships with seven international universities.\n\nNUC Executive Secretary Prof. Abubakar Rasheed praised the university as a model for others.`,
    category: "society",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
    author: "Hadiza Musa",
    readTime: "3 min read",
    date: "Feb 27, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 12,
    title: "Nollywood Drama Series 'Aso Rock Diaries' Breaks Streaming Records in Africa",
    excerpt: "The political drama set inside Nigeria's presidency has surpassed 50 million views on streaming platforms in just six weeks, becoming Africa's most watched original series.",
    body: `Nollywood's 'Aso Rock Diaries' has surpassed 50 million views across streaming platforms in just six weeks, making it the most-watched original African series in streaming history.\n\nProduced by FilmHaus Africa and distributed on Prime Video, Showmax, and Rok Plus, the series stars veteran actress Joke Silva alongside a cast of rising Nigerian talent.\n\nSeason 2 has already been greenlit, and Amazon Studios has reportedly expressed interest in co-producing a US-market adaptation.`,
    category: "society",
    tag: "Africa",
    tagSlug: "africa",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=80",
    author: "Chiamaka Ejike",
    readTime: "3 min read",
    date: "Feb 26, 2026",
    verified: false,
    status: "published",
  },
  {
    id_legacy: 13,
    title: "Inside the Ghost Workers Scandal: How 43,000 Fake FCT Staff Drained ₦28 Billion",
    excerpt: "A six-month NEWSDoT investigation reveals how a network of senior civil servants manipulated the IPPIS to collect salaries for fictitious employees.",
    body: `A six-month investigation by the NEWSDoT Investigations Desk has uncovered a sprawling ghost workers scheme within the FCTA that saw approximately 43,000 fictitious employees registered on the Integrated Payroll and Personnel Information System, draining an estimated ₦28 billion over five years.\n\nThe investigation involved analysis of leaked internal audit reports, interviews with 27 current and former FCTA staff, and review of payroll data obtained through freedom of information requests.\n\nThe Economic and Financial Crimes Commission confirmed it had received a referral file related to FCT payroll infractions. Three directors have been quietly suspended pending the outcome.`,
    category: "investigations",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80",
    author: "Michael Eze",
    readTime: "8 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 14,
    title: "Black Market Airport Road: The Unofficial Forex Corridor Regulators Are Ignoring",
    excerpt: "On a 2km stretch of the Airport Road, dozens of unlicensed forex operators move millions of dollars daily under the watch of security forces — with impunity.",
    body: `Just two kilometres east of the Nnamdi Azikiwe International Airport, a thriving parallel foreign exchange market operates openly along the Airport Road corridor.\n\nNEWSDoT reporters spent three weeks documenting the market, speaking with more than 60 operators, customers, and security officials. Operators say combined daily volume on the strip exceeds $3 million.\n\nThe CBN's last enforcement action in the area was recorded in November 2024.`,
    category: "investigations",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=900&q=80",
    author: "Peter Nnamdi",
    readTime: "7 min read",
    date: "Feb 25, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 15,
    title: "Opinion: Abuja's Transport Crisis Won't Be Solved by Rail Alone",
    excerpt: "Without a functioning bus rapid transit system and serious enforcement of traffic laws, the light rail will remain a prestige project rather than a solution.",
    body: `I have taken the Abuja Light Rail exactly seven times. Each time, the experience was pleasant — air-conditioned, on time, clean. And each time, I was one of perhaps forty passengers in a train designed for four hundred.\n\nThis is the central paradox of Abuja's transport planning. We build the premium infrastructure without building the habits, the connecting services, or the enforcement frameworks that would drive people to use it.\n\nA functional urban transport system requires layering. The rail is the spine, but it needs the muscles of a reliable BRT network that takes passengers from their neighbourhoods to the rail stations.\n\nUntil the city commits to the full transport ecosystem, the rail will continue to be an Instagram moment rather than a commuter lifeline.`,
    category: "opinion",
    tag: "Abuja",
    tagSlug: "abuja",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
    author: "Dr. Sandra Olusegun",
    readTime: "5 min read",
    date: "Feb 28, 2026",
    verified: false,
    status: "published",
  },
  {
    id_legacy: 16,
    title: "Opinion: Nigeria's Tech Talent Is Its Biggest Export. We Must Protect It.",
    excerpt: "For every brilliant Nigerian engineer that emigrates, we lose compounding value. The solution is not to stop them — it's to make Nigeria competitive enough to keep them.",
    body: `The conversation about Nigeria's talent exodus has become remarkably one-sided. We bemoan the brain drain. We share statistics. We appeal to patriotism. And then we wonder why none of it works.\n\nIt doesn't work because the argument is wrong. Telling a brilliant 27-year-old software engineer to stay in Lagos when she has an offer from Google's London office is not a policy. It is a wish.\n\nThe countries that have solved this problem — India, Ireland, Israel, South Korea — did so with tax incentives for returning diaspora talent, serious investment in research infrastructure, and stable electricity and internet.\n\nWe have extraordinary technical talent. What we owe them is not a guilt trip — it is a country worthy of their ambitions.`,
    category: "opinion",
    tag: "Nigeria",
    tagSlug: "nigeria",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=900&q=80",
    author: "Adaora Chukwu",
    readTime: "4 min read",
    date: "Feb 27, 2026",
    verified: false,
    status: "published",
  },
  {
    id_legacy: 17,
    title: "African Union Summit Agrees on Continental Free Trade Area Implementation Roadmap",
    excerpt: "Heads of state adopted a phased roadmap for AfCFTA implementation, with Nigeria committing to ratify remaining trade protocols by June 2026.",
    body: `African Union heads of state have adopted a new phased implementation roadmap for the African Continental Free Trade Area, with binding commitments for ratification from 47 of the 54 signatories.\n\nNigeria, the continent's largest economy, committed to ratify the remaining outstanding trade protocols before June 2026.\n\nEconomists say full AfCFTA implementation could increase intra-African trade from its current 18% to over 52% within a decade.`,
    category: "news",
    tag: "Africa",
    tagSlug: "africa",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80",
    author: "Yusuf Ibrahim",
    readTime: "4 min read",
    date: "Feb 28, 2026",
    verified: true,
    status: "published",
  },
  {
    id_legacy: 18,
    title: "WHO Names Nigeria Among 10 Countries Leading Global Polio Eradication Effort",
    excerpt: "The World Health Organisation's latest report cites Nigeria's surveillance infrastructure and community vaccination outreach as models for other endemic countries.",
    body: `The World Health Organisation has named Nigeria among the ten countries leading the global effort to eradicate polio, citing the country's dramatically improved surveillance infrastructure and vaccine delivery logistics.\n\nNigeria's Health Minister Dr. Mohammed Ali Pate said the recognition "reflected the hard work of thousands of frontline health workers and the communities that welcomed them."\n\nHe announced a ₦14 billion supplementary allocation for routine immunisation in the coming fiscal year.`,
    category: "news",
    tag: "Global",
    tagSlug: "global",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80",
    author: "Grace Nwosu",
    readTime: "4 min read",
    date: "Feb 27, 2026",
    verified: true,
    status: "published",
  },
];

// ─── Seed helper (runs once if collection is empty) ───────────────────────────
export const seedArticlesIfEmpty = async () => {
  const snap = await getDocs(collection(db, COLLECTION));
  if (!snap.empty) return; // Already seeded

  const batch = writeBatch(db);
  SEED_ARTICLES.forEach((article) => {
    const ref = doc(collection(db, COLLECTION));
    const { id_legacy, ...rest } = article;
    batch.set(ref, {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();
  console.log('[NEWSDoT] Seeded', SEED_ARTICLES.length, 'articles to Firestore.');
};

// ─── CRUD ─────────────────────────────────────────────────────────────────────

/** Fetch all articles ordered by creation time (newest first) */
export const getArticles = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Fetch a single article by Firestore document ID */
export const getArticleById = async (id) => {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

/** Fetch articles by category */
export const getArticlesByCategory = async (cat) => {
  const q = query(
    collection(db, COLLECTION),
    where('category', '==', cat),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/** Add a new article */
export const addArticle = async (payload) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...payload,
    status: payload.status || 'published',
    verified: true,
    isHero: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...payload };
};

/** Update an existing article */
export const updateArticle = async (id, changes) => {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...changes, updatedAt: serverTimestamp() });
};

/** Delete an article */
export const deleteArticle = async (id) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

/** Fetch hero article (first isHero=true, or newest) */
export const getHeroArticle = async () => {
  const q = query(
    collection(db, COLLECTION),
    where('isHero', '==', true),
    limit(1)
  );
  const snap = await getDocs(q);
  if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };
  // Fallback: newest article
  const q2 = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(1));
  const snap2 = await getDocs(q2);
  if (!snap2.empty) return { id: snap2.docs[0].id, ...snap2.docs[0].data() };
  return null;
};

/** Fetch latest N articles (excluding hero) */
export const getLatestArticles = async (n = 9) => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'), limit(n + 1));
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  // Filter out hero
  const hero = all.find((a) => a.isHero);
  return all.filter((a) => !a.isHero || a.id !== hero?.id).slice(0, n);
};
