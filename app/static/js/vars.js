/**
 * All global variables for the project
 */

var content = "";
var editor = ace.edit("editor");

var html = document.querySelector("html")
var checkbox = document.querySelector("input[class=theme]")

var content_size = 0;
var content = "";
var editor_status = $("#editor-status");
var generate_button = $("#gen");
var copy_button = $("#co");
var copy_content_button = document.querySelector("#co-input");

var current_bash_id = "";

var command_box = $("#command_box");
var tags = []
var search_text = $("#search_text");
var filter_select = $("#filter_select");
