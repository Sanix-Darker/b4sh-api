
function makeAceEditorResizable(editor){
    var id_editor = editor.container.id;
    var id_dragbar = '#' + id_editor + '_dragbar';
    var id_wrapper = '#' + id_editor + '_wrapper';
    var wpoffset = 0;
    window.draggingAceEditor[id_editor] = false;

    $(id_dragbar).mousedown(function(e) {
        e.preventDefault();

        window.draggingAceEditor[id_editor] = true;
    
        var _editor = $('#' + id_editor);
        var top_offset = _editor.offset().top - wpoffset;
    
        // Set editor opacity to 0 to make transparent so our wrapper div shows
        _editor.css('opacity', 0);
    
        // handle mouse movement
        $(document).mousemove(function(e){
            var actualY = e.pageY - wpoffset;
            // editor height
            var eheight = actualY - top_offset;
            
            // Set wrapper height
            $(id_wrapper).css('height', eheight);
            
            // Set dragbar opacity while dragging (set to 0 to not show)
            $(id_dragbar).css('opacity', 0.15);
        });
    });
    
    $(document).mouseup(function(e){
        if (window.draggingAceEditor[id_editor])
        {
            var ctx_editor = $('#' + id_editor);
    
            var actualY = e.pageY - wpoffset;
            var top_offset = ctx_editor.offset().top - wpoffset;
            var eheight = actualY - top_offset;
    
            $( document ).unbind('mousemove');
            
            // Set dragbar opacity back to 1
            $(id_dragbar).css('opacity', 1);
            
            // Set height on actual editor element, and opacity back to 1
            ctx_editor.css('height', eheight).css('opacity', 1);
            
            // Trigger ace editor resize()
            editor.resize();

            window.draggingAceEditor[id_editor] = false;
        }
    });
}

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

function generate(){
    
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.getSession().setMode("ace/mode/sh");
    editor.setOptions({
        fontSize: "10pt"
    })
    window.draggingAceEditor = {};

    makeAceEditorResizable(editor);

    // collapse accordion 1
    $("#edit").trigger("click");
    // To generate the data-table
    $('#mylist').DataTable();

    $('#co').click(function() {
        var text = document.querySelector('#co-input').innerHTML;
        var el = $(this);
        copyToClipboard(text, el);
    });

    // A security check for too much characters 
    // of bash code
    editor.getSession().on('change', function() {
        if(editor.session.getValue().length > 15000){
            alert("[x] Too much characters, more than 15000 is not allowed...")
        }
    }, 100)

});
