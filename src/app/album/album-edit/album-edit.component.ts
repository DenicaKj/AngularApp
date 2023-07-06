import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAlbum } from '../album';
import { NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})

export class AlbumEditComponent implements OnInit, OnDestroy {
  originalEditAlbum: IAlbum | undefined
  editAlbum: IAlbum | undefined
  albums!: IAlbum[]
  sub!: Subscription
  album: IAlbum | undefined

  constructor(private albumService: AlbumService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAlbum(id);
    }
  }

  getAlbum(id: number): void {
    this.sub = this.albumService.getAlbum(id).subscribe({
      next: album => {
        this.album = album
        this.editAlbum = album
      }
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe
  }
  onBack(){
    this.router.navigate(['/albums'])
  }

  onSubmit(form: NgForm) {
    if (this.editAlbum) {
      this.albumService.update(this.editAlbum).subscribe(response => {
        console.log('Updated:', response);
      })
      this.router.navigate(['/albums', this.editAlbum.id])
    }

  }
}
