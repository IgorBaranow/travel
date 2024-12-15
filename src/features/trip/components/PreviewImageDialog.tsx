import { useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import AppDialog from "@features/ui/AppDialog";

import { TRIP_PREVIEW_IMAGES, type TripPreviewImage } from "../data";
import UploadFileButton from "./UploadFileButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
function PreviewImageDialog({ isOpen, onClose }: Props) {
  const [selectedPreviewImage, setSelectedPreviewImage] =
    useState<null | TripPreviewImage>(null);
  return (
    <AppDialog
      title="Select your preview image"
      primaryButtonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={function (): void {
        // TODO: Implement
        throw new Error("Function not implemented.");
      }}
    >
      <Grid container spacing={{ xs: 0.5, md: 1.5 }} columns={{ xs: 2, md: 3 }}>
        {TRIP_PREVIEW_IMAGES.map((image) => (
          <Grid item xs={1} key={image.id}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                border: 4,
                borderColor:
                  selectedPreviewImage?.id === image.id
                    ? "primary.main"
                    : "white",
                overflow: "hidden",
              }}
              onClick={() => setSelectedPreviewImage(image)}
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
export default PreviewImageDialog;
