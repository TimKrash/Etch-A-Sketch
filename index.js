let container = document.querySelector('.gridContainer');
container.addEventListener('click', toggleStart)

// Selector handlers
let sizeSelector = document.querySelector('.size input');
sizeSelector.addEventListener('input', changeSize);

let colorSelector = Array.from(document.querySelectorAll('.color-container > *'));
colorSelector.forEach(elem => {
    if (elem.className === "default" || elem.className === "rainbow") {
        elem.addEventListener('click', changeGridColor);
    } else if (elem.className === "choose") {
        let userChoose = elem.querySelector('input');
        ['click', 'input'].forEach(evt => {
            userChoose.addEventListener(evt, changeGridColor, false);
        })
    }
});
let currentGradient = "default";
let lastChosenColor = 0;

let eraserSelector = document.querySelector('.eraser');
eraserSelector.addEventListener('click', clearBoard)

function clearBoard() {
    // Clear colors from existing children
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        let currChild = children[i];
        currChild.style.backgroundColor = null;
    }
}

function changeGridColor(e) {
    let currElem = e.target;

    if (currElem.className === "default" || currElem.className === "rainbow") {
        currentGradient = currElem.className;
        return;
    }

    currentGradient = currElem.value;
}

function changeSize(e) {
    let slideBar = e.target;

    // Change next sibling element output to reflect size and also change grid size
    slideBar.nextElementSibling.textContent = slideBar.value + "x" + slideBar.value;

    generateGrid(slideBar.value);
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function toggleStart(e) {
    // Parent node
    let gridContainer = e.target.parentElement;

    // Add hover listener to each div
    let gridChildren = gridContainer.children;
    for (let i = 0; i < gridChildren.length; i++) {
        let gridChild = gridChildren[i];
        gridChild.addEventListener('mouseover', toggleColor);
    }
}

// Create nxn grid
function generateGrid(n) {
    // Set the repeat display grid to be nxn
    container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    // Remove children
    removeAllChildren(container);

    // Start with 16x16 div containers
    for (let row = 1; row <= n; row++) {
        for (let col = 1; col <= n; col++) {
            let currDiv = document.createElement('div');
            currDiv.setAttribute('class', `elem row-${row}-col-${col}`);

            currDiv.style.borderBottom = "2px solid #5e5e5e";
            currDiv.style.borderLeft = "2px solid #5e5e5e";

            if (row == n) {
                currDiv.style.borderBottom = null;
            } 
            if (col == 1) {
                currDiv.style.borderLeft = null;
            }

            container.appendChild(currDiv);
        }
    }
}

function toggleColor(e) {
    let selectedElem = e.target;

    if (currentGradient === "default") {
        selectedElem.style.backgroundColor = "black";
    } else if (currentGradient === "rainbow") {
        selectedElem.style.backgroundColor = `hsl(${lastChosenColor}, 98%, 51%)`;
        lastChosenColor = (lastChosenColor + 25) % 360;
    } else {
        selectedElem.style.backgroundColor = currentGradient; 
    }
}

generateGrid(16);