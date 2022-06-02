import { AppState } from "../../state/AppState";

export class FirstCategory {

    constructor(private appState: AppState) {
        console.log('FirstCategory');
        this.appState.clear();
        if (this.appState.firstJokes.length === 0) {
            this.loadData();
        }
        this.appState.deleteIndex = 0;
    }


    loadData(): void{
        let category: string = this.appState.listOfCategories[0];
        if (category !== undefined) {
            for (let index = 0; index < 5; index++) {
                this.appState.loadJokes(0 , category)
            };
        }
    }
}
