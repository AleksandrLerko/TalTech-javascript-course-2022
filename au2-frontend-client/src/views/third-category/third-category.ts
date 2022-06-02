import { AppState } from "../../state/AppState";

export class ThirdCategory{

    constructor(private appState: AppState) {
        console.log('ThirdCategory');
        this.appState.clear();
        if (this.appState.thirdJokes.length === 0) {
            this.loadData();
        }
        this.appState.deleteIndex = 2;
    }

    loadData(): void{
        let category: string = this.appState.listOfCategories[2];
        if (category !== undefined) {
            for (let index = 0; index < 5; index++) {
                this.appState.loadJokes(2 , category)};
            }
    }
}