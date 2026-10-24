import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-CQ-439nf.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(){let e=``,a=`1`,o=n.getElementById(`I`).value,s=n.getElementById(`H`).value,c=n.getElementById(`Theta`).value,l=n.getElementById(`ur`).value,u=n.getElementById(`N`).value,d=n.getElementById(`Rm`).value,f=n.getElementById(`A`).value,p=n.getElementById(`Phi`).value,m=n.getElementById(`U`).value,h=n.getElementById(`l`).value,v=n.getElementById(`B`).value,y=n.getElementById(`t`).value;for(;e!=a;)a=e,!o&&c&&u&&(o=g(t(c)/t(u)),e+=`
                        Strom I  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${c}A</span><br>
                            <span>${u}</span>
                        </div> 
                    = ${o}A <br>`),!o&&d&&l&&f&&(o=g(t(d)*t(l)*1257e-9*r(f)),e+=`
                        Strom I =
                        R<sub>m</sub> &lowast; &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; A
                    =
                        ${d}A/VS &lowast; ${l} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${f}m<sup>2</sup>
                    = ${o}A <br>`),!o&&s&&h&&u&&(o=g(t(s)*t(h)/t(u)),e+=`
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">H &lowast; l</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}A/m &lowast; ${h}m</span><br>
                            <span>${u}</span>
                        </div> 
                    = ${o}A <br>`),!s&&c&&h&&(s=g(t(c)/t(h)),e+=`
                       Feldst&auml;rke H = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span> l </span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${c}Wb </span><br>
                            <span> ${h}m </span>
                        </div> 
                    = ${s}A/m <br>`),!s&&u&&o&&h&&(s=g(t(u)*t(o)/t(h)),e+=`
                       Feldst&auml;rke H = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; I</span><br>
                            <span> l </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u} &lowast; ${o}A </span><br>
                            <span> ${h}m </span>
                        </div> 
                    = ${s}A/m <br>`),!c&&s&&h&&(c=g(t(s)*t(h)),e+=`
                            Durchflutung &Theta; =
                            H &lowast; l
                        =
                            ${s}A/m &lowast; ${h}m
                        = ${c}A <br>`),!c&&o&&u&&(c=g(t(o)*t(u)),e+=`
                            Durchflutung &Theta; =
                            I &lowast; N
                        =
                            ${o}A &lowast; ${u}
                        = ${c}A <br>`),!l&&o&&d&&f&&(l=g(t(o)/(t(d)*1257e-9*r(f))),e+=`
                        Mag. Widerstand R<sub>m</sub> = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> R<sub>m</sub> &lowast; &mu;<sub>0</sub> &lowast; A </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${o}A</span><br>
                            <span class="fraction-denumerator"> ${d}A/Vs &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${f}m<sup>2</sup> </span>
                        </div> 
                    = ${l} <br>`),!u&&c&&o&&(u=g(t(c)/t(o)),e+=`
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${c}A</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${u}<br>`),!u&&m&&y&&p&&(u=g(-(t(m)*t(y))/t(p)),e+=`
                        Windungszahl N  = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;&Phi;</span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${m}V &lowast; ${y}s</span><br>
                            <span>${p}Wb</span>
                        </div> 
                    = ${u}<br>`),!u&&s&&h&&o&&(u=g(t(s)*t(h)/t(o)),e+=`
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">H &lowast; l</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}A/m &lowast; ${h}m</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${u}<br>`),!d&&o&&l&&f&&(d=g(t(o)/(t(l)*1257e-9*r(f))),e+=`
                        Mag. Widerstand R<sub>m</sub> = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; A </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${o}A</span><br>
                            <span class="fraction-denumerator"> ${l} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${f}m<sup>2</sup> </span>
                        </div> 
                    = ${d}A/Vs <br>`),!f&&o&&l&&d&&(f=_(t(o)/(t(l)*1257e-9*t(d))),e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span>I</span><br>
                            <span class="fraction-denumerator"> &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; R<sub>m</sub> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span> ${o}A</span><br>
                            <span class="fraction-denumerator"> ${l} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  ${d}A/Vs </span>
                        </div> 
                    = ${f}m<sup>2</sup> <br>`),!f&&p&&v&&(f=_(t(p)/t(v)),e+=`
                        Strom I  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${p}Wb</span><br>
                            <span>${v}T</span>
                        </div> 
                    = ${f}m<sup>2</sup> <br>`),!p&&v&&f&&(p=g(t(v)*r(f)),e+=`
                        Mag. Fluss &Phi; =
                        B &lowast; A
                    =
                        ${v}T &lowast; ${f}m<sup>2</sup>
                    = ${p}Wb <br>`),!p&&m&&y&&u&&(p=g(-(t(m)*t(y))/t(u)),e+=`
                        Mag. Fluss &Phi; =
                        - <div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>N</span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${m}V &lowast; ${y}s</span><br>
                            <span>${u}</span>
                        </div> 
                    = ${p}Wb <br>`),!m&&y&&u&&p&&(m=g(-(t(u)*t(p))/t(y)),e+=`
                        Induzierte Spannung u<sub>0</sub> = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;&Phi;</span><br>
                            <span> </span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${u} &lowast; ${p}Wb</span><br>
                            <span>${y}s</span>
                        </div> 
                    = ${m}V <br>`),!h&&c&&s&&(h=g(t(c)/t(s)),e+=`
                       Feldlinienl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Theta;</span><br>
                            <span> H </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c}Wb </span><br>
                            <span> ${s}A/m </span>
                        </div> 
                    = ${h} <br>`),!h&&u&&o&&s&&(h=g(t(u)*t(o)/t(s)),e+=`
                       Feldlinienl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; I</span><br>
                            <span> H </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u} &lowast; ${o}A </span><br>
                            <span> ${s}A/m </span>
                        </div> 
                    = ${h}m <br>`),!v&&l&&s&&(v=g(t(l)*1257e-9*t(s)),e+=`
                        Mag. Flussdichte B =
                        &mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; H
                    =
                        ${l} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am  &lowast; ${s}A/m
                    = ${v}T <br>`),!v&&p&&f&&(v=g(t(p)/r(f)),e+=`
                        Mag. Flussdichte B  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>A</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${p}Wb</span><br>
                            <span>${f}m<sup>2</sup></span>
                        </div> 
                    = ${v}T <br>`),!y&&m&&u&&p&&(y=g(-(t(u)*t(p))/t(m)),e+=`
                        Zeit t = 
                        - <div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;&Phi;</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        - <div class ="fraction">
                            <span class="fraction-numerator"> ${u} &lowast; ${p}Wb</span><br>
                            <span>${m}V</span>
                        </div> 
                    = ${y}s <br>`);i(n.getElementById(`result`),e)}function T(){n.querySelectorAll(`.input-numbers input`).forEach(e=>e.value=``),i(n.getElementById(`result`),``)}return{handlers:{calculateParameters:w,resetInputs:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

} }`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`h1`,{children:`Magnetismus`})}),(0,s.jsxs)(`div`,{className:`input-numbers`,children:[(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-0`,"data-action":`resetInputs`,onClick:t=>{e.current?.handlers.resetInputs?.()},className:`Button_Berechnen`,children:`Löschen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. I = 5mA → Eingabe: 5m (nicht 5mA)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Strom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Feldstärke H`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Feldstaerke)`},type:`text`,"aria-label":`Feldstärke H`,id:`H`}),(0,s.jsx)(`label`,{children:`A/m [Ampere/meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Durchflutung Θ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Durchflutung)`},type:`text`,"aria-label":`Durchflutung Θ`,id:`Theta`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Permeabilitätszahl μ`,(0,s.jsx)(`sub`,{children:`r`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Dielektrizitaetszahl)`},type:`text`,"aria-label":`Permeabilitätszahl μr`,id:`ur`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Windungszahl N`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Windungszahl)`},type:`text`,"aria-label":`Windungszahl N`,id:`N`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Mag. Widerstand R`,(0,s.jsx)(`sub`,{children:`m`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Mag_Widerstand)`},type:`text`,"aria-label":`Mag. Widerstand Rm`,id:`Rm`}),(0,s.jsx)(`label`,{children:`A/Vs [Ampere/Volt sek.]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Fläche A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Fläche A`,id:`A`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Mag. Fluss Φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Mag_Fluss)`},type:`text`,"aria-label":`Mag. Fluss Φ`,id:`Phi`}),(0,s.jsx)(`label`,{children:`Weber [Wb]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Länge l`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Laenge)`},type:`text`,"aria-label":`Länge l`,id:`l`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Mag. Flussdichte B`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Mag_Flussdichte)`},type:`text`,"aria-label":`Mag. Flussdichte B`,id:`B`}),(0,s.jsx)(`label`,{children:`T [Tesla]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeit t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeit t`,id:`t`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-1`,"data-action":`calculateParameters`,onClick:t=>{e.current?.handlers.calculateParameters?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,s.jsx)(`label`,{})]})]}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};