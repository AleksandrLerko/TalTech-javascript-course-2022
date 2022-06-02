import { route } from 'aurelia';
import { AppState } from './state/AppState';

@route({
  routes: [
    {
      id: 'home',
      path: ['','/home'],
      component: import('./views/home/home'),
      title: 'Home page',
    },
    {
      id: 'firstCategory',
      path: ['/firstCategory'],
      component: import('./views/first-category/first-category'),
      title: 'First catagory',
    },
    {
      id: 'secondCategory',
      path: '/secondCategory',
      component: import('./views/second-category/second-category'),
      title: 'Second category',
    },
    {
      id: 'thirdCategory',
      path: '/thirdCategory',
      component: import('./views/third-category/third-category'),
      title: 'Third category',
    }
  ]
})

export class MyApp {

  constructor(private appState: AppState) {
    //this.appState.loadAvailableCategoriesAwait();
    console.log('MyApp');
  }
}
