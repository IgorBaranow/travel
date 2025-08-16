import { type SubmitHandler } from "react-hook-form";

import PackingListsForm from "@features/trip/components/Files/PackingListsForm";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { Trip } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setPackingLists,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  packingLists: Trip["packingLists"];
}

export default function PackingLists() {
  const { packingLists, onSubmit } = usePackingLists();

  return (
    <PackingListsForm
      defaultPackingLists={packingLists}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination />}
    />
  );
}

function usePackingLists() {
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPackingLists(data.packingLists));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    packingLists: trip.packingLists,
  };
}
