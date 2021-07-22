import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentDataService {
  pathToAssignmentFolder = '../assets/dataFiles';
  header = new HttpHeaders().set('responseType', 'text');
  constructor(private http: HttpClient) {

  }

  // loads projects from the csv residing in assets folder
  getProjects(): Observable<any> {
    return this.http.get(`${this.pathToAssignmentFolder}/projects.csv`, { responseType: 'text' });
  }

  // load organizations
  getOrganizations(): Observable<any> {
    return this.http.get(`${this.pathToAssignmentFolder}/organizations.csv`, { responseType: 'text' });
  }
}
