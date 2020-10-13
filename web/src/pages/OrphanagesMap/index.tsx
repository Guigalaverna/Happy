import React from "react"
import { FiPlus } from "react-icons/fi"
import { Map, TileLayer } from "react-leaflet"
import { Link } from 'react-router-dom'


import mapMarker from '../../images/map-marker.svg'
import './styles.css'

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
        <TileLayer url='https://a.title.openstreet.org/{z}/{x}/{y}.png' />
      </Map>

      <Link to="" className="create-orphanage"><FiPlus size={32} color='white' /></Link>
    </div>
  )
}

export default OrphanagesMap