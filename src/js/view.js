import { qs, qsa, $on, $parent, $delegate } from "./helpers";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const _setFilter = (currentPage) => {
    qs(".filters .selected")(document).className = "";
    qs(`.filters [href="#/${currentPage}"]`)(document).className = "selected";
};

const _elementComplete = (id, completed) => {
    const listItem = qs(`[data-id="${id}"]`)(document);

    if (!listItem)
        return;

    listItem.className = completed ? "completed" : "";

    // outside
    qs("input")(listItem).checked = completed;
};

const _editItem = (id, title) => {
    const listItem = qs(`[data-id="${id}"]`)(document);

    if (!listItem)
        return;

    listItem.className = `${listItem.className} editing`;

    const input = document.createElement("input");
    input.className = "edit";

    listItem.appendChild(input);
    input.focus();
    input.value = title;
};


const _editItemDone = (id, title) => {
    const listItem = qs(`[data-id="${id}"]`)(document);

    if (!listItem)
        return;

    const input = qs("input.edit")(listItem);
    listItem.removeChild(input);

    listItem.className = listItem.className.replace(" editing", "");

    qsa("label")(listItem).forEach((label) => {
        label.textContent = title;
    });
};

const _itemId = (element) => {
    const li = $parent(element, "li");
    return parseInt(li.dataset.id, 10); // type coercion
};

const _removeItem = (id, list) => {
    const elem = qs(`[data-id="${id}"]`)(document);

    if (elem)
        list.removeChild(elem);
};
