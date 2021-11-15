import React from 'react';
//import { Table, Col } from 'react-bootstrap';


export default class Turnos extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div  style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
                    <table style={estiloTabla}>
                        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Mañana</th></tr></thead>
                        <tbody className="mt-0 mb-0 pt-0 pb-0" style={estiloRow}>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[0] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">07:00-07:30{this.props.horarios[0]<0 ?' ('+((-1)*this.props.horarios[0])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[1] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">07:30-08:00{this.props.horarios[1]<0 ?' ('+((-1)*this.props.horarios[1])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[2] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">08:00-08:30{this.props.horarios[2]<0 ?' ('+((-1)*this.props.horarios[2])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[3] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">08:30-09:00{this.props.horarios[3]<0 ?' ('+((-1)*this.props.horarios[3])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[4] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">09:00-09:30{this.props.horarios[4]<0 ?' ('+((-1)*this.props.horarios[4])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[5] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">09:30-10:00{this.props.horarios[5]<0 ?' ('+((-1)*this.props.horarios[5])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[6] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">10:00-10:30{this.props.horarios[6]<0 ?' ('+((-1)*this.props.horarios[6])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[7] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">10:30-11:00{this.props.horarios[7]<0 ?' ('+((-1)*this.props.horarios[7])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[8] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">11:00-11:30{this.props.horarios[8]<0 ?' ('+((-1)*this.props.horarios[8])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[9] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">11:30-12:00{this.props.horarios[9]<0 ?' ('+((-1)*this.props.horarios[9])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[10] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">12:00-12:30{this.props.horarios[10]<0 ?' ('+((-1)*this.props.horarios[10])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[11] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">12:30-13:00{this.props.horarios[11]<0 ?' ('+((-1)*this.props.horarios[11])+')':null}</h6></td></tr>
                            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[12] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'3.2ex'}} className="text-center mx-0 my-0 px-0 py-0">13:00-13:30{this.props.horarios[12]<0 ?' ('+((-1)*this.props.horarios[12])+')':null}</h6></td></tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
                    <table style={estiloTabla}>
                        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Tarde</th></tr></thead>
                        <tbody>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[13] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">13:30-14:00{this.props.horarios[13]<0 ?' ('+((-1)*this.props.horarios[13])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[14] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">14:00-14:30{this.props.horarios[14]<0 ?' ('+((-1)*this.props.horarios[14])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[15] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">14:30-15:00{this.props.horarios[15]<0 ?' ('+((-1)*this.props.horarios[15])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[16] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">15:00-15:30{this.props.horarios[16]<0 ?' ('+((-1)*this.props.horarios[16])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[17] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">15:30-16:00{this.props.horarios[17]<0 ?' ('+((-1)*this.props.horarios[17])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[18] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">16:00-16:30{this.props.horarios[18]<0 ?' ('+((-1)*this.props.horarios[18])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[19] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">16:30-17:00{this.props.horarios[19]<0 ?' ('+((-1)*this.props.horarios[19])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[20] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">17:00-17:30{this.props.horarios[20]<0 ?' ('+((-1)*this.props.horarios[20])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[21] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">17:30-18:00{this.props.horarios[21]<0 ?' ('+((-1)*this.props.horarios[21])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[22] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">18:00-18:30{this.props.horarios[22]<0 ?' ('+((-1)*this.props.horarios[22])+')':null}</h6></td></tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
                    <table style={estiloTabla}>
                        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Noche</th></tr></thead>
                        <tbody>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[23] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">18:30-19:00{this.props.horarios[23]<0 ?' ('+((-1)*this.props.horarios[23])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[24] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">19:00-19:30{this.props.horarios[24]<0 ?' ('+((-1)*this.props.horarios[24])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[25] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">19:30-20:00{this.props.horarios[25]<0 ?' ('+((-1)*this.props.horarios[25])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[26] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">20:00-20:30{this.props.horarios[26]<0 ?' ('+((-1)*this.props.horarios[26])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[27] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">20:30-21:00{this.props.horarios[27]<0 ?' ('+((-1)*this.props.horarios[27])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[28] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">21:00-21:30{this.props.horarios[28]<0 ?' ('+((-1)*this.props.horarios[28])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[29] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">21:30-22:00{this.props.horarios[29]<0 ?' ('+((-1)*this.props.horarios[29])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[30] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">22:00-22:30{this.props.horarios[30]<0 ?' ('+((-1)*this.props.horarios[30])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[31] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">22:30-23:00{this.props.horarios[31]<0 ?' ('+((-1)*this.props.horarios[31])+')':null}</h6></td></tr>
                            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[32] ? estiloHoraRoja : estiloHoraVerde}><h6 style={{fontSize:'2.9ex'}} className="text-center mx-0 my-0 px-0 py-0">23:00-23:30{this.props.horarios[32]<0 ?' ('+((-1)*this.props.horarios[32])+')':null}</h6></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

{/* <div style={{display:'flex'}}>
<div className="col ml-0 mr-0 pl-0 pr-1" style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
    <table variant="dark" className="table table-striped mt-0 mb-0 pt-0 pb-0" style={estiloTabla}>
        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Mañana</th></tr></thead>
        <tbody className="mt-0 mb-0 pt-0 pb-0" style={estiloRow}>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[0] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">07:00-07:30{this.props.horarios[0]<0 ?' ('+((-1)*this.props.horarios[0])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[1] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">07:30-08:00{this.props.horarios[1]<0 ?' ('+((-1)*this.props.horarios[1])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[2] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">08:00-08:30{this.props.horarios[2]<0 ?' ('+((-1)*this.props.horarios[2])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[3] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">08:30-09:00{this.props.horarios[3]<0 ?' ('+((-1)*this.props.horarios[3])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[4] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">09:00-09:30{this.props.horarios[4]<0 ?' ('+((-1)*this.props.horarios[4])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[5] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">09:30-10:00{this.props.horarios[5]<0 ?' ('+((-1)*this.props.horarios[5])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[6] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">10:00-10:30{this.props.horarios[6]<0 ?' ('+((-1)*this.props.horarios[6])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[7] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">10:30-11:00{this.props.horarios[7]<0 ?' ('+((-1)*this.props.horarios[7])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[8] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">11:00-11:30{this.props.horarios[8]<0 ?' ('+((-1)*this.props.horarios[8])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[9] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">11:30-12:00{this.props.horarios[9]<0 ?' ('+((-1)*this.props.horarios[9])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[10] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">12:00-12:30{this.props.horarios[10]<0 ?' ('+((-1)*this.props.horarios[10])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[11] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">12:30-13:00{this.props.horarios[11]<0 ?' ('+((-1)*this.props.horarios[11])+')':null}</h6></td></tr>
            <tr style={estiloRow}><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[12] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">13:00-13:30{this.props.horarios[12]<0 ?' ('+((-1)*this.props.horarios[12])+')':null}</h6></td></tr>
        </tbody>
    </table>
</div>
<div className="col ml-0 mr-0 pl-0 pr-1" style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
    <table variant="dark" className="table table-striped"  style={estiloTabla}>
        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Tarde</th></tr></thead>
        <tbody>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[13] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">13:30-14:00{this.props.horarios[13]<0 ?' ('+((-1)*this.props.horarios[13])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[14] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">14:00-14:30{this.props.horarios[14]<0 ?' ('+((-1)*this.props.horarios[14])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[15] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">14:30-15:00{this.props.horarios[15]<0 ?' ('+((-1)*this.props.horarios[15])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[16] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">15:00-15:30{this.props.horarios[16]<0 ?' ('+((-1)*this.props.horarios[16])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[17] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">15:30-16:00{this.props.horarios[17]<0 ?' ('+((-1)*this.props.horarios[17])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[18] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">16:00-16:30{this.props.horarios[18]<0 ?' ('+((-1)*this.props.horarios[18])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[19] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">16:30-17:00{this.props.horarios[19]<0 ?' ('+((-1)*this.props.horarios[19])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[20] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">17:00-17:30{this.props.horarios[20]<0 ?' ('+((-1)*this.props.horarios[20])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[21] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">17:30-18:00{this.props.horarios[21]<0 ?' ('+((-1)*this.props.horarios[21])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[22] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">18:00-18:30{this.props.horarios[22]<0 ?' ('+((-1)*this.props.horarios[22])+')':null}</h6></td></tr>
        </tbody>
    </table>
</div>
<div className="col ml-0 mr-0 pl-0 pr-0" style={{ paddingLeft: '0.1em', paddingRight: '0.1em' }}>
    <table variant="dark" className="table table-striped"  style={estiloTabla}>
        <thead className="mt-0 mb-0 pt-0 pb-0"><tr><th className="mt-0 mb-0 pt-0 pb-0 text-center fw-normal">Noche</th></tr></thead>
        <tbody>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[23] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">18:30-19:00{this.props.horarios[23]<0 ?' ('+((-1)*this.props.horarios[23])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[24] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">19:00-19:30{this.props.horarios[24]<0 ?' ('+((-1)*this.props.horarios[24])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[25] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">19:30-20:00{this.props.horarios[25]<0 ?' ('+((-1)*this.props.horarios[25])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[26] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">20:00-20:30{this.props.horarios[26]<0 ?' ('+((-1)*this.props.horarios[26])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[27] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">20:30-21:00{this.props.horarios[27]<0 ?' ('+((-1)*this.props.horarios[27])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[28] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">21:00-21:30{this.props.horarios[28]<0 ?' ('+((-1)*this.props.horarios[28])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[29] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">21:30-22:00{this.props.horarios[29]<0 ?' ('+((-1)*this.props.horarios[29])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[30] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">22:00-22:30{this.props.horarios[30]<0 ?' ('+((-1)*this.props.horarios[30])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[31] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">22:30-23:00{this.props.horarios[31]<0 ?' ('+((-1)*this.props.horarios[31])+')':null}</h6></td></tr>
            <tr><td className="mx-0 my-0 px-0 py-0" style={this.props.horarios[32] ? estiloHoraRoja : estiloHoraVerde}><h6 className="text-center mx-0 my-0 px-0 py-0">23:00-23:30{this.props.horarios[32]<0 ?' ('+((-1)*this.props.horarios[32])+')':null}</h6></td></tr>
        </tbody>
    </table>
</div>
</div> */}


const estiloHoraRoja = {
    fontFamily: 'Saira Extra Condensed',
    fontSize: '1.2ex',
    backgroundColor: 'rgb(190,50,30)',
    padding: '0 0 0 0 !important'
}
const estiloHoraVerde = {
    fontFamily: 'Saira Extra Condensed',
    fontSize: '1.2ex',
    backgroundColor: 'rgb(50,170,80)',
    padding: '0 0 0 0 !important'
}
const estiloRow = {
    padding: '0 !important',
    margin: '0 !important'
}
const estiloTabla = {
    //width:'12ch',
    borderWidth:'1px',
    borderRadius:'1em',
    borderStyle: 'solid ' //unset !important',

}