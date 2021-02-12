var content_size = 0;
var content = "";
var editor_status = $("#editor-status");
var generate_button = $("#gen");
var copy_button = $("#co");
var copy_content_button = document.querySelector("#co-input");

var current_bash_id = "";

var command_box = $("#command_box");
var tags = []


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

function limit_print(str, limit){
    return (str.length > limit) ? str.substring(0,limit) + "..." : str;
}

function error_msg(state, response){
    if(state == "create"){
        editor_status.html(`<span style="color: red;">[x] Error Creating, try again later !</span>`);
    }else{
        editor_status.html(`<span style="color: red;">[x] Error Updating, try again later !</span>`);
    }
    copy_content_button.innerHTML = limit_print(typeof response?.reason == "undefined" ? "": "# " + response?.reason + "<br># " + copy_content_button.innerHTML, 70);
    generate_button.prop('disabled', false);
    generate_button.html('&#x27F3; GENERATE');
}

function create_bash(title, version,description, os, author, content){
    (async () => {
        const rawResponse = await fetch( "/api/b", {
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

        if(response?.code){
            if (response?.code == "200" || response?.code == "201"){
                generate_button.html('&#x2714; GENERATED');

                current_bash_id = response?.result?.bash_id;
                $("#b4sh-id").text(current_bash_id);
                // we set the keyof the commnd-box
                copy_content_button.innerHTML = limit_print(`curl -L -s ${location.origin}/b.sh | bash -s ${response?.result?.key}`, 67);
            }else{
                error_msg("create", response);
            }
        }else{
            error_msg("create", response);
        }
    })();
}

function update_bash(title, version,description, os, author, content, current_bash_id){
    (async () => {
        const rawResponse = await fetch(`/api/b/${current_bash_id}`, {
            method: 'PUT',
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

        if(response?.code){
            if (response?.code == "200"){
                generate_button.html('&#x2714; UPDATED');
                copy_content_button.innerHTML = limit_print(`curl -L -s ${location.origin}/b.sh | bash -s ${response?.result?.key}`, 70);
            }else{
                error_msg("update", response);
            }
        }else{
            error_msg("update", response);
        }
    })();
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

        // if we have a b4sh-id in memory, we edit
        if (current_bash_id.length > 0){
            update_bash(title, version,description, os, author, content, current_bash_id);
        }else{// if not we create a new one
            create_bash(title, version,description, os, author, content);
        }
    }else{
        editor_status.html(`<span style="color: red;">[x]You need to have the _title_ attribute with a value in your editor !</span>`);
        generate_button.prop('disabled', false);
        generate_button.html('&#x27F3; GENERATE');
    }
}

$("#new_b4sh").click(function() {
    editor.session.setValue(`#!/bin/bash\n\n# _title_: my-title-here\n\n`);
    current_bash_id = "";
    $("#list-tags").html("");
    $("#b4sh-id").text("");
    $("#list-tags").hide();
    editor.resize();
    copy_content_button.innerHTML = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
});

$("#clean_editor").click(function() {
    editor.session.setValue(``);
    current_bash_id = "";
    $("#list-tags").html("");
    $("#b4sh-id").text("");
    $("#list-tags").hide();
    editor.resize();
    copy_content_button.innerHTML = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
});

$("#search_text").keyup(async function(){

    const rawResponse = await fetch(`/api/b/find?q=${this.value}`, {
        method: 'GET'
    });
    const response = await rawResponse.json();

    document.querySelector("#listt").innerHTML = `<div class="list-group " id="list_elements" style="overflow: auto;display: block;">`;
    if(response?.code){
        if (response?.code == "200"){
            response?.result.sort(function(a, b){ return b.stats.used_count - a.stats.used_count}).forEach((el) => {
                document.querySelector("#listt").innerHTML += `
                <w-el
                    id = "b_${el.hash}" title = "${el.key}"
                    hash = "${el.hash}"
                    date = "${el.date}"
                    checked = "${tags.indexOf(el.key) !== -1 ? "on": "off"}"
                    author = "${el?.author}"
                    used_count = "${el.stats.used_count}" version = "${el?.version}"
                    os = "${el?.os}"></w-el>
                    <code id="b_elt${el.hash}" style="display:none;">${el.content}</code>`
            });
            document.querySelector("#listt").innerHTML += "</div>";
        }
    }

    $("#count_all").html(nFormatter(response?.result.length));

});

function get_elt(title, hash){

    var content = $("#b_elt"+hash).html();
    if ($("#"+hash).prop("checked")){
        $("#list-tags").show();
        tags.push(title);
        editor.session.setValue(editor.session.getValue() + `\n\n` + content);
    }else{
        tags = tags.filter(function(value, index){
            return value !== title;
        });
        if (tags.length <= 0){
            $("#list-tags").hide();
        }
        editor.session.setValue(editor.session.getValue().replace(content, `\n`));
    }

    $("#list-tags").html(`<w-tags tags="${tags.join(",")}"></w-tags>`);

    editor.scrollToLine(9999, true, true, function () {});
}

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
