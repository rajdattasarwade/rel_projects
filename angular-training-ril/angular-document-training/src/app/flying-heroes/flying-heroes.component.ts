import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flying-heroes',
  templateUrl: './flying-heroes.component.html',
  styleUrls: ['./flying-heroes.component.css']
})
export class FlyingHeroesComponent implements OnInit {
  heroes: any[] = [];
  canFly = true;

  constructor() { this.reset(); }

  addHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    const hero = {name, canFly: this.canFly};
    this.heroes.push(hero);
  }

  reset() { this.heroes = []; }

  ngOnInit() {
  }

}
