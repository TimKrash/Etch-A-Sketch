let container = document.querySelector('.gridContainer');
container.addEventListener('click', toggleStart)

// Selector handlers
let sizeSelector = document.querySelector('.size input');
sizeSelector.addEventListener('input', changeSize);

let colorSelector = document.querySelectorAll('.colors');
let eraserSelector = document.querySelector('.eraser');


function changeSize(e) {
    let slideBar = e.target;
    console.log(slideBar.nextElementSibling)

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
    console.log(gridContainer);

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
    console.log(selectedElem)

    selectedElem.style.backgroundColor = "black";
}

generateGrid(16);