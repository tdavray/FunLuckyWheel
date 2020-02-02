/* global Phaser */

// the game itself
let game
let spinsLeft
let points
let sound = true
let buyFuelHuman = false
let buyFuelMarket = false
let ovniChoice = false

let scoreJson = {
   scores: []
};

// once the window loads...
window.onload = function () {
  // game configuration object
  const gameConfig = {

    autoStart: true,
    scene: [MenuScene, WheelScene],

    // resolution and scale mode
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'thegame',
      width: 1900,
      height: 900
    },
    dom: {
      createContainer: true
    },

    // game background color
    backgroundColor: 0x000000
  }

  // game constructor
  game = new Phaser.Game(gameConfig)

  // game.scene.add('menuScene', MenuScene);
  // game.scene.add('wheelScene', WheelScene);

  // game.scene.start('menuScene');

  // pure javascript to give focus to the page/frame
  window.focus()
}

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  preload () {
    this.load.image('background', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship.png?v=1580653230507')
    
    this.load.image('play', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fplay.png?v=1580653667696')
  }

  create () {
    var bg = this.add.image(400, 450, 'background')
    //bg.setOrigin(0, 0)
    bg.setScale(0.17,0.17)

    var title = this.add.text(950, 200, 'Space Luck', {
      font: 'bold 60px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    title.setOrigin(0.5)
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText = this.add.text(950, 400, soundtxt, {
      font: 'bold 40px Arial',
      align: 'center',
      color: 'white'
    }) 
    this.soundText.setInteractive({ useHandCursor: true })
    this.soundText.on('pointerdown', () => this.clickSound())
    
    // center the text
    this.soundText.setOrigin(0.5)
    
    var textHS = ""
    if(!scoreJson.scores.length){
      textHS = "No scores yet"
    }
    else{
      scoreJson.scores.forEach(function(score){
        if(score)
          textHS += score.letter1 + score.letter2 + score.letter3 + "  :  " + score.score + "points\n"
        
      })
    }
    
    var highScores = this.add.text(1400, 200, textHS, {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'white'
    })

    var play = this.add.image(950,600,'play');
    play.setScale(0.1,0.1)
    play.setInteractive({ useHandCursor: true })
    play.on('pointerdown', () => this.clickStart())
  }

  clickStart () {
    spinsLeft = 5
    points = 1000
    this.scene.start('WheelScene')
  }
  
  clickSound () {
    sound = !sound
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText.setText(soundtxt)
  }
}




let tabOfDegrees = [90, 60, 30, 100, 60, 30]

var audioJSON = {
  spritemap: {
    glass: {
      start: 1,
      end: 2,
      loop: false
    }
  }
}

function getRandomDegree () {
  const rand = Math.floor(Math.random() * Math.floor(tabOfDegrees.length))
  const degree = tabOfDegrees[rand]
  tabOfDegrees.splice(rand, 1)
  return degree
}

function redefineDegrees () {
  tabOfDegrees = [90, 60, 30, 100, 60, 30]
  gameOptions.slices.forEach(slice => {
    slice.degrees = getRandomDegree()
  })
}

const gameOptions = {

  // slices configuration
  slices: [
    {
      degrees: getRandomDegree(),
      startColor: 0xadebeb,
      endColor: 0x1f7a7a,
      rings: 3,
      iconFrame: 0,
      iconScale: 0.4,
      text: 'Earth',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0x00ff00,
      endColor: 0x004400,
      rings: 200,
      iconFrame: 8,
      iconScale: 0.4,
      text: 'OVNI',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xccd9ff,
      endColor: 0x002699,
      rings: 200,
      iconFrame: 2,
      iconScale: 0.4,
      text: 'Out of solar system',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0x666666,
      endColor: 0x999999,
      rings: 200,
      iconFrame: 3,
      iconScale: 0.4,
      text: 'Blackhole !',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xffb3ff,
      endColor: 0x990099,
      rings: 200,
      iconFrame: 4,
      iconScale: 0.4,
      text: 'Mars',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xff0000,
      endColor: 0xff8800,
      rings: 200,
      iconFrame: 5,
      iconScale: 0.4,
      text: 'Sun',
      enabled: true
    }
  ],

  // wheel rotation duration range, in milliseconds
  rotationTimeRange: {
    min: 3000,
    max: 4500
  },

  // wheel rounds before it stops
  wheelRounds: {
    min: 2,
    max: 11
  },

  // degrees the wheel will rotate in the opposite direction before it stops
  backSpin: {
    min: 1,
    max: 4
  },

  // wheel radius, in pixels
  wheelRadius: 240,

  // color of stroke lines
  strokeColor: 0xffffff,

  // width of stroke lines
  strokeWidth: 5
}

// Wheel scene
class WheelScene extends Phaser.Scene {


  // constructor
  constructor () {
    super('WheelScene')
  }

  // method to be executed when the scene preloads
  preload () {
    // loading pin image
    this.load.image('pin', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship.png?v=1580653230507')

    // loading icons spritesheet
    this.load.spritesheet('icons', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Flogos.png?v=1580653952539', {
      frameWidth: 200,
      frameHeight: 180
    })
    
    this.load.image('play', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fplay.png?v=1580653667696')

    this.load.audio('spinsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fbonus.wav?v=1580653257764")
    this.load.audio('ovnisound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FAppear.mp3?v=1580651020366")
    this.load.audio('sunsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FPower-Up.mp3?v=1580651261079")
    this.load.audio('blackholesound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FRed%20Alert.mp3?v=1580651528413")
    this.load.audio('earthsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FCity_Centre.mp3?v=1580651716774")
    this.load.audio('marssound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FChamber%20Decompressing.mp3?v=1580651975910")
    this.load.audio('outsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FTime%20Warp.mp3?v=1580651368971")
  }

  // method to be executed once the scene has been created
  create () {
    this.createWheel()

    // adding the text field
    this.prizeText = this.add.text(400, 300, 'Spin the wheel', {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'white'
    })
    this.prizeDescText = this.add.text(400, 390, 'Click to spin !', {
      font: 'bold 24px Arial',
      align: 'center',
      color: 'white'
    })

    // center the text
    this.prizeText.setOrigin(0.5)
    // center the text
    this.prizeDescText.setOrigin(0.5)

    // the game has just started = we can spin the wheel
    this.canSpin = true

    // waiting for your input, then calling "spinWheel" function
    this.input.on('pointerdown', this.spinWheel, this)

    // Add points
    this.pointText = this.add.text(10, 10, points + ' points', {
      font: 'bold 25px Arial',
      align: 'center',
      color: 'white'
    })

    this.spinsLeftText = this.add.text(10, 45, spinsLeft + ' spins left', {
      font: 'bold 25px Arial',
      align: 'center',
      color: 'white'
    })
    
    var soundtxt = 'Press "A" to Activate sound'
    if(sound === true){
      soundtxt = 'Press "A" to Desactivate sound'
    }
    this.soundText = this.add.text(1600, 20, soundtxt, {
      font: 'bold 20px Arial',
      align: 'center',
      color: 'white'
    }) 
    
    // center the text
    this.soundText.setOrigin(0.5)
    
    
    this.input.keyboard.on('keydown', function (input) {
      //SOUND SWITCH
      if (input.key === 'a' && spinsLeft > 0) {
        console.log("trigger")
        sound = !sound
        var soundtxt = 'Press "A" to Activate sound'
        if(sound === true){
          soundtxt = 'Press "A" to Desactivate sound'
        }
        console.log(this.scene)
        this.scene.soundText.setText(soundtxt)
      }
      
      //EARTH EVENT
      if (input.key === 'b' && buyFuelHuman && points > 300) {
        points -= 300
        spinsLeft += 1
        this.scene.pointText.setText(points + ' points')
        this.scene.spinsLeftText.setText(spinsLeft + ' spins left')
        return
      }
      
      //OVNI EVENT
      if (input.key === 'f' && ovniChoice) {
        if(spinsLeft < 1){
          this.scene.prizeDescText.setText('The OVNI desepear,\n You had no fuel, so it took ressources... (-300 points)')
          if(point)
          this.scene.pointText.setText(points + ' points')
        }
        else{
          spinsLeft -= 1
          this.scene.prizeDescText.setText('The OVNI desepear,\n but with some of your fuel... (-1 spin)')
          this.scene.spinsLeftText.setText(spinsLeft + ' spins left')
        }
        this.scene.canSpin = true
        return
      }
      if (input.key === 'r' && ovniChoice) {
        points -= 300
        this.scene.prizeDescText.setText('The OVNI desepear,\n but also did some of your ressources... (-300 points)')
        this.scene.pointText.setText(points + ' points')
        this.scene.canSpin = true
        return
      }
      
      //MARKET EVENT (OUT OF SOLAR SYSTEM)
      if (input.key === 'b' && buyFuelMarket && points > 150) {
        points -= 150
        spinsLeft += 1
        this.scene.pointText.setText(points + ' points')
        this.scene.spinsLeftText.setText(spinsLeft + ' spins left')
        return
      }
    })
    

  }
  
  
  switchSound () {
    console.log("trigger")
    sound = !sound
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText.setText(soundtxt)
  }

  createWheel () {
    // starting degrees
    let startDegrees = -90

    // making a graphic object without adding it to the game
    const graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    })

    // this array will contain the allowed degrees
    this.allowedDegrees = []

    // adding a container to group wheel and icons
    this.wheelContainer = this.add.container(950, 300)

    // array which will contain all icons
    const iconArray = []

    // looping through each slice
    for (let i = 0; i < gameOptions.slices.length; i++) {
      // if the slice is enabled, that is if the prize can be won...
      if (gameOptions.slices[i].enabled) {
        // ... we insert all slice degrees into allowedDegrees array
        for (let j = 0; j < gameOptions.slices[i].degrees; j++) {
          this.allowedDegrees.push(270 - startDegrees - j)
        }
      }

      // converting colors from 0xRRGGBB format to Color objects
      const startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor)
      const endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor)

      for (let j = gameOptions.slices[i].rings; j > 0; j--) {
        // interpolate colors
        const ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, gameOptions.slices[i].rings, j)

        // converting the interpolated color to 0xRRGGBB format
        const ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, '0x')

        // setting fill style
        graphics.fillStyle(+ringColorString, 1)

        // drawing the slice
        graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false)

        // filling the slice
        graphics.fillPath()
      }

      // setting line style
      graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1)

      // drawing the biggest slice
      graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false)

      // stroking the slice
      graphics.strokePath()

      // add the icon, if any
      if (gameOptions.slices[i].iconFrame !== undefined) {
        // icon image
        const icon = this.add.image(gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), 'icons', gameOptions.slices[i].iconFrame)

        // scaling the icon according to game preferences
        icon.scaleX = gameOptions.slices[i].iconScale
        icon.scaleY = gameOptions.slices[i].iconScale

        // rotating the icon
        icon.angle = startDegrees + gameOptions.slices[i].degrees / 2 + 90

        // add icon to iconArray
        iconArray.push(icon)
      }

      // updating degrees
      startDegrees += gameOptions.slices[i].degrees
    }

    // generate a texture called "wheel" from graphics data
    graphics.generateTexture('wheel', (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2, (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2)

    // creating a sprite with wheel image as if it was a preloaded image
    const wheel = this.add.sprite(0, 0, 'wheel')

    // adding the wheel to the container
    this.wheelContainer.add(wheel)

    // adding all iconArray items to the container
    this.wheelContainer.add(iconArray)

    // adding the pin in the middle of the canvas

    this.pin = this.add.sprite(950, 300, 'pin')
    this.pin.setScale(0.012, 0.012)
  }

  // function to spin the wheel
  spinWheel () {
    // can we spin the wheel?
    if (this.canSpin) {
      buyFuelHuman = false
      buyFuelMarket = false
      ovniChoice = false
      spinsLeft -= 1
      this.spinsLeftText.setText(spinsLeft + ' spins left')
      if(sound === true){
        this.sound.play('spinsound');
      }

      // resetting text field
      this.prizeText.setText('')
      this.prizeDescText.setText('')
      if (this.iconBig !== undefined) { this.iconBig.destroy() }

      redefineDegrees()
      this.createWheel()

      // the wheel will spin round for some times. This is just coreography
      const rounds = Phaser.Math.Between(gameOptions.wheelRounds.min, gameOptions.wheelRounds.max)

      // then will rotate by a random amount of degrees picked among the allowed degrees. This is the actual spin
      const degrees = Phaser.Utils.Array.GetRandom(this.allowedDegrees)

      // then will rotate back by a random amount of degrees
      const backDegrees = Phaser.Math.Between(gameOptions.backSpin.min, gameOptions.backSpin.max)

      // before the wheel ends spinning, we already know the prize
      let prizeDegree = 0

      // looping through slices
      for (let i = gameOptions.slices.length - 1; i >= 0; i--) {
        // adding current slice angle to prizeDegree
        prizeDegree += gameOptions.slices[i].degrees

        // if it's greater than the random angle...
        if (prizeDegree > degrees) {
          // we found the prize
          var prize = i
          break
        }
      }

      // now the wheel cannot spin because it's already spinning
      this.canSpin = false

      // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
      // the quadratic easing will simulate friction
      this.tweens.add({

        // adding the wheel container to tween targets
        targets: [this.wheelContainer],

        // angle destination
        angle: 360 * rounds + degrees + backDegrees,

        // tween duration
        duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),

        // tween easing
        ease: 'Cubic.easeOut',

        // callback scope
        callbackScope: this,

        // function to be executed once the tween has been completed
        onComplete: function (tween) {
          // another tween to rotate a bit in the opposite direction
          this.tweens.add({
            targets: [this.wheelContainer],
            angle: this.wheelContainer.angle - backDegrees,
            duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max) / 2,
            ease: 'Cubic.easeIn',
            callbackScope: this,
            onComplete: function (tween) {
              // displaying prize text
              this.prizeText.setText(gameOptions.slices[prize].text)
              this.iconBig = this.add.sprite(1500, 350, 'icons', gameOptions.slices[prize].iconFrame)
              this.iconBig.setScale(3.5, 3.5)

              switch (prize) {
                case 0 : { // EARTH
                  if(sound === true){
                    this.sound.play('earthsound');
                  }
                  this.prizeDescText.setText('Home sweet home...\nThe spaceport offer your some fuel (+2 spins)\nDo you want to buy even more ?\n300points = 1 fuel\n (buy using "B")')
                  buyFuelHuman = true
                  this.canSpin = true
                  break
                }
                case 1 : { //  OVNI
                  if(sound === true){
                    this.sound.play('ovnisound');
                  }
                  this.prizeDescText.setText('Should we be scared?\nYou hear a strange voice whisper : \n"FUEL OR RESSOURCES?"\n(F for Fuel, R for ressources)')
                  ovniChoice = true
                  
                  //turnOver = true
                  break
                }
                case 2 : { // OUT OF SOLAR SYSTEM
                  if(sound === true){
                    this.sound.play('outsound');
                  }
                  const rand = Math.floor(Math.random() * Math.floor(4))
                  switch(rand){
                    case 0 :{
                      this.prizeDescText.setText('You find some pretty agressive alien ships !\nBut your ship is better.\n You destroy them and scrap some ressources\n(+500 points)')
                      this.points += 500
                      break
                    }
                    case 1 :{
                      this.prizeDescText.setText('You find some pretty agressive alien ships !\nThey are too strong for you.\n You flee, using a lot of fuel\n(-1 spin)')
                      if(this.spinsLeft > 0)
                        this.spinsLeft -= 1
                      break
                    }
                    case 2 :{
                      this.prizeDescText.setText('You find a really frendly alien ship.\n"Take this human"\n "it will be more useful to you".\n(+1 spin and + 250 points)')
                      this.points += 250
                      this.spinsLeft += 1
                      break
                    }
                    case 3 :{
                      this.prizeDescText.setText('You find a market station.\nThey sell fuel for really cheap !\n150points = 1 fuel\n (buy using "B")')
                      buyFuelMarket = true
                      break
                    }
                  }
                  this.canSpin = true
                  break
                }
                case 3 : { // BLACKHOLE
                  if(sound === true){
                    this.sound.play('blackholesound');
                  }
                  this.canSpin = true
                  break
                }
                case 4 : { // MARS
                  if(sound === true){
                    this.sound.play('marssound');
                  }
                  this.canSpin = true
                  break
                }
                case 5 : { // SUN
                  if(sound === true){
                    this.sound.play('sunsound');
                  }
                  this.canSpin = true
                  spinsLeft += 2
                  this.spinsLeftText.setText(spinsLeft + ' spins left')
                  break
                }
              }

              this.pointText.setText(points + ' points')

              if (spinsLeft <= 0) {
                this.prizeText.setText("It's the end of your interstellar trip !")
                this.prizeDescText.setText('Points : ' + points)
                this.nameTextA = this.add.text(950, 800, '_', {
                  font: 'bold 25px Arial',
                  align: 'center',
                  color: 'white'
                })
                this.nameTextB = this.add.text(980, 800, '_', {
                  font: 'bold 25px Arial',
                  align: 'center',
                  color: 'white'
                })
                this.nameTextC = this.add.text(1010, 800, '_', {
                  font: 'bold 25px Arial',
                  align: 'center',
                  color: 'white'
                })
                this.input.keyboard.on('keydown', function (input) {
                  if (this.nameTextA.text === '_') {
                    this.nameTextA.setText(input.key)
                    return
                  } else if (this.nameTextB.text === '_') {
                    this.nameTextB.setText(input.key)
                    return
                  } else if (this.nameTextC.text === '_') {
                    this.nameTextC.setText(input.key)
                    return
                  }
                  if (this.nameTextA.text !== '_' && this.nameTextB.text !== '_' && this.nameTextC.text !== '_' && input.key === 'Enter') {
                    scoreJson.scores.push({letter1: this.nameTextA.text, letter2: this.nameTextB.text, letter3: this.nameTextC.text, score:points});
                    this.scene.start('MenuScene')
                  }
                }, this)
              }
            }
          })
        }
      })
    }
  }
}
