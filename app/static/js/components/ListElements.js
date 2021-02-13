/**
 * The Web component responsible for the list of elements.
 *
 * author : s@n1x-d4rk3r
 */

class ListElements extends HTMLElement {

    constructor(){
        super();

        (async () => {
            const rawResponse = await fetch(`/api/b`, {
                method: 'GET'
            });

            const response = await rawResponse.json();
            this.innerHTML = `<div class="list-group " id="list_elements" style="overflow: auto;display: block;">Loading...</div>`;

            if(response?.code){
                if (response?.code == "200"){
                    this.innerHTML = `<div class="list-group " id="list_elements" style="overflow: auto;display: block;">`;
                    response?.result.sort(function(a, b){
                        return b.stats.used_count - a.stats.used_count}
                        ).forEach((el) => {
                        // let's remove basic tests at the beginning of the listing of elements
                        if (el.key.indexOf("test") === -1 && el.key.indexOf("hello-world") === -1 && el.key.indexOf("my-title-here") !== -1){
                            this.innerHTML += `
                            <w-el
                                id = "b_${el.hash}" title = "${el.key}"
                                hash = "${el.hash}"
                                date = "${el.date}"
                                author = "${el?.author}"
                                used_count = "${el.stats.used_count}" version = "${el?.version}"
                                os = "${el?.os}"></w-el>
                            <code
                            id="b_elt${el.hash}">${el.content}\n# ${location.protocol + "//" + location.host}/${el.key}\n# curl -L -s ${location.protocol + "//" + location.host}/b.sh | bash -s ${el.key}</code>`
                        }
                    });
                    this.innerHTML += "</div>";
                }
            }
            if(response?.result.length == 0){
                this.innerHTML = `<div class="list-group" id="list_elements" style="overflow: auto;display: block;">Empty zone for now...</div>`;
            }
        })();
    }
}
window.customElements.define('w-list-el', ListElements);
