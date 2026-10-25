import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,m as n,p as r,t as i}from"./shared-B2WX6C5w.js";import{t as a}from"./three-phase-oqejQRo4.js";function o(e){let{document:t,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=i(e),w=t.getElementById(`phaseCanvas`),T=w.getContext(`2d`),E=w.width,D=w.height,O=D/2,k=.05,A=0,j=o.matchMedia(`(prefers-reduced-motion: reduce)`).matches,M=0,N=!0,P=!0,F=!0;function I(e,t,n){if(n){T.beginPath(),T.strokeStyle=t,T.lineWidth=2;for(let t=0;t<E;t++){let n=(t+A)*k+e*Math.PI/180,r=O+100*Math.sin(n);t===0?T.moveTo(t,r):T.lineTo(t,r)}T.stroke()}}function L(){T.beginPath(),T.strokeStyle=`white`,T.lineWidth=2;for(let e=0;e<E;e++){let t=a((e+A)*k,[N,P,F],100),n=O+t;e===0?T.moveTo(e,n):T.lineTo(e,n)}T.stroke()}function R(){T.clearRect(0,0,E,D),I(0,`red`,N),I(120,`green`,P),I(240,`blue`,F),L(),j||(A=(A+1)%(2*Math.PI/k)),j||(M=c(R))}function z(e){e===`red`?N=!N:e===`green`?P=!P:e===`blue`&&(F=!F),B(),j&&R()}R();function B(){for(let e of[`red`,`green`,`blue`]){let n=e===`red`?N:e===`green`?P:F;t.querySelector(`.`+e+`-btn`)?.setAttribute(`aria-pressed`,String(n))}let e=t.getElementById(`animation-toggle`);e.textContent=j?`Animation fortsetzen`:`Animation pausieren`,e.setAttribute(`aria-pressed`,String(j))}function V(){j=!j,j?l(M):R(),B()}return t.addEventListener(`DOMContentLoaded`,()=>B()),{captureState(){return{kind:`threephase-simulator`,values:{red:N,green:P,blue:F,time:A,paused:j}}},restoreState(e){if(e.kind!==`threephase-simulator`||![`red`,`green`,`blue`,`paused`].every(t=>typeof e.values[t]==`boolean`)||!Number.isFinite(e.values.time)||Number(e.values.time)<0)throw Error(`Ungültiger gespeicherter Simulationstyp.`);l(M),N=!!e.values.red,P=!!e.values.green,F=!!e.values.blue,A=Number.isFinite(e.values.time)?Number(e.values.time):0,j=!!e.values.paused,B(),R()},handlers:{drawWave:I,drawSumWave:L,animate:R,togglePhase:z,syncPhaseControls:B,toggleAnimation:V,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:r,parseInputsquare:n},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        canvas {
            border: 1px solid black;
            display: block;
            margin: 20px auto;
        }
        h2 {
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 20px;
        }
        .button-container button {
            padding: 10px 20px;
            margin: 0 10px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .red-btn { background-color: red; color: white; }
        .green-btn { background-color: green; color: white; }
        .blue-btn { background-color: blue; color: white; }
    
} }`}),(0,s.jsx)(`div`,{className:`simulation-controls`,children:(0,s.jsx)(`button`,{id:`animation-toggle`,type:`button`,onClick:t=>e.current?.invoke?.(`toggleAnimation`,t.currentTarget),children:`Animation pausieren`})}),(0,s.jsx)(`h1`,{children:`Dreiphasen-Generator Simulation`}),(0,s.jsxs)(`div`,{className:`button-container`,children:[(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-0`,className:`red-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.invoke?.(`togglePhase`,t.currentTarget,`red`)},children:`Rote Phase ein/aus`}),(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-1`,className:`green-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.invoke?.(`togglePhase`,t.currentTarget,`green`)},children:`Grüne Phase ein/aus`}),(0,s.jsx)(`button`,{disabled:!e.ready,type:`button`,id:`control-2`,className:`blue-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.invoke?.(`togglePhase`,t.currentTarget,`blue`)},children:`Blaue Phase ein/aus`})]}),(0,s.jsx)(`canvas`,{id:`phaseCanvas`,width:`800`,height:`400`})]})]})}var l=c;export{l as component};