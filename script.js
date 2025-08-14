// =========================================================
//  Quiz Code de Conduite – Firestore Edition
// =========================================================

// Import ciblé (via CDN déjà chargée dans firebase-config.js)
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Référence Firestore
const resultsCol = collection(window.db, "results");

// =========================================================
//  Base de données des questions
// =========================================================
const questions = [ 
    {
        question: "Les procédures actuelles marchent et vous obtenez des résultats. Quelle attitude adoptez-vous ?",
        answers: [
            "Vous ne vous limitez pas aux instructions et prenez l'initiative de proposer des améliorations pour anticiper le futur",
            "Vous vous limitez aux instructions et ne prenez aucune initiative car chercher d'autres solutions n'a pas été demandé",
            "Vous attendez les directives de votre supérieur avant toute action"
        ],
        correct: 0,
        explanation: "L'excellence implique de ne pas se limiter aux instructions et de prendre l'initiative de proposer des améliorations pour anticiper le futur. (Art.3 - Excellence)"
    },
    {
        question: "Un collègue d'une autre division est débordé de travail urgent mais voudrait quand même rentrer à 16h comme tout le monde. Que faites-vous ?",
        answers: [
            "Il s'agit d'être solidaire : vous connaissez le supérieur hiérarchique et vous lui dites que personne ne devrait travailler au-delà de 16h",
            "Il s'agit d'être solidaire : vous proposez car vous connaissez le domaine pour finir avant 16h",
            "Vous restez neutre car ce n'est pas votre responsabilité"
        ],
        correct: 1,
        explanation: "La solidarité consiste à proposer son aide pour résoudre le problème de façon constructive, en utilisant ses compétences. (Art.4 - Solidarité)"
    },
    {
        question: "Lequel de ces points marque le plus la loyauté et l'honnêteté dans l'Administration ?",
        answers: [
            "Respect du devoir de réserve - Éviter toute critique publique de l'administration ou de ses dirigeants",
            "Respect des décisions prises collectivement - Même si on y était opposé initialement",
            "Protection des intérêts de l'État - Agir dans l'intérêt général, sans favoritisme ni détournement",
            "Engagement à long terme – Fidélité à la mission du service public, même dans l'adversité."
        ],
        correct: [0, 1, 2, 3],
        multiple: true,
        explanation: "La protection des intérêts de l'État représente l'essence même de la loyauté dans l'administration. (Art.5 - Loyauté et honnêteté)"
    },
    {
        question: "Vous arrivez à 08h sans faute et sortez à 16h. Personne ne doit vous reprocher de ne pas travailler ni mentionner un défaut d'assiduité et ponctualité.",
        answers: [
            "VRAI - Respecter les horaires suffit",
            "FAUX - Il faut aussi remplir convenablement ses tâches",
        ],
        correct: 1,
        explanation: "La 2ème partie de l'article 6 précise que remplir les 08 heures par jour ne suffit pas, il faut aussi remplir convenablement ses tâches. (Art.6 - Assiduité et ponctualité)"
    },
    {
        question: "Un cousin opérateur économique vous demande le nombre des véhicules importés en provenance de Corée du Sud, sans toutefois demander précision des noms des importateurs. Puisqu'il s'agit d'information non confidentielle, prendrez-vous la décision de lui fournir ces informations ?",
        answers: [
            "Oui",
            "Non",
        ],
        correct: 1,
        explanation: "Toutes les informations traitées par la Douane sont d'office confidentielles. Le Code des Douanes ajoute en son article 45.2 que la communication de ces informations ne peut être effectuée qu'à des fonctionnaires remplissant au moins la fonction de Directeur. (Art.7 - Confidentialité)"
    },
    {
        question: "La tenue réglementaire n°11 est composée d'une chemise manche longue avec patte d'épaule et d'un pantalon gris clair avec barre de commandement ou passepoil. Votre pantalon est indisponible car taché. Vous le remplacez par un pantalon de même couleur lors de la levée de drapeau du lundi.",
        answers: [
            "OUI je peux porter ce pantalon de substitution",
            "NON je ne peux pas porter ce pantalon de substitution",
        ],
        correct: 1,
        explanation: "L'uniforme reflète l'identité de la Douane en tant qu'entité paramilitaire et il est strictement interdit de prendre des libertés sur sa composition. (Art.8 - Port de l'uniforme)"
    },
    {
        question: "Lors d'une passation entre deux chefs de poste, aucune procédure n'a été écrite concernant une tâche particulière. Que faites-vous ?",
        answers: [
            "Vous écrivez une procédure simple et compréhensible et vous l'envoyez pour validation définitive auprès de votre Receveur",
            "Vous continuez à appliquer les principes de travail de votre prédécesseur car ces pratiques sont déjà appliquées depuis longtemps",
            "Vous demandez des instructions à votre hiérarchie"
        ],
        correct: 0,
        explanation: "La transparence exige la formalisation des procédures par écrit pour assurer la continuité et la clarté du service. (Art.9 - Transparence)"
    },
    {
        question: "L'Administration garantit l'indépendance et la sécurité des agents rigoureux face aux trafics d'influence.",
        answers: [
            "Lorsque des procédures simples et transparentes ont été écrites sur chaque poste et action",
            "Lorsque l'agent a suivi ces procédures à 100%",
        ],
        correct: [0, 1],
        multiple: true,
        explanation: "L'indépendance est garantie à la fois par l'existence de procédures claires et par le strict respect de ces procédures par l'agent. (Art.10, 31 et 36 - Indépendance)"
    },
    {
        question: "Un quota est établi pour la nomination des femmes aux postes de responsabilité car elles sont moins efficientes que les hommes à cause des congés de maternité et permission pour assistance maternelle.",
        answers: [
            "VRAI",
            "FAUX",
        ],
        correct: 1,
        explanation: "Les hommes et les femmes sont traités sans discrimination au niveau de l'Administration des Douanes. (Art.11 - Impartialité et objectivité)"
    },
    {
        question: "L'ancien agent des douanes ne doit pas agir pour le compte de quelque personne ou entité que ce soit dans une affaire pour laquelle il ou elle était intervenue en tant que douanier pendant combien d'année après la cessation de fonction ?",
        answers: [
            "2 ans",
            "3 ans",
        ],
        correct: 0,
        explanation: "L'interdiction d'intervention dans les affaires traitées s'étend sur une période de 2 ans après la cessation de fonction. (Art.13 - Cessation de fonction)"
    },
    {
        question: "L'exécution fidèle des instructions reçues, même sans surveillance directe, est une des meilleures marques de respect de l'autorité hiérarchique.",
        answers: [
            "VRAI",
            "FAUX",
        ],
        correct: 0,
        explanation: "L'exécution fidèle des instructions, même sans surveillance, démontre le professionnalisme et le respect de l'autorité hiérarchique. (Art.17 - Exécution du service)"
    },
    {
        question: "Est-ce qu'un agent de constatation des douanes en charge du contrôle au scanner doit obéir à une instruction donnée par le Ministre en charge de la sécurité publique qui visite l'aéroport ?",
        answers: [
            "Oui",
            "Non",
        ],
        correct: 1,
        explanation: "L'agent des douanes ne doit obéissance qu'à ses supérieurs hiérarchiques directs. Dans cette situation exceptionnelle, l'agent doit prendre note des demandes puis rendre compte immédiatement pour obtenir la conduite à tenir. (Art.20 - Hiérarchie)"
    },
    {
        question: "Le Ministre en charge des Douanes ordonne par téléphone la réduction des amendes à infliger à un contrevenant car ce dernier a déposé auprès du Ministre les preuves de non intention de fraude. Allez-vous procéder à l'exécution ou non ?",
        answers: [
            "Oui",
            "Non",
        ],
        correct: 0,
        explanation: "Un ordre donné par le Ministre en charge des Douanes est toujours un ordre officiel, même si l'urgence a conduit le Ministre à le faire par téléphone. Les preuves de non infraction sont prévues par le Code des Douanes, notamment en son article 318. (Art.22 - Ordre illicite)"
    },
    {
        question: "Dans votre famille, certains adoptent les couleurs politiques du pouvoir en place, d'autres désapprouvent. Quelle attitude adoptez-vous au bureau ?",
        answers: [
            "En tant qu'agent des douanes, vous adoptez une neutralité politique",
            "En tant qu'agent des douanes, vous êtes aussi un citoyen et affichez votre position politique au bureau",
        ],
        correct: 0,
        explanation: "Vos opinions personnelles ne peuvent interférer avec vos devoirs. La neutralité politique est obligatoire dans l'exercice des fonctions. (Art.23 - Neutralité)"
    },
    {
        question: "En marge de mes attributions en tant qu'agent des douanes, l'enseignement est-il autorisé car c'est une activité lucrative n'ayant aucune interférence par rapport aux missions de la douane ?",
        answers: [
            "Oui, car l'enseignement est conforme à l'article 12 du Statut Général des Fonctionnaires",
            "Non, car l'agent des douanes est déjà rémunéré en tant que fonctionnaire et ne doit recevoir aucune autre compensation numéraire",
        ],
        correct: 0,
        explanation: "Sous réserve que l'emploi du temps à l'extérieur ne défavorise pas les missions prioritaires de l'agent au sein de la douane.  (Art.27 - Incompatibilité)"
    },
    {
        question: "Une franche collaboration professionnelle doit demeurer entre l'agent des douanes et les agents des autres administrations avec respect mutuel et considération.",
        answers: [
            "Oui, l'intérêt de l'État prime",
            "Oui, mais uniquement lorsque mes intérêts personnels ne sont pas compromis",
        ],
        correct: 0,
        explanation: "La gestion coordonnée des frontières a été établie en ce sens et des procédures doivent être écrites sur cette collaboration.  (Art.30 - Collaboration avec les autres administrations)"
    },
    {
        question: "L'agent des douanes doit exercer son pouvoir en autorité régalienne de l'État, ne doit montrer aucun signe de faiblesse ni signes de sympathie.",
        answers: [
            "Oui, car la douane doit être crainte et prise au sérieux pour avoir des résultats",
            "Non, car la douane doit être courtoise et éviter les abus de fonction tout en étant rigoureuse et professionnelle",
        ],
        correct: 1,
        explanation: "L'équilibre délicat entre contrôle et facilitation est toujours recherché dans chaque action de la douane.  (Art.32 et 33 - Relation avec les usagers)"
    },
    {
        question: "La nouvelle année 2026 est proche et les cadeaux figurent dans les us et coutumes malagasy. Lequel de ces cadeaux vous semble acceptable ?",
        answers: [
            "Un agenda, un calendrier ou des goodies marquant la nouvelle année",
            "Une Bouteille Johnnie Walker Gold Label Reserve",
            "Un bon d'achat dans un magasin"
        ],
        correct: 0,
        explanation: "Le prix de la bouteille d'alcool est important et peut créer un sentiment de redevabilité. Seuls les cadeaux de valeur symbolique sont acceptables.  (Art.34 - Cadeaux, faveurs, gratifications)"
    },
    {
        question: "Si j'ai un membre de votre famille qui travaille en tant que transitaire, est-ce que vous devez en informer l'Administration ?",
        answers: [
            "Oui, l'initiative doit venir de l'agent",
            "Oui, mais seulement si on me le demande",
            "Non, c'est de la vie privée"
        ],
        correct: 0,
        explanation: "L'initiative doit venir de l'agent. Le supérieur hiérarchique prendra la responsabilité de continuer à faire confiance à l'agent ou de le disqualifier temporairement."
    }
];


