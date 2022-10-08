import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_PATHS } from 'src/environments/environment';
import { Report } from '../models/report';

const CATEGORY_API_PATH = `${API_PATHS.base}${API_PATHS.codes}`;

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public reports$: BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>(
    []
  );
  constructor(private client: HttpClient) {}

  public getReports() {
    return this.client
      .get<Report[]>(CATEGORY_API_PATH)
      .subscribe((data: Report[]) => {
        this.reports$.next(data);
      });
  }

  public getReport(id: string | null) {
    return this.client.get<Report>(`${CATEGORY_API_PATH}/${id}`);
  }

  public postReport(report: Report) {
    return this.client
      .post(CATEGORY_API_PATH, {
        comment: report.comment,
        toReproduce: report.toReproduce,
        reproducibility: report.reproducibility,
      })
      .subscribe(() => {
        this.getReports();
      });
  }

  public updateReport(report: Report, id: string | null) {
    return this.client
      .put(`${CATEGORY_API_PATH}/${id}`, {
        comment: report.comment,
        toReproduce: report.toReproduce,
        reproducibility: report.reproducibility,
      })
      .subscribe(() => {
        this.getReports();
      });
  }

  public deleteReport(id: string | null) {
    return this.client.delete(`${CATEGORY_API_PATH}/${id}`);
  }
}
