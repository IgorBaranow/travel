import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PaymentsIcon from "@mui/icons-material/Payments";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import PreviewImage1 from "./assets/preview_1.png";
import PreviewImage2 from "./assets/preview_2.png";
import PreviewImage3 from "./assets/preview_3.png";
import PreviewImage4 from "./assets/preview_4.png";
import PreviewImage5 from "./assets/preview_5.png";
import { ExpenseCategory } from "./types";

export interface TripPreviewImage {
  id: string;
  src: string;
  alt: string;
}
export const TRIP_PREVIEW_IMAGES: TripPreviewImage[] = [
  {
    id: "PreviewImage1",
    src: PreviewImage1,
    alt: "Mountains and lake with sunset.",
  },
  {
    id: "PreviewImage2",
    src: PreviewImage2,
    alt: "Beautiful sunset in village.",
  },
  {
    id: "PreviewImage3",
    src: PreviewImage3,
    alt: "Big city view.",
  },
  {
    id: "PreviewImage4",
    src: PreviewImage4,
    alt: "People doing Yoga.",
  },
  {
    id: "PreviewImage5",
    src: PreviewImage5,
    alt: "Rock surrounded by palms on an island surrounded by the sea.",
  },
];

interface CategoryIconProps {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  backgroundColor: string;
  color: string;
}
export const EXPENSE_ICON_BY_CATEGORY: Record<
  ExpenseCategory,
  CategoryIconProps
> = {
  Tickets: {
    icon: LocalActivityIcon,
    backgroundColor: "rgba(165,189,158, 0.32)",
    color: "#729E65",
  },
  Food: {
    icon: RestaurantIcon,
    backgroundColor: "rgba(126,169,195, 0.17)",
    color: "#5486A6",
  },
  Fun: {
    icon: EmojiEmotionsIcon,
    backgroundColor: "rgba(255,201,153, 0.43)",
    color: "#E78835",
  },
  Hotel: {
    icon: HotelIcon,
    backgroundColor: "rgba(156,19,25, 0.23)",
    color: "#810403",
  },
  Shopping: {
    icon: ShoppingBagIcon,
    backgroundColor: "rgba(10,154,206, 0.21)",
    color: "#0A9ACE",
  },
  Other: {
    icon: PaymentsIcon,
    backgroundColor: "rgba(87,95,101, 0.28)",
    color: "#37434B",
  },
};

//Array to display all Icons at ones (list of icons)
interface ExpenseCategoryProps {
  id: number;
  category: ExpenseCategory;
}
export const EXPENSES_CATEGORIES: ExpenseCategoryProps[] = [
  {
    id: 1,
    category: "Tickets",
  },
  {
    id: 2,
    category: "Food",
  },
  {
    id: 3,
    category: "Fun",
  },
  {
    id: 4,
    category: "Hotel",
  },
  {
    id: 5,
    category: "Shopping",
  },
  {
    id: 6,
    category: "Other",
  },
];
