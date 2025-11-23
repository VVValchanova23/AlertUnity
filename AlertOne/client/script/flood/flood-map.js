import { initDisasterMap } from '../disasters/map.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFrYW5jaG5kciIsImEiOiJjbTVubWZ5ZjIwOTJkMnFzaWZyYnJ6Z2plIn0.MGmgQ6xd_3LJwGv3nWPgNA';

initDisasterMap('flood', MAPBOX_TOKEN, [25.4858, 42.7339], 6);