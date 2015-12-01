/*
 * This file is for developement only
 */

/* =================== Extensions of the document object ==================== */
function dev() {
    var value = window.prompt("What do you want?:"),
        command,
        arguments;

    if (value.indexOf(",") != -1 || value.length > 1) {
        command = value.split(",")[0].trim();
        arguments = value.split(",").splice(1, 1);

        switch (command) {
            case "title": {
                copyToClipBoard(generateTitle(arguments[0].trim()));
            } break;

            case "spacer": {
                copyToClipBoard(generateSpacer(arguments[0].trim()));
            } break;

            case "bigComment": {
                // argument[0]: Title
                // argument[1]: number of lines
                copyToClipBoard(generateSpacer(arguments[0].trim()));
            } break;

            default:
        }
    }
}

/* ########################################################################## */

function generateBigComment(title, numLines) {
    var retStr = "/* ";

    for (var i = 0; i < 74; i++) {
        retStr += " ";
    }
    retStr += " *\\";

    retStr += "\n";

    retStr += "\\* ";

    for (var i = 0; i < 74; i++) {
        retStr += " ";
    }
    retStr += " */";

    return retStr;
}

/* ########################################################################## */

function generateSpacer() {
    var retStr = "/* ";

    for (var i = 0; i < 74; i++) {
        if (arguments.length == 0) {
            retStr += "#";
        } else {
            retStr += arguments[0][0];
        }
    }
    retStr += " */";

    return retStr;

}

/* ########################################################################## */

function generateTitle(title) {
    title = title.trim();
    if (title.length < 72) {
        var numChars = 72 - title.length,
            retStr = "/* ";

        for (var i = 0; i < Math.floor(numChars / 2) ; i++) {
            retStr += "=";
        }
        retStr += " " + title + " ";
        for (var i = 0; i < Math.ceil(numChars / 2) ; i++) {
            retStr += "=";
        }
        retStr += " */"

        return retStr;
    } else {
        console.error("The title is to long!");
    }
}

/* ########################################################################## */

function copyToClipBoard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
/* ========================================================================== */