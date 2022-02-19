import { Paradocs } from "./paradocs.js";
class InternalState {
}
InternalState.paradocs = null;
window.onload = function () {
    console.log("Hello");
    document.getElementById("fetch").onclick = () => {
        data_fetch();
    };
    document.getElementById("target").onkeyup = () => {
        change_search_box();
    };
};
function data_fetch() {
    InternalState.paradocs = new Paradocs.State();
    InternalState.paradocs.set_data_source(document.getElementById("data_source").value);
    InternalState.paradocs.fetch_data(() => {
        console.log("fetch completed.");
    });
}
function change_search_box() {
    clear_list();
    insert_title();
    const word = document.getElementById("target").value;
    console.log("Title any");
    for (const item of InternalState.paradocs.filter_records(word, false, true)) {
        add_list(item);
    }
    console.log("Tag any");
    for (const item of InternalState.paradocs.filter_records(word, false, false, true)) {
        add_list(item);
    }
}
function clear_list() {
    const table = document.getElementById("result");
    table.innerHTML = "";
}
function insert_title() {
    const table = document.getElementById("result");
    const header = table.insertRow(-1);
    header.insertCell(0).textContent = "Title";
    header.insertCell(1).textContent = "Tag";
    header.insertCell(2).textContent = "Description";
}
function add_list(records) {
    const target = document.getElementById("result").tBodies;
    const new_row = target[0].insertRow(-1);
    new_row.insertCell(0).textContent = records.Title;
    new_row.insertCell(1).textContent = records.Tag.join(", ");
    new_row.insertCell(2).textContent = records.Description;
}
//# sourceMappingURL=index.js.map