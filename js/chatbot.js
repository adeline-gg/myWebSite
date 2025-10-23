// Chatbot - Assistant Glossaire pour l'enseignement spécialisé
// Base de connaissances adaptée aux services d'Adeline Guillot Gueret

const knowledge = {
    'tnd': {
        title: 'TND - Trouble du Neurodéveloppement',
        content: 'Les TND regroupent les troubles qui apparaissent durant la période du développement de l\'enfant (avant 18 ans). Ils incluent les troubles du spectre autistique (TSA), les troubles déficit de l\'attention avec ou sans hyperactivité (TDA/H), les troubles DYS (dyslexie, dyspraxie, etc.), les déficiences intellectuelles et les troubles du développement moteur.'
    },
    'tsa': {
        title: 'TSA - Trouble du Spectre de l\'Autisme',
        content: 'Le TSA est un trouble neurodéveloppemental caractérisé par des difficultés dans la communication sociale et des comportements, intérêts ou activités restreints et répétitifs. Chaque personne autiste est unique et présente des caractéristiques qui lui sont propres sur un "spectre" très large.'
    },
    'tdah': {
        title: 'TDA/H - Trouble Déficit de l\'Attention avec ou sans Hyperactivité',
        content: 'Le TDA/H est un trouble neurodéveloppemental caractérisé par trois symptômes principaux : l\'inattention, l\'hyperactivité et l\'impulsivité. Il peut se manifester avec ou sans hyperactivité et impacte la vie scolaire, sociale et familiale de l\'enfant.'
    },
    'tda/h': {
        title: 'TDA/H - Trouble Déficit de l\'Attention avec ou sans Hyperactivité',
        content: 'Le TDA/H est un trouble neurodéveloppemental caractérisé par trois symptômes principaux : l\'inattention, l\'hyperactivité et l\'impulsivité. Il peut se manifester avec ou sans hyperactivité et impacte la vie scolaire, sociale et familiale de l\'enfant.'
    },
    'tdi': {
        title: 'TDI - Trouble du Développement Intellectuel',
        content: 'Le TDI se caractérise par des limitations significatives du fonctionnement intellectuel et du comportement adaptatif. Un accompagnement personnalisé permet à l\'enfant de développer ses compétences et son autonomie dans un cadre bienveillant.'
    },
    'supervision': {
        title: 'Supervision',
        content: 'La supervision est un accompagnement professionnel où un superviseur expérimenté aide un professionnel à prendre du recul sur ses pratiques, analyser ses interventions, identifier ses points forts et axes d\'amélioration. C\'est un espace de réflexion et d\'apprentissage qui favorise le développement des compétences.'
    },
    'autorégulation': {
        title: 'Autorégulation',
        content: 'L\'autorégulation est la capacité d\'un individu à gérer ses émotions, ses comportements et son attention de manière adaptée selon les situations. Chez l\'enfant, cela inclut la capacité à se calmer, à maintenir son attention, à gérer sa frustration et à adapter son comportement aux attentes de l\'environnement.'
    },
    'inclusion': {
        title: 'Inclusion scolaire',
        content: 'L\'inclusion scolaire vise à accueillir tous les élèves, quels que soient leurs besoins particuliers, dans un environnement scolaire ordinaire. Elle implique des adaptations pédagogiques, un accompagnement personnalisé et une collaboration entre les différents acteurs (enseignants, famille, professionnels spécialisés).'
    },
    'aesh': {
        title: 'AESH - Accompagnant d\'Élèves en Situation de Handicap',
        content: 'L\'AESH est un professionnel qui accompagne les élèves en situation de handicap dans leur scolarité. Il aide à l\'accès aux apprentissages, aux soins et à l\'autonomie, favorisant ainsi l\'inclusion scolaire de l\'élève.'
    },
    'ppre': {
        title: 'PPRE - Programme Personnalisé de Réussite Éducative',
        content: 'Le PPRE est un dispositif d\'aide et de soutien pour les élèves qui risquent de ne pas maîtriser certaines compétences du socle commun. Il définit des objectifs précis, des actions pédagogiques et une durée limitée.'
    },
    'pap': {
        title: 'PAP - Plan d\'Accompagnement Personnalisé',
        content: 'Le PAP permet à tout élève présentant des difficultés scolaires durables en raison d\'un trouble des apprentissages de bénéficier d\'aménagements et d\'adaptations de nature pédagogique, sans reconnaissance de handicap.'
    },
    'pps': {
        title: 'PPS - Projet Personnalisé de Scolarisation',
        content: 'Le PPS concerne les élèves en situation de handicap. Il définit et coordonne les modalités de scolarisation et les actions pédagogiques, psychologiques, éducatives, sociales, médicales et paramédicales répondant aux besoins de l\'élève.'
    },
    'deficience visuelle': {
        title: 'Déficience visuelle',
        content: 'La déficience visuelle désigne une limitation importante de la fonction visuelle qui ne peut être totalement corrigée par des lunettes. Elle peut aller de la malvoyance (vision partielle) à la cécité (absence de vision). L\'accompagnement scolaire nécessite des adaptations spécifiques (agrandissement, braille, etc.).'
    },
    'guidance parentale': {
        title: 'Guidance parentale',
        content: 'La guidance parentale est un accompagnement des parents pour les aider à mieux comprendre les besoins de leur enfant et développer des stratégies éducatives adaptées. Elle vise à renforcer les compétences parentales et à favoriser une relation parent-enfant harmonieuse.'
    },
    'epsilon': {
        title: 'Epsilon à l\'école',
        content: 'Epsilon à l\'école est un organisme de formation spécialisé dans l\'accompagnement des enfants à besoins particuliers. Les certifications CEPRO et CESUP permettent aux professionnels d\'acquérir des compétences précises pour l\'accompagnement scolaire adapté.'
    },
    'ceaga dv': {
        title: 'CEAGA DV - Certificat d\'Aptitude à l\'Enseignement Général Adapté aux Déficients Visuels',
        content: 'Le CEAGA DV est une certification permettant d\'intervenir auprès d\'enfants déficients visuels, avec ou sans troubles associés. Il apporte des compétences spécifiques en adaptation pédagogique et matérielle.'
    },
    'emas': {
        title: 'EMAS - Équipe Mobile d\'Appui à la Scolarisation',
        content: 'L\'EMAS intervient auprès des établissements scolaires pour faciliter l\'inclusion des élèves en situation de handicap. Elle accompagne les équipes éducatives, les familles et travaille en collaboration avec les professionnels médico-sociaux pour adapter les parcours scolaires.'
    },
    // Informations sur Adeline Guillot Gueret
    'adeline': {
        title: 'Adeline Guillot Gueret',
        content: 'Enseignante spécialisée de formation, je suis basée en <strong>Guadeloupe</strong>. Diplômée en Activité Physique Adaptée et titulaire du CEAGA DV, j\'ai plus de 10 ans d\'expérience en établissement médico-social. J\'accompagne les enfants à besoins particuliers, leurs parents et les professionnels de l\'éducation et du médico-social. <a href="#qui-suis-je" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    },
    'qui etes-vous': {
        title: 'Mon parcours',
        content: 'Je suis <strong>Adeline Guillot Gueret</strong>, enseignante spécialisée, formatrice et superviseure. J\'ai travaillé pendant plus de 10 ans en établissement médico-social auprès d\'enfants déficients visuels avec troubles associés. Mes certifications : CEAGA DV, CEPRO 1 & 2, CESUP (Epsilon à l\'école), Epsilon Melia, A+ Autorégulation. <a href="#qui-suis-je" style="color: var(--primary); font-weight: 600;">Découvrir mon parcours</a>'
    },
    'services': {
        title: 'Mes services',
        content: 'Je propose 4 types d\'accompagnement :<br>📘 <strong>Soutien scolaire spécifique & bilans</strong> (45€/h)<br>👨‍👩‍👧 <strong>Guidance parentale</strong> (55€/h)<br>👩‍🏫 <strong>Formation & supervision d\'équipes</strong><br>🔎 <strong>Analyse de pratiques professionnelles</strong><br><a href="#services" style="color: var(--primary); font-weight: 600;">Voir tous les services</a>'
    },
    'soutien scolaire': {
        title: 'Soutien scolaire spécifique',
        content: 'Accompagnement individualisé pour enfants à besoins éducatifs particuliers (TSA, TDI, TDA/H, déficience visuelle, troubles des apprentissages). Je propose des évaluations personnalisées et un plan de soutien adapté grâce à mes certifications CEPRO et CESUP.<br><strong>Tarif :</strong> 45€/heure | Évaluation complète : 250€<br><a href="#services" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    },
    'tarifs': {
        title: 'Tarifs',
        content: '💰 <strong>Soutien scolaire :</strong> 45€/heure<br>💰 <strong>Évaluation complète :</strong> 250€<br>💰 <strong>Guidance parentale :</strong> 55€/heure<br>💰 <strong>Formation & supervision :</strong> Sur devis<br>💰 <strong>Analyse de pratiques :</strong> Sur devis<br><br>Exonération de TVA - Déduction fiscale possible. <a href="#tarifs" style="color: var(--primary); font-weight: 600;">Voir tous les tarifs</a>'
    },
    'contact': {
        title: 'Me contacter',
        content: '📍 <strong>Localisation :</strong> Guadeloupe<br>✉️ <strong>Email :</strong> adeline.gueret.g@gmail.com<br><br>J\'interviens à domicile et en établissement en Guadeloupe. N\'hésitez pas à me contacter pour discuter de vos besoins !<br><a href="#contact" style="color: var(--primary); font-weight: 600;">Formulaire de contact</a>'
    },
    'guadeloupe': {
        title: 'Interventions en Guadeloupe',
        content: 'Je suis basée en <strong>Guadeloupe</strong> et j\'interviens auprès de particuliers, d\'écoles et de structures médico-sociales sur tout le territoire. Mes interventions se font à domicile, en établissement scolaire ou médico-social.<br><a href="#contact" style="color: var(--primary); font-weight: 600;">Me contacter</a>'
    },
    'qualifications': {
        title: 'Mes qualifications',
        content: '🎓 Diplôme en Activité Physique Adaptée (Université Claude Bernard Lyon 1)<br>🎓 CEAGA DV (Déficience Visuelle)<br>🎓 CEPRO 1 & 2 (Epsilon à l\'école)<br>🎓 CESUP (Epsilon à l\'école)<br>🎓 Epsilon Melia (Analyse de pratiques)<br>🎓 A+ Autorégulation<br>🎓 ENSEIS Management<br><a href="#qui-suis-je" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    },
    'experience': {
        title: 'Mon expérience',
        content: 'Plus de <strong>10 ans d\'expérience en établissement médico-social</strong> auprès d\'enfants à besoins particuliers (déficience visuelle, TSA, TDI, TDA/H). J\'ai également coordonné une Équipe Mobile d\'Appui à la Scolarisation (EMAS) et je suis formatrice et superviseure en école d\'autorégulation.<br><a href="#qui-suis-je" style="color: var(--primary); font-weight: 600;">Découvrir mon parcours</a>'
    },
    'formation professionnelle': {
        title: 'Formation & supervision d\'équipes',
        content: 'J\'anime des formations pour les équipes éducatives et médico-sociales sur les TND, TSA, autorégulation et inclusion scolaire. Je propose également de la supervision d\'équipes pluridisciplinaires et l\'accompagnement en école d\'autorégulation (A+ Autorégulation et Epsilon à l\'école).<br><strong>Tarif :</strong> Sur devis<br><a href="#services" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    },
    'analyse de pratiques': {
        title: 'Analyse de pratiques professionnelles',
        content: 'Formée par Epsilon Melia, j\'anime des groupes d\'analyse de la pratique professionnelle dans une démarche réflexive et bienveillante. Cet espace permet aux équipes de partager leurs expériences, développer la résolution collaborative et améliorer leur bien-être professionnel.<br><strong>Tarif :</strong> Sur devis<br><a href="#services" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    },
    'rendez-vous': {
        title: 'Prendre rendez-vous',
        content: 'Pour prendre rendez-vous ou obtenir plus d\'informations sur mes services, vous pouvez me contacter par email à <strong>adeline.gueret.g@gmail.com</strong> ou via le formulaire de contact sur le site.<br><a href="#contact" style="color: var(--primary); font-weight: 600;">Me contacter maintenant</a>'
    },
    'evaluation': {
        title: 'Évaluation scolaire complète',
        content: 'L\'évaluation complète comprend : une anamnèse, la passation de tests adaptés, l\'analyse des résultats, un rapport écrit détaillé et une restitution aux parents avec recommandations.<br><strong>Tarif :</strong> 250€ (forfait)<br><a href="#services" style="color: var(--primary); font-weight: 600;">En savoir plus</a>'
    }
};

// Variables globales
let chatButton, chatContainer, closeBtn, chatMessages, chatInput, sendBtn;

// Initialisation du chatbot
function initChatbot() {
    // Récupération des éléments
    chatButton = document.getElementById('chatButton');
    chatContainer = document.getElementById('chatContainer');
    closeBtn = document.getElementById('closeBtn');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendBtn = document.getElementById('sendBtn');

    // Événements d'ouverture/fermeture
    if (chatButton) {
        chatButton.addEventListener('click', toggleChat);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleChat);
    }

    // Événements d'envoi
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }

    // Réponses rapides
    const quickReplies = document.querySelectorAll('.quick-reply-btn');
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            chatInput.value = question;
            handleSend();
        });
    });
}

