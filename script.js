 // Base de données des questions - ARRÊTÉ 5886/2008 DU 06 MARS 2008
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

// Variables pour stocker les données
let currentAnswers = {};
let userInfo = null;
let quizResults = JSON.parse(localStorage.getItem('quizResults')) || {
    completedAgents: [],
    scores: []
};

// Conversion score sur 20
function convertScoreTo20(percentage) {
    return Math.round((percentage * 20) / 100);
}

// Conversion score sur 20 vers texte
function scoreToText(score20) {
    return score20 + "/20";
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    checkIfAlreadyCompleted();
});

// Vérifier si l'agent a déjà complété le quiz
function checkIfAlreadyCompleted() {
    // Cette fonction sera appelée après la saisie du matricule
}

// Démarrer le quiz
function startQuiz() {
    const matricule = document.getElementById('matricule').value.trim();
    const genre = document.getElementById('genre').value;
    const age = parseInt(document.getElementById('age').value, 10);

    if (!(/^\d{6}$/.test(matricule)) || !genre || isNaN(age) || age < 18 || age > 65) {
        alert("⚠️ Matricule 6 chiffres, genre et âge 18-65 ans requis.");
        return;
    }

    // Vérifier si l'agent a déjà passé le quiz
    const existingAgent = quizResults.completedAgents.find(agent => agent.matricule === matricule);
    if (existingAgent) {
        document.getElementById('previousScore').textContent = scoreToText(existingAgent.score20);
        document.getElementById('userInfoSection').style.display = 'none';
        document.getElementById('quizCompletedSection').style.display = 'block';
        return;
    }

    userInfo = { matricule, genre, age };
    
    // Réinitialiser les réponses
    currentAnswers = {};
    
    document.getElementById('userInfoSection').style.display = 'none';
    document.getElementById('quizForm').style.display = 'block';
    generateQuiz();
    generateProgressBar();
}

