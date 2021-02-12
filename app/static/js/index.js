$(document).ready(function(){
    $("#list-tags").hide();
    // Global initialisations
    globalInit();

    // Theme initiator
    dark_white_theme_init();

    // Initialisation of the editor
    initEditor();

    // The default content if it's comming by key in the url
    if(document.querySelector("#default_content").innerHTML.length > 11){
        editor.getSession().setValue(document.querySelector("#default_content").innerHTML);
    }

    // The default content if it's comming by key in the url
    if(document.querySelector("#default_key").innerHTML.length > 11){
        copy_content_button.innerHTML = limit_print(`curl -L -s ${location.origin}/b.sh | bash -s ${document.querySelector("#default_key").innerHTML}`, 70);
    }

    // The clipBoard stuff
    copy_button.click(function() {
        copyToClipboard(copy_content_button.innerHTML, $(this));
    });

    editor.getSession().setNewLineMode("unix");

    content = editor.session.getValue();
    content_size = content.length;
    editor_status.html(`${content_size}/15000 chars`);

    // The count
    refresh_count();

    // A security check for too much characters
    // of bash code
    editor.getSession().on('change', function(elt) {
        generate_button.prop('disabled', false);
        // console.log("elt: ", elt);
        editor_status.html(`Writing...`);

        generate_button.html('&#x27F3; GENERATE');

        if(content_size > 15000){
            editor_status.html(`<span style="color: red;">[x] Too much characters, more than 15000 is not allowed...</span>`);
        }else{
            if (content != editor.session.getValue())
                generate_button.slideDown("slow");
            else
                generate_button.slideUp("slow");

            content = editor.session.getValue();
            content_size = content.length;
            setTimeout(() => {
                editor_status.html(`${content_size}/15000 chars`);
            }, 1000);
        }
    });
});
