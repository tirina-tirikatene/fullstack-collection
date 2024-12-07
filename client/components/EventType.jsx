import './EventType.css'

const EventType = ({ event }) => {
  return ( 
  <div className="event-type">
    <h2>{event.name}</h2>
    <p>Category: {event.category}</p>
    </div> 
    ); 
  }; 
  
  export default EventType;