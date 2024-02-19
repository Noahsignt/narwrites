import Link from 'next/link';

export default function Header() {
    return(
        <div className="header">
            <div className="header-logo">
                Narwrites
            </div>
            <div className="header-links">
                <Link href="/">
                    Home
                </Link>
                <Link href="/signin">
                    Signin
                </Link>
                <Link href="/editor">
                    Editor
                </Link>
            </div>
        </div>
    )
}