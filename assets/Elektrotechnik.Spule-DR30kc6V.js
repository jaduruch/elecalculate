import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-B_jRmEqB.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(){let e=``,a=`1`,o=n.getElementById(`I`).value,s=n.getElementById(`L`).value,c=n.getElementById(`ur`).value,l=n.getElementById(`N`).value,u=n.getElementById(`v`).value,d=n.getElementById(`A`).value,f=n.getElementById(`Phi`).value,p=n.getElementById(`U`).value,m=n.getElementById(`Al`).value,h=n.getElementById(`l`).value,_=n.getElementById(`B`).value,v=n.getElementById(`t`).value;for(;a!=e;)a=e,!o&&f&&l&&s&&(o=g(t(f)*t(l)/t(s)),e+=`
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi; &lowast; N</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${f}Wb &lowast; ${l}</span><br>
                            <span>${s}H</span>
                        </div> 
                    = ${o}A <br>`),!o&&p&&v&&s&&(o=g(-(t(p)*t(v))/t(s)),e+=`
                        Strom&auml;nderung &Delta;I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> -${p}V &lowast; ${v}s</span><br>
                            <span>${s}H</span>
                        </div> 
                    = ${o}A <br>`),!s&&c&&l&&d&&h&&(s=g(t(c)*1257e-9*t(l)**2*r(d)/t(h)),e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup> &lowast; A</span><br>
                            <span>l</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${l})<sup>2</sup> &lowast; ${d}m<sup>2</sup></span><br>
                            <span>${h}m</span>
                        </div> 
                    = ${s}H <br>`),!s&&m&&l&&(s=g(t(m)*t(l)**2),e+=`
                        Induktivit&auml;t L =
                        A<sub>L</sub> &lowast; N<sup>2</sup>
                    =
                        ${m}Vs/A &lowast; (${l})<sup>2</sup>
                    = ${s}H <br>`),!s&&f&&l&&o&&(s=g(t(f)*t(l)/t(o)),e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi; &lowast; N</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${f}Wb &lowast; ${l}</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${s}H <br>`),!s&&p&&v&&o&&(s=g(-(t(p)*t(v))/t(o)),e+=`
                        Induktivit&auml;t L = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> -${p}V &lowast; ${v}s</span><br>
                            <span>&Delta;${o}A</span>
                        </div> 
                    = ${s}H <br>`),!c&&s&&h&&d&&l&&(c=g(t(s)*t(h)/(r(d)*1257e-9*t(l)**2)),e+=`
                        Permeabilit&auml;t &mu;<sub>r</sub> = 
                        <div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">A &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}H &lowast; ${h}m</span><br>
                            <span class="fraction-denumerator">${d}m<sup>2</sup> &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${l})<sup>2</sup></span>
                        </div> 
                    = ${c}<br>`),!l&&s&&h&&c&&d&&(l=g((t(s)*t(h)/(t(c)*1257e-9*r(d)))**.5),e+=`
                        Windungszahl N = &radic; 
                        (<div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">&mu;<sub>0</sub> &lowast; &mu;<sub>r</sub> &lowast; A</span>
                        </div>)
                    = &radic; 
                        (<div class ="fraction">
                            <span>${s}H &lowast; ${h}m</span><br>
                            <span class="fraction-denumerator">${c} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; ${d}m<sup>2</sup></span>
                        </div>)
                    = ${l}<br>`),!l&&s&&m&&(l=g((t(s)/t(m))**.5),e+=`
                        Windungszahl N = &radic; 
                        (<div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denumerator">A<sub>L</sub></span>
                        </div>)
                    = &radic;
                        (<div class ="fraction">
                            <span>${s}H</span><br>
                            <span class="fraction-denumerator">${m}Vs/A</span>
                        </div>)
                    = ${l} <br>`),!l&&f&&s&&o&&(l=g(t(s)*t(o)/t(f)),e+=`
                        Windungszahl N = 
                        <div class ="fraction">
                            <span class="fraction-numerator">L &lowast; I</span><br>
                            <span>&Phi;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}H &lowast; ${o}A</span><br>
                            <span>${f}Wb</span>
                        </div> 
                    = ${l}<br>`),!l&&p&&v&&f&&(l=g(-(t(p)*t(v))/t(f)),e+=`
                        Windungszahl N  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">-u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>&Delta;&Phi;</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${p}V &lowast; ${v}s</span><br>
                            <span>${f}Wb</span>
                        </div> 
                    = ${l}<br>`),!u&&p&&_&&h&&(u=g(t(p)/(t(_)*t(h))),e+=`
                        Geschwindigkeit v =  
                        <div class ="fraction">
                            <span>u<sub>0</sub></span><br>
                            <span class="fraction-denumerator">B &lowast; l</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${p}V</span><br>
                            <span class="fraction-denumerator">${_}T &lowast; ${h}m</span>
                        </div>
                    = ${u}m/s <br>`),!d&&s&&h&&c&&l&&(d=formatPrefixNoUnitsquare(t(s)*t(h)/(t(c)*1257e-9*t(l)**2)),e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span>L &lowast; l</span><br>
                            <span class="fraction-denumerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}H &lowast; ${h}m</span><br>
                            <span class="fraction-denumerator">${c} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${l})<sup>2</sup></span>
                        </div> 
                    = ${d}m<sup>2</sup><br>`),!d&&f&&_&&(d=formatPrefixNoUnitsquare(t(f)/t(_)),e+=`
                        Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>B</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${f}Wb</span><br>
                            <span>${_}T</span>
                        </div> 
                    = ${d}m<sup>2</sup><br>`),!f&&s&&o&&l&&(f=g(t(s)*t(o)/t(l)),e+=`
                        Magnetischer Fluss &Phi; = 
                        <div class ="fraction">
                            <span class="fraction-numerator">L &lowast; I</span><br>
                            <span>N</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}H &lowast; ${o}A</span><br>
                            <span>${l}</span>
                        </div> 
                    = ${f}Wb <br>`),!f&&p&&v&&l&&(f=g(-(t(p)*t(v))/t(l)),e+=`
                        &auml;nderung des Magnetischen Flusses &Delta;&Phi; = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">u<sub>0</sub> &lowast; &Delta;t</span><br>
                            <span>N</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${p}V &lowast; ${v}s</span><br>
                            <span>${l}</span>
                        </div> 
                    = ${f}Wb <br>`),!p&&f&&v&&l&&(p=g(-(t(l)*t(f))/t(v)),e+=`
                        Induzierte Spannung u<sub>0</sub> = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;Phi;</span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${l} &lowast; ${f}Wb</span><br>
                            <span>${v}s</span>
                        </div> 
                    = ${p}V <br>`),!p&&s&&o&&v&&(p=g(-(t(s)*t(o))/t(v)),e+=`
                        Induzierte Spannung u<sub>0</sub> = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">L &lowast; &Delta;I</span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${s}H &lowast; ${o}A</span><br>
                            <span>${v}s</span>
                        </div> 
                    = ${p}V <br>`),!p&&_&&h&&u&&(p=g(t(_)*t(h)*t(u)),e+=`
                        Induzierte Spannung u<sub>0</sub> =
                        B &lowast; l &lowast; v
                    =
                        ${_}T &lowast; ${h}m &lowast; ${u}m/s
                    = ${p}V <br>`),!m&&s&&l&&(m=g(t(s)/t(l)**2),e+=`
                        Spulenkonstante A<sub>L</sub>=  
                        <div class ="fraction">
                            <span>L</span><br>
                            <span class="fraction-denumerator">N<sup>2</sup></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}H</span><br>
                            <span class="fraction-denumerator">(${l})<sup>2</sup></span>
                        </div>
                    = ${m}Vs/A<br>`),!h&&c&&l&&d&&s&&(h=g(t(c)*1257e-9*t(l)**2*r(d)/t(s)),e+=`
                        Leiterl&auml;nge l = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&mu;<sub>r</sub> &lowast; &mu;<sub>0</sub> &lowast; N<sup>2</sup> &lowast; A</span><br>
                            <span>L</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${c} &lowast; 1.257&lowast;10<sup>-6</sup>Vs/Am &lowast; (${l})<sup>2</sup> &lowast; ${d}m<sup>2</sup></span><br>
                            <span>${s}H</span>
                        </div> 
                    = ${h}m <br>`),!h&&p&&_&&u&&(h=g(t(p)/(t(_)*t(u))),e+=`
                        Leiterl&auml;nge l =  
                        <div class ="fraction">
                            <span>u<sub>0</sub></span><br>
                            <span class="fraction-denumerator">B &lowast; v</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${p}V</span><br>
                            <span class="fraction-denumerator">${_}T &lowast; ${u}m/s</span>
                        </div>
                    = ${h}m<br>`),!_&&f&&d&&(_=g(t(f)/r(d)),e+=`
                        Mag. Flussdichte B  = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&Phi;</span><br>
                            <span>A</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${f}Wb</span><br>
                            <span>${d}m<sup>2</sup></span>
                        </div> 
                    = ${_}T <br>`),!v&&f&&p&&l&&(v=g(-(t(l)*t(f))/t(p)),e+=`
                        Zeit &Delta;t = 
                        -<div class ="fraction">
                            <span class="fraction-numerator">N &lowast; &Delta;Phi;</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${l} &lowast; ${f}Wb</span><br>
                            <span>${p}V</span>
                        </div> 
                    = ${v}s<br>`),!v&&s&&p&&o&&(v=g(-(t(s)*t(o))/t(p)),e+=`
                        Zeit &Delta;t =
                        -<div class ="fraction">
                            <span class="fraction-numerator">L &lowast; &Delta;I</span><br>
                            <span> u<sub>0</sub></span>
                        </div> 
                    =
                        -<div class ="fraction">
                            <span class="fraction-numerator"> ${s}H &lowast; ${o}A</span><br>
                            <span>${p}V</span>
                        </div> 
                    = ${v}s <br>`);i(n.getElementById(`result`),e)}function T(){n.getElementById(`L_Inputs`).querySelectorAll(`input`).forEach(e=>e.value=``),i(n.getElementById(`result`),``)}n.getElementById(`modeSwitch`).addEventListener(`change`,function(){let e=n.getElementById(`modeLabel`),t=n.getElementById(`circuitImage`);this.checked?(e.textContent=`Entladen`,t.src=`/Pictures/RL_Discharge.png`):(e.textContent=`Laden`,t.src=`/Pictures/RL_Charge.png`)});function E(){let e=``,r=`1`,a=n.getElementById(`modeSwitch`).checked,o=n.getElementById(`I_RL`).value,s=n.getElementById(`It_RL`).value,c=n.getElementById(`R_RL`).value,l=n.getElementById(`L_RL`).value,u=n.getElementById(`U_RL`).value,d=n.getElementById(`Ut_RL`).value,f=n.getElementById(`t_RL`).value,p=n.getElementById(`tau_RL`).value;for(;r!=e;)r=e,!p&&l&&c&&(p=g(t(l)/t(c)),e+=`
                        Zeitkonstante &#120649; =
                        <div class ="fraction">
                            <span class="fraction-numerator">L</span><br>
                            <span>R</span>
                        </div>
                    = <div class ="fraction">
                            <span class="fraction-numerator">${l}H</span><br>
                            <span>${c}&Omega;</span>
                        </div>
                    = ${p}s<br>`),!l&&p&&c&&(l=g(t(p)*t(c)),e+=`
                        Induktivit&auml;t L = 
                        &#120649; &lowast; R
                    =
                        ${p}s &lowast; ${c}&Omega;
                    = ${l}H <br>`),!c&&l&&p&&(c=g(t(l)/t(p)),e+=`
                        Widerstand R =
                        <div class ="fraction">
                            <span class="fraction-numerator">L</span><br>
                            <span>&#120649;</span>
                        </div>
                    = <div class ="fraction">
                            <span class="fraction-numerator">${l}H</span><br>
                            <span>${p}s</span>
                        </div>
                    = ${c}&Omega;<br>`),!u&&c&&o&&(u=g(t(c)*t(o)),e+=`
                        Spannung U = 
                        R &lowast; I
                    =
                        ${c}&Omega; &lowast; ${o}A
                    = ${u}V <br>`),!c&&u&&o&&(c=g(t(u)/t(o)),e+=`
                        Widerstand R = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${c}&Omega; <br>`),!o&&u&&c&&(o=g(t(u)/t(c)),e+=`
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>R</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${c}&Omega;</span>
                        </div> 
                    = ${o}A <br>`),a?(!u&&p&&f&&d&&(u=g(-t(d)/Math.E**-(t(f)/t(p))),e+=`
                            Spannung U = -
                            <div class ="fraction">
                                <span>u(t)</span><br>
                                <div style="border-top: 1px solid white"><span>e<sup>
                                    
                                <div class ="fraction">
                                    <span >- t</span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = -
                            <div class ="fraction">
                                <span>${d}V</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span >- ${f}s</span><br>
                                    <span class="fraction-denumerator">${p}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${u}V <br>`),!d&&u&&f&&p&&(d=g(-t(u)*Math.E**-(t(f)/t(p))),e+=`
                            Spannung u(t) = - U &lowast; (e<sup> 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = - ${u}V &lowast; (e<sup>
                            <div class ="fraction">
                                <span>- ${f}s</span><br>
                                <span class="fraction-denumerator">${p}s</span>
                            </div></sup>)
                        = ${d}V <br>`),!p&&u&&d&&f&&(p=g(t(f)/Math.log(t(d)/t(u))),e+=`
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">u(t)</span><br>
                                    <span>U</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${d}V</span><br>
                                    <span>${u}V</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${p}s <br>`),!p&&o&&s&&f&&(p=g(-t(f)/Math.log(t(s)/t(o))),e+=`
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">i(t)</span><br>
                                    <span>I</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${s}A</span><br>
                                    <span>${o}A</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${p}s <br>`),!o&&p&&f&&s&&(o=g(t(s)/Math.E**-(t(f)/t(p))),e+=`
                            Strom I = 
                            <div class ="fraction">
                                <span>i(t)</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span >- t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${s}A</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                <div class ="fraction">
                                    <span>- ${f}s</span><br>
                                    <span class="fraction-denumerator">${p}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${o}A <br>`),!s&&o&&f&&p&&(s=g(t(o)*Math.E**-(t(f)/t(p))),e+=`
                            Strom i(t) = I &lowast; e<sup> 
                            <div class ="fraction">
                                <span class="fraction-numerator">- t</span><br>
                                <span> &#120649;</span>
                            </div></sup>
                        = ${o}A &lowast; e<sup>
                            <div class ="fraction">
                                <span class="fraction-numerator">- ${f}s</span><br>
                                <span>${p}s</span>
                            </div></sup>
                        = ${s}A <br>`),!f&&p&&u&&d&&(f=g(t(p)*Math.log(t(d)/t(u))),e+=`
                            Zeit t = &#120649; &lowast; ln( 
                            <div class ="fraction">
                                <span class="fraction-numerator">u(t) </span><br>
                                <span>U</span>
                            </div>)
                        = ${p}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${d}V</span><br>
                                <span>${u}V</span>
                            </div>)
                        = ${f}s <br>`),!f&&p&&o&&s&&(f=g(t(p)*Math.log(t(s)/t(o))),e+=`
                            Zeit t = &#120649; &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">i(t) </span><br>
                                <span>I</span>
                            </div>)
                        = ${p}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${s}A</span><br>
                                <span>${o}A</span>
                            </div>)
                        = ${f}s <br>`)):(!u&&p&&f&&d&&(u=g(t(d)/Math.E**-(t(f)/t(p))),e+=`
                            Spannung U = 
                            <div class ="fraction">
                                <span>u(t)</span><br>
                                <div style="border-top: 1px solid white"><span>e<sup>
                                    
                                -<div class ="fraction">
                                    <span >t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${d}V</span><br>
                                <div style="border-top: 1px solid white"><span >e<sup>
                                    
                                -<div class ="fraction">
                                    <span >${f}s</span><br>
                                    <span class="fraction-denumerator">${p}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${u}V<br>`),!d&&u&&f&&p&&(d=g(t(u)*Math.E**-(t(f)/t(p))),e+=`
                            Spannung u(t) = U &lowast; (e<sup> 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = ${u}V &lowast; (e<sup>
                            -<div class ="fraction">
                                <span>${f}s</span><br>
                                <span class="fraction-denumerator">${p}s</span>
                            </div></sup>)
                        = ${d}V <br>`),!p&&u&&d&&f&&(p=g(-t(f)/Math.log(t(d)/t(u))),e+=`
                            Zeitkonstante &#120649; = 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">u(t)</span><br>
                                    <span>U</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            -<div class ="fraction">
                                <span>t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(
                                    
                                <div class ="fraction">
                                    <span class="fraction-numerator">${d}V</span><br>
                                    <span>${u}V</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${p}s<br>`),!p&&u&&d&&f&&(p=g(-t(f)/Math.log(1-t(s)/t(o))),e+=`
                            Zeitkonstante &#120649; = 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <div style="border-top: 1px solid white"><span >ln(1- 
                                    
                                <div class ="fraction">
                                    <span>i(t)</span><br>
                                    <span class="fraction-denumerator">I</span>
                                </div>)
                                    
                                </span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>- ${f}s</span><br>
                                <div style="border-top: 1px solid white"><span >ln(1 -
                                    
                                <div class ="fraction">
                                    <span>${s}A</span><br>
                                    <span class="fraction-denumerator">${o}A</span>
                                </div>)
                                    
                                </span></div>
                            </div>

                        = ${p}s<br>`),!o&&p&&f&&s&&(o=g(t(s)/(1-Math.E**-(t(f)/t(p)))),e+=`
                            Strom I = 
                            <div class ="fraction">
                                <span>i(t)</span><br>
                                <div style="border-top: 1px solid white"><span >1 - e<sup>
                                    
                                -<div class ="fraction">
                                    <span >t </span><br>
                                    <span class="fraction-denumerator"> &#120649;</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>
                        = 
                            <div class ="fraction">
                                <span>${s}A</span><br>
                                <div style="border-top: 1px solid white"><span >1 - e<sup>
                                    
                                -<div class ="fraction">
                                    <span >${f}s</span><br>
                                    <span class="fraction-denumerator">${p}s</span>
                                </div>
                                    
                                </sup></span></div>
                            </div>

                        = ${o}A <br>`),!s&&o&&f&&p&&(s=g(t(o)*(1-Math.E**-(t(f)/t(p)))),e+=`
                            Strom i(t) = I &lowast; (1 - e<sup> 
                            <div class ="fraction">
                                <span>- t</span><br>
                                <span class="fraction-denumerator"> &#120649;</span>
                            </div></sup>)
                        = ${o}A &lowast; (1 - e<sup>
                            <div class ="fraction">
                                <span>- ${f}s</span><br>
                                <span class="fraction-denumerator">${p}s</span>
                            </div></sup>)
                        = ${s}A <br>`),!f&&p&&o&&s&&(f=g(-t(p)*Math.log(1-t(s)/t(o))),e+=`
                            Zeit t = - &#120649; &lowast; ln(
                            <div class ="fraction">
                                <span>i(t) </span><br>
                                <span class="fraction-denumerator">I</span>
                            </div>)
                        = - ${p}s &lowast; ln(1 -
                            <div class ="fraction">
                                <span>${s}A</span><br>
                                <span class="fraction-denumerator">${o}A</span>
                            </div>)
                        = ${f}s <br>`),!f&&p&&u&&d&&(f=g(-t(p)*Math.log(t(d)/t(u))),e+=`
                            Zeit t = - &#120649; &lowast; ln( 
                            <div class ="fraction">
                                <span class="fraction-numerator">u(t) </span><br>
                                <span>U</span>
                            </div>)
                        = - ${p}s &lowast; ln(
                            <div class ="fraction">
                                <span class="fraction-numerator">${d}V</span><br>
                                <span>${u}V</span>
                            </div>)
                        = ${f}s<br>`));i(n.getElementById(`result_RL`),e),O(o,p,u,f)}function D(){n.getElementById(`RL_Inputs`).querySelectorAll(`input`).forEach(e=>e.value=``),i(n.getElementById(`result_RL`),``)}function O(e,r,i,a){let o=t(e)||1e-4,s=t(r)||.001,c=t(i)||1,l=t(a)||6*s,u=n.getElementById(`modeSwitch`).checked,d=5*s;x(`voltageCanvas`,e=>u?-c*Math.exp(-e/s):c*Math.exp(-e/s),`Spannung (V)`,d,100,{color:`#0070C0`,tMarker:isFinite(l)?l:void 0,markerLabel:`u(t) = `}),x(`currentCanvas`,e=>u?o*Math.exp(-e/s):o*(1-Math.exp(-e/s)),`Strom (A)`,d,100,{color:`#C00000`,tMarker:isFinite(l)?l:void 0,markerLabel:`i(t) = `})}function k(e){e.parentElement.classList.toggle(`open`)}return{handlers:{calculateInductorParameters:w,resetInputsL:T,calculateRL:E,resetInputsRL:D,generate_e_curve_from_RLinputs:O,toggleDropdown:k,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

} }`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Spulen`}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Spulen berechnungen`,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{id:`L_Inputs`,children:[(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-1`,"data-action":`resetInputsL`,onClick:t=>{e.current?.handlers.resetInputsL?.()},className:`Button_Berechnen`,children:`Löschen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 15μH → Eingabe: 15u (nicht 15uF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Strom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktivität L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktivität L`,id:`L`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Permeabilitätszahl μ`,(0,s.jsx)(`sub`,{children:`r`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Dielektrizitaetszahl)`},type:`text`,"aria-label":`Permeabilitätszahl μr`,id:`ur`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Windungszahl N`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Windungszahl)`},type:`text`,"aria-label":`Windungszahl N`,id:`N`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Geschwindigkeit v`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Geschwindigkeit)`},type:`text`,"aria-label":`Geschwindigkeit v`,id:`v`}),(0,s.jsx)(`label`,{children:`m/s [meter/sekunde]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Fläche A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Fläche A`,id:`A`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Magnetischer Fluss Φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Mag_Fluss)`},type:`text`,"aria-label":`Magnetischer Fluss Φ`,id:`Phi`}),(0,s.jsx)(`label`,{children:`Weber [Wb]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Spulenkonstante A`,(0,s.jsx)(`sub`,{children:`L`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spulenkonstante)`},type:`text`,"aria-label":`Spulenkonstante AL`,id:`Al`}),(0,s.jsx)(`label`,{children:`Vs/A`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Länge l`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Laenge)`},type:`text`,"aria-label":`Länge l`,id:`l`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Magnetische Flussdichte B`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Mag_Flussdichte)`},type:`text`,"aria-label":`Magnetische Flussdichte B`,id:`B`}),(0,s.jsx)(`label`,{children:`T [Tesla]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeit t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeit t`,id:`t`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-2`,"data-action":`calculateInductorParameters`,onClick:t=>{e.current?.handlers.calculateInductorParameters?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-3`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Spule an Wechselstrom `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsx)(`div`,{children:`
                            development in progress
                        `})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-4`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        RL-Glied `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`label`,{className:`switch`,children:[(0,s.jsx)(`input`,{type:`checkbox`,"aria-label":`Entladen`,id:`modeSwitch`}),(0,s.jsx)(`span`,{className:`slider round`})]}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{id:`modeLabel`,children:`Laden`})]}),(0,s.jsx)(`div`,{id:`circuitDiagram`,children:(0,s.jsx)(`img`,{style:{maxWidth:`500px`,width:`80%`,height:`auto`},id:`circuitImage`,src:`/Pictures/RL_Charge.png`,alt:`Schaltbild RL Glied`})}),(0,s.jsxs)(`div`,{id:`RL_Inputs`,children:[(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-5`,"data-action":`resetInputsRL`,onClick:t=>{e.current?.handlers.resetInputsRL?.()},className:`Button_Berechnen`,children:`Löschen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Speisungsstrom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Speisungsstrom I`,id:`I_RL`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Momentanstrom i(t)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Momentanstrom i(t)`,id:`It_RL`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R_RL`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Induktiviät L`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Induktivitaet)`},type:`text`,"aria-label":`Induktiviät L`,id:`L_RL`}),(0,s.jsx)(`label`,{children:`H [Henri]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Speisespannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Speisespannung U`,id:`U_RL`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Momentanspannung u(t)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Momentanspannung u(t)`,id:`Ut_RL`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeit t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeit t`,id:`t_RL`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeitkonstante 𝝉`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeitkonstante 𝝉`,id:`tau_RL`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{}),(0,s.jsx)(`button`,{type:`button`,id:`control-6`,"data-action":`calculateRL`,onClick:t=>{e.current?.handlers.calculateRL?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,s.jsx)(`label`,{})]}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_RL`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{width:`100%`,maxWidth:`1400px`,margin:`40px auto 0 auto`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`0 2vw 60px 2vw`,boxSizing:`border-box`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,marginBottom:`8px`,textAlign:`center`},children:`Spannungskurve`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`20px auto`,borderRadius:`5px`,maxWidth:`100%`},id:`voltageCanvas`,width:`1300`,height:`400`}),(0,s.jsx)(`h3`,{style:{color:`#fff`,margin:`40px 0 8px 0`,textAlign:`center`},children:`Stromkurve`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`20px auto`,borderRadius:`5px`,maxWidth:`100%`},id:`currentCanvas`,width:`1300`,height:`400`})]})]})]})]})]})}var l=c;export{l as component};