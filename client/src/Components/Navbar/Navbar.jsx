// import React, { useState, useEffect } from 'react';
// import logo from '../../Assets/logo.png';
// import styles from "./Navbar.module.css";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [username, setUsername] = useState(localStorage.getItem('fname'));
//   const [navbarBg, setNavbarBg] = useState('transparent');
//   const navigate = useNavigate();

//   // Function to update username when login state changes
//   const updateUserState = () => {
//     setUsername(localStorage.getItem('fname'));
//   };

//   // Effect to listen for storage changes (when login happens)
//   useEffect(() => {
//     window.addEventListener("storage", updateUserState);
//     return () => window.removeEventListener("storage", updateUserState);
//   }, []);

//   // Effect to change navbar background on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setNavbarBg('white');
//       } else {
//         setNavbarBg('transparent');
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     // Clear localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('userID');
//     localStorage.removeItem('fname');

//     // Update state to reflect logout
//     setUsername(null);

//     // Redirect to the login page
//     navigate('/login');
//   };

//   return (
//     <div className={styles.header} style={{ backgroundColor: navbarBg, transition: 'background-color 0.3s ease' }}>
//       {/* Logo */}
//       <Link to="/" className={styles.logo_link}>
//         <div className={styles.logo}>
//           <img src={logo} alt="Logo" width="100vw" />
//         </div>
//       </Link>

//       {/* Searchbar */}
//       <form className={`${styles.search} d-flex`}>
//         <input className={`${styles.searchBox} form-control me-2`} type="search" placeholder="Search" aria-label="Search" />
//         <button className={`${styles.searchBtn} btn btn-outline-success`} type="submit">
//           Search
//         </button>
//       </form>

//       {/* Navigation buttons */}
//       <div className={styles.menu}>
//         <Link to="/adopt" className={`${styles.menu_link} ${styles.regular_links}`}>
//           <div className={styles.menu_btn}>
//             <span>Adopt</span>
//           </div>
//         </Link>

//         <Link to="/about-us" className={`${styles.menu_link} ${styles.regular_links}`}>
//           <div className={styles.menu_btn}>
//             <span>About</span>
//           </div>
//         </Link>

//         <Link to="/care-tips" className={`${styles.menu_link} ${styles.regular_links}`}>
//           <div className={styles.menu_btn}>
//             <span>Care Tips</span>
//           </div>
//         </Link>

//         {/* Conditionally show "Sign up" or the logged-in user's name with logout */}
//         {username ? (
//           <>
//             <span className={`${styles.menu_link} ${styles.user_name}`}>
//               Hello, {username}
//             </span>
//             <button className={`${styles.menu_link} ${styles.logout_btn}`} onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/sign-up" className={`${styles.menu_link} ${styles.sign_up_link}`}>
//             <div className={styles.sign_up}>Sign up</div>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import logo from '../../Assets/logo.png';
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../store/auth'; // Import useAuth if you have authentication context

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('fname'));
  const [navbarBg, setNavbarBg] = useState('transparent');
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  // Function to update username when login state changes
  const updateUserState = () => {
    setUsername(localStorage.getItem('fname'));
  };

  // Effect to listen for storage changes (when login happens)
  useEffect(() => {
    window.addEventListener("storage", updateUserState);
    return () => window.removeEventListener("storage", updateUserState);
  }, []);

  // Effect to change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg('white');
      } else {
        setNavbarBg('transparent');
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('fname');

    setUsername(null);
    navigate('/login');
  };
  console.log(user)
  // Fetch user data and log it
  useEffect(() => {
    const storedUser = {
      fname: localStorage.getItem('fname'),
      userID: localStorage.getItem('userID'),
      token: localStorage.getItem('token'),
    };

    console.log("User from localStorage:", storedUser);
    console.log("User from auth context:", user);
  }, [user]);

  return (
    <div className={styles.header} style={{ backgroundColor: navbarBg, transition: 'background-color 0.3s ease' }}>
      <Link to="/" className={styles.logo_link}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" width="100vw" />
        </div>
      </Link>

      <form className={`${styles.search} d-flex`}>
        <input className={`${styles.searchBox} form-control me-2`} type="search" placeholder="Search" aria-label="Search" />
        <button className={`${styles.searchBtn} btn btn-outline-success`} type="submit">
          Search
        </button>
      </form>

      <div className={styles.menu}>
        <Link to="/adopt" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>Adopt</span></div>
        </Link>

        <Link to="/about-us" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>About</span></div>
        </Link>

        <Link to="/care-tips" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>Care Tips</span></div>
        </Link>

        {username ? (
          <>
            <span className={`${styles.menu_link} ${styles.user_name}`}>
              Hello, {username}
            </span>
            <button className={`${styles.menu_link} ${styles.logout_btn}`} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/sign-up" className={`${styles.menu_link} ${styles.sign_up_link}`}>
            <div className={styles.sign_up}>Sign up</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
