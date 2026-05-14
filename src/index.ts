import {Connect4Renderer} from "./connect-4/connect4-renderer";

const canvas = document.getElementById("mainCanvas")! as HTMLCanvasElement;
const renderer = new Connect4Renderer(canvas);
renderer.render();
