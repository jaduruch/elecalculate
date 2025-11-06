/**************************************************************************
* @brief        Java Script of elecalculate.com
* 
* @file         script.js
* @purpose      This .js is just for the structure and general functions 
*               of elecalculate the js funtions for calculations
*               are in the html file of the corresponding theme.
*               
*
* @author       Jana Ruch, Paul Dresch
**************************************************************************/

let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    // Guard clause: If there are no elements with class "slide", exit early.
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

/**************************************************************************
* function to toggle buger-menu and show menu
**************************************************************************/
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

/**************************************************************************
* convert value with prefix to decimal number
* example: 
 *      input  -> 5m
 *      return -> 0.005
**************************************************************************/

// function for regular calculations
function parseInput(value)
{
    const unitMap = {
        "p": 1e-12,   // Pico
        "n": 1e-9,    // Nano
        "u": 1e-6,    // Mikro
        // "µ": 1e-6,    // doesn't work
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
    // debugger;
    return num * (unitMap[unit] || 1);
}

// function for sqaured calculations (Area)
function parseInputsquare(value)    
{
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



/**************************************************************************
* converts decimal number to number with Prefix
* example: 
 *      input  -> 0.005
 *      return -> 5m
**************************************************************************/

// function for regular calculations
function formatPrefixNoUnit(value)              // dont return Unit of Value
{
    const prefixes = [
        { prefix: "T", factor: 1e12 },
        { prefix: "G", factor: 1e9 },
        { prefix: "M", factor: 1e6 },
        { prefix: "k", factor: 1e3 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-3 },
        { prefix: "u", factor: 1e-6 },
        { prefix: "n", factor: 1e-9 },
        { prefix: "p", factor: 1e-12 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix;
        }
    }

    return value.toFixed(3);
}

// function for sqaured calculations (Area)
function formatPrefixNoUnitSquare(value)
{
    const prefixes = [
        { prefix: "T", factor: 1e24 },
        { prefix: "G", factor: 1e18 },
        { prefix: "M", factor: 1e12 },
        { prefix: "k", factor: 1e6 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-6 },
        { prefix: "u", factor: 1e-12 },
        { prefix: "n", factor: 1e-18 },
        { prefix: "p", factor: 1e-24 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix;
        }
    }

    return value.toFixed(3);
}


/**************************************************************************
* OLD FUNCTIONS not in use anymore (new funtion doesn't need unit)
* converts decimal number to number with Prefix and unit
* example: 
 *      input  -> 0.005, "V"
 *      return -> 5mV
**************************************************************************/

// function for regular calculations
function formatWithPrefix(value, unit) 
{
    const prefixes = [
        { prefix: "T", factor: 1e12 },
        { prefix: "G", factor: 1e9 },
        { prefix: "M", factor: 1e6 },
        { prefix: "k", factor: 1e3 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-3 },
        { prefix: "u", factor: 1e-6 },
        { prefix: "n", factor: 1e-9 },
        { prefix: "p", factor: 1e-12 }
    ];

    for (let i = 0; i < prefixes.length; i++) {
        if (Math.abs(value) >= prefixes[i].factor) {
            return (value / prefixes[i].factor).toFixed(3) + prefixes[i].prefix + unit;
        }
    }

    return value.toFixed(3) + unit;
}

// function for sqaured calculations (Area)
function formatWithPrefixsquare(value, unit) 
{
    const prefixes = [
        //{ prefix: "P", factor: 1e30 },
        { prefix: "T", factor: 1e24 },
        { prefix: "G", factor: 1e18 },
        { prefix: "M", factor: 1e12 },
        { prefix: "k", factor: 1e6 },
        { prefix: "", factor: 1 },
        { prefix: "m", factor: 1e-6 },
        { prefix: "u", factor: 1e-12 },
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

/**************************************************************************
* function for logarthm with base 10
* uses 5th Law of Logarithm
 *      input  -> x
 *      return -> log10(x)
**************************************************************************/
function getlg(x)
{
    return Math.log(x) / Math.log(10);
}


/**************************************************************************
* Draws a voltage or current E-curve for an RC circuit on a canvas.
* - Dynamically scales axes to the actual data range.
* - Shows a warning in the canvas if the input is missing or not physically meaningful.
* - Axis labels use a single SI prefix per axis.
* - Draws a marker at tMarker if provided (pink, no glow).
* - Draws a watermark logo in the top right.
* - All text is white, y-axis label stays on top.
* - X and Y axis numbers are rounded to two decimals.
*
* @param {string} canvasId
* @param {function} valueFunc
* @param {string} yLabel
* @param {number} maxTime
* @param {number} stepCount
* @param {object} options { color, minY, maxY, tMarker, markerLabel }
**************************************************************************/
function drawCurveDynamic(canvasId, valueFunc, yLabel, maxTime, stepCount, options = {}) 
 {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Margins for all sides
    const marginLeft = 90;
    const marginRight = 60;
    const marginTop = 40;
    const marginBottom = 70;
    const width = canvas.width - marginLeft - marginRight;
    const height = canvas.height - marginTop - marginBottom;

    // 1. Input validation
    if (!maxTime || maxTime <= 0 || typeof valueFunc !== "function") {
        ctx.fillStyle = "#e66";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Ungültige Eingaben – keine Kurve darstellbar!", canvas.width / 2, canvas.height / 2);
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText("Bitte überprüfe R, C, U und Modus.", canvas.width / 2, canvas.height / 2 + 30);
        return;
    }

    // 2. Compute data points and dynamic Y range
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    const points = [];
    for (let i = 0; i <= stepCount; i++) {
        const t = (i / stepCount) * maxTime;
        const value = valueFunc(t);
        points.push({ t, value });
        if (isFinite(value)) {
            if (value < minY) minY = value;
            if (value > maxY) maxY = value;
        }
    }
    // Always include zero on Y axis
    minY = Math.min(minY, 0);
    maxY = Math.max(maxY, 0);
    if (Math.abs(maxY - minY) < 1e-12) {
        maxY += 1;
        minY -= 1;
    }
    if (typeof options.minY === "number") minY = options.minY;
    if (typeof options.maxY === "number") maxY = options.maxY;

    // === SI prefix for the entire Y axis ===
    const maxAbsY = Math.max(Math.abs(minY), Math.abs(maxY));
    const { factor: yFactor, prefix: yPrefix } = getBestSIPrefix(maxAbsY);

    // 3. Draw grid lines (oscilloscope style)
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        // Vertical grid
        const x = marginLeft + (i / 10) * width;
        ctx.beginPath();
        ctx.moveTo(x, marginTop);
        ctx.lineTo(x, canvas.height - marginBottom);
        ctx.stroke();
        // Horizontal grid
        const y = canvas.height - marginBottom - (i / 10) * height;
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(canvas.width - marginRight, y);
        ctx.stroke();
    }
    ctx.restore();

    // 4. Draw axes
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, canvas.height - marginBottom);
    ctx.lineTo(canvas.width - marginRight, canvas.height - marginBottom);
    ctx.stroke();

    // 5. Axis labels and ticks (with SI formatting)
    // Y-axis label (on top, not vertical)
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText(yLabel, marginLeft - 60, marginTop - 18);


    // X axis label (centered)
    let timeUnit = "s", timeFactor = 1;
    if (maxTime < 1e-3) { timeUnit = "us"; timeFactor = 1e6; }
    else if (maxTime < 1) { timeUnit = "ms"; timeFactor = 1000; }
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Zeit (${timeUnit})`, marginLeft + width / 2, canvas.height - marginBottom + 60);

    // Tick labels (rounded to two decimals)
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i <= 5; i++) {
        const x = marginLeft + (i / 5) * width;
        const tVal = (i * maxTime / 5) * timeFactor;
        let label;
        if (timeUnit === "s" || timeUnit === "ms" || timeUnit === "us") {
            label = tVal.toFixed(2).replace(/\.00$/, "");
        }
        ctx.fillStyle = "#fff";
        ctx.fillText(label, x, canvas.height - marginBottom + 28);
    }
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
        // Always start at zero
        const value = minY + (i / 5) * (maxY - minY);
        const y = canvas.height - marginBottom - ((value - minY) / (maxY - minY)) * height;
        ctx.fillStyle = "#fff";
        ctx.fillText(formatWithSIPrefix(value, yFactor, yPrefix, yLabel.includes("A") ? "A" : "V"), marginLeft - 18, y + 7);
    }

            // 6. Draw the curve
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        const { t, value } = points[i];
        const x = marginLeft + (t / maxTime) * width;
        const y = canvas.height - marginBottom - ((value - minY) / (maxY - minY)) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = options.color || "#0070C0";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = options.color || "#0070C0";
    ctx.shadowBlur = 4;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 7. Draw marker if tMarker is provided
    if (typeof options.tMarker === "number" && options.tMarker >= 0 && options.tMarker <= maxTime) {
        const t = options.tMarker;
        const value = valueFunc(t);
        const x = marginLeft + (t / maxTime) * width;
        const y = canvas.height - marginBottom - ((value - minY) / (maxY - minY)) * height;

        ctx.save();
        ctx.strokeStyle = "#ff69b4";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        // Vertical marker line
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - marginBottom);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Horizontal marker line
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.setLineDash([]);
        // Marker dot (pink, no glow)
        ctx.fillStyle = "#ff69b4";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Marker label (large, bold, white, no outline)
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
            (options.markerLabel || "") + formatWithSIPrefix(value, yFactor, yPrefix, yLabel.includes("A") ? "A" : "V"),
            x + 22, y - 16
        );
        ctx.restore();
    }


    // 8. Watermark logo (top right)
    const logo = new Image();
    logo.src = "../Pictures/favicon_no_BG.svg";
    logo.onload = function() {
        ctx.save();
        ctx.globalAlpha = 0.15;
        const size = 120;
        ctx.drawImage(logo, canvas.width - marginRight - size, marginTop + 10, size, size);
        ctx.globalAlpha = 1.0;
        ctx.restore();
    };
}


/**************************************************************************
* Determines the best SI prefix for a given value range.
* Returns { factor, prefix }.
**************************************************************************/
function getBestSIPrefix(maxAbsValue) 
{
    const prefixes = [
        { f: 1e9,  p: "G" },
        { f: 1e6,  p: "M" },
        { f: 1e3,  p: "k" },
        { f: 1,    p: ""  },
        { f: 1e-3, p: "m" },
        { f: 1e-6, p: "u" },
        { f: 1e-9, p: "n" }
    ];
    for (const {f, p} of prefixes) {
        if (maxAbsValue >= f) return { factor: f, prefix: p };
    }
    // If value is extremely small
    return { factor: 1, prefix: "" };
}


/**************************************************************************
* Formats a value using a given SI factor and prefix.
**************************************************************************/
function formatWithSIPrefix(value, factor, prefix, unit) 
{
    return (value / factor).toFixed(2) + " " + prefix + unit;
}
