/**
 * The Web component is for the Editor.
 *
 * author : s@n1x-d4rk3r
 */
class Editor extends HTMLElement {

    standardContent(){
        return `#!/bin/bash\n\n
# _title_ : hello-world
# _state_ : public
# _version_ : 0.0.1
# _description_ : To install Docker in ubuntu
# _os_ : ubuntu


echo "Hello World ʕ·͡ᴥ·ʔ !"

# - 'title' parameter is required
# - Update this script and click on GENERATE !
# - Copy/Paste the generated command in your terminal.
# - Click 'New b4sh' button TOP-RIGHT to empty the Editor.

# - You can Resize this editor to add more...
`
    }

    getContent(){
        if (this.hasAttribute("content")){
            if (this.getAttribute("content").length > 5)
                return this.getAttribute("content");
            else
                return this.standardContent()
        }else
            return this.standardContent()
    }

    constructor(){
        super();

        this.innerHTML = `
            <div id="editor" class="rounded">${this.getContent()}</div>
            <div id="editor_dragbar" class="app_editor_dragbar"></div>
            <small id="editor-status"></small>
        `;
    }
}
window.customElements.define('w-editor', Editor);
