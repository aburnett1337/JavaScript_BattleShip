document.addEventListener('DOMContentLoaded', () => {
    let goodToGoP1 = false
    let goodToGoP2 = false
    let isPlayer1 = true
    let p1Score = 24
    let p2Score = 24
    const playerTiles= []

    let player1Name = document.getElementById("p1name").textContent
    const player1 = document.querySelector('.board-p1')
    const p1GameBoard = document.querySelector('.board-p1gameboard')
    let p1Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

    const player2 = document.querySelector('.board-p2')
    let player2Name = document.getElementById("p2name").textContent
    const p2GameBoard = document.querySelector('.board-p2gameboard')
    let p2Array = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

    makeBoard(1)
    makeBoard(2)

    document.getElementById("start").addEventListener("click", gameStart )
    
// ----------------------------------------------functions-----------------------------------------------------------------------------//

    //Game start
    function gameStart(){
        getInfo()
        getShips(1)
        getShips(2)

        if(goodToGoP1 && goodToGoP2){
            let startButton = document.getElementById("start")
            let p1inputbox = document.getElementById("P1Input")
            let p2inputbox = document.getElementById("P2Input")
            let shiphelp = document.getElementById("shipHelp")
            let p1ships = document.getElementById("P1Ships")
            let p2ships = document.getElementById("P2Ships")
            let info = startButton.parentNode

            info.removeChild(startButton)
            info.removeChild(p1inputbox)
            info.removeChild(p2inputbox)
            info.removeChild(shiphelp)
            info.removeChild(p1ships)
            info.removeChild(p2ships)

            
            let line = document.getElementById("para")
            let s = player1Name + "'s turn"
            line.textContent = s

            playGame()
        }
    }

    //main game logic
    function playGame(){
        playerTiles.forEach(tile => tile.square.addEventListener('click', function(x,y){clickedOnTile(tile.square, tile.id)} ))
    }

    //reveals selected tile
    function clickedOnTile(tile, id) {
        let tileID = id
        if(isPlayer1){
            while(tileID <= 100){
                let line = document.getElementById("para")
                let s = "You can't shoot there, " + player1Name
                line.textContent = s
                return
            }
            tileID = id - 101
            p2Array[tileID] = p2Array[tileID] + 2
            if(p2Array[tileID] === 3) p2Score -= 2
        }
        else {
            while(tileID > 100){
                let line = document.getElementById("para")
                let s = "You can't shoot there, " + player2Name
                line.textContent = s
                return
            }
            tileID = id - 1
            p1Array[tileID] = p1Array[tileID] + 2
            if(p1Array[tileID] === 3) p1Score -= 2
        }
        printBoard(1)
        printBoard(2)

        if(!didSomeoneWin()){
            isPlayer1 = !isPlayer1
            if(isPlayer1){
                let line = document.getElementById("para")
                let s = player1Name + "'s turn"
                line.textContent = s
            } 
            else{
                let line = document.getElementById("para")
                let s = player2Name + "'s turn"
                line.textContent = s
            }
        }
    }

    //checks for a game over
    function didSomeoneWin() {
        if(p1Score === 0) {
            console.log("hello?")
            let line = document.getElementById("para")
            let s = player2Name + " WINS WITH A SCORE OF " + p2Score + " AND " + player1Name + " LOST WITH A SCORE OF " + p1Score + ". Refresh to play again :)"
            line.textContent = s
            return true
        }

        else if(p2Score === 0){
            console.log("hello?")
            let line = document.getElementById("para")
            let s = player1Name + " WINS WITH A SCORE OF " + p1Score + " AND " + player2Name + " LOST WITH A SCORE OF " + p2Score + ". Refresh to play again :)"
            line.textContent = s
            return true
        }
        return false
    }
    //get info of the players
    function getInfo(){
        const p1name = document.getElementById('P1Input').value
        const node = document.getElementsByTagName('p1name')
        const oldName = node[0].childNodes[0]
        const newName = document.createTextNode(p1name)
        node[0].replaceChild(newName, oldName)
        player1Name = p1name
        
        const p2name = document.getElementById('P2Input').value
        const node2 = document.getElementsByTagName('p2name')
        const oldName2 = node2[0].childNodes[0]
        const newName2 = document.createTextNode(p2name)
        node2[0].replaceChild(newName2, oldName2)
        player2Name = p2name

    }

    //converts the given coordinate to an array element
    function coordToNum(coord) {
        const lett = coord.substring(0,1)
        const numb = parseInt(coord.substring(1,2), 10)
        let x = 0
        if(lett === 'B') x = 10
        else if(lett === 'C') x = 20
        else if(lett === 'D') x = 30
        else if(lett === 'E') x = 40
        else if(lett === 'F') x = 50
        else if(lett === 'G') x = 60
        else if(lett === 'H') x = 70
        else if(lett === 'I') x = 80
        else if(lett === 'J') x = 90

        x = x + numb
        return x
    }

    //Sets the ship on the players board
    function setShip(start, end, player, size) {
        let x = (end - start) 
        let isHoris = true 
        let temp = start - 1
        if(x > 6) isHoris = false
        if(player === 1){
            if(isHoris){
                for(let i = 0; i < size; i++) {
                    p1Array[temp] = 1
                    temp = temp + 1
                }
            }
            else{
                for(let i = 0; i < size; i++) {
                    p1Array[temp] = 1
                    temp = temp + 10
                }
            }
        }
        else {
            if(isHoris){
                for(let i = 0; i < size; i++) {
                    p2Array[temp] = 1
                    temp = temp + 1
                }
            }
            else{
                for(let i = 0; i < size; i++) {
                    p2Array[temp] = 1
                    temp = temp + 10
                }
            }
        }
    }

    //creates the players board
    function makeBoard(player) {
        if(player === 1){
            for(let i = 1; i <= 100; i++){
                const square = document.createElement('hiddentile')
                square.setAttribute("id", i)
                p1GameBoard.appendChild(square)
                let tile = {"square": square, "id":i}
                playerTiles.push(tile)
            }
        }
        else {
            for(let i = 101; i <= 200; i++){
                const square = document.createElement('hiddentile')
                square.setAttribute("id", i)
                p2GameBoard.appendChild(square)
                let tile = {"square": square, "id":i}
                playerTiles.push(tile)
            }
        }
    }
    //shows the players board
    function printBoard(player){
        if(player === 1){
            for(let i = 0; i < p1Array.length; i++){
                let x = p1Array[i]
                const y = i + 1
                if( x === 2){
                    const newNode = document.createElement('shownmisstile')
                    newNode.id = y
                    const oldNode = document.getElementById(y)
                    var parent = oldNode.parentNode
                    parent.replaceChild(newNode,oldNode)
                }
                else if( x === 3){
                    const newNode = document.createElement('shownhittile')
                    newNode.id = y
                    const oldNode = document.getElementById(y)
                    var parent = oldNode.parentNode
                    parent.replaceChild(newNode,oldNode)
                }
            }
        }
        else{
            for(let i = 0; i < p2Array.length; i++){
                let x = p2Array[i]
                const y = i + 101
                if( x === 2){
                    const newNode = document.createElement('shownmisstile')
                    newNode.id = y
                    const oldNode = document.getElementById(y)
                    var parent = oldNode.parentNode
                    parent.replaceChild(newNode,oldNode)
                }
                else if( x === 3){
                    const newNode = document.createElement('shownhittile')
                    newNode.id = y
                    const oldNode = document.getElementById(y)
                    var parent = oldNode.parentNode
                    parent.replaceChild(newNode,oldNode)
                }
            }
        }
    }

    //get the players ships
    function getShips(player){
        let buffer = 0;
        if(player === 1){
            let ships = document.getElementById("P1Ships").value
            if (!(isValidInput(ships)) ){
                let line = document.getElementById("shipHelp")
                line.textContent = "Wrong input. Use A(A1-A5);B(B6-E6);S(H3-J3); as a guide. A for Aircraft, B for Battleship and S for submarine"
                goodToGoP1 = false
                document.getElementById("start").addEventListener("click", gameStart )
            }
            else{
                let aircraftStart = ships.substring(2,5)
                if(aircraftStart.substring(1,3) === '10') buffer += 1
                else aircraftStart = ships.substring(2,4)
                aircraftStart = coordToNum(aircraftStart)
                


                let aircraftEnd = ships.substring(5+buffer,8+buffer)
                if(aircraftEnd.substring(1,3) === '10') buffer += 1
                else aircraftEnd = ships.substring(5+buffer,7+buffer)
                aircraftEnd = coordToNum(aircraftEnd)


                setShip(aircraftStart, aircraftEnd, 1, 5)


                let battleStart = ships.substring(11+buffer, 14+buffer)
                if(battleStart.substring(1,3) === '10') buffer += 1
                else battleStart = ships.substring(11+buffer,13+buffer)
                battleStart = coordToNum(battleStart)


                let battleEnd = ships.substring(14+buffer, 17+buffer)
                if(battleEnd.substring(1,3) === '10') buffer += 1
                else battleEnd = ships.substring(14+buffer,16+buffer)
                battleEnd = coordToNum(battleEnd)

                setShip(battleStart, battleEnd, 1, 4)


                let subStart = ships.substring(20+buffer, 23+buffer)
                if(subStart.substring(1,3) === '10') buffer += 1
                else subStart = ships.substring(20+buffer,22+buffer)
                subStart = coordToNum(subStart)

                let subEnd = ships.substring(23+buffer, 26+buffer)
                if(subEnd.substring(1,3) === '10') buffer += 1
                else subEnd = ships.substring(23+buffer,25+buffer)
                subEnd = coordToNum(subEnd)

                setShip(subStart, subEnd, 1, 3)

                goodToGoP1 = true
            }
        }
        else{
            let ships = document.getElementById("P2Ships").value
            if (!(isValidInput(ships)) ){
                let line = document.getElementById("shipHelp")
                line.textContent = "Wrong input. Use A(A1-A5);B(B6-E6);S(H3-J3); as a guide. A for Aircraft, B for Battleship and S for submarine"
                goodToGoP2 = false
                document.getElementById("start").addEventListener("click", gameStart )
            }
            else{
                let aircraftStart = ships.substring(2,5)
                if(aircraftStart.substring(1,3) === '10') buffer += 1
                else aircraftStart = ships.substring(2,4)
                aircraftStart = coordToNum(aircraftStart)
                


                let aircraftEnd = ships.substring(5+buffer,8+buffer)
                if(aircraftEnd.substring(1,3) === '10') buffer += 1
                else aircraftEnd = ships.substring(5+buffer,7+buffer)
                aircraftEnd = coordToNum(aircraftEnd)


                setShip(aircraftStart, aircraftEnd, 2, 5)


                let battleStart = ships.substring(11+buffer, 14+buffer)
                if(battleStart.substring(1,3) === '10') buffer += 1
                else battleStart = ships.substring(11+buffer,13+buffer)
                battleStart = coordToNum(battleStart)


                let battleEnd = ships.substring(14+buffer, 17+buffer)
                if(battleEnd.substring(1,3) === '10') buffer += 1
                else battleEnd = ships.substring(14+buffer,16+buffer)
                battleEnd = coordToNum(battleEnd)

                setShip(battleStart, battleEnd, 2, 4)


                let subStart = ships.substring(20+buffer, 23+buffer)
                if(subStart.substring(1,3) === '10') buffer += 1
                else subStart = ships.substring(20+buffer,22+buffer)
                subStart = coordToNum(subStart)

                let subEnd = ships.substring(23+buffer, 26+buffer)
                if(subEnd.substring(1,3) === '10') buffer += 1
                else subEnd = ships.substring(23+buffer,25+buffer)
                subEnd = coordToNum(subEnd)

                setShip(subStart, subEnd, 2, 3)
                goodToGoP2 = true
            }
        }
    }

    //Checks if ships input is valid
    function isValidInput(ships){
        let validShips = false
        const validLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        let correct = 0
        let isHorizontal = false
        let buffer = 0

        //---------------------CHECKS FOR VALID AIRCRAFT-------------------------------------------------
        let aircraftStart = ships.substring(2,5)
        if(aircraftStart.substring(1,3) === '10') buffer += 1
        else aircraftStart = ships.substring(2,4)

        let airStartLett = aircraftStart.substring(0,1)
        airStartLett = airStartLett.toString()
        let airStartLettIndex = LettToNum(airStartLett)
        let airStartNum = parseInt(aircraftStart.substring(1,3), 10)

        let aircraftEnd = ships.substring(5+buffer,8+buffer)
        if(aircraftEnd.substring(1,3) === '10') buffer += 1
        else aircraftEnd = ships.substring(5+buffer,7+buffer)

        let airEndLett = aircraftEnd.substring(0,1)
        airEndLett = airEndLett.toString()
        let airEndLettIndex = LettToNum(airEndLett)
        let airEndNum = parseInt(aircraftEnd.substring(1,3), 10)

        if( airStartLett === airEndLett ) isHorizontal = true
        else isHorizontal = false
        
        if(isHorizontal){
            for(let i = 0; i < validLetters.length; i++){
                if(airStartLett === validLetters[i] && airStartNum <= 6 && ( airEndNum - airStartNum === 4) ){
                    correct += 1
                }
            }
        }
        else{
            for(let i = 0; i <= (validLetters.length-5); i++){
                if( (airStartLett === validLetters[i]) && (airEndNum === airStartNum) && validLetters[airStartLettIndex + 4] === validLetters[airEndLettIndex]){
                    correct += 1
                }
            }
        }
        
        //CHECKS FOR VALID BATTLESHIP------------------------------------------------------------------------
        let battleStart = ships.substring(11+buffer, 14+buffer)
        if(battleStart.substring(1,3) === '10') buffer += 1
        else battleStart = ships.substring(11+buffer,13+buffer)

        let battleEnd = ships.substring(14+buffer, 17+buffer)
        if(battleEnd.substring(1,3) === '10') buffer += 1
        else battleEnd = ships.substring(14+buffer,16+buffer)

        let battleStartLett = battleStart.substring(0,1)
        battleStartLett = battleStartLett.toString()
        let battleStartLettIndex = LettToNum(battleStartLett)
        let battleStartNum = parseInt(battleStart.substring(1,3), 10)

        let battleEndLett = battleEnd.substring(0,1)
        battleEndLett = battleEndLett.toString()
        let battleEndLettIndex = LettToNum(battleEndLett)
        let battleEndNum = parseInt(battleEnd.substring(1,3), 10)

        if( battleStartLett === battleEndLett ) isHorizontal = true
        else isHorizontal = false

        if(isHorizontal){
            for(let i = 0; i < validLetters.length; i++){
                if(battleStartLett === validLetters[i] && battleStartNum <= 7 && ( battleEndNum - battleStartNum === 3) ){
                    correct += 1
                }
            }
        }
        else{
            for(let i = 0; i <= (validLetters.length-4); i++){
                if( (battleStartLett === validLetters[i]) && (battleEndNum === battleStartNum) && validLetters[battleStartLettIndex + 3] === validLetters[battleEndLettIndex]){
                    correct += 1
                }
            }
        }

        //CHECKS FOR VALID SUBMARINE------------------------------------------------------------------------------
        let subStart = ships.substring(20+buffer, 23+buffer)
        if(subStart.substring(1,3) === '10') buffer += 1
        else subStart = ships.substring(20+buffer,22+buffer)

        let subEnd = ships.substring(23+buffer, 26+buffer)
        if(subEnd.substring(1,3) === '10') buffer += 1
        else subEnd = ships.substring(23+buffer,25+buffer)

        let subStartLett = subStart.substring(0,1)
        subStartLett = subStartLett.toString()
        let subStartLettIndex = LettToNum(subStartLett)
        let subStartNum = parseInt(subStart.substring(1,3), 10)

        let subEndLett = subEnd.substring(0,1)
        subEndLett = subEndLett.toString()
        let subEndLettIndex = LettToNum(subEndLett)
        let subEndNum = parseInt(subEnd.substring(1,3), 10)

        if( subStartLett === subEndLett ) isHorizontal = true
        else isHorizontal = false

        if(isHorizontal){
            for(let i = 0; i < validLetters.length; i++){
                if(subStartLett === validLetters[i] && subStartNum <= 8 && ( subEndNum - subStartNum === 2) ){
                    correct += 1

                }
            }
        }
        else{
            for(let i = 0; i <= (validLetters.length-3); i++){
                if( (subStartLett === validLetters[i]) && (subEndNum === subStartNum) && validLetters[subStartLettIndex + 2] === validLetters[subEndLettIndex]){
                    correct += 1
                }
            }
        }


        if(correct === 3) validShips = true
        return validShips
    }

    function LettToNum(letter){
        if(letter === 'A') return 0
        else if(letter === 'B') return 1
        else if(letter === 'C') return 2
        else if(letter === 'D') return 3
        else if(letter === 'E') return 4
        else if(letter === 'F') return 5
        else if(letter === 'G') return 6
        else if(letter === 'H') return 7
        else if(letter === 'I') return 8
        else return 9

    }
})