/**
 * Interface for the book.
 */
export interface Book {
  readonly id?: string;
  readonly title: string;
  readonly authors: string[];
  readonly publicationYear?: number | string;
  readonly rating?: number | string;
  readonly ISBN?: string;
}
