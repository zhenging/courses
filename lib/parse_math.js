"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utility_1 = require("./utility");
let katex;
const katexOptions = {
  throwOnError: true,
  macros: {
    '\\bi': '\\leftrightarrow',
    '\\Bi': '\\Leftrightarrow',
    '\\d': '\\displaystyle',
    '\\dint': '\\displaystyle \\int',
    '\\dlim': '\\lim\\limits',
    '\\ges': '\\geqslant',
    '\\les': '\\leqslant',
    '\\ihat': '\\hat{i}',
    '\\jhat': '\\hat{j}',
    '\\khat': '\\hat{k}',
    '\\la': '\\langle',
    '\\ra': '\\rangle',
    '\\lb': '\\lbrack',
    '\\rb': '\\rbrack',
    '\\lm': '\\lambda',
    '\\th': '\\theta',
    '\\To': '\\Rightarrow'
  }
};
/**
 *
 * @param content the math expression
 * @param openTag the open tag, eg: '\('
 * @param closeTag the close tag, eg: '\)'
 * @param displayMode whether to be rendered in display mode
 * @param renderingOption the math engine to use: KaTeX | MathJax | None
 */
exports.default = ({ content, openTag, closeTag, displayMode = false, renderingOption, }) => {
    if (!content) {
        return "";
    }
    if (renderingOption === "KaTeX") {
        try {
            if (!katex) {
                katex = require(path.resolve(utility_1.extensionDirectoryPath, "./dependencies/katex/katex.min.js"));
            }
            katexOptions.displayMode = displayMode;
            return katex.renderToString(content, katexOptions);
        }
        catch (error) {
            return `<span style=\"color: #ee7f49; font-weight: 500;\">${error.toString()}</span>`;
        }
    }
    else if (renderingOption === "MathJax") {
        const text = (openTag + content + closeTag).replace(/\n/g, " ");
        const tag = displayMode ? "div" : "span";
        return `<${tag} class="mathjax-exps">${utility_1.escapeString(text)}</${tag}>`;
    }
    else {
        return "";
    }
};
//# sourceMappingURL=parse-math.js.map
