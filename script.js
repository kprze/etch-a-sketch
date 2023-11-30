let resolution = { // Resolution key values to be used in slider input
    1:256,
    2:128,
    3:64,
    4:32,
    5:16,
    6:8
};

const gridContainer = document.querySelector('.gridContainer');
const sliderColorContainer = document.querySelector('.sliderColorContainer');
const sliderOpacityContainer = document.querySelector('.sliderOpacityContainer');
const settingsContainer = document.querySelector('.settingsContainer');

drawSlider();
opacitySlider();
colorSelector();
drawRainbowButton();
let sliderColorText = sliderColorContainer.appendChild(document.createElement('p'));
sliderColorText.className = 'sliderText';
getSliderResValue();
getRainbowButtonStatus();

let activeColor = hexToRgb('#000000');
let initialBgColor = '';
let activeRainbowColor = '';
let opacityValue = 1;
let rainbowButtonStatus = false;
let currentBgColor = '';
let rgbaValues = '';
let alphavalues = '';


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
    const slider = sliderColorContainer.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.className = 'sliderColor';
    slider.setAttribute('min','1');
    slider.setAttribute('max','6');
    slider.setAttribute('value','3')
    slider.addEventListener('input', getSliderResValue);
};

function opacitySlider() {
    const slider = sliderOpacityContainer.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.className = 'sliderOpacity';
    slider.setAttribute('min','10');
    slider.setAttribute('max','100');
    slider.setAttribute('value','100');
    slider.setAttribute('step','10');
    slider.addEventListener('input', getSliderOpValue);
}

function drawRainbowButton(){
    const rainbowButton = settingsContainer.appendChild(document.createElement('input'));
    rainbowButton.className = 'rainbowColor';
    rainbowButton.type = 'button'; 
    rainbowButton.value = 'Rainbow Mode';
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

            currentColumn = window.getComputedStyle(column)
            currentBgColor = currentColumn.backgroundColor;
            rgbaValues = currentBgColor.match(/[\d.]+/g).map(Number);
            alphavalues = rgbaValues[3];

            console.log('alpha:', alphavalues)
            console.log('curr color:', currentBgColor, 'typeof:', typeof(currentBgColor))
            // console.log(opacityValue);
            // console.log(currentBgOpacity);

            if (isMouseDown && rainbowButtonStatus) {
                activeRainbowColor = randomColor()
                column.style.background = `rgba(${activeRainbowColor.r},${activeRainbowColor.g},${activeRainbowColor.b},${opacityValue})`;
            }
            else if (isMouseDown) {
                column.style.background = `rgba(${activeColor.r},${activeColor.g},${activeColor.b},${opacityValue})`;
            }
        });

        // Also, retain the click event to paint when clicked
        column.addEventListener("click", () => {

            if (rainbowButtonStatus){
                activeRainbowColor = randomColor()
                column.style.background = `rgba(${activeRainbowColor.r},${activeRainbowColor.g},${activeRainbowColor.b},${opacityValue})`;
            }
            else {
                column.style.background = `rgba(${activeColor.r},${activeColor.g},${activeColor.b},${opacityValue})`;
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
    colorSelect.addEventListener('input', () => {
        rainbowButtonStatus = false;
        activeColor = hexToRgb(colorSelect.value);
    });
};

function getSliderResValue(){
    const slider = document.querySelector('.sliderColor');
    let resolutionValue = resolution[slider.value];
    setResolution(parseInt(resolutionValue));
    sliderColorText.textContent = `${512/resolutionValue} x ${512/resolutionValue}`;
};

function getSliderOpValue(){
    const slider = document.querySelector('.sliderOpacity');
    opacityValue = (slider.value)/100;
};

function randomColor(){
    // const randomColor = Math.floor(Math.random()*16777215).toString(16);
    // return ("#" + randomColor);
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    //return `rgb(${red}, ${green}, ${blue}, ${opacityValue})`;
    return { r: r, g: g, b: b }
};

function getRainbowButtonStatus(){
    const rainbowButton = document.querySelector('.rainbowColor');
    rainbowButton.addEventListener("click", () => {
        rainbowButtonStatus = true;
    })
};

function blend(activeColor,currentBgColor,opacity){

}

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
}