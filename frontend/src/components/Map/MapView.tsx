import {
    APIProvider,
    Map,
    useMap,
    AdvancedMarker,
    MapCameraChangedEvent,
    Pin,
    AdvancedMarkerAnchorPoint
  } from '@vis.gl/react-google-maps';
import EventMarker from '../EventMarker/EventMarker';
import { useEffect, useState } from 'react';

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function MapView({handleClick, latitude, longitude, events}){
    console.log(latitude)

    return (
        <div className='w-full h-full'>
            <APIProvider apiKey={"AIzaSyBHnC6z-IBbA_K0xhIRsrSOKcXPEkugvGs"} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: parseFloat(localStorage.getItem('latitude')||'0'), lng: parseFloat(localStorage.getItem('longitude')||'0')} }
                    onCameraChanged={ (ev) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }
                    mapId={"144ecb3701b3ac31"}
                    onClick={handleClick}>
                    {events.map((event)=>{
                        return <EventMarker key={event.id} timestamp={parseISOString(event.timestamp)} position={{lat:event.latitude, lng:event.longitude}} title={event.title} description={event.description}/>
                    })}
                        
                </Map>
            </APIProvider>  
        </div>
        
    )
}

export default MapView