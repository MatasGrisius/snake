	//ShowScreen funkcijos paduodamų skaičių reikšmės
	// 0 for the game
    // 1 for the main menu
    // 2 for the settings screen
    // 3 for the game over screen
	
	/////////////////////////////////////////////////////////////
	///Gyvatėlės krypties keitimo funkcija, tikriname mygtuko kodą
    var changeDir = function(key){
        
        if(key == 38 && snake_dir != 2){
            snake_next_dir = 0;
        }else{
        
        if (key == 39 && snake_dir != 3){
            snake_next_dir = 1;
        }else{
        
        if (key == 40 && snake_dir != 0){
            snake_next_dir = 2;
        }else{
            
        if(key == 37 && snake_dir != 1){
            snake_next_dir = 3;
        } } } }
        
    }
    
    /////////////////////////////////////////////////////////////
	//Gyvatėlės maisto pridėjimo funkcija
    var addFood = function(){
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        for(var i = 0; i < snake.length; i++){
            if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                addFood();
            }
        }
    }
    
    /////////////////////////////////////////////////////////////
	//Tikriname ar pateiktos koordinatės ir tikrinamos koordiantės sutampa
    var checkBlock = function(x, y, _x, _y){
        return (x == _x && y == _y) ? true : false;
    }
    
    /////////////////////////////////////////////////////////////
    //Įrašome taškų kiekį
    var altScore = function(score_val){
        ele_score.innerHTML = String(score_val);
    }
    
    /////////////////////////////////////////////////////////////
	//Pagrindinio ciklo funkcija.
    var mainLoop = function(){
        
            var _x = snake[0].x;
            var _y = snake[0].y;
      snake_dir = snake_next_dir;

            // 0 - aukštyn, 1 - į dešinę, 2 - žemyn, 3 - į kairę
            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }

            snake.pop();
            snake.unshift({x: _x, y: _y});

        
        // --------------------

        // Sienos funkcija, jei pasirenkame, kad gyavtėlė turėtų sienas tai atsitrenkus į sieną mirštame, jei ne
		// tai gyvatėlė pradedama perkėlinėti į priešingą pusę
        
            if(wall == 1){
                if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10){
                    showScreen(3);
                    return;
                }
            }else{
                for(var i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / 10);
                    }
                    if(snake[i].x == canvas.width / 10){
                        snake[i].x = snake[i].x - (canvas.width / 10);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / 10);
                    }
                    if(snake[i].y == canvas.height / 10){
                        snake[i].y = snake[i].y - (canvas.height / 10);
                    }
                }
            }
        
        // --------------------
            for(var i = 1; i < snake.length; i++){
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                    showScreen(3);
                    return;
                }
            }
      
        // --------------------
        
            if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
                snake[snake.length] = {x: snake[0].x, y: snake[0].y};
                score += 1;
                altScore(score);
                addFood();
                activeDot(food.x, food.y);
            }
        
        // --------------------

            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // --------------------

            for(var i = 0; i < snake.length; i++){
                activeDot(snake[i].x, snake[i].y);
            }
        
        // --------------------

            activeDot(food.x, food.y);
            setTimeout(mainLoop, snake_speed);
    }
    
    /////////////////////////////////////////////////////////////
	//Pradedame žaidimą, sukuriame gyvatėle 4 pixelių ilgio
    var newGame = function(){
        
        showScreen(0);
        screen_snake.focus();
      
        snake = [];
        for(var i = 4; i >= 0; i--){
            snake.push({x: i, y: 15});
        }
      
        snake_next_dir = 1;
        
        score = 0;
        altScore(score);
        
        addFood();
        
        canvas.onkeydown = function(evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();
                
    }
    
    /////////////////////////////////////////////////////////////
    // Keičiame gyvatėlės greitį pagal pasirinktą meniu parametrą
    // 150 = lėtai
    // 100 = normaliai
    // 50 = greitai
    var setSnakeSpeed = function(speed_value){
        snake_speed = speed_value;
    }
    