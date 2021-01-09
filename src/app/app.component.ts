import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public ticketInput: string = "0005586569";
  public ticketObject: string;
  public cpfInput: string;
  private API_URL = 'localhost:3000/';
  public message: string = "";
  public object: string = "";

  constructor(private http: HttpClient) { }

  getTicket() {
    console.log("Pesquisando por Ticket => " + this.ticketInput);

    this.http.get('http://localhost:3000/getTicket/' + this.ticketInput).subscribe((result: any) => {
      console.log(result);
      this.object = JSON.stringify(result[0], undefined, 4);
      this.http.get('http://localhost:3000/checkTicket/' + JSON.stringify(result)).subscribe((result2: any) => {
        this.ticketObject = JSON.stringify(result[0]);
        console.log(result2);
        this.message = result2;
      }, (error2) => {
        this.ticketObject = null;
        console.log(error2);
        this.message = error2.message;
      });
    }, (error) => {
      this.ticketObject = null;
      console.log(error);
      this.message = error.message;
    });

  }

  getCPF() {
    console.log("Validando ticket para aluno => " + this.cpfInput);
    this.message = null;
    this.object = null;

    this.http.get('http://localhost:3000/validateCPF/' + this.cpfInput + "/" + this.ticketObject).subscribe((result: any) => {
      console.log(result);
      this.message = result.message;

      if (result.choosen) {
        this.object = result.choosen;
      }

    }, (error) => {
      console.log(error);
      this.message = error.message;
    });
  }

  showLiberations() {

    var date = new Date();
    var month = date.getUTCMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var str = month + "/" + day + "/" + year;

    console.log(str);

  }

}
