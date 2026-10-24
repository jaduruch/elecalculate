import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-B_jRmEqB.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(){let e=``,r=`1`,a=n.getElementById(`I1`).value,o=n.getElementById(`I2`).value,s=n.getElementById(`R1`).value,c=n.getElementById(`R2`).value,l=n.getElementById(`P1`).value,u=n.getElementById(`P2`).value,d=n.getElementById(`N1`).value,f=n.getElementById(`N2`).value,p=n.getElementById(`C1`).value,m=n.getElementById(`C2`).value,h=n.getElementById(`U1`).value,_=n.getElementById(`U2`).value,v=n.getElementById(`ue`).value,y=n.getElementById(`eta`).value;for(;r!=e;)r=e,!v&&h&&_&&(v=g(t(h)/t(_)),e+=`
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>U<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${h}V</span><br>
                            <span>${_}V</span>
                        </div> 
                    = ${v}<br>`),!v&&d&&f&&(v=g(t(d)/t(f)),e+=`
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N<sub>1</sub></span><br>
                            <span>N<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${d}</span><br>
                            <span>${f}</span>
                        </div> 
                    = ${v}<br>`),!v&&a&&o&&(v=g(t(o)/t(a)),e+=`
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>2</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${o}A</span><br>
                            <span>${a}A</span>
                        </div> 
                    = ${v}<br>`),!v&&s&&c&&(v=g((t(s)/t(c))**.5),e+=`
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">R<sub>1</sub></span><br>
                            <span>R<sub>2</sub></span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator"> ${s}&Omega;</span><br>
                            <span>${c}&Omega;</span>
                        </div>)
                    = ${v}<br>`),!v&&p&&m&&(v=g((t(p)/t(m))**.5),e+=`
                        &Uuml;bersetzungsverh&auml;ltnis &uuml; = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">C<sub>1</sub></span><br>
                            <span>C<sub>2</sub></span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator"> ${p}F</span><br>
                            <span>${m}F</span>
                        </div>)
                    = ${v}<br>`),!a&&v&&o&&(a=g(t(o)/t(v)),e+=`
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>2</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${o}A</span><br>
                            <span>${v}</span>
                        </div> 
                    = ${a}A<br>`),!a&&h&&s&&(a=g(t(h)/t(s)),e+=`
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${h}V</span><br>
                            <span>${s}&Omega;</span>
                        </div> 
                    = ${a}A<br>`),!a&&l&&h&&(a=g(t(l)/t(h)),e+=`
                        Strom I<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>U<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${l}W</span><br>
                            <span>${h}V</span>
                        </div> 
                    = ${a}A<br>`),!a&&l&&s&&(a=g((t(l)/t(s))**.5),e+=`
                        Strom I<sub>1</sub> = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> P<sub>1</sub> </span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator">${l}W </span><br>
                            <span>${s}&Omega;</span>
                        </div> 
                    = ${a}A<br>`),!o&&v&&a&&(o=g(t(a)*t(v)),e+=`
                        Strom I<sub>2</sub> =  
                        I<sub>1</sub> &lowast; &uuml;
                    =
                        ${a}V &lowast; ${v}
                    = ${o}A<br>`),!o&&_&&c&&(o=g(t(_)/t(c)),e+=`
                        Strom I<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>2</sub></span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${_}V</span><br>
                            <span>${c}&Omega;</span>
                        </div> 
                    = ${o}A<br>`),!o&&u&&_&&(o=g(t(u)/t(_)),e+=`
                        Strom I<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>U<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u}W</span><br>
                            <span>${_}V</span>
                        </div> 
                    = ${o}A<br>`),!o&&u&&c&&(o=g((t(u)/t(c))**.5),e+=`
                        Strom I<sub>2</sub> = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> P<sub>2</sub> </span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator">${u}W </span><br>
                            <span>${c}&Omega;</span>
                        </div> 
                    = ${o}A<br>`),!h&&v&&_&&(h=g(t(_)*t(v)),e+=`
                        Spannung U<sub>1</sub> = 
                        U<sub>2</sub> &lowast; &uuml;
                    =
                        ${_}V &lowast; ${v}
                    = ${h}V<br>`),!h&&a&&s&&(h=g(t(a)*t(s)),e+=`
                        Spannung U<sub>1</sub> = 
                        I<sub>1</sub> &lowast; R<sub>1</sub>
                    =
                        ${a}A &lowast; ${s}&Omega;
                    = ${h}V<br>`),!h&&l&&a&&(h=g(t(l)/t(a)),e+=`
                        Spannung U<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${l}W</span><br>
                            <span>${a}A</span>
                        </div> 
                    = ${h}V<br>`),!h&&s&&l&&(h=g((t(l)*t(s))**.5),e+=`
                    Spannung U<sub>1</sub> =
                        &radic; P<sub>1</sub> &lowast; R<sub>1</sub>
                    =
                        &radic; ${l}W &lowast; ${s}&Omega;
                    = ${h}V<br>`),!_&&v&&h&&(_=g(t(h)/t(v)),e+=`
                        Spannung U<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${h}V</span><br>
                            <span>${v}</span>
                        </div> 
                    = ${_}V<br>`),!_&&o&&c&&(_=g(t(o)*t(c)),e+=`
                        Spannung U<sub>2</sub> = 
                        I<sub>2</sub> &lowast; R<sub>2</sub>
                    =
                        ${o}A &lowast; ${c}&Omega;
                    = ${_}V<br>`),!_&&u&&o&&(_=g(t(u)/t(o)),e+=`
                        Spannung U<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>I<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u}W</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${_}V<br>`),!_&&c&&u&&(_=g((t(u)*t(c))**.5),e+=`
                    Spannung U<sub>1</sub> =
                        &radic; P<sub>2</sub> &lowast; R<sub>2</sub>
                    =
                        &radic; ${u}W &lowast; ${c}&Omega;
                    = ${_}V<br>`),!l&&u&&y&&(l=g(t(u)/t(y)),e+=`
                        Leistung P<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>&eta;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u}W</span><br>
                            <span>${y}</span>
                        </div> 
                    = ${l}W<br>`),!l&&h&&a&&(l=g(t(h)*t(a)),e+=`
                        Leistung P<sub>1</sub> = 
                        U<sub>1</sub> &lowast; I<sub>1</sub>
                    =
                        ${h}V &lowast; ${a}A
                    = ${l}W<br>`),!l&&h&&s&&(l=g(t(h)**2/t(s)),e+=`
                    Leistung P<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>1</sub><sup>2</sup> </span><br>
                            <span>R<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${h}V)<sup>2</sup> </span><br>
                            <span>${s}&Omega;</span>
                        </div> 
                    = ${l}W<br>`),!l&&a&&s&&(l=g(t(a)**2*t(s)),e+=`
                    Leistung P<sub>1</sub> =
                        I<sub>1</sub><sup>2</sup> &lowast; R<sub>1</sub>
                    =
                        (${a}A)<sup>2</sup> &lowast; ${s}&Omega;
                    = ${l}W<br>`),!u&&l&&y&&(u=g(t(l)*t(y)),e+=`
                        Leistung P<sub>2</sub> = 
                        P<sub>1</sub> &lowast; &eta;
                    =
                        ${l}W &lowast; ${y}
                    = ${u}W<br>`),!u&&_&&o&&(u=g(t(_)*t(o)),e+=`
                        Leistung P<sub>2</sub> = 
                        U<sub>2</sub> &lowast; I<sub>2</sub>
                    =
                        ${_}V &lowast; ${o}A
                    = ${u}W<br>`),!u&&_&&c&&(u=g(t(_)**2/t(c)),e+=`
                    Leistung P<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>2</sub><sup>2</sup> </span><br>
                            <span>R<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${_}V)<sup>2</sup> </span><br>
                            <span>${c}&Omega;</span>
                        </div> 
                    = ${u}W<br>`),!u&&o&&c&&(u=g(t(o)**2*t(c)),e+=`
                    Leistung P<sub>2</sub> =
                        I<sub>2</sub><sup>2</sup> &lowast; R<sub>2</sub>
                    =
                        (${o}A)<sup>2</sup> &lowast; ${c}&Omega;
                    = ${u}W<br>`),!y&&l&&u&&t(l)>t(u)&&(y=g(t(u)/t(l)),e+=`
                        Wirkungsgrad &eta; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>P<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${u}W</span><br>
                            <span>${l}W</span>
                        </div> 
                    = ${y} = ${t(y)*100}%<br>`),!s&&h&&a&&(s=g(t(h)/t(a)),e+=`
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>1</sub></span><br>
                            <span>I<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${h}V</span><br>
                            <span>${a}A</span>
                        </div> 
                    = ${s}&Omega;<br>`),!s&&v&&c&&(s=g(t(c)*t(v)**2),e+=`
                        Widerstand R<sub>1</sub> = 
                        R<sub>2</sub> &lowast; &uuml;<sup>2</sup>
                    =
                        ${c}&Omega; &lowast; ${v}<sup>2</sup>
                    = ${s}&Omega;<br>`),!s&&l&&a&&(s=g(t(l)/t(a)**2),e+=`
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>1</sub></span><br>
                            <span>I<sub>1</sub><sup>2</sup> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">  ${l}W</span><br>
                            <span>(${a}A)<sup>2</sup></span>
                        </div> 
                    = ${s}&Omega;<br>`),!s&&h&&l&&(s=g(t(h)**2/t(l)),e+=`
                        Widerstand R<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>1</sub><sup>2</sup> </span><br>
                            <span>P<sub>1</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${h}V)<sup>2</sup> </span><br>
                            <span>${l}W</span>
                        </div> 
                    = ${s}&Omega;<br>`),!c&&_&&o&&(c=g(t(_)/t(o)),e+=`
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>2</sub></span><br>
                            <span>I<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${_}V</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${c}&Omega;<br>`),!c&&v&&s&&(c=g(t(s)/t(v)**2),e+=`
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">R<sub>1</sub></span><br>
                            <span>&uuml;<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}&Omega;</span><br>
                            <span>${v}<sup>2</sup></span>
                        </div> 
                    = ${c}&Omega;<br>`),!c&&u&&o&&(c=g(t(u)/t(o)**2),e+=`
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">P<sub>2</sub></span><br>
                            <span>I<sub>2</sub><sup>2</sup> </span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">  ${u}W</span><br>
                            <span>(${o}A)<sup>2</sup></span>
                        </div> 
                    = ${c}&Omega;<br>`),!c&&_&&u&&(c=g(t(_)**2/t(u)),e+=`
                        Widerstand R<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U<sub>2</sub><sup>2</sup> </span><br>
                            <span>P<sub>2</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> (${_}V)<sup>2</sup> </span><br>
                            <span>${u}W</span>
                        </div> 
                    = ${c}&Omega;<br>`),!p&&v&&m&&(p=g(t(m)/t(v)**2),e+=`
                        Kondensator C<sub>1</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">C<sub>2</sub></span><br>
                            <span>&uuml;<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${m}&Omega;</span><br>
                            <span>${v}<sup>2</sup></span>
                        </div> 
                    = ${p}F<br>`),!m&&v&&p&&(m=g(t(p)*t(v)**2),e+=`
                        Kondensator C<sub>2</sub> = 
                        C<sub>1</sub> &lowast; &uuml;<sup>2</sup>
                    =
                        ${p}&Omega; &lowast; ${v}<sup>2</sup>
                    = ${m}F<br>`),!d&&v&&f&&(d=g(t(f)*t(v)),e+=`
                        Windungszahl N<sub>1</sub> = 
                        N<sub>2</sub> &lowast; &uuml;
                    =
                        ${f} &lowast; ${v}
                    = ${d}<br>`),!f&&v&&d&&(f=g(t(d)/t(v)),e+=`
                        Windungszahl N<sub>2</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator">N<sub>1</sub></span><br>
                            <span>&uuml;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${d}</span><br>
                            <span>${v}</span>
                        </div> 
                    = ${f}<br>`);i(n.getElementById(`result`),e)}function T(){n.querySelectorAll(`.input-numbers input`).forEach(e=>e.value=``),i(n.getElementById(`result`),``)}return{handlers:{calculateParameters:w,resetInputs:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

} }`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`div`,{children:(0,s.jsx)(`h1`,{children:`Transformator`})}),(0,s.jsxs)(`div`,{className:`input-numbers`,children:[(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-0`,"data-action":`resetInputs`,onClick:t=>{e.current?.handlers.resetInputs?.()},className:`Button_Berechnen`,children:`Löschen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. I`,(0,s.jsx)(`sub`,{children:`2`}),` = 5mA → Eingabe: 5m (nicht 5mA)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I1`,id:`I1`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Strom I`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I2`,id:`I2`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R1`,id:`R1`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Widerstand R`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R2`,id:`R2`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P1`,id:`P1`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Leistung P`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Leistung P2`,id:`P2`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Windungszahl N`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Windungszahl)`},type:`text`,"aria-label":`Windungszahl N1`,id:`N1`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Windungszahl N`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Windungszahl)`},type:`text`,"aria-label":`Windungszahl N2`,id:`N2`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C1`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C1`,id:`C1`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C2`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C2`,id:`C2`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`1`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U1`,id:`U1`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spannung U`,(0,s.jsx)(`sub`,{children:`2`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U2`,id:`U2`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Übersetzungsverhältnis ü`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Verstaerkungsfaktor)`},type:`text`,"aria-label":`Übersetzungsverhältnis ü`,id:`ue`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkungsgrad η`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Wirkungsgrad η`,id:`eta`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-1`,"data-action":`calculateParameters`,onClick:t=>{e.current?.handlers.calculateParameters?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,s.jsx)(`label`,{})]})]}),(0,s.jsx)(`h3`,{children:`Resultate`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};