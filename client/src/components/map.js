import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Slider, Select, Input, Spin } from "antd";

let key = `${process.env.REACT_APP_GOOGLE_MAPS_API}`;
const { Option } = Select;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isLoading: false,
      query: "",
      count: "",
      type: "",
      address: "",
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

  sliderOnAfterChange = value => {
    this.setState({ count: value });
    console.log("onAfterChange: ", value);
  };

  selectChange = value => {
    this.setState({ type: value });
    console.log("Type: ", value);
  };

  inputChange = value => {
    this.setState({ query: value });
    console.log("query: ", value);
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
      .then(result => this.setState({ tweets: result, isLoading: false }));

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
      // .then(latLng => )
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <div
        className="card mx-auto my-auto"
        style={{ maxWidth: "50rem", width: "auto", top: "80px" }}
      >
        <form onSubmit={ev => this.onSubmit(ev)}>
          <div className="container">
            <div className="row">
            <div className="col-sm" style={{ marginTop: "1%" }}>
              <button
                style={{ marginTop: "1%",width: "100%" }}
                type="button"
                className="btn btn-dark"
                onClick={this.getCurrentLocation}
              >
                Current Location
              </button>
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
                        className: "location-search-input form-control"
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
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
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
              </div>
              <div className="row">
              <div className="col-6" style={{ marginTop: "1%" }}>
                <Input
                  placeholder="Search Query"
                  onChange={this.inputChange}
                  size="large"
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
                <h6 style={{textAlign:'center'}}>Count</h6>
              </div>
            </div>
            <button
              style={{ marginTop: "2%", marginBottom: "2%", width: "99%" }}
              type="submit"
              className="btn btn-dark"
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
        {/* <button onClick={this.printState}>yay</button> */}
        <div className="card body" style={{ padding: "31%", margin: "2%" }}>
          <Map
            google={this.props.google}
            style={{
              width: "100%",
              height: "500px",
              margin: "-32.4%"
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
        </div>

        <div className="container">
          {this.state.tweets.map(tweet => (
            <div className="row" key={tweet.id}>
              <div className="col">
                <div className="card" style={{ marginBottom: "2%" }}>
                  <div className="media">
                    <img
                      src={tweet.profileImage}
                      className="align-self-start mr-3 rounded circle"
                      style={{ marginTop: "1%", marginLeft: "1%" }}
                      alt="..."
                    />
                    <div className="media-body" style={{ marginTop: "1%" }}>
                      <h5 className="mt-0" id={tweet.userId}>
                        {tweet.userName}
                      </h5>
                      <p
                        className=""
                        style={{ marginTop: "-1%", marginBottom: "1%" }}
                      >
                        <small className="text-muted">{tweet.screenName}</small>
                      </p>
                      <p>{tweet.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key,
  v: "3.30"
})(MapContainer);
