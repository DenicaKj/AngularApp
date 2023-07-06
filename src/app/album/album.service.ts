import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAlbum } from "./album";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albumUrl = 'https://jsonplaceholder.typicode.com/photos'
  albums!: IAlbum[]
  constructor(private http: HttpClient) {
  }

  public getAlbum(id: number): Observable<IAlbum> {
    const url = `${this.albumUrl}/${id}`;
    return this.http.get<IAlbum>(url).pipe();
  }
  public getAlbums(page: number, title: string): Observable<IAlbum[]> {
    let params = new HttpParams().set('page', page.toString());
    if (title) {
      params = params.set('title', title);
    }
    return this.http.get<IAlbum[]>(this.albumUrl + '?page=' + page, { params })
      .pipe(catchError(this.handleError));
  }
  public update(album: IAlbum) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };

    return this.http.put<IAlbum>(`${this.albumUrl}/${album.id}`, album, options);

  }
  public detele(id: number) {
    let httpheaders = new HttpHeaders()
      .set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders
    };
    return this.http.delete<number>(this.albumUrl + "/" + id)

  }
  public createProduct(album: IAlbum): Observable<IAlbum> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    album.id = NaN
    return this.http.post<IAlbum>(this.albumUrl, album, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
