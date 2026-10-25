import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,m as n,p as r,r as i,t as a}from"./shared-DRJH367E.js";function o(e){let{document:t,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,n){let r=t.getElementById(n);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,n===`serie`?(t.getElementById(`serie`).style.display=`block`,t.getElementById(`parallel`).style.display=`none`):(t.getElementById(`parallel`).style.display=`block`,t.getElementById(`serie`).style.display=`none`))}function E(){return i(t,`serie`)}function D(){return i(t,`parallel`)}return{handlers:{toggleSelection:T,calculateSerie:E,calculateParallel:D,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:r,parseInputsquare:n},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        .filter-button {
            position: relative;
            width: 200px; /* Adjust as needed */
            height: 200px; /* Adjust as needed */
            border: 2px solid transparent; /* Initially transparent */
            padding: 0;
            margin: 10px;
            background-color: transparent;
            cursor: pointer;
        }
        
        .filter-button img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .filter-button:hover {
            border-color: gray; /* Gray border for hovered button */
        }
        
        .filter-button.selected {
            border-color: white; /* White border for selected button */
        }     
        
        .filter-button span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 20px;
            padding: 2px 0;
        }

        input {
            border: 2px solid;
            border-radius: 3px;
        }

        input:focus {
            /*border: 3px solid;*/
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
            margin-bottom: 1px;
            line-height: 1.5; /* Multiplikator fuer die Schriftgroesse */
        }

        .fraction-numerator{
            border-bottom: 1px solid;
            padding-bottom: 0.2px; /* Sorgt fuer einen Abstand innerhalb des Elements */
            display: inline-block; /* Macht die Anpassungen besser sichtbar */
        }

        .fraction-denominator {
            border-top: 1px solid;
        }

        img{
            width: 80%;
            max-width: 600px;
        }

    
} }`}),(0,s.jsx)(`p`,{className:`comment`,children:`f ist die Signalfrequenz. Leer gelassen wird bei Resonanz gerechnet; abgeleitete Resonanzannahmen stehen im Lösungsweg.`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Schwingkreis`]})}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-0`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`serie`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`serie`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Serie_SW.png`,alt:`Serie`}),(0,s.jsx)(`span`,{children:`Serie Schwingkreis`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`parallel`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`parallel`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Parallel_SW.png`,alt:`Parallel`}),(0,s.jsx)(`span`,{children:`Parallel Schwingkreis`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`serie`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Serienschwingkreis`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-serie`}),(0,s.jsx)(`label`,{children:`H [Henry]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`(Kreis) Güte Q`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Guete)`},type:`text`,"aria-label":`(Kreis) Güte Q`,id:`Q-serie`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-serie`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U-serie`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UR`,id:`UR-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UL`,id:`UL-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UC`,id:`UC-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-serie`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Bandbreite b`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Bandbreite b`,id:`b-serie`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateSerie`,onClick:t=>{e.current?.invoke?.(`calculateSerie`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`parallel`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Parallelschwingkreis`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`ges`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom Iges`,id:`I-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IR`,id:`IR-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IL`,id:`IL-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IC`,id:`IC-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-parallel`}),(0,s.jsx)(`label`,{children:`H [Henry]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`(Kreis) Güte Q`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Guete)`},type:`text`,"aria-label":`(Kreis) Güte Q`,id:`Q-parallel`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-parallel`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-parallel`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Bandbreite b`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Bandbreite b`,id:`b-parallel`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateParallel`,onClick:t=>{e.current?.invoke?.(`calculateParallel`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_parallel`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})]})}var l=c;export{l as component};