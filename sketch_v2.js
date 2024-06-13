let redIntensity = 0;
let redOpacity = 0;
let decayRate = 60;
let opacityDecayRate = 40;
let incrementRate = 150;
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
let serial;
let latestData;
let preValue = 500.0;
let latestValue;
let playingSounds = new Set(); // Set to track currently playing sounds
let resizeStep = 0.1; // Step for gradual resizing
let video; // Video element
let videoPlaying = false; // Flag to track if the video is playing
let drawLoopStopped = false; // Flag to track if the draw loop is stopped
let timerStart = 0; // Start time of the timer
let timerDuration = 2 * 60 * 1000; // Timer duration in milliseconds (2 minutes)
let endImage; // Image to be displayed at the end of the timer

function preload() {
  let imagePaths = [
    "gif editate/1_1.gif",
    "gif editate/2_2.gif",
    "gif editate/3_2.gif",
    "gif editate/4_2.gif",
    "gif editate/5_2.gif",
    "gif editate/6_2.gif",
    "gif editate/7_2.gif",
    "gif editate/8_2.gif",
    "gif editate/9_2.gif",
    "gif editate/10_2.gif",
    "gif editate/11_2.gif",
    "gif editate/12_2.gif",
    "gif editate/13_2.gif",
    "gif editate/14_2.gif",
    "gif editate/15_2.gif",
    "gif editate/16_2.gif",
    "gif editate/17_2.gif",
    "gif editate/18_2.gif",
    "gif editate/19_2.gif",
    "gif editate/20_2.gif",
    "gif editate/21_1.gif",
    "gif editate/22_1.gif",
    "gif editate/23_1.gif",
    "gif editate/24_1.gif",
    "gif editate/25_1.gif",
    "gif editate/26_1.gif",
    "gif editate/27_1.gif",
    "gif editate/28_1.gif",
    "gif editate/29_1.gif",
    "gif editate/30_1.gif",
    "gif editate/31_1.gif",
    "gif editate/32_1.gif",
    "gif editate/33_1.gif",
    "gif editate/34_1.gif",
    "gif editate/35_1.gif",
    "gif editate/36_1.gif",
    // "gif editate/37_1.gif",
    // "gif editate/38_1.gif",
    // "gif editate/39_1.gif",
    // "gif editate/40_1.gif",
    // "gif editate/41.gif",
    // "gif editate/42.gif",
    // "gif editate/43.gif",
    // "gif editate/44.gif",
    // "gif editate/45.gif",
    // "gif editate/46.gif",
    // "gif editate/47.gif",
    // "gif editate/48.gif",
    // "gif editate/49.gif",
    // "gif editate/50.gif",
    // "gif editate/51.gif",
    // "gif editate/53.gif",
    // "gif editate/54.gif",
    // "gif editate/55.gif",
    // "gif editate/56.gif",
    // "gif editate/57.gif",
    // "gif editate/58.gif",
    // "gif editate/59.gif",
    // "gif editate/60.gif",
    // "gif editate/61.gif",
    // "gif editate/62.gif",
    // "gif editate/63.gif",
    // "gif editate/64.gif",
    // "gif editate/65.gif",
    // "gif editate/66.gif",
    // "gif editate/67.gif",
    // "gif editate/68.gif",
    // "gif editate/69.gif",
    // "gif editate/70.gif",
    // "gif editate/71.gif",
    // "gif editate/72.gif",
    // "gif editate/73.gif",
    // "gif editate/74.gif",
    // "gif editate/75.gif",
    // "gif editate/76.gif",    
    // "gif editate/77.gif",
    // "gif editate/78.gif",
    // "gif editate/79.gif",
    // "gif editate/80.gif",
    // "gif editate/81.gif",
    // "gif editate/82.gif",
    // "gif editate/83.gif",
    // "gif editate/84.gif",
    // "gif editate/85.gif",
    // "gif editate/86.gif",
    // "gif editate/87.gif",
    // "gif editate/88.gif",
    // "gif editate/89.gif",
    // "gif editate/90.gif",
    // "gif editate/91.gif",
    // "gif editate/92.gif",
    // "gif editate/93.gif",
    // "gif editate/94.gif",
    // "gif editate/95.gif",
    // "gif editate/96.gif",
    // "gif editate/97.gif",
    // "gif editate/98.gif",
    // "gif editate/99.gif",
    // "gif editate/100.gif",
    // "gif editate/101.gif",
    // "gif editate/102.gif",
    // "gif editate/103.gif"
  ];
  
  let soundPaths = [
    "gif editate/audio/Snapinsta.app_video_1C40A9C3CF341071F0D3BCC00F08488C_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_2A4776C665B54EDEF3988409F264B385_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_2C43FAF9E93BD6324C36DB7D9A7029AA_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_2E4B36670E8BD4A36081520F267D5AA9_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_3F4DF51D32AA8FA76825CA62E60D7F9F_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_4A4394B5298326E9A9C32987F61DA28E_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_4B496AFB700A0FE88B71DA35B8745CA2_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_4C468FE50E7CE5F3AA10E3C0B40479BD_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_4E4B2945F823DBF6B04B6CE3F1218F81_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_5B41F5BAEB6D45BB30471C392A702592_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_5F4407CCD44161A4962E10D6504158A3_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_6C4B54CBEAF93AAEF01C6C7CF91BD987_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_7D4F2266DAAE13DB93C9A97757BD65A5_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_7E4E7B36F6775E83E01D91ED4601F6B2_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_8D4E5BA9061BFA80909ADAEA20E54B85_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_8F4AF9587DDAE8E469E5565CF0936984_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_9A4DFE69C06FEAFC89D96C744249B790_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_9A421D4FAAEE3A79AB451F1A39F046A3_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_9B4878F5BA51769F48595E71098EE2B3_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_9D41B9D024C1F40655B9E3A819111283_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_124C1C107ED2406F6C2E280886EBEC9D_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_194BB4C841A69DC3D1DB72B7B4C10F83_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_324CD07486A1D1AC578F51E6C547C1B0_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_344FF656B46A8EEFD2C50990D2A0A697_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_404AC9F09127BEF22D8FB32FB8BEE193_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_444D7739FD1DC806BC4502AFBCDBB3AC_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_0547ADDC8F31983A5648E0C18BD828B9_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_584F8DCD3B96D9F0A2475F423F48C698_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_854CD4A80D8F5E31432142DF1B92EAA7_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_884AD8694083B5038DBA636A47B991B1_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_924F835E7F0B20C6F26508800F910CAA_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_1941D770FB7B3D819BAD7DBBCDC02AB9_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_2243AB03BDBB382E4F1FFFB9E00166B1_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_3244C6A281E1A0A86E04788D84A8C3B6_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_3244C6A281E1A0A86E04788D84A8C3B6_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_3646F27B5FF1F978E8FED0BD07CEBBB6_video_dashinit.mp3",
    "gif editate/audio/Snapinsta.app_video_4546FC419610FF61E892AC888FFFCBA6_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_4547B1DE027EF4CBD2D938D2520ED5BD_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_5344DA383859F9045BC091CB7993DE9B_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_5849F1EEFFC2D37218B94E52E741FD83_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_6045E80850A6EA1A902724C24C6A60B1_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_11441C229B173621E673909EA1096CA0_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_26494BEE8C59C3E7005DE31B2E251CB8_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_41411F2FCC9B33C56123F709A87B6598_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_59482C038B66348C6E648F53EE477B9B_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_99498F515A7FEFCDBBB4951DFD4BF389_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_3542124C080D376057FBB0B7195E6091_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_3542124C080D376057FBB0B7195E6091_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_5449280EC71D148794108A603DCD2D9E_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_6749053C3AB990C538646318235407BC_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_8645427FDAE539BDC16782D663BF238C_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_27416811CE5EF6623C2D98B9FF826CA2_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_38463642D8DCE651C49B1C8F7B50FA86_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_61466198D7B85A2DEFC216E7F71C1CB8_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_62422615D7B0B1D1350883FD6F453A8C_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_7244072002B2EF3DC0584827F1EC2D9F_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_A14F1C8C1616460C3BEFAA91AB8A6DBC_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_A5451B3729C9DEB59D34F3CC0BE45482_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_A6401CBC791323F930A5D59F644B9C95_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_AA4795B747A389A89BEDC40BFB35D887_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_AA49773F001B921A31EE3AFEECD30F97_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_AB45AE43644BB4FAE8F6FD08423FB480_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_AE4F6061C6B443E2E4142D27DAD7FB9C_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_An_-m9Fzgm5WGPz6XzkPJC2R2FBGXawbRJy8F2XZ2Czcb_ydlCxxREOu7KzKU81JZu2rBE8ecUVUpUd-UIcj-n_2.mp3",
    // "gif editate/audio/Snapinsta.app_video_An_aJhLWWXZC5Fi-zsp5Pu26XH1sSkaqso6HTqqxWzGQ6ZNXg-Cd4xCahzt5btD8nKkpi2LtKYeWMQe2c432T1x9.mp3",
    // "gif editate/audio/Snapinsta.app_video_An_dGTEBLISReZYwlnW5-UjiMgGB5qla_MZdCByKCWm1gM4ms2-ZyPhHX2zl2SOg2y19qqZilwSftDZS2MQGnA.mp3",
    // "gif editate/audio/Snapinsta.app_video_An_FLVWW7uksgRTwe8pE1YHWQHOtehTPqj_4YAnvWE5eosuui_Vy2nRYiRTpTFe3hcl9B6UXhWlV7fr9hkDTHSJ_.mp3",
    // "gif editate/audio/Snapinsta.app_video_An_RL2kcJtVlCjkDuu8Vt81r98vIgulF6i2Nj63VveFByW6NL8Q_FK8SPirRGRHppSnheYE8Crwz6OKX4dCzpMV8.mp3",
    // "gif editate/audio/Snapinsta.app_video_An-8pWjvbhQ5hh4SaYUmVsfxfB7xFMU9kACIC-uSlcWVFxyKrNM2BLHK6BxOR9v2YsnWSWU3B5ZRjH5IWJoT1cs.mp3",
    // "gif editate/audio/Snapinsta.app_video_An-H2xiLXL9MqAOitr7yOzrQ_9jpidtPKnmDEEZ7zump85v2BmjOzze93k5ilMN3bIyvEA5HeHE71Pg9MZcOdyxP.mp3",
    // "gif editate/audio/Snapinsta.app_video_An-O9zuGl0TsmLITkgYuF_pnB5flualpmUzPubj6jnCMCMe9yBCUi1VYS2cMl6yhaGhN2B1bC2zLpkUXqs4dyKOs.mp3",
    // "gif editate/audio/Snapinsta.app_video_An-sNExCx7AX6-ti6d-yBiih0DVfs4qVK-1qala60_Eb-KR2xpBtMTENpVNDiHrKZNmiWe_ABtl8db8srDG71U-z.mp3",
    // "gif editate/audio/Snapinsta.app_video_An8jGA_TeYhu7A0D5_90OxeQ1qAHTCak9KWmh7xxcvvmZNKmjN4M4w-fF3j6oolLvKDlvYcvnkrUyPgjJZvdx7w5.mp3",
    // "gif editate/audio/Snapinsta.app_video_An8kmSiukiewQ6fybjebdp0bto4Mm4wZz6SgPQ2U3hpRKYjzzbotbAFkeyzr9fykmgtOGRDgym9ozle-f-WMzhey (1).mp3",
    // "gif editate/audio/Snapinsta.app_video_An8kmSiukiewQ6fybjebdp0bto4Mm4wZz6SgPQ2U3hpRKYjzzbotbAFkeyzr9fykmgtOGRDgym9ozle-f-WMzhey.mp3",
    // "gif editate/audio/Snapinsta.app_video_An8RJQCc2pJP4_l7vDu3tJrJVyacaqIzclUMyWD-kLAYCOgGSZn3vszULYeOkr3XFyHkqlijEUTd-40pNpPj6uWo.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9a4cVL1Km8FTR9Jm1eSYI1SrEeC4TmltMduOO2sF9rhojdfgN8vQziUhWYlGpgv9Un6s89KGDzGRIFTVJli3zR.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9dRBSWimvl7zB66i2CQQkp5rFtf6eAUwecmZRm5o88l7IN2T9tCKPwzPDJ_DiuxNRlAevaABNh74nIukJoaJsO.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9DZtYAPd6nosIjfE-sECInalhqRmnYBPIIQDb4DoO-FifLhU2uPbaXkjKdBkUmI6bgVK9CiMWL3BKeg6U_5Df5.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9gy0x8x3jqDu4JJ5Crc_HVUU2K7blnn1BZqxrKaVoqLvSkPFxhV609vtQO57m_oXR8-RoTqdq_0QFQq0tRhsgI.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9PocWxM5SsIrwDKiJ5F9JOVczKVO5hCi5M3PGyskrRWCZBlLfhVlmgLzBAym1NqIqZKH-CUfTAsZSdkW751luL.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9vIdztoqlhYK3SDo7vxBrBHLdURZlcIZJgnhjxDn0sK-7vOW9oOV7HKwz4o4czPAxpoz9Gw539K9EjX4Z-TdEK.mp3",
    // "gif editate/audio/Snapinsta.app_video_An9XsAaHNfrxxzOKhl8s5TAAb4qwHHygi7-3OfBkwrjDEM6CTu3jccizxniLsMRDR4LZH2Lp6PcnF1pVXiG4dz1_.mp3",
    // "gif editate/audio/Snapinsta.app_video_An87Ofx9tYR4kALQCCXzqczqwEwyTk0DJSQhr1XSs5BC-6wShOOOZ3tQ8hjGJw1I6sHrmre07r3uFmTklsZ3iciY.mp3",
    // "gif editate/audio/Snapinsta.app_video_An90esOZyhbXgY_uSEhWf1KpMmWOSEH9vkFXJ_P4IsOblSQBSJf8k-EFM-6X0O9JgZIakRB-miNiOE-RWeCi15vT.mp3",
    // "gif editate/audio/Snapinsta.app_video_B84F43793EA0DBDE5AC331F67227A58C_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_B4449696E65FC752008273748EE9509A_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_BB4811669B9940D25B7BB18552A308B5_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_BD4588471A61D736D345D59219F496B8_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_C74D7CEA3DA36D0DB10D38E993B14DBB_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_C9453981111C3CCFA04D13B092330194_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_CD477054D763928FD904BB7CCB154E85_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_CE4136E7FDBD31F359E2D76D5A5FBD8E_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_D44C5FCEEC61ACC37A4B382E48AE8981_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_D645FDC0D82BEB7BCC08CA501A748E91_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_DE4684CD5677728021A075856F70CB97_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_E743DBB3DF39E99FE46B5F71AEF87C86_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_E34303135DFC065758CB51B0627CABB6_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_ED4E9B17DCE2A659C2985E507DE77EA6_video_dashinit.mp3",
    // "gif editate/audio/Snapinsta.app_video_FB44C495B297A277C6B836743F5904BF_video_dashinit.mp3"
  ];

  for (let i = 0; i < imagePaths.length; i++) {
    let imagePath = imagePaths[i];
    let soundPath = soundPaths[i];
    loadImage(imagePath, (img) => imageLoaded(img, soundPath));
  }

  video = createVideo("video/introfromo_v2.mp4");
  video.hide(); // Hide the video element

  endImage = loadImage("finalimage.jpg");
}


