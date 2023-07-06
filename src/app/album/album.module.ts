import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AlbumAddComponent } from './album-add/album-add.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumListComponent,
    AlbumEditComponent,
    AlbumAddComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'albums', component: AlbumListComponent },
      { path: 'albums/add', component: AlbumAddComponent },
      { path: 'albums/:id', component: AlbumDetailsComponent },
      { path: 'albums/:id/edit', component: AlbumEditComponent },
      
    ])
  ]
})
export class AlbumModule { }
