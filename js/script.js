let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const width = canvas.width = 512;
const height = canvas.height = 512;
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
snake[1] = {
    x: 7 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
};
let interval = 200;
let velo = 1;
let score = 0;
let lastScore;
let topScore = 0;

const fruit = new Image();
const head = new Image();
const ground = new Image();
const snake_logo = new Image();
const snakeImg = new Image();

fruit.src = "img/fruit.svg";
head.src = "img/snake.svg";
ground.src = "img/piso.jpg";
snake_logo.src = "img/game-logo.svg";

let headFrameX = 0;
let headFrameY = 0;
let frameFood = 0;

const eat = new Audio();
const dead = new Audio();
const theme = new Audio();
const muv = new Audio();
const hurt = new Audio();
const bonus = new Audio();
const title = new Audio();
eat.src = "src/chomp.mp3"
dead.src ="src/gameOver.mp3";
theme.src ="src/theme01.mp3";
hurt.src = "src/hurt.mp3";
muv.src = "src/muv.mp3";
bonus.src = "src/bonus.mp3";
title.src = "src/title.mp3";

var keys = {};
let keyUp = document.getElementById("keyUp");
let keyLeft = document.getElementById("keyLeft");
let keyRight = document.getElementById("keyRight");
let keyDown = document.getElementById("keyDown");
let idCount = 1;
let idBefore = 0;
let idAtual;
let isDead = false;

//Desativa a função "Scroll" das teclas "Arrow".
window.addEventListener("keydown",
    function(e){
        keys[e.code] = true;
        switch(e.code){
            case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            case "Space": e.preventDefault(); break;
            default: break; 
        }
    },
false);

window.addEventListener('keyup',
    function(e){
        keys[e.code] = false;
    },
false);

// Logo no tabuleiro.
function snakeLogo() {
    context.drawImage(snake_logo, 0, 0, 200, 42, (width / 2) - 162, (height / 2) - 34, 324, 68);
}

snakeLogo();

// Desenha o background,
function criarBG() {
    context.drawImage(ground, 0, 0, 16 * box, 16 * box);
}

// Desenha o elemento Snake.
function criarSnake() {
    context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y, box, box);
    for (i = 1; i < snake.length; i++) {
        if(i % 2 == 0) {
            if(snake[i] == snake[snake.length-1]) {
                neighborCheck();
                // context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            } else {
                context.fillStyle = "#A0cB3D";
                context.fillRect(snake[i].x, snake[i].y, box, box);  
            }
        } else if(snake[i] == snake[snake.length-1]) {
            neighborCheck();
            // context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
        } else {
                context.fillStyle = "#729F4C";
                context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }
}

