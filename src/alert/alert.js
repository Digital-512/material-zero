"use strict";

// ALERT

// Transition timeout in milliseconds.
const transitionTimeout = 200;

const cssClasses = {
    ALERT_DISMISSIBLE: 'mz-alert--dismissible'
}

const onClick = evt => {
    let button = evt.target;
    let parent = button.parentNode;

    if (button.dataset.dismiss === 'true' && parent.classList.contains(cssClasses.ALERT_DISMISSIBLE)) {
        parent.style.opacity = 0;
        setTimeout(() => parent.remove(), transitionTimeout);
    }
}

export const initializeAlert = element => {
    // Add event listener for dismissible alerts.
    element.addEventListener('click', onClick);
}
