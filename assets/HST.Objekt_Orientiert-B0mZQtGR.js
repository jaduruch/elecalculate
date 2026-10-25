import{o as e}from"./matchContext-DAqmlEzK.js";import{f as t,m as n,p as r,t as i}from"./shared-VEyeTWJO.js";import{t as a}from"./chevron-V27U5W9E.js";function o(e){let{document:t,window:a,MathJax:o,requestAnimationFrame:s,cancelAnimationFrame:c,setTimeout:l,clearTimeout:u,setInterval:d,clearInterval:f}=e,{changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S}=i(e);function C(e){e.parentElement.classList.toggle(`open`)}return{handlers:{toggleDropdown:C,changeSlide:p,showSlides:m,formatPrefixNoUnit:h,formatPrefixNoUnitSquare:g,formatWithPrefix:_,formatWithPrefixsquare:v,getlg:y,drawCurveDynamic:b,getBestSIPrefix:x,formatWithSIPrefix:S,parseInput:r,parseInputsquare:n},dispose(){}}}var s=e();function c(){let e=t(o);return(0,s.jsxs)(s.Fragment,{children:[e.restoring&&(0,s.jsx)(`p`,{className:`notebook-loading`,role:`status`,children:`Gespeicherte Eingaben werden geladen…`}),(0,s.jsxs)(`div`,{ref:e.root,inert:e.restoring,"aria-busy":e.restoring||void 0,"data-restoring":e.restoring?`true`:`false`,"data-ready":e.ready?`true`:void 0,className:`page-body `,children:[(0,s.jsx)(`style`,{children:`@layer source { @scope (.page-body) {

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
    
} }`}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`br`,{}),(0,s.jsx)(`h1`,{children:`Objekt Orientiertes Programmieren`})]}),(0,s.jsx)(`div`,{children:`
                Die Code Beispiele sind alle in der Sprache C++
            `}),(0,s.jsx)(`br`,{}),(0,s.jsxs)(`div`,{className:`dropdown-container`,children:[(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-0`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                    Erklärung Begriffe
                    `,(0,s.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,s.jsx)(a,{direction:`down`})})]}),(0,s.jsx)(`div`,{className:`dropdown-content`,children:(0,s.jsx)(`table`,{tabIndex:0,"aria-label":`Tabelle: Objekt Orientiertes Programmieren`,children:(0,s.jsxs)(`tbody`,{children:[(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`th`,{children:`Begriff`}),(0,s.jsx)(`th`,{children:`Beschreibung`})]}),(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{children:`Initialisieren`}),(0,s.jsxs)(`td`,{children:[`Einen Anfangswert in den Attributen speichern`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`code`,{children:`int x = 5;`})]})]}),(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{children:`Instanziieren`}),(0,s.jsxs)(`td`,{children:[`Ein neues Objekt im RAM erstellen`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`code`,{children:`MeineKlasse obj;`})]})]}),(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{children:`Attribute erstellen`}),(0,s.jsxs)(`td`,{children:[`Die Datenstruktur in einer Klasse festlegen`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsxs)(`code`,{children:[`class MeineKlasse {`,(0,s.jsx)(`br`,{}),`
                                    \xA0\xA0int zahl;`,(0,s.jsx)(`br`,{}),`
                                };`]})]})]}),(0,s.jsxs)(`tr`,{children:[(0,s.jsx)(`td`,{children:`Datenkapselung`}),(0,s.jsxs)(`td`,{children:[`Das Verbergen von Implementierungsdetails`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsxs)(`code`,{children:[`class MeineKlasse {`,(0,s.jsx)(`br`,{}),`
                                    \xA0\xA0private:`,(0,s.jsx)(`br`,{}),`
                                    \xA0\xA0\xA0\xA0int geheim;`,(0,s.jsx)(`br`,{}),`
                                    \xA0\xA0public:`,(0,s.jsx)(`br`,{}),`
                                    \xA0\xA0\xA0\xA0void setGeheim(int g) { geheim = g; }`,(0,s.jsx)(`br`,{}),`
                                };`]})]})]})]})})})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsx)(`div`,{className:`dropdown`}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-1`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                    Variablen definieren
                    `,(0,s.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,s.jsx)(a,{direction:`down`})})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsx)(`p`,{children:`Variablen in Klassen:`}),(0,s.jsxs)(`code`,{children:[(0,s.jsx)(`span`,{className:`keyword`,children:`public`}),`:`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{className:`type`,children:`double`}),` spannungUF;`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{className:`type`,children:`double`}),` stromIF;`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{className:`error`,children:`x`}),(0,s.jsx)(`span`,{className:`keyword`,children:`public`}),(0,s.jsx)(`span`,{className:`type`,children:`double`}),` spannungUF;`,(0,s.jsx)(`br`,{})]})]})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-2`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                    Konstruktor
                    `,(0,s.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,s.jsx)(a,{direction:`down`})})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsxs)(`p`,{children:[`Um den Konstruktor vollständig zu Programmierenmuss jedem Attribut `,(0,s.jsx)(`br`,{}),`(aus dem Klassendiagramm) ein Wert zugeordnet werden.`]}),(0,s.jsxs)(`code`,{children:[(0,s.jsx)(`span`,{className:`function`,children:`Klassenname`}),`::`,(0,s.jsx)(`span`,{className:`string`,children:`Klassenname`}),`
                    (`,(0,s.jsx)(`span`,{className:`type`,children:`double`}),` vorwaertsspannung, `,(0,s.jsx)(`span`,{className:`type`,children:`double`}),` vorwaertsstrom)`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{className:`bracket`,children:`{`}),(0,s.jsx)(`br`,{}),`
                    \xA0\xA0 spannungUF = vorwaertsspannung;`,(0,s.jsx)(`br`,{}),`
                    \xA0\xA0 stromIF = vorwaertsstrom;`,(0,s.jsx)(`br`,{}),(0,s.jsx)(`span`,{className:`bracket`,children:`}`})]})]})]}),(0,s.jsx)(`div`,{className:`divider`}),(0,s.jsxs)(`div`,{className:`dropdown`,children:[(0,s.jsxs)(`button`,{disabled:!e.ready,type:`button`,"aria-expanded":`false`,id:`control-3`,className:`dropdown-header`,"data-action":`toggleDropdown`,onClick:t=>{e.current?.invoke?.(`toggleDropdown`,t.currentTarget,t.currentTarget)},children:[`
                    Objekte erzeugen (Instanzieren)
                    `,(0,s.jsx)(`span`,{className:`arrow`,"aria-hidden":`true`,children:(0,s.jsx)(a,{direction:`down`})})]}),(0,s.jsxs)(`div`,{className:`dropdown-content`,children:[(0,s.jsx)(`p`,{children:`So wird ein Objekt erzeugt:`}),(0,s.jsxs)(`code`,{children:[(0,s.jsx)(`span`,{className:`function`,children:`Klassenname`}),(0,s.jsx)(`span`,{className:`string`,children:`Objektname`}),(0,s.jsx)(`span`,{className:`bracket`,children:`(`}),(0,s.jsx)(`span`,{className:`type`,children:`übergabeparameter`}),(0,s.jsx)(`span`,{className:`bracket`,children:`)`})]}),(0,s.jsx)(`p`,{children:`So wird der Wert aus dem Objekt ausgelesen und einer Variable übergeben:`}),(0,s.jsxs)(`code`,{children:[(0,s.jsx)(`span`,{className:`type`,children:`datentyp`}),` variabelnname = `,(0,s.jsx)(`span`,{className:`keyword`,children:`Objektname`}),`.`,(0,s.jsx)(`span`,{className:`string`,children:`funktionsname`}),(0,s.jsx)(`span`,{className:`bracket`,children:`()`}),`;
                    `]})]})]}),(0,s.jsx)(`div`,{className:`divider`})]})]})]})}var l=c;export{l as component};