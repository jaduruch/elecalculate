import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-B_jRmEqB.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e),w={E3:[1,2.2,4.7],E6:[1,1.5,2.2,3.3,4.7,6.8],E12:[1,1.2,1.5,1.8,2.2,2.7,3.3,3.9,4.7,5.6,6.8,8.2],E24:[1,1.1,1.2,1.3,1.5,1.6,1.8,2,2.2,2.4,2.7,3,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1],E48:[1,1.05,1.1,1.15,1.21,1.27,1.33,1.4,1.47,1.54,1.62,1.69,1.78,1.87,1.96,2.05,2.15,2.26,2.37,2.49,2.61,2.74,2.87,3.01,3.16,3.32,3.48,3.65,3.83,4.02,4.22,4.42,4.64,4.87,5.11,5.36,5.62,5.9,6.19,6.49,6.81,7.15,7.5,7.87,8.25,8.66,9.09,9.53],E96:[1,1.02,1.05,1.07,1.1,1.13,1.15,1.18,1.21,1.24,1.27,1.3,1.33,1.37,1.4,1.43,1.47,1.5,1.54,1.58,1.62,1.65,1.69,1.74,1.78,1.82,1.87,1.91,1.96,2,2.05,2.1,2.15,2.21,2.26,2.32,2.37,2.43,2.49,2.55,2.61,2.67,2.74,2.8,2.87,2.94,3.01,3.09,3.16,3.24,3.32,3.4,3.48,3.57,3.65,3.74,3.83,3.92,4.02,4.12,4.22,4.32,4.42,4.53,4.64,4.75,4.87,4.99,5.11,5.23,5.36,5.49,5.62,5.76,5.9,6.04,6.19,6.34,6.49,6.65,6.81,6.98,7.15,7.32,7.5,7.69,7.87,8.06,8.25,8.45,8.66,8.87,9.09,9.31,9.53,9.76]};function T(){let e=n.getElementById(`eReiheSelect`).value,t=n.getElementById(`eReiheTable`).getElementsByTagName(`tbody`)[0];i(t,``);let r=w[e];for(let e=0;e<r.length;e+=6){let i=n.createElement(`tr`);for(let t=0;t<6;t++){let n=i.insertCell(t);n.innerText=r[e+t]===void 0?``:r[e+t]}t.appendChild(i)}}return T(),{handlers:{updateTable:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        table {
            border-collapse: collapse;
            /*width: 100%;*/
            margin-top: 20px;
        }
        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: black;
            text-decoration: underline;
            color: white;
            font-size: 1.2em;
        }
        select {
            padding: 10px;
            font-size: 1em;
            margin: 20px;
            border-radius: 4px;
        }
        label {
            font-weight: bold;
            font-size: 1.2em;
        }
       
    
} }`}),(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`E-Reihe`]}),(0,s.jsx)(`label`,{htmlFor:`eReiheSelect`,children:`E-Reihe Auswählen:`}),(0,s.jsxs)(`select`,{id:`eReiheSelect`,onChange:t=>{e.current?.handlers.updateTable?.()},children:[(0,s.jsx)(`option`,{value:`E3`,children:`E3`}),(0,s.jsx)(`option`,{value:`E6`,children:`E6`}),(0,s.jsx)(`option`,{value:`E12`,children:`E12`}),(0,s.jsx)(`option`,{value:`E24`,children:`E24`}),(0,s.jsx)(`option`,{value:`E48`,children:`E48`}),(0,s.jsx)(`option`,{value:`E96`,children:`E96`})]})]}),(0,s.jsx)(`div`,{id:`tableContainer`,children:(0,s.jsxs)(`table`,{style:{maxWidth:`80px`},id:`eReiheTable`,children:[(0,s.jsx)(`thead`,{children:(0,s.jsx)(`tr`,{children:(0,s.jsx)(`th`,{children:`Werte:`})})}),(0,s.jsx)(`tbody`,{})]})}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};