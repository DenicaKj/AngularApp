import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAlbum } from '../album';

@Component({
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css']
})
export class AlbumAddComponent {
  albums!:IAlbum[]
  sub!:Subscription
  album: IAlbum = {id:0,albumId:0,title:'',url:'',thumbnailUrl:''}
  constructor(private albumService:AlbumService,private router:Router){

  }

onSubmit(form:NgForm){
    if(this.album){
      this.albumService.createProduct(this.album).subscribe(response => {
        console.log('Created:', response);
      })
      
    }
      this.router.navigate(['/albums'])
}
onBack(){
  this.router.navigate(['/albums'])
}
}
