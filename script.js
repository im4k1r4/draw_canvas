// Dados Iniciais
let currentColor = 'black';
let screen = document.querySelector('#tela');
let canDraw = false;
let ctx = screen.getContext('2d'); // duas dimensões de contexto
let mouseX = 0;
let mouseY = 0;

// Eventos:
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent); // chama a função colorclickevent quando uma cor é clicada
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

/*
- Click ativo: ativa o modo desenho;
- Mouse movendo: se o modo desenho estiver ativado, desenhe;
- Click solto: desativa o modo desenho.
*/

// Funções
function colorClickEvent(e) { // fn para saber a cor selecionada
    let color = e.target.getAttribute('data-color'); 
    currentColor = color; // recebe o color

    document.querySelector('.color.active').classList.remove('active'); // removo quem estiver com a class active
    e.target.classList.add('active'); // ativa a cor selecionada
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft; // eixo x - o lado de fora da "lousa"
    mouseY = e.pageY - screen.offsetTop; // eixo y - o lado de fora da "lousa"
}

function mouseMoveEvent(e) {
    if(canDraw) {
      draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x,  y) {
    let pointX = x - screen.offsetLeft; // pegar a posição que tenho que desenhar
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5; // largura da linha a desenhar
    ctx.lineJoin = "round"; // formato da linha, no caso circulo
    ctx.moveTo(mouseX, mouseY); // mover o cursor para a posição inicial (x e y)
    ctx.lineTo(pointX, pointY); // faça uma linha até o ponto x e ponto y
    ctx.closePath(); // fechar o processo de desenho
    ctx.strokeStyle = currentColor; // cor da linha
    ctx.stroke(); // finalizar todo o processo

    mouseX = pointX; // salvar a posição atual
    mouseY = pointY; // salvar a posição atual
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // setar posição geral e zerar o cursor e o processo. Posições de matriz 2d
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) // limpar retangulo, da posição 0 até o fim da tela (largura completa)
}