//Checa a localização do vizinho imediato da cauda.
function neighborCheck() {
    if(snake[snake.length-2].x == snake[snake.length-1].x + box && snake[snake.length-2].y == snake[snake.length-1].y) {
        if(i % 2 == 0) {
            context.drawImage(head, 320 * 2, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
        } else {
            if(i == 1) {
                context.drawImage(head, 320 * 2, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);  
            } else {
                context.drawImage(head, 320 * 2, 320 * 3, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            }
        }
    } else if(snake[snake.length-2].x == snake[snake.length-1].x && snake[snake.length-2].y == snake[snake.length-1].y + box) {
        if(i % 2 == 0) {
            context.drawImage(head, 320 * 3, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
        } else {
            if(i == 1) {
                context.drawImage(head, 320 * 3, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);    
            } else{
                context.drawImage(head, 320 * 3, 320 * 3, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            } 
        }
    } else if(snake[snake.length-2].x == snake[snake.length-1].x && snake[snake.length-2].y == snake[snake.length-1].y - box) {
        if(i % 2 == 0) {
            context.drawImage(head, 320 * 1, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
        } else {
            if(i == 1) {
                context.drawImage(head, 320 * 1, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            } else {
                context.drawImage(head, 320 * 1, 320 * 3, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            }
        }
    } else if(snake[snake.length-2].x == snake[snake.length-1].x - box && snake[snake.length-2].y == snake[snake.length-1].y) {
        if(i % 2 == 0) {
            context.drawImage(head, 320 * 0, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
        } else {
            if(i == 1) {
                context.drawImage(head, 320 * 0, 320 * 2, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            } else {
                context.drawImage(head, 320 * 0, 320 * 3, 320, 320, snake[snake.length-1].x, snake[snake.length-1].y, box, box);
            }   
        }
    }
}

//Reproduz o tema da tela de título.
title.play();
title.loop = true;

//Desenha a comida.
function drawFood() {
    context.drawImage(fruit, 320 * frameFood, 0, 320, 320, food.x, food.y, box, box);
}

//Atribui funções às teclas "Arrow".
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
        keyLeft.classList.add("hover");
        setTimeout(function() {
            keyLeft.classList.remove("hover");
        },200);
    }

    else if (event.keyCode == 38 && direction != "down") {
        direction = "up";
        keyUp.classList.add("hover");
        setTimeout(function() {
            keyUp.classList.remove("hover");
        },200);
    }
    else if (event.keyCode == 39 && direction != "left") {
        direction = "right";
        keyRight.classList.add("hover");
        setTimeout(function() {
            keyRight.classList.remove("hover");
        },200);
    }
    else if (event.keyCode == 40 && direction != "up") {
        direction = "down";
        keyDown.classList.add("hover");
        setTimeout(function() {
            keyDown.classList.remove("hover");
        },200);
    }  
}

//Checa se está ocorrendo colisões entre a cabeça e o corpo.
function collision(head,array) {       
    for (i = 1; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//Atribui a lógica do bônus.
function extra() {
    // console.log((score + 1) % 5);
    if(score > 1 && (score + 1) % 5 === 0) {
        theme.pause();
        bonus.play();
        bonus.currentTime = 0;
        theme.play();
        document.getElementById("board-text").innerHTML = "Nham-Nham! <br><br>BÔNUS!<br><br> <i>Ponto Extra!</i>";
        document.getElementById("board-text").classList.add("blink");
        score++;
        if(isDead == false) {
            setTimeout(function() {
                document.getElementById("board-text").innerText = "Coma todos os Snacks!";
                document.getElementById("board-text").classList.remove("blink"); 
            },3000);
        }
    } 
}

function zeroEsquerda(numero, comprimento) {
    numero = numero.toString();
    while (numero.length < comprimento) 
        numero = "0" + numero;
    return numero;
}

//Aplica o placar no elemento da página.
function setScore() {
    if(score <= 1) {
        document.getElementById("placar").innerHTML = '<h2 class="fw-bold" id="placar">Score: '+ zeroEsquerda(score, 2) +' snack</h2>';
        document.getElementById("placar").classList.add("blink");
        setTimeout(function(){
            document.getElementById("placar").classList.remove("blink");
        },3000);
    } else {
        document.getElementById("placar").innerHTML = '<h2 class="fw-bold" id="placar">Score: '+ zeroEsquerda(score, 2) +' snacks</h2>';
        document.getElementById("placar").classList.add("blink");
        setTimeout(function(){
            document.getElementById("placar").classList.remove("blink");
        },3000);
    }
}

//Aplica a velocidade no elemento da página.
function setVelo() {
    document.getElementById("velo").innerHTML = '<h4 class="fw-bold text-end" id="velo">Velocidade: '+ velo +'</h4>';
}

//Atualiza o valor do maior placar. 
function setTopScore() {
    if(lastScore > topScore) {
        topScore = zeroEsquerda(lastScore, 2);
        if(topScore <= 1) {
            document.getElementById("top-score").innerHTML = '<h5 class="fst-italic text-start" id="top-score">Top Score: '+ topScore +' snack</h5>';
        } else {
            document.getElementById("top-score").innerHTML = '<h5 class="fst-italic text-start" id="top-score">Top Score: '+ topScore +' snacks</h5>';
        }
    }
}

let cesta = document.getElementById("snacks");
let fig = document.getElementById("img_1");
fig.style.backgroundPosition = `${frameFood * -32}px 0px`;

//Gerencia a criação de sprites para o submenu.
function sprites() {
let sprite = document.createElement("div");
sprite.style.height = "32px";
sprite.style.width = "32px";
sprite.style.backgroundImage = `url(${fruit.src})`;
sprite.style.backgroundSize = "224px";
sprite.style.backgroundPosition = `${frameFood * -32}px 0px`;
sprite.setAttribute("id","img_" + idCount);
sprite.classList.add("blink");
if(document.getElementById("img_"+ idAtual))
{
    document.getElementById("img_"+ idAtual).classList.remove("blink");
};
if(document.getElementById("img_"+ idBefore))
{
    document.getElementById("img_"+ idBefore).classList.remove("blink");
};
cesta.appendChild(sprite);
}

//Condição para remover os sprites do submenu quando atingem a quantidade limite.
function removeChild() {
    let count = cesta.childElementCount;
    if(count > 42) {
        resetChild();
        sprites();
    }
}

//Remove os sprites.
function resetChild() {
    cesta.innerHTML = "";
}

//Função principal.
function iniciarJogo() {
    if(document.getElementById("img_1") && document.getElementById("img_1").classList.contains("hidden")) {
        document.getElementById("img_1").classList.remove("hidden");
    }
    title.pause();
    console.log(snake.length);
    // Toca a música tema.
    theme.play();
    theme.loop = true;

    // Altera a variável que representa o sprite da cabeça dependendo do movimento.
    if (direction == "right") headFrameX = 0;
    if (direction == "down") headFrameX = 1;
    if (direction == "left") headFrameX = 2;
    if (direction == "up") headFrameX = 3;

    // Previne que a comida seja gerada no mesmo local do corpo da Snake.
    for (i = 1; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
            food.x = Math.floor(Math.random() * 16) * box;
            food.y = Math.floor(Math.random() * 16) * box;
        }
    }

    criarBG();
    criarSnake();
    drawFood();
    setVelo();
    removeChild();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Regras de movimento.
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        muv.play();
        snake.pop();

    } else {
        //Atribui incrementos quando se ganha pontos.
        eat.play();
        eat.currentTime = 0;
        extra();
        score++;
        setScore();
        velo++;
        food.x = Math.floor(Math.random() * 16) * box;
        food.y = Math.floor(Math.random() * 16) * box;
        frameFood = Math.floor(Math.random() * 7);
        interval -= 5;
        idCount++;
        idBefore++;
        sprites();
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, interval); 
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
    // Regras de fim de Jogo.
    if (snake[0].x > 15 * box && direction == "right" || snake[0].x < 0 && direction == "left" || snake[0].y > 15 * box && direction == "down" || snake[0].y < 0 && direction == "up" || collision(newHead,snake)) {
        headFrameY = 1;
        
    // Configura o sprite de morte.
        if(direction == "left") {
            context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x + box, snake[0].y, box, box);
        } 
        else if (direction == "right") {
            context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x - box, snake[0].y, box, box);
        }
        else if (direction == "up") {
            context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y + box, box, box)
        }
        else if (direction == "down") {
            context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y - box, box, box)
        }
        
        clearInterval(jogo);
        //Executa funções e updates no fim do jogo.
        document.getElementById("play-btn").disabled = true;
        document.getElementById("reset-btn").disabled = true;
        document.getElementById("board-text").innerHTML= "Game Over! <br><i>Que Pena, estava indo bem!</i> <br><br>Clique em REINICIAR e tente novamente!";
        document.getElementById("header").classList.remove("navbar-mod");
        if(document.getElementById("board-text").classList.contains("blink")) {
            document.getElementById("board-text").classList.remove("blink");
        }
        isDead = true;
        theme.pause();
        theme.currentTime = 0;
        lastScore = score;
        idAtual = idCount;
        hurt.play();
        dead.play();
        dead.onended = function() {
            document.getElementById("reset-btn").disabled = false;
        }
    }
}

//Atribui funções ao botão "Jogar".
document.getElementById("play-btn").addEventListener("click", function() {
    // window.requestAnimationFrame(iniciarJogo);
    if (jogo) {
        clearInterval(jogo);
        jogo = null;
    } else {
        jogo = setInterval(iniciarJogo, interval);
    }
    window.scrollTo( 0, 77 ); 
    
    document.getElementById("header").classList.add("navbar-mod");
    
    if (document.getElementById("play-btn").innerText == "PAUSAR") {
        document.getElementById("play-btn").innerText = "PAUSADO";
        document.getElementById("play-btn").classList.add("blink");
    } else {
        document.getElementById("play-btn").innerText = "PAUSAR";
        document.getElementById("play-btn").classList.remove("blink");
    }
    document.getElementById("board-text").innerText = "Coma todos os Snacks!";
},
false);

//Cria a função "Reiniciar".
function reinicio() {
    window.requestAnimationFrame(iniciarJogo);
    direction = "right";
    window.scrollTo( 0, 77 );
    if (jogo) {
        clearInterval(jogo);
        jogo = null;
    } else {
     jogo = setInterval(iniciarJogo, interval);
    }
    interval = 200;
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    };
    snake[1] = {
        x: 7 * box,
        y: 8 * box
    };
    headFrameY = 0;
    snake.length = 2;
    velo = 1;
    score = 0;
    setScore();
    resetChild();
    setTopScore();
    sprites();
    idCount = 1;
    idBefore = 0;
    document.getElementById("header").classList.add("navbar-mod");
    document.getElementById("board-text").innerText = "Coma todos os Snacks!";
    dead.pause();
    dead.currentTime = 0;
    if (document.getElementById("play-btn").innerText == "PAUSADO") {
        document.getElementById("play-btn").innerText = "PAUSAR";
        document.getElementById("play-btn").classList.remove("blink");
    }
    document.getElementById("play-btn").disabled = false;
}

//Atribui função "Reiniciar" ao botão.
document.getElementById("reset-btn").addEventListener("click", function() {
    window.requestAnimationFrame(iniciarJogo);
    reinicio();
    setTimeout(function() {
        reinicio();
    },100);
}
,false);

let jogo;

