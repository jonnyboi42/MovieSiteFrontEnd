// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const getRandomDate = () => {
//   const start = new Date(2015, 0, 1);
//   const end = new Date(2024, 11, 31);
//   const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//   return date.toDateString();
// };

// const Jumbo = () => {
//   return (
//     <div id="carouselExampleControls" className="carousel slide custom-jumbotron" data-bs-ride="carousel">
//       <div className="carousel-inner">
//         <div className="carousel-item active">
//           <img className="d-block w-100" src="src/assets/imgs/jumbo/spidermanjumbo.jpg" alt="Third slide" />
//           <div className="release-date">NOW PLAYING</div>
//           <div className="carousel-caption spiderman">
//             {/* <h5>SPIDERMAN 2</h5> */}
//             {/* <button>TICKETS</button> */}
//           </div>
//         </div>
//         <div className="carousel-item">
//           <img className="d-block w-100" src="src/assets/imgs/jumbo/prometheusjumbo.jpg" alt="Second slide" />
//           <div className="release-date">COMING SOON</div>
//           <div className="carousel-caption">
//             {/* <h5>PROMETHEUS</h5> */}
//             {/* <button>TICKETS</button> */}
//           </div>
//         </div>
//         <div className="carousel-item ">
//           <img className="d-block w-100" src="src/assets/imgs/jumbo/bladerunnerjumbo.jpg" alt="First slide" />
//           <div className="release-date">NOW PLAYING</div>
//           <div className="carousel-caption starwars">
//             {/* <h5>BLADE RUNNER 2049</h5> */}
//             {/* <button>TICKETS</button> */}
//           </div>
//         </div>

//       </div>
//       <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="sr-only"></span>
//       </a>
//       <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="sr-only"></span>
//       </a>
//     </div>
//   );
// };

// export default Jumbo;


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const getRandomDate = () => {
//   const start = new Date(2015, 0, 1);
//   const end = new Date(2024, 11, 31);
//   const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//   return date.toDateString();
// };

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const getRandomDate = () => {
  const start = new Date(2015, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toDateString();
};

const Jumbo = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide custom-jumbotron" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="public/assets/imgs/jumbo/spidermanjumbo.jpg" alt="Third slide" />
          <div className="release-date">NOW PLAYING</div>
          <div className="carousel-caption spiderman">
            {/* <h5>SPIDERMAN 2</h5> */}
            {/* <button>TICKETS</button> */}
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="public/assets/imgs/jumbo/prometheusjumbo.jpg" alt="Second slide" />
          <div className="release-date">COMING SOON</div>
          <div className="carousel-caption">
            {/* <h5>PROMETHEUS</h5> */}
            {/* <button>TICKETS</button> */}
          </div>
        </div>
        <div className="carousel-item ">
          <img className="d-block w-100" src="public/assets/imgs/jumbo/bladerunnerjumbo.jpg" alt="First slide" />
          <div className="release-date">NOW PLAYING</div>
          <div className="carousel-caption starwars">
            {/* <h5>BLADE RUNNER 2049</h5> */}
            {/* <button>TICKETS</button> */}
          </div>
        </div>

      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only"></span>
      </a>
    </div>
  );
};

export default Jumbo;






