import { Paradocs } from "./paradocs.js";
class InternalState {
}
InternalState.paradocs = null;
window.onload = function () {
    console.log("Hello");
    document.getElementById("data_source").onkeydown = (e) => {
        if (e.key === "Enter") {
            data_fetch();
        }
    };
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
        change_search_box();
        console.log("fetch completed.");
    });
}
function change_search_box() {
    clear_list();
    insert_title();
    const word = document.getElementById("target").value;
    const is_include_tag = document.getElementById("is_include_tag").checked;
    const items = (word === "" ? get_all_records() : get_filtered_records(word, is_include_tag));
    for (const item of items) {
        add_list(item);
        console.log(item);
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
    if (records.Link !== "") {
        const anchor = document.createElement("a");
        anchor.textContent = records.Title;
        anchor.href = records.Link;
        new_row.insertCell(0).appendChild(anchor);
    }
    else {
        new_row.insertCell(0).textContent = records.Title;
    }
    new_row.insertCell(1).textContent = records.Tag.join(", ");
    new_row.insertCell(2).textContent = records.Description;
}
function* get_all_records() {
    for (const item of InternalState.paradocs.get_all_records()) {
        yield item;
    }
}
function* get_filtered_records(word, is_include_tag) {
    console.log("Title matches");
    for (const item of InternalState.paradocs.filter_records(word, false, true)) {
        yield item;
    }
    if (is_include_tag) {
        console.log("Tag matches");
        for (const item of InternalState.paradocs.filter_records(word, false, false, true)) {
            yield item;
        }
    }
}
//# sourceMappingURL=index.js.map