// =========================================================
//  Utilitaires
// =========================================================
function convertScoreTo20(pct) {
  return Math.round((pct * 20) / 100);
}
function scoreToText(s20) {
  return s20 + "/20";
}

// =========================================================
//  Initialisation
// =========================================================
document.addEventListener("DOMContentLoaded", async () => {
  await updateStats();
  await checkIfAlreadyCompleted();
});

// =========================================================
//  Vérifie si l’agent a déjà terminé
// =========================================================
async function checkIfAlreadyCompleted() {
  const matricule = document.getElementById("matricule").value.trim();
  if (!matricule) return;

  const snap = await getDocs(resultsCol);
  const existing = snap.docs.find(d => d.data().matricule === matricule);

  if (existing) {
    document.getElementById("previousScore").textContent = scoreToText(existing.data().score20);
    document.getElementById("userInfoSection").style.display = "none";
    document.getElementById("quizCompletedSection").style.display = "block";
  }
}

// =========================================================
//  Démarrer le quiz
// =========================================================
let userInfo = null;
let currentAnswers = {};

async function startQuiz() {
  const matricule = document.getElementById("matricule").value.trim();
  const genre = document.getElementById("genre").value;
  const age = parseInt(document.getElementById("age").value, 10);

  if (!/^\d{6}$/.test(matricule) || !genre || isNaN(age) || age < 18 || age > 65) {
    alert("⚠️ Matricule 6 chiffres, genre et âge 18-65 ans requis.");
    return;
  }

  // Vérif (déjà fait mais double sécurité)
  const snap = await getDocs(resultsCol);
  if (snap.docs.some(d => d.data().matricule === matricule)) {
    document.getElementById("previousScore").textContent = "déjà réalisé";
    document.getElementById("userInfoSection").style.display = "none";
    document.getElementById("quizCompletedSection").style.display = "block";
    return;
  }

  userInfo = { matricule, genre, age };
  currentAnswers = {};

  document.getElementById("userInfoSection").style.display = "none";
  document.getElementById("quizForm").style.display = "block";
  generateQuiz();
  generateProgressBar();
}

