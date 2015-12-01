/*
 * This file is for the extensions of default objects
 */

/* =================== Extensions of the document object ==================== */
document.getTemplate = function (name) {
    var tmpid = "tmp" + capitalizeFirstLetter(name);

    if (typeof (this.getElementById(tmpid).content) != "undefined") {
        return this.getElementById(tmpid).content.cloneNode(true).querySelectorAll("div")[0];
    } else {
        return this.importNode(document.querySelector("#" + tmpid).getElementsByTagName("div")[0], true);
    }
}
/* ========================================================================== */

/* ==================== Extensions of the string object ===================== */
String.prototype.capitalize = function () {
    if (this.length > 1) {
        if (this.indexOf(" ") != -1) {

        } else {
            this.charAt(0) = this.charAt(0).toUpperCase();
        }
    }

    return this;
}

/* ########################################################################## */

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* ########################################################################## */

String.prototype.startsWith = function (char) {
    return this[0] == char;
};

/* ########################################################################## */

String.prototype.endsWith = function (char) {
    return this[this.length - 1] == char;
}

/* ########################################################################## */

String.prototype.startsEndsWith = function (char1, char2) {
    return (this[0] == char1) && (this[this.length - 1] == char2);
}
/* ========================================================================== */

/* ===================== Extensions of the date object ====================== */
Date.prototype.niceFormat = function () {
    return this.getDate() + "." + (this.getMonth() + 1)
        + "." + this.getFullYear();
}
/* ========================================================================== */