function imageLoaded(img, soundPath) {
  let sound = loadSound(soundPath);
  imageTextPairs.push({ img, sound });
  loadedImages++;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateGrid(); // Calcola la griglia iniziale
  frameRate(30); // Per evitare di ricalcolare troppe volte
  serial = new p5.SerialPort();
  serial.list();
  serial.open("COM7");

  // Play the video once all images and sounds are loaded
  if (loadedImages === imageTextPairs.length) {
    video.play();
    videoPlaying = true;

    // Stop the video after it finishes playing and start the timer
    video.onended(() => {
      videoPlaying = false;
      timerStart = millis(); // Start the timer
    });
  }
}

function draw() {
  if (drawLoopStopped) {
    return; // Stop the draw loop
  }

  if (videoPlaying) {
    background(0);
    image(video, 0, 0, width, height); // Draw the video
    return; // Exit draw function while video is playing
  }

  if (!videoPlaying && loadedImages < imageTextPairs.length) {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Caricamento...", width / 2, height / 2);
    return;
  }

  let currentTime = millis();
  let timeSinceLastPress = currentTime - lastPressTime;

  // Stop the draw loop after 2 minutes from the end of the video
  if (currentTime - timerStart >= timerDuration) {
    background(0);
    image(endImage, 0, 0, width, height); // Display the end image
    drawLoopStopped = true;
    return;
  }

  // Rimuovi le pressioni più vecchie di 1 secondo
  pressTimes = pressTimes.filter((time) => currentTime - time <= 1000);

  // Aggiorna il numero di colonne e righe in base alla frequenza delle pressioni del tasto
  let desiredCols = max(2, pow(2, pressTimes.length));
  let desiredRows = max(2, pow(2, pressTimes.length));

  // Gradually adjust cols and rows towards desired values
  if (cols < desiredCols) {
    cols = min(desiredCols, cols + resizeStep);
  } else if (cols > desiredCols) {
    cols = max(desiredCols, cols - resizeStep);
  }

  if (rows < desiredRows) {
    rows = min(desiredRows, rows + resizeStep);
  } else if (rows > desiredRows) {
    rows = max(desiredRows, rows - resizeStep);
  }

  calculateGrid(); // Ricalcola la griglia

  background(0); // Pulisci lo sfondo ad ogni frame

  let totalCells = floor(cols) * floor(rows);
  let displayedSounds = new Set();

  for (let i = 0; i < totalCells; i++) {
    let x = i % floor(cols);
    let y = Math.floor(i / floor(cols));
    let index = i % imageTextPairs.length; // Assicura che gli indici siano sempre validi
    let pair = imageTextPairs[index];
    image(pair.img, x * imgWidth, y * imgHeight, imgWidth, imgHeight);

    // Play the sound associated with the image if not already playing
    if (!pair.sound.isPlaying()) {
      pair.sound.play();
      playingSounds.add(pair.sound);
    }
    displayedSounds.add(pair.sound);
  }

  // Stop sounds that are no longer displayed
  for (let sound of playingSounds) {
    if (!displayedSounds.has(sound)) {
      sound.stop();
    }
  }
  playingSounds = displayedSounds;

  redIntensity -= decayRate * (timeSinceLastPress / 1000);
  redIntensity = max(0, redIntensity);

  redOpacity -= opacityDecayRate * (timeSinceLastPress / 1000);
  redOpacity = max(0, redOpacity);

  fill(redIntensity, 0, 0, redOpacity);
  rect(0, 0, width, height);
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  latestData = float(currentString);
  if (latestData >= preValue) {
    redIntensity = min(maxIntensity, redIntensity + incrementRate);
    redOpacity = min(maxOpacity, redOpacity + incrementRate);
    shuffle(imageTextPairs, true); // Shuffle both images and texts together
    lastPressTime = millis();
    pressTimes.push(lastPressTime);
  }
  preValue = latestData;
}

