import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-CQ-439nf.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,t){let r=n.getElementById(t);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,t===`invertierender_Verstaerker`?(n.getElementById(`invertierender_Verstaerker`).style.display=`block`,n.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,n.getElementById(`summier_Verstaerker`).style.display=`none`,n.getElementById(`differenz_Verstaerker`).style.display=`none`):t===`nicht_invertierender_Verstaerker`?(n.getElementById(`invertierender_Verstaerker`).style.display=`none`,n.getElementById(`nicht_invertierender_Verstaerker`).style.display=`block`,n.getElementById(`summier_Verstaerker`).style.display=`none`,n.getElementById(`differenz_Verstaerker`).style.display=`none`):t===`summier_Verstaerker`?(n.getElementById(`invertierender_Verstaerker`).style.display=`none`,n.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,n.getElementById(`summier_Verstaerker`).style.display=`block`,n.getElementById(`differenz_Verstaerker`).style.display=`none`):t===`differenz_Verstaerker`&&(n.getElementById(`invertierender_Verstaerker`).style.display=`none`,n.getElementById(`nicht_invertierender_Verstaerker`).style.display=`none`,n.getElementById(`summier_Verstaerker`).style.display=`none`,n.getElementById(`differenz_Verstaerker`).style.display=`block`))}function E(e){let t=n.getElementById(`opvImage1`);t&&(t.src=e)}function D(e){let t=n.getElementById(`opvImage2`);t&&(t.src=e)}function O(e){let t=n.getElementById(`opvImage3`);t&&(t.src=e)}function k(e){let t=n.getElementById(`opvImage4`);t&&(t.src=e)}function A(){let e=``,r=n.getElementById(`R1-1`).value,a=n.getElementById(`R2-1`).value,o=n.getElementById(`Uin-1`).value,s=n.getElementById(`Uout-1`).value,c=n.getElementById(`V-1`).value;c||(r&&a&&(e+=`
                                Verst&auml;rkung V = -
                                <div class ="fraction">
                                    <span class="fraction-numerator"> R2 </span><br>
                                    <span>R1</span>
                                </div> 
                            = - 
                                <div class ="fraction">
                                    <span class="fraction-numerator"> ${a}&Omega; </span><br>
                                    <span>${r}&Omega;</span>
                                </div> 
                            
                            = -${v(t(a)/t(r),``)}<br>`),s&&o&&(e+=`
                             Verst&auml;rkung V = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout </span><br>
                                    <span>Uin</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${s}V </span><br>
                                    <span>${o}V</span>
                                </div> 
                            = -${v(t(s)/t(o),``)}<br>`)),o||(s&&c&&(e+=`
                             Uin = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout </span><br>
                                    <span>V</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${s}V </span><br>
                                    <span>${c}</span>
                                </div> 
                             = -${v(t(s)/t(c),`V`)}<br>`),s&&a&&r&&(e+=`
                             Uin = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uout &lowast; R1</span><br>
                                    <span>R2</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${s}V &lowast; ${r}&Omega;</span><br>
                                    <span>${a}&Omega;</span>
                                </div> 
                            = -${v(t(s)*t(r)/t(a),`V`)}<br>`)),s||(o&&c&&(e+=` 
                                Uout = -Uin &lowast; V 
                            = -${o}V &lowast; ${c} 
                            = -${v(t(o)*t(c),`V`)}<br>`),o&&a&&r&&(e+=` 
                            Uout = 
                            - 
                            <div class ="fraction">
                                    <span class="fraction-numerator"> Uin &lowast; R<sub>2</sub> </span><br>
                                    <span>R<sub>1</sub></span>
                                </div> 
                            = - 
                            
                                <div class ="fraction">
                                    <span class="fraction-numerator"> ${o}V &lowast; ${a}&Omega; </span><br>
                                    <span>${r}&Omega;</span>
                                </div> 
                            = -${v(t(o)*t(a)/t(r),`V`)}<br>`)),r||(a&&c&&(e+=`
                             R1 = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -R2 </span><br>
                                    <span>V</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${a}&Omega; </span><br>
                                    <span>${c}</span>
                                </div> 
                             = -${v(t(a)/t(c),`&Omega;`)}<br>`),a&&o&&s&&(e+=`
                             R1 = 
                             <div class ="fraction">
                                    <span class="fraction-numerator"> -Uin &lowast; R2</span><br>
                                    <span>Uout</span>
                                </div> 
                            =
                                <div class ="fraction">
                                    <span class="fraction-numerator"> -${o}V &lowast; ${a}&Omega; </span><br>
                                    <span>${s}V</span>
                                </div> 
                            = -${v(t(o)*t(a)/t(s),`&Omega;`)}<br>`)),a||(r&&c&&(e+=`
                             R2 = 
                                -R1 &lowast; V 
                             = -${r}&Omega; &lowast; ${c} 
                             = ${v(t(r)*t(c),`&Omega;`)}<br>`),r&&s&&o&&(e+=` 
                            R2 = - 
                            <div class="fraction">
                                    <span class="fraction-numerator"> R1 &lowast; Uout </span><br>
                                    <span>Uin</span>
                                </div> 
                            = - 
                                <div class="fraction">
                                    <span class="fraction-numerator"> ${r}&Omega; &lowast; ${s}V </span><br>
                                    <span>${o}V</span>
                                </div> 
                            = -${v(t(r)*t(s)/t(o),`&Omega;`)}<br>`)),i(n.getElementById(`result_invertierender_Verstaerker`),e)}function j(){let e=``,r=n.getElementById(`R1-2`).value,a=n.getElementById(`R2-2`).value,o=n.getElementById(`Uin-2`).value,s=n.getElementById(`Uout-2`).value,c=n.getElementById(`V-2`).value;c||(r&&a&&(e+=`
                        Verst&auml;rkung V = 1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R2 </span><br>
                            <span>R1</span>
                        </div> 
                    = 1 +
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${a}&Omega; </span><br>
                            <span>${r}&Omega;</span>
                        </div> 
                    
                    = ${v(1+t(a)/t(r),``)}<br>`),s&&o&&(e+=`
                    Verst&auml;rkung V = 1 + 
                    <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>Uin</span>
                        </div> 
                    = 1 +
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}V </span><br>
                            <span>${o}V</span>
                        </div> 
                    = ${v(1+t(s)/t(o),``)}<br>`)),o||(s&&c&&(e+=`
                        Uin = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>V</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}V </span><br>
                            <span>${c}</span>
                        </div> 
                        = ${v(t(s)/t(c),`V`)}<br>`),s&&a&&r&&(e+=`
                        Uin =
                        <div class ="fraction">
                            <span class="fraction-numerator">Uout &lowast; R1</span><br>
                            <span>R1 + R2</span>
                        </div>
                    = 
                        <div class ="fraction"> 
                            <span class="fraction-numerator">${s}V &lowast; ${r}&Omega;</span><br>
                            <span>${r}&Omega; + ${a}&Omega;</span>
                        </div>
                    = ${v((t(s)+t(r))/(t(r)+t(a)),`V`)}<br>`)),s||(o&&c&&(e+=`
                        Uout = 
                        V &lowast; Uin 
                        = ${c} &lowast; ${o}V
                        = ${v(t(c)*t(o),`V`)}<br>`),o&&r&&a&&(e+=`
                        Uout = Uin &lowast; (1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R2 </span><br>
                            <span>R1</span>
                        </div> )
                        = ${o}V &lowast; (1 + 
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${a}&Omega; </span><br>
                            <span>${r}&Omega;</span>
                        </div> )
                        = ${v(t(o)*(1+t(a)/t(r)),`V`)}<br>`)),r||(c&&a&&(e+=`
                        R1 = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R1 </span><br>
                            <span>V - 1</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${a}&Omega; </span><br>
                            <span>${c} - 1</span>
                        </div> 
                        = ${v(t(a)/(t(c)-1),`&Omega;`)}<br>`),o&&s&&a&&(e+=`
                        R1 = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uin &lowast; R2 </span><br>
                            <span>Uout - Uin</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${o}V &lowast; ${a}&Omega; </span><br>
                            <span>${s} - ${o}</span>
                        </div> 
                        = ${v(t(o)*t(a)/(t(s)-t(o)),`&Omega;`)}<br>`)),a||(r&&c&&(e+=`
                        R2 = 
                        R1 &lowast; (V - 1) 
                        = ${r}&Omega; &lowast; (${c}- 1)
                        = ${v(t(r)*(t(c)-1),`&Omega;`)}<br>`),r&&o&&s&&(e+=`
                        R2 = R1 &lowast; ( 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Uout </span><br>
                            <span>Uin</span>
                        </div> -1)
                        = ${r}&Omega; &lowast; ( 
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}V </span><br>
                            <span>${o}V</span>
                        </div> -1)
                        = ${v(t(r)*(t(s)/t(o)-1),`&Omega;`)}<br>`)),i(n.getElementById(`result_nicht_invertierender_Verstaerker`),e)}function M(){let e=``,r=n.getElementById(`R11-3`).value,a=n.getElementById(`R12-3`).value,o=n.getElementById(`R2-3`).value,s=n.getElementById(`Uin1-3`).value,c=n.getElementById(`Uin2-3`).value,l=n.getElementById(`Uout-3`).value;n.getElementById(`V1-3`).value,n.getElementById(`V2-3`).value,l||r&&a&&o&&s&&c&&(e+=` 
                    U<sub>out</sub> =  
                    - <div class="fraction">
                            <span class="fraction-numerator">R<sub>2</sub></span><br>
                            <span>R<sub>11</sub></span>
                        </div> &lowast; U<sub>in1</sub>

                    - <div class="fraction">
                            <span class="fraction-numerator">R<sub>2</sub></span><br>
                            <span>R<sub>12</sub></span>
                        </div> &lowast; U<sub>in2</sub>    
                        
                    = 
                    - <div class="fraction">
                            <span class="fraction-numerator">${o}&Omega;</span><br>
                            <span>${r}&Omega;</span>
                        </div> &lowast; ${s}V

                    - <div class="fraction">
                            <span class="fraction-numerator">${o}&Omega;</span><br>
                            <span>${a}&Omega;</span>
                        </div> &lowast; ${c}V   
                    = ${v(-(t(o)/t(r))*t(s)-t(o)/t(a)*t(c),`V`)}<br>`),i(n.getElementById(`result_summier_Verstaerker`),e)}function N(){let e=``;n.getElementById(`R13-4`).value,n.getElementById(`R24-4`).value,n.getElementById(`Uin1-4`).value,n.getElementById(`Uin2-4`).value,n.getElementById(`Uout-4`).value,n.getElementById(`V-4`).value,e=` 
                    development in progress <br>`,i(n.getElementById(`result_differenz_Verstaerker`),e)}return{handlers:{toggleSelection:T,updateImage1:E,updateImage2:D,updateImage3:O,updateImage4:k,calculate_invertierender_Verstaerker:A,calculate_nicht_invertierender_Verstaerker:j,calculate_summier_Verstaeker:M,calculate_differenz_Verstaerker:N,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`OPV`]})}),(0,s.jsxs)(`div`,{id:`opvButtons`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`invertierender_Verstaerker`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`invertierender_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Invertierender_Verstaerker.JPG`,alt:`invertierender Verstaerker`}),(0,s.jsx)(`span`,{children:`invertierender Verstärker`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`nicht_invertierender_Verstaerker`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`nicht_invertierender_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker.JPG`,alt:`nicht-invertierender Verstaerker`}),(0,s.jsx)(`span`,{children:`nicht-invertierender Verstärker`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-2`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`summier_Verstaerker`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`summier_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Summier_Verstaerker.JPG`,alt:`Summier Verstaerker`}),(0,s.jsx)(`span`,{children:`Summier Verstärker`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-3`,className:`opv-button `,"data-action":`toggleSelection`,"data-target":`differenz_Verstaerker`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`differenz_Verstaerker`)},children:[(0,s.jsx)(`img`,{src:`/Elektronik/OPV_Bilder/Differenz_Verstaerker.JPG`,alt:`Differenz Verstaerker`}),(0,s.jsx)(`span`,{children:`Subtrahier Verstärker`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`invertierender_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`invertierender Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage1`,src:`/Elektronik/OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`1`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.handlers.updateImage1?.(`OPV_Bilder/Invertierender_Verstaerker_R1.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.handlers.updateImage1?.(`OPV_Bilder/Invertierender_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.handlers.updateImage1?.(`OPV_Bilder/Invertierender_Verstaerker_Uin.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.handlers.updateImage1?.(`OPV_Bilder/Invertierender_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-1`,"data-action":`updateImage1`,onClick:t=>{e.current?.handlers.updateImage1?.(`OPV_Bilder/Invertierender_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_invertierender_Verstaerker`,onClick:t=>{e.current?.handlers.calculate_invertierender_Verstaerker?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_invertierender_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`nicht_invertierender_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`nicht-invertierender Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage2`,src:`/Elektronik/OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`1`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.handlers.updateImage2?.(`OPV_Bilder/Nicht_Invertierender_Verstaerker_R1.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.handlers.updateImage2?.(`OPV_Bilder/Nicht_Invertierender_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.handlers.updateImage2?.(`OPV_Bilder/Nicht_Invertierender_Verstaerker_Uin.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.handlers.updateImage2?.(`OPV_Bilder/Nicht_Invertierender_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-2`,"data-action":`updateImage2`,onClick:t=>{e.current?.handlers.updateImage2?.(`OPV_Bilder/Nicht_Invertierender_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_nicht_invertierender_Verstaerker`,onClick:t=>{e.current?.handlers.calculate_nicht_invertierender_Verstaerker?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_nicht_invertierender_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`summier_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Summier Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage3`,src:`/Elektronik/OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. R`,(0,s.jsx)(`sub`,{children:`11`}),` = 10kΩ → Eingabe: 10k (nicht 10kΩ)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`11`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R11`,id:`R11-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_R11.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`12`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R12`,id:`R12-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_R12.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_R2.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin1`,id:`Uin1-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_Uin1.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin2`,id:`Uin2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_Uin2.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V1`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V1`,id:`V1-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V2`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V2`,id:`V2-3`,"data-action":`updateImage3`,onClick:t=>{e.current?.handlers.updateImage3?.(`OPV_Bilder/Summier_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_summier_Verstaeker`,onClick:t=>{e.current?.handlers.calculate_summier_Verstaeker?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_summier_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`differenz_Verstaerker`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Differenz Verstärker`}),(0,s.jsx)(`img`,{id:`opvImage4`,src:`/Elektronik/OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG`,alt:`Invertierender Verstaerker`,width:`500`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`out`}),` = 125mV → Eingabe: 125m (nicht 125mV)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`}),`/R`,(0,s.jsx)(`sub`,{children:`3`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1/R3`,id:`R13-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_R1_R3.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`}),`/R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2/R2`,id:`R24-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_R2_R4.JPG`)}}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin1`,id:`Uin1-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_Uin1.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin1`,id:`Uin2-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_Uin2.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_Uout.JPG`)}}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkung V`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkung V`,id:`V-4`,"data-action":`updateImage4`,onClick:t=>{e.current?.handlers.updateImage4?.(`OPV_Bilder/Differenz_Verstaerker_Beschriftet.JPG`)}}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_differenz_Verstaerker`,onClick:t=>{e.current?.handlers.calculate_differenz_Verstaerker?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_differenz_Verstaerker`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};