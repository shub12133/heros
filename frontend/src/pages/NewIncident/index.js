import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try { 
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch(err) {
            alert("Error when registering Ad, try again");
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <h1>BE THE HERO</h1>

                    <h3>New Ad</h3>
                    <p>Describe the ad in detail to find a hero who can solve it</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#7159c1" />
                        Back to Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input 
                        placeholder="Value ($)"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>

    );
}
