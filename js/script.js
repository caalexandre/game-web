const screen = document.querySelector('#screen')
const context = screen.getContext('2d')
const button = document.querySelector('#buy')

const game = {
    players: {
        'player1': { x: 12, y: 12, hp: 3, points: 0 },
    },
    enemies: {
        'enemy1': { x: randomPosition(), y: randomPosition() },
    },
    coins: {
        'coin1': { x: randomPosition(), y: randomPosition() },
    }
}


const moves = {
    ArrowUp(player) {
        if (player.y > 0) {
            player.y -= 1
            for (const enemyId in game.enemies) {
                const enemy = game.enemies[enemyId]
                if (player.y === enemy.y && player.x === enemy.x) {
                    enemyDamage(player)
                    player.y += 2
                }
            }
        }
        collectCoin(player)
    },
    
    ArrowDown(player) {
        if (player.y < 14) {
            player.y += 1
            for (const enemyId in game.enemies) {
                const enemy = game.enemies[enemyId]
                if (player.y === enemy.y && player.x === enemy.x) {
                    enemyDamage(player)
                    player.y -= 2
                }
            }
        }
        collectCoin(player)
    },

    ArrowLeft(player) {
        if (player.x > 0) {
            player.x -= 1
            for (const enemyId in game.enemies) {
                const enemy = game.enemies[enemyId]
                if (player.y === enemy.y && player.x === enemy.x) {
                    enemyDamage(player)
                    player.x += 2
                }
            }
        } 
            collectCoin(player)
        
    },

    ArrowRight(player) {
        if (player.x < 14) {
            player.x += 1
            for (const enemyId in game.enemies) {
                const enemy = game.enemies[enemyId]
                if (player.y === enemy.y && player.x === enemy.x) {
                    enemyDamage(player)
                    player.x -= 2
                }
            }
        }
            collectCoin(player)
    },
}



document.addEventListener('keydown', handleKeydown)

function handleKeydown(event) {
    const keyPressed = event.key
    const player = game.players['player1']
    const enemy = game.enemies['enemy1']
    const moveFunction = moves[keyPressed]
    if (moveFunction) {
        moveFunction(player, enemy)
    }
}

function enemyDamage(player) {
    for (const enemyId in game.enemies) {
        const enemy = game.enemies[enemyId]
        if (player.x === enemy.x && player.y === enemy.y) {
            player.hp -= 1
            console.log('Enemy damage')
        }
    }
}

function collectCoin(player) {
    for (const coinId in game.coins) {
        const coin = game.coins[coinId]
        if (player.x === coin.x && player.y === coin.y) {
            coin.x = randomPosition()
            coin.y = randomPosition()
            player.points += 1
            console.log('Coin collected')
        }
 
    }
    
}

function randomPosition() {
    return Math.floor(Math.random() * 15)
}

async function enemyMovement(){
    
}

renderScreen()

function renderScreen() {
    context.fillStyle = 'white'
    context.clearRect(0, 0, 15, 15)

    for (const playerId in game.players) {
        const player = game.players[playerId]
        const playerHP = player.hp
        const playerPoints = player.points
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
        document.querySelector("#hp").textContent = `${playerHP}`
        document.querySelector("#points").textContent = `${playerPoints}`

    }

    for (const enemyId in game.enemies) {
        const enemy = game.enemies[enemyId]
        context.fillStyle = 'red'
        context.fillRect(enemy.x, enemy.y, 1, 1)
    }

    for (const coinId in game.coins) {
        const coin = game.coins[coinId]
        context.fillStyle = 'yellow'
        context.fillRect(coin.x, coin.y, 1, 1)
    }

    requestAnimationFrame(renderScreen)
}