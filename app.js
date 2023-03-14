const knob = document.getElementById("knob");
// const knobWrapper = document.querySelector(".knob-wrapper");
const degToChange = 5; //how many degrees rotation will change the value
const valueChange = 1; //value change on trigger

//calculations
const speedEl = document.getElementById("speed");
const time5kEl = document.getElementById("time5k");
const time10kEl = document.getElementById("time10k");
const timeHMEl = document.getElementById("timeHM");
const timeMEl = document.getElementById("timeM");

let angleStore;
let pace = 341;
updateCalculations(pace);

knob.addEventListener("pointerdown", (e) => {
  // console.log("e :>> ", e);
  // console.log(posPolar(knob, e));
  angleStore = posPolar(knob, e).angle;
  knob.addEventListener("pointermove", handlingMoving);
  knob.classList.add("grabbed");
});

knob.addEventListener("pointerup", () => {
  knob.removeEventListener("pointermove", handlingMoving);
  knob.classList.remove("grabbed");
});

function handlingMoving(e) {
  const angle = posPolar(knob, e).angle;

  let angleChange = angle - angleStore;
  if (angleChange > 180) angleChange -= 360.0;
  else if (angleChange < -180) angleChange = 360.0 - angleChange;

  if (angleChange > degToChange) {
    // console.log("+");
    pace += valueChange;
    angleStore = angle;
  } else if (angleChange < -1 * degToChange) {
    // console.log("-");
    pace -= valueChange;
    angleStore = angle;
  }

  //  knob.style = `rotate: ${angleStore}deg`;
  //  document.getElementById("knobText").style = `rotate: ${360 - angleStore}deg`;
  document.getElementById("paceValue").innerText = secToMinSec(pace);
  updateCalculations(pace);
}

//calculate offset from center
function posXY(obj, e) {
  const centerX = obj.clientWidth / 2;
  const centerY = obj.clientHeight / 2;

  return { x: e.offsetX - centerX, y: e.offsetY - centerY };
}

function posPolar(obj, e) {
  const posX = e.layerX - obj.clientWidth / 2;
  const posY = e.layerY - obj.clientHeight / 2;
  //   const posX = e.offsetX - obj.clientWidth / 2;
  //   const posY = e.offsetY - obj.clientHeight / 2;

  const angle =
    posX > 0
      ? (Math.atan2(posX, -posY) / Math.PI) * 180.0
      : 360.0 - Math.abs((Math.atan2(posX, -posY) / Math.PI) * 180);
  const radius = Math.sqrt(posX ** 2 + posY ** 2);
  return { angle, radius };
}

function secToMinSec(sec) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
}

function secToHrsMinSec(sec) {
  // console.log("sec :>> ", sec);
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (sec % 60).toString().padStart(2, "0");
  // console.log("seconds :>> ", seconds);
  return `${hrs}:${min}:${seconds}`;
}

function updateCalculations(pace) {
  //pace is in seconds per km
  speedEl.innerText = `${(3600 / pace).toFixed(2)} km/h`;
  time5kEl.innerText = `${secToMinSec(pace * 5)}`;
  time10kEl.innerText = `${secToMinSec(pace * 10)}`;
  timeHMEl.innerText = `${secToHrsMinSec(Math.floor(pace * 21.097))}`;
  timeMEl.innerText = `${secToHrsMinSec(Math.floor(pace * 42.195))}`;
}
