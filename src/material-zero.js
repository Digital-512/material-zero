"use strict";

// Import components.
// Remove unnecessary components from here.
import { initializeLayout } from './layout/layout';

// Exported initialization function.
// Remove unnecessary components from here.
export const initialize = element => {
    initializeLayout(element);
}

// Default initialization.
// Remove or comment this line if you do not want to
// initialize components on a BODY element.
initialize(document.body);
