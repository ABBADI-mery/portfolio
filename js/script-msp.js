// script-msp.js - Page MSP
document.addEventListener('DOMContentLoaded', () => {
    // ========= CARROUSEL SALLE INFO =========
    const labTrack = document.querySelector('.lab-carousel-track');
    const labSlides = document.querySelectorAll('.lab-slide');
    const labPrevBtn = document.querySelector('.prev-lab');
    const labNextBtn = document.querySelector('.next-lab');
    let labIndex = 0;
    const labTotal = labSlides.length;

    function updateLabCarousel() {
        if (labTrack) labTrack.style.transform = `translateX(-${labIndex * 100}%)`;
        updateLabIndicators();
    }

    function nextLab() { labIndex = (labIndex + 1) % labTotal; updateLabCarousel(); }
    function prevLab() { labIndex = (labIndex - 1 + labTotal) % labTotal; updateLabCarousel(); }

    function createLabIndicators() {
        const container = document.querySelector('.lab-carousel-indicators');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < labTotal; i++) {
            const dot = document.createElement('div');
            dot.className = 'lab-dot';
            if (i === labIndex) dot.classList.add('active');
            dot.addEventListener('click', () => { labIndex = i; updateLabCarousel(); });
            container.appendChild(dot);
        }
    }

    function updateLabIndicators() {
        document.querySelectorAll('.lab-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === labIndex);
        });
    }

    if (labPrevBtn && labNextBtn && labSlides.length) {
        labPrevBtn.addEventListener('click', prevLab);
        labNextBtn.addEventListener('click', nextLab);
        createLabIndicators();
    }

    // ========= CARROUSEL COMPÉTITION =========
    const compTrack = document.querySelector('.competition-carousel-track');
    const compSlides = document.querySelectorAll('.competition-slide');
    const compPrevBtn = document.querySelector('.prev-competition');
    const compNextBtn = document.querySelector('.next-competition');
    let compIndex = 0;
    const compTotal = compSlides.length;

    function updateCompCarousel() {
        if (compTrack) compTrack.style.transform = `translateX(-${compIndex * 100}%)`;
        updateCompIndicators();
    }

    function nextComp() { compIndex = (compIndex + 1) % compTotal; updateCompCarousel(); }
    function prevComp() { compIndex = (compIndex - 1 + compTotal) % compTotal; updateCompCarousel(); }

    function createCompIndicators() {
        const container = document.querySelector('.competition-indicators');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < compTotal; i++) {
            const dot = document.createElement('div');
            dot.className = 'competition-dot';
            if (i === compIndex) dot.classList.add('active');
            dot.addEventListener('click', () => { compIndex = i; updateCompCarousel(); });
            container.appendChild(dot);
        }
    }

    function updateCompIndicators() {
        document.querySelectorAll('.competition-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === compIndex);
        });
    }

    if (compPrevBtn && compNextBtn && compSlides.length) {
        compPrevBtn.addEventListener('click', prevComp);
        compNextBtn.addEventListener('click', nextComp);
        createCompIndicators();
    }

    // ========= CARROUSEL AUTO-ÉVALUATION =========
    const autoTrack = document.querySelector('.auto-eval-carousel-track');
    const autoSlides = document.querySelectorAll('.auto-eval-slide');
    const autoPrevBtn = document.querySelector('.prev-auto');
    const autoNextBtn = document.querySelector('.next-auto');
    let autoIndex = 0;
    const autoTotal = autoSlides.length;

    function updateAutoCarousel() {
        if (autoTrack) autoTrack.style.transform = `translateX(-${autoIndex * 100}%)`;
        updateAutoIndicators();
    }

    function nextAuto() { autoIndex = (autoIndex + 1) % autoTotal; updateAutoCarousel(); }
    function prevAuto() { autoIndex = (autoIndex - 1 + autoTotal) % autoTotal; updateAutoCarousel(); }

    function createAutoIndicators() {
        const container = document.querySelector('.auto-eval-indicators');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < autoTotal; i++) {
            const dot = document.createElement('div');
            dot.className = 'auto-dot';
            if (i === autoIndex) dot.classList.add('active');
            dot.addEventListener('click', () => { autoIndex = i; updateAutoCarousel(); });
            container.appendChild(dot);
        }
    }

    function updateAutoIndicators() {
        document.querySelectorAll('.auto-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === autoIndex);
        });
    }

    if (autoPrevBtn && autoNextBtn && autoSlides.length) {
        autoPrevBtn.addEventListener('click', prevAuto);
        autoNextBtn.addEventListener('click', nextAuto);
        createAutoIndicators();
    }

    // ========= TABLEAU DES SÉANCES =========
    const seances = [
        { num: 1, date: "03/02/2026", rapport: "docs/Rapports/seance1.pdf", fiche: "docs/Fiches/seance1.pdf" },
        { num: 2, date: "06/02/2026", rapport: "docs/Rapports/seance2.pdf", fiche: "docs/Fiches/seance2.pdf" },
        { num: 3, date: "10/02/2026", rapport: "docs/Rapports/seance3.pdf", fiche: "docs/Fiches/seance3.pdf" },
        { num: 4, date: "13/02/2026", rapport: "docs/Rapports/seance4.pdf", fiche: "docs/Fiches/seance4.pdf" },
        { num: 5, date: "17/02/2026", rapport: "docs/Rapports/seance5.pdf", fiche: "docs/Fiches/seance5.pdf" },
        { num: 6, date: "20/02/2026", rapport: "docs/Rapports/seance6.pdf", fiche: "docs/Fiches/seance6.pdf" },
        { num: 7, date: "24/02/2026", rapport: "docs/Rapports/seance7.pdf", fiche: "docs/Fiches/seance7.pdf" },
        { num: 8, date: "27/02/2026", rapport: "docs/Rapports/seance8.pdf", fiche: "docs/Fiches/seance8.pdf" },
        { num: 9, date: "02/03/2026", rapport: "docs/Rapports/seance9.pdf", fiche: "docs/Fiches/seance9.pdf" },
        { num: 10, date: "05/03/2026", rapport: "docs/Rapports/seance10.pdf", fiche: "docs/Fiches/seance10.pdf" }
    ];

    const tableBody = document.getElementById('seances-table-body');
    if (tableBody) {
        seances.forEach(s => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Séance" class="seance-num">Séance ${s.num}</td>
                <td data-label="Date" class="seance-date">${s.date}</td>
                <td data-label="Rapport"><a href="${s.rapport}" class="seance-link" target="_blank"><i class="fas fa-file-alt"></i> Voir le rapport</a></td>
                <td data-label="Fiche pédagogique"><a href="${s.fiche}" class="seance-link" target="_blank"><i class="fas fa-chalkboard"></i> Voir la fiche</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
});