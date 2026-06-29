const knowledgeBase = [
  {
    title: "Which camp should I choose?",
    keywords: ["choose", "recommend", "which", "difference", "program", "camp"],
    answer:
      "There are three brochure options: Youth AI & Robotics Camp for students interested in technology and project-based learning; Youth Cultural Exchange Camp for language, culture, city exploration, and peer exchange; and the 10-Day Adult Wellness & Cultural Immersion Retreat for adults seeking a slower travel, wellness, and culture experience."
  },
  {
    title: "What can students expect?",
    keywords: ["student", "youth", "teen", "robotics", "ai", "culture", "exchange"],
    answer:
      "Students can expect a structured international camp experience with supervised activities, daily schedules, orientation, safety briefings, cultural learning, and guided participation. Final details such as dates, pricing, accommodation, and admission requirements should be confirmed with the program team before payment."
  },
  {
    title: "What is included?",
    keywords: ["include", "included", "price", "fee", "meal", "hotel", "transport"],
    answer:
      "Inclusions may vary by camp. Typical items to confirm are accommodation, meals, local transport during scheduled activities, teaching or activity materials, entrance tickets, insurance, airport transfer, and bilingual support. Please check the selected brochure and ask the team for the latest quotation."
  },
  {
    title: "Can adults join?",
    keywords: ["adult", "wellness", "retreat", "parent", "family"],
    answer:
      "Adults should review the China Wellness Cultural Immersion Retreat brochure. Youth camps are designed for student participants, while adult travelers are better matched to the retreat-style itinerary."
  },
  {
    title: "How do I contact a person?",
    keywords: ["human", "email", "contact", "agent", "manual", "person", "help"],
    answer:
      "If the question needs manual support, email xletravels@gmail.com with the selected camp name, participant age, preferred travel dates, number of travelers, departure city, and your key questions."
  },
  {
    title: "What documents are needed?",
    keywords: ["visa", "passport", "document", "requirement", "admission", "apply"],
    answer:
      "Common preparation items include a valid passport, application information, emergency contact, health or allergy notes, payment confirmation, and any visa materials required for travel to China. Requirements can change, so the team should verify the latest checklist with each family."
  }
];

function scoreEntry(entry, words) {
  const haystack = `${entry.title} ${entry.keywords.join(" ")} ${entry.answer}`.toLowerCase();
  return words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
}

function answerQuestion(rawQuestion) {
  const question = rawQuestion.trim();
  const output = document.querySelector("#answer");

  if (!question) {
    output.innerHTML = "<h3>Start with a question</h3><p>Ask about camp selection, inclusions, documents, student safety, or how to contact a person.</p>";
    return;
  }

  const words = question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const ranked = knowledgeBase
    .map((entry) => ({ ...entry, score: scoreEntry(entry, words) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const fallback =
    "I do not have enough detail to answer that confidently from the current brochures. Please email xletravels@gmail.com and include the camp name, participant age, preferred dates, number of travelers, and your question.";

  output.innerHTML = `
    <h3>${best && best.score > 0 ? best.title : "Manual support recommended"}</h3>
    <p>${best && best.score > 0 ? best.answer : fallback}</p>
    <div class="action-row">
      <a class="button primary" href="mailto:xletravels@gmail.com?subject=Camp%20Question&body=${encodeURIComponent(question)}">Email human support</a>
      <a class="button" href="#brochures">View brochures</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#qa-form");
  const textarea = document.querySelector("#question");
  const chips = document.querySelectorAll("[data-question]");

  if (form && textarea) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      answerQuestion(textarea.value);
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      textarea.value = chip.dataset.question;
      answerQuestion(textarea.value);
    });
  });
});
