import FilesForm from '../../../components/Files/FilesForm';
import type { Trip, TripFile } from '../../../types';
import ContentCard from './ContentCard';

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function Documents({ trip, onUpdate }: Props) {
  const onChange = (documents: TripFile[]) => {
    onUpdate({ documents });
  };

  return (
    <ContentCard title="Documents">
      <FilesForm
        tripId={trip.id}
        defaultFiles={trip.documents}
        onChange={onChange}
        type="document"
        autoUpload
      />
    </ContentCard>
  );
}