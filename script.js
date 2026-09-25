// Chronological Staircase Dataset - Spanning exactly 7 AM to 7 PM
const timelineFrames = [
  {
    decimalHour: 7.0, // 07:00 AM
    kelvinNum: 3200,
    solarAngle: "12° East",
    shutter: "1/250s",
    aperture: "ƒ/8.0",
    iso: "125",
    ambient: "rgba(245, 158, 11, 0.2)", 
    quote: "Warm morning rays project stark geometric window frames high onto the wall.",
    traffic: "Solitary • Empty stairs",
    angle: "High Diagonal Horizon Slant",
    image: "images/_DSC1778.JPG"
  },
  {
    decimalHour: 8.5, // 08:30 AM
    kelvinNum: 4000,
    solarAngle: "28° East",
    shutter: "1/10s",
    aperture: "ƒ/13",
    iso: "100",
    ambient: "rgba(250, 200, 100, 0.15)", 
    quote: "Early commuters ascending. The shadow projection begins to slide down the interior wall.",
    traffic: "Low • Single transit",
    angle: "Descending East Cast",
    image: "images/_DSC1779.JPG"
  },
  {
    decimalHour: 10.0, // 10:00 AM
    kelvinNum: 4800,
    solarAngle: "48° East",
    shutter: "1/500s",
    aperture: "ƒ/5.6",
    iso: "100",
    ambient: "rgba(250, 250, 210, 0.12)", 
    quote: "Diffused, flat lighting fills the stairwell as foot traffic increases. Most students prefer to the elevator at this hour.",
    traffic: "Solitary • Empty stairs",
    angle: "Diffused Ambient Fill",
    image: "images/_DSC1811.JPG"
  },
  {
    decimalHour: 11.5, // 11:30 AM
    kelvinNum: 5500,
    solarAngle: "65° South-East",
    shutter: "1/10",
    aperture: "ƒ/13",
    iso: "150",
    ambient: "rgba(255, 245, 230, 0.12)", 
    quote: "Sharp, high-contrast light bites into the stair risers as the sun approaches peak elevation.",
    traffic: "Minimal • Empty transit",
    angle: "Steep Diagonal Cast",
    image: "images/_DSC1850.JPG"
  },
  {
    decimalHour: 13.0, // 01:00 PM
    kelvinNum: 6000,
    solarAngle: "78° South",
    shutter: "1/10",
    aperture: "ƒ/15",
    iso: "100",
    ambient: "rgba(255, 255, 255, 0.1)", 
    quote: "Zenith light creates intricate, layered shadows of the balustrades overlapping each other.",
    traffic: "High Density • Group gathering",
    angle: "Near Vertical Overhead",
    image: "images/_DSC1576.JPG"
  },
  {
    decimalHour: 14.5, // 02:30 PM
    kelvinNum: 5800,
    solarAngle: "55° West",
    shutter: "1/640s",
    aperture: "ƒ/5.6",
    iso: "125",
    ambient: "rgba(250, 230, 200, 0.12)", 
    quote: "Sun shifts to the west. ",
    traffic: "silent • Sparse transit",
    angle: "High West Reversal",
    image: "images/_DSC1585.JPG"
  },
  {
    decimalHour: 16.0, // 04:00 PM
    kelvinNum: 6500,
    solarAngle: "35° West",
    shutter: "1/400s",
    aperture: "ƒ/4.0",
    iso: "160",
    ambient: "rgba(220, 230, 255, 0.15)", 
    quote: "Indirect ambient bounce light completely overtakes the stairwell. Zero harsh shadows remain.",
    traffic: "Zero • Complete lull",
    angle: "Flat Ambient Reflection",
    image: "images/_DSC1793.JPG"
  },
  {
    decimalHour: 17.5, // 05:30 PM
    kelvinNum: 3500,
    solarAngle: "18° West",
    shutter: "1/160s",
    aperture: "ƒ/9.0",
    iso: "4000",
    ambient: "rgba(249, 115, 22, 0.18)", 
    quote: "Low lateral sun casts a stark, dramatic silhouette of a student against the far wall.",
    traffic: "Steady • Individual transit",
    angle: "Extreme West Low Rake",
    image: "images/_DSC1552.JPG"
  },
  {
    decimalHour: 19.0, // 07:00 PM (Adjusted from 20.0)
    kelvinNum: 4000,
    solarAngle: "Sub-Horizon",
    shutter: "1/10s",
    aperture: "ƒ/9.0",
    iso: "400",
    ambient: "rgba(200, 210, 255, 0.15)", 
    quote: "Harsh artificial lighting casts a distinct, bright lower shadow as a solitary figure blurs past.",
    traffic: "Low • Evening lockup",
    angle: "Extreme West Low Rake",
    image: "images/_DSC1558.JPG"
  }
];

