import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import herosImg from '../../assests/heroes.jpeg';

export default function Logon() {

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const resp = await api.post('session', { id });
            // console.log(resp.data.name);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resp.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Login failed, try again')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <h1>BE THE HERO</h1>

                <form onSubmit={handleLogin}>
                    <h3>Logon</h3>

                    <input 
                        placeholder="Your ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Join</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#7159c1" />
                        Register now, get your ID 
                    </Link>
                </form>

            </section>

            <img src={herosImg} alt="Heroes" />
        </div>
    );
}