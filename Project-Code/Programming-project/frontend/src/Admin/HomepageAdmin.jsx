// HomePage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

function HomePageAdmin() {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/api/HomePageAantallen')
            .then(response => {
                setStats(response.data)  // verwacht { bedrijf_aantal, vacature_aantal, student_aantal }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError('Failed to fetch stats')
                setLoading(false)
            })
    }, [])

    return ( 
        <div>
            <header><Navbar/></header>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', margin:'50px auto', maxWidth: '450px'}}>
                
                <div style={{ 
                        display: 'flex', 
                         width: '200px', 
                         height: '200px', 
                         backgroundColor: '#f9f9f9', 
                         justifyContent: 'center', 
                         alignItems: 'center', 
                         flexDirection: 'column',
                         boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                         cursor: 'pointer',
                         transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                        }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                        }}
                    onClick={() => navigate('/AdminBedrijvenLijst')}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                            {loading ? '...' : error ? '✖' : stats?.bedrijf_aantal}
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Geregistreerde bedrijven
                        </div>
                        <button style={{ marginTop: '10%'}}>Bekijk</button>
                    </div>

                <div style={{ 
                        display: 'flex', 
                        width: '200px', 
                        height: '200px', 
                        backgroundColor: '#f9f9f9', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                        }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                        }}
                    onClick={() => navigate('/AdminStudentenLijst')}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                            {loading ? '...' : error ? '✖' : stats?.student_aantal}
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Geregistreerde studenten
                        </div>
                        <button style={{ marginTop: '10%'}}>Bekijk</button>
                    </div>

                <div style={{ 
                        display: 'flex', 
                        width: '200px', 
                        height: '200px', 
                        backgroundColor: '#f9f9f9', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                        }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                        }}
                    onClick={() => navigate('/AdminVacatureLijst')}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                            {loading ? '...' : error ? '✖' : stats?.vacature_aantal}
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Open Vacatures
                        </div>
                        <button style={{ marginTop: '10%'}}>Bekijk</button>
                    </div>

                <div style={{ 
                        display: 'flex', 
                        width: '200px', 
                        height: '200px', 
                        backgroundColor: '#f9f9f9', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                        }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                        }}
                    onClick={() => navigate('/AdminAgenda')}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                            📅
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            Speeddates Agenda
                        </div>
                        <button style={{ marginTop: '10%'}}>Bekijk</button>
                    </div>
            </div>

            <footer>
               <Footer />
            </footer>
        </div>
    );
}

export default HomePageAdmin;