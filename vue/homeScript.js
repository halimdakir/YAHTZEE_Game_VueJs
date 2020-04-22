Vue.component('highScore-item', {
    template: '\
    <li>\
      {{ score }}\
      {{ player }}\
    </li>\
  ',
    props: ['score','player']
})
new Vue({
    el: '#app',
    data: {
        firstDice:'',
        secondDice:'',
        thirdDice:'',
        fourthDice:'',
        fifthDice:'',
        gameIsDone: false,
        theWinnerName:'',
        theWinnerScore:'',
        wrongSelection: 0,
        errorMessage:'',

        isDiceFirstActive: false,
        isDiceSecondActive: false,
        isDiceThirdActive: false,
        isDiceFourthActive: false,
        isDiceFifthActive: false,

        isHelp: false,

        /* Disable button*/
        onesDisable : false,
        twosDisable : false,
        threesDisable : false,
        foursDisable : false,
        fivesDisable : false,
        sixesDisable : false,
        onePairDisable : false,
        twoPairsDisable : false,
        threeOfKindDisable : false,
        fourOfKindDisable : false,
        yahtzeeDisable : false,
        chanceDisable: false,
        fullHouseDisable: false,
        smallStraightDisable: false,
        largeStraightDisable: false,

        /*Score for the player 1*/
        onesScorePlayOne:'-',
        twosScorePlayOne:'-',
        threesScorePlayOne:'-',
        foursScorePlayOne:'-',
        fivesScorePlayOne:'-',
        sixesScorePlayOne:'-',
        onePairPlayOne: '-',
        twoPairsPlayOne: '-',
        threeOfAKindPlayOne: '-',
        fourOfAKindPlayOne: '-',
        smallStraightPlayOne: '-',
        largeStraightPlayOne: '-',
        fullHousePlayOne: '-',
        chancePlayOne: '-',
        yatzyPlayOne: '-',
        totalWithOutBonusPlayOne:0,
        totalBonusPlayOne: 0,
        totalScorePlayOne: 0,
        /*Score for the player 2*/
        onesScorePlayTwo:'-',
        twosScorePlayTwo:'-',
        threesScorePlayTwo:'-',
        foursScorePlayTwo:'-',
        fivesScorePlayTwo:'-',
        sixesScorePlayTwo:'-',
        onePairPlayTwo: '-',
        twoPairsPlayTwo: '-',
        threeOfAKindPlayTwo: '-',
        fourOfAKindPlayTwo: '-',
        smallStraightPlayTwo: '-',
        largeStraightPlayTwo: '-',
        fullHousePlayTwo: '-',
        chancePlayTwo: '-',
        yatzyPlayTwo: '-',
        totalWithOutBonusPlayTwo:0,
        totalBonusPlayTwo:0,
        totalScorePlayTwo: 0,
        bonusPlayOne:0,
        bonusPlayTwo:0,

        countDicesIdentical: 0,
        finalScorePlayerOne:0,
        finalScorePlayerTwo:0,
        finalBonusPlayerOne:0,
        finalBonusPlayerTwo:0,
        scores: [],
        duplicatedArray:[],
        arrayDicesSelected: [],
        uniqueValue:[],
        arraySorted:[],

        isPlayerOne: false,
        isPlayerTwo: false,
        isPlayerThree: false,
        isPlayerFour: false,
        playIsStarted: false,
        scoreIsSelected:false,

        first: '-',
        second: '-',
        third: '-',
        fourth: '-',
        fifth: '-',

        key: '0',
        values:0,
        counter: 0,
        round:0,
        roundsPerPlayer:0,
        roundNow:1,
        playerNow: '',
        player1Name: '',
        player2Name: '',

        /* High score*/
        highScores: [
            {
                id:1,
                score: 22,
                player: 'Halim',
            },
            {
                id:2,
                score: 24,
                player: 'Dakir',
            }
        ],
        nextScoreId: 3,
    },

    methods: {
        onChange(event) {
            this.values = event.target.value;
        },
        showStuff() {
            if (this.values === '1') {
                this.isPlayerOne = true;
                this.isPlayerTwo = false;
            }if (this.values === '2'){
                this.isPlayerOne = true;
                this.isPlayerTwo = true;
            }if (this.values === '0') {
                this.isPlayerOne = false;
                this.isPlayerTwo = false;
            }
        },
        savePlayers(){
            this.playerNow = this.player1Name;
            if (this.values === '1') {
                if (this.player1Name.length >0){
                    this.playIsStarted= true;
                    this.isPlayerOne = false;
                    this.isPlayerTwo = false;
                    this.isPlayerThree = false;
                    this.isPlayerFour = false;
                }
            }if (this.values === '2'){
                if (this.player1Name.length >0 && this.player2Name.length >0){
                    if (this.player1Name !== this.player2Name){
                        this.playIsStarted= true;
                        this.isPlayerOne = false;
                        this.isPlayerTwo = false;
                        this.isPlayerThree = false;
                        this.isPlayerFour = false;
                    }
                }
            }
            this.round= this.values * 15;
            this.roundsPerPlayer=15*parseInt(this.values);
        },
        throwDice(){
            if (this.first === '-' && this.second === '-' && this.third === '-' && this.fourth === '-' && this.fifth === '-') {
                this.first = Math.floor((Math.random() * 6) + 1);
                this.second = Math.floor((Math.random() * 6) + 1);
                this.third = Math.floor((Math.random() * 6) + 1);
                this.fourth = Math.floor((Math.random() * 6) + 1);
                this.fifth = Math.floor((Math.random() * 6) + 1);
                this.counter++;
            }
        },
        whoIsPlayingNow(){
            if (this.values ==='1'){
                this.playerNow = this.player1Name;
            }
            if (this.values ==='2'){

                if (this.counter === 0 || this.counter === 2 || this.counter === 4 || this.counter === 6 || this.counter === 8 || this.counter === 10 || this.counter === 12 || this.counter === 14 || this.counter === 16 || this.counter === 18 || this.counter === 20 || this.counter === 22 || this.counter === 24 || this.counter === 26 || this.counter === 28){
                    this.playerNow = this.player1Name;
                }
                if (this.counter === 1 || this.counter === 3 || this.counter === 5 || this.counter === 7 || this.counter === 9 || this.counter === 11 || this.counter === 13 || this.counter === 15 || this.counter === 17 || this.counter === 19 || this.counter === 21 || this.counter === 23 || this.counter === 25 || this.counter === 27 || this.counter === 29){
                    this.playerNow = this.player2Name;
                }

            }
        },
        numberRound(){
            if (this.values ==='1'){
                    this.roundNow = this.counter+1;
            }
            if (this.values ==='2'){
                if (this.counter <2){
                    this.roundNow=1;
                }
                if (this.counter >= 2 && this.counter < 4){
                    this.roundNow=2;
                }
                if (this.counter >= 4 && this.counter < 6){
                    this.roundNow=3;
                }
                if (this.counter >= 6 && this.counter < 8){
                    this.roundNow=4;
                }
                if (this.counter >= 8 && this.counter < 10){
                    this.roundNow=5;
                }
                if (this.counter >= 10 && this.counter < 12){
                    this.roundNow=6;
                }
                if (this.counter >= 12 && this.counter < 14){
                    this.roundNow=7;
                }
                if (this.counter >= 14 && this.counter < 16){
                    this.roundNow=8;
                }
                if (this.counter >= 16 && this.counter < 18){
                    this.roundNow=9;
                }
                if (this.counter >= 18 && this.counter < 20){
                    this.roundNow=10;
                }
                if (this.counter >= 20 && this.counter < 22){
                    this.roundNow=11;
                }
                if (this.counter >= 22 && this.counter < 24){
                    this.roundNow=12;
                }
                if (this.counter >= 24 && this.counter < 26){
                    this.roundNow=13;
                }
                if (this.counter >= 26 && this.counter < 28){
                    this.roundNow=14;
                }
                if (this.counter >= 28 && this.counter < 30){
                    this.roundNow=15;
                }

            }
        },
        playBack(){
            this.playIsStarted = true;
            this.scoreIsSelected=false;
        },
        showHelp(){
            this.isHelp= true;
            this.playIsStarted = false;
            this.key='0';
            this.isPlayerOne= false;
            this.isPlayerTwo= false;
        },
        goBack(){
            this.isPlayerOne= false;
            this.isPlayerTwo= false;
            this.playIsStarted= false;
            this.isHelp= false;

            this.key='0';
            this.counter=0;
            this.roundNow= 1;
            this.roundsPerPlayer=0;

            this.playerNow = '';
            this.first = '-';
            this.second = '-';
            this.third = '-';
            this.fourth = '-';
            this.fifth = '-';

            this.onesScorePlayOne = '-';
            this.twosScorePlayOne = '-';
            this.threesScorePlayOne = '-';
            this.foursScorePlayOne ='-';
            this.fivesScorePlayOne ='-';
            this.sixesScorePlayOne = '-';
            this.onePairPlayOne = '-';
            this.twoPairsPlayOne = '-';
            this.threeOfAKindPlayOne = '-';
            this.fourOfAKindPlayOne = '-';
            this.smallStraightPlayOne = '-';
            this.largeStraightPlayOne = '-';
            this.fullHousePlayOne = '-';
            this.chancePlayOne = '-';
            this.yatzyPlayOne = '-';
            this.totalWithOutBonusPlayOne= 0;
            this.bonusPlayOne= 0;
            this.totalBonusPlayOne = 0;
            this.totalScorePlayOne= 0;

            this.onesScorePlayTwo = '-';
            this.twosScorePlayTwo = '-';
            this.threesScorePlayTwo = '-';
            this.foursScorePlayTwo = '-';
            this.fivesScorePlayTwo = '-';
            this.sixesScorePlayTwo = '-';
            this.onePairPlayTwo = '-';
            this.twoPairsPlayTwo = '-';
            this.threeOfAKindPlayTwo = '-';
            this.fourOfAKindPlayTwo = '-';
            this.smallStraightPlayTwo = '-';
            this.largeStraightPlayTwo = '-';
            this.fullHousePlayTwo = '-';
            this.chancePlayTwo = '-';
            this.yatzyPlayTwo = '-';
            this.totalWithOutBonusPlayTwo= 0;
            this.bonusPlayTwo= 0;
            this.totalBonusPlayTwo = 0;
            this.totalScorePlayTwo= 0;

            this.finalScorePlayerOne=0;
            this.finalScorePlayerTwo=0;
            this.finalBonusPlayerOne=0;
            this.finalBonusPlayerTwo=0;

            this.gameIsDone=false;
            this.theWinnerName='';
            this.theWinnerScore='';

            /* Enable buttons of the game options*/
            this.onesDisable = false;
            this.twosDisable = false;
            this.threesDisable = false;
            this.foursDisable = false;
            this.fivesDisable = false;
            this.sixesDisable = false;
            this.onePairDisable = false;
            this.twoPairsDisable = false;
            this.threeOfKindDisable = false;
            this.fourOfKindDisable = false;
            this.fullHouseDisable= false;
            this.chanceDisable = false;
            this.yahtzeeDisable= false;
            this.smallStraightDisable= false;
            this.largeStraightDisable= false;
        },
        toggleClassDiceOne: function(event){
            this.isDiceFirstActive = !this.isDiceFirstActive;
        },
        toggleClassDiceTwo: function(event){
            this.isDiceSecondActive = !this.isDiceSecondActive;
        },
        toggleClassDiceThree: function(event){
            this.isDiceThirdActive = !this.isDiceThirdActive;
        },
        toggleClassDiceFour: function(event){
            this.isDiceFourthActive = !this.isDiceFourthActive ;
        },
        toggleClassDiceFive: function(event){
            this.isDiceFifthActive = !this.isDiceFifthActive;
        },
        initializeDices(){
            this.first = '-';
            this.second = '-';
            this.third = '-';
            this.fourth = '-';
            this.fifth = '-';
            this.duplicatedArray.splice(0,this.duplicatedArray.length);
            this.arrayDicesSelected.splice(0,this.arrayDicesSelected.length);
            this.uniqueValue.splice(0,this.uniqueValue.length);
            this.arraySorted.splice(0,this.arraySorted.length);
        },
        disableButtonOptions(){
            if(this.values === '1') {
                if(this.onesScorePlayOne !== '-'){
                    this.onesDisable = true;
                }
                if(this.twosScorePlayOne !== '-'){
                    this.twosDisable = true;
                }
                if(this.threesScorePlayOne !== '-'){
                    this.threesDisable = true;
                }
                if(this.foursScorePlayOne !== '-'){
                    this.foursDisable = true;
                }
                if(this.fivesScorePlayOne !== '-'){
                    this.fivesDisable = true;
                }
                if(this.sixesScorePlayOne !== '-'){
                    this.sixesDisable = true;
                }
                if(this.fullHousePlayOne !== '-'){
                    this.fullHouseDisable= true;
                }
                if(this.chancePlayOne !== '-'){
                    this.chanceDisable = true;
                }
                if(this.onePairPlayOne !== '-'){
                    this.onePairDisable = true;
                }
                if(this.twoPairsPlayOne !== '-'){
                    this.twoPairsDisable =true;
                }
                if(this.fourOfAKindPlayOne !== '-'){
                    this.fourOfKindDisable = true;
                }
                if(this.threeOfAKindPlayOne !== '-'){
                    this.threeOfKindDisable = true;
                }
                if(this.yatzyPlayOne !== '-'){
                    this.yahtzeeDisable= true;
                }
                if(this.smallStraightPlayOne !== '-') {
                    this.smallStraightDisable = true;
                }
                if(this.largeStraightPlayOne !== '-') {
                    this.largeStraightDisable = true;
                }

            }else if(this.values==='2') {
                if (this.onesScorePlayOne !== '-' && this.onesScorePlayTwo !== '-') {
                    this.onesDisable = true;
                }
                if (this.twosScorePlayOne !== '-' && this.twosScorePlayTwo !== '-') {
                    this.twosDisable = true;
                }
                if (this.threesScorePlayOne !== '-' && this.threesScorePlayTwo !== '-') {
                    this.threesDisable = true;
                }
                if (this.foursScorePlayOne !== '-' && this.foursScorePlayTwo !== '-') {
                    this.foursDisable = true;
                }
                if (this.fivesScorePlayOne !== '-' && this.fivesScorePlayTwo !== '-') {
                    this.fivesDisable = true;
                }
                if (this.sixesScorePlayOne !== '-' && this.sixesScorePlayTwo !== '-') {
                    this.sixesDisable = true;
                }
                if (this.onePairPlayOne !== '-' && this.onePairPlayTwo !== '-') {
                    this.onePairDisable = true;
                }
                if (this.twoPairsPlayOne !== '-' && this.twoPairsPlayTwo !== '-') {
                    this.twoPairsDisable = true;
                }
                if (this.threeOfAKindPlayOne !== '-' && this.threeOfAKindPlayTwo !== '-') {
                    this.threeOfKindDisable = true;
                }
                if (this.fourOfAKindPlayOne !== '-' && this.fourOfAKindPlayTwo !== '-') {
                    this.fourOfKindDisable = true;
                }
                if (this.yatzyPlayOne !== '-' && this.yatzyPlayTwo !== '-') {
                    this.yahtzeeDisable= true;
                }
                if (this.chancePlayOne !== '-' && this.chancePlayTwo !== '-') {
                    this.chanceDisable = true;
                }
                if (this.fullHousePlayOne !== '-' && this.fullHousePlayTwo !== '-') {
                    this.fullHouseDisable= true;
                }
                if(this.smallStraightPlayOne !== '-' && this.smallStraightPlayTwo !== '-') {
                    this.smallStraightDisable = true;
                }
                if(this.largeStraightPlayOne !== '-' && this.largeStraightPlayTwo !== '-') {
                    this.largeStraightDisable = true;
                }
            }
        },
        calculateTotal(){
            /* Total player 1*/
            let playerOneDice1 = 0;
            let playerOneDice2 = 0;
            let playerOneDice3 = 0;
            let playerOneDice4 = 0;
            let playerOneDice5 = 0;
            let playerOneDice6 = 0;
            let playerOneDice7 = 0;
            let playerOneDice8 = 0;
            let playerOneDice9 = 0;
            let playerOneDice10 = 0;
            let playerOneDice11 = 0;
            let playerOneDice12 = 0;
            let playerOneDice13 = 0;
            let playerOneDice14 = 0;
            let playerOneDice15 = 0;
            if (this.onesScorePlayOne !=='-') {playerOneDice1 = parseInt(this.onesScorePlayOne);}
            if (this.twosScorePlayOne !=='-'){playerOneDice2 = parseInt(this.twosScorePlayOne);}
            if (this.threesScorePlayOne !=='-'){playerOneDice3 = parseInt(this.threesScorePlayOne);}
            if (this.foursScorePlayOne !=='-'){playerOneDice4 = parseInt(this.foursScorePlayOne);}
            if (this.fivesScorePlayOne !=='-'){playerOneDice5 = parseInt(this.fivesScorePlayOne);}
            if (this.sixesScorePlayOne !=='-'){playerOneDice6 = parseInt(this.sixesScorePlayOne);}
            if (this.onePairPlayOne !=='-'){playerOneDice7 = parseInt(this.onePairPlayOne);}
            if (this.twoPairsPlayOne !=='-'){playerOneDice8 = parseInt(this.twoPairsPlayOne);}
            if (this.threeOfAKindPlayOne !=='-'){playerOneDice9 = parseInt(this.threeOfAKindPlayOne);}
            if (this.fourOfAKindPlayOne !=='-'){playerOneDice10 = parseInt(this.fourOfAKindPlayOne);}
            if (this.smallStraightPlayOne !=='-'){playerOneDice11 = parseInt(this.smallStraightPlayOne);}
            if (this.largeStraightPlayOne !=='-'){playerOneDice12 = parseInt(this.largeStraightPlayOne);}
            if (this.fullHousePlayOne !=='-'){playerOneDice13 = parseInt(this.fullHousePlayOne);}
            if (this.chancePlayOne !=='-'){playerOneDice14 = parseInt(this.chancePlayOne);}
            if (this.yatzyPlayOne !=='-'){playerOneDice15 = parseInt(this.yatzyPlayOne);}
            this.totalWithOutBonusPlayOne = playerOneDice1+playerOneDice2+playerOneDice3+playerOneDice4+playerOneDice5+playerOneDice6;
            if (this.totalWithOutBonusPlayOne >= 63){
                this.bonusPlayOne = 35;
            }
            this.totalBonusPlayOne = this.bonusPlayOne + this.totalWithOutBonusPlayOne;
            this.totalScorePlayOne = this.totalBonusPlayOne+playerOneDice7+playerOneDice8+playerOneDice9+playerOneDice10+playerOneDice11+playerOneDice12+playerOneDice13+playerOneDice14+playerOneDice15;

            /* Total player 2*/
            let playerTwoDice1 = 0;
            let playerTwoDice2 = 0;
            let playerTwoDice3 = 0;
            let playerTwoDice4 = 0;
            let playerTwoDice5 = 0 ;
            let playerTwoDice6 = 0;
            let playerTwoDice7 = 0;
            let playerTwoDice8 = 0 ;
            let playerTwoDice9 = 0;
            let playerTwoDice10 = 0;
            let playerTwoDice11 = 0;
            let playerTwoDice12 = 0;
            let playerTwoDice13 = 0;
            let playerTwoDice14 = 0;
            let playerTwoDice15 = 0;
            if (this.onesScorePlayTwo!=='-') {playerTwoDice1 = parseInt(this.onesScorePlayTwo);}
            if (this.twosScorePlayTwo !=='-'){playerTwoDice2 = parseInt(this.twosScorePlayTwo);}
            if (this.threesScorePlayTwo !=='-'){playerTwoDice3 = parseInt(this.threesScorePlayTwo);}
            if (this.foursScorePlayTwo !=='-'){playerTwoDice4 = parseInt(this.foursScorePlayTwo);}
            if (this.fivesScorePlayTwo !=='-'){playerTwoDice5 = parseInt(this.fivesScorePlayTwo);}
            if (this.sixesScorePlayTwo !=='-'){playerTwoDice6 = parseInt(this.sixesScorePlayTwo);}
            if (this.onePairPlayTwo !=='-'){playerTwoDice7 = parseInt(this.onePairPlayTwo);}
            if (this.twoPairsPlayTwo !=='-'){playerTwoDice8 = parseInt(this.twoPairsPlayTwo);}
            if (this.threeOfAKindPlayTwo !=='-'){playerTwoDice9 = parseInt(this.threeOfAKindPlayTwo);}
            if (this.fourOfAKindPlayTwo !=='-'){playerTwoDice10 = parseInt(this.fourOfAKindPlayTwo);}
            if (this.smallStraightPlayTwo !=='-'){playerTwoDice11 = parseInt(this.smallStraightPlayTwo);}
            if (this.largeStraightPlayTwo !=='-'){playerTwoDice12 = parseInt(this.largeStraightPlayTwo);}
            if (this.fullHousePlayTwo !=='-'){playerTwoDice13 = parseInt(this.fullHousePlayTwo);}
            if (this.chancePlayTwo !=='-'){playerTwoDice14 = parseInt(this.chancePlayTwo);}
            if (this.yatzyPlayTwo !=='-'){playerTwoDice15 = parseInt(this.yatzyPlayTwo);}
            this.totalWithOutBonusPlayTwo = playerTwoDice1+playerTwoDice2+playerTwoDice3+playerTwoDice4+playerTwoDice5+playerTwoDice6;
            if (this.totalWithOutBonusPlayTwo>=63){
                this.bonusPlayTwo=35;
            }
            this.totalBonusPlayTwo= this.totalWithOutBonusPlayTwo + this.bonusPlayTwo;
            this.totalScorePlayTwo = this.totalBonusPlayTwo+playerTwoDice7+playerTwoDice8+playerTwoDice9+playerTwoDice10+playerTwoDice11+playerTwoDice12+playerTwoDice13+playerTwoDice14+playerTwoDice15;

            this.numberRound();
            this.whoIsPlayingNow();
            this.countDicesIdentical = 0;
            this.wrongSelection=0;
            this.disableButtonOptions();
        },
        sameNumberDuplicated(intValue){
                if (this.fifth === intValue) {
                    this.countDicesIdentical += 1;
                }
                if (this.fourth === intValue) {
                    this.countDicesIdentical += 1;
                }
                if (this.third === intValue) {
                    this.countDicesIdentical += 1;
                }
                if (this.second === intValue) {
                    this.countDicesIdentical += 1;
                }
                if (this.first === intValue) {
                    this.countDicesIdentical += 1;
                }
        },
        scoreOnesCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(1);
                if (this.playerNow === this.player1Name && this.onesScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.onesScorePlayOne = 1 * this.countDicesIdentical;

                    } else {
                        this.onesScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.onesScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.onesScorePlayTwo = 1 * this.countDicesIdentical;

                    } else {
                        this.onesScorePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },

        scoreTwosCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(2);
                if (this.playerNow === this.player1Name && this.twosScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.twosScorePlayOne = 2 * this.countDicesIdentical;

                    } else {
                        this.twosScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.twosScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.twosScorePlayTwo = 2 * this.countDicesIdentical;

                    } else if (this.wrongSelection !== 0) {
                        this.twosScorePlayTwo = '0';
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreThreesCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(3);
                if (this.playerNow === this.player1Name && this.threesScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.threesScorePlayOne = 3 * this.countDicesIdentical;

                    } else {
                        this.threesScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.threesScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.threesScorePlayTwo = 3 * this.countDicesIdentical;

                    } else {
                        this.threesScorePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreFoursCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(4);
                if (this.playerNow === this.player1Name && this.foursScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.foursScorePlayOne = 4 * this.countDicesIdentical;

                    } else {
                        this.foursScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.foursScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.foursScorePlayTwo = 4 * this.countDicesIdentical;
                    } else {
                        this.foursScorePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreFivesCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(5);
                if (this.playerNow === this.player1Name && this.fivesScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.fivesScorePlayOne = 5 * this.countDicesIdentical;
                    } else {
                        this.fivesScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.fivesScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.fivesScorePlayTwo = 5 * this.countDicesIdentical;
                    } else {
                        this.fivesScorePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreSixesCalculate(){
            if (this.fifth !== '-') {
                this.sameNumberDuplicated(6);
                if (this.playerNow === this.player1Name && this.sixesScorePlayOne === '-') {
                    if (this.countDicesIdentical >= 1) {
                        this.sixesScorePlayOne = 6 * this.countDicesIdentical;
                    } else {
                        this.sixesScorePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                } else if (this.playerNow === this.player2Name && this.sixesScorePlayTwo === '-' && this.values === '2') {
                    if (this.countDicesIdentical >= 1) {
                        this.sixesScorePlayTwo = 6 * this.countDicesIdentical;

                    } else {
                        this.sixesScorePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        onePair_TwoPairs_Rules(){
                this.arrayDicesSelected.push(this.fifth);
                this.arrayDicesSelected.push(this.fourth);
                this.arrayDicesSelected.push(this.third);
                this.arrayDicesSelected.push(this.second);
                this.arrayDicesSelected.push(this.first);

            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
            this.duplicatedArray = findDuplicates(this.arrayDicesSelected);
        },
        scoreOnePairCalculate(){
            if (this.fifth !== '-') {
                this.onePair_TwoPairs_Rules();
                if (this.playerNow === this.player1Name && this.onePairPlayOne === '-') {
                    if (this.duplicatedArray.length >= 1) {
                        this.onePairPlayOne = 2 * Math.max(...this.duplicatedArray);
                    } else {
                        this.onePairPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.onePairPlayTwo === '-' && this.values === '2') {
                    if (this.duplicatedArray.length >= 1) {
                        this.onePairPlayTwo = 2 * Math.max(...this.duplicatedArray);
                    } else {
                        this.onePairPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreTwoPairsCalculate(){
            if (this.fifth !== '-') {
                this.onePair_TwoPairs_Rules();
                if (this.playerNow === this.player1Name && this.twoPairsPlayOne === '-') {
                    if (this.duplicatedArray.length >= 2) {
                        if (this.duplicatedArray[0] !== this.duplicatedArray[1]) {
                            let value1 = 2 * this.duplicatedArray[0];
                            let value2 = 2 * this.duplicatedArray[1];
                            this.twoPairsPlayOne = value1 + value2;
                        } else if (this.duplicatedArray[0] !== this.duplicatedArray[2]) {
                            let value1 = 2 * this.duplicatedArray[0];
                            let value2 = 2 * this.duplicatedArray[2];
                            this.twoPairsPlayOne = value1 + value2;
                        }
                    } else {
                        this.twoPairsPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.twoPairsPlayTwo === '-' && this.values === '2' && this.values === '2') {
                    if (this.duplicatedArray.length >= 2) {
                        if (this.duplicatedArray[0] !== this.duplicatedArray[1]) {
                            let value1 = 2 * this.duplicatedArray[0];
                            let value2 = 2 * this.duplicatedArray[1];
                            this.twoPairsPlayTwo = value1 + value2;
                        } else if (this.duplicatedArray[0] !== this.duplicatedArray[2]) {
                            let value1 = 2 * this.duplicatedArray[0];
                            let value2 = 2 * this.duplicatedArray[2];
                            this.twoPairsPlayTwo = value1 + value2;
                        }
                    } else {
                        this.twoPairsPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        removeDuplicates(){
            this.arrayDicesSelected.push(this.fifth);
            this.arrayDicesSelected.push(this.fourth);
            this.arrayDicesSelected.push(this.third);
            this.arrayDicesSelected.push(this.second);
            this.arrayDicesSelected.push(this.first);
            this.uniqueValue = [...new Set(this.arrayDicesSelected)];
        },
        scoreThreeOfAKindCalculate(){
            if (this.fifth !== '-') {
                if (this.playerNow === this.player1Name && this.threeOfAKindPlayOne === '-') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 3 || this.uniqueValue.length === 2) {
                        let totalFourOfAKind = 0;
                        for (let i = 0; i < 5; i++) {
                            totalFourOfAKind += this.arrayDicesSelected[i];
                        }
                        this.threeOfAKindPlayOne = totalFourOfAKind;
                    } else if (this.uniqueValue.length !== 3 || this.uniqueValue.length !== 2) {
                        this.threeOfAKindPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.threeOfAKindPlayTwo === '-' && this.values === '2') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 3 || this.uniqueValue.length === 2) {
                        let totalFourOfAKind = 0;
                        for (let i = 0; i < 5; i++) {
                            totalFourOfAKind += this.arrayDicesSelected[i];
                        }
                        this.threeOfAKindPlayTwo = totalFourOfAKind;
                    } else if (this.uniqueValue.length !== 3 || this.uniqueValue.length !== 2) {
                        this.threeOfAKindPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreFourOfAKindCalculate(){
            if (this.fifth !== '-') {
                if (this.playerNow === this.player1Name && this.fourOfAKindPlayOne === '-') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 2 || this.uniqueValue.length === 1) {
                        let totalFourOfAKind = 0;
                        for (let i = 0; i < 5; i++) {
                            totalFourOfAKind += this.arrayDicesSelected[i];
                        }
                        this.fourOfAKindPlayOne = totalFourOfAKind;
                    } else if (this.uniqueValue.length !== 2 || this.uniqueValue.length !== 1) {
                        this.fourOfAKindPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.fourOfAKindPlayTwo === '-') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 2 || this.uniqueValue.length === 1) {
                        let totalFourOfAKind = 0;
                        for (let i = 0; i < 5; i++) {
                            totalFourOfAKind += this.arrayDicesSelected[i];
                        }
                        this.fourOfAKindPlayTwo = totalFourOfAKind;
                    } else if (this.uniqueValue.length !== 2 || this.uniqueValue.length !== 1) {
                        this.fourOfAKindPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        straightRules(){
            this.arrayDicesSelected.push(this.fifth);
            this.arrayDicesSelected.push(this.fourth);
            this.arrayDicesSelected.push(this.third);
            this.arrayDicesSelected.push(this.second);
            this.arrayDicesSelected.push(this.first);

            this.arraySorted = [...new Set(this.arrayDicesSelected.sort())];
        },
        scoreSmallStraightCalculate(){
            if (this.fifth !== '-') {
                let checkOrder = 0;
                this.straightRules();
                for (let i = 1; i < this.arraySorted.length; i++) {
                    if (this.arraySorted[i - 1] + 1 === this.arraySorted[i]) {
                        checkOrder += 1;
                    }
                }
                if (this.playerNow === this.player1Name && this.smallStraightPlayOne === '-') {
                    if (checkOrder >= 3) {
                        this.smallStraightPlayOne = 30;

                    } else {
                        this.smallStraightPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.smallStraightPlayTwo === '-') {
                    if (checkOrder >= 3) {
                        this.smallStraightPlayTwo = 30;
                    } else {
                        this.smallStraightPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreLargeStraightCalculate(){
            if (this.fifth !== '-') {
                let checkOrder = 0;
                this.straightRules();
                for (let i = 1; i < this.arraySorted.length; i++) {
                    if (this.arraySorted[i - 1] + 1 === this.arraySorted[i]) {
                        checkOrder += 1;
                    }
                }
                if (this.playerNow === this.player1Name && this.largeStraightPlayOne === '-') {
                    if (checkOrder === 4) {
                        this.largeStraightPlayOne = 40;

                    } else {
                        this.largeStraightPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.largeStraightPlayTwo === '-') {
                    if (checkOrder === 4) {
                        this.largeStraightPlayTwo = 40;
                    } else {
                        this.largeStraightPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        fullHouseRules(){
            this.arrayDicesSelected.push(this.fifth);
            this.arrayDicesSelected.push(this.fourth);
            this.arrayDicesSelected.push(this.third);
            this.arrayDicesSelected.push(this.second);
            this.arrayDicesSelected.push(this.first);

            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
            this.duplicatedArray = findDuplicates(this.arrayDicesSelected);
            this.uniqueValue = [...new Set(this.arrayDicesSelected)];
        },
        scoreFullHouseCalculate(){
            if (this.fifth !== '-') {
                if (this.playerNow === this.player1Name && this.fullHousePlayOne === '-') {
                    this.fullHouseRules();
                    if (this.uniqueValue.length === 2 && this.duplicatedArray.length === 3) {
                        this.fullHousePlayOne = 25;
                    } else if (this.uniqueValue.length !== 2 || this.duplicatedArray.length !== 3) {
                        this.fullHousePlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();

                } else if (this.playerNow === this.player2Name && this.fullHousePlayTwo === '-') {
                    this.fullHouseRules();
                    if (this.uniqueValue.length === 2 && this.duplicatedArray.length === 3) {
                        this.fullHousePlayTwo = 25;
                    } else if (this.uniqueValue.length !== 2 || this.duplicatedArray.length !== 3) {
                        this.fullHousePlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        chanceRules(){
            this.arrayDicesSelected.push(this.fifth);
            this.arrayDicesSelected.push(this.fourth);
            this.arrayDicesSelected.push(this.third);
            this.arrayDicesSelected.push(this.second);
            this.arrayDicesSelected.push(this.first);
        },
        scoreChanceCalculate() {
            if (this.fifth !== '-') {
                if (this.playerNow === this.player1Name && this.chancePlayOne === '-') {
                    this.chanceRules();
                    let totalChance = 0;
                    for (let i = 0; i < 5; i++) {
                        totalChance += this.arrayDicesSelected[i];
                    }
                    this.chancePlayOne = totalChance;
                    this.calculateTotal();
                    this.initializeDices();
                } else if (this.playerNow === this.player2Name && this.chancePlayTwo === '-') {
                    this.chanceRules();
                    let totalChance = 0;
                    for (let i = 0; i < 5; i++) {
                        totalChance += this.arrayDicesSelected[i];
                    }
                    this.chancePlayTwo = totalChance;
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        scoreYahtzeeCalculate(){
            if (this.fifth !== '-') {
                if (this.playerNow === this.player1Name && this.yatzyPlayOne === '-') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 1 && this.uniqueValue !== 0) {
                        this.yatzyPlayOne = 50;
                    } else {
                        this.yatzyPlayOne = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                } else if (this.playerNow === this.player2Name && this.yatzyPlayTwo === '-') {
                    this.removeDuplicates();
                    if (this.uniqueValue.length === 1) {
                        this.yatzyPlayTwo = 50;
                    } else {
                        this.yatzyPlayTwo = 0;
                    }
                    this.calculateTotal();
                    this.initializeDices();
                }
            }
        },
        showScore() {
            /*if (this.counter === this.roundsPerPlayer) {*/
                this.playIsStarted = false;
                this.scoreIsSelected=true;

        },
        totalBonus(){
            if (this.counter === this.roundsPerPlayer){
                if (this.values ==='1'){
                    this.highScores.push({
                        id:this.nextScoreId++,
                        score: this.totalScorePlayOne,
                        player: this.player1Name});
                    this.finalScorePlayerOne = this.totalScorePlayOne;
                    this.gameIsDone=true;

                }else if (this.values ==='2'){
                    this.highScores.push({
                        id:this.nextScoreId++,
                        score: this.totalScorePlayOne,
                        player: this.player1Name});
                    this.highScores.push({
                        id:this.nextScoreId++,
                        score: this.totalScorePlayTwo,
                        player: this.player2Name});

                    this.finalScorePlayerOne = this.totalScorePlayOne;
                    this.finalScorePlayerTwo = this.totalScorePlayTwo;

                    if (this.finalScorePlayerOne < this.finalScorePlayerTwo){
                        this.theWinnerName= this.player2Name;
                        this.theWinnerScore=this.finalScorePlayerTwo;
                    }
                    if (this.finalScorePlayerOne > this.finalScorePlayerTwo){
                        this.theWinnerName= this.player1Name;
                        this.theWinnerScore=this.finalScorePlayerOne;
                    }
                    if (this.finalScorePlayerOne === this.finalScorePlayerTwo){
                        this.theWinnerName= 'The match is draw! what about new challenge?';
                    }
                    this.gameIsDone=true;
                }
            }
        },
        sortArray(){
            this.highScores.sort(function (score1, score2) {
                if (score1.score > score2.score) return -1;
                if (score1.score < score2.score) return 1;
                if (score1.player > score2.player) return 1;
                if (score1.player < score2.player) return -1;
            });
        },

    },
})