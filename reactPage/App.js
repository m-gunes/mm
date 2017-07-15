import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
moment.locale('tr');


class EventDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
        <div className="col-sm-12 date-header">
            <h2>Kayıtlı Etkinlikler</h2>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
        </div>

    )
    
  }
}



class ErenA extends Component {
    render(){
        return(
            <div className="col-sm-6 y-panel">
                <h3>EREN A</h3>
                <ol className="event-items">
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                </ol> 
                
            </div>
           
        )
    }
}
class ErenB extends Component {
    render(){
        return(
            <div className="col-sm-6 y-panel">
                <h3>EREN B</h3>
                <ol className="event-items">
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                    <li>
                        <strong>15:00 - 19:00 </strong>
                        <span>Beşiktaş - Bebek</span>
                    </li>
                </ol> 

            </div>
           
        )
    }
}


class App extends Component {
  render() {
    return(
      <div className="container">
          <EventDate/>
          <ErenA/>
          <ErenB/>
      </div>
    )
  }
}


export default App;
