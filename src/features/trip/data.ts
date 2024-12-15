import PreviewImage1 from "./assets/preview_1.png";
import PreviewImage2 from "./assets/preview_2.png";
import PreviewImage3 from "./assets/preview_3.png";
import PreviewImage4 from "./assets/preview_4.png";
import PreviewImage5 from "./assets/preview_5.png";

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
