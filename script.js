/*
  Title: Alarms
  Description: Create and categorize alarms for 4 different periods of a day
  Author: Kavya S
  Date of last edit: April 13, 2022
*/

//arrays to store AM & PM alarms
let AlarmsAM = [];
let AlarmsPM = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //select #time
  createAlarm = createSelect();
  createAlarm.position(50, 90);
  for (let i = 1; i <= 12; i++) {
    createAlarm.option(i);
  }
  //select AM or PM
  timePeriod = createSelect();
  timePeriod.position(100, 90);
  timePeriod.option("A.M.");
  timePeriod.option("P.M.");  
  
  //adds time/alarm chosen 
  button = createButton("Create");
  button.position(180, 90);
  button.mousePressed(pressedButton);
  
  //removes time/alarm chosen
  Bremove = createButton("Remove");
  Bremove.position(250, 90);
  Bremove.mousePressed(pressRemove);  
}

function draw() {
  //calling function twice
  background(255);
  organize(AlarmsAM, " A.M."); 
  organize(AlarmsPM, " P.M.");

  //printing names of column
  text("Wake Up", 60, 130);
  text("School", 140, 130);
  text("Extracurriculars", 200, 130);
  text("Sleep", 310, 130);
}

function organize(time, period) {
  let x = 50;
  let wu = 0;
  let scAM = 0;
  let scPM = 3;
  let ex = 0;
  let sl = 0;
  let y;

  //get values from the inputted(parameter) array 
  for (let i = 0; i < time.length; i++) {
    if(time[i] <= 7 && time[i] >= 1 && period == " A.M."){
      x = 50;  //wake up
      wu += 1;
      y = wu;
    } else if(time[i] > 7){
      if(period == " A.M."){ //classes
        x = 130; 
        scAM += 1;
        y = scAM;
      } else { //sleep
        x = 290; 
        sl += 1;
        y = sl;
      }
    } else if(time[i] <= 3 && period == " P.M."){
      x = 130; //classes
      scPM += 1;
      y = scPM;
    } else { //extracurriculars
      x = 210; 
      ex += 1;
      y = ex;
    } 
    
    //organize & print alarms into boxes
    rect(x, 25*y+130, 80, 20, 5); 
    textSize(14); 
    text(time[i] + period, x+20, 25*y+144);
  }
}

function pressedButton() {
  //add and sort alarm time to arrays without repeats  
  if(timePeriod.value() == "A.M."){
    if(AlarmsAM.includes(createAlarm.value())){ 
    } else { 
      AlarmsAM.push(createAlarm.value());
      AlarmsAM.sort((a,b)=>a-b); //sorts numerically
    } 
  } else {
    if(AlarmsPM.includes(createAlarm.value())){
    } else { 
      AlarmsPM.push(createAlarm.value());
      AlarmsPM.sort((a,b)=>a-b); //doesn't sort lexicographically
    }
  }
}

function pressRemove() {
  //get rid of the time chosen from AM array
  let i = 0;
  while(AlarmsAM[i] != createAlarm.value() && timePeriod.value() == "A.M." && i <= AlarmsAM.length){
    i+=1;
  }
  if(timePeriod.value()=="A.M."){
    AlarmsAM.splice(i,1);
  }

  //get rid of the time chosen from PM array
  let j = 0;
  while(AlarmsPM[j] != createAlarm.value() && timePeriod.value() == "P.M." && j <= AlarmsPM.length){
    j+=1;
  }
  if(timePeriod.value() == "P.M."){
    AlarmsPM.splice(j,1);
  }
}