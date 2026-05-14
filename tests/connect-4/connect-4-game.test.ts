import {Connect4Game} from "../../src/connect-4/core/connect-4-game";
import {ArrayConnect4Game} from "../../src/connect-4/core/arr-connect-4-game";


function testConnect4Contract(name: string, constructor: () => Connect4Game) {
    describe(name, () => {

        let game: Connect4Game = constructor();

        beforeEach(() => {
            game = constructor();
        });

        test("count turns", () => {
            expect(game.getTurnCount()).toBe(0);
            game.playMove(0);
            expect(game.getTurnCount()).toBe(1);
        });

        test("alternate turns", () => {
            expect(game.isRedsTurn()).toBe(true);
            game.playMove(0);
            expect(game.isRedsTurn()).toBe(false);
            game.playMove(0);
            expect(game.isRedsTurn()).toBe(true);
        });

        test("detects occupancy", () => {
            game.playMove(0);
            game.playMove(0);
            game.playMove(1);
            expect(game.isOccupied(0, 1)).toBe(true);
            expect(game.isOccupied(1, 0)).toBe(true);
            expect(game.isOccupied(0, 0)).toBe(true);
            expect(game.isOccupied(1, 1)).toBe(false);
        });

        test("throws for off board occupancy check", () => {
            expect(() => game.isOccupied(-1, 0)).toThrow(Error);
            expect(() => game.isOccupied(0, -1)).toThrow(Error);
            expect(() => game.isOccupied(7, 0)).toThrow(Error);
            expect(() => game.isOccupied(0, 8)).toThrow(Error);
        });

        test("detects occupancy", () => {
            game.playMove(0);
            game.playMove(0);
            game.playMove(1);
            expect(game.isOccupiedByRed(0, 1)).toBe(true);
            expect(game.isOccupiedByRed(1, 0)).toBe(false);
            expect(game.isOccupiedByRed(0, 0)).toBe(true);
            expect(game.isOccupiedByRed(1, 1)).toBe(false);
        });

        test("throws for off board red occupancy check", () => {
            expect(() => game.isOccupiedByRed(-1, 0)).toThrow(Error);
            expect(() => game.isOccupiedByRed(0, -1)).toThrow(Error);
            expect(() => game.isOccupiedByRed(7, 0)).toThrow(Error);
            expect(() => game.isOccupiedByRed(0, 8)).toThrow(Error);
        });

        test("detect illegal move for non existent column", () => {
            expect(game.isLegalMove(7)).toBe(false);
            expect(game.isLegalMove(-1)).toBe(false);
        });

        test("throws for move with column overflow", () => {
            for (let i = 0; i < 6; i++) game.playMove(0);
            expect(() => game.playMove(0)).toThrow(Error);
        });

        test("detects connect 4 (simple)", () => {
            for (let i = 0; i < 3; i++) {
                expect(game.playMove(i)).toBe(false);
                expect(game.playMove(0)).toBe(false);
            } expect(game.playMove(3)).toBe(true);
        });

        test("undo last moves", () => {
            for (let i = 0; i < 7; i++)
                game.playMove(i);
            for (let i = 6; i >= 0; i--) {
                game.undoMove(i);
                expect(game.getTurnCount()).toBe(i);
            } expect(game.isRedsTurn()).toBe(true);
        });

        test("throws for undo with empty column", () => {
            expect(() => game.undoMove(0)).toThrow(Error);
        });

        test("fills input buffer", () => {
            const buffer = new Float32Array(84);
            for (let i = 0; i < 7; i++) game.playMove(i);
            game.fillNeuralInput(buffer);

            let sum = 0;
            for (const value of buffer.values()) sum += value;
            expect(sum).toBe(7);
        });
    });
}

testConnect4Contract("ArrayConnect4Game", () => new ArrayConnect4Game());
