$(document).ready(function(){
    $("#list-tags").hide();
    // Global initialisations
    globalInit();

    // Theme initiator
    dark_white_theme_init();

    // Initialisation of the editor
    initEditor();

    // Mobile device alert
    if(window.matchMedia("(max-width: 767px)").matches){
        // The viewport is less than 768 pixels wide
        alert("You're probably on a mobile device, b4sh is not yet available for this screen-size, it could be very very UGLY !.");
    }

    // From the given key in the link, get content
    get_raw_from_link();

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
