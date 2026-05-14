
export abstract class Connect4Game {

    // Width of every Connect4 board.
    public static readonly BOARD_WIDTH: number = 7;
    // Height of every Connect4 board.
    public static readonly BOARD_HEIGHT: number = 6;
    // Number of slots of every Connect4 board.
    public static readonly BOARD_SIZE: number = Connect4Game.BOARD_WIDTH * Connect4Game.BOARD_HEIGHT;
    // Board directions to check for connect 4;
    protected static readonly DIRECTIONS: ReadonlyArray<readonly [number, number]> = [[1, 0], [0, 1], [1, 1], [1, -1]];

    // Number of moves played.
    protected turnCount: number = 0;
    // State of whose turn is next.
    protected redsTurn: boolean = true;

    /**
     * Retrieves the current turn count of the Connect4 game.
     *
     * @returns The number of moves played.
     */
    abstract getTurnCount(): number;

    /**
     * Checks if red plays the next turn in the current Connect4 game.
     *
     * @returns True if it is red's turn.
     */
    abstract isRedsTurn(): boolean;

    /**
     * Checks if a piece occupies a position in the game.
     *
     * @param row Index of the row to check for occupancy.
     * @param column Index of the column to check for occupancy.
     * @returns True if a piece occupies the given position.
     */
    abstract isOccupied(row: number, column: number): boolean;

    /**
     * Checks if a red piece occupies a position in the game.
     *
     * @param row Index of the row to check for red's occupancy.
     * @param column Index of the column to check for red's occupancy.
     * @returns True if a red piece occupies the given position.
     */
    abstract isOccupiedByRed(row: number, column: number): boolean;

    /**
     * Checks the legality of playing a piece at a given column.
     *
     * @param column Index of the column to check the legality of a move.
     * @returns True if the move will not overflow the column.
     */
    abstract isLegalMove(column: number): boolean;

    /**
     * Plays a piece in the given column as the player whose turn it is.
     *
     * @param column Index of the column to play the move.
     * @returns True if the move resulted in winning the game.
     *
     * @throws Error Throws if the move overflows the column.
     */
    abstract playMove(column: number): boolean;

    /**
     * Reverts the last move played in the given column.
     *
     * @param column Index of the column to revert the move.
     *
     * @throws Error Throws if the column is already empty.
     */
    abstract undoMove(column: number): void;

    /**
     * Fills a nn input buffer with the current board state.
     *
     * @param target Buffer to fill with the current board state.
     */
    abstract fillNeuralInput(target: Float32Array): void;

    /**
     * Converts the board to its string representation.
     *
     * @returns String representation of the current board state.
     */
    abstract toString(): string;
}

