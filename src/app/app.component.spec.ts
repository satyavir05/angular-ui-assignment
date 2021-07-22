import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// we have used angular-material as UI Framework, and (select,table amd paginator) are the components/control are used.
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssignmentDataService } from './assignment-data.service';
import { of } from 'rxjs';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AssignmentDataService, useValue: userDataServiceStub }],
    }).compileComponents();
  }));

  // this is where we write unite test cases

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('test getOrganizations method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.organizationList.length).toBe(3);
  });

  it('test getProjects method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.projectList.length).toBe(2);
  });

  it('validate app note', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.note).toEqual('Find projects by selecting organization');
  });
});

// The purpose of the spec is to test the component, not the service, and real services can be trouble.
let userDataServiceStub: Partial<AssignmentDataService>;
userDataServiceStub = {
  getOrganizations: () => {
    return of(`"organization_id","name"\n"01f03f7d-8636-4e9c-9147-167cc4f0ab87",Cameron Networks\n"0145a1e0-de12-4138-b963-de4ab5f8ffdc",Keith Cabeling Systems\n"025efb1b-ab9d-4551-b56c-1732bb4daadc",Simon Electric Systems\n`);
  },

  getProjects: () => {
    return of(`"id","organization_id","user_id","name","created_at"\n3fb33e69-68c8-4624-beb7-661351882b98,025efb1b-ab9d-4551-b56c-1732bb4daadc,829e251a-7626-46f7-8dfb-072f9845e719,sub4,2019-04-25 23:43:47\na4a509a4-a2fa-4f1b-9d8c-9e2214349e9f,8e873fd5-c759-4f81-9432-38274b182384,6751cfc6-4ddc-4a58-8541-6422abacd02e,foo-site-1,2017-05-10 23:56:41\n`);
  }
};

