document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cult-form");
    const errorsDiv = document.getElementById("form-errors");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const dob = document.getElementById("dob");
    const age = document.getElementById("age");
    const donation = document.getElementById("donation");
    const donationError = document.getElementById("donationError");

    // Auto-calcular edad desde fecha de nacimiento
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

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorsDiv.innerHTML = "";
        let valid = true;
        const errors = [];

        // Resetear clases de error
        [name, email, dob, age, donation].forEach(field => field.classList.remove("error"));

        // Validación nombre
        if (name.value.trim() === "") {
            errors.push("Name is required.");
            name.classList.add("error");
            valid = false;
        }

        // Validación email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            errors.push("Invalid email format.");
            email.classList.add("error");
            valid = false;
        }

        // Validación fecha de nacimiento
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

        // Validación edad
        if (!(age.value && Number.isInteger(+age.value) && +age.value > 0)) {
            errors.push("Invalid age.");
            age.classList.add("error");
            valid = false;
        }

        // Validación donación (opcional)
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
});