// =========================================================
//  Génération UI
// =========================================================
function generateQuiz() {
  const form = document.getElementById("quizForm");
  let html = "";

  questions.forEach((q, i) => {
    html += `
      <div class="question-container">
        <div class="question"><strong>Question ${i + 1}:</strong> ${q.question}
          ${q.multiple ? '<span style="color:#3498db;font-size:.9em;"> (Choisir une ou plusieurs)</span>' : ""}
        </div>
        <div class="answers">
        ${q.answers.map((a, idx) => `
          <label class="answer-option">
            <input type="${q.multiple ? "checkbox" : "radio"}" name="question${i}" value="${idx}"
                   onchange="saveAnswer(${i}, ${idx})">
            <span>${a}</span>
          </label>`).join("")}
        </div>
      </div>`;
  });

  html += '<button type="button" class="submit-btn" onclick="submitQuiz()">Envoyer mes réponses</button>';
  form.innerHTML = html;
}

// Barre de progression
function generateProgressBar() {
  const pc = document.getElementById("progressContainer");
  pc.innerHTML = questions.map((_, i) => `<div class="progress-square" id="progressSquare${i}"></div>`).join("");
  updateProgressBar();
}
function updateProgressBar() {
  questions.forEach((_, i) => {
    const sq = document.getElementById(`progressSquare${i}`);
    if (!sq) return;
    const answered = currentAnswers[i] !== undefined && (Array.isArray(currentAnswers[i]) ? currentAnswers[i].length : true);
    sq.classList.toggle("answered", answered);
  });
}

