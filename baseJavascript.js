
    var showScreen = function(screen_opt){
        switch(screen_opt){
                
            case 0:  screen_snake.style.display = "block";
                     screen_menu.style.display = "none";
                     screen_setting.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;
                
            case 1:  screen_snake.style.display = "none";
                     screen_menu.style.display = "block";
                     screen_setting.style.display = "none";
                     screen_gameover.style.display = "none";
                     break;
                
            case 2:  screen_snake.style.display = "none";
                     screen_menu.style.display = "none";
                     screen_setting.style.display = "block";
                     screen_gameover.style.display = "none";
                     break;
                
            case 3: screen_snake.style.display = "none";
                    screen_menu.style.display = "none";
                    screen_setting.style.display = "none";
                    screen_gameover.style.display = "block";
                    break;
        }
    }
	
	window.onload = function(){
        
        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");
               
            // Screens
            screen_snake = document.getElementById("snake");
            screen_menu = document.getElementById("menu");
            screen_gameover = document.getElementById("gameover");
            screen_setting = document.getElementById("setting");
        
            // Buttons
            button_newgame_menu = document.getElementById("newgame_menu");
            button_newgame_setting = document.getElementById("newgame_setting");
            button_newgame_gameover = document.getElementById("newgame_gameover");
            button_setting_menu = document.getElementById("setting_menu");
            button_setting_gameover = document.getElementById("setting_gameover");
        
            // etc
            ele_score = document.getElementById("score_value");
            speed_setting = document.getElementsByName("speed");
            wall_setting = document.getElementsByName("wall");
        
        // --------------------

        button_newgame_menu.onclick = function(){newGame();};
        button_newgame_gameover.onclick = function(){newGame();}; 
        button_newgame_setting.onclick = function(){newGame();}; 
        button_setting_menu.onclick = function(){showScreen(2);};
        button_setting_gameover.onclick = function(){showScreen(2)};

        setSnakeSpeed(150);
        setWall(1);

        showScreen("menu");
        
        // --------------------
        // Settings
        
            // speed
            for(var i = 0; i < speed_setting.length; i++){
                speed_setting[i].addEventListener("click", function(){
                    for(var i = 0; i < speed_setting.length; i++){
                        if(speed_setting[i].checked){
                            setSnakeSpeed(speed_setting[i].value);
                        }
                    }
                });
            }
        
            // wall
            for(var i = 0; i < wall_setting.length; i++){
                wall_setting[i].addEventListener("click", function(){
                    for(var i = 0; i < wall_setting.length; i++){
                        if(wall_setting[i].checked){
                            setWall(wall_setting[i].value);
                        }
                    }
                });
            }

        document.onkeydown = function(evt){
            if(screen_gameover.style.display == "block"){
                evt = evt || window.event;
                if(evt.keyCode == 32){
                    newGame();
                }
            }
        }
    } 
	
    var setWall = function(wall_value){
        wall = wall_value;
        if(wall == 0){screen_snake.style.borderColor = "#606060";}
        if(wall == 1){screen_snake.style.borderColor = "#FFFFFF";}
    } 
	
    /////////////////////////////////////////////////////////////
    
    // Canvas & Context
    var canvas;
    var ctx;
    
    // Snake
    var snake;
    var snake_dir;
   var snake_next_dir;
    var snake_speed;
    
    // Food
    var food = {x: 0, y: 0};
    
    // Score
    var score;
    
    // Wall
    var wall;
    
    // HTML Elements
    var screen_snake;
    var screen_menu;
    var screen_setting;
    var screen_gameover;
    var button_newgame_menu;
    var button_newgame_setting;
    var button_newgame_gameover;
    var button_setting_menu;
    var button_setting_gameover;
    var ele_score;
    var speed_setting;
    var wall_setting;
    
    /////////////////////////////////////////////////////////////

    var activeDot = function(x, y){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }