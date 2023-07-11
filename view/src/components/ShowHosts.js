import React, { useState, useEffect } from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import FontAwesomeIcon from "react-fontawesome";
import Accordion from "react-bootstrap/Accordion";
import $ from 'jquery';

const ShowHosts = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
    let k = document.getElementById("open");
    if (k.style.display === "none") k.style.display = "block";
    else k.style.display = "none";
  };

  
  const subscribe = (host) => {
    let baseURL = "http://localhost:5000/api/user/subscribe/";
    let url = baseURL + host.hostname;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unsubscribe = (host) => {
    let baseURL = "http://localhost:5000/api/user/unsubscribe/";
    let url = baseURL + host.hostname;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [hosts, setHosts] = useState([]);
  const [subHosts, setSubHosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/allhosts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHosts(data);
        return data;
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  let data;

  const getHosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/showhosts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      data = await res.json();
      setSubHosts(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHosts();
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(hosts);

    const resultsArray = hosts.filter(
      (host) =>
        host.hostname.includes(e.target.value) ||
        host.about.includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  return (
    // <main>{content}</main>
    <IconContext.Provider value={{ color: "#fff" }}>
      
      <div className="navbar1">
        <p className="searchtext">Search For More Hosts To Subscribe!</p>
        <Link to="#" className="menu-bars" id="open">
          <MdIcons.MdArrowForwardIos onClick={showSidebar} style={{color:"black"}}/>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" id="close" onClick={showSidebar}>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <header>
            <form className="search" onSubmit={handleSubmit}>
              <input
                className="search__input"
                type="text"
                id="search"
                placeholder="Search Hosts"
                onChange={handleSearchChange}
              />
              {/* <button className="search__button">
                <FontAwesomeIcon icon="fa-sharp fa-solid fa-magnifying-glass" />
              </button> */}
            </form>
          </header>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {searchResults.map((host, index) => {
                let searchhost=null;
                searchhost = subHosts.find((obj) => obj.hostname==host.hostname);
                console.log(searchhost);
              return (
                <>
                  {/* <div className="menubox">
                <h2>{host.hostname}</h2>
                <p>{host.about}</p>

                <button className="btn-success" id="btn" onClick={()=>{subscribe(host)}}>
                  Subscribe
                </button>


                </div> */}

                  <Accordion.Item eventKey={index} className="menubox" id="host">
                    <Accordion.Header>{host.hostname}</Accordion.Header>
                    <Accordion.Body>
                      <div className="about">ABOUT US</div>
                      <p className="desc">{host.about}</p>
                      {searchhost &&
                          <button
                            className="btn-exist"
                            id="btn"
                            onClick={() => {
                              unsubscribe(host);
                            }}
                          >
                            Subscribed
                          </button>

                        }
                      {!searchhost &&
                          <button
                            className="btn-success"
                            id="btn"
                            onClick={() => {
                              subscribe(host);
                            }}
                          >
                            Subscribe
                          </button>

                        }
                      
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
          </Accordion>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};
export default ShowHosts;