// Génération du quiz
function generateQuiz() {
    const form = document.getElementById('quizForm');
    let html = '';

    questions.forEach((q, index) => {
        html += `
            <div class="question-container">
                <div class="question">
                    <strong>Question ${index + 1}:</strong> ${q.question}
                    ${q.multiple ? '<span style="color: #3498db; font-size: 0.9em;"> (Choisir une ou plusieurs réponses)</span>' : ''}
                </div>
                <div class="answers">
                    ${q.answers.map((answer, ansIndex) => `
                        <label class="answer-option">
                            <input type="${q.multiple ? 'checkbox' : 'radio'}" name="question${index}" value="${ansIndex}" 
                                    onchange="saveAnswer(${index}, ${ansIndex})">
                            <span>${answer}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += '<button type="button" class="submit-btn" onclick="submitQuiz()">Envoyer mes réponses</button>';
    form.innerHTML = html;
}

// Génération de la barre de progression
function generateProgressBar() {
    const progressContainer = document.getElementById('progressContainer');
    let html = '';
    questions.forEach((_, index) => {
        html += `<div class="progress-square" id="progressSquare${index}"></div>`;
    });
    progressContainer.innerHTML = html;
    updateProgressBar();
}

// Mise à jour de la barre de progression
function updateProgressBar() {
    questions.forEach((_, index) => {
        const square = document.getElementById(`progressSquare${index}`);
        if (square) {
            if (currentAnswers[index] !== undefined && 
                (Array.isArray(currentAnswers[index]) ? currentAnswers[index].length > 0 : true)) {
                square.classList.add('answered');
            } else {
                square.classList.remove('answered');
            }
        }
    });
}

// Sauvegarde des réponses
function saveAnswer(questionIndex, answerIndex) {
    const question = questions[questionIndex];
    if (question.multiple) {
        if (!Array.isArray(currentAnswers[questionIndex])) {
            currentAnswers[questionIndex] = [];
        }
        const input = document.querySelector(`input[name="question${questionIndex}"][value="${answerIndex}"]`);
        if (input.checked) {
            if (!currentAnswers[questionIndex].includes(answerIndex)) {
                currentAnswers[questionIndex].push(answerIndex);
            }
        } else {
            currentAnswers[questionIndex] = currentAnswers[questionIndex].filter(ans => ans !== answerIndex);
        }
    } else {
        currentAnswers[questionIndex] = answerIndex;
    }
    updateProgressBar();
}

// Soumission du quiz
function submitQuiz() {
    if (Object.keys(currentAnswers).length < questions.length) {
        alert('⚠️ Veuillez répondre à toutes les questions avant de soumettre.');
        return;
    }

    let correct = 0;
    let corrections = [];

    questions.forEach((q, index) => {
        const userAnswer = currentAnswers[index];
        let isCorrect;

        if (q.multiple) {
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
            isCorrect = q.correct.length === userAnswers.length &&
                        q.correct.every(correctAns => userAnswers.includes(correctAns)) &&
                        userAnswers.every(ans => q.correct.includes(ans));
        } else {
            isCorrect = userAnswer === q.correct;
        }

        if (isCorrect) {
            correct++;
        }

        corrections.push({
            question: q.question,
            userAnswer: q.multiple ? (Array.isArray(userAnswer) ? userAnswer.map(ans => q.answers[ans]).join(', ') : 'Aucune réponse') : q.answers[userAnswer],
            correctAnswer: q.multiple ? q.correct.map(ans => q.answers[ans]).join(', ') : q.answers[q.correct],
            isCorrect: isCorrect,
            explanation: q.explanation
        });
    });

    const scorePercentage = Math.round((correct / questions.length) * 100);
    const score20 = convertScoreTo20(scorePercentage);

    // Sauvegarder les résultats
    const agentResult = {
        matricule: userInfo.matricule,
        genre: userInfo.genre,
        age: userInfo.age,
        score: scorePercentage,
        score20: score20,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };

    quizResults.completedAgents.push(agentResult);
    quizResults.scores.push(agentResult);
    
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    displayResults(score20, corrections);
    updateStats();
}

// Affichage des résultats
function displayResults(score20, corrections) {
    const resultsDiv = document.getElementById('results');
    const scoreSection = document.getElementById('scoreSection');
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreText = document.getElementById('scoreText');
    const scoreMessage = document.getElementById('scoreMessage');
    const correctionsDiv = document.getElementById('corrections');

    // Afficher le score sur 20
    scoreText.textContent = scoreToText(score20);
    
    if (score20 >= 16) {
        scoreCircle.className = 'score-circle score-excellent';
        scoreMessage.textContent = '🎉 Excellent ! Félicitations !';
    } else if (score20 >= 14) {
        scoreCircle.className = 'score-circle score-good';
        scoreMessage.textContent = '👍 Bien ! Continuez vos efforts.';
    } else {
        scoreCircle.className = 'score-circle score-poor';
        scoreMessage.textContent = '📚 À améliorer. Révisez le code de conduite.';
    }

    // Générer les corrections
    let correctionsHtml = '<h3 style="margin-bottom: 20px; color: #2c3e50;">📋 Corrections Détaillées</h3>';
    corrections.forEach((correction, index) => {
        correctionsHtml += `
            <div class="correction-item ${correction.isCorrect ? 'correct' : ''}">
                <h4 style="color: ${correction.isCorrect ? '#27ae60' : '#e74c3c'}; margin-bottom: 10px;">
                    ${correction.isCorrect ? '✅' : '❌'} Question ${index + 1}
                </h4>
                <p style="margin-bottom: 10px;"><strong>Question:</strong> ${correction.question}</p>
                <p style="margin-bottom: 10px;"><strong>Votre réponse:</strong> ${correction.userAnswer}</p>
                ${!correction.isCorrect ? `<p style="margin-bottom: 10px;"><strong>Bonne réponse:</strong> ${correction.correctAnswer}</p>` : ''}
                <p style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 10px;">
                    <strong>Explication:</strong> ${correction.explanation}
                </p>
            </div>
        `;
    });

    correctionsDiv.innerHTML = correctionsHtml;
    
    // Afficher les sections
    document.getElementById('quizForm').style.display = 'none';
    resultsDiv.style.display = 'block';
    scoreSection.style.display = 'block';
}

// Mise à jour des statistiques
function updateStats() {
    const agents = quizResults.completedAgents || [];
    
    if (agents.length === 0) {
        document.getElementById('totalCompleted').textContent = '0';
        document.getElementById('averageWomen').textContent = '0/20';
        document.getElementById('averageMen').textContent = '0/20';
        document.getElementById('averageOver40').textContent = '0/20';
        document.getElementById('averageUnder40').textContent = '0/20';
        return;
    }

    // Total des agents
    document.getElementById('totalCompleted').textContent = agents.length;

    // Moyenne par genre
    const women = agents.filter(agent => agent.genre === 'Féminin');
    const men = agents.filter(agent => agent.genre === 'Masculin');
    
    const avgWomen = women.length > 0 ? 
        Math.round(women.reduce((sum, agent) => sum + agent.score20, 0) / women.length) : 0;
    const avgMen = men.length > 0 ? 
        Math.round(men.reduce((sum, agent) => sum + agent.score20, 0) / men.length) : 0;

    document.getElementById('averageWomen').textContent = scoreToText(avgWomen);
    document.getElementById('averageMen').textContent = scoreToText(avgMen);

    // Moyenne par tranche d'âge
    const over40 = agents.filter(agent => agent.age >= 40);
    const under40 = agents.filter(agent => agent.age < 40);
    
    const avgOver40 = over40.length > 0 ? 
        Math.round(over40.reduce((sum, agent) => sum + agent.score20, 0) / over40.length) : 0;
    const avgUnder40 = under40.length > 0 ? 
        Math.round(under40.reduce((sum, agent) => sum + agent.score20, 0) / under40.length) : 0;

    document.getElementById('averageOver40').textContent = scoreToText(avgOver40);
    document.getElementById('averageUnder40').textContent = scoreToText(avgUnder40);
}

// Navigation entre onglets
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Fermer le quiz
function closeQuiz() {
    if (confirm('Êtes-vous sûr de vouloir fermer le quiz ?')) {
        if (window.opener) {
            window.close();
        } else {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0.5';
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 500);
        }
    }
}