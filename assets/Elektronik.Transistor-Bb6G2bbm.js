import{o as e}from"./matchContext-DAqmlEzK.js";import{c as t,f as n,m as r,p as i,t as a}from"./shared-VEyeTWJO.js";import{t as o}from"./chevron-V27U5W9E.js";function s(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(){return t(n,`transistor`)}function T(e){e.parentElement.classList.toggle(`open`)}return{handlers:{calculateTransistorAsSwitch:w,toggleDropdown:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:i,parseInputsquare:r},dispose(){}}}var c=e();function l(){let e=n(s);return(0,c.jsxs)(c.Fragment,{children:[e.restoring&&(0,c.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,c.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,c.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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

    
} }`}),(0,c.jsx)(`div`,{children:(0,c.jsxs)(`h1`,{children:[(0,c.jsx)(`br`,{}),`Transistor`]})}),(0,c.jsxs)(`div`,{className:`dropdown-container`,children:[(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Transistor als Schalter`,(0,c.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,c.jsx)(o,{direction:`down`})})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`h2`,{children:`Schaltung`}),(0,c.jsx)(`img`,{style:{maxWidth:`450px`},src:`/Pictures/Transistor_Schalter.png`,alt:`Transistor Schaltung`}),(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`IC`,children:[`Kollektorstrom I`,(0,c.jsx)(`sub`,{children:`C`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Kollektorstrom IC`,id:`IC`,"aria-describedby":`IC-unit`}),(0,c.jsx)(`label`,{id:`IC-unit`,children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`IB`,children:[`Basisstrom I`,(0,c.jsx)(`sub`,{children:`B`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Basisstrom IB`,id:`IB`,"aria-describedby":`IB-unit`}),(0,c.jsx)(`label`,{id:`IB-unit`,children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`RL`,children:[`Lastwiderstand R`,(0,c.jsx)(`sub`,{children:`L`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Lastwiderstand RL`,id:`RL`,"aria-describedby":`RL-unit`}),(0,c.jsx)(`label`,{id:`RL-unit`,children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`RB`,children:[`Widerstand R`,(0,c.jsx)(`sub`,{children:`B`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand RB`,id:`RB`,"aria-describedby":`RB-unit`}),(0,c.jsx)(`label`,{id:`RB-unit`,children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`USpeisung`,children:[`Speisespannung U`,(0,c.jsx)(`sub`,{children:`b`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Speisespannung Ub`,id:`USpeisung`,"aria-describedby":`USpeisung-unit`}),(0,c.jsx)(`label`,{id:`USpeisung-unit`,children:`U [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`UB`,children:[`Basisspannung U`,(0,c.jsx)(`sub`,{children:`B`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Basisspannung UB`,id:`UB`,"aria-describedby":`UB-unit`}),(0,c.jsx)(`label`,{id:`UB-unit`,children:`U [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`UBE`,children:[`Basis-Emitter-Spannung U`,(0,c.jsx)(`sub`,{children:`BE`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Basis-Emitter-Spannung UBE`,id:`UBE`,placeholder:`0.7`,"aria-describedby":`UBE-unit`}),(0,c.jsx)(`label`,{id:`UBE-unit`,children:`U [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{htmlFor:`UCE`,children:[`Kollektor-Emitter-Spannung U`,(0,c.jsx)(`sub`,{children:`CE`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Kollektor-Emitter-Spannung UCE`,id:`UCE`,placeholder:`0.2`,"aria-describedby":`UCE-unit`}),(0,c.jsx)(`label`,{id:`UCE-unit`,children:`U [Volt]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{htmlFor:`B`,children:`Basisstromverstärkung B`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Basisstromverstärkung B`,id:`B`,"aria-describedby":`B-unit`}),(0,c.jsx)(`label`,{id:`B-unit`,children:`1`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{htmlFor:`ue`,children:`Übersteuerungsfaktor ü`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Übersteuerungsfaktor ü`,id:`ue`,placeholder:`3`,"aria-describedby":`ue-unit`}),(0,c.jsx)(`label`,{id:`ue-unit`,children:`1`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateTransistorAsSwitch`,onClick:t=>{e.current?.invoke?.(`calculateTransistorAsSwitch`,t.currentTarget)}}),(0,c.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,c.jsx)(`div`,{id:`result`,"aria-live":`polite`})]})})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Transistor als Verstärker `,(0,c.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,c.jsx)(o,{direction:`down`})})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsx)(`div`,{children:`
                            In dieser Version nicht umgesetzt.
                        `})})]})]})]})]})}var u=l;export{u as component};