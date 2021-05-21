//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

var fedTime;
var lastFed;
var foodObj;

function preload()
{
	//load images here
  happyDogImg = loadImage("images/dogImg1.png");
  sadDogImg=loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250,250,10,10);
  dog.addImage(sadDogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedB = createButton("Feed Dog");
  feedB.position(700,95);
  feedB.mousePressed(feedDog);

  addB = createButton("Add Food");
  addB.position(800,95);
  addB.mousePressed(addFood);

  foodObj = new Food();
  
}


function draw() {  

  background(46,139,87);


  
  foodObj.display();
  drawSprites();
  
  //add styles here
  textSize(20);
  fill("white");
  text("Note:Press UP_ARROW to feed the Dog", 10,30);

  text("Food Remaining: " +foodS, 30,60 );

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:" +lastFed%12 + "PM", 350,50);

  }
  else if(lastFed===0){
    text("Last Feed: 12AM", 350,50);
  }
  else{
    text("Last Feed:" +lastFed +"AM", 350, 50);
  }
}
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog(){
 dog.addImage(happyDogImg);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x -1;
  }
  database.ref('/').update({
    Food:x
  })
 
}



