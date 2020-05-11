"use strict";

// COLLAPSE

// Transition timeout in milliseconds.
const transitionTimeout = 200;

// Defines the delay of closing unified accordion items after
// opening current item.
// -> This delay must be shorter than transitionTimeout.
const accordionHideDelay = 50;

const cssClasses = {
    VISIBLE: 'is-visible',
    ACTIVE: 'is-active',
    COLLAPSING: 'collapsing'
}

const triggerNames = {
    COLLAPSE: 'collapse',
    TAB: 'tab'
}

const dataAttr = {
    TRIGGER: 'trigger',
    TARGET: 'target',
    UNIFY: 'unify'
}

const TRIGGER_COLLAPSE = '[data-' + dataAttr.TRIGGER + '="' + triggerNames.COLLAPSE + '"]';
const TRIGGER_TAB = '[data-' + dataAttr.TRIGGER + '="' + triggerNames.TAB + '"]';

const show = (el, anim) => {
    // If animation is disabled, only add is-visible class.
    if (!anim) {
        el.classList.add(cssClasses.VISIBLE);
        return;
    }

    el.classList.add(cssClasses.COLLAPSING);

    el.style.height = el.scrollHeight + 'px';

    setTimeout(() => {
        el.classList.remove(cssClasses.COLLAPSING);
        el.classList.add(cssClasses.VISIBLE);

        el.style.removeProperty('height');
    }, transitionTimeout);
}

const hide = (el, anim) => {
    // If animation is disabled, only remove is-visible class.
    if (!anim) {
        el.classList.remove(cssClasses.VISIBLE);
        return;
    }

    el.style.height = el.scrollHeight + 'px';

    el.offsetHeight; // reflow element

    el.classList.remove(cssClasses.VISIBLE);
    el.classList.add(cssClasses.COLLAPSING);

    el.style.removeProperty('height');

    setTimeout(() => {
        el.classList.remove(cssClasses.COLLAPSING);
    }, transitionTimeout);
}

const onClick = evt => {
    let btn = evt.target.closest(TRIGGER_COLLAPSE) || evt.target.closest(TRIGGER_TAB);

    if (!btn)
        return;

    // Prevent link behaviour of trigger button.
    if (btn.hasAttribute('href'))
        evt.preventDefault();

    // Get trigger type.
    let tab = btn.dataset[dataAttr.TRIGGER] === triggerNames.TAB;

    // Find all collapsibles defined in data-collapse-target attribute.
    let collapsibles = evt.currentTarget.querySelectorAll(btn.dataset[dataAttr.TARGET] || btn.getAttribute('href'));

    // If accordion is unified, find all its elements and close all
    // visible collapsible items.
    let unified = evt.currentTarget.querySelectorAll(btn.dataset[dataAttr.UNIFY]);

    unified.forEach(el => {
        // Ignore items that should be expanded by current trigger.
        if ([].indexOf.call(collapsibles, el) !== -1)
            return;

        if (!el.classList.contains(cssClasses.COLLAPSING) && el.classList.contains(cssClasses.VISIBLE))
            tab ? hide(el, false) : setTimeout(() => hide(el, true), accordionHideDelay);
    });

    let thisExpanded = true;

    collapsibles.forEach(el => {
        // Prevent creating a new animation if current is not finished yet.
        if (el.classList.contains(cssClasses.COLLAPSING))
            return;

        // Toggle collapse.
        if (el.classList.contains(cssClasses.VISIBLE)) {
            if (tab) return;

            hide(el, !tab);
            thisExpanded = false;
        } else {
            show(el, !tab);
            thisExpanded = true;
        }
    });

    // Find all buttons in this collapse.
    let unifiedButtons = evt.currentTarget.querySelectorAll('[data-' + dataAttr.UNIFY + '="' + btn.dataset[dataAttr.UNIFY] + '"]');

    unifiedButtons.forEach(el => {
        // Ignore current button.
        if (el === btn)
            return;

        // Remove active class and set aria-expanded="false" for all
        // other buttons in this collapse.
        el.classList.remove(cssClasses.ACTIVE);
        el.setAttribute('aria-expanded', false);
    });

    // Set active class and aria-expanded according to current collapse state.
    thisExpanded ? btn.classList.add(cssClasses.ACTIVE) : btn.classList.remove(cssClasses.ACTIVE);
    btn.setAttribute('aria-expanded', thisExpanded);
}

export const initializeCollapse = element => {
    // Add event listener for collapse toggle buttons.
    element.addEventListener('click', onClick);
}
