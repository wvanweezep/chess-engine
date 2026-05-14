/**
 * ## Connect4 Game
 * Represents an instance of the Connect4 game.
 */
export class Connect4Game {

    // Width of every Connect4 board.
    public static readonly BOARD_WIDTH: number = 7;
    // Height of every Connect4 board.
    public static readonly BOARD_HEIGHT: number = 6;
    // Number of slots of every Connect4 board.
    public static readonly BOARD_SIZE: number = Connect4Game.BOARD_WIDTH * Connect4Game.BOARD_HEIGHT;

    // Array representing the current Connect4 board state.
    private readonly board: Uint8Array;
    // Array indicating the current height of all columns.
    private readonly columnHeights: number[];

    // Number of moves played.
    private turnCount: number = 0;
    // State of whose turn is next.
    private redsTurn: boolean = true;

    /**
     * Creates a new Connect4 game in the starting position (empty board) starting
     * with red's turn.
     */
    public constructor() {
        this.board = new Uint8Array(2 * Connect4Game.BOARD_SIZE);
        this.columnHeights = new Array<number>(Connect4Game.BOARD_WIDTH).fill(0);
    }

    /**
     * Retrieves the Connect4 board stored as a flat array.
     *
     * @returns An array representing the current Connect4 board state.
     *
     * @remarks
     * The array has a size of `2 *
     * BOARD_SIZE` where the first half of slots represent yellow's occupancy on the board and the
     * second half of slots represent red's occupancy on the board.
     */
    public getBoard(): Uint8Array {
        return this.board;
    }

    /**
     * Retrieves the current turn count of the Connect4 game.
     *
     * @returns The number of moves played.
     */
    public getTurnCount(): number {
        return this.turnCount;
    }

    /**
     * Checks if red plays the next turn in the current Connect4 game.
     *
     * @returns True if it is red's turn.
     */
    public isRedsTurn(): boolean {
        return this.redsTurn;
    }

    /**
     * Checks the legality of playing a piece at a given column.
     *
     * @param column Index of the column to check the legality of a move.
     * @returns True if the move will not overflow the column.
     */
    public isLegalMove(column: number): boolean {
        return this.columnHeights[column] < Connect4Game.BOARD_HEIGHT;
    }

    /**
     * Plays a piece in the given column as the player whose turn it is.
     *
     * @param column Index of the column to play the move.
     * @returns True if the move resulted in winning the game.
     *
     * @throws Error Throws if the move overflows the column.
     */
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

    /**
     * Checks whether the previous move at the given index resulted in a game win.
     *
     * @param index Index in the board array of the previous move.
     * @returns True if the previous move resulted in winning the game.
     */
    private isWinningMove(index: number): boolean {
        // TODO: Implement this method efficiently
        return false;
    }

    /**
     * Reverts the last move played in the given column.
     *
     * @param column Index of the column to revert the move.
     */
    public undoMove(column: number): void {
        if (this.columnHeights[column] <= 0)
            throw new Error(`Cannot remove piece from column ${column}:\n${this.toString()}`);

        this.redsTurn = !this.redsTurn;
        this.columnHeights[column]--;
        this.turnCount--;

        const index = column + this.columnHeights[column] * Connect4Game.BOARD_WIDTH
            + (this.redsTurn ? Connect4Game.BOARD_SIZE : 0);
        this.board[index] = 0;
    }

    /**
     * Fills a nn input buffer with the current board state.
     *
     * @param target Buffer to fill with the current board state.
     */
    public fillNeuralInput(target: Float32Array): void {
        const currentOffset = this.redsTurn ? Connect4Game.BOARD_SIZE : 0;
        const opponentOffset = this.redsTurn ? 0 : Connect4Game.BOARD_SIZE;
        for (let i = 0; i < Connect4Game.BOARD_SIZE; i++) {
            target[i] = this.board[currentOffset + i];
            target[Connect4Game.BOARD_SIZE + i] = this.board[opponentOffset + i];
        }
    }

    /**
     * Converts the board to its string representation.
     *
     * @returns String representation of the current board state.
     */
    public toString(): string {
        let sb = "";
        for (let row = Connect4Game.BOARD_HEIGHT - 1; row >= 0; row--) {
            sb += "|  ";
            for (let column = 0; column < Connect4Game.BOARD_WIDTH; column++) {
                const iYellow = row * Connect4Game.BOARD_WIDTH + column;
                const iRed = iYellow + Connect4Game.BOARD_SIZE;
                if (this.board[iYellow]) sb += "@  ";
                else sb += this.board[iRed] ? "#  " : "-  ";
            } sb += "|\n";
        } return sb;
    }
}
