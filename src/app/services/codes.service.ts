import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_PATHS } from 'src/environments/environment';
import { Code } from '../models/code';

const CODES_API_PATH = `${API_PATHS.base}${API_PATHS.codes}`;

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  public codes$: BehaviorSubject<Code[]> = new BehaviorSubject<Code[]>([]);
  constructor(private client: HttpClient) {}

  public getCodes() {
    return this.client.get<Code[]>(CODES_API_PATH).subscribe((data: Code[]) => {
      this.codes$.next(data);
    });
  }

  public getCode(id: string | null) {
    return this.client.get<Code>(`${CODES_API_PATH}/${id}`);
  }

  public postCode(code: Code) {
    return this.client
      .post(CODES_API_PATH, {
        name: code.name,
        description: code.description,
      })
      .subscribe(() => {
        this.getCodes();
      });
  }

  public updateCode(code: Code, id: string | null) {
    return this.client
      .put(`${CODES_API_PATH}/${id}`, {
        name: code.name,
        description: code.description,
      })
      .subscribe(() => {
        this.getCodes();
      });
  }

  public deleteCode(id: string | null) {
    return this.client.delete(`${CODES_API_PATH}/${id}`).subscribe(() => {
      this.getCodes();
    });
  }
}
