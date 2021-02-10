/**
 * The Web component responsible for the list of elements.
 *
 * author : s@n1x-d4rk3r
 */

class ListElements extends HTMLElement {

    constructor(){
        super();

        (async () => {
            const rawResponse = await fetch(`${host_api}/b`, {
                method: 'GET'
            });

            const response = await rawResponse.json();
            this.innerHTML = `<div class="list-group " id="list_elements" style="overflow: auto;display: block;">`;

            if(response?.code){
                if (response?.code == "200"){
                    response?.result.sort(function(a, b){ return b.stats.used_count - a.stats.used_count}).forEach((el) => {
                        this.innerHTML += `
                        <w-el
                            id = "b_${el.hash}" title = "${el.key}"
                            hash = "${el.hash}"
                            date = "${el.date}"
                            author = "${el?.author}"
                            used_count = "${el.stats.used_count}" version = "${el?.version}"
                            os = "${el?.os}"></w-el>
                            <code id="b_elt${el.hash}" style="display:none;">${el.content}</code>
                            `
                    });
                    this.innerHTML += "</div>";
                }
            }
        })();

    }
}
window.customElements.define('w-list-el', ListElements);