function keyPressed() {
  if (key === "k" || key === "K") {
    redIntensity = min(maxIntensity, redIntensity + incrementRate);
    redOpacity = min(maxOpacity, redOpacity + incrementRate);
    shuffle(imageTextPairs, true); // Shuffle both images and texts together
    lastPressTime = millis();
  } else if (key === "j" || key === "J") {
    lastPressTime = millis();
    pressTimes.push(lastPressTime); // Aggiungi il tempo corrente all'array delle pressioni
  } else if (key === "r" || key === "R") {
    restartProgram(); // Restart the program
  }
}

function restartProgram() {
  redIntensity = 0;
  redOpacity = 0;
  cols = 2;
  rows = 2;
  pressTimes = [];
  drawLoopStopped = false;
  videoPlaying = true;

  // Stop all currently playing sounds
  for (let sound of playingSounds) {
    sound.stop();
  }
  playingSounds.clear();


  // Recalculate the grid
  calculateGrid();

  // Restart the video
  video.play();
  videoPlaying = true;

  // Stop the video after it finishes playing and start the timer
  video.onended(() => {
    videoPlaying = false;
    timerStart = millis(); // Start the timer
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateGrid();
}

function calculateGrid() {
  imgWidth = width / floor(cols);
  imgHeight = height / floor(rows);
}