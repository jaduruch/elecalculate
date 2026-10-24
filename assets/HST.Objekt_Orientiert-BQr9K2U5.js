import{t as e}from"./jsx-runtime-C3cWAN_r.js";import{a as t,i as n,o as r,t as i}from"./shared-B_jRmEqB.js";function a(e){let{document:n,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e);function C(e){e.parentElement.classList.toggle(`open`)}return{handlers:{toggleDropdown:C,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:t,parseInputsquare:r},dispose(){}}}var o=e();function s(){let e=n(a);return(0,o.jsxs)(`div`,{ref:e.root,className:`page-body `,children:[(0,o.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

        /* Lokales Syntax-Highlighting für C++ */
        code {
            font-family: Consolas, monospace;
            background-color: #1e1e1e;
            color: #f8f8f2;
            padding: 0.5em;
            display: block;
            border-radius: 5px;
            overflow-x: auto;
            text-align: left;
        }

        .keyword {
            color: #569cd6;
        }

        .type {
            color: #4ec9b0;
        }

        .function {
            color: #dcdcaa;
        }

        .string {
            color: #ce9178;
        }

        .bracket {
            color: #ffd000;
        }

        .error{
            color: red;
        }

        .comment {
            color: #6a9955;
            font-style: italic;
        }
    
} }`}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`br`,{}),(0,o.jsx)(`h1`,{children:`Objekt Orientiertes Programmieren`})]}),(0,o.jsx)(`div`,{children:`
                Die Code Beispiele sind alle in der Sprache C++
            `}),(0,o.jsx)(`br`,{}),(0,o.jsxs)(`div`,{className:`dropdown-container`,children:[(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                    Erklärung Begriffe
                    `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsx)(`div`,{className:`dropdown-content`,children:(0,o.jsx)(`table`,{children:(0,o.jsxs)(`tbody`,{children:[(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`th`,{children:`Begriff`}),(0,o.jsx)(`th`,{children:`Beschreibung`})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Initialisieren`}),(0,o.jsxs)(`td`,{children:[`Einen Anfangswert in den Attributen speichern`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`code`,{children:`int x = 5;`})]})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Instanziieren`}),(0,o.jsxs)(`td`,{children:[`Ein neues Objekt im RAM erstellen`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`code`,{children:`MeineKlasse obj;`})]})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Attribute erstellen`}),(0,o.jsxs)(`td`,{children:[`Die Datenstruktur in einer Klasse festlegen`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsxs)(`code`,{children:[`class MeineKlasse {`,(0,o.jsx)(`br`,{}),`
                                    \xA0\xA0int zahl;`,(0,o.jsx)(`br`,{}),`
                                };`]})]})]}),(0,o.jsxs)(`tr`,{children:[(0,o.jsx)(`td`,{children:`Datenkapselung`}),(0,o.jsxs)(`td`,{children:[`Das Verbergen von Implementierungsdetails`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsxs)(`code`,{children:[`class MeineKlasse {`,(0,o.jsx)(`br`,{}),`
                                    \xA0\xA0private:`,(0,o.jsx)(`br`,{}),`
                                    \xA0\xA0\xA0\xA0int geheim;`,(0,o.jsx)(`br`,{}),`
                                    \xA0\xA0public:`,(0,o.jsx)(`br`,{}),`
                                    \xA0\xA0\xA0\xA0void setGeheim(int g) { geheim = g; }`,(0,o.jsx)(`br`,{}),`
                                };`]})]})]})]})})})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsx)(`div`,{className:`dropdown`}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                    Variablen definieren
                    `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsx)(`p`,{children:`Variablen in Klassen:`}),(0,o.jsxs)(`code`,{children:[(0,o.jsx)(`span`,{className:`keyword`,children:`public`}),`:`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`type`,children:`double`}),` spannungUF;`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`type`,children:`double`}),` stromIF;`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`error`,children:`x`}),(0,o.jsx)(`span`,{className:`keyword`,children:`public`}),(0,o.jsx)(`span`,{className:`type`,children:`double`}),` spannungUF;`,(0,o.jsx)(`br`,{})]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                    Konstruktor
                    `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsxs)(`p`,{children:[`Um den Konstruktor vollständig zu Programmierenmuss jedem Attribut `,(0,o.jsx)(`br`,{}),`(aus dem Klassendiagramm) ein Wert zugeordnet werden.`]}),(0,o.jsxs)(`code`,{children:[(0,o.jsx)(`span`,{className:`function`,children:`Klassenname`}),`::`,(0,o.jsx)(`span`,{className:`string`,children:`Klassenname`}),`
                    (`,(0,o.jsx)(`span`,{className:`type`,children:`double`}),` vorwaertsspannung, `,(0,o.jsx)(`span`,{className:`type`,children:`double`}),` vorwaertsstrom)`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`bracket`,children:`{`}),(0,o.jsx)(`br`,{}),`
                    \xA0\xA0 spannungUF = vorwaertsspannung;`,(0,o.jsx)(`br`,{}),`
                    \xA0\xA0 stromIF = vorwaertsstrom;`,(0,o.jsx)(`br`,{}),(0,o.jsx)(`span`,{className:`bracket`,children:`}`})]})]})]}),(0,o.jsx)(`div`,{className:`divider`}),(0,o.jsxs)(`div`,{className:`dropdown`,children:[(0,o.jsxs)(`button`,{type:`button`,id:`control-3`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.handlers.toggleDropdown?.(t.currentTarget)},children:[`
                    Objekte erzeugen (Instanzieren)
                    `,(0,o.jsx)(`span`,{className:`arrow`,children:`▼`})]}),(0,o.jsxs)(`div`,{className:`dropdown-content`,children:[(0,o.jsx)(`p`,{children:`So wird ein Objekt erzeugt:`}),(0,o.jsxs)(`code`,{children:[(0,o.jsx)(`span`,{className:`function`,children:`Klassenname`}),(0,o.jsx)(`span`,{className:`string`,children:`Objektname`}),(0,o.jsx)(`span`,{className:`bracket`,children:`(`}),(0,o.jsx)(`span`,{className:`type`,children:`übergabeparameter`}),(0,o.jsx)(`span`,{className:`bracket`,children:`)`})]}),(0,o.jsx)(`p`,{children:`So wird der Wert aus dem Objekt ausgelesen und einer Variable übergeben:`}),(0,o.jsxs)(`code`,{children:[(0,o.jsx)(`span`,{className:`type`,children:`datentyp`}),` variabelnname = `,(0,o.jsx)(`span`,{className:`keyword`,children:`Objektname`}),`.`,(0,o.jsx)(`span`,{className:`string`,children:`funktionsname`}),(0,o.jsx)(`span`,{className:`bracket`,children:`()`}),`;
                    `]})]})]}),(0,o.jsx)(`div`,{className:`divider`})]})]})}var c=s;export{c as component};