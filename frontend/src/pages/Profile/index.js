import React, { useEffect, useState } from 'react'; 

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', 
        {
            headers: {
                Authorization: ongId,
            }
        }).then(resp => {
            setIncidents(resp.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`,  {
                headers: {
                    Authorization: ongId,
                    }
                }
            );

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (err) {
            alert("Wasn't possible to delete, try again")
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <h1>BE THE HERO</h1>
                <span>Welcome, {ongName}</span>

                <Link to="/incidents/new" className="button">Insert a new Ad</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h2>Your Registered Advertisements</h2>

            <ul>
                {incidents.map(incidents => (
                        <li key={incidents.id}>
                            <strong>AD:</strong>
                            <p>{incidents.title}</p>
    
                            <strong>DESCRIPTION:</strong>
                            <p>{incidents.description}</p>
    
                            <strong>VALUE:</strong>
                            <p>
                                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                    .format(incidents.value)}
                            </p>
        
                            <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}