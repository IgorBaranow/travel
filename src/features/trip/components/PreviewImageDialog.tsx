import { useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import AppDialog from "@features/ui/AppDialog";

import { TRIP_PREVIEW_IMAGES } from "../data";
import type { Trip } from "../types";
import UploadFileButton from "./UploadFileButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip["previewImage"]) => void;
}
export default function PreviewImageDialog({ isOpen, onClose, onSave }: Props) {
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<
    null | Trip["previewImage"]
  >(null);

  const onSaveClick = () => onSave(selectedPreviewImage);

  return (
    <AppDialog
      title="Select your preview image"
      primaryButtonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={onSaveClick}
    >
      <Grid container spacing={{ xs: 0.5, md: 1.5 }} columns={{ xs: 2, md: 3 }}>
        {TRIP_PREVIEW_IMAGES.map((image) => (
          <Grid item xs={1} key={image.id}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                border: 4,
                borderColor:
                  selectedPreviewImage?.templateImageId === image.id
                    ? "primary.main"
                    : "white",
                overflow: "hidden",
              }}
              onClick={() =>
                setSelectedPreviewImage({ templateImageId: image.id })
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ width: "100%" }}
              />
            </ButtonBase>
          </Grid>
        ))}
        <Grid xs={1} item>
          <UploadFileButton
            mainText="Upload preview photo"
            subText="PNG or PDF (max. 3MB)"
            sx={{ border: 4, borderColor: "white" }}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
