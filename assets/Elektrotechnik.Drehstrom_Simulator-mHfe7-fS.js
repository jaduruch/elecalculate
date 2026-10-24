import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,t as i}from"./shared-D1EaDO0j.js";function a(e){let{document:n,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e),C=n.getElementById(`phaseCanvas`),w=C.getContext(`2d`),T=C.width,E=C.height,D=E/2,O=.05,k=0,A=!0,j=!0,M=!0;function N(e,t,n){if(n){w.beginPath(),w.strokeStyle=t,w.lineWidth=2;for(let t=0;t<T;t++){let n=(t+k)*O+e*Math.PI/180,r=D+100*Math.sin(n);t===0?w.moveTo(t,r):w.lineTo(t,r)}w.stroke()}}function P(){w.beginPath(),w.strokeStyle=`white`,w.lineWidth=2;for(let e=0;e<T;e++){let t=0,n=(e+k)*O+0*Math.PI/180,r=(e+k)*O+120*Math.PI/180,i=(e+k)*O+240*Math.PI/180;A&&(t+=(100*Math.sin(n))**2/100),j&&(t+=(100*Math.sin(r))**2/100),M&&(t+=(100*Math.sin(i))**2/100);let a=D-t;e===0?w.moveTo(e,a):w.lineTo(e,a)}w.stroke(),w.setLineDash([])}function F(){w.clearRect(0,0,T,E),N(0,`red`,A),N(120,`green`,j),N(240,`blue`,M),P(),k+=1,s(F)}function I(e){e===`red`?A=!A:e===`green`?j=!j:e===`blue`&&(M=!M)}return F(),{handlers:{drawWave:N,drawSumWave:P,animate:F,togglePhase:I,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var o=e();function s(){let e=n(a);return(0,o.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,o.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,o.jsx)(`h1`,{children:`Dreiphasen-Generator Simulation`}),(0,o.jsxs)(`div`,{className:`button-container`,children:[(0,o.jsx)(`button`,{type:`button`,id:`control-0`,className:`red-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.handlers.togglePhase?.(`red`)},children:`Rote Phase ein/aus`}),(0,o.jsx)(`button`,{type:`button`,id:`control-1`,className:`green-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.handlers.togglePhase?.(`green`)},children:`Grüne Phase ein/aus`}),(0,o.jsx)(`button`,{type:`button`,id:`control-2`,className:`blue-btn`,"data-action":`togglePhase`,onClick:t=>{e.current?.handlers.togglePhase?.(`blue`)},children:`Blaue Phase ein/aus`})]}),(0,o.jsx)(`canvas`,{id:`phaseCanvas`,width:`800`,height:`400`})]})}var c=s;export{c as component};