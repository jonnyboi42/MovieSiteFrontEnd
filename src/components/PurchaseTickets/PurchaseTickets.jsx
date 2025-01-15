import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Accordion, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PurchaseTickets = () => {
  // Redux state
  const movieLocation = useSelector((state) => state.movie.selectedLocation);
  const movieName = useSelector((state) => state.movie.selectedMovie.name);
  const movieTicketPrice = useSelector((state) => state.movie.selectedMovie.ticketPrice);
  const movieShowTime = useSelector((state) => state.movie.selectedMovie.showTime);
  const movieID = useSelector((state) => state.movie.selectedMovie.id);
  const movieRunTime = useSelector((state) => state.movie.selectedMovie.runtime);

  // Component state
  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [taxRate] = useState(0.08);
  const [movieImg, setMovieImg] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);



  // Fetch movie image
  useEffect(() => {
    const fetchMovieImg = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/${movieLocation.toLowerCase()}/movie/${movieID}`
        );
        const data = await response.json();
        setMovieImg(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (movieID && movieLocation) {
      fetchMovieImg();
    }
  }, [movieID, movieLocation]);

  // Update total price
  useEffect(() => {
    const subtotal = ticketCount * movieTicketPrice;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;
    setTotalPrice(total);
  }, [ticketCount, movieTicketPrice, taxRate]);

  const handleIncrease = () => setTicketCount((prevCount) => prevCount + 1);
  const handleDecrease = () =>
    setTicketCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

  const handleVoucherApply = () => {
    if (voucherCode.trim() === "DISCOUNT10" && !voucherApplied) {
      setTotalPrice((prevPrice) => prevPrice * 0.9);
      setVoucherApplied(true);
    } else {
      alert("Invalid or already applied voucher code.");
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

          {/* Voucher Section */}
          <Accordion className="mt-3 ">
            <Accordion.Item eventKey="0">
              <Accordion.Header>USE A VOUCHER CODE</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group controlId="voucherCode">
                    {/* <Form.Label>Enter Voucher Code</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Enter your voucher code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="mt-2 voucher-button "
                    onClick={handleVoucherApply}
                    disabled={voucherApplied}
                  >
                    Apply Voucher
                  </Button>
                  {voucherApplied && (
                    <p className="text-success mt-2">
                      Voucher successfully applied!
                    </p>
                  )}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseTickets;