// Sauvegarde réponse
function saveAnswer(qIdx, aIdx) {
  const q = questions[qIdx];
  if (q.multiple) {
    if (!Array.isArray(currentAnswers[qIdx])) currentAnswers[qIdx] = [];
    const inp = document.querySelector(`input[name="question${qIdx}"][value="${aIdx}"]`);
    if (inp.checked) {
      if (!currentAnswers[qIdx].includes(aIdx)) currentAnswers[qIdx].push(aIdx);
    } else {
      currentAnswers[qIdx] = currentAnswers[qIdx].filter(x => x !== aIdx);
    }
  } else {
    currentAnswers[qIdx] = aIdx;
  }
  updateProgressBar();
}

// =========================================================
//  Soumission finale
// =========================================================
async function submitQuiz() {
  if (Object.keys(currentAnswers).length < questions.length) {
    alert("⚠️ Veuillez répondre à toutes les questions.");
    return;
  }

  let correct = 0;
  const corrections = [];

  questions.forEach((q, i) => {
    const userAns = currentAnswers[i];
    let ok;
    if (q.multiple) {
      const ua = Array.isArray(userAns) ? userAns : [];
      ok = q.correct.length === ua.length && q.correct.every(c => ua.includes(c));
    } else {
      ok = userAns === q.correct;
    }
    if (ok) correct++;

    corrections.push({
      question: q.question,
      userAnswer: q.multiple
        ? (Array.isArray(userAns) ? userAns.map(a => q.answers[a]).join(", ") : "Aucune")
        : q.answers[userAns],
      correctAnswer: q.multiple
        ? q.correct.map(a => q.answers[a]).join(", ")
        : q.answers[q.correct],
      isCorrect: ok,
      explanation: q.explanation
    });
  });

  const pct = Math.round((correct / questions.length) * 100);
  //const score20 = convertScoreTo20(pct);
  const score20 = Number(((pct * 20) / 100).toFixed(1));  // 1 décimale

  const agentResult = {
    matricule: userInfo.matricule,
    genre: userInfo.genre,
    age: userInfo.age,
    score: pct,
    score20,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date()
  };

  await addDoc(resultsCol, agentResult);

  displayResults(score20, corrections);
  await updateStats();
}

