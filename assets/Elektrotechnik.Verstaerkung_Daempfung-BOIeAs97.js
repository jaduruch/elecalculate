import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-D1EaDO0j.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=a(e);function C(){let e=``,r=n.getElementById(`I1`).value,a=n.getElementById(`I2`).value,o=n.getElementById(`g`).value,s=n.getElementById(`a`).value,c=n.getElementById(`P1`).value,l=n.getElementById(`P2`).value,u=n.getElementById(`U1`).value,d=n.getElementById(`U2`).value,f=n.getElementById(`V`).value,p=n.getElementById(`D`).value;r||(a&&f&&(e+=`
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${a}A </span><br>
                                <span>${f}</span>
                            </div> 
                        = ${v(t(a)/t(f),`A`)}<br>`),a&&p&&(e+=`
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &times; D
                        =
                            ${a}A &times; ${p}
                        = ${v(t(a)*t(p),`A`)}<br>`),u&&c&&(e+=`
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>U<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${c}W </span><br>
                                <span>${u}V</span>
                            </div> 
                        = ${v(t(c)/t(u),`A`)}<br>`),a&&o&&(e+=`
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${a} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${o}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(a)*10**-(t(o)/20),`A`)}<br>`),a&&s&&(e+=`
                            Strom I<sub>1</sub> = 
                            I<sub>2</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> a </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${a} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${s}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(a)*10**(t(s)/20),`A`)}<br>`)),a||(r&&f&&(e+=`
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &times; V
                        =
                            ${r}A &times; ${f}
                        = ${v(t(r)*t(f),`A`)}<br>`),r&&p&&(e+=`
                            Strom I<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${r}A </span><br>
                                <span>${p}</span>
                            </div> 
                        = ${v(t(r)/t(p),`A`)}<br>`),d&&l&&(e+=`
                            Strom I<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>U<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${l}W </span><br>
                                <span>${d}V</span>
                            </div> 
                        = ${v(t(l)/t(d),`A`)}<br>`),r&&o&&(e+=`
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${r} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${o}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(r)*10**(t(o)/20),`A`)}<br>`),r&&s&&(e+=`
                            Strom I<sub>2</sub> = 
                            I<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${r} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${s}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(r)*10**-(t(s)/20),`A`)}<br>`)),o||(f&&(e+=`
                            Verst&auml;rkungsmass g = 
                            20 &times; log<sub>10</sub>(V)
                        =
                            20 &times; log<sub>10</sub>(${f})
                        = ${v(20*w(t(f)),`dB`)}<br>`),p&&(e+=`
                            Verst&auml;rkungsmass g = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>D</span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>${p}</span>   
                            </div>)
                        = ${v(20*w(1/t(p)),`dB`)}<br>`),s&&(e+=`
                            Verst&auml;rkungsmass g = 
                            - a
                         =  ${-s} dB<br>`),r&&a&&(e+=`
                            Verst&auml;rkungsmass g<sub>I</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">I<sub>2</sub></span><br>
                                <span>I<sub>1</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${a}A</span><br>
                                <span>${r}A</span>   
                            </div>)
                        = ${v(20*w(t(a)/t(r)),`dB`)}<br>`),u&&d&&(e+=`
                            Verst&auml;rkungsmass g<sub>U</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">U<sub>2</sub></span><br>
                                <span>U<sub>1</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${d}V</span><br>
                                <span>${u}V</span>   
                            </div>)
                        = ${v(20*w(t(d)/t(u)),`dB`)}<br>`),c&&l&&(e+=`
                            Verst&auml;rkungsmass g<sub>P</sub> = 
                            10 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">P<sub>2</sub></span><br>
                                <span>P<sub>1</sub></span> 
                            </div>)
                        =   10 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${l}W</span><br>
                                <span>${c}W</span>   
                            </div>)
                        = ${v(10*w(t(l)/t(c)),`dB`)}<br>`)),s||(p&&(e+=`
                            D&auml;mpfungsmass a = 
                            20 &times; log<sub>10</sub>(D)
                        =
                            20 &times; log<sub>10</sub>(${p})
                        = ${v(20*w(t(p)),`dB`)}<br>`),f&&(e+=`
                            D&auml;mpfungsmass a = 
                            20 &times; log<sub>10</sub> ( <div class ="fraction">
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>V</span> 
                            </div> )
                        =   20 &times; log<sub>10</sub>
                            ( <div class ="fraction"> 
                                <span class="fraction-numerator"> 1 </span><br>
                                <span>${f}</span>   
                            </div> )
                        = ${v(20*w(1/t(f)),`dB`)}<br>`),o&&(e+=`
                            D&auml;mpfungsmass a = 
                            - g
                         =  ${-o} dB<br>`),r&&a&&(e+=`
                            D&auml;mpfungsmass a<sub>I</sub> = 
                            20 &times; log<sub>10</sub> ( <div class ="fraction">
                                <span class="fraction-numerator">I<sub>1</sub></span><br>
                                <span>I<sub>2</sub></span> 
                            </div> )
                        =   20 &times; log<sub>10</sub>
                            ( <div class ="fraction"> 
                                <span class="fraction-numerator">${r}A</span><br>
                                <span>${a}A</span>   
                            </div> )
                        = ${v(20*w(t(r)/t(a)),`dB`)}<br>`),u&&d&&(e+=`
                            D&auml;mpfungsmass a<sub>U</sub> = 
                            20 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">U<sub>1</sub></span><br>
                                <span>U<sub>2</sub></span> 
                            </div>)
                        =   20 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${u}V</span><br>
                                <span>${d}V</span>   
                            </div>)
                        = ${v(20*w(t(u)/t(d)),`dB`)}<br>`),c&&l&&(e+=`
                            D&auml;mpfungsmass a<sub>P</sub> = 
                            10 &times; log<sub>10</sub> (<div class ="fraction">
                                <span class="fraction-numerator">P<sub>1</sub></span><br>
                                <span>P<sub>2</sub></span> 
                            </div>)
                        =   10 &times; log<sub>10</sub>
                            (<div class ="fraction"> 
                                <span class="fraction-numerator">${c}W</span><br>
                                <span>${l}W</span>   
                            </div>)
                        = ${v(10*w(t(c)/t(l)),`dB`)}<br>`)),u||(d&&f&&(e+=`
                            Spannung U<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${d}V </span><br>
                                <span>${f}</span>
                            </div> 
                        = ${v(t(d)/t(f),`V`)}<br>`),d&&p&&(e+=`
                            Spannung U<sub>1</sub> = 
                            I<sub>2</sub> &times; D
                        =
                            ${d}V &times; ${p}
                        = ${v(t(d)*t(p),`V`)}<br>`),r&&c&&(e+=`
                            Spannung U<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>I<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${c}W </span><br>
                                <span>${r}A</span>
                            </div> 
                        = ${v(t(c)/t(r),`V`)}<br>`)),d||(u&&f&&(e+=`
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &times; V
                        =
                            ${u}V &times; ${f}
                        = ${v(t(u)*t(f),`V`)}<br>`),u&&p&&(e+=`
                            Spannung U<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${u}V </span><br>
                                <span>${p}</span>
                            </div> 
                        = ${v(t(u)/t(p),`V`)}<br>`),a&&l&&(e+=`
                            Spannung U<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>I<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${l}W </span><br>
                                <span>${a}V</span>
                            </div> 
                        = ${v(t(l)/t(a),`V`)}<br>`),u&&o&&(e+=`
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${u}V &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${o}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(u)*10**(t(o)/20),`V`)}<br>`),u&&s&&(e+=`
                            Spannung U<sub>2</sub> = 
                            U<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> a </span><br>
                                <span>20</span>
                            </div>) </sup>
                        =
                            ${u} &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -${s}dB </span><br>
                                <span>20</span>
                            </div>) </sup>
                        = ${v(t(u)*10**-(t(s)/20),`V`)}<br>`)),c||(l&&f&&(e+=`
                            Leistung P<sub>1</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>V</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${l}W </span><br>
                                <span>${f}</span>
                            </div> 
                        = ${v(t(l)/t(f),`W`)}<br>`),l&&p&&(e+=`
                            Leistung P<sub>1</sub> = 
                            P<sub>2</sub> &times; D
                        =
                            ${l}W &times; ${p}
                        = ${v(t(l)*t(p),`W`)}<br>`),r&&u&&(e+=`
                            Leistung P<sub>1</sub> = 
                            U<sub>1</sub> &times; I<sub>1</sub>
                        =
                            ${u}V &times; ${r}A
                        = ${v(t(u)*t(r),`W`)}<br>`)),l||(c&&f&&(e+=`
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &times; V
                        =
                            ${c}W &times; ${f}
                        = ${v(t(c)*t(f),`W`)}<br>`),c&&p&&(e+=`
                            Leistung P<sub>2</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>D</span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${c}W </span><br>
                                <span>${p}</span>
                            </div> 
                        = ${v(t(c)/t(p),`W`)}<br>`),a&&d&&(e+=`
                            Leistung P<sub>2</sub> = 
                            U<sub>2</sub> &times; I<sub>2</sub>
                        =
                            ${d}V &times; ${a}A
                        = ${v(t(d)*t(a),`W`)}<br>`),c&&o&&(e+=`
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> g </span><br>
                                <span>10</span>
                            </div>) </sup>
                        =
                            ${c}W &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${o}dB </span><br>
                                <span>10</span>
                            </div>) </sup>
                        = ${v(t(c)*10**(t(o)/10),`W`)}<br>`),c&&s&&(e+=`
                            Leistung P<sub>2</sub> = 
                            P<sub>1</sub> &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> -a </span><br>
                                <span>10</span>
                            </div>) </sup>
                        =
                            ${c}W &lowast; 10 <sup>(<div class ="fraction">
                                <span class="fraction-numerator"> ${-s}dB </span><br>
                                <span>10</span>
                            </div>) </sup>
                        = ${v(t(c)*10**-(t(s)/10),`W`)}<br>`)),f||(r&&a&&(e+=`
                            Verst&auml;rkungsfaktor V<sub>I</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>2</sub> </span><br>
                                <span>I<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${a}A </span><br>
                                <span>${r}A</span>
                            </div> 
                        = ${v(t(a)/t(r),``)}<br>`),u&&d&&(e+=`
                            Verst&auml;rkungsfaktor V<sub>U</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>2</sub> </span><br>
                                <span>U<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${d}V </span><br>
                                <span>${u}V</span>
                            </div> 
                        = ${v(t(d)/t(u),``)}<br>`),c&&l&&(e+=`
                            Verst&auml;rkungsfaktor V<sub>P</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                                <span>P<sub>1</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${l}W </span><br>
                                <span>${c}W</span>
                            </div> 
                        = ${v(t(l)/t(c),``)}<br>`)),p||(r&&a&&(e+=`
                            D&auml;mpfungsfaktor D<sub>I</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> I<sub>1</sub> </span><br>
                                <span>I<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${r}A </span><br>
                                <span>${a}A</span>
                            </div> 
                        = ${v(t(r)/t(a),``)}<br>`),u&&d&&(e+=`
                            D&auml;mpfungsfaktor D<sub>U</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> U<sub>1</sub> </span><br>
                                <span>U<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${u}V </span><br>
                                <span>${d}V</span>
                            </div> 
                        = ${v(t(u)/t(d),``)}<br>`),c&&l&&(e+=`
                            D&auml;mpfungsfaktor D<sub>P</sub> = 
                            <div class ="fraction">
                                <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                                <span>P<sub>2</sub></span>
                            </div> 
                        =
                            <div class ="fraction">
                                <span class="fraction-numerator"> ${c}W </span><br>
                                <span>${l}W</span>
                            </div> 
                        = ${v(t(c)/t(l),``)}<br>`)),i(n.getElementById(`result`),e)}function w(e){return Math.log(e)/Math.log(10)}return{handlers:{calculateParameters:C,getlg:w,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I1`,id:`I1`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I2`,id:`I2`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkungsmass g`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsmass)`},type:`text`,"aria-label":`Verstärkungsmass g`,id:`g`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungssmass a`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsmass)`},type:`text`,"aria-label":`Dämpfungssmass a`,id:`a`}),(0,s.jsx)(`label`,{children:`1 [dB]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P1`,id:`P1`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P2`,id:`P2`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U2`,id:`U2`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Verstärkungsfaktor V`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Verstärkungsfaktor V`,id:`V`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Dämpfungsfaktor D`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Dämpfungsfaktor D`,id:`D`}),(0,s.jsx)(`label`,{children:`1`})]})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateParameters`,onClick:t=>{e.current?.handlers.calculateParameters?.()}}),(0,s.jsx)(`h3`,{children:`Resultate`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};