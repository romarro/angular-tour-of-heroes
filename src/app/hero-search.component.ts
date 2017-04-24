import { Component, OnInit } from '@angular/core';
import { HeroSearchService } from "./hero-search.service";

//Ovservable class extension
import 'rxjs/add/observable/of';

//Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Hero } from "./hero";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls:['./hero-search.component.css'],
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
    heroes:Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private heroSearchService:HeroSearchService,
        private router:Router) { }
    search(term:string):void{
        this.searchTerms.next(term);
    }

    ngOnInit():void {
        this.heroes = this.searchTerms
            .debounceTime(300)          //wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()    //ignore is is the same as the previous one
            .switchMap(term => term?this.heroSearchService.search(term):Observable.of<Hero[]>([]))
            .catch(error =>{
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
     } 

     gotoDetail(hero:Hero):void{
         let link = ['/detail',hero.id];
         this.router.navigate(link);
     }   
}