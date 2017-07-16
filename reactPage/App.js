import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
moment.locale('tr');
import axios from 'axios';
// var data = 
//     { 
//     "_id" : ObjectId("584dce6b2013f120438f3cd7"), 
//     "hasDinner" : false, 
//     "moneyType3" : "TL", 
//     "moneyType2" : "TL", 
//     "moneyType1" : "TL", 
//     "earnestMoney" : NumberInt(0), 
//     "sell" : NumberInt(600), 
//     "fee" : "600", 
//     "endLocation" : "Kızkulesi", 
//     "startLocation" : "Kızkulesi", 
//     "personCount" : NumberInt(2), 
//     "endTime" : 23.45, 
//     "startTime" : 22.3, 
//     "startDate" : ISODate("2016-12-30T19:30:00.000+0000"), 
//     "description" : "Evlilik teklifi", 
//     "subject" : "Ece hnm = Evlilik teklifi=ops", 
//     "boatId" : ObjectId("57aa1d844261ef904d930bef"), 
//     "__v" : NumberInt(0), 
//     "endDate" : ISODate("2016-12-30T20:45:00.000+0000")
// }

// var data = {
//     erenA : {
//         başlangıçSaati: "123",
//         bitişSaati: "345",
//         başlangıçYeri: "bebek",
//         bitişYeri: "beşiktaş"
//     },
//     erenB : {
//         başlangıçSaati: "123",
//         bitişSaati: "345",
//         başlangıçYeri: "bebek",
//         bitişYeri: "beşiktaş"
//     }
// }

/*
tarih gönderilerek o tarihe ait data çekilecek.
gelen array objesi içerisindeki boatId ye bakılarak data filter edilerek map(loop) lenecek.
*/

class EventDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      events: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    //axios.post(`/etkinlik/detay/${startDate}`).then(res => {
    axios.post("/etkinlik/detay/").then(res => {
        console.log(res);
    }).catch(error =>{
        console.log(error);
    })
  }
  componentDidMount() {
      var startDate = this.state.startDate;
      //axios.post(`/etkinlik/detay/${startDate}`).then(res => {
      axios.post("/etkinlik/detay/").then(res => {
            console.log(res);
            //this.setState({events: res.data})
        }).catch(error =>{
            console.log(error);
        })
  }

  render() {
      var eventsData = this.state.events;
    return (
        <div className="container">
            <div className="col-sm-12 date-header">
                <h2>Kayıtlı Etkinlikler</h2>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>            
            <ErenA postData={eventsData} boatId={123}/>
            <ErenB postData={eventsData} boatId={456}/>
        </div>

    )
    
  }
}


function EventFiltered (props) {
    var filtered = props.filtered;    
    return(
        // {/*{filtered ? filtered.map() : null}*/}
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
    )

}



class ErenA extends Component {
    render(){
        var postData = this.props.postData;
        var filtered = postData ? postData.filter(x => x.boatId == boatId) : null;
        return(
            <div className="col-sm-6 y-panel">
                <h3>EREN A</h3>                
                <EventFiltered post={filtered}/>            
            </div>
           
        )
    }
}
class ErenB extends Component {
    render(){
        var postData = this.props.postData;
        var filtered = postData ? postData.filter(x => x.boatId == boatId) : null;
        return(
            <div className="col-sm-6 y-panel">
                <h3>EREN B</h3>
                <EventFiltered post={filtered} />
            </div>           
        )
    }
}


class App extends Component {
  render() {
    return(
      <EventDate/>
    )
  }
}


export default App;

