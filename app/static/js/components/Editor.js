/**
 * The Web component is for the Editor.
 *
 * author : s@n1x-d4rk3r
 */
class Editor extends HTMLElement {

    logMe(){
        // console.log("Clicked !");
    }

    standardContent(){
        return `#!/bin/bash \n\n# _title_ : helloworld \n
echo "Hello World !"

# - Update this script and click on  GENERATE !
# - Copy/Paste the generated command in your terminal.
# - You can Resize this editor to add more...`
    }

    getContent(){
        if (this.hasAttribute("content")){
            if (this.getAttribute("content").length > 5){
                return this.getAttribute("content");
            }else{
                return this.standardContent()
            }
        }else
            return this.standardContent()
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <div id="editor" class="rounded">${this.getContent()}</div>
            <div id="editor_dragbar" class="app_editor_dragbar"></div>
            <small id="editor-status"></small>
        `;
    }
}
window.customElements.define('w-editor', Editor);
