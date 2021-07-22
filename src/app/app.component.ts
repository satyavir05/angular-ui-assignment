import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AssignmentDataService } from './assignment-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Organization, Project } from './Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  note = 'Find projects by selecting organization';
  projectList: Project[] = [];
  organizationList: Organization[] = [];
  selectedOrganization: string;
  pageSizeOptions = [5, 10, 20];

  dataSource = new MatTableDataSource<Project>();
  displayedColumns: string[] = ['id', 'organization_id', 'user_id', 'name', 'created_at']; // list of columns we need to display in the UI
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: AssignmentDataService) { } // dependencies are injected here

  ngOnInit(): void {
    this.getOrganizations();
    this.getProjects();
  }

  ngAfterViewInit(): void { // once the ui is rendered initialize paginator
    this.dataSource.paginator = this.paginator;
  }

  // loads all projects from csv using service (to get the data)
  private getProjects(): void {
    this.dataService.getProjects().subscribe((data: any) => {
      this.projectList = this.helperMethodToProcessCSV(data) as Project[];
      this.dataSource.data = this.projectList;
    });
  }

  // this method will initialize the project list, will load all the organizations.
  private getOrganizations(): void {
    this.dataService.getOrganizations().subscribe((data: any) => {
      this.organizationList = this.helperMethodToProcessCSV(data) as Organization[];
    });
  }

  // on organization selection filter out the projects and reset the paginator
  public onOrganizationSelection(): void {
    const filteredProjects = this.projectList.filter(project => project.organization_id === this.selectedOrganization);
    this.paginator.pageIndex = 0;
    this.dataSource.data = filteredProjects;
  }

  // common method to process csv files and return list of Project | Organization.,
  private helperMethodToProcessCSV(data): Array<Project | Organization> {
    const dataList: Array<Project | Organization> = [];
    const csvToRowArray = data.split('\n');
    const header = csvToRowArray[0].split(','); // 0th row is header
    // iterate through each row starting from 1 and based on the header form the object with header as properties
    for (let index = 1; index < csvToRowArray.length - 1; index++) {
      const row = csvToRowArray[index].split(',');
      const obj: any = {};
      header.forEach((head, headIndex) => {
        const cleanHeader = head.replaceAll('"', ''); // clean extra characters
        obj[cleanHeader] = row[headIndex].replaceAll('"', '');
      });
      dataList.push(obj);
    }
    return dataList;
  }

}
