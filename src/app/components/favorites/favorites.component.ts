import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteMemes: Meme[] = [];

  constructor(
    private memeService: MemeService
  ) { }

  ngOnInit(): void {

    this.loadFavorites();

  }

  loadFavorites(): void {

    this.memeService.getAllMemes().subscribe({

      next: (data: Meme[]) => {

        this.favoriteMemes = data.filter(m =>
          localStorage.getItem('favorite_' + m.id)
        );

      },

      error: err => {

        console.log(err);

      }

    });

  }

}