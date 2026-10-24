import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-B_jRmEqB.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w=null,T=new Image;T.src=`/Pictures/favicon_no_BG.svg`;let E=!1;T.onload=function(){E=!0};function D(e,t){let r=n.getElementById(t);w===e?(e.classList.remove(`selected`),r.style.display=`none`,w=null):(w&&w.classList.remove(`selected`),e.classList.add(`selected`),w=e,t===`Sinus`?(n.getElementById(`Sinus`).style.display=`block`,n.getElementById(`Rechteck`).style.display=`none`,n.getElementById(`Dreieck`).style.display=`none`,n.getElementById(`PWM`).style.display=`none`):t===`Rechteck`?(n.getElementById(`Sinus`).style.display=`none`,n.getElementById(`Rechteck`).style.display=`block`,n.getElementById(`Dreieck`).style.display=`none`,n.getElementById(`PWM`).style.display=`none`):t===`Dreieck`?(n.getElementById(`Sinus`).style.display=`none`,n.getElementById(`Rechteck`).style.display=`none`,n.getElementById(`Dreieck`).style.display=`block`,n.getElementById(`PWM`).style.display=`none`):t===`PWM`&&(n.getElementById(`Sinus`).style.display=`none`,n.getElementById(`Rechteck`).style.display=`none`,n.getElementById(`Dreieck`).style.display=`none`,n.getElementById(`PWM`).style.display=`block`))}let O=!0;function k(){let e=n.getElementById(`Rad-Button`);O?(i(e,`360&deg;`),O=!1):(i(e,`2&pi;`),O=!0)}let A=!0;function j(){let e=n.getElementById(`Duty-Button`);A?(i(e,`1`),A=!1):(i(e,`%`),A=!0)}function M(e,t,n=32){let r=t.width-n-12,i=t.height-n-12;return e.save(),e.globalAlpha=.7,e.strokeStyle=`#fff`,e.lineWidth=2,e.lineJoin=`round`,e.beginPath(),e.moveTo(r+n/2,i+8),e.lineTo(r+n/2,i+n-10),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2-8,i+n-18),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2+8,i+n-18),e.stroke(),e.beginPath(),e.rect(r+8,i+n-10,n-16,8),e.stroke(),e.restore(),{x:r,y:i,size:n}}function N(){let e=``,r=t(n.getElementById(`ut-Sinus`).value),a=t(n.getElementById(`up-Sinus`).value),o=t(n.getElementById(`upp-Sinus`).value),c=t(n.getElementById(`Ueff-Sinus`).value),l=t(n.getElementById(`f-Sinus`).value),u=t(n.getElementById(`t-Sinus`).value),d=t(n.getElementById(`T-Sinus`).value),f=t(n.getElementById(`phi-Sinus`).value),p=f;if(f&&!O&&(p=Math.PI/180*f),!r&&a&&l&&u){let t=a*Math.sin(2*Math.PI*l*u+(p||0));e+=`
                        \\[
                        u(t) = \\hat{u} \\cdot \\sin(2\\pi f t + \\varphi) \\\\
                        = ${a}\\,\\mathrm{V} \\cdot \\sin(2\\pi \\cdot ${l}\\,\\mathrm{Hz} \\cdot ${u}\\,\\mathrm{s} + ${z(p,3)}\\,\\mathrm{rad}) \\\\
                        = ${z(t,3)}\\,\\mathrm{V}
                        \\]
                    `}a||(r&&l&&u?(a=r/Math.sin(2*Math.PI*l*u+(p||0)),e+=`
                        \\[
                        \\hat{u} = \\frac{u(t)}{\\sin(2\\pi f t + \\varphi)} \\\\
                        = \\frac{${z(r,3)}\\,\\mathrm{V}}{\\sin(2\\pi \\cdot ${l}\\,\\mathrm{Hz} \\cdot ${u}\\,\\mathrm{s} + ${z(p,3)}\\,\\mathrm{rad})} \\\\
                        = ${z(a,3)}\\,\\mathrm{V}
                        \\]
                    `):o?(a=o/2,e+=`
                        \\[
                        \\hat{u} = \\frac{u_{pp}}{2} \\\\
                        = \\frac{${z(o,3)}\\,\\mathrm{V}}{2} \\\\
                        = ${z(a,3)}\\,\\mathrm{V}
                        \\]
                    `):c&&(a=c*Math.sqrt(2),e+=`
                        \\[
                        \\hat{u} = U_{\\mathrm{eff}} \\cdot \\sqrt{2} \\\\
                        = ${z(c,3)}\\,\\mathrm{V} \\cdot \\sqrt{2} \\\\
                        = ${z(a,3)}\\,\\mathrm{V}
                        \\]
                    `));let m=o;o||(a?(m=a*2,e+=`
                        \\[
                        u_{pp} = \\hat{u} \\cdot 2 \\\\
                        = ${z(a,3)}\\,\\mathrm{V} \\cdot 2 \\\\
                        = ${z(m,3)}\\,\\mathrm{V}
                        \\]
                    `):c&&(m=c*2*Math.sqrt(2),e+=`
                        \\[
                        u_{pp} = U_{\\mathrm{eff}} \\cdot 2 \\cdot \\sqrt{2} \\\\
                        = ${z(c,3)}\\,\\mathrm{V} \\cdot 2 \\cdot \\sqrt{2} \\\\
                        = ${z(m,3)}\\,\\mathrm{V}
                        \\]
                    `));let h=c;c||(a?(h=a/Math.sqrt(2),e+=`
                        \\[
                        U_{\\mathrm{eff}} = \\frac{\\hat{u}}{\\sqrt{2}} \\\\
                        = \\frac{${z(a,3)}\\,\\mathrm{V}}{\\sqrt{2}} \\\\
                        = ${z(h,3)}\\,\\mathrm{V}
                        \\]
                    `):o&&(h=o/(2*Math.sqrt(2)),e+=`
                        \\[
                        U_{\\mathrm{eff}} = \\frac{u_{pp}}{2 \\cdot \\sqrt{2}} \\\\
                        = \\frac{${z(o,3)}\\,\\mathrm{V}}{2 \\cdot \\sqrt{2}} \\\\
                        = ${z(h,3)}\\,\\mathrm{V}
                        \\]
                    `));let g=l;l||d&&(g=1/d,e+=`
                        \\[
                        f = \\frac{1}{T} \\\\
                        = \\frac{1}{${z(d,3)}\\,\\mathrm{s}} \\\\
                        = ${z(g,3)}\\,\\mathrm{Hz}
                        \\]
                    `);let _=d;d||l&&(_=1/l,e+=`
                        \\[
                        T = \\frac{1}{f} \\\\
                        = \\frac{1}{${z(l,3)}\\,\\mathrm{Hz}} \\\\
                        = ${z(_*1e3,3)}\\,\\mathrm{ms}
                        \\]
                    `);let v=p,y=f;f||r&&a&&l&&u&&(v=Math.asin(r/a)-2*Math.PI*l*u,y=180/Math.PI*v,e+=`
                        \\[
                        \\varphi = \\arcsin\\left(\\frac{u(t)}{\\hat{u}}\\right) - 2\\pi f t \\\\
                        = \\arcsin\\left(\\frac{${z(r,3)}\\,\\mathrm{V}}{${z(a,3)}\\,\\mathrm{V}}\\right) - 2\\pi \\cdot ${z(l,3)}\\,\\mathrm{Hz} \\cdot ${z(u,3)}\\,\\mathrm{s} \\\\
                        = ${z(v,3)}\\,\\mathrm{rad} = ${z(y,3)}\\,\\mathrm{°}
                        \\]
                    `),i(n.getElementById(`result_Sinus`),e),s.typeset(),I(a||h*Math.sqrt(2),g||l,v||p,u||0,2,8)}function P(e,t,n=70,r=10){E&&(e.save(),e.globalAlpha=.15,e.drawImage(T,t.width-n-r,r,n,n),e.globalAlpha=1,e.restore())}function F(e){let t=n.getElementById(e);if(!t)return;let r=n.createElement(`a`);r.download=e+`.png`,r.href=t.toDataURL(`image/png`),r.click()}function I(e,t,r,i,a=2,o=1){let s=n.getElementById(`sinusCanvas`);if(!s)return;let l=s.getContext(`2d`),u=s.width,d=s.height,f=d/2,p=u-50-20,m=1/t,h=p/(a*m),g=(f-20)/e;l.clearRect(0,0,u,d),L(l,u,d,f,50,20,e,t,g,h,a,m),P(l,s);let _=M(l,s);s._downloadHandlerAdded||=(s.addEventListener(`click`,function(e){let t=s.getBoundingClientRect(),n=s.width/t.width,r=s.height/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r;i>=_.x&&i<=_.x+_.size&&a>=_.y&&a<=_.y+_.size&&F(s.id)}),!0),l.strokeStyle=getComputedStyle(n.documentElement).getPropertyValue(`--Spannung`).trim()||`#0070C0`,l.lineWidth=2;let v=0;l.beginPath();function y(){if(v>p)l.stroke(),R(l,u,d,f,50,20,e,t,r,i,h,g,a);else{for(let n=0;n<o&&!(v>p);n++){let n=v/h,i=2*Math.PI*t*n+r,a=e*Math.sin(i),o=50+v,s=f-a*g;v===0?l.moveTo(o,s):l.lineTo(o,s),v++}l.stroke(),c(y)}}y()}function L(e,t,n,r,i,a,o,s,c,l,u,d){e.strokeStyle=`#333`,e.lineWidth=.5;for(let n=-4;n<=4;n++){let s=r-o/4*n*c;e.beginPath(),e.moveTo(i,s),e.lineTo(t-a,s),e.stroke()}e.strokeStyle=`#888`,e.lineWidth=1,e.beginPath(),e.moveTo(i,r),e.lineTo(t-a,r),e.moveTo(i,0),e.lineTo(i,n),e.stroke(),e.fillStyle=`#888`,e.font=`12px sans-serif`,e.textAlign=`center`;for(let t=0;t<=u;t++){let n=i+t*d*l;e.beginPath(),e.moveTo(n,r-5),e.lineTo(n,r+5),e.stroke(),e.fillText(`${(t*d*1e3).toFixed(0)}ms`,n,r+20)}e.textAlign=`right`;for(let t=-4;t<=4;t++){if(t===0)continue;let n=r-o/4*t*c;e.beginPath(),e.moveTo(i-5,n),e.lineTo(i+5,n),e.stroke(),e.fillText(`${(t*o/4).toFixed(0)}V`,i-10,n+4)}}function R(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=1/s*f,m=(l%p+p)%p,h=o*Math.sin(2*Math.PI*s*m+c),g=i+m*u,_=r-h*d;g>=i&&g<=i+(t-i-a)&&(e.save(),e.strokeStyle=`deeppink`,e.lineWidth=1.5,e.setLineDash([5,5]),e.beginPath(),e.moveTo(g,r),e.lineTo(g,_),e.stroke(),e.beginPath(),e.moveTo(i,_),e.lineTo(g,_),e.stroke(),e.setLineDash([]),e.restore(),e.save(),e.fillStyle=`deeppink`,e.font=`bold 13px sans-serif`,e.textAlign=`center`,e.fillText(`t = ${m.toFixed(4)} s`,g,r+30),e.restore(),e.save(),e.fillStyle=`deeppink`,e.font=`bold 13px sans-serif`,e.textAlign=`left`,e.fillText(`u(t) = ${h.toFixed(2)} V`,g+8,_-8),e.restore(),e.fillStyle=`deeppink`,e.beginPath(),e.arc(g,_,6,0,2*Math.PI),e.fill());let v=i+10;e.fillStyle=`rgba(0,0,0,0.6)`,e.fillRect(v,10,200,90),e.fillStyle=`#fff`,e.textAlign=`left`,e.font=`12px sans-serif`,e.fillText(`û = ${o.toFixed(1)} V`,v+8,30),e.fillText(`f = ${s.toFixed(1)} Hz`,v+8,48),e.fillText(`φ = ${(c*180/Math.PI).toFixed(1)}°`,v+8,66),e.fillStyle=`deeppink`,e.beginPath(),e.arc(v+8,86,6,0,2*Math.PI),e.fill(),e.fillStyle=`#fff`,e.font=`12px sans-serif`,e.fillText(`aktueller Zeitpunkt t`,v+20,90)}function z(e,t=3){return e==null||isNaN(e)?`N/A`:parseFloat(e).toFixed(t)}function B(e){let t={euroNet:{ut:``,up:``,upp:``,Ueff:`230`,f:`50`,t:`0.022`,T:``,phi:`0`,angleUnit:`deg`},functionGen:{ut:``,up:`5`,upp:``,Ueff:``,f:`1k`,t:`0.00050`,T:``,phi:`-45`,angleUnit:`deg`}}[e];t&&(n.getElementById(`ut-Sinus`).value=t.ut,n.getElementById(`up-Sinus`).value=t.up,n.getElementById(`upp-Sinus`).value=t.upp,n.getElementById(`Ueff-Sinus`).value=t.Ueff,n.getElementById(`f-Sinus`).value=t.f,n.getElementById(`t-Sinus`).value=t.t,n.getElementById(`T-Sinus`).value=t.T,n.getElementById(`phi-Sinus`).value=t.phi,(t.angleUnit===`deg`&&O||t.angleUnit===`rad`&&!O)&&k(),N())}function V(){let e=``,r=n.getElementById(`up-Rechteck`).value,a=n.getElementById(`upp-Rechteck`).value,o=n.getElementById(`Ueff-Rechteck`).value;r||(a&&(e+=`
                        Peakspannung &ucirc; =
                        <div class="fraction">
                            <span>u<sub>pp</sub></span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = <div class="fraction">
                            <span>${a}V</span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = ${v(t(a)/2,`V`)}<br>`),o&&(e+=`
                        Peakspannung &ucirc; = U<sub>eff</sub>
                        = ${o}V<br>`)),a||(r&&(e+=`
                        Peak-Peakspannung u<sub>pp</sub> = 2 &lowast; &ucirc;
                        = 2 &lowast; ${r}V
                        = ${v(2*t(r),`V`)}<br>`),o&&(e+=`
                        Peak-Peakspannung u<sub>pp</sub> = 2 &lowast; U<sub>eff</sub>
                        = 2 &lowast; ${o}V
                        = ${v(2*t(o),`V`)}<br>`)),o||(r&&(e+=`
                        Effektivspannung U<sub>eff</sub> = &ucirc;
                        = ${r}V<br>`),a&&(e+=`
                        Effektivspannung U<sub>eff</sub> =
                        <div class="fraction">
                            <span>u<sub>pp</sub></span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = <div class="fraction">
                            <span>${a}V</span><br>
                            <span class="fraction-denominator">2</span>
                        </div>
                        = ${v(t(a)/2,`V`)}<br>`)),i(n.getElementById(`result_Rechteck`),e)}function H(){let e=``,r=n.getElementById(`Ueff-Dreieck`).value,a=n.getElementById(`up-Dreieck`).value,o=n.getElementById(`upp-Dreieck`).value;a||(o&&(e+=`
                        Peakspannung &ucirc; = 
                        <div class ="fraction">
                            <span> u<sub>pp</sub> </span><br>
                            <span class="fraction-denominator">2</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${o}V<br>
                            <span class="fraction-denominator">2</span>
                        </div> 
                    = ${v(t(o)/2,`V`)}<br>`),r&&(e+=`
                        Peakspannung &ucirc; = U<sub>eff</sub> &lowast; &radic;3
                    =
                        ${r}V &lowast; &radic;3
                    = ${v(t(r)*3**.5,`V`)}<br>`)),o||(a&&(e+=`
                        Peak-Peakspannung u<sub>pp</sub> =  u<sub>p</sub> &lowast; 2 
                    =
                        ${a}V &lowast; 2 
                    = ${v(t(a)*2,`V`)}<br>`),r&&(e+=`
                        Peak-Peakspannung u<sub>pp</sub> =  U<sub>eff</sub> &lowast; 2 &lowast; &radic;3
                    =
                        ${r}V &lowast; 2 &lowast; &radic;3
                    = ${v(t(r)*2*3**.5,`V`)}<br>`)),r||(a&&(e+=`
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> &ucirc; </span><br>
                            <span class="fraction-denominator">&radic;3</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${a}V<br>
                            <span class="fraction-denominator">&radic;3</span>
                        </div> 
                    = ${v(t(a)/3**.5,`V`)}<br>`),o&&(e+=`
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> u<sub>pp</sub> </span><br>
                            <span class="fraction-denominator">2 &lowast; &radic;3</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${o}V<br>
                            <span class="fraction-denominator">2 &lowast; &radic;3</span>
                        </div> 
                    = ${v(t(o)/(2*3**.5),`V`)}<br>`)),i(n.getElementById(`result_Dreieck`),e)}function U(){let e=``,r=n.getElementById(`up-PWM`).value,a=n.getElementById(`Ueff-PWM`).value,o=n.getElementById(`f-PWM`).value,s=n.getElementById(`tin-PWM`).value,c=n.getElementById(`T-PWM`).value,l=n.getElementById(`g-PWM`).value;r||(r&&l&&A&&(e+=`
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&radic;g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${a}V<br>
                            <span class="fraction-denominator">&radic;${l}%</span>
                        </div> 
                    = ${v(t(a)/(t(l)/100)**.5,`V`)}<br>`),r&&l&&!A&&(e+=`
                        Effektivspannung U<sub>eff</sub> = 
                        <div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&radic;g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${a}V<br>
                            <span class="fraction-denominator">&radic;${l}</span>
                        </div> 
                    = ${v(t(a)/t(l)**.5,`V`)}<br>`)),a||(r&&l&&A&&(e+=`
                    Effektivspannung U<sub>eff</sub> = &ucirc; &lowast; &radic;g
                =
                    ${r}V &lowast; &radic;${l}%
                = ${v(t(r)*(t(l)/100)**.5,`V`)}<br>`),r&&l&&!A&&(e+=`
                    Effektivspannung U<sub>eff</sub> = &ucirc; &lowast; &radic;g
                =
                    ${r}V &lowast; &radic;${l}
                = ${v(t(r)*t(l)**.5,`V`)}<br>`)),o||c&&(e+=`
                        Frequnez f = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">T</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1<br>
                            <span class="fraction-denominator">${c}s</span>
                        </div> 
                    = ${v(1/t(c),`Hz`)}<br>`),s||(c&&l&&A&&(e+=`
                    Impulsdauer t<sub>in</sub> = T &lowast; g
                =
                    ${c}s &lowast; ${l}%
                = ${v(t(c)*t(l)/100,`s`)}<br>`),c&&l&&!A&&(e+=`
                    Impulsdauer t<sub>in</sub> = T &lowast; g
                =
                    ${c}s &lowast; ${l}
                = ${v(t(c)*t(l),`s`)}<br>`),o&&l&&A&&(e+=`
                        Impulsdauer t<sub>in</sub> = 
                        <div class ="fraction">
                            <span> g </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${l}%<br>
                            <span class="fraction-denominator">${o}Hz</span>
                        </div> 
                = ${v(t(l)/(t(o)*100),`s`)}<br>`),o&&l&&!A&&(e+=`
                        Impulsdauer t<sub>in</sub> = 
                        <div class ="fraction">
                            <span> g </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${l}<br>
                            <span class="fraction-denominator">${o}Hz</span>
                        </div> 
                = ${v(t(l)/t(o),`s`)}<br>`)),c||(o&&(e+=`
                        Periodendauer T = 
                        <div class ="fraction">
                            <span> 1 </span><br>
                            <span class="fraction-denominator">f</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>1<br>
                            <span class="fraction-denominator">${o}Hz</span>
                        </div> 
                    = ${v(1/t(o),`s`)}<br>`),s&&l&&A&&(e+=`
                        Periodenzeit = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}s<br>
                            <span class="fraction-denominator">${l}%</span>
                        </div> 
                    = ${v(t(s)/(t(l)/100),`s`)}<br>`),s&&l&&!A&&(e+=`
                        Periodenzeit = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">g</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}s<br>
                            <span class="fraction-denominator">${l}</span>
                        </div> 
                    = ${v(t(s)/t(l),`s`)}<br>`)),l||(s&&c&&(e+=`
                        Duty-Cycle g = 
                        <div class ="fraction">
                            <span> t<sub>in</sub> </span><br>
                            <span class="fraction-denominator">T</span>
                        </div> 
                    =
                        <div class ="fraction">
                            <span>${s}s<br>
                            <span class="fraction-denominator">${c}s</span>
                        </div> 
                    = ${v(t(s)/t(c),``)}
                    = ${v(t(s)*100/t(c),`%`)}<br>`),a&&r&&(e+=`
                        Duty-Cycle g = 
                        (<div class ="fraction">
                            <span> U<sub>eff</sub> </span><br>
                            <span class="fraction-denominator">&ucirc;</span>
                        </div>)<sup>2</sup>
                    =
                        (<div class ="fraction">
                            <span>${a}V<br>
                            <span class="fraction-denominator">${r}V</span>
                        </div>)<sup>2</sup>
                    = ${v((t(a)/t(r))**2,``)}
                    = ${v(100*(t(a)/t(r))**2,`%`)}<br>`)),i(n.getElementById(`result_PWM`),e)}return{handlers:{toggleSelection:D,toggleRAD:k,toggleDuty:j,drawDownloadIcon:M,calculate_Sinus:N,drawWatermark:P,exportCanvasAsPNG:F,drawSinus:I,drawAxesAndLabels:L,drawMarkerAndLegend:R,formatNumber:z,fillExampleValues:B,calculate_Rechteck:V,calculate_Dreieck:H,calculate_PWM:U,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        
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
    
} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Wechselstrom`]})}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Sinus`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`Sinus`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Sinus.jpg`,alt:`Sinus`}),(0,s.jsx)(`span`,{children:`Sinus`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Rechteck`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`Rechteck`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Rechteck.jpg`,alt:`Rechteck`}),(0,s.jsx)(`span`,{children:`Rechteck`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-2`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Dreieck`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`Dreieck`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/Dreieck.jpg`,alt:`Dreieck`}),(0,s.jsx)(`span`,{children:`Dreieck`})]}),(0,s.jsxs)(`button`,{type:`button`,id:`control-3`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`PWM`,onClick:t=>{e.current?.handlers.toggleSelection?.(t.currentTarget,`PWM`)},children:[(0,s.jsx)(`img`,{src:`/Pictures/PWM.jpg`,alt:`PWM`}),(0,s.jsx)(`span`,{children:`PWM`})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`Sinus`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Sinus`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,s.jsx)(`br`,{}),`
                    Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden`,(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Momentanwert u(t)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Momentanwert u(t)`,id:`ut-Sinus`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peakspannung u`,(0,s.jsx)(`sub`,{children:`p`}),` / û`]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Sinus`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peak-Peakspannung u`,(0,s.jsx)(`sub`,{children:`pp`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Sinus`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Effektivspannung U`,(0,s.jsx)(`sub`,{children:`eff`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Sinus`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-Sinus`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`aktueller Zeitpunkt t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`aktueller Zeitpunkt t`,id:`t-Sinus`}),(0,s.jsx)(`label`,{children:`s [sekunden] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Periodendauer T`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Periodendauer T`,id:`T-Sinus`}),(0,s.jsx)(`label`,{children:`s [sekunden] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Phasenverschiebung φ (Sinusgenerator)`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Phasenverschiebung φ (Sinusgenerator)`,id:`phi-Sinus`}),(0,s.jsx)(`label`,{children:(0,s.jsx)(`button`,{type:`button`,id:`Rad-Button`,className:`RAD-Button`,"data-action":`toggleRAD`,onClick:t=>{e.current?.handlers.toggleRAD?.()},children:`2π`})})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Aktueller Zeitpunkt t`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Aktueller Zeitpunkt t`,id:`t-Sinus`}),(0,s.jsx)(`label`,{children:`s [Sekunden]`})]}),(0,s.jsxs)(`div`,{className:`examples-section`,children:[(0,s.jsx)(`h4`,{children:`Beispiele aus der Praxis:`}),(0,s.jsxs)(`div`,{className:`example`,children:[(0,s.jsx)(`span`,{children:`Europäisches Stromnetz (Haushalt)`}),(0,s.jsx)(`button`,{type:`button`,id:`control-4`,"data-action":`fillExampleValues`,onClick:t=>{e.current?.handlers.fillExampleValues?.(`euroNet`)},children:`Werte übernehmen`})]}),(0,s.jsxs)(`div`,{className:`example`,children:[(0,s.jsx)(`span`,{children:`Typisches Funktionsgenerator-Signal`}),(0,s.jsx)(`button`,{type:`button`,id:`control-5`,"data-action":`fillExampleValues`,onClick:t=>{e.current?.handlers.fillExampleValues?.(`functionGen`)},children:`Werte übernehmen`})]})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Sinus`,onClick:t=>{e.current?.handlers.calculate_Sinus?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Sinus`,"aria-live":`polite`}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,s.jsx)(`div`,{style:{fontWeight:`bold`,color:`#fff`,padding:`6px 0`,width:`100%`,textAlign:`center`,maxWidth:`1200px`},children:(0,s.jsx)(`h3`,{children:`Grafische Sinuskurve:`})}),(0,s.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,width:`100%`},children:(0,s.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`10px auto`},id:`sinusCanvas`,width:`1200`,height:`400`})})]})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`Rechteck`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Rechteck`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peakspannung u`,(0,s.jsx)(`sub`,{children:`p`}),` / û`]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Rechteck`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peak-Peakspannung u`,(0,s.jsx)(`sub`,{children:`pp`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Rechteck`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Effektivspannung U`,(0,s.jsx)(`sub`,{children:`eff`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Rechteck`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Rechteck`,onClick:t=>{e.current?.handlers.calculate_Rechteck?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Rechteck`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`Dreieck`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`Dreieck / Sägezahn`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peakspannung u`,(0,s.jsx)(`sub`,{children:`p`}),` / û`]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Dreieck`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peak-Peakspannung u`,(0,s.jsx)(`sub`,{children:`pp`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Dreieck`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Effektivspannung U`,(0,s.jsx)(`sub`,{children:`eff`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Dreieck`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Dreieck`,onClick:t=>{e.current?.handlers.calculate_Dreieck?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Dreieck`,"aria-live":`polite`})]}),(0,s.jsxs)(`div`,{style:{display:`none`},id:`PWM`,className:`input-numbers`,children:[(0,s.jsx)(`h2`,{children:`PWM`}),(0,s.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,s.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,s.jsx)(`br`,{}),`
                    Mit einem Klick auf die Einheit das Duty-Cycles kann zwischen % und ganzzahlig umgestellt werden`,(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Peakspannung u`,(0,s.jsx)(`sub`,{children:`p`}),` / û`]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-PWM`}),(0,s.jsx)(`label`,{children:`V [Volt]`})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Effektivspannung U`,(0,s.jsx)(`sub`,{children:`eff`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-PWM`}),(0,s.jsx)(`label`,{children:`V [Volt] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Frequenz f`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-PWM`}),(0,s.jsx)(`label`,{children:`Hz [Hertz] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsxs)(`label`,{children:[`Impulsdauer t`,(0,s.jsx)(`sub`,{children:`in`})]}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Impulsdauer tin`,id:`tin-PWM`}),(0,s.jsx)(`label`,{children:`s [sekunden] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Periodendauer T`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Periodendauer T`,id:`T-PWM`}),(0,s.jsx)(`label`,{children:`s [sekunden] `})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Duty-Cycle g`}),(0,s.jsx)(`input`,{style:{borderColor:`gray`},type:`text`,"aria-label":`Duty-Cycle g`,id:`g-PWM`}),(0,s.jsx)(`label`,{children:(0,s.jsx)(`button`,{type:`button`,id:`Duty-Button`,className:`RAD-Button`,"data-action":`toggleDuty`,onClick:t=>{e.current?.handlers.toggleDuty?.()},children:`%`})})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_PWM`,onClick:t=>{e.current?.handlers.calculate_PWM?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_PWM`,"aria-live":`polite`})]}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};