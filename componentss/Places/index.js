import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import styles from "./index.module.scss";
import { debounce } from "lodash";

const loadData = {
  id: "google-map-script",
  googleMapsApiKey: "AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c",
  libraries: ["places"],
};
const Places = ({ setDetailsHandler, getLatLngs, lat, lang }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [selected, setSelected] = useState({
    lat: lat ?? 12.9715987,
    lng: lang ?? 77.5945627,
  });

  useEffect(() => {
    const newData = {
      lat: lat ?? 12.9715987,
      lng: lang ?? 77.5945627,
    };
    if (lat && lang) {
      setSelected({ ...selected, ...newData });
    }
  }, [lat, lang]);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c");
  }, []);
  // const { isLoaded } = useLoadScript(loadData);

  // if (!isLoaded) return <div>Loading...</div>;
  const center = {
    lat: selected?.lat || 20.94092,
    lng: selected?.lng || 84.803467,
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    const results = await getGeocode({ address });
    if (ready) {
      setDetailsHandler(results[0] || {});
    }
    const { lat, lng } = await getLatLng(results[0]);
    const newData = {
      lat: lat,
      lng: lng,
    };
    setSelected({ ...selected, ...newData });
    // getLatLngs(lat, lng);
    localStorage.setItem("latLng", JSON.stringify({ lat, lng }));
    clearSuggestions();
  };

  const onMapClick = async (id) => {
    try {
      const { placeId } = id;
      const place = await getGeocode({ placeId });
      const address = await place[0].formatted_address;
      setDetailsHandler(place[0]);
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);
      // getLatLngs(lat, lng);
      localStorage.setItem("latLng", JSON.stringify({ lat, lng }));
      // setSelected({ lat, lng });
      const newData = {
        lat: lat,
        lng: lng,
      };
      setSelected({ ...selected, ...newData });
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEndFunction = async (e) => {
    // try {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const check = await Geocode.fromLatLng(lat.toString(), lng.toString());
    const data = await check?.results;
    const place = await getGeocode({ placeId: data[0].place_id });
    const newData = {
      lat: lat,
      lng: lng,
    };
    setSelected({ ...selected, ...newData });
    localStorage.setItem("latLng", JSON.stringify({ lat, lng }));
    setDetailsHandler(place[0]);
    // } catch (err) {
    //   console.log("err");
    // }
  };
  return (
    <div
      className={styles["map"]}
      style={{ border: "10px solid #F1F1F1", backgroundColor: "#F1F1F1" }}
    >
      <div className="places-container">
        <Combobox onSelect={handleSelect} className={styles["combox-div"]}>
          <ComboboxInput
            style={{
              // border: '1px solid red',
              // position: 'absolute',
              zIndex: "900000",
              width: "100%",
              // margin: '70px 20px',
              padding: "5px 10px",
              // borderRadius: '5px',
              outline: "none",
              background: "#fff",
              // padding: '5px',
              border: "2px solid rgba(0, 0, 0, 0.06)",
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className={styles["combobox-input"]}
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

      <GoogleMap
        zoom={selected === null ? 4 : 15}
        center={selected}
        mapContainerClassName="map-container"
        onClick={onMapClick}
      >
        <MarkerF
          draggable={true}
          onDragEnd={(e) => onDragEndFunction(e)}
          position={selected}
        />
      </GoogleMap>
    </div>
  );
};

export default Places;
