"use strict";

// Import polyfills.
import { initializePolyfill } from './polyfill';

// Import components.
// Remove unnecessary components from here.
import { initializeLayout } from './layout/layout';
import { initializeAlert } from './alert/alert';
import { initializeCollapse } from './collapse/collapse';

// Exported initialization function.
// Remove unnecessary components from here.
export const initialize = element => {
    initializeLayout(element);
    initializeAlert(element);
    initializeCollapse(element);
}

// Initialize polyfills.
initializePolyfill();

// Default initialization.
// Remove or comment this line if you do not want to
// initialize components on a BODY element.
initialize(document.body);
