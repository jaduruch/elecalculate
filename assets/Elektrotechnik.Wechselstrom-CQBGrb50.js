import{o as e}from"./matchContext-DAqmlEzK.js";import{c as t,d as n,f as r,m as i,p as a,t as o}from"./shared-VEyeTWJO.js";import{t as s}from"./form-units-DJ2prn5m.js";function c(e){let{document:r,window:c,MathJax:l,requestAnimationFrame:u,cancelAnimationFrame:d,setTimeout:f,clearTimeout:p,setInterval:m,clearInterval:h}=e,{changeSlide:g,showSlides:_,formatPrefixNoUnit:v,formatPrefixNoUnitSquare:y,formatWithPrefix:b,formatWithPrefixsquare:x,getlg:S,drawCurveDynamic:C,getBestSIPrefix:w,formatWithSIPrefix:T}=o(e),E=null,D=new Image;D.src=`/Pictures/favicon_no_BG.svg`;let O=!1;D.onload=function(){O=!0};function k(e,t){let n=r.getElementById(t);E===e?(e.classList.remove(`selected`),n.style.display=`none`,E=null):(E&&E.classList.remove(`selected`),e.classList.add(`selected`),E=e,t===`Sinus`?(r.getElementById(`Sinus`).style.display=`block`,r.getElementById(`Rechteck`).style.display=`none`,r.getElementById(`Dreieck`).style.display=`none`,r.getElementById(`PWM`).style.display=`none`):t===`Rechteck`?(r.getElementById(`Sinus`).style.display=`none`,r.getElementById(`Rechteck`).style.display=`block`,r.getElementById(`Dreieck`).style.display=`none`,r.getElementById(`PWM`).style.display=`none`):t===`Dreieck`?(r.getElementById(`Sinus`).style.display=`none`,r.getElementById(`Rechteck`).style.display=`none`,r.getElementById(`Dreieck`).style.display=`block`,r.getElementById(`PWM`).style.display=`none`):t===`PWM`&&(r.getElementById(`Sinus`).style.display=`none`,r.getElementById(`Rechteck`).style.display=`none`,r.getElementById(`Dreieck`).style.display=`none`,r.getElementById(`PWM`).style.display=`block`))}let A=!0;function j(){s(r,`phi-Sinus`,A?180/Math.PI:Math.PI/180);let e=r.getElementById(`Rad-Button`);A?(n(e,`360&deg;`),A=!1):(n(e,`2&pi;`),A=!0)}let M=!0;function N(){s(r,`g-PWM`,M?.01:100);let e=r.getElementById(`Duty-Button`);M?(n(e,`1`),M=!1):(n(e,`%`),M=!0)}function P(e,t,n=32){let r=t.width-n-12,i=t.height-n-12;return e.save(),e.globalAlpha=.7,e.strokeStyle=`#fff`,e.lineWidth=2,e.lineJoin=`round`,e.beginPath(),e.moveTo(r+n/2,i+8),e.lineTo(r+n/2,i+n-10),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2-8,i+n-18),e.moveTo(r+n/2,i+n-10),e.lineTo(r+n/2+8,i+n-18),e.stroke(),e.beginPath(),e.rect(r+8,i+n-10,n-16,8),e.stroke(),e.restore(),{x:r,y:i,size:n}}function F(){let e=t(r,`sinus`,{radians:A}),n=e.values;if(!e.errors.length&&Number.isFinite(n.up)&&Number.isFinite(n.f)&&n.f>0)R(n.up,n.f,n.phi??0,n.t??0,2,8);else{let e=r.getElementById(`sinusCanvas`);e&&(e.dataset.calculated=`false`),e?.getContext(`2d`)?.clearRect(0,0,e.width,e.height)}return e}function I(e,t,n=70,r=10){O&&(e.save(),e.globalAlpha=.15,e.drawImage(D,t.width-n-r,r,n,n),e.globalAlpha=1,e.restore())}function L(e){let t=r.getElementById(e);if(!t||e===`sinusCanvas`&&t.dataset.calculated!==`true`||t.closest(`[data-calculation-stale=true]`))return;let n=r.createElement(`canvas`);n.width=t.width,n.height=t.height;let i=n.getContext(`2d`);i.fillStyle=`#000`,i.fillRect(0,0,n.width,n.height),i.drawImage(t,0,0);let a=r.createElement(`a`);a.download=e+`.png`,a.href=n.toDataURL(`image/png`),a.click()}function R(t,n,i,a,o=2,s=1){let c=r.getElementById(`sinusCanvas`);if(!c)return;c.dataset.calculated=`true`;let l=c.getContext(`2d`),d=c.width,f=c.height,p=f/2,m=d-50-20,h=1/n,g=m/(o*h),_=(p-20)/(t===0?1:t);l.clearRect(0,0,d,f),z(l,d,f,p,50,20,t,n,_,g,o,h),I(l,c);let v=P(l,c);c._downloadHandlerAdded||=(e.listen(c,`click`,function(e){let t=c.getBoundingClientRect(),n=c.width/t.width,r=c.height/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r;i>=v.x&&i<=v.x+v.size&&a>=v.y&&a<=v.y+v.size&&L(c.id)}),!0),l.strokeStyle=getComputedStyle(r.documentElement).getPropertyValue(`--Spannung`).trim()||`#0070C0`,l.lineWidth=2;let y=0;l.beginPath();function b(){if(y>m)l.stroke(),B(l,d,f,p,50,20,t,n,i,a,g,_,o);else{for(let e=0;e<s&&!(y>m);e++){let e=y/g,r=2*Math.PI*n*e+i,a=t*Math.sin(r),o=50+y,s=p-a*_;y===0?l.moveTo(o,s):l.lineTo(o,s),y++}l.stroke(),u(b)}}b()}function z(e,t,n,r,i,a,o,s,c,l,u,d){e.strokeStyle=`#333`,e.lineWidth=.5;for(let n=-4;n<=4;n++){let s=r-o/4*n*c;e.beginPath(),e.moveTo(i,s),e.lineTo(t-a,s),e.stroke()}e.strokeStyle=`#888`,e.lineWidth=1,e.beginPath(),e.moveTo(i,r),e.lineTo(t-a,r),e.moveTo(i,0),e.lineTo(i,n),e.stroke(),e.fillStyle=`#888`,e.font=`12px sans-serif`,e.textAlign=`center`;for(let t=0;t<=u;t++){let n=i+t*d*l;e.beginPath(),e.moveTo(n,r-5),e.lineTo(n,r+5),e.stroke(),e.fillText(`${(t*d*1e3).toFixed(0)}ms`,n,r+20)}e.textAlign=`right`;for(let t=-4;t<=4;t++){if(t===0)continue;let n=r-o/4*t*c;e.beginPath(),e.moveTo(i-5,n),e.lineTo(i+5,n),e.stroke(),e.fillText(`${(t*o/4).toFixed(0)}V`,i-10,n+4)}}function B(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=1/s*f,m=(l%p+p)%p,h=o*Math.sin(2*Math.PI*s*m+c),g=i+m*u,_=r-h*d;g>=i&&g<=i+(t-i-a)&&(e.save(),e.strokeStyle=`deeppink`,e.lineWidth=1.5,e.setLineDash([5,5]),e.beginPath(),e.moveTo(g,r),e.lineTo(g,_),e.stroke(),e.beginPath(),e.moveTo(i,_),e.lineTo(g,_),e.stroke(),e.setLineDash([]),e.restore(),e.save(),e.fillStyle=`deeppink`,e.font=`bold 13px sans-serif`,e.textAlign=`center`,e.fillText(`t = ${m.toFixed(4)} s`,g,r+30),e.restore(),e.save(),e.fillStyle=`deeppink`,e.font=`bold 13px sans-serif`,e.textAlign=`left`,e.fillText(`u(t) = ${h.toFixed(2)} V`,g+8,_-8),e.restore(),e.fillStyle=`deeppink`,e.beginPath(),e.arc(g,_,6,0,2*Math.PI),e.fill());let v=i+10;e.fillStyle=`rgba(0,0,0,0.6)`,e.fillRect(v,10,200,90),e.fillStyle=`#fff`,e.textAlign=`left`,e.font=`12px sans-serif`,e.fillText(`û = ${o.toFixed(1)} V`,v+8,30),e.fillText(`f = ${s.toFixed(1)} Hz`,v+8,48),e.fillText(`φ = ${(c*180/Math.PI).toFixed(1)}°`,v+8,66),e.fillStyle=`deeppink`,e.beginPath(),e.arc(v+8,86,6,0,2*Math.PI),e.fill(),e.fillStyle=`#fff`,e.font=`12px sans-serif`,e.fillText(`aktueller Zeitpunkt t`,v+20,90)}function V(e,t=3){return e==null||isNaN(e)?`N/A`:parseFloat(e).toFixed(t)}function H(e){let t={euroNet:{Ueff:`230`,f:`50`,t:`0.022`,phi:`0`},functionGen:{up:`5`,f:`1k`,t:`0.00050`,phi:`-45`}}[e];if(t){A=!1,r.getElementById(`Rad-Button`).textContent=`360°`;for(let e of[`ut`,`up`,`upp`,`Ueff`,`f`,`t`,`T`,`phi`])r.getElementById(e+`-Sinus`).value=t[e]??``;return F()}}function U(){return t(r,`rectangle`)}function W(){return t(r,`triangle`)}function G(){return t(r,`pwm`,{percent:M})}return{captureState(){return{kind:`waveform-options`,values:{radians:A,percent:M}}},restoreState(e){if(e.kind!==`waveform-options`||![`radians`,`percent`].every(t=>typeof e.values[t]==`boolean`))throw Error(`Ungültige gespeicherte Einheiteneinstellung.`);typeof e.values.radians==`boolean`&&(A=e.values.radians,r.getElementById(`Rad-Button`).textContent=A?`2π`:`360°`),typeof e.values.percent==`boolean`&&(M=e.values.percent,r.getElementById(`Duty-Button`).textContent=M?`%`:`1`)},handlers:{toggleSelection:k,toggleRAD:j,toggleDuty:N,drawDownloadIcon:P,calculate_Sinus:F,drawWatermark:I,exportCanvasAsPNG:L,drawSinus:R,drawAxesAndLabels:z,drawMarkerAndLegend:B,formatNumber:V,fillExampleValues:H,calculate_Rechteck:U,calculate_Dreieck:W,calculate_PWM:G,changeSlide:g,showSlides:_,formatPrefixNoUnit:v,formatPrefixNoUnitSquare:y,formatWithPrefix:b,formatWithPrefixsquare:x,getlg:S,drawCurveDynamic:C,getBestSIPrefix:w,formatWithSIPrefix:T,parseInput:a,parseInputsquare:i},dispose(){}}}var l=e();function u(){let e=r(c);return(0,l.jsxs)(l.Fragment,{children:[e.restoring&&(0,l.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,l.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,l.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        
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
    
} }`}),(0,l.jsx)(`div`,{children:(0,l.jsxs)(`h1`,{children:[(0,l.jsx)(`br`,{}),`Wechselstrom`]})}),(0,l.jsxs)(`div`,{children:[(0,l.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-0`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Sinus`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`Sinus`)},children:[(0,l.jsx)(`img`,{src:`/Pictures/Sinus.jpg`,alt:`Sinus`}),(0,l.jsx)(`span`,{children:`Sinus`})]}),(0,l.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Rechteck`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`Rechteck`)},children:[(0,l.jsx)(`img`,{src:`/Pictures/Rechteck.jpg`,alt:`Rechteck`}),(0,l.jsx)(`span`,{children:`Rechteck`})]}),(0,l.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-2`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`Dreieck`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`Dreieck`)},children:[(0,l.jsx)(`img`,{src:`/Pictures/Dreieck.jpg`,alt:`Dreieck`}),(0,l.jsx)(`span`,{children:`Dreieck`})]}),(0,l.jsxs)(`button`,{disabled:!e.ready,type:`button`,id:`control-3`,className:`img-button`,"data-action":`toggleSelection`,"data-target":`PWM`,onClick:t=>{e.current?.invoke?.(`toggleSelection`,t.currentTarget,t.currentTarget,`PWM`)},children:[(0,l.jsx)(`img`,{src:`/Pictures/PWM.jpg`,alt:`PWM`}),(0,l.jsx)(`span`,{children:`PWM`})]})]}),(0,l.jsxs)(`div`,{style:{display:`none`},id:`Sinus`,className:`input-numbers`,children:[(0,l.jsx)(`h2`,{children:`Sinus`}),(0,l.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,l.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,l.jsx)(`br`,{}),`
                    Mit einem Klick auf die Einheit das Winkels kann zwischen RAD und DEG umgestellt werden`,(0,l.jsx)(`br`,{})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`ut-Sinus`,children:`Momentanwert u(t)`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Momentanwert u(t)`,id:`ut-Sinus`,"aria-describedby":`ut-Sinus-unit`}),(0,l.jsx)(`label`,{id:`ut-Sinus-unit`,children:`V [Volt]`})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`up-Sinus`,children:[`Peakspannung u`,(0,l.jsx)(`sub`,{children:`p`}),` / û`]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Sinus`,"aria-describedby":`up-Sinus-unit`}),(0,l.jsx)(`label`,{id:`up-Sinus-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`upp-Sinus`,children:[`Peak-Peakspannung u`,(0,l.jsx)(`sub`,{children:`pp`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Sinus`,"aria-describedby":`upp-Sinus-unit`}),(0,l.jsx)(`label`,{id:`upp-Sinus-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`Ueff-Sinus`,children:[`Effektivspannung U`,(0,l.jsx)(`sub`,{children:`eff`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Sinus`,"aria-describedby":`Ueff-Sinus-unit`}),(0,l.jsx)(`label`,{id:`Ueff-Sinus-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`f-Sinus`,children:`Frequenz f`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-Sinus`,"aria-describedby":`f-Sinus-unit`}),(0,l.jsx)(`label`,{id:`f-Sinus-unit`,children:`Hz [Hertz] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`t-Sinus`,children:`aktueller Zeitpunkt t`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`aktueller Zeitpunkt t`,id:`t-Sinus`,"aria-describedby":`t-Sinus-unit`}),(0,l.jsx)(`label`,{id:`t-Sinus-unit`,children:`s [sekunden] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`T-Sinus`,children:`Periodendauer T`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Periodendauer T`,id:`T-Sinus`,"aria-describedby":`T-Sinus-unit`}),(0,l.jsx)(`label`,{id:`T-Sinus-unit`,children:`s [sekunden] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`phi-Sinus`,children:`Phasenverschiebung φ (Sinusgenerator)`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Winkel)`},type:`text`,"aria-label":`Phasenverschiebung φ (Sinusgenerator)`,id:`phi-Sinus`,"aria-describedby":`phi-Sinus-unit`}),(0,l.jsx)(`label`,{id:`phi-Sinus-unit`,children:(0,l.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`Rad-Button`,className:`RAD-Button`,"data-action":`toggleRAD`,onClick:t=>{e.current?.invoke?.(`toggleRAD`,t.currentTarget)},children:`2π`})})]}),(0,l.jsxs)(`div`,{className:`examples-section`,children:[(0,l.jsx)(`h4`,{children:`Beispiele aus der Praxis:`}),(0,l.jsxs)(`div`,{className:`example`,children:[(0,l.jsx)(`span`,{children:`Europäisches Stromnetz (Haushalt)`}),(0,l.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-4`,"data-action":`fillExampleValues`,onClick:t=>{e.current?.invoke?.(`fillExampleValues`,t.currentTarget,`euroNet`)},children:`Werte übernehmen`})]}),(0,l.jsxs)(`div`,{className:`example`,children:[(0,l.jsx)(`span`,{children:`Typisches Funktionsgenerator-Signal`}),(0,l.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-5`,"data-action":`fillExampleValues`,onClick:t=>{e.current?.invoke?.(`fillExampleValues`,t.currentTarget,`functionGen`)},children:`Werte übernehmen`})]})]}),(0,l.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Sinus`,onClick:t=>{e.current?.invoke?.(`calculate_Sinus`,t.currentTarget)}}),(0,l.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,l.jsx)(`div`,{id:`result_Sinus`,"aria-live":`polite`}),(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,l.jsx)(`div`,{style:{fontWeight:`bold`,color:`#fff`,padding:`6px 0`,width:`100%`,textAlign:`center`,maxWidth:`1200px`},children:(0,l.jsx)(`h3`,{children:`Grafische Sinuskurve:`})}),(0,l.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,width:`100%`},children:[(0,l.jsx)(`canvas`,{style:{background:`#222`,border:`1px solid #666`,display:`block`,margin:`10px auto`},id:`sinusCanvas`,width:`1200`,height:`400`}),(0,l.jsx)(`button`,{type:`button`,"data-action":`exportCanvasAsPNG`,onClick:t=>e.current?.invoke?.(`exportCanvasAsPNG`,t.currentTarget,`sinusCanvas`),children:`Diagramm als PNG speichern`})]})]})]}),(0,l.jsxs)(`div`,{style:{display:`none`},id:`Rechteck`,className:`input-numbers`,children:[(0,l.jsx)(`h2`,{children:`Rechteck`}),(0,l.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,l.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,l.jsx)(`br`,{}),(0,l.jsx)(`br`,{})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`up-Rechteck`,children:[`Peakspannung u`,(0,l.jsx)(`sub`,{children:`p`}),` / û`]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Rechteck`,"aria-describedby":`up-Rechteck-unit`}),(0,l.jsx)(`label`,{id:`up-Rechteck-unit`,children:`V [Volt]`})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`upp-Rechteck`,children:[`Peak-Peakspannung u`,(0,l.jsx)(`sub`,{children:`pp`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Rechteck`,"aria-describedby":`upp-Rechteck-unit`}),(0,l.jsx)(`label`,{id:`upp-Rechteck-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`Ueff-Rechteck`,children:[`Effektivspannung U`,(0,l.jsx)(`sub`,{children:`eff`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Rechteck`,"aria-describedby":`Ueff-Rechteck-unit`}),(0,l.jsx)(`label`,{id:`Ueff-Rechteck-unit`,children:`V [Volt] `})]}),(0,l.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Rechteck`,onClick:t=>{e.current?.invoke?.(`calculate_Rechteck`,t.currentTarget)}}),(0,l.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,l.jsx)(`div`,{id:`result_Rechteck`,"aria-live":`polite`})]}),(0,l.jsxs)(`div`,{style:{display:`none`},id:`Dreieck`,className:`input-numbers`,children:[(0,l.jsx)(`h2`,{children:`Dreieck / Sägezahn`}),(0,l.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,l.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,l.jsx)(`br`,{}),(0,l.jsx)(`br`,{})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`up-Dreieck`,children:[`Peakspannung u`,(0,l.jsx)(`sub`,{children:`p`}),` / û`]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-Dreieck`,"aria-describedby":`up-Dreieck-unit`}),(0,l.jsx)(`label`,{id:`up-Dreieck-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`upp-Dreieck`,children:[`Peak-Peakspannung u`,(0,l.jsx)(`sub`,{children:`pp`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peak-Peakspannung upp`,id:`upp-Dreieck`,"aria-describedby":`upp-Dreieck-unit`}),(0,l.jsx)(`label`,{id:`upp-Dreieck-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`Ueff-Dreieck`,children:[`Effektivspannung U`,(0,l.jsx)(`sub`,{children:`eff`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-Dreieck`,"aria-describedby":`Ueff-Dreieck-unit`}),(0,l.jsx)(`label`,{id:`Ueff-Dreieck-unit`,children:`V [Volt] `})]}),(0,l.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_Dreieck`,onClick:t=>{e.current?.invoke?.(`calculate_Dreieck`,t.currentTarget)}}),(0,l.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,l.jsx)(`div`,{id:`result_Dreieck`,"aria-live":`polite`})]}),(0,l.jsxs)(`div`,{style:{display:`none`},id:`PWM`,className:`input-numbers`,children:[(0,l.jsx)(`h2`,{children:`PWM`}),(0,l.jsxs)(`div`,{className:`comment`,children:[`
                    Werte mit Massvorsatz eingeben z.B. U`,(0,l.jsx)(`sub`,{children:`eff`}),` = 20mV → Eingabe: 20m (nicht 20mV)`,(0,l.jsx)(`br`,{}),`
                    Mit einem Klick auf die Einheit das Duty-Cycles kann zwischen % und ganzzahlig umgestellt werden`,(0,l.jsx)(`br`,{})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`up-PWM`,children:[`Peakspannung u`,(0,l.jsx)(`sub`,{children:`p`}),` / û`]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Peakspannung up / û`,id:`up-PWM`,"aria-describedby":`up-PWM-unit`}),(0,l.jsx)(`label`,{id:`up-PWM-unit`,children:`V [Volt]`})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`Ueff-PWM`,children:[`Effektivspannung U`,(0,l.jsx)(`sub`,{children:`eff`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Spannung)`},type:`text`,"aria-label":`Effektivspannung Ueff`,id:`Ueff-PWM`,"aria-describedby":`Ueff-PWM-unit`}),(0,l.jsx)(`label`,{id:`Ueff-PWM-unit`,children:`V [Volt] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`f-PWM`,children:`Frequenz f`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Frequenz)`},type:`text`,"aria-label":`Frequenz f`,id:`f-PWM`,"aria-describedby":`f-PWM-unit`}),(0,l.jsx)(`label`,{id:`f-PWM-unit`,children:`Hz [Hertz] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsxs)(`label`,{htmlFor:`tin-PWM`,children:[`Impulsdauer t`,(0,l.jsx)(`sub`,{children:`in`})]}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Impulsdauer tin`,id:`tin-PWM`,"aria-describedby":`tin-PWM-unit`}),(0,l.jsx)(`label`,{id:`tin-PWM-unit`,children:`s [sekunden] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`T-PWM`,children:`Periodendauer T`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`var(--Zeit)`},type:`text`,"aria-label":`Periodendauer T`,id:`T-PWM`,"aria-describedby":`T-PWM-unit`}),(0,l.jsx)(`label`,{id:`T-PWM-unit`,children:`s [sekunden] `})]}),(0,l.jsxs)(`div`,{className:`form-row`,children:[(0,l.jsx)(`label`,{htmlFor:`g-PWM`,children:`Duty-Cycle g`}),(0,l.jsx)(`input`,{disabled:!e.ready,style:{borderColor:`gray`},type:`text`,"aria-label":`Duty-Cycle g`,id:`g-PWM`,"aria-describedby":`g-PWM-unit`}),(0,l.jsx)(`label`,{id:`g-PWM-unit`,children:(0,l.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`Duty-Button`,className:`RAD-Button`,"data-action":`toggleDuty`,onClick:t=>{e.current?.invoke?.(`toggleDuty`,t.currentTarget)},children:`%`})})]}),(0,l.jsx)(`input`,{disabled:!e.ready,type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculate_PWM`,onClick:t=>{e.current?.invoke?.(`calculate_PWM`,t.currentTarget)}}),(0,l.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,l.jsx)(`div`,{id:`result_PWM`,"aria-live":`polite`})]}),(0,l.jsx)(`br`,{})]})]})}var d=u;export{d as component};