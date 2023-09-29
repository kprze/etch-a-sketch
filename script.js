let rowValue = 64;
let colValue = 64;

drawGrid(rowValue,colValue);
draw();

function drawGrid(rowValue, colValue){
    // const grid = document.body.appendChild(document.createElement('div'));
    // grid.className = 'grid';
    const grid = document.querySelector('.grid')

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

function draw(){
    const column = document.querySelectorAll('.column');
    column.forEach((column => {
        column.addEventListener('click', () => {
            console.log('click')
            column.style.cssText = 'background: red';
        });
    }));
};