export interface Meme {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  playCount: number;
  likes: number;
  
  // Add this exact line right here:
  category?: { id: number, name: string }; 
}