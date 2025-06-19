const {createApp} = Vue

function getRandomValues(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

createApp({
    data() {
      return {
          playerHealth: 100,
          monsterHealth: 100,
          battleLogs: [],
          currentRound: 0,
          gameOver: false,
          playerSurrendered: false,
      }
    },
    computed: {
        monsterHealthStyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerHealthStyles() {
            return {width: this.playerHealth + '%'}
        },
        specialAttackEnabled() {
            return this.currentRound % 3 !== 0 || this.currentRound === 0
        },
        healEnabled() {
            return this.currentRound % 5 !== 0 || this.currentRound === 0
        },
        isGameOver() {
            return this.playerHealth === 0 || this.monsterHealth === 0 || this.playerSurrendered === true
        }
    },
    methods: {
        attackMonster(attack = getRandomValues(12, 5)) {
            if(this.playerHealth > 0 && !this.isGameOver) {
                this.monsterHealth -= clamp(attack, 0, this.monsterHealth)
                this.attackPlayer()
                this.currentRound++
                this.log(`Player uses attacks with ${attack} damage`)
                
                if (this.isGameOver) {
                    this.log("GAME OVER!")
                }
            }
        },
        specialAttackMonster(){
            if (!this.specialAttackEnabled && !this.isGameOver) {
                const value = getRandomValues(10, 25)
                this.attackMonster(value)
                this.log(`Player uses special attack with ${value} damage`)
            }
            
        },
        attackPlayer(){
            const attack = getRandomValues(18, 8)
            this.playerHealth -= clamp(attack, 0, this.playerHealth)
            this.log(`Monster attacks with ${attack} damage`)
        },
        healPlayer() {
            if (!this.isGameOver) {
                const value = getRandomValues(8,20)
                this.playerHealth = clamp(value, this.playerHealth + value, 100)
                this.currentRound++
                this.log(`Player uses heal. Healed for ${value} HP`)
            }
        },
        log(message) {
            this.battleLogs.push(message)
        },
        surrender(){
            if (!this.gameOver) {
                this.playerSurrendered = true
                this.log("Player surrendered. Game Over!")
            }
            
        }
    }
}).mount("#game")