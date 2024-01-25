import Link from 'next/link';

export default function Header() {
    return(
        <div>
            <Link href="/">
                Home
            </Link>
            <Link href="/signin">
                Signin
            </Link>
            <Link href="/signup">
                Signup
            </Link>
            <Link href="/editor">
                Editor
            </Link>
        </div>
    )
}