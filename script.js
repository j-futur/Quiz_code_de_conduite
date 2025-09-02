// =========================================================
//  Quiz Code de Conduite – Firestore Edition
// =========================================================

// Import ciblé (via CDN déjà chargée dans firebase-config.js)
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Référence Firestore
const resultsCol = collection(window.db, "results");

// =========================================================
//  Chargement des questions depuis questions.he
// =========================================================
let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch('questions.he');
        if (!response.ok) throw new Error('Erreur lors du chargement de questions.he');
        const hexData = await response.text();
        const jsonString = new TextDecoder().decode(
            Uint8Array.from(hexData.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
        );
        questions = JSON.parse(jsonString);
        console.log('Questions chargées avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement des questions:', error);
        alert('Erreur lors du chargement des questions. Veuillez réessayer.');
    }
}

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
    await loadQuestions();
    await updateStats();
    // await checkIfAlreadyCompleted();
    await displayQuestionAnalysis();
});

// =========================================================
//  Vérifie si l’agent a déjà terminé
// =========================================================
// async function checkIfAlreadyCompleted() {
//     const matricule = document.getElementById("matricule").value.trim();
//     if (!matricule) return;

//     const snap = await getDocs(resultsCol);
//     const existing = snap.docs.find(d => d.data().matricule === matricule);

