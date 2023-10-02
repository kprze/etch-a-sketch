let rowValue = 8;
let colValue = 8;

let resolution = {
    1:8,
    2:16,
    3:32,
    4:64,
    5:128,
    6:256
};

const gridContainer = document.querySelector('.gridContainer');
const sliderContainer = document.querySelector('.sliderContainer');


drawGrid(rowValue,colValue);
draw();
drawSlider();

let sliderValue = getSliderValue();


function drawGrid(rowValue, colValue){
    const grid = gridContainer.appendChild(document.createElement('div'));
    grid.className = 'grid';

    for(let i = 0; i < rowValue; i++){
        const row = grid.appendChild(document.createElement('div'));
        row.className = 'row';
        row.id = `row${i}`;
        for(let j = 0; j < colValue; j++){
            const column = row.appendChild(document.createElement('div'));
            column.className = 'column';
            column.id = `col${j}`;
        };
    };
};

function drawSlider(){                       
    const slider = sliderContainer.appendChild(document.createElement('input'));
    slider.className = 'slider';
    slider.type = 'range';
    slider.setAttribute('min','1');
    slider.setAttribute('max','6');
    slider.setAttribute('value','4')
    slider.addEventListener('input', getSliderValue);
}

function draw(){
    const column = document.querySelectorAll('.column');
    column.forEach((column => {
        column.addEventListener('click', () => {
            console.log('click')
            column.style.cssText = 'background: red';
        });
    }));
};

function getSliderValue(){
    const slider = document.querySelector('.slider');
    let resolutionValue = resolution[slider.value];
    console.log(parseInt(resolutionValue))
    return parseInt(resolutionValue);
};