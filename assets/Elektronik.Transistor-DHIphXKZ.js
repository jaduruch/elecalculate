import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-D1EaDO0j.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(){let e=``,r=n.getElementById(`IC`).value,a=n.getElementById(`IB`).value,o=n.getElementById(`RL`).value,s=n.getElementById(`RB`).value,c=n.getElementById(`USpeisung`).value,l=n.getElementById(`UB`).value,u=n.getElementById(`UBE`).value,d=n.getElementById(`UCE`).value,f=n.getElementById(`B`).value,p=n.getElementById(`ue`).value;r||(a&&f&&p&&(e+=`
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>B</sub> lowast; B </span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${a}A lowast; ${f}</span><br>
                            <span>${p}</span>
                        </div> 
                    = ${v(t(a)*t(f)/t(p),`A`)}<br>`),c&&d&&o&&(e+=`
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>b</sub> - U<sub>CE</sub></span><br>
                            <span>R<sub>L</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c}V - ${d}V</span><br>
                            <span>${o}&Omega;</span>
                        </div> 
                    = ${v((t(c)-t(d))/t(o),`A`)}<br>`),l&&u&&f&&p&&s&&(e+=`
                        Kollektorstrom I<sub>C</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> (U<sub>B</sub> - U<sub>BE</sub>) lowast; B</span><br>
                            <span>&uuml; lowast; R<sub>B</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${l}V - ${u}V) lowast; ${f}</span><br>
                            <span>${p} lowast; ${s}&Omega;</span>
                        </div> 
                    = ${v((t(l)-t(u))*t(f)/t(p*t(s)),`A`)}<br>`)),a||(p&&r&&f&&(e+=`
                        Basisstrom I<sub>B</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>C</sub> lowast; &uuml; </span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${r}A lowast; ${p}</span><br>
                            <span>${f}</span>
                        </div> 
                    = ${v(t(r)*t(p)/t(f),`A`)}<br>`),l&&u&&s&&(e+=`
                        Basisstrom I<sub>B</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>B</sub> - U<sub>BE</sub></span><br>
                            <span>R<sub>B</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${l}V - ${u}V</span><br>
                            <span>${s}&Omega;</span>
                        </div> 
                    = ${v((t(l)-t(u))/t(s),`A`)}<br>`)),!o&&c&&d&&r&&(e+=`
                    Lastwiderstand R<sub>L</sub> = 
                    <div class ="fraction">
                        <span class="fraction-numerator"> U<sub>b</sub> - U<sub>CE</sub></span><br>
                        <span>I<sub>C</sub></span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator"> ${c}V - ${d}V</span><br>
                        <span>${r}A</span>
                    </div> 
                = ${v((t(c)-t(d))/t(r),`&Omega;`)}<br>`),!s&&l&&u&&f&&p&&r&&(e+=`
                    Basiswiderstand R<sub>B</sub> = 
                    <div class ="fraction">
                        <span class="fraction-numerator"> (U<sub>B</sub> - U<sub>BE</sub>) lowast; B </span><br>
                        <span>I<sub>C</sub>lowast; &uuml;</span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator"> (${l}V - ${u}V) lowast; ${f} </span><br>
                        <span>${r}Alowast; ${p}</span>
                    </div> 
                = ${v((t(l)-t(u))*t(f)/(t(r)*t(p)),`&Omega;`)}<br>`),!c&&r&&o&&d&&(e+=`
                            Speisespannung U<sub>b</sub> =
                            I<sub>C</sub> lowast; R<sub>L</sub> + U<sub>CE</sub>
                        =
                            ${r}A lowast; ${o}&Omega; + ${d}V
                        = ${v(t(r)*t(RC)+t(d),`V`)}<br>`),!l&&r&&s&&p&&f&&u&&s&&a&&u&&(e+=`
                            Basisspannung U<sub>B</sub> =
                            I<sub>B</sub> lowast; R<sub>B</sub> + U<sub>BE</sub>
                        =
                            ${a}A lowast; ${s}&Omega; + ${u}V
                        = ${v(t(a)*t(s)+t(u),`V`)}<br>`),i(n.getElementById(`result`),e)}function T(e){e.parentElement.classList.toggle(`open`)}return{handlers:{calculateTransistorAsSwitch:w,toggleDropdown:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
            border: 3px solid;
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

        /* Stil fuer die tiefergestellten Zeichen */
        sub {
            vertical-align: sub;
            font-size: smaller;
        }

        .transistorForm{
            /*padding: 10px;*/
            max-width: 150px;
        }

        /***************/
        input:checked + .slider:before {
            transform: translateX(14px);
        }

        input {
            border: 2px solid;
            border-radius: 3px;
        }

        input:focus {
            border: 3px solid;
            outline: none; /* Entfernt den Standard-Umrandungsring */
        }

        /* Stil fuer das Formular und Layout */
        .input-numbers {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 20px;
            max-width: 600px; /* Setzt eine maximale Breite */
            margin: 0 auto; /* Zentriert das Formular */
            /*margin-left: 10px;*/
        }

        .comment{
            font-size: smaller;
            font-style: italic;
            color:rgb(179, 179, 179);
            margin-left: 10px;
        }

        .form-row {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            width: 100%;
            margin-left: 10px;
            
        }

        .form-row label {
            flex: 3;
            text-align: left;
            margin-right: 10px;

        }

        h3 {
            margin-top: 20px;
        }

        .results{
            line-height: 2; /* Multiplikator fuer die Schriftgroesse */
        }

        .fraction
        {
            display: inline-block; 
            vertical-align: middle; 
            text-align: center;
            margin-top: 1px;
            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */
        }

        .fraction-numerator{
            border-bottom: 1px solid;
            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */
            display: inline-block; /* Macht die Anpassungen besser sichtbar */
        }
        img{
            width: 80%;
            max-width: 600px;
        }

        .comment{
            font-size: smaller;
            font-style: italic;
            color:rgb(179, 179, 179);
            margin-left: 10px;
        }

    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Transistor`]})}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Transistor als Schalter`,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`h2`,{children:`Schaltung`}),(0,s.jsx)(`img`,{style:{maxWidth:`450px`},src:`/Pictures/Transistor_Schalter.png`,alt:`Transistor Schaltung`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Kollektorstrom I`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Kollektorstrom IC`,id:`IC`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Basisstrom I`,(0,s.jsx)(`sub`,{children:`B`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Basisstrom IB`,id:`IB`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Lastwiderstand R`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Lastwiderstand RL`,id:`RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`B`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand RB`,id:`RB`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Speisespannung U`,(0,s.jsx)(`sub`,{children:`b`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Speisespannung Ub`,id:`USpeisung`}),(0,s.jsx)(`label`,{children:`U [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Basisspannung U`,(0,s.jsx)(`sub`,{children:`B`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Basisspannung UB`,id:`UB`}),(0,s.jsx)(`label`,{children:`U [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Basis-Emitter-Spannung U`,(0,s.jsx)(`sub`,{children:`BE`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Basis-Emitter-Spannung UBE`,id:`UBE`,placeholder:`0.7`}),(0,s.jsx)(`label`,{children:`U [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Kollektor-Emitter-Spannung U`,(0,s.jsx)(`sub`,{children:`CE`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Kollektor-Emitter-Spannung UCE`,id:`UCE`,placeholder:`0.2`}),(0,s.jsx)(`label`,{children:`U [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Basisstromverstärkung B`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Basisstromverstärkung B`,id:`B`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Übersteuerungsfaktor ü`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Übersteuerungsfaktor ü`,id:`ue`,placeholder:`3`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateTransistorAsSwitch`,onClick:t=>{e.current?.handlers.calculateTransistorAsSwitch?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Transistor als Verstärker `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsx)(`div`,{children:`
                            development in progress
                        `})})]})]})]})}var l=c;export{l as component};