//     if (existing) {
//         document.getElementById("previousScore").textContent = scoreToText(existing.data().score20);
//         document.getElementById("userInfoSection").style.display = "none";
//         document.getElementById("quizCompletedSection").style.display = "block";
//     }
// }

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

    // Vérification si l'agent a déjà fait le Quiz (déjà fait mais double sécurité) 
    const q = query(resultsCol, where("matricule", "==", matricule));
    const snap = await getDocs(q);

    if (!snap.empty) {
        const previousScore = snap.docs[0].data().score20;
        document.getElementById("previousScore").textContent = `${previousScore}`;
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
    const score20 = convertScoreTo20(pct);

    const agentResult = {
        matricule: userInfo.matricule,
        genre: userInfo.genre,
        age: userInfo.age,
        score: pct,
        score20,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date(),
        questionResults: questions.map((q, i) => ({
            questionId: i,
            questionText: q.question,
            isCorrect: corrections[i].isCorrect,
            userAnswers: currentAnswers[i],
            correctAnswers: q.correct
        }))
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
    const men = agents.filter(a => a.genre === "Masculin");
    const over = agents.filter(a => a.age >= 40);
    const under = agents.filter(a => a.age < 40);

    const avg = arr => (arr.length ? Math.round(arr.reduce((s, a) => s + a.score20, 0) / arr.length) : 0);

    document.getElementById("totalCompleted").textContent = total;
    document.getElementById("averageWomen").textContent = scoreToText(avg(women));
    document.getElementById("averageMen").textContent = scoreToText(avg(men));
    document.getElementById("averageOver40").textContent = scoreToText(avg(over));
    document.getElementById("averageUnder40").textContent = scoreToText(avg(under));
}

// =========================================================
//  Analyse des questions (meilleure et pire question)
// =========================================================
async function analyzeQuestionPerformance() {
    const snap = await getDocs(resultsCol);
    const allResults = snap.docs.map(d => d.data());
    
    if (allResults.length === 0) {
        console.log("Aucune donnée disponible pour l'analyse");
        return null;
    }

    // Analyser les taux de réussite par question
    const questionStats = {};
    
    allResults.forEach(result => {
        if (result.questionResults) {
            result.questionResults.forEach(qr => {
                if (!questionStats[qr.questionId]) {
                    questionStats[qr.questionId] = {
                        questionText: qr.questionText,
                        correct: 0,
                        total: 0
                    };
                }
                questionStats[qr.questionId].total++;
                if (qr.isCorrect) {
                    questionStats[qr.questionId].correct++;
                }
            });
        }
    });

    // Calculer les taux de réussite
    const questionStatsWithRate = Object.entries(questionStats).map(([id, stats]) => ({
        questionId: parseInt(id),
        questionText: stats.questionText,
        correct: stats.correct,
        total: stats.total,
        successRate: Math.round((stats.correct / stats.total) * 100)
    }));

    // Trier par taux de réussite
    questionStatsWithRate.sort((a, b) => b.successRate - a.successRate);

    const bestQuestion = questionStatsWithRate[0];
    const worstQuestion = questionStatsWithRate[questionStatsWithRate.length - 1];

    return {
        bestQuestion,
        worstQuestion,
        allStats: questionStatsWithRate
    };
}

// Afficher l'analyse des questions dans l'onglet statistiques
async function displayQuestionAnalysis() {
    const analysis = await analyzeQuestionPerformance();
    
    if (!analysis) return;

    const statsTab = document.getElementById("stats-tab");
    
    // Créer ou mettre à jour la section d'analyse
    let analysisSection = document.getElementById("questionAnalysis");
    if (!analysisSection) {
        analysisSection = document.createElement("div");
        analysisSection.id = "questionAnalysis";
        analysisSection.style.marginTop = "40px";
        analysisSection.innerHTML = `
            <h3 style="text-align:center;margin-bottom:20px;color:#2c3e50;">📊 Analyse des Questions</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" id="bestQuestionRate">0%</div>
                    <div class="stat-label">Meilleure question</div>
                    <div id="bestQuestionText" style="font-size:0.8em;margin-top:5px;color:#666;"></div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="worstQuestionRate">0%</div>
                    <div class="stat-label">Pire question</div>
                    <div id="worstQuestionText" style="font-size:0.8em;margin-top:5px;color:#666;"></div>
                </div>
            </div>
            <div id="detailedAnalysis" style="margin-top:20px;"></div>
        `;
        statsTab.appendChild(analysisSection);
    }

    // Mettre à jour les statistiques
    document.getElementById("bestQuestionRate").textContent = `${analysis.bestQuestion.successRate}%`;
    document.getElementById("bestQuestionText").textContent = `Q${analysis.bestQuestion.questionId + 1}: ${analysis.bestQuestion.questionText.substring(0, 50)}...`;
    
    document.getElementById("worstQuestionRate").textContent = `${analysis.worstQuestion.successRate}%`;
    document.getElementById("worstQuestionText").textContent = `Q${analysis.worstQuestion.questionId + 1}: ${analysis.worstQuestion.questionText.substring(0, 50)}...`;

    // Afficher l'analyse détaillée
    const detailedDiv = document.getElementById("detailedAnalysis");
    detailedDiv.innerHTML = `
        <h4 style="margin:20px 0 10px;color:#2c3e50;">Détail par question :</h4>
        <div style="max-height:300px;overflow-y:auto;border:1px solid #ddd;border-radius:5px;padding:10px;">
            ${analysis.allStats.map(stat => `
                <div style="margin-bottom:10px;padding:8px;background:${stat.successRate >= 70 ? '#d4edda' : stat.successRate >= 50 ? '#fff3cd' : '#f8d7da'};border-radius:3px;">
                    <strong style="color:#2c3e50;">Question ${stat.questionId + 1}:</strong>
                    <span style="font-weight:bold;color:${stat.successRate >= 70 ? '#155724' : stat.successRate >= 50 ? '#856404' : '#721c24'}">
                        ${stat.correct}/${stat.total} (${stat.successRate}%)
                    </span>
                    <br><small style="color:#666;">${stat.questionText.substring(0, 80)}...</small>
                </div>
            `).join('')}
        </div>
    `;
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


// Quiz términé, fermeture avec effet fondu
function closeQuiz() {
  if (confirm("Êtes-vous sûr de vouloir fermer le quiz ?")) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "thanks.html";
    }, 1000); // délai pour laisser le temps à l'effet
  }
}


// Rendre les fonctions globales pour les onclick HTML
window.showTab = showTab;
window.startQuiz = startQuiz;
window.closeQuiz = closeQuiz;
window.saveAnswer = saveAnswer;
window.submitQuiz = submitQuiz;

// Sécurité de la page 
import { initLockProtection } from './lockProtection.js';
initLockProtection();