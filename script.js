// script.js - Portfolio interactif
document.addEventListener('DOMContentLoaded', () => {
    // ========= NAVIGATION ACTIVE AU SCROLL =========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href')?.substring(1);
            if (href === current) link.classList.add('active');
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ========= MENU HAMBURGER =========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ========= GÉNÉRATION DES 10 SÉANCES MSP =========
    const seancesContainer = document.querySelector('.seances-grid');
    if (seancesContainer) {
        const seances = [
            { numero: 1, date: "03/03/2025", rapport: "Observation d'une classe de 2nde - Introduction à l'algorithme" },
            { numero: 2, date: "06/03/2025", rapport: "Assistance à un cours sur la structure séquentielle" },
            { numero: 3, date: "10/03/2025", rapport: "Animation d'une séance sur les variables en Python" },
            { numero: 4, date: "13/03/2025", rapport: "Correction d'exercices et suivi individualisé" },
            { numero: 5, date: "17/03/2025", rapport: "Préparation d'un quiz numérique via Moodle" },
            { numero: 6, date: "20/03/2025", rapport: "Évaluation formative : condition if/else" },
            { numero: 7, date: "24/03/2025", rapport: "Projet mini-site web (HTML/CSS) encadrement" },
            { numero: 8, date: "27/03/2025", rapport: "Réunion pédagogique et analyse de copies" },
            { numero: 9, date: "31/03/2025", rapport: "Activité débranchée sur la logique binaire" },
            { numero: 10, date: "03/04/2025", rapport: "Bilan de stage et entretien avec le tuteur" }
        ];
        
        seances.forEach(s => {
            const card = document.createElement('div');
            card.className = 'seance-card';
            card.innerHTML = `<strong><i class="fas fa-chalkboard"></i> Séance ${s.numero}</strong><br>
                              <small><i class="far fa-calendar-alt"></i> ${s.date}</small>
                              <p style="margin-top:8px;">📄 ${s.rapport}</p>`;
            seancesContainer.appendChild(card);
        });
    }

    // ========= CARROUSEL AVEC MODAL =========
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevBtn && nextBtn && slides.length) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        const modal = document.getElementById('activityModal');
        const closeModal = document.querySelector('.close-modal');
        const modalTitle = document.getElementById('modalModuleTitle');
        const modalDesc = document.getElementById('modalDesc');

        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const moduleName = slide.getAttribute('data-module') || 'Activité CREMEF';
                const description = slide.getAttribute('data-desc') || 'Projet pratique réalisé dans le cadre du module.';
                if (modalTitle && modalDesc) {
                    modalTitle.innerText = `📘 ${moduleName}`;
                    modalDesc.innerText = description;
                }
                if (modal) modal.style.display = 'flex';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                if (modal) modal.style.display = 'none';
            });
        }

        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }
    }

    // ========= ANCRES LISSES =========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========= THEME CLAIR / SOMBRE =========
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ========= DONNÉES S1 AVEC ICÔNES =========
    const modulesS1 = [
        { nom: "Méthodologie de recherche", desc: "Introduction aux méthodes qualitatives et quantitatives, rédaction académique.", prof: "Pr. Laurent V.", heures: "30h", icone: "fas fa-search" },
        { nom: "Gestion 1", desc: "Principes de gestion administrative et financière en milieu éducatif.", prof: "Pr. Jamila R.", heures: "25h", icone: "fas fa-chart-line" },
        { nom: "Planification", desc: "Élaboration de projets pédagogiques et planification des séquences.", prof: "Pr. Karim B.", heures: "20h", icone: "fas fa-calendar-alt" },
        { nom: "TICE", desc: "Technologies de l'information et de la communication pour l'enseignement.", prof: "Pr. Sarah M.", heures: "24h", icone: "fas fa-laptop-code" },
        { nom: "Sciences de l'éducation", desc: "Théories d'apprentissage, psychologie cognitive et pédagogies actives.", prof: "Pr. Fouad L.", heures: "28h", icone: "fas fa-brain" },
        { nom: "RF1 – Architecture", desc: "Composants matériels, processeur, mémoire, systèmes binaires.", prof: "Pr. Nadia T.", heures: "35h", icone: "fas fa-microchip" },
        { nom: "RF2 – Algorithmique", desc: "Bases de la programmation, structures conditionnelles, boucles, fonctions.", prof: "Pr. Hicham E.", heures: "40h", icone: "fas fa-code" }
        
    ];

    const modulesS2 = [
        { nom: "Évaluation", desc: "Méthodes d'évaluation formative et certificative.", prof: "Pr. Samira K.", heures: "22h", icone: "fas fa-clipboard-list" },
        { nom: "Gestion 2", desc: "Gestion de projets et leadership éducatif.", prof: "Pr. Rachid F.", heures: "24h", icone: "fas fa-chart-pie" },
        { nom: "Production didactique", desc: "Conception de ressources pédagogiques innovantes.", prof: "Pr. Leila O.", heures: "28h", icone: "fas fa-book-open" },
        { nom: "Vie scolaire", desc: "Règlement intérieur, médiation et suivi des élèves.", prof: "CPE M. Ahmed", heures: "18h", icone: "fas fa-users" },
        { nom: "RF3 – Réseau", desc: "Concepts TCP/IP, adressage, sécurité réseau.", prof: "Pr. Youssef N.", heures: "30h", icone: "fas fa-network-wired" },
        { nom: "RF4 – Développement web", desc: "HTML5, CSS3, JavaScript, Frameworks modernes.", prof: "Pr. Inès D.", heures: "40h", icone: "fab fa-html5" },
        { nom: "Analyse des pratiques", desc: "Retour réflexif sur les situations professionnelles.", prof: "Pr. Hicham", heures: "20h", icone: "fas fa-chalkboard" },
        { nom: "Déontologie du métier", desc: "Éthique enseignante, droits et devoirs.", prof: "Me Benali", heures: "15h", icone: "fas fa-gavel" }
    ];

    // Génération des cartes
    // Fonction pour générer les cartes avec icône à côté du nom
