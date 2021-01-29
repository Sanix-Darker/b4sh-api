const html = document.querySelector("html")
const checkbox = document.querySelector("input[class=theme]")

const getStyle = (element, style) =>
  window
    .getComputedStyle(element)
    .getPropertyValue(style);

const initialColors = {
  bg: getStyle(html, "--bg"),
}

const darkMode = {
  bg: "#333333", // override styles here
}

const transformKey = key =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  );
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
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
