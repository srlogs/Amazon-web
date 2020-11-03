import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFile: File = null;
  imageData : any;
  constructor(private http : HttpClient) { }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.addEventListener('load', ()=> {
      console.log(reader.result);
      this.imageData = reader.result;
    })

    //console.log(reader);
    //localStorage.setItem('images', this.selectedFile.name);
  }

  ngOnInit(): void {
  }

}
