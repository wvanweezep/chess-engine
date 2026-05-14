import {Connect4Game} from "./connect-4-game";

/**
 * ## Array Connect4 Game
 * Represents an instance of the Connect4 game implemented using a flat array.
 */
export class ArrayConnect4Game extends Connect4Game {

    // Array representing the current Connect4 board state.
    private readonly board: Uint8Array;
    // Array indicating the current height of all columns.
    private readonly columnHeights: number[];

    /**
     * Creates a new Connect4 game in the starting position (empty board) starting
     * with red's turn.
     */
    public constructor() {
        super();
        this.board = new Uint8Array(2 * Connect4Game.BOARD_SIZE);
        this.columnHeights = new Array<number>(Connect4Game.BOARD_WIDTH).fill(0);
    }

    /**
     * Retrieves the Connect4 board stored as a flat array.
     *
     * @returns An array representing the current Connect4 board state.
     *
     * @remarks
     * The array has a size of `2 * BOARD_SIZE` where the first half of slots
     * represent yellow's occupancy on the board and the second half of slots
     * represent red's occupancy on the board.
     */
    public getBoard(): Uint8Array {
        return this.board;
    }

    /**
     * Checks whether the previous move at the given index resulted in a game win.
     *
     * @param index Index in the board array of the previous move.
     * @returns True if the previous move resulted in winning the game.
     */
    private isWinningMove(index: number): boolean {
        const board = this.board;
        const localIndex = index % Connect4Game.BOARD_SIZE;
        const row = Math.floor(localIndex / Connect4Game.BOARD_WIDTH);
        const col = localIndex % Connect4Game.BOARD_WIDTH;

        for (const [dx, dy] of Connect4Game.DIRECTIONS) {
            let count = 1;
            for (const dir of [-1, 1]) {
                let x = col + dx * dir;
                let y = row + dy * dir;

                while (x >= 0 && x < Connect4Game.BOARD_WIDTH && y >= 0 && y < Connect4Game.BOARD_HEIGHT) {
                    const i = x + y * Connect4Game.BOARD_WIDTH + (index >= Connect4Game.BOARD_SIZE
                        ? Connect4Game.BOARD_SIZE : 0);
                    if (!board[i]) break;

                    count++;
                    if (count >= 4)
                        return true;

                    x += dx * dir;
                    y += dy * dir;
                }
            }
        } return false;
    }

    public getTurnCount(): number {
        return this.turnCount;
    }

    public isRedsTurn(): boolean {
        return this.redsTurn;
    }

    public isOccupied(row: number, column: number): boolean {
        if (row < 0 || row >= Connect4Game.BOARD_HEIGHT || column < 0 || column >= Connect4Game.BOARD_WIDTH)
            throw new Error(`Position not on the board: (${row}, ${column})`);
        const index = column + row * Connect4Game.BOARD_WIDTH;
        return (this.board[index] + this.board[index + 42]) > 0;
    }

    public isOccupiedByRed(row: number, column: number): boolean {
        if (row < 0 || row >= Connect4Game.BOARD_HEIGHT || column < 0 || column >= Connect4Game.BOARD_WIDTH)
            throw new Error(`Position not on the board: (${row}, ${column})`);
        return this.board[column + row * Connect4Game.BOARD_WIDTH + 42] > 0;
    }

    public isLegalMove(column: number): boolean {
        return column >= 0 && column < Connect4Game.BOARD_WIDTH
            && this.columnHeights[column] < Connect4Game.BOARD_HEIGHT;
    }

    public playMove(column: number): boolean {
        if (!this.isLegalMove(column))
            throw new Error(`Move exceeds board height for column ${column}:\n${this.toString()}`);

        const index = column + this.columnHeights[column] * Connect4Game.BOARD_WIDTH
            + (this.redsTurn ? Connect4Game.BOARD_SIZE : 0);
        this.board[index] = 1;

        this.columnHeights[column]++;
        this.redsTurn = !this.redsTurn;
        this.turnCount++;

        return this.isWinningMove(index);
    }

    public undoMove(column: number): void {
        if (column < 0 || column >= Connect4Game.BOARD_WIDTH || this.columnHeights[column] <= 0)
            throw new Error(`Cannot remove piece from column ${column}:\n${this.toString()}`);

        this.redsTurn = !this.redsTurn;
        this.columnHeights[column]--;
        this.turnCount--;

        const index = column + this.columnHeights[column] * Connect4Game.BOARD_WIDTH
            + (this.redsTurn ? Connect4Game.BOARD_SIZE : 0);
        this.board[index] = 0;
    }


    public fillNeuralInput(target: Float32Array): void {
        const board = this.board;
        const currentOffset = this.redsTurn ? Connect4Game.BOARD_SIZE : 0;
        const opponentOffset = this.redsTurn ? 0 : Connect4Game.BOARD_SIZE;
        for (let i = 0; i < Connect4Game.BOARD_SIZE; i++) {
            target[i] = board[currentOffset + i];
            target[Connect4Game.BOARD_SIZE + i] = board[opponentOffset + i];
        }
    }

    public toString(): string {
        let sb = "";
        for (let row = ArrayConnect4Game.BOARD_HEIGHT - 1; row >= 0; row--) {
            sb += "|  ";
            for (let column = 0; column < ArrayConnect4Game.BOARD_WIDTH; column++) {
                const iYellow = row * ArrayConnect4Game.BOARD_WIDTH + column;
                const iRed = iYellow + ArrayConnect4Game.BOARD_SIZE;
                if (this.board[iYellow]) sb += "@  ";
                else sb += this.board[iRed] ? "#  " : "-  ";
            } sb += "|\n";
        } return sb;
    }
}