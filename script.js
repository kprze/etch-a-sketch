let resolution = {
    6:8,
    5:16,
    4:32,
    3:64,
    2:128,
    1:256
};

const gridContainer = document.querySelector('.gridContainer');
const sliderContainer = document.querySelector('.sliderContainer');

drawSlider();

let sliderText = sliderContainer.appendChild(document.createElement('p'));
sliderText.className = 'sliderText';
getSliderValue();

function drawGrid(pixelSize){
    gridContainer.textContent = '';

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
    slider.className = 'slider';
    slider.type = 'range';
    slider.setAttribute('min','1');
    slider.setAttribute('max','6');
    slider.setAttribute('value','3')
    slider.addEventListener('input', getSliderValue);
};

function draw(){
    const column = document.querySelectorAll('.column');
    column.forEach((column => {
        column.addEventListener('click', () => {
            column.style.background = 'red';
        });
    }));
};

function getSliderValue(){
    const slider = document.querySelector('.slider');
    let resolutionValue = resolution[slider.value];
    setResolution(parseInt(resolutionValue));
    sliderText.textContent = `${512/resolutionValue} x ${512/resolutionValue}`;
};

function setResolution(sliderValue){
    let result = 512/sliderValue;
    drawGrid(result);
};
