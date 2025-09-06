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

const initViewState = (template) => { // reference collection
  return {
    template,
    $todoList: qs(".todo-list")(document),
    $todoItemCounter: qs(".todo-count")(document),
    $clearCompleted: qs(".clear-completed")(document),
    $main: qs(".main")(document),
    $footer: qs(".footer")(document),
    $toggleAllInput: qs(".toggle-all")(document),
    $toggleAll: qs(".toggle-all-label")(document),
    $newTodo: qs(".new-todo")(document),
  };
}

const viewRender = (viewState, command, parameter) => {
  switch (command) {
    case "showEntries":
      viewState.$todoList.innerHTML = viewState.template.show(parameter);
      break;
    case "updateElementCount":
      viewState.$todoItemCounter.innerHTML = viewState.template.itemCounter(parameter);
      break;
    case "contentBlockVisibility":
      viewState.$main.style.display =
      viewState.$footer.style.display = parameter.visible ? "block" : "none";
      break;
    case "toggleAll":
      viewState.$toggleAllInput.checked = parameter.checked;
      break;
    case "clearNewTodo":
      viewState.$newTodo.value = "";
      break;
    case "removeItem":
      _removeItem(parameter, viewState.$todoList);
      break;
    case "setFilter":
      _setFilter(parameter);
      break;
    case "elementComplete":
      _elementComplete(parameter.id, parameter.completed);
      break;
    case "editItem":
      _editItem(parameter.id, parameter.title);
      break;
    case "editItemDone":
      _editItemDone(parameter.id, parameter.title);
      break;
    case "clearCompletedButton":
      _clearCompletedButton(viewState, parameter.completed, parameter.visible);
      break;
  }
}

function viewBindCallback(viewState, event, handler) {
        switch (event) {
            case "newTodo":
                $on(viewState.$newTodo, "change", () => handler(viewState.$newTodo.value))();
                break;
            case "removeCompleted":
                $on(viewState.$clearCompleted, "click", handler)();
                break;
            case "toggleAll":
                $on(viewState.$toggleAll, "click", () => {
                    viewState.$toggleAllInput.click();
                    handler({ completed: viewState.$toggleAllInput.checked });
                })();
                break;
            case "itemEdit":
                $delegate("li label", "dblclick")((e) => handler({ id: _itemId(e.target) }))(viewState.$todolist)();
                break;
            case "itemRemove":
                $delegate(".destroy", "click")((e) => handler({ id: _itemId(e.target) }))(viewState.$todoList)();
                break;
            case "itemToggle":
                $delegate(".toggle", "click")((e) => handler({ id: _itemId(e.target), completed: e.target.checked }))(viewState.$todoList)();
                break;
            case "itemEditDone":
                $delegate("li .edit", "blur")((e) => {
                    if (!e.target.dataset.iscanceled) {
                        handler({
                            id: _itemId(e.target),
                            title: e.target.value,
                        });
                    }
                })(viewState.$todoList)();
                $delegate("li .edit", "keypress")((e) => {
                    if (e.keyCode === ENTER_KEY)
                        e.target.blur();
                })(viewState.$todoList)();
                break;
            case "itemEditCancel":
                $delegate("li .edit", "keyup")((e) => {
                    if (e.keyCode === ESCAPE_KEY) {
                        e.target.dataset.iscanceled = true;
                        e.target.blur();
                        handler({ id: _itemId(e.target) });
                    }
                })(viewState.$todoList)();
                break;
        }
}
