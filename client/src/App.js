import React, { Component } from "react";
import './App.css';

import axios from 'axios';

const SERVER_BASE = 'http://localhost:5000';

class App extends Component {
    state = {
        physicians: null,
        loadingPhysicians: true,
        patientData: null,
        loadingPatientData: true,
    }

    componentDidMount(){
        // get physicians
        axios.get(`${SERVER_BASE}/api/get/physicians`,)
            .then((res) => {
                this.setState({physicians: res.data, loadingPhysicians: false});
            })
            .catch((err) => console.log(err));
    }

    loadPatients = (name) => {
        // get patients
        let data = {
            params: {
                name: name
            },
        };
        console.log(data);
        axios.post(`${SERVER_BASE}/api/post/physician/patients`, data,)
            .then((res) => {
                this.setState({patientData: res.data, loadingPatientData: false});
            })
            .catch((err) => console.log(err));
    }

    buildTable = (data, type) => {
      let result = [];
        data.forEach(row => {
            if (type === 'physicians') {
                result.push(
                    <tr>
                        <td style={{cursor: "grab"}} align="left" onClick={() => this.loadPatients(row.name)}>{row.name}</td>
                        <td align="left">{row.title}</td>
                    </tr>
                )
            }
            if (type === 'patients') {
                result.push(
                    <tr>
                        <td align="left">{row.name}</td>
                        <td align="left">{row.time}</td>
                        <td align="left">{row["visit-type"]}</td>
                    </tr>
                )
            }
        })
        return result;
    }


  render() {
      const {
          physicians,
          loadingPhysicians,
          patientData,
          loadingPatientData
      } = this.state;

      return (
          <div className="App">
              <header className="App-header">
                  <p style={{fontSize:60}}>
                      <strong>Notable Take Home Assessment</strong>
                  </p>
              </header>
              <div className="physicians">
                  <table>
                      <tr>
                          <th align="left">Physician</th>
                          <th align="left">Title</th>
                      </tr>
                      {!loadingPhysicians
                          ? this.buildTable(physicians, 'physicians')
                          : null}
                  </table>
              </div>
              <br/>
              <br/>
              <div className="physician-patients">
                  {!loadingPhysicians && !loadingPatientData
                      ?
                      <div>
                          <p align="left">
                              <p style={{fontSize:40}}>
                                  <strong>Physician: </strong>
                                  {physicians[0].name}
                              </p>
                              {physicians[0].email}
                          </p>
                          <table>
                              <tr>
                                  <th align="left">Patient</th>
                                  <th align="left">Time</th>
                                  <th align="left">Kind</th>
                              </tr>
                              {!loadingPhysicians
                                  ? this.buildTable(patientData, 'patients')
                                  : null}
                          </table>
                      </div>
                      : 'Select a physician to view patient details'}
              </div>
          </div>
      );
  }
}

export default App;
