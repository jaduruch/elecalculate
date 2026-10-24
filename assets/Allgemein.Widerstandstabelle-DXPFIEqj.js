import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,t as i}from"./shared-D1EaDO0j.js";function a(e){let{document:n,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e);function C(e){n.querySelectorAll(`.dropdown-content`).forEach(t=>{t.id!==e&&(t.style.display=`none`)});let t=n.getElementById(e);t.style.display=t.style.display===`block`?`none`:`block`}n.querySelectorAll(`.dropdown-select`).forEach(e=>{e.addEventListener(`click`,function(e){e.stopPropagation();let t=this.nextElementSibling.id;C(t)})}),n.querySelectorAll(`.dropdown-content button`).forEach(e=>{e.addEventListener(`click`,function(e){e.stopPropagation();let t=this.getAttribute(`data-value`);this.parentElement.previousElementSibling.querySelector(`.color-box`),this.parentElement.id===`band1Dropdown`?(n.getElementById(`band1`).value=t,n.getElementById(`band1Select`).innerText=this.innerText):this.parentElement.id===`band2Dropdown`?(n.getElementById(`band2`).value=t,n.getElementById(`band2Select`).innerText=this.innerText):this.parentElement.id===`band3Dropdown`?(n.getElementById(`band3`).value=t,n.getElementById(`band3Select`).innerText=this.innerText):this.parentElement.id===`multiplierDropdown`?(n.getElementById(`multiplier`).value=t,n.getElementById(`multiplierSelect`).innerText=`Multiplikator: ${this.innerText}`):this.parentElement.id===`toleranceDropdown`&&(n.getElementById(`tolerance`).value=t,n.getElementById(`toleranceSelect`).innerText=`Toleranz: ±${parseFloat(t)*100}%`),w(),this.parentElement.style.display=`none`})});function w(){let e=parseInt(n.getElementById(`band1`).value,10),t=parseInt(n.getElementById(`band2`).value,10),r=parseInt(n.getElementById(`band3`).value,10),i=parseInt(n.getElementById(`multiplier`).value,10),a=parseFloat(n.getElementById(`tolerance`).value);if(!isNaN(e)&&!isNaN(t)){let o=r===-1||isNaN(r)?e*10+t:e*100+t*10+r;o*=i;let s=a*100;n.getElementById(`resistanceValue`).innerText=`Widerstand: ${o}Ω`,n.getElementById(`toleranceValue`).innerText=`Toleranz: ±${s}%`}}n.addEventListener(`click`,function(){n.querySelectorAll(`.dropdown-content`).forEach(e=>{e.style.display=`none`})}),n.querySelectorAll(`.dropdown-content`).forEach(e=>{e.addEventListener(`click`,function(e){e.stopPropagation()})});function T(){[`band1Dropdown`,`band2Dropdown`,`band3Dropdown`,`multiplierDropdown`,`toleranceDropdown`].forEach(e=>{let t=n.getElementById(e);t.style.display=`none`})}return T(),{handlers:{toggleDropdown:C,calculateResistance:w,initializeDropdowns:T,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var o=e();function s(){let e=n(a);return(0,o.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,o.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        .dropdown-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        .dropdown-container div {
            margin-bottom: 10px;
        }
        .dropdown-menus {
            display: flex;
            justify-content: space-around;
            width: 100%;
        }
        .dropdown {
            position: relative;
            display: inline-block;
        }
        .dropdown-select {
            background-color: white;
            color: black;
            border: 1px solid #ccc;
            padding: 5px;
            cursor: pointer;
            border-radius: 4px;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: white;
            color: black;
            border: 1px solid #ccc;
            z-index: 1;
            width: 120px;
            border-radius: 4px;
        }
        .dropdown-content div {
            padding: 5px;
            cursor: pointer;
        }
        .dropdown-content div:hover {
            filter: brightness(0.75);
        }
        .dropdown-content div.selected {
            background-color: lightgray;
        }
        .color-box {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 10px;
            border-radius: 4px;
            /*border-width: 2px;
            border-color:rgb(0, 37, 202);*/
        }
        #result {
            margin-top: 20px;
            text-align: center;
        }

        th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        }
        
        td {
        min-width: 80px; /* Replace 'value' with the desired minimum width */
        }

    
} }`}),(0,o.jsx)(`div`,{children:(0,o.jsxs)(`h1`,{children:[(0,o.jsx)(`br`,{}),`Widerstandstabelle`]})}),(0,o.jsx)(`table`,{style:{maxWidth:`150px`},children:(0,o.jsxs)(`tbody`,{children:[(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{children:`Farbe`}),(0,o.jsx)(`th`,{children:`Band 1`}),(0,o.jsx)(`th`,{children:`Band 2`}),(0,o.jsx)(`th`,{children:`Band 3`}),(0,o.jsx)(`th`,{children:`Multiplikator`}),(0,o.jsx)(`th`,{children:`Toleranz`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`black`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Schwarz`}),(0,o.jsx)(`td`,{children:`0`}),(0,o.jsx)(`td`,{children:`0`}),(0,o.jsx)(`td`,{children:`0`}),(0,o.jsx)(`td`,{children:`*1Ω`}),(0,o.jsx)(`td`,{})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(139, 72, 32)`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Braun`}),(0,o.jsx)(`td`,{children:`1`}),(0,o.jsx)(`td`,{children:`1`}),(0,o.jsx)(`td`,{children:`1`}),(0,o.jsx)(`td`,{children:`*10Ω`}),(0,o.jsx)(`td`,{children:`±1%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`red`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Rot`}),(0,o.jsx)(`td`,{children:`2`}),(0,o.jsx)(`td`,{children:`2`}),(0,o.jsx)(`td`,{children:`2`}),(0,o.jsx)(`td`,{children:`*100Ω`}),(0,o.jsx)(`td`,{children:`±2%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(255, 145, 0)`,color:`black`},children:[(0,o.jsx)(`td`,{children:`Orange`}),(0,o.jsx)(`td`,{children:`3`}),(0,o.jsx)(`td`,{children:`3`}),(0,o.jsx)(`td`,{children:`3`}),(0,o.jsx)(`td`,{children:`*1kΩ`}),(0,o.jsx)(`td`,{})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(255, 238, 0)`,color:`black`},children:[(0,o.jsx)(`td`,{children:`Gelb`}),(0,o.jsx)(`td`,{children:`4`}),(0,o.jsx)(`td`,{children:`4`}),(0,o.jsx)(`td`,{children:`4`}),(0,o.jsx)(`td`,{children:`*10kΩ`}),(0,o.jsx)(`td`,{})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(0, 182, 0)`,color:`rgb(0, 0, 0)`},children:[(0,o.jsx)(`td`,{children:`Grün`}),(0,o.jsx)(`td`,{children:`5`}),(0,o.jsx)(`td`,{children:`5`}),(0,o.jsx)(`td`,{children:`5`}),(0,o.jsx)(`td`,{children:`*100kΩ`}),(0,o.jsx)(`td`,{children:`±0.5%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(0, 37, 202)`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Blau`}),(0,o.jsx)(`td`,{children:`6`}),(0,o.jsx)(`td`,{children:`6`}),(0,o.jsx)(`td`,{children:`6`}),(0,o.jsx)(`td`,{children:`*1MΩ`}),(0,o.jsx)(`td`,{children:`±0.25%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(144, 0, 201)`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Violett`}),(0,o.jsx)(`td`,{children:`7`}),(0,o.jsx)(`td`,{children:`7`}),(0,o.jsx)(`td`,{children:`7`}),(0,o.jsx)(`td`,{children:`*10MΩ`}),(0,o.jsx)(`td`,{children:`±0.1%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`gray`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Grau`}),(0,o.jsx)(`td`,{children:`8`}),(0,o.jsx)(`td`,{children:`8`}),(0,o.jsx)(`td`,{children:`8`}),(0,o.jsx)(`td`,{children:`*100MΩ`}),(0,o.jsx)(`td`,{children:`±0.05%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`white`,color:`black`},children:[(0,o.jsx)(`td`,{children:`Weiß`}),(0,o.jsx)(`td`,{children:`9`}),(0,o.jsx)(`td`,{children:`9`}),(0,o.jsx)(`td`,{children:`9`}),(0,o.jsx)(`td`,{children:`*1GΩ`}),(0,o.jsx)(`td`,{})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`#b68a22`,color:`white`},children:[(0,o.jsx)(`td`,{children:`Gold`}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{children:`*0.1Ω`}),(0,o.jsx)(`td`,{children:`±5%`})]}),(0,o.jsxs)(`tr`,{style:{backgroundColor:`rgb(207, 207, 207)`,color:`black`},children:[(0,o.jsx)(`td`,{children:`Silber`}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{}),(0,o.jsx)(`td`,{children:`*0.01Ω`}),(0,o.jsx)(`td`,{children:`±10%`})]})]})}),(0,o.jsx)(`br`,{}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`band1Select`,className:`dropdown-select`,children:[(0,o.jsx)(`span`,{style:{backgroundColor:`black`},className:`color-box`}),`
                        Band 1
                    `]}),(0,o.jsxs)(`div`,{id:`band1Dropdown`,className:`dropdown-content`,children:[(0,o.jsx)(`button`,{style:{backgroundColor:`black`,color:`white`},type:`button`,id:`control-0`,"data-value":`0`,children:`Schwarz`}),(0,o.jsx)(`button`,{style:{backgroundColor:`brown`,color:`white`},type:`button`,id:`control-1`,"data-value":`1`,children:`Braun`}),(0,o.jsx)(`button`,{style:{backgroundColor:`red`,color:`white`},type:`button`,id:`control-2`,"data-value":`2`,children:`Rot`}),(0,o.jsx)(`button`,{style:{backgroundColor:`orange`,color:`black`},type:`button`,id:`control-3`,"data-value":`3`,children:`Orange`}),(0,o.jsx)(`button`,{style:{backgroundColor:`yellow`,color:`black`},type:`button`,id:`control-4`,"data-value":`4`,children:`Gelb`}),(0,o.jsx)(`button`,{style:{backgroundColor:`green`,color:`white`},type:`button`,id:`control-5`,"data-value":`5`,children:`Grün`}),(0,o.jsx)(`button`,{style:{backgroundColor:`blue`,color:`white`},type:`button`,id:`control-6`,"data-value":`6`,children:`Blau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`purple`,color:`white`},type:`button`,id:`control-7`,"data-value":`7`,children:`Violett`}),(0,o.jsx)(`button`,{style:{backgroundColor:`gray`,color:`white`},type:`button`,id:`control-8`,"data-value":`8`,children:`Grau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`white`,color:`black`},type:`button`,id:`control-9`,"data-value":`9`,children:`Weiss`})]})]}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`band2Select`,className:`dropdown-select`,children:[(0,o.jsx)(`span`,{style:{backgroundColor:`rgb(0, 0, 0)`},className:`color-box`}),`
                        Band 2
                    `]}),(0,o.jsxs)(`div`,{id:`band2Dropdown`,className:`dropdown-content`,children:[(0,o.jsx)(`button`,{style:{backgroundColor:`black`,color:`white`},type:`button`,id:`control-10`,"data-value":`0`,children:`Schwarz`}),(0,o.jsx)(`button`,{style:{backgroundColor:`brown`,color:`white`},type:`button`,id:`control-11`,"data-value":`1`,children:`Braun`}),(0,o.jsx)(`button`,{style:{backgroundColor:`red`,color:`white`},type:`button`,id:`control-12`,"data-value":`2`,children:`Rot`}),(0,o.jsx)(`button`,{style:{backgroundColor:`orange`,color:`black`},type:`button`,id:`control-13`,"data-value":`3`,children:`Orange`}),(0,o.jsx)(`button`,{style:{backgroundColor:`yellow`,color:`black`},type:`button`,id:`control-14`,"data-value":`4`,children:`Gelb`}),(0,o.jsx)(`button`,{style:{backgroundColor:`green`,color:`white`},type:`button`,id:`control-15`,"data-value":`5`,children:`Grün`}),(0,o.jsx)(`button`,{style:{backgroundColor:`blue`,color:`white`},type:`button`,id:`control-16`,"data-value":`6`,children:`Blau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`purple`,color:`white`},type:`button`,id:`control-17`,"data-value":`7`,children:`Violett`}),(0,o.jsx)(`button`,{style:{backgroundColor:`gray`,color:`white`},type:`button`,id:`control-18`,"data-value":`8`,children:`Grau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`white`,color:`black`},type:`button`,id:`control-19`,"data-value":`9`,children:`Weiss`})]})]}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`band3Select`,className:`dropdown-select`,children:[(0,o.jsx)(`span`,{style:{backgroundColor:`black`},className:`color-box`}),`
                        Band 3
                    `]}),(0,o.jsxs)(`div`,{id:`band3Dropdown`,className:`dropdown-content`,children:[(0,o.jsx)(`button`,{type:`button`,id:`control-20`,"data-value":`-1`,className:`no-selection`,children:`keine`}),(0,o.jsx)(`button`,{style:{backgroundColor:`black`,color:`white`},type:`button`,id:`control-21`,"data-value":`0`,children:`Schwarz`}),(0,o.jsx)(`button`,{style:{backgroundColor:`brown`,color:`white`},type:`button`,id:`control-22`,"data-value":`1`,children:`Braun`}),(0,o.jsx)(`button`,{style:{backgroundColor:`red`,color:`white`},type:`button`,id:`control-23`,"data-value":`2`,children:`Rot`}),(0,o.jsx)(`button`,{style:{backgroundColor:`orange`,color:`black`},type:`button`,id:`control-24`,"data-value":`3`,children:`Orange`}),(0,o.jsx)(`button`,{style:{backgroundColor:`yellow`,color:`black`},type:`button`,id:`control-25`,"data-value":`4`,children:`Gelb`}),(0,o.jsx)(`button`,{style:{backgroundColor:`green`,color:`white`},type:`button`,id:`control-26`,"data-value":`5`,children:`Grün`}),(0,o.jsx)(`button`,{style:{backgroundColor:`blue`,color:`white`},type:`button`,id:`control-27`,"data-value":`6`,children:`Blau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`purple`,color:`white`},type:`button`,id:`control-28`,"data-value":`7`,children:`Violett`}),(0,o.jsx)(`button`,{style:{backgroundColor:`gray`,color:`white`},type:`button`,id:`control-29`,"data-value":`8`,children:`Grau`}),(0,o.jsx)(`button`,{style:{backgroundColor:`white`,color:`black`},type:`button`,id:`control-30`,"data-value":`9`,children:`Weiss`})]})]}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsx)(`button`,{type:`button`,id:`multiplierSelect`,className:`dropdown-select`,children:`
                        Multiplikator
                    `}),(0,o.jsxs)(`div`,{id:`multiplierDropdown`,className:`dropdown-content`,children:[(0,o.jsx)(`button`,{style:{backgroundColor:`black`,color:`white`},type:`button`,id:`control-31`,"data-value":`1`,children:`*1Ω`}),(0,o.jsx)(`button`,{style:{backgroundColor:`brown`,color:`white`},type:`button`,id:`control-32`,"data-value":`10`,children:`*10Ω`}),(0,o.jsx)(`button`,{style:{backgroundColor:`red`,color:`white`},type:`button`,id:`control-33`,"data-value":`100`,children:`*100Ω`}),(0,o.jsx)(`button`,{style:{backgroundColor:`orange`,color:`black`},type:`button`,id:`control-34`,"data-value":`1000`,children:`*1kΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`yellow`,color:`black`},type:`button`,id:`control-35`,"data-value":`10000`,children:`*10kΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`green`,color:`white`},type:`button`,id:`control-36`,"data-value":`100000`,children:`*100kΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`blue`,color:`white`},type:`button`,id:`control-37`,"data-value":`1000000`,children:`*1MΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`purple`,color:`white`},type:`button`,id:`control-38`,"data-value":`10000000`,children:`*10MΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`gray`,color:`white`},type:`button`,id:`control-39`,"data-value":`100000000`,children:`*100MΩ`}),(0,o.jsx)(`button`,{style:{backgroundColor:`white`,color:`black`},type:`button`,id:`control-40`,"data-value":`1000000000`,children:`*1GΩ`})]})]}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsx)(`button`,{type:`button`,id:`toleranceSelect`,className:`dropdown-select`,children:`
                        Toleranz
                    `}),(0,o.jsxs)(`div`,{id:`toleranceDropdown`,className:`dropdown-content`,children:[(0,o.jsx)(`button`,{type:`button`,id:`control-41`,"data-value":`0.01`,children:`±1%`}),(0,o.jsx)(`button`,{type:`button`,id:`control-42`,"data-value":`0.02`,children:`±2%`}),(0,o.jsx)(`button`,{type:`button`,id:`control-43`,"data-value":`0.05`,children:`±5%`}),(0,o.jsx)(`button`,{type:`button`,id:`control-44`,"data-value":`0.1`,children:`±10%`}),(0,o.jsx)(`button`,{type:`button`,id:`control-45`,"data-value":`0.2`,children:`±20%`})]})]}),(0,o.jsx)(`input`,{type:`hidden`,id:`band1`,defaultValue:`0`}),(0,o.jsx)(`input`,{type:`hidden`,id:`band2`,defaultValue:`0`}),(0,o.jsx)(`input`,{type:`hidden`,id:`band3`,defaultValue:`-1`}),(0,o.jsx)(`input`,{type:`hidden`,id:`multiplier`,defaultValue:`1`}),(0,o.jsx)(`input`,{type:`hidden`,id:`tolerance`,defaultValue:`0`}),(0,o.jsxs)(`div`,{id:`result`,"aria-live":`polite`,children:[(0,o.jsx)(`p`,{id:`resistanceValue`,children:`Widerstand: 0Ω`}),(0,o.jsx)(`p`,{id:`toleranceValue`,children:`Toleranz: ±0%`})]})]})}var c=s;export{c as component};