export type ExpenseCategory =
  | "Tickets"
  | "Food"
  | "Fun"
  | "Hotel"
  | "Shopping"
  | "Other";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
}

export interface Place {
  id: string;
  name: string;
  isChecked: boolean;
}

export interface TripFile {
  fileName: string;
  storagePath?: string | null;
  url?: string | null;
}

export interface DocumentToUpload extends TripFile {
  file?: File;
}

export interface PackingItem {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface PackingList {
  id: string;
  name: string;
  items: PackingItem[];
}

export interface Destination {
  id: string;
  name: string;
}

export interface PreviewImage {
  url?: string | null;
  templateImageId?: string;
  storagePath?: string;
}

export interface Trip {
  id: string;
  name: string;
  previewImage: PreviewImage | null;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  locationFrom: string;
  destinations: Destination[];
  places: Place[];
  expenses: Expense[];
  documents: TripFile[];
  packingLists: PackingList[];
  photos: TripFile[];
}
