let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const width = canvas.width = 540;
const height = canvas.height = 540;
let box = 30;
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
    x: Math.floor((Math.random() * 16) + 1) * box,
    y: Math.floor((Math.random() * 16) + 1) * box
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

fruit.src = "img/fruit.svg";
head.src = "img/snake.svg";
ground.src = "img/piso_c.jpg";
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
const pipe = new Audio();
const pause = new Audio();
// const title = new Audio();

eat.src = "src/chomp.mp3"
dead.src ="src/gameOver.mp3";
theme.src ="src/theme01.mp3";
hurt.src = "src/hurt.mp3";
muv.src = "src/muv.mp3";
bonus.src = "src/bonus.mp3";
pipe.src = "src/pipe.mp3";
pause.src = "src/pause.mp3";
// title.src = "src/title.mp3";

var keys = {};
let keyUp = document.getElementById("keyUp");
let keyLeft = document.getElementById("keyLeft");
let keyRight = document.getElementById("keyRight");
let keyDown = document.getElementById("keyDown");
let idCount = 1;
let idBefore = 0;
let idAtual;
let isDead = false;

// Desativa a função "Scroll" das teclas "Arrow".
function loadScroll() {
    window.scrollTo(0, 39);
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
}

// Adiciona funções ao botão de switch de dificuldades.
document.getElementById("toggle").addEventListener("click", function() {
    if(document.getElementById("toggle").checked == true) {
        muv.play();
        muv.currentTime = 0;
        document.getElementById("hard").classList.add("fw-bold")
        document.getElementById("easy").classList.remove("fw-bold");
    } else {
        muv.play();
        muv.currentTime = 0;
        document.getElementById("easy").classList.add("fw-bold");
        document.getElementById("hard").classList.remove("fw-bold");
    }
},false);


// Logo no tabuleiro.
function snakeLogo() {
    context.font = "600 25px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Thiago Miranda apresenta:",(width / 2), (height / 2) - 55);
    context.drawImage(snake_logo, 0, 0, 200, 42, (width / 2) - 162, (height / 2) - 34, 324, 68);
}

// Desenha o background,
function criarBG() {
    context.drawImage(ground, 0, 0, 18 * box, 18 * box);
}

