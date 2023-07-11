import TripSearch from "@/app/Components/TripSearch"
import QuickSearch from "@/app/Components/QuickSearch"
import RecommendedTrips from "./Components/RecommendedTrips"

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips/>
    </div>
  )
}
