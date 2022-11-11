import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  carImages:CarImage[]=[];
  filterText="";
  imageUrl = "https://localhost:44368/Uploads/Images/"
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService:CarImageService,
    private toastrService:ToastrService,
    private garageService:GarageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['carId']) {
        this.getCarsByCar(params['carId']);
      } else if(params["brandId"] && params["colorId"]){
        this.getCarsByFilter(params["brandId"],params["colorId"])
        console.log("if")
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByCar(carId: number) {
    this.carService.getCarsByCar(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  addToGarage(car:Car){
    this.toastrService.success("Added to Garage.",car.description)
    this.garageService.addToGarage(car)
  }
  
  getCarImages(car:Car){
    this.imageService.getCarImagesByCarId(car.id).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getCarsByFilter(brandId:number,colorId:number){
    this.carService.getCarsByBrandColor(brandId,colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
      if(this.cars.length==0){
        this.toastrService.info("Arama sonucunuza ait araç bulunamamaktadır.","Arama sonucu")
      }
    })
  }
}
