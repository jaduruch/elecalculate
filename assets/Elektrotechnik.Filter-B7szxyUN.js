import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,m as n,n as r,p as i,t as a}from"./shared-VEyeTWJO.js";function o(e){let{document:t,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,n){let r=t.getElementById(n);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,n===`HP_RC`?(t.getElementById(`HP_RC`).style.display=`block`,t.getElementById(`HP_RL`).style.display=`none`,t.getElementById(`TP_RC`).style.display=`none`,t.getElementById(`TP_RL`).style.display=`none`):n===`HP_RL`?(t.getElementById(`HP_RC`).style.display=`none`,t.getElementById(`HP_RL`).style.display=`block`,t.getElementById(`TP_RL`).style.display=`none`,t.getElementById(`TP_RC`).style.display=`none`):n===`TP_RC`?(t.getElementById(`HP_RC`).style.display=`none`,t.getElementById(`HP_RL`).style.display=`none`,t.getElementById(`TP_RC`).style.display=`block`,t.getElementById(`TP_RL`).style.display=`none`):n===`TP_RL`&&(t.getElementById(`HP_RC`).style.display=`none`,t.getElementById(`HP_RL`).style.display=`none`,t.getElementById(`TP_RC`).style.display=`none`,t.getElementById(`TP_RL`).style.display=`block`))}function E(){return r(t,`HP_RC`)}function D(){return r(t,`HP_RL`)}function O(){return r(t,`TP_RC`)}function k(){return r(t,`TP_RL`)}return{handlers:{toggleSelection:T,calculate_HP_RC:E,calculate_HP_RL:D,calculate_TP_RC:O,calculate_TP_RL:k,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:i,parseInputsquare:n},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        .filter-button {
            position: relative;
            width: 150px; /* Adjust as needed */
            height: 100px; /* Adjust as needed */
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
            font-size: 14px;
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
            max-width: 800px; /* Setzt eine maximale Breite */
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
    
} }`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Filter`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-0`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`HP_RC`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`HP_RC`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/HP_RC_Schematic.png`,alt:`Hochpass RC`}),(0,s.jsx)(`span`,{children:`Hochpass RC`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`HP_RL`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`HP_RL`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/HP_RL_Schematic.png`,alt:`Hochpass RL`}),(0,s.jsx)(`span`,{children:`Hochpass RL`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-2`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`TP_RC`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`TP_RC`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/TP_RC_Schematic.png`,alt:`Tiefpass RC`}),(0,s.jsx)(`span`,{children:`Tiefpass RC`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-3`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`TP_RL`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`TP_RL`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/TP_RL_Schematic.png`,alt:`Tiefpass RL`}),(0,s.jsx)(`span`,{children:`Tiefpass RL`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`HP_RC`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Hochpass RC`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`Winkel-HP_RC`,children:`Winkel φ`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-HP_RC`,"aria-describedby":`Winkel-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`Winkel-HP_RC-unit`,children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`R-HP_RC`,children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-HP_RC`,"aria-describedby":`R-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`R-HP_RC-unit`,children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`XC-HP_RC`,children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-HP_RC`,"aria-describedby":`XC-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`XC-HP_RC-unit`,children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`a-HP_RC`,children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-HP_RC`,"aria-describedby":`a-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`a-HP_RC-unit`,children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`C-HP_RC`,children:`Kapazität C`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-HP_RC`,"aria-describedby":`C-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`C-HP_RC-unit`,children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uin-HP_RC`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-HP_RC`,"aria-describedby":`Uin-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`Uin-HP_RC-unit`,children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uc-HP_RC`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UC`,id:`Uc-HP_RC`,"aria-describedby":`Uc-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`Uc-HP_RC-unit`,children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uout-HP_RC`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-HP_RC`,"aria-describedby":`Uout-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`Uout-HP_RC-unit`,children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`fg-HP_RC`,children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-HP_RC`,"aria-describedby":`fg-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`fg-HP_RC-unit`,children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`f-HP_RC`,children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-HP_RC`,"aria-describedby":`f-HP_RC-unit`}),(0,s.jsx)(`label`,{id:`f-HP_RC-unit`,children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_HP_RC`,onClick:t=>{e.current?.invoke?.(`calculate_HP_RC`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_HP_RC`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`HP_RL`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Hochpass RL`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`Winkel-HP_RL`,children:`Winkel φ`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-HP_RL`,"aria-describedby":`Winkel-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`Winkel-HP_RL-unit`,children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`R-HP_RL`,children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-HP_RL`,"aria-describedby":`R-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`R-HP_RL-unit`,children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`XL-HP_RL`,children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-HP_RL`,"aria-describedby":`XL-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`XL-HP_RL-unit`,children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`a-HP_RL`,children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-HP_RL`,"aria-describedby":`a-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`a-HP_RL-unit`,children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`L-HP_RL`,children:`Induktivität L`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-HP_RL`,"aria-describedby":`L-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`L-HP_RL-unit`,children:`H [Henry]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uin-HP_RL`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-HP_RL`,"aria-describedby":`Uin-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`Uin-HP_RL-unit`,children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uout-HP_RL`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-HP_RL`,"aria-describedby":`Uout-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`Uout-HP_RL-unit`,children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`fg-HP_RL`,children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-HP_RL`,"aria-describedby":`fg-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`fg-HP_RL-unit`,children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`f-HP_RL`,children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-HP_RL`,"aria-describedby":`f-HP_RL-unit`}),(0,s.jsx)(`label`,{id:`f-HP_RL-unit`,children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_HP_RL`,onClick:t=>{e.current?.invoke?.(`calculate_HP_RL`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_HP_RL`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`TP_RC`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Tiefpass RC`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`Winkel-TP_RC`,children:`Winkel φ`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-TP_RC`,"aria-describedby":`Winkel-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`Winkel-TP_RC-unit`,children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`R-TP_RC`,children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-TP_RC`,"aria-describedby":`R-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`R-TP_RC-unit`,children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`XC-TP_RC`,children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-TP_RC`,"aria-describedby":`XC-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`XC-TP_RC-unit`,children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`a-TP_RC`,children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-TP_RC`,"aria-describedby":`a-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`a-TP_RC-unit`,children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`C-TP_RC`,children:`Kapazität C`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-TP_RC`,"aria-describedby":`C-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`C-TP_RC-unit`,children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uin-TP_RC`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-TP_RC`,"aria-describedby":`Uin-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`Uin-TP_RC-unit`,children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uout-TP_RC`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-TP_RC`,"aria-describedby":`Uout-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`Uout-TP_RC-unit`,children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`fg-TP_RC`,children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-TP_RC`,"aria-describedby":`fg-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`fg-TP_RC-unit`,children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`f-TP_RC`,children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-TP_RC`,"aria-describedby":`f-TP_RC-unit`}),(0,s.jsx)(`label`,{id:`f-TP_RC-unit`,children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_TP_RC`,onClick:t=>{e.current?.invoke?.(`calculate_TP_RC`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_TP_RC`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`TP_RL`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Tiefpass RL`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`Winkel-TP_RL`,children:`Winkel φ`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-TP_RL`,"aria-describedby":`Winkel-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`Winkel-TP_RL-unit`,children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`R-TP_RL`,children:`Widerstand R`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-TP_RL`,"aria-describedby":`R-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`R-TP_RL-unit`,children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`XL-TP_RL`,children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-TP_RL`,"aria-describedby":`XL-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`XL-TP_RL-unit`,children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`a-TP_RL`,children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-TP_RL`,"aria-describedby":`a-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`a-TP_RL-unit`,children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`L-TP_RL`,children:`Induktivität L`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-TP_RL`,"aria-describedby":`L-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`L-TP_RL-unit`,children:`H [Henry]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uin-TP_RL`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-TP_RL`,"aria-describedby":`Uin-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`Uin-TP_RL-unit`,children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`Uout-TP_RL`,children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-TP_RL`,"aria-describedby":`Uout-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`Uout-TP_RL-unit`,children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{htmlFor:`fg-TP_RL`,children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-TP_RL`,"aria-describedby":`fg-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`fg-TP_RL-unit`,children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{htmlFor:`f-TP_RL`,children:`Frequenz f`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-TP_RL`,"aria-describedby":`f-TP_RL-unit`}),(0,s.jsx)(`label`,{id:`f-TP_RL-unit`,children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_TP_RL`,onClick:t=>{e.current?.invoke?.(`calculate_TP_RL`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_TP_RL`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})]})}var l=c;export{l as component};