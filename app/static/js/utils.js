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

function initEditor(){
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/sh");
    editor.setOptions({
        fontSize: "12pt"
    })
    window.draggingAceEditor = {};

    makeAceEditorResizable(editor);
}

function globalInit(){
    $('[data-toggle="tooltip"]').tooltip();

    // We set the host
    $("#co-input i").html(location.hostname);

    // collapse accordion 1
    $("#edit").trigger("click");
}


function generate(){
    $("#gen").prop('disabled', true);
    $("#gen").html('<span class="spinner-border spinner-border-sm"></span> LOADING...');

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

