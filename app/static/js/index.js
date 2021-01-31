var content_size = 0;
var content = "";
var editor_status = $("#editor-status");
var generate_button = $("#gen");
var copy_button = $("#co");
var copy_content_button = $("#co-input");

var command_box = $("#command_box");

// var host_api = "https://b4sh.co/api";
var host_api = "http://127.0.0.1:4352/api";

/**
 *
 * @param {*} key
 */
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
 *
 * @param {*} row
 */
function get_value_from_row(row){
    var value = editor.getSession().getLine(row).split(":")[1];
    return typeof value !== "undefined" ? value : "";
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
        var title = get_value_from_row(search_title?.start.row);
        var version = get_value_from_row(search_version?.start.row);
        var description = get_value_from_row(search_description?.start.row);
        var os = get_value_from_row(search_os?.start.row);
        var author = "- - - - - ";

        (async () => {
            const rawResponse = await fetch(host_api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title, version,
                    description, os,
                    author, content
                })
            });
            const response = await rawResponse.json();

            generate_button.html('&#x2714; GENERATED');

            console.log("content: ", response);
            // we set the keyof the commnd-box
            command_box.attr("key", response?.result?.key);

            setTimeout(() => {
                generate_button.html('&#x27F3; GENERATE');
            }, 2000);

        })();

    }else{
        editor_status.html(`<span style="color: red;">[x]You need to have the _title_ attribute with a value in your editor !</span>`);
    }

}


$(document).ready(function(){
    // Global initialisations
    globalInit();

    // Initialisation of the editor
    initEditor();

    // The clipBoard stuff
    copy_button.click(function() {
        copyToClipboard(copy_content_button.innerHTML, $(this));
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
                generate_button.slideDown("slow");
            }else{
                generate_button.slideUp("slow");
            }

            content = editor.session.getValue();
            content_size = content.length;
            setTimeout(() => {
                editor_status.html(`${content_size}/15000 chars`);
            }, 1000);
        }
    });
});
