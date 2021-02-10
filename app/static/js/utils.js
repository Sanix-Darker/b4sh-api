const getStyle = (element, style) =>
  window
    .getComputedStyle(element)
    .getPropertyValue(style);

const initialColors = {
  bg: getStyle(html, "--bg"),
  cl: getStyle(html, "--cl"),
}

const darkMode = {
  bg: "#333333", // override styles here
  cl: "#FFFFFF", // override styles here
}

const transformKey = key =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  );
}

var search_text = $("#search_text");
var filter_select = $("#filter_select");


checkbox.addEventListener("change", ({target}) => {
    if (target.checked){
        changeColors(darkMode);
        editor.setTheme("ace/theme/twilight");

        search_text.attr("style", "color: white; background: 0;");
        filter_select.attr("style", "color: white; background: 0;");
    }else{
        changeColors(initialColors);
        editor.setTheme("ace/theme/clouds");

        search_text.attr("style", "color: black; background: white;");
        filter_select.attr("style", "color: black; background: white;");
    }
    d_logo(target.checked);

});

const isExistLocalStorage = (key) =>
  localStorage.getItem(key) != null;

const createOrEditLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode);
    createOrEditLocalStorage('mode','darkMode');
  } else {
    changeColors(initialColors);
    createOrEditLocalStorage('mode','initialColors');
  }
})

if(!isExistLocalStorage('mode'))
  createOrEditLocalStorage('mode', 'initialColors');

if (getValeuLocalStorage('mode') === "initialColors") {
  checkbox.removeAttribute('checked');
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "");
  changeColors(darkMode);
}

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

function d_logo(night){
  $("#d-logo").html(night ? "🌜" : "☀");
}

/**
 * dark_white_theme_init
 */
function dark_white_theme_init(){
    if (checkbox.checked == true){
        changeColors(darkMode);
        editor.setTheme("ace/theme/twilight");
        search_text.attr("style", "color: white; background: 0;");
        filter_select.attr("style", "color: white; background: 0;");
    }else{
        changeColors(initialColors);
        editor.setTheme("ace/theme/clouds");
        search_text.attr("style", "color: #495057; background: white;");
        filter_select.attr("style", "color: #495057; background: white;");
    }
    d_logo(checkbox.checked);
}

/**
 * initEditor
 */
function initEditor(){

    editor.getSession().setMode("ace/mode/sh");
    editor.setOptions({
        fontSize: "10pt"
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
    $("#co-input i").html(location.origin);
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


function refresh_count(){
  (async () => {
    const rawResponse = await fetch(`${host_api}/b/count`, {
        method: 'GET'
    });
    const response = await rawResponse.json();
    $("#count_all").html(nFormatter(parseInt(response?.result)));
  })();
}
