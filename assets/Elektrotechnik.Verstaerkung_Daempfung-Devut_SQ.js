import{o as e}from"./matchContext-DAqmlEzK.js";import{c as t,f as n,m as r,p as i,t as a}from"./shared-B2WX6C5w.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=a(e);function C(){return t(n,`gain`)}function w(e){return Math.log(e)/Math.log(10)}return{handlers:{calculateParameters:C,getlg:w,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:i,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Verstärkung und Dämpfung`})]}),(0,s.jsxs)(`div`,{className:`input-numbers`,children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I1`,id:`I1`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I2`,id:`I2`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkungsmass g`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsmass)`},type:`text`,"aria-label":`Verstärkungsmass g`,id:`g`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P1`,id:`P1`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P2`,id:`P2`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U2`,id:`U2`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannungs-/Stromfaktor V`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkungsfaktor V`,id:`V`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannungs-/Stromdämpfungsfaktor D`}),(0,s.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Dämpfungsfaktor D`,id:`D`}),(0,s.jsx)(`label`,{children:`1`})]})]}),(0,s.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateParameters`,onClick:t=>{e.current?.invoke?.(`calculateParameters`,t.currentTarget)}}),(0,s.jsx)(`h3`,{children:`Resultate`}),(0,s.jsx)(`div`,{id:`result`,"aria-live":`polite`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]})]})}var l=c;export{l as component};