import { useEffect, useState } from 'react';

import { getDownloadURL } from '@services/firebase';

import { TRIP_PREVIEW_IMAGES } from '../data';
import type { PreviewImage } from '../types';

export function usePreviewImageSrc(previewImage?: PreviewImage | null) {
  const [previewImageSrc, setPreviewImgSrc] = useState<string | null>();

  useEffect(() => {
    const fetchPreviewImage = async () => {
      const fetchedPreviewImageSrc = await getPreviewImageSrc(previewImage);
      setPreviewImgSrc(fetchedPreviewImageSrc);
    };

    fetchPreviewImage();
  }, [previewImage]);

  return previewImageSrc;
}

async function getPreviewImageSrc(previewImage?: PreviewImage | null) {
  let previewImageSrc = null;

  if (previewImage?.templateImageId) {
    previewImageSrc = previewImage?.templateImageId
      ? TRIP_PREVIEW_IMAGES.find(
          (image) => image.id === previewImage?.templateImageId,
        )?.src
      : null;
  } else if (previewImage?.storagePath) {
    previewImageSrc = await getDownloadURL(previewImage.storagePath);
  }

  return previewImageSrc;
}