// Affichage des résultats
function displayResults(score20, corrections) {
  const scoreText = document.getElementById("scoreText");
  const scoreCircle = document.getElementById("scoreCircle");
  const scoreMessage = document.getElementById("scoreMessage");
  const correctionsDiv = document.getElementById("corrections");

  scoreText.textContent = scoreToText(score20);
  scoreCircle.className = "score-circle";
  if (score20 >= 16) {
    scoreCircle.classList.add("score-excellent");
    scoreMessage.textContent = "🎉 Excellent ! Félicitations !";
  } else if (score20 >= 14) {
    scoreCircle.classList.add("score-good");
    scoreMessage.textContent = "👍 Bien ! Continuez vos efforts.";
  } else {
    scoreCircle.classList.add("score-poor");
    scoreMessage.textContent = "📚 À améliorer. Révisez le code de conduite.";
  }

  let html = "<h3 style='margin-bottom:20px;color:#2c3e50;'>📋 Corrections Détaillées</h3>";
  corrections.forEach((c, i) => {
    html += `
      <div class="correction-item ${c.isCorrect ? "correct" : ""}">
        <h4 style="color:${c.isCorrect ? "#27ae60" : "#e74c3c"}">${c.isCorrect ? "✅" : "❌"} Question ${i + 1}</h4>
        <p><strong>Question :</strong> ${c.question}</p>
        <p><strong>Votre réponse :</strong> ${c.userAnswer}</p>
        ${!c.isCorrect ? `<p><strong>Bonne réponse :</strong> ${c.correctAnswer}</p>` : ""}
        <p style="background:#f8f9fa;padding:10px;border-radius:5px"><strong>Explication :</strong> ${c.explanation}</p>
      </div>`;
  });
  correctionsDiv.innerHTML = html;

  document.getElementById("quizForm").style.display = "none";
  document.getElementById("results").style.display = "block";
}

// =========================================================
//  Stats dynamiques
// =========================================================
async function updateStats() {
  const snap = await getDocs(resultsCol);
  const agents = snap.docs.map(d => d.data());

  const total = agents.length;
  const women = agents.filter(a => a.genre === "Féminin");
  const men   = agents.filter(a => a.genre === "Masculin");
  const over  = agents.filter(a => a.age >= 40);
  const under = agents.filter(a => a.age < 40);

  const avg = arr => (arr.length ? Math.round(arr.reduce((s, a) => s + a.score20, 0) / arr.length) : 0);

  document.getElementById("totalCompleted").textContent   = total;
  document.getElementById("averageWomen").textContent     = scoreToText(avg(women));
  document.getElementById("averageMen").textContent       = scoreToText(avg(men));
  document.getElementById("averageOver40").textContent    = scoreToText(avg(over));
  document.getElementById("averageUnder40").textContent   = scoreToText(avg(under));
}

// =========================================================
//  Navigation & fermeture
// =========================================================
function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
  document.getElementById(tabName + "-tab").classList.add("active");
  event.target.classList.add("active");
}

function closeQuiz() {
  if (confirm("Êtes-vous sûr de vouloir fermer le quiz ?")) {
    window.location.href = "thanks.html";
  }
}

// Rendre les fonctions globales pour les onclick HTML
window.showTab   = showTab;
window.startQuiz = startQuiz;
window.closeQuiz = closeQuiz;
window.saveAnswer = saveAnswer;   
window.submitQuiz = submitQuiz

