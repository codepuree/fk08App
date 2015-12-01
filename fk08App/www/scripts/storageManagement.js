/*
 * This file handles the loading and storing of data.
 */

/* ================ How local storage data should look like ================= *\
 * window.localStorage.dataName = {                                           *
 *     title:      "",    // Defines the title of the element                 *
 *     type:       "",    // Defines how it should be rendered, all data      *
 *                        // elements should implement the type element       *
 *     display:    "",    // Should be an boolean, true if it should be       *
 *                        // rendered                                         *
 *     lastUpdate: "",    // Should be an js date object                      *
 *     data:       [                                                          *
 *         {}                                                                 *
 *     ],                                                                     *
 * }                                                                          *
\* ========================================================================== */

/* ========================== Reset local storage =========================== */
/* ========================================================================== */

/* =============================== Functions ================================ */
function clearData(name, start, end, defaultData) {
    if (!window.localStorage[name].startsEndsWith(start, end)) {
        window.localStorage[name] = defaultData;
    }
}

/* ########################################################################## */

function storeData(name, title, type, display, data, lastUpdate) {
    var storeObj = {
        title: title,
        type: type,
        display: display,
        data: data,
        lastUpdate: lastUpdate
    };

    window.localStorage[name] = JSON.stringify(storeObj);
}
/* ========================================================================== */