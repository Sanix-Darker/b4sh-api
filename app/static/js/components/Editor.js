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
        return `#!/bin/bash \n\n# _title_ : helloworld \n# _version_ : 0.0.1 \n# _description_ : Just an example of using b4sh \n# _os_ : debian \n
echo "Hello World !"

# - The title parameter is required.
# - Click on GENERATE and try the command in your terminal !
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
