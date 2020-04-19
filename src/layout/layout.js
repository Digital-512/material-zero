"use strict";

const cssClasses = {
    DRAWER: 'mz-layout-drawer',
    DRAWER_BUTTON: 'mz-layout-drawer-button',
    OBFUSCATOR: 'mz-layout-obfuscator',
    NO_SCROLLBAR: 'mz-no-scrollbar',
    IS_VISIBLE: 'is-visible'
}

const showDrawer = (body, el) => {
    body.classList.add(cssClasses.NO_SCROLLBAR);
    el._obfuscator.classList.add(cssClasses.IS_VISIBLE);
    el._drawer.classList.add(cssClasses.IS_VISIBLE);
    el._drawer.setAttribute('aria-hidden', 'false');
    el._drawer_button.setAttribute('aria-expanded', 'true');
}

const hideDrawer = (body, el) => {
    body.classList.remove(cssClasses.NO_SCROLLBAR);
    el._obfuscator.classList.remove(cssClasses.IS_VISIBLE);
    el._drawer.classList.remove(cssClasses.IS_VISIBLE);
    el._drawer.setAttribute('aria-hidden', 'true');
    el._drawer_button.setAttribute('aria-expanded', 'false');
}

export const initializeLayout = (body, element) => {
    // Get elements from HTML.
    element._drawer = element.getElementsByClassName(cssClasses.DRAWER).item(0);
    element._drawer_button = element.getElementsByClassName(cssClasses.DRAWER_BUTTON).item(0);

    // Add layout obfuscator.
    element._obfuscator = document.createElement('div');
    element._obfuscator.classList.add(cssClasses.OBFUSCATOR);
    element.appendChild(element._obfuscator);

    // Initialize elements.
    element._drawer.setAttribute('aria-hidden', 'true');
    element._drawer_button.setAttribute('aria-expanded', 'false');
    element._drawer_button.setAttribute('role', 'button');
    element._drawer_button.setAttribute('tabindex', '0');

    // Events
    element._drawer_button.addEventListener('click', () => {
        showDrawer(body, element);
    });
    element._obfuscator.addEventListener('click', () => {
        hideDrawer(body, element);
    });
    element.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27 && element._drawer.classList.contains(cssClasses.IS_VISIBLE)) {
            hideDrawer(body, element);
        }
    })
}
