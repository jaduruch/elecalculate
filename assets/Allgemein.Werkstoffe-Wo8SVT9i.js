import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-CQ-439nf.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(e){e.parentElement.classList.toggle(`open`)}function T(){let e=``,a=n.getElementById(`R`).value,o=n.getElementById(`x`).value,s=n.getElementById(`p`).value,c=n.getElementById(`A`).value,l=n.getElementById(`d`).value,u=n.getElementById(`l`).value;a||(u&&o&&c&&(e+=`
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span> l </span><br>
                                <span class="fraction-denumerator">A &lowast; &chi; </span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span> ${u}m </span><br>
                                <span class="fraction-denumerator">${c}m<sup>2</sup> &lowast; ${o}&m/(&Omega; &lowast; mm<sup>2</sup>)</span>
                            </div> 
                        = ${v(t(u)/(r(c)*1e6*t(o)),`&Omega;`)}<br>`),u&&o&&l&&(e+=`
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; d<sup>2</sup> &lowast; &chi;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>4 &lowast; ${u}m </span><br>
                                <span class="fraction-denumerator"> &pi; &lowast; (${l}m)<sup>2</sup> &lowast; ${o}&m/(&Omega; &lowast; mm<sup>2</sup></span>
                            </div> 
                        = ${v(4*t(u)/(Math.PI*t(l)**2*1e6*t(o)),`&Omega;`)}<br>`),u&&s&&c&&(e+=`
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> l &lowast; &rho; </span><br>
                                <span>A </span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${u}m &lowast; ${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span>${c}m<sup>2</sup></span>
                            </div> 
                        = ${v(t(u)*t(s)/(r(c)*1e6),`&Omega;`)}<br>`),u&&s&&l&&(e+=`
                            Widerstand R<sub>ges</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; l  &lowast; &rho;</span><br>
                                <span>&pi; &lowast; d<sup>2</sup></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; ${u}m &lowast; ${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span> &pi; &lowast; (${l}m)<sup>2</sup> </span>
                            </div> 
                        = ${v(4*t(u)*t(s)/(Math.PI*t(l)**2*1e6),`&Omega;`)}<br>`)),o||(s&&(e+=`
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span> 1 </span><br>
                                <span class="fraction-denumerator">&rho;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>1</span><br>
                                <span class="fraction-denumerator">${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                            </div> 
                        = ${v(1/t(s),` m/(&Omega; &lowast; mm<sup>2</sup>)`)}<br>`),c&&u&&a&&(e+=`
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span> l </span><br>
                                <span class="fraction-denumerator">A &lowast; R</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span> ${u}m </span><br>
                                <span class="fraction-denumerator">${c}m<sup>2</sup> &lowast; ${a}&Omega;</span>
                            </div> 
                        = ${v(t(u)/(r(c)*1e6*t(a)),` m/(&Omega; &lowast; mm<sup>2</sup>)`)}<br>`),l&&u&&a&&(e+=`
                            Leitf&auml;higkeit &chi; = 
                            <div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator"&pi; &lowast; d<sup>2</sup> &lowast; R</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>4 &lowast; ${u}m </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; (${l}m)<sup>2</sup> &lowast; ${a}&Omega;</span>
                            </div> 
                        = ${v(4*t(u)/(Math.PI*t(l)**2*1e6*t(a)),` m/(&Omega; &lowast; mm<sup>2</sup>)`)}<br>`)),s||(o&&(e+=`
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span> 1 </span><br>
                                <span class="fraction-denumerator">&chi;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>1</span><br>
                                <span class="fraction-denumerator">${o}m/(&Omega; &lowast; mm<sup>2</sup>)</span>
                            </div> 
                        = ${v(1/t(o),` (&Omega; &lowast; mm<sup>2</sup>)/m`)}<br>`),a&&c&&u&&(e+=`
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span>A &lowast; R</span><br>
                                <span class="fraction-denumerator">l</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>${c}m<sup>2</sup> &lowast; ${a}&Omega;</span><br>
                                <span class="fraction-denumerator">${u}m</span>
                            </div> 
                        = ${v(r(c)*1e6*t(a)/t(u),` (&Omega; &lowast; mm<sup>2</sup>)/m`)}<br>`),a&&l&&u&&(e+=`
                            Spezifischer Widerstand &rho; = 
                            <div class ="fraction">
                                <span>&pi; &lowast; d<sup>2</sup> &lowast; R</span><br>
                                <span class="fraction-denumerator">4 &lowast; l</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span>&pi; &lowast; (${l}m)<sup>2</sup> &lowast; ${a}&Omega;</span><br>
                                <span class="fraction-denumerator">4 &lowast; ${u}m</span>
                            </div> 
                        = ${v(Math.PI*t(l)**2*1e6*t(a)/(4*t(u)),` (&Omega; &lowast; mm<sup>2</sup>)/m`)}<br>`)),c||(l&&(e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup></span><br>
                            <span>4</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; (${l}m)<sup>2</sup> </span><br>
                            <span>4</span>
                        </div> 
                    = ${y(Math.PI*t(l)**2/4,`m<sup>2</sup>`)}<br>`),o&&u&&a&&(e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span> l </span><br>
                            <span class="fraction-denumerator">&chi; &lowast; R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${u}m </span><br>
                            <span class="fraction-denumerator">${o}m/(&Omega; &lowast; mm<sup>2</sup>) &lowast; ${a}&Omega;</span>
                        </div> 
                    = ${y(t(u)*1e-6/(t(o)*t(a)),`m<sup>2</sup>`)}<br>`),s&&u&&a&&(e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&rho; &lowast; l </span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${s}(&Omega; &lowast; mm<sup>2</sup>)/m &lowast; ${u}m </span><br>
                            <span> ${a}&Omega;</span>
                        </div> 
                    = ${y(t(s)*1e-6*t(u)/t(a),`m<sup>2</sup>`)}<br>`)),l||(c&&(e+=`
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; A</span><br>
                            <span>&pi;</span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; ${c}m<sup>2</sup> </span><br>
                            <span>&pi;</span>
                        </div>)
                    = ${v((4*r(c)/Math.PI)**.5,`m`)}<br>`),u&&o&&l&&(e+=`
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                                <span>4 &lowast; l </span><br>
                                <span class="fraction-denumerator">&pi; &lowast; R &lowast; &chi;</span>
                            </div>)
                        =
                            &radic;(<div class ="fraction">
                                <span>4 &lowast; ${u}m </span><br>
                                <span class="fraction-denumerator"> &pi; &lowast; ${a}&Omega; &lowast; ${o}m/(&Omega; &lowast; mm<sup>2</sup></span>
                            </div>)
                        = ${v((4*t(u)*1e-6/(Math.PI*t(a)*t(o)))**.5,`m`)}<br>`),u&&s&&l&&(e+=`
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; l  &lowast; &rho;</span><br>
                                <span>&pi; &lowast; R</span>
                            </div>)
                        =
                            &radic;(<div class ="fraction">
                                <span class="fraction-numerator">4 &lowast; ${u}m &lowast; ${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span><br>
                                <span> &pi; &lowast; ${a}&Omega;</span>
                            </div>)
                        = ${v((4*t(u)*t(s)*1e-6/(Math.PI*t(a)))**.5,`m`)}<br>`)),u||(c&&a&&s&&(e+=`
                            Leiterl&auml;nge l =
                            <div class ="fraction">
                                <span class="fraction-numerator">A &lowast; R</span><br>
                                <span>&rho;</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">${c}m<sup>2</sup> &lowast; ${a}&Omega;</span><br>
                                <span>${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                            </div> 
                        = ${v(r(c)*1e6*t(a)/t(s),`m`)}<br>`),l&&a&&s&&(e+=`
                        Leiterl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup> &lowast; R</span><br>
                            <span>4 &lowast; &rho;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> &pi; &lowast; (${l}m)<sup>2</sup> &lowast; ${a}&Omega; </span><br>
                            <span>4 &lowast; ${s}(&Omega; &lowast; mm<sup>2</sup>)/m</span>
                        </div> 
                    = ${v(Math.PI*t(l)**2*1e6*t(a)/(4*t(s)),`m`)}<br>`),a&&o&&c&&(e+=`
                            Leiterl&auml;nge l = 
                            &chi; &lowast; R &lowast; A
                        =
                            ${o}m/(&Omega; &lowast; mm<sup>2</sup>) &lowast; ${a}&Omega; &lowast; ${c}m<sup>2</sup>
                        = ${v(t(o)*t(a)*r(c)*1e6,`m`)}<br>`),l&&a&&o&&(e+=`
                            Leiterl&auml;nge l =
                            <div class ="fraction">
                                <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup> &lowast; R &lowast; &chi;</span><br>
                                <span>4</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">(${l}m)<sup>2</sup> &lowast; ${a}&Omega; &lowast; ${o}m/(&Omega; &lowast; mm<sup>2</sup></span><br>
                                <span>4</span>
                            </div> 
                        = ${v(Math.PI*t(l)**2*1e6*t(a)*t(o)/4,`m`)}<br>`)),i(n.getElementById(`result_Leiter`),e)}function E(){let e=``,r=n.getElementById(`Rw`).value,a=n.getElementById(`Rk`).value,o=n.getElementById(`alpha`).value,s=n.getElementById(`T`).value,c=n.getElementById(`Tw`).value,l=n.getElementById(`Tk`).value;a||r&&o&&s&&(e+=`
                        Kaltwiderstand R = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub></span><br>
                                <span>1 + &alpha; &lowast; &Delta;T</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${r}&Omega;</span><br>
                                <span>1 + ${o}K<sup>-1</sup> &lowast; ${s}K</span>
                            </div>
                        = ${v(t(r)/(1+t(o)*t(s)),`&Omega;`)}<br>`),r||a&&o&&s&&(e+=`
                            Warmwiderstand R<sub>&thetasym;</sub> = 
                            R &lowast; (1 + &alpha; &lowast; &Delta;T)
                        =
                            ${a}&Omega; &lowast; (1 + ${o}K<sup>-1</sup> &lowast; ${s}K)
                        = ${v(t(a)*(1+t(o)*t(s)),`&Omega;`)}<br>`),o||a&&r&&s&&(e+=`
                        Temperaturbeiwert &alpha; = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R</span><br>
                                <span>R &lowast; &Delta;T</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator">${r}&Omega; - ${a}&Omega;</span><br>
                                <span>${a}&Omega; &lowast; ${s}K</span>
                            </div>
                        = ${v((t(r)-t(a))/(t(a)*t(s)),`K<sup>-1</sup>`)}<br>`),s||r&&a&&o&&(e+=`
                        Temperatur&auml;nderung &Delta;T = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R<sub>20</sub></span><br>
                                <span>R<sub>20</sub> &lowast; &alpha;</span>
                            </div>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${r}&Omega; - ${a}&Omega;</span><br>
                                <span>${a}&Omega; &lowast; ${o}K<sup>-1</sup></span>
                            </div>
                        = ${v((t(r)-t(a))/(t(a)*t(o)),`K`)}<br>`),c||r&&a&&o&&l&&(e+=`
                        Warmwert T<sub>w</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator">R<sub>&thetasym;</sub> - R<sub>20</sub></span><br>
                                <span>R<sub>20</sub> &lowast; &alpha;</span>
                            </div> - T<sub>k</sub>
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${r}&Omega; - ${a}&Omega;</span><br>
                                <span>${a}&Omega; &lowast; ${o}K<sup>-1</sup></span>
                            </div> - ${l}&deg;C
                        = ${v((t(r)-t(a))/(t(a)*t(o))-t(l),`&deg;C`)}<br>`),i(n.getElementById(`result_Temp`),e)}function D(){let e=``,a=n.getElementById(`I_J`).value,o=n.getElementById(`d_J`).value,s=n.getElementById(`A_J`).value,c=n.getElementById(`J`).value;a||(o&&c&&(e+=`
                            Strom I = 
                            <div class ="fraction"> 
                                <span class="fraction-numerator"> d<sup>2</sup> &lowast; &pi; &lowast; J</span><br>
                                <span>4</span>
                            </div> 
                        =
                            <div class ="fraction"> 
                                <span class="fraction-numerator">(${o}m)<sup>2</sup> &lowast; &pi; &lowast; ${c}A/mm<sup>2</sup></span><br>
                                <span>4</span>
                            </div> 
                        = ${v(t(o)**2/4*Math.PI*1e6*t(c),`A`)}<br>`),s&&c&&(e+=`
                            Strom I = 
                            A &lowast; J
                        =
                            ${s}m<sup>2</sup> &lowast; ${c}A/mm<sup>2</sup>
                        = ${v(r(s)*1e6*t(c),`A`)}<br>`)),o||(a&&c&&(e+=`
                        Durchmesser d = 
                        &radic;(<div class ="fraction"> 
                            <span> 4 &lowast; I </span><br>
                            <span class="fraction-denumerator">&pi; &lowast; J</span>
                        </div>)
                    =
                        &radic;(<div class ="fraction"> 
                            <span>4 &lowast; ${a}A </span><br>
                            <span class="fraction-denumerator">&pi; &lowast; ${c}A/mm<sup>2</sup></span>
                        </div>)
                    = ${v((4*t(a)/(Math.PI*t(c)*1e6))**.5,`m`)}<br>`),s&&(e+=`
                        Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; A</span><br>
                            <span>&pi;</span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; ${s}m<sup>2</sup> </span><br>
                            <span>&pi;</span>
                        </div>)
                    = ${v((4*r(s)/Math.PI)**.5,`m`)}<br>`)),s||(o&&(e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup></span><br>
                            <span>4</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; (${o}m)<sup>2</sup> </span><br>
                            <span>4</span>
                        </div> 
                    = ${y(Math.PI*t(o)**2/4,`m<sup>2</sup>`)}<br>`),a&&c&&(e+=`
                            Querschnitt A = 
                            <div class ="fraction"> 
                                <span> I </span><br>
                                <span class="fraction-denumerator"> J </span>
                            </div>
                        =
                            <div class ="fraction"> 
                                <span>${a}A </span><br>
                                <span class="fraction-denumerator">${c}A/mm<sup>2</sup></span>
                            </div>
                        = ${y(t(a)*1e-6/t(c),`m<sup>2</sup>`)}<br>`)),c||(a&&s&&(e+=`
                            Stromdichte J = 
                            <div class ="fraction"> 
                                <span> I </span><br>
                                <span class="fraction-denumerator"> A </span>
                            </div>
                        =
                            <div class ="fraction"> 
                                <span>${a}A </span><br>
                                <span class="fraction-denumerator">${s}m<sup>2</sup></span>
                            </div>
                        = ${v(t(a)/(r(s)*1e6),`A/mm<sup>2</sup>`)}<br>`),o&&a&&(e+=`
                            Strom I = 
                            <div class ="fraction"> 
                                <span class="fraction-numerator">4 &lowast; A</span><br>
                                <span>d<sup>2</sup> &lowast; &pi;</span>
                            </div> 
                        =
                            <div class ="fraction"> 
                                <span class="fraction-numerator">4 &lowast; ${a}A</span><br>
                                <span>(${o}m)<sup>2</sup> &lowast; &pi;</span>
                            </div> 
                        = ${v(4*t(a)/(t(o)**2*1e6*Math.PI),`A/mm<sup>2</sup>`)}<br>`)),i(n.getElementById(`result_Stromd`),e)}return{handlers:{toggleDropdown:w,calculateLeitfaehigkeit:T,calculateTemperaturwiderstand:E,calculateStromdichte:D,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Werkstoffe`]})}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Spezifischer Widerstand`,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Gesamtwiderstand R`,(0,s.jsx)(`sub`,{children:`ges`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Gesamtwiderstand Rges`,id:`R`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Leitfähigkeit χ`}),(0,s.jsx)(`input`,{style:{borderColor:`gray`},type:`text`,"aria-label":`Leitfähigkeit χ`,id:`x`}),(0,s.jsxs)(`label`,{children:[`m/(Ω ∗ mm`,(0,s.jsx)(`sup`,{children:`2`}),`)`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`spezifischer Widerstand ρ`}),(0,s.jsx)(`input`,{style:{borderColor:`gray`},type:`text`,"aria-label":`spezifischer Widerstand ρ`,id:`p`}),(0,s.jsxs)(`label`,{children:[`(Ω ∗ mm`,(0,s.jsx)(`sup`,{children:`2`}),`)/m`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Leiterquerschnitt A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterquerschnitt A`,id:`A`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Leiterdurchmesser d`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterdurchmesser d`,id:`d`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Leiterlänge l`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Laenge)`},type:`text`,"aria-label":`Leiterlänge l`,id:`l`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateLeitfaehigkeit`,onClick:t=>{e.current?.handlers.calculateLeitfaehigkeit?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Leiter`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Temperaturabhängigkeit Widerstände `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kaltwiderstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Kaltwiderstand R`,id:`Rk`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Warmwiderstand R`,(0,s.jsx)(`sub`,{children:`ϑ`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Warmwiderstand Rϑ`,id:`Rw`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Temperaturbeiwert α`}),(0,s.jsx)(`input`,{style:{borderColor:`gray`},type:`text`,"aria-label":`Temperaturbeiwert α`,id:`alpha`}),(0,s.jsxs)(`label`,{children:[`K`,(0,s.jsx)(`sup`,{children:`-1`}),` [1/Klevin]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Temperaturänderung ΔT`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Temperaturänderung ΔT`,id:`T`}),(0,s.jsx)(`label`,{children:`K [Kelvin]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Warmwert T`,(0,s.jsx)(`sub`,{children:`w`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Warmwert Tw`,id:`Tw`}),(0,s.jsx)(`label`,{children:`°C [Celsius]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Kaltwert T`,(0,s.jsx)(`sub`,{children:`k`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Temperatur)`},type:`text`,"aria-label":`Kaltwert Tk`,id:`Tk`}),(0,s.jsx)(`label`,{children:`°C [Celsius]`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateTemperaturwiderstand`,onClick:t=>{e.current?.handlers.calculateTemperaturwiderstand?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Temp`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Stromdichte `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Strom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I_J`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Leiterdurchmesser d`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Leiterdurchmesser d`,id:`d_J`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Querschnittsfläche A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Querschnittsfläche A`,id:`A_J`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Stromdichte J`}),(0,s.jsx)(`input`,{style:{borderColor:`gray`},type:`text`,"aria-label":`Stromdichte J`,id:`J`}),(0,s.jsxs)(`label`,{children:[`A/mm`,(0,s.jsx)(`sup`,{children:`2`})]})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateStromdichte`,onClick:t=>{e.current?.handlers.calculateStromdichte?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Stromd`,"aria-live":`polite`})]})})]})]})]})}var l=c;export{l as component};