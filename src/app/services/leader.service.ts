import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      // Simulate server latency with 3 second delay
      setTimeout(() => resolve(LEADERS), 3000);
    });
  }

  getLeaderById(id: number): Promise<Leader> {
    return new Promise(resolve => {
      // Simulate server latency with 3 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 3000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      // Simulate server latency with 3 second delay
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 3000);
    });
  }
}
