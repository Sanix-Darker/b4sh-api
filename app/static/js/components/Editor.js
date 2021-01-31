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
        return `# ===---===---===---===--- \n# title* : helloworld \n# version : 0.0.1 \n# description : Just an example of using b4sh \n# os : debian \n
echo "Hello World from b4sh !"

# - Click on GENERATE button !
# - Copy/Paste the command generated in your terminal !
# - You can Resize this editor to add more...

echo "Have FUN !" \n
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
