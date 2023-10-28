import "@/app/globals.scss"

interface ContentWrapperProps {
    className?: string;
    wrapperStyles?: string;
    children: JSX.Element | JSX.Element[]

}




export default function ContentWrapper({
    className: styles,
    wrapperStyles,
    children
}: ContentWrapperProps){
    return (
        <div className={`content ${styles}`}>
            <div className={wrapperStyles}>
                {children}
            </div>
        </div>
    )

}