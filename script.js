let resolution = { // Resolution key values to be used in slider input
    1:256,
    2:128,
    3:64,
    4:32,
    5:16,
    6:8
};

const gridContainer = document.querySelector('.gridContainer');
const settingsContainer = document.querySelector('.settingsContainer');

colorSelector();

drawRainbowButton();
drawClearButton();
drawEraserButton();

const rainbowButton = document.querySelector('.rainbowColor');
const eraserButton = document.querySelector('.eraser');

const sliderResContainer = settingsContainer.appendChild(document.createElement('div'));
sliderResContainer.className = 'sliderContainer';

drawSlider();

let sliderColorText = sliderResContainer.appendChild(document.createElement('p'));
sliderColorText.className = 'sliderText';

getSliderResValue();
getRainbowButtonStatus();
getEraserButtonStatus();

clearButton();

let activeColor = hexToRgb('#000000');
let activeRainbowColor = '';
let rainbowButtonStatus = false;
let eraserButtonStatus = false;


function drawGrid(pixelSize){
    gridContainer.textContent = ''; // Clear div to draw an empty grid

    const grid = gridContainer.appendChild(document.createElement('div'));
    grid.className = 'grid';

    for(let i = 0; i < pixelSize; i++){
        const row = grid.appendChild(document.createElement('div'));
        row.className = 'row';
        row.id = `row${i}`;
        for(let j = 0; j < pixelSize; j++){
            const column = row.appendChild(document.createElement('div'));
            column.className = 'column';
            column.id = `col${j}`;
        };
    };

    // Set the column size dynamically based on the pixel size
    const columnSize = 512 / pixelSize;
    const columns = document.querySelectorAll('.column');
    columns.forEach((column) => {
        column.style.width = `${columnSize}px`;
        column.style.height = `${columnSize}px`;
    });

    sliderColorText.textContent = '';
    draw();
};

function drawSlider(){                  
    const slider = sliderResContainer.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.className = 'sliderRes';
    slider.setAttribute('min','1');
    slider.setAttribute('max','6');
    slider.setAttribute('value','6')
    slider.addEventListener('input', getSliderResValue);
};

function drawRainbowButton(){
    const rainbowButton = settingsContainer.appendChild(document.createElement('input'));
    rainbowButton.className = 'rainbowColor';
    rainbowButton.type = 'button'; 
    rainbowButton.value = 'Rainbow Mode';
};

function drawClearButton(){
    const clearButton = settingsContainer.appendChild(document.createElement('input'));
    clearButton.className = 'clearGrid';
    clearButton.type = 'button'; 
    clearButton.value = 'Clear';
};

function drawEraserButton(){
    const eraserButton = settingsContainer.appendChild(document.createElement('input'));
    eraserButton.className = 'eraser';
    eraserButton.type = 'button'; 
    eraserButton.value = 'Eraser';
};

function draw(){
    const column = document.querySelectorAll('.column');
    let isMouseDown = false;

    // Add mousedown event listener to start tracking
    document.addEventListener("mousedown", () => {
        isMouseDown = true;
    });

    // Add mouseup event listener to stop tracking
    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    column.forEach((column) => {
        column.addEventListener("mouseover", () => {
            if (isMouseDown && eraserButtonStatus) {
                column.style.background = '';
            }
            else if (isMouseDown && rainbowButtonStatus) {
                activeRainbowColor = randomColor()
                column.style.background = `rgb(${activeRainbowColor.r},${activeRainbowColor.g},${activeRainbowColor.b})`;
            }
            else if (isMouseDown) {
                column.style.background = `rgb(${activeColor.r},${activeColor.g},${activeColor.b})`;
            }
        });

        // Also, retain the click event to paint when clicked
        column.addEventListener("click", () => {
            if (eraserButtonStatus) {
                column.style.background = '';
            }
            else if (rainbowButtonStatus){
                activeRainbowColor = randomColor()
                column.style.background = `rgb(${activeRainbowColor.r},${activeRainbowColor.g},${activeRainbowColor.b})`;
            }
            else {
                column.style.background = `rgb(${activeColor.r},${activeColor.g},${activeColor.b})`;
            }
        });
    });
};

function setResolution(sliderValue){
    let result = 512/sliderValue;
    drawGrid(result); // Draw the grid based on the resolution value
};

function colorSelector(){
    const colorSelect = settingsContainer.appendChild(document.createElement('input'));
    colorSelect.className = 'colorSelect';
    colorSelect.type = 'color';
    colorSelect.addEventListener('click', () => {
        rainbowButtonStatus = false;
        eraserButtonStatus = false;
        eraserButton.style.background = 'rgb(214,204,194)';
        rainbowButton.style.background = 'rgb(214,204,194)';
    })
    colorSelect.addEventListener('input', () => {
        activeColor = hexToRgb(colorSelect.value);
    });
};

function getSliderResValue(){
    const slider = document.querySelector('.sliderRes');
    let resolutionValue = resolution[slider.value];
    setResolution(parseInt(resolutionValue));
    sliderColorText.textContent = `${512/resolutionValue} x ${512/resolutionValue}`;
};

function randomColor(){

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return { r: r, g: g, b: b }
};

function getRainbowButtonStatus(){
    rainbowButton.addEventListener("click", () => {
        eraserButtonStatus = false;
        rainbowButtonStatus = true;
        eraserButton.style.background = 'rgb(214,204,194)';
        rainbowButton.style.background = 'rgb(237,237,233)';
    })
};

function getEraserButtonStatus(){
    eraserButton.addEventListener("click", () => {
        eraserButtonStatus = true;
        eraserButton.style.background = 'rgb(237,237,233)';
        rainbowButton.style.background = 'rgb(214,204,194)';
    })
};

function clearButton(){
    const clearButton = document.querySelector('.clearGrid');
    clearButton.addEventListener("click", () => {
        const column = document.querySelectorAll('.column');
        column.forEach((column) => {
            eraserButtonStatus = false;
            eraserButton.style.background = 'rgb(214,204,194)';
            column.style.background = '';
        })
    })
};

function hexToRgb(hex) {
    // Remove the hash (#) if present
    hex = hex.replace('#', '');

    // Parse the hex values
    var bigint = parseInt(hex, 16);

    // Extract the RGB components
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    // Return the RGB values as an object
    return { r: r, g: g, b: b }
    // return[r,g,b]
}