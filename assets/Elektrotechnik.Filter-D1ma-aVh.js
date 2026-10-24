import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-CQ-439nf.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,t){let r=n.getElementById(t);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,t===`HP_RC`?(n.getElementById(`HP_RC`).style.display=`block`,n.getElementById(`HP_RL`).style.display=`none`,n.getElementById(`TP_RC`).style.display=`none`,n.getElementById(`TP_RL`).style.display=`none`):t===`HP_RL`?(n.getElementById(`HP_RC`).style.display=`none`,n.getElementById(`HP_RL`).style.display=`block`,n.getElementById(`TP_RL`).style.display=`none`,n.getElementById(`TP_RC`).style.display=`none`):t===`TP_RC`?(n.getElementById(`HP_RC`).style.display=`none`,n.getElementById(`HP_RL`).style.display=`none`,n.getElementById(`TP_RC`).style.display=`block`,n.getElementById(`TP_RL`).style.display=`none`):t===`TP_RL`&&(n.getElementById(`HP_RC`).style.display=`none`,n.getElementById(`HP_RL`).style.display=`none`,n.getElementById(`TP_RC`).style.display=`none`,n.getElementById(`TP_RL`).style.display=`block`))}function E(){let e=``,r=n.getElementById(`Winkel-HP_RC`).value,a=n.getElementById(`R-HP_RC`).value,o=n.getElementById(`XC-HP_RC`).value,s=n.getElementById(`C-HP_RC`).value,c=n.getElementById(`Uin-HP_RC`).value,l=n.getElementById(`Uc-HP_RC`).value;n.getElementById(`Uout-HP_RC`).value;let u=n.getElementById(`fg-HP_RC`).value,d=n.getElementById(`f-HP_RC`).value;r||l&&c&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = arcsin(
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denominator">U<sub>in</sub></span>
                        </div>)
                    =
                        <div class ="fraction">
                            <span>${l}V</span><br>
                            <span class="fraction-denominator">${c}V</span>
                        </div> 
                    = ${v(Math.asin(t(l)/t(c)),``)}<br>
                    

                    Winkel &phi;<sub>DEG</sub> = arcsin(
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denominator">U<sub>in</sub></span>
                        </div>)
                    =
                        <div class ="fraction">
                            <span>${l}V</span><br>
                            <span class="fraction-denominator">${c}V</span>
                        </div> 
                    = ${v(Math.asin(t(l)/t(c))*180/Math.PI,`&deg;`)}<br>
                    `),a||u&&s&&(e+=`
                        Widerstand R = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f<sub>g</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${u}Hz &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(u)*t(s)),`&Omega;`)}<br>`),o||d&&s&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${d}Hz &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(d)*t(s)),`&Omega;`)}<br>`),s||u&&a&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${a}&Omega; &lowast; ${u}Hz</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(a)*t(u)),`F`)}<br>`),u||a&&s&&(e+=`
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${a}&Omega; &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(a)*t(s)),`Hz`)}<br>`),i(n.getElementById(`result_HP_RC`),e)}function D(){let e=``;n.getElementById(`Winkel-HP_RL`).value;let r=n.getElementById(`R-HP_RL`).value,a=n.getElementById(`XL-HP_RL`).value,o=n.getElementById(`L-HP_RL`).value;n.getElementById(`Uin-HP_RL`).value,n.getElementById(`Uout-HP_RL`).value;let s=n.getElementById(`fg-HP_RL`).value,c=n.getElementById(`f-HP_RL`).value;r||s&&o&&(e+=`
                        Widerstand R = 
                        2&pi; &lowast; f<sub>g</sub> &lowast; L
                    =
                        2&pi; &lowast; ${s}Hz &lowast; ${o}H
                    = ${v(2*Math.PI*t(s)*t(o),`&Omega;`)}<br>`),a||c&&o&&(e+=`
                        Blindwiderstand X<sub>L</sub> = 
                        2&pi; &lowast; f &lowast; L
                    =
                        2&pi; &lowast; ${c}Hz &lowast; ${o}H
                    = ${v(2*Math.PI*t(c)*t(o),`&Omega;`)}<br>`),o||s&&r&&(e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${r}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${s}Hz</span>
                        </div> 
                    = ${v(t(r)/(2*Math.PI*t(s)),`F`)}<br>`),s||r&&o&&(e+=`
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${r}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${o}H</span>
                        </div> 
                    = ${v(t(r)/(2*Math.PI*t(o)),`Hz`)}<br>`),i(n.getElementById(`result_HP_RL`),e)}function O(){let e=``,r=n.getElementById(`Winkel-TP_RC`).value,a=n.getElementById(`R-TP_RC`).value,o=n.getElementById(`XC-TP_RC`).value,s=n.getElementById(`C-TP_RC`).value,c=n.getElementById(`Uin-TP_RC`).value,l=n.getElementById(`Uout-TP_RC`).value,u=n.getElementById(`fg-TP_RC`).value,d=n.getElementById(`f-TP_RC`).value;a||(u&&s&&(e+=`
                        Widerstand R = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f<sub>g</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${u}Hz &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(u)*t(s)),`&Omega;`)}<br>`),d&&s&&r&&(e+=`
                        Widerstand R = 
                        <div class ="fraction">
                            <span>tan(&phi;)</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>tan(${r}&deg;)</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${d}Hz &lowast; ${s}F</span>
                        </div> 
                    = ${v(Math.tan(t(r)*Math.PI/180)/(2*Math.PI*t(d)*t(s)),`&Omega;`)}<br>`),o&&r&&(e+=`
                        Widerstand R = tan(&phi;) &lowast; X<sub>C</sub>
                    = tan(${r}&deg;) &lowast; ${o}&Omega;
                    = ${v(Math.tan(t(r)*Math.PI/180)*t(o),`&Omega;`)}<br>`)),o||d&&s&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${d}Hz &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(d)*t(s)),`&Omega;`)}<br>`),s||u&&a&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${a}&Omega; &lowast; ${u}Hz</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(a)*t(u)),`F`)}<br>`),l||a&&s&&c&&s&&d&&(e+=`
                        Spannung   U<sub>out</sub> = 
                        <div class ="fraction">
                            <span> U<sub>1</sub> </span><br>
                            <span class="fraction-denominator">&radic;(1 + (2&pi; &lowast; F &lowast; R &lowast; C)<sup>2</sup>)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${c}V</span><br>
                            <span class="fraction-denominator">&radic;(1 + (2&pi; &lowast; ${d}Hz &lowast; ${a}&Omega; &lowast; ${s}F)<sup>2</sup>)</span>
                        </div> 
                    = ${v(t(c)/(1+(2*Math.PI*t(d)*t(a)*t(s))**2)**.5,`V`)}<br>`),u||a&&s&&(e+=`
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${a}&Omega; &lowast; ${s}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(a)*t(s)),`Hz`)}<br>`),i(n.getElementById(`result_TP_RC`),e)}function k(){let e=``;n.getElementById(`Winkel-TP_RL`).value;let r=n.getElementById(`R-TP_RL`).value,a=n.getElementById(`XL-TP_RL`).value,o=n.getElementById(`L-TP_RL`).value,s=n.getElementById(`Uin-TP_RL`).value,c=n.getElementById(`Uout-TP_RL`).value,l=n.getElementById(`fg-TP_RL`).value,u=n.getElementById(`f-TP_RL`).value;r||l&&o&&(e+=`
                        Widerstand R = 
                        2&pi; &lowast; f<sub>g</sub> &lowast; L
                    =
                        2&pi; &lowast; ${l}Hz &lowast; ${o}H
                    = ${v(2*Math.PI*t(l)*t(o),`&Omega;`)}<br>`),a||u&&o&&(e+=`
                        Blindwiderstand X<sub>L</sub> = 
                        2&pi; &lowast; f &lowast; L
                    =
                        2&pi; &lowast; ${u}Hz &lowast; ${o}H
                    = ${v(2*Math.PI*t(u)*t(o),`&Omega;`)}<br>`),o||(l&&r&&(e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; f<sub>g</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${r}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${l}Hz</span>
                        </div> 
                    = ${v(t(r)/(2*Math.PI*t(l)),`H`)}<br>`),r&&s&&c&&u&&(e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R &lowast; &radic;(U<sub>in</sub><sup>2</sup> - U<sub>out</sub><sup>2</sup>)</span><br>
                            <span>2&pi; &lowast;  f &lowast; U<sub>out</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${r}&Omega; &lowast; &radic;((${s}V)<sup>2</sup> - (${c}V)<sup>2</sup>)</span><br>
                            <span>2&pi; &lowast; ${u}Hz f &lowast; ${c}V</span>
                        </div> 
                    = ${v(t(r)*(t(s)**2-t(c)**2)**.5/(2*Math.PI*t(u)*t(c)),`H`)}<br>`)),s||c&&u&&o&&r&&(e+=`
                        Eingangsspannung U<sub>in</sub> = &radic;((U<sub>out</sub>)<sup>2</sup>
                        (<div class ="fraction">
                            <span class="fraction-numerator">U<sub>out</sub> &lowast; 2&pi; &lowast; f &lowast; L</span><br>
                            <span>R</span>
                        </div>)<sup>2</sup>)
                    = &radic;(${c}V)<sup>2</sup>
                        (<div class ="fraction">
                            <span class="fraction-numerator">${c}V &lowast; 2&pi; &lowast; ${u}Hz &lowast; ${o}H</span><br>
                            <span>${r}&Omega;</span>
                        </div>)<sup>2</sup>)
                    = ${v((t(c)**2+(t(c)*2*Math.PI*t(u)*t(o)/r)**2)**.5,`V`)}<br>`),l||r&&o&&(e+=`
                        Grenzfrequnez f<sub>g</sub> = 
                        <div class ="fraction">
                            <span> R </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; R &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${r}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${o}H</span>
                        </div> 
                    = ${v(t(r)/(2*Math.PI*t(o)),`Hz`)}<br>`),i(n.getElementById(`result_TP_RL`),e)}return{handlers:{toggleSelection:T,calculate_HP_RC:E,calculate_HP_RL:D,calculate_TP_RC:O,calculate_TP_RL:k,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Filter`})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`HP_RC`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`HP_RC`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/HP_RC_Schematic.png`,alt:`Hochpass RC`}),(0,s.jsx)(`span`,{children:`Hochpass RC`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`HP_RL`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`HP_RL`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/HP_RL_Schematic.png`,alt:`Hochpass RL`}),(0,s.jsx)(`span`,{children:`Hochpass RL`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-2`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`TP_RC`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`TP_RC`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/TP_RC_Schematic.png`,alt:`Tiefpass RC`}),(0,s.jsx)(`span`,{children:`Tiefpass RC`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-3`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`TP_RL`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`TP_RL`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/TP_RL_Schematic.png`,alt:`Tiefpass RL`}),(0,s.jsx)(`span`,{children:`Tiefpass RL`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`HP_RC`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Hochpass RC`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-HP_RC`}),(0,s.jsx)(`label`,{children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-HP_RC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-HP_RC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-HP_RC`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-HP_RC`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-HP_RC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UC`,id:`Uc-HP_RC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-HP_RC`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-HP_RC`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-HP_RC`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_HP_RC`,onClick:t=>{e.current?.handlers.calculate_HP_RC?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_HP_RC`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`HP_RL`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Hochpass RL`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-HP_RL`}),(0,s.jsx)(`label`,{children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-HP_RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-HP_RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-HP_RL`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-HP_RL`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-HP_RL`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-HP_RL`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-HP_RL`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-HP_RL`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_HP_RL`,onClick:t=>{e.current?.handlers.calculate_HP_RL?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_HP_RL`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`TP_RC`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Tiefpass RC`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-TP_RC`}),(0,s.jsx)(`label`,{children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-TP_RC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-TP_RC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-TP_RC`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-TP_RC`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-TP_RC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-TP_RC`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-TP_RC`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-TP_RC`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_TP_RC`,onClick:t=>{e.current?.handlers.calculate_TP_RC?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_TP_RC`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`TP_RL`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Tiefpass RL`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`Winkel-TP_RL`}),(0,s.jsx)(`label`,{children:`° [Grad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-TP_RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-TP_RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a-TP_RL`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-TP_RL`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uin`,id:`Uin-TP_RL`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`out`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung Uout`,id:`Uout-TP_RL`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Grenzfrequenz f`,(0,s.jsx)(`sub`,{children:`g`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Grenzfrequenz fg`,id:`fg-TP_RL`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-TP_RL`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_TP_RL`,onClick:t=>{e.current?.handlers.calculate_TP_RL?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_TP_RL`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};