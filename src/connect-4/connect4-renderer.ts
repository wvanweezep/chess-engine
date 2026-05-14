import {Connect4Game} from "./core/connect-4-game";
import {ArrayConnect4Game} from "./core/arr-connect-4-game";

export class Connect4Renderer {

    private readonly context: CanvasRenderingContext2D;
    public game: Connect4Game;
    private wonGame = false;

    public readonly transform: { x: number, y: number, size: number, padding: number };

    public constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to load canvas context");
        this.context = ctx;
        this.game = new ArrayConnect4Game();
        this.transform = { x: 100, y: 50, size: 50, padding: 3 };

        canvas.addEventListener("pointerdown", this.onClick.bind(this));
    }

    private onClick(e: PointerEvent): void {
        if (this.wonGame) {
            this.game = new ArrayConnect4Game();
            this.wonGame = false;
            this.render();
            return;
        }

        const localX = e.clientX - this.transform.x;
        const column = Math.floor(localX / (this.transform.size + this.transform.padding));
        if (column < 0 || column >= Connect4Game.BOARD_WIDTH) return;

        this.wonGame = this.game.playMove(column) || (this.game.getTurnCount() === 42);
        this.render();
    }

    public render() {
        this.context.fillStyle = "rgb(26 26 26)";
        this.context.fillRect(0, 0, 1400, 800);

        this.context.fillStyle = "white";
        this.context.fillText(`Turn: ${this.game.getTurnCount()}`, this.transform.x, this.transform.y - 10);
        for (let row = 0; row < Connect4Game.BOARD_HEIGHT; row++) {
            for (let column = 0; column < Connect4Game.BOARD_WIDTH; column++) {
                if (this.game.isOccupied(row, column))
                    this.context.fillStyle = this.game.isOccupiedByRed(row, column)
                        ? "rgb(255 0 0)" : "rgb(255 225 52)";
                else this.context.fillStyle = "rgb(47 47 47)";

                const x = this.transform.x + column * (this.transform.size + this.transform.padding);
                const y = this.transform.y + (Connect4Game.BOARD_HEIGHT - row - 1)
                    * (this.transform.size + this.transform.padding);

                const radius = this.transform.size / 2;
                const centerX = x + radius;
                const centerY = y + radius;
                this.context.beginPath();
                this.context.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.context.fill();
            }
        }
    }
}