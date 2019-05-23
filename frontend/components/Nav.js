import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import { navBar } from '../config'

const Nav = () => (
    <NavStyles>
        {navBar.map(({ href, label }, index) => (
            <Link href={href} key={index}>
                <a>{label}</a>
            </Link>
        ))}
    </NavStyles>
)

export default Nav
