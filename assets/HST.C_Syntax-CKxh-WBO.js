import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,t as i}from"./shared-CQ-439nf.js";function a(e){let{document:n,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e);function C(e){let t=e.closest(`.code-block`).innerText,r=n.createElement(`textarea`);r.value=t,n.body.appendChild(r),r.select(),n.execCommand(`copy`),n.body.removeChild(r)}function w(e){e.parentElement.classList.toggle(`open`)}return{handlers:{copyToClipboard:C,toggleDropdown:w,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var o=e();function s(){let e=n(a);return(0,o.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,o.jsx)(`style`,{children:`@layer source { @scope (.page-body) {


        /* Code-Block Styling */
        .code-block {
            position: relative;
            background-color: #222;
            color: #fff;
            font-family: "Courier New", monospace;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            overflow-x: auto;
            white-space: nowrap;
            text-align: left;
        }

        /* Kopiersymbol oben rechts im Codeblock */
        .copy-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            font-size: 18px;
            cursor: pointer;
        }

        /* Hover-Effekt für das Kopiersymbol */
        .copy-icon:hover {
            color: #aaaaaa;
        }

        /* Syntax-Highlighting */
        .code-keyword {
            color: orange;
        }

        .code-condition {
            color: white;
        }

        .code-comment {
            color: #6a9955;
        }

        .code-brace {
            color: #00aaff;
        }

        .explanation {
            margin-top: 10px;
            color: #ffffff;
        }
    
} }`}),(0,o.jsx)(`div`,{children:(0,o.jsxs)(`h1`,{children:[(0,o.jsx)(`br`,{}),`C Syntax`]})}),(0,o.jsxs)(`div`,{className:`dropdown-container`,children:[(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        if / else
                        `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`span`,{className:`code-keyword`,children:`if`}),(0,o.jsx)(`span`,{className:`code-condition`,children:`(condition)`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`{`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// Code für wahr`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`}`}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`else`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`{`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// Code für falsch`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`}`})]}),(0,o.jsxs)(`div`,{className:`explanation`,children:[(0,o.jsx)(`strong`,{children:`Erklärung:`}),` Mit `,(0,o.jsx)(`code`,{children:`if`}),` wird ein Block nur ausgeführt, wenn die Bedingung wahr ist. Andernfalls wird `,(0,o.jsx)(`code`,{children:`else`}),` ausgeführt.
                        `]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        switch case
                        `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`span`,{className:`code-keyword`,children:`switch`}),(0,o.jsx)(`span`,{className:`code-condition`,children:`(variable)`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`{`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`case`}),` value1:`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// Code für value1`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`break`}),`;`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`case`}),` value2:`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// Code für value2`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`break`}),`;`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-keyword`,children:`default`}),`:`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// Code für alle anderen Werte`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`}`})]}),(0,o.jsxs)(`div`,{className:`explanation`,children:[(0,o.jsx)(`strong`,{children:`Erklärung:`}),(0,o.jsx)(`code`,{children:`switch`}),` prüft eine Variable gegen verschiedene Werte. Das passende `,(0,o.jsx)(`code`,{children:`case`}),` wird ausgeführt. `,(0,o.jsx)(`br`,{}),`
                            Wird das `,(0,o.jsx)(`code`,{children:`break`}),` weggelassen werden alle nochfolgenden cases auch ausgeführt.
                        `]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        for
                        `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`span`,{className:`code-keyword`,children:`for`}),(0,o.jsx)(`span`,{className:`code-condition`,children:`(int i = 0; i <= 10; i++)`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`{`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-comment`,children:`// i beträgt: 0,1,2,3,4,5,6,7,8,9,10`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`}`})]}),(0,o.jsxs)(`div`,{className:`explanation`,children:[(0,o.jsx)(`strong`,{children:`Erklärung:`}),(0,o.jsx)(`code`,{children:`int i = 0`}),` erstelle eine Lokale Variable, `,(0,o.jsx)(`code`,{children:`i <= 10`}),` ist der Endwert, `,(0,o.jsx)(`code`,{children:`i++`}),` Zählt i bei jedem durchgang eins hoch.
                        `]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-3`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        enum
                        `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`div`,{className:`code-block`,children:[(0,o.jsx)(`span`,{className:`code-keyword`,children:`enum`}),(0,o.jsx)(`span`,{className:`code-condition`,children:` enumname`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`{`}),(0,o.jsx)(`br`,{}),`
                                \xA0\xA0Mo;\xA0`,(0,o.jsx)(`span`,{className:`code-comment`,children:`// der erste Name hat den Wert 0`}),(0,o.jsx)(`br`,{}),`
                                \xA0\xA0Di;\xA0`,(0,o.jsx)(`span`,{className:`code-comment`,children:`// der zweite Name hat den Wert 1`}),(0,o.jsx)(`br`,{}),`
                                \xA0\xA0Do = `,(0,o.jsx)(`span`,{className:`code-keyword`,children:`3`}),`;\xA0`,(0,o.jsx)(`span`,{className:`code-comment`,children:`// diesem Namen wird der Wert 3 zugeordet`}),(0,o.jsx)(`br`,{}),`
                                \xA0\xA0Fr;\xA0`,(0,o.jsx)(`span`,{className:`code-comment`,children:`// dieser Name hat den Wert 4`}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`code-brace`,children:`}`})]}),(0,o.jsxs)(`div`,{className:`explanation`,children:[(0,o.jsx)(`strong`,{children:`Erklärung:`}),` Mit einem `,(0,o.jsx)(`code`,{children:`enum`}),` (kurz für enumeration) können mehrere defines auf einmal gemacht werden ohne das jedem seperat ein Wert zugeortnet werden muss.
                        `]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-4`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                        ternärer operator (if/else auf einer Zeile)
                        `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`div`,{className:`code-block`,children:[`
                            a == 3 ? `,(0,o.jsx)(`span`,{className:`code-comment`,children:`/*a ist gleich 3*/`}),`:`,(0,o.jsx)(`span`,{className:`code-comment`,children:`/*a ist nicht gleich 3*/`}),`;
                            `]}),(0,o.jsxs)(`div`,{className:`explanation`,children:[(0,o.jsx)(`strong`,{children:`Erklärung:`}),` Der ternärer operator ist wie ein `,(0,o.jsx)(`code`,{children:`if else`}),` auf einer Zeile, ist die Bedinung war wird der erste Befehl ausgeführt ansonsten der zweite Befehl.
                        `]})]})]}),(0,o.jsx)(`div`,{className:`divider`})]})]})}var c=s;export{c as component};