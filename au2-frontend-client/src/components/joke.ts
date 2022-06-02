import { bindable } from "aurelia";
import { IJoke } from "../domain/IJoke";

export class Joke {

    @bindable public joke!: IJoke;
}