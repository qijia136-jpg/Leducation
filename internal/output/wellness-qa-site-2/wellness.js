const supportEmail = "xletravels@gmail.com";

const retreatAnswers = [
  {
    title: "What this journey is",
    keywords: ["program", "trip", "journey", "tour", "overview", "what", "about"],
    html: `
      <p>This is a 10-day China cultural immersion and high-end customized wellness journey, not a standard sightseeing tour.</p>
      <p>The route combines Shanghai, China Jingdezhen the Porcelain Capital, Zhejiang wellness practice, Taoist cultural context, calligraphy, ink painting, Jiangnan water towns, West Lake, a brewery experience, luxury-standard stays, refined dining, and take-home works.</p>
    `
  },
  {
    title: "Who it suits",
    keywords: ["suitable", "fit", "who", "family", "couple", "friend", "senior", "luxury", "culture", "wellness"],
    html: `
      <p>This journey suits international guests who want a slower, deeper, more comfortable way to experience China.</p>
      <ul>
        <li>Good fit: couples, friends, small families, private small groups, culture lovers, and light-luxury travelers.</li>
        <li>Especially relevant for guests interested in meditation, calligraphy, ink painting, porcelain, Taoist culture, and refined Chinese dining.</li>
      </ul>
    `
  },
  {
    title: "Who should confirm suitability first",
    keywords: ["not suitable", "medical", "nursing", "wheelchair", "accessibility", "condition", "health", "zero tolerance"],
    html: `
      <p>Please contact human support before booking if a guest requires medical care, clinical treatment, nursing care, full wheelchair accessibility, or cannot accept any weather or supplier adjustment.</p>
      <p>This is a cultural and wellness-oriented travel program. It does not provide diagnosis, clinical treatment, nursing, or promised health outcomes.</p>
    `
  },
  {
    title: "Children and younger travelers",
    keywords: ["child", "children", "kid", "teen", "teenager", "family", "age", "12"],
    html: `
      <p>The journey is designed mainly for guests who are comfortable with slower cultural workshops, quiet practice, and premium travel pacing.</p>
      <p>Families with children age 12+ may be considered case by case. Please email the child's age, travel experience, and family expectations for confirmation.</p>
    `
  },
  {
    title: "Tour language",
    keywords: ["language", "english", "chinese", "guide", "translator", "french", "spanish", "japanese"],
    html: `
      <p>The journey is conducted in English by default, with Chinese-speaking guides or staff also present.</p>
      <p>If another language is needed, such as French, Japanese, or Spanish, please inquire in advance. Availability and possible surcharges depend on dates and locations.</p>
    `
  },
  {
    title: "Private group, not joined with strangers",
    keywords: ["group", "private", "strangers", "join", "shared", "custom", "exclusive"],
    html: `
      <p>This product is positioned as high-end private customization. It usually operates as a private group for a family, couple, friends, or an invited party.</p>
      <p>If a guest is open to a specific small-group date, the team will separately confirm group size, configuration, price, and service standard before anything is committed.</p>
    `
  },
  {
    title: "Price and flight boundary",
    keywords: ["price", "cost", "fee", "5999", "5999.99", "flight", "china-us", "airfare", "included"],
    html: `
      <p>The reference starting price is <strong>from USD 5,999.99 per person</strong>, excluding China-US round-trip international flights.</p>
      <ul>
        <li>Default pricing assumes standard twin-share occupancy.</li>
        <li>Single occupancy, room upgrades, suites, connecting rooms, and special-view rooms require a supplement.</li>
        <li>Final pricing depends on travel dates, group size, hotel tier, room type, dining standard, ground transport, activity vendors, and custom requests.</li>
      </ul>
    `
  },
  {
    title: "What the price usually includes",
    keywords: ["include", "included", "inclusions", "cover", "hotel", "car", "rail", "dining", "workshop", "guide"],
    html: `
      <p>The reference package usually includes the 10-day core itinerary within China, five-star or near-five-star accommodation, private car service, business-class high-speed rail seats where applicable, refined dining, listed cultural workshops, and English-speaking guide service.</p>
      <p>Final inclusions must be confirmed in the formal quotation.</p>
    `
  },
  {
    title: "What is not included",
    keywords: ["not included", "excluded", "exclude", "airfare", "visa", "insurance", "tips", "shopping", "optional"],
    html: `
      <p>Common exclusions: China-US round-trip airfare, visa fees, travel insurance, single-room supplement, personal shopping, incidental expenses, tips or gratuities, meals not listed in the final itinerary, and optional activities or upgrades.</p>
    `
  },
  {
    title: "Travel insurance",
    keywords: ["insurance", "travel insurance", "medical emergency", "baggage", "delay", "required"],
    html: `
      <p>Travel insurance is not included but is strongly recommended. Guests should purchase comprehensive coverage for trip cancellation, medical emergencies, baggage loss, and travel delays before departure.</p>
      <p>The team may suggest common options but does not sell or endorse a specific policy.</p>
    `
  },
  {
    title: "Payment schedule",
    keywords: ["payment", "deposit", "balance", "pay", "invoice", "contract"],
    html: `
      <p>The payment schedule is specified in the formal quotation and contract. A deposit is typically required to secure dates and begin coordination, with the balance due according to contract terms.</p>
      <p>Specific percentages and deadlines depend on season, hotel policies, and vendor requirements.</p>
    `
  },
  {
    title: "Refund, cancellation, and date changes",
    keywords: ["refund", "cancel", "cancellation", "date change", "change date", "policy"],
    html: `
      <p>Refund, cancellation, and date-change policies must be confirmed through the formal quotation or contract.</p>
      <p>Rules vary by hotel, restaurant, transport provider, workshop vendor, and holiday period. The website should not be treated as a booking contract.</p>
    `
  },
  {
    title: "Institutional invoices",
    keywords: ["school", "institution", "invoice", "purchase order", "po", "company", "billing"],
    html: `
      <p>Institutional invoicing may be possible depending on the arrangement. Please email the institution's purchase-order process, billing requirements, traveler details, and requested travel dates.</p>
    `
  },
  {
    title: "Hotels and room type",
    keywords: ["hotel", "stay", "accommodation", "room", "single", "suite", "connecting", "view", "five-star"],
    html: `
      <p>Accommodation is planned around five-star luxury hotels or near-five-star standard properties.</p>
      <p>The default room standard is twin-share. Single occupancy, suite upgrades, connecting rooms, and special-view rooms require a supplement and are subject to hotel confirmation.</p>
    `
  },
  {
    title: "Choosing a hotel",
    keywords: ["choose hotel", "own hotel", "preferred hotel", "hotel preference", "brand"],
    html: `
      <p>Guests may express hotel preferences. The team will check availability and incorporate the preferred hotel into the quotation if feasible.</p>
      <p>Hotel changes may affect route logistics and pricing.</p>
    `
  },
  {
    title: "Dining standard and Black Pearl restaurants",
    keywords: ["restaurant", "dining", "meal", "black pearl", "michelin", "luxury", "food", "cuisine"],
    html: `
      <p>Meals focus on light-luxury restaurants, with selected high-end Black Pearl guide-style dining where the route permits.</p>
      <p>Black Pearl is a respected Chinese restaurant guide, often compared with Michelin in the local dining context.</p>
    `
  },
  {
    title: "Dietary restrictions and allergies",
    keywords: ["diet", "dietary", "allergy", "allergies", "vegetarian", "vegan", "halal", "seafood", "nut", "dairy", "alcohol"],
    html: `
      <p>Dietary restrictions must be declared at booking. Vegetarian, seafood, nut, dairy, alcohol-free, halal, religious, and allergy-related needs require advance vendor confirmation.</p>
    `
  },
  {
    title: "Restaurant and cuisine requests",
    keywords: ["specific restaurant", "cuisine", "huaiyang", "cantonese", "zhejiang", "request restaurant"],
    html: `
      <p>Guests may request specific restaurants or cuisine types. The team will check availability, location feasibility within the route, and pricing impact before confirming.</p>
    `
  },
  {
    title: "10-day route",
    keywords: ["itinerary", "route", "10 day", "11 day", "9 night", "snapshot", "schedule"],
    html: `
      <p>Core route: Shanghai arrival, China Jingdezhen porcelain experience, Zhejiang wellness retreat, Jiangnan water towns, West Lake, and return logistics.</p>
      <p>The in-China program is designed as 10 days. With international flight timing and time zones, the guest journey is commonly communicated as 11 days / 9 nights.</p>
    `
  },
  {
    title: "Why Jingdezhen is early",
    keywords: ["jingdezhen", "porcelain", "ceramic", "early", "kiln", "firing", "packing"],
    html: `
      <p>Porcelain-making requires finishing, kiln firing, and protective packing. Placing Jingdezhen early maximizes the chance for guests to take home completed porcelain pieces by the end of the journey.</p>
    `
  },
  {
    title: "Take-home works",
    keywords: ["take home", "bring home", "porcelain", "calligraphy", "ink painting", "artwork", "works"],
    html: `
      <p>Depending on workshop schedules and completion timelines, guests can take home porcelain pieces, calligraphy, and ink painting works.</p>
      <p>Porcelain involves firing and packing, so the final take-home format depends on the studio's actual completion status.</p>
    `
  },
  {
    title: "Day-by-day itinerary",
    keywords: ["day by day", "daily", "detail", "schedule", "sample itinerary", "confirmed itinerary"],
    html: `
      <p>The brochure includes a 10-day snapshot. A confirmed day-by-day itinerary is provided after booking once dates, hotels, restaurant availability, transport, and workshop schedules are locked in.</p>
    `
  },
  {
    title: "Transportation and airport transfers",
    keywords: ["transport", "car", "chauffeur", "private car", "airport", "pickup", "drop-off", "rail", "train", "business class"],
    html: `
      <p>Private car service and chauffeur-driven ground transport are arranged for confirmed city and intercity travel. If high-speed rail is required, business-class seats are arranged where available.</p>
      <p>Private pickup at Shanghai Pudong International Airport (PVG) and departure drop-off are included for confirmed arrangements. Other airports should be specified before booking.</p>
    `
  },
  {
    title: "Typical daily pace",
    keywords: ["pace", "daily pace", "walk", "walking", "rest", "slow", "busy", "tired"],
    html: `
      <p>The pace is slower than standard group tours, with built-in rest and flexibility. A typical day may include morning wellness or cultural practice, lunch, afternoon exploration or workshop time, and refined dinner.</p>
      <p>Guests should still expect walking, getting in and out of vehicles, workshops, site visits, and city-to-city movement.</p>
    `
  },
  {
    title: "Wellness practice",
    keywords: ["wellness", "meditation", "breathwork", "breathing", "tea", "calligraphy", "ink", "taoist", "tongbai", "tiantai"],
    html: `
      <p>The wellness section can include seated meditation, breathwork, gentle body practice, tea, writing, calligraphy, ink painting, and cultural context connected to Tiantai Mountain and Tongbai Palace Taoist heritage.</p>
      <p>Use wording such as cultural understanding and body-mind relaxation. Avoid promising therapeutic or clinical outcomes.</p>
    `
  },
  {
    title: "No prior experience required",
    keywords: ["beginner", "experience", "skill", "meditation experience", "art experience", "first time"],
    html: `
      <p>No prior meditation or art experience is required. Workshops are designed for beginners and led by instructors in a gentle, exploratory, culturally immersive way.</p>
    `
  },
  {
    title: "Taoist cultural context",
    keywords: ["taoist", "daoist", "religion", "religious", "tongbai", "tiantai", "palace"],
    html: `
      <p>The Zhejiang wellness segment draws on the cultural context of Tiantai Mountain and Tongbai Palace, an important Taoist heritage site.</p>
      <p>The experience is presented as cultural and wellness heritage, not religious instruction. Participation is cultural and voluntary.</p>
    `
  },
  {
    title: "Brewery experience and alcohol-free option",
    keywords: ["beer", "brewery", "alcohol", "non-alcoholic", "tea ceremony", "tasting", "drink"],
    html: `
      <p>The brewery visit and tasting is a relaxed social and contemporary-China lifestyle component.</p>
      <p>Guests who do not drink alcohol may opt out or request non-alcoholic alternatives. The brewery segment can also be replaced with an extended tea experience if requested during customization.</p>
    `
  },
  {
    title: "Jiangnan water towns and West Lake",
    keywords: ["jiangnan", "water town", "west lake", "hangzhou", "canal", "bridge", "garden", "lake"],
    html: `
      <p>Jiangnan water towns emphasize canals, stone bridges, alleyways, courtyards, and waterside daily life.</p>
      <p>West Lake emphasizes lake views, bridges, classical gardens, mountain silhouettes, and Chinese landscape aesthetics. Together they offer a fuller view of Jiangnan culture.</p>
    `
  },
  {
    title: "Accessibility and mobility",
    keywords: ["accessibility", "wheelchair", "mobility", "stairs", "uneven", "knee", "back", "senior"],
    html: `
      <p>This journey is not designed for full wheelchair accessibility. Some heritage sites, water-town lanes, and temple areas may have steps, uneven surfaces, and narrow passages.</p>
      <p>Guests with mobility aids, knee or back concerns, chronic conditions, or accessibility needs should contact human support for a case-by-case assessment before booking.</p>
    `
  },
  {
    title: "Medical emergency during the trip",
    keywords: ["emergency", "hospital", "doctor", "ill", "sick", "medical emergency", "medicine"],
    html: `
      <p>If a medical emergency occurs, the guide and team will assist in arranging transport to the nearest appropriate medical facility.</p>
      <p>Guests should carry travel insurance with medical coverage and bring any necessary personal medication. The program does not provide on-site medical personnel.</p>
    `
  },
  {
    title: "Altitude and air quality",
    keywords: ["altitude", "air quality", "pollution", "respiratory", "asthma", "season"],
    html: `
      <p>The route destinations are low altitude, so altitude sickness is not expected. Air quality varies by season.</p>
      <p>Guests with respiratory conditions should consult their doctor before travel and bring any necessary medication.</p>
    `
  },
  {
    title: "Flights and arrival airport",
    keywords: ["airport", "pvg", "sha", "arrival", "departure", "flight", "fly", "shanghai pudong"],
    html: `
      <p>The recommended arrival airport is Shanghai Pudong International Airport (PVG). The exact arrival and departure city should be confirmed based on origin city, flight pricing, travel dates, route, and final hotel arrangements.</p>
      <p>China-US round-trip flights are not included. Please confirm itinerary dates and transfer timing before purchasing flights.</p>
    `
  },
  {
    title: "Visa and entry documents",
    keywords: ["visa", "passport", "entry", "document", "l visa", "invitation", "embassy", "consulate"],
    html: `
      <p>Guests are responsible for confirming China entry requirements based on passport nationality and departure country.</p>
      <p>Many international travelers may need a Chinese tourist visa. The team can provide a supporting itinerary or invitation letter after confirmed booking, but cannot guarantee visa outcomes. Always verify requirements with official sources.</p>
    `
  },
  {
    title: "Packing list",
    keywords: ["pack", "packing", "luggage", "clothes", "shoes", "rain", "temple", "medicine"],
    html: `
      <p>Recommended items include comfortable walking shoes, lightweight layers, seasonal outerwear, rain protection, sun protection, personal toiletries and medication, modest clothing for temple or meditation settings, and a small daypack.</p>
      <p>A detailed seasonal packing note is provided in the pre-trip briefing.</p>
    `
  },
  {
    title: "Internet and apps in China",
    keywords: ["wifi", "internet", "vpn", "google", "instagram", "whatsapp", "gmail", "wechat"],
    html: `
      <p>Hotels provide WiFi, and private vehicles may have mobile WiFi. Some international apps and services may be restricted in China without a VPN.</p>
      <p>Guests should install and test any needed VPN or communication tools before departure. The team may suggest common options but does not endorse a specific provider.</p>
    `
  },
  {
    title: "Payments in China",
    keywords: ["credit card", "visa card", "mastercard", "alipay", "wechat pay", "cash", "money", "cny"],
    html: `
      <p>International credit cards are accepted at major hotels and some upscale restaurants, but not everywhere. WeChat Pay and Alipay are widely used for daily transactions.</p>
      <p>Guests are advised to set up Alipay or WeChat Pay with an international card before travel and carry some Chinese Yuan cash for small vendors.</p>
    `
  },
  {
    title: "Customization and extensions",
    keywords: ["custom", "customize", "change", "extra day", "extension", "beijing", "xian", "guilin", "chengdu", "suzhou"],
    html: `
      <p>The journey is private and customizable within the limits of supplier availability and route logic. Guests may request changes to pace, dining, room type, cultural experiences, shopping, rest time, or activities.</p>
      <p>Pre-tour and post-tour extensions can be quoted separately. Possible additions include extra Shanghai days, Suzhou, Nanjing, Huangshan, Beijing, Xi'an, Guilin/Yangshuo, or Chengdu.</p>
    `
  },
  {
    title: "Weather and route changes",
    keywords: ["weather", "rain", "change", "route", "season", "best time", "spring", "autumn", "fall", "winter", "summer"],
    html: `
      <p>Spring and autumn are often comfortable seasons for Jiangnan travel. Summer can be hot and rainy; winter is colder but may have fewer crowds.</p>
      <p>Images and routes are for reference only. Weather, traffic, supplier availability, and local conditions may require adjustments. Actual arrangements take priority.</p>
    `
  },
  {
    title: "When to book",
    keywords: ["book", "advance", "when", "lead time", "last minute", "peak season", "national day", "new year"],
    html: `
      <p>Recommended booking lead time is at least 6-8 weeks for standard dates and 10-12 weeks for peak seasons such as April-May, September-October, Chinese National Day week, or Chinese New Year period.</p>
      <p>Last-minute bookings may be possible but depend on hotel and vendor availability and may incur surcharges.</p>
    `
  },
  {
    title: "What happens after inquiry",
    keywords: ["after inquiry", "submit", "next step", "quote", "quotation", "booking process", "timeline"],
    html: `
      <p>After an inquiry, human support typically acknowledges the request within 24-48 hours, reviews dates and requirements, then prepares a preliminary quotation.</p>
      <p>After deposit and formal confirmation, the team develops a confirmed itinerary with specific hotels, restaurants, workshops, and pre-trip briefing documents.</p>
    `
  },
  {
    title: "When human support is required",
    keywords: ["human", "person", "agent", "support", "manual", "final", "commitment", "contract", "complex"],
    html: `
      <p>Please email human support for final pricing, specific dates, flights, visas, insurance, single occupancy, health conditions, mobility concerns, dietary allergies, refund requests, invoicing, payment, special celebrations, private groups, and complex customization.</p>
    `
  },
  {
    title: "Human support contact",
    keywords: ["contact", "email", "wechat", "phone", "call", "book", "booking", "question"],
    html: `
      <p>Email <strong>xletravels@gmail.com</strong> for booking-specific help.</p>
      <p>Please include traveler count, preferred dates, departure city, room preference, single-occupancy needs, dietary and mobility notes, and the questions you want answered. Phone or WeChat details may be provided after booking for urgent trip matters.</p>
    `
  }
];

const stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "can", "do", "does", "for", "from", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "this", "to", "what", "when", "where", "who", "with"]);

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !stopWords.has(word));
}

function score(answer, words) {
  const target = `${answer.title} ${answer.keywords.join(" ")} ${answer.html}`.toLowerCase();
  return words.reduce((total, word) => {
    if (answer.keywords.includes(word)) return total + 5;
    if (target.includes(word)) return total + 1;
    return total;
  }, 0);
}

function buildMailLink(question) {
  const body = [
    "China Cultural Wellness Journey question:",
    "",
    question || "",
    "",
    "Traveler count:",
    "Age range:",
    "Preferred dates:",
    "Departure city:",
    "Room preference / single occupancy needs:",
    "Dietary, mobility, or health notes:"
  ].join("\n");

  return `mailto:${supportEmail}?subject=China%20Cultural%20Wellness%20Journey%20Question&body=${encodeURIComponent(body)}`;
}

function renderAnswer(title, html, question, needsHuman) {
  return `
    <h3>${title}</h3>
    ${html}
    ${needsHuman ? "<p><strong>Next step:</strong> please confirm this with the team before booking, payment, or flight purchase.</p>" : ""}
    <div class="hero-actions">
      <a class="button primary" href="${buildMailLink(question)}">Email human support</a>
      <a class="button" href="../camp/China_Wellness_Cultural_Immersion_Retreat_10-Day_Program_EN.pdf">Open brochure</a>
    </div>
  `;
}

