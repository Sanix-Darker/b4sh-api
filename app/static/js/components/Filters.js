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
                <select class="form-control w-100">
                    <option value="" disabled selected>&#x1F50D; Filter by</option>
                    <option value="most_used">Most Used</option>
                    <option value="low_used">Low Used</option>
                </select>
                <hr>
                <input type="text" class="form-control" placeholder="&#x1F50D; Search a b4sh by title here...">
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <small>
                        <label role="button">
                            <input type="checkbox" id="check_all" /> Check All b4shs
                        </label>
                    </small>
                </div>
                <div class="col">
                    <small>
                        <label role="button">
                            <input type="checkbox" id="my_list"/> b4shs Created
                        </label>
                    </small>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <small>
                        <label role="button">
                            <input type="checkbox" id="my_list"/> Recently Used
                        </label>
                    </small>
                </div>
                <div class="col">
                    <small></small>
                        <label role="button">
                            <input type="checkbox" id="my_list"/> Certified
                        </label>
                    </small>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <span class="badge badge-primary badge-pill"> 123 b4sh(s) found</span>
                </div>
            </div>
            <hr>
        `;
    }
}
window.customElements.define('w-filters', Filters);
