import React from 'react';
//import { Table, Col } from 'react-bootstrap';


export default class Turnos extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="col ml-0 mr-0 pl-0 pr-1">
                    <table style={{ fontSize: '1.05em' }} variant="dark" className="table table-striped">
                        <thead className="mt-0 mb-0 pt-0 pb-0"><th className="mt-0 mb-0 pt-0 pb-0">Mañana</th></thead>
                        <tbody>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[0] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">07:00-07:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[1] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">07:30-08:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[2] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">08:00-08:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[3] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">08:30-09:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[4] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">09:00-09:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[5] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">09:30-10:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[6] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">10:00-10:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[7] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">10:30-11:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[8] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">11:00-11:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[9] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">11:30-12:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[10] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">12:00-12:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[11] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">12:30-13:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[12] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">13:00-13:30</h6></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="col ml-0 mr-0 pl-0 pr-1">
                    <table style={{ fontSize: '1.05em' }} variant="dark" className="table table-striped">
                        <thead className="mt-0 mb-0 pt-0 pb-0"><th className="mt-0 mb-0 pt-0 pb-0">Tarde</th></thead>
                        <tbody>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[13] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">13:30-14:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[14] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">14:00-14:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[15] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">14:30-15:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[16] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">15:00-15:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[17] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">15:30-16:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[18] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">16:00-16:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[19] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">16:30-17:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[20] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">17:00-17:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[21] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">17:30-18:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[22] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">18:00-18:30</h6></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="col ml-0 mr-0 pl-0 pr-0">
                    <table style={{ fontSize: '1.05em' }} variant="dark" className="table table-striped">
                        <thead className="mt-0 mb-0 pt-0 pb-0"><th className="mt-0 mb-0 pt-0 pb-0">Noche</th></thead>
                        <tbody>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[23] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">18:30-19:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[24] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">19:00-19:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[25] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">19:30-20:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[26] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">20:00-20:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[27] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">20:30-21:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[28] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">21:00-21:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[29] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">21:30-22:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[30] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">22:00-22:30</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[31] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">22:30-23:00</h6></td></tr>
                            <tr><td className="mt-0 mb-0 pt-0 pb-0" style={{ backgroundColor: this.props.horarios[32] ? 'rgb(124,30,30)' : 'rgb(50,170,80)' }}><h6 className="mt-0 mb-0 pt-0 pb-0">23:00-23:30</h6></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}