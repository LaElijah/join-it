import FooterSimple from "./_components/footer";
import HeaderResponsive from "./_components/header"
import Provider from "./_components/provider"
import { getServerSession } from "next-auth/next";
import authOptions from "./api/auth/[...nextauth]/options";
import styles from "./styles/layout.module.scss"
import "./styles/global.scss"


export const metadata = {
  title: 'Join It',
  description: 'Join It is a demo app for the Join It project (name pending), a platform for connecting people with resources and services.',
  image: 'https://join-it.vercel.app/images/og-image.png',
  url: 'https://join-it.vercel.app',
  
}

export default async function RootLayout({
  children,
}) {


  const session = await getServerSession(authOptions)



  let userLinks = []

  if (session) {
    userLinks = [
      
      { label: 'Logout', link: '/api/auth/signout' },
      { label: 'Profile', link: '/profile' },
    ]
  } else {
    userLinks = [
      { label: 'Login', link: '/api/auth/signin' },
      { label: 'Register', link: '/signup' },
    ]
  }

      
  
  
  const links = [
    { label: 'Home', link: '/' },
    { label: 'Requests', link: '/requests' },
    { label: 'Resources', link: '/resources' },
    ...userLinks
    ];  

  return (
    <html lang="en">
      <body>
      <div className={styles.content}>
      <Provider>
     
        <HeaderResponsive links={links} />  
        
          {children}
        
      </Provider>
      <FooterSimple links={links} />
      </div>
      </body>

    </html>
  )
}