function respond(question) {
  const output = document.querySelector("#answer");
  const trimmed = question.trim();

  if (!trimmed) {
    output.innerHTML = "<h3>Ask about the journey</h3><p>Try questions about price, inclusions, room type, hotels, dining, private transfers, itinerary, mobility, visas, flights, wellness boundaries, or custom requests.</p>";
    return;
  }

  const words = normalize(trimmed);
  const ranked = retreatAnswers
    .map((answer) => ({ ...answer, score: score(answer, words) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const manualPattern = /final|exact|date|available|availability|refund|cancel|visa|medical|invoice|payment|contract|single|private|custom|allergy|mobility|doctor|flight|hotel|restaurant|child|emergency|insurance/i;
  const needsHuman = !best || best.score === 0 || manualPattern.test(trimmed);

  if (!best || best.score === 0) {
    output.innerHTML = renderAnswer(
      "Human support recommended",
      "<p>This question needs manual confirmation. Please email the team with traveler details and the specific question.</p>",
      trimmed,
      true
    );
    return;
  }

  output.innerHTML = renderAnswer(best.title, best.html, trimmed, needsHuman);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#qa-form");
  const textarea = document.querySelector("#question");
  const quickButtons = document.querySelectorAll("[data-question]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    respond(textarea.value);
  });

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      textarea.value = button.dataset.question;
      respond(textarea.value);
    });
  });
});
