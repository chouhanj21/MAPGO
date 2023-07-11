import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import { UserContext } from "../App";

const HostHome = () => {
  const { state, dispatch } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

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

      if(res.status===200){
        dispatch({type:"HOST", payload:"host"});

      }
      else if (!res.status === 200) {
        // dispatch({type:"HOST", payload:"host"});
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

  let data;

  const getEvent = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/host/showevents", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      data = await res.json();
      setEvents(data);
      // if(res.status===200){
      //   dispatch({type:"HOST", payload:"host"});

      // }
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // dispatch({type:"HOST", payload:"host"});
    getEvent();
  }, []);

  return (
    <>
    <div className="heading">OUR EVENTS</div>
    <div className="eventbox">

    {events.map((elem) => {
        return (
          <div className="col-md-3">
            <div className=" p-3 text-center rounded box contentbox">
              <img
                className="img-responsive rounded-circle dp"
                src="https://i.imgur.com/uppKNuF.jpg"
                width="80"
                />

              <h6 className="mt-3 name">{elem.hostname}</h6>
              <h5 className="mt-3 name">{elem.eventname}</h5>

              <i className=" ">From:{"  "}{elem.startTime.slice(0, 10)}</i>
              <i className=" ">{"  "}{elem.startTime.slice(11, 16)}</i>
              <br/>
              <i className=" ">Till:{"  "}{elem.endTime.slice(0, 10)}</i>
              <i className=" ">{"  "}{elem.endTime.slice(11, 16)}</i>
            <br></br><br></br>
              <OverlayTrigger trigger="hover" placement="right" overlay={
                <Popover id="popover-basic">
                
                <Popover.Body>
                  {elem.description}
                </Popover.Body>
                </Popover>
              }>
    <Button style={{background:"green"}} variant="success">Know More</Button>
  </OverlayTrigger>
              <div className="mt-4"></div>
            </div>
          </div>
        );
      })}
    </div>

    </>
  );
};
export default HostHome;