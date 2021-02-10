/**
 * The Web component responsible for the list of tags saved as attributes
 *
 * author : s@n1x-d4rk3r
 */
class ListTags extends HTMLElement {

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
            if (elt.length > 1){
                this.innerHTML += `
                <span class="badge badge-default border" id="tag_${index}">
                    ${elt}<!-- <b role="button" class="removeTag" target-id="${index}">&times;</b>-->
                </span>
            `;
            }
        });
    }
}
window.customElements.define('w-tags', ListTags);
