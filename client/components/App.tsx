import VendorList from './VendorList.jsx'
import './VendorProfile.css'
import EventList from './EventList.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <>
      <header className="header">
        <h1>Event Marketplace</h1>
      </header>
      <section className="main">
        <VendorList />{/* add your code here */}
        <EventList />
        </section>
    </>
    </QueryClientProvider>
  )
}

export default App
