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
                <select class="form-control w-100" id="filter_select">
                    <option value="" disabled selected>&#x1F50D; Filter by</option>
                    <option value="most_used" style="color: black;">Most Used</option>
                    <option value="low_used" style="color: black;">Low Used</option>
                </select>
                <hr>
                <input type="text" id="search_text" class="form-control" placeholder="&#x1F50D; Search a b4sh by title here...">
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <small>
                        <label role="button">
                            <input type="checkbox" id="check_all" /> Check All
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
        `;
    }
}
window.customElements.define('w-filters', Filters);
