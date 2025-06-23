const bioData = {
    selfTitled: {
        text: {
            title: "Self-Titled (2017)",
            paragraph: "Carti's debuted with 'Playboi Carti', an album named after himself. Minimalist beats, hypnotic ad-libs, and carefree flows created a sound that felt reckless yet calculated. It wasn't about lyrical depth—it was pure feeling. This sound captured a youthful nihilism from the Soundcloud era, a distorted party in slow motion. It wasn't just music; it was a lifestyle taking form."
        },
        images: [
            "../img/self1.jpg",
            "../img/self2.jpg",
            "../img/self3.jpg"
        ]
    },
    dieLit: {
        text: {
            title: "Die Lit (2018)",
            paragraph: "In 2018, Carti created arguably the best album in his whole career: Die Lit was a full dive into chaos. Carti embraced punk aesthetics and energy, turning his live shows into violent rituals. The album's sound was raw, unfiltered, and charged with adrenaline. It felt like rebellion in audio form—distorted, fast, and unpredictable. Carti wasn't just an artist anymore; he was the leader of an underground cult."
        },
        images: [
            "../img/dielit1.jpg",
            "../img/dielit2.jpg",
            "../img/dielit3.jpg"
        ]
    },
    wlr: {
        text: {
            title: "Whole Lotta Red (2020)",
            paragraph: "With Whole Lotta Red, Carti mutated. The rage became grotesque, the beats industrial, the screams primal. Gone was the playboy persona—this was vampire Carti in his final form. The album polarized the world but built a movement in its wake. Dark, anti-mainstream, and terrifyingly confident, WLR marked a sonic exorcism, a blood-drenched rebirth. This album received mixed reviews at first but sooner than later it grew in all of us."
        },
        images: [
            "../img/wlr1.jpg",
            "../img/wlr2.jpg",
            "../img/wlr3.jpg"
        ]
    },
    iamMusic: {
        text: {
            title: "I AM MUSIC (2025)",
            paragraph: "After 5 long years of waiting, Carti releases I AM MUSIC. What began as an extension of the raw, unholy VAMP energy we felt on WLR evolved into something deeper—a sonic rebirth. With glitchy vocals and distorted soundscapes, the album feels like a full circle: a return to Carti's roots, filtered through chaos, ritual, and ascension."
        },
        images: [
            "../img/iam1.jpg",
            "../img/iam2.jpg",
            "../img/iam3.jpg"
        ]
    }
};
// referencias
const albumButtons = document.querySelectorAll('.sidebar .album-img');
const textWrapper = document.querySelector('.bio-text-wrapper');
const imageWrapper = document.querySelector('.image-wrapper');
// eventos
albumButtons.forEach((button, index) => {
    const eras = ['selfTitled', 'dieLit', 'wlr', 'iamMusic'];
    const era = eras[index];
    button.addEventListener('click', () => {
        const data = bioData[era];
        // actualiza el texto
        textWrapper.innerHTML = `
            <h3>${data.text.title}</h3>
            <p>${data.text.paragraph}</p>
        `;
        // actualiza las img
        imageWrapper.innerHTML = '';
        data.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = era;
            imageWrapper.appendChild(img);
        });
    });
});