import { AppState } from "../../state/AppState";

export class SecondCategory{

    constructor(private appState: AppState) {
        console.log('SecondCategory');
        this.appState.clear();
        if (this.appState.secondJokes.length === 0) {
            this.loadData();
        }
        this.appState.deleteIndex = 1;
    }

    loadData(): void{
        let category: string = this.appState.listOfCategories[1];
        if (category !== undefined) {
            for (let index = 0; index < 5; index++) {
                this.appState.loadJokes(1 , category)};
            }
    }
}