import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ClientNavbar, GoogleMapView } from "../components/components";
import { closeDrawer, openDrawer } from '../provider/provider';
import axios from "axios";
import { setCookie, removeCookie } from '../provider/provider';
import { useQuery } from '@tanstack/react-query';
import {useRouter} from "next/router";

const fetchData = async (cableUrl) => {
  return axios({
    url: cableUrl,
    method: "GET",
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

const HomePage = (props) => {
  const { apiKey, cookie, cableUrl, profileUrl, logOutUrl } = props;
  const drawer = useSelector((state) => state.drawer.isDrawerOpen);
  const [coordinates, setCoordinates] = useState(null);

  // create an instance of dispatch to pass to the footer
  const dispatch = useDispatch();
  const router = useRouter();

  // fetch the cable data with useQuery
  const { data } = useQuery(
    ["cable_data", cableUrl],
      () => fetchData(cableUrl),
    {
      keepPreviousData: true,
      enabled: !!cookie,
    }
  );

  const handleOpenDrawer = () => {
    if (drawer) {
      dispatch(closeDrawer(false));
    } else {
      dispatch(openDrawer(true));
    }
  }

  useEffect(() => {
    const handleIsCookie = () => {
      if (cookie) {
        dispatch(setCookie(true));
      } else {
        dispatch(removeCookie(false));
        // router.replace('/auth').then(() => console.log() );
      }
    }

    // get all the coordinate data
    const getAllCoordinates = () => {
      let coordinateData = [];
      if (data?.data) {
        data?.data.map((cable) => {
          coordinateData.push({
            lat: parseFloat(cable?.coord[0].lat),
            lng: parseFloat(cable?.coord[0].lng),
          });
        });
        setCoordinates(coordinateData);
      } else {
        console.log("data not in yet")
      }
    }
    handleIsCookie();
    getAllCoordinates();
  }, [cookie, data?.data, dispatch]);

  return (
    <React.Fragment>
      <ClientNavbar
          profileUrl={profileUrl}
          logOutUrl={logOutUrl}
          cookie={cookie}
          handleOpenDrawer={handleOpenDrawer}
      />
      <GoogleMapView
          mapApiKey={apiKey}
          cableData={data?.data}
          coordinates={coordinates}
      />
    </React.Fragment>
  )
}

// get serverside props (this returns the api key)
export const getServerSideProps = async ({ req }) => {
  const apiKey = process.env.APIKEY;
  const cableUrl = process.env.ALLCABLESURL;
  const profileUrl = process.env.PROFILEURL;
  const logOutUrl = process.env.LOGOUT_URL;
  let user = false;
  const cookie = req.cookies['access_token'];
  if (cookie !== undefined) {
    user = true;
  }

  return {
    props: {
      apiKey: apiKey,
      cookie: user,
      cableUrl: cableUrl,
      profileUrl: profileUrl,
      logOutUrl: logOutUrl,
    }
  }
}

export default HomePage;
