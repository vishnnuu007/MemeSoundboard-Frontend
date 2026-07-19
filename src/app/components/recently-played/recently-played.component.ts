import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.css']
})
export class RecentlyPlayedComponent implements OnInit {

  recentMemes: Meme[] = [];

  constructor(
    private memeService: MemeService
  ) { }

  ngOnInit(): void {

    this.loadRecent();

  }

  loadRecent(): void {

    const ids: number[] =
      JSON.parse(localStorage.getItem('recentMemes') || '[]');

    this.memeService.getAllMemes().subscribe({

      next: (data: Meme[]) => {

        this.recentMemes = ids
          .map(id => data.find(m => m.id === id))
          .filter((m): m is Meme => !!m);

      },

      error: err => {

        console.log(err);

      }

    });

  }

}