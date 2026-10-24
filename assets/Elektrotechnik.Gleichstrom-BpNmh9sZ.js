import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,n as r,o as i,r as a,t as o}from"./shared-CQ-439nf.js";function s(e){let{document:n,window:s,MathJax:c,requestAnimationFrame:l,cancelAnimationFrame:u,setTimeout:d,clearTimeout:f,setInterval:p,clearInterval:m}=e,{changeSlide:h,showSlides:g,formatPrefixNoUnit:_,formatPrefixNoUnitSquare:v,formatWithPrefix:y,formatWithPrefixsquare:b,getlg:x,drawCurveDynamic:S,getBestSIPrefix:C,formatWithSIPrefix:w}=o(e);n.getElementById(`modeSwitch`).addEventListener(`change`,function(){let e=n.getElementById(`modeLabel`),t=n.getElementById(`circuitImage`);this.checked?(e.textContent=`belastet`,t.src=`/Pictures/Spannungsteiler_belastet.png`,n.getElementById(`belastet`).style.display=`block`,n.getElementById(`unbelastet`).style.display=`none`):(e.textContent=`unbelastet`,t.src=`/Pictures/Spannungsteiler_unbelastet.png`,n.getElementById(`unbelastet`).style.display=`block`,n.getElementById(`belastet`).style.display=`none`)});function T(){let e=``,r=n.getElementById(`I`).value,i=n.getElementById(`R`).value,o=n.getElementById(`P`).value,s=n.getElementById(`U`).value;s&&i&&!r&&!o&&(e+=`
                Strom I = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U </span><br>
                    <span>R</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> ${s}V </span><br>
                    <span>${i}&Omega;</span>
                </div> 
            = ${y(t(s)/t(i),`A`)}<br>

            Leistung P = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U<sup>2</sup> </span><br>
                    <span>R</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> (${s}V)<sup>2</sup> </span><br>
                    <span>${i}&Omega;</span>
                </div> 
            = ${y(t(s)**2/t(i),`W`)}<br>`),o&&s&&!i&&!r&&(e+=`
                Strom I = 
                <div class ="fraction">
                    <span class="fraction-numerator"> P </span><br>
                    <span>U</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> ${o}W </span><br>
                    <span>${s}V</span>
                </div> 
            = ${y(t(o)/t(s),`A`)}<br>

            Widerstand R = 
                <div class ="fraction">
                    <span class="fraction-numerator"> U<sup>2</sup> </span><br>
                    <span>P</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator"> (${s}V)<sup>2</sup> </span><br>
                    <span>${o}W</span>
                </div> 
            = ${y(t(s)**2/t(o),`&Omega;`)}<br>`),o&&i&&!r&&!s&&(e+=`
                Strom I = 
                &radic;	<div class ="fraction">
                    <span class="fraction-numerator"> P </span><br>
                    <span>R</span>
                </div> 
            =
                &radic;	 <div class ="fraction">
                    <span class="fraction-numerator">${o}W </span><br>
                    <span>${i}&Omega;</span>
                </div> 
            = ${y((t(o)/t(i))**.5,`A`)}<br>


            Spannung U =
                    &radic; P &times; R
                =
                    &radic; ${o}W &times; ${i}&Omega;
                = ${y((t(o)*t(i))**.5,`V`)}<br>`),r&&i&&!o&&!s&&(e+=`
                    Spannung U =
                    I &times; R
                =
                    ${r}A &times; ${i}&Omega;
                = ${y(t(r)*t(i),`V`)}<br>

                Leistung P =
                    I<sup>2</sup> &times; R
                =
                    (${r}A)<sup>2</sup> &times; ${i}&Omega;
                = ${y(t(r)**2*t(i),`W`)}<br>`),o&&r&&!i&&!s&&(e+=`
                Widerstand R = 
                <div class ="fraction">
                    <span class="fraction-numerator">P</span><br>
                    <span>I<sup>2</sup> </span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator">  ${o}W</span><br>
                    <span>(${r}A)<sup>2</sup></span>
                </div> 
            = ${y(t(o)/t(r)**2,`&Omega;`)}<br>

            Spannung U = 
                <div class ="fraction">
                    <span class="fraction-numerator">P</span><br>
                    <span>I</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator">  ${o}W</span><br>
                    <span>${r}A</span>
                </div> 
            = ${y(t(o)/t(r),`V`)}<br>`),s&&r&&!o&&!i&&(e+=`
                    Leistung P =
                    U &times; I
                =
                    ${s}V &times; ${r}A;
                = ${y(t(s)*t(r),`W`)}<br>

                Widerstand R = 
                <div class ="fraction">
                    <span class="fraction-numerator">U</span><br>
                    <span>I</span>
                </div> 
            =
                <div class ="fraction">
                    <span class="fraction-numerator">${s}V</span><br>
                    <span>${r}A</span>
                </div> 
            = ${y(t(s)/t(r),`&Omega;`)}<br>`),a(n.getElementById(`result`),e)}function E(){return r(n,!1)}function D(){return r(n,!0)}function O(e){e.parentElement.classList.toggle(`open`)}function k(e,t){let r=t.closest(`div`).querySelectorAll(`.opv-button`),i=n.getElementById(`inputFieldsSerieParallel`);if(t.classList.contains(`selected`))t.classList.remove(`selected`),a(i,``),a(n.getElementById(`result_S_P`),``);else{r.forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`);let o=``;switch(e){case`serie_schaltung`:case`parallel_schaltung`:o=`
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
                        <br><br><div id="result_S_P"></div>
                    `;break;default:o=``}a(i,o),a(n.getElementById(`result_S_P`),``)}}function A(e){let r=``,i=n.getElementById(`r1`).value,o=n.getElementById(`r2`).value;e===`serie_schaltung`&&i&&o&&(r+=`
                        R<sub>ges</sub> = 
                        R<sub>1</sub> + R<sub>2</sub>
                    =
                        ${i}&Omega; + ${o}&Omega;
                    = ${y(t(i)+t(o),`&Omega;`)}<br>`),e===`parallel_schaltung`&&i&&o&&(r+=`
                    Widerstand R<sub>ges</sub> = 
                        <div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator"><!--class="fraction-denumerator"-->
                            <div style="border-top: 1px solid white;"><div class ="fraction">
                                <span >1</span><br>
                                <span class="fraction-denumerator">R<sub>1</sub></span>
                            </div>  
                        + 
                            <div class ="fraction">
                                <span >1</span><br>
                                <span class="fraction-denumerator">R<sub>2</sub></span>
                            </div></div> </span>
                        </div> 
                    =
                    <div class ="fraction">
                        <span >1</span><br>
                        <span class="fraction-denumerator"><!--class="fraction-denumerator"-->
                        <div style="border-top: 1px solid white;"><div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator">${i}&Omega;</span>
                        </div>  
                    + 
                        <div class ="fraction">
                            <span >1</span><br>
                            <span class="fraction-denumerator">${o}&Omega;</span>
                        </div></div> </span>
                    </div>
                    = ${y(1/(1/t(i)+1/t(o)),`&Omega;`)}<br>`),a(n.getElementById(`result_S_P`),r)}return{handlers:{calculateParametersURI:T,calculateUnb_Spannungsteiler:E,calculateBel_Spannungsteiler:D,toggleDropdown:O,selectOPV:k,calculate:A,changeSlide:h,showSlides:g,formatPrefixNoUnit:_,formatPrefixNoUnitSquare:v,formatWithPrefix:y,formatWithPrefixsquare:b,getlg:x,drawCurveDynamic:S,getBestSIPrefix:C,formatWithSIPrefix:w,parseInput:t,parseInputsquare:i},dispose(){}}}var c=e();function l(){let e=n(s);return(0,c.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,c.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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

    
} }`}),(0,c.jsx)(`br`,{}),(0,c.jsx)(`h1`,{children:`Gleichstrom`}),(0,c.jsxs)(`div`,{className:`dropdown-container`,children:[(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Ohmsches Gesetz (URI)`,(0,c.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,c.jsxs)(`div`,{className:`dropdown-content`,children:[(0,c.jsx)(`div`,{children:(0,c.jsx)(`img`,{style:{maxWidth:`400px`,width:`80%`},src:`/Pictures/Gliechstrom_Schematic.jpg`,alt:`Schema Gleichstromtechnik`})}),(0,c.jsxs)(`div`,{className:`input-numbers`,children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Strom I`}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Widerstand R`}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leistung P`}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P`,id:`P`}),(0,c.jsx)(`label`,{children:`P [Watt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Spannung U`}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{}),(0,c.jsx)(`button`,{type:`button`,id:`control-1`,"data-action":`calculateParametersURI`,onClick:t=>{e.current?.handlers.calculateParametersURI?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,c.jsx)(`label`,{})]})]}),(0,c.jsx)(`p`,{id:`result`,"aria-live":`polite`}),(0,c.jsx)(`br`,{})]})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{type:`button`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Spannungsteiler `,(0,c.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,c.jsxs)(`div`,{className:`dropdown-content`,children:[(0,c.jsxs)(`label`,{className:`switch`,children:[(0,c.jsx)(`input`,{type:`checkbox`,"aria-label":`Belasteter Spannungsteiler`,id:`modeSwitch`}),(0,c.jsx)(`span`,{className:`slider round`})]}),(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{}),(0,c.jsx)(`span`,{id:`modeLabel`,children:`unbelastet`}),(0,c.jsx)(`br`,{}),(0,c.jsxs)(`div`,{id:`circuitDiagram`,children:[(0,c.jsx)(`img`,{style:{maxWidth:`400px`,width:`80%`,height:`auto`},id:`circuitImage`,src:`/Pictures/Spannungsteiler_unbelastet.png`,alt:`Schaltung unbelastet`}),(0,c.jsxs)(`div`,{style:{display:`block`},id:`unbelastet`,className:`input-numbers`,children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Strom I`}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I_unb`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`1`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1_unb`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`2`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2_unb`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`in`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin_unb`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`1`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1_unb`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`out`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout_unb`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{}),(0,c.jsx)(`button`,{type:`button`,id:`control-3`,"data-action":`calculateUnb_Spannungsteiler`,onClick:t=>{e.current?.handlers.calculateUnb_Spannungsteiler?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,c.jsx)(`label`,{})]}),(0,c.jsx)(`p`,{id:`result_unb`,"aria-live":`polite`}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{style:{display:`none`},id:`belastet`,className:`input-numbers`,children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Strom I`,(0,c.jsx)(`sub`,{children:`ges`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom Iges`,id:`Iges_bel`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Strom I`,(0,c.jsx)(`sub`,{children:`R2`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IR2`,id:`IR2_bel`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Strom I`,(0,c.jsx)(`sub`,{children:`RL`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IRL`,id:`IRL_bel`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`1`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1_bel`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`2`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2_bel`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`L`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand RL`,id:`RL_bel`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`in`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin_bel`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`1`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1_bel`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Spannung U`,(0,c.jsx)(`sub`,{children:`out`})]}),(0,c.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout_bel`}),(0,c.jsx)(`label`,{children:`V [Volt]`})]}),(0,c.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateBel_Spannungsteiler`,onClick:t=>{e.current?.handlers.calculateBel_Spannungsteiler?.()}}),(0,c.jsx)(`p`,{id:`result_bel`,"aria-live":`polite`}),(0,c.jsx)(`br`,{})]})]})]})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{type:`button`,id:`control-4`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Serie- und Parallelschaltung `,(0,c.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,c.jsxs)(`div`,{className:`dropdown-content`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`button`,{type:`button`,id:`control-5`,className:`opv-button`,"data-action":`selectOPV`,onClick:t=>{e.current?.handlers.selectOPV?.(`serie_schaltung`,t.currentTarget)},children:[(0,c.jsx)(`img`,{src:`/Pictures/R_Serie.svg`,alt:`Serie Schaltung`}),(0,c.jsx)(`span`,{children:`Serie`})]}),(0,c.jsxs)(`button`,{type:`button`,id:`control-6`,className:`opv-button`,"data-action":`selectOPV`,onClick:t=>{e.current?.handlers.selectOPV?.(`parallel_schaltung`,t.currentTarget)},children:[(0,c.jsx)(`img`,{src:`/Pictures/R_Parallel.svg`,alt:`Parallel Schaltung`}),(0,c.jsx)(`span`,{children:`Parallel`})]})]}),(0,c.jsx)(`div`,{id:`inputFieldsSerieParallel`}),(0,c.jsx)(`div`,{id:`result_S_P`,"aria-live":`polite`}),(0,c.jsx)(`br`,{})]})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{type:`button`,id:`control-7`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Stern- Dreickschaltung `,(0,c.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsx)(`div`,{children:`
                            development in progress
                        `})})]}),(0,c.jsx)(`div`,{className:`divider`})]})]})}var u=l;export{u as component};