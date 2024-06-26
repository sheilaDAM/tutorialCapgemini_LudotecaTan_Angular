import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../model/Game';
//import { GAME_DATA } from '../model/mock-games';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrlGame = 'http://localhost:8080/game'; // URL del backend


  constructor(private http: HttpClient) { }

  getGames(title?: String, categoryId?: number): Observable<Game[]> {
    //return of(GAME_DATA);
    return this.http.get<Game[]>(this.composeFindUrl(title, categoryId));
  }

  saveGame(game: Game): Observable<void> {
    //return of(null);
    if (game.id != null) {
      this.apiUrlGame += '/' + game.id;
    }

    return this.http.put<void>(this.apiUrlGame, game);
  }

  private composeFindUrl(title?: String, categoryId?: number): string {
    let params = '';

    if (title != null) {
      params += 'title=' + title;
    }

    if (categoryId != null) {
      if (params != '') params += "&";
      params += "idCategory=" + categoryId;
    }

    //let url = 'http://localhost:8080/game'

    if (params == '') return this.apiUrlGame;
    else return this.apiUrlGame + '?' + params;
  }
}
