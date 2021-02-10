/**
 * The Web component is just the Filters
 *
 * author : s@n1x-d4rk3r
 */
class Filters extends HTMLElement {

    logMe(){
        // console.log("Clicked !");
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <div class="form-group">
                <input type="text" id="search_text" class="form-control" placeholder="&#x1F50D; Search a b4sh by title here...">
            </div>
            <hr>
            <!-- <div class="row">
                <div class="col">
                    <small></small>
                        <label role="button">
                            <input type="checkbox" id="my_list"/> Certified
                        </label>
                    </small>
                </div>
            </div> -->
        `;
    }
}
window.customElements.define('w-filters', Filters);
