var content_size = 0;
var content = "";
var editor_status = $("#editor-status");
var generate_button = $("#gen");


function get_range(key){
    return editor.find(key,{
        wrap: true,
        caseSensitive: true,
        wholeWord: true,
        regExp: true,
        preventScroll: true // do not change selection
    });
}

/**
 * generate
 */
function generate(){
    generate_button.prop('disabled', true);
    generate_button.html('&#x267D; LOADING...');

    // We get the content from the editor
    var search_title = get_range('_title_');
    var search_version = get_range('_version_');
    var search_description = get_range('_description_');
    var search_os = get_range('_os_');

    if (search_title){
        var title = editor.getSession().getLine(search_title?.start.row).split(":")[1];
        var version = editor.getSession().getLine(search_version?.start.row).split(":")[1];
        var description = editor.getSession().getLine(search_description?.start.row).split(":")[1];
        var os = editor.getSession().getLine(search_os?.start.row).split(":")[1];
        var author = "- - - - - ";

        const obj = {
            title,
            version,
            description,
            os,
            author,
            content
        }
        console.log("obj: ", obj)

    }else{
        editor_status.html(`<span style="color: red;">[x]You need to have the _title_ attribute with a value in your editor !</span>`);
    }

    setTimeout(() => {
        generate_button.html('&#x2714; GENERATED');

    }, 2000);
}


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


    content = editor.session.getValue();
    content_size = content.length;
    editor_status.html(`${content_size}/15000 chars`);

    // A security check for too much characters
    // of bash code
    editor.getSession().on('change', function(elt) {
        generate_button.prop('disabled', false);
        // console.log("elt: ", elt);
        editor_status.html(`Writing...`);

        if(content_size > 15000){
            editor_status.html(`<span style="color: red;">[x] Too much characters, more than 15000 is not allowed...</span>`);
        }else{
            if (content != editor.session.getValue()){
                generate_button.slideDown("slow", function() {});
            }else{
                generate_button.slideUp("slow", function() {});
            }

            content = editor.session.getValue();
            content_size = content.length;
            setTimeout(() => {
                editor_status.html(`${content_size}/15000 chars`);
            }, 1000);
        }
    });
});
