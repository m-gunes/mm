import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
moment.locale('tr');
import axios from 'axios';
import Nav from './nav';


function IsDublicate (data, name) {
    var arr2 = [];
    var newarr = data.map(x => x[name]);
    var isDuplicate = newarr.some(function(item, idx){
        if((newarr.indexOf(item) != idx) == false) {
            arr2.push(item);
        }
    });
    return (arr2);
}

class EventDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      events: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    var newDate = new Date(date).getTime();
    //axios.post(`/etkinlik/detay/${startDate}`).then(res => {
    axios.post(`/etkinlik/eventdate`,{ date: date}).then(res => {
        this.setState({events: res.data});
        //console.log(res.data);    
    }).catch(error =>{
        console.log(error);
    })
  }
  componentDidMount() {
       var newDate = new Date(this.state.startDate).getTime();
      //axios.post(`/etkinlik/detay/${startDate}`).then(res => {
      axios.post(`/etkinlik/eventdate`, {date: newDate}).then(res => {
          this.setState({events: res.data});
          //console.log(res.data);
        }).catch(error =>{
            console.log(error);
        })
  }

  render() {
    let eventsData = this.state.events;    
    let boatIds = eventsData.length > 0 ? IsDublicate(eventsData, "boatId") : null;
    let boatNames = eventsData.length > 0 ? IsDublicate(eventsData, "boatName"):null;

    return (
        <div className="container">
            <div className="col-sm-12 date-header">
                <h2>Kayıtlı Etkinlikler</h2>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>            
            {
                eventsData.length > 0 ? (
                    boatIds.map((e, i) => {
                        return (                                
                            <div className="col-sm-6 y-panel">
                                <h3>{boatNames[i]}</h3>
                                <ol className="event-items">
                                    {
                                        eventsData.map(v => {
                                            if(v.boatId === e) {
                                                return (
                                                    <li>
                                                        <strong>{moment(v.startDate).format('LT')} - {moment(v.endDate).format('LT')} </strong>
                                                        <span>{v.startLocation} - {v.endLocation}</span>
                                                    </li>
                                                )                                                            
                                            }
                                        })
                                    }
                                </ol>
                            </div>                                
                        )                        
                    })
                ): <h3 className="text-center" style={{display:"inline-block",width:"100%"}}>etkinlik bulunamadı</h3>
            }
        </div>
    )    
  }
}

class App extends Component {
  render() {
    return(
        <div>
            <Nav/>
            <EventDate/>
        </div>
    )
  }
}


export default App;

