import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from 'react-router-dom';
import { Accordion, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { setCart } from "../../redux/cartSlice"; // Import the setCart action

const PurchaseTickets = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  // Accessing the necessary data from the Redux store
  const movieLocation = useSelector((state) => state.movie.selectedLocation);
  const movieName = useSelector((state) => state.movie.selectedMovie.name);
  const movieTicketPrice = useSelector((state) => state.movie.selectedMovie.ticketPrice);
  const movieShowTime = useSelector((state) => state.movie.selectedMovie.showTime);
  const movieID = useSelector((state) => state.movie.selectedMovie.id);
  const movieRunTime = useSelector((state) => state.movie.selectedMovie.runtime);
  const movieCategory = useSelector((state) => state.movie.category);

  // Component-specific state
  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [taxRate] = useState(0.08);
  const [movieImg, setMovieImg] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);

  useEffect(() => {
    const fetchMovieImg = async () => {
      try {
        let url;
        if (movieCategory === "Coming Soon") {
          if (movieLocation.toLowerCase() === "roundrock") {
          url = `https://moviesitebackend.onrender.com/comingsoon/${selectedLocation.toLowerCase()}/movie/${movieID}`;

          } else if (movieLocation.toLowerCase() === "mueller") {
            url = `https://moviesitebackend.onrender.com/comingsoon/${selectedLocation.toLowerCase()}/movie/${movieID}`

          }
        } else {
          url = `https://moviesitebackend.onrender.com/api/${movieLocation.toLowerCase()}/movie/${movieID}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMovieImg(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
  
    if (movieID && movieLocation) {
      fetchMovieImg();
    }
  }, [movieID, movieLocation, movieCategory]);
  

  useEffect(() => {
    const subtotal = ticketCount * movieTicketPrice;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
    setTotalPrice(total);
  }, [ticketCount, movieTicketPrice, taxRate]);

  const handleIncrease = () => setTicketCount((prevCount) => prevCount + 1);
  const handleDecrease = () => setTicketCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

  // Handle the purchase of tickets
  const handlePurchaseTicket = (e) => {
    e.preventDefault();

    if (ticketCount === 0) {
      alert("Please select at least one ticket before purchasing.");
      return;
    }

    // Dispatch the action to update the cart with movie, tickets, location, and price
    dispatch(setCart({
      movie: movieName,
      tickets: ticketCount,
      location: movieLocation,
      price: totalPrice
    }));
    
    // Optionally, you can display a confirmation message or redirect
    alert("Tickets successfully added to the cart!");
    navigate('/checkout')
  };

  const handleVoucherApply = async () => {
    if (!voucherCode.trim()) {
      alert("Please enter a voucher code.");
      return;
    }
  
    try {
      const response = await fetch("https://moviesitebackend.onrender.com/api/vouchers/checkVoucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voucherCode }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const discount = parseFloat(data.discount);
        console.log(discount);
  
        if (!isNaN(discount) && discount > 0) {
          setTotalPrice((prevPrice) => {
            const newPrice = prevPrice - discount;
            return newPrice >= 0 ? newPrice : 0; // Prevent negative prices
          });
          setVoucherApplied(true);
        } else {
          alert("Invalid discount value.");
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error applying voucher:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <Container fluid className="purchase-tickets-container">
      <Row>
        <Col lg={12} md={12}>
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Text className="card-text-with-bg">
                {movieImg?.src?.[1] && (
                  <div
                    className="card-image-blur"
                    style={{ backgroundImage: `url(${movieImg.src[1]})` }}
                  ></div>
                )}
                <div className="card-overlay"></div>
                <span className="card-text-content">
                  <strong>
                    <span className="bolded-title">{movieName}</span>
                  </strong>
                  <br />
                  <strong className="bolded">At:</strong>{" "}
                  <span className="info">Atlas Cinema {movieLocation}</span>
                  <br />
                  <strong className="bolded">Showtime:</strong>{" "}
                  <span className="info">{movieShowTime}</span>
                  <br />
                  <strong className="bolded">Runtime:</strong>{" "}
                  <span className="info">{movieRunTime}</span>
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
          <div className="ticket-controls">
            <Button className="ticket-controls-button" onClick={handleDecrease}>
              -
            </Button>
            <span>Adult Ticket x {ticketCount}</span>
            <Button className="ticket-controls-button" onClick={handleIncrease}>
              +
            </Button>
            <p>
              <strong>TOTAL PRICE: </strong> ${totalPrice.toFixed(2)}
            </p>
          </div>

          <Accordion className="mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>USE A VOUCHER CODE</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group controlId="voucherCode">
                    <Form.Control
                      type="text"
                      placeholder="Enter your voucher code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="mt-2 voucher-button"
                    onClick={handleVoucherApply}
                    disabled={voucherApplied}
                  >
                    Apply Voucher
                  </Button>
                  {voucherApplied && (
                    <p className="text-success mt-2">Voucher successfully applied!</p>
                  )}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          
          <Button className="purchase-ticket-button" onClick={handlePurchaseTicket}>
            Purchase Tickets
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseTickets;
