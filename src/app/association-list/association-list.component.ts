import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css']
})
export class AssociationListComponent implements OnInit {

  endpoint = 'https://www.dnt.no/api/v3/iprospect_pilot/foreninger';

  associationsResult: AssociationResult;
  associationTypes: Array<string>;

  constructor(private http: HttpClient) {
    this.associationTypes = [ 'alle', 'sentral', 'forening', 'turlag', 'turgruppe' ];
   }

  ngOnInit() {
    this.getAssociations(this.endpoint);
  }

  getNext() {
    this.getAssociations(this.associationsResult.next);
  }

  getPrev() {
    this.getAssociations(this.associationsResult.previous);
  }

  getAssociations(uri: string) {
    this.http.get<any>(uri).subscribe((data: AssociationResult) => {
      this.associationsResult = data;
    });
  }

  filter(associationType: string) {
    this.getAssociations(`${this.endpoint}?type=${associationType}`);
  }
}

export interface AssociationResult {
  results: Array<any>;
  count: number;
  next: string;
  previous: string;
}
