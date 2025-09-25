
var noSleep = new NoSleep();


class MainClass {
    constructor() {
       this.step;
       this.breathInterval;
       this.start=0;
    }



breathTimer() {
	if(!Main.step)Main.step=0
    let timer = parseInt(Panel.timerText.innerText);
	let timerMax = parseInt(Panel.timerText1.value);
	Main.step=Main.step+1;
	if(	Main.step>3)Main.step=0;
    if (Main.step == 0) {
            audio.play();
        document.body.style.backgroundColor = "green";
        Panel.timerText0.innerText = " - Вдох -";
		Panel.indikator.max=timerMax
    } 
	if (Main.step == 1) {
        audio.pause();
        document.body.style.backgroundColor = "red";
        Panel.timerText0.innerText = " - Пауза -";
		Panel.indikator.max=timerMax/2
    }
	if (Main.step == 2) {
        audio.play();
        document.body.style.backgroundColor = "green";
        Panel.timerText0.innerText = " - Выдох -";
		Panel.indikator.max=timerMax
    } 
	if (Main.step == 3) {
            audio.pause();
            document.body.style.backgroundColor = "red";
            Panel.timerText0.innerText = " - Пауза -";
            Panel.indikator.max=timerMax/2
    }

	
    let count = 0;
    Main.breathInterval = setInterval(() => {
        if ((count == timerMax&(Main.step==0|Main.step==2))|(count == timerMax/2&(Main.step==1|Main.step==3))) {
            clearInterval(Main.breathInterval);
			Panel.timerText.innerText = 0;
            setTimeout(Main.breathTimer, 1);
        } else {
			Panel.indikator.value = count+1;
            Panel.timerText.innerText = count+1;
            count++;
        }
    }, 1000);
}

}

class PanelClass {
    constructor() {
    this.indikator = document.getElementById("indikator");
    this.timerText = document.getElementById("timer");
    this.timerText1 = document.getElementById("timerMax");
    this.timerText0 = document.getElementById("out");

    document.body.addEventListener('click', function(event) {
        if (event.target.id !== 'timerMax' && event.target.id !== 'bottonPlus' && event.target.id !== 'bottonMinus') {
          Panel.runStopTimer();
        }
      });

    }

    runStopTimer(){
        if(Main.start==0) {noSleep.enable();audio.play();Main.start=1;Main.breathTimer();return 0}
        if(Main.start==1) {
            Main.start=0;
            noSleep.disable();
            audio.pause();
            Panel.timerText0.innerText=''
            document.body.style.backgroundColor = "green";
            Main.step=0;
            Panel.indikator.value=0;
            Main.breathInterval = clearInterval(Main.breathInterval);
            return 0;}
    }


    clickPlus(){
        Panel.timerText1.value= parseInt(Panel.timerText1.value)+2;
    }

    clickMinus(){
        Panel.timerText1.value= parseInt(Panel.timerText1.value)-2;

    }
}


const Main = new MainClass;
const Panel = new PanelClass;

var audio = new Audio();
audio.src = '/file/tick.mp3'; 
audio.volume = 1; 