// Initialize Image Layers for Smooth Cross-Dissolve
const layerContainer = document.getElementById("layerContainer");
const layerElements = [];

timelineFrames.forEach((frame, idx) => {
  const img = document.createElement("img");
  img.src = frame.image;
  img.className = "blended-img-layer";
  if (idx === 0) img.style.opacity = "1";
  layerContainer.appendChild(img);
  layerElements.push(img);
});

// Elements
const solarRange = document.getElementById("solarRange");
const activeTimeDisplay = document.getElementById("activeTimeDisplay");
const solarAngle = document.getElementById("solarAngle");
const ambientFog = document.getElementById("ambientFog");

const hudShutter = document.getElementById("hudShutter");
const hudAperture = document.getElementById("hudAperture");
const hudIso = document.getElementById("hudIso");
const hudKelvin = document.getElementById("hudKelvin");

const logObservation = document.getElementById("logObservation");
const logTraffic = document.getElementById("logTraffic");
const logAngle = document.getElementById("logAngle");

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

solarRange.addEventListener("input", (e) => {
  const progress = parseFloat(e.target.value) / 1000;
  const totalGaps = timelineFrames.length - 1;
  const scaled = progress * totalGaps;
  
  const baseIndex = Math.min(Math.floor(scaled), totalGaps - 1);
  const factor = scaled - baseIndex;

  layerElements.forEach((el, i) => {
    if (i === baseIndex) {
      el.style.opacity = (1 - factor).toFixed(3);
    } else if (i === baseIndex + 1) {
      el.style.opacity = factor.toFixed(3);
    } else {
      el.style.opacity = "0";
    }
  });

  const current = timelineFrames[baseIndex];
  const next = timelineFrames[baseIndex + 1];

  const hourDec = lerp(current.decimalHour, next.decimalHour, factor);
  const hours = Math.floor(hourDec);
  const mins = Math.floor((hourDec - hours) * 60);
  const minsPad = mins < 10 ? `0${mins}` : mins;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
  const hourPad = displayHours < 10 ? `0${displayHours}` : displayHours;
  activeTimeDisplay.innerText = `${hourPad}:${minsPad} ${period}`;

  const currentKelvin = Math.round(lerp(current.kelvinNum, next.kelvinNum, factor));
  hudKelvin.innerText = `${currentKelvin}K`;

  const dominant = factor < 0.5 ? current : next;
  solarAngle.innerText = dominant.solarAngle;
  hudShutter.innerText = dominant.shutter;
  hudAperture.innerText = dominant.aperture;
  hudIso.innerText = dominant.iso;

  logObservation.innerText = `"${dominant.quote}"`;
  logTraffic.innerText = dominant.traffic;
  logAngle.innerText = dominant.angle;

  ambientFog.style.background = `radial-gradient(circle at 50% 20%, ${dominant.ambient} 0%, transparent 60%)`;
});

const toggleHudBtn = document.getElementById("toggleHudBtn");
const gridOverlay = document.getElementById("gridOverlay");

toggleHudBtn.addEventListener("click", () => {
  gridOverlay.classList.toggle("hidden");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "h" || e.key === "H") {
    gridOverlay.classList.toggle("hidden");
  }
});

const splitSlider = document.getElementById("splitSlider");
const curtainRange = document.getElementById("curtainRange");
const revealWrapper = document.getElementById("revealWrapper");
const splitHandle = document.getElementById("splitHandle");
const afterImg = document.querySelector(".img-after");

function syncComparatorDimensions() {
  const rect = splitSlider.getBoundingClientRect();
  afterImg.style.width = `${rect.width}px`;
}

curtainRange.addEventListener("input", (e) => {
  const val = e.target.value;
  revealWrapper.style.width = `${val}%`;
  splitHandle.style.left = `${val}%`;
});

window.addEventListener("resize", syncComparatorDimensions);
syncComparatorDimensions();