function generateModulesPro(containerId, modules) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    modules.forEach(module => {
        const card = document.createElement('div');
        card.className = 'module-pro-card';
        card.innerHTML = `
            <div class="module-info-left">
                <div class="module-icon-small"><i class="${module.icone}"></i></div>
                <div class="module-text">
                    <h3>${module.nom}</h3>
                    <p class="module-pro-desc">${module.desc.substring(0, 60)}${module.desc.length > 60 ? '...' : ''}</p>
                </div>
            </div>
            <button class="module-plus-btn" 
                data-nom="${module.nom}" 
                data-prof="${module.prof}" 
                data-heures="${module.heures}" 
                data-desc="${module.desc}"
                data-icone="${module.icone}">
                <i class="fas fa-plus"></i>
            </button>
        `;
        container.appendChild(card);
    });
    
    // Ajouter les événements aux boutons +
    document.querySelectorAll('.module-plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModalPro(
                btn.getAttribute('data-nom'),
                btn.getAttribute('data-prof'),
                btn.getAttribute('data-heures'),
                btn.getAttribute('data-desc'),
                btn.getAttribute('data-icone')
            );
        });
    });
}

    function openModalPro(nom, prof, heures, desc, icone) {
        const modal = document.getElementById('moduleModalPro');
        const modalIcon = document.getElementById('modalProIcon');
        const title = document.getElementById('modalProTitle');
        const details = document.getElementById('modalProDetails');
        
        if (modalIcon) modalIcon.className = icone;
        title.textContent = nom;
        details.innerHTML = `
            <div class="modal-pro-row"><i class="fas fa-chalkboard-user"></i> <strong>Professeur :</strong> ${prof}</div>
            <div class="modal-pro-row"><i class="far fa-clock"></i> <strong>Volume horaire :</strong> ${heures}</div>
            <div class="modal-pro-row"><i class="fas fa-align-left"></i> <strong>Description complète :</strong> ${desc}</div>
        `;
        modal.style.display = 'flex';
    }

    generateModulesPro('modules-s1-grid', modulesS1);
    generateModulesPro('modules-s2-grid', modulesS2);

    // Gestion des onglets
    const tabBtns = document.querySelectorAll('.tab-pro-btn');
    const semestreContents = {
        s1: document.getElementById('semestre-s1'),
        s2: document.getElementById('semestre-s2'),
        activites: document.getElementById('semestre-activites')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            Object.values(semestreContents).forEach(content => {
                if (content) content.classList.remove('active');
            });
            
            const semestre = btn.getAttribute('data-semestre');
            if (semestre === 's1' && semestreContents.s1) semestreContents.s1.classList.add('active');
            if (semestre === 's2' && semestreContents.s2) semestreContents.s2.classList.add('active');
            if (semestre === 'activites' && semestreContents.activites) semestreContents.activites.classList.add('active');
        });
    });

    // Fermeture du modal
    const modalPro = document.getElementById('moduleModalPro');
    const closeModalPro = document.querySelector('.modal-pro-close');
    if (closeModalPro) closeModalPro.addEventListener('click', () => modalPro.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modalPro) modalPro.style.display = 'none'; });
});