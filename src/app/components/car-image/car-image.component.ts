import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carImages:CarImage[]=[];
  currentImage:CarImage; 
  path = "https://localhost:44368/Uploads/Images/";
  constructor(private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.getCarImages()
  }

  getCarImages(){
    this.carImageService.getCarImages().subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getImagePath(image:string)
  {
    let newPath = this.path + image;
    return newPath; 
  }

}
