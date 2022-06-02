import { clear } from "console";
import { IJoke } from "../../domain/IJoke";
import { AppState } from "../../state/AppState";

export class Home{

    constructor(private appState: AppState) {
        console.log('home');
        this.appState.clear();
        let listOfCategories = this.appState.getListOfCategories()
        if (listOfCategories.length > 0) {
            console.log(listOfCategories[0]);
            this.appState.bindType('.first', listOfCategories[0]);
            this.appState.bindType('.second', listOfCategories[1]);
            this.appState.bindType('.third', listOfCategories[2]);
        }
    }
}