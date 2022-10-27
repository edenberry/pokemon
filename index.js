const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const img = document.getElementById("mapa");
const imagemjogador = document.getElementById("baixo");

const colisoesMapa = []
for(let i = 0; i < colisoes.length; i+=70){  //dividir o mapa na horizontal
    colisoesMapa.push(colisoes.slice(i, 70 + i))

}

class Fronteira{
    static width  = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const fronteiras = []
const offset = {
    x: -880,
    y: -1230
}

colisoesMapa.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            fronteiras.push(new Fronteira({position: {
            x: j * Fronteira.width + offset.x,
            y: i* Fronteira.height + offset.y
            }
        })
        )}
    })
})


class Sprite {
    constructor ({position, img, frames = {max : 1} }) {
        this.position = position
        this.img = img
        this.frames = frames
    }

    draw() {
        c.drawImage(
            this.img,
            0,
            0,
            this.img.width/this.frames.max,
            this.img.height, 
            this.position.x,  //essa parte era pra ficar no off set mas nao fica
            this.position.y,
            this.img.width/this.frames.max,
            this.img.height
        )
    }
}


const jogador = new Sprite ({
    position: {
        x:canvas.width/2 - (192/4)/2,
        y:canvas.height/2 - 68/2
    },
    img: imagemjogador,
    frames: {
        max: 4
    }
})

const imagemdefundo = new Sprite({position:{
    x: offset.x,
    y: offset.y
},
    img: img
})

canvas.width = 1024
canvas.height = 576


c.fillStyle = 'red'
c.fillRect(0, 0, canvas.width, canvas.height)
c.drawImage(img, 0, 0)

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const testFronteira = new Fronteira({
    position : {
        x: 400,
        y: 400
    }
})

const moveis = [imagemdefundo, testFronteira]

function animar () {
    window.requestAnimationFrame(animar)
    imagemdefundo.draw()
    /*fronteiras.forEach(Fronteira => {    //meu deus do ceu
        Fronteira.draw()
    })*/
    testFronteira.draw()
    jogador.draw()
 //   if (jogador.position.x + jogador.width >)

    if (keys.w.pressed &&  lastKey === 'w') {
        moveis.forEach(moveis => {
            moveis.position.y += 10
        })
    }
    else if (keys.s.pressed &&  lastKey === 's') {
        moveis.forEach(moveis => {
            moveis.position.y -= 10
    })}
    else if (keys.a.pressed &&  lastKey === 'a') {       
        moveis.forEach(moveis => {
            moveis.position.x += 10
})}
    else if (keys.d.pressed &&  lastKey === 'd') {
           moveis.forEach(moveis => {
        moveis.position.x -= 10
})}
}
animar()

let lastKey = ''
window.addEventListener('keydown', (e)=> {
    switch (e.key){
        case'w':
        keys.w.pressed = true
        lastKey = 'w'
            break

        case'a':
        keys.a.pressed = true
        lastKey = 'a'
            break

        case's':
        keys.s.pressed = true
        lastKey = 's'
            break

        case'd':
        keys.d.pressed = true
        lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e)=> {
    switch (e.key){
        case'w':
        keys.w.pressed = false
            break

        case'a':
        keys.a.pressed = false
            break

        case's':
        keys.s.pressed = false
            break

        case'd':
        keys.d.pressed = false
            break
    }
})