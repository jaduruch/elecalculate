import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-D1EaDO0j.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b}=a(e);function x(){let e=``,a=`1`,o=n.getElementById(`I`).value,s=n.getElementById(`F`).value,c=n.getElementById(`E`).value,l=n.getElementById(`er`).value,u=n.getElementById(`A`).value,d=n.getElementById(`d`).value,f=n.getElementById(`s`).value,p=n.getElementById(`C`).value,m=n.getElementById(`U`).value,h=n.getElementById(`W`).value,v=n.getElementById(`Q`).value,y=n.getElementById(`t`).value;for(;e!=a;)a=e,!o&&v&&y&&(o=g(t(v)/t(y)),e+=`
                        Strom I = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta;Q </span><br>
                            <span>&Delta;t</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${v}C </span><br>
                            <span>${y}s</span>
                        </div> 
                    = ${o}A <br>`),!s&&v&&c&&(s=g(t(v)*t(c)),e+=`
                        Kraft F =
                        Q &lowast; E
                    =
                        ${v}C &lowast; ${c}V/m
                    = ${s}N <br>`),!c&&s&&v&&(c=g(t(s)/t(v)),e+=`
                        Feldst&auml;rke E = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> F </span><br>
                            <span>Q</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}N </span><br>
                            <span>${v}C</span>
                        </div> 
                    = ${c}V/m <br>`),!c&&m&&f&&(c=g(t(m)/t(f)),e+=`
                        Feldst&auml;rke E = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U </span><br>
                            <span>s</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${m}V </span><br>
                            <span>${f}m</span>
                        </div> 
                    = ${c}V/m <br>`),!l&&p&&f&&u&&(l=g(t(p)*t(f)/(r(u)*885e-14)),e+=`
                        Dielektrizit&auml;tszahl &epsilon;<sub>r</sub> = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> C &lowast; s </span><br>
                            <span>A &lowast; &epsilon;<sub>0</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${p}F &lowast; ${f}m</span><br>
                            <span>${u}m<sup>2</sup> &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm</span>
                        </div> 
                    = ${l}<br>`),!u&&p&&f&&l&&(u=_(t(p)*t(f)/(t(l)*885e-14)),e+=`
                    Querschnittsfl&auml;che A =
                        <div class ="fraction">
                            <span class="fraction-numerator"> C &lowast; s </span><br>
                            <span>&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${p}F &lowast; ${f}m</span><br>
                            <span>${l} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm</span>
                        </div> 
                    = ${u}m<sup>2</sup> <br>`),!u&&d&&(u=_(Math.PI*t(d)**2/4),e+=`
                    Fl&auml;che A = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup></span><br>
                            <span>4</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">&pi; &lowast; (${d}m)<sup>2</sup> </span><br>
                            <span>4</span>
                        </div> 
                    = ${u}m<sup>2</sup> <br>`),!d&&u&&(d=g((4*r(u)/Math.PI)**.5),e+=`
                    Leiterdurchmesser d = 
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; A</span><br>
                            <span>&pi;</span>
                        </div>) 
                    =
                        &radic;(<div class ="fraction">
                            <span class="fraction-numerator">4 &lowast; ${u}m<sup>2</sup> </span><br>
                            <span>&pi;</span>
                        </div>)
                    = ${d}m <br>`),!f&&m&&c&&(f=g(t(m)/t(c)),e+=`
                        Elektronenabstand s = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> U </span><br>
                            <span>E</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${m}V </span><br>
                            <span>${c}V/m</span>
                        </div> 
                    = ${f}m <br>`),!f&&l&&u&&p&&(f=g(t(l)*885e-14*r(u)/t(p)),e+=`
                        Elektronenabstand s = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub> &lowast; A </span><br>
                            <span>C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${l} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm &lowast; ${u}m<sup>2</sup> </span><br>
                            <span>${p}F</span>
                        </div> 
                    = ${f}m <br>`),!p&&v&&m&&(p=g(t(v)/t(m)),e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${v}C </span><br>
                            <span>${m}V</span>
                        </div> 
                    = ${p}F <br>`),!p&&l&&u&&f&&(p=g(t(l)*885e-14*r(u)/t(f)),e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator">&epsilon;<sub>r</sub> &lowast; &epsilon;<sub>0</sub> &lowast; A </span><br>
                            <span>s</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${l} &lowast; 8.85&lowast;10<sup>-12</sup> As/Vm &lowast; ${u}m<sup>2</sup> </span><br>
                            <span>${f}m</span>
                        </div> 
                    = ${p}F <br>`),!p&&h&&m&&(p=g(2*t(h)/t(m)**2),e+=`
                        Kapazit&auml;t C = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>U<sup>2</sup></span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${h}J </span><br>
                            <span>(${m}V)<sup>2</sup></span>
                        </div> 
                    = ${p}F <br>`),!m&&c&&f&&(m=g(t(c)*t(f)),e+=`
                        Spannung U =
                        E &lowast; s
                    =
                        ${c}V/m &lowast; ${f}m
                    = ${m}V <br>`),!m&&v&&p&&(m=g(t(v)/t(p)),e+=`
                        Spannung U = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q </span><br>
                            <span>C</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${v}C </span><br>
                            <span>${p}F</span>
                        </div> 
                    = ${m}V <br>`),!m&&h&&v&&(m=g(2*t(h)/t(v)),e+=`
                        Spannung U = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>Q</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${h}J </span><br>
                            <span>${v}C</span>
                        </div> 
                    = ${m}V <br>`),!m&&h&&p&&(m=g((2*t(h)/t(p))**.5),e+=`
                        Spannung U = 
                        &radic;	<div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>C</span>
                        </div> 
                    =
                        &radic;	 <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${h}J </span><br>
                            <span>${p}F</span>
                        </div> 
                    = ${m}V<br>`),!h&&v&&m&&(h=g(t(v)*t(m)/2),e+=`
                        Energie W = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> Q &lowast; U </span><br>
                            <span>2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${v}C &lowast; ${m}V </span><br>
                            <span>2</span>
                        </div> 
                    = ${h}J<br>`),!h&&p&&m&&(h=g(t(m)**2*t(p)/2),e+=`
                        Energie W = 
                        <div class ="fraction">
                            <span class="fraction-numerator">C &lowast; U<sup>2</sup> </span><br>
                            <span>2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator">${p}F &lowast; (${m}V)<sup>2</sup></span><br>
                            <span>2</span>
                        </div> 
                    = ${h}J<br>`),!v&&s&&c&&(v=g(t(s)/t(c)),e+=`
                        Ladung Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> F </span><br>
                            <span>E</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> ${s}N </span><br>
                            <span>${c}V/m</span>
                        </div> 
                    = ${v}C <br>`),!v&&p&&m&&(v=g(t(p)*t(m)),e+=`
                        Ladung Q =
                        C &lowast; U
                    =
                        ${p}F &lowast; ${m}V
                    = ${v}C <br>`),!v&&o&&y&&(v=g(t(o)*t(y)),e+=`
                        Ladungs&auml;nderung  &Delta;Q =
                        I &lowast; &Delta;t
                    =
                        ${o}A &lowast; &Delta;${y}s
                    = ${v}C <br>`),!v&&h&&m&&(v=g(2*t(h)/t(m)),e+=`
                        Ladung Q = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; W </span><br>
                            <span>U</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> 2 &lowast; ${h}J </span><br>
                            <span>${m}V</span>
                        </div> 
                    = ${v}C <br>`),!y&&o&&v&&(y=g(t(v)/t(o)),e+=`
                        Zeit &Delta; t = 
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta; Q </span><br>
                            <span>I</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span class="fraction-numerator"> &Delta; ${v}C </span><br>
                            <span>${o}A</span>
                        </div> 
                    = ${y}s <br>`);i(n.getElementById(`result`),e)}function S(){n.getElementById(`CapacitorParameter`).querySelectorAll(`input`).forEach(e=>e.value=``),i(n.getElementById(`result`),``)}let C=null;function w(e,t){let r=n.getElementById(t);C===e?(e.classList.remove(`selected`),r.style.display=`none`,C=null):(C&&C.classList.remove(`selected`),e.classList.add(`selected`),C=e,t===`Serie`?(n.getElementById(`Serie`).style.display=`block`,n.getElementById(`Parallel`).style.display=`none`):t===`Parallel`&&(n.getElementById(`Serie`).style.display=`none`,n.getElementById(`Parallel`).style.display=`block`))}let T=!1;function E(){let e=n.getElementById(`Rad-Button`);T?(i(e,`360&deg;`),T=!1):(i(e,`2&pi;`),T=!0)}function D(){let e=``,r=n.getElementById(`phi_AC`).value,a=n.getElementById(`I_AC`).value,o=n.getElementById(`R_AC`).value,s=n.getElementById(`Xc_AC`).value,c=n.getElementById(`Z_AC`).value,l=n.getElementById(`C_AC`).value;n.getElementById(`P_AC`).value,n.getElementById(`Qc_AC`).value,n.getElementById(`S_AC`).value;let u=n.getElementById(`Ur_AC`).value,d=n.getElementById(`Uc_AC`).value,f=n.getElementById(`U_AC`).value,p=n.getElementById(`f_AC`).value,m=n.getElementById(`cosphi_AC`).value,h=n.getElementById(`sinphi_AC`).value;r||(s&&c&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>Z</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${s}&Omega;</span><br>
                            <span>${c}&Omega;</span>
                        </div>)
                    = ${v(Math.asin(t(s)/t(c)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.asin(t(s)/t(c))*180/Math.PI,`&deg;`)}<br>`),d&&f&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${d}V</span><br>
                            <span>${f}V</span>
                        </div>)
                    = ${v(Math.asin(t(d)/t(f)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.asin(t(d)/t(f))*180/Math.PI,`&deg;`)}<br>`),o&&c&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">R</span><br>
                            <span>Z</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${o}&Omega;</span><br>
                            <span>${c}&Omega;</span>
                        </div>)
                    = ${v(Math.acos(t(o)/t(c)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.acos(t(o)/t(c))*180/Math.PI,`&deg;`)}<br>`),u&&f&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>U</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${f}V</span>
                        </div>)
                    = ${v(Math.acos(t(u)/t(f)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.acos(t(u)/t(f))*180/Math.PI,`&deg;`)}<br>`),s&&o&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>R</span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${s}&Omega;</span><br>
                            <span>${o}&Omega;</span>
                        </div>)
                    = ${v(Math.atan(t(s)/t(o)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.atan(t(s)/t(o))*180/Math.PI,`&deg;`)}<br>`),d&&u&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U<sub>R</sub></span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${d}V</span><br>
                            <span>${u}V</span>
                        </div>)
                    = ${v(Math.atan(t(d)/t(u)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.atan(t(d)/t(u))*180/Math.PI,`&deg;`)}<br>`),h&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(sin(&phi;))
                    =
                        arcsin(${h})
                    = ${v(Math.sin(t(h)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.asin(t(h))*180/Math.PI,`&deg;`)}<br>`),m&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccso(cos(&phi;))
                    =
                        arcsin(${m})
                    = ${v(Math.cos(t(m)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.cos(t(m))*180/Math.PI,`&deg;`)}<br>`)),a||(u&&o&&(e+=`
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>R</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${o}&Omega;</span>
                        </div>
                    = ${v(t(u)/t(o),`A`)}<br>`),d&&s&&(e+=`
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>X<sub>C</sub></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${d}V</span><br>
                            <span>${s}&Omega;</span>
                        </div>
                    = ${v(t(d)/t(s),`A`)}<br>`),f&&c&&(e+=`
                        Strom I =
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${f}V</span><br>
                            <span>${c}&Omega;</span>
                        </div>
                    = ${v(t(f)/t(c),`A`)}<br>`)),o||(u&&a&&(e+=`
                        Widerstand R =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${a}A</span>
                        </div>
                    = ${v(t(u)/t(a),`&Omega;`)}<br>`),c&&s&&(e+=`
                        Widerstand R = 
                        &radic;(Z<sup>2</sup> - X<sub>C</sub><sup>2</sup>) = 
                        &radic;((${c}&Omega;)<sup>2</sup> - (${s}&Omega;)<sup>2</sup>)
                    = ${v((t(c)**2-t(s)**2)**.5,`&Omega;`)}<br>`),c&&m&&(e+=`
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${c}&Omega; &lowast; ${m}
                    = ${v(t(c)*t(m),`&Omega;`)}<br>`),c&&r&&T&&(e+=`
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${c}&Omega; &lowast; cos(${r})
                    = ${v(t(c)*Math.cos(t(r)),`&Omega;`)}<br>`),c&&r&&!T&&(e+=`
                        Widerstand R = 
                        Z &lowast; cos(&phi;) = 
                        ${c}&Omega; &lowast; cos(${r}&deg;)
                    = ${v(t(c)*Math.cos(t(r)*Math.PI/180),`&Omega;`)}<br>`),s&&r&&T&&(e+=`
                        Widerstand R =
                        <div class ="fraction">
                            <span>X<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}&Omega;</span><br>
                            <span class="fraction-denumerator">tan(${r})</span>
                        </div>
                    = ${v(t(s)/Math.tan(t(r)),`&Omega;`)}<br>`),s&&r&&!T&&(e+=`
                        Widerstand R =
                        <div class ="fraction">
                            <span>X<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}&Omega;</span><br>
                            <span class="fraction-denumerator">tan(${r}&deg;)</span>
                        </div>
                    = ${v(t(s)/Math.tan(t(r)*Math.PI/180),`&Omega;`)}<br>`)),s||(d&&a&&(e+=`
                        Blindwiderstand X<sub>C</sub> =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${d}V</span><br>
                            <span>${a}A</span>
                        </div>
                    = ${v(t(d)/t(a),`&Omega;`)}<br>`),c&&o&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        &radic;(Z<sup>2</sup> - R<sup>2</sup>) = 
                        &radic;((${c}&Omega;)<sup>2</sup> - (${o}&Omega;)<sup>2</sup>)
                    = ${v((t(c)**2-t(o)**2)**.5,`&Omega;`)}<br>`),c&&h&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${c}&Omega; &lowast; ${h}
                    = ${v(t(c)*t(h),`&Omega;`)}<br>`),c&&r&&T&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${c}&Omega; &lowast; sin(${r})
                    = ${v(t(c)*Math.sin(t(r)),`&Omega;`)}<br>`),c&&r&&!T&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        Z &lowast; sin(&phi;) = 
                        ${c}&Omega; &lowast; sin(${r}&deg;)
                    = ${v(t(c)*Math.sin(t(r)*Math.PI/180),`&Omega;`)}<br>`),o&&r&&T&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        R &lowast; tan(&phi;) = 
                        ${o}&Omega; &lowast; tan(${r})
                    = ${v(t(o)*Math.tan(t(r)),`&Omega;`)}<br>`),o&&r&&!T&&(e+=`
                        Blindwiderstand X<sub>C</sub> = 
                        R &lowast; tan(&phi;) = 
                        ${o}&Omega; &lowast; tan(${r}&deg;)
                    = ${v(t(o)*Math.tan(t(r)*Math.PI/180),`&Omega;`)}<br>`),l&&p&&(e+=`
                        Blindwiderstand X<sub>C</sub> =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; C &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${l}F &lowast; ${p}Hz</span>
                        </div>
                    = ${v(1/(2*Math.PI*t(l)*t(p)),`&Omega;`)}<br>`)),c||(f&&a&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span class="fraction-numerator">U</span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${f}V</span><br>
                            <span>${a}A</span>
                        </div>
                    = ${v(t(f)/t(a),`&Omega;`)}<br>`),o&&s&&(e+=`
                        Scheinwiderstand Z = 
                        &radic;(R<sup>2</sup> + X<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${o}&Omega;)<sup>2</sup> + (${s}&Omega;)<sup>2</sup>)
                    = ${v((t(o)**2+t(s)**2)**.5,`&Omega;`)}<br>`),o&&m&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}&Omega;</span><br>
                            <span class="fraction-denumerator">${m}</span>
                        </div>
                    = ${v(t(o)/t(m),`&Omega;`)}<br>`),o&&r&&T&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}&Omega;</span><br>
                            <span class="fraction-denumerator">cos(${r})</span>
                        </div>
                    = ${v(t(o)/Math.cos(t(r)),`&Omega;`)}<br>`),o&&r&&!T&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>R</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}&Omega;</span><br>
                            <span class="fraction-denumerator">cos(${r}&deg;)</span>
                        </div>
                    = ${v(t(o)/Math.cos(t(r)*Math.PI/180),`&Omega;`)}<br>`),s&&h&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}&Omega;</span><br>
                            <span class="fraction-denumerator">${h}</span>
                        </div>
                    = ${v(t(s)/t(h),`&Omega;`)}<br>`),s&&r&&T&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}&Omega;</span><br>
                            <span class="fraction-denumerator">sin(${r})</span>
                        </div>
                    = ${v(t(s)/Math.sin(t(r)),`&Omega;`)}<br>`),s&&r&&!T&&(e+=`
                        Scheinwiderstand Z =
                        <div class ="fraction">
                            <span>X<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${s}&Omega;</span><br>
                            <span class="fraction-denumerator">sin(${r}&deg;)</span>
                        </div>
                    = ${v(t(s)/Math.sin(t(r)*Math.PI/180),`&Omega;`)}<br>`)),l||s&&p&&(e+=`
                        Kapazit&auml;t C =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; X<sub>C</sub> &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${s}&Omega; &lowast; ${p}Hz</span>
                        </div>
                    = ${v(1/(2*Math.PI*t(s)*t(p)),`F`)}<br>`),u||(o&&a&&(e+=`
                        Wirkspannung U<sub>R</sub> = 
                        R &lowast; I = 
                        ${o}&Omega; &lowast; ${a}A
                    = ${v(t(o)*t(a),`V`)}<br>`),f&&d&&(e+=`
                        Wirkspannung U<sub>R</sub> = 
                        &radic;(U<sup>2</sup> + U<sub>C</sub><sup>2</sup>) = 
                        &radic;((${f}V)<sup>2</sup> - (${d}V)<sup>2</sup>)
                    = ${v((t(f)**2-t(d)**2)**.5,`V`)}<br>`),f&&m&&(e+=`
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${f}V &lowast; ${m}
                    = ${v(t(f)*t(m),`V`)}<br>`),f&&r&&T&&(e+=`
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${f}V &lowast; cos(${r})
                    = ${v(t(f)*Math.cos(t(r)),`V`)}<br>`),f&&r&&!T&&(e+=`
                        Wirkspannung U<sub>R</sub> = 
                        U &lowast; cos(&phi;) = 
                        ${f}V &lowast; cos(${r}&deg;)
                    = ${v(t(f)*Math.cos(t(r)*Math.PI/180),`V`)}<br>`),d&&r&&T&&(e+=`
                        Wirkspannung U<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${d}V</span><br>
                            <span class="fraction-denumerator">tan(${r})</span>
                        </div>
                    = ${v(t(d)/Math.tan(t(r)),`V`)}<br>`),d&&r&&!T&&(e+=`
                        Wirkspannung U<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${d}V</span><br>
                            <span class="fraction-denumerator">tan(${r}&deg;)</span>
                        </div>
                    = ${v(t(d)/Math.tan(t(r)*Math.PI/180),`V`)}<br>`)),d||(s&&a&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        X<sub>C>/sub> &lowast; I = 
                        ${s}&Omega; &lowast; ${a}A
                    = ${v(t(s)*t(a),`V`)}<br>`),f&&u&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        &radic;(U<sup>2</sup> - U<sub>R</sub><sup>2</sup>) = 
                        &radic;((${f}V)<sup>2</sup> - (${u}V)<sup>2</sup>)
                    = ${v((t(f)**2-t(u)**2)**.5,`V`)}<br>`),f&&h&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${f}V &lowast; ${h}
                    = ${v(t(f)*t(h),`V`)}<br>`),f&&r&&T&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${f}V &lowast; sin(${r})
                    = ${v(t(f)*Math.sin(t(r)),`V`)}<br>`),f&&r&&!T&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        U &lowast; sin(&phi;) = 
                        ${f}V &lowast; sin(${r}&deg;)
                    = ${v(t(f)*Math.sin(t(r)*Math.PI/180),`V`)}<br>`),u&&r&&T&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        U<sub>R</sub> &lowast; tan(&phi;) = 
                        ${u}V &lowast; tan(${r})
                    = ${v(t(u)*Math.tan(t(r)),`V`)}<br>`),u&&r&&!T&&(e+=`
                        Blindspannung U<sub>C</sub> = 
                        U<sub>R</sub> &lowast; tan(&phi;) = 
                        ${u}V &lowast; tan(${r}&deg;)
                    = ${v(t(u)*Math.tan(t(r)*Math.PI/180),`V`)}<br>`)),f||(c&&a&&(e+=`
                        Gesamtspannung U = 
                        Z &lowast; I = 
                        ${c}&Omega; &lowast; ${a}A
                    = ${v(t(c)*t(a),`V`)}<br>`),u&&d&&(e+=`
                        Gesamtspannung U = 
                        &radic;(U<sub>R</sub><sup>2</sup> + U<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${u}V)<sup>2</sup> + (${d}V)<sup>2</sup>)
                    = ${v((t(u)**2+t(d)**2)**.5,`V`)}<br>`),u&&m&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${u}V</span><br>
                            <span class="fraction-denumerator">${m}</span>
                        </div>
                    = ${v(t(u)/t(m),`V`)}<br>`),u&&r&&T&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${u}V</span><br>
                            <span class="fraction-denumerator">cos(${r})</span>
                        </div>
                    = ${v(t(u)/Math.cos(t(r)),`V`)}<br>`),u&&r&&!T&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${u}V</span><br>
                            <span class="fraction-denumerator">cos(${r}&deg;)</span>
                        </div>
                    = ${v(t(u)/Math.cos(t(r)*Math.PI/180),`V`)}<br>`),d&&h&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${d}V</span><br>
                            <span class="fraction-denumerator">${h}</span>
                        </div>
                    = ${v(t(d)/t(h),`V`)}<br>`),d&&r&&T&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${d}V</span><br>
                            <span class="fraction-denumerator">sin(${r})</span>
                        </div>
                    = ${v(t(d)/Math.sin(t(r)),`V`)}<br>`),d&&r&&!T&&(e+=`
                        Gesamtspannung U =
                        <div class ="fraction">
                            <span>U<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${d}V</span><br>
                            <span class="fraction-denumerator">sin(${r}&deg;)</span>
                        </div>
                    = ${v(t(d)/Math.sin(t(r)*Math.PI/180),`V`)}<br>`)),p||s&&l&&(e+=`
                        Frequnez f =
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; X<sub>C</sub> &lowast; C</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>1</span><br>
                            <span class="fraction-denumerator">2&pi; &lowast; ${s}&Omega; &lowast; ${l}F</span>
                        </div>
                    = ${v(1/(2*Math.PI*t(s)*t(l)),`Hz`)}<br>`),m||(o&&c&&(e+=`
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">R</span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${o}&Omega;</span><br>
                            <span>${c}&Omega;</span>
                        </div>
                    = ${v(t(o)/t(c),``)}<br>`),u&&f&&(e+=`
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>R</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${u}V</span><br>
                            <span>${f}V</span>
                        </div>
                    = ${v(t(u)/t(f),``)}<br>`)),h||(s&&c&&(e+=`
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">X<sub>C</sub></span><br>
                            <span>Z</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${s}&Omega;</span><br>
                            <span>${c}&Omega;</span>
                        </div>
                    = ${v(t(s)/t(c),``)}<br>`),u&&f&&(e+=`
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">U<sub>C</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${d}V</span><br>
                            <span>${f}V</span>
                        </div>
                    = ${v(t(d)/t(f),``)}<br>`)),i(n.getElementById(`result_Serie_AC`),e),B(`phasorCanvasVoltage`,`phasorLegendVoltage`),z(`phasorCanvasImpedance`,`phasorLegendImpedance`)}let O=!1;function k(){let e=n.getElementById(`Rad-Buttonp`);O?(i(e,`360&deg;`),O=!1):(i(e,`2&pi;`),O=!0)}n.getElementById(`modeSwitch`).addEventListener(`change`,function(){let e=n.getElementById(`modeLabel`),t=n.getElementById(`circuitImage`);this.checked?(e.textContent=`Entladen`,t.src=`/Pictures/RC_Discharge.png`):(e.textContent=`Laden`,t.src=`/Pictures/RC_Charge.png`)});function A(){let e=``,r=n.getElementById(`phi_ACp`).value,a=n.getElementById(`Ir_ACp`).value,o=n.getElementById(`Ic_ACp`).value,s=n.getElementById(`I_ACp`).value,c=n.getElementById(`G_ACp`).value,l=n.getElementById(`Bc_ACp`).value,u=n.getElementById(`Y_ACp`).value,d=n.getElementById(`C_ACp`).value;n.getElementById(`P_ACp`).value,n.getElementById(`Q_ACp`).value,n.getElementById(`S_ACp`).value;let f=n.getElementById(`U_ACp`).value,p=n.getElementById(`f_ACp`).value,m=n.getElementById(`cosphi_ACp`).value,h=n.getElementById(`sinphi_ACp`).value;r||(l&&u&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>Y</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${l}S</span><br>
                            <span>${u}S</span>
                        </div>)
                    = ${v(Math.asin(t(l)/t(u)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.asin(t(l)/t(u))*180/Math.PI,`&deg;`)}<br>`),o&&s&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I</span>
                        </div>)
                    =
                        arcsin(<div class ="fraction">
                            <span class="fraction-numerator">${o}A</span><br>
                            <span>${s}A</span>
                        </div>)
                    = ${v(Math.asin(t(o)/t(s)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.asin(t(o)/t(s))*180/Math.PI,`&deg;`)}<br>`),c&&u&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">G</span><br>
                            <span>Y</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${c}S</span><br>
                            <span>${u}S</span>
                        </div>)
                    = ${v(Math.acos(t(c)/t(u)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.acos(t(c)/t(u))*180/Math.PI,`&deg;`)}<br>`),a&&s&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>I</span>
                        </div>)
                    =
                        arccos(<div class ="fraction">
                            <span class="fraction-numerator">${a}A</span><br>
                            <span>${s}A</span>
                        </div>)
                    = ${v(Math.acos(t(a)/t(s)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.acos(t(a)/t(s))*180/Math.PI,`&deg;`)}<br>`),l&&c&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>G</span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${l}S</span><br>
                            <span>${c}S</span>
                        </div>)
                    = ${v(Math.atan(t(l)/t(c)),``)} &rarr;

                    &phi;<sub>DEG</sub> 
                    = ${v(Math.atan(t(l)/t(c))*180/Math.PI,`&deg;`)}<br>`),o&&a&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I<sub>R</sub></span>
                        </div>)
                    =
                        arctan(<div class ="fraction">
                            <span class="fraction-numerator">${o}A</span><br>
                            <span>${a}A</span>
                        </div>)
                    = ${v(Math.atan(t(o)/t(a)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.atan(t(o)/t(a))*180/Math.PI,`&deg;`)}<br>`),h&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arcsin(sin(&phi;))
                    =
                        arcsin(${h})
                    = ${v(Math.sin(t(h)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.asin(t(h))*180/Math.PI,`&deg;`)}<br>`),m&&(e+=`
                        Winkel &phi;<sub>RAD</sub> = 
                        arccso(cos(&phi;))
                    =
                        arcsin(${m})
                    = ${v(Math.cos(t(m)),``)} &rarr;

                    &phi;<sub>DEG</sub>
                    = ${v(Math.cos(t(m))*180/Math.PI,`&deg;`)}<br>`)),a||(f&&c&&(e+=`
                        Wirkstrom I<sub>R</sub> = 
                        U &lowast; G = 
                        ${f}V &lowast; ${c}S
                    = ${v(t(f)*t(c),`A`)}<br>`),s&&o&&(e+=`
                        Wirkstrom U<sub>R</sub> = 
                        &radic;(I<sup>2</sup> + I<sub>C</sub><sup>2</sup>) = 
                        &radic;((${s}A)<sup>2</sup> - (${o}A)<sup>2</sup>)
                    = ${v((t(s)**2-t(o)**2)**.5,`A`)}<br>`),s&&m&&(e+=`
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${s}A &lowast; ${m}
                    = ${v(t(s)*t(m),`A`)}<br>`),s&&r&&O&&(e+=`
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${s}A &lowast; cos(${r})
                    = ${v(t(s)*Math.cos(t(r)),`A`)}<br>`),s&&r&&!O&&(e+=`
                        Wirkstrom I<sub>R</sub> = 
                        I &lowast; cos(&phi;) = 
                        ${s}A &lowast; cos(${r}&deg;)
                    = ${v(t(s)*Math.cos(t(r)*Math.PI/180),`A`)}<br>`),o&&r&&O&&(e+=`
                        Wirkstrom I<sub>R</sub> =
                        <div class ="fraction">
                            <span>I<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}A</span><br>
                            <span class="fraction-denumerator">tan(${r})</span>
                        </div>
                    = ${v(t(Uc)/Math.tan(t(r)),`A`)}<br>`),o&&r&&!O&&(e+=`
                        Wirkstrom I<sub>R</sub> =
                        <div class ="fraction">
                            <span>U<sub>c</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}A</span><br>
                            <span class="fraction-denumerator">tan(${r}&deg;)</span>
                        </div>
                    = ${v(t(o)/Math.tan(t(r)*Math.PI/180),`A`)}<br>`)),o||(f&&l&&(e+=`
                        Blindstrom I<sub>C</sub> = 
                        U &lowast; B<sub>C>/sub> = 
                        ${f}V &lowast; ${l}S  
                    = ${v(t(f)*t(l),`A`)}<br>`),s&&a&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        &radic;(I<sup>2</sup> - I<sub>R</sub><sup>2</sup>) = 
                        &radic;((${s}A)<sup>2</sup> - (${a}A)<sup>2</sup>)
                    = ${v((t(s)**2-t(a)**2)**.5,`A`)}<br>`),s&&h&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${s}A &lowast; ${h}
                    = ${v(t(s)*t(h),`A`)}<br>`),s&&r&&O&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${s}A &lowast; sin(${r})
                    = ${v(t(s)*Math.sin(t(r)),`A`)}<br>`),s&&r&&!O&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        I &lowast; sin(&phi;) = 
                        ${s}A &lowast; sin(${r}&deg;)
                    = ${v(t(s)*Math.sin(t(r)*Math.PI/180),`A`)}<br>`),a&&r&&O&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        I<sub>R</sub> &lowast; tan(&phi;) = 
                        ${a}A &lowast; tan(${r})
                    = ${v(t(a)*Math.tan(t(r)),`A`)}<br>`),a&&r&&!O&&(e+=`
                        Blindstrom I<sub>C</sub> =  
                        I<sub>R</sub> &lowast; tan(&phi;) = 
                        ${a}A &lowast; tan(${r}&deg;)
                    = ${v(t(a)*Math.tan(t(r)*Math.PI/180),`A`)}<br>`)),s||(f&&c&&(e+=`
                        Gesamtstrom I = 
                        U &lowast; G = 
                        ${f}V &lowast; ${c}S
                    = ${v(t(f)*t(c),`A`)}<br>`),a&&o&&(e+=`
                        Gesamtstrom I = 
                        &radic;(I<sub>R</sub><sup>2</sup> + I<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${a}A)<sup>2</sup> + (${o}A)<sup>2</sup>)
                    = ${v((t(a)**2+t(o)**2)**.5,`A`)}<br>`),a&&m&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${a}A</span><br>
                            <span class="fraction-denumerator">${m}</span>
                        </div>
                    = ${v(t(a)/t(m),`A`)}<br>`),a&&r&&O&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${a}A</span><br>
                            <span class="fraction-denumerator">cos(${r})</span>
                        </div>
                    = ${v(t(a)/Math.cos(t(r)),`A`)}<br>`),a&&r&&!O&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>R</sub></span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${a}A</span><br>
                            <span class="fraction-denumerator">cos(${r}&deg;)</span>
                        </div>
                    = ${v(t(a)/Math.cos(t(r)*Math.PI/180),`A`)}<br>`),o&&h&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}A</span><br>
                            <span class="fraction-denumerator">${h}</span>
                        </div>
                    = ${v(t(o)/t(h),`A`)}<br>`),o&&r&&O&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}A</span><br>
                            <span class="fraction-denumerator">sin(${r})</span>
                        </div>
                    = ${v(t(o)/Math.sin(t(r)),`A`)}<br>`),o&&r&&!O&&(e+=`
                        Gesamtstrom I =
                        <div class ="fraction">
                            <span>I<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${o}A</span><br>
                            <span class="fraction-denumerator">sin(${r}&deg;)</span>
                        </div>
                    = ${v(t(o)/Math.sin(t(r)*Math.PI/180),`A`)}<br>`)),c||(f&&a&&(e+=`
                        Leitwert G =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${a}A</span><br>
                            <span>${f}V</span>
                        </div>
                    = ${v(t(a)/t(f),`S`)}<br>`),u&&l&&(e+=`
                        Leitwert G = 
                        &radic;(Y<sup>2</sup> - B<sub>C</sub><sup>2</sup>) = 
                        &radic;((${u}S)<sup>2</sup> - (${l}S)<sup>2</sup>)
                    = ${v((t(u)**2-t(l)**2)**.5,`S`)}<br>`),u&&m&&(e+=`
                        Leitwert G =
                        Y &lowast; cos(&phi;) = 
                        ${u}S &lowast; ${m}
                    = ${v(t(u)*t(m),`S`)}<br>`),u&&r&&O&&(e+=`
                        Leitwert G =
                        Y &lowast; cos(&phi;) = 
                        ${u}S &lowast; cos(${r})
                    = ${v(t(u)*Math.cos(t(r)),`S`)}<br>`),u&&r&&!O&&(e+=`
                        Leitwert G = 
                        Y &lowast; cos(&phi;) = 
                        ${u}S &lowast; cos(${r}&deg;)
                    = ${v(t(u)*Math.cos(t(r)*Math.PI/180),`S`)}<br>`),l&&r&&O&&(e+=`
                        Leitwert G =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${l}S</span><br>
                            <span class="fraction-denumerator">tan(${r})</span>
                        </div>
                    = ${v(t(l)/Math.tan(t(r)),`S`)}<br>`),l&&r&&!O&&(e+=`
                        Leitwert G =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">tan(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${l}S</span><br>
                            <span class="fraction-denumerator">tan(${r}&deg;)</span>
                        </div>
                    = ${v(t(l)/Math.tan(t(r)*Math.PI/180),`S`)}<br>`)),l||(f&&o&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${o}A</span><br>
                            <span>${f}V</span>
                        </div>
                    = ${v(t(o)/t(f),`S`)}<br>`),u&&c&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        &radic;(Y<sup>2</sup> - G<sup>2</sup>) = 
                        &radic;((${u}S)<sup>2</sup> - (${c}S)<sup>2</sup>)
                    = ${v((t(u)**2-t(c)**2)**.5,`S`)}<br>`),u&&h&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${u}S &lowast; ${h}
                    = ${v(t(u)*t(h),`S`)}<br>`),u&&r&&O&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${u}S &lowast; sin(${r})
                    = ${v(t(u)*Math.sin(t(r)),`S`)}<br>`),u&&r&&!O&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        Y &lowast; sin(&phi;) = 
                        ${u}S &lowast; sin(${r}&deg;)
                    = ${v(t(u)*Math.sin(t(r)*Math.PI/180),`S`)}<br>`),c&&r&&O&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        G &lowast; tan(&phi;) = 
                        ${c}S &lowast; tan(${r})
                    = ${v(t(c)*Math.tan(t(r)),`S`)}<br>`),c&&r&&!O&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        G &lowast; tan(&phi;) = 
                        ${c}S &lowast; tan(${r}&deg;)
                    = ${v(t(c)*Math.tan(t(r)*Math.PI/180),`S`)}<br>`),d&&p&&(e+=`
                        Blindleitwert B<sub>C</sub> =
                        2&pi; &lowast; C &lowast; f = 
                        2&pi; &lowast; ${d}F &lowast; ${p}Hz
                    = ${v(2*Math.PI*t(p)*t(d),`S`)}<br>`)),u||(f&&s&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span class="fraction-numerator">I</span><br>
                            <span>U</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${s}A</span><br>
                            <span>${f}V</span>
                        </div>
                    = ${v(t(s)/t(f),`S`)}<br>`),c&&l&&(e+=`
                        Scheinleitwert Y =
                        &radic;(G<sup>2</sup> + B<sub>C</sub><sup>2</sup>)) = 
                        &radic;((${c}S)<sup>2</sup> + (${l}S)<sup>2</sup>)
                    = ${v((t(c)**2+t(l)**2)**.5,`S`)}<br>`),c&&m&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${c}S</span><br>
                            <span class="fraction-denumerator">${m}</span>
                        </div>
                    = ${v(t(c)/t(m),`S`)}<br>`),c&&r&&O&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${c}S</span><br>
                            <span class="fraction-denumerator">cos(${r})</span>
                        </div>
                    = ${v(t(c)/Math.cos(t(r)),`S`)}<br>`),c&&r&&!O&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>G</span><br>
                            <span class="fraction-denumerator">cos(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${c}S</span><br>
                            <span class="fraction-denumerator">cos(${r}&deg;)</span>
                        </div>
                    = ${v(t(c)/Math.cos(t(r)*Math.PI/180),`S`)}<br>`),l&&h&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${l}S</span><br>
                            <span class="fraction-denumerator">${h}</span>
                        </div>
                    = ${v(t(l)/t(h),`S`)}<br>`),l&&r&&O&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${l}S</span><br>
                            <span class="fraction-denumerator">sin(${r})</span>
                        </div>
                    = ${v(t(l)/Math.sin(t(r)),`S`)}<br>`),l&&r&&!O&&(e+=`
                        Scheinleitwert Y =
                        <div class ="fraction">
                            <span>B<sub>C</sub></span><br>
                            <span class="fraction-denumerator">sin(&phi;)</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span>${l}S</span><br>
                            <span class="fraction-denumerator">sin(${r}&deg;)</span>
                        </div>
                    = ${v(t(l)/Math.sin(t(r)*Math.PI/180),`S`)}<br>`)),d||p&&l&&(e+=`
                        Kapazit&auml;t C =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>2 &pi; &lowast; f</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${l}S</span><br>
                            <span>2 &pi; &lowast; ${p}Hz</span>
                        </div>
                    = ${v(t(l)/(2*Math.PI*t(p)),`F`)}<br>`),f||(c&&a&&(e+=`
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>G</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${a}A</span><br>
                            <span>${c}S</span>
                        </div>
                    = ${v(t(a)/t(c),`V`)}<br>`),f&&o&&(e+=`
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>B<sub>C</sub></span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${o}A</span><br>
                            <span>${l}S</span>
                        </div>
                    = ${v(t(o)/t(l),`V`)}<br>`),f&&s&&(e+=`
                        Spannung U =
                        <div class ="fraction">
                            <span class="fraction-numerator">I</span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${s}A</span><br>
                            <span>${u}S</span>
                        </div>
                    = ${v(t(s)/t(u),`V`)}<br>`)),p||p&&l&&(e+=`
                        Frequenz f =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>2 &pi; &lowast; C</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${l}S</span><br>
                            <span>2 &pi; &lowast; ${d}F</span>
                        </div>
                    = ${v(t(l)/(2*Math.PI*t(d)),`Hz`)}<br>`),m||(c&&u&&(result_Serie_AC+=`
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">G</span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${c}S</span><br>
                            <span>${u}S</span>
                        </div>
                    = ${v(t(c)/t(u),``)}<br>`),a&&s&&(result_Serie_AC+=`
                        Wirkfaktor cos(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>R</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${a}A</span><br>
                            <span>${s}A</span>
                        </div>
                    = ${v(t(a)/t(s),``)}<br>`)),h||(l&&u&&(result_Serie_AC+=`
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">B<sub>C</sub></span><br>
                            <span>Y</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${l}S</span><br>
                            <span>${u}S</span>
                        </div>
                    = ${v(t(l)/t(u),``)}<br>`),a&&s&&(result_Serie_AC+=`
                        Blindfaktor sin(&phi;) =
                        <div class ="fraction">
                            <span class="fraction-numerator">I<sub>C</sub></span><br>
                            <span>I</span>
                        </div>
                    = 
                        <div class ="fraction">
                            <span class="fraction-numerator">${o}A</span><br>
                            <span>${s}A</span>
                        </div>
                    = ${v(t(o)/t(s),``)}<br>`)),i(n.getElementById(`result_Parallel_AC`),e),R(t(a),t(o),t(s),`phasorCanvasCurrent`,`phasorLegendCurrent`),L(t(c),t(l),t(u),`phasorCanvasAdmittance`,`phasorLegendAdmittance`)}function j(){let e=``,r=e=>t(n.getElementById(e)?.value),a=n.getElementById(`modeSwitch`).checked,o=r(`I_RC`),s=r(`It_RC`),c=r(`tau_RC`),l=r(`R_RC`),u=r(`C_RC`),d=r(`U_RC`),f=r(`Ut_RC`),p=r(`t_RC`),m=(e,t)=>`<div class="fraction"><span>${e}</span><br><span class="fraction-denumerator">${t}</span></div>`;!c&&l&&u&&(e+=`
                    Zeitkonstante &#120649; = R &lowast; C = 
                    ${l}&Omega; &lowast; ${u}F = 
                    ${v(l*u,`s`)}<br>`),a?(!o&&c&&p&&s&&(e+=`
                        Strom I = -${m(`i(t)`,`e<sup>-${m(`t`,`&#120649;`)}</sup>`)} = 
                        -${m(`${s}A`,`e<sup>-${m(`${p}s`,`${c}s`)}</sup>`)} = 
                        ${v(-s/Math.exp(-p/c),`A`)}<br>`),!s&&o&&p&&c&&(e+=`
                        Strom i(t) = -I &lowast; e<sup>-${m(`t`,`&#120649;`)}</sup> = 
                        -${o}A &lowast; e<sup>-${m(`${p}s`,`${c}s`)}</sup> = 
                        ${v(-o*Math.exp(-p/c),`A`)}<br>`),!c&&o&&s&&p&&(e+=`
                        Zeitkonstante &#120649; = ${m(`t`,`ln(${m(`i(t)`,`I`)})`)} = 
                        ${m(`${p}s`,`ln(${m(`${s}A`,`${o}A`)})`)} = 
                        ${v(p/Math.log(s/o),`s`)}<br>`),!c&&d&&f&&p&&(e+=`
                        Zeitkonstante &#120649; = -${m(`t`,`ln(${m(`u(t)`,`U`)})`)} = 
                        -${m(`${p}s`,`ln(${m(`${f}V`,`${d}V`)})`)} = 
                        ${v(-p/Math.log(f/d),`s`)}<br>`),!d&&c&&p&&f&&(e+=`
                        Spannung U = ${m(`u(t)`,`e<sup>-${m(`t`,`&#120649;`)}</sup>`)} = 
                        ${m(`${f}V`,`e<sup>-${m(`${p}s`,`${c}s`)}</sup>`)} = 
                        ${v(f/Math.exp(-p/c),`V`)}<br>`),!f&&d&&p&&c&&(e+=`
                        Spannung u(t) = U &lowast; e<sup>-${m(`t`,`&#120649;`)}</sup> = 
                        ${d}V &lowast; e<sup>-${m(`${p}s`,`${c}s`)}</sup> = 
                        ${v(d*Math.exp(-p/c),`V`)}<br>`),!p&&c&&o&&s&&(e+=`
                        Zeit t = &#120649; &lowast; ln(${m(`i(t)`,`I`)}) = 
                        ${c}s &lowast; ln(${m(`${s}A`,`${o}A`)}) = 
                        ${v(c*Math.log(s/o),`s`)}<br>`),!p&&c&&d&&f&&(e+=`
                        Zeit t = -&#120649; &lowast; ln(${m(`u(t)`,`U`)}) = 
                        -${c}s &lowast; ln(${m(`${f}V`,`${d}V`)}) = 
                        ${v(-c*Math.log(f/d),`s`)}<br>`)):(!o&&c&&p&&s&&(e+=`
                        Strom I = ${m(`i(t)`,`e<sup>-${m(`t`,`&#120649;`)}</sup>`)} = 
                        ${m(`${s}A`,`e<sup>-${m(`${p}s`,`${c}s`)}</sup>`)} = 
                        ${v(s/Math.exp(-p/c),`A`)}<br>`),!s&&o&&p&&c&&(e+=`
                        Strom i(t) = I &lowast; e<sup>-${m(`t`,`&#120649;`)}</sup> = 
                        ${o}A &lowast; e<sup>-${m(`${p}s`,`${c}s`)}</sup> = 
                        ${v(o*Math.exp(-p/c),`A`)}<br>`),!c&&o&&s&&p&&(e+=`
                        Zeitkonstante &#120649; = -${m(`t`,`ln(${m(`i(t)`,`I`)})`)} = 
                        -${m(`${p}s`,`ln(${m(`${s}A`,`${o}A`)})`)} = 
                        ${v(-p/Math.log(s/o),`s`)}<br>`),!c&&d&&f&&p&&(e+=`
                        Zeitkonstante &#120649; = ${m(`-t`,`ln(1 - ${m(`u(t)`,`U`)})`)} = 
                        ${m(`-${p}s`,`ln(1 - ${m(`${f}V`,`${d}V`)})`)} = 
                        ${v(-p/Math.log(1-f/d),`s`)}<br>`),!d&&c&&p&&f&&(e+=`
                        Spannung U = ${m(`u(t)`,`1 - e<sup>-${m(`t`,`&#120649;`)}</sup>`)} = 
                        ${m(`${f}V`,`1 - e<sup>-${m(`${p}s`,`${c}s`)}</sup>`)} = 
                        ${v(f/(1-Math.exp(-p/c)),`V`)}<br>`),!f&&d&&p&&c&&(e+=`
                        Spannung u(t) = U &lowast; (1 - e<sup>-${m(`t`,`&#120649;`)}</sup>) = 
                        ${d}V &lowast; (1 - e<sup>-${m(`${p}s`,`${c}s`)}</sup>) = 
                        ${v(d*(1-Math.exp(-p/c)),`V`)}<br>`),!p&&c&&d&&f&&(e+=`
                        Zeit t = -&#120649; &lowast; ln(1 - ${m(`u(t)`,`U`)}) = 
                        -${c}s &lowast; ln(1 - ${m(`${f}V`,`${d}V`)}) = 
                        ${v(-c*Math.log(1-f/d),`s`)}<br>`),!p&&c&&o&&s&&(e+=`
                        Zeit t = -&#120649; &lowast; ln(${m(`i(t)`,`I`)}) = 
                        -${c}s &lowast; ln(${m(`${s}A`,`${o}A`)}) = 
                        ${v(-c*Math.log(s/o),`s`)}<br>`)),i(n.getElementById(`result_RC`),e),F()}let M=null,N=new Image;N.src=`/Pictures/favicon_no_BG.svg`;let P=!1;N.onload=function(){P=!0};function F(){let e=t(n.getElementById(`R_RC`).value)||1e3,r=t(n.getElementById(`C_RC`).value)||1e-6,i=t(n.getElementById(`U_RC`).value)||1,a=t(n.getElementById(`t_RC`).value),o=n.getElementById(`modeSwitch`).checked,s=e*r,c=5*s,l=i/e;K(`voltageCanvas`,e=>o?i*Math.exp(-e/s):i*(1-Math.exp(-e/s)),`Spannung (V)`,c,100,{color:`#0070C0`,tMarker:isFinite(a)?a:void 0,markerLabel:`u(t) = `}),K(`currentCanvas`,e=>o?-l*Math.exp(-e/s):l*Math.exp(-e/s),`Strom (A)`,c,100,{color:`#C00000`,tMarker:isFinite(a)?a:void 0,markerLabel:`i(t) = `})}function I(e,t){n.getElementById(e)}function L(e,t,r,a=`phasorCanvasAdmittance`,o=`phasorLegendAdmittance`,s=!1,c=[]){let l=n.getElementById(a),u=n.getElementById(o);if(!l||!u)return;let d=l.getContext(`2d`);d.clearRect(0,0,l.width,l.height),(!isFinite(e)||e<=0)&&c.push(`G`),(!isFinite(t)||t<=0)&&c.push(`Bc`),(!isFinite(r)||r<=0)&&c.push(`Y`),c.length>0&&(e=.2,t=.15,r=.25,s=!0);{if(!isFinite(e)||!isFinite(t)||!isFinite(r)||typeof e!=`number`||typeof t!=`number`||typeof r!=`number`||e<=0||t<=0||r<=0||Math.abs(r*r-(e*e+t*t))>1e-6*(e*e+t*t+r*r)){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Values do not form a valid triangle!`,l.width/2,l.height/2),d.restore(),i(u,``);return}let n=[e,t,r].map(Math.abs);if(Math.min(...n)/Math.max(...n)<.01){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Triangle is too sharp or too flat!`,l.width/2,l.height/2),d.restore(),i(u,``);return}let a=Math.atan2(t,e)*180/Math.PI;if(Math.abs(a)<1||Math.abs(a)>89){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Angle is too small or too large for a valid triangle!`,l.width/2,l.height/2),d.restore(),i(u,``);return}}let f=l.width-80-80,p=l.height-80-80,m=.95*Math.min(f/Math.abs(e),p/Math.abs(t)),h=[];d.save(),d.strokeStyle=`#ccc`,d.lineWidth=2,d.setLineDash([6,6]),d.beginPath(),d.moveTo(0,80),d.lineTo(l.width,80),d.stroke(),d.beginPath(),d.moveTo(80,0),d.lineTo(80,l.height),d.stroke(),d.setLineDash([]),d.font=`bold 20px Arial`,d.fillStyle=`#fff`,d.textAlign=`right`,d.fillText(`x`,l.width-10,70),d.textAlign=`left`,d.fillText(`y`,90,24),d.restore();let g=`#00C000`,_=`#00FF80`,v=`#008040`,y=`#FFFFFF`;$(d,80,80,80+e*m,80,g,M===`G`?6:3,M===`G`),h.push({type:`vector`,key:`G`,x1:80,y1:80,x2:80+e*m,y2:80}),$(d,80+e*m,80,80+e*m,80+t*m,_,M===`Bc`?6:3,M===`Bc`),h.push({type:`vector`,key:`Bc`,x1:80+e*m,y1:80,x2:80+e*m,y2:80+t*m}),$(d,80,80,80+e*m,80+t*m,v,M===`Y`?6:3,M===`Y`),h.push({type:`vector`,key:`Y`,x1:80,y1:80,x2:80+e*m,y2:80+t*m}),X(d,80+e*m,80,1,1);let b=Math.atan2(t,e);d.save(),d.strokeStyle=M===`phi`?y:`#fff`,d.lineWidth=M===`phi`?4:2,d.beginPath(),d.arc(80,80,36,0,b,!1),d.stroke(),h.push({type:`arc`,key:`phi`,cx:80,cy:80,r:36,angle:b}),d.restore(),d.fillStyle=`#fff`,d.beginPath(),d.arc(80,80,4,0,2*Math.PI),d.fill();let x=b*180/Math.PI,S=[{key:`G`,label:`G = ${Z(e,`S`)}`,color:g},{key:`Bc`,label:`B<sub>C</sub> = ${Z(t,`S`)}`,color:_},{key:`Y`,label:`Y = ${Z(r,`S`)}`,color:v},{key:`phi`,label:`&phi; = ${x.toFixed(2)}°`,color:y}];i(u,(s?`<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${c.join(`, `)}</b>
                    </i><br><br>`:``)+S.map(e=>`<div data-key="${e.key}" style="color:${e.color};transition:background 0.2s;">${e.label}</div>`).join(``)),l.onmousemove=function(n){let i=l.getBoundingClientRect(),d=l.width/i.width,f=l.height/i.height,p=(n.clientX-i.left)*d,m=(n.clientY-i.top)*f,g=null;for(let e of h)if(e.type===`vector`){if(J(p,m,e.x1,e.y1,e.x2,e.y2)<5){g=e.key;break}}else if(e.type===`arc`){let t=p-e.cx,n=m-e.cy,r=Math.sqrt(t*t+n*n),i=Math.atan2(n,t);i<0&&(i+=2*Math.PI);let a=e.angle;a<0&&(a+=2*Math.PI);let o=!1;if(o=0<=a?i>=0&&i<=a:i>=0||i<=a,Math.abs(r-e.r)<10&&o){g=e.key;break}}M=g,L(e,t,r,a,o,s,c);for(let e of u.children)e.dataset.key===g?(e.style.background=`#444`,e.style.fontWeight=`bold`):(e.style.background=``,e.style.fontWeight=``)},l.onmouseleave=function(){M=null,L(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=``,e.style.fontWeight=``};for(let n of u.children)n.onmouseenter=function(){M=this.dataset.key,L(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=e===this?`#444`:``,e.style.fontWeight=e===this?`bold`:``},n.onmouseleave=function(){M=null,L(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=``,e.style.fontWeight=``};let C=q(d,l);l._downloadHandlerAdded||=(l.addEventListener(`click`,function(e){let t=l.getBoundingClientRect(),n=l.width/t.width,r=l.height/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r;i>=C.x&&i<=C.x+C.size&&a>=C.y&&a<=C.y+C.size&&Q(l.id)}),!0),Y(d,l)}function R(e,t,r,a=`phasorCanvasCurrent`,o=`phasorLegendCurrent`,s=!1,c=[]){let l=n.getElementById(a),u=n.getElementById(o);if(!l||!u)return;let d=l.getContext(`2d`);d.clearRect(0,0,l.width,l.height),(!isFinite(e)||e<=0)&&c.push(`I_R`),(!isFinite(t)||t<=0)&&c.push(`I_C`),(!isFinite(r)||r<=0)&&c.push(`I`),c.length>0&&(e=2,t=1.5,r=2.5,s=!0);{if(!isFinite(e)||!isFinite(t)||!isFinite(r)||typeof e!=`number`||typeof t!=`number`||typeof r!=`number`||e<=0||t<=0||r<=0||Math.abs(r*r-(e*e+t*t))>1e-6*(e*e+t*t+r*r)){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Values do not form a valid triangle!`,l.width/2,l.height/2),d.restore(),i(u,``);return}let n=[e,t,r].map(Math.abs);if(Math.min(...n)/Math.max(...n)<.01){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Triangle is too sharp or too flat!`,l.width/2,l.height/2),d.restore(),i(u,``);return}let a=Math.atan2(t,e)*180/Math.PI;if(Math.abs(a)<1||Math.abs(a)>89){d.save(),d.fillStyle=`#e66`,d.font=`bold 22px sans-serif`,d.textAlign=`center`,d.fillText(`Angle is too small or too large for a valid triangle!`,l.width/2,l.height/2),d.restore(),i(u,``);return}}let f=l.width-80-80,p=l.height-80-80,m=.95*Math.min(f/Math.abs(e),p/Math.abs(t)),h=[];d.save(),d.strokeStyle=`#ccc`,d.lineWidth=2,d.setLineDash([6,6]),d.beginPath(),d.moveTo(0,80),d.lineTo(l.width,80),d.stroke(),d.beginPath(),d.moveTo(80,0),d.lineTo(80,l.height),d.stroke(),d.setLineDash([]),d.font=`bold 20px Arial`,d.fillStyle=`#fff`,d.textAlign=`right`,d.fillText(`x`,l.width-10,70),d.textAlign=`left`,d.fillText(`y`,90,24),d.restore();let g=`#0070C0`,_=`#00C080`,v=`#A0A0FF`,y=`#FFFFFF`;$(d,80,80,80+e*m,80,g,M===`Ir`?6:3,M===`Ir`),h.push({type:`vector`,key:`Ir`,x1:80,y1:80,x2:80+e*m,y2:80}),$(d,80+e*m,80,80+e*m,80+t*m,_,M===`Ic`?6:3,M===`Ic`),h.push({type:`vector`,key:`Ic`,x1:80+e*m,y1:80,x2:80+e*m,y2:80+t*m}),$(d,80,80,80+e*m,80+t*m,v,M===`I`?6:3,M===`I`),h.push({type:`vector`,key:`I`,x1:80,y1:80,x2:80+e*m,y2:80+t*m}),X(d,80+e*m,80,1,1);let b=Math.atan2(t,e);d.save(),d.strokeStyle=M===`phi`?y:`#fff`,d.lineWidth=M===`phi`?4:2,d.beginPath(),d.arc(80,80,36,0,b,!1),d.stroke(),h.push({type:`arc`,key:`phi`,cx:80,cy:80,r:36,angle:b}),d.restore(),d.fillStyle=`#fff`,d.beginPath(),d.arc(80,80,4,0,2*Math.PI),d.fill();let x=b*180/Math.PI,S=[{key:`Ir`,label:`I<sub>R</sub> = ${Z(e,`A`)}`,color:g},{key:`Ic`,label:`I<sub>C</sub> = ${Z(t,`A`)}`,color:_},{key:`I`,label:`I = ${Z(r,`A`)}`,color:v},{key:`phi`,label:`&phi; = ${x.toFixed(2)}°`,color:y}];i(u,(s?`<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${c.join(`, `)}</b>
                    </i><br><br>`:``)+S.map(e=>`<div data-key="${e.key}" style="color:${e.color};transition:background 0.2s;">${e.label}</div>`).join(``)),l.onmousemove=function(n){let i=l.getBoundingClientRect(),d=l.width/i.width,f=l.height/i.height,p=(n.clientX-i.left)*d,m=(n.clientY-i.top)*f,g=null;for(let e of h)if(e.type===`vector`){if(J(p,m,e.x1,e.y1,e.x2,e.y2)<5){g=e.key;break}}else if(e.type===`arc`){let t=p-e.cx,n=m-e.cy,r=Math.sqrt(t*t+n*n),i=Math.atan2(n,t);i<0&&(i+=2*Math.PI);let a=e.angle;a<0&&(a+=2*Math.PI);let o=!1;if(o=0<=a?i>=0&&i<=a:i>=0||i<=a,Math.abs(r-e.r)<10&&o){g=e.key;break}}M=g,R(e,t,r,a,o,s,c);for(let e of u.children)e.dataset.key===g?(e.style.background=`#444`,e.style.fontWeight=`bold`):(e.style.background=``,e.style.fontWeight=``)},l.onmouseleave=function(){M=null,R(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=``,e.style.fontWeight=``};for(let n of u.children)n.onmouseenter=function(){M=this.dataset.key,R(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=e===this?`#444`:``,e.style.fontWeight=e===this?`bold`:``},n.onmouseleave=function(){M=null,R(e,t,r,a,o,s,c);for(let e of u.children)e.style.background=``,e.style.fontWeight=``};let C=q(d,l);l._downloadHandlerAdded||=(l.addEventListener(`click`,function(e){let t=l.getBoundingClientRect(),n=l.width/t.width,r=l.height/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r;i>=C.x&&i<=C.x+C.size&&a>=C.y&&a<=C.y+C.size&&Q(l.id)}),!0),Y(d,l)}function z(e=`phasorCanvasImpedance`,r=`phasorLegendImpedance`){let a=n.getElementById(e),o=n.getElementById(r);if(!a||!o)return;let s=a.getContext(`2d`);s.clearRect(0,0,a.width,a.height);let c=t(n.getElementById(`R_AC`)?.value),l=t(n.getElementById(`C_AC`)?.value),u=t(n.getElementById(`f_AC`)?.value),d=null,f=null;n.getElementById(`Xc_AC`)&&(d=t(n.getElementById(`Xc_AC`).value)),n.getElementById(`Z_AC`)&&(f=t(n.getElementById(`Z_AC`).value)),!d&&l&&u&&(d=1/(2*Math.PI*u*l)),!f&&c&&d&&(f=Math.sqrt(c*c+d*d)),!c&&f&&d&&(c=Math.sqrt(f*f-d*d)),!d&&f&&c&&(d=Math.sqrt(f*f-c*c));let p=!1,m=[];(!isFinite(c)||c<=0)&&m.push(`R`),(!isFinite(d)||d<=0)&&m.push(`Xc`),(!isFinite(f)||f<=0)&&m.push(`Z`),m.length>0&&(c=4,d=3,f=5,p=!0);{if(!isFinite(c)||!isFinite(d)||!isFinite(f)||typeof c!=`number`||typeof d!=`number`||typeof f!=`number`||c<=0||d<=0||f<=0||Math.abs(f*f-(c*c+d*d))>1e-6*(c*c+d*d+f*f)){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Werte ergeben kein sinnvolles Dreieck!`,a.width/2,a.height/2),s.restore(),i(o,``);return}let e=[c,d,f].map(Math.abs);if(Math.min(...e)/Math.max(...e)<.01){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Dreieck ist zu spitz oder zu flach!`,a.width/2,a.height/2),s.restore(),i(o,``);return}let t=Math.atan2(d,c)*180/Math.PI;if(Math.abs(t)<1||Math.abs(t)>89){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Winkel ist zu klein oder zu groß für ein sinnvolles Dreieck!`,a.width/2,a.height/2),s.restore(),i(o,``);return}}let h=a.width-80-80,g=a.height-80-80,_=.9*Math.min(h/c,g/d),v=[];s.save(),s.strokeStyle=`#ccc`,s.lineWidth=2,s.setLineDash([6,6]),s.beginPath(),s.moveTo(0,80),s.lineTo(a.width,80),s.stroke(),s.beginPath(),s.moveTo(80,0),s.lineTo(80,a.height),s.stroke(),s.setLineDash([]),s.font=`bold 20px Arial`,s.fillStyle=`#fff`,s.textAlign=`right`,s.fillText(`x`,a.width-10,70),s.textAlign=`left`,s.fillText(`y`,90,24),s.restore();let y=`#FF9515`,b=`#ffb029`,x=`#e15e00`,S=`#FFFFFF`;$(s,80,80,80+c*_,80,y,M===`R`?6:3,M===`R`),v.push({type:`vector`,key:`R`,x1:80,y1:80,x2:80+c*_,y2:80}),$(s,80+c*_,80,80+c*_,80+d*_,b,M===`Xc`?6:3,M===`Xc`),v.push({type:`vector`,key:`Xc`,x1:80+c*_,y1:80,x2:80+c*_,y2:80+d*_}),$(s,80,80,80+c*_,80+d*_,x,M===`Z`?6:3,M===`Z`),v.push({type:`vector`,key:`Z`,x1:80,y1:80,x2:80+c*_,y2:80+d*_}),X(s,80+c*_,80,1,1);let C=Math.atan2(d,c);s.save(),s.strokeStyle=M===`phi`?S:`#fff`,s.lineWidth=M===`phi`?4:2,s.beginPath(),s.arc(80,80,36,0,C,!1),s.stroke(),v.push({type:`arc`,key:`phi`,cx:80,cy:80,r:36,angle:C}),s.restore(),s.fillStyle=`#fff`,s.beginPath(),s.arc(80,80,4,0,2*Math.PI),s.fill();let w=-C*180/Math.PI,T=[{key:`R`,label:`R = ${Z(c,`Ω`)}`,color:y},{key:`Xc`,label:`X<sub>C</sub> = ${Z(d,`Ω`)}`,color:b},{key:`Z`,label:`Z = ${Z(f,`Ω`)}`,color:x},{key:`phi`,label:`φ = ${w.toFixed(2)}°`,color:S}];i(o,(p?`<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${m.join(`, `)}</b>
                    </i><br><br>`:``)+T.map(e=>`<div data-key="${e.key}" style="color:${e.color};transition:background 0.2s;">${e.label}</div>`).join(``)),a.onmousemove=function(t){let n=a.getBoundingClientRect(),i=a.width/n.width,s=a.height/n.height,c=(t.clientX-n.left)*i,l=(t.clientY-n.top)*s,u=null;for(let e of v)if(e.type===`vector`){if(J(c,l,e.x1,e.y1,e.x2,e.y2)<5){u=e.key;break}}else if(e.type===`arc`){let t=c-e.cx,n=l-e.cy,r=Math.sqrt(t*t+n*n),i=Math.atan2(n,t);i<0&&(i+=2*Math.PI);let a=e.angle;a<0&&(a+=2*Math.PI);let o=!1;if(o=0<=a?i>=0&&i<=a:i>=0||i<=a,Math.abs(r-e.r)<10&&o){u=e.key;break}}M=u,z(e,r);for(let e of o.children)e.dataset.key===u?(e.style.background=`#444`,e.style.fontWeight=`bold`):(e.style.background=``,e.style.fontWeight=``)},a.onmouseleave=function(){M=null,z(e,r);for(let e of o.children)e.style.background=``,e.style.fontWeight=``};for(let t of o.children)t.onmouseenter=function(){M=this.dataset.key,z(e,r);for(let e of o.children)e.style.background=e===this?`#444`:``,e.style.fontWeight=e===this?`bold`:``},t.onmouseleave=function(){M=null,z(e,r);for(let e of o.children)e.style.background=``,e.style.fontWeight=``};let E=q(s,a);a._downloadHandlerAdded||=(a.addEventListener(`click`,function(e){let t=a.getBoundingClientRect(),n=a.width/t.width,r=a.height/t.height,i=(e.clientX-t.left)*n,o=(e.clientY-t.top)*r;i>=E.x&&i<=E.x+E.size&&o>=E.y&&o<=E.y+E.size&&Q(a.id)}),!0),Y(s,a)}function B(e=`phasorCanvasVoltage`,r=`phasorLegendVoltage`){let a=n.getElementById(e),o=n.getElementById(r);if(!a||!o)return;let s=a.getContext(`2d`);s.clearRect(0,0,a.width,a.height);let c=t(n.getElementById(`R_AC`)?.value),l=t(n.getElementById(`C_AC`)?.value),u=t(n.getElementById(`f_AC`)?.value),d=t(n.getElementById(`U_AC`)?.value),f=t(n.getElementById(`Xc_AC`)?.value),p=t(n.getElementById(`Uc_AC`)?.value),m=t(n.getElementById(`Ur_AC`)?.value);!f&&l&&u&&(f=1/(2*Math.PI*u*l)),!l&&f&&u&&(l=1/(2*Math.PI*u*f)),!u&&f&&l&&(u=1/(2*Math.PI*f*l));let h=null;if(d&&c&&f){let e=Math.sqrt(c*c+f*f);h=d/e}else p&&f?h=p/f:m&&c&&(h=m/c);!p&&h&&f&&(p=h*f),!m&&h&&c&&(m=h*c),!d&&m!==null&&p!==null&&(d=Math.sqrt(m*m+p*p));let g=null;c&&f&&(g=-Math.abs(Math.atan(f/c)));let _=!1,v=[];if((!isFinite(c)||c<=0)&&v.push(`R`),(!isFinite(f)||f<=0)&&v.push(`Xc`),(!isFinite(d)||d<=0)&&v.push(`U`),v.length>0){c=4,f=3,d=10;let e=Math.sqrt(c*c+f*f);h=d/e,m=h*c,p=h*f,g=-Math.atan(f/c),_=!0}{if(!isFinite(m)||!isFinite(p)||!isFinite(d)||typeof m!=`number`||typeof p!=`number`||typeof d!=`number`||Math.abs(m)<1e-9||Math.abs(p)<1e-9||Math.abs(d)<1e-9||Math.abs(d*d-(m*m+p*p))>1e-6*(m*m+p*p+d*d)){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Werte ergeben kein sinnvolles Dreieck!`,a.width/2,a.height/2),s.restore(),i(o,``);return}let e=[m,p,d].map(Math.abs);if(Math.min(...e)/Math.max(...e)<.01){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Dreieck ist zu spitz oder zu flach!`,a.width/2,a.height/2),s.restore(),i(o,``);return}let t=-Math.atan2(p,m)*180/Math.PI;if(Math.abs(t)<1||Math.abs(t)>89){s.save(),s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Winkel ist zu klein oder zu groß für ein sinnvolles Dreieck!`,a.width/2,a.height/2),s.restore(),i(o,``);return}}if(!isFinite(m)||!isFinite(p)||!isFinite(d)||Math.abs(m)<1e-9||Math.abs(p)<1e-9||Math.abs(d)<1e-9){s.fillStyle=`#e66`,s.font=`bold 22px sans-serif`,s.textAlign=`center`,s.fillText(`Werte ergeben kein sinnvolles Dreieck!`,a.width/2,a.height/2),i(o,``);return}let y=a.width-80-80,b=a.height-80-80,x=.95*Math.min(y/Math.abs(m),b/Math.abs(p)),S=[];s.save(),s.strokeStyle=`#ccc`,s.lineWidth=2,s.setLineDash([6,6]),s.beginPath(),s.moveTo(0,80),s.lineTo(a.width,80),s.stroke(),s.beginPath(),s.moveTo(80,0),s.lineTo(80,a.height),s.stroke(),s.setLineDash([]),s.font=`bold 20px Arial`,s.fillStyle=`#fff`,s.textAlign=`right`,s.fillText(`x`,a.width-10,70),s.textAlign=`left`,s.fillText(`y`,90,24),s.restore();let C=`#0070C0`,w=`#2020FF`,T=`#A0A0FF`,E=`#C00000`,D=`#FFFFFF`;X(s,80+m*x,80,1,1),$(s,80,55,80+m*x*1.25,55,E,M===`I`?5:2,M===`I`,!0),S.push({type:`vector`,key:`I`,x1:80,y1:55,x2:80+m*x*1.25,y2:55}),$(s,80,80,80+m*x,80,C,M===`UR`?6:3,M===`UR`),S.push({type:`vector`,key:`UR`,x1:80,y1:80,x2:80+m*x,y2:80}),$(s,80+m*x,80,80+m*x,80+p*x,w,M===`UC`?6:3,M===`UC`),S.push({type:`vector`,key:`UC`,x1:80+m*x,y1:80,x2:80+m*x,y2:80+p*x}),$(s,80,80,80+m*x,80+p*x,T,M===`U`?6:3,M===`U`),S.push({type:`vector`,key:`U`,x1:80,y1:80,x2:80+m*x,y2:80+p*x}),s.save(),s.strokeStyle=M===`phi`?D:`#fff`,s.lineWidth=M===`phi`?4:2,s.beginPath();let O=Math.atan2(p,m);s.arc(80,80,36,0,O,O<0),s.stroke(),S.push({type:`arc`,key:`phi`,cx:80,cy:80,r:36,angle:O}),s.restore(),s.fillStyle=`#fff`,s.beginPath(),s.arc(80,80,4,0,2*Math.PI),s.fill();let k=g*180/Math.PI,A=[{key:`I`,label:`I = ${Z(h,`A`)}`,color:E},{key:`U`,label:`U = ${Z(d,`V`)}`,color:T},{key:`UR`,label:`U<sub>R</sub> = ${Z(m,`V`)}`,color:C},{key:`UC`,label:`U<sub>C</sub> = ${Z(p,`V`)}`,color:w},{key:`phi`,label:`&phi; = ${k.toFixed(2)}°`,color:D}];i(o,(_?`<i style='color:#aaa'>
                        Beispiel-Dreieck:<br>
                        Bitte oben Werte eingeben und auf <b>Berechnen</b>!<br>
                        Fehlend/ungültig: <b>${v.join(`, `)}</b>
                    </i><br><br>`:``)+A.map(e=>`<div data-key="${e.key}" style="color:${e.color};transition:background 0.2s;">${e.label}</div>`).join(``)),a.onmousemove=function(t){let n=a.getBoundingClientRect(),i=a.width/n.width,s=a.height/n.height,c=(t.clientX-n.left)*i,l=(t.clientY-n.top)*s,u=null;for(let e of S)if(e.type===`vector`){if(J(c,l,e.x1,e.y1,e.x2,e.y2)<5){u=e.key;break}}else if(e.type===`arc`){let t=c-e.cx,n=l-e.cy,r=Math.sqrt(t*t+n*n),i=Math.atan2(n,t);i<0&&(i+=2*Math.PI);let a=e.angle;a<0&&(a+=2*Math.PI);let o=!1;if(o=0<=a?i>=0&&i<=a:i>=0||i<=a,Math.abs(r-e.r)<10&&o){u=e.key;break}}M=u,B(e,r);for(let e of o.children)e.dataset.key===u?(e.style.background=`#444`,e.style.fontWeight=`bold`):(e.style.background=``,e.style.fontWeight=``)},a.onmouseleave=function(){M=null,B(e,r);for(let e of o.children)e.style.background=``,e.style.fontWeight=``};for(let t of o.children)t.onmouseenter=function(){M=this.dataset.key,B(e,r);for(let e of o.children)e.style.background=e===this?`#444`:``,e.style.fontWeight=e===this?`bold`:``},t.onmouseleave=function(){M=null,B(e,r);for(let e of o.children)e.style.background=``,e.style.fontWeight=``};let j=q(s,a);a._downloadHandlerAdded||=(a.addEventListener(`click`,function(e){let t=a.getBoundingClientRect(),n=a.width/t.width,r=a.height/t.height,i=(e.clientX-t.left)*n,o=(e.clientY-t.top)*r;i>=j.x&&i<=j.x+j.size&&o>=j.y&&o<=j.y+j.size&&Q(a.id)}),!0),Y(s,a)}function V(){n.getElementById(`R_AC`).value=``,n.getElementById(`C_AC`).value=``,n.getElementById(`U_AC`).value=``,n.getElementById(`f_AC`).value=``,z(`phasorCanvasImpedance`,`phasorLegendImpedance`),B(`phasorCanvasVoltage`,`phasorLegendVoltage`)}function H(){n.getElementById(`G_ACp`).value=``,n.getElementById(`Bc_ACp`).value=``,n.getElementById(`Y_ACp`).value=``,n.getElementById(`Ir_ACp`).value=``,n.getElementById(`Ic_ACp`).value=``,n.getElementById(`I_ACp`).value=``,n.getElementById(`U_ACp`).value=``,n.getElementById(`f_ACp`).value=``,n.getElementById(`C_ACp`).value=``,L(.3,.4,.5,`phasorCanvasAdmittance`,`phasorLegendAdmittance`,!0,[`G`,`Bc`,`Y`]),R(3,4,5,`phasorCanvasCurrent`,`phasorLegendCurrent`,!0,[`Ir`,`Ic`,`I`])}function U(e,t,r,i,a,o,s){let c=n.getElementById(e);if(!c)return;let l=c.getContext(`2d`),u=c.width-160,d=c.height-160,f=80+t/i*u,p=c.height-80-(r-a)/(o-a)*d;l.save(),l.fillStyle=s,l.beginPath(),l.arc(f,p,6,0,2*Math.PI),l.fill(),l.restore()}function W(e){for(let{f:t,p:n}of[{f:1e9,p:`G`},{f:1e6,p:`M`},{f:1e3,p:`k`},{f:1,p:``},{f:.001,p:`m`},{f:1e-6,p:`μ`},{f:1e-9,p:`n`}])if(e>=t)return{factor:t,prefix:n};return{factor:1,prefix:``}}function G(e,t,n,r){return(e/t).toFixed(2)+` `+n+r}function K(e,t,r,i,a,o={}){let s=n.getElementById(e);if(!s)return;let c=s.getContext(`2d`);c.clearRect(0,0,s.width,s.height);let l=s.width-90-60,u=s.height-40-70;if(!i||i<=0||typeof t!=`function`){c.fillStyle=`#e66`,c.font=`bold 24px sans-serif`,c.textAlign=`center`,c.fillText(`Ungültige Eingaben - keine Kurve darstellbar!`,s.width/2,s.height/2),c.font=`16px sans-serif`,c.fillStyle=`#fff`,c.fillText(`Bitte überprüfe R, C, U und Modus.`,s.width/2,s.height/2+30);return}let d=1/0,f=-1/0,p=[];for(let e=0;e<=a;e++){let n=e/a*i,r=t(n);p.push({t:n,value:r}),isFinite(r)&&(r<d&&(d=r),r>f&&(f=r))}d=Math.min(d,0),f=Math.max(f,0),Math.abs(f-d)<1e-12&&(f+=1,--d),typeof o.minY==`number`&&(d=o.minY),typeof o.maxY==`number`&&(f=o.maxY);let{factor:m,prefix:h}=W(Math.max(Math.abs(d),Math.abs(f)));c.save(),c.strokeStyle=`rgba(255,255,255,0.10)`,c.lineWidth=1;for(let e=0;e<=10;e++){let t=90+e/10*l;c.beginPath(),c.moveTo(t,40),c.lineTo(t,s.height-70),c.stroke();let n=s.height-70-e/10*u;c.beginPath(),c.moveTo(90,n),c.lineTo(s.width-60,n),c.stroke()}c.restore(),c.strokeStyle=`#aaa`,c.lineWidth=2,c.beginPath(),c.moveTo(90,40),c.lineTo(90,s.height-70),c.lineTo(s.width-60,s.height-70),c.stroke(),c.font=`bold 22px Arial`,c.fillStyle=`#fff`,c.textAlign=`left`,c.fillText(r,30,22);let g=`s`,_=1;i<.001?(g=`μs`,_=1e6):i<1&&(g=`ms`,_=1e3),c.font=`bold 22px Arial`,c.textAlign=`center`,c.fillText(`Zeit (${g})`,90+l/2,s.height-70+60),c.font=`16px Arial`,c.textAlign=`center`;for(let e=0;e<=5;e++){let t=90+e/5*l,n=e*i/5*_,r;(g===`s`||g===`ms`||g===`μs`)&&(r=n.toFixed(2).replace(/\.00$/,``)),c.fillStyle=`#fff`,c.fillText(r,t,s.height-70+28)}c.textAlign=`right`;for(let e=0;e<=5;e++){let t=d+e/5*(f-d),n=s.height-70-(t-d)/(f-d)*u;c.fillStyle=`#fff`,c.fillText(G(t,m,h,r.includes(`A`)?`A`:`V`),72,n+7)}c.beginPath();for(let e=0;e<p.length;e++){let{t,value:n}=p[e],r=90+t/i*l,a=s.height-70-(n-d)/(f-d)*u;e===0?c.moveTo(r,a):c.lineTo(r,a)}if(c.strokeStyle=o.color||`#0070C0`,c.lineWidth=2.5,c.shadowColor=o.color||`#0070C0`,c.shadowBlur=4,c.stroke(),c.shadowBlur=0,typeof o.tMarker==`number`&&o.tMarker>=0&&o.tMarker<=i){let e=o.tMarker,n=t(e),a=90+e/i*l,p=s.height-70-(n-d)/(f-d)*u;c.save(),c.strokeStyle=`#ff69b4`,c.setLineDash([6,6]),c.lineWidth=2,c.beginPath(),c.moveTo(a,s.height-70),c.lineTo(a,p),c.stroke(),c.beginPath(),c.moveTo(90,p),c.lineTo(a,p),c.stroke(),c.setLineDash([]),c.fillStyle=`#ff69b4`,c.beginPath(),c.arc(a,p,10,0,2*Math.PI),c.fill(),c.font=`bold 24px sans-serif`,c.textAlign=`left`,c.fillStyle=`#ffffff`,c.fillText((o.markerLabel||``)+G(n,m,h,r.includes(`A`)?`A`:`V`),a+22,p-16),c.restore()}let v=new Image;v.src=`/Pictures/favicon_no_BG.svg`,v.onload=function(){c.save(),c.globalAlpha=.15,c.drawImage(v,s.width-60-120,50,120,120),c.globalAlpha=1,c.restore()}}function q(e,t,n=32){let r=t.width-n-12,i=t.height-n-12;return e.save(),e.globalAlpha=.7,e.strokeStyle=`#fff`,e.lineWidth=2,e.lineJoin=`round`,e.beginPath(),e.moveTo(r+n/2,i+8),e.lineTo(r+n/2,i+n-10),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2-8,i+n-18),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2+8,i+n-18),e.stroke(),e.beginPath(),e.rect(r+8,i+n-10,n-16,8),e.stroke(),e.restore(),{x:r,y:i,size:n}}function J(e,t,n,r,i,a){let o=i-n,s=a-r;if(o===0&&s===0)return Math.hypot(e-n,t-r);let c=Math.max(0,Math.min(1,((e-n)*o+(t-r)*s)/(o*o+s*s))),l=n+c*o,u=r+c*s;return Math.hypot(e-l,t-u)}function ee(e,t,n,r,i,a=`#fff`,o=`bold 20px Arial`,s=`14px Arial`){e.save(),e.fillStyle=a,e.font=o,e.textAlign=`center`,e.fillText(t,r,i);let c=e.measureText(t).width;e.font=s,e.fillText(n,r+c/2+6,i+8),e.restore()}function Y(e,t,n=70,r=10){P&&(e.save(),e.globalAlpha=.15,e.drawImage(N,t.width-n-r,r,n,n),e.globalAlpha=1,e.restore())}function X(e,t,n,r,i){e.save(),e.strokeStyle=`rgba(255,255,255,0.7)`,e.lineWidth=2,e.beginPath(),e.moveTo(t,n),e.lineTo(t+r*10,n),e.lineTo(t+r*10,n+i*10),e.lineTo(t,n+i*10),e.stroke(),e.restore()}function Z(e,t){let n=Math.abs(e);if(n===0)return`0 `+t;for(let{f:r,p:i}of[{f:1e9,p:`G`},{f:1e6,p:`M`},{f:1e3,p:`k`},{f:1,p:``},{f:.001,p:`m`},{f:1e-6,p:`&mu;`},{f:1e-9,p:`n`}])if(n>=r)return(e/r).toFixed(2)+` `+i+t;return e.toExponential(2)+` `+t}function Q(e){let t=n.getElementById(e);if(!t)return;let r=n.createElement(`a`);r.download=e+`.png`,r.href=t.toDataURL(`image/png`),r.click()}function $(e,t,n,r,i,a,o=3,s=!1,c=!1){e.save(),e.strokeStyle=a,e.fillStyle=a,e.lineWidth=o,c&&e.setLineDash([8,6]),s&&(e.shadowColor=a,e.shadowBlur=16),e.beginPath(),e.moveTo(t,n),e.lineTo(r,i),e.stroke(),e.setLineDash([]),e.shadowBlur=0;let l=Math.atan2(i-n,r-t);e.beginPath(),e.moveTo(r,i),e.lineTo(r-14*Math.cos(l-Math.PI/7),i-14*Math.sin(l-Math.PI/7)),e.lineTo(r-14*Math.cos(l+Math.PI/7),i-14*Math.sin(l+Math.PI/7)),e.lineTo(r,i),e.fill(),e.restore()}function te(e){e.parentElement.classList.toggle(`open`)}return{handlers:{calculateCapacitorParameters:x,resetInputsCapacitorParameters:S,toggleSelection:w,toggleRAD:E,calculateSerieAC:D,toggleRADp:k,calculateParallelAC:A,calculateRC:j,generate_e_curve_from_RCinputs:F,showCanvasWarning:I,drawLeitwertdreieckParallel:L,drawStromdreieckParallel:R,drawWiderstandsdreieckSerie:z,drawSpannungsdreieckSerie:B,showExampleSerieTriangle:V,showExampleParallelTriangle:H,drawMarkerOnCurve:U,getBestSIPrefix:W,formatWithSIPrefix:G,drawCurveDynamic:K,drawDownloadIcon:q,pointToSegment:J,drawLabelWithSubscript:ee,drawWatermark:Y,drawRightAngleMarker:X,formatSI:Z,exportCanvasAsPNG:Q,drawArrow:$,toggleDropdown:te,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        /***********/
        .img-button {
            position: relative;
            width: 100px; /* Adjust as needed */
            height: 100px; /* Adjust as needed */
            border: 2px solid transparent; /* Initially transparent */
            padding: 0;
            margin: 10px;
            background-color: transparent;
            cursor: pointer;
        }
        
        .img-button img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .img-button:hover {
            border-color: grey; /* grey border for hovered button */
        }
        
        .img-button.selected {
            border-color: white; /* White border for selected button */
        }
        
        .img-button span {
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
        /***********/

        .RAD-Button 
        {
            background: none;
            /*border: 1px solid var(--Winkel);
            border-radius: 3px;
            /*margin-top: 10px;
            min-width: 50px;
            height: 29px;*/
            color: inherit;
            padding: 0;
            cursor: pointer;
            flex: 3;
            text-align: left;
        }

        .RAD-Button:hover{
            text-decoration: underline;
        }
    
} }`}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Kondensatoren`}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Kondensator berechnungen`,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{id:`CapacitorParameter`,children:[(0,s.jsx)(`button`,{type:`button`,id:`control-1`,"data-action":`resetInputsCapacitorParameters`,onClick:t=>{e.current?.handlers.resetInputsCapacitorParameters?.()},className:`Button_Berechnen`,children:`Eingaben löschen`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Strom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Strom I`,id:`I`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kraft F`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kraft)`},type:`text`,"aria-label":`Kraft F`,id:`F`}),(0,s.jsx)(`label`,{children:`N [Newton]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Feldstärke E`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Feldstaerke)`},type:`text`,"aria-label":`Feldstärke E`,id:`E`}),(0,s.jsx)(`label`,{children:`V/m [Volt / meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Dielektrizitätszahl ε`,(0,s.jsx)(`sub`,{children:`r`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Dielektrizitaetszahl)`},type:`text`,"aria-label":`Dielektrizitätszahl εr`,id:`er`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Fläche A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Fläche A`,id:`A`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Plattendurchmesser D`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Plattendurchmesser D`,id:`d`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Elektronenabstand s`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Elektronenabstand)`},type:`text`,"aria-label":`Elektronenabstand s`,id:`s`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Energie W`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Energie)`},type:`text`,"aria-label":`Energie W`,id:`W`}),(0,s.jsx)(`label`,{children:`J [Joule]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Landung Q`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Ladung)`},type:`text`,"aria-label":`Landung Q`,id:`Q`}),(0,s.jsx)(`label`,{children:`C [Coulomb]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeit`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeit`,id:`t`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsx)(`button`,{type:`button`,id:`control-2`,"data-action":`calculateCapacitorParameters`,onClick:t=>{e.current?.handlers.calculateCapacitorParameters?.()},className:`Button_Berechnen`,children:`Berechnen`}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-3`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Kondensator an Wechselstrom `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-4`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Serie`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`Serie`),e.current?.handlers.showExampleSerieTriangle?.()},children:[(0,s.jsx)(`img`,{src:`/Pictures/Serie_RC.PNG`,alt:`Sinus`}),(0,s.jsx)(`span`,{children:`Serie`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-5`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Parallel`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`Parallel`),e.current?.handlers.showExampleParallelTriangle?.()},children:[(0,s.jsx)(`img`,{src:`/Pictures/Parallel_RC.png`,alt:`Rechteck`}),(0,s.jsx)(`span`,{children:`Parallel`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`Serie`,className:`input-numbers`,children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),`
                                Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`phi_AC`}),(0,s.jsx)(`label`,{children:(0,s.jsx)(`button`,{type:`button`,id:`Rad-Button`,className:`RAD-Button`,"data-action":`toggleRAD`,onClick:t=>{e.current?.handlers.toggleRAD?.()},children:`360°`})})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Gesamtstrom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Gesamtstrom I`,id:`I_AC`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkwiderstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Wirkwiderstand R`,id:`R_AC`}),(0,s.jsx)(`label`,{children:`Ω[Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindwiderstand X`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Blindwiderstand XC`,id:`Xc_AC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Scheinwiderstand/Impedanz Z`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Scheinwiderstand/Impedanz Z`,id:`Z_AC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C_AC`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkleistung P`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Wirkleistung P`,id:`P_AC`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindleistung Q`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Blindleistung QC`,id:`Qc_AC`}),(0,s.jsx)(`label`,{children:`var`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Scheinleistung S`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Scheinleistung S`,id:`S_AC`}),(0,s.jsx)(`label`,{children:`VA [Volt × Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Wirkspannung U`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Wirkspannung UR`,id:`Ur_AC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindspannung U`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Blindspannung UC`,id:`Uc_AC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Gesamtspannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Gesamtspannung U`,id:`U_AC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f_AC`}),(0,s.jsx)(`label`,{children:`Hz [Herz]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkfaktor cos(φ)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Wirkfaktor cos(φ)`,id:`cosphi_AC`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Blindfaktor sin(φ)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Blindfaktor sin(φ)`,id:`sinphi_AC`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateSerieAC`,onClick:t=>{e.current?.handlers.calculateSerieAC?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Serie_AC`,"aria-live":`polite`}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,flexWrap:`wrap`,alignItems:`flex-start`,justifyContent:`center`,gap:`40px`,margin:`40px auto 0 auto`,maxWidth:`900px`},children:[(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,flex:`1 1 300px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Widerstandsdreieck`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,borderRadius:`16px`,display:`block`,maxWidth:`100%`},id:`phasorCanvasImpedance`,width:`500`,height:`400`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,flex:`1 1 260px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Legende`}),(0,s.jsx)(`div`,{style:{background:`#222`,color:`#fff`,borderRadius:`16px`,boxShadow:`0 2px 8px #0003`,padding:`18px 24px`,minWidth:`220px`,maxWidth:`260px`,fontFamily:`monospace`,fontSize:`16px`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,justifyContent:`flex-start`,width:`100%`},id:`phasorLegendImpedance`})]})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,flexWrap:`wrap`,alignItems:`flex-start`,justifyContent:`center`,gap:`40px`,margin:`40px auto 0 auto`,maxWidth:`900px`},children:[(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,flex:`1 1 300px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Spannungsdreieck`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,borderRadius:`16px`,display:`block`,maxWidth:`100%`},id:`phasorCanvasVoltage`,width:`500`,height:`400`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,flex:`1 1 260px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Legende`}),(0,s.jsx)(`div`,{style:{background:`#222`,color:`#fff`,borderRadius:`16px`,boxShadow:`0 2px 8px #0003`,padding:`18px 24px`,minWidth:`220px`,maxWidth:`260px`,fontFamily:`monospace`,fontSize:`16px`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,justifyContent:`flex-start`,width:`100%`},id:`phasorLegendVoltage`})]})]})]}),(0,s.jsx)(`div`,{style:{height:`40px`}}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`Parallel`,className:`input-numbers`,children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),`
                                Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Winkel φ`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Winkel φ`,id:`phi_ACp`}),(0,s.jsx)(`label`,{children:(0,s.jsx)(`button`,{type:`button`,id:`Rad-Buttonp`,className:`RAD-Button`,"data-action":`toggleRADp`,onClick:t=>{e.current?.handlers.toggleRADp?.()},children:`360°`})})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Wirkstrom I`,(0,s.jsx)(`sub`,{children:`R`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Wirkstrom IR`,id:`Ir_ACp`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindstrom I`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Blindstrom IC`,id:`Ic_ACp`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Gesamtstrom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Gesamtstrom I`,id:`I_ACp`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkleitwert G`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Wirkleitwert G`,id:`G_ACp`}),(0,s.jsx)(`label`,{children:`S [Siemens]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindleitwert B`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Blindleitwert BC`,id:`Bc_ACp`}),(0,s.jsx)(`label`,{children:`S [Siemens]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Scheinleitwert/Admitanz Y`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Scheinleitwert/Admitanz Y`,id:`Y_ACp`}),(0,s.jsx)(`label`,{children:`S [Siemens]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C_ACp`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkleistung P`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Wirkleistung P`,id:`P_ACp`}),(0,s.jsx)(`label`,{children:`W [Watt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Blindleistung Q`,(0,s.jsx)(`sub`,{children:`C`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Blindleistung QC`,id:`Q_ACp`}),(0,s.jsx)(`label`,{children:`var`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Scheinleistung S`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Leistung)`},type:`text`,"aria-label":`Scheinleistung S`,id:`S_ACp`}),(0,s.jsx)(`label`,{children:`VA [Volt × Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Spannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Spannung U`,id:`U_ACp`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f_ACp`}),(0,s.jsx)(`label`,{children:`Hz [Herz]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Wirkfaktor cos(φ)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Wirkfaktor cos(φ)`,id:`cosphi_ACp`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Blindfaktor sin(φ)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Daempfungsfaktor)`},type:`text`,"aria-label":`Blindfaktor sin(φ)`,id:`sinphi_ACp`}),(0,s.jsx)(`label`,{children:`1`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateParallelAC`,onClick:t=>{e.current?.handlers.calculateParallelAC?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Parallel_AC`,"aria-live":`polite`}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,flex:`1 1 300px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Stromdreieck`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,borderRadius:`16px`,display:`block`,maxWidth:`100%`},id:`phasorCanvasCurrent`,width:`500`,height:`400`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,flex:`1 1 260px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Legende`}),(0,s.jsx)(`div`,{style:{background:`#222`,color:`#fff`,borderRadius:`16px`,boxShadow:`0 2px 8px #0003`,padding:`18px 24px`,minWidth:`220px`,maxWidth:`260px`,fontFamily:`monospace`,fontSize:`16px`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,justifyContent:`flex-start`,width:`100%`},id:`phasorLegendCurrent`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,flex:`1 1 300px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Leitwertdreieck`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,borderRadius:`16px`,display:`block`,maxWidth:`100%`},id:`phasorCanvasAdmittance`,width:`500`,height:`400`})]}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-start`,flex:`1 1 260px`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,textAlign:`center`,marginBottom:`10px`},children:`Legende`}),(0,s.jsx)(`div`,{style:{background:`#222`,color:`#fff`,borderRadius:`16px`,boxShadow:`0 2px 8px #0003`,padding:`18px 24px`,minWidth:`220px`,maxWidth:`260px`,fontFamily:`monospace`,fontSize:`16px`,boxSizing:`border-box`,display:`flex`,flexDirection:`column`,justifyContent:`flex-start`,width:`100%`},id:`phasorLegendAdmittance`})]})]})]})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-6`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        RC-Glied `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`label`,{className:`switch`,children:[(0,s.jsx)(`input`,{type:`checkbox`,"aria-label":`Entladen`,id:`modeSwitch`}),(0,s.jsx)(`span`,{className:`slider round`})]}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{id:`modeLabel`,children:`Laden`})]}),(0,s.jsx)(`div`,{id:`circuitDiagram`,children:(0,s.jsx)(`img`,{style:{width:`500px`,height:`auto`},id:`circuitImage`,src:`/Pictures/RC_Charge.png`,alt:`Schaltbild RC Glied`})}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. C = 100nF → Eingabe: 100n (nicht 100nF)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Speisungsstrom I`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Speisungsstrom I`,id:`I_RC`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Momentanstrom i(t)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Strom)`},type:`text`,"aria-label":`Momentanstrom i(t)`,id:`It_RC`}),(0,s.jsx)(`label`,{children:`A [Ampere]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeitkonstante 𝝉`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeitkonstante)`},type:`text`,"aria-label":`Zeitkonstante 𝝉`,id:`tau_RC`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Widerstand R`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Widerstand)`},type:`text`,"aria-label":`Widerstand R`,id:`R_RC`}),(0,s.jsx)(`label`,{children:`Ω [Ohm]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Kapazität C`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Kapazitaet)`},type:`text`,"aria-label":`Kapazität C`,id:`C_RC`}),(0,s.jsx)(`label`,{children:`F [Farad]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Speisespannung U`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Speisespannung U`,id:`U_RC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Momentanspannung u(t)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Momentanspannung u(t)`,id:`Ut_RC`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Zeit t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Zeit t`,id:`t_RC`}),(0,s.jsx)(`label`,{children:`s [sekunden]`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateRC`,onClick:t=>{e.current?.handlers.calculateRC?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_RC`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{width:`100%`,maxWidth:`1400px`,margin:`40px auto 0 auto`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`0 2vw 60px 2vw`,boxSizing:`border-box`},children:[(0,s.jsx)(`h3`,{style:{color:`#fff`,marginBottom:`8px`,textAlign:`center`},children:`Spannungskurve`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`20px auto`,borderRadius:`5px`,maxWidth:`100%`},id:`voltageCanvas`,width:`1300`,height:`400`}),(0,s.jsx)(`h3`,{style:{color:`#fff`,margin:`40px 0 8px 0`,textAlign:`center`},children:`Stromkurve`}),(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`20px auto`,borderRadius:`5px`,maxWidth:`100%`},id:`currentCanvas`,width:`1300`,height:`400`})]})]})]})]})]})}var l=c;export{l as component};