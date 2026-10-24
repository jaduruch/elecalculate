import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,t as i}from"./shared-CQ-439nf.js";function a(e){let{document:n,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e);function C(){var e=n.getElementById(`toggleSwitch`).checked,t=n.getElementById(`circuitType`),r=n.getElementById(`starCircuit`),i=n.getElementById(`deltaCircuit`),a=n.getElementById(`neutralButton`);e?(t.innerText=`Dreieckschaltung`,r.classList.remove(`schaltung-aktiv`),i.classList.add(`schaltung-aktiv`),a.style.display=`none`):(t.innerText=`Sternschaltung`,i.classList.remove(`schaltung-aktiv`),r.classList.add(`schaltung-aktiv`),a.style.display=`inline-block`)}function w(){var e=n.getElementById(`starImage`),t=n.getElementById(`neutralButton`);t.classList.contains(`active`)?(e.src=`/Pictures/Drehstrom_Stern_ohne_NL.jpg`,t.innerText=`Neutralleiter Hinzufügen`,t.classList.remove(`active`)):(e.src=`/Pictures/Drehstrom_Stern_mit_NL.jpg`,t.innerText=`Neutralleiter Entfernen`,t.classList.add(`active`))}function T(e){var t=e===`star`?n.getElementById(`symmetryButtonStar`):n.getElementById(`symmetryButtonDelta`);t.classList.contains(`active`)?(t.innerText=`Symmetrisch`,t.classList.remove(`active`)):(t.innerText=`Asymmetrisch`,t.classList.add(`active`))}n.addEventListener(`DOMContentLoaded`,function(){var e=n.getElementById(`neutralButton`);e.style.display=`inline-block`});function E(){var e=n.getElementById(`inputVoltage`).value,t=n.getElementById(`outputVoltage`);t.value=(e*1.732).toFixed(2)}return n.getElementById(`inputVoltage`).addEventListener(`input`,E),{handlers:{toggleCircuit:C,toggleNeutral:w,toggleSymmetry:T,updateOutputVoltage:E,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var o=e();function s(){let e=n(a);return(0,o.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,o.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        /* Styling des Umschaltbuttons */
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }

        .switch input {
            display: none;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
        }

        input:checked + .slider {
            background-color: #7ff5be;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .slider.round {
            border-radius: 34px;
        }

        .slider.round:before {
            border-radius: 50%;
        }

        /* Layout für den gesamten Inhalt */
        .content-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 20px;
        }

        /* Styling für das Eingabefeld und Label */
        .input-container {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
        }

        .input-container label {
            margin-bottom: 10px;
            font-weight: bold;
        }

        .input-container input {
            padding: 5px;
            width: 100px;
            text-align: center;
            border: 2px solid #000;
            background-color: #fff;
        }

        /* Styling für die Schaltungen */
        .schaltung {
            display: none;
        }

        .schaltung-aktiv {
            display: block;
            margin-top: 20px;
            text-align: center;
        }

        /* Gemeinsames Styling der Buttons */
        .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 20px; /* Abstand zwischen den Buttons */
        }

        .custom-button {
            padding: 10px 20px;
            background-color: #000;
            color: #fff;
            border: 2px solid #fff;
            cursor: pointer;
            text-align: center;
        }

        .custom-button.active {
            border-color: #fff;
        }
    
} }`}),(0,o.jsx)(`div`,{children:(0,o.jsxs)(`h1`,{children:[(0,o.jsx)(`br`,{}),`Drehstrom`]})}),(0,o.jsxs)(`label`,{className:`switch`,children:[(0,o.jsx)(`input`,{type:`checkbox`,"aria-label":`Dreieckschaltung`,id:`toggleSwitch`,"data-action":`toggleCircuit`,onClick:t=>{e.current?.handlers.toggleCircuit?.()}}),(0,o.jsx)(`span`,{className:`slider round`})]}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{id:`circuitType`,children:`Sternschaltung`}),(0,o.jsxs)(`div`,{className:`content-container`,children:[(0,o.jsxs)(`div`,{className:`input-container`,children:[(0,o.jsx)(`label`,{htmlFor:`inputVoltage`,children:`Eingangsstrangspannung (V):`}),(0,o.jsx)(`input`,{type:`number`,"aria-label":`Eingangsstrangspannung (V):`,id:`inputVoltage`,defaultValue:`230`})]}),(0,o.jsx)(`br`,{}),(0,o.jsxs)(`div`,{className:`input-container`,children:[(0,o.jsx)(`label`,{htmlFor:`outputVoltage`,children:`Verkettete Spannung (V):`}),(0,o.jsx)(`input`,{type:`text`,"aria-label":`Verkettete Spannung (V):`,id:`outputVoltage`,defaultValue:`outputVoltage`,readOnly:!0})]}),(0,o.jsxs)(`div`,{id:`starCircuit`,className:`schaltung schaltung-aktiv`,children:[(0,o.jsx)(`img`,{src:`/Pictures/Drehstrom_Stern_ohne_NL.jpg`,alt:`Sternschaltung`,id:`starImage`}),(0,o.jsxs)(`div`,{className:`button-container`,children:[(0,o.jsx)(`button`,{type:`button`,id:`neutralButton`,className:`custom-button`,"data-action":`toggleNeutral`,onClick:t=>{e.current?.handlers.toggleNeutral?.()},children:`Neutralleiter Hinzufügen`}),(0,o.jsx)(`button`,{type:`button`,id:`symmetryButtonStar`,className:`custom-button`,"data-action":`toggleSymmetry`,onClick:t=>{e.current?.handlers.toggleSymmetry?.(`star`)},children:`Symmetrisch`})]})]}),(0,o.jsxs)(`div`,{id:`deltaCircuit`,className:`schaltung`,children:[(0,o.jsx)(`img`,{src:`/Pictures/Drehstrom_Dreieck.jpg`,alt:`Dreieckschaltung`,id:`deltaImage`}),(0,o.jsx)(`div`,{className:`button-container`,children:(0,o.jsx)(`button`,{type:`button`,id:`symmetryButtonDelta`,className:`custom-button`,"data-action":`toggleSymmetry`,onClick:t=>{e.current?.handlers.toggleSymmetry?.(`delta`)},children:`Symmetrisch`})})]})]}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`div`,{children:(0,o.jsx)(`footer`,{children:`© 2024 Elecalculate`})})]})}var c=s;export{c as component};