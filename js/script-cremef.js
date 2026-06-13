// script-cremef.js - Pour cremef-s1.html et cremef-s2.html
document.addEventListener('DOMContentLoaded', () => {
    // ========= DONNÉES MODULES S1 =========
    const modulesS1 = [
        { nom: "Méthodologie de recherche", page: "module-s1-1.html" },
        { nom: "Gestion 1", page: "module-s1-2.html" },
        { nom: "Planification", page: "module-s1-3.html" },
        { nom: "TICE", page: "module-s1-4.html" },
        { nom: "Sciences de l'éducation", page: "module-s1-5.html" },
        { nom: "RF1 – Architecture d'ordinateurs", page: "module-s1-6.html" },
        { nom: "RF2 – Algorithmique et programmation", page: "module-s1-7.html" }
    ];

    // ========= DONNÉES MODULES S2 =========
    const modulesS2 = [
        { nom: "Évaluation", page: "module-s2-1.html" },
        { nom: "Gestion 2", page: "module-s2-2.html" },
        { nom: "Production didactique", page: "module-s2-3.html" },
        { nom: "Vie scolaire", page: "module-s2-4.html" },
        { nom: "RF3 – Réseau", page: "module-s2-5.html" },
        { nom: "RF4 – Développement web", page: "module-s2-6.html" },
        { nom: "Analyse des pratiques", page: "module-s2-7.html" },
        { nom: "Déontologie du métier", page: "module-s2-8.html" }
    ];

    // Détecter quelle page on est (S1 ou S2)
    const pageType = window.location.pathname.includes('cremef-s1') ? 's1' : 's2';
    const modules = pageType === 's1' ? modulesS1 : modulesS2;

    // Génération de la liste des modules
    function generateModulesList() {
        const container = document.getElementById('modules-list');
        if (!container) return;
        
        container.innerHTML = '';
        modules.forEach((module, index) => {
            const item = document.createElement('a');
            item.className = 'module-list-item';
            item.href = module.page;
            
            // Numéro de module (01, 02, 03...)
            const num = (index + 1).toString().padStart(2, '0');
            
            item.innerHTML = `
                <span class="module-num">${num}</span>
                <span class="module-name">${module.nom}</span>
                <span class="module-arrow"><i class="fas fa-arrow-right"></i></span>
            `;
            container.appendChild(item);
        });
    }

    generateModulesList();
});