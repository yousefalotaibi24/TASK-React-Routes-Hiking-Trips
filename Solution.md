## Hiking Trips - Routes

## Routes

1. Install `react-router` and `react-router-dom` to your react app.

```javascript
npm install react-router react-router-dom
```

2. In `index.js` import `BrowserRouter` from `react-router-dom` and wrap `App` with `BrowserRouter`.

```javascript
import { BrowserRouter } from 'react-router-dom';
```

```javascript
<BrowserRouter>
  <App />
</BrowserRouter>
```

3. Import `Route` and `Routes` from `react-router`.

```javascript
import { Routes, Route } from 'react-router';
```

4. In `App.js` Wrap each component with `Route` and add its `path` except the `Nav`.

```javascript
function App() {
  return (
    <div id="page-top">
      <Nav />
      <Route path="/" element={<Home />} />
      <Route path="/trips" element={<TripsList />} />
      <Route path="/detail" element={<TripDetail />} />
    </div>
  );
}
```

5. Wrap all your routes in `Routes`.

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/trips" element={<TripsList />} />
  <Route path="/details" element={<TripDetail />} />
</Routes>
```

6. Reorganise your routes so the longest paths comes first.

```javascript
<Routes>
  <Route path="/details" element={<TripDetail />} />
  <Route path="/trips" element={<TripsList />} />
  <Route path="/" element={<Home />} />
</Routes>
```

## Navbar links

1. In `Nav.js` import `Link` from `react-router-dom`.

```javascript
import { Link } from 'react-router-dom';
```

2. Replace `<a>` tags with `<Link>` tags from react router dom and replace `href` with `to` so that `Home` shows you the `Home.js` component and `Trips` takes you to `TripsList` component.

```javascript
<a class="nav-link py-3 px-0 px-lg-3 rounded" href="#">
  Home
</a>
```

To:

```javascript
<Link class="nav-link py-3 px-0 px-lg-3 rounded" to="/">
  Home
</Link>
```

And:

```javascript
<a class="nav-link py-3 px-0 px-lg-3 rounded" href="#">
  Trips
</a>
```

To:

```javascript
<Link class="nav-link py-3 px-0 px-lg-3 rounded" to="/trips">
  Trips
</Link>
```

## Trip Details

1. In `TripItem.js` import `<Link>` again and wrap your whole `tripItem` with it so it takes you to `tripDetail` component.

```javascript
import { Link } from 'react-router-dom';

function TripItem({ trip }) {
  return (
      <div class="col-md-6 col-lg-4 mb-5">
      <Link to="/details">
      ...
      </Link>
      </div>
  )
export default TripItem;
```

2. in `app.js` details route `/details`, add a route param called `tripId`.

```javascript
<Route path="/details/:tripId" element={<TripDetail />} />
```

3. Back to `TripItem.js` change the link to the `tripDetail` page to include the `tripId`.

```javascript
      <Link to={`/details/${trip.id}`}>
```

4. In `TripDetail.js` import `useParams` from `react-router-dom`.

```javascript
import { useParams } from 'react-router-dom';
```

5. Extract the `tripId` coming from the url and store it in a variable called `tripId`.

```javascript
const tripId = useParams().tripId;
```

6. Find the correct trip from the trips data file.

```javascript
const trip = tripsData.find((trip) => trip.id.toString() === tripId);
```

7. Import `Navigate` from `react-router-dom` and if the trip isn't found redirect the user to the home page.

```javascript
import { useParams, Navigate } from 'react-router-dom';
```

```javascript
const trip = tripsData.find((trip) => trip.id.toString() === tripId);
if (!trip) {
  return <Navigate to="/" />;
}
```

8. Switch from using ids to using slugs.

In `App.js`:

```javascript
<Route path="/details/:tripSlug" element={<TripDetail />} />
```

In `TripItem.js`:

```javascript
      <Link to={`/details/${trip.slug}`}>
```

In `TripDetail.js`:

```javascript
const tripSlug = useParams().tripSlug;
const trip = tripsData.find((trip) => trip.slug === tripSlug);
```

## Challenge

You have 3 buttons: easy, moderate and hard. when a button is clicked, filter the trips according to difficulty by changing the url, for example http://www.localhost:8000/trips?easy

1. In `TripsList.js` wrap your buttons with a `Link` tag.

```javascript
          <Link to="/trip/easy">
            <button className="btn btn-primary btn-xl">Easy</button>
          </Link>
          <Link to="/trips/moderate">
            <button className="btn btn-primary btn-xl">Moderate</button>
          </Link>
          <Link to="/trips/hard">
            <button className="btn btn-primary btn-xl">Hard</button>
          </Link>
```

2. In `App.js` change the `/trips` route and add a 2 nested routes, one with the `difficulty` param and one without so it becomes optional.

```javascript
<Route path="/trips" element={<TripsList />}>
  <Route path=":difficulty" element={<TripsList />} />
  <Route path="" element={<TripsList />} />
</Route>
```

3. In TripsList.js extract your new param.

```javascript
const difficulty = useParams().difficulty;
```

4. Now filter your list to contain the difficulty selected.

```javascript
const trips = tripsData
  .filter(
    (trip) =>
      trip.name.toLowerCase().includes(query.toLowerCase()) &&
      trip.difficulty.includes(difficulty)
  )
  .map((trip) => <TripItem trip={trip} />);
```

5. But what if the user didn't choose any difficulty? set the difficulty to an empty string.

```javascript
if (!difficulty) {
  difficulty = '';
}
```