// Desenha o elemento Snake.
function criarSnake() {
    context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y, box, box);
    for(i = 1; i < snake.length; i++) {
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

// Checa a localização do vizinho imediato da cauda.
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

// Desenha a comida.
function drawFood() {
    context.drawImage(fruit, 320 * frameFood, 0, 320, 320, food.x, food.y, box, box);
}

let inputs = [];

// Atribui funções às teclas "Arrow".
document.addEventListener('keydown', update);

function update(event) {
    inputs.push(event.keyCode);
    
    if(inputs.length > 0) {
        const key = inputs.shift();
        switch(direction) {
            case "left": case "right": 
                direction = (key === 38 ? "up" : (key === 40 ? "down" : direction)); break;
            case "up": case "down":
                direction = (key === 37 ? "left" : (key === 39 ? "right" : direction)); break;
        }
    }

    // Atualiza mostrador das setas em tempo real.
    switch (event.keyCode) {
        case 37: 
            keyLeft.classList.add("hover");
            setTimeout(function() {
                keyLeft.classList.remove("hover");
            },200);
        break;
        case 38: 
            keyUp.classList.add("hover");
            setTimeout(function() {
                keyUp.classList.remove("hover");
            },200);
        break;
        case 39: 
            keyRight.classList.add("hover");
            setTimeout(function() {
                keyRight.classList.remove("hover");
            },200);
        break;
        case 40: 
            keyDown.classList.add("hover");
            setTimeout(function() {
                keyDown.classList.remove("hover");
            },200);
        break; 
    }  
}

// Checa se está ocorrendo colisões entre a cabeça e o corpo.
function collision(head,array) {       
    for(i = 1; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Checa as colisões nas paredes.
function wallCollision() {
    if(snake[0].x < 1 * box && snake[0].y < 8 * box && direction == "up"
    || snake[0].x < 1 * box && snake[0].y > 9 * box && direction == "down"
    || snake[0].x > 16 * box && snake[0].y < 8 * box && direction == "up"
    || snake[0].x > 16 * box && snake[0].y > 9 * box && direction == "down"
    || snake[0].y < 1 * box && snake[0].x < 2 * box && direction == "left"
    || snake[0].y < 1 * box && snake[0].x > 15 * box && direction == "right"
    || snake[0].y > 16 * box && snake[0].x < 2 * box && direction == "left"
    || snake[0].y > 16 * box && snake[0].x > 15 * box && direction == "right" 
    ) {
        return true;
    }
    return false;
}

// Checa as colisões ao redor das portas. 
function doorCollision() {
    if(snake[0].y < 1 * box && snake[0].x == 4 * box
    || snake[0].y < 1 * box && snake[0].x == 13 * box
    || snake[0].y > 16 * box && snake[0].x == 4 * box
    || snake[0].y > 16 * box && snake[0].x == 13 * box
    ) {
        return true;
    }
    return false;
}

// Adiciona as condições de "warp" dos túneis.
function warpPipe() {
    if(snake[0].x > 17 * box && direction == "right") {
        if(document.getElementById("toggle").checked == true) {
            testPipe();
        } else {
            snake[0].x = 0 * box;
        }
        theme.pause();
        pipe.play();
        pipe.onended = function(){
            pipe.currentTime = 0;
            theme.play();
        }
    } else if(snake[0].x < 0 * box && direction == "left") {
        if(document.getElementById("toggle").checked == true) {
            testPipe();
        } else {
            snake[0].x = 17 * box;
        }
        theme.pause();
        pipe.play();
        pipe.onended = function(){
            pipe.currentTime = 0;
            theme.play();
        }
    } else if(snake[0].y > 17 * box && direction == "down") {
        if(document.getElementById("toggle").checked == true) {
            testPipe();
        } else {
            snake[0].y = 0 * box;
        }
        theme.pause();
        pipe.play();
        pipe.onended = function(){
            pipe.currentTime = 0;
            theme.play();
        }
    } else if(snake[0].y < 0 * box && direction == "up") {
        if(document.getElementById("toggle").checked == true) {
            testPipe();
        } else {
            snake[0].y = 17 * box;
        }
        theme.pause();
        pipe.play();
        pipe.onended = function(){
            pipe.currentTime = 0;
            theme.play();
        }
    }
}

let sort;

// Sorteia entre 2 números inteiros.
function betweenTwo(n1, n2) {
    sort = Math.floor(Math.random() * 10);
    if(sort < 5) {
        return n1
    } else {
        return n2;
    }
}

// Sorteia entre 4 números inteiros.
function betweenFour(n1, n2, n3, n4) {
    sort = Math.floor(Math.random() * 16);
    if(sort < 4) {
        return n1;
    } else if(sort > 3 && sort < 8) {
        return n2;
    } else if(sort > 7 && sort < 12) {
        return n3;
    } else if(sort > 11 && sort < 16) {
        return n4;
    }
}

// Função de aleatoriedade de "warp" dos túneis.
function sortPipe(a1, a2, b1, b2, c1, c2, c3, c4, d1, d2, d3, d4) {
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            snake[0].x = 0 * box;
            snake[0].y = betweenTwo(a1, a2) * box;
            direction = "right";
            pipe.play();
            pipe.currentTime = 0;
        break;

        case 1:
            snake[0].x = 17 * box;
            snake[0].y = betweenTwo(b1, b2) * box;
            direction = "left";
            pipe.play();
            pipe.currentTime = 0;
        break;

        case 2:
            snake[0].y = 0 * box;
            snake[0].x = betweenFour(c1, c2, c3, c4) * box;
            direction = "down";
            pipe.play();
            pipe.currentTime = 0;
        break;

        case 3:
            snake[0].y = 17 * box;
            snake[0].x = betweenFour(d1, d2, d3, d4) * box;
            direction = "up";
            pipe.play();
            pipe.currentTime = 0;
        break;
    }   
}

// function sortPipe() {
//     switch (Math.floor(Math.random() * 4)) {
//         case 0:
//             snake[0].x = 0 * box;
//             snake[0].y = betweenTwo(8, 9) * box;
//             direction = "right";
//             pipe.play();
//             pipe.currentTime = 0;
//         break;

//         case 1:
//             snake[0].x = 17 * box;
//             snake[0].y = betweenTwo(8, 9) * box;
//             direction = "left";
//             pipe.play();
//             pipe.currentTime = 0;
//         break;

//         case 2:
//             snake[0].y = 0 * box;
//             snake[0].x = betweenFour(2, 3, 14, 15) * box;
//             direction = "down"
//             pipe.play();
//             pipe.currentTime = 0;
//         break;

//         case 3:
//             snake[0].y = 17 * box;
//             snake[0].x = betweenFour(2, 3, 14, 15) * box;
//             direction = "up"
//             pipe.play();
//             pipe.currentTime = 0;
//         break;
//     }   
// }

// Aplica a aleatoriedade do "warp".
function testPipe() {
    switch(direction) {
        case "right":
            if(snake[0].y == 8 * box) {
                sortPipe(9, 9, 8, 9, 2, 3, 14, 15, 2, 3, 14, 15);
            } else if(snake[0].y == 9 * box) {
                sortPipe(8, 8, 8, 9, 2, 3, 14, 15, 2, 3, 14, 15);
            }
        break;
        case "left":
            if(snake[0].y == 8 * box) {
                sortPipe(8, 9, 9, 9, 2, 3, 14, 15, 2, 3, 14, 15);
            } else if(snake[0].y == 9 * box) {
                sortPipe(8, 9, 8, 8, 2, 3, 14, 15, 2, 3, 14, 15);
            }
        break;
        case "down":
            if(snake[0].x == 2 * box) {
                sortPipe(8, 9, 8, 9, 3, 3, 14, 15, 2, 3, 14, 15);
            } else if(snake[0].x == 3 * box) {
                sortPipe(8, 9, 8, 9, 2, 14, 14, 15, 2, 3, 14, 15);
            } else if(snake[0].x == 14 * box) {
                sortPipe(8, 9, 8, 9, 2, 3, 15, 15, 2, 3, 14, 15);
            } else if(snake[0].x == 15 * box) {
                sortPipe(8, 9, 8, 9, 2, 2, 3, 14, 2, 3, 14, 15);
            }
        break;
        case "up":
            if(snake[0].x == 2 * box) {
                sortPipe(8, 9, 8, 9, 2, 3, 14, 15, 3, 3, 14, 15);
            } else if(snake[0].x == 3 * box) {
                sortPipe(8, 9, 8, 9, 2, 3, 14, 15, 2, 14, 14, 15);
            } else if(snake[0].x == 14 * box) {
                sortPipe(8, 9, 8, 9, 2, 3, 14, 15, 2, 3, 15, 15);
            } else if(snake[0].x == 15 * box) {
                sortPipe(8, 9, 8, 9, 2, 3, 14, 15, 2, 2, 3, 14);
            }
        break;
    }
}

//Atribui a lógica do bônus.
function extra() {
    // console.log((score + 1) % 5);
    if(score > 1 && (score + 1) % 5 === 0) {
        theme.pause();
        bonus.play();
        bonus.onended = function() {
            bonus.currentTime = 0;
            theme.play();
        }
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

// Implementa os zeros à esquerda nos marcadores de placar.
function zeroEsquerda(numero, comprimento) {
    numero = numero.toString();
    while (numero.length < comprimento) 
        numero = "0" + numero;
    return numero;
}

// Aplica o resultado do placar no elemento da página.
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

// Aplica o valor da velocidade no elemento da página.
function setVelo() {
    document.getElementById("velo").innerHTML = '<h4 class="fw-bold text-end" id="velo">Velocidade: '+ velo +'</h4>';
}

// Atualiza o valor do maior placar. 
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

// Gerencia a criação de sprites para o submenu.
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

// Condição para remover os sprites do submenu quando atingem a quantidade limite.
function removeChild() {
    let count = cesta.childElementCount;
    if(count > 35) {
        resetChild();
        sprites();
    }
}

// Remove todos os sprites.
function resetChild() {
    cesta.innerHTML = "";
}

loadScroll();
snakeLogo();

//Função principal.
function iniciarJogo() {
    if(document.getElementById("img_1") && document.getElementById("img_1").classList.contains("hidden")) {
        document.getElementById("img_1").classList.remove("hidden");
    }

    // Toca a música tema.
    theme.play();
    theme.loop = true;

    // Previne que a comida seja gerada no mesmo local do corpo da Snake.
    for (i = 1; i < snake.length; i++) {
        if(food.x == snake[i].x && food.y == snake[i].y) {
            food.x = Math.floor((Math.random() * 16) + 1) * box;
            food.y = Math.floor((Math.random() * 16) + 1) * box;
        }
    }

    criarBG();
    criarSnake();
    drawFood();
    setVelo();
    removeChild();
    warpPipe();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Regras de movimento.
    switch(direction) {
        case "left":
            snakeX -= box;
            headFrameX = 2; break;

        case "up":
            snakeY -= box; 
            headFrameX = 3; break;

        case "right":
            snakeX += box;
            headFrameX = 0; break;

        case "down":
            snakeY += box;
            headFrameX = 1; break;
    }

    if(snakeX != food.x || snakeY != food.y) {
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
        food.x = Math.floor((Math.random() * 16) + 1) * box;
        food.y = Math.floor((Math.random() * 16) + 1) * box;
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
    // if (snake[0].x > 15 * box && direction == "right" || snake[0].x < 0 && direction == "left" || snake[0].y > 15 * box && direction == "down" || snake[0].y < 0 && direction == "up" || collision(newHead,snake)) {
    //     headFrameY = 1;

    if(snake[0].x > 16 * box && direction == "right" && snake[0].y < 8 * box
    || snake[0].x > 16 * box && direction == "right" && snake[0].y > 9 * box
    || snake[0].x < 1 * box && direction == "left" && snake[0].y < 8 * box
    || snake[0].x < 1 * box && direction == "left" && snake[0].y > 9 * box
    || snake[0].y > 16 * box && direction == "down" && snake[0].x < 2 * box
    || snake[0].y > 16 * box && direction == "down" && snake[0].x > 3 * box && snake[0].x < 14 * box
    || snake[0].y > 16 * box && direction == "down" && snake[0].x > 15 * box 
    || snake[0].y < 1 && direction == "up" && snake[0].x < 2 * box
    || snake[0].y < 1 && direction == "up" && snake[0].x > 3 * box && snake[0].x < 14 * box
    || snake[0].y < 1 && direction == "up" && snake[0].x > 15 * box
    || collision(newHead,snake)
    || wallCollision()
    || doorCollision()) {
        headFrameY = 1;
        
        // Configura o sprite de morte.
        switch(direction) {
            case "left":
                context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x + box, snake[0].y, box, box); break;
            case "right":
                context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x - box, snake[0].y, box, box); break;
            case "up":
                context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y + box, box, box); break;
            case "down":
                context.drawImage(head, 320 * headFrameX, 320 * headFrameY, 320, 320, snake[0].x, snake[0].y - box, box, box); break;
        }
        
        clearInterval(jogo);
        // Executa funções e updates no fim do jogo.
        document.getElementById("play-btn").disabled = true;
        document.getElementById("reset-btn").disabled = true;
        document.getElementById("toggle").disabled = false;
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

let isPaused = false;

// Atribui funções ao botão "Jogar".
document.getElementById("play-btn").addEventListener("click", inicio = function() {
    // window.requestAnimationFrame(iniciarJogo);
    if(jogo) {
        clearInterval(jogo);
        jogo = null;
    } else {
        jogo = setInterval(iniciarJogo, interval);
    }
    window.scrollTo( 0, 77 ); 
    
    document.getElementById("reset-btn").disabled = false;
    document.getElementById("toggle").disabled = true;
    document.getElementById("header").classList.add("navbar-mod");
    
    if(isPaused) {
        pause.play();
        pause.currentTime = 0;
    }

    // Atribui a função pausar.
    if(document.getElementById("play-btn").innerText == "PAUSAR") {
        document.getElementById("play-btn").innerText = "PAUSADO";
        document.getElementById("board-text").innerText = "Tire um tempinho... E me traga um café!";
        isPaused = true;
        theme.pause();
        pause.play();
        pause.currentTime = 0;
        document.getElementById("header").classList.remove("navbar-mod");
        document.getElementById("toggle").disabled = false;
        document.getElementById("play-btn").classList.add("blink");
    } else {
        theme.play();
        isPaused = false;
        document.getElementById("play-btn").innerText = "PAUSAR";
        document.getElementById("play-btn").classList.remove("blink");
        document.getElementById("board-text").innerText = "Coma todos os Snacks!";
    }
},
false);

document.getElementById("reset-btn").disabled = true;

//Cria a função "Reiniciar".
function reinicio() {
    window.requestAnimationFrame(iniciarJogo);
    direction = "right";
    window.scrollTo( 0, 77 );
    if(jogo) {
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
        inicio();
        document.getElementById("play-btn").innerText = "PAUSAR";
        document.getElementById("play-btn").classList.remove("blink");
    } 
    // document.getElementById("play-btn").disabled = false;
}

//Atribui função "Reiniciar" ao botão.
document.getElementById("reset-btn").addEventListener("click", function() {
    window.requestAnimationFrame(iniciarJogo);
    if(isPaused == true) {
        inicio();
    }
    reinicio();
    setTimeout(function() {
        reinicio();
    },100);
}
,false);

let jogo;

