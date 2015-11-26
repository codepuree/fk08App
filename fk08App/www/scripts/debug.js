/*
*
*/

console.log = function () {
    var elemConsole = document.getElementById("console"),
        elemMessage = createDebugMessageElement(arguments);

    // Delete Messages if over 10
    if (elemConsole.childNodes.length > 10) {
        for (var i = 0; i < elemConsole.childNodes.length - 10; i++) {
            elemConsole.childNodes[i].parentNode.removeChild(elemConsole.childNodes[i]);
        }
    }
    
    elemConsole.appendChild(elemMessage);

    elemMessage.scrollIntoView();
};

function createDebugMessage() {
    var retStr = "";
    for (var i in arguments[0]) {
        retStr += arguments[0][i] + "<br />";
    }
    return retStr;
}

function createDebugMessageElement() {
    var elem = document.createElement("div");

    elem.innerHTML = createDebugMessage(arguments[0]);

    return elem;
}

// Eval
document.getElementById("btnConsoleRun").addEventListener("click", function () {
    eval(document.getElementById("inConsole").value.trim());
});

// Clear console
document.getElementById("btnConsoleClear").addEventListener("click", function () {
    document.getElementById("console").innerHTML = "";
});

document.getElementsByTagName("footer")[0].getElementsByTagName("form")[0].addEventListener("submit", function (event) {
    event.preventDefault();
    eval(document.getElementById("inConsole").value.trim());
});