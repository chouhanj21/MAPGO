import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState ,useContext} from "react";
// import { set } from 'mongoose';

import { UserContext } from "../App";

const Hostannounce = ({ addEvent }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const getUserPrivate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/host/private", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if(res.status===200){
        dispatch({type:"HOST", payload:"host"});

      }
      else if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/hostlogin");
    }
  };
  useEffect(() => {
    getUserPrivate();
  }, []);

  // Handling Inputs

  const [eventname, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [venue, setVenue] = useState("");



// SET LONGITUDE AND LATITUDE

function setlocation(venue){
  // console.log(venue);
  setVenue(venue);
    if(venue==="Hall 11"){
      setLongitude("80.22716752167393");
      setLatitude("26.505257661670083");
    }
    else if(venue==="Hall 10"){
      setLongitude("80.22714607609895");
      setLatitude("26.506198571959818");
    }
    else if(venue==="Mama Miyos"){
      setLongitude("80.22729626770666");
      setLatitude("26.50588173568197");
    }
    else if(venue==="Hall 9"){
      setLongitude("80.22716767893647");
      setLatitude("26.508157176826213");
    }
    else if(venue==="Hall 13"){
      setLongitude("80.2269746687615");
      setLatitude("26.508829239428522");
    }
    else if(venue==="Hall 7"){
      setLongitude("80.22885097511715");
      setLatitude("26.506477003119024");
    }
    else if(venue==="Hall 8"){
      setLongitude("80.22886275035405");
      setLatitude("26.504969626367405");
    }
    else if(venue==="OAT"){
      setLongitude("80.23002081140405");
      setLatitude("26.50518085232665");
    }
    else if(venue==="Pronite Ground"){
      setLongitude("80.22972123869563");
      setLatitude("26.504431958537065");
    }
    else if(venue==="E-Shop"){
      setLongitude("80.23113647728592");
      setLatitude("26.50445116100291");
    }
    else if(venue==="Health Center"){
      setLongitude("80.23362496239577");
      setLatitude("26.505142447635674");
    }
    else if(venue==="Football/Hockey Ground"){
      setLongitude("80.22985054119582");
      setLatitude("26.505564898530356");
    }
    else if(venue==="Hall 4"){
      setLongitude("80.23087920296865");
      setLatitude("26.507062666458303");
    }
    else if(venue==="Hall 3"){
      setLongitude("80.23055751934363");
      setLatitude("26.508406800537482");
    }
    else if(venue==="Hall 1"){
      setLongitude("80.23090064854365");
      setLatitude("26.509520499717496");
    }
    else if(venue==="Hall 5"){
      setLongitude("80.22897054679368");
      setLatitude("26.50967411255015");
    }
    else if(venue==="Hall 2"){
      setLongitude("80.23057896491864");
      setLatitude("26.510499778006057");
    }
    else if(venue==="Hall 12"){
      setLongitude("80.22821903228761");
      setLatitude("26.51151745051847");
    }
    else if(venue==="GH-1"){
      setLongitude("80.23306573223753");
      setLatitude("26.50786914879304");
    }
    else if(venue==="Hall 6"){
      setLongitude("80.23444098298651");
      setLatitude("26.504835209645716");
    }
    else if(venue==="Athletics Ground"){
      setLongitude("80.23289767580216");
      setLatitude("26.509328483387844");
    }
    else if(venue==="CCD"){
      setLongitude("80.23426403279852");
      setLatitude("26.51196387948289");
    }
    else if(venue==="PKK Library"){
      setLongitude("80.23392160220716");
      setLatitude("26.512127089638888");
    }
    else if(venue==="Lecture Hall-1"){
      setLongitude("80.23285927505331");
      setLatitude("26.511195828576298");
    }
    else if(venue==="Lecture Hall-18"){
      setLongitude("80.23402269749705");
      setLatitude("26.51076859803658");
    }
    else if(venue==="Lecture Hall-16"){
      setLongitude("80.23343830557832");
      setLatitude("26.510749396626686");
    }

 }










  const submit = async (e) => {

    
      setlocation();
   
    // console.log(latitude,longitude);


    e.preventDefault();
    if (
      !eventname ||
      !description ||
      !startTime ||
      !endTime ||
      !longitude ||
      !latitude
    ) {
      alert("Please fill all the fields");
    } else {

      const res = await fetch("http://localhost:5000/api/host/createevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          eventname: eventname,
          description: description,
          startTime: startTime,
          endTime: endTime,
          longitude: longitude,
          latitude: latitude,
        }),
      });

      if (res.status === 400) {
        window.alert("username taken, try another one");
        console.log("username taken");
      } else if (res.status === 200) {
        window.alert("created an event");
        console.log(
          eventname,
          description,
          startTime,
          endTime,
          longitude,
          latitude
        );
        navigate("/hosthome");
      } else if (res.status === 500) {
        console.log("error in searching db");
      } else {
        console.log("unknown err");
      }

      setTitle("");
      setDesc("");
      setStartTime("");
      setEndTime("");
      setLongitude("");
      setLatitude("");
      setVenue("");
    }
  };

  return (
    <>
      <div className="heading">ORGANIZER</div>
      <div className="addEvent my-3">
        <h3 className="title">Add an Event</h3>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              id="floatingName"
              placeholder="name"
              value={eventname}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingname">
              Event Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="desc"
              id="floatingdesc"
              placeholder="desc"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingdesc">
              Description
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              placeholder="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingTime">
              startTime
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              placeholder="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              autoComplete="off"
            />
            <label className="input" htmlFor="floatingTime">
              endTime
            </label>
          </div>
          <div className="form-floating mb-3">
          <select
              className="form-control"
              name="venue"
              value={venue}
              placeholder="venue"
              autoComplete="off"
              onChange={(e)=>setlocation(e.target.value)}
            >
              <option value="Hall 11">Hall 11</option>
              <option value="Hall 10">Hall 10</option>
              <option value="Mama Miyos">Mama Miyos</option>
              <option value="Hall 9">Hall 9</option>
              <option value="Hall 13">Hall 13</option>
              <option value="Hall 7">Hall 7</option>
              <option value="Hall 8">Hall 8</option>
              <option value="OAT">OAT</option>
              <option value="Pronite Ground">Pronite Ground</option>
              <option value="E-Shop">E-Shop</option>
              <option value="Health Center">Health Center</option>
              <option value="Football/Hockey Ground">Football/Hockey Ground</option>
              <option value="Hall 4">Hall 4</option>
              <option value="Hall 3">Hall 3</option>
              <option value="Hall 1">Hall 1</option>
              <option value="Hall 5">Hall 5</option>
              <option value="Hall 2">Hall 2</option>
              <option value="Hall 6">Hall 6</option>
              <option value="Hall 12">Hall 12</option>
              <option value="GH-1">GH-1</option>
              <option value="Athletics Ground">Athletics Ground</option>
              <option value="CCD">CCD</option>
              <option value="PKK Library">PKK Library</option>
              <option value="Lecture Hall-1">Lecture Hall-1</option>
              <option value="Lecture Hall-18">Lecture Hall-18</option>
              <option value="Lecture Hall-16">Lecture Hall-16</option>
            </select>

            <label className="input" htmlFor="floatingVenue">
              Venue
            </label>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          onClick={submit}
        >
          Create Event
        </button>
      </div>
    </>
  );
};

export default Hostannounce;