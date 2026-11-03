export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  totalCopies?: number;
  createdAt?: string;
}