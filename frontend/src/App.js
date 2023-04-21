import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import LogState from './context/LogState';
import Signup from './components/Signup';
import AddVehicle from './components/AddVehicle';
import About from './components/About';
import BookingScreen from './components/BookingScreen';
import VehicleDetails from './components/VehicleDetails';
import MyProfile from './components/MyProfile';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AllBookings from './components/AllBookings';
import AllUser from './components/AllUser';
import AllVehicles from './components/AllVehicles';


function App() {

  return (
    <Router>
      <LogState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/addVehicle" element={<AddVehicle />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/me" element={<MyProfile />} />
          <Route exact path="/bookings" element={<AllBookings />} />
          <Route exact path="/users" element={<AllUser />} />
          <Route exact path="/vehicles" element={<AllVehicles />} />
          <Route exact path="/booking/:vehicleId/:fromDate/:toDate" element={<BookingScreen />} />
          <Route exact path="/details/:vehicleId/:fromDate/:toDate" element={<VehicleDetails />} />
        </Routes>
      </LogState>
    </Router>
  );
}

export default App;
