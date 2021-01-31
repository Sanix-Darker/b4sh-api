/**
 * 
 * @param {*} text 
 * @param {*} el 
 */
function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported('copy');
    var elOriginalText = el.attr('data-original-title');

    if (copyTest === true) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'Copied!' : 'Whoops, not copied!';
            el.attr('data-original-title', msg).tooltip('show');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(copyTextArea);
        el.attr('data-original-title', elOriginalText);
    } else {
        // Fallback if browser doesn't support .execCommand('copy')
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}

/**
 * initEditor
 */
function initEditor(){
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/sh");
    editor.setOptions({
        fontSize: "12pt"
    })
    window.draggingAceEditor = {};

    makeAceEditorResizable(editor);
}

/**
 * globalInit
 */
function globalInit(){
    $('[data-toggle="tooltip"]').tooltip();

    // We set the host
    $("#co-input i").html(location.hostname);
}


/**
 * generate
 */
function generate(){
    $("#gen").prop('disabled', true);
    $("#gen").html('&#x267D; LOADING...');

    setTimeout(() => {
        $("#gen").prop('disabled', false);
        $("#gen").html('GENERATED');

        setTimeout(() => {
            $("#gen").slideUp("slow", function() {
                $("#showc").trigger("click");
            });
        }, 500);

    }, 2000);
}

// A digit formatter
function nFormatter(num, digits=1) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


