"use strict";

// POLYFILL
// Source: polyfill.io

const _matches = () => {
    Element.prototype.matches = Element.prototype.webkitMatchesSelector
        || Element.prototype.oMatchesSelector
        || Element.prototype.msMatchesSelector
        || Element.prototype.mozMatchesSelector
        || function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;

            while (elements[index] && elements[index] !== element) {
                ++index;
            }

            return !!elements[index];
        }
}

const _closest = () => {
    Element.prototype.closest = function closest(selector) {
        var node = this;

        while (node) {
            if (node.matches(selector)) return node;
            else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
        }

        return null;
    }
}

const _nodeListForEach = () => {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

const _remove = () => {
    Document.prototype.remove = Element.prototype.remove = function remove() {
        if (this.parentNode)
            this.parentNode.removeChild(this);
    }
}

export const initializePolyfill = () => {
    // Matches
    if (!('document' in self && "matches" in document.documentElement))
        _matches();

    // Closest
    if (!('document' in self && "closest" in document.documentElement))
        _closest();

    // NodeList forEach
    if (!('forEach' in NodeList.prototype))
        _nodeListForEach();

    // Remove
    if (!('Element' in self && 'remove' in Element.prototype))
        _remove();
}
