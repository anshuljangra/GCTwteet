import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Slider,
  Select,
  Input,
  Spin,
  BackTop,
  Button,
  Icon,
  message,
  Card,
  Modal,
  Divider,
  Comment,
  Avatar
} from "antd";
import "./kanye.css";
let key = `${process.env.REACT_APP_GOOGLE_MAPS_API}`;

const { Option } = Select;
///////////////// BACK ////////////////

var url_regex = new RegExp("https?://(www.)?t.co/([^s]+ )", "g");

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isLoading: false,
      query: "",
      count: "",
      type: "popular",
      address: "",
      tweet_url: [],
      tweets_loaded: false,
      modal_visible: false,
      markers: [
        {
          name: "Current position",
          position: {
            lat: 37.774929,
            lng: -122.419416
          },
          zoom: 10
        }
      ]
    };
  }

  onChange(key, event) {
    if (event === undefined) {
      return;
    }
    this.setState({
      [key]: event.target.value
    });
  }

  showModal = () => {
    this.setState({
      modal_visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      modal_visible: false
    });
  };

  sliderOnAfterChange = value => {
    this.setState({ count: value });
    console.log("onAfterChange: ", value);
  };

  selectChange = value => {
    this.setState({ type: value });
    console.log("Type: ", value);
  };

  inputChange = (e) => {
    this.setState({ query: e.target.value });
    // console.log("query: ", e.target.value);
  };

  noURL = () => {
    message.warning("Tweet link not available");
  };

  onSubmit(event) {
    // var text = this.state.markers.pop(position.lat);

    this.setState({ isLoading: true });
    var latitude = this.state.markers[0].position.lat;
    var longitude = this.state.markers[0].position.lng;
    var query = this.state.query;
    var count = this.state.count;
    var type = this.state.type;
    var fetchString =
      "?query=" +
      query +
      "&result_type=" +
      type +
      "&count=" +
      count +
      "&geocode=" +
      latitude +
      "," +
      longitude +
      ",7km";

    fetch("/search" + fetchString, {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(result =>
        this.setState({ tweets: result, isLoading: false, tweets_loaded: true })
      )
      .then(message.success("Tweets Retrieved"));

    event.preventDefault();
  }

  printState = () => {
    console.log(this.state.tweets);
  };

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      console.log(coords);
      this.setState({
        markers: [
          {
            position: {
              lat: coords.latitude,
              lng: coords.longitude
            },
            zoom: 15
          }
        ]
      });
    });
    message.success("Location Set!");
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      console.log(markers);
      // console.log(this.state.markers.pop().position);
      return { markers };
    });
  };

  handleChange = address => {
    this.setState({ address });
  };
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          address: "",
          markers: [
            {
              position: {
                lat: latLng.lat,
                lng: latLng.lng
              },
              zoom: 15
            }
          ]
        })
      )
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <>
        <div className="main-card">
          <div className="secondary-card">
            <Card style={{ width: "60vw", marginTop: "15vh" }}>
              <Card.Grid hoverable={true} style={{ width: "100%" }}>
                <Divider>Select Location</Divider>

                <form onSubmit={ev => this.onSubmit(ev)}>
                  <div className="container">
                    <div className="row">
                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <Button
                          style={{ marginTop: "1%", width: "100%" }}
                          size='large'
                          onClick={this.getCurrentLocation}
                          type='primary'
                        >
                          Current Location
                        </Button>
                      </div>
                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <PlacesAutocomplete
                          value={this.state.address}
                          onChange={this.handleChange}
                          onSelect={this.handleSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading
                          }) => (
                            <div>
                              <input
                                style={{
                                  marginTop: "1%"
                                }}
                                {...getInputProps({
                                  placeholder: "Search Places ...",
                                  className:
                                    "location-search-input form-control"
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer"
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer"
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>

                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <Button
                          style={{ marginTop: "1%", width: "100%" }}
                          type="primary"
                          onClick={this.showModal}
                          size='large'
                        >
                          Select on Map
                        </Button>
                      </div>
                    </div>

                    <Divider style={{ marginTop: "8%" }}>
                      Enter Search Query
                    </Divider>
                    <div className="row">
                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <Input
                          placeholder="Search Query"
                          onChange={this.inputChange}
                          size="large"
                          required
                        />
                      </div>
                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <Select
                          defaultValue="popular"
                          style={{ width: 200 }}
                          onChange={this.selectChange}
                          size="large"
                        >
                          <Option value="recent">Recent</Option>
                          <Option value="mixed">Mixed</Option>
                          <Option value="popular">Popular</Option>
                        </Select>
                      </div>
                      <div className="col-sm" style={{ marginTop: "1%" }}>
                        <Slider
                          defaultValue={10}
                          min={5}
                          max={50}
                          onAfterChange={this.sliderOnAfterChange}
                        />
                        <h6 style={{ textAlign: "center" }}>Count</h6>
                      </div>
                    </div>
                    <button
                      style={{
                        marginTop: "2%",
                        marginBottom: "2%",
                        width: "99%",
                        backgroundColor:'#1890ff',
                        color:'white'
                      }}
                      type="submit"
                      className="btn"
                    >
                      Search Tweets
                    </button>
                    {this.state.isLoading ? (
                      <div className="d-flex justify-content-center">
                        <Spin />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </Card.Grid>
              {/* <button onClick={this.printState}>yay</button> */}

              <div>
                <Modal
                  title="Map"
                  visible={this.state.modal_visible}
                  onOk={this.handleOk}
                  bodyStyle={{ height: "70vh", maxHeight: "600px" }}
                  afterClose={this.handleOk}
                  onCancel={this.handleOk}
                >
                  <Map
                    google={this.props.google}
                    style={{
                      width: "90%",
                      height: "65vh",
                      maxHeight: "550px"
                    }}
                    zoom={this.state.markers[0].zoom}
                    center={this.state.markers[0].position}
                  >
                    {this.state.markers.map((marker, index) => (
                      <Marker
                        position={marker.position}
                        draggable={true}
                        onDragend={(t, map, coord) =>
                          this.onMarkerDragEnd(coord, index)
                        }
                        name={marker.name}
                        key={index}
                      />
                    ))}
                  </Map>
                </Modal>
              </div>

              <BackTop />
            </Card>
            {this.state.tweets_loaded ? (
              <Card
                style={{
                  width: "60vw",
                  maxHeight: "80vh",
                  marginTop: "2%",
                  overflow: "auto",
                  marginBottom: "2%"
                }}
              >
                <Card.Grid hoverable={true} style={{ width: "100%" }}>
                  <div className="container">
                    {this.state.tweets.map(tweet => (
                      <div className="row" key={tweet.id}>
                        <div className="col">
                          <Card.Grid
                            hoverable={true}
                            style={{ width: "100%", marginBottom: "2%" }}
                          >
                            <Comment
                              author={<a>{tweet.userName}</a>}
                              avatar={
                                <Avatar src={tweet.profileImage} alt="..." />
                              }
                            content={<><p>{tweet.text}</p><br/> {tweet.location ? (<p><strong>Tweet Location: </strong>{tweet.location}</p>): (<p><strong>Tweet Location: </strong>Location not available due to API limitations</p>)}</>}
                              datetime={tweet.screenName}
                              
                            >
                              {String(tweet.text).match(url_regex) ? (
                                <Button
                                  type="primary"
                                  href={String(tweet.text).match(url_regex)}
                                  target="_blank"
                                >
                                  View Tweet
                                </Button>
                              ) : (
                                <Icon
                                  type="exclamation-circle"
                                  style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "2%",
                                    color: "#ffe58f"
                                  }}
                                  onClick={this.noURL}
                                />
                              )}
                            </Comment>
                          </Card.Grid>
                          {/*  */}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Grid>
              </Card>
            ) : (
              ""
            )}
          </div>
          <div className="info-card">
            <Card hoverable={true}>
              <Divider>Selected Coordinates</Divider>
              <strong>Latitude: </strong>
              {String(this.state.markers[0].position.lat).substring(0, 9)}
              <br />
              <strong>Latitude: </strong>
              {String(this.state.markers[0].position.lng).substring(0, 9)}
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key,
  v: "3.30"
})(MapContainer);
