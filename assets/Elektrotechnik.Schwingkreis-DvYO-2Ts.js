import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-B_jRmEqB.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null;function T(e,t){let r=n.getElementById(t);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,t===`serie`?(n.getElementById(`serie`).style.display=`block`,n.getElementById(`parallel`).style.display=`none`):(n.getElementById(`parallel`).style.display=`block`,n.getElementById(`serie`).style.display=`none`))}function E(){let e=``,r=n.getElementById(`R-serie`).value,a=n.getElementById(`XL-serie`).value,o=n.getElementById(`XC-serie`).value,s=n.getElementById(`L-serie`).value,c=n.getElementById(`Q-serie`).value,l=n.getElementById(`C-serie`).value,u=n.getElementById(`U-serie`).value,d=n.getElementById(`UR-serie`).value,f=n.getElementById(`UL-serie`).value,p=n.getElementById(`UC-serie`).value,m=n.getElementById(`f-serie`).value,h=n.getElementById(`b-serie`).value;r||s&&l&&c&&(e+=`
                        Verlustwiderstand R<sub>v</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">Q</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">${c}</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>${s}H</span><br>
                            <span class="fraction-denominator">${l}F</span>
                        </div> )
                    = ${v(1/t(c)*(2*Math.PI*(t(s)/t(l))**.5),`&Omega;`)}<br>`),a||m&&s&&(e+=`
                    Blindwiderstand X<sub>L</sub> = 2&pi; &lowast; f &lowast; L
                =
                    2&pi; &lowast; ${m}Hz &lowast; ${s}H
                = ${v(2*Math.PI*t(m)*t(s),`&Omega;`)}<br>`),o||m&&l&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz &lowast; ${l}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(m)*t(l)),`&Omega;`)}<br>`),s||(m&&l&&(e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${m}Hz)<sup>2</sup> &lowast; ${l}F</span>
                        </div> 
                    = ${v(1/((2*Math.PI*t(m))**2*t(l)),`H`)}<br>`),a&&m&&(e+=`
                        Induktivit&auml;t L =
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${a}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz</span>
                        </div> 
                    = ${v(t(a)/(2*Math.PI*t(m)),`H`)}<br>`),c&&r&&l&&(e+=`
                    Induktivit&auml;t L = (Q &lowast; R<sub>v</sub>)<sup>2</sup> &lowast; C
                =
                    (${c} &lowast; ${r}&Omega;)<sup>2</sup> &lowast; ${l}F
                = ${v((t(c)*t(r))**2*t(l),`H`)}<br>`)),c||(!f&&u&&(e+=`
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>L</sub> </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${f}V </span><br>
                            <span>${u}V</span>
                        </div> 
                    = ${v(t(f)/t(u),` `)}<br>`),p&&u&&(e+=`
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>C</sub> </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${p}V </span><br>
                            <span>${u}V</span>
                        </div> 
                    = ${v(t(p)/t(u),` `)}<br>`),a&&r&&(e+=`
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> X<sub>L</sub> </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${a}&Omega; </span><br>
                            <span>${r}&Omega;</span>
                        </div> 
                    = ${v(t(a)/t(r),` `)}<br>`),o&&r&&(e+=`
                        (Kreis) G&uuml;te Q =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> X<sub>C</sub> </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${o}&Omega; </span><br>
                            <span>${r}&Omega;</span>
                        </div> 
                    = ${v(t(o)/t(r),` `)}<br>`),s&&l&&r&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">R<sub>v</sub></span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">${r}&Omega;</span>
                        </div> &lowast; &radic;(
                        <div class ="fraction">
                            <span>${s}H</span><br>
                            <span class="fraction-denominator">${l}F</span>
                        </div> )
                    = ${v(1/t(r)*(t(s)/t(l))**.5,``)}<br>`),m&&h&&(e+=`
                        (Kreis) G&uuml;te Q> =  = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> f<sub>g</sub> </span><br>
                            <span>b</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${m}Hz </span><br>
                            <span>${h}Hz</span>
                        </div> 
                    = ${v(t(m)/t(h),` `)}<br>`)),l||(m&&s&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${m}Hz)<sup>2</sup> &lowast; ${s}H</span>
                        </div> 
                    = ${v(1/((2*Math.PI*t(m))**2*t(s)),`F`)}<br>`),o&&m&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz &lowast; ${a}&Omega;</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(m)*t(a)),`F`)}<br>`),c&&r&&s&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> L </span><br>
                            <span class="fraction-denominator">(Q &lowast; R)<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}H</span><br>
                            <span class="fraction-denominator">(${c} &lowast; ${r}&Omega;)<sup>2</sup></span>
                        </div> 
                    = ${v(t(s)/(t(c)*t(r))**2,`F`)}<br>`)),u||d&&f&&p&&(e+=`
                    Spannung U<sub>ges</sub> = &radic;((U<sub>R</sub>)<sup>2</sup> + (U<sub>L</sub> - U<sub>C</sub>)<sup>2</sup>)
                    =
                        &radic;((${d}V)<sup>2</sup> + (${f}V - ${p}V)<sup>2</sup>)
                    = ${v((t(d)**2+(t(f)-t(p))**2)**.5,`V`)}<br>`),m||(s&&l&&(e+=`
                        Resonanzfrequenz f<sub>r</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &radic;(L &lowast; C)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &radic;(${s}H &lowast; ${l}F)</span>
                        </div> 
                    = ${v(1/(2*Math.PI*(t(s)*t(l))**.5),`Hz`)}<br>`),a&&s&&(e+=`
                        Frequnez f = 
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${a}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${s}H</span>
                        </div> 
                    = ${v(t(a)/(2*Math.PI*t(s)),`Hz`)}<br>`),o&&l&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${o}&Omega; &lowast; ${l}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(o)*t(l)),`&Omega;`)}<br>`)),i(n.getElementById(`result`),e)}function D(){let e=``,r=n.getElementById(`I-parallel`).value,a=n.getElementById(`IR-parallel`).value,o=n.getElementById(`IL-parallel`).value,s=n.getElementById(`IC-parallel`).value,c=n.getElementById(`R-parallel`).value,l=n.getElementById(`XL-parallel`).value,u=n.getElementById(`XC-parallel`).value,d=n.getElementById(`L-parallel`).value,f=n.getElementById(`Q-parallel`).value,p=n.getElementById(`C-parallel`).value,m=n.getElementById(`f-parallel`).value,h=n.getElementById(`b-parallel`).value;r||a&&o&&s&&(e+=`
                    Strom I<sub>ges</sub> = &radic;((I<sub>R</sub>)<sup>2</sup> + (I<sub>L</sub> - I<sub>C</sub>)<sup>2</sup>)
                    =
                        &radic;((${a}A)<sup>2</sup> + (${o}A - ${s}A)<sup>2</sup>)
                    = ${v((t(a)**2+(t(o)-t(s))**2)**.5,`A`)}<br>`),l||m&&d&&(e+=`
                    Blindwiderstand X<sub>L</sub> = 2&pi; &lowast; f &lowast; L
                =
                    2&pi; &lowast; ${m}Hz &lowast; ${d}H
                = ${v(2*Math.PI*t(m)*t(d),`&Omega;`)}<br>`),u||m&&p&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz &lowast; ${p}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(m)*t(p)),`&Omega;`)}<br>`),d||(m&&p&&(e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${m}Hz)<sup>2</sup> &lowast; ${p}F</span>
                        </div> 
                    = ${v(1/((2*Math.PI*t(m))**2*t(p)),`H`)}<br>`),l&&m&&(e+=`
                        Induktivit&auml;t L =
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${l}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz</span>
                        </div> 
                    = ${v(t(l)/(2*Math.PI*t(m)),`H`)}<br>`)),f||(!o&&r&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>L</sub> </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${o}A </span><br>
                            <span>${r}A</span>
                        </div> 
                    = ${v(t(o)/t(r),` `)}<br>`),!s&&r&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> I<sub>C</sub> </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}A </span><br>
                            <span>${r}A</span>
                        </div> 
                    = ${v(t(s)/t(r),` `)}<br>`),l&&c&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R </span><br>
                            <span>X<sub>L</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c}&Omega; </span><br>
                            <span>${l}&Omega;</span>
                        </div> 
                    = ${v(t(c)/t(l),` `)}<br>`),u&&c&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> R </span><br>
                            <span>X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c}&Omega; </span><br>
                            <span>${u}&Omega;</span>
                        </div> 
                    = ${v(t(c)/t(u),` `)}<br>`),d&&p&&f&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        R<sub>v</sub> &lowast; &radic;(
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denominator">C</span>
                        </div> )
                    =
                        ${c}&Omega; &lowast; &radic;(
                        <div class ="fraction">
                            <span>${d}H</span><br>
                            <span class="fraction-denominator">${p}F</span>
                        </div> )
                    = ${v(t(c)*(2*Math.PI*(t(d)/t(p))**.5),``)}<br>`),d&&p&&h&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; b &radic;(C &lowast; L)</span>
                        </div>
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${h}Hz &radic;(${p}F &lowast; ${d}H)</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(h)*(t(d)*t(p))**.5),``)}<br>`),m&&h&&(e+=`
                        (Kreis) G&uuml;te Q = 
                        <div class ="fraction">
                            <span>f</span><br>
                            <span class="fraction-denominator">b</span>
                        </div>
                    =
                        <div class ="fraction">
                            <span>${m}Hz</span><br>
                            <span class="fraction-denominator">${h}Hz</span>
                        </div> 
                    = ${v(t(m)/t(h),``)}<br>`)),p||(m&&d&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; f)<sup>2</sup> &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">(2&pi; &lowast; ${m}Hz)<sup>2</sup> &lowast; ${d}H</span>
                        </div> 
                    = ${v(1/((2*Math.PI*t(m))**2*t(d)),`F`)}<br>`),u&&m&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; f &lowast; X<sub>C</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${m}Hz &lowast; ${l}&Omega;</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(m)*t(l)),`F`)}<br>`),f&&c&&d&&(e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">(
                            <span> Q </span><br>
                            <span class="fraction-denominator">R</span>
                        </div> )<sup>2</sup> &lowast; L
                    = (
                        <div class ="fraction">
                            <span>${f}</span><br>
                            <span class="fraction-denominator">${c}&Omega;</span>
                        </div> )<sup>2</sup> &lowast; ${d}H
                    = ${v((t(f)/t(m))**2*t(d),`F`)}<br>`)),m||(d&&p&&(e+=`
                        Resonanzfrequenz f<sub>r</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &radic;(L &lowast; C)</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &radic;(${d}H &lowast; ${p}F)</span>
                        </div> 
                    = ${v(1/(2*Math.PI*(t(d)*t(p))**.5),`Hz`)}<br>`),l&&d&&(e+=`
                        Frequnez f = 
                        <div class ="fraction">
                            <span> X<sub>L</sub> </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${l}&Omega;</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${d}H</span>
                        </div> 
                    = ${v(t(l)/(2*Math.PI*t(d)),`Hz`)}<br>`),u&&p&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denominator">2&pi; &lowast; ${u}&Omega; &lowast; ${p}F</span>
                        </div> 
                    = ${v(1/(2*Math.PI*t(u)*t(p)),`&Omega;`)}<br>`)),i(n.getElementById(`result_parallel`),e)}return{handlers:{toggleSelection:T,calculateSerie:E,calculateParallel:D,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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

    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Schwingkreis`]})}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`serie`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`serie`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Serie_SW.png`,alt:`Serie`}),(0,s.jsx)(`span`,{children:`Serie Schwingkreis`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`filter-button`,"data-action":`toggleSelection`,"data-target":`parallel`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`parallel`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Parallel_SW.png`,alt:`Parallel`}),(0,s.jsx)(`span`,{children:`Parallel Schwingkreis`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`serie`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Serienschwingkreis`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-serie`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-serie`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`(Kreis) Güte Q`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Guete)`},type:`text`,"aria-label":`(Kreis) Güte Q`,id:`Q-serie`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-serie`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U-serie`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UR`,id:`UR-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UL`,id:`UL-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung UC`,id:`UC-serie`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-serie`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Bandbreite b`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Bandbreite b`,id:`b-serie`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateSerie`,onClick:t=>{e.current?.handlers.calculateSerie?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`parallel`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Parallelschwingkreis`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`ges`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom Iges`,id:`I-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IR`,id:`IR-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IL`,id:`IL-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom IC`,id:`IC-parallel`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XL`,id:`XL-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ -90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Bildwiderstand  X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Bildwiderstand  XC`,id:`XC-parallel`}),(0,s.jsx)(`label`,{children:`Ω [Ohm ∠ +90°]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L-parallel`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`(Kreis) Güte Q`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Guete)`},type:`text`,"aria-label":`(Kreis) Güte Q`,id:`Q-parallel`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C-parallel`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-parallel`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Bandbreite b`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Bandbreite b`,id:`b-parallel`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateParallel`,onClick:t=>{e.current?.handlers.calculateParallel?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_parallel`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};