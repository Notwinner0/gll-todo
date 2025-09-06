export { qs, qsa, $on, $delegate, $parent, remove };

// curried
// const getNavItem = qs('.nav-item');
// const getFirstNavItem = getNavItem(document);
const qs = (selector) => {
  return (scope) => {
    return scope.querySelector(selector);
  };
};

// curried
const qsa = (selector) => {
  return (scope) => {
    return scope.querySelectorAll(selector);
  };
};


// thunk
// Usage:
// const button = document.querySelector('button');
// const attachClickListener = $on(button, 'click', () => console.log('Clicked!'), false);
// attachClickListener();
const $on = (target, type, callback, useCapture) => () => {
    target.addEventListener(type, callback, !!useCapture);
};

// const myClickHandler = $delegate('.my-button', 'click')(e => console.log('Button clicked!'))(document.body);
// myClickHandler();
const $delegate = (selector, type) => (handler) => (target) => {
  // pure logic to create the delegated handler function
  const isTarget = (event) => {
    const potentialElements = qsa(selector, target)(selector);
    return Array.prototype.indexOf.call(potentialElements, event.target) >= 0;
  };

  const getDelegatedHandler = (event) => {
    if (isTarget(event)) {
      handler.call(event.target, event);
    }
  };

  const useCapture = type === "blur" || type === "focus";

  // return a function that will perform the side effect
  return () => {
    $on(target, type, getDelegatedHandler, useCapture)();
  };
};

// can't make functional, unless passing the entire DOM into it, which will be impractical
// $parent(qs('a'), 'div');
const $parent = (element, tagName) => {
    if (!element.parentNode)
        return undefined;

    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase())
        return element.parentNode;

    return $parent(element.parentNode, tagName);
};

// removes an element from an array
// const x = [1,2,3]
// remove(x, 2)
// x ~== [1,3]
const remove = (array, thing) => {
    const index = array.indexOf(thing);
    if (index === -1) {
        return array;
    }
    return [...array.slice(0, index), ...array.slice(index + 1)]; // past entries, no index, next entries
};

// looping on nodes by chaining
function _forEachElement(selector, nodeList, evals) {
  return Array.from(nodeList.querySelectorAll(selector)).map(evals);
}