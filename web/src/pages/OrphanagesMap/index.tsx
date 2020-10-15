import React from "react"
import { FiArrowRight, FiPlus } from "react-icons/fi"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import { Link } from 'react-router-dom'

import Leaflet from 'leaflet'

import mapMarker from '../../images/map-marker.svg'
import './styles.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

const OrphanagesMap = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>Capital</span>
        </footer>
      </aside>

      <Map
        center={[-23.5314183,-46.4489193]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* <TileLayer url='https://a.title.openstreet.org/{z}/{x}/{y}.png' /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        <Marker 
          position={[-23.5314183,-46.4489193]}
          icon={mapIcon}
        >

          <Popup closeButton={false} minWidth={240} className='map-popup'>
            Lar das Meninas
            
            <Link to="/orphanage/1">
              <FiArrowRight size={32} color=''/>
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="" className="create-orphanage"><FiPlus size={32} color='white' /></Link>
    </div>
  )
}

export default OrphanagesMap