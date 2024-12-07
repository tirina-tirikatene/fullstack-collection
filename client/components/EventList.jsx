import { useQuery } from '@tanstack/react-query';
import EventType from './EventType';
import { fetchEvents } from '../apis/api';

const EventList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        data.map(event => (
          <EventType key={event.id} event={event} />
        ))
      ) : (
        <div>No events found</div>
      )}
    </div>
  );
};

export default EventList;
