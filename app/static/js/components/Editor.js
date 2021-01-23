/**
 * The Web component is for the Editor.
 * 
 * author : s@n1x-d4rk3r
 */
class Editor extends HTMLElement {

    logMe = () => {
        console.log("Clicked !");
    }

    standardContent = () => {
        return `# ===---===---===---===---
# Title* : helloworld
# Version* : 0.0.1
# Description* : Just an example of using b4sh
# Operating system(s) : debian

echo "Hello World from b4sh !"

echo "Click on GENERATE button !"
echo "Copy/Paste the command generated in your terminal !"
echo "Resize this editor to add more..."

echo "Have FUN !"

# ===---===---===---===---`
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
        `;
    }
}
window.customElements.define('w-editor', Editor);
