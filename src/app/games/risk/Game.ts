import { Player } from "./Player";
import { Territory } from "./Territory";
// import { Action } from "./Action";
import { GameI } from "../game";
import territories from '../../../assets/risk.json'

export class Risk implements GameI {
    players = [
            new Player("Player 1", "red"),
            new Player("Player 2", "blue"),
            new Player("Player 3", "green")
        ];
    currentPlayer: Player | null;
    territories: Array<any> = territories
    constructor() {
        this.currentPlayer = null;
    }
    id: string="risk";
    name: string="Risk";
    description: string="Risk";
    features: { type: string; geometry: { type: string; coordinates: number[]; radius?: number; }; properties: { name: string; address: string; description: string; image: string; website: string; phone: string; }; }[];

    addPlayer(player: Player): void {
        this.players.push(player);
    }

    removePlayer(player: Player): void {
        const index = this.players.indexOf(player);
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }
    turnComplete = false;
    startGame(): void {
        // Shuffle the list of players
        const shuffledPlayers = this.shuffle(this.players);

        // Randomly assign territories to each player
        const territories = this.shuffle(this.territories);
        //for each territory, set the owner to the player
        territories.forEach((territory, index) => {
            Territory.setOwner(territory , shuffledPlayers[index % shuffledPlayers.length]);
        });

        // let i = 0;
        // for (const territory of territories) {
        //     const player = shuffledPlayers[i % shuffledPlayers.length];
        //     territory.setOwner(player);
        //     i++;
        // }

        // Each player places a certain number of armies on their territories
        for (const player of shuffledPlayers) {
            const startingArmies = this.calculateStartingArmies(this.players.length);
            for (const territory of player.territories) {
                territory.armies += startingArmies;
            }
        }

        // Start the game loop
        let turn = 1;
        let currentPlayerIndex = 0;
        while (!this.isGameOver(this.players) && this.turnComplete) {
            
            const currentPlayer = shuffledPlayers[currentPlayerIndex];
            const gameState = new GameState(this.players, this.territories, turn, currentPlayer);

            // Player takes their turn
            const action = currentPlayer.takeTurn(gameState);
                // if (this.isValidAction(action, gameState)) {
                //     this.applyAction(action, gameState);
                // }

            // Move to the next player
            currentPlayerIndex = (currentPlayerIndex + 1) % shuffledPlayers.length;
            if (currentPlayerIndex === 0) {
                turn++;
            }
        }
    }
    shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    calculateStartingArmies(numPlayers: number): number {
        if (numPlayers === 2) {
            return 40;
        } else if (numPlayers === 3) {
            return 35;
        } else if (numPlayers === 4) {
            return 30;
        } else if (numPlayers === 5) {
            return 25;
        } else {
            return 20;
        }
    }

    isGameOver(players: Player[]): boolean {
        return players.some(player => player.territories.length === 0);
    }

    // isValidAction(action: Action, state: GameState): boolean {
    //     // TODO: Implement validation logic
    //     return true;
    // }

    // applyAction(action: Action, state: GameState): void {
    //     action.apply(state);
    // }
}

export class GameState {
    players: Player[];
    territories: Territory[];
    turn: number;
    currentPlayer: Player;

    constructor(players: Player[], territories: Territory[], turn: number, currentPlayer: Player) {
        this.players = players;
        this.territories = territories;
        this.turn = turn;
        this.currentPlayer = currentPlayer;
    }

    getPlayerByName(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }

    getTerritoryByName(name: string): Territory | undefined {
        return this.territories.find(territory => territory.name === name);
    }

    getTerritoriesByPlayer(player: Player): Territory[] {
        return this.territories.filter(territory => territory.owner === player);
    }

    getAdjacentTerritories(territory: Territory): Territory[] {
        return this.territories.filter(t => t !== territory && t.continent === territory.continent);
    }
}