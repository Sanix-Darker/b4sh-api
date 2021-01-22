/**
 * The Web component responsible for the list of tags gaved as attributes
 * 
 * author : s@n1x-d4rk3r
 */
class ListTags extends HTMLElement {

    logMe = () => {
        console.log("Clicked !");
    }

    getElements(){
        if (this.hasAttribute("tags")){
            return this.getAttribute("tags").split(","); 
        }else
            return []
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.getElements().forEach((elt, index) => {
            this.innerHTML += `
                <span class="badge badge-default border">
                    ${elt} 
                    <b role="button" class="removeTag" id="${index}">&times;</b>
                </span>
            `;
        })

    }
}
window.customElements.define('w-tags', ListTags);
