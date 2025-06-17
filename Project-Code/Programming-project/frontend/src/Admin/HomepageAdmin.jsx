// HomePage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/AdminNavBar';
import Footer from '../Components/Footer';

function HomePageAdmin() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/HomePageAantalen')
            .then(response => {
                setStats(response.data);  // verwacht { bedrijf_aantal, vacature_aantal, student_aantal }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch stats');
                setLoading(false);
            });
    }, []);

    const cards = [
        {
            aantal: stats?.bedrijf_aantal,
            label: 'Geregistreerde bedrijven',
            route: '/AdminBedrijvenLijst'
        },
        {
            aantal: stats?.student_aantal,
            label: 'Geregistreerde studenten',
            route: '/AdminStudentenLijst'
        },
        {
            aantal: stats?.vacature_aantal,
            label: 'Open Vacatures',
            route: '/AdminVacatureLijst'
        },
        {
            aantal:  stats?.speeddate_aantal,
            label: 'Speeddates Agenda',
            route: '/AdminAgenda'
        }
    ];

    return ( 
        <div>
            <header><Navbar/></header>

            {/* Titel gecentreerd */}
            <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Dashboard</h1>

            {/* Container met vierkante grid lay-out */}
            <div className='AdminHome-Container' style={{
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                borderRadius: '1rem',
                padding: '2rem',
                margin: '40px auto',
                maxWidth: '900px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    justifyItems: 'center',
                    alignItems: 'center'
                }}>
                    {cards.map((card, index) => (
                        <div key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '200px',
                                height: '200px',
                                backgroundColor: '#f9f9f9',
                                justifyContent: 'center',
                                alignItems: 'center',
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
                            onClick={() => navigate(card.route)}
                        >
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                                {loading ? '...' : error ? '✖' : card.aantal}
                            </div>
                            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                                {card.label}
                            </div>
                            <button style={{ marginTop: '10%' }}>Bekijk</button>
                        </div>
                    ))}
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default HomePageAdmin;
