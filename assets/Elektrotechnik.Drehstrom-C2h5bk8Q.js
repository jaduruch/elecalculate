import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,m as n,p as r,t as i}from"./shared-B2WX6C5w.js";import{n as a}from"./three-phase-oqejQRo4.js";function o(e){let{document:t,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=i(e);function w(){var e=t.getElementById(`toggleSwitch`).checked,n=t.getElementById(`circuitType`),r=t.getElementById(`starCircuit`),i=t.getElementById(`deltaCircuit`),a=t.getElementById(`neutralButton`);e?(n.innerText=`Dreieckschaltung`,r.classList.remove(`schaltung-aktiv`),i.classList.add(`schaltung-aktiv`),a.style.display=`none`):(n.innerText=`Sternschaltung`,i.classList.remove(`schaltung-aktiv`),r.classList.add(`schaltung-aktiv`),a.style.display=`inline-block`),D()}function T(){var e=t.getElementById(`starImage`),n=t.getElementById(`neutralButton`);n.classList.contains(`active`)?(e.src=`/Pictures/Drehstrom_Stern_ohne_NL.jpg`,n.innerText=`Neutralleiter Hinzufügen`,n.classList.remove(`active`)):(e.src=`/Pictures/Drehstrom_Stern_mit_NL.jpg`,n.innerText=`Neutralleiter Entfernen`,n.classList.add(`active`)),D()}function E(e){var n=e===`star`?t.getElementById(`symmetryButtonStar`):t.getElementById(`symmetryButtonDelta`);n.classList.contains(`active`)?(n.innerText=`Symmetrisch`,n.classList.remove(`active`)):(n.innerText=`Asymmetrisch`,n.classList.add(`active`)),D()}t.addEventListener(`DOMContentLoaded`,function(){var e=t.getElementById(`neutralButton`);e.style.display=`inline-block`});function D(){return a(t)}return e.listen(t.getElementById(`inputVoltage`),`input`,D),t.addEventListener(`DOMContentLoaded`,()=>D()),{handlers:{toggleCircuit:w,toggleNeutral:T,toggleSymmetry:E,updateOutputVoltage:D,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:r,parseInputsquare:n},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Drehstrom`]})}),(0,s.jsxs)(`label`,{className:`switch`,children:[(0,s.jsx)(`input`,{disabled:!e.ready,type:`checkbox`,"aria-label":`Dreieckschaltung`,id:`toggleSwitch`,"data-action":`toggleCircuit`,onClick:t=>{e.current?.invoke?.(`toggleCircuit`,t.currentTarget)}}),(0,s.jsx)(`span`,{className:`slider round`})]}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{id:`circuitType`,children:`Sternschaltung`}),(0,s.jsxs)(`div`,{className:`content-container`,children:[(0,s.jsxs)(`div`,{className:`input-container`,children:[(0,s.jsx)(`label`,{htmlFor:`inputVoltage`,children:`Eingangsstrangspannung (V):`}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`number`,"aria-label":`Eingangsstrangspannung (V):`,id:`inputVoltage`,defaultValue:`230`})]}),(0,s.jsx)(`br`,{}),(0,s.jsxs)(`div`,{className:`input-container`,children:[(0,s.jsx)(`label`,{htmlFor:`outputVoltage`,children:`Verkettete Spannung (V):`}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`text`,"aria-label":`Verkettete Spannung (V):`,id:`outputVoltage`,defaultValue:``,readOnly:!0})]}),(0,s.jsxs)(`div`,{id:`starCircuit`,className:`schaltung schaltung-aktiv`,children:[(0,s.jsx)(`img`,{src:`/Pictures/Drehstrom_Stern_ohne_NL.jpg`,alt:`Sternschaltung`,id:`starImage`}),(0,s.jsxs)(`div`,{className:`button-container`,children:[(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`neutralButton`,className:`custom-button`,"data-action":`toggleNeutral`,onClick:t=>{e.current?.invoke?.(`toggleNeutral`,t.currentTarget)},children:`Neutralleiter Hinzufügen`}),(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`symmetryButtonStar`,className:`custom-button`,"data-action":`toggleSymmetry`,onClick:t=>{e.current?.invoke?.(`toggleSymmetry`,t.currentTarget,`star`)},children:`Symmetrisch`})]})]}),(0,s.jsxs)(`div`,{id:`deltaCircuit`,className:`schaltung`,children:[(0,s.jsx)(`img`,{src:`/Pictures/Drehstrom_Dreieck.jpg`,alt:`Dreieckschaltung`,id:`deltaImage`}),(0,s.jsx)(`div`,{className:`button-container`,children:(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`symmetryButtonDelta`,className:`custom-button`,"data-action":`toggleSymmetry`,onClick:t=>{e.current?.invoke?.(`toggleSymmetry`,t.currentTarget,`delta`)},children:`Symmetrisch`})})]})]}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`footer`,{children:`© 2024 Elecalculate`})})]})]})}var l=c;export{l as component};