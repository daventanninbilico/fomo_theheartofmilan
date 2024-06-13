let redIntensity = 0;
let redOpacity = 0;
let decayRate = 60;
let opacityDecayRate = 60;
let incrementRate = 50;
let lastPressTime = 0;
let maxIntensity = 255;
let maxOpacity = 200;
let imageTextPairs = []; // Array di oggetti con immagine e testo
let cols = 2;
let rows = 2;
let imgWidth;
let imgHeight;
let loadedImages = 0;
let heartImg; // Variabile per memorizzare l'immagine del cuore
let pressTimes = []; // Array per memorizzare i tempi delle pressioni del tasto

function preload() {
  let imagePaths = [
    'gif/club.gif',
    'gif/club1.gif',
    'gif/club2.gif',
    'gif/club3.gif',
    'gif/club4.gif'
  ];

  let texts = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6", "Text 7", "Text 8", "Text 9", "Text 10", "Text 11", "Text 12", "Text 13", "Text 14", "Text 15"];

  for (let i = 0; i < imagePaths.length; i++) {
    let path = imagePaths[i];
    loadImage(path, (img) => imageLoaded(img, texts[i % texts.length]));
  }

  heartImg = loadImage('heart.png'); // Sostituisci con l'URL dell'immagine del cuore
}

function imageLoaded(img, text) {
  imageTextPairs.push({ img, text });
  loadedImages++;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateGrid(); // Calcola la griglia iniziale
  frameRate(30); // Per evitare di ricalcolare troppe volte
}

function draw() {
  if (loadedImages < imageTextPairs.length) {
    background(200);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Caricamento...", width / 2, height / 2);
    return;
  }

  let currentTime = millis();
  let timeSinceLastPress = currentTime - lastPressTime;

  // Rimuovi le pressioni più vecchie di 1 secondo
  pressTimes = pressTimes.filter(time => currentTime - time <= 1000);

  // Aggiorna il numero di colonne e righe in base alla frequenza delle pressioni del tasto
  let desiredCols = max(2, pow(2, pressTimes.length));
  let desiredRows = max(2, pow(2, pressTimes.length));

  if (desiredCols !== cols || desiredRows !== rows) {
    cols = desiredCols;
    rows = desiredRows;
    calculateGrid(); // Ricalcola la griglia
  }

  background(255); // Pulisci lo sfondo ad ogni frame

  let totalCells = cols * rows;
  for (let i = 0; i < totalCells; i++) {
    let x = i % cols;
    let y = Math.floor(i / cols);
    let index = i % imageTextPairs.length; // Assicura che gli indici siano sempre validi
    let pair = imageTextPairs[index];
    image(pair.img, x * imgWidth, y * imgHeight, imgWidth, imgHeight);
    
    fill(255);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    text(pair.text, x * imgWidth + 10, (y + 1) * imgHeight - 10);

    image(heartImg, x * imgWidth + imgWidth - 40, (y + 1) * imgHeight - 40, 30, 30); // Regola la posizione e le dimensioni dell'immagine del cuore secondo necessità
  }

  redIntensity -= decayRate * (timeSinceLastPress / 1000);
  redIntensity = max(0, redIntensity);

  redOpacity -= opacityDecayRate * (timeSinceLastPress / 1000);
  redOpacity = max(0, redOpacity);

  fill(redIntensity, 0, 0, redOpacity);
  rect(0, 0, width, height);
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    redIntensity = min(maxIntensity, redIntensity + incrementRate);
    redOpacity = min(maxOpacity, redOpacity + incrementRate);
    shuffle(imageTextPairs, true); // Shuffle both images and texts together
    lastPressTime = millis();
  } else if (key === 'j' || key === 'J') {
    lastPressTime = millis();
    pressTimes.push(lastPressTime); // Aggiungi il tempo corrente all'array delle pressioni
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateGrid();
}

function calculateGrid() {
  imgWidth = width / cols;
  imgHeight = height / rows;
}
