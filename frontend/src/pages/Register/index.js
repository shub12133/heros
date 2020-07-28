import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault(); 

        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        };

        try {
            const resp = await api.post('ongs', data);

            alert(`Your ID is ${resp.data.id}, please save safely`);

            history.push('/');

        } catch (err) {
            alert('An error occurred, check and try again');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>BE THE HERO</h1>

                    <h3>Login</h3>
                    <p>Register now, enter the platform and help people find your NGO</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#7159c1" />
                        Register now, get your ID 
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="NGO's name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />
                        <input 
                            placeholder="State" 
                            style={{ width: 100 }}
                            value={state}
                            onChange={event => setState(event.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>

    );
}