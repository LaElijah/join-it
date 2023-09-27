"use client"
import styles from './navbar.module.scss'
import Body from './components/body'
import Divider from './components/divider';
import Footer from './components/footer';
import Header from './components/header';



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