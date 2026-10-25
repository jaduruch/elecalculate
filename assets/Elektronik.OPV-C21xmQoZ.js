import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,l as n,m as r,p as i,t as a}from"./shared-DRJH367E.js";function o(e){let{document:t,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,n){let r=t.getElementById(n);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,n===`invertierender_Verstaerker`?(t.getElementById(`invertierender_Verstaerker`).style.display=`block`,t.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,t.getElementById(`summier_Verstaerker`).style.display=`none`,t.getElementById(`differenz_Verstaerker`).style.display=`none`):n===`nicht_invertierender_Verstaerker`?(t.getElementById(`invertierender_Verstaerker`).style.display=`none`,t.getElementById(`nicht_invertierender_Verstaerker`).style.display=`block`,t.getElementById(`summier_Verstaerker`).style.display=`none`,t.getElementById(`differenz_Verstaerker`).style.display=`none`):n===`summier_Verstaerker`?(t.getElementById(`invertierender_Verstaerker`).style.display=`none`,t.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,t.getElementById(`summier_Verstaerker`).style.display=`block`,t.getElementById(`differenz_Verstaerker`).style.display=`none`):n===`differenz_Verstaerker`&&(t.getElementById(`invertierender_Verstaerker`).style.display=`none`,t.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,t.getElementById(`summier_Verstaerker`).style.display=`none`,t.getElementById(`differenz_Verstaerker`).style.display=`block`))}function E(e){let n=t.getElementById(`opvImage1`);n&&(n.src=e)}function D(e){let n=t.getElementById(`opvImage2`);n&&(n.src=e)}function O(e){let n=t.getElementById(`opvImage3`);n&&(n.src=e)}function k(e){let n=t.getElementById(`opvImage4`);n&&(n.src=e)}function A(){return n(t,`inverting`)}function j(){return n(t,`noninverting`)}function M(){return n(t,`summing`)}function N(){return n(t,`difference`)}return{handlers:{toggleSelection:T,updateImage1:E,updateImage2:D,updateImage3:O,updateImage4:k,calculate_invertierender_Verstaerker:A,calculate_nicht_invertierender_Verstaerker:j,calculate_summier_Verstaeker:M,calculate_differenz_Verstaerker:N,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:i,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        /*Slider*/
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

        input:checked + .slider:before {
            transform: translateX(14px);
        }


        .opv-button {
            position: relative;
            width: 200px; /* Adjust as needed */
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
    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`OPV`]})}),(0,s.jsxs)(`div`,{id:`opvButtons`,children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-0`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`invertierender_Verstaerker`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`invertierender_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Invertierender_Verstaerker.JPG`,alt:`invertierender Verstaerker`}),(0,s.jsx)(`span`,{children:`invertierender Verstärker`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`nicht_invertierender_Verstaerker`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`nicht_invertierender_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker.JPG`,alt:`nicht-invertierender Verstaerker`}),(0,s.jsx)(`span`,{children:`nicht-invertierender Verstärker`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-2`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`summier_Verstaerker`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`summier_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Summier_Verstaerker.JPG`,alt:`Summier Verstaerker`}),(0,s.jsx)(`span`,{children:`Summier Verstärker`})]}),(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-3`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`differenz_Verstaerker`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`differenz_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Differenz_Verstaerker.JPG`,alt:`Differenz Verstaerker`}),(0,s.jsx)(`span`,{children:`Subtrahier Verstärker`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`invertierender_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`invertierender Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage1`,src:`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`1`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.invoke?.(`updateImage1`,t.currentTarget,`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_R1.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.invoke?.(`updateImage1`,t.currentTarget,`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.invoke?.(`updateImage1`,t.currentTarget,`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Uin.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.invoke?.(`updateImage1`,t.currentTarget,`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.invoke?.(`updateImage1`,t.currentTarget,`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_invertierender_Verstaerker`,onClick:t=>{e.current?.invoke?.(`calculate_invertierender_Verstaerker`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_invertierender_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`nicht_invertierender_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`nicht-invertierender Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage2`,src:`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`1`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.invoke?.(`updateImage2`,t.currentTarget,`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_R1.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.invoke?.(`updateImage2`,t.currentTarget,`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.invoke?.(`updateImage2`,t.currentTarget,`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Uin.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.invoke?.(`updateImage2`,t.currentTarget,`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.invoke?.(`updateImage2`,t.currentTarget,`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_nicht_invertierender_Verstaerker`,onClick:t=>{e.current?.invoke?.(`calculate_nicht_invertierender_Verstaerker`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_nicht_invertierender_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`summier_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Summier Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage3`,src:`/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`11`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`11`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R11`,id:`R11-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_R11.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`12`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R12`,id:`R12-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_R12.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin1`,id:`Uin1-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_Uin1.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin2`,id:`Uin2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_Uin2.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V1`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V1`,id:`V1-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V2`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V2`,id:`V2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.invoke?.(`updateImage3`,t.currentTarget,`/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_summier_Verstaeker`,onClick:t=>{e.current?.invoke?.(`calculate_summier_Verstaeker`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_summier_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`differenz_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Differenz Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage4`,src:`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`out`}),` = 125mV → Eingabe: 125m (nicht 125mV)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`}),`/R`,(0,s.jsx)(`sub`,{children:`3`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1/R3`,id:`R13-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_R1_R3.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R2/R4`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2/R4`,id:`R24-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_R2_R4.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin1`,id:`Uin1-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uin1.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung Uin2`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin2`,id:`Uin2-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uin2.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.invoke?.(`updateImage4`,t.currentTarget,`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_differenz_Verstaerker`,onClick:t=>{e.current?.invoke?.(`calculate_differenz_Verstaerker`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`div`,{id:`result_differenz_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})]})}var l=c;export{l as component};