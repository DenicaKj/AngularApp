import { Component } from '@angular/core';
import { IAlbum } from '../album';
import { Subscription } from 'rxjs';
import { AlbumService } from '../album.service';


@Component({
    selector: 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent {
    albums: IAlbum[] = []
    pageTitleAlbum: string = "Album List"
    errorMessage: string = ''
    sub!: Subscription
    pagination: number = 1;
    allAlbums = 0;
    filterTitle = '';

    constructor(private albumService: AlbumService) {
    }

    applyFilter() {
        this.fetchAlbums();
    }
    ngOnInit(): void {
        this.fetchAlbums()
    }
    renderPage(event: number) {
        this.pagination = event;
        this.fetchAlbums()
    }
    fetchAlbums() {
        this.sub = this.albumService.getAlbums(this.pagination, this.filterTitle).subscribe((res: IAlbum[]) => {
            if (res) {
                this.hideloader();
            }
            this.albums = res;
            this.allAlbums = res.length
        });
    }
    hideloader() {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe
    }

}
