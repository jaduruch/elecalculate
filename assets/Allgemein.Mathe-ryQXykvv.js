import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,r as i,t as a}from"./shared-CQ-439nf.js";function o(e){let{document:n,window:o,MathJax:s,requestAnimationFrame:c,cancelAnimationFrame:l,setTimeout:u,clearTimeout:d,setInterval:f,clearInterval:p}=e,{changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C}=a(e);function w(e){e.parentElement.classList.toggle(`open`)}function T(){let e=``,a=n.getElementById(`A`).value,o=n.getElementById(`d`).value;a&&!o&&(e+=`
                    Leiterdurchmesser d = 
                    &radic;(<div class ="fraction">
                        <span class="fraction-numerator">4 &lowast; A</span><br>
                        <span>&pi;</span>
                    </div>) 
                =
                    &radic;(<div class ="fraction">
                        <span class="fraction-numerator">4 &lowast; ${a}m<sup>2</sup> </span><br>
                        <span>&pi;</span>
                    </div>)
                = ${v((4*r(a)/Math.PI)**.5,`m`)}<br>`),o&&!a&&(e+=`
                    Fl&auml;che A = 
                    <div class ="fraction">
                        <span class="fraction-numerator">&pi; &lowast; d<sup>2</sup></span><br>
                        <span>4</span>
                    </div> 
                =
                    <div class ="fraction">
                        <span class="fraction-numerator">&pi; &lowast; (${o}m)<sup>2</sup> </span><br>
                        <span>4</span>
                    </div> 
                = ${y(Math.PI*t(o)**2/4,`m<sup>2</sup>`)}<br>`),i(n.getElementById(`result_Kreis`),e)}return{handlers:{toggleDropdown:w,calculateKreis:T,changeSlide:m,showSlides:h,formatPrefixNoUnit:g,formatPrefixNoUnitSquare:_,formatWithPrefix:v,formatWithPrefixsquare:y,getlg:b,drawCurveDynamic:x,getBestSIPrefix:S,formatWithSIPrefix:C,parseInput:t,parseInputsquare:r},dispose(){}}}var s=e();function c(){let e=n(o);return(0,s.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

} }`}),(0,s.jsx)(`div`,{children:(0,s.jsxs)(`h1`,{children:[(0,s.jsx)(`br`,{}),`Mathe`]})}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Kreisberechnung`,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`div`,{className:`comment`,children:[`
                                Werte mit Massvorsatz eingeben z.B. d = 5mm → Eingabe: 5m (nicht 5mm)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Fläche A`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Flaeche)`},type:`text`,"aria-label":`Fläche A`,id:`A`}),(0,s.jsxs)(`label`,{children:[`m`,(0,s.jsx)(`sup`,{children:`2`}),` [Quadratmeter]`]})]}),(0,s.jsxs)(`div`,{className:`form-row`,children:[(0,s.jsx)(`label`,{children:`Durchmesser d`}),(0,s.jsx)(`input`,{style:{borderColor:`var(--Laenge)`},type:`text`,"aria-label":`Durchmesser d`,id:`d`}),(0,s.jsx)(`label`,{children:`m [meter]`})]}),(0,s.jsx)(`input`,{type:`button`,defaultValue:`Berechnen`,className:`Button_Berechnen`,"data-action":`calculateKreis`,onClick:t=>{e.current?.handlers.calculateKreis?.()}}),(0,s.jsx)(`h3`,{children:`Berechnete Ergebnisse`}),(0,s.jsx)(`p`,{id:`result_Kreis`,"aria-live":`polite`})]})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{type:`button`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        Dreiecksberechnung `,(0,s.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:` 
                        Development in progress
                    `})]})]}),(0,s.jsx)(`br`,{})]})}var l=c;export{l as component};