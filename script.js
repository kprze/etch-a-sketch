let resolution = { // Resolution key values to be used in slider input
    1:256,
    2:128,
    3:64,
    4:32,
    5:16,
    6:8
};

const hexTransparencies = {
    100: 'FF',
    90: 'E6',
    80: 'CC',
    70: 'B3',
    60: '99',   
    50: '80',    
    40: '66',    
    30: '4D',    
    20: '33',    
    10: '1A',
    }

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

let activeColor = '#000000';
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
    slider.addEventListener('input', getSliderColValue);
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

    let opacity = getSliderColValue();

    column.forEach((column) => {
        column.addEventListener("mouseover", () => {
            if (isMouseDown && rainbowButtonStatus) {
                column.style.background = randomColor();
            }
            else if (isMouseDown) {
                column.style.background = activeColor;
                console.log(activeColor);
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
        activeColor = colorSelect.value;
    });
};

function getSliderResValue(){
    const slider = document.querySelector('.sliderColor');
    let resolutionValue = resolution[slider.value];
    setResolution(parseInt(resolutionValue));
    sliderColorText.textContent = `${512/resolutionValue} x ${512/resolutionValue}`;
};

function getSliderColValue(){
    let slider = document.querySelector('.sliderOpacity');
    let opacityValue = hexTransparencies[slider.value];
    return opacityValue;
};

function randomColor(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return ("#" + randomColor);
};

function getRainbowButtonStatus(){
    const rainbowButton = document.querySelector('.rainbowColor');
    rainbowButton.addEventListener("click", () => {
        rainbowButtonStatus = true;
    })
};