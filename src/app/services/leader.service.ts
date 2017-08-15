import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return Observable.of(LEADERS).delay(2000);
  }

  getLeaderById(id: number): Observable<Leader> {
    let leader = LEADERS.filter((leader) => (leader.id === id))[0];
    return Observable.of(leader).delay(3000);
  }

  getFeaturedLeader(): Observable<Leader> {
    let leader = LEADERS.filter((leader) => (leader.featured))[0];
    return Observable.of(leader).delay(4000);
  }
}
