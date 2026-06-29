const retreatAnswers = [
  {
    title: "Suitability",
    keywords: ["suitable", "fit", "who", "parent", "adult", "senior", "slow", "pace"],
    html: `
      <p>This retreat is best for adult travelers who want a guided China experience with culture, wellness-oriented pacing, local learning, and calmer daily rhythm than a standard tour.</p>
      <ul>
        <li>Good fit: adults, couples, friends, small groups, wellness-minded travelers.</li>
        <li>Confirm first: mobility needs, dietary restrictions, hotel expectations, medical conditions, and preferred dates.</li>
        <li>Not ideal without manual review: travelers needing intensive medical care or fully private support.</li>
      </ul>
    `
  },
  {
    title: "Inclusions to Confirm",
    keywords: ["include", "included", "price", "fee", "cost", "hotel", "meal", "transport"],
    html: `
      <p>Inclusions must be confirmed against the current quotation. Typical items to verify are accommodation, meals, scheduled local transport, guided activities, entrance tickets, airport transfer, insurance, and bilingual support.</p>
      <p>For an accurate quote, email the preferred dates, number of travelers, room preference, and departure city.</p>
    `
  },
  {
    title: "Medical Boundary",
    keywords: ["medical", "therapy", "treatment", "doctor", "healing", "health", "condition", "medicine"],
    html: `
      <p>This should be presented as a wellness and cultural immersion retreat, not a medical treatment, therapy program, or clinical service.</p>
      <ul>
        <li>Do not promise health outcomes, diagnosis, treatment, or recovery.</li>
        <li>Travelers with medical conditions should consult their doctor before travel.</li>
        <li>Any health, medication, mobility, allergy, or accessibility concern should be escalated to human support.</li>
      </ul>
    `
  },
  {
    title: "Documents and Travel Preparation",
    keywords: ["passport", "visa", "document", "entry", "insurance", "prepare"],
    html: `
      <p>Common preparation items include a valid passport, China entry or visa documents where required, emergency contact, insurance, health notes, allergy information, and payment confirmation.</p>
      <p>Entry requirements can change, so the team should confirm the latest checklist before booking.</p>
    `
  },
  {
    title: "Mobility and Pace",
    keywords: ["walk", "walking", "mobility", "wheelchair", "pace", "tired", "age"],
    html: `
      <p>The retreat is intended to be gentler than a high-intensity sightseeing trip, but travelers may still need to walk, use stairs, board vehicles, and join scheduled activities.</p>
      <p>Share any mobility limits before booking so the team can confirm whether the itinerary, hotel, and transport are suitable.</p>
    `
  },
  {
    title: "Food and Dietary Needs",
    keywords: ["food", "meal", "diet", "vegetarian", "allergy", "halal", "kosher"],
    html: `
      <p>Dietary needs should be collected early and confirmed with local suppliers. The team should know allergies, vegetarian preference, religious dietary restrictions, food intolerances, and any medical diet requirements.</p>
    `
  },
  {
    title: "Human Support",
    keywords: ["human", "person", "contact", "email", "agent", "manual", "book", "booking"],
    html: `
      <p>Email xletravels@gmail.com for booking-specific help. Include traveler age range, preferred travel dates, number of travelers, departure city, room preference, mobility or dietary needs, and the question.</p>
    `
  }
];

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function score(answer, words) {
  const target = `${answer.title} ${answer.keywords.join(" ")} ${answer.html}`.toLowerCase();
  return words.reduce((total, word) => total + (target.includes(word) ? 1 : 0), 0);
}

function buildMailLink(question) {
  const body = [
    "Adult Wellness Cultural Immersion Retreat question:",
    "",
    question || "",
    "",
    "Traveler age range:",
    "Preferred dates:",
    "Number of travelers:",
    "Departure city:",
    "Mobility/dietary/health notes:"
  ].join("\n");

  return `mailto:xletravels@gmail.com?subject=Adult%20Wellness%20Retreat%20Question&body=${encodeURIComponent(body)}`;
}

function respond(question) {
  const output = document.querySelector("#answer");
  const trimmed = question.trim();

  if (!trimmed) {
    output.innerHTML = "<h3>Ask about the adult wellness retreat</h3><p>Try questions about suitability, pace, inclusions, documents, food, medical boundaries, or manual support.</p>";
    return;
  }

  const words = normalize(trimmed);
  const ranked = retreatAnswers
    .map((answer) => ({ ...answer, score: score(answer, words) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const needsHuman = !best || best.score === 0 || /price|date|refund|visa|medical|invoice|custom|private/i.test(trimmed);
  const title = needsHuman && (!best || best.score === 0) ? "Human support recommended" : best.title;
  const html = best && best.score > 0
    ? best.html
    : "<p>This question needs manual confirmation. Please email the team with traveler details and the specific question.</p>";

  output.innerHTML = `
    <h3>${title}</h3>
    ${html}
    ${needsHuman ? "<p><strong>Next step:</strong> send this to the team for confirmation before booking.</p>" : ""}
    <div class="hero-actions">
      <a class="button primary" href="${buildMailLink(trimmed)}">Email human support</a>
      <a class="button" href="../camp/China_Wellness_Cultural_Immersion_Retreat_10-Day_Adult_Camp.pdf">Open brochure</a>
    </div>
  `;
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
