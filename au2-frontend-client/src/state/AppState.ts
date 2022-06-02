import { IHttpClient } from "aurelia";
import { IDict } from "../domain/IDict";
import { IJoke } from "../domain/IJoke";

export class AppState{

    public deleteIndex = -1;

    public listOfCategories: string[] = [];

    public firstJokes: IJoke[] = [];
    public secondJokes: IJoke[] = [];
    public thirdJokes: IJoke[] = [];

    public jokesContainer: IDict[] = [
    {
        value: []
    }
    ,{
        value: []
    }
    ,{
        value: []
    }];

    constructor(@IHttpClient private http: IHttpClient) {
        console.log('App state');
        this.loadCategories();
    }

    loadCategories(): void{
        this.http.get('https://api.chucknorris.io/jokes/categories').then(
            (res) => {
                return res;
            }
        ).then(
            (json) => {
                return json.json()
            }
        ).then(
            (res) => {
                let usedIndexes: number[] = [];
                for (let i = 0; i < res.length; i++) {
                    let index: number = this.mathRandom(usedIndexes, res.length);
                    if (!usedIndexes.includes(index) && this.listOfCategories.length !== 3) {
                        usedIndexes.push(index);
                        this.bindCategories(i, res[index]);
                    }
                }
            }
        )
    }

    loadJokes(index: number, name: string): void{
        console.log(name)
        this.http.get('https://api.chucknorris.io/jokes/random?category=' + name).then(
            (res) => {
                return res;
            }
        ).then(
            (res) => {
                return res.json();
            }
        ).then(
            (resJson) => {
                switch (index) {
                    case 0:
                        this.firstJokes.push(resJson);
                        console.log(this.firstJokes);
                        break;
                    case 1:
                        this.secondJokes.push(resJson);
                        break;
                    case 2:
                        this.thirdJokes.push(resJson);
                        break;
                }
            }
        );
    }

    mathRandom(usedIndexes: number[], arrayLength: number): number{
        let index: number = Math.floor(Math.random() * arrayLength);
        if (!usedIndexes.includes(index)) return index;
        return this.mathRandom(usedIndexes, arrayLength);
    }

    bindCategories(index: number, data: string){
        console.log(index + ' ' + data);
        switch (index) {
            case 0:
                this.bindType('.firstHeader', data);
                this.listOfCategories.push(data);
                //this.bindType('.first', data);
                break;
            case 1:
                this.bindType('.secondHeader', data);
                this.listOfCategories.push(data);
                //this.bindType('.second', data);
                break;

            case 2:
                this.bindType('.thirdHeader', data);
                this.listOfCategories.push(data);
                //this.bindType('.third', data);
                break;
        
        }

        //console.log(this.listOfCategories)

        for (let i = 0; i < 5; i++) {
            this.loadJokes(index, data)
        }

    }

    bindType(classId: string, data: string): void{
        //console.log(classId);
        let elem: HTMLDivElement | null = document.querySelector(classId);
        console.log(elem);
        if (elem) {elem.innerText = data[0].toUpperCase() + data.slice(1)}
    }

    getListOfCategories(): string[]{
        return this.listOfCategories;
    }

    addToJokesContainer(list: IJoke[], index: number): void {
        for (const elem of list) {
            if (!this.contains(this.jokesContainer[index].value, elem)) {
                this.jokesContainer[index].value.push(elem);
            }
        }
    }

    contains(list: IJoke[], element: IJoke): boolean {
        for (const item of list) {
            if (item.id === element.id) {
                return true;
            }
        }
        return false;
    }

    getCategory(index: number): string{
        return this.listOfCategories[index];
    }

    clear(): void{
        if (this.deleteIndex < 0) return;
        switch (this.deleteIndex) {
            case 0:
                this.addToJokesContainer(this.firstJokes, this.deleteIndex);
                this.firstJokes = [];
                break;
            case 1:
                this.addToJokesContainer(this.secondJokes, this.deleteIndex);
                this.secondJokes = [];
                break;
            case 2:
                this.addToJokesContainer(this.thirdJokes, this.deleteIndex);
                this.thirdJokes = [];
                break;
            
            default:
                break;
        }
    }
}