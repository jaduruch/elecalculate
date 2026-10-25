import{o as e}from"./matchContext-DAqmlEzK.js";import{c as t,d as n,f as r,m as i,p as a,s as o,t as s,u as c}from"./shared-DRJH367E.js";import{t as l}from"./chevron-V27U5W9E.js";function u(e,t,n=!1){if(!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0)throw Error(`Die Widerstände müssen endlich und größer null sein.`);let r=n?e<=t?e/(1+e/t):t/(1+t/e):e+t;if(!Number.isFinite(r)||r<=0)throw Error(`Das Ergebnis liegt außerhalb des darstellbaren Zahlenbereichs.`);return r}function d(e,t){let n=e.getElementById(`result_S_P`);if(n){n.replaceChildren(),n.removeAttribute(`role`);try{if(![`serie_schaltung`,`parallel_schaltung`].includes(t))throw Error(`Bitte Reihen- oder Parallelschaltung wählen.`);let r=a(e.getElementById(`r1`).value),i=a(e.getElementById(`r2`).value),s=t===`parallel_schaltung`,c=u(r,i,s),l=n.ownerDocument.createElement(`span`);l.dataset.resultKey=`R`,l.dataset.resultValue=String(c),l.textContent=`${s?`R = R₁ · R₂ / (R₁ + R₂)`:`R = R₁ + R₂`} = ${o(c,`Ω`)}`,n.appendChild(l)}catch(e){delete n.dataset.resultKey,delete n.dataset.resultValue,n.setAttribute(`role`,`alert`),n.textContent=e instanceof Error?e.message:`Die Widerstände konnten nicht berechnet werden.`}}}function f(e){let{document:r,window:o,MathJax:l,requestAnimationFrame:u,cancelAnimationFrame:f,setTimeout:p,clearTimeout:m,setInterval:h,clearInterval:g}=e,{changeSlide:_,showSlides:v,formatPrefixNoUnit:y,formatPrefixNoUnitSquare:b,formatWithPrefix:x,formatWithPrefixsquare:S,getlg:C,drawCurveDynamic:w,getBestSIPrefix:T,formatWithSIPrefix:E}=s(e);e.listen(r.getElementById(`modeSwitch`),`change`,function(){let e=r.getElementById(`modeLabel`),t=r.getElementById(`circuitImage`);this.checked?(e.textContent=`belastet`,t.src=`/Pictures/Spannungsteiler_belastet.png`,r.getElementById(`belastet`).style.display=`block`,r.getElementById(`unbelastet`).style.display=`none`):(e.textContent=`unbelastet`,t.src=`/Pictures/Spannungsteiler_unbelastet.png`,r.getElementById(`unbelastet`).style.display=`block`,r.getElementById(`belastet`).style.display=`none`)});function D(){return t(r,`ohm`)}function O(){return c(r,!1)}function k(){return c(r,!0)}function A(e){e.parentElement.classList.toggle(`open`)}function j(e,t){let i=t.closest(`div`).querySelectorAll(`.opv-button`),a=r.getElementById(`inputFieldsSerieParallel`);if(t.classList.contains(`selected`))t.classList.remove(`selected`),n(a,``),n(r.getElementById(`result_S_P`),``);else{i.forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`);let o=``;switch(e){case`serie_schaltung`:case`parallel_schaltung`:o=`
                        <div class="form-row">
                            <label>Widerstand R<sub>1</sub></label>
                            <input type="text" id="r1" style="border-color: var(--Widerstand);">
                            <label>&Omega; [Ohm]</label>
                        </div>
                        <div class="form-row">
                            <label>Widerstand R<sub>2</sub></label>
                            <input type="text" id="r2" style="border-color: var(--Widerstand);">
                            <label>&Omega; [Ohm]</label>
                        </div>
                        <input type="button" value="Berechnen" class="Button_Berechnen" data-ec-function="calculate" data-ec-arg="${e}">
                        
                    `;break;default:o=``}n(a,o),n(r.getElementById(`result_S_P`),``)}}function M(e){return d(r,e)}return{handlers:{calculateParametersURI:D,calculateUnb_Spannungsteiler:O,calculateBel_Spannungsteiler:k,toggleDropdown:A,selectOPV:j,calculate:M,changeSlide:_,showSlides:v,formatPrefixNoUnit:y,formatPrefixNoUnitSquare:b,formatWithPrefix:x,formatWithPrefixsquare:S,getlg:C,drawCurveDynamic:w,getBestSIPrefix:T,formatWithSIPrefix:E,parseInput:a,parseInputsquare:i},dispose(){}}}var p=e();function m(){let e=r(f);return(0,p.jsxs)(p.Fragment,{children:[e.restoring&&(0,p.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,p.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,p.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        .switch {
            position: relative;
            display: inline-block;
            width: 34px;
            height: 20px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #535353;
            transition: .2s;
            border-radius: 20px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .2s;
            border-radius: 50%;
        }

        /*input:checked + .slider {
            background-color: #22aca0;
        }*/

        input:checked + .slider:before {
            transform: translateX(14px);
        }

        input {
            border: 2px solid;
            border-radius: 3px;
        }

        input:focus {
            outline: none; /* Entfernt den Standard-Umrandungsring */
        }

  

        .dropdown-container {
            width: 800px;
            max-width: 90%;
            margin: 20px auto;
            background-color: #000;
        }

        .dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            color: #ffffff;
        }

        .dropdown-header:hover {
            background-color: #181818;
        }

        .dropdown-header .arrow {
            font-size: 18px;
            transform: rotate(0deg);
            transition: transform 0.5s;
        }

        .dropdown.open .arrow {
            transform: rotate(-180deg);
        }

        .dropdown-content {
            display: none;
            padding: 15px 20px;
            background-color: #000000;
            border-top: 1px solid #ddd;

        }

        .dropdown.open .dropdown-content {
            display: block;
        }

        .divider {
            border-bottom: 1px solid #ddd;
        }


        /* Stil fuer das Formular und Layout */
        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
            max-width: 700px; /* Setzt eine maximale Breite */
            margin: 0 auto; /* Zentriert das Formular */
        }

        .form-row {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            width: 100%;
            /*max-width: 150px;*/
        }

        .form-row label {
            flex: 3;
            text-align: left;
            margin-right: 10px;
        }

        .form-row input[type="number"], .form-row select {
            flex: 1.5;
            margin-right: 5px;
        }

        .form-row .unit {
            flex: 0.8;
        }


        .opv-button {
            position: relative;
            width: 150px; /* Adjust as needed */
            height: 150px; /* Adjust as needed */
            border: 2px solid transparent; /* Initially transparent */
            padding: 0;
            margin: 10px;
            background-color: transparent;
            cursor: pointer;
        }
        
        .opv-button img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .opv-button:hover {
            border-color: grey; /* grey border for hovered button */
        }
        
        .opv-button.selected {
            border-color: white; /* White border for selected button */
        }
        
        .opv-button span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 14px;
            padding: 2px 0;
        }
        
        .input-container {
            margin-top: 20px;
            text-align: center;
        }
        
        .input-container label, .input-container input, .input-container select, .input-container button {
            display: block;
            margin: 5px auto;
        }
        
        .input-group {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .input-group input {
            margin-right: 5px;
        }
        
        .input-group select {
            margin-left: 5px;
        }

    
} }`}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`h1`,{children:`Gleichstrom`}),(0,p.jsxs)(`div`,{className:`dropdown-container`,children:[(0,p.jsxs)(`div`,{className:`dropdown`,children:[(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Ohmsches Gesetz (URI)`,(0,p.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,p.jsx)(l,{direction:`down`})})]}),(0,p.jsxs)(`div`,{className:`dropdown-content`,children:[(0,p.jsx)(`div`,{children:(0,p.jsx)(`img`,{style:{maxWidth:`400px`,width:`80%`},src:`/Pictures/Gliechstrom_Schematic.jpg`,alt:`Schema Gleichstromtechnik`})}),(0,p.jsxs)(`div`,{className:`input-numbers`,children:[(0,p.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{children:`Strom I`}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I`}),(0,p.jsx)(`label`,{children:`A [Ampere]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{children:`Widerstand R`}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{children:`Leistung P`}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P`,id:`P`}),(0,p.jsx)(`label`,{children:`W [Watt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{children:`Spannung U`}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{}),(0,p.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,"data-action":`calculateParametersURI`,onClick:t=>{e.current?.invoke?.(`calculateParametersURI`,t.currentTarget)},className:`Button_Berechnen`,children:`Berechnen`}),(0,p.jsx)(`label`,{})]})]}),(0,p.jsx)(`div`,{id:`result`,"aria-live":`polite`}),(0,p.jsx)(`br`,{})]})]}),(0,p.jsx)(`div`,{className:`divider`}),(0,p.jsxs)(`div`,{className:`dropdown`,children:[(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Spannungsteiler `,(0,p.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,p.jsx)(l,{direction:`down`})})]}),(0,p.jsxs)(`div`,{className:`dropdown-content`,children:[(0,p.jsxs)(`label`,{className:`switch`,children:[(0,p.jsx)(`input`,{disabled:!e.ready,type:`checkbox`,"aria-label":`Belasteter Spannungsteiler`,id:`modeSwitch`}),(0,p.jsx)(`span`,{className:`slider round`})]}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`span`,{id:`modeLabel`,children:`unbelastet`}),(0,p.jsx)(`br`,{}),(0,p.jsxs)(`div`,{id:`circuitDiagram`,children:[(0,p.jsx)(`img`,{style:{maxWidth:`400px`,width:`80%`,height:`auto`},id:`circuitImage`,src:`/Pictures/Spannungsteiler_unbelastet.png`,alt:`Schaltung unbelastet`}),(0,p.jsxs)(`div`,{style:{display:`block`},id:`unbelastet`,className:`input-numbers`,children:[(0,p.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{children:`Strom I`}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I_unb`}),(0,p.jsx)(`label`,{children:`A [Ampere]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Widerstand R`,(0,p.jsx)(`sub`,{children:`1`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1_unb`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Widerstand R`,(0,p.jsx)(`sub`,{children:`2`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2_unb`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`in`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin_unb`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`1`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1_unb`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`out`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout_unb`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsx)(`label`,{}),(0,p.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-3`,"data-action":`calculateUnb_Spannungsteiler`,onClick:t=>{e.current?.invoke?.(`calculateUnb_Spannungsteiler`,t.currentTarget)},className:`Button_Berechnen`,children:`Berechnen`}),(0,p.jsx)(`label`,{})]}),(0,p.jsx)(`div`,{id:`result_unb`,"aria-live":`polite`}),(0,p.jsx)(`br`,{})]}),(0,p.jsxs)(`div`,{style:{display:`none`},id:`belastet`,className:`input-numbers`,children:[(0,p.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Strom I`,(0,p.jsx)(`sub`,{children:`ges`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom Iges`,id:`Iges_bel`}),(0,p.jsx)(`label`,{children:`A [Ampere]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Strom I`,(0,p.jsx)(`sub`,{children:`R2`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IR2`,id:`IR2_bel`}),(0,p.jsx)(`label`,{children:`A [Ampere]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Strom I`,(0,p.jsx)(`sub`,{children:`RL`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IRL`,id:`IRL_bel`}),(0,p.jsx)(`label`,{children:`A [Ampere]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Widerstand R`,(0,p.jsx)(`sub`,{children:`1`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1_bel`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Widerstand R`,(0,p.jsx)(`sub`,{children:`2`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2_bel`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Widerstand R`,(0,p.jsx)(`sub`,{children:`L`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand RL`,id:`RL_bel`}),(0,p.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`in`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin_bel`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`1`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1_bel`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsxs)(`div`,{className:`form-row`,children:[(0,p.jsxs)(`label`,{children:[`Spannung U`,(0,p.jsx)(`sub`,{children:`out`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout_bel`}),(0,p.jsx)(`label`,{children:`V [Volt]`})]}),(0,p.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateBel_Spannungsteiler`,onClick:t=>{e.current?.invoke?.(`calculateBel_Spannungsteiler`,t.currentTarget)}}),(0,p.jsx)(`div`,{id:`result_bel`,"aria-live":`polite`}),(0,p.jsx)(`br`,{})]})]})]})]}),(0,p.jsx)(`div`,{className:`divider`}),(0,p.jsxs)(`div`,{className:`dropdown`,children:[(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-4`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Serie- und Parallelschaltung `,(0,p.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,p.jsx)(l,{direction:`down`})})]}),(0,p.jsxs)(`div`,{className:`dropdown-content`,children:[(0,p.jsxs)(`div`,{children:[(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-5`,className:`opv-button`,"data-action":`selectOPV`,onClick:t=>{e.current?.invoke?.(`selectOPV`,t.currentTarget,`serie_schaltung`,t.currentTarget)},children:[(0,p.jsx)(`img`,{src:`/Pictures/R_Serie.svg`,alt:`Serie Schaltung`}),(0,p.jsx)(`span`,{children:`Serie`})]}),(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-6`,className:`opv-button`,"data-action":`selectOPV`,onClick:t=>{e.current?.invoke?.(`selectOPV`,t.currentTarget,`parallel_schaltung`,t.currentTarget)},children:[(0,p.jsx)(`img`,{src:`/Pictures/R_Parallel.svg`,alt:`Parallel Schaltung`}),(0,p.jsx)(`span`,{children:`Parallel`})]})]}),(0,p.jsx)(`div`,{id:`inputFieldsSerieParallel`}),(0,p.jsx)(`div`,{id:`result_S_P`,"aria-live":`polite`}),(0,p.jsx)(`br`,{})]})]}),(0,p.jsx)(`div`,{className:`divider`}),(0,p.jsxs)(`div`,{className:`dropdown`,children:[(0,p.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-7`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Stern- Dreickschaltung `,(0,p.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,p.jsx)(l,{direction:`down`})})]}),(0,p.jsx)(`div`,{className:`dropdown-content`,children:(0,p.jsx)(`div`,{children:`
                            In dieser Version nicht umgesetzt.
                        `})})]}),(0,p.jsx)(`div`,{className:`divider`})]})]})]})}var h=m;export{h as component};