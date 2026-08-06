    // fro canvas //
    const canvas = document.getElementById("game");           
    const brush = canvas.getContext("2d"); 

    const scoreText = document.getElementById("Score_2");
    const size = 20; 

    let snake = [
         {x: 460, y: 240}
    ];

    let dx = size;  
    let dy = 0;

    let nextDx = dx;
    let nextDy = dy;

    let food = {
        x: 200,
        y: 200
    };

    let score = 0;

    // -------------- For Snake Move, Colour -------------- //
    function draw() {

        brush.clearRect(0, 0, canvas.width, canvas.height);  
  
        brush.fillStyle = "red"; 
        brush.fillRect(food.x, food.y, size, size);


        for (let x = 0; x < canvas.width; x += size) {
            for (let y = 0; y < canvas.height; y += size) {
                brush.strokeStyle = "#1e293b";
                brush.strokeRect(x, y, size, size);
            }
        }

        dx = nextDx;
        dy = nextDy;

        let newHead = {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        };
                    
        // -------------- This for wrap-around effect -------------- //    
        if (newHead.x + size > canvas.width) newHead.x= 0; 
        if (newHead.x < 0) newHead.x= canvas.width - size; 
        if (newHead.y + size > canvas.height) newHead.y = 0;
        if (newHead.y < 0) newHead.y = canvas.height - size; 

        
    // -------------- After touce the part of snake own body then it will restart -------------- //    
        snake.unshift(newHead);

        for (let i = 1; i < snake.length; i++){
            if ( 
                snake[0].x === snake[i].x &&
                snake[0].y === snake[i].y
            ) {
                alert("Game Over");

                snake = [
                    { x : 460, y : 240 }
                ];

                nextDx = size;
                nextDy = 0;

                score = 0;

                return;
            }
        }

        // -------------- When Snake eat food then it will grow  -------------- //
        let ateFood = drawFood(newHead);
        if (!ateFood) {
            snake.pop(); 
        }

        snake.forEach(part => {
            brush.fillRect(part.x, part.y, size, size);
        }); 

        brush.fillStyle = "#e22b2b";
        brush.font = "24px Arial"
        brush.fillText("Score: " + score, 20, 30);

    }

    // -------------- For Restart and Food -------------- //
    function drawFood(newHead) {
        brush.fillStyle = "blue";

        let validFood = false;

        if (newHead.x === food.x &&
            newHead.y === food.y) {
            
            score = score + 5;

            scoreText.textContent = "Score: " + score;

                while (!validFood) {
                food.x = Math.floor(Math.random() * (canvas.width / size)) * size;
                food.y = Math.floor(Math.random() * (canvas.height / size)) * size;

                validFood = true;

                snake.forEach(part => {

                    if(
                        part.x === food.x &&
                        part.y === food.y
                    ) {

                    validFood = false;

                    }
                });
            }

                return true;
        } 

        return false;
    }
                 
    let lastTime = 0; 
    const speed = 100;
     
    // -------------- For Snake Speed -------------- //
    function gameLoop(time) { 
        if (time - lastTime > speed) {
            draw(); lastTime = time; 
        } 
        requestAnimationFrame(gameLoop); 
    } 
            
    requestAnimationFrame(gameLoop);

    // -------------- For Snake Controll -------------- //
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight" && dx === 0) {
            nextDx = size; nextDy = 0;
        }
        if (event.key === "ArrowLeft" && dx === 0) {
            nextDx = -size; nextDy = 0;
        }
        if (event.key === "ArrowUp" && dy === 0) {
            nextDx = 0; nextDy = -size;
        }
        if (event.key === "ArrowDown" && dy === 0) { 
            nextDx = 0; nextDy = size;
        }
        });
