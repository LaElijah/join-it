"use client"
import { useEffect } from 'react';
import { io } from 'socket.io-client';


export default function Alternate() {

    useEffect(() => {
        const socket = io('http://localhost:8080', {
            transports: ['polling', 'websocket'],
            extraHeaders: {
                'access_key': 'alternate'
            },
            withCredentials: true
        });
        socket.on('connect', () => {
            console.log('connected');
        });
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
        
        socket.on('message', (event) => {
            console.log(event);
        })
    }, []);


    return (
        <div>
            <h1>Page</h1>
        </div>
    )
}