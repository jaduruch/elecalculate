import{o as e}from"./matchContext-DAqmlEzK.js";import{c as t,f as n,m as r,p as i,t as a}from"./shared-DRJH367E.js";import{t as o}from"./chevron-V27U5W9E.js";function s(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(e){e.parentElement.classList.toggle(`open`)}function T(){return t(n,`conductor`)}function E(){return t(n,`temperature`)}function D(){return t(n,`density`)}return{handlers:{toggleDropdown:w,calculateLeitfaehigkeit:T,calculateTemperaturwiderstand:E,calculateStromdichte:D,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:i,parseInputsquare:r},dispose(){}}}var c=e();function l(){let e=n(s);return(0,c.jsxs)(c.Fragment,{children:[e.restoring&&(0,c.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,c.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,c.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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

        .fraction-denumerator {
            border-top: 1px solid;
            padding-top: 0.5px;
        }
    
} }`}),(0,c.jsx)(`div`,{children:(0,c.jsxs)(`h1`,{children:[(0,c.jsx)(`br`,{}),`Werkstoffe`]})}),(0,c.jsxs)(`div`,{className:`dropdown-container`,children:[(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Spezifischer Widerstand`,(0,c.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,c.jsx)(o,{direction:`down`})})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Gesamtwiderstand R`,(0,c.jsx)(`sub`,{children:`ges`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Gesamtwiderstand Rges`,id:`R`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leitfähigkeit χ`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`gray`},type:`text`,"aria-label":`Leitfähigkeit χ`,id:`x`}),(0,c.jsxs)(`label`,{children:[`m/(Ω ∗ mm`,(0,c.jsx)(`sup`,{children:`2`}),`)`]})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`spezifischer Widerstand ρ`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`gray`},type:`text`,"aria-label":`spezifischer Widerstand ρ`,id:`p`}),(0,c.jsxs)(`label`,{children:[`(Ω ∗ mm`,(0,c.jsx)(`sup`,{children:`2`}),`)/m`]})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leiterquerschnitt A`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterquerschnitt A`,id:`A`}),(0,c.jsxs)(`label`,{children:[`m`,(0,c.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leiterdurchmesser d`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterdurchmesser d`,id:`d`}),(0,c.jsx)(`label`,{children:`m [meter]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leiterlänge l`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Laenge)`},type:`text`,"aria-label":`Leiterlänge l`,id:`l`}),(0,c.jsx)(`label`,{children:`m [meter]`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateLeitfaehigkeit`,onClick:t=>{e.current?.invoke?.(`calculateLeitfaehigkeit`,t.currentTarget)}}),(0,c.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,c.jsx)(`div`,{id:`result_Leiter`,"aria-live":`polite`})]})})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Temperaturabhängigkeit Widerstände `,(0,c.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,c.jsx)(o,{direction:`down`})})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Kaltwiderstand R`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Kaltwiderstand R`,id:`Rk`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Warmwiderstand R`,(0,c.jsx)(`sub`,{children:`ϑ`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Warmwiderstand Rϑ`,id:`Rw`}),(0,c.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Temperaturbeiwert α`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`gray`},type:`text`,"aria-label":`Temperaturbeiwert α`,id:`alpha`}),(0,c.jsxs)(`label`,{children:[`K`,(0,c.jsx)(`sup`,{children:`-1`}),` [1/Klevin]`]})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Temperaturänderung ΔT`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Temperaturänderung ΔT`,id:`T`}),(0,c.jsx)(`label`,{children:`K [Kelvin]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Warmwert T`,(0,c.jsx)(`sub`,{children:`w`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Warmwert Tw`,id:`Tw`}),(0,c.jsx)(`label`,{children:`°C [Celsius]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsxs)(`label`,{children:[`Kaltwert T`,(0,c.jsx)(`sub`,{children:`k`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Kaltwert Tk`,id:`Tk`}),(0,c.jsx)(`label`,{children:`°C [Celsius]`})]}),(0,c.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateTemperaturwiderstand`,onClick:t=>{e.current?.invoke?.(`calculateTemperaturwiderstand`,t.currentTarget)}}),(0,c.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,c.jsx)(`div`,{id:`result_Temp`,"aria-live":`polite`})]})})]}),(0,c.jsx)(`div`,{className:`divider`}),(0,c.jsxs)(`div`,{className:`dropdown`,children:[(0,c.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                        Stromdichte `,(0,c.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,c.jsx)(o,{direction:`down`})})]}),(0,c.jsx)(`div`,{className:`dropdown-content`,children:(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,c.jsx)(`br`,{}),(0,c.jsx)(`br`,{})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Strom I`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I_J`}),(0,c.jsx)(`label`,{children:`A [Ampere]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Leiterdurchmesser d`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterdurchmesser d`,id:`d_J`}),(0,c.jsx)(`label`,{children:`m [meter]`})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Querschnittsfläche A`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Querschnittsfläche A`,id:`A_J`}),(0,c.jsxs)(`label`,{children:[`m`,(0,c.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,c.jsxs)(`div`,{className:`form-row`,children:[(0,c.jsx)(`label`,{children:`Stromdichte J`}),(0,c.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`gray`},type:`text`,"aria-label":`Stromdichte J`,id:`J`}),(0,c.jsxs)(`label`,{children:[`A/mm`,(0,c.jsx)(`sup`,{children:`2`})]})]}),(0,c.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateStromdichte`,onClick:t=>{e.current?.invoke?.(`calculateStromdichte`,t.currentTarget)}}),(0,c.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,c.jsx)(`div`,{id:`result_Stromd`,"aria-live":`polite`})]})})]})]})]})]})}var u=l;export{u as component};