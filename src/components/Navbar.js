import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Logo from "./assets/Logo.png";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Navbar(loading) {

  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    setNavbarVisible(location.pathname !== '/');
  }, [location.pathname]);



  return (


    <>


      {navbarVisible && <>
        <div style={{ position: 'relative', zIndex: '7' }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 8px',
            fontSize: '17px',
            borderBottom: '2px solid orange'
            ,
            backgroundColor: '#34a853',
            color: 'white',
          }}>
            <div style={{ display: 'flex', columnGap: '8px' }}>

              <Link to={user ? "/dashboard" : "/"}>

                <img style={{ width: '90%', objectFit: 'cover', padding: '2px', marginLeft: '11px', filter: 'invert(10%) sepia(0%) saturate(70%) hue-rotate(145deg) brightness(1910%) contrast(100%)' }} src={Logo} alt="Logo" />

              </Link>
            


            </div>
            <ul style={styles.navLinks}>


              {user && (
                <>
                  <div style={{ display: 'flex', cursor: 'pointer', color: 'black' }}>
                    <li style={styles.navLink}>

                    </li>
                    <li style={styles.navLink}>

                    </li>
                    <li style={styles.navLink}>

                    </li>

                    <li style={styles.navLink}>

                    </li>

                  </div>

                </>
              )}
            </ul>

          </nav>


        </div>

      </>}</>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    backgroundColor: "#34a853",
    color: "white",
    padding: "15px",
    borderRadius: "35px",
    fontSize: "20px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer"
  },
  hero: {
    width: '740px'
  },

  logo: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex'
  },
  navLink: {
    marginLeft: '5px',
    marginRight: '35px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif'
  },
  content: {
    padding: '40px',
    paddingTop: '-10px',
    display: 'flex',
    borderBottom: '2px solid orange',
    textAlign: 'center',
    justifyContent: 'center',
    columnGap: '180px',
    alignItems: 'center'
  },
};

export default Navbar;