// Ouvrir/Fermer le chat
function toggleChat() {
    if (chatContainer && chatButton) {
        chatContainer.classList.toggle('active');
        chatButton.classList.toggle('active');
        if (chatContainer.classList.contains('active') && chatInput) {
            chatInput.focus();
        }
    }
}

// Fonction pour ajouter un message
function addMessage(content, isUser = false) {
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fonction pour trouver une réponse
function findAnswer(question) {
    const normalizedQuestion = question.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever les accents
        .trim();

    // Recherche exacte
    for (const [key, value] of Object.entries(knowledge)) {
        const normalizedKey = key.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (normalizedQuestion.includes(normalizedKey)) {
            return `<strong>${value.title}</strong><br>${value.content}`;
        }
    }

    // Si aucune correspondance exacte, chercher des mots-clés
    const keywords = {
        'autis': 'tsa',
        'hyperactiv': 'tdah',
        'attention': 'tdah',
        'accompagnement': 'soutien scolaire',
        'aveugle': 'deficience visuelle',
        'malvoyant': 'deficience visuelle',
        'parents': 'guidance parentale',
        'inclus': 'inclusion',
        'intellectuel': 'tdi',
        'mobile': 'emas',
        'equipe mobile': 'emas',
        // Mots-clés liés à Adeline
        'qui es-tu': 'qui etes-vous',
        'qui est': 'adeline',
        'presentation': 'adeline',
        'prix': 'tarifs',
        'tarif': 'tarifs',
        'cout': 'tarifs',
        'combien': 'tarifs',
        'localisation': 'guadeloupe',
        'ou': 'guadeloupe',
        'intervention': 'guadeloupe',
        'rdv': 'rendez-vous',
        'rendez vous': 'rendez-vous',
        'prendre contact': 'contact',
        'contacter': 'contact',
        'email': 'contact',
        'telephone': 'contact',
        'diplome': 'qualifications',
        'certification': 'qualifications',
        'parcours': 'qui etes-vous',
        'bilan': 'evaluation',
        'test': 'evaluation',
        'evaluer': 'evaluation',
        'formateur': 'formation professionnelle',
        'formatrice': 'formation professionnelle',
        'superviser': 'formation professionnelle',
        'superviseur': 'formation professionnelle',
        'pratique': 'analyse de pratiques',
        'enseignante': 'adeline',
        'specialise': 'adeline',
        'propose': 'services',
        'offre': 'services'
    };

    for (const [keyword, knowledgeKey] of Object.entries(keywords)) {
        if (normalizedQuestion.includes(keyword)) {
            const value = knowledge[knowledgeKey];
            return `<strong>${value.title}</strong><br>${value.content}`;
        }
    }

    return null;
}

// Fonction pour gérer l'envoi
function handleSend() {
    if (!chatInput) return;

    const question = chatInput.value.trim();

    if (question === '') return;

    // Afficher la question de l'utilisateur
    addMessage(question, true);
    chatInput.value = '';

    // Simuler un délai de réflexion
    setTimeout(() => {
        const answer = findAnswer(question);

        if (answer) {
            addMessage(answer);
        } else {
            addMessage('Désolé, je n\'ai pas trouvé d\'information sur ce sujet. Voici quelques exemples de questions :<br><br>📚 <strong>Glossaire :</strong> TND, TSA, TDA/H, TDI, déficience visuelle, autorégulation, inclusion, AESH, PAP, PPS, PPRE, EMAS...<br><br>👤 <strong>À propos :</strong> Qui êtes-vous ? Vos services ? Vos tarifs ? Vos qualifications ?<br><br>📞 <strong>Pratique :</strong> Comment prendre rendez-vous ? Où intervenez-vous ?<br><br>N\'hésitez pas à <a href="#contact" style="color: var(--primary); font-weight: 600;">me contacter directement</a> pour plus d\'informations !');
        }
    }, 500);
}

// Initialiser le chatbot au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
