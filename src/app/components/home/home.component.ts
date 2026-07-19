import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { MemeService } from '../../services/meme.service';
import { Category } from '../../models/category';
import { Meme } from '../../models/meme';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];

  memes: Meme[] = [];

  allMemes: Meme[] = [];

  trendingMemes: Meme[] = [];

  selectedCategoryId: number = 0;

  currentRandomMeme: Meme | null = null;

  searchText: string = '';

  sortOption: string = 'default';

currentPage: number = 1;

pageSize: number = 6;

totalPages: number = 0;


loading = false;








pageNumbers: number[] = [];

  get sectionTitle(): string {
    if (this.selectedCategoryId == 0) {
      return 'Funny Sounds';
    }
    const cat = this.categories.find(c => c.id == this.selectedCategoryId);
    return cat ? `${cat.icon} ${cat.name} Memes` : 'Funny Sounds';
  }

  constructor(
    private categoryService: CategoryService,
    private memeService: MemeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      this.selectedCategoryId = categoryId ? +categoryId : 0;
      this.currentPage = 1;
      if (this.allMemes.length > 0) {
        this.filterMemes();
      }
    });

    this.loadCategories();

    this.loadMemes();

  }

  

  loadCategories() {

    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  loadMemes(): void {

  this.loading = true;

  this.memeService.getAllMemes().subscribe({

    next: (data: Meme[]) => {

      this.allMemes = data;

      this.filterMemes();

      this.loadTrending();

      this.loading = false;

    },

    error: (err) => {

      console.log(err);

      this.loading = false;

    }

  });

}

loadTrending(): void {

  this.trendingMemes = [...this.allMemes]

    .sort((a, b) =>

      (b.playCount + b.likes * 5)

      -

      (a.playCount + a.likes * 5)

    )

    .slice(0, 6);

}


  saveRecent(id: number): void {

  let recent: number[] =
    JSON.parse(localStorage.getItem('recentMemes') || '[]');

  recent = recent.filter(x => x != id);

  recent.unshift(id);

  if (recent.length > 10) {

    recent.pop();

  }

  localStorage.setItem(
    'recentMemes',
    JSON.stringify(recent)
  );

}

  filterCategory(categoryId: number): void {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryId: categoryId ? categoryId : null }
    });

  }

  
  filterMemes(): void {


    
  let filtered = [...this.allMemes];

  // Category Filter
  if (this.selectedCategoryId != 0) {

    filtered = filtered.filter(
      m => m.categoryId == this.selectedCategoryId
    );

  }

  // Search Filter
  if (this.searchText.trim() != '') {

    filtered = filtered.filter(
      m => m.title.toLowerCase().includes(
        this.searchText.toLowerCase()
      )
    );

  }

  // Sorting
  switch (this.sortOption) {

    case 'likes':

      filtered.sort((a, b) => b.likes - a.likes);

      break;

    case 'plays':

      filtered.sort((a, b) => b.playCount - a.playCount);

      break;

    case 'az':

      filtered.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      break;

    case 'za':

      filtered.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

      break;

    default:

      break;

  }

  this.totalPages = Math.ceil(filtered.length / this.pageSize);

this.pageNumbers = [];

for (let i = 1; i <= this.totalPages; i++) {

  this.pageNumbers.push(i);

}

const start = (this.currentPage - 1) * this.pageSize;

const end = start + this.pageSize;

this.memes = filtered.slice(start, end);

}

sortMemes(): void {

  this.filterMemes();

}

  like(meme: Meme): void {

  const key = "liked_" + meme.id;

  if (localStorage.getItem(key)) {

    this.memeService.unlikeMeme(meme.id).subscribe({

      next: () => {

        meme.likes--;

        localStorage.removeItem(key);

      },

      error: (err) => {

        console.log(err);

      }

    });

  } else {

    this.memeService.likeMeme(meme.id).subscribe({

      next: () => {

        meme.likes++;

        localStorage.setItem(key, "true");

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}

changePage(page: number): void {

  if (page < 1 || page > this.totalPages) {

    return;

  }

  this.currentPage = page;

  this.filterMemes();

}

nextPage(): void {

  if (this.currentPage < this.totalPages) {

    this.currentPage++;

    this.filterMemes();

  }

}

previousPage(): void {

  if (this.currentPage > 1) {

    this.currentPage--;

    this.filterMemes();

  }

}

isLiked(id: number): boolean {

  return localStorage.getItem("liked_" + id) !== null;

}

play(player: HTMLAudioElement, meme: Meme): void {

  this.currentRandomMeme = meme;

  player.play();

  this.saveRecent(meme.id);

  this.memeService.playMeme(meme.id).subscribe({

    next: () => {

      meme.playCount++;

      this.loadTrending();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

favorite(meme: Meme): void {

  const key = "favorite_" + meme.id;

  if (localStorage.getItem(key)) {

    localStorage.removeItem(key);

  } else {

    localStorage.setItem(key, "true");

  }

}

isFavorite(id: number): boolean {

  return localStorage.getItem("favorite_" + id) !== null;

}


surpriseMe(player: HTMLAudioElement): void {

  if (this.memes.length === 0) {

    return;

  }

  const randomIndex = Math.floor(
    Math.random() * this.memes.length
  );

  const meme = this.memes[randomIndex];

  this.currentRandomMeme = meme;

  player.src = 'https://localhost:7208' + meme.audioUrl;

  player.load();

  player.play();

  this.saveRecent(meme.id);

  this.memeService.playMeme(meme.id).subscribe({

    next: () => {

      meme.playCount++;

      this.loadTrending();

    },

    error: (err) => {

      console.log(err);

    }

  });

}




}