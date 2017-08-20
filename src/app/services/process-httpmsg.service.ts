import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcessHttpMsgService {

  constructor() { }

  public extractData(res: Response) {
    const body = res.json();

    return body  || { };
  }

}
