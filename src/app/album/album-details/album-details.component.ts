import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { IAlbum } from '../album';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy{

  album:IAlbum|undefined
  sub!:Subscription
  constructor(private albumService:AlbumService,private router:Router,private route:ActivatedRoute){

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAlbum(id);
    }
  }

  getAlbum(id:number):void{
    this.sub=this.albumService.getAlbum(id).subscribe({
      next: album =>{
        this.album=album
      }
    })
  }

  onBack(){
    this.router.navigate(['/albums'])
  }
  delete(id:number):void{
    this.albumService.detele(id).subscribe(response => {
        console.log('Deleted:', response);})
        this.router.navigate(['../albums'])
}
}
