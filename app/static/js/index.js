
$(document).ready(function(){
    // Global initialisations
    globalInit();

    // Initialisation of the editor
    initEditor();

    // The clipBoard stuff
    $('#co').click(function() {
        var text = document.querySelector('#co-input').innerHTML;
        var el = $(this);
        copyToClipboard(text, el);
    });

    editor.getSession().setNewLineMode("unix");

    console.log(JSON.stringify(editor.getSession().doc.getNewLineCharacter()))

    // A security check for too much characters
    // of bash code
    editor.getSession().on('change', function() {
        if(editor.session.getValue().length > 15000){
            alert("[x] Too much characters, more than 15000 is not allowed...")
        }else{
            if (content != editor.session.getValue()){
                $("#gen").slideDown("slow", function() {});
            }else{
                $("#gen").slideUp("slow", function() {});
            }
            content = editor.session.getValue();
        }
    });
});
