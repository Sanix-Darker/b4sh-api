/**
 * The Web component responsible for the list of elements.
 *
 * author : s@n1x-d4rk3r
 */

class ListElements extends HTMLElement {

    logMe(){
        // console.log("Clicked !");
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

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
                            id = "b_${el.hash}" title = "${el.title}"
                            content = "${el.content}"
                            hash = "${el.hash}"
                            date = "${el.date}"
                            author = "${el?.author}"
                            used_count = "${el.stats.used_count}" version = "${el?.version}"
                            os = "${el?.os}"></w-el>`
                    });
                    this.innerHTML += "</div>";
                }
            }
        })();

    }
}
window.customElements.define('w-list-el', ListElements);
