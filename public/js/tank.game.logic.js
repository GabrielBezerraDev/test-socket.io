const tank = document.querySelector(".tank");
const globalTankCoo = tank.getBoundingClientRect();
const styleTank = getComputedStyle(tank);
const keyboardPress = {};
const mousePress = {};
let rotate = 0;
let changeRotation = false;
const panelGame = document.querySelector(".panelGame");
const stylePanelGame = getComputedStyle(panelGame);
let speed = 10;
let debugActiveted = false;

window.addEventListener('keydown', (event) => {
    keyboardPress[event.code] = true;
});

window.addEventListener('mousedown', (event) => {
    mousePress[event.button] = true;
});

window.addEventListener('mouseup', (event) => {
    mousePress[event.button] = false;
});

window.addEventListener('keyup', (event) => {
    keyboardPress[event.code] = false;
});
document.querySelector(".speed").addEventListener("click", changeSpeed);

document.querySelector('.debugButton').addEventListener('click', () => {
    debugActiveted ? debugActiveted = false : debugActiveted = true;
});

window.addEventListener('mousemove', (event) => {
    if(debugActiveted) console.log(event.clientX, event.clientY);
});

function changeSpeed(){
    speed = Number(prompt("Qual a velocidade que você deseja?"));
}

function shoot(){
    createBullet();
}

function createBullet(){
    let div = document.createElement("div");
    div.style.width = '8px';
    div.style.height = '8px';
    div.style.borderRadius = "50%";
    div.style.backgroundColor = "grey";
    div.style.border = '1px solid black';
    div.style.position = 'absolute';
    div.style.top = styleTank.top;
    div.style.left = styleTank.left;
    panelGame.appendChild(div);
    bulletMovement(div);
}

function stateGame(){
    setInterval(() => {
        if(mousePress[0] && (keyboardPress['KeyA'] || keyboardPress['KeyD'])){
            if(keyboardPress['KeyA']){
                rotate -= 5;
                tank.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
                console.log('mudando a rotação');
            }else if(keyboardPress['KeyD']){
                rotate += 5;
                tank.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
                console.log('mudando a rotação');
            }
            changeRotation = true;
        }else{
            changeRotation = false;
        }
        if(keyboardPress['KeyD'] && !changeRotation){
            playerMovement('left','+');
        }
        if(keyboardPress['KeyS'] && !changeRotation){
            playerMovement('top','+');
        }
        if(keyboardPress['KeyA'] && !changeRotation){
            playerMovement('left','-');
        }
        if(keyboardPress['KeyW'] && !changeRotation){
            playerMovement('top','-');
        }
        if(keyboardPress['Space']){
            shoot();
        }
    }, 70);
} 

// console.log(styleTank.top, styleTank.left);
// console.log(document.elementFromPoint(globalTankCoo.left,globalTankCoo.top));
// console.log(styleTank.left,styleTank.top);
// console.log(globalTankCoo.left,globalTankCoo.top);

// function teste(){
//     let teste = document.createElement('div');
//     teste.style.width = '10px';
//     teste.style.height = '10px';
//     teste.style.backgroundColor = 'grey';
//     teste.style.position = 'absolute';
//     teste.style.top = `${globalTankCoo.top}px`;
//     teste.style.left = `${globalTankCoo.left}px`;
//     document.querySelector('body').appendChild(teste);
// }
// teste();

function bulletMovement(bullet){
    let bulletInterval = setInterval(() => {
        let styleBullet = getComputedStyle(bullet);
        let globalCoo = bullet.getBoundingClientRect();
        let cooX = getNumberFromString(styleBullet.left) + 8;
        let bulletCollider = document.elementFromPoint(globalCoo.left, globalCoo.top);
        if(cooX < getNumberFromString(stylePanelGame.width) && 
            (
                bulletCollider.classList.contains("panelGame") ||
                bulletCollider.classList.contains("tank")
            )
        ){
            bullet.style.left = `calc(${styleBullet.left} + 8px)`;
        }
        else{
            bullet.remove();
            clearInterval(bulletInterval);
            return;
        }
    }, 10);
}

function playerMovement(direction, sign){
    tank.style[direction] = `calc(${styleTank[direction]} ${sign} ${speed}px)`;
}

function getNumberFromString(string){
    return Number(string.match(/-?\d+(\.\d+)?/)[0]);;
}

stateGame();