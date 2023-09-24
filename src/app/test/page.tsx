"use client"
import styles from './navbar.module.scss'
import { useState } from 'react';
import Body from './components/body.js'
import Divider from './components/divider';
import Footer from './components/footer';
import Header from './components/header';

import { useRouter } from 'next/router'
import { Button } from '@mantine/core';



export default function Navbar() {


    return (
        <div>
            <Header />
            <Body />
            <Footer />
            <Divider />
            
            

            <section>
            <div className={styles.navbar}></div>
            </section>
        </div>
    )
}