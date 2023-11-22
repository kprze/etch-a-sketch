let resolution = { // Resolution key values to be used in slider input
    1:256,
    2:128,
    3:64,
    4:32,
    5:16,
    6:8
};

const gridContainer = document.querySelector('.gridContainer');
const sliderContainer = document.querySelector('.sliderContainer');
const settingsContainer = document.querySelector('.settingsContainer');

drawSlider();
colorSelector();
drawRainbowButton();
let sliderText = sliderContainer.appendChild(document.createElement('p'));
sliderText.className = 'sliderText';
getSliderValue();
getRainbowButtonStatus();

let activeColor = getColorValue();
let rainbowButtonStatus = false;

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

    sliderText.textContent = '';
    draw();
};

function drawSlider(){                  
    const slider = sliderContainer.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.className = 'slider';
    slider.setAttribute('min','1');
    slider.setAttribute('max','6');
    slider.setAttribute('value','3')
    slider.addEventListener('input', getSliderValue);
};

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
            if (isMouseDown && rainbowButtonStatus) {
                column.style.background = randomColor();
            }
            else if (isMouseDown) {
                column.style.background = activeColor;
            }
        });

        // Also, retain the click event to paint when clicked
        column.addEventListener("click", () => {
            if (rainbowButtonStatus){
                column.style.background = randomColor()
            }
            else {
                column.style.background = activeColor;
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
        activeColor = getColorValue();
    });
}

function getColorValue(){
    let color = document.querySelector('.colorSelect');
    return color.value;
}

function getSliderValue(){
    const slider = document.querySelector('.slider');
    let resolutionValue = resolution[slider.value];
    setResolution(parseInt(resolutionValue));
    sliderText.textContent = `${512/resolutionValue} x ${512/resolutionValue}`;
};

function randomColor(){
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return ("#" + randomColor);
}

function getRainbowButtonStatus(){
    const rainbowButton = document.querySelector('.rainbowColor');
    rainbowButton.addEventListener("click", () => {
        rainbowButtonStatus = true;
    })
};