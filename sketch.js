const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg, score;
var bird2, bird3;
//bird4, bird5;
var dragSound, pigSound;
var n = null;
var crashSound;

var gameState = "onSling";

function preload() {

    pigSound = loadSound("pig.wav");
    crashSound = loadSound("crash.wav");

    getBackground();

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    bird2 = new Bird(180,130);
    bird3 = new Bird(130,130);
    //bird4 = new Bird(80,130);
    //bird5 = new Bird(30,130);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    score = 0;
    slingBird=bird;
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    
    textSize(15);
    fill("black")
    text("Score : "+score, 1100, 20);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    //bird4.display();
    bird2.display();
    bird3.display();
    //bird5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    

    pig1.score();
    pig3.score();

    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(slingBird.body, {x: mouseX , y: mouseY});
        
    }
}


function mouseReleased(){
    slingshot.fly();
    crashSound.play();
    gameState = "launched";
}

/*function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(bird.body);
    }
}*/

async function getBackground(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/asia/kolkata");
    var resJSON = await response.json();
    var hour = resJSON.datetime.slice(11, 13);
    if(hour > 6 && hour < 19){
        bg="sprites/bg.png";
    } 
    else{
        bg="sprites/bg2.jpg";
    }
    
    backgroundImg = loadImage(bg);
}


function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
        if(slingBird === bird){
            slingBird=bird2;
            slingshot.attach(slingBird.body);
            gameState="onSling";
            bird.visibilty = 0;
        }
        else if(slingBird === bird2){
            slingBird=bird3;
            slingshot.attach(slingBird.body);
            gameState="onSling";
            bird2.visibilty = 0;
        }
        else if(slingBird === bird3){
            slingBird=n;
            slingshot.attach(slingBird.body);
            gameState="onSling";
            bird3.visibilty = 0;
        }
        /*else if(slingBird === bird4){
            slingBird=bird5;
            slingshot.attach(slingBird.body);
            gameState="onSling";
            bird4.visibilty = 0;
        }
        else if(slingBird === bird5){
            slingBird=n;
            slingshot.attach(slingBird.body);
            gameState="onSling";
            bird5.visibilty = 0;
        }*/
        
        
}
    }
