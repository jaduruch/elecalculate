let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function toggleMenu() {
    var menu = document.querySelector('.dropdown-menu');
    var burger = document.querySelector('.burger-menu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
        burger.classList.remove("change");
    } else {
        menu.style.display = "block";
        burger.classList.add("change");
    }
}
//---------------------------------Eingabe mit Massvorsatz---------------------------------

/*function parseInput(value) {
    const unitMap = {
        //"f": 1e-15,   // Femto
        "p": 1e-12,   // Pico
        "n": 1e-9,    // Nano
        "u": 1e-6,    // Mikro
        "m": 1e-3,    // Milli
        "k": 1e3,     // Kilo
        "M": 1e6,     // Mega
        "G": 1e9,     // Giga
        "T": 1e12    // Tera
        //"P": 1e15     // Peta
    };

    const match = value.match(/^(\d*\.?\d+)\s*([pnumkMGT]?)$/);
    if (!match) return NaN;

    const num = parseFloat(match[1]);
    const unit = match[2];

    return num * (unitMap[unit] || 1);
}
//---------------------------------Ausgabe mit Massvorsatz---------------------------------
function formatWithPrefix(value, unit) {
    const prefixes = [
        //{ prefix: "P", factor: 1e15 },
        { prefix: "T", factor: 1e12 },
        { prefix: "G", factor: 1e9 },
        { prefix: "M", factor: 1e6 },
        { prefix: "k", factor: 1e3 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-3 },
        { prefix: "&mu;", factor: 1e-6 },
        { prefix: "n", factor: 1e-9 },
        { prefix: "p", factor: 1e-12 }//,
        //{ prefix: "f", factor: 1e-15 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(2) + " " + prefixes[i].prefix + unit;
        }
    }

    return value.toFixed(2) + " " + unit;
}*/
function parseInput(value) {
    const unitMap = {
        "p": 1e-12,   // Pico
        "n": 1e-9,    // Nano
        "u": 1e-6,    // Mikro
        "m": 1e-3,    // Milli
        "c": 1e-2,    // Centi
        "d": 1e-1,    // Dezi
        "k": 1e3,     // Kilo
        "M": 1e6,     // Mega
        "G": 1e9,     // Giga
        "T": 1e12    // Tera
    };

    // Regulaerer Ausdruck erlaubt jetzt negative Zahlen
    const match = value.match(/^(-?\d*\.?\d+)\s*([pnumcdkMGT]?)$/);
    if (!match) return NaN;

    const num = parseFloat(match[1]);
    const unit = match[2];

    return num * (unitMap[unit] || 1);
}

function formatWithPrefix(value, unit) {
    const prefixes = [
        { prefix: "T", factor: 1e12 },
        { prefix: "G", factor: 1e9 },
        { prefix: "M", factor: 1e6 },
        { prefix: "k", factor: 1e3 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-3 },
        { prefix: "&mu;", factor: 1e-6 },
        { prefix: "n", factor: 1e-9 },
        { prefix: "p", factor: 1e-12 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(2) + prefixes[i].prefix + unit;
        }
    }

    return value.toFixed(2) + unit;
}


//-----------------------------------------------------------------------Massvorsaetze Quadratisch
function parseInputsquare(value) {
    const unitMap = {
        //"f": 1e-30,   // Femto
        "p": 1e-24,   // Pico
        "n": 1e-18,    // Nano
        "u": 1e-12,    // Mikro
        "m": 1e-6,    // Milli
        "c": 1e-4,    // Centi
        "d": 1e-2,    // Dezi
        "k": 1e6,     // Kilo
        "M": 1e12,     // Mega
        "G": 1e18,     // Giga
        "T": 1e24    // Tera
        //"P": 1e30     // Peta
    };

    const match = value.match(/^(\d*\.?\d+)\s*([pnumcdkMGT]?)$/);
    if (!match) return NaN;

    const num = parseFloat(match[1]);
    const unit = match[2];

    return num * (unitMap[unit] || 1);
}
//---------------------------------Ausgabe mit Massvorsatz Quadratisch---------------------------------
function formatWithPrefixsquare(value, unit) {
    const prefixes = [
        //{ prefix: "P", factor: 1e30 },
        { prefix: "T", factor: 1e24 },
        { prefix: "G", factor: 1e18 },
        { prefix: "M", factor: 1e12 },
        { prefix: "k", factor: 1e6 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-6 },
        { prefix: "&mu;", factor: 1e-12 },
        { prefix: "n", factor: 1e-18 },
        { prefix: "p", factor: 1e-24 }
        //{ prefix: "f", factor: 1e-30 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(2) + " " + prefixes[i].prefix + unit;
        }
    }

    return value.toFixed(2) + " " + unit;
}


