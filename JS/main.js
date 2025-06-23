document.addEventListener("DOMContentLoaded", () => {

    // BIO
    const albumButtons = document.querySelectorAll('.sidebar .album-img');
    const textWrapper = document.querySelector('.bio-text-wrapper');
    const imageWrapper = document.querySelector('.image-wrapper');

    if (albumButtons.length && textWrapper && imageWrapper) {
        const bioData = {
            selfTitled: {
                text: {
                    title: "Self-Titled (2017)",
                    paragraph: "Carti's debuted with 'Playboi Carti', an album named after himself. Minimalist beats, hypnotic ad-libs, and carefree flows created a sound that felt reckless yet calculated. It wasn't about lyrical depth—it was pure feeling. This sound captured a youthful nihilism from the Soundcloud era, a distorted party in slow motion. It wasn't just music; it was a lifestyle taking form."
                },
                images: ["../img/self1.jpg", "../img/self2.jpg", "../img/self3.jpg"]
            },
            dieLit: {
                text: {
                    title: "Die Lit (2018)",
                    paragraph: "In 2018, Carti created arguably the best album in his whole career: Die Lit was a full dive into chaos. Carti embraced punk aesthetics and energy, turning his live shows into violent rituals. The album's sound was raw, unfiltered, and charged with adrenaline. It felt like rebellion in audio form—distorted, fast, and unpredictable. Carti wasn't just an artist anymore; he was the leader of an underground cult."
                },
                images: ["../img/dielit1.jpg", "../img/dielit2.jpg", "../img/dielit3.jpg"]
            },
            wlr: {
                text: {
                    title: "Whole Lotta Red (2020)",
                    paragraph: "With Whole Lotta Red, Carti mutated. The rage became grotesque, the beats industrial, the screams primal. Gone was the playboy persona—this was vampire Carti in his final form. The album polarized the world but built a movement in its wake. Dark, anti-mainstream, and terrifyingly confident, WLR marked a sonic exorcism, a blood-drenched rebirth. This album received mixed reviews at first but sooner than later it grew in all of us."
                },
                images: ["../img/wlr1.jpg", "../img/wlr2.jpg", "../img/wlr3.jpg"]
            },
            iamMusic: {
                text: {
                    title: "I AM MUSIC (2025)",
                    paragraph: "After 5 long years of waiting, Carti releases I AM MUSIC. What began as an extension of the raw, unholy VAMP energy we felt on WLR evolved into something deeper—a sonic rebirth. With glitchy vocals and distorted soundscapes, the album feels like a full circle: a return to Carti's roots, filtered through chaos, ritual, and ascension."
                },
                images: ["../img/iam1.jpg", "../img/iam2.jpg", "../img/iam3.jpg"]
            }
        };

        // Agrega evento a cada botón de álbum para mostrar contenido y galería de imágenes.
        albumButtons.forEach((button, index) => {
            const eras = ['selfTitled', 'dieLit', 'wlr', 'iamMusic'];
            const era = eras[index];
            button.addEventListener('click', () => {
                const data = bioData[era];
                textWrapper.innerHTML = `
                    <h3>${data.text.title}</h3>
                    <p>${data.text.paragraph}</p>
                `;
                imageWrapper.innerHTML = '';
                data.images.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = era;
                    imageWrapper.appendChild(img);
                });
            });
        });
    }

    // JOIN THE CULT
    const form = document.getElementById("cult-form");
    if (form) {
        const errorsDiv = document.getElementById("form-errors");
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const dob = document.getElementById("dob");
        const age = document.getElementById("age");
        const donation = document.getElementById("donation");
        const donationError = document.getElementById("donationError");

        // Calcula la edad automáticamente cuando se ingresa la fecha de nacimiento.
        dob.addEventListener("input", () => {
            const today = new Date();
            const birthDate = new Date(dob.value);
            let ageCalc = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                ageCalc--;
            }
            age.value = !isNaN(ageCalc) && ageCalc >= 0 ? ageCalc : "";
        });

        // Valida todos los campos del formulario y muestra errores si los hay.
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            errorsDiv.innerHTML = "";
            let valid = true;
            const errors = [];

            [name, email, dob, age, donation].forEach(field => field.classList.remove("error"));

            if (name.value.trim() === "") {
                errors.push("Name is required.");
                name.classList.add("error");
                valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errors.push("Invalid email format.");
                email.classList.add("error");
                valid = false;
            }

            const date = new Date(dob.value);
            if (!(dob.value && !isNaN(date))) {
                errors.push("Invalid date.");
                dob.classList.add("error");
                valid = false;
            } else {
                const [year, month, day] = dob.value.split("-").map(Number);
                const validDate = new Date(year, month - 1, day);
                if (validDate.getDate() !== day || validDate.getMonth() !== month - 1 || validDate.getFullYear() !== year) {
                    errors.push("Non-existent date.");
                    dob.classList.add("error");
                    valid = false;
                }
            }

            if (!(age.value && Number.isInteger(+age.value) && +age.value > 0)) {
                errors.push("Invalid age.");
                age.classList.add("error");
                valid = false;
            }

            if (donation.value) {
                const donationValue = parseFloat(donation.value);
                if (isNaN(donationValue) || donationValue < 0) {
                    donationError.textContent = "Enter a valid amount (0.00 or more).";
                    donation.classList.add("error");
                    valid = false;
                } else {
                    donationError.textContent = "";
                }
            } else {
                donationError.textContent = "";
            }

            if (!valid) {
                errorsDiv.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
            } else {
                localStorage.setItem("cultName", name.value);
                localStorage.setItem("cultEmail", email.value);
                form.innerHTML = `<h3>Welcome to the cult, ${name.value}.</h3>`;
            }
        });
    }

    // QUIZ
    const container = document.getElementById("quiz-container");
    const questionEl = document.getElementById("quiz-question");
    const audioEl = document.getElementById("quiz-audio");
    const optionsEl = document.getElementById("quiz-options");

    // Validacion de que el usuario ya se haya unido, sinó ofrece redirección al formulario.
    if (container && questionEl && audioEl && optionsEl) {
        const userName = localStorage.getItem("cultName");
        if (!userName) {
            container.innerHTML = `<h2>You must <a href="./joinTheCult.html">Join The Cult</a> to take the quiz.</h2>`;
            return;
        }

        // Array con los fragmentos de audio, opciones y respuesta correcta.
        const quizData = [
            {
                question: "Which song is this?",
                audio: "../audio/audio1.mp3",
                options: ["Sky", "Stop Breathing", "Long Time", "Rockstar Made"],
                answer: "Sky"
            },
            {
                question: "Which song is this?",
                audio: "../audio/audio2.mp3",
                options: ["Shoota", "Magnolia", "R.I.P.", "No Time"],
                answer: "Magnolia"
            },
            {
                question: "Which song is this?",
                audio: "../audio/audio3.mp3",
                options: ["Control", "FOMDJ", "R.I.P.", "King Vamp"],
                answer: "R.I.P."
            },
            {
                question: "Which song is this?",
                audio: "../audio/audio4.mp3",
                options: ["Let It Go", "Pop Out", "Place", "Foreign"],
                answer: "Let It Go"
            },
            {
                question: "Which song is this?",
                audio: "../audio/audio5.mp3",
                options: ["New N3on", "Rather Lie", "Crank", "OPM Babi"],
                answer: "New N3on"
            },
            {
                question: "Which song is this?",
                audio: "../audio/audio6.mp3",
                options: ["Flex", "Lookin", "Olympian", "Cocaine Nose"],
                answer: "Olympian"
            },
        ];

        // Aleatoriza el orden de salida de las preguntas.
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };

        // Aleatoriza el orden que ocupan las opciones.
        const shuffleArrayOptions = (array) => {
            return array
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        };

        shuffleArray(quizData);

        // Contadores de score.
        let current = 0;
        let score = 0;

        // Carga una pregunta, su audio y las opciones.
        function loadQuestion() {
            const q = quizData[current];
            questionEl.textContent = q.question;
            audioEl.src = q.audio;
            optionsEl.innerHTML = "";

            shuffleArrayOptions(q.options).forEach(option => {
                const btn = document.createElement("button");
                btn.className = "quiz-option";
                btn.textContent = option;
                btn.addEventListener("click", () => handleAnswer(btn, option === q.answer));
                optionsEl.appendChild(btn);
            });
        }

        // Validacion de la seleccion de opcion.
        function handleAnswer(selectedBtn, isCorrect) {
            const allButtons = document.querySelectorAll(".quiz-option");
            allButtons.forEach(btn => btn.disabled = true);

            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
                const correctBtn = Array.from(allButtons).find(b => b.textContent === quizData[current].answer);
                correctBtn.classList.add("correct");
            }

            // Muestra siguiente pregunta despues de un delay, si no quedan preguntas pasa al mensaje final.
            setTimeout(() => {
                current++;
                if (current < quizData.length) {
                    loadQuestion();
                } else {
                    container.innerHTML = `
                        <h2>Well done, ${userName}.</h2>
                        <p>Your score: ${score} / ${quizData.length}</p>
                    `;
                }
            }, 1500);
        }
        loadQuestion();
    }
});